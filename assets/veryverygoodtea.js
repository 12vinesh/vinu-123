(function () {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
    new MutationObserver((n) => {
        for (const r of n)
            if (r.type === "childList")
                for (const a of r.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && i(a);
    }).observe(document, { childList: !0, subtree: !0 });
    function s(n) {
        const r = {};
        return (
            n.integrity && (r.integrity = n.integrity),
            n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
            n.crossOrigin === "use-credentials"
                ? (r.credentials = "include")
                : n.crossOrigin === "anonymous"
                  ? (r.credentials = "omit")
                  : (r.credentials = "same-origin"),
            r
        );
    }
    function i(n) {
        if (n.ep) return;
        n.ep = !0;
        const r = s(n);
        fetch(n.href, r);
    }
})();
const ya = document.querySelectorAll(".js-video-plays-in-view");
ya.forEach((t) => {
    t.muted = !0;
    let e = t.play();
    e !== void 0 &&
        e.then((s) => {
            new IntersectionObserver(
                (n) => {
                    n.forEach((r) => {
                        r.intersectionRatio <= 0.1 && !t.paused
                            ? t.pause()
                            : t.paused &&
                              setTimeout(function () {
                                  t.play();
                              }, 500);
                    });
                },
                { threshold: 0.1 }
            ).observe(t);
        });
});
async function ba() {
    (window._klOnsite = window._klOnsite || []), window._klOnsite.push(["openForm", "Wyiee4"]);
}
function Yi() {
    setTimeout(() => {
        const t = document.querySelector("#klaviyo-bis-button-container");
        t && t.addEventListener("click", ba);
    }, 2e3);
}
async function vn(t) {
    t.stopImmediatePropagation(), t.preventDefault();
    const e = t.currentTarget,
        s = new FormData(e);
    try {
        (await fetch("/cart/add.js", { method: "POST", body: s })).ok
            ? (window.toggleMiniCart && window.toggleMiniCart("open"), window.getCart && window.getCart())
            : console.error("Failed to add to cart");
    } catch (i) {
        console.error("Error adding to cart:", i);
    }
}
function Xi() {
    document.querySelectorAll('form[action*="/cart/add"]').forEach((t) => {
        t.removeEventListener("submit", vn), t.addEventListener("submit", vn, !0);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    function t() {
        Yi(), Xi();
    }
    const e = document.querySelectorAll("[data-filter-link]");
    e.forEach((s) => {
        s.addEventListener("click", async (i) => {
            i.preventDefault();
            const n = new URL(s.href, window.location.origin);
            n.searchParams.set("section_id", "collection");
            try {
                const a = await (await fetch(n.toString())).text(),
                    c = new DOMParser().parseFromString(a, "text/html").querySelector('[data-section-id="collection"]');
                if (c) {
                    const d = document.querySelector('[data-section-id="collection"]');
                    (d.innerHTML = c.innerHTML),
                        t(),
                        e.forEach((p) => p.classList.remove("active")),
                        s.classList.add("active"),
                        history.pushState({}, "", s.href);
                } else console.error("Collection section not found in response.");
            } catch (r) {
                console.error("Error updating collection:", r);
            }
        });
    }),
        t();
});
function wn(t) {
    return t !== null && typeof t == "object" && "constructor" in t && t.constructor === Object;
}
function Ui(t, e) {
    t === void 0 && (t = {}), e === void 0 && (e = {});
    const s = ["__proto__", "constructor", "prototype"];
    Object.keys(e)
        .filter((i) => s.indexOf(i) < 0)
        .forEach((i) => {
            typeof t[i] > "u" ? (t[i] = e[i]) : wn(e[i]) && wn(t[i]) && Object.keys(e[i]).length > 0 && Ui(t[i], e[i]);
        });
}
const nr = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector() {
        return null;
    },
    querySelectorAll() {
        return [];
    },
    getElementById() {
        return null;
    },
    createEvent() {
        return { initEvent() {} };
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName() {
                return [];
            },
        };
    },
    createElementNS() {
        return {};
    },
    importNode() {
        return null;
    },
    location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
};
function $e() {
    const t = typeof document < "u" ? document : {};
    return Ui(t, nr), t;
}
const Sa = {
    document: nr,
    navigator: { userAgent: "" },
    location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
        return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
        return {
            getPropertyValue() {
                return "";
            },
        };
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
        return {};
    },
    requestAnimationFrame(t) {
        return typeof setTimeout > "u" ? (t(), null) : setTimeout(t, 0);
    },
    cancelAnimationFrame(t) {
        typeof setTimeout > "u" || clearTimeout(t);
    },
};
function Ce() {
    const t = typeof window < "u" ? window : {};
    return Ui(t, Sa), t;
}
function Pt(t) {
    return (
        t === void 0 && (t = ""),
        t
            .trim()
            .split(" ")
            .filter((e) => !!e.trim())
    );
}
function xa(t) {
    const e = t;
    Object.keys(e).forEach((s) => {
        try {
            e[s] = null;
        } catch {}
        try {
            delete e[s];
        } catch {}
    });
}
function es(t, e) {
    return e === void 0 && (e = 0), setTimeout(t, e);
}
function it() {
    return Date.now();
}
function Ea(t) {
    const e = Ce();
    let s;
    return (
        e.getComputedStyle && (s = e.getComputedStyle(t, null)),
        !s && t.currentStyle && (s = t.currentStyle),
        s || (s = t.style),
        s
    );
}
function Ii(t, e) {
    e === void 0 && (e = "x");
    const s = Ce();
    let i, n, r;
    const a = Ea(t);
    return (
        s.WebKitCSSMatrix
            ? ((n = a.transform || a.webkitTransform),
              n.split(",").length > 6 &&
                  (n = n
                      .split(", ")
                      .map((o) => o.replace(",", "."))
                      .join(", ")),
              (r = new s.WebKitCSSMatrix(n === "none" ? "" : n)))
            : ((r =
                  a.MozTransform ||
                  a.OTransform ||
                  a.MsTransform ||
                  a.msTransform ||
                  a.transform ||
                  a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")),
              (i = r.toString().split(","))),
        e === "x" &&
            (s.WebKitCSSMatrix ? (n = r.m41) : i.length === 16 ? (n = parseFloat(i[12])) : (n = parseFloat(i[4]))),
        e === "y" &&
            (s.WebKitCSSMatrix ? (n = r.m42) : i.length === 16 ? (n = parseFloat(i[13])) : (n = parseFloat(i[5]))),
        n || 0
    );
}
function ls(t) {
    return (
        typeof t == "object" &&
        t !== null &&
        t.constructor &&
        Object.prototype.toString.call(t).slice(8, -1) === "Object"
    );
}
function Ta(t) {
    return typeof window < "u" && typeof window.HTMLElement < "u"
        ? t instanceof HTMLElement
        : t && (t.nodeType === 1 || t.nodeType === 11);
}
function Ke() {
    const t = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        e = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
        const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
        if (i != null && !Ta(i)) {
            const n = Object.keys(Object(i)).filter((r) => e.indexOf(r) < 0);
            for (let r = 0, a = n.length; r < a; r += 1) {
                const o = n[r],
                    l = Object.getOwnPropertyDescriptor(i, o);
                l !== void 0 &&
                    l.enumerable &&
                    (ls(t[o]) && ls(i[o])
                        ? i[o].__swiper__
                            ? (t[o] = i[o])
                            : Ke(t[o], i[o])
                        : !ls(t[o]) && ls(i[o])
                          ? ((t[o] = {}), i[o].__swiper__ ? (t[o] = i[o]) : Ke(t[o], i[o]))
                          : (t[o] = i[o]));
            }
        }
    }
    return t;
}
function cs(t, e, s) {
    t.style.setProperty(e, s);
}
function rr(t) {
    let { swiper: e, targetPosition: s, side: i } = t;
    const n = Ce(),
        r = -e.translate;
    let a = null,
        o;
    const l = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"), n.cancelAnimationFrame(e.cssModeFrameID);
    const c = s > r ? "next" : "prev",
        d = (g, m) => (c === "next" && g >= m) || (c === "prev" && g <= m),
        p = () => {
            (o = new Date().getTime()), a === null && (a = o);
            const g = Math.max(Math.min((o - a) / l, 1), 0),
                m = 0.5 - Math.cos(g * Math.PI) / 2;
            let u = r + m * (s - r);
            if ((d(u, s) && (u = s), e.wrapperEl.scrollTo({ [i]: u }), d(u, s))) {
                (e.wrapperEl.style.overflow = "hidden"),
                    (e.wrapperEl.style.scrollSnapType = ""),
                    setTimeout(() => {
                        (e.wrapperEl.style.overflow = ""), e.wrapperEl.scrollTo({ [i]: u });
                    }),
                    n.cancelAnimationFrame(e.cssModeFrameID);
                return;
            }
            e.cssModeFrameID = n.requestAnimationFrame(p);
        };
    p();
}
function jt(t) {
    return (
        t.querySelector(".swiper-slide-transform") ||
        (t.shadowRoot && t.shadowRoot.querySelector(".swiper-slide-transform")) ||
        t
    );
}
function ze(t, e) {
    e === void 0 && (e = "");
    const s = Ce(),
        i = [...t.children];
    return (
        s.HTMLSlotElement && t instanceof HTMLSlotElement && i.push(...t.assignedElements()),
        e ? i.filter((n) => n.matches(e)) : i
    );
}
function Ca(t, e) {
    const s = [e];
    for (; s.length > 0; ) {
        const i = s.shift();
        if (t === i) return !0;
        s.push(
            ...i.children,
            ...(i.shadowRoot ? i.shadowRoot.children : []),
            ...(i.assignedElements ? i.assignedElements() : [])
        );
    }
}
function _a(t, e) {
    const s = Ce();
    let i = e.contains(t);
    return (
        !i &&
            s.HTMLSlotElement &&
            e instanceof HTMLSlotElement &&
            ((i = [...e.assignedElements()].includes(t)), i || (i = Ca(t, e))),
        i
    );
}
function Gs(t) {
    try {
        console.warn(t);
        return;
    } catch {}
}
function Ze(t, e) {
    e === void 0 && (e = []);
    const s = document.createElement(t);
    return s.classList.add(...(Array.isArray(e) ? e : Pt(e))), s;
}
function Ws(t) {
    const e = Ce(),
        s = $e(),
        i = t.getBoundingClientRect(),
        n = s.body,
        r = t.clientTop || n.clientTop || 0,
        a = t.clientLeft || n.clientLeft || 0,
        o = t === e ? e.scrollY : t.scrollTop,
        l = t === e ? e.scrollX : t.scrollLeft;
    return { top: i.top + o - r, left: i.left + l - a };
}
function Ma(t, e) {
    const s = [];
    for (; t.previousElementSibling; ) {
        const i = t.previousElementSibling;
        e ? i.matches(e) && s.push(i) : s.push(i), (t = i);
    }
    return s;
}
function Pa(t, e) {
    const s = [];
    for (; t.nextElementSibling; ) {
        const i = t.nextElementSibling;
        e ? i.matches(e) && s.push(i) : s.push(i), (t = i);
    }
    return s;
}
function Ot(t, e) {
    return Ce().getComputedStyle(t, null).getPropertyValue(e);
}
function bs(t) {
    let e = t,
        s;
    if (e) {
        for (s = 0; (e = e.previousSibling) !== null; ) e.nodeType === 1 && (s += 1);
        return s;
    }
}
function Vt(t, e) {
    const s = [];
    let i = t.parentElement;
    for (; i; ) e ? i.matches(e) && s.push(i) : s.push(i), (i = i.parentElement);
    return s;
}
function us(t, e) {
    function s(i) {
        i.target === t && (e.call(t, i), t.removeEventListener("transitionend", s));
    }
    e && t.addEventListener("transitionend", s);
}
function Ai(t, e, s) {
    const i = Ce();
    return (
        t[e === "width" ? "offsetWidth" : "offsetHeight"] +
        parseFloat(i.getComputedStyle(t, null).getPropertyValue(e === "width" ? "margin-right" : "margin-top")) +
        parseFloat(i.getComputedStyle(t, null).getPropertyValue(e === "width" ? "margin-left" : "margin-bottom"))
    );
}
function fe(t) {
    return (Array.isArray(t) ? t : [t]).filter((e) => !!e);
}
function ei(t) {
    return (e) => (Math.abs(e) > 0 && t.browser && t.browser.need3dFix && Math.abs(e) % 90 === 0 ? e + 0.001 : e);
}
function Et(t, e) {
    e === void 0 && (e = ""),
        typeof trustedTypes < "u"
            ? (t.innerHTML = trustedTypes.createPolicy("html", { createHTML: (s) => s }).createHTML(e))
            : (t.innerHTML = e);
}
let mi;
function La() {
    const t = Ce(),
        e = $e();
    return {
        smoothScroll: e.documentElement && e.documentElement.style && "scrollBehavior" in e.documentElement.style,
        touch: !!("ontouchstart" in t || (t.DocumentTouch && e instanceof t.DocumentTouch)),
    };
}
function ar() {
    return mi || (mi = La()), mi;
}
let hi;
function Ia(t) {
    let { userAgent: e } = t === void 0 ? {} : t;
    const s = ar(),
        i = Ce(),
        n = i.navigator.platform,
        r = e || i.navigator.userAgent,
        a = { ios: !1, android: !1 },
        o = i.screen.width,
        l = i.screen.height,
        c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
    let d = r.match(/(iPad).*OS\s([\d_]+)/);
    const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
        g = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
        m = n === "Win32";
    let u = n === "MacIntel";
    const f = [
        "1024x1366",
        "1366x1024",
        "834x1194",
        "1194x834",
        "834x1112",
        "1112x834",
        "768x1024",
        "1024x768",
        "820x1180",
        "1180x820",
        "810x1080",
        "1080x810",
    ];
    return (
        !d &&
            u &&
            s.touch &&
            f.indexOf(`${o}x${l}`) >= 0 &&
            ((d = r.match(/(Version)\/([\d.]+)/)), d || (d = [0, 1, "13_0_0"]), (u = !1)),
        c && !m && ((a.os = "android"), (a.android = !0)),
        (d || g || p) && ((a.os = "ios"), (a.ios = !0)),
        a
    );
}
function or(t) {
    return t === void 0 && (t = {}), hi || (hi = Ia(t)), hi;
}
let gi;
function Aa() {
    const t = Ce(),
        e = or();
    let s = !1;
    function i() {
        const o = t.navigator.userAgent.toLowerCase();
        return o.indexOf("safari") >= 0 && o.indexOf("chrome") < 0 && o.indexOf("android") < 0;
    }
    if (i()) {
        const o = String(t.navigator.userAgent);
        if (o.includes("Version/")) {
            const [l, c] = o
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((d) => Number(d));
            s = l < 16 || (l === 16 && c < 2);
        }
    }
    const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent),
        r = i(),
        a = r || (n && e.ios);
    return { isSafari: s || r, needPerspectiveFix: s, need3dFix: a, isWebView: n };
}
function lr() {
    return gi || (gi = Aa()), gi;
}
function Oa(t) {
    let { swiper: e, on: s, emit: i } = t;
    const n = Ce();
    let r = null,
        a = null;
    const o = () => {
            !e || e.destroyed || !e.initialized || (i("beforeResize"), i("resize"));
        },
        l = () => {
            !e ||
                e.destroyed ||
                !e.initialized ||
                ((r = new ResizeObserver((p) => {
                    a = n.requestAnimationFrame(() => {
                        const { width: g, height: m } = e;
                        let u = g,
                            f = m;
                        p.forEach((w) => {
                            let { contentBoxSize: b, contentRect: h, target: v } = w;
                            (v && v !== e.el) ||
                                ((u = h ? h.width : (b[0] || b).inlineSize),
                                (f = h ? h.height : (b[0] || b).blockSize));
                        }),
                            (u !== g || f !== m) && o();
                    });
                })),
                r.observe(e.el));
        },
        c = () => {
            a && n.cancelAnimationFrame(a), r && r.unobserve && e.el && (r.unobserve(e.el), (r = null));
        },
        d = () => {
            !e || e.destroyed || !e.initialized || i("orientationchange");
        };
    s("init", () => {
        if (e.params.resizeObserver && typeof n.ResizeObserver < "u") {
            l();
            return;
        }
        n.addEventListener("resize", o), n.addEventListener("orientationchange", d);
    }),
        s("destroy", () => {
            c(), n.removeEventListener("resize", o), n.removeEventListener("orientationchange", d);
        });
}
function $a(t) {
    let { swiper: e, extendParams: s, on: i, emit: n } = t;
    const r = [],
        a = Ce(),
        o = function (d, p) {
            p === void 0 && (p = {});
            const g = a.MutationObserver || a.WebkitMutationObserver,
                m = new g((u) => {
                    if (e.__preventObserver__) return;
                    if (u.length === 1) {
                        n("observerUpdate", u[0]);
                        return;
                    }
                    const f = function () {
                        n("observerUpdate", u[0]);
                    };
                    a.requestAnimationFrame ? a.requestAnimationFrame(f) : a.setTimeout(f, 0);
                });
            m.observe(d, {
                attributes: typeof p.attributes > "u" ? !0 : p.attributes,
                childList: e.isElement || (typeof p.childList > "u" ? !0 : p).childList,
                characterData: typeof p.characterData > "u" ? !0 : p.characterData,
            }),
                r.push(m);
        },
        l = () => {
            if (e.params.observer) {
                if (e.params.observeParents) {
                    const d = Vt(e.hostEl);
                    for (let p = 0; p < d.length; p += 1) o(d[p]);
                }
                o(e.hostEl, { childList: e.params.observeSlideChildren }), o(e.wrapperEl, { attributes: !1 });
            }
        },
        c = () => {
            r.forEach((d) => {
                d.disconnect();
            }),
                r.splice(0, r.length);
        };
    s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }), i("init", l), i("destroy", c);
}
var ka = {
    on(t, e, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
        const n = s ? "unshift" : "push";
        return (
            t.split(" ").forEach((r) => {
                i.eventsListeners[r] || (i.eventsListeners[r] = []), i.eventsListeners[r][n](e);
            }),
            i
        );
    },
    once(t, e, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
        function n() {
            i.off(t, n), n.__emitterProxy && delete n.__emitterProxy;
            for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++) a[o] = arguments[o];
            e.apply(i, a);
        }
        return (n.__emitterProxy = e), i.on(t, n, s);
    },
    onAny(t, e) {
        const s = this;
        if (!s.eventsListeners || s.destroyed || typeof t != "function") return s;
        const i = e ? "unshift" : "push";
        return s.eventsAnyListeners.indexOf(t) < 0 && s.eventsAnyListeners[i](t), s;
    },
    offAny(t) {
        const e = this;
        if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
        const s = e.eventsAnyListeners.indexOf(t);
        return s >= 0 && e.eventsAnyListeners.splice(s, 1), e;
    },
    off(t, e) {
        const s = this;
        return (
            !s.eventsListeners ||
                s.destroyed ||
                !s.eventsListeners ||
                t.split(" ").forEach((i) => {
                    typeof e > "u"
                        ? (s.eventsListeners[i] = [])
                        : s.eventsListeners[i] &&
                          s.eventsListeners[i].forEach((n, r) => {
                              (n === e || (n.__emitterProxy && n.__emitterProxy === e)) &&
                                  s.eventsListeners[i].splice(r, 1);
                          });
                }),
            s
        );
    },
    emit() {
        const t = this;
        if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
        let e, s, i;
        for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
        return (
            typeof r[0] == "string" || Array.isArray(r[0])
                ? ((e = r[0]), (s = r.slice(1, r.length)), (i = t))
                : ((e = r[0].events), (s = r[0].data), (i = r[0].context || t)),
            s.unshift(i),
            (Array.isArray(e) ? e : e.split(" ")).forEach((l) => {
                t.eventsAnyListeners &&
                    t.eventsAnyListeners.length &&
                    t.eventsAnyListeners.forEach((c) => {
                        c.apply(i, [l, ...s]);
                    }),
                    t.eventsListeners &&
                        t.eventsListeners[l] &&
                        t.eventsListeners[l].forEach((c) => {
                            c.apply(i, s);
                        });
            }),
            t
        );
    },
};
function Da() {
    const t = this;
    let e, s;
    const i = t.el;
    typeof t.params.width < "u" && t.params.width !== null ? (e = t.params.width) : (e = i.clientWidth),
        typeof t.params.height < "u" && t.params.height !== null ? (s = t.params.height) : (s = i.clientHeight),
        !((e === 0 && t.isHorizontal()) || (s === 0 && t.isVertical())) &&
            ((e = e - parseInt(Ot(i, "padding-left") || 0, 10) - parseInt(Ot(i, "padding-right") || 0, 10)),
            (s = s - parseInt(Ot(i, "padding-top") || 0, 10) - parseInt(Ot(i, "padding-bottom") || 0, 10)),
            Number.isNaN(e) && (e = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(t, { width: e, height: s, size: t.isHorizontal() ? e : s }));
}
function za() {
    const t = this;
    function e(M, k) {
        return parseFloat(M.getPropertyValue(t.getDirectionLabel(k)) || 0);
    }
    const s = t.params,
        { wrapperEl: i, slidesEl: n, size: r, rtlTranslate: a, wrongRTL: o } = t,
        l = t.virtual && s.virtual.enabled,
        c = l ? t.virtual.slides.length : t.slides.length,
        d = ze(n, `.${t.params.slideClass}, swiper-slide`),
        p = l ? t.virtual.slides.length : d.length;
    let g = [];
    const m = [],
        u = [];
    let f = s.slidesOffsetBefore;
    typeof f == "function" && (f = s.slidesOffsetBefore.call(t));
    let w = s.slidesOffsetAfter;
    typeof w == "function" && (w = s.slidesOffsetAfter.call(t));
    const b = t.snapGrid.length,
        h = t.slidesGrid.length;
    let v = s.spaceBetween,
        y = -f,
        E = 0,
        L = 0;
    if (typeof r > "u") return;
    typeof v == "string" && v.indexOf("%") >= 0
        ? (v = (parseFloat(v.replace("%", "")) / 100) * r)
        : typeof v == "string" && (v = parseFloat(v)),
        (t.virtualSize = -v),
        d.forEach((M) => {
            a ? (M.style.marginLeft = "") : (M.style.marginRight = ""),
                (M.style.marginBottom = ""),
                (M.style.marginTop = "");
        }),
        s.centeredSlides &&
            s.cssMode &&
            (cs(i, "--swiper-centered-offset-before", ""), cs(i, "--swiper-centered-offset-after", ""));
    const P = s.grid && s.grid.rows > 1 && t.grid;
    P ? t.grid.initSlides(d) : t.grid && t.grid.unsetSlides();
    let A;
    const _ =
        s.slidesPerView === "auto" &&
        s.breakpoints &&
        Object.keys(s.breakpoints).filter((M) => typeof s.breakpoints[M].slidesPerView < "u").length > 0;
    for (let M = 0; M < p; M += 1) {
        A = 0;
        let k;
        if ((d[M] && (k = d[M]), P && t.grid.updateSlide(M, k, d), !(d[M] && Ot(k, "display") === "none"))) {
            if (s.slidesPerView === "auto") {
                _ && (d[M].style[t.getDirectionLabel("width")] = "");
                const O = getComputedStyle(k),
                    $ = k.style.transform,
                    D = k.style.webkitTransform;
                if (($ && (k.style.transform = "none"), D && (k.style.webkitTransform = "none"), s.roundLengths))
                    A = t.isHorizontal() ? Ai(k, "width") : Ai(k, "height");
                else {
                    const q = e(O, "width"),
                        H = e(O, "padding-left"),
                        T = e(O, "padding-right"),
                        C = e(O, "margin-left"),
                        G = e(O, "margin-right"),
                        ae = O.getPropertyValue("box-sizing");
                    if (ae && ae === "border-box") A = q + C + G;
                    else {
                        const { clientWidth: me, offsetWidth: ge } = k;
                        A = q + H + T + C + G + (ge - me);
                    }
                }
                $ && (k.style.transform = $), D && (k.style.webkitTransform = D), s.roundLengths && (A = Math.floor(A));
            } else
                (A = (r - (s.slidesPerView - 1) * v) / s.slidesPerView),
                    s.roundLengths && (A = Math.floor(A)),
                    d[M] && (d[M].style[t.getDirectionLabel("width")] = "100%");
            d[M] && (d[M].swiperSlideSize = A),
                u.push(A),
                s.centeredSlides
                    ? ((y = y + A / 2 + E / 2 + v),
                      E === 0 && M !== 0 && (y = y - r / 2 - v),
                      M === 0 && (y = y - r / 2 - v),
                      Math.abs(y) < 1 / 1e3 && (y = 0),
                      s.roundLengths && (y = Math.floor(y)),
                      L % s.slidesPerGroup === 0 && g.push(y),
                      m.push(y))
                    : (s.roundLengths && (y = Math.floor(y)),
                      (L - Math.min(t.params.slidesPerGroupSkip, L)) % t.params.slidesPerGroup === 0 && g.push(y),
                      m.push(y),
                      (y = y + A + v)),
                (t.virtualSize += A + v),
                (E = A),
                (L += 1);
        }
    }
    if (
        ((t.virtualSize = Math.max(t.virtualSize, r) + w),
        a && o && (s.effect === "slide" || s.effect === "coverflow") && (i.style.width = `${t.virtualSize + v}px`),
        s.setWrapperSize && (i.style[t.getDirectionLabel("width")] = `${t.virtualSize + v}px`),
        P && t.grid.updateWrapperSize(A, g),
        !s.centeredSlides)
    ) {
        const M = [];
        for (let k = 0; k < g.length; k += 1) {
            let O = g[k];
            s.roundLengths && (O = Math.floor(O)), g[k] <= t.virtualSize - r && M.push(O);
        }
        (g = M), Math.floor(t.virtualSize - r) - Math.floor(g[g.length - 1]) > 1 && g.push(t.virtualSize - r);
    }
    if (l && s.loop) {
        const M = u[0] + v;
        if (s.slidesPerGroup > 1) {
            const k = Math.ceil((t.virtual.slidesBefore + t.virtual.slidesAfter) / s.slidesPerGroup),
                O = M * s.slidesPerGroup;
            for (let $ = 0; $ < k; $ += 1) g.push(g[g.length - 1] + O);
        }
        for (let k = 0; k < t.virtual.slidesBefore + t.virtual.slidesAfter; k += 1)
            s.slidesPerGroup === 1 && g.push(g[g.length - 1] + M), m.push(m[m.length - 1] + M), (t.virtualSize += M);
    }
    if ((g.length === 0 && (g = [0]), v !== 0)) {
        const M = t.isHorizontal() && a ? "marginLeft" : t.getDirectionLabel("marginRight");
        d.filter((k, O) => (!s.cssMode || s.loop ? !0 : O !== d.length - 1)).forEach((k) => {
            k.style[M] = `${v}px`;
        });
    }
    if (s.centeredSlides && s.centeredSlidesBounds) {
        let M = 0;
        u.forEach((O) => {
            M += O + (v || 0);
        }),
            (M -= v);
        const k = M > r ? M - r : 0;
        g = g.map((O) => (O <= 0 ? -f : O > k ? k + w : O));
    }
    if (s.centerInsufficientSlides) {
        let M = 0;
        u.forEach((O) => {
            M += O + (v || 0);
        }),
            (M -= v);
        const k = (s.slidesOffsetBefore || 0) + (s.slidesOffsetAfter || 0);
        if (M + k < r) {
            const O = (r - M - k) / 2;
            g.forEach(($, D) => {
                g[D] = $ - O;
            }),
                m.forEach(($, D) => {
                    m[D] = $ + O;
                });
        }
    }
    if (
        (Object.assign(t, { slides: d, snapGrid: g, slidesGrid: m, slidesSizesGrid: u }),
        s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
    ) {
        cs(i, "--swiper-centered-offset-before", `${-g[0]}px`),
            cs(i, "--swiper-centered-offset-after", `${t.size / 2 - u[u.length - 1] / 2}px`);
        const M = -t.snapGrid[0],
            k = -t.slidesGrid[0];
        (t.snapGrid = t.snapGrid.map((O) => O + M)), (t.slidesGrid = t.slidesGrid.map((O) => O + k));
    }
    if (
        (p !== c && t.emit("slidesLengthChange"),
        g.length !== b && (t.params.watchOverflow && t.checkOverflow(), t.emit("snapGridLengthChange")),
        m.length !== h && t.emit("slidesGridLengthChange"),
        s.watchSlidesProgress && t.updateSlidesOffset(),
        t.emit("slidesUpdated"),
        !l && !s.cssMode && (s.effect === "slide" || s.effect === "fade"))
    ) {
        const M = `${s.containerModifierClass}backface-hidden`,
            k = t.el.classList.contains(M);
        p <= s.maxBackfaceHiddenSlides ? k || t.el.classList.add(M) : k && t.el.classList.remove(M);
    }
}
function Ha(t) {
    const e = this,
        s = [],
        i = e.virtual && e.params.virtual.enabled;
    let n = 0,
        r;
    typeof t == "number" ? e.setTransition(t) : t === !0 && e.setTransition(e.params.speed);
    const a = (o) => (i ? e.slides[e.getSlideIndexByData(o)] : e.slides[o]);
    if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
        if (e.params.centeredSlides)
            (e.visibleSlides || []).forEach((o) => {
                s.push(o);
            });
        else
            for (r = 0; r < Math.ceil(e.params.slidesPerView); r += 1) {
                const o = e.activeIndex + r;
                if (o > e.slides.length && !i) break;
                s.push(a(o));
            }
    else s.push(a(e.activeIndex));
    for (r = 0; r < s.length; r += 1)
        if (typeof s[r] < "u") {
            const o = s[r].offsetHeight;
            n = o > n ? o : n;
        }
    (n || n === 0) && (e.wrapperEl.style.height = `${n}px`);
}
function Ra() {
    const t = this,
        e = t.slides,
        s = t.isElement ? (t.isHorizontal() ? t.wrapperEl.offsetLeft : t.wrapperEl.offsetTop) : 0;
    for (let i = 0; i < e.length; i += 1)
        e[i].swiperSlideOffset = (t.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) - s - t.cssOverflowAdjustment();
}
const yn = (t, e, s) => {
    e && !t.classList.contains(s) ? t.classList.add(s) : !e && t.classList.contains(s) && t.classList.remove(s);
};
function Fa(t) {
    t === void 0 && (t = (this && this.translate) || 0);
    const e = this,
        s = e.params,
        { slides: i, rtlTranslate: n, snapGrid: r } = e;
    if (i.length === 0) return;
    typeof i[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
    let a = -t;
    n && (a = t), (e.visibleSlidesIndexes = []), (e.visibleSlides = []);
    let o = s.spaceBetween;
    typeof o == "string" && o.indexOf("%") >= 0
        ? (o = (parseFloat(o.replace("%", "")) / 100) * e.size)
        : typeof o == "string" && (o = parseFloat(o));
    for (let l = 0; l < i.length; l += 1) {
        const c = i[l];
        let d = c.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
        const p = (a + (s.centeredSlides ? e.minTranslate() : 0) - d) / (c.swiperSlideSize + o),
            g = (a - r[0] + (s.centeredSlides ? e.minTranslate() : 0) - d) / (c.swiperSlideSize + o),
            m = -(a - d),
            u = m + e.slidesSizesGrid[l],
            f = m >= 0 && m <= e.size - e.slidesSizesGrid[l],
            w = (m >= 0 && m < e.size - 1) || (u > 1 && u <= e.size) || (m <= 0 && u >= e.size);
        w && (e.visibleSlides.push(c), e.visibleSlidesIndexes.push(l)),
            yn(c, w, s.slideVisibleClass),
            yn(c, f, s.slideFullyVisibleClass),
            (c.progress = n ? -p : p),
            (c.originalProgress = n ? -g : g);
    }
}
function Ba(t) {
    const e = this;
    if (typeof t > "u") {
        const d = e.rtlTranslate ? -1 : 1;
        t = (e && e.translate && e.translate * d) || 0;
    }
    const s = e.params,
        i = e.maxTranslate() - e.minTranslate();
    let { progress: n, isBeginning: r, isEnd: a, progressLoop: o } = e;
    const l = r,
        c = a;
    if (i === 0) (n = 0), (r = !0), (a = !0);
    else {
        n = (t - e.minTranslate()) / i;
        const d = Math.abs(t - e.minTranslate()) < 1,
            p = Math.abs(t - e.maxTranslate()) < 1;
        (r = d || n <= 0), (a = p || n >= 1), d && (n = 0), p && (n = 1);
    }
    if (s.loop) {
        const d = e.getSlideIndexByData(0),
            p = e.getSlideIndexByData(e.slides.length - 1),
            g = e.slidesGrid[d],
            m = e.slidesGrid[p],
            u = e.slidesGrid[e.slidesGrid.length - 1],
            f = Math.abs(t);
        f >= g ? (o = (f - g) / u) : (o = (f + u - m) / u), o > 1 && (o -= 1);
    }
    Object.assign(e, { progress: n, progressLoop: o, isBeginning: r, isEnd: a }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) && e.updateSlidesProgress(t),
        r && !l && e.emit("reachBeginning toEdge"),
        a && !c && e.emit("reachEnd toEdge"),
        ((l && !r) || (c && !a)) && e.emit("fromEdge"),
        e.emit("progress", n);
}
const vi = (t, e, s) => {
    e && !t.classList.contains(s) ? t.classList.add(s) : !e && t.classList.contains(s) && t.classList.remove(s);
};
function Va() {
    const t = this,
        { slides: e, params: s, slidesEl: i, activeIndex: n } = t,
        r = t.virtual && s.virtual.enabled,
        a = t.grid && s.grid && s.grid.rows > 1,
        o = (p) => ze(i, `.${s.slideClass}${p}, swiper-slide${p}`)[0];
    let l, c, d;
    if (r)
        if (s.loop) {
            let p = n - t.virtual.slidesBefore;
            p < 0 && (p = t.virtual.slides.length + p),
                p >= t.virtual.slides.length && (p -= t.virtual.slides.length),
                (l = o(`[data-swiper-slide-index="${p}"]`));
        } else l = o(`[data-swiper-slide-index="${n}"]`);
    else
        a
            ? ((l = e.find((p) => p.column === n)),
              (d = e.find((p) => p.column === n + 1)),
              (c = e.find((p) => p.column === n - 1)))
            : (l = e[n]);
    l &&
        (a ||
            ((d = Pa(l, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && !d && (d = e[0]),
            (c = Ma(l, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && !c === 0 && (c = e[e.length - 1]))),
        e.forEach((p) => {
            vi(p, p === l, s.slideActiveClass), vi(p, p === d, s.slideNextClass), vi(p, p === c, s.slidePrevClass);
        }),
        t.emitSlidesClasses();
}
const Rs = (t, e) => {
        if (!t || t.destroyed || !t.params) return;
        const s = () => (t.isElement ? "swiper-slide" : `.${t.params.slideClass}`),
            i = e.closest(s());
        if (i) {
            let n = i.querySelector(`.${t.params.lazyPreloaderClass}`);
            !n &&
                t.isElement &&
                (i.shadowRoot
                    ? (n = i.shadowRoot.querySelector(`.${t.params.lazyPreloaderClass}`))
                    : requestAnimationFrame(() => {
                          i.shadowRoot &&
                              ((n = i.shadowRoot.querySelector(`.${t.params.lazyPreloaderClass}`)), n && n.remove());
                      })),
                n && n.remove();
        }
    },
    wi = (t, e) => {
        if (!t.slides[e]) return;
        const s = t.slides[e].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading");
    },
    Oi = (t) => {
        if (!t || t.destroyed || !t.params) return;
        let e = t.params.lazyPreloadPrevNext;
        const s = t.slides.length;
        if (!s || !e || e < 0) return;
        e = Math.min(e, s);
        const i = t.params.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(t.params.slidesPerView),
            n = t.activeIndex;
        if (t.params.grid && t.params.grid.rows > 1) {
            const a = n,
                o = [a - e];
            o.push(...Array.from({ length: e }).map((l, c) => a + i + c)),
                t.slides.forEach((l, c) => {
                    o.includes(l.column) && wi(t, c);
                });
            return;
        }
        const r = n + i - 1;
        if (t.params.rewind || t.params.loop)
            for (let a = n - e; a <= r + e; a += 1) {
                const o = ((a % s) + s) % s;
                (o < n || o > r) && wi(t, o);
            }
        else
            for (let a = Math.max(n - e, 0); a <= Math.min(r + e, s - 1); a += 1)
                a !== n && (a > r || a < n) && wi(t, a);
    };
function Na(t) {
    const { slidesGrid: e, params: s } = t,
        i = t.rtlTranslate ? t.translate : -t.translate;
    let n;
    for (let r = 0; r < e.length; r += 1)
        typeof e[r + 1] < "u"
            ? i >= e[r] && i < e[r + 1] - (e[r + 1] - e[r]) / 2
                ? (n = r)
                : i >= e[r] && i < e[r + 1] && (n = r + 1)
            : i >= e[r] && (n = r);
    return s.normalizeSlideIndex && (n < 0 || typeof n > "u") && (n = 0), n;
}
function qa(t) {
    const e = this,
        s = e.rtlTranslate ? e.translate : -e.translate,
        { snapGrid: i, params: n, activeIndex: r, realIndex: a, snapIndex: o } = e;
    let l = t,
        c;
    const d = (m) => {
        let u = m - e.virtual.slidesBefore;
        return (
            u < 0 && (u = e.virtual.slides.length + u),
            u >= e.virtual.slides.length && (u -= e.virtual.slides.length),
            u
        );
    };
    if ((typeof l > "u" && (l = Na(e)), i.indexOf(s) >= 0)) c = i.indexOf(s);
    else {
        const m = Math.min(n.slidesPerGroupSkip, l);
        c = m + Math.floor((l - m) / n.slidesPerGroup);
    }
    if ((c >= i.length && (c = i.length - 1), l === r && !e.params.loop)) {
        c !== o && ((e.snapIndex = c), e.emit("snapIndexChange"));
        return;
    }
    if (l === r && e.params.loop && e.virtual && e.params.virtual.enabled) {
        e.realIndex = d(l);
        return;
    }
    const p = e.grid && n.grid && n.grid.rows > 1;
    let g;
    if (e.virtual && n.virtual.enabled && n.loop) g = d(l);
    else if (p) {
        const m = e.slides.find((f) => f.column === l);
        let u = parseInt(m.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(u) && (u = Math.max(e.slides.indexOf(m), 0)), (g = Math.floor(u / n.grid.rows));
    } else if (e.slides[l]) {
        const m = e.slides[l].getAttribute("data-swiper-slide-index");
        m ? (g = parseInt(m, 10)) : (g = l);
    } else g = l;
    Object.assign(e, {
        previousSnapIndex: o,
        snapIndex: c,
        previousRealIndex: a,
        realIndex: g,
        previousIndex: r,
        activeIndex: l,
    }),
        e.initialized && Oi(e),
        e.emit("activeIndexChange"),
        e.emit("snapIndexChange"),
        (e.initialized || e.params.runCallbacksOnInit) && (a !== g && e.emit("realIndexChange"), e.emit("slideChange"));
}
function ja(t, e) {
    const s = this,
        i = s.params;
    let n = t.closest(`.${i.slideClass}, swiper-slide`);
    !n &&
        s.isElement &&
        e &&
        e.length > 1 &&
        e.includes(t) &&
        [...e.slice(e.indexOf(t) + 1, e.length)].forEach((o) => {
            !n && o.matches && o.matches(`.${i.slideClass}, swiper-slide`) && (n = o);
        });
    let r = !1,
        a;
    if (n) {
        for (let o = 0; o < s.slides.length; o += 1)
            if (s.slides[o] === n) {
                (r = !0), (a = o);
                break;
            }
    }
    if (n && r)
        (s.clickedSlide = n),
            s.virtual && s.params.virtual.enabled
                ? (s.clickedIndex = parseInt(n.getAttribute("data-swiper-slide-index"), 10))
                : (s.clickedIndex = a);
    else {
        (s.clickedSlide = void 0), (s.clickedIndex = void 0);
        return;
    }
    i.slideToClickedSlide && s.clickedIndex !== void 0 && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide();
}
var Ga = {
    updateSize: Da,
    updateSlides: za,
    updateAutoHeight: Ha,
    updateSlidesOffset: Ra,
    updateSlidesProgress: Fa,
    updateProgress: Ba,
    updateSlidesClasses: Va,
    updateActiveIndex: qa,
    updateClickedSlide: ja,
};
function Wa(t) {
    t === void 0 && (t = this.isHorizontal() ? "x" : "y");
    const e = this,
        { params: s, rtlTranslate: i, translate: n, wrapperEl: r } = e;
    if (s.virtualTranslate) return i ? -n : n;
    if (s.cssMode) return n;
    let a = Ii(r, t);
    return (a += e.cssOverflowAdjustment()), i && (a = -a), a || 0;
}
function Ya(t, e) {
    const s = this,
        { rtlTranslate: i, params: n, wrapperEl: r, progress: a } = s;
    let o = 0,
        l = 0;
    const c = 0;
    s.isHorizontal() ? (o = i ? -t : t) : (l = t),
        n.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? o : l),
        n.cssMode
            ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -l)
            : n.virtualTranslate ||
              (s.isHorizontal() ? (o -= s.cssOverflowAdjustment()) : (l -= s.cssOverflowAdjustment()),
              (r.style.transform = `translate3d(${o}px, ${l}px, ${c}px)`));
    let d;
    const p = s.maxTranslate() - s.minTranslate();
    p === 0 ? (d = 0) : (d = (t - s.minTranslate()) / p),
        d !== a && s.updateProgress(t),
        s.emit("setTranslate", s.translate, e);
}
function Xa() {
    return -this.snapGrid[0];
}
function Ua() {
    return -this.snapGrid[this.snapGrid.length - 1];
}
function Ka(t, e, s, i, n) {
    t === void 0 && (t = 0),
        e === void 0 && (e = this.params.speed),
        s === void 0 && (s = !0),
        i === void 0 && (i = !0);
    const r = this,
        { params: a, wrapperEl: o } = r;
    if (r.animating && a.preventInteractionOnTransition) return !1;
    const l = r.minTranslate(),
        c = r.maxTranslate();
    let d;
    if ((i && t > l ? (d = l) : i && t < c ? (d = c) : (d = t), r.updateProgress(d), a.cssMode)) {
        const p = r.isHorizontal();
        if (e === 0) o[p ? "scrollLeft" : "scrollTop"] = -d;
        else {
            if (!r.support.smoothScroll) return rr({ swiper: r, targetPosition: -d, side: p ? "left" : "top" }), !0;
            o.scrollTo({ [p ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
    }
    return (
        e === 0
            ? (r.setTransition(0),
              r.setTranslate(d),
              s && (r.emit("beforeTransitionStart", e, n), r.emit("transitionEnd")))
            : (r.setTransition(e),
              r.setTranslate(d),
              s && (r.emit("beforeTransitionStart", e, n), r.emit("transitionStart")),
              r.animating ||
                  ((r.animating = !0),
                  r.onTranslateToWrapperTransitionEnd ||
                      (r.onTranslateToWrapperTransitionEnd = function (g) {
                          !r ||
                              r.destroyed ||
                              (g.target === this &&
                                  (r.wrapperEl.removeEventListener(
                                      "transitionend",
                                      r.onTranslateToWrapperTransitionEnd
                                  ),
                                  (r.onTranslateToWrapperTransitionEnd = null),
                                  delete r.onTranslateToWrapperTransitionEnd,
                                  (r.animating = !1),
                                  s && r.emit("transitionEnd")));
                      }),
                  r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))),
        !0
    );
}
var Za = { getTranslate: Wa, setTranslate: Ya, minTranslate: Xa, maxTranslate: Ua, translateTo: Ka };
function Ja(t, e) {
    const s = this;
    s.params.cssMode ||
        ((s.wrapperEl.style.transitionDuration = `${t}ms`), (s.wrapperEl.style.transitionDelay = t === 0 ? "0ms" : "")),
        s.emit("setTransition", t, e);
}
function cr(t) {
    let { swiper: e, runCallbacks: s, direction: i, step: n } = t;
    const { activeIndex: r, previousIndex: a } = e;
    let o = i;
    o || (r > a ? (o = "next") : r < a ? (o = "prev") : (o = "reset")),
        e.emit(`transition${n}`),
        s && o === "reset"
            ? e.emit(`slideResetTransition${n}`)
            : s &&
              r !== a &&
              (e.emit(`slideChangeTransition${n}`),
              o === "next" ? e.emit(`slideNextTransition${n}`) : e.emit(`slidePrevTransition${n}`));
}
function Qa(t, e) {
    t === void 0 && (t = !0);
    const s = this,
        { params: i } = s;
    i.cssMode ||
        (i.autoHeight && s.updateAutoHeight(), cr({ swiper: s, runCallbacks: t, direction: e, step: "Start" }));
}
function eo(t, e) {
    t === void 0 && (t = !0);
    const s = this,
        { params: i } = s;
    (s.animating = !1),
        !i.cssMode && (s.setTransition(0), cr({ swiper: s, runCallbacks: t, direction: e, step: "End" }));
}
var to = { setTransition: Ja, transitionStart: Qa, transitionEnd: eo };
function so(t, e, s, i, n) {
    t === void 0 && (t = 0), s === void 0 && (s = !0), typeof t == "string" && (t = parseInt(t, 10));
    const r = this;
    let a = t;
    a < 0 && (a = 0);
    const {
        params: o,
        snapGrid: l,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: p,
        rtlTranslate: g,
        wrapperEl: m,
        enabled: u,
    } = r;
    if ((!u && !i && !n) || r.destroyed || (r.animating && o.preventInteractionOnTransition)) return !1;
    typeof e > "u" && (e = r.params.speed);
    const f = Math.min(r.params.slidesPerGroupSkip, a);
    let w = f + Math.floor((a - f) / r.params.slidesPerGroup);
    w >= l.length && (w = l.length - 1);
    const b = -l[w];
    if (o.normalizeSlideIndex)
        for (let P = 0; P < c.length; P += 1) {
            const A = -Math.floor(b * 100),
                _ = Math.floor(c[P] * 100),
                M = Math.floor(c[P + 1] * 100);
            typeof c[P + 1] < "u"
                ? A >= _ && A < M - (M - _) / 2
                    ? (a = P)
                    : A >= _ && A < M && (a = P + 1)
                : A >= _ && (a = P);
        }
    if (
        r.initialized &&
        a !== p &&
        ((!r.allowSlideNext &&
            (g ? b > r.translate && b > r.minTranslate() : b < r.translate && b < r.minTranslate())) ||
            (!r.allowSlidePrev && b > r.translate && b > r.maxTranslate() && (p || 0) !== a))
    )
        return !1;
    a !== (d || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(b);
    let h;
    a > p ? (h = "next") : a < p ? (h = "prev") : (h = "reset");
    const v = r.virtual && r.params.virtual.enabled;
    if (!(v && n) && ((g && -b === r.translate) || (!g && b === r.translate)))
        return (
            r.updateActiveIndex(a),
            o.autoHeight && r.updateAutoHeight(),
            r.updateSlidesClasses(),
            o.effect !== "slide" && r.setTranslate(b),
            h !== "reset" && (r.transitionStart(s, h), r.transitionEnd(s, h)),
            !1
        );
    if (o.cssMode) {
        const P = r.isHorizontal(),
            A = g ? b : -b;
        if (e === 0)
            v && ((r.wrapperEl.style.scrollSnapType = "none"), (r._immediateVirtual = !0)),
                v && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
                    ? ((r._cssModeVirtualInitialSet = !0),
                      requestAnimationFrame(() => {
                          m[P ? "scrollLeft" : "scrollTop"] = A;
                      }))
                    : (m[P ? "scrollLeft" : "scrollTop"] = A),
                v &&
                    requestAnimationFrame(() => {
                        (r.wrapperEl.style.scrollSnapType = ""), (r._immediateVirtual = !1);
                    });
        else {
            if (!r.support.smoothScroll) return rr({ swiper: r, targetPosition: A, side: P ? "left" : "top" }), !0;
            m.scrollTo({ [P ? "left" : "top"]: A, behavior: "smooth" });
        }
        return !0;
    }
    const L = lr().isSafari;
    return (
        v && !n && L && r.isElement && r.virtual.update(!1, !1, a),
        r.setTransition(e),
        r.setTranslate(b),
        r.updateActiveIndex(a),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", e, i),
        r.transitionStart(s, h),
        e === 0
            ? r.transitionEnd(s, h)
            : r.animating ||
              ((r.animating = !0),
              r.onSlideToWrapperTransitionEnd ||
                  (r.onSlideToWrapperTransitionEnd = function (A) {
                      !r ||
                          r.destroyed ||
                          (A.target === this &&
                              (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                              (r.onSlideToWrapperTransitionEnd = null),
                              delete r.onSlideToWrapperTransitionEnd,
                              r.transitionEnd(s, h)));
                  }),
              r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)),
        !0
    );
}
function io(t, e, s, i) {
    t === void 0 && (t = 0), s === void 0 && (s = !0), typeof t == "string" && (t = parseInt(t, 10));
    const n = this;
    if (n.destroyed) return;
    typeof e > "u" && (e = n.params.speed);
    const r = n.grid && n.params.grid && n.params.grid.rows > 1;
    let a = t;
    if (n.params.loop)
        if (n.virtual && n.params.virtual.enabled) a = a + n.virtual.slidesBefore;
        else {
            let o;
            if (r) {
                const g = a * n.params.grid.rows;
                o = n.slides.find((m) => m.getAttribute("data-swiper-slide-index") * 1 === g).column;
            } else o = n.getSlideIndexByData(a);
            const l = r ? Math.ceil(n.slides.length / n.params.grid.rows) : n.slides.length,
                { centeredSlides: c } = n.params;
            let d = n.params.slidesPerView;
            d === "auto"
                ? (d = n.slidesPerViewDynamic())
                : ((d = Math.ceil(parseFloat(n.params.slidesPerView, 10))), c && d % 2 === 0 && (d = d + 1));
            let p = l - o < d;
            if (
                (c && (p = p || o < Math.ceil(d / 2)), i && c && n.params.slidesPerView !== "auto" && !r && (p = !1), p)
            ) {
                const g = c
                    ? o < n.activeIndex
                        ? "prev"
                        : "next"
                    : o - n.activeIndex - 1 < n.params.slidesPerView
                      ? "next"
                      : "prev";
                n.loopFix({
                    direction: g,
                    slideTo: !0,
                    activeSlideIndex: g === "next" ? o + 1 : o - l + 1,
                    slideRealIndex: g === "next" ? n.realIndex : void 0,
                });
            }
            if (r) {
                const g = a * n.params.grid.rows;
                a = n.slides.find((m) => m.getAttribute("data-swiper-slide-index") * 1 === g).column;
            } else a = n.getSlideIndexByData(a);
        }
    return (
        requestAnimationFrame(() => {
            n.slideTo(a, e, s, i);
        }),
        n
    );
}
function no(t, e, s) {
    e === void 0 && (e = !0);
    const i = this,
        { enabled: n, params: r, animating: a } = i;
    if (!n || i.destroyed) return i;
    typeof t > "u" && (t = i.params.speed);
    let o = r.slidesPerGroup;
    r.slidesPerView === "auto" &&
        r.slidesPerGroup === 1 &&
        r.slidesPerGroupAuto &&
        (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
    const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : o,
        c = i.virtual && r.virtual.enabled;
    if (r.loop) {
        if (a && !c && r.loopPreventsSliding) return !1;
        if (
            (i.loopFix({ direction: "next" }),
            (i._clientLeft = i.wrapperEl.clientLeft),
            i.activeIndex === i.slides.length - 1 && r.cssMode)
        )
            return (
                requestAnimationFrame(() => {
                    i.slideTo(i.activeIndex + l, t, e, s);
                }),
                !0
            );
    }
    return r.rewind && i.isEnd ? i.slideTo(0, t, e, s) : i.slideTo(i.activeIndex + l, t, e, s);
}
function ro(t, e, s) {
    e === void 0 && (e = !0);
    const i = this,
        { params: n, snapGrid: r, slidesGrid: a, rtlTranslate: o, enabled: l, animating: c } = i;
    if (!l || i.destroyed) return i;
    typeof t > "u" && (t = i.params.speed);
    const d = i.virtual && n.virtual.enabled;
    if (n.loop) {
        if (c && !d && n.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }), (i._clientLeft = i.wrapperEl.clientLeft);
    }
    const p = o ? i.translate : -i.translate;
    function g(h) {
        return h < 0 ? -Math.floor(Math.abs(h)) : Math.floor(h);
    }
    const m = g(p),
        u = r.map((h) => g(h)),
        f = n.freeMode && n.freeMode.enabled;
    let w = r[u.indexOf(m) - 1];
    if (typeof w > "u" && (n.cssMode || f)) {
        let h;
        r.forEach((v, y) => {
            m >= v && (h = y);
        }),
            typeof h < "u" && (w = f ? r[h] : r[h > 0 ? h - 1 : h]);
    }
    let b = 0;
    if (
        (typeof w < "u" &&
            ((b = a.indexOf(w)),
            b < 0 && (b = i.activeIndex - 1),
            n.slidesPerView === "auto" &&
                n.slidesPerGroup === 1 &&
                n.slidesPerGroupAuto &&
                ((b = b - i.slidesPerViewDynamic("previous", !0) + 1), (b = Math.max(b, 0)))),
        n.rewind && i.isBeginning)
    ) {
        const h =
            i.params.virtual && i.params.virtual.enabled && i.virtual
                ? i.virtual.slides.length - 1
                : i.slides.length - 1;
        return i.slideTo(h, t, e, s);
    } else if (n.loop && i.activeIndex === 0 && n.cssMode)
        return (
            requestAnimationFrame(() => {
                i.slideTo(b, t, e, s);
            }),
            !0
        );
    return i.slideTo(b, t, e, s);
}
function ao(t, e, s) {
    e === void 0 && (e = !0);
    const i = this;
    if (!i.destroyed) return typeof t > "u" && (t = i.params.speed), i.slideTo(i.activeIndex, t, e, s);
}
function oo(t, e, s, i) {
    e === void 0 && (e = !0), i === void 0 && (i = 0.5);
    const n = this;
    if (n.destroyed) return;
    typeof t > "u" && (t = n.params.speed);
    let r = n.activeIndex;
    const a = Math.min(n.params.slidesPerGroupSkip, r),
        o = a + Math.floor((r - a) / n.params.slidesPerGroup),
        l = n.rtlTranslate ? n.translate : -n.translate;
    if (l >= n.snapGrid[o]) {
        const c = n.snapGrid[o],
            d = n.snapGrid[o + 1];
        l - c > (d - c) * i && (r += n.params.slidesPerGroup);
    } else {
        const c = n.snapGrid[o - 1],
            d = n.snapGrid[o];
        l - c <= (d - c) * i && (r -= n.params.slidesPerGroup);
    }
    return (r = Math.max(r, 0)), (r = Math.min(r, n.slidesGrid.length - 1)), n.slideTo(r, t, e, s);
}
function lo() {
    const t = this;
    if (t.destroyed) return;
    const { params: e, slidesEl: s } = t,
        i = e.slidesPerView === "auto" ? t.slidesPerViewDynamic() : e.slidesPerView;
    let n = t.getSlideIndexWhenGrid(t.clickedIndex),
        r;
    const a = t.isElement ? "swiper-slide" : `.${e.slideClass}`,
        o = t.grid && t.params.grid && t.params.grid.rows > 1;
    if (e.loop) {
        if (t.animating) return;
        (r = parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
            e.centeredSlides
                ? t.slideToLoop(r)
                : n > (o ? (t.slides.length - i) / 2 - (t.params.grid.rows - 1) : t.slides.length - i)
                  ? (t.loopFix(),
                    (n = t.getSlideIndex(ze(s, `${a}[data-swiper-slide-index="${r}"]`)[0])),
                    es(() => {
                        t.slideTo(n);
                    }))
                  : t.slideTo(n);
    } else t.slideTo(n);
}
var co = {
    slideTo: so,
    slideToLoop: io,
    slideNext: no,
    slidePrev: ro,
    slideReset: ao,
    slideToClosest: oo,
    slideToClickedSlide: lo,
};
function uo(t, e) {
    const s = this,
        { params: i, slidesEl: n } = s;
    if (!i.loop || (s.virtual && s.params.virtual.enabled)) return;
    const r = () => {
            ze(n, `.${i.slideClass}, swiper-slide`).forEach((m, u) => {
                m.setAttribute("data-swiper-slide-index", u);
            });
        },
        a = () => {
            const g = ze(n, `.${i.slideBlankClass}`);
            g.forEach((m) => {
                m.remove();
            }),
                g.length > 0 && (s.recalcSlides(), s.updateSlides());
        },
        o = s.grid && i.grid && i.grid.rows > 1;
    i.loopAddBlankSlides && (i.slidesPerGroup > 1 || o) && a();
    const l = i.slidesPerGroup * (o ? i.grid.rows : 1),
        c = s.slides.length % l !== 0,
        d = o && s.slides.length % i.grid.rows !== 0,
        p = (g) => {
            for (let m = 0; m < g; m += 1) {
                const u = s.isElement
                    ? Ze("swiper-slide", [i.slideBlankClass])
                    : Ze("div", [i.slideClass, i.slideBlankClass]);
                s.slidesEl.append(u);
            }
        };
    if (c) {
        if (i.loopAddBlankSlides) {
            const g = l - (s.slides.length % l);
            p(g), s.recalcSlides(), s.updateSlides();
        } else
            Gs(
                "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
            );
        r();
    } else if (d) {
        if (i.loopAddBlankSlides) {
            const g = i.grid.rows - (s.slides.length % i.grid.rows);
            p(g), s.recalcSlides(), s.updateSlides();
        } else
            Gs(
                "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
            );
        r();
    } else r();
    s.loopFix({ slideRealIndex: t, direction: i.centeredSlides ? void 0 : "next", initial: e });
}
function fo(t) {
    let {
        slideRealIndex: e,
        slideTo: s = !0,
        direction: i,
        setTranslate: n,
        activeSlideIndex: r,
        initial: a,
        byController: o,
        byMousewheel: l,
    } = t === void 0 ? {} : t;
    const c = this;
    if (!c.params.loop) return;
    c.emit("beforeLoopFix");
    const { slides: d, allowSlidePrev: p, allowSlideNext: g, slidesEl: m, params: u } = c,
        { centeredSlides: f, initialSlide: w } = u;
    if (((c.allowSlidePrev = !0), (c.allowSlideNext = !0), c.virtual && u.virtual.enabled)) {
        s &&
            (!u.centeredSlides && c.snapIndex === 0
                ? c.slideTo(c.virtual.slides.length, 0, !1, !0)
                : u.centeredSlides && c.snapIndex < u.slidesPerView
                  ? c.slideTo(c.virtual.slides.length + c.snapIndex, 0, !1, !0)
                  : c.snapIndex === c.snapGrid.length - 1 && c.slideTo(c.virtual.slidesBefore, 0, !1, !0)),
            (c.allowSlidePrev = p),
            (c.allowSlideNext = g),
            c.emit("loopFix");
        return;
    }
    let b = u.slidesPerView;
    b === "auto"
        ? (b = c.slidesPerViewDynamic())
        : ((b = Math.ceil(parseFloat(u.slidesPerView, 10))), f && b % 2 === 0 && (b = b + 1));
    const h = u.slidesPerGroupAuto ? b : u.slidesPerGroup;
    let v = f ? Math.max(h, Math.ceil(b / 2)) : h;
    v % h !== 0 && (v += h - (v % h)), (v += u.loopAdditionalSlides), (c.loopedSlides = v);
    const y = c.grid && u.grid && u.grid.rows > 1;
    d.length < b + v || (c.params.effect === "cards" && d.length < b + v * 2)
        ? Gs(
              "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
          )
        : y && u.grid.fill === "row" && Gs("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
    const E = [],
        L = [],
        P = y ? Math.ceil(d.length / u.grid.rows) : d.length,
        A = a && P - w < b && !f;
    let _ = A ? w : c.activeIndex;
    typeof r > "u" ? (r = c.getSlideIndex(d.find((H) => H.classList.contains(u.slideActiveClass)))) : (_ = r);
    const M = i === "next" || !i,
        k = i === "prev" || !i;
    let O = 0,
        $ = 0;
    const q = (y ? d[r].column : r) + (f && typeof n > "u" ? -b / 2 + 0.5 : 0);
    if (q < v) {
        O = Math.max(v - q, h);
        for (let H = 0; H < v - q; H += 1) {
            const T = H - Math.floor(H / P) * P;
            if (y) {
                const C = P - T - 1;
                for (let G = d.length - 1; G >= 0; G -= 1) d[G].column === C && E.push(G);
            } else E.push(P - T - 1);
        }
    } else if (q + b > P - v) {
        ($ = Math.max(q - (P - v * 2), h)), A && ($ = Math.max($, b - P + w + 1));
        for (let H = 0; H < $; H += 1) {
            const T = H - Math.floor(H / P) * P;
            y
                ? d.forEach((C, G) => {
                      C.column === T && L.push(G);
                  })
                : L.push(T);
        }
    }
    if (
        ((c.__preventObserver__ = !0),
        requestAnimationFrame(() => {
            c.__preventObserver__ = !1;
        }),
        c.params.effect === "cards" &&
            d.length < b + v * 2 &&
            (L.includes(r) && L.splice(L.indexOf(r), 1), E.includes(r) && E.splice(E.indexOf(r), 1)),
        k &&
            E.forEach((H) => {
                (d[H].swiperLoopMoveDOM = !0), m.prepend(d[H]), (d[H].swiperLoopMoveDOM = !1);
            }),
        M &&
            L.forEach((H) => {
                (d[H].swiperLoopMoveDOM = !0), m.append(d[H]), (d[H].swiperLoopMoveDOM = !1);
            }),
        c.recalcSlides(),
        u.slidesPerView === "auto"
            ? c.updateSlides()
            : y &&
              ((E.length > 0 && k) || (L.length > 0 && M)) &&
              c.slides.forEach((H, T) => {
                  c.grid.updateSlide(T, H, c.slides);
              }),
        u.watchSlidesProgress && c.updateSlidesOffset(),
        s)
    ) {
        if (E.length > 0 && k) {
            if (typeof e > "u") {
                const H = c.slidesGrid[_],
                    C = c.slidesGrid[_ + O] - H;
                l
                    ? c.setTranslate(c.translate - C)
                    : (c.slideTo(_ + Math.ceil(O), 0, !1, !0),
                      n &&
                          ((c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - C),
                          (c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - C)));
            } else if (n) {
                const H = y ? E.length / u.grid.rows : E.length;
                c.slideTo(c.activeIndex + H, 0, !1, !0), (c.touchEventsData.currentTranslate = c.translate);
            }
        } else if (L.length > 0 && M)
            if (typeof e > "u") {
                const H = c.slidesGrid[_],
                    C = c.slidesGrid[_ - $] - H;
                l
                    ? c.setTranslate(c.translate - C)
                    : (c.slideTo(_ - $, 0, !1, !0),
                      n &&
                          ((c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - C),
                          (c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - C)));
            } else {
                const H = y ? L.length / u.grid.rows : L.length;
                c.slideTo(c.activeIndex - H, 0, !1, !0);
            }
    }
    if (((c.allowSlidePrev = p), (c.allowSlideNext = g), c.controller && c.controller.control && !o)) {
        const H = { slideRealIndex: e, direction: i, setTranslate: n, activeSlideIndex: r, byController: !0 };
        Array.isArray(c.controller.control)
            ? c.controller.control.forEach((T) => {
                  !T.destroyed &&
                      T.params.loop &&
                      T.loopFix({ ...H, slideTo: T.params.slidesPerView === u.slidesPerView ? s : !1 });
              })
            : c.controller.control instanceof c.constructor &&
              c.controller.control.params.loop &&
              c.controller.control.loopFix({
                  ...H,
                  slideTo: c.controller.control.params.slidesPerView === u.slidesPerView ? s : !1,
              });
    }
    c.emit("loopFix");
}
function po() {
    const t = this,
        { params: e, slidesEl: s } = t;
    if (!e.loop || !s || (t.virtual && t.params.virtual.enabled)) return;
    t.recalcSlides();
    const i = [];
    t.slides.forEach((n) => {
        const r = typeof n.swiperSlideIndex > "u" ? n.getAttribute("data-swiper-slide-index") * 1 : n.swiperSlideIndex;
        i[r] = n;
    }),
        t.slides.forEach((n) => {
            n.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((n) => {
            s.append(n);
        }),
        t.recalcSlides(),
        t.slideTo(t.realIndex, 0);
}
var mo = { loopCreate: uo, loopFix: fo, loopDestroy: po };
function ho(t) {
    const e = this;
    if (!e.params.simulateTouch || (e.params.watchOverflow && e.isLocked) || e.params.cssMode) return;
    const s = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
    e.isElement && (e.__preventObserver__ = !0),
        (s.style.cursor = "move"),
        (s.style.cursor = t ? "grabbing" : "grab"),
        e.isElement &&
            requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
            });
}
function go() {
    const t = this;
    (t.params.watchOverflow && t.isLocked) ||
        t.params.cssMode ||
        (t.isElement && (t.__preventObserver__ = !0),
        (t[t.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = ""),
        t.isElement &&
            requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
            }));
}
var vo = { setGrabCursor: ho, unsetGrabCursor: go };
function wo(t, e) {
    e === void 0 && (e = this);
    function s(i) {
        if (!i || i === $e() || i === Ce()) return null;
        i.assignedSlot && (i = i.assignedSlot);
        const n = i.closest(t);
        return !n && !i.getRootNode ? null : n || s(i.getRootNode().host);
    }
    return s(e);
}
function bn(t, e, s) {
    const i = Ce(),
        { params: n } = t,
        r = n.edgeSwipeDetection,
        a = n.edgeSwipeThreshold;
    return r && (s <= a || s >= i.innerWidth - a) ? (r === "prevent" ? (e.preventDefault(), !0) : !1) : !0;
}
function yo(t) {
    const e = this,
        s = $e();
    let i = t;
    i.originalEvent && (i = i.originalEvent);
    const n = e.touchEventsData;
    if (i.type === "pointerdown") {
        if (n.pointerId !== null && n.pointerId !== i.pointerId) return;
        n.pointerId = i.pointerId;
    } else i.type === "touchstart" && i.targetTouches.length === 1 && (n.touchId = i.targetTouches[0].identifier);
    if (i.type === "touchstart") {
        bn(e, i, i.targetTouches[0].pageX);
        return;
    }
    const { params: r, touches: a, enabled: o } = e;
    if (!o || (!r.simulateTouch && i.pointerType === "mouse") || (e.animating && r.preventInteractionOnTransition))
        return;
    !e.animating && r.cssMode && r.loop && e.loopFix();
    let l = i.target;
    if (
        (r.touchEventsTarget === "wrapper" && !_a(l, e.wrapperEl)) ||
        ("which" in i && i.which === 3) ||
        ("button" in i && i.button > 0) ||
        (n.isTouched && n.isMoved)
    )
        return;
    const c = !!r.noSwipingClass && r.noSwipingClass !== "",
        d = i.composedPath ? i.composedPath() : i.path;
    c && i.target && i.target.shadowRoot && d && (l = d[0]);
    const p = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
        g = !!(i.target && i.target.shadowRoot);
    if (r.noSwiping && (g ? wo(p, l) : l.closest(p))) {
        e.allowClick = !0;
        return;
    }
    if (r.swipeHandler && !l.closest(r.swipeHandler)) return;
    (a.currentX = i.pageX), (a.currentY = i.pageY);
    const m = a.currentX,
        u = a.currentY;
    if (!bn(e, i, m)) return;
    Object.assign(n, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }),
        (a.startX = m),
        (a.startY = u),
        (n.touchStartTime = it()),
        (e.allowClick = !0),
        e.updateSize(),
        (e.swipeDirection = void 0),
        r.threshold > 0 && (n.allowThresholdMove = !1);
    let f = !0;
    l.matches(n.focusableElements) && ((f = !1), l.nodeName === "SELECT" && (n.isTouched = !1)),
        s.activeElement &&
            s.activeElement.matches(n.focusableElements) &&
            s.activeElement !== l &&
            (i.pointerType === "mouse" || (i.pointerType !== "mouse" && !l.matches(n.focusableElements))) &&
            s.activeElement.blur();
    const w = f && e.allowTouchMove && r.touchStartPreventDefault;
    (r.touchStartForcePreventDefault || w) && !l.isContentEditable && i.preventDefault(),
        r.freeMode && r.freeMode.enabled && e.freeMode && e.animating && !r.cssMode && e.freeMode.onTouchStart(),
        e.emit("touchStart", i);
}
function bo(t) {
    const e = $e(),
        s = this,
        i = s.touchEventsData,
        { params: n, touches: r, rtlTranslate: a, enabled: o } = s;
    if (!o || (!n.simulateTouch && t.pointerType === "mouse")) return;
    let l = t;
    if (
        (l.originalEvent && (l = l.originalEvent),
        l.type === "pointermove" && (i.touchId !== null || l.pointerId !== i.pointerId))
    )
        return;
    let c;
    if (l.type === "touchmove") {
        if (((c = [...l.changedTouches].find((E) => E.identifier === i.touchId)), !c || c.identifier !== i.touchId))
            return;
    } else c = l;
    if (!i.isTouched) {
        i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", l);
        return;
    }
    const d = c.pageX,
        p = c.pageY;
    if (l.preventedByNestedSwiper) {
        (r.startX = d), (r.startY = p);
        return;
    }
    if (!s.allowTouchMove) {
        l.target.matches(i.focusableElements) || (s.allowClick = !1),
            i.isTouched &&
                (Object.assign(r, { startX: d, startY: p, currentX: d, currentY: p }), (i.touchStartTime = it()));
        return;
    }
    if (n.touchReleaseOnEdges && !n.loop)
        if (s.isVertical()) {
            if (
                (p < r.startY && s.translate <= s.maxTranslate()) ||
                (p > r.startY && s.translate >= s.minTranslate())
            ) {
                (i.isTouched = !1), (i.isMoved = !1);
                return;
            }
        } else {
            if (
                a &&
                ((d > r.startX && -s.translate <= s.maxTranslate()) ||
                    (d < r.startX && -s.translate >= s.minTranslate()))
            )
                return;
            if (
                !a &&
                ((d < r.startX && s.translate <= s.maxTranslate()) || (d > r.startX && s.translate >= s.minTranslate()))
            )
                return;
        }
    if (
        (e.activeElement &&
            e.activeElement.matches(i.focusableElements) &&
            e.activeElement !== l.target &&
            l.pointerType !== "mouse" &&
            e.activeElement.blur(),
        e.activeElement && l.target === e.activeElement && l.target.matches(i.focusableElements))
    ) {
        (i.isMoved = !0), (s.allowClick = !1);
        return;
    }
    i.allowTouchCallbacks && s.emit("touchMove", l),
        (r.previousX = r.currentX),
        (r.previousY = r.currentY),
        (r.currentX = d),
        (r.currentY = p);
    const g = r.currentX - r.startX,
        m = r.currentY - r.startY;
    if (s.params.threshold && Math.sqrt(g ** 2 + m ** 2) < s.params.threshold) return;
    if (typeof i.isScrolling > "u") {
        let E;
        (s.isHorizontal() && r.currentY === r.startY) || (s.isVertical() && r.currentX === r.startX)
            ? (i.isScrolling = !1)
            : g * g + m * m >= 25 &&
              ((E = (Math.atan2(Math.abs(m), Math.abs(g)) * 180) / Math.PI),
              (i.isScrolling = s.isHorizontal() ? E > n.touchAngle : 90 - E > n.touchAngle));
    }
    if (
        (i.isScrolling && s.emit("touchMoveOpposite", l),
        typeof i.startMoving > "u" && (r.currentX !== r.startX || r.currentY !== r.startY) && (i.startMoving = !0),
        i.isScrolling || (l.type === "touchmove" && i.preventTouchMoveFromPointerMove))
    ) {
        i.isTouched = !1;
        return;
    }
    if (!i.startMoving) return;
    (s.allowClick = !1),
        !n.cssMode && l.cancelable && l.preventDefault(),
        n.touchMoveStopPropagation && !n.nested && l.stopPropagation();
    let u = s.isHorizontal() ? g : m,
        f = s.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
    n.oneWayMovement && ((u = Math.abs(u) * (a ? 1 : -1)), (f = Math.abs(f) * (a ? 1 : -1))),
        (r.diff = u),
        (u *= n.touchRatio),
        a && ((u = -u), (f = -f));
    const w = s.touchesDirection;
    (s.swipeDirection = u > 0 ? "prev" : "next"), (s.touchesDirection = f > 0 ? "prev" : "next");
    const b = s.params.loop && !n.cssMode,
        h = (s.touchesDirection === "next" && s.allowSlideNext) || (s.touchesDirection === "prev" && s.allowSlidePrev);
    if (!i.isMoved) {
        if (
            (b && h && s.loopFix({ direction: s.swipeDirection }),
            (i.startTranslate = s.getTranslate()),
            s.setTransition(0),
            s.animating)
        ) {
            const E = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0,
                detail: { bySwiperTouchMove: !0 },
            });
            s.wrapperEl.dispatchEvent(E);
        }
        (i.allowMomentumBounce = !1),
            n.grabCursor && (s.allowSlideNext === !0 || s.allowSlidePrev === !0) && s.setGrabCursor(!0),
            s.emit("sliderFirstMove", l);
    }
    if (
        (new Date().getTime(),
        n._loopSwapReset !== !1 &&
            i.isMoved &&
            i.allowThresholdMove &&
            w !== s.touchesDirection &&
            b &&
            h &&
            Math.abs(u) >= 1)
    ) {
        Object.assign(r, { startX: d, startY: p, currentX: d, currentY: p, startTranslate: i.currentTranslate }),
            (i.loopSwapReset = !0),
            (i.startTranslate = i.currentTranslate);
        return;
    }
    s.emit("sliderMove", l), (i.isMoved = !0), (i.currentTranslate = u + i.startTranslate);
    let v = !0,
        y = n.resistanceRatio;
    if (
        (n.touchReleaseOnEdges && (y = 0),
        u > 0
            ? (b &&
                  h &&
                  i.allowThresholdMove &&
                  i.currentTranslate >
                      (n.centeredSlides
                          ? s.minTranslate() -
                            s.slidesSizesGrid[s.activeIndex + 1] -
                            (n.slidesPerView !== "auto" && s.slides.length - n.slidesPerView >= 2
                                ? s.slidesSizesGrid[s.activeIndex + 1] + s.params.spaceBetween
                                : 0) -
                            s.params.spaceBetween
                          : s.minTranslate()) &&
                  s.loopFix({ direction: "prev", setTranslate: !0, activeSlideIndex: 0 }),
              i.currentTranslate > s.minTranslate() &&
                  ((v = !1),
                  n.resistance &&
                      (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + u) ** y)))
            : u < 0 &&
              (b &&
                  h &&
                  i.allowThresholdMove &&
                  i.currentTranslate <
                      (n.centeredSlides
                          ? s.maxTranslate() +
                            s.slidesSizesGrid[s.slidesSizesGrid.length - 1] +
                            s.params.spaceBetween +
                            (n.slidesPerView !== "auto" && s.slides.length - n.slidesPerView >= 2
                                ? s.slidesSizesGrid[s.slidesSizesGrid.length - 1] + s.params.spaceBetween
                                : 0)
                          : s.maxTranslate()) &&
                  s.loopFix({
                      direction: "next",
                      setTranslate: !0,
                      activeSlideIndex:
                          s.slides.length -
                          (n.slidesPerView === "auto"
                              ? s.slidesPerViewDynamic()
                              : Math.ceil(parseFloat(n.slidesPerView, 10))),
                  }),
              i.currentTranslate < s.maxTranslate() &&
                  ((v = !1),
                  n.resistance &&
                      (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - u) ** y))),
        v && (l.preventedByNestedSwiper = !0),
        !s.allowSlideNext &&
            s.swipeDirection === "next" &&
            i.currentTranslate < i.startTranslate &&
            (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev &&
            s.swipeDirection === "prev" &&
            i.currentTranslate > i.startTranslate &&
            (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev && !s.allowSlideNext && (i.currentTranslate = i.startTranslate),
        n.threshold > 0)
    )
        if (Math.abs(u) > n.threshold || i.allowThresholdMove) {
            if (!i.allowThresholdMove) {
                (i.allowThresholdMove = !0),
                    (r.startX = r.currentX),
                    (r.startY = r.currentY),
                    (i.currentTranslate = i.startTranslate),
                    (r.diff = s.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY);
                return;
            }
        } else {
            i.currentTranslate = i.startTranslate;
            return;
        }
    !n.followFinger ||
        n.cssMode ||
        (((n.freeMode && n.freeMode.enabled && s.freeMode) || n.watchSlidesProgress) &&
            (s.updateActiveIndex(), s.updateSlidesClasses()),
        n.freeMode && n.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate));
}
function So(t) {
    const e = this,
        s = e.touchEventsData;
    let i = t;
    i.originalEvent && (i = i.originalEvent);
    let n;
    if (i.type === "touchend" || i.type === "touchcancel") {
        if (((n = [...i.changedTouches].find((E) => E.identifier === s.touchId)), !n || n.identifier !== s.touchId))
            return;
    } else {
        if (s.touchId !== null || i.pointerId !== s.pointerId) return;
        n = i;
    }
    if (
        ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(i.type) &&
        !(["pointercancel", "contextmenu"].includes(i.type) && (e.browser.isSafari || e.browser.isWebView))
    )
        return;
    (s.pointerId = null), (s.touchId = null);
    const { params: a, touches: o, rtlTranslate: l, slidesGrid: c, enabled: d } = e;
    if (!d || (!a.simulateTouch && i.pointerType === "mouse")) return;
    if ((s.allowTouchCallbacks && e.emit("touchEnd", i), (s.allowTouchCallbacks = !1), !s.isTouched)) {
        s.isMoved && a.grabCursor && e.setGrabCursor(!1), (s.isMoved = !1), (s.startMoving = !1);
        return;
    }
    a.grabCursor &&
        s.isMoved &&
        s.isTouched &&
        (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
        e.setGrabCursor(!1);
    const p = it(),
        g = p - s.touchStartTime;
    if (e.allowClick) {
        const E = i.path || (i.composedPath && i.composedPath());
        e.updateClickedSlide((E && E[0]) || i.target, E),
            e.emit("tap click", i),
            g < 300 && p - s.lastClickTime < 300 && e.emit("doubleTap doubleClick", i);
    }
    if (
        ((s.lastClickTime = it()),
        es(() => {
            e.destroyed || (e.allowClick = !0);
        }),
        !s.isTouched ||
            !s.isMoved ||
            !e.swipeDirection ||
            (o.diff === 0 && !s.loopSwapReset) ||
            (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
    ) {
        (s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1);
        return;
    }
    (s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1);
    let m;
    if ((a.followFinger ? (m = l ? e.translate : -e.translate) : (m = -s.currentTranslate), a.cssMode)) return;
    if (a.freeMode && a.freeMode.enabled) {
        e.freeMode.onTouchEnd({ currentPos: m });
        return;
    }
    const u = m >= -e.maxTranslate() && !e.params.loop;
    let f = 0,
        w = e.slidesSizesGrid[0];
    for (let E = 0; E < c.length; E += E < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
        const L = E < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
        typeof c[E + L] < "u"
            ? (u || (m >= c[E] && m < c[E + L])) && ((f = E), (w = c[E + L] - c[E]))
            : (u || m >= c[E]) && ((f = E), (w = c[c.length - 1] - c[c.length - 2]));
    }
    let b = null,
        h = null;
    a.rewind &&
        (e.isBeginning
            ? (h = a.virtual && a.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1)
            : e.isEnd && (b = 0));
    const v = (m - c[f]) / w,
        y = f < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (g > a.longSwipesMs) {
        if (!a.longSwipes) {
            e.slideTo(e.activeIndex);
            return;
        }
        e.swipeDirection === "next" &&
            (v >= a.longSwipesRatio ? e.slideTo(a.rewind && e.isEnd ? b : f + y) : e.slideTo(f)),
            e.swipeDirection === "prev" &&
                (v > 1 - a.longSwipesRatio
                    ? e.slideTo(f + y)
                    : h !== null && v < 0 && Math.abs(v) > a.longSwipesRatio
                      ? e.slideTo(h)
                      : e.slideTo(f));
    } else {
        if (!a.shortSwipes) {
            e.slideTo(e.activeIndex);
            return;
        }
        e.navigation && (i.target === e.navigation.nextEl || i.target === e.navigation.prevEl)
            ? i.target === e.navigation.nextEl
                ? e.slideTo(f + y)
                : e.slideTo(f)
            : (e.swipeDirection === "next" && e.slideTo(b !== null ? b : f + y),
              e.swipeDirection === "prev" && e.slideTo(h !== null ? h : f));
    }
}
function Sn() {
    const t = this,
        { params: e, el: s } = t;
    if (s && s.offsetWidth === 0) return;
    e.breakpoints && t.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = t,
        a = t.virtual && t.params.virtual.enabled;
    (t.allowSlideNext = !0), (t.allowSlidePrev = !0), t.updateSize(), t.updateSlides(), t.updateSlidesClasses();
    const o = a && e.loop;
    (e.slidesPerView === "auto" || e.slidesPerView > 1) && t.isEnd && !t.isBeginning && !t.params.centeredSlides && !o
        ? t.slideTo(t.slides.length - 1, 0, !1, !0)
        : t.params.loop && !a
          ? t.slideToLoop(t.realIndex, 0, !1, !0)
          : t.slideTo(t.activeIndex, 0, !1, !0),
        t.autoplay &&
            t.autoplay.running &&
            t.autoplay.paused &&
            (clearTimeout(t.autoplay.resizeTimeout),
            (t.autoplay.resizeTimeout = setTimeout(() => {
                t.autoplay && t.autoplay.running && t.autoplay.paused && t.autoplay.resume();
            }, 500))),
        (t.allowSlidePrev = n),
        (t.allowSlideNext = i),
        t.params.watchOverflow && r !== t.snapGrid && t.checkOverflow();
}
function xo(t) {
    const e = this;
    e.enabled &&
        (e.allowClick ||
            (e.params.preventClicks && t.preventDefault(),
            e.params.preventClicksPropagation && e.animating && (t.stopPropagation(), t.stopImmediatePropagation())));
}
function Eo() {
    const t = this,
        { wrapperEl: e, rtlTranslate: s, enabled: i } = t;
    if (!i) return;
    (t.previousTranslate = t.translate),
        t.isHorizontal() ? (t.translate = -e.scrollLeft) : (t.translate = -e.scrollTop),
        t.translate === 0 && (t.translate = 0),
        t.updateActiveIndex(),
        t.updateSlidesClasses();
    let n;
    const r = t.maxTranslate() - t.minTranslate();
    r === 0 ? (n = 0) : (n = (t.translate - t.minTranslate()) / r),
        n !== t.progress && t.updateProgress(s ? -t.translate : t.translate),
        t.emit("setTranslate", t.translate, !1);
}
function To(t) {
    const e = this;
    Rs(e, t.target), !(e.params.cssMode || (e.params.slidesPerView !== "auto" && !e.params.autoHeight)) && e.update();
}
function Co() {
    const t = this;
    t.documentTouchHandlerProceeded ||
        ((t.documentTouchHandlerProceeded = !0), t.params.touchReleaseOnEdges && (t.el.style.touchAction = "auto"));
}
const dr = (t, e) => {
    const s = $e(),
        { params: i, el: n, wrapperEl: r, device: a } = t,
        o = !!i.nested,
        l = e === "on" ? "addEventListener" : "removeEventListener",
        c = e;
    !n ||
        typeof n == "string" ||
        (s[l]("touchstart", t.onDocumentTouchStart, { passive: !1, capture: o }),
        n[l]("touchstart", t.onTouchStart, { passive: !1 }),
        n[l]("pointerdown", t.onTouchStart, { passive: !1 }),
        s[l]("touchmove", t.onTouchMove, { passive: !1, capture: o }),
        s[l]("pointermove", t.onTouchMove, { passive: !1, capture: o }),
        s[l]("touchend", t.onTouchEnd, { passive: !0 }),
        s[l]("pointerup", t.onTouchEnd, { passive: !0 }),
        s[l]("pointercancel", t.onTouchEnd, { passive: !0 }),
        s[l]("touchcancel", t.onTouchEnd, { passive: !0 }),
        s[l]("pointerout", t.onTouchEnd, { passive: !0 }),
        s[l]("pointerleave", t.onTouchEnd, { passive: !0 }),
        s[l]("contextmenu", t.onTouchEnd, { passive: !0 }),
        (i.preventClicks || i.preventClicksPropagation) && n[l]("click", t.onClick, !0),
        i.cssMode && r[l]("scroll", t.onScroll),
        i.updateOnWindowResize
            ? t[c](a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Sn, !0)
            : t[c]("observerUpdate", Sn, !0),
        n[l]("load", t.onLoad, { capture: !0 }));
};
function _o() {
    const t = this,
        { params: e } = t;
    (t.onTouchStart = yo.bind(t)),
        (t.onTouchMove = bo.bind(t)),
        (t.onTouchEnd = So.bind(t)),
        (t.onDocumentTouchStart = Co.bind(t)),
        e.cssMode && (t.onScroll = Eo.bind(t)),
        (t.onClick = xo.bind(t)),
        (t.onLoad = To.bind(t)),
        dr(t, "on");
}
function Mo() {
    dr(this, "off");
}
var Po = { attachEvents: _o, detachEvents: Mo };
const xn = (t, e) => t.grid && e.grid && e.grid.rows > 1;
function Lo() {
    const t = this,
        { realIndex: e, initialized: s, params: i, el: n } = t,
        r = i.breakpoints;
    if (!r || (r && Object.keys(r).length === 0)) return;
    const a = $e(),
        o = i.breakpointsBase === "window" || !i.breakpointsBase ? i.breakpointsBase : "container",
        l =
            ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase
                ? t.el
                : a.querySelector(i.breakpointsBase),
        c = t.getBreakpoint(r, o, l);
    if (!c || t.currentBreakpoint === c) return;
    const p = (c in r ? r[c] : void 0) || t.originalParams,
        g = xn(t, i),
        m = xn(t, p),
        u = t.params.grabCursor,
        f = p.grabCursor,
        w = i.enabled;
    g && !m
        ? (n.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`),
          t.emitContainerClasses())
        : !g &&
          m &&
          (n.classList.add(`${i.containerModifierClass}grid`),
          ((p.grid.fill && p.grid.fill === "column") || (!p.grid.fill && i.grid.fill === "column")) &&
              n.classList.add(`${i.containerModifierClass}grid-column`),
          t.emitContainerClasses()),
        u && !f ? t.unsetGrabCursor() : !u && f && t.setGrabCursor(),
        ["navigation", "pagination", "scrollbar"].forEach((L) => {
            if (typeof p[L] > "u") return;
            const P = i[L] && i[L].enabled,
                A = p[L] && p[L].enabled;
            P && !A && t[L].disable(), !P && A && t[L].enable();
        });
    const b = p.direction && p.direction !== i.direction,
        h = i.loop && (p.slidesPerView !== i.slidesPerView || b),
        v = i.loop;
    b && s && t.changeDirection(), Ke(t.params, p);
    const y = t.params.enabled,
        E = t.params.loop;
    Object.assign(t, {
        allowTouchMove: t.params.allowTouchMove,
        allowSlideNext: t.params.allowSlideNext,
        allowSlidePrev: t.params.allowSlidePrev,
    }),
        w && !y ? t.disable() : !w && y && t.enable(),
        (t.currentBreakpoint = c),
        t.emit("_beforeBreakpoint", p),
        s &&
            (h
                ? (t.loopDestroy(), t.loopCreate(e), t.updateSlides())
                : !v && E
                  ? (t.loopCreate(e), t.updateSlides())
                  : v && !E && t.loopDestroy()),
        t.emit("breakpoint", p);
}
function Io(t, e, s) {
    if ((e === void 0 && (e = "window"), !t || (e === "container" && !s))) return;
    let i = !1;
    const n = Ce(),
        r = e === "window" ? n.innerHeight : s.clientHeight,
        a = Object.keys(t).map((o) => {
            if (typeof o == "string" && o.indexOf("@") === 0) {
                const l = parseFloat(o.substr(1));
                return { value: r * l, point: o };
            }
            return { value: o, point: o };
        });
    a.sort((o, l) => parseInt(o.value, 10) - parseInt(l.value, 10));
    for (let o = 0; o < a.length; o += 1) {
        const { point: l, value: c } = a[o];
        e === "window" ? n.matchMedia(`(min-width: ${c}px)`).matches && (i = l) : c <= s.clientWidth && (i = l);
    }
    return i || "max";
}
var Ao = { setBreakpoint: Lo, getBreakpoint: Io };
function Oo(t, e) {
    const s = [];
    return (
        t.forEach((i) => {
            typeof i == "object"
                ? Object.keys(i).forEach((n) => {
                      i[n] && s.push(e + n);
                  })
                : typeof i == "string" && s.push(e + i);
        }),
        s
    );
}
function $o() {
    const t = this,
        { classNames: e, params: s, rtl: i, el: n, device: r } = t,
        a = Oo(
            [
                "initialized",
                s.direction,
                { "free-mode": t.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                { "grid-column": s.grid && s.grid.rows > 1 && s.grid.fill === "column" },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
            ],
            s.containerModifierClass
        );
    e.push(...a), n.classList.add(...e), t.emitContainerClasses();
}
function ko() {
    const t = this,
        { el: e, classNames: s } = t;
    !e || typeof e == "string" || (e.classList.remove(...s), t.emitContainerClasses());
}
var Do = { addClasses: $o, removeClasses: ko };
function zo() {
    const t = this,
        { isLocked: e, params: s } = t,
        { slidesOffsetBefore: i } = s;
    if (i) {
        const n = t.slides.length - 1,
            r = t.slidesGrid[n] + t.slidesSizesGrid[n] + i * 2;
        t.isLocked = t.size > r;
    } else t.isLocked = t.snapGrid.length === 1;
    s.allowSlideNext === !0 && (t.allowSlideNext = !t.isLocked),
        s.allowSlidePrev === !0 && (t.allowSlidePrev = !t.isLocked),
        e && e !== t.isLocked && (t.isEnd = !1),
        e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock");
}
var Ho = { checkOverflow: zo },
    En = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        swiperElementNodeName: "SWIPER-CONTAINER",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        eventsPrefix: "swiper",
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 5,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        loop: !1,
        loopAddBlankSlides: !0,
        loopAdditionalSlides: 0,
        loopPreventsSliding: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: !0,
        _emitClasses: !1,
    };
function Ro(t, e) {
    return function (i) {
        i === void 0 && (i = {});
        const n = Object.keys(i)[0],
            r = i[n];
        if (typeof r != "object" || r === null) {
            Ke(e, i);
            return;
        }
        if (
            (t[n] === !0 && (t[n] = { enabled: !0 }),
            n === "navigation" && t[n] && t[n].enabled && !t[n].prevEl && !t[n].nextEl && (t[n].auto = !0),
            ["pagination", "scrollbar"].indexOf(n) >= 0 && t[n] && t[n].enabled && !t[n].el && (t[n].auto = !0),
            !(n in t && "enabled" in r))
        ) {
            Ke(e, i);
            return;
        }
        typeof t[n] == "object" && !("enabled" in t[n]) && (t[n].enabled = !0),
            t[n] || (t[n] = { enabled: !1 }),
            Ke(e, i);
    };
}
const yi = {
        eventsEmitter: ka,
        update: Ga,
        translate: Za,
        transition: to,
        slide: co,
        loop: mo,
        grabCursor: vo,
        events: Po,
        breakpoints: Ao,
        checkOverflow: Ho,
        classes: Do,
    },
    bi = {};
class ke {
    constructor() {
        let e, s;
        for (var i = arguments.length, n = new Array(i), r = 0; r < i; r++) n[r] = arguments[r];
        n.length === 1 && n[0].constructor && Object.prototype.toString.call(n[0]).slice(8, -1) === "Object"
            ? (s = n[0])
            : ([e, s] = n),
            s || (s = {}),
            (s = Ke({}, s)),
            e && !s.el && (s.el = e);
        const a = $e();
        if (s.el && typeof s.el == "string" && a.querySelectorAll(s.el).length > 1) {
            const d = [];
            return (
                a.querySelectorAll(s.el).forEach((p) => {
                    const g = Ke({}, s, { el: p });
                    d.push(new ke(g));
                }),
                d
            );
        }
        const o = this;
        (o.__swiper__ = !0),
            (o.support = ar()),
            (o.device = or({ userAgent: s.userAgent })),
            (o.browser = lr()),
            (o.eventsListeners = {}),
            (o.eventsAnyListeners = []),
            (o.modules = [...o.__modules__]),
            s.modules && Array.isArray(s.modules) && o.modules.push(...s.modules);
        const l = {};
        o.modules.forEach((d) => {
            d({
                params: s,
                swiper: o,
                extendParams: Ro(s, l),
                on: o.on.bind(o),
                once: o.once.bind(o),
                off: o.off.bind(o),
                emit: o.emit.bind(o),
            });
        });
        const c = Ke({}, En, l);
        return (
            (o.params = Ke({}, c, bi, s)),
            (o.originalParams = Ke({}, o.params)),
            (o.passedParams = Ke({}, s)),
            o.params &&
                o.params.on &&
                Object.keys(o.params.on).forEach((d) => {
                    o.on(d, o.params.on[d]);
                }),
            o.params && o.params.onAny && o.onAny(o.params.onAny),
            Object.assign(o, {
                enabled: o.params.enabled,
                el: e,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return o.params.direction === "horizontal";
                },
                isVertical() {
                    return o.params.direction === "vertical";
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                },
                allowSlideNext: o.params.allowSlideNext,
                allowSlidePrev: o.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: o.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null,
                },
                allowClick: !0,
                allowTouchMove: o.params.allowTouchMove,
                touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
                imagesToLoad: [],
                imagesLoaded: 0,
            }),
            o.emit("_swiper"),
            o.params.init && o.init(),
            o
        );
    }
    getDirectionLabel(e) {
        return this.isHorizontal()
            ? e
            : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
              }[e];
    }
    getSlideIndex(e) {
        const { slidesEl: s, params: i } = this,
            n = ze(s, `.${i.slideClass}, swiper-slide`),
            r = bs(n[0]);
        return bs(e) - r;
    }
    getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.find((s) => s.getAttribute("data-swiper-slide-index") * 1 === e));
    }
    getSlideIndexWhenGrid(e) {
        return (
            this.grid &&
                this.params.grid &&
                this.params.grid.rows > 1 &&
                (this.params.grid.fill === "column"
                    ? (e = Math.floor(e / this.params.grid.rows))
                    : this.params.grid.fill === "row" &&
                      (e = e % Math.ceil(this.slides.length / this.params.grid.rows))),
            e
        );
    }
    recalcSlides() {
        const e = this,
            { slidesEl: s, params: i } = e;
        e.slides = ze(s, `.${i.slideClass}, swiper-slide`);
    }
    enable() {
        const e = this;
        e.enabled || ((e.enabled = !0), e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
    }
    disable() {
        const e = this;
        e.enabled && ((e.enabled = !1), e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
    }
    setProgress(e, s) {
        const i = this;
        e = Math.min(Math.max(e, 0), 1);
        const n = i.minTranslate(),
            a = (i.maxTranslate() - n) * e + n;
        i.translateTo(a, typeof s > "u" ? 0 : s), i.updateActiveIndex(), i.updateSlidesClasses();
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const s = e.el.className
            .split(" ")
            .filter((i) => i.indexOf("swiper") === 0 || i.indexOf(e.params.containerModifierClass) === 0);
        e.emit("_containerClasses", s.join(" "));
    }
    getSlideClasses(e) {
        const s = this;
        return s.destroyed
            ? ""
            : e.className
                  .split(" ")
                  .filter((i) => i.indexOf("swiper-slide") === 0 || i.indexOf(s.params.slideClass) === 0)
                  .join(" ");
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const s = [];
        e.slides.forEach((i) => {
            const n = e.getSlideClasses(i);
            s.push({ slideEl: i, classNames: n }), e.emit("_slideClass", i, n);
        }),
            e.emit("_slideClasses", s);
    }
    slidesPerViewDynamic(e, s) {
        e === void 0 && (e = "current"), s === void 0 && (s = !1);
        const i = this,
            { params: n, slides: r, slidesGrid: a, slidesSizesGrid: o, size: l, activeIndex: c } = i;
        let d = 1;
        if (typeof n.slidesPerView == "number") return n.slidesPerView;
        if (n.centeredSlides) {
            let p = r[c] ? Math.ceil(r[c].swiperSlideSize) : 0,
                g;
            for (let m = c + 1; m < r.length; m += 1)
                r[m] && !g && ((p += Math.ceil(r[m].swiperSlideSize)), (d += 1), p > l && (g = !0));
            for (let m = c - 1; m >= 0; m -= 1)
                r[m] && !g && ((p += r[m].swiperSlideSize), (d += 1), p > l && (g = !0));
        } else if (e === "current")
            for (let p = c + 1; p < r.length; p += 1) (s ? a[p] + o[p] - a[c] < l : a[p] - a[c] < l) && (d += 1);
        else for (let p = c - 1; p >= 0; p -= 1) a[c] - a[p] < l && (d += 1);
        return d;
    }
    update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: s, params: i } = e;
        i.breakpoints && e.setBreakpoint(),
            [...e.el.querySelectorAll('[loading="lazy"]')].forEach((a) => {
                a.complete && Rs(e, a);
            }),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses();
        function n() {
            const a = e.rtlTranslate ? e.translate * -1 : e.translate,
                o = Math.min(Math.max(a, e.maxTranslate()), e.minTranslate());
            e.setTranslate(o), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let r;
        if (i.freeMode && i.freeMode.enabled && !i.cssMode) n(), i.autoHeight && e.updateAutoHeight();
        else {
            if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && e.isEnd && !i.centeredSlides) {
                const a = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
                r = e.slideTo(a.length - 1, 0, !1, !0);
            } else r = e.slideTo(e.activeIndex, 0, !1, !0);
            r || n();
        }
        i.watchOverflow && s !== e.snapGrid && e.checkOverflow(), e.emit("update");
    }
    changeDirection(e, s) {
        s === void 0 && (s = !0);
        const i = this,
            n = i.params.direction;
        return (
            e || (e = n === "horizontal" ? "vertical" : "horizontal"),
            e === n ||
                (e !== "horizontal" && e !== "vertical") ||
                (i.el.classList.remove(`${i.params.containerModifierClass}${n}`),
                i.el.classList.add(`${i.params.containerModifierClass}${e}`),
                i.emitContainerClasses(),
                (i.params.direction = e),
                i.slides.forEach((r) => {
                    e === "vertical" ? (r.style.width = "") : (r.style.height = "");
                }),
                i.emit("changeDirection"),
                s && i.update()),
            i
        );
    }
    changeLanguageDirection(e) {
        const s = this;
        (s.rtl && e === "rtl") ||
            (!s.rtl && e === "ltr") ||
            ((s.rtl = e === "rtl"),
            (s.rtlTranslate = s.params.direction === "horizontal" && s.rtl),
            s.rtl
                ? (s.el.classList.add(`${s.params.containerModifierClass}rtl`), (s.el.dir = "rtl"))
                : (s.el.classList.remove(`${s.params.containerModifierClass}rtl`), (s.el.dir = "ltr")),
            s.update());
    }
    mount(e) {
        const s = this;
        if (s.mounted) return !0;
        let i = e || s.params.el;
        if ((typeof i == "string" && (i = document.querySelector(i)), !i)) return !1;
        (i.swiper = s),
            i.parentNode &&
                i.parentNode.host &&
                i.parentNode.host.nodeName === s.params.swiperElementNodeName.toUpperCase() &&
                (s.isElement = !0);
        const n = () => `.${(s.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let a = i && i.shadowRoot && i.shadowRoot.querySelector ? i.shadowRoot.querySelector(n()) : ze(i, n())[0];
        return (
            !a &&
                s.params.createElements &&
                ((a = Ze("div", s.params.wrapperClass)),
                i.append(a),
                ze(i, `.${s.params.slideClass}`).forEach((o) => {
                    a.append(o);
                })),
            Object.assign(s, {
                el: i,
                wrapperEl: a,
                slidesEl: s.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : a,
                hostEl: s.isElement ? i.parentNode.host : i,
                mounted: !0,
                rtl: i.dir.toLowerCase() === "rtl" || Ot(i, "direction") === "rtl",
                rtlTranslate:
                    s.params.direction === "horizontal" &&
                    (i.dir.toLowerCase() === "rtl" || Ot(i, "direction") === "rtl"),
                wrongRTL: Ot(a, "display") === "-webkit-box",
            }),
            !0
        );
    }
    init(e) {
        const s = this;
        if (s.initialized || s.mount(e) === !1) return s;
        s.emit("beforeInit"),
            s.params.breakpoints && s.setBreakpoint(),
            s.addClasses(),
            s.updateSize(),
            s.updateSlides(),
            s.params.watchOverflow && s.checkOverflow(),
            s.params.grabCursor && s.enabled && s.setGrabCursor(),
            s.params.loop && s.virtual && s.params.virtual.enabled
                ? s.slideTo(s.params.initialSlide + s.virtual.slidesBefore, 0, s.params.runCallbacksOnInit, !1, !0)
                : s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit, !1, !0),
            s.params.loop && s.loopCreate(void 0, !0),
            s.attachEvents();
        const n = [...s.el.querySelectorAll('[loading="lazy"]')];
        return (
            s.isElement && n.push(...s.hostEl.querySelectorAll('[loading="lazy"]')),
            n.forEach((r) => {
                r.complete
                    ? Rs(s, r)
                    : r.addEventListener("load", (a) => {
                          Rs(s, a.target);
                      });
            }),
            Oi(s),
            (s.initialized = !0),
            Oi(s),
            s.emit("init"),
            s.emit("afterInit"),
            s
        );
    }
    destroy(e, s) {
        e === void 0 && (e = !0), s === void 0 && (s = !0);
        const i = this,
            { params: n, el: r, wrapperEl: a, slides: o } = i;
        return (
            typeof i.params > "u" ||
                i.destroyed ||
                (i.emit("beforeDestroy"),
                (i.initialized = !1),
                i.detachEvents(),
                n.loop && i.loopDestroy(),
                s &&
                    (i.removeClasses(),
                    r && typeof r != "string" && r.removeAttribute("style"),
                    a && a.removeAttribute("style"),
                    o &&
                        o.length &&
                        o.forEach((l) => {
                            l.classList.remove(
                                n.slideVisibleClass,
                                n.slideFullyVisibleClass,
                                n.slideActiveClass,
                                n.slideNextClass,
                                n.slidePrevClass
                            ),
                                l.removeAttribute("style"),
                                l.removeAttribute("data-swiper-slide-index");
                        })),
                i.emit("destroy"),
                Object.keys(i.eventsListeners).forEach((l) => {
                    i.off(l);
                }),
                e !== !1 && (i.el && typeof i.el != "string" && (i.el.swiper = null), xa(i)),
                (i.destroyed = !0)),
            null
        );
    }
    static extendDefaults(e) {
        Ke(bi, e);
    }
    static get extendedDefaults() {
        return bi;
    }
    static get defaults() {
        return En;
    }
    static installModule(e) {
        ke.prototype.__modules__ || (ke.prototype.__modules__ = []);
        const s = ke.prototype.__modules__;
        typeof e == "function" && s.indexOf(e) < 0 && s.push(e);
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach((s) => ke.installModule(s)), ke) : (ke.installModule(e), ke);
    }
}
Object.keys(yi).forEach((t) => {
    Object.keys(yi[t]).forEach((e) => {
        ke.prototype[e] = yi[t][e];
    });
});
ke.use([Oa, $a]);
function Fo(t) {
    let { swiper: e, extendParams: s, on: i, emit: n } = t;
    s({
        virtual: {
            enabled: !1,
            slides: [],
            cache: !0,
            renderSlide: null,
            renderExternal: null,
            renderExternalUpdate: !0,
            addSlidesBefore: 0,
            addSlidesAfter: 0,
        },
    });
    let r;
    const a = $e();
    e.virtual = { cache: {}, from: void 0, to: void 0, slides: [], offset: 0, slidesGrid: [] };
    const o = a.createElement("div");
    function l(u, f) {
        const w = e.params.virtual;
        if (w.cache && e.virtual.cache[f]) return e.virtual.cache[f];
        let b;
        return (
            w.renderSlide
                ? ((b = w.renderSlide.call(e, u, f)), typeof b == "string" && (Et(o, b), (b = o.children[0])))
                : e.isElement
                  ? (b = Ze("swiper-slide"))
                  : (b = Ze("div", e.params.slideClass)),
            b.setAttribute("data-swiper-slide-index", f),
            w.renderSlide || Et(b, u),
            w.cache && (e.virtual.cache[f] = b),
            b
        );
    }
    function c(u, f, w) {
        const { slidesPerView: b, slidesPerGroup: h, centeredSlides: v, loop: y, initialSlide: E } = e.params;
        if (f && !y && E > 0) return;
        const { addSlidesBefore: L, addSlidesAfter: P } = e.params.virtual,
            { from: A, to: _, slides: M, slidesGrid: k, offset: O } = e.virtual;
        e.params.cssMode || e.updateActiveIndex();
        const $ = typeof w > "u" ? e.activeIndex || 0 : w;
        let D;
        e.rtlTranslate ? (D = "right") : (D = e.isHorizontal() ? "left" : "top");
        let q, H;
        v
            ? ((q = Math.floor(b / 2) + h + P), (H = Math.floor(b / 2) + h + L))
            : ((q = b + (h - 1) + P), (H = (y ? b : h) + L));
        let T = $ - H,
            C = $ + q;
        y || ((T = Math.max(T, 0)), (C = Math.min(C, M.length - 1)));
        let G = (e.slidesGrid[T] || 0) - (e.slidesGrid[0] || 0);
        y && $ >= H ? ((T -= H), v || (G += e.slidesGrid[0])) : y && $ < H && ((T = -H), v && (G += e.slidesGrid[0])),
            Object.assign(e.virtual, {
                from: T,
                to: C,
                offset: G,
                slidesGrid: e.slidesGrid,
                slidesBefore: H,
                slidesAfter: q,
            });
        function ae() {
            e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), n("virtualUpdate");
        }
        if (A === T && _ === C && !u) {
            e.slidesGrid !== k &&
                G !== O &&
                e.slides.forEach((R) => {
                    R.style[D] = `${G - Math.abs(e.cssOverflowAdjustment())}px`;
                }),
                e.updateProgress(),
                n("virtualUpdate");
            return;
        }
        if (e.params.virtual.renderExternal) {
            e.params.virtual.renderExternal.call(e, {
                offset: G,
                from: T,
                to: C,
                slides: (function () {
                    const N = [];
                    for (let oe = T; oe <= C; oe += 1) N.push(M[oe]);
                    return N;
                })(),
            }),
                e.params.virtual.renderExternalUpdate ? ae() : n("virtualUpdate");
            return;
        }
        const me = [],
            ge = [],
            Ne = (R) => {
                let N = R;
                return R < 0 ? (N = M.length + R) : N >= M.length && (N = N - M.length), N;
            };
        if (u)
            e.slides
                .filter((R) => R.matches(`.${e.params.slideClass}, swiper-slide`))
                .forEach((R) => {
                    R.remove();
                });
        else
            for (let R = A; R <= _; R += 1)
                if (R < T || R > C) {
                    const N = Ne(R);
                    e.slides
                        .filter((oe) =>
                            oe.matches(
                                `.${e.params.slideClass}[data-swiper-slide-index="${N}"], swiper-slide[data-swiper-slide-index="${N}"]`
                            )
                        )
                        .forEach((oe) => {
                            oe.remove();
                        });
                }
        const gt = y ? -M.length : 0,
            W = y ? M.length * 2 : M.length;
        for (let R = gt; R < W; R += 1)
            if (R >= T && R <= C) {
                const N = Ne(R);
                typeof _ > "u" || u ? ge.push(N) : (R > _ && ge.push(N), R < A && me.push(N));
            }
        if (
            (ge.forEach((R) => {
                e.slidesEl.append(l(M[R], R));
            }),
            y)
        )
            for (let R = me.length - 1; R >= 0; R -= 1) {
                const N = me[R];
                e.slidesEl.prepend(l(M[N], N));
            }
        else
            me.sort((R, N) => N - R),
                me.forEach((R) => {
                    e.slidesEl.prepend(l(M[R], R));
                });
        ze(e.slidesEl, ".swiper-slide, swiper-slide").forEach((R) => {
            R.style[D] = `${G - Math.abs(e.cssOverflowAdjustment())}px`;
        }),
            ae();
    }
    function d(u) {
        if (typeof u == "object" && "length" in u)
            for (let f = 0; f < u.length; f += 1) u[f] && e.virtual.slides.push(u[f]);
        else e.virtual.slides.push(u);
        c(!0);
    }
    function p(u) {
        const f = e.activeIndex;
        let w = f + 1,
            b = 1;
        if (Array.isArray(u)) {
            for (let h = 0; h < u.length; h += 1) u[h] && e.virtual.slides.unshift(u[h]);
            (w = f + u.length), (b = u.length);
        } else e.virtual.slides.unshift(u);
        if (e.params.virtual.cache) {
            const h = e.virtual.cache,
                v = {};
            Object.keys(h).forEach((y) => {
                const E = h[y],
                    L = E.getAttribute("data-swiper-slide-index");
                L && E.setAttribute("data-swiper-slide-index", parseInt(L, 10) + b), (v[parseInt(y, 10) + b] = E);
            }),
                (e.virtual.cache = v);
        }
        c(!0), e.slideTo(w, 0);
    }
    function g(u) {
        if (typeof u > "u" || u === null) return;
        let f = e.activeIndex;
        if (Array.isArray(u))
            for (let w = u.length - 1; w >= 0; w -= 1)
                e.params.virtual.cache &&
                    (delete e.virtual.cache[u[w]],
                    Object.keys(e.virtual.cache).forEach((b) => {
                        b > u &&
                            ((e.virtual.cache[b - 1] = e.virtual.cache[b]),
                            e.virtual.cache[b - 1].setAttribute("data-swiper-slide-index", b - 1),
                            delete e.virtual.cache[b]);
                    })),
                    e.virtual.slides.splice(u[w], 1),
                    u[w] < f && (f -= 1),
                    (f = Math.max(f, 0));
        else
            e.params.virtual.cache &&
                (delete e.virtual.cache[u],
                Object.keys(e.virtual.cache).forEach((w) => {
                    w > u &&
                        ((e.virtual.cache[w - 1] = e.virtual.cache[w]),
                        e.virtual.cache[w - 1].setAttribute("data-swiper-slide-index", w - 1),
                        delete e.virtual.cache[w]);
                })),
                e.virtual.slides.splice(u, 1),
                u < f && (f -= 1),
                (f = Math.max(f, 0));
        c(!0), e.slideTo(f, 0);
    }
    function m() {
        (e.virtual.slides = []), e.params.virtual.cache && (e.virtual.cache = {}), c(!0), e.slideTo(0, 0);
    }
    i("beforeInit", () => {
        if (!e.params.virtual.enabled) return;
        let u;
        if (typeof e.passedParams.virtual.slides > "u") {
            const f = [...e.slidesEl.children].filter((w) => w.matches(`.${e.params.slideClass}, swiper-slide`));
            f &&
                f.length &&
                ((e.virtual.slides = [...f]),
                (u = !0),
                f.forEach((w, b) => {
                    w.setAttribute("data-swiper-slide-index", b), (e.virtual.cache[b] = w), w.remove();
                }));
        }
        u || (e.virtual.slides = e.params.virtual.slides),
            e.classNames.push(`${e.params.containerModifierClass}virtual`),
            (e.params.watchSlidesProgress = !0),
            (e.originalParams.watchSlidesProgress = !0),
            c(!1, !0);
    }),
        i("setTranslate", () => {
            e.params.virtual.enabled &&
                (e.params.cssMode && !e._immediateVirtual
                    ? (clearTimeout(r),
                      (r = setTimeout(() => {
                          c();
                      }, 100)))
                    : c());
        }),
        i("init update resize", () => {
            e.params.virtual.enabled &&
                e.params.cssMode &&
                cs(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`);
        }),
        Object.assign(e.virtual, { appendSlide: d, prependSlide: p, removeSlide: g, removeAllSlides: m, update: c });
}
function Bo(t) {
    let { swiper: e, extendParams: s, on: i, emit: n } = t;
    const r = $e(),
        a = Ce();
    (e.keyboard = { enabled: !1 }), s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } });
    function o(d) {
        if (!e.enabled) return;
        const { rtlTranslate: p } = e;
        let g = d;
        g.originalEvent && (g = g.originalEvent);
        const m = g.keyCode || g.charCode,
            u = e.params.keyboard.pageUpDown,
            f = u && m === 33,
            w = u && m === 34,
            b = m === 37,
            h = m === 39,
            v = m === 38,
            y = m === 40;
        if (
            (!e.allowSlideNext && ((e.isHorizontal() && h) || (e.isVertical() && y) || w)) ||
            (!e.allowSlidePrev && ((e.isHorizontal() && b) || (e.isVertical() && v) || f))
        )
            return !1;
        if (
            !(g.shiftKey || g.altKey || g.ctrlKey || g.metaKey) &&
            !(
                r.activeElement &&
                (r.activeElement.isContentEditable ||
                    (r.activeElement.nodeName &&
                        (r.activeElement.nodeName.toLowerCase() === "input" ||
                            r.activeElement.nodeName.toLowerCase() === "textarea")))
            )
        ) {
            if (e.params.keyboard.onlyInViewport && (f || w || b || h || v || y)) {
                let E = !1;
                if (
                    Vt(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 &&
                    Vt(e.el, `.${e.params.slideActiveClass}`).length === 0
                )
                    return;
                const L = e.el,
                    P = L.clientWidth,
                    A = L.clientHeight,
                    _ = a.innerWidth,
                    M = a.innerHeight,
                    k = Ws(L);
                p && (k.left -= L.scrollLeft);
                const O = [
                    [k.left, k.top],
                    [k.left + P, k.top],
                    [k.left, k.top + A],
                    [k.left + P, k.top + A],
                ];
                for (let $ = 0; $ < O.length; $ += 1) {
                    const D = O[$];
                    if (D[0] >= 0 && D[0] <= _ && D[1] >= 0 && D[1] <= M) {
                        if (D[0] === 0 && D[1] === 0) continue;
                        E = !0;
                    }
                }
                if (!E) return;
            }
            e.isHorizontal()
                ? ((f || w || b || h) && (g.preventDefault ? g.preventDefault() : (g.returnValue = !1)),
                  (((w || h) && !p) || ((f || b) && p)) && e.slideNext(),
                  (((f || b) && !p) || ((w || h) && p)) && e.slidePrev())
                : ((f || w || v || y) && (g.preventDefault ? g.preventDefault() : (g.returnValue = !1)),
                  (w || y) && e.slideNext(),
                  (f || v) && e.slidePrev()),
                n("keyPress", m);
        }
    }
    function l() {
        e.keyboard.enabled || (r.addEventListener("keydown", o), (e.keyboard.enabled = !0));
    }
    function c() {
        e.keyboard.enabled && (r.removeEventListener("keydown", o), (e.keyboard.enabled = !1));
    }
    i("init", () => {
        e.params.keyboard.enabled && l();
    }),
        i("destroy", () => {
            e.keyboard.enabled && c();
        }),
        Object.assign(e.keyboard, { enable: l, disable: c });
}
function Vo(t) {
    let { swiper: e, extendParams: s, on: i, emit: n } = t;
    const r = Ce();
    s({
        mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarget: "container",
            thresholdDelta: null,
            thresholdTime: null,
            noMousewheelClass: "swiper-no-mousewheel",
        },
    }),
        (e.mousewheel = { enabled: !1 });
    let a,
        o = it(),
        l;
    const c = [];
    function d(v) {
        let P = 0,
            A = 0,
            _ = 0,
            M = 0;
        return (
            "detail" in v && (A = v.detail),
            "wheelDelta" in v && (A = -v.wheelDelta / 120),
            "wheelDeltaY" in v && (A = -v.wheelDeltaY / 120),
            "wheelDeltaX" in v && (P = -v.wheelDeltaX / 120),
            "axis" in v && v.axis === v.HORIZONTAL_AXIS && ((P = A), (A = 0)),
            (_ = P * 10),
            (M = A * 10),
            "deltaY" in v && (M = v.deltaY),
            "deltaX" in v && (_ = v.deltaX),
            v.shiftKey && !_ && ((_ = M), (M = 0)),
            (_ || M) && v.deltaMode && (v.deltaMode === 1 ? ((_ *= 40), (M *= 40)) : ((_ *= 800), (M *= 800))),
            _ && !P && (P = _ < 1 ? -1 : 1),
            M && !A && (A = M < 1 ? -1 : 1),
            { spinX: P, spinY: A, pixelX: _, pixelY: M }
        );
    }
    function p() {
        e.enabled && (e.mouseEntered = !0);
    }
    function g() {
        e.enabled && (e.mouseEntered = !1);
    }
    function m(v) {
        return (e.params.mousewheel.thresholdDelta && v.delta < e.params.mousewheel.thresholdDelta) ||
            (e.params.mousewheel.thresholdTime && it() - o < e.params.mousewheel.thresholdTime)
            ? !1
            : v.delta >= 6 && it() - o < 60
              ? !0
              : (v.direction < 0
                    ? (!e.isEnd || e.params.loop) && !e.animating && (e.slideNext(), n("scroll", v.raw))
                    : (!e.isBeginning || e.params.loop) && !e.animating && (e.slidePrev(), n("scroll", v.raw)),
                (o = new r.Date().getTime()),
                !1);
    }
    function u(v) {
        const y = e.params.mousewheel;
        if (v.direction < 0) {
            if (e.isEnd && !e.params.loop && y.releaseOnEdges) return !0;
        } else if (e.isBeginning && !e.params.loop && y.releaseOnEdges) return !0;
        return !1;
    }
    function f(v) {
        let y = v,
            E = !0;
        if (!e.enabled || v.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)) return;
        const L = e.params.mousewheel;
        e.params.cssMode && y.preventDefault();
        let P = e.el;
        e.params.mousewheel.eventsTarget !== "container" &&
            (P = document.querySelector(e.params.mousewheel.eventsTarget));
        const A = P && P.contains(y.target);
        if (!e.mouseEntered && !A && !L.releaseOnEdges) return !0;
        y.originalEvent && (y = y.originalEvent);
        let _ = 0;
        const M = e.rtlTranslate ? -1 : 1,
            k = d(y);
        if (L.forceToAxis)
            if (e.isHorizontal())
                if (Math.abs(k.pixelX) > Math.abs(k.pixelY)) _ = -k.pixelX * M;
                else return !0;
            else if (Math.abs(k.pixelY) > Math.abs(k.pixelX)) _ = -k.pixelY;
            else return !0;
        else _ = Math.abs(k.pixelX) > Math.abs(k.pixelY) ? -k.pixelX * M : -k.pixelY;
        if (_ === 0) return !0;
        L.invert && (_ = -_);
        let O = e.getTranslate() + _ * L.sensitivity;
        if (
            (O >= e.minTranslate() && (O = e.minTranslate()),
            O <= e.maxTranslate() && (O = e.maxTranslate()),
            (E = e.params.loop ? !0 : !(O === e.minTranslate() || O === e.maxTranslate())),
            E && e.params.nested && y.stopPropagation(),
            !e.params.freeMode || !e.params.freeMode.enabled)
        ) {
            const $ = { time: it(), delta: Math.abs(_), direction: Math.sign(_), raw: v };
            c.length >= 2 && c.shift();
            const D = c.length ? c[c.length - 1] : void 0;
            if (
                (c.push($),
                D ? ($.direction !== D.direction || $.delta > D.delta || $.time > D.time + 150) && m($) : m($),
                u($))
            )
                return !0;
        } else {
            const $ = { time: it(), delta: Math.abs(_), direction: Math.sign(_) },
                D = l && $.time < l.time + 500 && $.delta <= l.delta && $.direction === l.direction;
            if (!D) {
                l = void 0;
                let q = e.getTranslate() + _ * L.sensitivity;
                const H = e.isBeginning,
                    T = e.isEnd;
                if (
                    (q >= e.minTranslate() && (q = e.minTranslate()),
                    q <= e.maxTranslate() && (q = e.maxTranslate()),
                    e.setTransition(0),
                    e.setTranslate(q),
                    e.updateProgress(),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses(),
                    ((!H && e.isBeginning) || (!T && e.isEnd)) && e.updateSlidesClasses(),
                    e.params.loop && e.loopFix({ direction: $.direction < 0 ? "next" : "prev", byMousewheel: !0 }),
                    e.params.freeMode.sticky)
                ) {
                    clearTimeout(a), (a = void 0), c.length >= 15 && c.shift();
                    const C = c.length ? c[c.length - 1] : void 0,
                        G = c[0];
                    if ((c.push($), C && ($.delta > C.delta || $.direction !== C.direction))) c.splice(0);
                    else if (c.length >= 15 && $.time - G.time < 500 && G.delta - $.delta >= 1 && $.delta <= 6) {
                        const ae = _ > 0 ? 0.8 : 0.2;
                        (l = $),
                            c.splice(0),
                            (a = es(() => {
                                e.destroyed || !e.params || e.slideToClosest(e.params.speed, !0, void 0, ae);
                            }, 0));
                    }
                    a ||
                        (a = es(() => {
                            if (e.destroyed || !e.params) return;
                            const ae = 0.5;
                            (l = $), c.splice(0), e.slideToClosest(e.params.speed, !0, void 0, ae);
                        }, 500));
                }
                if (
                    (D || n("scroll", y),
                    e.params.autoplay && e.params.autoplay.disableOnInteraction && e.autoplay.stop(),
                    L.releaseOnEdges && (q === e.minTranslate() || q === e.maxTranslate()))
                )
                    return !0;
            }
        }
        return y.preventDefault ? y.preventDefault() : (y.returnValue = !1), !1;
    }
    function w(v) {
        let y = e.el;
        e.params.mousewheel.eventsTarget !== "container" &&
            (y = document.querySelector(e.params.mousewheel.eventsTarget)),
            y[v]("mouseenter", p),
            y[v]("mouseleave", g),
            y[v]("wheel", f);
    }
    function b() {
        return e.params.cssMode
            ? (e.wrapperEl.removeEventListener("wheel", f), !0)
            : e.mousewheel.enabled
              ? !1
              : (w("addEventListener"), (e.mousewheel.enabled = !0), !0);
    }
    function h() {
        return e.params.cssMode
            ? (e.wrapperEl.addEventListener(event, f), !0)
            : e.mousewheel.enabled
              ? (w("removeEventListener"), (e.mousewheel.enabled = !1), !0)
              : !1;
    }
    i("init", () => {
        !e.params.mousewheel.enabled && e.params.cssMode && h(), e.params.mousewheel.enabled && b();
    }),
        i("destroy", () => {
            e.params.cssMode && b(), e.mousewheel.enabled && h();
        }),
        Object.assign(e.mousewheel, { enable: b, disable: h });
}
function Ki(t, e, s, i) {
    return (
        t.params.createElements &&
            Object.keys(i).forEach((n) => {
                if (!s[n] && s.auto === !0) {
                    let r = ze(t.el, `.${i[n]}`)[0];
                    r || ((r = Ze("div", i[n])), (r.className = i[n]), t.el.append(r)), (s[n] = r), (e[n] = r);
                }
            }),
        s
    );
}
function No(t) {
    let { swiper: e, extendParams: s, on: i, emit: n } = t;
    s({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled",
        },
    }),
        (e.navigation = { nextEl: null, prevEl: null });
    function r(u) {
        let f;
        return u && typeof u == "string" && e.isElement && ((f = e.el.querySelector(u) || e.hostEl.querySelector(u)), f)
            ? f
            : (u &&
                  (typeof u == "string" && (f = [...document.querySelectorAll(u)]),
                  e.params.uniqueNavElements &&
                  typeof u == "string" &&
                  f &&
                  f.length > 1 &&
                  e.el.querySelectorAll(u).length === 1
                      ? (f = e.el.querySelector(u))
                      : f && f.length === 1 && (f = f[0])),
              u && !f ? u : f);
    }
    function a(u, f) {
        const w = e.params.navigation;
        (u = fe(u)),
            u.forEach((b) => {
                b &&
                    (b.classList[f ? "add" : "remove"](...w.disabledClass.split(" ")),
                    b.tagName === "BUTTON" && (b.disabled = f),
                    e.params.watchOverflow && e.enabled && b.classList[e.isLocked ? "add" : "remove"](w.lockClass));
            });
    }
    function o() {
        const { nextEl: u, prevEl: f } = e.navigation;
        if (e.params.loop) {
            a(f, !1), a(u, !1);
            return;
        }
        a(f, e.isBeginning && !e.params.rewind), a(u, e.isEnd && !e.params.rewind);
    }
    function l(u) {
        u.preventDefault(),
            !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), n("navigationPrev"));
    }
    function c(u) {
        u.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), n("navigationNext"));
    }
    function d() {
        const u = e.params.navigation;
        if (
            ((e.params.navigation = Ki(e, e.originalParams.navigation, e.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev",
            })),
            !(u.nextEl || u.prevEl))
        )
            return;
        let f = r(u.nextEl),
            w = r(u.prevEl);
        Object.assign(e.navigation, { nextEl: f, prevEl: w }), (f = fe(f)), (w = fe(w));
        const b = (h, v) => {
            h && h.addEventListener("click", v === "next" ? c : l),
                !e.enabled && h && h.classList.add(...u.lockClass.split(" "));
        };
        f.forEach((h) => b(h, "next")), w.forEach((h) => b(h, "prev"));
    }
    function p() {
        let { nextEl: u, prevEl: f } = e.navigation;
        (u = fe(u)), (f = fe(f));
        const w = (b, h) => {
            b.removeEventListener("click", h === "next" ? c : l),
                b.classList.remove(...e.params.navigation.disabledClass.split(" "));
        };
        u.forEach((b) => w(b, "next")), f.forEach((b) => w(b, "prev"));
    }
    i("init", () => {
        e.params.navigation.enabled === !1 ? m() : (d(), o());
    }),
        i("toEdge fromEdge lock unlock", () => {
            o();
        }),
        i("destroy", () => {
            p();
        }),
        i("enable disable", () => {
            let { nextEl: u, prevEl: f } = e.navigation;
            if (((u = fe(u)), (f = fe(f)), e.enabled)) {
                o();
                return;
            }
            [...u, ...f].filter((w) => !!w).forEach((w) => w.classList.add(e.params.navigation.lockClass));
        }),
        i("click", (u, f) => {
            let { nextEl: w, prevEl: b } = e.navigation;
            (w = fe(w)), (b = fe(b));
            const h = f.target;
            let v = b.includes(h) || w.includes(h);
            if (e.isElement && !v) {
                const y = f.path || (f.composedPath && f.composedPath());
                y && (v = y.find((E) => w.includes(E) || b.includes(E)));
            }
            if (e.params.navigation.hideOnClick && !v) {
                if (
                    e.pagination &&
                    e.params.pagination &&
                    e.params.pagination.clickable &&
                    (e.pagination.el === h || e.pagination.el.contains(h))
                )
                    return;
                let y;
                w.length
                    ? (y = w[0].classList.contains(e.params.navigation.hiddenClass))
                    : b.length && (y = b[0].classList.contains(e.params.navigation.hiddenClass)),
                    n(y === !0 ? "navigationShow" : "navigationHide"),
                    [...w, ...b].filter((E) => !!E).forEach((E) => E.classList.toggle(e.params.navigation.hiddenClass));
            }
        });
    const g = () => {
            e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), d(), o();
        },
        m = () => {
            e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), p();
        };
    Object.assign(e.navigation, { enable: g, disable: m, update: o, init: d, destroy: p });
}
function yt(t) {
    return (
        t === void 0 && (t = ""),
        `.${t
            .trim()
            .replace(/([\.:!+\/()[\]])/g, "\\$1")
            .replace(/ /g, ".")}`
    );
}
function qo(t) {
    let { swiper: e, extendParams: s, on: i, emit: n } = t;
    const r = "swiper-pagination";
    s({
        pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: (h) => h,
            formatFractionTotal: (h) => h,
            bulletClass: `${r}-bullet`,
            bulletActiveClass: `${r}-bullet-active`,
            modifierClass: `${r}-`,
            currentClass: `${r}-current`,
            totalClass: `${r}-total`,
            hiddenClass: `${r}-hidden`,
            progressbarFillClass: `${r}-progressbar-fill`,
            progressbarOppositeClass: `${r}-progressbar-opposite`,
            clickableClass: `${r}-clickable`,
            lockClass: `${r}-lock`,
            horizontalClass: `${r}-horizontal`,
            verticalClass: `${r}-vertical`,
            paginationDisabledClass: `${r}-disabled`,
        },
    }),
        (e.pagination = { el: null, bullets: [] });
    let a,
        o = 0;
    function l() {
        return (
            !e.params.pagination.el ||
            !e.pagination.el ||
            (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
        );
    }
    function c(h, v) {
        const { bulletActiveClass: y } = e.params.pagination;
        h &&
            ((h = h[`${v === "prev" ? "previous" : "next"}ElementSibling`]),
            h &&
                (h.classList.add(`${y}-${v}`),
                (h = h[`${v === "prev" ? "previous" : "next"}ElementSibling`]),
                h && h.classList.add(`${y}-${v}-${v}`)));
    }
    function d(h, v, y) {
        if (((h = h % y), (v = v % y), v === h + 1)) return "next";
        if (v === h - 1) return "previous";
    }
    function p(h) {
        const v = h.target.closest(yt(e.params.pagination.bulletClass));
        if (!v) return;
        h.preventDefault();
        const y = bs(v) * e.params.slidesPerGroup;
        if (e.params.loop) {
            if (e.realIndex === y) return;
            const E = d(e.realIndex, y, e.slides.length);
            E === "next" ? e.slideNext() : E === "previous" ? e.slidePrev() : e.slideToLoop(y);
        } else e.slideTo(y);
    }
    function g() {
        const h = e.rtl,
            v = e.params.pagination;
        if (l()) return;
        let y = e.pagination.el;
        y = fe(y);
        let E, L;
        const P = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            A = e.params.loop ? Math.ceil(P / e.params.slidesPerGroup) : e.snapGrid.length;
        if (
            (e.params.loop
                ? ((L = e.previousRealIndex || 0),
                  (E = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex))
                : typeof e.snapIndex < "u"
                  ? ((E = e.snapIndex), (L = e.previousSnapIndex))
                  : ((L = e.previousIndex || 0), (E = e.activeIndex || 0)),
            v.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0)
        ) {
            const _ = e.pagination.bullets;
            let M, k, O;
            if (
                (v.dynamicBullets &&
                    ((a = Ai(_[0], e.isHorizontal() ? "width" : "height")),
                    y.forEach(($) => {
                        $.style[e.isHorizontal() ? "width" : "height"] = `${a * (v.dynamicMainBullets + 4)}px`;
                    }),
                    v.dynamicMainBullets > 1 &&
                        L !== void 0 &&
                        ((o += E - (L || 0)),
                        o > v.dynamicMainBullets - 1 ? (o = v.dynamicMainBullets - 1) : o < 0 && (o = 0)),
                    (M = Math.max(E - o, 0)),
                    (k = M + (Math.min(_.length, v.dynamicMainBullets) - 1)),
                    (O = (k + M) / 2)),
                _.forEach(($) => {
                    const D = [
                        ...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(
                            (q) => `${v.bulletActiveClass}${q}`
                        ),
                    ]
                        .map((q) => (typeof q == "string" && q.includes(" ") ? q.split(" ") : q))
                        .flat();
                    $.classList.remove(...D);
                }),
                y.length > 1)
            )
                _.forEach(($) => {
                    const D = bs($);
                    D === E
                        ? $.classList.add(...v.bulletActiveClass.split(" "))
                        : e.isElement && $.setAttribute("part", "bullet"),
                        v.dynamicBullets &&
                            (D >= M && D <= k && $.classList.add(...`${v.bulletActiveClass}-main`.split(" ")),
                            D === M && c($, "prev"),
                            D === k && c($, "next"));
                });
            else {
                const $ = _[E];
                if (
                    ($ && $.classList.add(...v.bulletActiveClass.split(" ")),
                    e.isElement &&
                        _.forEach((D, q) => {
                            D.setAttribute("part", q === E ? "bullet-active" : "bullet");
                        }),
                    v.dynamicBullets)
                ) {
                    const D = _[M],
                        q = _[k];
                    for (let H = M; H <= k; H += 1)
                        _[H] && _[H].classList.add(...`${v.bulletActiveClass}-main`.split(" "));
                    c(D, "prev"), c(q, "next");
                }
            }
            if (v.dynamicBullets) {
                const $ = Math.min(_.length, v.dynamicMainBullets + 4),
                    D = (a * $ - a) / 2 - O * a,
                    q = h ? "right" : "left";
                _.forEach((H) => {
                    H.style[e.isHorizontal() ? q : "top"] = `${D}px`;
                });
            }
        }
        y.forEach((_, M) => {
            if (
                (v.type === "fraction" &&
                    (_.querySelectorAll(yt(v.currentClass)).forEach((k) => {
                        k.textContent = v.formatFractionCurrent(E + 1);
                    }),
                    _.querySelectorAll(yt(v.totalClass)).forEach((k) => {
                        k.textContent = v.formatFractionTotal(A);
                    })),
                v.type === "progressbar")
            ) {
                let k;
                v.progressbarOpposite
                    ? (k = e.isHorizontal() ? "vertical" : "horizontal")
                    : (k = e.isHorizontal() ? "horizontal" : "vertical");
                const O = (E + 1) / A;
                let $ = 1,
                    D = 1;
                k === "horizontal" ? ($ = O) : (D = O),
                    _.querySelectorAll(yt(v.progressbarFillClass)).forEach((q) => {
                        (q.style.transform = `translate3d(0,0,0) scaleX(${$}) scaleY(${D})`),
                            (q.style.transitionDuration = `${e.params.speed}ms`);
                    });
            }
            v.type === "custom" && v.renderCustom
                ? (Et(_, v.renderCustom(e, E + 1, A)), M === 0 && n("paginationRender", _))
                : (M === 0 && n("paginationRender", _), n("paginationUpdate", _)),
                e.params.watchOverflow && e.enabled && _.classList[e.isLocked ? "add" : "remove"](v.lockClass);
        });
    }
    function m() {
        const h = e.params.pagination;
        if (l()) return;
        const v =
            e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.grid && e.params.grid.rows > 1
                  ? e.slides.length / Math.ceil(e.params.grid.rows)
                  : e.slides.length;
        let y = e.pagination.el;
        y = fe(y);
        let E = "";
        if (h.type === "bullets") {
            let L = e.params.loop ? Math.ceil(v / e.params.slidesPerGroup) : e.snapGrid.length;
            e.params.freeMode && e.params.freeMode.enabled && L > v && (L = v);
            for (let P = 0; P < L; P += 1)
                h.renderBullet
                    ? (E += h.renderBullet.call(e, P, h.bulletClass))
                    : (E += `<${h.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${h.bulletClass}"></${h.bulletElement}>`);
        }
        h.type === "fraction" &&
            (h.renderFraction
                ? (E = h.renderFraction.call(e, h.currentClass, h.totalClass))
                : (E = `<span class="${h.currentClass}"></span> / <span class="${h.totalClass}"></span>`)),
            h.type === "progressbar" &&
                (h.renderProgressbar
                    ? (E = h.renderProgressbar.call(e, h.progressbarFillClass))
                    : (E = `<span class="${h.progressbarFillClass}"></span>`)),
            (e.pagination.bullets = []),
            y.forEach((L) => {
                h.type !== "custom" && Et(L, E || ""),
                    h.type === "bullets" && e.pagination.bullets.push(...L.querySelectorAll(yt(h.bulletClass)));
            }),
            h.type !== "custom" && n("paginationRender", y[0]);
    }
    function u() {
        e.params.pagination = Ki(e, e.originalParams.pagination, e.params.pagination, { el: "swiper-pagination" });
        const h = e.params.pagination;
        if (!h.el) return;
        let v;
        typeof h.el == "string" && e.isElement && (v = e.el.querySelector(h.el)),
            !v && typeof h.el == "string" && (v = [...document.querySelectorAll(h.el)]),
            v || (v = h.el),
            !(!v || v.length === 0) &&
                (e.params.uniqueNavElements &&
                    typeof h.el == "string" &&
                    Array.isArray(v) &&
                    v.length > 1 &&
                    ((v = [...e.el.querySelectorAll(h.el)]),
                    v.length > 1 && (v = v.find((y) => Vt(y, ".swiper")[0] === e.el))),
                Array.isArray(v) && v.length === 1 && (v = v[0]),
                Object.assign(e.pagination, { el: v }),
                (v = fe(v)),
                v.forEach((y) => {
                    h.type === "bullets" && h.clickable && y.classList.add(...(h.clickableClass || "").split(" ")),
                        y.classList.add(h.modifierClass + h.type),
                        y.classList.add(e.isHorizontal() ? h.horizontalClass : h.verticalClass),
                        h.type === "bullets" &&
                            h.dynamicBullets &&
                            (y.classList.add(`${h.modifierClass}${h.type}-dynamic`),
                            (o = 0),
                            h.dynamicMainBullets < 1 && (h.dynamicMainBullets = 1)),
                        h.type === "progressbar" &&
                            h.progressbarOpposite &&
                            y.classList.add(h.progressbarOppositeClass),
                        h.clickable && y.addEventListener("click", p),
                        e.enabled || y.classList.add(h.lockClass);
                }));
    }
    function f() {
        const h = e.params.pagination;
        if (l()) return;
        let v = e.pagination.el;
        v &&
            ((v = fe(v)),
            v.forEach((y) => {
                y.classList.remove(h.hiddenClass),
                    y.classList.remove(h.modifierClass + h.type),
                    y.classList.remove(e.isHorizontal() ? h.horizontalClass : h.verticalClass),
                    h.clickable &&
                        (y.classList.remove(...(h.clickableClass || "").split(" ")), y.removeEventListener("click", p));
            })),
            e.pagination.bullets &&
                e.pagination.bullets.forEach((y) => y.classList.remove(...h.bulletActiveClass.split(" ")));
    }
    i("changeDirection", () => {
        if (!e.pagination || !e.pagination.el) return;
        const h = e.params.pagination;
        let { el: v } = e.pagination;
        (v = fe(v)),
            v.forEach((y) => {
                y.classList.remove(h.horizontalClass, h.verticalClass),
                    y.classList.add(e.isHorizontal() ? h.horizontalClass : h.verticalClass);
            });
    }),
        i("init", () => {
            e.params.pagination.enabled === !1 ? b() : (u(), m(), g());
        }),
        i("activeIndexChange", () => {
            typeof e.snapIndex > "u" && g();
        }),
        i("snapIndexChange", () => {
            g();
        }),
        i("snapGridLengthChange", () => {
            m(), g();
        }),
        i("destroy", () => {
            f();
        }),
        i("enable disable", () => {
            let { el: h } = e.pagination;
            h &&
                ((h = fe(h)),
                h.forEach((v) => v.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)));
        }),
        i("lock unlock", () => {
            g();
        }),
        i("click", (h, v) => {
            const y = v.target,
                E = fe(e.pagination.el);
            if (
                e.params.pagination.el &&
                e.params.pagination.hideOnClick &&
                E &&
                E.length > 0 &&
                !y.classList.contains(e.params.pagination.bulletClass)
            ) {
                if (
                    e.navigation &&
                    ((e.navigation.nextEl && y === e.navigation.nextEl) ||
                        (e.navigation.prevEl && y === e.navigation.prevEl))
                )
                    return;
                const L = E[0].classList.contains(e.params.pagination.hiddenClass);
                n(L === !0 ? "paginationShow" : "paginationHide"),
                    E.forEach((P) => P.classList.toggle(e.params.pagination.hiddenClass));
            }
        });
    const w = () => {
            e.el.classList.remove(e.params.pagination.paginationDisabledClass);
            let { el: h } = e.pagination;
            h && ((h = fe(h)), h.forEach((v) => v.classList.remove(e.params.pagination.paginationDisabledClass))),
                u(),
                m(),
                g();
        },
        b = () => {
            e.el.classList.add(e.params.pagination.paginationDisabledClass);
            let { el: h } = e.pagination;
            h && ((h = fe(h)), h.forEach((v) => v.classList.add(e.params.pagination.paginationDisabledClass))), f();
        };
    Object.assign(e.pagination, { enable: w, disable: b, render: m, update: g, init: u, destroy: f });
}
function jo(t) {
    let { swiper: e, extendParams: s, on: i, emit: n } = t;
    const r = $e();
    let a = !1,
        o = null,
        l = null,
        c,
        d,
        p,
        g;
    s({
        scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
            scrollbarDisabledClass: "swiper-scrollbar-disabled",
            horizontalClass: "swiper-scrollbar-horizontal",
            verticalClass: "swiper-scrollbar-vertical",
        },
    }),
        (e.scrollbar = { el: null, dragEl: null });
    function m() {
        if (!e.params.scrollbar.el || !e.scrollbar.el) return;
        const { scrollbar: O, rtlTranslate: $ } = e,
            { dragEl: D, el: q } = O,
            H = e.params.scrollbar,
            T = e.params.loop ? e.progressLoop : e.progress;
        let C = d,
            G = (p - d) * T;
        $
            ? ((G = -G), G > 0 ? ((C = d - G), (G = 0)) : -G + d > p && (C = p + G))
            : G < 0
              ? ((C = d + G), (G = 0))
              : G + d > p && (C = p - G),
            e.isHorizontal()
                ? ((D.style.transform = `translate3d(${G}px, 0, 0)`), (D.style.width = `${C}px`))
                : ((D.style.transform = `translate3d(0px, ${G}px, 0)`), (D.style.height = `${C}px`)),
            H.hide &&
                (clearTimeout(o),
                (q.style.opacity = 1),
                (o = setTimeout(() => {
                    (q.style.opacity = 0), (q.style.transitionDuration = "400ms");
                }, 1e3)));
    }
    function u(O) {
        !e.params.scrollbar.el || !e.scrollbar.el || (e.scrollbar.dragEl.style.transitionDuration = `${O}ms`);
    }
    function f() {
        if (!e.params.scrollbar.el || !e.scrollbar.el) return;
        const { scrollbar: O } = e,
            { dragEl: $, el: D } = O;
        ($.style.width = ""),
            ($.style.height = ""),
            (p = e.isHorizontal() ? D.offsetWidth : D.offsetHeight),
            (g =
                e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0))),
            e.params.scrollbar.dragSize === "auto" ? (d = p * g) : (d = parseInt(e.params.scrollbar.dragSize, 10)),
            e.isHorizontal() ? ($.style.width = `${d}px`) : ($.style.height = `${d}px`),
            g >= 1 ? (D.style.display = "none") : (D.style.display = ""),
            e.params.scrollbar.hide && (D.style.opacity = 0),
            e.params.watchOverflow &&
                e.enabled &&
                O.el.classList[e.isLocked ? "add" : "remove"](e.params.scrollbar.lockClass);
    }
    function w(O) {
        return e.isHorizontal() ? O.clientX : O.clientY;
    }
    function b(O) {
        const { scrollbar: $, rtlTranslate: D } = e,
            { el: q } = $;
        let H;
        (H = (w(O) - Ws(q)[e.isHorizontal() ? "left" : "top"] - (c !== null ? c : d / 2)) / (p - d)),
            (H = Math.max(Math.min(H, 1), 0)),
            D && (H = 1 - H);
        const T = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * H;
        e.updateProgress(T), e.setTranslate(T), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    function h(O) {
        const $ = e.params.scrollbar,
            { scrollbar: D, wrapperEl: q } = e,
            { el: H, dragEl: T } = D;
        (a = !0),
            (c = O.target === T ? w(O) - O.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null),
            O.preventDefault(),
            O.stopPropagation(),
            (q.style.transitionDuration = "100ms"),
            (T.style.transitionDuration = "100ms"),
            b(O),
            clearTimeout(l),
            (H.style.transitionDuration = "0ms"),
            $.hide && (H.style.opacity = 1),
            e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "none"),
            n("scrollbarDragStart", O);
    }
    function v(O) {
        const { scrollbar: $, wrapperEl: D } = e,
            { el: q, dragEl: H } = $;
        a &&
            (O.preventDefault && O.cancelable ? O.preventDefault() : (O.returnValue = !1),
            b(O),
            (D.style.transitionDuration = "0ms"),
            (q.style.transitionDuration = "0ms"),
            (H.style.transitionDuration = "0ms"),
            n("scrollbarDragMove", O));
    }
    function y(O) {
        const $ = e.params.scrollbar,
            { scrollbar: D, wrapperEl: q } = e,
            { el: H } = D;
        a &&
            ((a = !1),
            e.params.cssMode && ((e.wrapperEl.style["scroll-snap-type"] = ""), (q.style.transitionDuration = "")),
            $.hide &&
                (clearTimeout(l),
                (l = es(() => {
                    (H.style.opacity = 0), (H.style.transitionDuration = "400ms");
                }, 1e3))),
            n("scrollbarDragEnd", O),
            $.snapOnRelease && e.slideToClosest());
    }
    function E(O) {
        const { scrollbar: $, params: D } = e,
            q = $.el;
        if (!q) return;
        const H = q,
            T = D.passiveListeners ? { passive: !1, capture: !1 } : !1,
            C = D.passiveListeners ? { passive: !0, capture: !1 } : !1;
        if (!H) return;
        const G = O === "on" ? "addEventListener" : "removeEventListener";
        H[G]("pointerdown", h, T), r[G]("pointermove", v, T), r[G]("pointerup", y, C);
    }
    function L() {
        !e.params.scrollbar.el || !e.scrollbar.el || E("on");
    }
    function P() {
        !e.params.scrollbar.el || !e.scrollbar.el || E("off");
    }
    function A() {
        const { scrollbar: O, el: $ } = e;
        e.params.scrollbar = Ki(e, e.originalParams.scrollbar, e.params.scrollbar, { el: "swiper-scrollbar" });
        const D = e.params.scrollbar;
        if (!D.el) return;
        let q;
        if ((typeof D.el == "string" && e.isElement && (q = e.el.querySelector(D.el)), !q && typeof D.el == "string")) {
            if (((q = r.querySelectorAll(D.el)), !q.length)) return;
        } else q || (q = D.el);
        e.params.uniqueNavElements &&
            typeof D.el == "string" &&
            q.length > 1 &&
            $.querySelectorAll(D.el).length === 1 &&
            (q = $.querySelector(D.el)),
            q.length > 0 && (q = q[0]),
            q.classList.add(e.isHorizontal() ? D.horizontalClass : D.verticalClass);
        let H;
        q &&
            ((H = q.querySelector(yt(e.params.scrollbar.dragClass))),
            H || ((H = Ze("div", e.params.scrollbar.dragClass)), q.append(H))),
            Object.assign(O, { el: q, dragEl: H }),
            D.draggable && L(),
            q && q.classList[e.enabled ? "remove" : "add"](...Pt(e.params.scrollbar.lockClass));
    }
    function _() {
        const O = e.params.scrollbar,
            $ = e.scrollbar.el;
        $ && $.classList.remove(...Pt(e.isHorizontal() ? O.horizontalClass : O.verticalClass)), P();
    }
    i("changeDirection", () => {
        if (!e.scrollbar || !e.scrollbar.el) return;
        const O = e.params.scrollbar;
        let { el: $ } = e.scrollbar;
        ($ = fe($)),
            $.forEach((D) => {
                D.classList.remove(O.horizontalClass, O.verticalClass),
                    D.classList.add(e.isHorizontal() ? O.horizontalClass : O.verticalClass);
            });
    }),
        i("init", () => {
            e.params.scrollbar.enabled === !1 ? k() : (A(), f(), m());
        }),
        i("update resize observerUpdate lock unlock changeDirection", () => {
            f();
        }),
        i("setTranslate", () => {
            m();
        }),
        i("setTransition", (O, $) => {
            u($);
        }),
        i("enable disable", () => {
            const { el: O } = e.scrollbar;
            O && O.classList[e.enabled ? "remove" : "add"](...Pt(e.params.scrollbar.lockClass));
        }),
        i("destroy", () => {
            _();
        });
    const M = () => {
            e.el.classList.remove(...Pt(e.params.scrollbar.scrollbarDisabledClass)),
                e.scrollbar.el && e.scrollbar.el.classList.remove(...Pt(e.params.scrollbar.scrollbarDisabledClass)),
                A(),
                f(),
                m();
        },
        k = () => {
            e.el.classList.add(...Pt(e.params.scrollbar.scrollbarDisabledClass)),
                e.scrollbar.el && e.scrollbar.el.classList.add(...Pt(e.params.scrollbar.scrollbarDisabledClass)),
                _();
        };
    Object.assign(e.scrollbar, { enable: M, disable: k, updateSize: f, setTranslate: m, init: A, destroy: _ });
}
function Go(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({ parallax: { enabled: !1 } });
    const n =
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",
        r = (l, c) => {
            const { rtl: d } = e,
                p = d ? -1 : 1,
                g = l.getAttribute("data-swiper-parallax") || "0";
            let m = l.getAttribute("data-swiper-parallax-x"),
                u = l.getAttribute("data-swiper-parallax-y");
            const f = l.getAttribute("data-swiper-parallax-scale"),
                w = l.getAttribute("data-swiper-parallax-opacity"),
                b = l.getAttribute("data-swiper-parallax-rotate");
            if (
                (m || u
                    ? ((m = m || "0"), (u = u || "0"))
                    : e.isHorizontal()
                      ? ((m = g), (u = "0"))
                      : ((u = g), (m = "0")),
                m.indexOf("%") >= 0 ? (m = `${parseInt(m, 10) * c * p}%`) : (m = `${m * c * p}px`),
                u.indexOf("%") >= 0 ? (u = `${parseInt(u, 10) * c}%`) : (u = `${u * c}px`),
                typeof w < "u" && w !== null)
            ) {
                const v = w - (w - 1) * (1 - Math.abs(c));
                l.style.opacity = v;
            }
            let h = `translate3d(${m}, ${u}, 0px)`;
            if (typeof f < "u" && f !== null) {
                const v = f - (f - 1) * (1 - Math.abs(c));
                h += ` scale(${v})`;
            }
            if (b && typeof b < "u" && b !== null) {
                const v = b * c * -1;
                h += ` rotate(${v}deg)`;
            }
            l.style.transform = h;
        },
        a = () => {
            const { el: l, slides: c, progress: d, snapGrid: p, isElement: g } = e,
                m = ze(l, n);
            e.isElement && m.push(...ze(e.hostEl, n)),
                m.forEach((u) => {
                    r(u, d);
                }),
                c.forEach((u, f) => {
                    let w = u.progress;
                    e.params.slidesPerGroup > 1 &&
                        e.params.slidesPerView !== "auto" &&
                        (w += Math.ceil(f / 2) - d * (p.length - 1)),
                        (w = Math.min(Math.max(w, -1), 1)),
                        u.querySelectorAll(`${n}, [data-swiper-parallax-rotate]`).forEach((b) => {
                            r(b, w);
                        });
                });
        },
        o = function (l) {
            l === void 0 && (l = e.params.speed);
            const { el: c, hostEl: d } = e,
                p = [...c.querySelectorAll(n)];
            e.isElement && p.push(...d.querySelectorAll(n)),
                p.forEach((g) => {
                    let m = parseInt(g.getAttribute("data-swiper-parallax-duration"), 10) || l;
                    l === 0 && (m = 0), (g.style.transitionDuration = `${m}ms`);
                });
        };
    i("beforeInit", () => {
        e.params.parallax.enabled && ((e.params.watchSlidesProgress = !0), (e.originalParams.watchSlidesProgress = !0));
    }),
        i("init", () => {
            e.params.parallax.enabled && a();
        }),
        i("setTranslate", () => {
            e.params.parallax.enabled && a();
        }),
        i("setTransition", (l, c) => {
            e.params.parallax.enabled && o(c);
        });
}
function Wo(t) {
    let { swiper: e, extendParams: s, on: i, emit: n } = t;
    const r = Ce();
    s({
        zoom: {
            enabled: !1,
            limitToOriginalSize: !1,
            maxRatio: 3,
            minRatio: 1,
            panOnMouseMove: !1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed",
        },
    }),
        (e.zoom = { enabled: !1 });
    let a = 1,
        o = !1,
        l = !1,
        c = { x: 0, y: 0 };
    const d = -3;
    let p, g;
    const m = [],
        u = {
            originX: 0,
            originY: 0,
            slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            imageEl: void 0,
            imageWrapEl: void 0,
            maxRatio: 3,
        },
        f = {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {},
        },
        w = { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 };
    let b = 1;
    Object.defineProperty(e.zoom, "scale", {
        get() {
            return b;
        },
        set(W) {
            if (b !== W) {
                const R = u.imageEl,
                    N = u.slideEl;
                n("zoomChange", W, R, N);
            }
            b = W;
        },
    });
    function h() {
        if (m.length < 2) return 1;
        const W = m[0].pageX,
            R = m[0].pageY,
            N = m[1].pageX,
            oe = m[1].pageY;
        return Math.sqrt((N - W) ** 2 + (oe - R) ** 2);
    }
    function v() {
        const W = e.params.zoom,
            R = u.imageWrapEl.getAttribute("data-swiper-zoom") || W.maxRatio;
        if (W.limitToOriginalSize && u.imageEl && u.imageEl.naturalWidth) {
            const N = u.imageEl.naturalWidth / u.imageEl.offsetWidth;
            return Math.min(N, R);
        }
        return R;
    }
    function y() {
        if (m.length < 2) return { x: null, y: null };
        const W = u.imageEl.getBoundingClientRect();
        return [
            (m[0].pageX + (m[1].pageX - m[0].pageX) / 2 - W.x - r.scrollX) / a,
            (m[0].pageY + (m[1].pageY - m[0].pageY) / 2 - W.y - r.scrollY) / a,
        ];
    }
    function E() {
        return e.isElement ? "swiper-slide" : `.${e.params.slideClass}`;
    }
    function L(W) {
        const R = E();
        return !!(W.target.matches(R) || e.slides.filter((N) => N.contains(W.target)).length > 0);
    }
    function P(W) {
        const R = `.${e.params.zoom.containerClass}`;
        return !!(
            W.target.matches(R) || [...e.hostEl.querySelectorAll(R)].filter((N) => N.contains(W.target)).length > 0
        );
    }
    function A(W) {
        if ((W.pointerType === "mouse" && m.splice(0, m.length), !L(W))) return;
        const R = e.params.zoom;
        if (((p = !1), (g = !1), m.push(W), !(m.length < 2))) {
            if (((p = !0), (u.scaleStart = h()), !u.slideEl)) {
                (u.slideEl = W.target.closest(`.${e.params.slideClass}, swiper-slide`)),
                    u.slideEl || (u.slideEl = e.slides[e.activeIndex]);
                let N = u.slideEl.querySelector(`.${R.containerClass}`);
                if (
                    (N && (N = N.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),
                    (u.imageEl = N),
                    N ? (u.imageWrapEl = Vt(u.imageEl, `.${R.containerClass}`)[0]) : (u.imageWrapEl = void 0),
                    !u.imageWrapEl)
                ) {
                    u.imageEl = void 0;
                    return;
                }
                u.maxRatio = v();
            }
            if (u.imageEl) {
                const [N, oe] = y();
                (u.originX = N), (u.originY = oe), (u.imageEl.style.transitionDuration = "0ms");
            }
            o = !0;
        }
    }
    function _(W) {
        if (!L(W)) return;
        const R = e.params.zoom,
            N = e.zoom,
            oe = m.findIndex((be) => be.pointerId === W.pointerId);
        oe >= 0 && (m[oe] = W),
            !(m.length < 2) &&
                ((g = !0),
                (u.scaleMove = h()),
                u.imageEl &&
                    ((N.scale = (u.scaleMove / u.scaleStart) * a),
                    N.scale > u.maxRatio && (N.scale = u.maxRatio - 1 + (N.scale - u.maxRatio + 1) ** 0.5),
                    N.scale < R.minRatio && (N.scale = R.minRatio + 1 - (R.minRatio - N.scale + 1) ** 0.5),
                    (u.imageEl.style.transform = `translate3d(0,0,0) scale(${N.scale})`)));
    }
    function M(W) {
        if (!L(W) || (W.pointerType === "mouse" && W.type === "pointerout")) return;
        const R = e.params.zoom,
            N = e.zoom,
            oe = m.findIndex((be) => be.pointerId === W.pointerId);
        oe >= 0 && m.splice(oe, 1),
            !(!p || !g) &&
                ((p = !1),
                (g = !1),
                u.imageEl &&
                    ((N.scale = Math.max(Math.min(N.scale, u.maxRatio), R.minRatio)),
                    (u.imageEl.style.transitionDuration = `${e.params.speed}ms`),
                    (u.imageEl.style.transform = `translate3d(0,0,0) scale(${N.scale})`),
                    (a = N.scale),
                    (o = !1),
                    N.scale > 1 && u.slideEl
                        ? u.slideEl.classList.add(`${R.zoomedSlideClass}`)
                        : N.scale <= 1 && u.slideEl && u.slideEl.classList.remove(`${R.zoomedSlideClass}`),
                    N.scale === 1 && ((u.originX = 0), (u.originY = 0), (u.slideEl = void 0))));
    }
    let k;
    function O() {
        e.touchEventsData.preventTouchMoveFromPointerMove = !1;
    }
    function $() {
        clearTimeout(k),
            (e.touchEventsData.preventTouchMoveFromPointerMove = !0),
            (k = setTimeout(() => {
                e.destroyed || O();
            }));
    }
    function D(W) {
        const R = e.device;
        if (!u.imageEl || f.isTouched) return;
        R.android && W.cancelable && W.preventDefault(), (f.isTouched = !0);
        const N = m.length > 0 ? m[0] : W;
        (f.touchesStart.x = N.pageX), (f.touchesStart.y = N.pageY);
    }
    function q(W) {
        const N = W.pointerType === "mouse" && e.params.zoom.panOnMouseMove;
        if (!L(W) || !P(W)) return;
        const oe = e.zoom;
        if (!u.imageEl) return;
        if (!f.isTouched || !u.slideEl) {
            N && C(W);
            return;
        }
        if (N) {
            C(W);
            return;
        }
        f.isMoved ||
            ((f.width = u.imageEl.offsetWidth || u.imageEl.clientWidth),
            (f.height = u.imageEl.offsetHeight || u.imageEl.clientHeight),
            (f.startX = Ii(u.imageWrapEl, "x") || 0),
            (f.startY = Ii(u.imageWrapEl, "y") || 0),
            (u.slideWidth = u.slideEl.offsetWidth),
            (u.slideHeight = u.slideEl.offsetHeight),
            (u.imageWrapEl.style.transitionDuration = "0ms"));
        const be = f.width * oe.scale,
            He = f.height * oe.scale;
        if (
            ((f.minX = Math.min(u.slideWidth / 2 - be / 2, 0)),
            (f.maxX = -f.minX),
            (f.minY = Math.min(u.slideHeight / 2 - He / 2, 0)),
            (f.maxY = -f.minY),
            (f.touchesCurrent.x = m.length > 0 ? m[0].pageX : W.pageX),
            (f.touchesCurrent.y = m.length > 0 ? m[0].pageY : W.pageY),
            Math.max(Math.abs(f.touchesCurrent.x - f.touchesStart.x), Math.abs(f.touchesCurrent.y - f.touchesStart.y)) >
                5 && (e.allowClick = !1),
            !f.isMoved && !o)
        ) {
            if (
                e.isHorizontal() &&
                ((Math.floor(f.minX) === Math.floor(f.startX) && f.touchesCurrent.x < f.touchesStart.x) ||
                    (Math.floor(f.maxX) === Math.floor(f.startX) && f.touchesCurrent.x > f.touchesStart.x))
            ) {
                (f.isTouched = !1), O();
                return;
            }
            if (
                !e.isHorizontal() &&
                ((Math.floor(f.minY) === Math.floor(f.startY) && f.touchesCurrent.y < f.touchesStart.y) ||
                    (Math.floor(f.maxY) === Math.floor(f.startY) && f.touchesCurrent.y > f.touchesStart.y))
            ) {
                (f.isTouched = !1), O();
                return;
            }
        }
        W.cancelable && W.preventDefault(), W.stopPropagation(), $(), (f.isMoved = !0);
        const S = (oe.scale - a) / (u.maxRatio - e.params.zoom.minRatio),
            { originX: x, originY: I } = u;
        (f.currentX = f.touchesCurrent.x - f.touchesStart.x + f.startX + S * (f.width - x * 2)),
            (f.currentY = f.touchesCurrent.y - f.touchesStart.y + f.startY + S * (f.height - I * 2)),
            f.currentX < f.minX && (f.currentX = f.minX + 1 - (f.minX - f.currentX + 1) ** 0.8),
            f.currentX > f.maxX && (f.currentX = f.maxX - 1 + (f.currentX - f.maxX + 1) ** 0.8),
            f.currentY < f.minY && (f.currentY = f.minY + 1 - (f.minY - f.currentY + 1) ** 0.8),
            f.currentY > f.maxY && (f.currentY = f.maxY - 1 + (f.currentY - f.maxY + 1) ** 0.8),
            w.prevPositionX || (w.prevPositionX = f.touchesCurrent.x),
            w.prevPositionY || (w.prevPositionY = f.touchesCurrent.y),
            w.prevTime || (w.prevTime = Date.now()),
            (w.x = (f.touchesCurrent.x - w.prevPositionX) / (Date.now() - w.prevTime) / 2),
            (w.y = (f.touchesCurrent.y - w.prevPositionY) / (Date.now() - w.prevTime) / 2),
            Math.abs(f.touchesCurrent.x - w.prevPositionX) < 2 && (w.x = 0),
            Math.abs(f.touchesCurrent.y - w.prevPositionY) < 2 && (w.y = 0),
            (w.prevPositionX = f.touchesCurrent.x),
            (w.prevPositionY = f.touchesCurrent.y),
            (w.prevTime = Date.now()),
            (u.imageWrapEl.style.transform = `translate3d(${f.currentX}px, ${f.currentY}px,0)`);
    }
    function H() {
        const W = e.zoom;
        if (((m.length = 0), !u.imageEl)) return;
        if (!f.isTouched || !f.isMoved) {
            (f.isTouched = !1), (f.isMoved = !1);
            return;
        }
        (f.isTouched = !1), (f.isMoved = !1);
        let R = 300,
            N = 300;
        const oe = w.x * R,
            be = f.currentX + oe,
            He = w.y * N,
            at = f.currentY + He;
        w.x !== 0 && (R = Math.abs((be - f.currentX) / w.x)), w.y !== 0 && (N = Math.abs((at - f.currentY) / w.y));
        const S = Math.max(R, N);
        (f.currentX = be), (f.currentY = at);
        const x = f.width * W.scale,
            I = f.height * W.scale;
        (f.minX = Math.min(u.slideWidth / 2 - x / 2, 0)),
            (f.maxX = -f.minX),
            (f.minY = Math.min(u.slideHeight / 2 - I / 2, 0)),
            (f.maxY = -f.minY),
            (f.currentX = Math.max(Math.min(f.currentX, f.maxX), f.minX)),
            (f.currentY = Math.max(Math.min(f.currentY, f.maxY), f.minY)),
            (u.imageWrapEl.style.transitionDuration = `${S}ms`),
            (u.imageWrapEl.style.transform = `translate3d(${f.currentX}px, ${f.currentY}px,0)`);
    }
    function T() {
        const W = e.zoom;
        u.slideEl &&
            e.activeIndex !== e.slides.indexOf(u.slideEl) &&
            (u.imageEl && (u.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
            u.imageWrapEl && (u.imageWrapEl.style.transform = "translate3d(0,0,0)"),
            u.slideEl.classList.remove(`${e.params.zoom.zoomedSlideClass}`),
            (W.scale = 1),
            (a = 1),
            (u.slideEl = void 0),
            (u.imageEl = void 0),
            (u.imageWrapEl = void 0),
            (u.originX = 0),
            (u.originY = 0));
    }
    function C(W) {
        if (a <= 1 || !u.imageWrapEl || !L(W) || !P(W)) return;
        const R = r.getComputedStyle(u.imageWrapEl).transform,
            N = new r.DOMMatrix(R);
        if (!l) {
            (l = !0),
                (c.x = W.clientX),
                (c.y = W.clientY),
                (f.startX = N.e),
                (f.startY = N.f),
                (f.width = u.imageEl.offsetWidth || u.imageEl.clientWidth),
                (f.height = u.imageEl.offsetHeight || u.imageEl.clientHeight),
                (u.slideWidth = u.slideEl.offsetWidth),
                (u.slideHeight = u.slideEl.offsetHeight);
            return;
        }
        const oe = (W.clientX - c.x) * d,
            be = (W.clientY - c.y) * d,
            He = f.width * a,
            at = f.height * a,
            S = u.slideWidth,
            x = u.slideHeight,
            I = Math.min(S / 2 - He / 2, 0),
            B = -I,
            F = Math.min(x / 2 - at / 2, 0),
            V = -F,
            Z = Math.max(Math.min(f.startX + oe, B), I),
            X = Math.max(Math.min(f.startY + be, V), F);
        (u.imageWrapEl.style.transitionDuration = "0ms"),
            (u.imageWrapEl.style.transform = `translate3d(${Z}px, ${X}px, 0)`),
            (c.x = W.clientX),
            (c.y = W.clientY),
            (f.startX = Z),
            (f.startY = X),
            (f.currentX = Z),
            (f.currentY = X);
    }
    function G(W) {
        const R = e.zoom,
            N = e.params.zoom;
        if (!u.slideEl) {
            W && W.target && (u.slideEl = W.target.closest(`.${e.params.slideClass}, swiper-slide`)),
                u.slideEl ||
                    (e.params.virtual && e.params.virtual.enabled && e.virtual
                        ? (u.slideEl = ze(e.slidesEl, `.${e.params.slideActiveClass}`)[0])
                        : (u.slideEl = e.slides[e.activeIndex]));
            let _e = u.slideEl.querySelector(`.${N.containerClass}`);
            _e && (_e = _e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),
                (u.imageEl = _e),
                _e ? (u.imageWrapEl = Vt(u.imageEl, `.${N.containerClass}`)[0]) : (u.imageWrapEl = void 0);
        }
        if (!u.imageEl || !u.imageWrapEl) return;
        e.params.cssMode && ((e.wrapperEl.style.overflow = "hidden"), (e.wrapperEl.style.touchAction = "none")),
            u.slideEl.classList.add(`${N.zoomedSlideClass}`);
        let oe, be, He, at, S, x, I, B, F, V, Z, X, Y, j, te, U, se, ne;
        typeof f.touchesStart.x > "u" && W
            ? ((oe = W.pageX), (be = W.pageY))
            : ((oe = f.touchesStart.x), (be = f.touchesStart.y));
        const ue = a,
            pe = typeof W == "number" ? W : null;
        a === 1 && pe && ((oe = void 0), (be = void 0), (f.touchesStart.x = void 0), (f.touchesStart.y = void 0));
        const he = v();
        (R.scale = pe || he),
            (a = pe || he),
            W && !(a === 1 && pe)
                ? ((se = u.slideEl.offsetWidth),
                  (ne = u.slideEl.offsetHeight),
                  (He = Ws(u.slideEl).left + r.scrollX),
                  (at = Ws(u.slideEl).top + r.scrollY),
                  (S = He + se / 2 - oe),
                  (x = at + ne / 2 - be),
                  (F = u.imageEl.offsetWidth || u.imageEl.clientWidth),
                  (V = u.imageEl.offsetHeight || u.imageEl.clientHeight),
                  (Z = F * R.scale),
                  (X = V * R.scale),
                  (Y = Math.min(se / 2 - Z / 2, 0)),
                  (j = Math.min(ne / 2 - X / 2, 0)),
                  (te = -Y),
                  (U = -j),
                  ue > 0 && pe && typeof f.currentX == "number" && typeof f.currentY == "number"
                      ? ((I = (f.currentX * R.scale) / ue), (B = (f.currentY * R.scale) / ue))
                      : ((I = S * R.scale), (B = x * R.scale)),
                  I < Y && (I = Y),
                  I > te && (I = te),
                  B < j && (B = j),
                  B > U && (B = U))
                : ((I = 0), (B = 0)),
            pe && R.scale === 1 && ((u.originX = 0), (u.originY = 0)),
            (f.currentX = I),
            (f.currentY = B),
            (u.imageWrapEl.style.transitionDuration = "300ms"),
            (u.imageWrapEl.style.transform = `translate3d(${I}px, ${B}px,0)`),
            (u.imageEl.style.transitionDuration = "300ms"),
            (u.imageEl.style.transform = `translate3d(0,0,0) scale(${R.scale})`);
    }
    function ae() {
        const W = e.zoom,
            R = e.params.zoom;
        if (!u.slideEl) {
            e.params.virtual && e.params.virtual.enabled && e.virtual
                ? (u.slideEl = ze(e.slidesEl, `.${e.params.slideActiveClass}`)[0])
                : (u.slideEl = e.slides[e.activeIndex]);
            let N = u.slideEl.querySelector(`.${R.containerClass}`);
            N && (N = N.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),
                (u.imageEl = N),
                N ? (u.imageWrapEl = Vt(u.imageEl, `.${R.containerClass}`)[0]) : (u.imageWrapEl = void 0);
        }
        !u.imageEl ||
            !u.imageWrapEl ||
            (e.params.cssMode && ((e.wrapperEl.style.overflow = ""), (e.wrapperEl.style.touchAction = "")),
            (W.scale = 1),
            (a = 1),
            (f.currentX = void 0),
            (f.currentY = void 0),
            (f.touchesStart.x = void 0),
            (f.touchesStart.y = void 0),
            (u.imageWrapEl.style.transitionDuration = "300ms"),
            (u.imageWrapEl.style.transform = "translate3d(0,0,0)"),
            (u.imageEl.style.transitionDuration = "300ms"),
            (u.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
            u.slideEl.classList.remove(`${R.zoomedSlideClass}`),
            (u.slideEl = void 0),
            (u.originX = 0),
            (u.originY = 0),
            e.params.zoom.panOnMouseMove && ((c = { x: 0, y: 0 }), l && ((l = !1), (f.startX = 0), (f.startY = 0))));
    }
    function me(W) {
        const R = e.zoom;
        R.scale && R.scale !== 1 ? ae() : G(W);
    }
    function ge() {
        const W = e.params.passiveListeners ? { passive: !0, capture: !1 } : !1,
            R = e.params.passiveListeners ? { passive: !1, capture: !0 } : !0;
        return { passiveListener: W, activeListenerWithCapture: R };
    }
    function Ne() {
        const W = e.zoom;
        if (W.enabled) return;
        W.enabled = !0;
        const { passiveListener: R, activeListenerWithCapture: N } = ge();
        e.wrapperEl.addEventListener("pointerdown", A, R),
            e.wrapperEl.addEventListener("pointermove", _, N),
            ["pointerup", "pointercancel", "pointerout"].forEach((oe) => {
                e.wrapperEl.addEventListener(oe, M, R);
            }),
            e.wrapperEl.addEventListener("pointermove", q, N);
    }
    function gt() {
        const W = e.zoom;
        if (!W.enabled) return;
        W.enabled = !1;
        const { passiveListener: R, activeListenerWithCapture: N } = ge();
        e.wrapperEl.removeEventListener("pointerdown", A, R),
            e.wrapperEl.removeEventListener("pointermove", _, N),
            ["pointerup", "pointercancel", "pointerout"].forEach((oe) => {
                e.wrapperEl.removeEventListener(oe, M, R);
            }),
            e.wrapperEl.removeEventListener("pointermove", q, N);
    }
    i("init", () => {
        e.params.zoom.enabled && Ne();
    }),
        i("destroy", () => {
            gt();
        }),
        i("touchStart", (W, R) => {
            e.zoom.enabled && D(R);
        }),
        i("touchEnd", (W, R) => {
            e.zoom.enabled && H();
        }),
        i("doubleTap", (W, R) => {
            !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && me(R);
        }),
        i("transitionEnd", () => {
            e.zoom.enabled && e.params.zoom.enabled && T();
        }),
        i("slideChange", () => {
            e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && T();
        }),
        Object.assign(e.zoom, { enable: Ne, disable: gt, in: G, out: ae, toggle: me });
}
function Yo(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({ controller: { control: void 0, inverse: !1, by: "slide" } }), (e.controller = { control: void 0 });
    function n(c, d) {
        const p = (function () {
            let f, w, b;
            return (h, v) => {
                for (w = -1, f = h.length; f - w > 1; ) (b = (f + w) >> 1), h[b] <= v ? (w = b) : (f = b);
                return f;
            };
        })();
        (this.x = c), (this.y = d), (this.lastIndex = c.length - 1);
        let g, m;
        return (
            (this.interpolate = function (f) {
                return f
                    ? ((m = p(this.x, f)),
                      (g = m - 1),
                      ((f - this.x[g]) * (this.y[m] - this.y[g])) / (this.x[m] - this.x[g]) + this.y[g])
                    : 0;
            }),
            this
        );
    }
    function r(c) {
        e.controller.spline = e.params.loop ? new n(e.slidesGrid, c.slidesGrid) : new n(e.snapGrid, c.snapGrid);
    }
    function a(c, d) {
        const p = e.controller.control;
        let g, m;
        const u = e.constructor;
        function f(w) {
            if (w.destroyed) return;
            const b = e.rtlTranslate ? -e.translate : e.translate;
            e.params.controller.by === "slide" && (r(w), (m = -e.controller.spline.interpolate(-b))),
                (!m || e.params.controller.by === "container") &&
                    ((g = (w.maxTranslate() - w.minTranslate()) / (e.maxTranslate() - e.minTranslate())),
                    (Number.isNaN(g) || !Number.isFinite(g)) && (g = 1),
                    (m = (b - e.minTranslate()) * g + w.minTranslate())),
                e.params.controller.inverse && (m = w.maxTranslate() - m),
                w.updateProgress(m),
                w.setTranslate(m, e),
                w.updateActiveIndex(),
                w.updateSlidesClasses();
        }
        if (Array.isArray(p)) for (let w = 0; w < p.length; w += 1) p[w] !== d && p[w] instanceof u && f(p[w]);
        else p instanceof u && d !== p && f(p);
    }
    function o(c, d) {
        const p = e.constructor,
            g = e.controller.control;
        let m;
        function u(f) {
            f.destroyed ||
                (f.setTransition(c, e),
                c !== 0 &&
                    (f.transitionStart(),
                    f.params.autoHeight &&
                        es(() => {
                            f.updateAutoHeight();
                        }),
                    us(f.wrapperEl, () => {
                        g && f.transitionEnd();
                    })));
        }
        if (Array.isArray(g)) for (m = 0; m < g.length; m += 1) g[m] !== d && g[m] instanceof p && u(g[m]);
        else g instanceof p && d !== g && u(g);
    }
    function l() {
        e.controller.control && e.controller.spline && ((e.controller.spline = void 0), delete e.controller.spline);
    }
    i("beforeInit", () => {
        if (
            typeof window < "u" &&
            (typeof e.params.controller.control == "string" || e.params.controller.control instanceof HTMLElement)
        ) {
            (typeof e.params.controller.control == "string"
                ? [...document.querySelectorAll(e.params.controller.control)]
                : [e.params.controller.control]
            ).forEach((d) => {
                if ((e.controller.control || (e.controller.control = []), d && d.swiper))
                    e.controller.control.push(d.swiper);
                else if (d) {
                    const p = `${e.params.eventsPrefix}init`,
                        g = (m) => {
                            e.controller.control.push(m.detail[0]), e.update(), d.removeEventListener(p, g);
                        };
                    d.addEventListener(p, g);
                }
            });
            return;
        }
        e.controller.control = e.params.controller.control;
    }),
        i("update", () => {
            l();
        }),
        i("resize", () => {
            l();
        }),
        i("observerUpdate", () => {
            l();
        }),
        i("setTranslate", (c, d, p) => {
            !e.controller.control || e.controller.control.destroyed || e.controller.setTranslate(d, p);
        }),
        i("setTransition", (c, d, p) => {
            !e.controller.control || e.controller.control.destroyed || e.controller.setTransition(d, p);
        }),
        Object.assign(e.controller, { setTranslate: a, setTransition: o });
}
function Xo(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({
        a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            slideLabelMessage: "{{index}} / {{slidesLength}}",
            containerMessage: null,
            containerRoleDescriptionMessage: null,
            containerRole: null,
            itemRoleDescriptionMessage: null,
            slideRole: "group",
            id: null,
            scrollOnFocus: !0,
        },
    }),
        (e.a11y = { clicked: !1 });
    let n = null,
        r,
        a,
        o = new Date().getTime();
    function l(T) {
        const C = n;
        C.length !== 0 && Et(C, T);
    }
    function c(T) {
        const C = () => Math.round(16 * Math.random()).toString(16);
        return "x".repeat(T).replace(/x/g, C);
    }
    function d(T) {
        (T = fe(T)),
            T.forEach((C) => {
                C.setAttribute("tabIndex", "0");
            });
    }
    function p(T) {
        (T = fe(T)),
            T.forEach((C) => {
                C.setAttribute("tabIndex", "-1");
            });
    }
    function g(T, C) {
        (T = fe(T)),
            T.forEach((G) => {
                G.setAttribute("role", C);
            });
    }
    function m(T, C) {
        (T = fe(T)),
            T.forEach((G) => {
                G.setAttribute("aria-roledescription", C);
            });
    }
    function u(T, C) {
        (T = fe(T)),
            T.forEach((G) => {
                G.setAttribute("aria-controls", C);
            });
    }
    function f(T, C) {
        (T = fe(T)),
            T.forEach((G) => {
                G.setAttribute("aria-label", C);
            });
    }
    function w(T, C) {
        (T = fe(T)),
            T.forEach((G) => {
                G.setAttribute("id", C);
            });
    }
    function b(T, C) {
        (T = fe(T)),
            T.forEach((G) => {
                G.setAttribute("aria-live", C);
            });
    }
    function h(T) {
        (T = fe(T)),
            T.forEach((C) => {
                C.setAttribute("aria-disabled", !0);
            });
    }
    function v(T) {
        (T = fe(T)),
            T.forEach((C) => {
                C.setAttribute("aria-disabled", !1);
            });
    }
    function y(T) {
        if (T.keyCode !== 13 && T.keyCode !== 32) return;
        const C = e.params.a11y,
            G = T.target;
        if (
            !(
                e.pagination &&
                e.pagination.el &&
                (G === e.pagination.el || e.pagination.el.contains(T.target)) &&
                !T.target.matches(yt(e.params.pagination.bulletClass))
            )
        ) {
            if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
                const ae = fe(e.navigation.prevEl);
                fe(e.navigation.nextEl).includes(G) &&
                    ((e.isEnd && !e.params.loop) || e.slideNext(),
                    e.isEnd ? l(C.lastSlideMessage) : l(C.nextSlideMessage)),
                    ae.includes(G) &&
                        ((e.isBeginning && !e.params.loop) || e.slidePrev(),
                        e.isBeginning ? l(C.firstSlideMessage) : l(C.prevSlideMessage));
            }
            e.pagination && G.matches(yt(e.params.pagination.bulletClass)) && G.click();
        }
    }
    function E() {
        if (e.params.loop || e.params.rewind || !e.navigation) return;
        const { nextEl: T, prevEl: C } = e.navigation;
        C && (e.isBeginning ? (h(C), p(C)) : (v(C), d(C))), T && (e.isEnd ? (h(T), p(T)) : (v(T), d(T)));
    }
    function L() {
        return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
    }
    function P() {
        return L() && e.params.pagination.clickable;
    }
    function A() {
        const T = e.params.a11y;
        L() &&
            e.pagination.bullets.forEach((C) => {
                e.params.pagination.clickable &&
                    (d(C),
                    e.params.pagination.renderBullet ||
                        (g(C, "button"), f(C, T.paginationBulletMessage.replace(/\{\{index\}\}/, bs(C) + 1)))),
                    C.matches(yt(e.params.pagination.bulletActiveClass))
                        ? C.setAttribute("aria-current", "true")
                        : C.removeAttribute("aria-current");
            });
    }
    const _ = (T, C, G) => {
            d(T), T.tagName !== "BUTTON" && (g(T, "button"), T.addEventListener("keydown", y)), f(T, G), u(T, C);
        },
        M = (T) => {
            a && a !== T.target && !a.contains(T.target) && (r = !0), (e.a11y.clicked = !0);
        },
        k = () => {
            (r = !1),
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        e.destroyed || (e.a11y.clicked = !1);
                    });
                });
        },
        O = (T) => {
            o = new Date().getTime();
        },
        $ = (T) => {
            if (e.a11y.clicked || !e.params.a11y.scrollOnFocus || new Date().getTime() - o < 100) return;
            const C = T.target.closest(`.${e.params.slideClass}, swiper-slide`);
            if (!C || !e.slides.includes(C)) return;
            a = C;
            const G = e.slides.indexOf(C) === e.activeIndex,
                ae = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(C);
            G ||
                ae ||
                (T.sourceCapabilities && T.sourceCapabilities.firesTouchEvents) ||
                (e.isHorizontal() ? (e.el.scrollLeft = 0) : (e.el.scrollTop = 0),
                requestAnimationFrame(() => {
                    r ||
                        (e.params.loop
                            ? e.slideToLoop(
                                  e.getSlideIndexWhenGrid(parseInt(C.getAttribute("data-swiper-slide-index"))),
                                  0
                              )
                            : e.slideTo(e.getSlideIndexWhenGrid(e.slides.indexOf(C)), 0),
                        (r = !1));
                }));
        },
        D = () => {
            const T = e.params.a11y;
            T.itemRoleDescriptionMessage && m(e.slides, T.itemRoleDescriptionMessage),
                T.slideRole && g(e.slides, T.slideRole);
            const C = e.slides.length;
            T.slideLabelMessage &&
                e.slides.forEach((G, ae) => {
                    const me = e.params.loop ? parseInt(G.getAttribute("data-swiper-slide-index"), 10) : ae,
                        ge = T.slideLabelMessage.replace(/\{\{index\}\}/, me + 1).replace(/\{\{slidesLength\}\}/, C);
                    f(G, ge);
                });
        },
        q = () => {
            const T = e.params.a11y;
            e.el.append(n);
            const C = e.el;
            T.containerRoleDescriptionMessage && m(C, T.containerRoleDescriptionMessage),
                T.containerMessage && f(C, T.containerMessage),
                T.containerRole && g(C, T.containerRole);
            const G = e.wrapperEl,
                ae = T.id || G.getAttribute("id") || `swiper-wrapper-${c(16)}`,
                me = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
            w(G, ae), b(G, me), D();
            let { nextEl: ge, prevEl: Ne } = e.navigation ? e.navigation : {};
            (ge = fe(ge)),
                (Ne = fe(Ne)),
                ge && ge.forEach((W) => _(W, ae, T.nextSlideMessage)),
                Ne && Ne.forEach((W) => _(W, ae, T.prevSlideMessage)),
                P() &&
                    fe(e.pagination.el).forEach((R) => {
                        R.addEventListener("keydown", y);
                    }),
                $e().addEventListener("visibilitychange", O),
                e.el.addEventListener("focus", $, !0),
                e.el.addEventListener("focus", $, !0),
                e.el.addEventListener("pointerdown", M, !0),
                e.el.addEventListener("pointerup", k, !0);
        };
    function H() {
        n && n.remove();
        let { nextEl: T, prevEl: C } = e.navigation ? e.navigation : {};
        (T = fe(T)),
            (C = fe(C)),
            T && T.forEach((ae) => ae.removeEventListener("keydown", y)),
            C && C.forEach((ae) => ae.removeEventListener("keydown", y)),
            P() &&
                fe(e.pagination.el).forEach((me) => {
                    me.removeEventListener("keydown", y);
                }),
            $e().removeEventListener("visibilitychange", O),
            e.el &&
                typeof e.el != "string" &&
                (e.el.removeEventListener("focus", $, !0),
                e.el.removeEventListener("pointerdown", M, !0),
                e.el.removeEventListener("pointerup", k, !0));
    }
    i("beforeInit", () => {
        (n = Ze("span", e.params.a11y.notificationClass)),
            n.setAttribute("aria-live", "assertive"),
            n.setAttribute("aria-atomic", "true");
    }),
        i("afterInit", () => {
            e.params.a11y.enabled && q();
        }),
        i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
            e.params.a11y.enabled && D();
        }),
        i("fromEdge toEdge afterInit lock unlock", () => {
            e.params.a11y.enabled && E();
        }),
        i("paginationUpdate", () => {
            e.params.a11y.enabled && A();
        }),
        i("destroy", () => {
            e.params.a11y.enabled && H();
        });
}
function Uo(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({ history: { enabled: !1, root: "", replaceState: !1, key: "slides", keepQuery: !1 } });
    let n = !1,
        r = {};
    const a = (m) =>
            m
                .toString()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "")
                .replace(/--+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, ""),
        o = (m) => {
            const u = Ce();
            let f;
            m ? (f = new URL(m)) : (f = u.location);
            const w = f.pathname
                    .slice(1)
                    .split("/")
                    .filter((y) => y !== ""),
                b = w.length,
                h = w[b - 2],
                v = w[b - 1];
            return { key: h, value: v };
        },
        l = (m, u) => {
            const f = Ce();
            if (!n || !e.params.history.enabled) return;
            let w;
            e.params.url ? (w = new URL(e.params.url)) : (w = f.location);
            const b =
                e.virtual && e.params.virtual.enabled
                    ? e.slidesEl.querySelector(`[data-swiper-slide-index="${u}"]`)
                    : e.slides[u];
            let h = a(b.getAttribute("data-history"));
            if (e.params.history.root.length > 0) {
                let y = e.params.history.root;
                y[y.length - 1] === "/" && (y = y.slice(0, y.length - 1)), (h = `${y}/${m ? `${m}/` : ""}${h}`);
            } else w.pathname.includes(m) || (h = `${m ? `${m}/` : ""}${h}`);
            e.params.history.keepQuery && (h += w.search);
            const v = f.history.state;
            (v && v.value === h) ||
                (e.params.history.replaceState
                    ? f.history.replaceState({ value: h }, null, h)
                    : f.history.pushState({ value: h }, null, h));
        },
        c = (m, u, f) => {
            if (u)
                for (let w = 0, b = e.slides.length; w < b; w += 1) {
                    const h = e.slides[w];
                    if (a(h.getAttribute("data-history")) === u) {
                        const y = e.getSlideIndex(h);
                        e.slideTo(y, m, f);
                    }
                }
            else e.slideTo(0, m, f);
        },
        d = () => {
            (r = o(e.params.url)), c(e.params.speed, r.value, !1);
        },
        p = () => {
            const m = Ce();
            if (e.params.history) {
                if (!m.history || !m.history.pushState) {
                    (e.params.history.enabled = !1), (e.params.hashNavigation.enabled = !0);
                    return;
                }
                if (((n = !0), (r = o(e.params.url)), !r.key && !r.value)) {
                    e.params.history.replaceState || m.addEventListener("popstate", d);
                    return;
                }
                c(0, r.value, e.params.runCallbacksOnInit),
                    e.params.history.replaceState || m.addEventListener("popstate", d);
            }
        },
        g = () => {
            const m = Ce();
            e.params.history.replaceState || m.removeEventListener("popstate", d);
        };
    i("init", () => {
        e.params.history.enabled && p();
    }),
        i("destroy", () => {
            e.params.history.enabled && g();
        }),
        i("transitionEnd _freeModeNoMomentumRelease", () => {
            n && l(e.params.history.key, e.activeIndex);
        }),
        i("slideChange", () => {
            n && e.params.cssMode && l(e.params.history.key, e.activeIndex);
        });
}
function Ko(t) {
    let { swiper: e, extendParams: s, emit: i, on: n } = t,
        r = !1;
    const a = $e(),
        o = Ce();
    s({
        hashNavigation: {
            enabled: !1,
            replaceState: !1,
            watchState: !1,
            getSlideIndex(g, m) {
                if (e.virtual && e.params.virtual.enabled) {
                    const u = e.slides.find((w) => w.getAttribute("data-hash") === m);
                    return u ? parseInt(u.getAttribute("data-swiper-slide-index"), 10) : 0;
                }
                return e.getSlideIndex(
                    ze(e.slidesEl, `.${e.params.slideClass}[data-hash="${m}"], swiper-slide[data-hash="${m}"]`)[0]
                );
            },
        },
    });
    const l = () => {
            i("hashChange");
            const g = a.location.hash.replace("#", ""),
                m =
                    e.virtual && e.params.virtual.enabled
                        ? e.slidesEl.querySelector(`[data-swiper-slide-index="${e.activeIndex}"]`)
                        : e.slides[e.activeIndex],
                u = m ? m.getAttribute("data-hash") : "";
            if (g !== u) {
                const f = e.params.hashNavigation.getSlideIndex(e, g);
                if (typeof f > "u" || Number.isNaN(f)) return;
                e.slideTo(f);
            }
        },
        c = () => {
            if (!r || !e.params.hashNavigation.enabled) return;
            const g =
                    e.virtual && e.params.virtual.enabled
                        ? e.slidesEl.querySelector(`[data-swiper-slide-index="${e.activeIndex}"]`)
                        : e.slides[e.activeIndex],
                m = g ? g.getAttribute("data-hash") || g.getAttribute("data-history") : "";
            e.params.hashNavigation.replaceState && o.history && o.history.replaceState
                ? (o.history.replaceState(null, null, `#${m}` || ""), i("hashSet"))
                : ((a.location.hash = m || ""), i("hashSet"));
        },
        d = () => {
            if (!e.params.hashNavigation.enabled || (e.params.history && e.params.history.enabled)) return;
            r = !0;
            const g = a.location.hash.replace("#", "");
            if (g) {
                const u = e.params.hashNavigation.getSlideIndex(e, g);
                e.slideTo(u || 0, 0, e.params.runCallbacksOnInit, !0);
            }
            e.params.hashNavigation.watchState && o.addEventListener("hashchange", l);
        },
        p = () => {
            e.params.hashNavigation.watchState && o.removeEventListener("hashchange", l);
        };
    n("init", () => {
        e.params.hashNavigation.enabled && d();
    }),
        n("destroy", () => {
            e.params.hashNavigation.enabled && p();
        }),
        n("transitionEnd _freeModeNoMomentumRelease", () => {
            r && c();
        }),
        n("slideChange", () => {
            r && e.params.cssMode && c();
        });
}
function Zo(t) {
    let { swiper: e, extendParams: s, on: i, emit: n, params: r } = t;
    (e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
        s({
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !1,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1,
            },
        });
    let a,
        o,
        l = r && r.autoplay ? r.autoplay.delay : 3e3,
        c = r && r.autoplay ? r.autoplay.delay : 3e3,
        d,
        p = new Date().getTime(),
        g,
        m,
        u,
        f,
        w,
        b,
        h;
    function v(C) {
        !e ||
            e.destroyed ||
            !e.wrapperEl ||
            (C.target === e.wrapperEl &&
                (e.wrapperEl.removeEventListener("transitionend", v),
                !(h || (C.detail && C.detail.bySwiperTouchMove)) && M()));
    }
    const y = () => {
            if (e.destroyed || !e.autoplay.running) return;
            e.autoplay.paused ? (g = !0) : g && ((c = d), (g = !1));
            const C = e.autoplay.paused ? d : p + c - new Date().getTime();
            (e.autoplay.timeLeft = C),
                n("autoplayTimeLeft", C, C / l),
                (o = requestAnimationFrame(() => {
                    y();
                }));
        },
        E = () => {
            let C;
            return (
                e.virtual && e.params.virtual.enabled
                    ? (C = e.slides.find((ae) => ae.classList.contains("swiper-slide-active")))
                    : (C = e.slides[e.activeIndex]),
                C ? parseInt(C.getAttribute("data-swiper-autoplay"), 10) : void 0
            );
        },
        L = (C) => {
            if (e.destroyed || !e.autoplay.running) return;
            cancelAnimationFrame(o), y();
            let G = typeof C > "u" ? e.params.autoplay.delay : C;
            (l = e.params.autoplay.delay), (c = e.params.autoplay.delay);
            const ae = E();
            !Number.isNaN(ae) && ae > 0 && typeof C > "u" && ((G = ae), (l = ae), (c = ae)), (d = G);
            const me = e.params.speed,
                ge = () => {
                    !e ||
                        e.destroyed ||
                        (e.params.autoplay.reverseDirection
                            ? !e.isBeginning || e.params.loop || e.params.rewind
                                ? (e.slidePrev(me, !0, !0), n("autoplay"))
                                : e.params.autoplay.stopOnLastSlide ||
                                  (e.slideTo(e.slides.length - 1, me, !0, !0), n("autoplay"))
                            : !e.isEnd || e.params.loop || e.params.rewind
                              ? (e.slideNext(me, !0, !0), n("autoplay"))
                              : e.params.autoplay.stopOnLastSlide || (e.slideTo(0, me, !0, !0), n("autoplay")),
                        e.params.cssMode &&
                            ((p = new Date().getTime()),
                            requestAnimationFrame(() => {
                                L();
                            })));
                };
            return (
                G > 0
                    ? (clearTimeout(a),
                      (a = setTimeout(() => {
                          ge();
                      }, G)))
                    : requestAnimationFrame(() => {
                          ge();
                      }),
                G
            );
        },
        P = () => {
            (p = new Date().getTime()), (e.autoplay.running = !0), L(), n("autoplayStart");
        },
        A = () => {
            (e.autoplay.running = !1), clearTimeout(a), cancelAnimationFrame(o), n("autoplayStop");
        },
        _ = (C, G) => {
            if (e.destroyed || !e.autoplay.running) return;
            clearTimeout(a), C || (b = !0);
            const ae = () => {
                n("autoplayPause"),
                    e.params.autoplay.waitForTransition ? e.wrapperEl.addEventListener("transitionend", v) : M();
            };
            if (((e.autoplay.paused = !0), G)) {
                w && (d = e.params.autoplay.delay), (w = !1), ae();
                return;
            }
            (d = (d || e.params.autoplay.delay) - (new Date().getTime() - p)),
                !(e.isEnd && d < 0 && !e.params.loop) && (d < 0 && (d = 0), ae());
        },
        M = () => {
            (e.isEnd && d < 0 && !e.params.loop) ||
                e.destroyed ||
                !e.autoplay.running ||
                ((p = new Date().getTime()), b ? ((b = !1), L(d)) : L(), (e.autoplay.paused = !1), n("autoplayResume"));
        },
        k = () => {
            if (e.destroyed || !e.autoplay.running) return;
            const C = $e();
            C.visibilityState === "hidden" && ((b = !0), _(!0)), C.visibilityState === "visible" && M();
        },
        O = (C) => {
            C.pointerType === "mouse" && ((b = !0), (h = !0), !(e.animating || e.autoplay.paused) && _(!0));
        },
        $ = (C) => {
            C.pointerType === "mouse" && ((h = !1), e.autoplay.paused && M());
        },
        D = () => {
            e.params.autoplay.pauseOnMouseEnter &&
                (e.el.addEventListener("pointerenter", O), e.el.addEventListener("pointerleave", $));
        },
        q = () => {
            e.el &&
                typeof e.el != "string" &&
                (e.el.removeEventListener("pointerenter", O), e.el.removeEventListener("pointerleave", $));
        },
        H = () => {
            $e().addEventListener("visibilitychange", k);
        },
        T = () => {
            $e().removeEventListener("visibilitychange", k);
        };
    i("init", () => {
        e.params.autoplay.enabled && (D(), H(), P());
    }),
        i("destroy", () => {
            q(), T(), e.autoplay.running && A();
        }),
        i("_freeModeStaticRelease", () => {
            (u || b) && M();
        }),
        i("_freeModeNoMomentumRelease", () => {
            e.params.autoplay.disableOnInteraction ? A() : _(!0, !0);
        }),
        i("beforeTransitionStart", (C, G, ae) => {
            e.destroyed || !e.autoplay.running || (ae || !e.params.autoplay.disableOnInteraction ? _(!0, !0) : A());
        }),
        i("sliderFirstMove", () => {
            if (!(e.destroyed || !e.autoplay.running)) {
                if (e.params.autoplay.disableOnInteraction) {
                    A();
                    return;
                }
                (m = !0),
                    (u = !1),
                    (b = !1),
                    (f = setTimeout(() => {
                        (b = !0), (u = !0), _(!0);
                    }, 200));
            }
        }),
        i("touchEnd", () => {
            if (!(e.destroyed || !e.autoplay.running || !m)) {
                if ((clearTimeout(f), clearTimeout(a), e.params.autoplay.disableOnInteraction)) {
                    (u = !1), (m = !1);
                    return;
                }
                u && e.params.cssMode && M(), (u = !1), (m = !1);
            }
        }),
        i("slideChange", () => {
            e.destroyed || !e.autoplay.running || (w = !0);
        }),
        Object.assign(e.autoplay, { start: P, stop: A, pause: _, resume: M });
}
function Jo(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({
        thumbs: {
            swiper: null,
            multipleActiveThumbs: !0,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-thumbs",
        },
    });
    let n = !1,
        r = !1;
    e.thumbs = { swiper: null };
    function a() {
        const c = e.thumbs.swiper;
        if (!c || c.destroyed) return;
        const d = c.clickedIndex,
            p = c.clickedSlide;
        if ((p && p.classList.contains(e.params.thumbs.slideThumbActiveClass)) || typeof d > "u" || d === null) return;
        let g;
        c.params.loop ? (g = parseInt(c.clickedSlide.getAttribute("data-swiper-slide-index"), 10)) : (g = d),
            e.params.loop ? e.slideToLoop(g) : e.slideTo(g);
    }
    function o() {
        const { thumbs: c } = e.params;
        if (n) return !1;
        n = !0;
        const d = e.constructor;
        if (c.swiper instanceof d) {
            if (c.swiper.destroyed) return (n = !1), !1;
            (e.thumbs.swiper = c.swiper),
                Object.assign(e.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
                Object.assign(e.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
                e.thumbs.swiper.update();
        } else if (ls(c.swiper)) {
            const p = Object.assign({}, c.swiper);
            Object.assign(p, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
                (e.thumbs.swiper = new d(p)),
                (r = !0);
        }
        return e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", a), !0;
    }
    function l(c) {
        const d = e.thumbs.swiper;
        if (!d || d.destroyed) return;
        const p = d.params.slidesPerView === "auto" ? d.slidesPerViewDynamic() : d.params.slidesPerView;
        let g = 1;
        const m = e.params.thumbs.slideThumbActiveClass;
        if (
            (e.params.slidesPerView > 1 && !e.params.centeredSlides && (g = e.params.slidesPerView),
            e.params.thumbs.multipleActiveThumbs || (g = 1),
            (g = Math.floor(g)),
            d.slides.forEach((w) => w.classList.remove(m)),
            d.params.loop || (d.params.virtual && d.params.virtual.enabled))
        )
            for (let w = 0; w < g; w += 1)
                ze(d.slidesEl, `[data-swiper-slide-index="${e.realIndex + w}"]`).forEach((b) => {
                    b.classList.add(m);
                });
        else for (let w = 0; w < g; w += 1) d.slides[e.realIndex + w] && d.slides[e.realIndex + w].classList.add(m);
        const u = e.params.thumbs.autoScrollOffset,
            f = u && !d.params.loop;
        if (e.realIndex !== d.realIndex || f) {
            const w = d.activeIndex;
            let b, h;
            if (d.params.loop) {
                const v = d.slides.find((y) => y.getAttribute("data-swiper-slide-index") === `${e.realIndex}`);
                (b = d.slides.indexOf(v)), (h = e.activeIndex > e.previousIndex ? "next" : "prev");
            } else (b = e.realIndex), (h = b > e.previousIndex ? "next" : "prev");
            f && (b += h === "next" ? u : -1 * u),
                d.visibleSlidesIndexes &&
                    d.visibleSlidesIndexes.indexOf(b) < 0 &&
                    (d.params.centeredSlides
                        ? b > w
                            ? (b = b - Math.floor(p / 2) + 1)
                            : (b = b + Math.floor(p / 2) - 1)
                        : b > w && d.params.slidesPerGroup,
                    d.slideTo(b, c ? 0 : void 0));
        }
    }
    i("beforeInit", () => {
        const { thumbs: c } = e.params;
        if (!(!c || !c.swiper))
            if (typeof c.swiper == "string" || c.swiper instanceof HTMLElement) {
                const d = $e(),
                    p = () => {
                        const m = typeof c.swiper == "string" ? d.querySelector(c.swiper) : c.swiper;
                        if (m && m.swiper) (c.swiper = m.swiper), o(), l(!0);
                        else if (m) {
                            const u = `${e.params.eventsPrefix}init`,
                                f = (w) => {
                                    (c.swiper = w.detail[0]),
                                        m.removeEventListener(u, f),
                                        o(),
                                        l(!0),
                                        c.swiper.update(),
                                        e.update();
                                };
                            m.addEventListener(u, f);
                        }
                        return m;
                    },
                    g = () => {
                        if (e.destroyed) return;
                        p() || requestAnimationFrame(g);
                    };
                requestAnimationFrame(g);
            } else o(), l(!0);
    }),
        i("slideChange update resize observerUpdate", () => {
            l();
        }),
        i("setTransition", (c, d) => {
            const p = e.thumbs.swiper;
            !p || p.destroyed || p.setTransition(d);
        }),
        i("beforeDestroy", () => {
            const c = e.thumbs.swiper;
            !c || c.destroyed || (r && c.destroy());
        }),
        Object.assign(e.thumbs, { init: o, update: l });
}
function Qo(t) {
    let { swiper: e, extendParams: s, emit: i, once: n } = t;
    s({
        freeMode: {
            enabled: !1,
            momentum: !0,
            momentumRatio: 1,
            momentumBounce: !0,
            momentumBounceRatio: 1,
            momentumVelocityRatio: 1,
            sticky: !1,
            minimumVelocity: 0.02,
        },
    });
    function r() {
        if (e.params.cssMode) return;
        const l = e.getTranslate();
        e.setTranslate(l),
            e.setTransition(0),
            (e.touchEventsData.velocities.length = 0),
            e.freeMode.onTouchEnd({ currentPos: e.rtl ? e.translate : -e.translate });
    }
    function a() {
        if (e.params.cssMode) return;
        const { touchEventsData: l, touches: c } = e;
        l.velocities.length === 0 &&
            l.velocities.push({ position: c[e.isHorizontal() ? "startX" : "startY"], time: l.touchStartTime }),
            l.velocities.push({ position: c[e.isHorizontal() ? "currentX" : "currentY"], time: it() });
    }
    function o(l) {
        let { currentPos: c } = l;
        if (e.params.cssMode) return;
        const { params: d, wrapperEl: p, rtlTranslate: g, snapGrid: m, touchEventsData: u } = e,
            w = it() - u.touchStartTime;
        if (c < -e.minTranslate()) {
            e.slideTo(e.activeIndex);
            return;
        }
        if (c > -e.maxTranslate()) {
            e.slides.length < m.length ? e.slideTo(m.length - 1) : e.slideTo(e.slides.length - 1);
            return;
        }
        if (d.freeMode.momentum) {
            if (u.velocities.length > 1) {
                const A = u.velocities.pop(),
                    _ = u.velocities.pop(),
                    M = A.position - _.position,
                    k = A.time - _.time;
                (e.velocity = M / k),
                    (e.velocity /= 2),
                    Math.abs(e.velocity) < d.freeMode.minimumVelocity && (e.velocity = 0),
                    (k > 150 || it() - A.time > 300) && (e.velocity = 0);
            } else e.velocity = 0;
            (e.velocity *= d.freeMode.momentumVelocityRatio), (u.velocities.length = 0);
            let b = 1e3 * d.freeMode.momentumRatio;
            const h = e.velocity * b;
            let v = e.translate + h;
            g && (v = -v);
            let y = !1,
                E;
            const L = Math.abs(e.velocity) * 20 * d.freeMode.momentumBounceRatio;
            let P;
            if (v < e.maxTranslate())
                d.freeMode.momentumBounce
                    ? (v + e.maxTranslate() < -L && (v = e.maxTranslate() - L),
                      (E = e.maxTranslate()),
                      (y = !0),
                      (u.allowMomentumBounce = !0))
                    : (v = e.maxTranslate()),
                    d.loop && d.centeredSlides && (P = !0);
            else if (v > e.minTranslate())
                d.freeMode.momentumBounce
                    ? (v - e.minTranslate() > L && (v = e.minTranslate() + L),
                      (E = e.minTranslate()),
                      (y = !0),
                      (u.allowMomentumBounce = !0))
                    : (v = e.minTranslate()),
                    d.loop && d.centeredSlides && (P = !0);
            else if (d.freeMode.sticky) {
                let A;
                for (let _ = 0; _ < m.length; _ += 1)
                    if (m[_] > -v) {
                        A = _;
                        break;
                    }
                Math.abs(m[A] - v) < Math.abs(m[A - 1] - v) || e.swipeDirection === "next"
                    ? (v = m[A])
                    : (v = m[A - 1]),
                    (v = -v);
            }
            if (
                (P &&
                    n("transitionEnd", () => {
                        e.loopFix();
                    }),
                e.velocity !== 0)
            ) {
                if (
                    (g
                        ? (b = Math.abs((-v - e.translate) / e.velocity))
                        : (b = Math.abs((v - e.translate) / e.velocity)),
                    d.freeMode.sticky)
                ) {
                    const A = Math.abs((g ? -v : v) - e.translate),
                        _ = e.slidesSizesGrid[e.activeIndex];
                    A < _ ? (b = d.speed) : A < 2 * _ ? (b = d.speed * 1.5) : (b = d.speed * 2.5);
                }
            } else if (d.freeMode.sticky) {
                e.slideToClosest();
                return;
            }
            d.freeMode.momentumBounce && y
                ? (e.updateProgress(E),
                  e.setTransition(b),
                  e.setTranslate(v),
                  e.transitionStart(!0, e.swipeDirection),
                  (e.animating = !0),
                  us(p, () => {
                      !e ||
                          e.destroyed ||
                          !u.allowMomentumBounce ||
                          (i("momentumBounce"),
                          e.setTransition(d.speed),
                          setTimeout(() => {
                              e.setTranslate(E),
                                  us(p, () => {
                                      !e || e.destroyed || e.transitionEnd();
                                  });
                          }, 0));
                  }))
                : e.velocity
                  ? (i("_freeModeNoMomentumRelease"),
                    e.updateProgress(v),
                    e.setTransition(b),
                    e.setTranslate(v),
                    e.transitionStart(!0, e.swipeDirection),
                    e.animating ||
                        ((e.animating = !0),
                        us(p, () => {
                            !e || e.destroyed || e.transitionEnd();
                        })))
                  : e.updateProgress(v),
                e.updateActiveIndex(),
                e.updateSlidesClasses();
        } else if (d.freeMode.sticky) {
            e.slideToClosest();
            return;
        } else d.freeMode && i("_freeModeNoMomentumRelease");
        (!d.freeMode.momentum || w >= d.longSwipesMs) &&
            (i("_freeModeStaticRelease"), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses());
    }
    Object.assign(e, { freeMode: { onTouchStart: r, onTouchMove: a, onTouchEnd: o } });
}
function el(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({ grid: { rows: 1, fill: "column" } });
    let n, r, a, o;
    const l = () => {
            let f = e.params.spaceBetween;
            return (
                typeof f == "string" && f.indexOf("%") >= 0
                    ? (f = (parseFloat(f.replace("%", "")) / 100) * e.size)
                    : typeof f == "string" && (f = parseFloat(f)),
                f
            );
        },
        c = (f) => {
            const { slidesPerView: w } = e.params,
                { rows: b, fill: h } = e.params.grid,
                v = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : f.length;
            (a = Math.floor(v / b)),
                Math.floor(v / b) === v / b ? (n = v) : (n = Math.ceil(v / b) * b),
                w !== "auto" && h === "row" && (n = Math.max(n, w * b)),
                (r = n / b);
        },
        d = () => {
            e.slides &&
                e.slides.forEach((f) => {
                    f.swiperSlideGridSet && ((f.style.height = ""), (f.style[e.getDirectionLabel("margin-top")] = ""));
                });
        },
        p = (f, w, b) => {
            const { slidesPerGroup: h } = e.params,
                v = l(),
                { rows: y, fill: E } = e.params.grid,
                L = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : b.length;
            let P, A, _;
            if (E === "row" && h > 1) {
                const M = Math.floor(f / (h * y)),
                    k = f - y * h * M,
                    O = M === 0 ? h : Math.min(Math.ceil((L - M * y * h) / y), h);
                (_ = Math.floor(k / O)), (A = k - _ * O + M * h), (P = A + (_ * n) / y), (w.style.order = P);
            } else
                E === "column"
                    ? ((A = Math.floor(f / y)),
                      (_ = f - A * y),
                      (A > a || (A === a && _ === y - 1)) && ((_ += 1), _ >= y && ((_ = 0), (A += 1))))
                    : ((_ = Math.floor(f / r)), (A = f - _ * r));
            (w.row = _),
                (w.column = A),
                (w.style.height = `calc((100% - ${(y - 1) * v}px) / ${y})`),
                (w.style[e.getDirectionLabel("margin-top")] = _ !== 0 ? v && `${v}px` : ""),
                (w.swiperSlideGridSet = !0);
        },
        g = (f, w) => {
            const { centeredSlides: b, roundLengths: h } = e.params,
                v = l(),
                { rows: y } = e.params.grid;
            if (
                ((e.virtualSize = (f + v) * n),
                (e.virtualSize = Math.ceil(e.virtualSize / y) - v),
                e.params.cssMode || (e.wrapperEl.style[e.getDirectionLabel("width")] = `${e.virtualSize + v}px`),
                b)
            ) {
                const E = [];
                for (let L = 0; L < w.length; L += 1) {
                    let P = w[L];
                    h && (P = Math.floor(P)), w[L] < e.virtualSize + w[0] && E.push(P);
                }
                w.splice(0, w.length), w.push(...E);
            }
        },
        m = () => {
            o = e.params.grid && e.params.grid.rows > 1;
        },
        u = () => {
            const { params: f, el: w } = e,
                b = f.grid && f.grid.rows > 1;
            o && !b
                ? (w.classList.remove(`${f.containerModifierClass}grid`, `${f.containerModifierClass}grid-column`),
                  (a = 1),
                  e.emitContainerClasses())
                : !o &&
                  b &&
                  (w.classList.add(`${f.containerModifierClass}grid`),
                  f.grid.fill === "column" && w.classList.add(`${f.containerModifierClass}grid-column`),
                  e.emitContainerClasses()),
                (o = b);
        };
    i("init", m), i("update", u), (e.grid = { initSlides: c, unsetSlides: d, updateSlide: p, updateWrapperSize: g });
}
function tl(t) {
    const e = this,
        { params: s, slidesEl: i } = e;
    s.loop && e.loopDestroy();
    const n = (r) => {
        if (typeof r == "string") {
            const a = document.createElement("div");
            Et(a, r), i.append(a.children[0]), Et(a, "");
        } else i.append(r);
    };
    if (typeof t == "object" && "length" in t) for (let r = 0; r < t.length; r += 1) t[r] && n(t[r]);
    else n(t);
    e.recalcSlides(), s.loop && e.loopCreate(), (!s.observer || e.isElement) && e.update();
}
function sl(t) {
    const e = this,
        { params: s, activeIndex: i, slidesEl: n } = e;
    s.loop && e.loopDestroy();
    let r = i + 1;
    const a = (o) => {
        if (typeof o == "string") {
            const l = document.createElement("div");
            Et(l, o), n.prepend(l.children[0]), Et(l, "");
        } else n.prepend(o);
    };
    if (typeof t == "object" && "length" in t) {
        for (let o = 0; o < t.length; o += 1) t[o] && a(t[o]);
        r = i + t.length;
    } else a(t);
    e.recalcSlides(), s.loop && e.loopCreate(), (!s.observer || e.isElement) && e.update(), e.slideTo(r, 0, !1);
}
function il(t, e) {
    const s = this,
        { params: i, activeIndex: n, slidesEl: r } = s;
    let a = n;
    i.loop && ((a -= s.loopedSlides), s.loopDestroy(), s.recalcSlides());
    const o = s.slides.length;
    if (t <= 0) {
        s.prependSlide(e);
        return;
    }
    if (t >= o) {
        s.appendSlide(e);
        return;
    }
    let l = a > t ? a + 1 : a;
    const c = [];
    for (let d = o - 1; d >= t; d -= 1) {
        const p = s.slides[d];
        p.remove(), c.unshift(p);
    }
    if (typeof e == "object" && "length" in e) {
        for (let d = 0; d < e.length; d += 1) e[d] && r.append(e[d]);
        l = a > t ? a + e.length : a;
    } else r.append(e);
    for (let d = 0; d < c.length; d += 1) r.append(c[d]);
    s.recalcSlides(),
        i.loop && s.loopCreate(),
        (!i.observer || s.isElement) && s.update(),
        i.loop ? s.slideTo(l + s.loopedSlides, 0, !1) : s.slideTo(l, 0, !1);
}
function nl(t) {
    const e = this,
        { params: s, activeIndex: i } = e;
    let n = i;
    s.loop && ((n -= e.loopedSlides), e.loopDestroy());
    let r = n,
        a;
    if (typeof t == "object" && "length" in t) {
        for (let o = 0; o < t.length; o += 1) (a = t[o]), e.slides[a] && e.slides[a].remove(), a < r && (r -= 1);
        r = Math.max(r, 0);
    } else (a = t), e.slides[a] && e.slides[a].remove(), a < r && (r -= 1), (r = Math.max(r, 0));
    e.recalcSlides(),
        s.loop && e.loopCreate(),
        (!s.observer || e.isElement) && e.update(),
        s.loop ? e.slideTo(r + e.loopedSlides, 0, !1) : e.slideTo(r, 0, !1);
}
function rl() {
    const t = this,
        e = [];
    for (let s = 0; s < t.slides.length; s += 1) e.push(s);
    t.removeSlide(e);
}
function al(t) {
    let { swiper: e } = t;
    Object.assign(e, {
        appendSlide: tl.bind(e),
        prependSlide: sl.bind(e),
        addSlide: il.bind(e),
        removeSlide: nl.bind(e),
        removeAllSlides: rl.bind(e),
    });
}
function ns(t) {
    const {
        effect: e,
        swiper: s,
        on: i,
        setTranslate: n,
        setTransition: r,
        overwriteParams: a,
        perspective: o,
        recreateShadows: l,
        getEffectParams: c,
    } = t;
    i("beforeInit", () => {
        if (s.params.effect !== e) return;
        s.classNames.push(`${s.params.containerModifierClass}${e}`),
            o && o() && s.classNames.push(`${s.params.containerModifierClass}3d`);
        const p = a ? a() : {};
        Object.assign(s.params, p), Object.assign(s.originalParams, p);
    }),
        i("setTranslate _virtualUpdated", () => {
            s.params.effect === e && n();
        }),
        i("setTransition", (p, g) => {
            s.params.effect === e && r(g);
        }),
        i("transitionEnd", () => {
            if (s.params.effect === e && l) {
                if (!c || !c().slideShadows) return;
                s.slides.forEach((p) => {
                    p.querySelectorAll(
                        ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    ).forEach((g) => g.remove());
                }),
                    l();
            }
        });
    let d;
    i("virtualUpdate", () => {
        s.params.effect === e &&
            (s.slides.length || (d = !0),
            requestAnimationFrame(() => {
                d && s.slides && s.slides.length && (n(), (d = !1));
            }));
    });
}
function Ps(t, e) {
    const s = jt(e);
    return s !== e && ((s.style.backfaceVisibility = "hidden"), (s.style["-webkit-backface-visibility"] = "hidden")), s;
}
function ti(t) {
    let { swiper: e, duration: s, transformElements: i, allSlides: n } = t;
    const { activeIndex: r } = e,
        a = (o) =>
            o.parentElement ? o.parentElement : e.slides.find((c) => c.shadowRoot && c.shadowRoot === o.parentNode);
    if (e.params.virtualTranslate && s !== 0) {
        let o = !1,
            l;
        n
            ? (l = i)
            : (l = i.filter((c) => {
                  const d = c.classList.contains("swiper-slide-transform") ? a(c) : c;
                  return e.getSlideIndex(d) === r;
              })),
            l.forEach((c) => {
                us(c, () => {
                    if (o || !e || e.destroyed) return;
                    (o = !0), (e.animating = !1);
                    const d = new window.CustomEvent("transitionend", { bubbles: !0, cancelable: !0 });
                    e.wrapperEl.dispatchEvent(d);
                });
            });
    }
}
function ol(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({ fadeEffect: { crossFade: !1 } }),
        ns({
            effect: "fade",
            swiper: e,
            on: i,
            setTranslate: () => {
                const { slides: a } = e,
                    o = e.params.fadeEffect;
                for (let l = 0; l < a.length; l += 1) {
                    const c = e.slides[l];
                    let p = -c.swiperSlideOffset;
                    e.params.virtualTranslate || (p -= e.translate);
                    let g = 0;
                    e.isHorizontal() || ((g = p), (p = 0));
                    const m = e.params.fadeEffect.crossFade
                            ? Math.max(1 - Math.abs(c.progress), 0)
                            : 1 + Math.min(Math.max(c.progress, -1), 0),
                        u = Ps(o, c);
                    (u.style.opacity = m), (u.style.transform = `translate3d(${p}px, ${g}px, 0px)`);
                }
            },
            setTransition: (a) => {
                const o = e.slides.map((l) => jt(l));
                o.forEach((l) => {
                    l.style.transitionDuration = `${a}ms`;
                }),
                    ti({ swiper: e, duration: a, transformElements: o, allSlides: !0 });
            },
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !e.params.cssMode,
            }),
        });
}
function ll(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({ cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: 0.94 } });
    const n = (l, c, d) => {
        let p = d ? l.querySelector(".swiper-slide-shadow-left") : l.querySelector(".swiper-slide-shadow-top"),
            g = d ? l.querySelector(".swiper-slide-shadow-right") : l.querySelector(".swiper-slide-shadow-bottom");
        p ||
            ((p = Ze("div", `swiper-slide-shadow-cube swiper-slide-shadow-${d ? "left" : "top"}`.split(" "))),
            l.append(p)),
            g ||
                ((g = Ze("div", `swiper-slide-shadow-cube swiper-slide-shadow-${d ? "right" : "bottom"}`.split(" "))),
                l.append(g)),
            p && (p.style.opacity = Math.max(-c, 0)),
            g && (g.style.opacity = Math.max(c, 0));
    };
    ns({
        effect: "cube",
        swiper: e,
        on: i,
        setTranslate: () => {
            const { el: l, wrapperEl: c, slides: d, width: p, height: g, rtlTranslate: m, size: u, browser: f } = e,
                w = ei(e),
                b = e.params.cubeEffect,
                h = e.isHorizontal(),
                v = e.virtual && e.params.virtual.enabled;
            let y = 0,
                E;
            b.shadow &&
                (h
                    ? ((E = e.wrapperEl.querySelector(".swiper-cube-shadow")),
                      E || ((E = Ze("div", "swiper-cube-shadow")), e.wrapperEl.append(E)),
                      (E.style.height = `${p}px`))
                    : ((E = l.querySelector(".swiper-cube-shadow")),
                      E || ((E = Ze("div", "swiper-cube-shadow")), l.append(E))));
            for (let P = 0; P < d.length; P += 1) {
                const A = d[P];
                let _ = P;
                v && (_ = parseInt(A.getAttribute("data-swiper-slide-index"), 10));
                let M = _ * 90,
                    k = Math.floor(M / 360);
                m && ((M = -M), (k = Math.floor(-M / 360)));
                const O = Math.max(Math.min(A.progress, 1), -1);
                let $ = 0,
                    D = 0,
                    q = 0;
                _ % 4 === 0
                    ? (($ = -k * 4 * u), (q = 0))
                    : (_ - 1) % 4 === 0
                      ? (($ = 0), (q = -k * 4 * u))
                      : (_ - 2) % 4 === 0
                        ? (($ = u + k * 4 * u), (q = u))
                        : (_ - 3) % 4 === 0 && (($ = -u), (q = 3 * u + u * 4 * k)),
                    m && ($ = -$),
                    h || ((D = $), ($ = 0));
                const H = `rotateX(${w(h ? 0 : -M)}deg) rotateY(${w(h ? M : 0)}deg) translate3d(${$}px, ${D}px, ${q}px)`;
                O <= 1 && O > -1 && ((y = _ * 90 + O * 90), m && (y = -_ * 90 - O * 90)),
                    (A.style.transform = H),
                    b.slideShadows && n(A, O, h);
            }
            if (
                ((c.style.transformOrigin = `50% 50% -${u / 2}px`),
                (c.style["-webkit-transform-origin"] = `50% 50% -${u / 2}px`),
                b.shadow)
            )
                if (h)
                    E.style.transform = `translate3d(0px, ${p / 2 + b.shadowOffset}px, ${-p / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${b.shadowScale})`;
                else {
                    const P = Math.abs(y) - Math.floor(Math.abs(y) / 90) * 90,
                        A = 1.5 - (Math.sin((P * 2 * Math.PI) / 360) / 2 + Math.cos((P * 2 * Math.PI) / 360) / 2),
                        _ = b.shadowScale,
                        M = b.shadowScale / A,
                        k = b.shadowOffset;
                    E.style.transform = `scale3d(${_}, 1, ${M}) translate3d(0px, ${g / 2 + k}px, ${-g / 2 / M}px) rotateX(-89.99deg)`;
                }
            const L = (f.isSafari || f.isWebView) && f.needPerspectiveFix ? -u / 2 : 0;
            (c.style.transform = `translate3d(0px,0,${L}px) rotateX(${w(e.isHorizontal() ? 0 : y)}deg) rotateY(${w(e.isHorizontal() ? -y : 0)}deg)`),
                c.style.setProperty("--swiper-cube-translate-z", `${L}px`);
        },
        setTransition: (l) => {
            const { el: c, slides: d } = e;
            if (
                (d.forEach((p) => {
                    (p.style.transitionDuration = `${l}ms`),
                        p
                            .querySelectorAll(
                                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                            )
                            .forEach((g) => {
                                g.style.transitionDuration = `${l}ms`;
                            });
                }),
                e.params.cubeEffect.shadow && !e.isHorizontal())
            ) {
                const p = c.querySelector(".swiper-cube-shadow");
                p && (p.style.transitionDuration = `${l}ms`);
            }
        },
        recreateShadows: () => {
            const l = e.isHorizontal();
            e.slides.forEach((c) => {
                const d = Math.max(Math.min(c.progress, 1), -1);
                n(c, d, l);
            });
        },
        getEffectParams: () => e.params.cubeEffect,
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0,
        }),
    });
}
function ts(t, e, s) {
    const i = `swiper-slide-shadow${s ? `-${s}` : ""}${t ? ` swiper-slide-shadow-${t}` : ""}`,
        n = jt(e);
    let r = n.querySelector(`.${i.split(" ").join(".")}`);
    return r || ((r = Ze("div", i.split(" "))), n.append(r)), r;
}
function cl(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({ flipEffect: { slideShadows: !0, limitRotation: !0 } });
    const n = (l, c) => {
        let d = e.isHorizontal()
                ? l.querySelector(".swiper-slide-shadow-left")
                : l.querySelector(".swiper-slide-shadow-top"),
            p = e.isHorizontal()
                ? l.querySelector(".swiper-slide-shadow-right")
                : l.querySelector(".swiper-slide-shadow-bottom");
        d || (d = ts("flip", l, e.isHorizontal() ? "left" : "top")),
            p || (p = ts("flip", l, e.isHorizontal() ? "right" : "bottom")),
            d && (d.style.opacity = Math.max(-c, 0)),
            p && (p.style.opacity = Math.max(c, 0));
    };
    ns({
        effect: "flip",
        swiper: e,
        on: i,
        setTranslate: () => {
            const { slides: l, rtlTranslate: c } = e,
                d = e.params.flipEffect,
                p = ei(e);
            for (let g = 0; g < l.length; g += 1) {
                const m = l[g];
                let u = m.progress;
                e.params.flipEffect.limitRotation && (u = Math.max(Math.min(m.progress, 1), -1));
                const f = m.swiperSlideOffset;
                let b = -180 * u,
                    h = 0,
                    v = e.params.cssMode ? -f - e.translate : -f,
                    y = 0;
                e.isHorizontal() ? c && (b = -b) : ((y = v), (v = 0), (h = -b), (b = 0)),
                    (m.style.zIndex = -Math.abs(Math.round(u)) + l.length),
                    d.slideShadows && n(m, u);
                const E = `translate3d(${v}px, ${y}px, 0px) rotateX(${p(h)}deg) rotateY(${p(b)}deg)`,
                    L = Ps(d, m);
                L.style.transform = E;
            }
        },
        setTransition: (l) => {
            const c = e.slides.map((d) => jt(d));
            c.forEach((d) => {
                (d.style.transitionDuration = `${l}ms`),
                    d
                        .querySelectorAll(
                            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                        )
                        .forEach((p) => {
                            p.style.transitionDuration = `${l}ms`;
                        });
            }),
                ti({ swiper: e, duration: l, transformElements: c });
        },
        recreateShadows: () => {
            e.params.flipEffect,
                e.slides.forEach((l) => {
                    let c = l.progress;
                    e.params.flipEffect.limitRotation && (c = Math.max(Math.min(l.progress, 1), -1)), n(l, c);
                });
        },
        getEffectParams: () => e.params.flipEffect,
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode,
        }),
    });
}
function dl(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({ coverflowEffect: { rotate: 50, stretch: 0, depth: 100, scale: 1, modifier: 1, slideShadows: !0 } }),
        ns({
            effect: "coverflow",
            swiper: e,
            on: i,
            setTranslate: () => {
                const { width: a, height: o, slides: l, slidesSizesGrid: c } = e,
                    d = e.params.coverflowEffect,
                    p = e.isHorizontal(),
                    g = e.translate,
                    m = p ? -g + a / 2 : -g + o / 2,
                    u = p ? d.rotate : -d.rotate,
                    f = d.depth,
                    w = ei(e);
                for (let b = 0, h = l.length; b < h; b += 1) {
                    const v = l[b],
                        y = c[b],
                        E = v.swiperSlideOffset,
                        L = (m - E - y / 2) / y,
                        P = typeof d.modifier == "function" ? d.modifier(L) : L * d.modifier;
                    let A = p ? u * P : 0,
                        _ = p ? 0 : u * P,
                        M = -f * Math.abs(P),
                        k = d.stretch;
                    typeof k == "string" && k.indexOf("%") !== -1 && (k = (parseFloat(d.stretch) / 100) * y);
                    let O = p ? 0 : k * P,
                        $ = p ? k * P : 0,
                        D = 1 - (1 - d.scale) * Math.abs(P);
                    Math.abs($) < 0.001 && ($ = 0),
                        Math.abs(O) < 0.001 && (O = 0),
                        Math.abs(M) < 0.001 && (M = 0),
                        Math.abs(A) < 0.001 && (A = 0),
                        Math.abs(_) < 0.001 && (_ = 0),
                        Math.abs(D) < 0.001 && (D = 0);
                    const q = `translate3d(${$}px,${O}px,${M}px)  rotateX(${w(_)}deg) rotateY(${w(A)}deg) scale(${D})`,
                        H = Ps(d, v);
                    if (((H.style.transform = q), (v.style.zIndex = -Math.abs(Math.round(P)) + 1), d.slideShadows)) {
                        let T = p
                                ? v.querySelector(".swiper-slide-shadow-left")
                                : v.querySelector(".swiper-slide-shadow-top"),
                            C = p
                                ? v.querySelector(".swiper-slide-shadow-right")
                                : v.querySelector(".swiper-slide-shadow-bottom");
                        T || (T = ts("coverflow", v, p ? "left" : "top")),
                            C || (C = ts("coverflow", v, p ? "right" : "bottom")),
                            T && (T.style.opacity = P > 0 ? P : 0),
                            C && (C.style.opacity = -P > 0 ? -P : 0);
                    }
                }
            },
            setTransition: (a) => {
                e.slides
                    .map((l) => jt(l))
                    .forEach((l) => {
                        (l.style.transitionDuration = `${a}ms`),
                            l
                                .querySelectorAll(
                                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                                )
                                .forEach((c) => {
                                    c.style.transitionDuration = `${a}ms`;
                                });
                    });
            },
            perspective: () => !0,
            overwriteParams: () => ({ watchSlidesProgress: !0 }),
        });
}
function ul(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({
        creativeEffect: {
            limitProgress: 1,
            shadowPerProgress: !1,
            progressMultiplier: 1,
            perspective: !0,
            prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
            next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
        },
    });
    const n = (o) => (typeof o == "string" ? o : `${o}px`);
    ns({
        effect: "creative",
        swiper: e,
        on: i,
        setTranslate: () => {
            const { slides: o, wrapperEl: l, slidesSizesGrid: c } = e,
                d = e.params.creativeEffect,
                { progressMultiplier: p } = d,
                g = e.params.centeredSlides,
                m = ei(e);
            if (g) {
                const u = c[0] / 2 - e.params.slidesOffsetBefore || 0;
                l.style.transform = `translateX(calc(50% - ${u}px))`;
            }
            for (let u = 0; u < o.length; u += 1) {
                const f = o[u],
                    w = f.progress,
                    b = Math.min(Math.max(f.progress, -d.limitProgress), d.limitProgress);
                let h = b;
                g || (h = Math.min(Math.max(f.originalProgress, -d.limitProgress), d.limitProgress));
                const v = f.swiperSlideOffset,
                    y = [e.params.cssMode ? -v - e.translate : -v, 0, 0],
                    E = [0, 0, 0];
                let L = !1;
                e.isHorizontal() || ((y[1] = y[0]), (y[0] = 0));
                let P = { translate: [0, 0, 0], rotate: [0, 0, 0], scale: 1, opacity: 1 };
                b < 0 ? ((P = d.next), (L = !0)) : b > 0 && ((P = d.prev), (L = !0)),
                    y.forEach((D, q) => {
                        y[q] = `calc(${D}px + (${n(P.translate[q])} * ${Math.abs(b * p)}))`;
                    }),
                    E.forEach((D, q) => {
                        let H = P.rotate[q] * Math.abs(b * p);
                        E[q] = H;
                    }),
                    (f.style.zIndex = -Math.abs(Math.round(w)) + o.length);
                const A = y.join(", "),
                    _ = `rotateX(${m(E[0])}deg) rotateY(${m(E[1])}deg) rotateZ(${m(E[2])}deg)`,
                    M = h < 0 ? `scale(${1 + (1 - P.scale) * h * p})` : `scale(${1 - (1 - P.scale) * h * p})`,
                    k = h < 0 ? 1 + (1 - P.opacity) * h * p : 1 - (1 - P.opacity) * h * p,
                    O = `translate3d(${A}) ${_} ${M}`;
                if ((L && P.shadow) || !L) {
                    let D = f.querySelector(".swiper-slide-shadow");
                    if ((!D && P.shadow && (D = ts("creative", f)), D)) {
                        const q = d.shadowPerProgress ? b * (1 / d.limitProgress) : b;
                        D.style.opacity = Math.min(Math.max(Math.abs(q), 0), 1);
                    }
                }
                const $ = Ps(d, f);
                ($.style.transform = O), ($.style.opacity = k), P.origin && ($.style.transformOrigin = P.origin);
            }
        },
        setTransition: (o) => {
            const l = e.slides.map((c) => jt(c));
            l.forEach((c) => {
                (c.style.transitionDuration = `${o}ms`),
                    c.querySelectorAll(".swiper-slide-shadow").forEach((d) => {
                        d.style.transitionDuration = `${o}ms`;
                    });
            }),
                ti({ swiper: e, duration: o, transformElements: l, allSlides: !0 });
        },
        perspective: () => e.params.creativeEffect.perspective,
        overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !e.params.cssMode }),
    });
}
function fl(t) {
    let { swiper: e, extendParams: s, on: i } = t;
    s({ cardsEffect: { slideShadows: !0, rotate: !0, perSlideRotate: 2, perSlideOffset: 8 } }),
        ns({
            effect: "cards",
            swiper: e,
            on: i,
            setTranslate: () => {
                const { slides: a, activeIndex: o, rtlTranslate: l } = e,
                    c = e.params.cardsEffect,
                    { startTranslate: d, isTouched: p } = e.touchEventsData,
                    g = l ? -e.translate : e.translate;
                for (let m = 0; m < a.length; m += 1) {
                    const u = a[m],
                        f = u.progress,
                        w = Math.min(Math.max(f, -4), 4);
                    let b = u.swiperSlideOffset;
                    e.params.centeredSlides &&
                        !e.params.cssMode &&
                        (e.wrapperEl.style.transform = `translateX(${e.minTranslate()}px)`),
                        e.params.centeredSlides && e.params.cssMode && (b -= a[0].swiperSlideOffset);
                    let h = e.params.cssMode ? -b - e.translate : -b,
                        v = 0;
                    const y = -100 * Math.abs(w);
                    let E = 1,
                        L = -c.perSlideRotate * w,
                        P = c.perSlideOffset - Math.abs(w) * 0.75;
                    const A = e.virtual && e.params.virtual.enabled ? e.virtual.from + m : m,
                        _ = (A === o || A === o - 1) && w > 0 && w < 1 && (p || e.params.cssMode) && g < d,
                        M = (A === o || A === o + 1) && w < 0 && w > -1 && (p || e.params.cssMode) && g > d;
                    if (_ || M) {
                        const D = (1 - Math.abs((Math.abs(w) - 0.5) / 0.5)) ** 0.5;
                        (L += -28 * w * D), (E += -0.5 * D), (P += 96 * D), (v = `${-25 * D * Math.abs(w)}%`);
                    }
                    if (
                        (w < 0
                            ? (h = `calc(${h}px ${l ? "-" : "+"} (${P * Math.abs(w)}%))`)
                            : w > 0
                              ? (h = `calc(${h}px ${l ? "-" : "+"} (-${P * Math.abs(w)}%))`)
                              : (h = `${h}px`),
                        !e.isHorizontal())
                    ) {
                        const D = v;
                        (v = h), (h = D);
                    }
                    const k = w < 0 ? `${1 + (1 - E) * w}` : `${1 - (1 - E) * w}`,
                        O = `
        translate3d(${h}, ${v}, ${y}px)
        rotateZ(${c.rotate ? (l ? -L : L) : 0}deg)
        scale(${k})
      `;
                    if (c.slideShadows) {
                        let D = u.querySelector(".swiper-slide-shadow");
                        D || (D = ts("cards", u)),
                            D && (D.style.opacity = Math.min(Math.max((Math.abs(w) - 0.5) / 0.5, 0), 1));
                    }
                    u.style.zIndex = -Math.abs(Math.round(f)) + a.length;
                    const $ = Ps(c, u);
                    $.style.transform = O;
                }
            },
            setTransition: (a) => {
                const o = e.slides.map((l) => jt(l));
                o.forEach((l) => {
                    (l.style.transitionDuration = `${a}ms`),
                        l.querySelectorAll(".swiper-slide-shadow").forEach((c) => {
                            c.style.transitionDuration = `${a}ms`;
                        });
                }),
                    ti({ swiper: e, duration: a, transformElements: o });
            },
            perspective: () => !0,
            overwriteParams: () => ({
                _loopSwapReset: !1,
                watchSlidesProgress: !0,
                loopAdditionalSlides: e.params.cardsEffect.rotate ? 3 : 2,
                centeredSlides: !0,
                virtualTranslate: !e.params.cssMode,
            }),
        });
}
const pl = [Fo, Bo, Vo, No, qo, jo, Go, Wo, Yo, Xo, Uo, Ko, Zo, Jo, Qo, el, al, ol, ll, cl, dl, ul, fl];
ke.use(pl);
function ur() {
    document.querySelectorAll(".pdp-top-section").forEach((e, s) => {
        let i = e.querySelector(".js-pdp-swiper-thumbs");
        var n = new ke(i, {
            direction: "horizontal",
            slidesPerView: 5,
            watchSlidesProgress: !0,
            freeMode: !1,
            grabCursor: !0,
            spaceBetween: 7,
            threshold: 10,
            slidesOffsetBefore: 2,
            slidesOffsetAfter: 2,
            breakpoints: {
                768: {
                    direction: "vertical",
                    slidesPerView: "auto",
                    spaceBetween: 12,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },
            },
        });
        const r = e.querySelector(".js-pdp-swiper");
        if (r && r.getAttribute("data-image-count")) {
            if (parseInt(r.getAttribute("data-image-count")) <= 1) return;
            const o = new ke(r, {
                direction: "horizontal",
                zoom: !0,
                speed: 300,
                slidesPerView: 1.23,
                threshold: 10,
                grabCursor: !0,
                initialSlide: 0,
                roundLengths: !0,
                spaceBetween: 10,
                slidesOffsetBefore: 16,
                slidesOffsetAfter: 16,
                breakpoints: { 768: { slidesPerView: 1, spaceBetween: 0, slidesOffsetBefore: 0, slidesOffsetAfter: 0 } },
                navigation: { nextEl: ".swiper-button-next-thumbs", prevEl: ".swiper-button-prev-thumbs" },
                thumbs: { swiper: n },
            });
            window.pdpSwiper = o;
            let l = document.querySelectorAll(".js-zoom-trigger");
            l.length > 0 &&
                l.forEach((c) => {
                    c.addEventListener("click", () => {
                        o.zoom.toggle();
                    });
                });
        }
    });
}
function fr() {
    document.querySelectorAll(".accordion").forEach((t) => {
        const e = t.querySelector("summary");
        if (!e) return;
        const s = t.querySelector(".accordion__content"),
            i = e.querySelector(".icon");
        let n = !1;
        e?.addEventListener("click", (r) => {
            if ((r.preventDefault(), n)) return;
            (n = !0),
                t.hasAttribute("open")
                    ? ((s.style.height = `${s.scrollHeight}px`),
                      s.offsetHeight,
                      (s.style.height = "0px"),
                      i && (i.style.transform = "rotate(0deg)"),
                      s.addEventListener("transitionend", function o() {
                          t.removeAttribute("open"),
                              (s.style.height = ""),
                              (n = !1),
                              s.removeEventListener("transitionend", o);
                      }))
                    : (t.setAttribute("open", ""),
                      (s.style.height = "0px"),
                      i && (i.style.transform = "rotate(-180deg)"),
                      s.offsetHeight,
                      (s.style.height = `${s.scrollHeight}px`),
                      s.addEventListener("transitionend", function o() {
                          (s.style.height = "auto"), (n = !1), s.removeEventListener("transitionend", o);
                      }));
        });
    });
}
function pr() {
    function t() {
        const s = document.querySelector("recharge-subscription-widget");
        if (!s?.shadowRoot) {
            setTimeout(t, 300);
            return;
        }
        const i = s.shadowRoot,
            n = new MutationObserver(() => {
                i.querySelector(".rc-purchase-option__price, [part='rc-purchase-option__discounted-price']") &&
                    (n.disconnect(), e(i));
            });
        n.observe(i, { childList: !0, subtree: !0 });
    }
    t();
    function e(s) {
        const i = document.getElementById("dynamic-price");
        if (!i) return;
        i.style.opacity = "0";
        let n = "",
            r = !1,
            a;
        const o = (g) =>
                g
                    ?.querySelector("[part~='rc-plans-button__selected'] [part~='rc-plans-button__interval']")
                    ?.textContent.trim()
                    .toLowerCase() || null,
            l = (g, m) => {
                m === "1 month" ? (i.innerHTML = `${g}`) : (i.innerHTML = g), (i.style.opacity = "1");
            },
            c = () => {
                if (r) return;
                const g = !!s.querySelector(".rc-purchase-option__subscription[rc-selected]"),
                    m = s.querySelector(
                        g ? "[part='rc-purchase-option__discounted-price']" : "[part='rc-purchase-option__price']"
                    );
                if (!(!m || m.innerHTML === n)) {
                    if (((r = !0), (n = m.innerHTML), g)) {
                        const u = s.querySelector("rc-selling-plans")?.shadowRoot,
                            f = o(u);
                        f
                            ? l(n, f)
                            : u
                              ? new MutationObserver((b, h) => {
                                    const v = o(u);
                                    v && (l(n, v), h.disconnect());
                                }).observe(u, { childList: !0, subtree: !0 })
                              : l(n);
                    } else l(n);
                    r = !1;
                }
            },
            d = () => {
                clearTimeout(a), (i.style.opacity = "0"), (a = setTimeout(c, 100));
            };
        new MutationObserver((g) => {
            g.some((u) =>
                u.type === "attributes"
                    ? u.target.matches?.(".rc-purchase-option__subscription") ||
                      u.target.matches?.('[part*="rc-purchase-option"]')
                    : u.type === "childList"
                      ? Array.from(u.addedNodes).some(
                            (f) => f.nodeType === Node.ELEMENT_NODE && f.matches?.('[part*="price"]')
                        )
                      : !1
            ) && d();
        }).observe(s, { attributes: !0, childList: !0, subtree: !0, attributeFilter: ["rc-selected"] }),
            c();
    }
}
function mr() {
    function t() {
        const e = document.querySelector("recharge-subscription-widget");
        if (!e?.shadowRoot) {
            setTimeout(t, 300);
            return;
        }
        const s = e.shadowRoot;
        new MutationObserver(() => {
            const subscriptionSelector = s.querySelector("[part~='rc-purchase-option__subscription']"),
                rechargeDis = subscriptionSelector?.querySelector(
                    "[part~='rc-purchase-option__selector_subscription']"
                );
            if (subscriptionSelector && rechargeDis) {
                const e =
                        subscriptionSelector.querySelector("[part~='rc-purchase-option__discounted-price']")
                            ?.textContent || "",
                    t =
                        subscriptionSelector.querySelector("[part~='rc-purchase-option__original-price']")
                            ?.textContent || "";
                let r = rechargeDis.textContent.trim();
                const c = Number(e.replace(/[^0-9.]/g, "")),
                    o = Number(t.replace(/[^0-9.]/g, ""));
                if (o > c && !r.includes("pack")) {
                    const e = (((o - c) / o) * 100).toFixed(0),
                        t = [...rechargeDis.childNodes].find(
                            (e) => e.nodeType === Node.TEXT_NODE && e.textContent.trim()
                        );
                    t && (t.textContent = `${t.textContent.trim()} ${e}% per pack `);
                }
            }
            const n = s.querySelector("[part~='rc-purchase-option__onetime']"),
                r = n?.querySelector(".rc-purchase-option__prices"),
                a = n?.querySelector(".rc-price")?.textContent || "",
                o = Number(a.replace(/[^0-9.]/g, "")),
                l = Number(document?.querySelector(".pdp-data")?.dataset.comparePrice),
                c = l - o,
                d = l > 0 ? ((c / l) * 100).toFixed(2) : 0;
            if (r) {
                if (!r.querySelector(".custom-compare-price")) {
                    const p = document.createElement("span");
                    (p.className = "custom-compare-price"),
                        p.classList.add("custom-compare-pric", "text-muted", "strike-through"),
                        (p.style.fontWeight = "500"),
                        (p.textContent = `$${l}`),
                        r.insertBefore(p, r.firstChild);
                }
            }
        }).observe(s, { childList: !0, subtree: !0 });
    }
    t();
}
function hr() {
    const t = document.querySelectorAll(".pdp-variant-selector .variant-button"),
        e = document.querySelector(".pdp-form input[name='id']"),
        s = document.getElementById("product-variants-json"),
        i = s ? JSON.parse(s.textContent || "[]") : [],
        n = s?.dataset.productHandle;
    if (!t.length || !e || !i.length) return;
    t.forEach((o) => {
        o.addEventListener("click", () => {
            t.forEach((l) => (l.disabled = !0)),
                o
                    .closest(".variant-buttons")
                    ?.querySelectorAll(".variant-button")
                    .forEach((l) => l.classList.remove("selected")),
                o.classList.add("selected"),
                r();
        });
    });
    function r() {
        if (!e) return;
        const o = [];
        document.querySelectorAll(".pdp-variant-selector .variant-buttons").forEach((c) => {
            const d = c.querySelector(".variant-button.active, .variant-button.selected");
            d && o.push(d.dataset.value || "");
        }),
            document.querySelectorAll(".pdp-variant-selector .variant-select").forEach((c) => {
                c.value && o.push(c.value);
            });
        const l = i.find((c) => c.options.every((d, p) => d === o[p]));
        l
            ? ((e.value = l.id), n && a(n, l.id, l.selling_plan_allocations.length > 0))
            : console.warn("⚠️ No matching variant found for", o);
    }
    function a(o, l, c) {
        const d = `${window.location.pathname}?variant=${l}`;
        window.history.replaceState({ path: d }, "", d),
            fetch(`/products/${o}?variant=${l}`)
                .then((p) => p.text())
                .then((p) => {
                    const u = new DOMParser().parseFromString(p, "text/html").querySelector(".pdp"),
                        f = document.querySelector(".pdp");
                    if ((u && f && ((f.innerHTML = u.innerHTML), hr(), ur(), Xi(), fr(), Yi(), pr(), mr()), c)) {
                        const w = f.querySelector(".product-price");
                        w && (w.style.opacity = "0");
                    } else {
                        const w = document.getElementById("dynamic-price");
                        w && (w.style.opacity = "1");
                    }
                })
                .catch((p) => {
                    console.error(p);
                })
                .finally(() => {
                    t.forEach((p) => (p.disabled = !1));
                });
    }
}
class ml extends HTMLElement {
    constructor() {
        super(), (this.form = null), (this.emailInput = null), (this.messageEl = null);
    }
    connectedCallback() {
        (this.form = this.querySelector("form")),
            (this.emailInput = this.querySelector('input[type="email"]')),
            (this.messageEl = document.createElement("div")),
            this.messageEl.classList.add("packaging-label-small", "klaviyo-message"),
            (this.messageEl.style.color = "white"),
            this.appendChild(this.messageEl),
            this.form && this.emailInput && this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }
    disconnectedCallback() {
        this.form && this.form.removeEventListener("submit", this.handleSubmit.bind(this));
    }
    showMessage(e, s = !1) {
        this.messageEl && ((this.messageEl.textContent = e), (this.messageEl.style.color = s ? "#CD3824" : "#ffffff"));
    }
    async handleSubmit(e) {
        e.preventDefault();
        const s = this.emailInput?.value.trim();
        if (!s || !/\S+@\S+\.\S+/.test(s)) {
            this.showMessage("Please enter a valid email address.", !0), this.form?.classList.add("klaviyo-error");
            return;
        } else this.form?.classList.remove("klaviyo-error");
        const i = "VkVNNS",
            r = {
                data: {
                    type: "subscription",
                    attributes: { profile: { data: { type: "profile", attributes: { email: s } } } },
                    relationships: { list: { data: { type: "list", id: "YgKx4G" } } },
                },
            };
        try {
            const a = await fetch(`https://a.klaviyo.com/client/subscriptions?company_id=${i}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Klaviyo-API-Key ${i}`,
                    revision: "2024-10-15",
                },
                body: JSON.stringify(r),
            });
            if (a.ok) this.showMessage("You're subscribed!"), this.form?.reset();
            else {
                const o = await a.json();
                console.error(o), this.showMessage("There was an error subscribing.", !0);
            }
        } catch (a) {
            console.error(a), this.showMessage("Network error. Please try again later.", !0);
        }
    }
}
const Tn = (t) => {
    const e = t.el.closest(".hero-carousel__swiper");
    if (!e) return;
    const s = t.slides[t.activeIndex],
        i = Array.from(t.slides).find(
            (r) => r instanceof HTMLElement && parseInt(r.getAttribute("data-swiper-slide-index")) === t.realIndex
        ),
        n = s?.getAttribute("data-theme-color") || i?.getAttribute("data-theme-color") || "";
    e.style.backgroundColor = n;
};
class hl extends HTMLElement {
    constructor() {
        super(), (this.swiper = null);
    }
    connectedCallback() {
        this.initSwiper(1.9);
    }
    initSwiper(e) {
        const s = this.querySelector(".swiper");
        s &&
            ((this.swiper = new ke(s, {
                slidesPerView: 1,
                centeredSlides: !0,
                initialSlide: 1,
                loop: this.hasAttribute("loop"),
                navigation: {
                    nextEl: this.querySelector(".swiper-button-next"),
                    prevEl: this.querySelector(".swiper-button-prev"),
                },
                breakpoints: { 768: { slidesPerView: e } },
            })),
            this.swiper.on("slideChange", function () {
                Tn(this);
            }),
            Tn(this.swiper));
    }
}
class gl extends HTMLElement {
    constructor() {
        super(), (this.input = null), (this.minusBtn = null), (this.plusBtn = null);
    }
    connectedCallback() {
        (this.input = this.querySelector(".quantity__input")),
            (this.minusBtn = this.querySelector('.quantity__button[name="minus"]')),
            (this.plusBtn = this.querySelector('.quantity__button[name="plus"]')),
            !(!this.input || !this.minusBtn || !this.plusBtn) &&
                (this.minusBtn.addEventListener("click", () => {
                    this.updateValue(-this.getStep());
                }),
                this.plusBtn.addEventListener("click", () => {
                    this.updateValue(this.getStep());
                }));
    }
    getMin() {
        return parseInt(this.dataset.min || this.input?.getAttribute("min") || "1", 10);
    }
    getMax() {
        const e = this.dataset.max || this.input?.getAttribute("max");
        return e ? parseInt(e, 10) : null;
    }
    getStep() {
        return parseInt(this.dataset.step || this.input?.getAttribute("step") || "1", 10);
    }
    updateValue(e) {
        if (!this.input) return;
        let s = parseInt(this.input.value, 10) || 0;
        const i = this.getMin(),
            n = this.getMax();
        (s += e),
            s < i && (s = i),
            n !== null && s > n && (s = n),
            (this.input.value = s.toString()),
            this.input.dispatchEvent(new Event("change", { bubbles: !0 }));
    }
}
class vl extends HTMLElement {
    constructor() {
        super(), (this.swiperInstance = null);
    }
    connectedCallback() {
        const e = this.querySelector(".make-you-feel__swiper");
        e &&
            (this.swiperInstance = new ke(e, {
                slidesPerView: 1,
                spaceBetween: 16,
                navigation: {
                    nextEl: ".make-you-feel__swiper .swiper-button-next",
                    prevEl: ".make-you-feel__swiper .swiper-button-prev",
                },
            }));
        const s = this.querySelectorAll(".make-you-feel__pagination button");
        s.length &&
            this.swiperInstance &&
            (s.forEach((i, n) => {
                i.addEventListener("click", () => {
                    this.swiperInstance.slideTo(n);
                });
            }),
            this.swiperInstance.on("slideChange", () => {
                s.forEach((i, n) => {
                    this.swiperInstance.activeIndex === n
                        ? (i.classList.add("button--primary-black", "border-2"),
                          i.classList.remove("button--primary-white-outlined"))
                        : (i.classList.remove("button--primary-black", "border-2"),
                          i.classList.add("button--primary-white-outlined"));
                });
            }));
    }
    disconnectedCallback() {
        this.swiperInstance && (this.swiperInstance.destroy(!0, !0), (this.swiperInstance = null));
    }
}
function wl() {
    const t = document.querySelector(".header");
    let e = window.scrollY,
        s = !1;
    function i() {
        if (!t) return;
        const r = window.scrollY;
        r === 0
            ? t.classList.remove("header--scroll-down", "header--scroll-up")
            : r > e
              ? (t.classList.add("header--scroll-down"), t.classList.remove("header--scroll-up"))
              : r < e && (t.classList.add("header--scroll-up"), t.classList.remove("header--scroll-down")),
            (e = r),
            (s = !1);
    }
    function n() {
        s || (requestAnimationFrame(i), (s = !0));
    }
    window.addEventListener("scroll", n);
}
class yl extends HTMLElement {
    connectedCallback() {
        const e = this.querySelector(".video-carousel__swiper");
        e &&
            new ke(e, {
                slidesPerView: 1.23,
                spaceBetween: 20,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
                breakpoints: { 768: { slidesPerView: 4, slidesOffsetBefore: 0, slidesOffsetAfter: 0 } },
                on: {
                    slideChange: () => {
                        document.querySelectorAll("video").forEach((s) => {
                            s.pause();
                            const i = s.closest(".video-card")?.querySelector(".play-button");
                            i && i.classList.remove("playing");
                        });
                    },
                },
            }),
            this.querySelectorAll(".video-card").forEach((s) => {
                const i = s.querySelector("video"),
                    n = s.querySelector(".play-button");
                i &&
                    n &&
                    (n.addEventListener("click", async (r) => {
                        if (n.classList.contains("playing")) {
                            i.pause(), n.classList.remove("playing");
                            return;
                        }
                        this.querySelectorAll("video").forEach((o) => {
                            if (o !== i && !o.paused) {
                                o.pause();
                                const l = o.closest(".video-card");
                                if (l) {
                                    const c = l.querySelector(".play-button");
                                    c && c.classList.remove("playing");
                                }
                            }
                        });
                        try {
                            await i.play(), n.classList.add("playing");
                        } catch (o) {
                            console.warn("Video playback failed:", o);
                        }
                    }),
                    i.addEventListener("ended", () => {
                        n.classList.remove("playing");
                    }));
            });
    }
}
function $i() {
    document.querySelectorAll(".pdp__stars[data-scroll-to]").forEach((e) => {
        e.addEventListener("click", (s) => {
            s.preventDefault();
            const i = e.getAttribute("data-scroll-to");
            if (!i) return;
            const n = document.querySelector(`[data-oke-reviews-product-id="${i}"]`);
            if (n) {
                const a = n.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: a, behavior: "smooth" });
            } else {
                const r = document.querySelector(".okeReviews, [data-oke-container]");
                if (r) {
                    const o = r.getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({ top: o, behavior: "smooth" });
                }
            }
        });
    });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", $i) : $i();
function bl() {
    new URL(window.location.href).searchParams.has("cart-open") ? window.openMiniCart() : window.closeMiniCart();
}
/**
 * @vue/shared v3.5.17
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function Zi(t) {
    const e = Object.create(null);
    for (const s of t.split(",")) e[s] = 1;
    return (s) => s in e;
}
const Se = {},
    Xt = [],
    pt = () => {},
    Sl = () => !1,
    si = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97),
    Ji = (t) => t.startsWith("onUpdate:"),
    Ve = Object.assign,
    Qi = (t, e) => {
        const s = t.indexOf(e);
        s > -1 && t.splice(s, 1);
    },
    xl = Object.prototype.hasOwnProperty,
    ye = (t, e) => xl.call(t, e),
    re = Array.isArray,
    Ut = (t) => Ls(t) === "[object Map]",
    rs = (t) => Ls(t) === "[object Set]",
    Cn = (t) => Ls(t) === "[object Date]",
    de = (t) => typeof t == "function",
    Le = (t) => typeof t == "string",
    mt = (t) => typeof t == "symbol",
    Te = (t) => t !== null && typeof t == "object",
    gr = (t) => (Te(t) || de(t)) && de(t.then) && de(t.catch),
    vr = Object.prototype.toString,
    Ls = (t) => vr.call(t),
    El = (t) => Ls(t).slice(8, -1),
    wr = (t) => Ls(t) === "[object Object]",
    en = (t) => Le(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t,
    fs = Zi(
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    ii = (t) => {
        const e = Object.create(null);
        return (s) => e[s] || (e[s] = t(s));
    },
    Tl = /-(\w)/g,
    rt = ii((t) => t.replace(Tl, (e, s) => (s ? s.toUpperCase() : ""))),
    Cl = /\B([A-Z])/g,
    Gt = ii((t) => t.replace(Cl, "-$1").toLowerCase()),
    ni = ii((t) => t.charAt(0).toUpperCase() + t.slice(1)),
    Si = ii((t) => (t ? `on${ni(t)}` : "")),
    kt = (t, e) => !Object.is(t, e),
    Fs = (t, ...e) => {
        for (let s = 0; s < t.length; s++) t[s](...e);
    },
    ki = (t, e, s, i = !1) => {
        Object.defineProperty(t, e, { configurable: !0, enumerable: !1, writable: i, value: s });
    },
    Ys = (t) => {
        const e = parseFloat(t);
        return isNaN(e) ? t : e;
    };
let _n;
const ri = () =>
    _n ||
    (_n =
        typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
              ? self
              : typeof window < "u"
                ? window
                : typeof global < "u"
                  ? global
                  : {});
function tn(t) {
    if (re(t)) {
        const e = {};
        for (let s = 0; s < t.length; s++) {
            const i = t[s],
                n = Le(i) ? Ll(i) : tn(i);
            if (n) for (const r in n) e[r] = n[r];
        }
        return e;
    } else if (Le(t) || Te(t)) return t;
}
const _l = /;(?![^(]*\))/g,
    Ml = /:([^]+)/,
    Pl = /\/\*[^]*?\*\//g;
function Ll(t) {
    const e = {};
    return (
        t
            .replace(Pl, "")
            .split(_l)
            .forEach((s) => {
                if (s) {
                    const i = s.split(Ml);
                    i.length > 1 && (e[i[0].trim()] = i[1].trim());
                }
            }),
        e
    );
}
function Nt(t) {
    let e = "";
    if (Le(t)) e = t;
    else if (re(t))
        for (let s = 0; s < t.length; s++) {
            const i = Nt(t[s]);
            i && (e += i + " ");
        }
    else if (Te(t)) for (const s in t) t[s] && (e += s + " ");
    return e.trim();
}
const Il = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Al = Zi(Il);
function yr(t) {
    return !!t || t === "";
}
function Ol(t, e) {
    if (t.length !== e.length) return !1;
    let s = !0;
    for (let i = 0; s && i < t.length; i++) s = Is(t[i], e[i]);
    return s;
}
function Is(t, e) {
    if (t === e) return !0;
    let s = Cn(t),
        i = Cn(e);
    if (s || i) return s && i ? t.getTime() === e.getTime() : !1;
    if (((s = mt(t)), (i = mt(e)), s || i)) return t === e;
    if (((s = re(t)), (i = re(e)), s || i)) return s && i ? Ol(t, e) : !1;
    if (((s = Te(t)), (i = Te(e)), s || i)) {
        if (!s || !i) return !1;
        const n = Object.keys(t).length,
            r = Object.keys(e).length;
        if (n !== r) return !1;
        for (const a in t) {
            const o = t.hasOwnProperty(a),
                l = e.hasOwnProperty(a);
            if ((o && !l) || (!o && l) || !Is(t[a], e[a])) return !1;
        }
    }
    return String(t) === String(e);
}
function sn(t, e) {
    return t.findIndex((s) => Is(s, e));
}
const br = (t) => !!(t && t.__v_isRef === !0),
    ce = (t) =>
        Le(t)
            ? t
            : t == null
              ? ""
              : re(t) || (Te(t) && (t.toString === vr || !de(t.toString)))
                ? br(t)
                    ? ce(t.value)
                    : JSON.stringify(t, Sr, 2)
                : String(t),
    Sr = (t, e) =>
        br(e)
            ? Sr(t, e.value)
            : Ut(e)
              ? { [`Map(${e.size})`]: [...e.entries()].reduce((s, [i, n], r) => ((s[xi(i, r) + " =>"] = n), s), {}) }
              : rs(e)
                ? { [`Set(${e.size})`]: [...e.values()].map((s) => xi(s)) }
                : mt(e)
                  ? xi(e)
                  : Te(e) && !re(e) && !wr(e)
                    ? String(e)
                    : e,
    xi = (t, e = "") => {
        var s;
        return mt(t) ? `Symbol(${(s = t.description) != null ? s : e})` : t;
    };
/**
 * @vue/reactivity v3.5.17
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let We;
class $l {
    constructor(e = !1) {
        (this.detached = e),
            (this._active = !0),
            (this._on = 0),
            (this.effects = []),
            (this.cleanups = []),
            (this._isPaused = !1),
            (this.parent = We),
            !e && We && (this.index = (We.scopes || (We.scopes = [])).push(this) - 1);
    }
    get active() {
        return this._active;
    }
    pause() {
        if (this._active) {
            this._isPaused = !0;
            let e, s;
            if (this.scopes) for (e = 0, s = this.scopes.length; e < s; e++) this.scopes[e].pause();
            for (e = 0, s = this.effects.length; e < s; e++) this.effects[e].pause();
        }
    }
    resume() {
        if (this._active && this._isPaused) {
            this._isPaused = !1;
            let e, s;
            if (this.scopes) for (e = 0, s = this.scopes.length; e < s; e++) this.scopes[e].resume();
            for (e = 0, s = this.effects.length; e < s; e++) this.effects[e].resume();
        }
    }
    run(e) {
        if (this._active) {
            const s = We;
            try {
                return (We = this), e();
            } finally {
                We = s;
            }
        }
    }
    on() {
        ++this._on === 1 && ((this.prevScope = We), (We = this));
    }
    off() {
        this._on > 0 && --this._on === 0 && ((We = this.prevScope), (this.prevScope = void 0));
    }
    stop(e) {
        if (this._active) {
            this._active = !1;
            let s, i;
            for (s = 0, i = this.effects.length; s < i; s++) this.effects[s].stop();
            for (this.effects.length = 0, s = 0, i = this.cleanups.length; s < i; s++) this.cleanups[s]();
            if (((this.cleanups.length = 0), this.scopes)) {
                for (s = 0, i = this.scopes.length; s < i; s++) this.scopes[s].stop(!0);
                this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !e) {
                const n = this.parent.scopes.pop();
                n && n !== this && ((this.parent.scopes[this.index] = n), (n.index = this.index));
            }
            this.parent = void 0;
        }
    }
}
function kl() {
    return We;
}
let xe;
const Ei = new WeakSet();
class xr {
    constructor(e) {
        (this.fn = e),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 5),
            (this.next = void 0),
            (this.cleanup = void 0),
            (this.scheduler = void 0),
            We && We.active && We.effects.push(this);
    }
    pause() {
        this.flags |= 64;
    }
    resume() {
        this.flags & 64 && ((this.flags &= -65), Ei.has(this) && (Ei.delete(this), this.trigger()));
    }
    notify() {
        (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Tr(this);
    }
    run() {
        if (!(this.flags & 1)) return this.fn();
        (this.flags |= 2), Mn(this), Cr(this);
        const e = xe,
            s = ot;
        (xe = this), (ot = !0);
        try {
            return this.fn();
        } finally {
            _r(this), (xe = e), (ot = s), (this.flags &= -3);
        }
    }
    stop() {
        if (this.flags & 1) {
            for (let e = this.deps; e; e = e.nextDep) an(e);
            (this.deps = this.depsTail = void 0), Mn(this), this.onStop && this.onStop(), (this.flags &= -2);
        }
    }
    trigger() {
        this.flags & 64 ? Ei.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
        Di(this) && this.run();
    }
    get dirty() {
        return Di(this);
    }
}
let Er = 0,
    ps,
    ms;
function Tr(t, e = !1) {
    if (((t.flags |= 8), e)) {
        (t.next = ms), (ms = t);
        return;
    }
    (t.next = ps), (ps = t);
}
function nn() {
    Er++;
}
function rn() {
    if (--Er > 0) return;
    if (ms) {
        let e = ms;
        for (ms = void 0; e; ) {
            const s = e.next;
            (e.next = void 0), (e.flags &= -9), (e = s);
        }
    }
    let t;
    for (; ps; ) {
        let e = ps;
        for (ps = void 0; e; ) {
            const s = e.next;
            if (((e.next = void 0), (e.flags &= -9), e.flags & 1))
                try {
                    e.trigger();
                } catch (i) {
                    t || (t = i);
                }
            e = s;
        }
    }
    if (t) throw t;
}
function Cr(t) {
    for (let e = t.deps; e; e = e.nextDep)
        (e.version = -1), (e.prevActiveLink = e.dep.activeLink), (e.dep.activeLink = e);
}
function _r(t) {
    let e,
        s = t.depsTail,
        i = s;
    for (; i; ) {
        const n = i.prevDep;
        i.version === -1 ? (i === s && (s = n), an(i), Dl(i)) : (e = i),
            (i.dep.activeLink = i.prevActiveLink),
            (i.prevActiveLink = void 0),
            (i = n);
    }
    (t.deps = e), (t.depsTail = s);
}
function Di(t) {
    for (let e = t.deps; e; e = e.nextDep)
        if (e.dep.version !== e.version || (e.dep.computed && (Mr(e.dep.computed) || e.dep.version !== e.version)))
            return !0;
    return !!t._dirty;
}
function Mr(t) {
    if (
        (t.flags & 4 && !(t.flags & 16)) ||
        ((t.flags &= -17), t.globalVersion === Ss) ||
        ((t.globalVersion = Ss), !t.isSSR && t.flags & 128 && ((!t.deps && !t._dirty) || !Di(t)))
    )
        return;
    t.flags |= 2;
    const e = t.dep,
        s = xe,
        i = ot;
    (xe = t), (ot = !0);
    try {
        Cr(t);
        const n = t.fn(t._value);
        (e.version === 0 || kt(n, t._value)) && ((t.flags |= 128), (t._value = n), e.version++);
    } catch (n) {
        throw (e.version++, n);
    } finally {
        (xe = s), (ot = i), _r(t), (t.flags &= -3);
    }
}
function an(t, e = !1) {
    const { dep: s, prevSub: i, nextSub: n } = t;
    if (
        (i && ((i.nextSub = n), (t.prevSub = void 0)),
        n && ((n.prevSub = i), (t.nextSub = void 0)),
        s.subs === t && ((s.subs = i), !i && s.computed))
    ) {
        s.computed.flags &= -5;
        for (let r = s.computed.deps; r; r = r.nextDep) an(r, !0);
    }
    !e && !--s.sc && s.map && s.map.delete(s.key);
}
function Dl(t) {
    const { prevDep: e, nextDep: s } = t;
    e && ((e.nextDep = s), (t.prevDep = void 0)), s && ((s.prevDep = e), (t.nextDep = void 0));
}
let ot = !0;
const Pr = [];
function Tt() {
    Pr.push(ot), (ot = !1);
}
function Ct() {
    const t = Pr.pop();
    ot = t === void 0 ? !0 : t;
}
function Mn(t) {
    const { cleanup: e } = t;
    if (((t.cleanup = void 0), e)) {
        const s = xe;
        xe = void 0;
        try {
            e();
        } finally {
            xe = s;
        }
    }
}
let Ss = 0;
class zl {
    constructor(e, s) {
        (this.sub = e),
            (this.dep = s),
            (this.version = s.version),
            (this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0);
    }
}
class on {
    constructor(e) {
        (this.computed = e),
            (this.version = 0),
            (this.activeLink = void 0),
            (this.subs = void 0),
            (this.map = void 0),
            (this.key = void 0),
            (this.sc = 0),
            (this.__v_skip = !0);
    }
    track(e) {
        if (!xe || !ot || xe === this.computed) return;
        let s = this.activeLink;
        if (s === void 0 || s.sub !== xe)
            (s = this.activeLink = new zl(xe, this)),
                xe.deps
                    ? ((s.prevDep = xe.depsTail), (xe.depsTail.nextDep = s), (xe.depsTail = s))
                    : (xe.deps = xe.depsTail = s),
                Lr(s);
        else if (s.version === -1 && ((s.version = this.version), s.nextDep)) {
            const i = s.nextDep;
            (i.prevDep = s.prevDep),
                s.prevDep && (s.prevDep.nextDep = i),
                (s.prevDep = xe.depsTail),
                (s.nextDep = void 0),
                (xe.depsTail.nextDep = s),
                (xe.depsTail = s),
                xe.deps === s && (xe.deps = i);
        }
        return s;
    }
    trigger(e) {
        this.version++, Ss++, this.notify(e);
    }
    notify(e) {
        nn();
        try {
            for (let s = this.subs; s; s = s.prevSub) s.sub.notify() && s.sub.dep.notify();
        } finally {
            rn();
        }
    }
}
function Lr(t) {
    if ((t.dep.sc++, t.sub.flags & 4)) {
        const e = t.dep.computed;
        if (e && !t.dep.subs) {
            e.flags |= 20;
            for (let i = e.deps; i; i = i.nextDep) Lr(i);
        }
        const s = t.dep.subs;
        s !== t && ((t.prevSub = s), s && (s.nextSub = t)), (t.dep.subs = t);
    }
}
const zi = new WeakMap(),
    qt = Symbol(""),
    Hi = Symbol(""),
    xs = Symbol("");
function Re(t, e, s) {
    if (ot && xe) {
        let i = zi.get(t);
        i || zi.set(t, (i = new Map()));
        let n = i.get(s);
        n || (i.set(s, (n = new on())), (n.map = i), (n.key = s)), n.track();
    }
}
function bt(t, e, s, i, n, r) {
    const a = zi.get(t);
    if (!a) {
        Ss++;
        return;
    }
    const o = (l) => {
        l && l.trigger();
    };
    if ((nn(), e === "clear")) a.forEach(o);
    else {
        const l = re(t),
            c = l && en(s);
        if (l && s === "length") {
            const d = Number(i);
            a.forEach((p, g) => {
                (g === "length" || g === xs || (!mt(g) && g >= d)) && o(p);
            });
        } else
            switch (((s !== void 0 || a.has(void 0)) && o(a.get(s)), c && o(a.get(xs)), e)) {
                case "add":
                    l ? c && o(a.get("length")) : (o(a.get(qt)), Ut(t) && o(a.get(Hi)));
                    break;
                case "delete":
                    l || (o(a.get(qt)), Ut(t) && o(a.get(Hi)));
                    break;
                case "set":
                    Ut(t) && o(a.get(qt));
                    break;
            }
    }
    rn();
}
function Wt(t) {
    const e = we(t);
    return e === t ? e : (Re(e, "iterate", xs), nt(t) ? e : e.map(De));
}
function ai(t) {
    return Re((t = we(t)), "iterate", xs), t;
}
const Hl = {
    __proto__: null,
    [Symbol.iterator]() {
        return Ti(this, Symbol.iterator, De);
    },
    concat(...t) {
        return Wt(this).concat(...t.map((e) => (re(e) ? Wt(e) : e)));
    },
    entries() {
        return Ti(this, "entries", (t) => ((t[1] = De(t[1])), t));
    },
    every(t, e) {
        return vt(this, "every", t, e, void 0, arguments);
    },
    filter(t, e) {
        return vt(this, "filter", t, e, (s) => s.map(De), arguments);
    },
    find(t, e) {
        return vt(this, "find", t, e, De, arguments);
    },
    findIndex(t, e) {
        return vt(this, "findIndex", t, e, void 0, arguments);
    },
    findLast(t, e) {
        return vt(this, "findLast", t, e, De, arguments);
    },
    findLastIndex(t, e) {
        return vt(this, "findLastIndex", t, e, void 0, arguments);
    },
    forEach(t, e) {
        return vt(this, "forEach", t, e, void 0, arguments);
    },
    includes(...t) {
        return Ci(this, "includes", t);
    },
    indexOf(...t) {
        return Ci(this, "indexOf", t);
    },
    join(t) {
        return Wt(this).join(t);
    },
    lastIndexOf(...t) {
        return Ci(this, "lastIndexOf", t);
    },
    map(t, e) {
        return vt(this, "map", t, e, void 0, arguments);
    },
    pop() {
        return as(this, "pop");
    },
    push(...t) {
        return as(this, "push", t);
    },
    reduce(t, ...e) {
        return Pn(this, "reduce", t, e);
    },
    reduceRight(t, ...e) {
        return Pn(this, "reduceRight", t, e);
    },
    shift() {
        return as(this, "shift");
    },
    some(t, e) {
        return vt(this, "some", t, e, void 0, arguments);
    },
    splice(...t) {
        return as(this, "splice", t);
    },
    toReversed() {
        return Wt(this).toReversed();
    },
    toSorted(t) {
        return Wt(this).toSorted(t);
    },
    toSpliced(...t) {
        return Wt(this).toSpliced(...t);
    },
    unshift(...t) {
        return as(this, "unshift", t);
    },
    values() {
        return Ti(this, "values", De);
    },
};
function Ti(t, e, s) {
    const i = ai(t),
        n = i[e]();
    return (
        i !== t &&
            !nt(t) &&
            ((n._next = n.next),
            (n.next = () => {
                const r = n._next();
                return r.value && (r.value = s(r.value)), r;
            })),
        n
    );
}
const Rl = Array.prototype;
function vt(t, e, s, i, n, r) {
    const a = ai(t),
        o = a !== t && !nt(t),
        l = a[e];
    if (l !== Rl[e]) {
        const p = l.apply(t, r);
        return o ? De(p) : p;
    }
    let c = s;
    a !== t &&
        (o
            ? (c = function (p, g) {
                  return s.call(this, De(p), g, t);
              })
            : s.length > 2 &&
              (c = function (p, g) {
                  return s.call(this, p, g, t);
              }));
    const d = l.call(a, c, i);
    return o && n ? n(d) : d;
}
function Pn(t, e, s, i) {
    const n = ai(t);
    let r = s;
    return (
        n !== t &&
            (nt(t)
                ? s.length > 3 &&
                  (r = function (a, o, l) {
                      return s.call(this, a, o, l, t);
                  })
                : (r = function (a, o, l) {
                      return s.call(this, a, De(o), l, t);
                  })),
        n[e](r, ...i)
    );
}
function Ci(t, e, s) {
    const i = we(t);
    Re(i, "iterate", xs);
    const n = i[e](...s);
    return (n === -1 || n === !1) && un(s[0]) ? ((s[0] = we(s[0])), i[e](...s)) : n;
}
function as(t, e, s = []) {
    Tt(), nn();
    const i = we(t)[e].apply(t, s);
    return rn(), Ct(), i;
}
const Fl = Zi("__proto__,__v_isRef,__isVue"),
    Ir = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((t) => t !== "arguments" && t !== "caller")
            .map((t) => Symbol[t])
            .filter(mt)
    );
function Bl(t) {
    mt(t) || (t = String(t));
    const e = we(this);
    return Re(e, "has", t), e.hasOwnProperty(t);
}
class Ar {
    constructor(e = !1, s = !1) {
        (this._isReadonly = e), (this._isShallow = s);
    }
    get(e, s, i) {
        if (s === "__v_skip") return e.__v_skip;
        const n = this._isReadonly,
            r = this._isShallow;
        if (s === "__v_isReactive") return !n;
        if (s === "__v_isReadonly") return n;
        if (s === "__v_isShallow") return r;
        if (s === "__v_raw")
            return i === (n ? (r ? Kl : Dr) : r ? kr : $r).get(e) ||
                Object.getPrototypeOf(e) === Object.getPrototypeOf(i)
                ? e
                : void 0;
        const a = re(e);
        if (!n) {
            let l;
            if (a && (l = Hl[s])) return l;
            if (s === "hasOwnProperty") return Bl;
        }
        const o = Reflect.get(e, s, Be(e) ? e : i);
        return (mt(s) ? Ir.has(s) : Fl(s)) || (n || Re(e, "get", s), r)
            ? o
            : Be(o)
              ? a && en(s)
                  ? o
                  : o.value
              : Te(o)
                ? n
                    ? zr(o)
                    : cn(o)
                : o;
    }
}
class Or extends Ar {
    constructor(e = !1) {
        super(!1, e);
    }
    set(e, s, i, n) {
        let r = e[s];
        if (!this._isShallow) {
            const l = Dt(r);
            if ((!nt(i) && !Dt(i) && ((r = we(r)), (i = we(i))), !re(e) && Be(r) && !Be(i)))
                return l ? !1 : ((r.value = i), !0);
        }
        const a = re(e) && en(s) ? Number(s) < e.length : ye(e, s),
            o = Reflect.set(e, s, i, Be(e) ? e : n);
        return e === we(n) && (a ? kt(i, r) && bt(e, "set", s, i) : bt(e, "add", s, i)), o;
    }
    deleteProperty(e, s) {
        const i = ye(e, s);
        e[s];
        const n = Reflect.deleteProperty(e, s);
        return n && i && bt(e, "delete", s, void 0), n;
    }
    has(e, s) {
        const i = Reflect.has(e, s);
        return (!mt(s) || !Ir.has(s)) && Re(e, "has", s), i;
    }
    ownKeys(e) {
        return Re(e, "iterate", re(e) ? "length" : qt), Reflect.ownKeys(e);
    }
}
class Vl extends Ar {
    constructor(e = !1) {
        super(!0, e);
    }
    set(e, s) {
        return !0;
    }
    deleteProperty(e, s) {
        return !0;
    }
}
const Nl = new Or(),
    ql = new Vl(),
    jl = new Or(!0);
const Ri = (t) => t,
    Ds = (t) => Reflect.getPrototypeOf(t);
function Gl(t, e, s) {
    return function (...i) {
        const n = this.__v_raw,
            r = we(n),
            a = Ut(r),
            o = t === "entries" || (t === Symbol.iterator && a),
            l = t === "keys" && a,
            c = n[t](...i),
            d = s ? Ri : e ? Xs : De;
        return (
            !e && Re(r, "iterate", l ? Hi : qt),
            {
                next() {
                    const { value: p, done: g } = c.next();
                    return g ? { value: p, done: g } : { value: o ? [d(p[0]), d(p[1])] : d(p), done: g };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function zs(t) {
    return function (...e) {
        return t === "delete" ? !1 : t === "clear" ? void 0 : this;
    };
}
function Wl(t, e) {
    const s = {
        get(n) {
            const r = this.__v_raw,
                a = we(r),
                o = we(n);
            t || (kt(n, o) && Re(a, "get", n), Re(a, "get", o));
            const { has: l } = Ds(a),
                c = e ? Ri : t ? Xs : De;
            if (l.call(a, n)) return c(r.get(n));
            if (l.call(a, o)) return c(r.get(o));
            r !== a && r.get(n);
        },
        get size() {
            const n = this.__v_raw;
            return !t && Re(we(n), "iterate", qt), Reflect.get(n, "size", n);
        },
        has(n) {
            const r = this.__v_raw,
                a = we(r),
                o = we(n);
            return t || (kt(n, o) && Re(a, "has", n), Re(a, "has", o)), n === o ? r.has(n) : r.has(n) || r.has(o);
        },
        forEach(n, r) {
            const a = this,
                o = a.__v_raw,
                l = we(o),
                c = e ? Ri : t ? Xs : De;
            return !t && Re(l, "iterate", qt), o.forEach((d, p) => n.call(r, c(d), c(p), a));
        },
    };
    return (
        Ve(
            s,
            t
                ? { add: zs("add"), set: zs("set"), delete: zs("delete"), clear: zs("clear") }
                : {
                      add(n) {
                          !e && !nt(n) && !Dt(n) && (n = we(n));
                          const r = we(this);
                          return Ds(r).has.call(r, n) || (r.add(n), bt(r, "add", n, n)), this;
                      },
                      set(n, r) {
                          !e && !nt(r) && !Dt(r) && (r = we(r));
                          const a = we(this),
                              { has: o, get: l } = Ds(a);
                          let c = o.call(a, n);
                          c || ((n = we(n)), (c = o.call(a, n)));
                          const d = l.call(a, n);
                          return a.set(n, r), c ? kt(r, d) && bt(a, "set", n, r) : bt(a, "add", n, r), this;
                      },
                      delete(n) {
                          const r = we(this),
                              { has: a, get: o } = Ds(r);
                          let l = a.call(r, n);
                          l || ((n = we(n)), (l = a.call(r, n))), o && o.call(r, n);
                          const c = r.delete(n);
                          return l && bt(r, "delete", n, void 0), c;
                      },
                      clear() {
                          const n = we(this),
                              r = n.size !== 0,
                              a = n.clear();
                          return r && bt(n, "clear", void 0, void 0), a;
                      },
                  }
        ),
        ["keys", "values", "entries", Symbol.iterator].forEach((n) => {
            s[n] = Gl(n, t, e);
        }),
        s
    );
}
function ln(t, e) {
    const s = Wl(t, e);
    return (i, n, r) =>
        n === "__v_isReactive"
            ? !t
            : n === "__v_isReadonly"
              ? t
              : n === "__v_raw"
                ? i
                : Reflect.get(ye(s, n) && n in i ? s : i, n, r);
}
const Yl = { get: ln(!1, !1) },
    Xl = { get: ln(!1, !0) },
    Ul = { get: ln(!0, !1) };
const $r = new WeakMap(),
    kr = new WeakMap(),
    Dr = new WeakMap(),
    Kl = new WeakMap();
function Zl(t) {
    switch (t) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0;
    }
}
function Jl(t) {
    return t.__v_skip || !Object.isExtensible(t) ? 0 : Zl(El(t));
}
function cn(t) {
    return Dt(t) ? t : dn(t, !1, Nl, Yl, $r);
}
function Ql(t) {
    return dn(t, !1, jl, Xl, kr);
}
function zr(t) {
    return dn(t, !0, ql, Ul, Dr);
}
function dn(t, e, s, i, n) {
    if (!Te(t) || (t.__v_raw && !(e && t.__v_isReactive))) return t;
    const r = Jl(t);
    if (r === 0) return t;
    const a = n.get(t);
    if (a) return a;
    const o = new Proxy(t, r === 2 ? i : s);
    return n.set(t, o), o;
}
function Kt(t) {
    return Dt(t) ? Kt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Dt(t) {
    return !!(t && t.__v_isReadonly);
}
function nt(t) {
    return !!(t && t.__v_isShallow);
}
function un(t) {
    return t ? !!t.__v_raw : !1;
}
function we(t) {
    const e = t && t.__v_raw;
    return e ? we(e) : t;
}
function ec(t) {
    return !ye(t, "__v_skip") && Object.isExtensible(t) && ki(t, "__v_skip", !0), t;
}
const De = (t) => (Te(t) ? cn(t) : t),
    Xs = (t) => (Te(t) ? zr(t) : t);
function Be(t) {
    return t ? t.__v_isRef === !0 : !1;
}
function le(t) {
    return tc(t, !1);
}
function tc(t, e) {
    return Be(t) ? t : new sc(t, e);
}
class sc {
    constructor(e, s) {
        (this.dep = new on()),
            (this.__v_isRef = !0),
            (this.__v_isShallow = !1),
            (this._rawValue = s ? e : we(e)),
            (this._value = s ? e : De(e)),
            (this.__v_isShallow = s);
    }
    get value() {
        return this.dep.track(), this._value;
    }
    set value(e) {
        const s = this._rawValue,
            i = this.__v_isShallow || nt(e) || Dt(e);
        (e = i ? e : we(e)), kt(e, s) && ((this._rawValue = e), (this._value = i ? e : De(e)), this.dep.trigger());
    }
}
function tt(t) {
    return Be(t) ? t.value : t;
}
const ic = {
    get: (t, e, s) => (e === "__v_raw" ? t : tt(Reflect.get(t, e, s))),
    set: (t, e, s, i) => {
        const n = t[e];
        return Be(n) && !Be(s) ? ((n.value = s), !0) : Reflect.set(t, e, s, i);
    },
};
function Hr(t) {
    return Kt(t) ? t : new Proxy(t, ic);
}
class nc {
    constructor(e, s, i) {
        (this.fn = e),
            (this.setter = s),
            (this._value = void 0),
            (this.dep = new on(this)),
            (this.__v_isRef = !0),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 16),
            (this.globalVersion = Ss - 1),
            (this.next = void 0),
            (this.effect = this),
            (this.__v_isReadonly = !s),
            (this.isSSR = i);
    }
    notify() {
        if (((this.flags |= 16), !(this.flags & 8) && xe !== this)) return Tr(this, !0), !0;
    }
    get value() {
        const e = this.dep.track();
        return Mr(this), e && (e.version = this.dep.version), this._value;
    }
    set value(e) {
        this.setter && this.setter(e);
    }
}
function rc(t, e, s = !1) {
    let i, n;
    return de(t) ? (i = t) : ((i = t.get), (n = t.set)), new nc(i, n, s);
}
const Hs = {},
    Us = new WeakMap();
let Bt;
function ac(t, e = !1, s = Bt) {
    if (s) {
        let i = Us.get(s);
        i || Us.set(s, (i = [])), i.push(t);
    }
}
function oc(t, e, s = Se) {
    const { immediate: i, deep: n, once: r, scheduler: a, augmentJob: o, call: l } = s,
        c = (y) => (n ? y : nt(y) || n === !1 || n === 0 ? St(y, 1) : St(y));
    let d,
        p,
        g,
        m,
        u = !1,
        f = !1;
    if (
        (Be(t)
            ? ((p = () => t.value), (u = nt(t)))
            : Kt(t)
              ? ((p = () => c(t)), (u = !0))
              : re(t)
                ? ((f = !0),
                  (u = t.some((y) => Kt(y) || nt(y))),
                  (p = () =>
                      t.map((y) => {
                          if (Be(y)) return y.value;
                          if (Kt(y)) return c(y);
                          if (de(y)) return l ? l(y, 2) : y();
                      })))
                : de(t)
                  ? e
                      ? (p = l ? () => l(t, 2) : t)
                      : (p = () => {
                            if (g) {
                                Tt();
                                try {
                                    g();
                                } finally {
                                    Ct();
                                }
                            }
                            const y = Bt;
                            Bt = d;
                            try {
                                return l ? l(t, 3, [m]) : t(m);
                            } finally {
                                Bt = y;
                            }
                        })
                  : (p = pt),
        e && n)
    ) {
        const y = p,
            E = n === !0 ? 1 / 0 : n;
        p = () => St(y(), E);
    }
    const w = kl(),
        b = () => {
            d.stop(), w && w.active && Qi(w.effects, d);
        };
    if (r && e) {
        const y = e;
        e = (...E) => {
            y(...E), b();
        };
    }
    let h = f ? new Array(t.length).fill(Hs) : Hs;
    const v = (y) => {
        if (!(!(d.flags & 1) || (!d.dirty && !y)))
            if (e) {
                const E = d.run();
                if (n || u || (f ? E.some((L, P) => kt(L, h[P])) : kt(E, h))) {
                    g && g();
                    const L = Bt;
                    Bt = d;
                    try {
                        const P = [E, h === Hs ? void 0 : f && h[0] === Hs ? [] : h, m];
                        (h = E), l ? l(e, 3, P) : e(...P);
                    } finally {
                        Bt = L;
                    }
                }
            } else d.run();
    };
    return (
        o && o(v),
        (d = new xr(p)),
        (d.scheduler = a ? () => a(v, !1) : v),
        (m = (y) => ac(y, !1, d)),
        (g = d.onStop =
            () => {
                const y = Us.get(d);
                if (y) {
                    if (l) l(y, 4);
                    else for (const E of y) E();
                    Us.delete(d);
                }
            }),
        e ? (i ? v(!0) : (h = d.run())) : a ? a(v.bind(null, !0), !0) : d.run(),
        (b.pause = d.pause.bind(d)),
        (b.resume = d.resume.bind(d)),
        (b.stop = b),
        b
    );
}
function St(t, e = 1 / 0, s) {
    if (e <= 0 || !Te(t) || t.__v_skip || ((s = s || new Set()), s.has(t))) return t;
    if ((s.add(t), e--, Be(t))) St(t.value, e, s);
    else if (re(t)) for (let i = 0; i < t.length; i++) St(t[i], e, s);
    else if (rs(t) || Ut(t))
        t.forEach((i) => {
            St(i, e, s);
        });
    else if (wr(t)) {
        for (const i in t) St(t[i], e, s);
        for (const i of Object.getOwnPropertySymbols(t))
            Object.prototype.propertyIsEnumerable.call(t, i) && St(t[i], e, s);
    }
    return t;
}
/**
 * @vue/runtime-core v3.5.17
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function As(t, e, s, i) {
    try {
        return i ? t(...i) : t();
    } catch (n) {
        oi(n, e, s);
    }
}
function ht(t, e, s, i) {
    if (de(t)) {
        const n = As(t, e, s, i);
        return (
            n &&
                gr(n) &&
                n.catch((r) => {
                    oi(r, e, s);
                }),
            n
        );
    }
    if (re(t)) {
        const n = [];
        for (let r = 0; r < t.length; r++) n.push(ht(t[r], e, s, i));
        return n;
    }
}
function oi(t, e, s, i = !0) {
    const n = e ? e.vnode : null,
        { errorHandler: r, throwUnhandledErrorInProduction: a } = (e && e.appContext.config) || Se;
    if (e) {
        let o = e.parent;
        const l = e.proxy,
            c = `https://vuejs.org/error-reference/#runtime-${s}`;
        for (; o; ) {
            const d = o.ec;
            if (d) {
                for (let p = 0; p < d.length; p++) if (d[p](t, l, c) === !1) return;
            }
            o = o.parent;
        }
        if (r) {
            Tt(), As(r, null, 10, [t, l, c]), Ct();
            return;
        }
    }
    lc(t, s, n, i, a);
}
function lc(t, e, s, i = !0, n = !1) {
    if (n) throw t;
    console.error(t);
}
const Ge = [];
let ut = -1;
const Zt = [];
let Lt = null,
    Yt = 0;
const Rr = Promise.resolve();
let Ks = null;
function Fr(t) {
    const e = Ks || Rr;
    return t ? e.then(this ? t.bind(this) : t) : e;
}
function cc(t) {
    let e = ut + 1,
        s = Ge.length;
    for (; e < s; ) {
        const i = (e + s) >>> 1,
            n = Ge[i],
            r = Es(n);
        r < t || (r === t && n.flags & 2) ? (e = i + 1) : (s = i);
    }
    return e;
}
function fn(t) {
    if (!(t.flags & 1)) {
        const e = Es(t),
            s = Ge[Ge.length - 1];
        !s || (!(t.flags & 2) && e >= Es(s)) ? Ge.push(t) : Ge.splice(cc(e), 0, t), (t.flags |= 1), Br();
    }
}
function Br() {
    Ks || (Ks = Rr.then(Nr));
}
function dc(t) {
    re(t) ? Zt.push(...t) : Lt && t.id === -1 ? Lt.splice(Yt + 1, 0, t) : t.flags & 1 || (Zt.push(t), (t.flags |= 1)),
        Br();
}
function Ln(t, e, s = ut + 1) {
    for (; s < Ge.length; s++) {
        const i = Ge[s];
        if (i && i.flags & 2) {
            if (t && i.id !== t.uid) continue;
            Ge.splice(s, 1), s--, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
        }
    }
}
function Vr(t) {
    if (Zt.length) {
        const e = [...new Set(Zt)].sort((s, i) => Es(s) - Es(i));
        if (((Zt.length = 0), Lt)) {
            Lt.push(...e);
            return;
        }
        for (Lt = e, Yt = 0; Yt < Lt.length; Yt++) {
            const s = Lt[Yt];
            s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), (s.flags &= -2);
        }
        (Lt = null), (Yt = 0);
    }
}
const Es = (t) => (t.id == null ? (t.flags & 2 ? -1 : 1 / 0) : t.id);
function Nr(t) {
    try {
        for (ut = 0; ut < Ge.length; ut++) {
            const e = Ge[ut];
            e &&
                !(e.flags & 8) &&
                (e.flags & 4 && (e.flags &= -2), As(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
        }
    } finally {
        for (; ut < Ge.length; ut++) {
            const e = Ge[ut];
            e && (e.flags &= -2);
        }
        (ut = -1), (Ge.length = 0), Vr(), (Ks = null), (Ge.length || Zt.length) && Nr();
    }
}
let Je = null,
    qr = null;
function Zs(t) {
    const e = Je;
    return (Je = t), (qr = (t && t.type.__scopeId) || null), e;
}
function jr(t, e = Je, s) {
    if (!e || t._n) return t;
    const i = (...n) => {
        i._d && Fn(-1);
        const r = Zs(e);
        let a;
        try {
            a = t(...n);
        } finally {
            Zs(r), i._d && Fn(1);
        }
        return a;
    };
    return (i._n = !0), (i._c = !0), (i._d = !0), i;
}
function Fi(t, e) {
    if (Je === null) return t;
    const s = fi(Je),
        i = t.dirs || (t.dirs = []);
    for (let n = 0; n < e.length; n++) {
        let [r, a, o, l = Se] = e[n];
        r &&
            (de(r) && (r = { mounted: r, updated: r }),
            r.deep && St(a),
            i.push({ dir: r, instance: s, value: a, oldValue: void 0, arg: o, modifiers: l }));
    }
    return t;
}
function Rt(t, e, s, i) {
    const n = t.dirs,
        r = e && e.dirs;
    for (let a = 0; a < n.length; a++) {
        const o = n[a];
        r && (o.oldValue = r[a].value);
        let l = o.dir[i];
        l && (Tt(), ht(l, s, 8, [t.el, o, t, e]), Ct());
    }
}
const uc = Symbol("_vte"),
    fc = (t) => t.__isTeleport;
function pn(t, e) {
    t.shapeFlag & 6 && t.component
        ? ((t.transition = e), pn(t.component.subTree, e))
        : t.shapeFlag & 128
          ? ((t.ssContent.transition = e.clone(t.ssContent)), (t.ssFallback.transition = e.clone(t.ssFallback)))
          : (t.transition = e);
}
/*! #__NO_SIDE_EFFECTS__ */ function pc(t, e) {
    return de(t) ? Ve({ name: t.name }, e, { setup: t }) : t;
}
function Gr(t) {
    t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function hs(t, e, s, i, n = !1) {
    if (re(t)) {
        t.forEach((u, f) => hs(u, e && (re(e) ? e[f] : e), s, i, n));
        return;
    }
    if (gs(i) && !n) {
        i.shapeFlag & 512 &&
            i.type.__asyncResolved &&
            i.component.subTree.component &&
            hs(t, e, s, i.component.subTree);
        return;
    }
    const r = i.shapeFlag & 4 ? fi(i.component) : i.el,
        a = n ? null : r,
        { i: o, r: l } = t,
        c = e && e.r,
        d = o.refs === Se ? (o.refs = {}) : o.refs,
        p = o.setupState,
        g = we(p),
        m = p === Se ? () => !1 : (u) => ye(g, u);
    if ((c != null && c !== l && (Le(c) ? ((d[c] = null), m(c) && (p[c] = null)) : Be(c) && (c.value = null)), de(l)))
        As(l, o, 12, [a, d]);
    else {
        const u = Le(l),
            f = Be(l);
        if (u || f) {
            const w = () => {
                if (t.f) {
                    const b = u ? (m(l) ? p[l] : d[l]) : l.value;
                    n
                        ? re(b) && Qi(b, r)
                        : re(b)
                          ? b.includes(r) || b.push(r)
                          : u
                            ? ((d[l] = [r]), m(l) && (p[l] = d[l]))
                            : ((l.value = [r]), t.k && (d[t.k] = l.value));
                } else u ? ((d[l] = a), m(l) && (p[l] = a)) : f && ((l.value = a), t.k && (d[t.k] = a));
            };
            a ? ((w.id = -1), Ue(w, s)) : w();
        }
    }
}
ri().requestIdleCallback;
ri().cancelIdleCallback;
const gs = (t) => !!t.type.__asyncLoader,
    Wr = (t) => t.type.__isKeepAlive;
function mc(t, e) {
    Yr(t, "a", e);
}
function hc(t, e) {
    Yr(t, "da", e);
}
function Yr(t, e, s = Fe) {
    const i =
        t.__wdc ||
        (t.__wdc = () => {
            let n = s;
            for (; n; ) {
                if (n.isDeactivated) return;
                n = n.parent;
            }
            return t();
        });
    if ((li(e, i, s), s)) {
        let n = s.parent;
        for (; n && n.parent; ) Wr(n.parent.vnode) && gc(i, e, s, n), (n = n.parent);
    }
}
function gc(t, e, s, i) {
    const n = li(e, t, i, !0);
    Xr(() => {
        Qi(i[e], n);
    }, s);
}
function li(t, e, s = Fe, i = !1) {
    if (s) {
        const n = s[t] || (s[t] = []),
            r =
                e.__weh ||
                (e.__weh = (...a) => {
                    Tt();
                    const o = Os(s),
                        l = ht(e, s, t, a);
                    return o(), Ct(), l;
                });
        return i ? n.unshift(r) : n.push(r), r;
    }
}
const _t =
        (t) =>
        (e, s = Fe) => {
            (!_s || t === "sp") && li(t, (...i) => e(...i), s);
        },
    vc = _t("bm"),
    ci = _t("m"),
    wc = _t("bu"),
    yc = _t("u"),
    bc = _t("bum"),
    Xr = _t("um"),
    Sc = _t("sp"),
    xc = _t("rtg"),
    Ec = _t("rtc");
function Tc(t, e = Fe) {
    li("ec", t, e);
}
const Cc = "components";
function _c(t, e) {
    return Pc(Cc, t, !0, e) || t;
}
const Mc = Symbol.for("v-ndc");
function Pc(t, e, s = !0, i = !1) {
    const n = Je || Fe;
    if (n) {
        const r = n.type;
        {
            const o = gd(r, !1);
            if (o && (o === e || o === rt(e) || o === ni(rt(e)))) return r;
        }
        const a = In(n[t] || r[t], e) || In(n.appContext[t], e);
        return !a && i ? r : a;
    }
}
function In(t, e) {
    return t && (t[e] || t[rt(e)] || t[ni(rt(e))]);
}
function $t(t, e, s, i) {
    let n;
    const r = s,
        a = re(t);
    if (a || Le(t)) {
        const o = a && Kt(t);
        let l = !1,
            c = !1;
        o && ((l = !nt(t)), (c = Dt(t)), (t = ai(t))), (n = new Array(t.length));
        for (let d = 0, p = t.length; d < p; d++) n[d] = e(l ? (c ? Xs(De(t[d])) : De(t[d])) : t[d], d, void 0, r);
    } else if (typeof t == "number") {
        n = new Array(t);
        for (let o = 0; o < t; o++) n[o] = e(o + 1, o, void 0, r);
    } else if (Te(t))
        if (t[Symbol.iterator]) n = Array.from(t, (o, l) => e(o, l, void 0, r));
        else {
            const o = Object.keys(t);
            n = new Array(o.length);
            for (let l = 0, c = o.length; l < c; l++) {
                const d = o[l];
                n[l] = e(t[d], d, l, r);
            }
        }
    else n = [];
    return n;
}
const Bi = (t) => (t ? (ha(t) ? fi(t) : Bi(t.parent)) : null),
    vs = Ve(Object.create(null), {
        $: (t) => t,
        $el: (t) => t.vnode.el,
        $data: (t) => t.data,
        $props: (t) => t.props,
        $attrs: (t) => t.attrs,
        $slots: (t) => t.slots,
        $refs: (t) => t.refs,
        $parent: (t) => Bi(t.parent),
        $root: (t) => Bi(t.root),
        $host: (t) => t.ce,
        $emit: (t) => t.emit,
        $options: (t) => Kr(t),
        $forceUpdate: (t) =>
            t.f ||
            (t.f = () => {
                fn(t.update);
            }),
        $nextTick: (t) => t.n || (t.n = Fr.bind(t.proxy)),
        $watch: (t) => Kc.bind(t),
    }),
    _i = (t, e) => t !== Se && !t.__isScriptSetup && ye(t, e),
    Lc = {
        get({ _: t }, e) {
            if (e === "__v_skip") return !0;
            const { ctx: s, setupState: i, data: n, props: r, accessCache: a, type: o, appContext: l } = t;
            let c;
            if (e[0] !== "$") {
                const m = a[e];
                if (m !== void 0)
                    switch (m) {
                        case 1:
                            return i[e];
                        case 2:
                            return n[e];
                        case 4:
                            return s[e];
                        case 3:
                            return r[e];
                    }
                else {
                    if (_i(i, e)) return (a[e] = 1), i[e];
                    if (n !== Se && ye(n, e)) return (a[e] = 2), n[e];
                    if ((c = t.propsOptions[0]) && ye(c, e)) return (a[e] = 3), r[e];
                    if (s !== Se && ye(s, e)) return (a[e] = 4), s[e];
                    Vi && (a[e] = 0);
                }
            }
            const d = vs[e];
            let p, g;
            if (d) return e === "$attrs" && Re(t.attrs, "get", ""), d(t);
            if ((p = o.__cssModules) && (p = p[e])) return p;
            if (s !== Se && ye(s, e)) return (a[e] = 4), s[e];
            if (((g = l.config.globalProperties), ye(g, e))) return g[e];
        },
        set({ _: t }, e, s) {
            const { data: i, setupState: n, ctx: r } = t;
            return _i(n, e)
                ? ((n[e] = s), !0)
                : i !== Se && ye(i, e)
                  ? ((i[e] = s), !0)
                  : ye(t.props, e) || (e[0] === "$" && e.slice(1) in t)
                    ? !1
                    : ((r[e] = s), !0);
        },
        has({ _: { data: t, setupState: e, accessCache: s, ctx: i, appContext: n, propsOptions: r } }, a) {
            let o;
            return (
                !!s[a] ||
                (t !== Se && ye(t, a)) ||
                _i(e, a) ||
                ((o = r[0]) && ye(o, a)) ||
                ye(i, a) ||
                ye(vs, a) ||
                ye(n.config.globalProperties, a)
            );
        },
        defineProperty(t, e, s) {
            return (
                s.get != null ? (t._.accessCache[e] = 0) : ye(s, "value") && this.set(t, e, s.value, null),
                Reflect.defineProperty(t, e, s)
            );
        },
    };
function An(t) {
    return re(t) ? t.reduce((e, s) => ((e[s] = null), e), {}) : t;
}
let Vi = !0;
function Ic(t) {
    const e = Kr(t),
        s = t.proxy,
        i = t.ctx;
    (Vi = !1), e.beforeCreate && On(e.beforeCreate, t, "bc");
    const {
        data: n,
        computed: r,
        methods: a,
        watch: o,
        provide: l,
        inject: c,
        created: d,
        beforeMount: p,
        mounted: g,
        beforeUpdate: m,
        updated: u,
        activated: f,
        deactivated: w,
        beforeDestroy: b,
        beforeUnmount: h,
        destroyed: v,
        unmounted: y,
        render: E,
        renderTracked: L,
        renderTriggered: P,
        errorCaptured: A,
        serverPrefetch: _,
        expose: M,
        inheritAttrs: k,
        components: O,
        directives: $,
        filters: D,
    } = e;
    if ((c && Ac(c, i, null), a))
        for (const T in a) {
            const C = a[T];
            de(C) && (i[T] = C.bind(s));
        }
    if (n) {
        const T = n.call(s, s);
        Te(T) && (t.data = cn(T));
    }
    if (((Vi = !0), r))
        for (const T in r) {
            const C = r[T],
                G = de(C) ? C.bind(s, s) : de(C.get) ? C.get.bind(s, s) : pt,
                ae = !de(C) && de(C.set) ? C.set.bind(s) : pt,
                me = st({ get: G, set: ae });
            Object.defineProperty(i, T, {
                enumerable: !0,
                configurable: !0,
                get: () => me.value,
                set: (ge) => (me.value = ge),
            });
        }
    if (o) for (const T in o) Ur(o[T], i, s, T);
    if (l) {
        const T = de(l) ? l.call(s) : l;
        Reflect.ownKeys(T).forEach((C) => {
            Hc(C, T[C]);
        });
    }
    d && On(d, t, "c");
    function H(T, C) {
        re(C) ? C.forEach((G) => T(G.bind(s))) : C && T(C.bind(s));
    }
    if (
        (H(vc, p),
        H(ci, g),
        H(wc, m),
        H(yc, u),
        H(mc, f),
        H(hc, w),
        H(Tc, A),
        H(Ec, L),
        H(xc, P),
        H(bc, h),
        H(Xr, y),
        H(Sc, _),
        re(M))
    )
        if (M.length) {
            const T = t.exposed || (t.exposed = {});
            M.forEach((C) => {
                Object.defineProperty(T, C, { get: () => s[C], set: (G) => (s[C] = G) });
            });
        } else t.exposed || (t.exposed = {});
    E && t.render === pt && (t.render = E),
        k != null && (t.inheritAttrs = k),
        O && (t.components = O),
        $ && (t.directives = $),
        _ && Gr(t);
}
function Ac(t, e, s = pt) {
    re(t) && (t = Ni(t));
    for (const i in t) {
        const n = t[i];
        let r;
        Te(n) ? ("default" in n ? (r = Bs(n.from || i, n.default, !0)) : (r = Bs(n.from || i))) : (r = Bs(n)),
            Be(r)
                ? Object.defineProperty(e, i, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => r.value,
                      set: (a) => (r.value = a),
                  })
                : (e[i] = r);
    }
}
function On(t, e, s) {
    ht(re(t) ? t.map((i) => i.bind(e.proxy)) : t.bind(e.proxy), e, s);
}
function Ur(t, e, s, i) {
    let n = i.includes(".") ? ca(s, i) : () => s[i];
    if (Le(t)) {
        const r = e[t];
        de(r) && ws(n, r);
    } else if (de(t)) ws(n, t.bind(s));
    else if (Te(t))
        if (re(t)) t.forEach((r) => Ur(r, e, s, i));
        else {
            const r = de(t.handler) ? t.handler.bind(s) : e[t.handler];
            de(r) && ws(n, r, t);
        }
}
function Kr(t) {
    const e = t.type,
        { mixins: s, extends: i } = e,
        {
            mixins: n,
            optionsCache: r,
            config: { optionMergeStrategies: a },
        } = t.appContext,
        o = r.get(e);
    let l;
    return (
        o
            ? (l = o)
            : !n.length && !s && !i
              ? (l = e)
              : ((l = {}), n.length && n.forEach((c) => Js(l, c, a, !0)), Js(l, e, a)),
        Te(e) && r.set(e, l),
        l
    );
}
function Js(t, e, s, i = !1) {
    const { mixins: n, extends: r } = e;
    r && Js(t, r, s, !0), n && n.forEach((a) => Js(t, a, s, !0));
    for (const a in e)
        if (!(i && a === "expose")) {
            const o = Oc[a] || (s && s[a]);
            t[a] = o ? o(t[a], e[a]) : e[a];
        }
    return t;
}
const Oc = {
    data: $n,
    props: kn,
    emits: kn,
    methods: ds,
    computed: ds,
    beforeCreate: je,
    created: je,
    beforeMount: je,
    mounted: je,
    beforeUpdate: je,
    updated: je,
    beforeDestroy: je,
    beforeUnmount: je,
    destroyed: je,
    unmounted: je,
    activated: je,
    deactivated: je,
    errorCaptured: je,
    serverPrefetch: je,
    components: ds,
    directives: ds,
    watch: kc,
    provide: $n,
    inject: $c,
};
function $n(t, e) {
    return e
        ? t
            ? function () {
                  return Ve(de(t) ? t.call(this, this) : t, de(e) ? e.call(this, this) : e);
              }
            : e
        : t;
}
function $c(t, e) {
    return ds(Ni(t), Ni(e));
}
function Ni(t) {
    if (re(t)) {
        const e = {};
        for (let s = 0; s < t.length; s++) e[t[s]] = t[s];
        return e;
    }
    return t;
}
function je(t, e) {
    return t ? [...new Set([].concat(t, e))] : e;
}
function ds(t, e) {
    return t ? Ve(Object.create(null), t, e) : e;
}
function kn(t, e) {
    return t ? (re(t) && re(e) ? [...new Set([...t, ...e])] : Ve(Object.create(null), An(t), An(e ?? {}))) : e;
}
function kc(t, e) {
    if (!t) return e;
    if (!e) return t;
    const s = Ve(Object.create(null), t);
    for (const i in e) s[i] = je(t[i], e[i]);
    return s;
}
function Zr() {
    return {
        app: null,
        config: {
            isNativeTag: Sl,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {},
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    };
}
let Dc = 0;
function zc(t, e) {
    return function (i, n = null) {
        de(i) || (i = Ve({}, i)), n != null && !Te(n) && (n = null);
        const r = Zr(),
            a = new WeakSet(),
            o = [];
        let l = !1;
        const c = (r.app = {
            _uid: Dc++,
            _component: i,
            _props: n,
            _container: null,
            _context: r,
            _instance: null,
            version: wd,
            get config() {
                return r.config;
            },
            set config(d) {},
            use(d, ...p) {
                return (
                    a.has(d) || (d && de(d.install) ? (a.add(d), d.install(c, ...p)) : de(d) && (a.add(d), d(c, ...p))),
                    c
                );
            },
            mixin(d) {
                return r.mixins.includes(d) || r.mixins.push(d), c;
            },
            component(d, p) {
                return p ? ((r.components[d] = p), c) : r.components[d];
            },
            directive(d, p) {
                return p ? ((r.directives[d] = p), c) : r.directives[d];
            },
            mount(d, p, g) {
                if (!l) {
                    const m = c._ceVNode || Pe(i, n);
                    return (
                        (m.appContext = r),
                        g === !0 ? (g = "svg") : g === !1 && (g = void 0),
                        t(m, d, g),
                        (l = !0),
                        (c._container = d),
                        (d.__vue_app__ = c),
                        fi(m.component)
                    );
                }
            },
            onUnmount(d) {
                o.push(d);
            },
            unmount() {
                l && (ht(o, c._instance, 16), t(null, c._container), delete c._container.__vue_app__);
            },
            provide(d, p) {
                return (r.provides[d] = p), c;
            },
            runWithContext(d) {
                const p = Jt;
                Jt = c;
                try {
                    return d();
                } finally {
                    Jt = p;
                }
            },
        });
        return c;
    };
}
let Jt = null;
function Hc(t, e) {
    if (Fe) {
        let s = Fe.provides;
        const i = Fe.parent && Fe.parent.provides;
        i === s && (s = Fe.provides = Object.create(i)), (s[t] = e);
    }
}
function Bs(t, e, s = !1) {
    const i = Fe || Je;
    if (i || Jt) {
        let n = Jt
            ? Jt._context.provides
            : i
              ? i.parent == null || i.ce
                  ? i.vnode.appContext && i.vnode.appContext.provides
                  : i.parent.provides
              : void 0;
        if (n && t in n) return n[t];
        if (arguments.length > 1) return s && de(e) ? e.call(i && i.proxy) : e;
    }
}
const Jr = {},
    Qr = () => Object.create(Jr),
    ea = (t) => Object.getPrototypeOf(t) === Jr;
function Rc(t, e, s, i = !1) {
    const n = {},
        r = Qr();
    (t.propsDefaults = Object.create(null)), ta(t, e, n, r);
    for (const a in t.propsOptions[0]) a in n || (n[a] = void 0);
    s ? (t.props = i ? n : Ql(n)) : t.type.props ? (t.props = n) : (t.props = r), (t.attrs = r);
}
function Fc(t, e, s, i) {
    const {
            props: n,
            attrs: r,
            vnode: { patchFlag: a },
        } = t,
        o = we(n),
        [l] = t.propsOptions;
    let c = !1;
    if ((i || a > 0) && !(a & 16)) {
        if (a & 8) {
            const d = t.vnode.dynamicProps;
            for (let p = 0; p < d.length; p++) {
                let g = d[p];
                if (di(t.emitsOptions, g)) continue;
                const m = e[g];
                if (l)
                    if (ye(r, g)) m !== r[g] && ((r[g] = m), (c = !0));
                    else {
                        const u = rt(g);
                        n[u] = qi(l, o, u, m, t, !1);
                    }
                else m !== r[g] && ((r[g] = m), (c = !0));
            }
        }
    } else {
        ta(t, e, n, r) && (c = !0);
        let d;
        for (const p in o)
            (!e || (!ye(e, p) && ((d = Gt(p)) === p || !ye(e, d)))) &&
                (l ? s && (s[p] !== void 0 || s[d] !== void 0) && (n[p] = qi(l, o, p, void 0, t, !0)) : delete n[p]);
        if (r !== o) for (const p in r) (!e || !ye(e, p)) && (delete r[p], (c = !0));
    }
    c && bt(t.attrs, "set", "");
}
function ta(t, e, s, i) {
    const [n, r] = t.propsOptions;
    let a = !1,
        o;
    if (e)
        for (let l in e) {
            if (fs(l)) continue;
            const c = e[l];
            let d;
            n && ye(n, (d = rt(l)))
                ? !r || !r.includes(d)
                    ? (s[d] = c)
                    : ((o || (o = {}))[d] = c)
                : di(t.emitsOptions, l) || ((!(l in i) || c !== i[l]) && ((i[l] = c), (a = !0)));
        }
    if (r) {
        const l = we(s),
            c = o || Se;
        for (let d = 0; d < r.length; d++) {
            const p = r[d];
            s[p] = qi(n, l, p, c[p], t, !ye(c, p));
        }
    }
    return a;
}
function qi(t, e, s, i, n, r) {
    const a = t[s];
    if (a != null) {
        const o = ye(a, "default");
        if (o && i === void 0) {
            const l = a.default;
            if (a.type !== Function && !a.skipFactory && de(l)) {
                const { propsDefaults: c } = n;
                if (s in c) i = c[s];
                else {
                    const d = Os(n);
                    (i = c[s] = l.call(null, e)), d();
                }
            } else i = l;
            n.ce && n.ce._setProp(s, i);
        }
        a[0] && (r && !o ? (i = !1) : a[1] && (i === "" || i === Gt(s)) && (i = !0));
    }
    return i;
}
const Bc = new WeakMap();
function sa(t, e, s = !1) {
    const i = s ? Bc : e.propsCache,
        n = i.get(t);
    if (n) return n;
    const r = t.props,
        a = {},
        o = [];
    let l = !1;
    if (!de(t)) {
        const d = (p) => {
            l = !0;
            const [g, m] = sa(p, e, !0);
            Ve(a, g), m && o.push(...m);
        };
        !s && e.mixins.length && e.mixins.forEach(d), t.extends && d(t.extends), t.mixins && t.mixins.forEach(d);
    }
    if (!r && !l) return Te(t) && i.set(t, Xt), Xt;
    if (re(r))
        for (let d = 0; d < r.length; d++) {
            const p = rt(r[d]);
            Dn(p) && (a[p] = Se);
        }
    else if (r)
        for (const d in r) {
            const p = rt(d);
            if (Dn(p)) {
                const g = r[d],
                    m = (a[p] = re(g) || de(g) ? { type: g } : Ve({}, g)),
                    u = m.type;
                let f = !1,
                    w = !0;
                if (re(u))
                    for (let b = 0; b < u.length; ++b) {
                        const h = u[b],
                            v = de(h) && h.name;
                        if (v === "Boolean") {
                            f = !0;
                            break;
                        } else v === "String" && (w = !1);
                    }
                else f = de(u) && u.name === "Boolean";
                (m[0] = f), (m[1] = w), (f || ye(m, "default")) && o.push(p);
            }
        }
    const c = [a, o];
    return Te(t) && i.set(t, c), c;
}
function Dn(t) {
    return t[0] !== "$" && !fs(t);
}
const mn = (t) => t[0] === "_" || t === "$stable",
    hn = (t) => (re(t) ? t.map(ft) : [ft(t)]),
    Vc = (t, e, s) => {
        if (e._n) return e;
        const i = jr((...n) => hn(e(...n)), s);
        return (i._c = !1), i;
    },
    ia = (t, e, s) => {
        const i = t._ctx;
        for (const n in t) {
            if (mn(n)) continue;
            const r = t[n];
            if (de(r)) e[n] = Vc(n, r, i);
            else if (r != null) {
                const a = hn(r);
                e[n] = () => a;
            }
        }
    },
    na = (t, e) => {
        const s = hn(e);
        t.slots.default = () => s;
    },
    ra = (t, e, s) => {
        for (const i in e) (s || !mn(i)) && (t[i] = e[i]);
    },
    Nc = (t, e, s) => {
        const i = (t.slots = Qr());
        if (t.vnode.shapeFlag & 32) {
            const n = e.__;
            n && ki(i, "__", n, !0);
            const r = e._;
            r ? (ra(i, e, s), s && ki(i, "_", r, !0)) : ia(e, i);
        } else e && na(t, e);
    },
    qc = (t, e, s) => {
        const { vnode: i, slots: n } = t;
        let r = !0,
            a = Se;
        if (i.shapeFlag & 32) {
            const o = e._;
            o ? (s && o === 1 ? (r = !1) : ra(n, e, s)) : ((r = !e.$stable), ia(e, n)), (a = e);
        } else e && (na(t, e), (a = { default: 1 }));
        if (r) for (const o in n) !mn(o) && a[o] == null && delete n[o];
    },
    Ue = id;
function jc(t) {
    return Gc(t);
}
function Gc(t, e) {
    const s = ri();
    s.__VUE__ = !0;
    const {
            insert: i,
            remove: n,
            patchProp: r,
            createElement: a,
            createText: o,
            createComment: l,
            setText: c,
            setElementText: d,
            parentNode: p,
            nextSibling: g,
            setScopeId: m = pt,
            insertStaticContent: u,
        } = t,
        f = (S, x, I, B = null, F = null, V = null, Z = void 0, X = null, Y = !!x.dynamicChildren) => {
            if (S === x) return;
            S && !os(S, x) && ((B = N(S)), ge(S, F, V, !0), (S = null)),
                x.patchFlag === -2 && ((Y = !1), (x.dynamicChildren = null));
            const { type: j, ref: te, shapeFlag: U } = x;
            switch (j) {
                case ui:
                    w(S, x, I, B);
                    break;
                case zt:
                    b(S, x, I, B);
                    break;
                case Vs:
                    S == null && h(x, I, B, Z);
                    break;
                case Oe:
                    O(S, x, I, B, F, V, Z, X, Y);
                    break;
                default:
                    U & 1
                        ? E(S, x, I, B, F, V, Z, X, Y)
                        : U & 6
                          ? $(S, x, I, B, F, V, Z, X, Y)
                          : (U & 64 || U & 128) && j.process(S, x, I, B, F, V, Z, X, Y, He);
            }
            te != null && F
                ? hs(te, S && S.ref, V, x || S, !x)
                : te == null && S && S.ref != null && hs(S.ref, null, V, S, !0);
        },
        w = (S, x, I, B) => {
            if (S == null) i((x.el = o(x.children)), I, B);
            else {
                const F = (x.el = S.el);
                x.children !== S.children && c(F, x.children);
            }
        },
        b = (S, x, I, B) => {
            S == null ? i((x.el = l(x.children || "")), I, B) : (x.el = S.el);
        },
        h = (S, x, I, B) => {
            [S.el, S.anchor] = u(S.children, x, I, B, S.el, S.anchor);
        },
        v = ({ el: S, anchor: x }, I, B) => {
            let F;
            for (; S && S !== x; ) (F = g(S)), i(S, I, B), (S = F);
            i(x, I, B);
        },
        y = ({ el: S, anchor: x }) => {
            let I;
            for (; S && S !== x; ) (I = g(S)), n(S), (S = I);
            n(x);
        },
        E = (S, x, I, B, F, V, Z, X, Y) => {
            x.type === "svg" ? (Z = "svg") : x.type === "math" && (Z = "mathml"),
                S == null ? L(x, I, B, F, V, Z, X, Y) : _(S, x, F, V, Z, X, Y);
        },
        L = (S, x, I, B, F, V, Z, X) => {
            let Y, j;
            const { props: te, shapeFlag: U, transition: se, dirs: ne } = S;
            if (
                ((Y = S.el = a(S.type, V, te && te.is, te)),
                U & 8 ? d(Y, S.children) : U & 16 && A(S.children, Y, null, B, F, Mi(S, V), Z, X),
                ne && Rt(S, null, B, "created"),
                P(Y, S, S.scopeId, Z, B),
                te)
            ) {
                for (const pe in te) pe !== "value" && !fs(pe) && r(Y, pe, null, te[pe], V, B);
                "value" in te && r(Y, "value", null, te.value, V), (j = te.onVnodeBeforeMount) && dt(j, B, S);
            }
            ne && Rt(S, null, B, "beforeMount");
            const ue = Wc(F, se);
            ue && se.beforeEnter(Y),
                i(Y, x, I),
                ((j = te && te.onVnodeMounted) || ue || ne) &&
                    Ue(() => {
                        j && dt(j, B, S), ue && se.enter(Y), ne && Rt(S, null, B, "mounted");
                    }, F);
        },
        P = (S, x, I, B, F) => {
            if ((I && m(S, I), B)) for (let V = 0; V < B.length; V++) m(S, B[V]);
            if (F) {
                let V = F.subTree;
                if (x === V || (ua(V.type) && (V.ssContent === x || V.ssFallback === x))) {
                    const Z = F.vnode;
                    P(S, Z, Z.scopeId, Z.slotScopeIds, F.parent);
                }
            }
        },
        A = (S, x, I, B, F, V, Z, X, Y = 0) => {
            for (let j = Y; j < S.length; j++) {
                const te = (S[j] = X ? It(S[j]) : ft(S[j]));
                f(null, te, x, I, B, F, V, Z, X);
            }
        },
        _ = (S, x, I, B, F, V, Z) => {
            const X = (x.el = S.el);
            let { patchFlag: Y, dynamicChildren: j, dirs: te } = x;
            Y |= S.patchFlag & 16;
            const U = S.props || Se,
                se = x.props || Se;
            let ne;
            if (
                (I && Ft(I, !1),
                (ne = se.onVnodeBeforeUpdate) && dt(ne, I, x, S),
                te && Rt(x, S, I, "beforeUpdate"),
                I && Ft(I, !0),
                ((U.innerHTML && se.innerHTML == null) || (U.textContent && se.textContent == null)) && d(X, ""),
                j ? M(S.dynamicChildren, j, X, I, B, Mi(x, F), V) : Z || C(S, x, X, null, I, B, Mi(x, F), V, !1),
                Y > 0)
            ) {
                if (Y & 16) k(X, U, se, I, F);
                else if (
                    (Y & 2 && U.class !== se.class && r(X, "class", null, se.class, F),
                    Y & 4 && r(X, "style", U.style, se.style, F),
                    Y & 8)
                ) {
                    const ue = x.dynamicProps;
                    for (let pe = 0; pe < ue.length; pe++) {
                        const he = ue[pe],
                            _e = U[he],
                            Ie = se[he];
                        (Ie !== _e || he === "value") && r(X, he, _e, Ie, F, I);
                    }
                }
                Y & 1 && S.children !== x.children && d(X, x.children);
            } else !Z && j == null && k(X, U, se, I, F);
            ((ne = se.onVnodeUpdated) || te) &&
                Ue(() => {
                    ne && dt(ne, I, x, S), te && Rt(x, S, I, "updated");
                }, B);
        },
        M = (S, x, I, B, F, V, Z) => {
            for (let X = 0; X < x.length; X++) {
                const Y = S[X],
                    j = x[X],
                    te = Y.el && (Y.type === Oe || !os(Y, j) || Y.shapeFlag & 198) ? p(Y.el) : I;
                f(Y, j, te, null, B, F, V, Z, !0);
            }
        },
        k = (S, x, I, B, F) => {
            if (x !== I) {
                if (x !== Se) for (const V in x) !fs(V) && !(V in I) && r(S, V, x[V], null, F, B);
                for (const V in I) {
                    if (fs(V)) continue;
                    const Z = I[V],
                        X = x[V];
                    Z !== X && V !== "value" && r(S, V, X, Z, F, B);
                }
                "value" in I && r(S, "value", x.value, I.value, F);
            }
        },
        O = (S, x, I, B, F, V, Z, X, Y) => {
            const j = (x.el = S ? S.el : o("")),
                te = (x.anchor = S ? S.anchor : o(""));
            let { patchFlag: U, dynamicChildren: se, slotScopeIds: ne } = x;
            ne && (X = X ? X.concat(ne) : ne),
                S == null
                    ? (i(j, I, B), i(te, I, B), A(x.children || [], I, te, F, V, Z, X, Y))
                    : U > 0 && U & 64 && se && S.dynamicChildren
                      ? (M(S.dynamicChildren, se, I, F, V, Z, X),
                        (x.key != null || (F && x === F.subTree)) && aa(S, x, !0))
                      : C(S, x, I, te, F, V, Z, X, Y);
        },
        $ = (S, x, I, B, F, V, Z, X, Y) => {
            (x.slotScopeIds = X),
                S == null ? (x.shapeFlag & 512 ? F.ctx.activate(x, I, B, Z, Y) : D(x, I, B, F, V, Z, Y)) : q(S, x, Y);
        },
        D = (S, x, I, B, F, V, Z) => {
            const X = (S.component = ud(S, B, F));
            if ((Wr(S) && (X.ctx.renderer = He), fd(X, !1, Z), X.asyncDep)) {
                if ((F && F.registerDep(X, H, Z), !S.el)) {
                    const Y = (X.subTree = Pe(zt));
                    b(null, Y, x, I);
                }
            } else H(X, S, x, I, F, V, Z);
        },
        q = (S, x, I) => {
            const B = (x.component = S.component);
            if (td(S, x, I))
                if (B.asyncDep && !B.asyncResolved) {
                    T(B, x, I);
                    return;
                } else (B.next = x), B.update();
            else (x.el = S.el), (B.vnode = x);
        },
        H = (S, x, I, B, F, V, Z) => {
            const X = () => {
                if (S.isMounted) {
                    let { next: U, bu: se, u: ne, parent: ue, vnode: pe } = S;
                    {
                        const Xe = oa(S);
                        if (Xe) {
                            U && ((U.el = pe.el), T(S, U, Z)),
                                Xe.asyncDep.then(() => {
                                    S.isUnmounted || X();
                                });
                            return;
                        }
                    }
                    let he = U,
                        _e;
                    Ft(S, !1),
                        U ? ((U.el = pe.el), T(S, U, Z)) : (U = pe),
                        se && Fs(se),
                        (_e = U.props && U.props.onVnodeBeforeUpdate) && dt(_e, ue, U, pe),
                        Ft(S, !0);
                    const Ie = Hn(S),
                        Ye = S.subTree;
                    (S.subTree = Ie),
                        f(Ye, Ie, p(Ye.el), N(Ye), S, F, V),
                        (U.el = Ie.el),
                        he === null && sd(S, Ie.el),
                        ne && Ue(ne, F),
                        (_e = U.props && U.props.onVnodeUpdated) && Ue(() => dt(_e, ue, U, pe), F);
                } else {
                    let U;
                    const { el: se, props: ne } = x,
                        { bm: ue, m: pe, parent: he, root: _e, type: Ie } = S,
                        Ye = gs(x);
                    Ft(S, !1), ue && Fs(ue), !Ye && (U = ne && ne.onVnodeBeforeMount) && dt(U, he, x), Ft(S, !0);
                    {
                        _e.ce && _e.ce._def.shadowRoot !== !1 && _e.ce._injectChildStyle(Ie);
                        const Xe = (S.subTree = Hn(S));
                        f(null, Xe, I, B, S, F, V), (x.el = Xe.el);
                    }
                    if ((pe && Ue(pe, F), !Ye && (U = ne && ne.onVnodeMounted))) {
                        const Xe = x;
                        Ue(() => dt(U, he, Xe), F);
                    }
                    (x.shapeFlag & 256 || (he && gs(he.vnode) && he.vnode.shapeFlag & 256)) && S.a && Ue(S.a, F),
                        (S.isMounted = !0),
                        (x = I = B = null);
                }
            };
            S.scope.on();
            const Y = (S.effect = new xr(X));
            S.scope.off();
            const j = (S.update = Y.run.bind(Y)),
                te = (S.job = Y.runIfDirty.bind(Y));
            (te.i = S), (te.id = S.uid), (Y.scheduler = () => fn(te)), Ft(S, !0), j();
        },
        T = (S, x, I) => {
            x.component = S;
            const B = S.vnode.props;
            (S.vnode = x), (S.next = null), Fc(S, x.props, B, I), qc(S, x.children, I), Tt(), Ln(S), Ct();
        },
        C = (S, x, I, B, F, V, Z, X, Y = !1) => {
            const j = S && S.children,
                te = S ? S.shapeFlag : 0,
                U = x.children,
                { patchFlag: se, shapeFlag: ne } = x;
            if (se > 0) {
                if (se & 128) {
                    ae(j, U, I, B, F, V, Z, X, Y);
                    return;
                } else if (se & 256) {
                    G(j, U, I, B, F, V, Z, X, Y);
                    return;
                }
            }
            ne & 8
                ? (te & 16 && R(j, F, V), U !== j && d(I, U))
                : te & 16
                  ? ne & 16
                      ? ae(j, U, I, B, F, V, Z, X, Y)
                      : R(j, F, V, !0)
                  : (te & 8 && d(I, ""), ne & 16 && A(U, I, B, F, V, Z, X, Y));
        },
        G = (S, x, I, B, F, V, Z, X, Y) => {
            (S = S || Xt), (x = x || Xt);
            const j = S.length,
                te = x.length,
                U = Math.min(j, te);
            let se;
            for (se = 0; se < U; se++) {
                const ne = (x[se] = Y ? It(x[se]) : ft(x[se]));
                f(S[se], ne, I, null, F, V, Z, X, Y);
            }
            j > te ? R(S, F, V, !0, !1, U) : A(x, I, B, F, V, Z, X, Y, U);
        },
        ae = (S, x, I, B, F, V, Z, X, Y) => {
            let j = 0;
            const te = x.length;
            let U = S.length - 1,
                se = te - 1;
            for (; j <= U && j <= se; ) {
                const ne = S[j],
                    ue = (x[j] = Y ? It(x[j]) : ft(x[j]));
                if (os(ne, ue)) f(ne, ue, I, null, F, V, Z, X, Y);
                else break;
                j++;
            }
            for (; j <= U && j <= se; ) {
                const ne = S[U],
                    ue = (x[se] = Y ? It(x[se]) : ft(x[se]));
                if (os(ne, ue)) f(ne, ue, I, null, F, V, Z, X, Y);
                else break;
                U--, se--;
            }
            if (j > U) {
                if (j <= se) {
                    const ne = se + 1,
                        ue = ne < te ? x[ne].el : B;
                    for (; j <= se; ) f(null, (x[j] = Y ? It(x[j]) : ft(x[j])), I, ue, F, V, Z, X, Y), j++;
                }
            } else if (j > se) for (; j <= U; ) ge(S[j], F, V, !0), j++;
            else {
                const ne = j,
                    ue = j,
                    pe = new Map();
                for (j = ue; j <= se; j++) {
                    const qe = (x[j] = Y ? It(x[j]) : ft(x[j]));
                    qe.key != null && pe.set(qe.key, j);
                }
                let he,
                    _e = 0;
                const Ie = se - ue + 1;
                let Ye = !1,
                    Xe = 0;
                const Mt = new Array(Ie);
                for (j = 0; j < Ie; j++) Mt[j] = 0;
                for (j = ne; j <= U; j++) {
                    const qe = S[j];
                    if (_e >= Ie) {
                        ge(qe, F, V, !0);
                        continue;
                    }
                    let et;
                    if (qe.key != null) et = pe.get(qe.key);
                    else
                        for (he = ue; he <= se; he++)
                            if (Mt[he - ue] === 0 && os(qe, x[he])) {
                                et = he;
                                break;
                            }
                    et === void 0
                        ? ge(qe, F, V, !0)
                        : ((Mt[et - ue] = j + 1),
                          et >= Xe ? (Xe = et) : (Ye = !0),
                          f(qe, x[et], I, null, F, V, Z, X, Y),
                          _e++);
                }
                const $s = Ye ? Yc(Mt) : Xt;
                for (he = $s.length - 1, j = Ie - 1; j >= 0; j--) {
                    const qe = ue + j,
                        et = x[qe],
                        Q = qe + 1 < te ? x[qe + 1].el : B;
                    Mt[j] === 0
                        ? f(null, et, I, Q, F, V, Z, X, Y)
                        : Ye && (he < 0 || j !== $s[he] ? me(et, I, Q, 2) : he--);
                }
            }
        },
        me = (S, x, I, B, F = null) => {
            const { el: V, type: Z, transition: X, children: Y, shapeFlag: j } = S;
            if (j & 6) {
                me(S.component.subTree, x, I, B);
                return;
            }
            if (j & 128) {
                S.suspense.move(x, I, B);
                return;
            }
            if (j & 64) {
                Z.move(S, x, I, He);
                return;
            }
            if (Z === Oe) {
                i(V, x, I);
                for (let U = 0; U < Y.length; U++) me(Y[U], x, I, B);
                i(S.anchor, x, I);
                return;
            }
            if (Z === Vs) {
                v(S, x, I);
                return;
            }
            if (B !== 2 && j & 1 && X)
                if (B === 0) X.beforeEnter(V), i(V, x, I), Ue(() => X.enter(V), F);
                else {
                    const { leave: U, delayLeave: se, afterLeave: ne } = X,
                        ue = () => {
                            S.ctx.isUnmounted ? n(V) : i(V, x, I);
                        },
                        pe = () => {
                            U(V, () => {
                                ue(), ne && ne();
                            });
                        };
                    se ? se(V, ue, pe) : pe();
                }
            else i(V, x, I);
        },
        ge = (S, x, I, B = !1, F = !1) => {
            const {
                type: V,
                props: Z,
                ref: X,
                children: Y,
                dynamicChildren: j,
                shapeFlag: te,
                patchFlag: U,
                dirs: se,
                cacheIndex: ne,
            } = S;
            if (
                (U === -2 && (F = !1),
                X != null && (Tt(), hs(X, null, I, S, !0), Ct()),
                ne != null && (x.renderCache[ne] = void 0),
                te & 256)
            ) {
                x.ctx.deactivate(S);
                return;
            }
            const ue = te & 1 && se,
                pe = !gs(S);
            let he;
            if ((pe && (he = Z && Z.onVnodeBeforeUnmount) && dt(he, x, S), te & 6)) W(S.component, I, B);
            else {
                if (te & 128) {
                    S.suspense.unmount(I, B);
                    return;
                }
                ue && Rt(S, null, x, "beforeUnmount"),
                    te & 64
                        ? S.type.remove(S, x, I, He, B)
                        : j && !j.hasOnce && (V !== Oe || (U > 0 && U & 64))
                          ? R(j, x, I, !1, !0)
                          : ((V === Oe && U & 384) || (!F && te & 16)) && R(Y, x, I),
                    B && Ne(S);
            }
            ((pe && (he = Z && Z.onVnodeUnmounted)) || ue) &&
                Ue(() => {
                    he && dt(he, x, S), ue && Rt(S, null, x, "unmounted");
                }, I);
        },
        Ne = (S) => {
            const { type: x, el: I, anchor: B, transition: F } = S;
            if (x === Oe) {
                gt(I, B);
                return;
            }
            if (x === Vs) {
                y(S);
                return;
            }
            const V = () => {
                n(I), F && !F.persisted && F.afterLeave && F.afterLeave();
            };
            if (S.shapeFlag & 1 && F && !F.persisted) {
                const { leave: Z, delayLeave: X } = F,
                    Y = () => Z(I, V);
                X ? X(S.el, V, Y) : Y();
            } else V();
        },
        gt = (S, x) => {
            let I;
            for (; S !== x; ) (I = g(S)), n(S), (S = I);
            n(x);
        },
        W = (S, x, I) => {
            const {
                bum: B,
                scope: F,
                job: V,
                subTree: Z,
                um: X,
                m: Y,
                a: j,
                parent: te,
                slots: { __: U },
            } = S;
            zn(Y),
                zn(j),
                B && Fs(B),
                te &&
                    re(U) &&
                    U.forEach((se) => {
                        te.renderCache[se] = void 0;
                    }),
                F.stop(),
                V && ((V.flags |= 8), ge(Z, S, x, I)),
                X && Ue(X, x),
                Ue(() => {
                    S.isUnmounted = !0;
                }, x),
                x &&
                    x.pendingBranch &&
                    !x.isUnmounted &&
                    S.asyncDep &&
                    !S.asyncResolved &&
                    S.suspenseId === x.pendingId &&
                    (x.deps--, x.deps === 0 && x.resolve());
        },
        R = (S, x, I, B = !1, F = !1, V = 0) => {
            for (let Z = V; Z < S.length; Z++) ge(S[Z], x, I, B, F);
        },
        N = (S) => {
            if (S.shapeFlag & 6) return N(S.component.subTree);
            if (S.shapeFlag & 128) return S.suspense.next();
            const x = g(S.anchor || S.el),
                I = x && x[uc];
            return I ? g(I) : x;
        };
    let oe = !1;
    const be = (S, x, I) => {
            S == null ? x._vnode && ge(x._vnode, null, null, !0) : f(x._vnode || null, S, x, null, null, null, I),
                (x._vnode = S),
                oe || ((oe = !0), Ln(), Vr(), (oe = !1));
        },
        He = { p: f, um: ge, m: me, r: Ne, mt: D, mc: A, pc: C, pbc: M, n: N, o: t };
    return { render: be, hydrate: void 0, createApp: zc(be) };
}
function Mi({ type: t, props: e }, s) {
    return (s === "svg" && t === "foreignObject") ||
        (s === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html"))
        ? void 0
        : s;
}
function Ft({ effect: t, job: e }, s) {
    s ? ((t.flags |= 32), (e.flags |= 4)) : ((t.flags &= -33), (e.flags &= -5));
}
function Wc(t, e) {
    return (!t || (t && !t.pendingBranch)) && e && !e.persisted;
}
function aa(t, e, s = !1) {
    const i = t.children,
        n = e.children;
    if (re(i) && re(n))
        for (let r = 0; r < i.length; r++) {
            const a = i[r];
            let o = n[r];
            o.shapeFlag & 1 &&
                !o.dynamicChildren &&
                ((o.patchFlag <= 0 || o.patchFlag === 32) && ((o = n[r] = It(n[r])), (o.el = a.el)),
                !s && o.patchFlag !== -2 && aa(a, o)),
                o.type === ui && (o.el = a.el),
                o.type === zt && !o.el && (o.el = a.el);
        }
}
function Yc(t) {
    const e = t.slice(),
        s = [0];
    let i, n, r, a, o;
    const l = t.length;
    for (i = 0; i < l; i++) {
        const c = t[i];
        if (c !== 0) {
            if (((n = s[s.length - 1]), t[n] < c)) {
                (e[i] = n), s.push(i);
                continue;
            }
            for (r = 0, a = s.length - 1; r < a; ) (o = (r + a) >> 1), t[s[o]] < c ? (r = o + 1) : (a = o);
            c < t[s[r]] && (r > 0 && (e[i] = s[r - 1]), (s[r] = i));
        }
    }
    for (r = s.length, a = s[r - 1]; r-- > 0; ) (s[r] = a), (a = e[a]);
    return s;
}
function oa(t) {
    const e = t.subTree.component;
    if (e) return e.asyncDep && !e.asyncResolved ? e : oa(e);
}
function zn(t) {
    if (t) for (let e = 0; e < t.length; e++) t[e].flags |= 8;
}
const Xc = Symbol.for("v-scx"),
    Uc = () => Bs(Xc);
function ws(t, e, s) {
    return la(t, e, s);
}
function la(t, e, s = Se) {
    const { immediate: i, deep: n, flush: r, once: a } = s,
        o = Ve({}, s),
        l = (e && i) || (!e && r !== "post");
    let c;
    if (_s) {
        if (r === "sync") {
            const m = Uc();
            c = m.__watcherHandles || (m.__watcherHandles = []);
        } else if (!l) {
            const m = () => {};
            return (m.stop = pt), (m.resume = pt), (m.pause = pt), m;
        }
    }
    const d = Fe;
    o.call = (m, u, f) => ht(m, d, u, f);
    let p = !1;
    r === "post"
        ? (o.scheduler = (m) => {
              Ue(m, d && d.suspense);
          })
        : r !== "sync" &&
          ((p = !0),
          (o.scheduler = (m, u) => {
              u ? m() : fn(m);
          })),
        (o.augmentJob = (m) => {
            e && (m.flags |= 4), p && ((m.flags |= 2), d && ((m.id = d.uid), (m.i = d)));
        });
    const g = oc(t, e, o);
    return _s && (c ? c.push(g) : l && g()), g;
}
function Kc(t, e, s) {
    const i = this.proxy,
        n = Le(t) ? (t.includes(".") ? ca(i, t) : () => i[t]) : t.bind(i, i);
    let r;
    de(e) ? (r = e) : ((r = e.handler), (s = e));
    const a = Os(this),
        o = la(n, r.bind(i), s);
    return a(), o;
}
function ca(t, e) {
    const s = e.split(".");
    return () => {
        let i = t;
        for (let n = 0; n < s.length && i; n++) i = i[s[n]];
        return i;
    };
}
const Zc = (t, e) =>
    e === "modelValue" || e === "model-value"
        ? t.modelModifiers
        : t[`${e}Modifiers`] || t[`${rt(e)}Modifiers`] || t[`${Gt(e)}Modifiers`];
function Jc(t, e, ...s) {
    if (t.isUnmounted) return;
    const i = t.vnode.props || Se;
    let n = s;
    const r = e.startsWith("update:"),
        a = r && Zc(i, e.slice(7));
    a && (a.trim && (n = s.map((d) => (Le(d) ? d.trim() : d))), a.number && (n = s.map(Ys)));
    let o,
        l = i[(o = Si(e))] || i[(o = Si(rt(e)))];
    !l && r && (l = i[(o = Si(Gt(e)))]), l && ht(l, t, 6, n);
    const c = i[o + "Once"];
    if (c) {
        if (!t.emitted) t.emitted = {};
        else if (t.emitted[o]) return;
        (t.emitted[o] = !0), ht(c, t, 6, n);
    }
}
function da(t, e, s = !1) {
    const i = e.emitsCache,
        n = i.get(t);
    if (n !== void 0) return n;
    const r = t.emits;
    let a = {},
        o = !1;
    if (!de(t)) {
        const l = (c) => {
            const d = da(c, e, !0);
            d && ((o = !0), Ve(a, d));
        };
        !s && e.mixins.length && e.mixins.forEach(l), t.extends && l(t.extends), t.mixins && t.mixins.forEach(l);
    }
    return !r && !o
        ? (Te(t) && i.set(t, null), null)
        : (re(r) ? r.forEach((l) => (a[l] = null)) : Ve(a, r), Te(t) && i.set(t, a), a);
}
function di(t, e) {
    return !t || !si(e)
        ? !1
        : ((e = e.slice(2).replace(/Once$/, "")), ye(t, e[0].toLowerCase() + e.slice(1)) || ye(t, Gt(e)) || ye(t, e));
}
function Hn(t) {
    const {
            type: e,
            vnode: s,
            proxy: i,
            withProxy: n,
            propsOptions: [r],
            slots: a,
            attrs: o,
            emit: l,
            render: c,
            renderCache: d,
            props: p,
            data: g,
            setupState: m,
            ctx: u,
            inheritAttrs: f,
        } = t,
        w = Zs(t);
    let b, h;
    try {
        if (s.shapeFlag & 4) {
            const y = n || i,
                E = y;
            (b = ft(c.call(E, y, d, p, m, g, u))), (h = o);
        } else {
            const y = e;
            (b = ft(y.length > 1 ? y(p, { attrs: o, slots: a, emit: l }) : y(p, null))), (h = e.props ? o : Qc(o));
        }
    } catch (y) {
        (ys.length = 0), oi(y, t, 1), (b = Pe(zt));
    }
    let v = b;
    if (h && f !== !1) {
        const y = Object.keys(h),
            { shapeFlag: E } = v;
        y.length && E & 7 && (r && y.some(Ji) && (h = ed(h, r)), (v = ss(v, h, !1, !0)));
    }
    return (
        s.dirs && ((v = ss(v, null, !1, !0)), (v.dirs = v.dirs ? v.dirs.concat(s.dirs) : s.dirs)),
        s.transition && pn(v, s.transition),
        (b = v),
        Zs(w),
        b
    );
}
const Qc = (t) => {
        let e;
        for (const s in t) (s === "class" || s === "style" || si(s)) && ((e || (e = {}))[s] = t[s]);
        return e;
    },
    ed = (t, e) => {
        const s = {};
        for (const i in t) (!Ji(i) || !(i.slice(9) in e)) && (s[i] = t[i]);
        return s;
    };
function td(t, e, s) {
    const { props: i, children: n, component: r } = t,
        { props: a, children: o, patchFlag: l } = e,
        c = r.emitsOptions;
    if (e.dirs || e.transition) return !0;
    if (s && l >= 0) {
        if (l & 1024) return !0;
        if (l & 16) return i ? Rn(i, a, c) : !!a;
        if (l & 8) {
            const d = e.dynamicProps;
            for (let p = 0; p < d.length; p++) {
                const g = d[p];
                if (a[g] !== i[g] && !di(c, g)) return !0;
            }
        }
    } else return (n || o) && (!o || !o.$stable) ? !0 : i === a ? !1 : i ? (a ? Rn(i, a, c) : !0) : !!a;
    return !1;
}
function Rn(t, e, s) {
    const i = Object.keys(e);
    if (i.length !== Object.keys(t).length) return !0;
    for (let n = 0; n < i.length; n++) {
        const r = i[n];
        if (e[r] !== t[r] && !di(s, r)) return !0;
    }
    return !1;
}
function sd({ vnode: t, parent: e }, s) {
    for (; e; ) {
        const i = e.subTree;
        if ((i.suspense && i.suspense.activeBranch === t && (i.el = t.el), i === t))
            ((t = e.vnode).el = s), (e = e.parent);
        else break;
    }
}
const ua = (t) => t.__isSuspense;
function id(t, e) {
    e && e.pendingBranch ? (re(t) ? e.effects.push(...t) : e.effects.push(t)) : dc(t);
}
const Oe = Symbol.for("v-fgt"),
    ui = Symbol.for("v-txt"),
    zt = Symbol.for("v-cmt"),
    Vs = Symbol.for("v-stc"),
    ys = [];
let Qe = null;
function ee(t = !1) {
    ys.push((Qe = t ? null : []));
}
function nd() {
    ys.pop(), (Qe = ys[ys.length - 1] || null);
}
let Ts = 1;
function Fn(t, e = !1) {
    (Ts += t), t < 0 && Qe && e && (Qe.hasOnce = !0);
}
function fa(t) {
    return (t.dynamicChildren = Ts > 0 ? Qe || Xt : null), nd(), Ts > 0 && Qe && Qe.push(t), t;
}
function ie(t, e, s, i, n, r) {
    return fa(z(t, e, s, i, n, r, !0));
}
function ji(t, e, s, i, n) {
    return fa(Pe(t, e, s, i, n, !0));
}
function pa(t) {
    return t ? t.__v_isVNode === !0 : !1;
}
function os(t, e) {
    return t.type === e.type && t.key === e.key;
}
const ma = ({ key: t }) => t ?? null,
    Ns = ({ ref: t, ref_key: e, ref_for: s }) => (
        typeof t == "number" && (t = "" + t),
        t != null ? (Le(t) || Be(t) || de(t) ? { i: Je, r: t, k: e, f: !!s } : t) : null
    );
function z(t, e = null, s = null, i = 0, n = null, r = t === Oe ? 0 : 1, a = !1, o = !1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: t,
        props: e,
        key: e && ma(e),
        ref: e && Ns(e),
        scopeId: qr,
        slotScopeIds: null,
        children: s,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: r,
        patchFlag: i,
        dynamicProps: n,
        dynamicChildren: null,
        appContext: null,
        ctx: Je,
    };
    return (
        o ? (gn(l, s), r & 128 && t.normalize(l)) : s && (l.shapeFlag |= Le(s) ? 8 : 16),
        Ts > 0 && !a && Qe && (l.patchFlag > 0 || r & 6) && l.patchFlag !== 32 && Qe.push(l),
        l
    );
}
const Pe = rd;
function rd(t, e = null, s = null, i = 0, n = null, r = !1) {
    if (((!t || t === Mc) && (t = zt), pa(t))) {
        const o = ss(t, e, !0);
        return (
            s && gn(o, s),
            Ts > 0 && !r && Qe && (o.shapeFlag & 6 ? (Qe[Qe.indexOf(t)] = o) : Qe.push(o)),
            (o.patchFlag = -2),
            o
        );
    }
    if ((vd(t) && (t = t.__vccOpts), e)) {
        e = ad(e);
        let { class: o, style: l } = e;
        o && !Le(o) && (e.class = Nt(o)), Te(l) && (un(l) && !re(l) && (l = Ve({}, l)), (e.style = tn(l)));
    }
    const a = Le(t) ? 1 : ua(t) ? 128 : fc(t) ? 64 : Te(t) ? 4 : de(t) ? 2 : 0;
    return z(t, e, s, i, n, a, r, !0);
}
function ad(t) {
    return t ? (un(t) || ea(t) ? Ve({}, t) : t) : null;
}
function ss(t, e, s = !1, i = !1) {
    const { props: n, ref: r, patchFlag: a, children: o, transition: l } = t,
        c = e ? ld(n || {}, e) : n,
        d = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: t.type,
            props: c,
            key: c && ma(c),
            ref: e && e.ref ? (s && r ? (re(r) ? r.concat(Ns(e)) : [r, Ns(e)]) : Ns(e)) : r,
            scopeId: t.scopeId,
            slotScopeIds: t.slotScopeIds,
            children: o,
            target: t.target,
            targetStart: t.targetStart,
            targetAnchor: t.targetAnchor,
            staticCount: t.staticCount,
            shapeFlag: t.shapeFlag,
            patchFlag: e && t.type !== Oe ? (a === -1 ? 16 : a | 16) : a,
            dynamicProps: t.dynamicProps,
            dynamicChildren: t.dynamicChildren,
            appContext: t.appContext,
            dirs: t.dirs,
            transition: l,
            component: t.component,
            suspense: t.suspense,
            ssContent: t.ssContent && ss(t.ssContent),
            ssFallback: t.ssFallback && ss(t.ssFallback),
            el: t.el,
            anchor: t.anchor,
            ctx: t.ctx,
            ce: t.ce,
        };
    return l && i && pn(d, l.clone(d)), d;
}
function Cs(t = " ", e = 0) {
    return Pe(ui, null, t, e);
}
function od(t, e) {
    const s = Pe(Vs, null, t);
    return (s.staticCount = e), s;
}
function Ee(t = "", e = !1) {
    return e ? (ee(), ji(zt, null, t)) : Pe(zt, null, t);
}
function ft(t) {
    return t == null || typeof t == "boolean"
        ? Pe(zt)
        : re(t)
          ? Pe(Oe, null, t.slice())
          : pa(t)
            ? It(t)
            : Pe(ui, null, String(t));
}
function It(t) {
    return (t.el === null && t.patchFlag !== -1) || t.memo ? t : ss(t);
}
function gn(t, e) {
    let s = 0;
    const { shapeFlag: i } = t;
    if (e == null) e = null;
    else if (re(e)) s = 16;
    else if (typeof e == "object")
        if (i & 65) {
            const n = e.default;
            n && (n._c && (n._d = !1), gn(t, n()), n._c && (n._d = !0));
            return;
        } else {
            s = 32;
            const n = e._;
            !n && !ea(e)
                ? (e._ctx = Je)
                : n === 3 && Je && (Je.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (t.patchFlag |= 1024)));
        }
    else
        de(e)
            ? ((e = { default: e, _ctx: Je }), (s = 32))
            : ((e = String(e)), i & 64 ? ((s = 16), (e = [Cs(e)])) : (s = 8));
    (t.children = e), (t.shapeFlag |= s);
}
function ld(...t) {
    const e = {};
    for (let s = 0; s < t.length; s++) {
        const i = t[s];
        for (const n in i)
            if (n === "class") e.class !== i.class && (e.class = Nt([e.class, i.class]));
            else if (n === "style") e.style = tn([e.style, i.style]);
            else if (si(n)) {
                const r = e[n],
                    a = i[n];
                a && r !== a && !(re(r) && r.includes(a)) && (e[n] = r ? [].concat(r, a) : a);
            } else n !== "" && (e[n] = i[n]);
    }
    return e;
}
function dt(t, e, s, i = null) {
    ht(t, e, 7, [s, i]);
}
const cd = Zr();
let dd = 0;
function ud(t, e, s) {
    const i = t.type,
        n = (e ? e.appContext : t.appContext) || cd,
        r = {
            uid: dd++,
            vnode: t,
            type: i,
            parent: e,
            appContext: n,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            job: null,
            scope: new $l(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: e ? e.provides : Object.create(n.provides),
            ids: e ? e.ids : ["", 0, 0],
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: sa(i, n),
            emitsOptions: da(i, n),
            emit: null,
            emitted: null,
            propsDefaults: Se,
            inheritAttrs: i.inheritAttrs,
            ctx: Se,
            data: Se,
            props: Se,
            attrs: Se,
            slots: Se,
            refs: Se,
            setupState: Se,
            setupContext: null,
            suspense: s,
            suspenseId: s ? s.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null,
        };
    return (r.ctx = { _: r }), (r.root = e ? e.root : r), (r.emit = Jc.bind(null, r)), t.ce && t.ce(r), r;
}
let Fe = null,
    Qs,
    Gi;
{
    const t = ri(),
        e = (s, i) => {
            let n;
            return (
                (n = t[s]) || (n = t[s] = []),
                n.push(i),
                (r) => {
                    n.length > 1 ? n.forEach((a) => a(r)) : n[0](r);
                }
            );
        };
    (Qs = e("__VUE_INSTANCE_SETTERS__", (s) => (Fe = s))), (Gi = e("__VUE_SSR_SETTERS__", (s) => (_s = s)));
}
const Os = (t) => {
        const e = Fe;
        return (
            Qs(t),
            t.scope.on(),
            () => {
                t.scope.off(), Qs(e);
            }
        );
    },
    Bn = () => {
        Fe && Fe.scope.off(), Qs(null);
    };
function ha(t) {
    return t.vnode.shapeFlag & 4;
}
let _s = !1;
function fd(t, e = !1, s = !1) {
    e && Gi(e);
    const { props: i, children: n } = t.vnode,
        r = ha(t);
    Rc(t, i, r, e), Nc(t, n, s || e);
    const a = r ? pd(t, e) : void 0;
    return e && Gi(!1), a;
}
function pd(t, e) {
    const s = t.type;
    (t.accessCache = Object.create(null)), (t.proxy = new Proxy(t.ctx, Lc));
    const { setup: i } = s;
    if (i) {
        Tt();
        const n = (t.setupContext = i.length > 1 ? hd(t) : null),
            r = Os(t),
            a = As(i, t, 0, [t.props, n]),
            o = gr(a);
        if ((Ct(), r(), (o || t.sp) && !gs(t) && Gr(t), o)) {
            if ((a.then(Bn, Bn), e))
                return a
                    .then((l) => {
                        Vn(t, l);
                    })
                    .catch((l) => {
                        oi(l, t, 0);
                    });
            t.asyncDep = a;
        } else Vn(t, a);
    } else ga(t);
}
function Vn(t, e, s) {
    de(e) ? (t.type.__ssrInlineRender ? (t.ssrRender = e) : (t.render = e)) : Te(e) && (t.setupState = Hr(e)), ga(t);
}
function ga(t, e, s) {
    const i = t.type;
    t.render || (t.render = i.render || pt);
    {
        const n = Os(t);
        Tt();
        try {
            Ic(t);
        } finally {
            Ct(), n();
        }
    }
}
const md = {
    get(t, e) {
        return Re(t, "get", ""), t[e];
    },
};
function hd(t) {
    const e = (s) => {
        t.exposed = s || {};
    };
    return { attrs: new Proxy(t.attrs, md), slots: t.slots, emit: t.emit, expose: e };
}
function fi(t) {
    return t.exposed
        ? t.exposeProxy ||
              (t.exposeProxy = new Proxy(Hr(ec(t.exposed)), {
                  get(e, s) {
                      if (s in e) return e[s];
                      if (s in vs) return vs[s](t);
                  },
                  has(e, s) {
                      return s in e || s in vs;
                  },
              }))
        : t.proxy;
}
function gd(t, e = !0) {
    return de(t) ? t.displayName || t.name : t.name || (e && t.__name);
}
function vd(t) {
    return de(t) && "__vccOpts" in t;
}
const st = (t, e) => rc(t, e, _s),
    wd = "3.5.17";
/**
 * @vue/runtime-dom v3.5.17
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Wi;
const Nn = typeof window < "u" && window.trustedTypes;
if (Nn)
    try {
        Wi = Nn.createPolicy("vue", { createHTML: (t) => t });
    } catch {}
const va = Wi ? (t) => Wi.createHTML(t) : (t) => t,
    yd = "http://www.w3.org/2000/svg",
    bd = "http://www.w3.org/1998/Math/MathML",
    wt = typeof document < "u" ? document : null,
    qn = wt && wt.createElement("template"),
    Sd = {
        insert: (t, e, s) => {
            e.insertBefore(t, s || null);
        },
        remove: (t) => {
            const e = t.parentNode;
            e && e.removeChild(t);
        },
        createElement: (t, e, s, i) => {
            const n =
                e === "svg"
                    ? wt.createElementNS(yd, t)
                    : e === "mathml"
                      ? wt.createElementNS(bd, t)
                      : s
                        ? wt.createElement(t, { is: s })
                        : wt.createElement(t);
            return t === "select" && i && i.multiple != null && n.setAttribute("multiple", i.multiple), n;
        },
        createText: (t) => wt.createTextNode(t),
        createComment: (t) => wt.createComment(t),
        setText: (t, e) => {
            t.nodeValue = e;
        },
        setElementText: (t, e) => {
            t.textContent = e;
        },
        parentNode: (t) => t.parentNode,
        nextSibling: (t) => t.nextSibling,
        querySelector: (t) => wt.querySelector(t),
        setScopeId(t, e) {
            t.setAttribute(e, "");
        },
        insertStaticContent(t, e, s, i, n, r) {
            const a = s ? s.previousSibling : e.lastChild;
            if (n && (n === r || n.nextSibling))
                for (; e.insertBefore(n.cloneNode(!0), s), !(n === r || !(n = n.nextSibling)); );
            else {
                qn.innerHTML = va(i === "svg" ? `<svg>${t}</svg>` : i === "mathml" ? `<math>${t}</math>` : t);
                const o = qn.content;
                if (i === "svg" || i === "mathml") {
                    const l = o.firstChild;
                    for (; l.firstChild; ) o.appendChild(l.firstChild);
                    o.removeChild(l);
                }
                e.insertBefore(o, s);
            }
            return [a ? a.nextSibling : e.firstChild, s ? s.previousSibling : e.lastChild];
        },
    },
    xd = Symbol("_vtc");
function Ed(t, e, s) {
    const i = t[xd];
    i && (e = (e ? [e, ...i] : [...i]).join(" ")),
        e == null ? t.removeAttribute("class") : s ? t.setAttribute("class", e) : (t.className = e);
}
const jn = Symbol("_vod"),
    Td = Symbol("_vsh"),
    Cd = Symbol(""),
    _d = /(^|;)\s*display\s*:/;
function Md(t, e, s) {
    const i = t.style,
        n = Le(s);
    let r = !1;
    if (s && !n) {
        if (e)
            if (Le(e))
                for (const a of e.split(";")) {
                    const o = a.slice(0, a.indexOf(":")).trim();
                    s[o] == null && qs(i, o, "");
                }
            else for (const a in e) s[a] == null && qs(i, a, "");
        for (const a in s) a === "display" && (r = !0), qs(i, a, s[a]);
    } else if (n) {
        if (e !== s) {
            const a = i[Cd];
            a && (s += ";" + a), (i.cssText = s), (r = _d.test(s));
        }
    } else e && t.removeAttribute("style");
    jn in t && ((t[jn] = r ? i.display : ""), t[Td] && (i.display = "none"));
}
const Gn = /\s*!important$/;
function qs(t, e, s) {
    if (re(s)) s.forEach((i) => qs(t, e, i));
    else if ((s == null && (s = ""), e.startsWith("--"))) t.setProperty(e, s);
    else {
        const i = Pd(t, e);
        Gn.test(s) ? t.setProperty(Gt(i), s.replace(Gn, ""), "important") : (t[i] = s);
    }
}
const Wn = ["Webkit", "Moz", "ms"],
    Pi = {};
function Pd(t, e) {
    const s = Pi[e];
    if (s) return s;
    let i = rt(e);
    if (i !== "filter" && i in t) return (Pi[e] = i);
    i = ni(i);
    for (let n = 0; n < Wn.length; n++) {
        const r = Wn[n] + i;
        if (r in t) return (Pi[e] = r);
    }
    return e;
}
const Yn = "http://www.w3.org/1999/xlink";
function Xn(t, e, s, i, n, r = Al(e)) {
    i && e.startsWith("xlink:")
        ? s == null
            ? t.removeAttributeNS(Yn, e.slice(6, e.length))
            : t.setAttributeNS(Yn, e, s)
        : s == null || (r && !yr(s))
          ? t.removeAttribute(e)
          : t.setAttribute(e, r ? "" : mt(s) ? String(s) : s);
}
function Un(t, e, s, i, n) {
    if (e === "innerHTML" || e === "textContent") {
        s != null && (t[e] = e === "innerHTML" ? va(s) : s);
        return;
    }
    const r = t.tagName;
    if (e === "value" && r !== "PROGRESS" && !r.includes("-")) {
        const o = r === "OPTION" ? t.getAttribute("value") || "" : t.value,
            l = s == null ? (t.type === "checkbox" ? "on" : "") : String(s);
        (o !== l || !("_value" in t)) && (t.value = l), s == null && t.removeAttribute(e), (t._value = s);
        return;
    }
    let a = !1;
    if (s === "" || s == null) {
        const o = typeof t[e];
        o === "boolean"
            ? (s = yr(s))
            : s == null && o === "string"
              ? ((s = ""), (a = !0))
              : o === "number" && ((s = 0), (a = !0));
    }
    try {
        t[e] = s;
    } catch {}
    a && t.removeAttribute(n || e);
}
function At(t, e, s, i) {
    t.addEventListener(e, s, i);
}
function Ld(t, e, s, i) {
    t.removeEventListener(e, s, i);
}
const Kn = Symbol("_vei");
function Id(t, e, s, i, n = null) {
    const r = t[Kn] || (t[Kn] = {}),
        a = r[e];
    if (i && a) a.value = i;
    else {
        const [o, l] = Ad(e);
        if (i) {
            const c = (r[e] = kd(i, n));
            At(t, o, c, l);
        } else a && (Ld(t, o, a, l), (r[e] = void 0));
    }
}
const Zn = /(?:Once|Passive|Capture)$/;
function Ad(t) {
    let e;
    if (Zn.test(t)) {
        e = {};
        let i;
        for (; (i = t.match(Zn)); ) (t = t.slice(0, t.length - i[0].length)), (e[i[0].toLowerCase()] = !0);
    }
    return [t[2] === ":" ? t.slice(3) : Gt(t.slice(2)), e];
}
let Li = 0;
const Od = Promise.resolve(),
    $d = () => Li || (Od.then(() => (Li = 0)), (Li = Date.now()));
function kd(t, e) {
    const s = (i) => {
        if (!i._vts) i._vts = Date.now();
        else if (i._vts <= s.attached) return;
        ht(Dd(i, s.value), e, 5, [i]);
    };
    return (s.value = t), (s.attached = $d()), s;
}
function Dd(t, e) {
    if (re(e)) {
        const s = t.stopImmediatePropagation;
        return (
            (t.stopImmediatePropagation = () => {
                s.call(t), (t._stopped = !0);
            }),
            e.map((i) => (n) => !n._stopped && i && i(n))
        );
    } else return e;
}
const Jn = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123,
    zd = (t, e, s, i, n, r) => {
        const a = n === "svg";
        e === "class"
            ? Ed(t, i, a)
            : e === "style"
              ? Md(t, s, i)
              : si(e)
                ? Ji(e) || Id(t, e, s, i, r)
                : (e[0] === "." ? ((e = e.slice(1)), !0) : e[0] === "^" ? ((e = e.slice(1)), !1) : Hd(t, e, i, a))
                  ? (Un(t, e, i),
                    !t.tagName.includes("-") &&
                        (e === "value" || e === "checked" || e === "selected") &&
                        Xn(t, e, i, a, r, e !== "value"))
                  : t._isVueCE && (/[A-Z]/.test(e) || !Le(i))
                    ? Un(t, rt(e), i, r, e)
                    : (e === "true-value" ? (t._trueValue = i) : e === "false-value" && (t._falseValue = i),
                      Xn(t, e, i, a));
    };
function Hd(t, e, s, i) {
    if (i) return !!(e === "innerHTML" || e === "textContent" || (e in t && Jn(e) && de(s)));
    if (
        e === "spellcheck" ||
        e === "draggable" ||
        e === "translate" ||
        e === "autocorrect" ||
        e === "form" ||
        (e === "list" && t.tagName === "INPUT") ||
        (e === "type" && t.tagName === "TEXTAREA")
    )
        return !1;
    if (e === "width" || e === "height") {
        const n = t.tagName;
        if (n === "IMG" || n === "VIDEO" || n === "CANVAS" || n === "SOURCE") return !1;
    }
    return Jn(e) && Le(s) ? !1 : e in t;
}
const is = (t) => {
    const e = t.props["onUpdate:modelValue"] || !1;
    return re(e) ? (s) => Fs(e, s) : e;
};
function Rd(t) {
    t.target.composing = !0;
}
function Qn(t) {
    const e = t.target;
    e.composing && ((e.composing = !1), e.dispatchEvent(new Event("input")));
}
const xt = Symbol("_assign"),
    Fd = {
        created(t, { modifiers: { lazy: e, trim: s, number: i } }, n) {
            t[xt] = is(n);
            const r = i || (n.props && n.props.type === "number");
            At(t, e ? "change" : "input", (a) => {
                if (a.target.composing) return;
                let o = t.value;
                s && (o = o.trim()), r && (o = Ys(o)), t[xt](o);
            }),
                s &&
                    At(t, "change", () => {
                        t.value = t.value.trim();
                    }),
                e || (At(t, "compositionstart", Rd), At(t, "compositionend", Qn), At(t, "change", Qn));
        },
        mounted(t, { value: e }) {
            t.value = e ?? "";
        },
        beforeUpdate(t, { value: e, oldValue: s, modifiers: { lazy: i, trim: n, number: r } }, a) {
            if (((t[xt] = is(a)), t.composing)) return;
            const o = (r || t.type === "number") && !/^0\d/.test(t.value) ? Ys(t.value) : t.value,
                l = e ?? "";
            o !== l &&
                ((document.activeElement === t &&
                    t.type !== "range" &&
                    ((i && e === s) || (n && t.value.trim() === l))) ||
                    (t.value = l));
        },
    },
    Bd = {
        deep: !0,
        created(t, e, s) {
            (t[xt] = is(s)),
                At(t, "change", () => {
                    const i = t._modelValue,
                        n = Ms(t),
                        r = t.checked,
                        a = t[xt];
                    if (re(i)) {
                        const o = sn(i, n),
                            l = o !== -1;
                        if (r && !l) a(i.concat(n));
                        else if (!r && l) {
                            const c = [...i];
                            c.splice(o, 1), a(c);
                        }
                    } else if (rs(i)) {
                        const o = new Set(i);
                        r ? o.add(n) : o.delete(n), a(o);
                    } else a(wa(t, r));
                });
        },
        mounted: er,
        beforeUpdate(t, e, s) {
            (t[xt] = is(s)), er(t, e, s);
        },
    };
function er(t, { value: e, oldValue: s }, i) {
    t._modelValue = e;
    let n;
    if (re(e)) n = sn(e, i.props.value) > -1;
    else if (rs(e)) n = e.has(i.props.value);
    else {
        if (e === s) return;
        n = Is(e, wa(t, !0));
    }
    t.checked !== n && (t.checked = n);
}
const Vd = {
    deep: !0,
    created(t, { value: e, modifiers: { number: s } }, i) {
        const n = rs(e);
        At(t, "change", () => {
            const r = Array.prototype.filter.call(t.options, (a) => a.selected).map((a) => (s ? Ys(Ms(a)) : Ms(a)));
            t[xt](t.multiple ? (n ? new Set(r) : r) : r[0]),
                (t._assigning = !0),
                Fr(() => {
                    t._assigning = !1;
                });
        }),
            (t[xt] = is(i));
    },
    mounted(t, { value: e }) {
        tr(t, e);
    },
    beforeUpdate(t, e, s) {
        t[xt] = is(s);
    },
    updated(t, { value: e }) {
        t._assigning || tr(t, e);
    },
};
function tr(t, e) {
    const s = t.multiple,
        i = re(e);
    if (!(s && !i && !rs(e))) {
        for (let n = 0, r = t.options.length; n < r; n++) {
            const a = t.options[n],
                o = Ms(a);
            if (s)
                if (i) {
                    const l = typeof o;
                    l === "string" || l === "number"
                        ? (a.selected = e.some((c) => String(c) === String(o)))
                        : (a.selected = sn(e, o) > -1);
                } else a.selected = e.has(o);
            else if (Is(Ms(a), e)) {
                t.selectedIndex !== n && (t.selectedIndex = n);
                return;
            }
        }
        !s && t.selectedIndex !== -1 && (t.selectedIndex = -1);
    }
}
function Ms(t) {
    return "_value" in t ? t._value : t.value;
}
function wa(t, e) {
    const s = e ? "_trueValue" : "_falseValue";
    return s in t ? t[s] : e;
}
const Nd = ["ctrl", "shift", "alt", "meta"],
    qd = {
        stop: (t) => t.stopPropagation(),
        prevent: (t) => t.preventDefault(),
        self: (t) => t.target !== t.currentTarget,
        ctrl: (t) => !t.ctrlKey,
        shift: (t) => !t.shiftKey,
        alt: (t) => !t.altKey,
        meta: (t) => !t.metaKey,
        left: (t) => "button" in t && t.button !== 0,
        middle: (t) => "button" in t && t.button !== 1,
        right: (t) => "button" in t && t.button !== 2,
        exact: (t, e) => Nd.some((s) => t[`${s}Key`] && !e.includes(s)),
    },
    js = (t, e) => {
        const s = t._withMods || (t._withMods = {}),
            i = e.join(".");
        return (
            s[i] ||
            (s[i] = (n, ...r) => {
                for (let a = 0; a < e.length; a++) {
                    const o = qd[e[a]];
                    if (o && o(n, e)) return;
                }
                return t(n, ...r);
            })
        );
    },
    jd = Ve({ patchProp: zd }, Sd);
let sr;
function Gd() {
    return sr || (sr = jc(jd));
}
const Wd = (...t) => {
    const e = Gd().createApp(...t),
        { mount: s } = e;
    return (
        (e.mount = (i) => {
            const n = Xd(i);
            if (!n) return;
            const r = e._component;
            !de(r) && !r.render && !r.template && (r.template = n.innerHTML), n.nodeType === 1 && (n.textContent = "");
            const a = s(n, !1, Yd(n));
            return n instanceof Element && (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")), a;
        }),
        e
    );
};
function Yd(t) {
    if (t instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && t instanceof MathMLElement) return "mathml";
}
function Xd(t) {
    return Le(t) ? document.querySelector(t) : t;
}
const Qt = (t, e) => {
        typeof t == "string" && (t = t.replace(".", ""));
        const s = e || "amount",
            i = `\${{${s}}}`;
        function n(o, l) {
            return typeof o > "u" ? l : o;
        }
        function r(o, l, c, d) {
            if (((l = n(l, 2)), (c = n(c, ",")), (d = n(d, ".")), isNaN(o) || o == null)) return "0";
            o = (o / 100).toFixed(l);
            const p = o.split("."),
                g = p[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + c),
                m = p[1] ? d + p[1] : "";
            return g + m;
        }
        let a = "";
        switch (s) {
            case "amount":
                a = r(t, 2);
                break;
            case "amount_no_decimals":
                a = r(t, 0);
                break;
            case "amount_with_comma_separator":
                a = r(t, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                a = r(t, 0, ".", ",");
                break;
            default:
                a = r(t, 2);
        }
        return i.replace(/\{\{\s*(\w+)\s*\}\}/, a);
    },
    Ht = (t, e) => {
        const s = t.__vccOpts || t;
        for (const [i, n] of e) s[i] = n;
        return s;
    },
    Ud = {},
    Kd = { width: "24", height: "24", viewBox: "0 0 26 26", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
function Zd(t, e) {
    return (
        ee(),
        ie(
            "svg",
            Kd,
            e[0] ||
                (e[0] = [
                    z(
                        "path",
                        {
                            d: "M24.7389 3.24588C25.2427 3.74968 25.2427 4.5665 24.7388 5.07026L17.3573 12.451C16.8535 12.9548 16.8535 13.7716 17.3573 14.2754L24.0103 20.9284C24.5141 21.4323 24.5141 22.2491 24.0102 22.7529L22.0193 24.7432C21.5155 25.2469 20.6988 25.2468 20.1951 24.7431L13.5428 18.0908C13.039 17.587 12.2222 17.5871 11.7184 18.0909L5.19986 24.6102C4.69614 25.114 3.87941 25.1141 3.37559 24.6104L1.38479 22.6201C0.880899 22.1163 0.880847 21.2994 1.38467 20.7956L7.90397 14.2763C8.40774 13.7725 8.40774 12.9558 7.90397 12.452L0.655176 5.20319C0.151354 4.69937 0.151407 3.8825 0.655293 3.37874L2.64615 1.38839C3.14995 0.884723 3.96664 0.884776 4.47037 1.38851L11.7185 8.6366C12.2222 9.14036 13.039 9.14038 13.5428 8.63665L20.9245 1.25571C21.4283 0.751982 22.245 0.752005 22.7488 1.25576L24.7389 3.24588Z",
                            fill: "#1A1B1C",
                        },
                        null,
                        -1
                    ),
                ])
        )
    );
}
const ir = Ht(Ud, [["render", Zd]]),
    Jd = {},
    Qd = { width: "41", height: "30", viewBox: "0 0 41 30", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
function eu(t, e) {
    return (
        ee(),
        ie(
            "svg",
            Qd,
            e[0] ||
                (e[0] = [
                    z(
                        "path",
                        {
                            d: "M20.7188 2.25C26.0239 2.25009 30.7631 3.76955 34.1367 6.14941C37.5144 8.53223 39.418 11.6835 39.418 15C39.418 18.3165 37.5144 21.4678 34.1367 23.8506C30.7631 26.2305 26.0239 27.7499 20.7188 27.75C15.4134 27.75 10.6735 26.2305 7.2998 23.8506C3.92211 21.4678 2.01855 18.3165 2.01855 15C2.01855 11.6835 3.92211 8.53223 7.2998 6.14941C10.6735 3.76948 15.4134 2.25 20.7188 2.25Z",
                            stroke: "#1A1B1C",
                            "stroke-width": "3",
                        },
                        null,
                        -1
                    ),
                ])
        )
    );
}
const tu = Ht(Jd, [["render", eu]]),
    su = {},
    iu = { width: "12", height: "13", viewBox: "0 0 12 13", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
function nu(t, e) {
    return (
        ee(),
        ie(
            "svg",
            iu,
            e[0] ||
                (e[0] = [
                    z(
                        "path",
                        {
                            d: "M10.6035 5.38867C10.6035 5.11253 10.3797 4.88867 10.1035 4.88867H1.10352C0.827373 4.88867 0.603516 5.11253 0.603516 5.38867V7.22575C0.603516 7.50189 0.827373 7.72575 1.10352 7.72575H10.1035C10.3797 7.72575 10.6035 7.50189 10.6035 7.22575V5.38867Z",
                            fill: "black",
                        },
                        null,
                        -1
                    ),
                ])
        )
    );
}
const ru = Ht(su, [["render", nu]]),
    au = {},
    ou = { width: "12", height: "13", viewBox: "0 0 12 13", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
function lu(t, e) {
    return (
        ee(),
        ie(
            "svg",
            ou,
            e[0] ||
                (e[0] = [
                    z(
                        "path",
                        {
                            d: "M10.5814 5.95349C10.5814 5.67735 10.3575 5.45349 10.0814 5.45349H7.40698C7.13083 5.45349 6.90698 5.22963 6.90698 4.95349V2C6.90698 1.72386 6.68312 1.5 6.40698 1.5H5.22093C4.94479 1.5 4.72093 1.72386 4.72093 2V4.95349C4.72093 5.22963 4.49707 5.45349 4.22093 5.45349H1.5C1.22386 5.45349 1 5.67735 1 5.95349V7.09302C1 7.36917 1.22386 7.59302 1.5 7.59302H4.22093C4.49707 7.59302 4.72093 7.81688 4.72093 8.09302V11C4.72093 11.2761 4.94479 11.5 5.22093 11.5H6.40698C6.68312 11.5 6.90698 11.2761 6.90698 11V8.09302C6.90698 7.81688 7.13083 7.59302 7.40698 7.59302H10.0814C10.3575 7.59302 10.5814 7.36917 10.5814 7.09302V5.95349Z",
                            fill: "black",
                        },
                        null,
                        -1
                    ),
                ])
        )
    );
}
const cu = Ht(au, [["render", lu]]),
    du = {},
    uu = {
        class: "animate-spin -ml-1 mr-3 h-5 w-5 text-black-300",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
    };
function fu(t, e) {
    return (
        ee(),
        ie(
            "svg",
            uu,
            e[0] ||
                (e[0] = [
                    z(
                        "circle",
                        {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4",
                        },
                        null,
                        -1
                    ),
                    z(
                        "path",
                        {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                        },
                        null,
                        -1
                    ),
                ])
        )
    );
}
const pu = Ht(du, [["render", fu]]),
    mu = { class: "mini-cart__item" },
    hu = ["data-free-sample"],
    gu = { class: "mini-cart__item-fig mb-auto" },
    vu = ["href", "aria-label"],
    wu = ["src", "alt", "width", "height"],
    yu = { class: "flex flex-col gap-2 md:gap-4 items-center flex-1" },
    bu = { class: "flex justify-between items-start w-full" },
    Su = { class: "flex flex-col justify-between" },
    xu = ["href", "aria-label"],
    Eu = { class: "mini-cart__item-title !capitalize h-5" },
    Tu = { key: 1, class: "mini-cart__item-title !capitalize h-5" },
    Cu = { key: 2, class: "mini-cart__item-options" },
    _u = { class: "eyebrow-2" },
    Mu = { key: 3, class: "packaging-label" },
    Pu = { class: "price_section" },
    Lu = { class: "mini-cart__item-price flex flex-1 justify-end md:pr-4" },
    Iu = { class: "mini-cart__item-total-price eyebrow-1 text-end" },
    Au = { key: 0, class: "block" },
    Ou = { class: "flex justify-between items-end md:items-center w-full" },
    $u = ["aria-label"],
    ku = { class: "sr-only" },
    Du = { key: 0, class: "mini-cart__item-form" },
    zu = ["disabled"],
    Hu = ["aria-label"],
    Ru = { class: "sr-only" },
    Fu = ["for"],
    Bu = ["id", "value"],
    Vu = ["disabled", "aria-label"],
    Nu = { class: "sr-only" },
    qu = { key: 0, class: "absolute top-4 -right-20" },
    ju = { key: 0 },
    Gu = ["id", "value"],
    Wu = { key: 0, value: "" },
    Yu = ["value"],
    Xu = {
        name: "CartItem",
        props: {
            item: { type: Object, required: !0 },
            updateCartValues: { type: Function, required: !0 },
            currencySymbol: { type: String, required: !0, default: window.miniCartCustomSettings.currencySymbol },
            refreshRecommendedProducts: { type: Function, required: !0 },
        },
        data() {
            return { loading: !1, selectedSellingPlan: this.item.selling_plan_allocation?.selling_plan?.id };
        },
        watch: {
            "item.selling_plan_allocation": {
                immediate: !0,
                handler(t) {
                    this.selectedSellingPlan = t?.selling_plan?.id || "";
                },
            },
        },
        computed: {
            isFreeSample() {
                return this.item.price === 0 || this.item.product_title.toLowerCase().includes("free");
            },
        },
        methods: {
            updateCart(t) {
                this.loading ||
                    t === this.item.quantity ||
                    t < 0 ||
                    ((this.loading = !0),
                    fetch(Shopify.routes.root + "cart/change.js", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: this.item.key, quantity: t }),
                    })
                        .then((e) => (e.ok ? e.json() : Promise.reject(e)))
                        .then((e) => {
                            this.updateCartValues(e),
                                getCart(),
                                document.dispatchEvent(new CustomEvent("cart:updated", { detail: e })),
                                t === 0 && (this.refreshRecommendedProducts(), this.$emit("sample-removed", this.item));
                        })
                        .catch((e) => {
                            (this.loading = !1),
                                e.text().then((s) => {
                                    console.error("API Error:", s),
                                        this.$emit("error", `Failed to update the cart: ${s}`);
                                });
                        })
                        .finally(() => {
                            this.loading = !1;
                        }));
            },
            updateSellingPlan(t, e) {
                if (this.loading || e === t.selling_plan_allocation?.selling_plan?.id) return;
                this.loading = !0;
                const s = JSON.stringify({ id: t.key, quantity: t.quantity, selling_plan: e || null });
                fetch(Shopify.routes.root + "cart/change.js", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: s,
                })
                    .then((i) => (i.ok ? i.json() : Promise.reject(new Error("Failed to update cart."))))
                    .then((i) => {
                        this.updateCartValues(i), getCart(), (this.loading = !1);
                    })
                    .catch((i) => {
                        (this.loading = !1), alert(i.message);
                    });
            },
            extractId(t) {
                return t?.split("/").pop() || null;
            },
        },
    },
    Uu = Object.assign(Xu, {
        setup(t) {
            const e = le([]),
                s = (n) =>
                    n.options_with_values?.[0]?.name !== "Title" &&
                    n.options_with_values?.[0]?.value !== "Default Title",
                i = (n) => {
                    if (!n) return "/placeholder.jpg";
                    const r = n.split("?"),
                        a = r[0],
                        o = r[1] ? "?" + r[1] : "",
                        l = a.lastIndexOf(".");
                    return l === -1 ? n : a.slice(0, l) + "_240x_crop_center" + a.slice(l) + o;
                };
            return (
                ci(async () => {
                    const n = window.miniCartCustomSettings.storeFrontUrl
                            ? window.miniCartCustomSettings.storeFrontUrl
                            : "",
                        r = window.miniCartCustomSettings.storeFrontToken
                            ? window.miniCartCustomSettings.storeFrontToken
                            : "";
                    if (n != "" && r != "") {
                        const o = {
                            query: `
      {
        products(first: 10) {
          edges {
            node {
              id
              title
              sellingPlanGroups(first: 5) {
                edges {
                  node {
                    name
                    options {
                      name
                      values
                    }
                    sellingPlans(first: 5) {
                      edges {
                        node {
                          id
                          name
                          description
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
                        };
                        try {
                            const l = await fetch(n, {
                                method: "POST",
                                headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": r },
                                body: JSON.stringify(o),
                            });
                            if (!l.ok) throw new Error(`HTTP error! status: ${l.status}`);
                            const c = await l.json();
                            e.value = c.data.products.edges.map((d) => d.node);
                        } catch (l) {
                            console.error("Error fetching Shopify data:", l);
                        }
                    }
                }),
                (n, r) => {
                    const a = _c("quantity-input");
                    return (
                        ee(),
                        ie("div", mu, [
                            z(
                                "div",
                                {
                                    class: Nt([
                                        "flex gap-5 items-center py-2",
                                        n.isFreeSample ? "mini-cart__item--free-sample order-1" : "order-2",
                                    ]),
                                    "data-free-sample": n.isFreeSample,
                                },
                                [
                                    z("figure", gu, [
                                        z(
                                            "a",
                                            { href: n.isFreeSample ? "#" : t.item.url, "aria-label": t.item.title },
                                            [
                                                z(
                                                    "img",
                                                    {
                                                        src: i(t.item.featured_image?.url),
                                                        alt: t.item.featured_image?.title,
                                                        width: t.item.featured_image?.width,
                                                        height: t.item.featured_image?.height,
                                                        class: "block object-contain mini-cart__item-img h-full w-full aspect-[0.705]",
                                                        loading: "lazy",
                                                    },
                                                    null,
                                                    8,
                                                    wu
                                                ),
                                            ],
                                            8,
                                            vu
                                        ),
                                    ]),
                                    z("div", yu, [
                                        z("div", bu, [
                                            z("div", Su, [
                                                n.isFreeSample
                                                    ? (ee(), ie("h3", Tu, ce(t.item.product_title), 1))
                                                    : (ee(),
                                                      ie(
                                                          "a",
                                                          { key: 0, href: t.item.url, "aria-label": t.item.title },
                                                          [z("h3", Eu, ce(t.item.product_title), 1)],
                                                          8,
                                                          xu
                                                      )),
                                                s
                                                    ? (ee(),
                                                      ie("ul", Cu, [
                                                          (ee(!0),
                                                          ie(
                                                              Oe,
                                                              null,
                                                              $t(
                                                                  t.item.options_with_values.filter(
                                                                      (o) => o.value !== "Default Title"
                                                                  ),
                                                                  (o) => (
                                                                      ee(),
                                                                      ie(
                                                                          "li",
                                                                          {
                                                                              key: o.name,
                                                                              class: "mini-cart__item-option eyebrow-1 opacity-60",
                                                                          },
                                                                          ce(o.value),
                                                                          1
                                                                      )
                                                                  )
                                                              ),
                                                              128
                                                          )),
                                                      ]))
                                                    : Ee("", !0),
                                                z(
                                                    "div",
                                                    _u,
                                                    ce(
                                                        t.item.selling_plan_allocation
                                                            ? t.item.selling_plan_allocation.selling_plan.name
                                                            : ""
                                                    ),
                                                    1
                                                ),
                                                t.item.properties._shipping_charges
                                                    ? (ee(),
                                                      ie(
                                                          "div",
                                                          Mu,
                                                          ce(t.item.properties._shipping_charges) + " Charges ",
                                                          1
                                                      ))
                                                    : Ee("", !0),
                                            ]),
                                            z("div", Pu, [
                                                z("div", Lu, [
                                                    z("span", Iu, [
                                                        Cs(ce(tt(Qt)(t.item.price * t.item.quantity)) + " ", 1),
                                                        t.item.properties.compare_at_price &&
                                                        t.item.price < t.item.properties.compare_at_price
                                                            ? (ee(),
                                                              ie(
                                                                  "s",
                                                                  Au,
                                                                  ce(
                                                                      tt(Qt)(
                                                                          t.item.properties.compare_at_price *
                                                                              t.item.quantity
                                                                      )
                                                                  ),
                                                                  1
                                                              ))
                                                            : Ee("", !0),
                                                    ]),
                                                ]),
                                            ]),
                                        ]),
                                        z("div", Ou, [
                                            z(
                                                "button",
                                                {
                                                    type: "button",
                                                    onClick: r[0] || (r[0] = (o) => n.updateCart(0)),
                                                    "aria-label": `Delete ${t.item.title}`,
                                                    class: "delete_btn underline eyebrow-2 opacity-40 cursor-pointer",
                                                },
                                                [
                                                    r[6] || (r[6] = z("span", { class: "sr-only" }, "Click to", -1)),
                                                    r[7] || (r[7] = Cs(" REMOVE ")),
                                                    z("span", ku, ce(t.item.title) + " from the cart", 1),
                                                ],
                                                8,
                                                $u
                                            ),
                                            n.isFreeSample
                                                ? Ee("", !0)
                                                : (ee(),
                                                  ie("form", Du, [
                                                      z(
                                                          "fieldset",
                                                          { disabled: n.loading },
                                                          [
                                                              Pe(
                                                                  a,
                                                                  { class: "quantity !py-1.5 md:!py-4" },
                                                                  {
                                                                      default: jr(() => [
                                                                          z(
                                                                              "button",
                                                                              {
                                                                                  type: "button",
                                                                                  "aria-label": `Remove 1 ${t.item.title}`,
                                                                                  onClick:
                                                                                      r[1] ||
                                                                                      (r[1] = (o) =>
                                                                                          n.updateCart(
                                                                                              t.item.quantity - 1
                                                                                          )),
                                                                                  class: "cart__decrement_btn quantity__button",
                                                                              },
                                                                              [
                                                                                  Pe(ru),
                                                                                  z(
                                                                                      "span",
                                                                                      Ru,
                                                                                      "Remove 1 " + ce(t.item.title),
                                                                                      1
                                                                                  ),
                                                                              ],
                                                                              8,
                                                                              Hu
                                                                          ),
                                                                          z(
                                                                              "label",
                                                                              {
                                                                                  class: "sr-only",
                                                                                  for: `qty-${t.item.id}`,
                                                                              },
                                                                              "Quantity of " + ce(t.item.title),
                                                                              9,
                                                                              Fu
                                                                          ),
                                                                          z(
                                                                              "input",
                                                                              {
                                                                                  id: `qty-${t.item.id}`,
                                                                                  onBlur:
                                                                                      r[2] ||
                                                                                      (r[2] = (o) =>
                                                                                          n.updateCart(
                                                                                              Number(o.target.value)
                                                                                          )),
                                                                                  class: "quantity__input",
                                                                                  type: "number",
                                                                                  value: t.item.quantity,
                                                                                  min: "1",
                                                                                  disabled: "",
                                                                              },
                                                                              null,
                                                                              40,
                                                                              Bu
                                                                          ),
                                                                          z(
                                                                              "button",
                                                                              {
                                                                                  type: "button",
                                                                                  disabled: n.isFreeSample,
                                                                                  "aria-label": `Add 1 more ${t.item.title}`,
                                                                                  onClick:
                                                                                      r[3] ||
                                                                                      (r[3] = (o) =>
                                                                                          n.updateCart(
                                                                                              t.item.quantity + 1
                                                                                          )),
                                                                                  class: "mini-cart__increment_btn quantity__button",
                                                                              },
                                                                              [
                                                                                  Pe(cu),
                                                                                  z(
                                                                                      "span",
                                                                                      Nu,
                                                                                      "Add 1 more " + ce(t.item.title),
                                                                                      1
                                                                                  ),
                                                                              ],
                                                                              8,
                                                                              Vu
                                                                          ),
                                                                          n.loading
                                                                              ? (ee(), ie("span", qu, [Pe(pu)]))
                                                                              : Ee("", !0),
                                                                      ]),
                                                                      _: 1,
                                                                  }
                                                              ),
                                                          ],
                                                          8,
                                                          zu
                                                      ),
                                                  ])),
                                        ]),
                                    ]),
                                ],
                                10,
                                hu
                            ),
                            t.item.properties.selling_plan == !1
                                ? (ee(),
                                  ie("div", ju, [
                                      (ee(!0),
                                      ie(
                                          Oe,
                                          null,
                                          $t(
                                              e.value.filter((o) => t.item.product_id == n.extractId(o.id)),
                                              (o) => (
                                                  ee(),
                                                  ie("div", { key: o.id }, [
                                                      (ee(!0),
                                                      ie(
                                                          Oe,
                                                          null,
                                                          $t(
                                                              o.sellingPlanGroups.edges,
                                                              (l) => (
                                                                  ee(),
                                                                  ie("div", { key: l.node.name }, [
                                                                      Fi(
                                                                          z(
                                                                              "select",
                                                                              {
                                                                                  id:
                                                                                      "selling-plan-" +
                                                                                      n.extractId(o.id),
                                                                                  value: t.item.selling_plan_allocation
                                                                                      ?.selling_plan?.id,
                                                                                  "onUpdate:modelValue":
                                                                                      r[4] ||
                                                                                      (r[4] = (c) =>
                                                                                          (n.selectedSellingPlan = c)),
                                                                                  onChange:
                                                                                      r[5] ||
                                                                                      (r[5] = (c) =>
                                                                                          n.updateSellingPlan(
                                                                                              t.item,
                                                                                              n.selectedSellingPlan
                                                                                          )),
                                                                              },
                                                                              [
                                                                                  o.selling_plan_allocation
                                                                                      ? Ee("", !0)
                                                                                      : (ee(),
                                                                                        ie(
                                                                                            "option",
                                                                                            Wu,
                                                                                            "One Time Purchase"
                                                                                        )),
                                                                                  (ee(!0),
                                                                                  ie(
                                                                                      Oe,
                                                                                      null,
                                                                                      $t(
                                                                                          l.node?.sellingPlans?.edges,
                                                                                          (c) => (
                                                                                              ee(),
                                                                                              ie(
                                                                                                  "option",
                                                                                                  {
                                                                                                      key: c.node.name,
                                                                                                      value: n.extractId(
                                                                                                          c.node.id
                                                                                                      ),
                                                                                                  },
                                                                                                  ce(c.node.name),
                                                                                                  9,
                                                                                                  Yu
                                                                                              )
                                                                                          )
                                                                                      ),
                                                                                      128
                                                                                  )),
                                                                              ],
                                                                              40,
                                                                              Gu
                                                                          ),
                                                                          [[Vd, n.selectedSellingPlan]]
                                                                      ),
                                                                  ])
                                                              )
                                                          ),
                                                          128
                                                      )),
                                                  ])
                                              )
                                          ),
                                          128
                                      )),
                                  ]))
                                : Ee("", !0),
                        ])
                    );
                }
            );
        },
    }),
    Ku = (t, e) => {
        let s;
        return (...i) => {
            clearTimeout(s), (s = setTimeout(() => t(...i), e));
        };
    },
    Zu = {
        name: "FreeSample",
        props: {
            cartTotal: { type: Number, required: !0 },
            cartCount: { type: Number, required: !0 },
            freeSampleRef: { type: Object, default: () => ({}) },
            currencySymbol: {
                type: String,
                required: !0,
                default: () => window.miniCartCustomSettings?.currencySymbol || "$",
            },
        },
        setup(t, { emit: e }) {
            const s = le({ active: !1, heading: "", description: "", tiers: [] }),
                i = le([]),
                n = le([]),
                r = le(!0),
                a = le(null),
                o = st(() => {
                    if (!s.value.tiers?.length) return null;
                    const y = t.cartTotal / 100;
                    return (
                        s.value.tiers
                            .sort((L, P) => P.minimum_price - L.minimum_price)
                            .find((L) =>
                                y >= L.minimum_price
                                    ? i.value.filter((A) => L.products.some((_) => _.id === A)).length < L.quantity
                                    : !1
                            ) || null
                    );
                }),
                l = st(() => {
                    if (!o.value) return "";
                    const y = o.value.quantity,
                        E = d.value;
                    return `You may choose ${y} Free Samples (${y - E} left)`;
                }),
                c = st(() => o.value?.products.filter((y) => !i.value.includes(y.id)) || []),
                d = st(() => (o.value ? i.value.filter((y) => o.value.products.some((E) => E.id === y)).length : 0)),
                p = st(() => (o.value ? d.value < o.value.quantity : !1)),
                g = (y) => i.value.includes(y),
                m = (y) => s.value.tiers.some((E) => E.products.some((L) => L.id === y)),
                u = async () => {
                    try {
                        const y = await fetch(`${Shopify.routes.root}cart.js`);
                        if (!y.ok) throw new Error("Failed to fetch cart");
                        const E = await y.json();
                        (n.value = E.items),
                            (i.value = E.items.filter((L) => m(L.product_id || L.id)).map((L) => L.product_id || L.id)),
                            e("cart-updated", E);
                    } catch (y) {
                        console.error("Error fetching cart:", y);
                    }
                },
                f = async (y) => {
                    try {
                        if (
                            !(
                                await fetch(`${Shopify.routes.root}cart/change.js`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ id: y, quantity: 0 }),
                                })
                            ).ok
                        )
                            throw new Error("Failed to remove item");
                        await u();
                    } catch (E) {
                        console.error("Error removing item:", E);
                    }
                },
                w = (y) => {
                    if (s.value?.tiers) {
                        for (const E of s.value.tiers)
                            if (E.products.find((P) => P.id === y)) {
                                i.value = i.value.filter((P) => P !== y);
                                break;
                            }
                    }
                },
                b = async (y) => {
                    if (!p.value) {
                        console.warn("Cannot add more samples; tier limit reached");
                        return;
                    }
                    const E = y.variants.find((L) => L.available)?.id;
                    if (!E) {
                        console.error("No available variant for product:", y.title);
                        return;
                    }
                    try {
                        if (
                            ((a.value = y.id),
                            !(
                                await fetch(`${Shopify.routes.root}cart/add.js`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-Requested-With": "XMLHttpRequest",
                                    },
                                    body: JSON.stringify({ id: E, quantity: 1, properties: { _sample: !0 } }),
                                })
                            ).ok)
                        )
                            throw new Error("Failed to add to cart");
                        await u(),
                            setTimeout(() => {
                                a.value = null;
                            }, 500);
                    } catch (L) {
                        console.error("Error adding to cart:", L), (a.value = null);
                    }
                },
                h = async (y) => {
                    if (!s.value?.tiers) return;
                    const E = y / 100;
                    for (const L of s.value.tiers)
                        if (E < L.minimum_price) {
                            const P = L.products.map((A) => A.id);
                            for (const A of i.value)
                                if (A !== a.value && P.includes(A)) {
                                    const _ = n.value.find((M) => (M.product_id || M.id) === A);
                                    _ && (await f(_.key));
                                }
                        }
                },
                v = Ku(async (y, E) => {
                    if (r.value || y === E) return;
                    await h(y);
                    const L = s.value.tiers
                        .filter((P) => y >= P.minimum_price * 100)
                        .flatMap((P) => P.products.map((A) => A.id));
                    for (const P of i.value)
                        if (P !== a.value && !L.includes(P)) {
                            const A = n.value.find((_) => (_.product_id || _.id) === P);
                            A && (await f(A.key));
                        }
                }, 100);
            return (
                ws(
                    () => [t.cartTotal, i.value],
                    ([y], [E]) => {
                        v(y, E);
                    },
                    { immediate: !1 }
                ),
                ci(async () => {
                    (s.value = window.freeSamples || { active: !1, heading: "", description: "", tiers: [] }),
                        await u(),
                        (r.value = !1);
                }),
                {
                    freeSamples: s,
                    addedSamples: i,
                    cartItems: n,
                    eligibleTier: o,
                    addedFromEligibleTier: d,
                    canAddMoreSamples: p,
                    tierMessage: l,
                    eligibleTierProducts: c,
                    productAlreadyAdded: g,
                    getCartAndUpdateSamples: u,
                    removeFromCart: f,
                    notifySampleRemoved: w,
                    isFreeSample: m,
                    addToCart: b,
                }
            );
        },
    },
    Ju = { key: 0, class: "mini-cart__free-samples-container p-1 border-dashed border-4 m-1" },
    Qu = { class: "mini-cart__free-samples-title" },
    ef = { class: "" },
    tf = { key: 0 },
    sf = { key: 1 },
    nf = { key: 2, class: "message" },
    rf = { key: 0, class: "mini-cart__free-samples-inner relative overflow-x-auto whitespace-nowrap" },
    af = { class: "mini-cart__free-samples-fig" },
    of = ["src", "alt"],
    lf = { class: "mini-cart__free-samples-meta text-[0.875rem] flex-1 flex flex-col justify-between text-center" },
    cf = ["title"],
    df = { class: "mini-cart__meta-price text-[0.75rem] pb-1 leading-[1.25] hidden" },
    uf = { key: 0, class: "pl-1 inline-block line-through text-[#AE7273]" },
    ff = ["onSubmit"],
    pf = { key: 0, type: "submit", name: "add", class: "mini-cart__free-samples-add-btn mini-cart__button" },
    mf = { key: 1, class: "text-[0.75rem] leading-[1.25] mb-4 py-1 text-center" };
function hf(t, e, s, i, n, r) {
    return i.freeSamples.active && s.cartCount > 0
        ? (ee(),
          ie("section", Ju, [
              z("h2", Qu, ce(i.freeSamples.heading), 1),
              z("div", ef, [
                  !i.canAddMoreSamples && i.freeSamples.reachedLimitErrorMessage && i.addedSamples.length > 0
                      ? (ee(), ie("p", tf, ce(i.freeSamples.reachedLimitErrorMessage), 1))
                      : i.eligibleTier
                        ? Ee("", !0)
                        : (ee(), ie("p", sf, ce(i.freeSamples.description), 1)),
                  i.eligibleTier && s.cartTotal >= i.eligibleTier.minimum_price
                      ? (ee(), ie("div", nf, ce(i.tierMessage), 1))
                      : Ee("", !0),
              ]),
              i.eligibleTier && i.canAddMoreSamples
                  ? (ee(),
                    ie("div", rf, [
                        (ee(!0),
                        ie(
                            Oe,
                            null,
                            $t(
                                i.eligibleTierProducts,
                                (a) => (
                                    ee(),
                                    ie(
                                        "div",
                                        {
                                            key: a.id,
                                            class: "mini-cart__free-samples-item border inline-flex flex-col items-center gap-3 p-4 w-2/5",
                                        },
                                        [
                                            z("div", af, [
                                                z(
                                                    "img",
                                                    {
                                                        src: a.featured_image,
                                                        alt: a.title,
                                                        class: "h-10 w-10 border",
                                                        width: "40",
                                                        height: "40",
                                                        loading: "lazy",
                                                    },
                                                    null,
                                                    8,
                                                    of
                                                ),
                                            ]),
                                            z("div", lf, [
                                                z(
                                                    "h2",
                                                    {
                                                        class: "mini-cart__meta-title matter-regular text-[0.875rem] leading-[1.08] pb-2 text-wrap",
                                                        title: a.title,
                                                    },
                                                    ce(a.title),
                                                    9,
                                                    cf
                                                ),
                                                z("span", df, [
                                                    Cs(
                                                        ce(s.currencySymbol) +
                                                            " " +
                                                            ce((a.price / 100).toFixed(2)) +
                                                            " ",
                                                        1
                                                    ),
                                                    a.variants?.[0]?.compare_at_price > a.variants?.[0]?.price
                                                        ? (ee(),
                                                          ie(
                                                              "span",
                                                              uf,
                                                              ce(s.currencySymbol) +
                                                                  " " +
                                                                  ce((a.variants[0].compare_at_price / 100).toFixed(2)),
                                                              1
                                                          ))
                                                        : Ee("", !0),
                                                ]),
                                                z(
                                                    "form",
                                                    { onSubmit: js((o) => i.addToCart(a), ["prevent"]) },
                                                    [
                                                        i.productAlreadyAdded(a.id)
                                                            ? (ee(),
                                                              ie(
                                                                  "p",
                                                                  mf,
                                                                  " Product already added. Select a different free tier sample. "
                                                              ))
                                                            : (ee(), ie("button", pf, " Add ")),
                                                    ],
                                                    40,
                                                    ff
                                                ),
                                            ]),
                                        ]
                                    )
                                )
                            ),
                            128
                        )),
                    ]))
                  : Ee("", !0),
          ]))
        : Ee("", !0);
}
const gf = Ht(Zu, [["render", hf]]),
    vf = { key: 0, class: "mini-cart__totals mb-4" },
    wf = { class: "mini-cart__totals-list" },
    yf = { key: 0, class: "mini-cart__totals-item flex justify-between w-full mb-2" },
    bf = { class: "h-6" },
    Sf = { class: "mini-cart__totals-item flex justify-between w-full" },
    xf = { class: "h-6" },
    Ef = pc({
        __name: "mini-cart--totals",
        props: { data: {} },
        setup(t) {
            return (e, s) =>
                e.data?.item_count > 0
                    ? (ee(),
                      ie("div", vf, [
                          z("ul", wf, [
                              e.data?.total_discount
                                  ? (ee(),
                                    ie("li", yf, [
                                        s[0] || (s[0] = z("span", { class: "h-6" }, "Total discount:", -1)),
                                        z("span", bf, ce(tt(Qt)(e.data?.total_discount, "amount_no_decimals")), 1),
                                    ]))
                                  : Ee("", !0),
                              z("li", Sf, [
                                  s[1] || (s[1] = z("span", { class: "h-6" }, "Subtotal:", -1)),
                                  z(
                                      "span",
                                      xf,
                                      ce(
                                          e.data?.total_price % 100 === 0
                                              ? tt(Qt)(e.data?.total_price, "amount_no_decimals")
                                              : tt(Qt)(e.data?.total_price, "amount")
                                      ),
                                      1
                                  ),
                              ]),
                          ]),
                      ]))
                    : Ee("", !0);
        },
    }),
    Tf = {},
    Cf = { xmlns: "http://www.w3.org/2000/svg", width: "126", height: "30", viewBox: "0 0 126 30", fill: "none" };
function _f(t, e) {
    return (
        ee(),
        ie(
            "svg",
            Cf,
            e[0] ||
                (e[0] = [
                    od(
                        '<path d="M83.6843 1.46476L72.9556 24.0834C72.8206 24.3699 72.5317 24.5518 72.2149 24.5518H66.144C65.7441 24.5518 65.4009 24.2627 65.3354 23.8676L63.2171 11.2391L55.6878 24.553C53.5922 28.2921 51.1043 29.9533 47.6728 29.9533C46.7253 29.9533 45.8208 29.7967 45.0285 29.5544C44.6373 29.4357 44.39 29.0482 44.4532 28.6443L45.0045 25.0466C45.0803 24.5543 45.5736 24.2387 46.0492 24.3851C46.5879 24.5504 47.1228 24.6287 47.6085 24.6287C48.5572 24.6287 49.3433 24.0884 49.9248 23.0571C50.4559 22.1167 50.1039 21.4969 49.3281 21.4981C49.1149 21.4981 48.9155 21.4249 48.7578 21.2987C48.5988 21.1736 48.4816 20.997 48.4336 20.7886L45.8296 9.70403C45.7085 9.18902 46.0996 8.69546 46.6282 8.69546H51.7339C52.1086 8.69546 52.4354 8.94916 52.5287 9.31145L53.6213 13.5592C53.7626 14.1096 54.502 14.2067 54.782 13.7131L57.3783 9.11322C57.5234 8.85566 57.796 8.69533 58.0924 8.69533H62.7906L61.5416 1.24883C61.4584 0.747659 61.8432 0.291992 62.3503 0.291992H67.7512C68.1512 0.291992 68.4931 0.582347 68.5599 0.977424L70.3942 11.9144C70.4964 12.5242 71.3215 12.639 71.5865 12.0811L76.9549 0.761622C77.0898 0.475007 77.3788 0.291992 77.6955 0.291992H82.9438C83.5456 0.291992 83.9428 0.920575 83.6843 1.46476Z" fill="black"></path><path d="M52.4595 1.23786C52.5363 0.740677 52.1519 0.291992 51.6491 0.291992H50.6338C48.6555 0.297104 47.1885 0.876318 46.3638 2.38133C46.2573 2.57569 46.0805 2.68639 45.8719 2.68639C45.5352 2.68639 45.2778 2.38619 45.3289 2.05332L45.4541 1.23699C45.5304 0.740054 45.146 0.291992 44.6436 0.291992H39.9445C39.5397 0.291992 39.1955 0.587583 39.134 0.988021L36.1327 20.5523C36.0565 21.0492 36.4408 21.4973 36.9432 21.4973H41.6325C42.0372 21.4973 42.3813 21.2019 42.443 20.8017L44.2333 9.18441C44.423 7.95367 45.4813 7.04508 46.7259 7.04446L50.8604 7.04259C51.2649 7.04247 51.6088 6.74725 51.6704 6.34731L52.4595 1.23786Z" fill="black"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M28.1767 6.11328C33.8453 6.11328 36.5973 9.14424 35.8752 13.8509C35.6782 15.1346 34.2844 19.2844 26.57 19.3043L25.2261 19.3068C24.6623 19.3083 24.3882 20.0208 24.8146 20.393C25.2441 20.7269 26.2431 20.9774 27.0379 20.9752C29.4445 20.9752 31.5681 20.5398 33.5049 19.5971C34.0539 19.33 34.6765 19.7883 34.5839 20.392L34.1498 23.2238C34.0286 24.0148 33.5436 24.7093 32.8319 25.0749C30.8875 26.0736 28.8118 26.5374 26.1972 26.5374C20.9154 26.5374 16.5081 23.3362 17.706 15.5283C18.5674 9.91358 22.8854 6.12749 28.1766 6.11328H28.1767ZM28.1555 11.4567C27.2838 11.4567 25.8422 11.8694 25.61 13.4064C25.5473 13.8211 25.8591 14.2496 26.2949 14.2491L27.1991 14.2471C28.6584 14.2471 29.7415 13.8193 29.8878 12.8758C30.0005 12.1488 29.4303 11.4567 28.1555 11.4567Z" fill="black"></path><path d="M22.6562 1.46438L11.9274 24.083C11.7915 24.3693 11.5032 24.5518 11.1865 24.5518H5.11559C4.71501 24.5518 4.37312 24.2623 4.30683 23.8671L0.51345 1.24833C0.429596 0.747908 0.815101 0.291992 1.32221 0.291992H6.72291C7.12349 0.291992 7.46538 0.581474 7.53167 0.976676L9.36587 11.914C9.46804 12.5231 10.2933 12.6381 10.5579 12.0802L15.9262 0.760749C16.062 0.474508 16.3505 0.291992 16.6672 0.291992H21.9155C22.5178 0.291992 22.9145 0.919952 22.6563 1.46438H22.6562Z" fill="black"></path><path d="M124.279 8.69629C124.907 8.69629 125.302 9.37387 124.992 9.92092L116.718 24.553C114.622 28.2928 112.134 29.9532 108.703 29.9532C107.755 29.9532 106.85 29.7977 106.058 29.5553C105.666 29.4355 105.42 29.0491 105.482 28.6441L106.034 25.0468C106.11 24.5549 106.603 24.2396 107.079 24.3858C107.617 24.5514 108.152 24.6295 108.638 24.6295C109.587 24.6295 110.373 24.0886 110.955 23.058C111.486 22.1173 111.134 21.4971 110.358 21.4983C109.931 21.4983 109.56 21.2045 109.463 20.7886L106.859 9.70449C106.738 9.18948 107.129 8.69629 107.657 8.69629H112.764C113.138 8.69629 113.464 8.94974 113.558 9.31228L114.651 13.56C114.792 14.1103 115.532 14.2078 115.811 13.7131L118.408 9.11331C118.553 8.85562 118.826 8.69629 119.122 8.69629H124.279Z" fill="black"></path><path d="M113.491 1.23786C113.568 0.740677 113.183 0.291992 112.68 0.291992H111.665C109.687 0.297104 108.22 0.876318 107.395 2.38133C107.289 2.57569 107.112 2.68639 106.903 2.68639C106.566 2.68639 106.309 2.38619 106.36 2.05332L106.485 1.23699C106.562 0.740054 106.177 0.291992 105.675 0.291992H100.976C100.571 0.291992 100.227 0.587583 100.165 0.988021L97.164 20.5523C97.0877 21.0492 97.4721 21.4973 97.9745 21.4973H102.664C103.068 21.4973 103.413 21.2019 103.474 20.8017L105.265 9.18441C105.454 7.95367 106.513 7.04508 107.757 7.04446L111.892 7.04259C112.296 7.04247 112.64 6.74725 112.702 6.34731L113.491 1.23786Z" fill="black"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M89.2041 6.11328C94.8726 6.11328 97.6246 9.14424 96.9026 13.8509C96.7056 15.1346 95.3117 19.2844 87.5974 19.3043L86.2535 19.3068C85.6897 19.3083 85.4155 20.0208 85.8419 20.393C86.2714 20.7269 87.2704 20.9774 88.0652 20.9752C90.4718 20.9752 92.5955 20.5398 94.5322 19.5971C95.0812 19.33 95.7038 19.7883 95.6113 20.392L95.1772 23.2238C95.0559 24.0148 94.571 24.7093 93.8593 25.0749C91.9148 26.0736 89.8391 26.5374 87.2246 26.5374C81.9428 26.5374 77.5355 23.3362 78.7334 15.5283C79.5947 9.91358 83.9129 6.12749 89.2041 6.11328ZM89.1829 11.4567C88.3112 11.4567 86.8696 11.8694 86.6374 13.4064C86.5747 13.8211 86.8864 14.2496 87.3223 14.2491L88.2265 14.2471C89.6858 14.2471 90.7689 13.8193 90.9152 12.8758C91.0278 12.1488 90.4576 11.4567 89.1829 11.4567Z" fill="black"></path>',
                        7
                    ),
                ])
        )
    );
}
const Mf = Ht(Tf, [["render", _f]]),
    Pf = {
        name: "IconNotchedCorner",
        props: {
            fill: { type: String, default: "#FFFFFF" },
            stroke: { type: String, default: "#000000" },
            strokeWidth: { type: [String, Number], default: 1 },
        },
    },
    Lf = {
        class: "notched-corner-svg",
        xmlns: "http://www.w3.org/2000/svg",
        width: "50",
        height: "50",
        viewBox: "0 0 70 70",
        fill: "none",
    },
    If = ["fill"],
    Af = ["stroke", "stroke-width"],
    Of = {
        class: "notched-corner-svg",
        xmlns: "http://www.w3.org/2000/svg",
        width: "50",
        height: "50",
        viewBox: "0 0 70 70",
        fill: "none",
    },
    $f = ["fill"],
    kf = ["stroke", "stroke-width"],
    Df = {
        class: "notched-corner-svg",
        xmlns: "http://www.w3.org/2000/svg",
        width: "50",
        height: "50",
        viewBox: "0 0 70 70",
        fill: "none",
    },
    zf = ["fill"],
    Hf = ["stroke", "stroke-width"],
    Rf = {
        class: "notched-corner-svg",
        xmlns: "http://www.w3.org/2000/svg",
        width: "50",
        height: "50",
        viewBox: "0 0 70 70",
        fill: "none",
    },
    Ff = ["fill"],
    Bf = ["stroke", "stroke-width"];
function Vf(t, e, s, i, n, r) {
    return (
        ee(),
        ie(
            Oe,
            null,
            [
                (ee(),
                ie("svg", Lf, [
                    z(
                        "path",
                        {
                            d: "M18.64 42C28.94 42 37.28 33.65 37.28 23.36V20C37.29 8.95 46.24 0 57.29 0H0V59.8H0.04C0.49 49.9 8.63 42 18.64 42Z",
                            fill: s.fill,
                        },
                        null,
                        8,
                        If
                    ),
                    z(
                        "path",
                        {
                            d: `M2.04 74
         V59.8
         C0.49 49.9 8.63 42 18.64 42
         C28.94 42 37.28 33.65 37.28 23.36
         V20
         C37.29 8.95 45.5 2 54 2
         L70 2`,
                            fill: "none",
                            stroke: s.stroke,
                            "stroke-width": s.strokeWidth,
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                        },
                        null,
                        8,
                        Af
                    ),
                ])),
                (ee(),
                ie("svg", Of, [
                    z(
                        "path",
                        {
                            d: "M18.64 42C28.94 42 37.28 33.65 37.28 23.36V20C37.29 8.95 46.24 0 57.29 0H0V59.8H0.04C0.49 49.9 8.63 42 18.64 42Z",
                            fill: s.fill,
                        },
                        null,
                        8,
                        $f
                    ),
                    z(
                        "path",
                        {
                            d: `M2.04 74
         V59.8
         C0.49 49.9 8.63 42 18.64 42
         C28.94 42 37.28 33.65 37.28 23.36
         V20
         C37.29 8.95 45.5 2 54 2
         L70 2`,
                            fill: "none",
                            stroke: s.stroke,
                            "stroke-width": s.strokeWidth,
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                        },
                        null,
                        8,
                        kf
                    ),
                ])),
                (ee(),
                ie("svg", Df, [
                    z(
                        "path",
                        {
                            d: "M18.64 42C28.94 42 37.28 33.65 37.28 23.36V20C37.29 8.95 46.24 0 57.29 0H0V59.8H0.04C0.49 49.9 8.63 42 18.64 42Z",
                            fill: s.fill,
                        },
                        null,
                        8,
                        zf
                    ),
                    z(
                        "path",
                        {
                            d: `M2.04 74
         V59.8
         C0.49 49.9 8.63 42 18.64 42
         C28.94 42 37.28 33.65 37.28 23.36
         V20
         C37.29 8.95 45.5 2 54 2
         L70 2`,
                            fill: "none",
                            stroke: s.stroke,
                            "stroke-width": s.strokeWidth,
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                        },
                        null,
                        8,
                        Hf
                    ),
                ])),
                (ee(),
                ie("svg", Rf, [
                    z(
                        "path",
                        {
                            d: "M18.64 42C28.94 42 37.28 33.65 37.28 23.36V20C37.29 8.95 46.24 0 57.29 0H0V59.8H0.04C0.49 49.9 8.63 42 18.64 42Z",
                            fill: s.fill,
                        },
                        null,
                        8,
                        Ff
                    ),
                    z(
                        "path",
                        {
                            d: `M2.04 74
         V59.8
         C0.49 49.9 8.63 42 18.64 42
         C28.94 42 37.28 33.65 37.28 23.36
         V20
         C37.29 8.95 45.5 2 54 2
         L70 2`,
                            fill: "none",
                            stroke: s.stroke,
                            "stroke-width": s.strokeWidth,
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                        },
                        null,
                        8,
                        Bf
                    ),
                ])),
            ],
            64
        )
    );
}
const Nf = Ht(Pf, [["render", Vf]]),
    qf = ["tabindex", "inert"],
    jf = { class: "mini-cart__header" },
    Gf = { class: "flex justify-between items-center md:items-end relative" },
    Wf = { class: "mini-cart__logo block md:hidden absolute left-1/2 -translate-x-1/2" },
    Yf = { id: "mini-cart__title", class: "flex items-center gap-0.5 md:gap-3 mini-cart__title" },
    Xf = { class: "header-font !uppercase" },
    Uf = { class: "header__cart-count" },
    Kf = { class: "js-cart-total header__cart-count-total", "aria-label": "{{ 'cart.cart_sub_total' | t }}" },
    Zf = { class: "cart-total__count" },
    Jf = { key: 0, class: "mini-cart__progress-label mt-5 py-2 flex items-center justify-center" },
    Qf = { class: "text-center packaging-label" },
    ep = { class: "minicart__merge-section flex flex-col justify-between", ref: "minicart__merge-section" },
    tp = { key: 0, class: "mini-cart__items pt-4 flex flex-col" },
    sp = { key: 1, class: "mini-cart__is-empty flex items-center justify-center h-full flex-col" },
    ip = { class: "mini-cart__is-empty-inner p-6" },
    np = { class: "!uppercase h-4 text-center" },
    rp = { key: 2, class: "mini-cart__upsell py-5 md:py-9" },
    ap = { class: "flex w-full gap-5 overflow-x-auto h-full p-0.5" },
    op = { class: "flex h-full gap-2.5" },
    lp = { key: 0, class: "mb-2 text-red-600" },
    cp = { class: "flex-1 mini-cart__upsell-fig" },
    dp = ["href", "aria-label"],
    up = ["src", "alt"],
    fp = { class: "flex-1 flex flex-col mini-cart__upsell-desc" },
    pp = ["href"],
    mp = { class: "h-6" },
    hp = { class: "eyebrow-2 opacity-50 mb-1.5" },
    gp = { class: "packaging-label-small opacity-85 mb-3.5 text-black" },
    vp = ["value"],
    wp = { class: "items-center space-x-2 sr-only" },
    yp = ["for"],
    bp = ["id"],
    Sp = { type: "submit", name: "add", class: "mini-cart__button button--secondary" },
    xp = { key: 1, class: "mini-cart__footer flex flex-col" },
    Ep = { key: 0, class: "border px-3 pt-4 pb-5 rounded-md mb-4" },
    Tp = { class: "flex items-center justify-between" },
    Cp = { class: "flex gap-2 relative items-center" },
    _p = { class: "flex flex-row-reverse items-center gap-2" },
    Mp = ["disabled"],
    Pp = { id: "current_count" },
    Lp = { class: "flex justify-end items-start gap-4 mt-4" },
    Ip = { key: 0, type: "submit", class: "mini-cart__button" },
    Ap = { key: 1, class: "mini-cart__discount" },
    Op = { class: "h-6 mb-2 sr-only" },
    $p = { class: "flex gap-2" },
    kp = ["value"],
    Dp = { key: 0, class: "mb-2 flex flex-wrap gap-2" },
    zp = ["onClick", "aria-label"],
    Hp = { class: "sr-only" },
    Rp = { key: 1, class: "text-red-600 text-sm mb-2" },
    Fp = { class: "flex" },
    Bp = { class: "mini-checkout-footer js-mini-cart-footer flex-1" },
    Vp = {
        __name: "mini-cart",
        setup(t) {
            const e = le(),
                s = le("");
            window.miniCartCustomSettings.closeActionText;
            const i = window.miniCartCustomSettings.discountCodeLabel;
            window.miniCartCustomSettings.discountCodePlaceholder;
            const n = window.miniCartCustomSettings.removeDiscount || "Remove disocunt",
                r = window.miniCartCustomSettings.language.cartName || "Cart",
                a = le(window.miniCartCustomSettings.freeShippingThreshold),
                o = le(window.miniCartCustomSettings.cartEmptyButtonText),
                l = le(window.miniCartCustomSettings.cartEmptyMessage),
                c = le(window.miniCartCustomSettings.currencySymbol),
                d = le(window.miniCartCustomSettings.numberOfRecommendedProducts),
                p = le(window.miniCartCustomSettings.soldOutText),
                g = le(window.miniCartCustomSettings.addtoBagText),
                m = le(window.miniCartCustomSettings.showMoreText);
            le(window.miniCartCustomSettings.emptyCartActionText);
            const u = le(0),
                f = le(!1),
                w = le(!0),
                b = le(!0),
                h = le([]),
                v = le(0),
                y = le(0);
            le(window.miniCartCustomSettings.subTotalText);
            const E = le(0),
                L = le(0),
                P = le(0),
                A = le([]),
                _ = le([]),
                M = le({}),
                k = le(null),
                O = le(!1),
                $ = le([]),
                D = le(5),
                q = le(5),
                H = le(),
                T = le(),
                C = le(null);
            (window.cartTotal = v.value || 0), (window.cartCount = y.value || 0);
            const G = le(""),
                ae = () => {
                    const Q = localStorage.getItem("discountCodes");
                    return Q ? Q.split(",").filter(Boolean) : [];
                },
                me = (Q) => {
                    localStorage.setItem("discountCodes", Q.join(","));
                },
                ge = async (Q) => {
                    Q.preventDefault();
                    const K = new FormData(Q.target).get("discount");
                    if (!K) return;
                    const Me = K.split(",")
                        .map((Ae) => Ae.trim())
                        .filter(Boolean);
                    let ve = ae();
                    Me.forEach((Ae) => {
                        ve.includes(Ae) || ve.push(Ae);
                    });
                    try {
                        const lt = await (
                            await fetch(window.Shopify.routes.root + "cart/update.js", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ discount: ve.join(",") }),
                            })
                        ).json();
                        G.value = "";
                        const ks = lt.discount_codes.filter((ct) => ct.applicable).map((ct) => ct.code),
                            pi = lt.discount_codes
                                .filter((ct) => !ct.applicable && ve.includes(ct.code))
                                .map((ct) => ct.code);
                        pi.length > 0 &&
                            ((G.value = `Failed to apply discount code: ${pi.join(", ")}`), console.warn(G.value)),
                            me(ks),
                            U();
                    } catch (Ae) {
                        console.error("Failed to apply discount code:", Ae);
                    }
                },
                Ne = async (Q) => {
                    try {
                        let J = ae();
                        (J = J.filter((K) => K !== Q)),
                            await fetch(window.Shopify.routes.root + "cart/update.js", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ discount: J.join(",") }),
                            }),
                            me(J),
                            U();
                    } catch (J) {
                        console.error("Failed to remove discount code:", J);
                    }
                },
                gt = st(() => h.value.item_count),
                W = st(() => {
                    const Q = a.value * 100,
                        J = a.value * 100 - h.value.total_price;
                    return h.value.total_price >= Q
                        ? "Free shipping activated!"
                        : `You’re ${window.miniCartCustomSettings.currencySymbol}${J.toFixed(2) / 100} away from free shipping`;
                }),
                R = st(() => window.miniCartCustomSettings.orderNoteEnabled),
                N = le(""),
                oe = le(!1),
                be = le(!1),
                He = st(() => window.miniCartCustomSettings.upsellProductsEnabled),
                at = st(() => window.miniCartCustomSettings.discountCodeEnabled),
                S = (Q, J) => {
                    let K;
                    return function (...ve) {
                        const Ae = () => {
                            clearTimeout(K), Q(...ve);
                        };
                        clearTimeout(K), (K = setTimeout(Ae, J));
                    };
                };
            function x(Q) {
                (be.value = !0), (be.value = !1), Q.length || T.value.classList.add("hidden");
            }
            function I(Q, J) {
                (be.value = !0),
                    fetch("/cart/update.js", {
                        method: "POST",
                        credentials: "same-origin",
                        headers: { "Content-Type": "application/json", "X-Requested-With": "xmlhttprequest" },
                        body: JSON.stringify({ note: J }),
                    })
                        .then((K) => K.json())
                        .then((K) => {
                            T.value.classList.add("hidden"),
                                H.value.classList.add("hidden"),
                                Q.target.classList.add("hidden"),
                                (be.value = !1),
                                (N.value = K.note),
                                (oe.value = K.value.note.length < 0),
                                U();
                        });
            }
            function B(Q) {
                e.value && e.value.focus();
            }
            const F = S((Q) => {
                x(Q);
            }, 500);
            function V(Q) {
                /^[A-Za-z0-9~@#$^*()_+\[\]{}|\\,.?!: -]+$/.test(Q.key)
                    ? (T.value.classList.remove("hidden"), H.value.classList.add("hidden"))
                    : (Q.preventDefault(), H.value.classList.remove("hidden"));
            }
            const Z = () => {
                document.querySelector(".text-area-wrap").classList.remove("hidden"),
                    oe.value || (X(), document.querySelector(".text-area-wrap").classList.add("hidden"));
            };
            async function X() {
                try {
                    (be.value = !0),
                        await fetch("/cart/update.js", {
                            method: "POST",
                            credentials: "same-origin",
                            headers: { "Content-Type": "application/json", "X-Requested-With": "xmlhttprequest" },
                            body: JSON.stringify({ note: "" }),
                        }),
                        (N.value = ""),
                        (be.value = !1);
                } catch (Q) {
                    console.error("Error:", Q), (be.value = !1);
                }
            }
            ws(
                () => [oe.value, N.value],
                ([Q, J], [K, Me]) => {
                    Q && J !== Me && F(J);
                }
            );
            const Y = (Q) => {
                const J = parseInt(a.value) * 100,
                    K = parseFloat(Q),
                    Me = J,
                    ve = (K * 100) / Me > 100 ? 100 : (K * 100) / Me;
                return (u.value = parseInt(ve)), u.value;
            };
            async function j(Q) {
                try {
                    if (!Q || !Q.handle) return console.error("Item or item handle is undefined or empty."), Q;
                    const J = await fetch(`/products/${Q.handle}.js`);
                    if (!J.ok) throw new Error(`Fetch failed with status ${J.status}`);
                    const K = await J.json();
                    if (typeof K == "object" && K !== null) {
                        const Me = K.variants.find((ve) => ve.id === Q.variant_id);
                        Me && (Q.compare_at_price = Me.compare_at_price || null);
                    } else console.error("Invalid JSON response:", K);
                } catch (J) {
                    console.error(J);
                }
                return Q;
            }
            const te = async (Q) => {
                    (w.value = !1),
                        (b.value = !1),
                        (h.value = Q),
                        (N.value = h.value.note),
                        (oe.value = h.value.note.length < 0),
                        (v.value = h.value.total_price),
                        (y.value = h.value.item_count),
                        Y(h.value.total_price);
                    const J = await Promise.all(
                        Q.items.map(async (K) => {
                            const Me = h.value.items.find((ve) => ve.key === K.key);
                            return Me ? await j(Me) : K;
                        })
                    );
                    (h.value.items = J.filter(Boolean)),
                        (E.value = Q.total_price),
                        (L.value = Q.original_total_price),
                        (P.value = L.value - E.value),
                        Array.isArray(Q.cart_level_discount_applications) &&
                            (A.value = Q.cart_level_discount_applications.map((K) => ({
                                title: K.title,
                                total_allocated_amount: K.total_allocated_amount,
                            }))),
                        Q.total_price == 0 && Q.item_count == 0 && Ye();
                },
                U = async () => {
                    if (O.value) return;
                    (O.value = !0),
                        (w.value = !0),
                        await fetch(Shopify.routes.root + "cart.js")
                            .then((J) => J.json())
                            .then((J) => {
                                document.querySelector(".js-mini-cart-footer") &&
                                    (J.items && J.items.length > 0
                                        ? document.querySelector(".js-mini-cart-footer").classList.remove("!hidden")
                                        : document.querySelector(".js-mini-cart-footer").classList.add("!hidden")),
                                    J.items && J.items.length > 0 && (te(J), Xe());
                            })
                            .finally(() => {
                                O.value = !1;
                            }),
                        document.querySelectorAll(".js-cart-total").forEach(function (J) {
                            const K = h.value.total_price,
                                Me = h.value.item_count;
                            Me == 0 || Me == null
                                ? ((J.textContent = "0"), (J.style.display = "flex"))
                                : ((J.style.display = "flex"),
                                  (K / 100).toLocaleString("en-US", { style: "currency", currency: "USD" }),
                                  (J.innerHTML = `
      <span class="cart-total__count">${Me}</span>
    `));
                        });
                },
                se = async (Q) => {
                    Q.target.elements[1].name;
                    const J = new FormData(Q.target);
                    for (const K of J.keys());
                    for (const K of J.values());
                    fetch(window.Shopify.routes.root + "cart/add.js", { method: "POST", body: J })
                        .then((K) => {
                            C.value && C.value.scrollTo({ top: 0, behavior: "smooth" }), U(), (w.value = !1);
                        })
                        .catch((K) => {
                            console.error("Error:", K), (w.value = !1);
                        });
                },
                ne = (Q) => {
                    O.value || ((h.value = Q), U());
                },
                ue = (Q) => {
                    k.value && k.value.notifySampleRemoved(Q.product_id || Q.id);
                },
                pe = (Q) => {
                    w.value = !0;
                    const J = h.value.items.find((K) => K.variant_id === Q);
                    J &&
                        fetch("/cart/change.js", {
                            method: "POST",
                            headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" },
                            body: JSON.stringify({ id: J.key, quantity: 0 }),
                        })
                            .then((K) => K.json())
                            .then((K) => {
                                (h.value = K), Y(h.value.total_price), (w.value = !1);
                            })
                            .catch((K) => {
                                console.error(K), (w.value = !1);
                            });
                },
                he = (Q) => {
                    Q == "close" && ((f.value = !1), document.body.classList.remove("mini-cart-open")),
                        Q == "open" &&
                            ((f.value = !0),
                            document.body.classList.remove("nav-open"),
                            document.body.classList.add("mini-cart-open"),
                            document.body.classList.contains("scrolled")
                                ? (document.querySelector(".mini-cart-wrap").style.top = "0px")
                                : (document.querySelector(".mini-cart-wrap").style.top = "30px"));
                },
                _e = () => {
                    (f.value = !0),
                        (w.value = !1),
                        document.body.classList.remove("nav-open"),
                        document.body.classList.add("mini-cart-open");
                },
                Ie = () => {
                    (f.value = !1), document.body.classList.remove("mini-cart-open");
                    const Q = new URL(window.location.href);
                    Q.searchParams.delete("cart-open"), window.history.replaceState({}, "", Q);
                },
                Ye = () => {
                    (w.value = !0),
                        fetch(Shopify.routes.root + "cart/clear.js", { method: "POST" })
                            .then((Q) => Q.json())
                            .then((Q) => {
                                (h.value = Q),
                                    Y(h.value.total_price),
                                    U(),
                                    (w.value = !1),
                                    (y.value = h.value.item_count),
                                    (v.value = h.value.total_price),
                                    document.querySelectorAll(".js-cart-total").forEach(function (K) {
                                        K.textContent = h.value.item_count;
                                    });
                            })
                            .catch((Q) => {
                                console.error(Q), (w.value = !1);
                            });
                },
                Xe = async () => {
                    const Q = h.value.items.map((ve) => ve.product_id),
                        J = [];
                    for (const ve of Q) {
                        const lt = await (
                            await fetch(
                                `/recommendations/products.json?product_id=${ve}&limit=${d.value}&intent=related`
                            )
                        ).json();
                        J.push(...lt.products);
                    }
                    const Me = J.filter((ve, Ae, lt) => Ae === lt.findIndex((ks) => ks.id === ve.id)).filter(
                        (ve) => !Q.includes(ve.id)
                    );
                    _.value = Me;
                    for (const ve of _.value)
                        try {
                            const lt = await (await fetch(`/products/${ve.handle}`)).text(),
                                ct =
                                    new DOMParser()
                                        .parseFromString(lt, "text/html")
                                        .querySelector(".upsell-cta .eyebrow-2")
                                        ?.textContent?.trim() || "";
                            ve.upsellText = ct;
                        } catch (Ae) {
                            console.error("Error fetching product page:", Ae);
                        }
                    _.value.forEach((ve) => {
                        if (ve.variants.length > 0) {
                            const Ae = ve.variants.find((lt) => lt.available);
                            Ae ? (M.value[ve.id] = Ae.id) : console.error("No available variant for product:", ve.id);
                        }
                    }),
                        Mt();
                },
                Mt = () => {
                    $.value = _.value.slice(0, D.value);
                },
                $s = st(() => D.value < _.value.length && D.value + q.value <= _.value.length),
                qe = () => {
                    (D.value += q.value), Mt();
                },
                et = () => {
                    document.querySelector(".page-cart") && (f.value = !0);
                };
            return (
                ci(() => {
                    U(),
                        et(),
                        (b.value = !1),
                        (w.value = !1),
                        (window.closeMiniCart = Ie),
                        (window.toggleMiniCart = he),
                        (window.openMiniCart = _e),
                        (window.getCart = U),
                        (window.emptyMiniCart = Ye),
                        document.querySelectorAll('form[action="/cart/add"]').forEach((J) => {
                            J.addEventListener("submit", function (K) {
                                K.preventDefault();
                                const Me = new FormData(this);
                                fetch(`${window.Shopify.routes.root}cart/add.js`, { method: "POST", body: Me })
                                    .then(() => {
                                        window.getCart(), window.toggleMiniCart("open");
                                    })
                                    .catch((ve) => {
                                        console.error("Error:", ve);
                                    });
                            });
                        });
                }),
                (Q, J) => (
                    ee(),
                    ie(
                        "div",
                        {
                            class: Nt([
                                "mini-cart h-full flex flex-col",
                                [w.value ? "cartIsBlocked" : "cartIsUnBlocked"],
                            ]),
                            "aria-labelledby": "mini-cart__title",
                            tabindex: f.value ? "1" : "-1",
                            inert: !f.value,
                        },
                        [
                            z("header", jf, [
                                z("div", Gf, [
                                    z(
                                        "button",
                                        { class: "js-mini-cart-close", "aria-label": "Click to close", onClick: Ie },
                                        [J[6] || (J[6] = z("span", { class: "sr-only" }, "Close", -1)), Pe(ir)]
                                    ),
                                    z("div", Wf, [Pe(Mf)]),
                                    z("a", Yf, [
                                        z("span", Xf, ce(tt(r)), 1),
                                        z("span", Uf, [Pe(tu), z("span", Kf, [z("span", Zf, ce(gt.value), 1)])]),
                                    ]),
                                ]),
                                h.value && h.value.items?.length
                                    ? (ee(), ie("div", Jf, [z("p", Qf, ce(W.value), 1)]))
                                    : Ee("", !0),
                            ]),
                            h.value && h.value.items?.length
                                ? (ee(),
                                  ji(
                                      gf,
                                      {
                                          key: 0,
                                          ref_key: "freeSampleComponent",
                                          ref: k,
                                          cartTotal: E.value,
                                          cartCount: y.value,
                                          currencySymbol: c.value,
                                          removeItem: pe(),
                                          onCartUpdated: ne,
                                      },
                                      null,
                                      8,
                                      ["cartTotal", "cartCount", "currencySymbol", "removeItem"]
                                  ))
                                : Ee("", !0),
                            z(
                                "div",
                                ep,
                                [
                                    h.value && h.value.items?.length
                                        ? (ee(),
                                          ie("section", tp, [
                                              (ee(!0),
                                              ie(
                                                  Oe,
                                                  null,
                                                  $t(
                                                      h.value.items,
                                                      (K) => (
                                                          ee(),
                                                          ji(
                                                              Uu,
                                                              {
                                                                  key: K.id,
                                                                  item: K,
                                                                  updateCartValues: te,
                                                                  "currency-symbol": c.value,
                                                                  refreshRecommendedProducts: Xe,
                                                                  onSampleRemoved: ue,
                                                                  "compare-at-price": K.compare_at_price,
                                                              },
                                                              null,
                                                              8,
                                                              ["item", "currency-symbol", "compare-at-price"]
                                                          )
                                                      )
                                                  ),
                                                  128
                                              )),
                                          ]))
                                        : (ee(),
                                          ie("section", sp, [
                                              z("div", ip, [z("h2", np, ce(l.value), 1)]),
                                              z(
                                                  "button",
                                                  { onClickPassive: Ie, class: "uppercase button--primary-black" },
                                                  ce(o.value ? o.value : "Return to shop"),
                                                  33
                                              ),
                                              J[7] ||
                                                  (J[7] = z(
                                                      "div",
                                                      { class: "mini-cart__recentlyView-title p-6 hidden" },
                                                      [
                                                          z(
                                                              "h2",
                                                              { class: "capitalize font-bold" },
                                                              " Recently View Products "
                                                          ),
                                                      ],
                                                      -1
                                                  )),
                                              J[8] ||
                                                  (J[8] = z(
                                                      "div",
                                                      { id: "mini-cart__recently-view", class: "px-4" },
                                                      null,
                                                      -1
                                                  )),
                                          ])),
                                    h.value && h.value.items?.length && _.value.length && He.value
                                        ? (ee(),
                                          ie("section", rp, [
                                              z("div", ap, [
                                                  (ee(!0),
                                                  ie(
                                                      Oe,
                                                      null,
                                                      $t(
                                                          $.value,
                                                          (K) => (
                                                              ee(),
                                                              ie(
                                                                  "div",
                                                                  {
                                                                      key: K.id,
                                                                      class: "mini-cart__upsell-items flex flex-col flex-1 mini-cart__upsell-item relative notched-corners notched-corners-border min-w-full",
                                                                  },
                                                                  [
                                                                      Pe(Nf),
                                                                      z("div", op, [
                                                                          K.available
                                                                              ? Ee("", !0)
                                                                              : (ee(),
                                                                                ie("div", lp, [
                                                                                    z("strong", null, ce(p.value), 1),
                                                                                ])),
                                                                          z("figure", cp, [
                                                                              z(
                                                                                  "a",
                                                                                  {
                                                                                      href: K.url,
                                                                                      "aria-label": `Permalink to ${K.title}`,
                                                                                  },
                                                                                  [
                                                                                      z(
                                                                                          "img",
                                                                                          {
                                                                                              class: "object-cover h-full w-full mini-cart__upsell-img",
                                                                                              src: K.featured_image,
                                                                                              alt: K.title,
                                                                                              width: "50",
                                                                                              height: "50",
                                                                                              loading: "lazy",
                                                                                          },
                                                                                          null,
                                                                                          8,
                                                                                          up
                                                                                      ),
                                                                                  ],
                                                                                  8,
                                                                                  dp
                                                                              ),
                                                                          ]),
                                                                          z("div", fp, [
                                                                              z("div", null, [
                                                                                  z(
                                                                                      "a",
                                                                                      { href: `/products/${K.handle}` },
                                                                                      [z("h3", mp, ce(K.title), 1)],
                                                                                      8,
                                                                                      pp
                                                                                  ),
                                                                              ]),
                                                                              z("p", hp, ce(K.variants[0].title), 1),
                                                                              z("p", gp, ce(K.upsellText), 1),
                                                                              z(
                                                                                  "form",
                                                                                  { onSubmit: js(se, ["prevent"]) },
                                                                                  [
                                                                                      z(
                                                                                          "input",
                                                                                          {
                                                                                              name: "id",
                                                                                              value: K.variants[0].id,
                                                                                              type: "hidden",
                                                                                          },
                                                                                          null,
                                                                                          8,
                                                                                          vp
                                                                                      ),
                                                                                      J[9] ||
                                                                                          (J[9] = z(
                                                                                              "input",
                                                                                              {
                                                                                                  name: "quantity",
                                                                                                  value: "1",
                                                                                                  type: "hidden",
                                                                                              },
                                                                                              null,
                                                                                              -1
                                                                                          )),
                                                                                      z("div", wp, [
                                                                                          z(
                                                                                              "label",
                                                                                              {
                                                                                                  for: `Quantity--${K.id}`,
                                                                                                  class: "text-sm",
                                                                                              },
                                                                                              " Quantity: ",
                                                                                              8,
                                                                                              yp
                                                                                          ),
                                                                                          z(
                                                                                              "input",
                                                                                              {
                                                                                                  type: "number",
                                                                                                  id: `Quantity--${K.id}`,
                                                                                                  name: "quantity",
                                                                                                  value: "1",
                                                                                                  min: "1",
                                                                                              },
                                                                                              null,
                                                                                              8,
                                                                                              bp
                                                                                          ),
                                                                                      ]),
                                                                                      z(
                                                                                          "button",
                                                                                          Sp,
                                                                                          ce(g.value) +
                                                                                              " - " +
                                                                                              ce(
                                                                                                  tt(Qt)(
                                                                                                      K.variants[0]
                                                                                                          .price,
                                                                                                      "amount_no_decimals"
                                                                                                  )
                                                                                              ),
                                                                                          1
                                                                                      ),
                                                                                  ],
                                                                                  32
                                                                              ),
                                                                          ]),
                                                                      ]),
                                                                  ]
                                                              )
                                                          )
                                                      ),
                                                      128
                                                  )),
                                              ]),
                                              $s.value
                                                  ? (ee(), ie("button", { key: 0, onClick: qe }, ce(m.value), 1))
                                                  : Ee("", !0),
                                          ]))
                                        : Ee("", !0),
                                ],
                                512
                            ),
                            h.value && h.value.items?.length
                                ? (ee(),
                                  ie("footer", xp, [
                                      R.value
                                          ? (ee(),
                                            ie("div", Ep, [
                                                z("div", Tp, [
                                                    z("div", Cp, [
                                                        z("label", _p, [
                                                            J[10] || (J[10] = Cs(" Add a handwritten note. ")),
                                                            Fi(
                                                                z(
                                                                    "input",
                                                                    {
                                                                        "onUpdate:modelValue":
                                                                            J[0] || (J[0] = (K) => (oe.value = K)),
                                                                        type: "checkbox",
                                                                        class: "Form__Checkbox cursor-pointer",
                                                                        name: "properties[Gift]",
                                                                        checked: "",
                                                                        onChange: Z,
                                                                    },
                                                                    null,
                                                                    544
                                                                ),
                                                                [[Bd, oe.value]]
                                                            ),
                                                        ]),
                                                    ]),
                                                ]),
                                                z(
                                                    "form",
                                                    {
                                                        class: "text-area-wrap mx-4 relative",
                                                        id: "note-wrap",
                                                        onSubmit:
                                                            J[4] || (J[4] = js((K) => I(K, N.value), ["prevent"])),
                                                    },
                                                    [
                                                        z(
                                                            "fieldset",
                                                            { class: Nt(oe.value ? "show" : "hidden") },
                                                            [
                                                                Fi(
                                                                    z(
                                                                        "textarea",
                                                                        {
                                                                            "onUpdate:modelValue":
                                                                                J[1] || (J[1] = (K) => (N.value = K)),
                                                                            disabled: be.value,
                                                                            onKeydown: J[2] || (J[2] = (K) => V(K)),
                                                                            onInput:
                                                                                J[3] || (J[3] = (K) => tt(F)(N.value)),
                                                                            class: "block w-full border border-black p-1 rounded-md resize-none overflow-auto",
                                                                            name: "note",
                                                                            id: "cart-note",
                                                                            maxlength: "280",
                                                                            rows: "4",
                                                                            placeholder:
                                                                                "Add a note to your order (optional)",
                                                                        },
                                                                        "						" +
                                                                            ce(N.value) +
                                                                            `
						`,
                                                                        41,
                                                                        Mp
                                                                    ),
                                                                    [[Fd, N.value]]
                                                                ),
                                                                z(
                                                                    "div",
                                                                    {
                                                                        id: "count1",
                                                                        class: Nt([
                                                                            oe.value ? "show" : "hidden",
                                                                            "absolute top-[4.375rem] right-0 p-2",
                                                                        ]),
                                                                    },
                                                                    [
                                                                        z("span", Pp, ce(N.value.length), 1),
                                                                        J[11] ||
                                                                            (J[11] = z(
                                                                                "span",
                                                                                { id: "maximum_count" },
                                                                                "/280",
                                                                                -1
                                                                            )),
                                                                    ],
                                                                    2
                                                                ),
                                                                z("div", Lp, [
                                                                    z(
                                                                        "span",
                                                                        {
                                                                            class: "flex-1",
                                                                            id: "special-character-error",
                                                                            ref_key: "specialCharacterError",
                                                                            ref: H,
                                                                        },
                                                                        "*Special characters not allowed.",
                                                                        512
                                                                    ),
                                                                    h.value.note.length
                                                                        ? (ee(), ie("button", Ip, "Clear"))
                                                                        : Ee("", !0),
                                                                    z(
                                                                        "button",
                                                                        {
                                                                            else: "",
                                                                            type: "submit",
                                                                            class: "mini-cart__button",
                                                                            ref_key: "saveCartNote",
                                                                            ref: T,
                                                                            onClick: B,
                                                                        },
                                                                        "Save",
                                                                        512
                                                                    ),
                                                                ]),
                                                            ],
                                                            2
                                                        ),
                                                    ],
                                                    32
                                                ),
                                            ]))
                                          : Ee("", !0),
                                      at.value
                                          ? (ee(),
                                            ie("div", Ap, [
                                                z(
                                                    "form",
                                                    { onSubmit: js(ge, ["prevent"]), class: "mb-2" },
                                                    [
                                                        z("fieldset", null, [
                                                            z("legend", Op, ce(tt(i)), 1),
                                                            z("div", $p, [
                                                                z(
                                                                    "input",
                                                                    {
                                                                        type: "text",
                                                                        class: "border flex-1 rounded-xl indent-4 text-lg font-semibold font-greed-narrow",
                                                                        placeholder: "COUPON CODE",
                                                                        value: s.value,
                                                                        ref_key: "discountCodeInput",
                                                                        ref: e,
                                                                        name: "discount",
                                                                    },
                                                                    null,
                                                                    8,
                                                                    kp
                                                                ),
                                                                J[12] ||
                                                                    (J[12] = z(
                                                                        "button",
                                                                        {
                                                                            type: "submit",
                                                                            class: "mini-cart__button min-w-25",
                                                                        },
                                                                        "Apply",
                                                                        -1
                                                                    )),
                                                            ]),
                                                        ]),
                                                    ],
                                                    32
                                                ),
                                                h.value.cart_level_discount_applications?.length
                                                    ? (ee(),
                                                      ie("div", Dp, [
                                                          (ee(!0),
                                                          ie(
                                                              Oe,
                                                              null,
                                                              $t(
                                                                  h.value.cart_level_discount_applications,
                                                                  (K) => (
                                                                      ee(),
                                                                      ie(
                                                                          "div",
                                                                          {
                                                                              key:
                                                                                  K.title +
                                                                                  "-" +
                                                                                  K.total_allocated_amount,
                                                                              class: "inline-flex justify-between items-center p-1 label bg-black text-white rounded-md gap-2",
                                                                          },
                                                                          [
                                                                              z("span", null, ce(K.title), 1),
                                                                              z(
                                                                                  "button",
                                                                                  {
                                                                                      onClick: (Me) => Ne(K.title),
                                                                                      class: "text-white label cursor-pointer",
                                                                                      "aria-label": tt(n),
                                                                                  },
                                                                                  [
                                                                                      z(
                                                                                          "span",
                                                                                          Hp,
                                                                                          ce(tt(n)) + " " + ce(K.title),
                                                                                          1
                                                                                      ),
                                                                                      Pe(ir),
                                                                                  ],
                                                                                  8,
                                                                                  zp
                                                                              ),
                                                                          ]
                                                                      )
                                                                  )
                                                              ),
                                                              128
                                                          )),
                                                      ]))
                                                    : Ee("", !0),
                                                G.value ? (ee(), ie("p", Rp, ce(G.value), 1)) : Ee("", !0),
                                            ]))
                                          : Ee("", !0),
                                      Pe(Ef, { data: h.value }, null, 8, ["data"]),
                                      z("div", Fp, [
                                          z("div", Bp, [
                                              z(
                                                  "a",
                                                  {
                                                      href: "/cart/checkout",
                                                      onClick: J[5] || (J[5] = (K) => I(K, N.value)),
                                                      class: "mini-cart__button w-full",
                                                      "aria-label": "Links to CONTINUE TO CHECKOUT",
                                                  },
                                                  " CHECKOUT "
                                              ),
                                          ]),
                                      ]),
                                  ]))
                                : Ee("", !0),
                        ],
                        10,
                        qf
                    )
                )
            );
        },
    };
customElements.define("klaviyo-form", ml);
customElements.define("hero-product-carousel", hl);
customElements.define("quantity-input", gl);
customElements.define("make-you-feel", vl);
customElements.define("video-carousel", yl);
document.querySelector("#mini-cart") && Wd(Vp).mount("#mini-cart");
hr();
pr();
ur();
mr();
Yi();
Xi();
fr();
wl();
$i();
bl();
