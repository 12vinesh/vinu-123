(function () {
'use strict';

console.log("Bundle script loaded");

const variantCache = {};
let isHydrating = false;
let hydrateTimer = null;

/* ---------------- VARIANT FETCH ---------------- */

async function fetchVariant(variantId) {
  if (variantCache[variantId]) return variantCache[variantId];

  try {
    const res = await fetch(`/variants/${variantId}.js`);
    const data = await res.json();
    variantCache[variantId] = data;
    console.log("Fetching variant:", variantId);
    return data;
  } catch (e) {
    return null;
  }
}

/* ---------------- PRELOAD ---------------- */

async function preloadAllBundleImages() {
  try {
    const cart = await fetch('/cart.js').then(r => r.json());

    cart.items.forEach(item => {
      if (item.properties?._isParent === 'true' && item.properties?._bundle_pairs) {
        const pairs = parseBundlePairs(item.properties._bundle_pairs);
        pairs.forEach(pair => fetchVariant(pair.variantId));
      }
    });
  } catch (e) {}
}

/* ---------------- PARSE PAIRS ---------------- */

function getPairSortIndex(label) {
  if (!label) return 999;
  const lower = label.toLowerCase();
  if (lower.includes('free')) return 998;

  const match = lower.match(/(\d+)/);
  return match ? parseInt(match[1]) : 997;
}

function parseBundlePairs(raw) {
  if (!raw) return [];

  return raw
    .split('|')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {

      const gidMatch = part.match(/^(gid:\/\/shopify\/ProductVariant\/\d+):(\d+):(.+)$/);
      if (!gidMatch) return null;

      const fullGid = gidMatch[1];
      const quantity = parseInt(gidMatch[2]) || 1;
      const label = gidMatch[3];
      const numericId = fullGid.split('/').pop();

      return {
        variantId: numericId,
        quantity,
        label,
        sortIndex: getPairSortIndex(label)
      };

    }).filter(Boolean);
}

/* ---------------- HYDRATE ---------------- */

async function hydrateBundleItems() {

console.log("Hydrate triggered", Date.now());

if (isHydrating) return;

const bundleParents = document.querySelectorAll('[data-bundle-key]');

if (!bundleParents.length) {
  console.log("No bundle parents found yet");
  return;
}
isHydrating = true;

try {

for (const parentEl of bundleParents) {

  if (parentEl.querySelector('.bundle-pair-item')) continue;

  const bundleKey = parentEl.dataset.bundleKey;
  if (!bundleKey) continue;

  const rawPairs = parentEl.dataset.bundlePairs;
  if (!rawPairs) continue;
  console.log("Bundle parent:", parentEl);
  console.log("Pairs data:", rawPairs);

  const parentQty = parseInt(parentEl.dataset.bundleQty) || 1;
  const children = parseBundlePairs(rawPairs);

  const pairsList = parentEl.querySelector('[data-bundle-pairs-list]');
  const toggleBtn = parentEl.querySelector('[data-bundle-toggle]');
  if (!pairsList) continue;
  console.log("Pairs list:", pairsList);
  

  pairsList.innerHTML = '';

  if (toggleBtn && children.length > 0) {
    toggleBtn.textContent = `Hide ${children.length} items ▲`;
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  const variants = await Promise.all(
    children.map(child => fetchVariant(child.variantId))
  );
  //Change:
  if (!document.body.contains(parentEl)) {
  console.log("Parent replaced after fetch");
  continue;
}
 
  children.forEach((child,index)=>{

    const variant = variants[index];

    const li=document.createElement('li');
    li.className='bundle-pair-item';

    const inner=document.createElement('div');
    inner.className='bundle-pair-item__inner';

    const imgWrap=document.createElement('div');
    imgWrap.className='bundle-pair-item__img-wrap';

    if(variant?.featured_image?.src){
      const img=document.createElement('img');
      img.src=variant.featured_image.src;
      img.width=40;
      img.height=40;
      img.loading='eager';
      imgWrap.appendChild(img);
    }

    const info=document.createElement('div');
    info.className='bundle-pair-item__info';

    const label=document.createElement('span');
    label.className='bundle-pair-item__label';
    label.textContent=`${child.quantity * parentQty} × ${variant?.product_title || 'Product'}`;

    const value=document.createElement('span');
    value.className='bundle-pair-item__value';
    value.textContent=variant?.title || '';

    info.appendChild(label);
    info.appendChild(value);

    inner.appendChild(imgWrap);
    inner.appendChild(info);
    li.appendChild(inner);

    pairsList.appendChild(li);

  });

}

} finally {
isHydrating=false;
}

}

/* ---------------- TOGGLE ---------------- */

function setupBundleToggleDelegation(){

document.addEventListener('click',(event)=>{

const btn=event.target.closest('[data-bundle-toggle]');
if(!btn) return;

const cartItemEl=btn.closest('[data-bundle-key]');
if(!cartItemEl) return;

const list=cartItemEl.querySelector('[data-bundle-pairs-list]');
if(!list) return;

const expanded=btn.getAttribute('aria-expanded')==='true';
const count=list.querySelectorAll('.bundle-pair-item').length;

if(expanded){
list.style.display='none';
btn.textContent=`Show ${count} items ▼`;
btn.setAttribute('aria-expanded','false');
}else{
list.style.display='';
btn.textContent=`Hide ${count} items ▲`;
btn.setAttribute('aria-expanded','true');
}

});

}

/* ---------------- REMOVE ---------------- */

function handleBundleRemove(){

document.addEventListener('click',async(e)=>{

const removeBtn=e.target.closest('.cart-bundle-remove[data-bundle-key]');
if(!removeBtn) return;

const bundleKey=removeBtn.dataset.bundleKey;
if(!bundleKey) return;

e.preventDefault();
e.stopImmediatePropagation();

removeBtn.innerHTML='⏳';
removeBtn.disabled=true;

try{

const cart=await fetch('/cart.js').then(r=>r.json());

const bundleItems=cart.items.filter(
item=>item.properties?._bundleKey===bundleKey
);

const updates={};
bundleItems.forEach(item=>{
updates[item.key]=0;
});

await fetch('/cart/update.js',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({updates})
});

location.reload();

}catch(err){

console.error('Bundle remove error',err);
location.reload();

}

},true);

}

/* ---------------- DEBOUNCE ---------------- */

function debouncedHydrate(){

clearTimeout(hydrateTimer);

hydrateTimer=setTimeout(()=>{
hydrateBundleItems();
},200);

}

/* ---------------- OBSERVER ---------------- */

const observer = new MutationObserver((mutations)=>{

if(isHydrating) return;

for(const mutation of mutations){

mutation.addedNodes.forEach(node=>{

if(
node.nodeType===1 &&
(node.matches?.('[data-bundle-key]') ||
 node.querySelector?.('[data-bundle-key]'))
){
console.log("Cart updated → hydrate");
debouncedHydrate();
}

});

}

});

/* ---------------- ATTACH OBSERVER ---------------- */

function attachDrawerObserver(){

const drawer=document.querySelector('cart-drawer');

if(!drawer){
requestAnimationFrame(attachDrawerObserver);
return;
}

console.log("Observer attached to cart-drawer");

observer.observe(drawer,{
childList:true,
subtree:true
});

}

/* ---------------- EVENTS ---------------- */

document.addEventListener('drawer:open',()=>{
setTimeout(()=>{
debouncedHydrate();
},250);
});

document.addEventListener('cart:rendered',()=>{
debouncedHydrate();
});

/* ---------------- INIT ---------------- */

document.addEventListener('DOMContentLoaded',()=>{

console.log("DOM loaded");

preloadAllBundleImages();
hydrateBundleItems();
setupBundleToggleDelegation();
handleBundleRemove();
attachDrawerObserver();

});

})();