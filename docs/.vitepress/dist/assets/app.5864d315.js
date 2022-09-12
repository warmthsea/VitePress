const Ti = "modulepreload",
    po = {},
    Li = "/website/",
    Mi = function (t, n) {
        return !n || n.length === 0
            ? t()
            : Promise.all(
                  n.map(s => {
                      if (((s = `${Li}${s}`), s in po)) return;
                      po[s] = !0;
                      const o = s.endsWith(".css"),
                          r = o ? '[rel="stylesheet"]' : "";
                      if (document.querySelector(`link[href="${s}"]${r}`)) return;
                      const i = document.createElement("link");
                      if (
                          ((i.rel = o ? "stylesheet" : Ti),
                          o || ((i.as = "script"), (i.crossOrigin = "")),
                          (i.href = s),
                          document.head.appendChild(i),
                          o)
                      )
                          return new Promise((l, c) => {
                              i.addEventListener("load", l), i.addEventListener("error", () => c(new Error(`Unable to preload CSS for ${s}`)));
                          });
                  })
              ).then(() => t());
    };
function Os(e, t) {
    const n = Object.create(null),
        s = e.split(",");
    for (let o = 0; o < s.length; o++) n[s[o]] = !0;
    return t ? o => !!n[o.toLowerCase()] : o => !!n[o];
}
const Ai = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Ii = Os(Ai);
function ar(e) {
    return !!e || e === "";
}
function Hs(e) {
    if (K(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n],
                o = we(s) ? Fi(s) : Hs(s);
            if (o) for (const r in o) t[r] = o[r];
        }
        return t;
    } else {
        if (we(e)) return e;
        if (ye(e)) return e;
    }
}
const Ni = /;(?![^(]*\))/g,
    Bi = /:(.+)/;
function Fi(e) {
    const t = {};
    return (
        e.split(Ni).forEach(n => {
            if (n) {
                const s = n.split(Bi);
                s.length > 1 && (t[s[0].trim()] = s[1].trim());
            }
        }),
        t
    );
}
function ve(e) {
    let t = "";
    if (we(e)) t = e;
    else if (K(e))
        for (let n = 0; n < e.length; n++) {
            const s = ve(e[n]);
            s && (t += s + " ");
        }
    else if (ye(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
}
const se = e => (we(e) ? e : e == null ? "" : K(e) || (ye(e) && (e.toString === _r || !X(e.toString))) ? JSON.stringify(e, ur, 2) : String(e)),
    ur = (e, t) =>
        t && t.__v_isRef
            ? ur(e, t.value)
            : At(t)
            ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, o]) => ((n[`${s} =>`] = o), n), {}) }
            : fr(t)
            ? { [`Set(${t.size})`]: [...t.values()] }
            : ye(t) && !K(t) && !hr(t)
            ? String(t)
            : t,
    _e = {},
    Mt = [],
    We = () => {},
    Oi = () => !1,
    Hi = /^on[^a-z]/,
    dn = e => Hi.test(e),
    Rs = e => e.startsWith("onUpdate:"),
    $e = Object.assign,
    Ds = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    Ri = Object.prototype.hasOwnProperty,
    ne = (e, t) => Ri.call(e, t),
    K = Array.isArray,
    At = e => Dn(e) === "[object Map]",
    fr = e => Dn(e) === "[object Set]",
    X = e => typeof e == "function",
    we = e => typeof e == "string",
    zs = e => typeof e == "symbol",
    ye = e => e !== null && typeof e == "object",
    dr = e => ye(e) && X(e.then) && X(e.catch),
    _r = Object.prototype.toString,
    Dn = e => _r.call(e),
    Di = e => Dn(e).slice(8, -1),
    hr = e => Dn(e) === "[object Object]",
    Us = e => we(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Jt = Os(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    zn = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n));
    },
    zi = /-(\w)/g,
    Ge = zn(e => e.replace(zi, (t, n) => (n ? n.toUpperCase() : ""))),
    Ui = /\B([A-Z])/g,
    Ht = zn(e => e.replace(Ui, "-$1").toLowerCase()),
    Un = zn(e => e.charAt(0).toUpperCase() + e.slice(1)),
    us = zn(e => (e ? `on${Un(e)}` : "")),
    on = (e, t) => !Object.is(e, t),
    fs = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t);
    },
    Vn = (e, t, n) => {
        Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
    },
    pr = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let vo;
const ji = () =>
    vo ||
    (vo =
        typeof globalThis != "undefined"
            ? globalThis
            : typeof self != "undefined"
            ? self
            : typeof window != "undefined"
            ? window
            : typeof global != "undefined"
            ? global
            : {});
let Me;
class Ki {
    constructor(t = !1) {
        (this.active = !0),
            (this.effects = []),
            (this.cleanups = []),
            !t && Me && ((this.parent = Me), (this.index = (Me.scopes || (Me.scopes = [])).push(this) - 1));
    }
    run(t) {
        if (this.active) {
            const n = Me;
            try {
                return (Me = this), t();
            } finally {
                Me = n;
            }
        }
    }
    on() {
        Me = this;
    }
    off() {
        Me = this.parent;
    }
    stop(t) {
        if (this.active) {
            let n, s;
            for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
            for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
            if (this.scopes) for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
            if (this.parent && !t) {
                const o = this.parent.scopes.pop();
                o && o !== this && ((this.parent.scopes[this.index] = o), (o.index = this.index));
            }
            this.active = !1;
        }
    }
}
function Wi(e, t = Me) {
    t && t.active && t.effects.push(e);
}
function qi() {
    return Me;
}
function Yi(e) {
    Me && Me.cleanups.push(e);
}
const js = e => {
        const t = new Set(e);
        return (t.w = 0), (t.n = 0), t;
    },
    vr = e => (e.w & ht) > 0,
    mr = e => (e.n & ht) > 0,
    Gi = ({ deps: e }) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ht;
    },
    Ji = e => {
        const { deps: t } = e;
        if (t.length) {
            let n = 0;
            for (let s = 0; s < t.length; s++) {
                const o = t[s];
                vr(o) && !mr(o) ? o.delete(e) : (t[n++] = o), (o.w &= ~ht), (o.n &= ~ht);
            }
            t.length = n;
        }
    },
    ys = new WeakMap();
let Yt = 0,
    ht = 1;
const bs = 30;
let je;
const Pt = Symbol(""),
    ws = Symbol("");
class Ks {
    constructor(t, n = null, s) {
        (this.fn = t), (this.scheduler = n), (this.active = !0), (this.deps = []), (this.parent = void 0), Wi(this, s);
    }
    run() {
        if (!this.active) return this.fn();
        let t = je,
            n = ut;
        for (; t; ) {
            if (t === this) return;
            t = t.parent;
        }
        try {
            return (this.parent = je), (je = this), (ut = !0), (ht = 1 << ++Yt), Yt <= bs ? Gi(this) : mo(this), this.fn();
        } finally {
            Yt <= bs && Ji(this), (ht = 1 << --Yt), (je = this.parent), (ut = n), (this.parent = void 0), this.deferStop && this.stop();
        }
    }
    stop() {
        je === this ? (this.deferStop = !0) : this.active && (mo(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function mo(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0;
    }
}
let ut = !0;
const gr = [];
function Rt() {
    gr.push(ut), (ut = !1);
}
function Dt() {
    const e = gr.pop();
    ut = e === void 0 ? !0 : e;
}
function Ne(e, t, n) {
    if (ut && je) {
        let s = ys.get(e);
        s || ys.set(e, (s = new Map()));
        let o = s.get(n);
        o || s.set(n, (o = js())), yr(o);
    }
}
function yr(e, t) {
    let n = !1;
    Yt <= bs ? mr(e) || ((e.n |= ht), (n = !vr(e))) : (n = !e.has(je)), n && (e.add(je), je.deps.push(e));
}
function et(e, t, n, s, o, r) {
    const i = ys.get(e);
    if (!i) return;
    let l = [];
    if (t === "clear") l = [...i.values()];
    else if (n === "length" && K(e))
        i.forEach((c, f) => {
            (f === "length" || f >= s) && l.push(c);
        });
    else
        switch ((n !== void 0 && l.push(i.get(n)), t)) {
            case "add":
                K(e) ? Us(n) && l.push(i.get("length")) : (l.push(i.get(Pt)), At(e) && l.push(i.get(ws)));
                break;
            case "delete":
                K(e) || (l.push(i.get(Pt)), At(e) && l.push(i.get(ws)));
                break;
            case "set":
                At(e) && l.push(i.get(Pt));
                break;
        }
    if (l.length === 1) l[0] && xs(l[0]);
    else {
        const c = [];
        for (const f of l) f && c.push(...f);
        xs(js(c));
    }
}
function xs(e, t) {
    const n = K(e) ? e : [...e];
    for (const s of n) s.computed && go(s);
    for (const s of n) s.computed || go(s);
}
function go(e, t) {
    (e !== je || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Xi = Os("__proto__,__v_isRef,__isVue"),
    br = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter(e => e !== "arguments" && e !== "caller")
            .map(e => Symbol[e])
            .filter(zs)
    ),
    Qi = Ws(),
    Zi = Ws(!1, !0),
    el = Ws(!0),
    yo = tl();
function tl() {
    const e = {};
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach(t => {
            e[t] = function (...n) {
                const s = ie(this);
                for (let r = 0, i = this.length; r < i; r++) Ne(s, "get", r + "");
                const o = s[t](...n);
                return o === -1 || o === !1 ? s[t](...n.map(ie)) : o;
            };
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
            e[t] = function (...n) {
                Rt();
                const s = ie(this)[t].apply(this, n);
                return Dt(), s;
            };
        }),
        e
    );
}
function Ws(e = !1, t = !1) {
    return function (s, o, r) {
        if (o === "__v_isReactive") return !e;
        if (o === "__v_isReadonly") return e;
        if (o === "__v_isShallow") return t;
        if (o === "__v_raw" && r === (e ? (t ? ml : kr) : t ? Pr : $r).get(s)) return s;
        const i = K(s);
        if (!e && i && ne(yo, o)) return Reflect.get(yo, o, r);
        const l = Reflect.get(s, o, r);
        return (zs(o) ? br.has(o) : Xi(o)) || (e || Ne(s, "get", o), t) ? l : Pe(l) ? (i && Us(o) ? l : l.value) : ye(l) ? (e ? Gs(l) : Kn(l)) : l;
    };
}
const nl = wr(),
    sl = wr(!0);
function wr(e = !1) {
    return function (n, s, o, r) {
        let i = n[s];
        if (rn(i) && Pe(i) && !Pe(o)) return !1;
        if (!e && !rn(o) && ($s(o) || ((o = ie(o)), (i = ie(i))), !K(n) && Pe(i) && !Pe(o))) return (i.value = o), !0;
        const l = K(n) && Us(s) ? Number(s) < n.length : ne(n, s),
            c = Reflect.set(n, s, o, r);
        return n === ie(r) && (l ? on(o, i) && et(n, "set", s, o) : et(n, "add", s, o)), c;
    };
}
function ol(e, t) {
    const n = ne(e, t);
    e[t];
    const s = Reflect.deleteProperty(e, t);
    return s && n && et(e, "delete", t, void 0), s;
}
function rl(e, t) {
    const n = Reflect.has(e, t);
    return (!zs(t) || !br.has(t)) && Ne(e, "has", t), n;
}
function il(e) {
    return Ne(e, "iterate", K(e) ? "length" : Pt), Reflect.ownKeys(e);
}
const xr = { get: Qi, set: nl, deleteProperty: ol, has: rl, ownKeys: il },
    ll = {
        get: el,
        set(e, t) {
            return !0;
        },
        deleteProperty(e, t) {
            return !0;
        },
    },
    cl = $e({}, xr, { get: Zi, set: sl }),
    qs = e => e,
    jn = e => Reflect.getPrototypeOf(e);
function gn(e, t, n = !1, s = !1) {
    e = e.__v_raw;
    const o = ie(e),
        r = ie(t);
    n || (t !== r && Ne(o, "get", t), Ne(o, "get", r));
    const { has: i } = jn(o),
        l = s ? qs : n ? Xs : ln;
    if (i.call(o, t)) return l(e.get(t));
    if (i.call(o, r)) return l(e.get(r));
    e !== o && e.get(t);
}
function yn(e, t = !1) {
    const n = this.__v_raw,
        s = ie(n),
        o = ie(e);
    return t || (e !== o && Ne(s, "has", e), Ne(s, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function bn(e, t = !1) {
    return (e = e.__v_raw), !t && Ne(ie(e), "iterate", Pt), Reflect.get(e, "size", e);
}
function bo(e) {
    e = ie(e);
    const t = ie(this);
    return jn(t).has.call(t, e) || (t.add(e), et(t, "add", e, e)), this;
}
function wo(e, t) {
    t = ie(t);
    const n = ie(this),
        { has: s, get: o } = jn(n);
    let r = s.call(n, e);
    r || ((e = ie(e)), (r = s.call(n, e)));
    const i = o.call(n, e);
    return n.set(e, t), r ? on(t, i) && et(n, "set", e, t) : et(n, "add", e, t), this;
}
function xo(e) {
    const t = ie(this),
        { has: n, get: s } = jn(t);
    let o = n.call(t, e);
    o || ((e = ie(e)), (o = n.call(t, e))), s && s.call(t, e);
    const r = t.delete(e);
    return o && et(t, "delete", e, void 0), r;
}
function $o() {
    const e = ie(this),
        t = e.size !== 0,
        n = e.clear();
    return t && et(e, "clear", void 0, void 0), n;
}
function wn(e, t) {
    return function (s, o) {
        const r = this,
            i = r.__v_raw,
            l = ie(i),
            c = t ? qs : e ? Xs : ln;
        return !e && Ne(l, "iterate", Pt), i.forEach((f, _) => s.call(o, c(f), c(_), r));
    };
}
function xn(e, t, n) {
    return function (...s) {
        const o = this.__v_raw,
            r = ie(o),
            i = At(r),
            l = e === "entries" || (e === Symbol.iterator && i),
            c = e === "keys" && i,
            f = o[e](...s),
            _ = n ? qs : t ? Xs : ln;
        return (
            !t && Ne(r, "iterate", c ? ws : Pt),
            {
                next() {
                    const { value: g, done: w } = f.next();
                    return w ? { value: g, done: w } : { value: l ? [_(g[0]), _(g[1])] : _(g), done: w };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function ot(e) {
    return function (...t) {
        return e === "delete" ? !1 : this;
    };
}
function al() {
    const e = {
            get(r) {
                return gn(this, r);
            },
            get size() {
                return bn(this);
            },
            has: yn,
            add: bo,
            set: wo,
            delete: xo,
            clear: $o,
            forEach: wn(!1, !1),
        },
        t = {
            get(r) {
                return gn(this, r, !1, !0);
            },
            get size() {
                return bn(this);
            },
            has: yn,
            add: bo,
            set: wo,
            delete: xo,
            clear: $o,
            forEach: wn(!1, !0),
        },
        n = {
            get(r) {
                return gn(this, r, !0);
            },
            get size() {
                return bn(this, !0);
            },
            has(r) {
                return yn.call(this, r, !0);
            },
            add: ot("add"),
            set: ot("set"),
            delete: ot("delete"),
            clear: ot("clear"),
            forEach: wn(!0, !1),
        },
        s = {
            get(r) {
                return gn(this, r, !0, !0);
            },
            get size() {
                return bn(this, !0);
            },
            has(r) {
                return yn.call(this, r, !0);
            },
            add: ot("add"),
            set: ot("set"),
            delete: ot("delete"),
            clear: ot("clear"),
            forEach: wn(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach(r => {
            (e[r] = xn(r, !1, !1)), (n[r] = xn(r, !0, !1)), (t[r] = xn(r, !1, !0)), (s[r] = xn(r, !0, !0));
        }),
        [e, n, t, s]
    );
}
const [ul, fl, dl, _l] = al();
function Ys(e, t) {
    const n = t ? (e ? _l : dl) : e ? fl : ul;
    return (s, o, r) =>
        o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(ne(n, o) && o in s ? n : s, o, r);
}
const hl = { get: Ys(!1, !1) },
    pl = { get: Ys(!1, !0) },
    vl = { get: Ys(!0, !1) },
    $r = new WeakMap(),
    Pr = new WeakMap(),
    kr = new WeakMap(),
    ml = new WeakMap();
function gl(e) {
    switch (e) {
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
function yl(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : gl(Di(e));
}
function Kn(e) {
    return rn(e) ? e : Js(e, !1, xr, hl, $r);
}
function bl(e) {
    return Js(e, !1, cl, pl, Pr);
}
function Gs(e) {
    return Js(e, !0, ll, vl, kr);
}
function Js(e, t, n, s, o) {
    if (!ye(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const r = o.get(e);
    if (r) return r;
    const i = yl(e);
    if (i === 0) return e;
    const l = new Proxy(e, i === 2 ? s : n);
    return o.set(e, l), l;
}
function It(e) {
    return rn(e) ? It(e.__v_raw) : !!(e && e.__v_isReactive);
}
function rn(e) {
    return !!(e && e.__v_isReadonly);
}
function $s(e) {
    return !!(e && e.__v_isShallow);
}
function Cr(e) {
    return It(e) || rn(e);
}
function ie(e) {
    const t = e && e.__v_raw;
    return t ? ie(t) : e;
}
function Xt(e) {
    return Vn(e, "__v_skip", !0), e;
}
const ln = e => (ye(e) ? Kn(e) : e),
    Xs = e => (ye(e) ? Gs(e) : e);
function Sr(e) {
    ut && je && ((e = ie(e)), yr(e.dep || (e.dep = js())));
}
function Vr(e, t) {
    (e = ie(e)), e.dep && xs(e.dep);
}
function Pe(e) {
    return !!(e && e.__v_isRef === !0);
}
function be(e) {
    return Er(e, !1);
}
function wl(e) {
    return Er(e, !0);
}
function Er(e, t) {
    return Pe(e) ? e : new xl(e, t);
}
class xl {
    constructor(t, n) {
        (this.__v_isShallow = n), (this.dep = void 0), (this.__v_isRef = !0), (this._rawValue = n ? t : ie(t)), (this._value = n ? t : ln(t));
    }
    get value() {
        return Sr(this), this._value;
    }
    set value(t) {
        (t = this.__v_isShallow ? t : ie(t)),
            on(t, this._rawValue) && ((this._rawValue = t), (this._value = this.__v_isShallow ? t : ln(t)), Vr(this));
    }
}
function v(e) {
    return Pe(e) ? e.value : e;
}
const $l = {
    get: (e, t, n) => v(Reflect.get(e, t, n)),
    set: (e, t, n, s) => {
        const o = e[t];
        return Pe(o) && !Pe(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, s);
    },
};
function Tr(e) {
    return It(e) ? e : new Proxy(e, $l);
}
class Pl {
    constructor(t, n, s, o) {
        (this._setter = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._dirty = !0),
            (this.effect = new Ks(t, () => {
                this._dirty || ((this._dirty = !0), Vr(this));
            })),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !o),
            (this.__v_isReadonly = s);
    }
    get value() {
        const t = ie(this);
        return Sr(t), (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())), t._value;
    }
    set value(t) {
        this._setter(t);
    }
}
function kl(e, t, n = !1) {
    let s, o;
    const r = X(e);
    return r ? ((s = e), (o = We)) : ((s = e.get), (o = e.set)), new Pl(s, o, r || !o, n);
}
function ft(e, t, n, s) {
    let o;
    try {
        o = s ? e(...s) : e();
    } catch (r) {
        Wn(r, t, n);
    }
    return o;
}
function He(e, t, n, s) {
    if (X(e)) {
        const r = ft(e, t, n, s);
        return (
            r &&
                dr(r) &&
                r.catch(i => {
                    Wn(i, t, n);
                }),
            r
        );
    }
    const o = [];
    for (let r = 0; r < e.length; r++) o.push(He(e[r], t, n, s));
    return o;
}
function Wn(e, t, n, s = !0) {
    const o = t ? t.vnode : null;
    if (t) {
        let r = t.parent;
        const i = t.proxy,
            l = n;
        for (; r; ) {
            const f = r.ec;
            if (f) {
                for (let _ = 0; _ < f.length; _++) if (f[_](e, i, l) === !1) return;
            }
            r = r.parent;
        }
        const c = t.appContext.config.errorHandler;
        if (c) {
            ft(c, null, 10, [e, i, l]);
            return;
        }
    }
    Cl(e, n, o, s);
}
function Cl(e, t, n, s = !0) {
    console.error(e);
}
let En = !1,
    Ps = !1;
const Ae = [];
let Ze = 0;
const Qt = [];
let Gt = null,
    Tt = 0;
const Zt = [];
let ct = null,
    Lt = 0;
const Lr = Promise.resolve();
let Qs = null,
    ks = null;
function _n(e) {
    const t = Qs || Lr;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sl(e) {
    let t = Ze + 1,
        n = Ae.length;
    for (; t < n; ) {
        const s = (t + n) >>> 1;
        cn(Ae[s]) < e ? (t = s + 1) : (n = s);
    }
    return t;
}
function Mr(e) {
    (!Ae.length || !Ae.includes(e, En && e.allowRecurse ? Ze + 1 : Ze)) && e !== ks && (e.id == null ? Ae.push(e) : Ae.splice(Sl(e.id), 0, e), Ar());
}
function Ar() {
    !En && !Ps && ((Ps = !0), (Qs = Lr.then(Nr)));
}
function Vl(e) {
    const t = Ae.indexOf(e);
    t > Ze && Ae.splice(t, 1);
}
function Ir(e, t, n, s) {
    K(e) ? n.push(...e) : (!t || !t.includes(e, e.allowRecurse ? s + 1 : s)) && n.push(e), Ar();
}
function El(e) {
    Ir(e, Gt, Qt, Tt);
}
function Tl(e) {
    Ir(e, ct, Zt, Lt);
}
function qn(e, t = null) {
    if (Qt.length) {
        for (ks = t, Gt = [...new Set(Qt)], Qt.length = 0, Tt = 0; Tt < Gt.length; Tt++) Gt[Tt]();
        (Gt = null), (Tt = 0), (ks = null), qn(e, t);
    }
}
function Tn(e) {
    if ((qn(), Zt.length)) {
        const t = [...new Set(Zt)];
        if (((Zt.length = 0), ct)) {
            ct.push(...t);
            return;
        }
        for (ct = t, ct.sort((n, s) => cn(n) - cn(s)), Lt = 0; Lt < ct.length; Lt++) ct[Lt]();
        (ct = null), (Lt = 0);
    }
}
const cn = e => (e.id == null ? 1 / 0 : e.id);
function Nr(e) {
    (Ps = !1), (En = !0), qn(e), Ae.sort((n, s) => cn(n) - cn(s));
    const t = We;
    try {
        for (Ze = 0; Ze < Ae.length; Ze++) {
            const n = Ae[Ze];
            n && n.active !== !1 && ft(n, null, 14);
        }
    } finally {
        (Ze = 0), (Ae.length = 0), Tn(), (En = !1), (Qs = null), (Ae.length || Qt.length || Zt.length) && Nr(e);
    }
}
function Ll(e, t, ...n) {
    if (e.isUnmounted) return;
    const s = e.vnode.props || _e;
    let o = n;
    const r = t.startsWith("update:"),
        i = r && t.slice(7);
    if (i && i in s) {
        const _ = `${i === "modelValue" ? "model" : i}Modifiers`,
            { number: g, trim: w } = s[_] || _e;
        w && (o = n.map(C => C.trim())), g && (o = n.map(pr));
    }
    let l,
        c = s[(l = us(t))] || s[(l = us(Ge(t)))];
    !c && r && (c = s[(l = us(Ht(t)))]), c && He(c, e, 6, o);
    const f = s[l + "Once"];
    if (f) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        (e.emitted[l] = !0), He(f, e, 6, o);
    }
}
function Br(e, t, n = !1) {
    const s = t.emitsCache,
        o = s.get(e);
    if (o !== void 0) return o;
    const r = e.emits;
    let i = {},
        l = !1;
    if (!X(e)) {
        const c = f => {
            const _ = Br(f, t, !0);
            _ && ((l = !0), $e(i, _));
        };
        !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
    }
    return !r && !l ? (s.set(e, null), null) : (K(r) ? r.forEach(c => (i[c] = null)) : $e(i, r), s.set(e, i), i);
}
function Yn(e, t) {
    return !e || !dn(t) ? !1 : ((t = t.slice(2).replace(/Once$/, "")), ne(e, t[0].toLowerCase() + t.slice(1)) || ne(e, Ht(t)) || ne(e, t));
}
let ke = null,
    Gn = null;
function Ln(e) {
    const t = ke;
    return (ke = e), (Gn = (e && e.type.__scopeId) || null), t;
}
function Re(e) {
    Gn = e;
}
function De() {
    Gn = null;
}
function j(e, t = ke, n) {
    if (!t || e._n) return e;
    const s = (...o) => {
        s._d && No(-1);
        const r = Ln(t),
            i = e(...o);
        return Ln(r), s._d && No(1), i;
    };
    return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function ds(e) {
    const {
        type: t,
        vnode: n,
        proxy: s,
        withProxy: o,
        props: r,
        propsOptions: [i],
        slots: l,
        attrs: c,
        emit: f,
        render: _,
        renderCache: g,
        data: w,
        setupState: C,
        ctx: N,
        inheritAttrs: z,
    } = e;
    let D, y;
    const V = Ln(e);
    try {
        if (n.shapeFlag & 4) {
            const G = o || s;
            (D = Ue(_.call(G, G, g, r, C, w, N))), (y = c);
        } else {
            const G = t;
            (D = Ue(G.length > 1 ? G(r, { attrs: c, slots: l, emit: f }) : G(r, null))), (y = t.props ? c : Ml(c));
        }
    } catch (G) {
        (tn.length = 0), Wn(G, e, 1), (D = E(Ie));
    }
    let U = D;
    if (y && z !== !1) {
        const G = Object.keys(y),
            { shapeFlag: te } = U;
        G.length && te & 7 && (i && G.some(Rs) && (y = Al(y, i)), (U = pt(U, y)));
    }
    return (
        n.dirs && ((U = pt(U)), (U.dirs = U.dirs ? U.dirs.concat(n.dirs) : n.dirs)), n.transition && (U.transition = n.transition), (D = U), Ln(V), D
    );
}
const Ml = e => {
        let t;
        for (const n in e) (n === "class" || n === "style" || dn(n)) && ((t || (t = {}))[n] = e[n]);
        return t;
    },
    Al = (e, t) => {
        const n = {};
        for (const s in e) (!Rs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
        return n;
    };
function Il(e, t, n) {
    const { props: s, children: o, component: r } = e,
        { props: i, children: l, patchFlag: c } = t,
        f = r.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && c >= 0) {
        if (c & 1024) return !0;
        if (c & 16) return s ? Po(s, i, f) : !!i;
        if (c & 8) {
            const _ = t.dynamicProps;
            for (let g = 0; g < _.length; g++) {
                const w = _[g];
                if (i[w] !== s[w] && !Yn(f, w)) return !0;
            }
        }
    } else return (o || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? (i ? Po(s, i, f) : !0) : !!i;
    return !1;
}
function Po(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) return !0;
    for (let o = 0; o < s.length; o++) {
        const r = s[o];
        if (t[r] !== e[r] && !Yn(n, r)) return !0;
    }
    return !1;
}
function Nl({ vnode: e, parent: t }, n) {
    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Bl = e => e.__isSuspense;
function Fr(e, t) {
    t && t.pendingBranch ? (K(e) ? t.effects.push(...e) : t.effects.push(e)) : Tl(e);
}
function Zs(e, t) {
    if (xe) {
        let n = xe.provides;
        const s = xe.parent && xe.parent.provides;
        s === n && (n = xe.provides = Object.create(s)), (n[e] = t);
    }
}
function dt(e, t, n = !1) {
    const s = xe || ke;
    if (s) {
        const o = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
        if (o && e in o) return o[e];
        if (arguments.length > 1) return n && X(t) ? t.call(s.proxy) : t;
    }
}
function Jn(e, t) {
    return Xn(e, null, t);
}
function Fl(e, t) {
    return Xn(e, null, { flush: "post" });
}
const ko = {};
function _t(e, t, n) {
    return Xn(e, t, n);
}
function Xn(e, t, { immediate: n, deep: s, flush: o, onTrack: r, onTrigger: i } = _e) {
    const l = xe;
    let c,
        f = !1,
        _ = !1;
    if (
        (Pe(e)
            ? ((c = () => e.value), (f = $s(e)))
            : It(e)
            ? ((c = () => e), (s = !0))
            : K(e)
            ? ((_ = !0),
              (f = e.some(y => It(y) || $s(y))),
              (c = () =>
                  e.map(y => {
                      if (Pe(y)) return y.value;
                      if (It(y)) return $t(y);
                      if (X(y)) return ft(y, l, 2);
                  })))
            : X(e)
            ? t
                ? (c = () => ft(e, l, 2))
                : (c = () => {
                      if (!(l && l.isUnmounted)) return g && g(), He(e, l, 3, [w]);
                  })
            : (c = We),
        t && s)
    ) {
        const y = c;
        c = () => $t(y());
    }
    let g,
        w = y => {
            g = D.onStop = () => {
                ft(y, l, 4);
            };
        };
    if (fn) return (w = We), t ? n && He(t, l, 3, [c(), _ ? [] : void 0, w]) : c(), We;
    let C = _ ? [] : ko;
    const N = () => {
        if (!!D.active)
            if (t) {
                const y = D.run();
                (s || f || (_ ? y.some((V, U) => on(V, C[U])) : on(y, C))) && (g && g(), He(t, l, 3, [y, C === ko ? void 0 : C, w]), (C = y));
            } else D.run();
    };
    N.allowRecurse = !!t;
    let z;
    o === "sync" ? (z = N) : o === "post" ? (z = () => Ee(N, l && l.suspense)) : (z = () => El(N));
    const D = new Ks(c, z);
    return (
        t ? (n ? N() : (C = D.run())) : o === "post" ? Ee(D.run.bind(D), l && l.suspense) : D.run(),
        () => {
            D.stop(), l && l.scope && Ds(l.scope.effects, D);
        }
    );
}
function Ol(e, t, n) {
    const s = this.proxy,
        o = we(e) ? (e.includes(".") ? Or(s, e) : () => s[e]) : e.bind(s, s);
    let r;
    X(t) ? (r = t) : ((r = t.handler), (n = t));
    const i = xe;
    Ft(this);
    const l = Xn(o, r.bind(s), n);
    return i ? Ft(i) : kt(), l;
}
function Or(e, t) {
    const n = t.split(".");
    return () => {
        let s = e;
        for (let o = 0; o < n.length && s; o++) s = s[n[o]];
        return s;
    };
}
function $t(e, t) {
    if (!ye(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
    if ((t.add(e), Pe(e))) $t(e.value, t);
    else if (K(e)) for (let n = 0; n < e.length; n++) $t(e[n], t);
    else if (fr(e) || At(e))
        e.forEach(n => {
            $t(n, t);
        });
    else if (hr(e)) for (const n in e) $t(e[n], t);
    return e;
}
function Hl() {
    const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() };
    return (
        nt(() => {
            e.isMounted = !0;
        }),
        Kr(() => {
            e.isUnmounting = !0;
        }),
        e
    );
}
const Fe = [Function, Array],
    Rl = {
        name: "BaseTransition",
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: Fe,
            onEnter: Fe,
            onAfterEnter: Fe,
            onEnterCancelled: Fe,
            onBeforeLeave: Fe,
            onLeave: Fe,
            onAfterLeave: Fe,
            onLeaveCancelled: Fe,
            onBeforeAppear: Fe,
            onAppear: Fe,
            onAfterAppear: Fe,
            onAppearCancelled: Fe,
        },
        setup(e, { slots: t }) {
            const n = ii(),
                s = Hl();
            let o;
            return () => {
                const r = t.default && Dr(t.default(), !0);
                if (!r || !r.length) return;
                let i = r[0];
                if (r.length > 1) {
                    for (const z of r)
                        if (z.type !== Ie) {
                            i = z;
                            break;
                        }
                }
                const l = ie(e),
                    { mode: c } = l;
                if (s.isLeaving) return _s(i);
                const f = Co(i);
                if (!f) return _s(i);
                const _ = Cs(f, l, s, n);
                Ss(f, _);
                const g = n.subTree,
                    w = g && Co(g);
                let C = !1;
                const { getTransitionKey: N } = f.type;
                if (N) {
                    const z = N();
                    o === void 0 ? (o = z) : z !== o && ((o = z), (C = !0));
                }
                if (w && w.type !== Ie && (!bt(f, w) || C)) {
                    const z = Cs(w, l, s, n);
                    if ((Ss(w, z), c === "out-in"))
                        return (
                            (s.isLeaving = !0),
                            (z.afterLeave = () => {
                                (s.isLeaving = !1), n.update();
                            }),
                            _s(i)
                        );
                    c === "in-out" &&
                        f.type !== Ie &&
                        (z.delayLeave = (D, y, V) => {
                            const U = Rr(s, w);
                            (U[String(w.key)] = w),
                                (D._leaveCb = () => {
                                    y(), (D._leaveCb = void 0), delete _.delayedLeave;
                                }),
                                (_.delayedLeave = V);
                        });
                }
                return i;
            };
        },
    },
    Hr = Rl;
function Rr(e, t) {
    const { leavingVNodes: n } = e;
    let s = n.get(t.type);
    return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function Cs(e, t, n, s) {
    const {
            appear: o,
            mode: r,
            persisted: i = !1,
            onBeforeEnter: l,
            onEnter: c,
            onAfterEnter: f,
            onEnterCancelled: _,
            onBeforeLeave: g,
            onLeave: w,
            onAfterLeave: C,
            onLeaveCancelled: N,
            onBeforeAppear: z,
            onAppear: D,
            onAfterAppear: y,
            onAppearCancelled: V,
        } = t,
        U = String(e.key),
        G = Rr(n, e),
        te = (M, Y) => {
            M && He(M, s, 9, Y);
        },
        ae = (M, Y) => {
            const Z = Y[1];
            te(M, Y), K(M) ? M.every(oe => oe.length <= 1) && Z() : M.length <= 1 && Z();
        },
        le = {
            mode: r,
            persisted: i,
            beforeEnter(M) {
                let Y = l;
                if (!n.isMounted)
                    if (o) Y = z || l;
                    else return;
                M._leaveCb && M._leaveCb(!0);
                const Z = G[U];
                Z && bt(e, Z) && Z.el._leaveCb && Z.el._leaveCb(), te(Y, [M]);
            },
            enter(M) {
                let Y = c,
                    Z = f,
                    oe = _;
                if (!n.isMounted)
                    if (o) (Y = D || c), (Z = y || f), (oe = V || _);
                    else return;
                let A = !1;
                const ee = (M._enterCb = F => {
                    A || ((A = !0), F ? te(oe, [M]) : te(Z, [M]), le.delayedLeave && le.delayedLeave(), (M._enterCb = void 0));
                });
                Y ? ae(Y, [M, ee]) : ee();
            },
            leave(M, Y) {
                const Z = String(e.key);
                if ((M._enterCb && M._enterCb(!0), n.isUnmounting)) return Y();
                te(g, [M]);
                let oe = !1;
                const A = (M._leaveCb = ee => {
                    oe || ((oe = !0), Y(), ee ? te(N, [M]) : te(C, [M]), (M._leaveCb = void 0), G[Z] === e && delete G[Z]);
                });
                (G[Z] = e), w ? ae(w, [M, A]) : A();
            },
            clone(M) {
                return Cs(M, t, n, s);
            },
        };
    return le;
}
function _s(e) {
    if (Qn(e)) return (e = pt(e)), (e.children = null), e;
}
function Co(e) {
    return Qn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Ss(e, t) {
    e.shapeFlag & 6 && e.component
        ? Ss(e.component.subTree, t)
        : e.shapeFlag & 128
        ? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t);
}
function Dr(e, t = !1, n) {
    let s = [],
        o = 0;
    for (let r = 0; r < e.length; r++) {
        let i = e[r];
        const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : r);
        i.type === Q
            ? (i.patchFlag & 128 && o++, (s = s.concat(Dr(i.children, t, l))))
            : (t || i.type !== Ie) && s.push(l != null ? pt(i, { key: l }) : i);
    }
    if (o > 1) for (let r = 0; r < s.length; r++) s[r].patchFlag = -2;
    return s;
}
function B(e) {
    return X(e) ? { setup: e, name: e.name } : e;
}
const Nt = e => !!e.type.__asyncLoader,
    Qn = e => e.type.__isKeepAlive;
function Dl(e, t) {
    zr(e, "a", t);
}
function zl(e, t) {
    zr(e, "da", t);
}
function zr(e, t, n = xe) {
    const s =
        e.__wdc ||
        (e.__wdc = () => {
            let o = n;
            for (; o; ) {
                if (o.isDeactivated) return;
                o = o.parent;
            }
            return e();
        });
    if ((Zn(t, s, n), n)) {
        let o = n.parent;
        for (; o && o.parent; ) Qn(o.parent.vnode) && Ul(s, t, n, o), (o = o.parent);
    }
}
function Ul(e, t, n, s) {
    const o = Zn(t, e, s, !0);
    Ct(() => {
        Ds(s[t], o);
    }, n);
}
function Zn(e, t, n = xe, s = !1) {
    if (n) {
        const o = n[e] || (n[e] = []),
            r =
                t.__weh ||
                (t.__weh = (...i) => {
                    if (n.isUnmounted) return;
                    Rt(), Ft(n);
                    const l = He(t, n, e, i);
                    return kt(), Dt(), l;
                });
        return s ? o.unshift(r) : o.push(r), r;
    }
}
const tt =
        e =>
        (t, n = xe) =>
            (!fn || e === "sp") && Zn(e, t, n),
    Ur = tt("bm"),
    nt = tt("m"),
    jl = tt("bu"),
    jr = tt("u"),
    Kr = tt("bum"),
    Ct = tt("um"),
    Kl = tt("sp"),
    Wl = tt("rtg"),
    ql = tt("rtc");
function Yl(e, t = xe) {
    Zn("ec", e, t);
}
function So(e, t) {
    const n = ke;
    if (n === null) return e;
    const s = ss(n) || n.proxy,
        o = e.dirs || (e.dirs = []);
    for (let r = 0; r < t.length; r++) {
        let [i, l, c, f = _e] = t[r];
        X(i) && (i = { mounted: i, updated: i }), i.deep && $t(l), o.push({ dir: i, instance: s, value: l, oldValue: void 0, arg: c, modifiers: f });
    }
    return e;
}
function Ye(e, t, n, s) {
    const o = e.dirs,
        r = t && t.dirs;
    for (let i = 0; i < o.length; i++) {
        const l = o[i];
        r && (l.oldValue = r[i].value);
        let c = l.dir[s];
        c && (Rt(), He(c, n, 8, [e.el, l, e, t]), Dt());
    }
}
const eo = "components";
function es(e, t) {
    return qr(eo, e, !0, t) || e;
}
const Wr = Symbol();
function ts(e) {
    return we(e) ? qr(eo, e, !1) || e : e || Wr;
}
function qr(e, t, n = !0, s = !1) {
    const o = ke || xe;
    if (o) {
        const r = o.type;
        if (e === eo) {
            const l = Pc(r, !1);
            if (l && (l === t || l === Ge(t) || l === Un(Ge(t)))) return r;
        }
        const i = Vo(o[e] || r[e], t) || Vo(o.appContext[e], t);
        return !i && s ? r : i;
    }
}
function Vo(e, t) {
    return e && (e[t] || e[Ge(t)] || e[Un(Ge(t))]);
}
function Ce(e, t, n, s) {
    let o;
    const r = n && n[s];
    if (K(e) || we(e)) {
        o = new Array(e.length);
        for (let i = 0, l = e.length; i < l; i++) o[i] = t(e[i], i, void 0, r && r[i]);
    } else if (typeof e == "number") {
        o = new Array(e);
        for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, r && r[i]);
    } else if (ye(e))
        if (e[Symbol.iterator]) o = Array.from(e, (i, l) => t(i, l, void 0, r && r[l]));
        else {
            const i = Object.keys(e);
            o = new Array(i.length);
            for (let l = 0, c = i.length; l < c; l++) {
                const f = i[l];
                o[l] = t(e[f], f, l, r && r[l]);
            }
        }
    else o = [];
    return n && (n[s] = o), o;
}
function R(e, t, n = {}, s, o) {
    if (ke.isCE || (ke.parent && Nt(ke.parent) && ke.parent.isCE)) return E("slot", t === "default" ? null : { name: t }, s && s());
    let r = e[t];
    r && r._c && (r._d = !1), d();
    const i = r && Yr(r(n)),
        l = J(Q, { key: n.key || `_${t}` }, i || (s ? s() : []), i && e._ === 1 ? 64 : -2);
    return !o && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), r && r._c && (r._d = !0), l;
}
function Yr(e) {
    return e.some(t => (Nn(t) ? !(t.type === Ie || (t.type === Q && !Yr(t.children))) : !0)) ? e : null;
}
const Vs = e => (e ? (li(e) ? ss(e) || e.proxy : Vs(e.parent)) : null),
    Mn = $e(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => Vs(e.parent),
        $root: e => Vs(e.root),
        $emit: e => e.emit,
        $options: e => Jr(e),
        $forceUpdate: e => e.f || (e.f = () => Mr(e.update)),
        $nextTick: e => e.n || (e.n = _n.bind(e.proxy)),
        $watch: e => Ol.bind(e),
    }),
    Gl = {
        get({ _: e }, t) {
            const { ctx: n, setupState: s, data: o, props: r, accessCache: i, type: l, appContext: c } = e;
            let f;
            if (t[0] !== "$") {
                const C = i[t];
                if (C !== void 0)
                    switch (C) {
                        case 1:
                            return s[t];
                        case 2:
                            return o[t];
                        case 4:
                            return n[t];
                        case 3:
                            return r[t];
                    }
                else {
                    if (s !== _e && ne(s, t)) return (i[t] = 1), s[t];
                    if (o !== _e && ne(o, t)) return (i[t] = 2), o[t];
                    if ((f = e.propsOptions[0]) && ne(f, t)) return (i[t] = 3), r[t];
                    if (n !== _e && ne(n, t)) return (i[t] = 4), n[t];
                    Es && (i[t] = 0);
                }
            }
            const _ = Mn[t];
            let g, w;
            if (_) return t === "$attrs" && Ne(e, "get", t), _(e);
            if ((g = l.__cssModules) && (g = g[t])) return g;
            if (n !== _e && ne(n, t)) return (i[t] = 4), n[t];
            if (((w = c.config.globalProperties), ne(w, t))) return w[t];
        },
        set({ _: e }, t, n) {
            const { data: s, setupState: o, ctx: r } = e;
            return o !== _e && ne(o, t)
                ? ((o[t] = n), !0)
                : s !== _e && ne(s, t)
                ? ((s[t] = n), !0)
                : ne(e.props, t) || (t[0] === "$" && t.slice(1) in e)
                ? !1
                : ((r[t] = n), !0);
        },
        has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, propsOptions: r } }, i) {
            let l;
            return (
                !!n[i] ||
                (e !== _e && ne(e, i)) ||
                (t !== _e && ne(t, i)) ||
                ((l = r[0]) && ne(l, i)) ||
                ne(s, i) ||
                ne(Mn, i) ||
                ne(o.config.globalProperties, i)
            );
        },
        defineProperty(e, t, n) {
            return n.get != null ? (e._.accessCache[t] = 0) : ne(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
        },
    };
let Es = !0;
function Jl(e) {
    const t = Jr(e),
        n = e.proxy,
        s = e.ctx;
    (Es = !1), t.beforeCreate && Eo(t.beforeCreate, e, "bc");
    const {
        data: o,
        computed: r,
        methods: i,
        watch: l,
        provide: c,
        inject: f,
        created: _,
        beforeMount: g,
        mounted: w,
        beforeUpdate: C,
        updated: N,
        activated: z,
        deactivated: D,
        beforeDestroy: y,
        beforeUnmount: V,
        destroyed: U,
        unmounted: G,
        render: te,
        renderTracked: ae,
        renderTriggered: le,
        errorCaptured: M,
        serverPrefetch: Y,
        expose: Z,
        inheritAttrs: oe,
        components: A,
        directives: ee,
        filters: F,
    } = t;
    if ((f && Xl(f, s, null, e.appContext.config.unwrapInjectedRef), i))
        for (const ge in i) {
            const he = i[ge];
            X(he) && (s[ge] = he.bind(n));
        }
    if (o) {
        const ge = o.call(n, n);
        ye(ge) && (e.data = Kn(ge));
    }
    if (((Es = !0), r))
        for (const ge in r) {
            const he = r[ge],
                Xe = X(he) ? he.bind(n, n) : X(he.get) ? he.get.bind(n, n) : We,
                ls = !X(he) && X(he.set) ? he.set.bind(n) : We,
                jt = me({ get: Xe, set: ls });
            Object.defineProperty(s, ge, { enumerable: !0, configurable: !0, get: () => jt.value, set: St => (jt.value = St) });
        }
    if (l) for (const ge in l) Gr(l[ge], s, n, ge);
    if (c) {
        const ge = X(c) ? c.call(n) : c;
        Reflect.ownKeys(ge).forEach(he => {
            Zs(he, ge[he]);
        });
    }
    _ && Eo(_, e, "c");
    function ue(ge, he) {
        K(he) ? he.forEach(Xe => ge(Xe.bind(n))) : he && ge(he.bind(n));
    }
    if ((ue(Ur, g), ue(nt, w), ue(jl, C), ue(jr, N), ue(Dl, z), ue(zl, D), ue(Yl, M), ue(ql, ae), ue(Wl, le), ue(Kr, V), ue(Ct, G), ue(Kl, Y), K(Z)))
        if (Z.length) {
            const ge = e.exposed || (e.exposed = {});
            Z.forEach(he => {
                Object.defineProperty(ge, he, { get: () => n[he], set: Xe => (n[he] = Xe) });
            });
        } else e.exposed || (e.exposed = {});
    te && e.render === We && (e.render = te), oe != null && (e.inheritAttrs = oe), A && (e.components = A), ee && (e.directives = ee);
}
function Xl(e, t, n = We, s = !1) {
    K(e) && (e = Ts(e));
    for (const o in e) {
        const r = e[o];
        let i;
        ye(r) ? ("default" in r ? (i = dt(r.from || o, r.default, !0)) : (i = dt(r.from || o))) : (i = dt(r)),
            Pe(i) && s ? Object.defineProperty(t, o, { enumerable: !0, configurable: !0, get: () => i.value, set: l => (i.value = l) }) : (t[o] = i);
    }
}
function Eo(e, t, n) {
    He(K(e) ? e.map(s => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Gr(e, t, n, s) {
    const o = s.includes(".") ? Or(n, s) : () => n[s];
    if (we(e)) {
        const r = t[e];
        X(r) && _t(o, r);
    } else if (X(e)) _t(o, e.bind(n));
    else if (ye(e))
        if (K(e)) e.forEach(r => Gr(r, t, n, s));
        else {
            const r = X(e.handler) ? e.handler.bind(n) : t[e.handler];
            X(r) && _t(o, r, e);
        }
}
function Jr(e) {
    const t = e.type,
        { mixins: n, extends: s } = t,
        {
            mixins: o,
            optionsCache: r,
            config: { optionMergeStrategies: i },
        } = e.appContext,
        l = r.get(t);
    let c;
    return l ? (c = l) : !o.length && !n && !s ? (c = t) : ((c = {}), o.length && o.forEach(f => An(c, f, i, !0)), An(c, t, i)), r.set(t, c), c;
}
function An(e, t, n, s = !1) {
    const { mixins: o, extends: r } = t;
    r && An(e, r, n, !0), o && o.forEach(i => An(e, i, n, !0));
    for (const i in t)
        if (!(s && i === "expose")) {
            const l = Ql[i] || (n && n[i]);
            e[i] = l ? l(e[i], t[i]) : t[i];
        }
    return e;
}
const Ql = {
    data: To,
    props: yt,
    emits: yt,
    methods: yt,
    computed: yt,
    beforeCreate: Se,
    created: Se,
    beforeMount: Se,
    mounted: Se,
    beforeUpdate: Se,
    updated: Se,
    beforeDestroy: Se,
    beforeUnmount: Se,
    destroyed: Se,
    unmounted: Se,
    activated: Se,
    deactivated: Se,
    errorCaptured: Se,
    serverPrefetch: Se,
    components: yt,
    directives: yt,
    watch: ec,
    provide: To,
    inject: Zl,
};
function To(e, t) {
    return t
        ? e
            ? function () {
                  return $e(X(e) ? e.call(this, this) : e, X(t) ? t.call(this, this) : t);
              }
            : t
        : e;
}
function Zl(e, t) {
    return yt(Ts(e), Ts(t));
}
function Ts(e) {
    if (K(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function Se(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function yt(e, t) {
    return e ? $e($e(Object.create(null), e), t) : t;
}
function ec(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = $e(Object.create(null), e);
    for (const s in t) n[s] = Se(e[s], t[s]);
    return n;
}
function tc(e, t, n, s = !1) {
    const o = {},
        r = {};
    Vn(r, ns, 1), (e.propsDefaults = Object.create(null)), Xr(e, t, o, r);
    for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
    n ? (e.props = s ? o : bl(o)) : e.type.props ? (e.props = o) : (e.props = r), (e.attrs = r);
}
function nc(e, t, n, s) {
    const {
            props: o,
            attrs: r,
            vnode: { patchFlag: i },
        } = e,
        l = ie(o),
        [c] = e.propsOptions;
    let f = !1;
    if ((s || i > 0) && !(i & 16)) {
        if (i & 8) {
            const _ = e.vnode.dynamicProps;
            for (let g = 0; g < _.length; g++) {
                let w = _[g];
                if (Yn(e.emitsOptions, w)) continue;
                const C = t[w];
                if (c)
                    if (ne(r, w)) C !== r[w] && ((r[w] = C), (f = !0));
                    else {
                        const N = Ge(w);
                        o[N] = Ls(c, l, N, C, e, !1);
                    }
                else C !== r[w] && ((r[w] = C), (f = !0));
            }
        }
    } else {
        Xr(e, t, o, r) && (f = !0);
        let _;
        for (const g in l)
            (!t || (!ne(t, g) && ((_ = Ht(g)) === g || !ne(t, _)))) &&
                (c ? n && (n[g] !== void 0 || n[_] !== void 0) && (o[g] = Ls(c, l, g, void 0, e, !0)) : delete o[g]);
        if (r !== l) for (const g in r) (!t || (!ne(t, g) && !0)) && (delete r[g], (f = !0));
    }
    f && et(e, "set", "$attrs");
}
function Xr(e, t, n, s) {
    const [o, r] = e.propsOptions;
    let i = !1,
        l;
    if (t)
        for (let c in t) {
            if (Jt(c)) continue;
            const f = t[c];
            let _;
            o && ne(o, (_ = Ge(c)))
                ? !r || !r.includes(_)
                    ? (n[_] = f)
                    : ((l || (l = {}))[_] = f)
                : Yn(e.emitsOptions, c) || ((!(c in s) || f !== s[c]) && ((s[c] = f), (i = !0)));
        }
    if (r) {
        const c = ie(n),
            f = l || _e;
        for (let _ = 0; _ < r.length; _++) {
            const g = r[_];
            n[g] = Ls(o, c, g, f[g], e, !ne(f, g));
        }
    }
    return i;
}
function Ls(e, t, n, s, o, r) {
    const i = e[n];
    if (i != null) {
        const l = ne(i, "default");
        if (l && s === void 0) {
            const c = i.default;
            if (i.type !== Function && X(c)) {
                const { propsDefaults: f } = o;
                n in f ? (s = f[n]) : (Ft(o), (s = f[n] = c.call(null, t)), kt());
            } else s = c;
        }
        i[0] && (r && !l ? (s = !1) : i[1] && (s === "" || s === Ht(n)) && (s = !0));
    }
    return s;
}
function Qr(e, t, n = !1) {
    const s = t.propsCache,
        o = s.get(e);
    if (o) return o;
    const r = e.props,
        i = {},
        l = [];
    let c = !1;
    if (!X(e)) {
        const _ = g => {
            c = !0;
            const [w, C] = Qr(g, t, !0);
            $e(i, w), C && l.push(...C);
        };
        !n && t.mixins.length && t.mixins.forEach(_), e.extends && _(e.extends), e.mixins && e.mixins.forEach(_);
    }
    if (!r && !c) return s.set(e, Mt), Mt;
    if (K(r))
        for (let _ = 0; _ < r.length; _++) {
            const g = Ge(r[_]);
            Lo(g) && (i[g] = _e);
        }
    else if (r)
        for (const _ in r) {
            const g = Ge(_);
            if (Lo(g)) {
                const w = r[_],
                    C = (i[g] = K(w) || X(w) ? { type: w } : w);
                if (C) {
                    const N = Io(Boolean, C.type),
                        z = Io(String, C.type);
                    (C[0] = N > -1), (C[1] = z < 0 || N < z), (N > -1 || ne(C, "default")) && l.push(g);
                }
            }
        }
    const f = [i, l];
    return s.set(e, f), f;
}
function Lo(e) {
    return e[0] !== "$";
}
function Mo(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : "";
}
function Ao(e, t) {
    return Mo(e) === Mo(t);
}
function Io(e, t) {
    return K(t) ? t.findIndex(n => Ao(n, e)) : X(t) && Ao(t, e) ? 0 : -1;
}
const Zr = e => e[0] === "_" || e === "$stable",
    to = e => (K(e) ? e.map(Ue) : [Ue(e)]),
    sc = (e, t, n) => {
        if (t._n) return t;
        const s = j((...o) => to(t(...o)), n);
        return (s._c = !1), s;
    },
    ei = (e, t, n) => {
        const s = e._ctx;
        for (const o in e) {
            if (Zr(o)) continue;
            const r = e[o];
            if (X(r)) t[o] = sc(o, r, s);
            else if (r != null) {
                const i = to(r);
                t[o] = () => i;
            }
        }
    },
    ti = (e, t) => {
        const n = to(t);
        e.slots.default = () => n;
    },
    oc = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? ((e.slots = ie(t)), Vn(t, "_", n)) : ei(t, (e.slots = {}));
        } else (e.slots = {}), t && ti(e, t);
        Vn(e.slots, ns, 1);
    },
    rc = (e, t, n) => {
        const { vnode: s, slots: o } = e;
        let r = !0,
            i = _e;
        if (s.shapeFlag & 32) {
            const l = t._;
            l ? (n && l === 1 ? (r = !1) : ($e(o, t), !n && l === 1 && delete o._)) : ((r = !t.$stable), ei(t, o)), (i = t);
        } else t && (ti(e, t), (i = { default: 1 }));
        if (r) for (const l in o) !Zr(l) && !(l in i) && delete o[l];
    };
function ni() {
    return {
        app: null,
        config: {
            isNativeTag: Oi,
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
let ic = 0;
function lc(e, t) {
    return function (s, o = null) {
        X(s) || (s = Object.assign({}, s)), o != null && !ye(o) && (o = null);
        const r = ni(),
            i = new Set();
        let l = !1;
        const c = (r.app = {
            _uid: ic++,
            _component: s,
            _props: o,
            _container: null,
            _context: r,
            _instance: null,
            version: Cc,
            get config() {
                return r.config;
            },
            set config(f) {},
            use(f, ..._) {
                return i.has(f) || (f && X(f.install) ? (i.add(f), f.install(c, ..._)) : X(f) && (i.add(f), f(c, ..._))), c;
            },
            mixin(f) {
                return r.mixins.includes(f) || r.mixins.push(f), c;
            },
            component(f, _) {
                return _ ? ((r.components[f] = _), c) : r.components[f];
            },
            directive(f, _) {
                return _ ? ((r.directives[f] = _), c) : r.directives[f];
            },
            mount(f, _, g) {
                if (!l) {
                    const w = E(s, o);
                    return (
                        (w.appContext = r),
                        _ && t ? t(w, f) : e(w, f, g),
                        (l = !0),
                        (c._container = f),
                        (f.__vue_app__ = c),
                        ss(w.component) || w.component.proxy
                    );
                }
            },
            unmount() {
                l && (e(null, c._container), delete c._container.__vue_app__);
            },
            provide(f, _) {
                return (r.provides[f] = _), c;
            },
        });
        return c;
    };
}
function In(e, t, n, s, o = !1) {
    if (K(e)) {
        e.forEach((w, C) => In(w, t && (K(t) ? t[C] : t), n, s, o));
        return;
    }
    if (Nt(s) && !o) return;
    const r = s.shapeFlag & 4 ? ss(s.component) || s.component.proxy : s.el,
        i = o ? null : r,
        { i: l, r: c } = e,
        f = t && t.r,
        _ = l.refs === _e ? (l.refs = {}) : l.refs,
        g = l.setupState;
    if ((f != null && f !== c && (we(f) ? ((_[f] = null), ne(g, f) && (g[f] = null)) : Pe(f) && (f.value = null)), X(c))) ft(c, l, 12, [i, _]);
    else {
        const w = we(c),
            C = Pe(c);
        if (w || C) {
            const N = () => {
                if (e.f) {
                    const z = w ? _[c] : c.value;
                    o
                        ? K(z) && Ds(z, r)
                        : K(z)
                        ? z.includes(r) || z.push(r)
                        : w
                        ? ((_[c] = [r]), ne(g, c) && (g[c] = _[c]))
                        : ((c.value = [r]), e.k && (_[e.k] = c.value));
                } else w ? ((_[c] = i), ne(g, c) && (g[c] = i)) : C && ((c.value = i), e.k && (_[e.k] = i));
            };
            i ? ((N.id = -1), Ee(N, n)) : N();
        }
    }
}
let rt = !1;
const $n = e => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
    Pn = e => e.nodeType === 8;
function cc(e) {
    const {
            mt: t,
            p: n,
            o: { patchProp: s, createText: o, nextSibling: r, parentNode: i, remove: l, insert: c, createComment: f },
        } = e,
        _ = (y, V) => {
            if (!V.hasChildNodes()) {
                n(null, y, V), Tn(), (V._vnode = y);
                return;
            }
            (rt = !1),
                g(V.firstChild, y, null, null, null),
                Tn(),
                (V._vnode = y),
                rt && console.error("Hydration completed but contains mismatches.");
        },
        g = (y, V, U, G, te, ae = !1) => {
            const le = Pn(y) && y.data === "[",
                M = () => z(y, V, U, G, te, le),
                { type: Y, ref: Z, shapeFlag: oe, patchFlag: A } = V,
                ee = y.nodeType;
            (V.el = y), A === -2 && ((ae = !1), (V.dynamicChildren = null));
            let F = null;
            switch (Y) {
                case an:
                    ee !== 3
                        ? V.children === ""
                            ? (c((V.el = o("")), i(y), y), (F = y))
                            : (F = M())
                        : (y.data !== V.children && ((rt = !0), (y.data = V.children)), (F = r(y)));
                    break;
                case Ie:
                    ee !== 8 || le ? (F = M()) : (F = r(y));
                    break;
                case en:
                    if (ee !== 1 && ee !== 3) F = M();
                    else {
                        F = y;
                        const Ve = !V.children.length;
                        for (let ue = 0; ue < V.staticCount; ue++)
                            Ve && (V.children += F.nodeType === 1 ? F.outerHTML : F.data), ue === V.staticCount - 1 && (V.anchor = F), (F = r(F));
                        return F;
                    }
                    break;
                case Q:
                    le ? (F = N(y, V, U, G, te, ae)) : (F = M());
                    break;
                default:
                    if (oe & 1) ee !== 1 || V.type.toLowerCase() !== y.tagName.toLowerCase() ? (F = M()) : (F = w(y, V, U, G, te, ae));
                    else if (oe & 6) {
                        V.slotScopeIds = te;
                        const Ve = i(y);
                        if (
                            (t(V, Ve, null, U, G, $n(Ve), ae), (F = le ? D(y) : r(y)), F && Pn(F) && F.data === "teleport end" && (F = r(F)), Nt(V))
                        ) {
                            let ue;
                            le ? ((ue = E(Q)), (ue.anchor = F ? F.previousSibling : Ve.lastChild)) : (ue = y.nodeType === 3 ? Be("") : E("div")),
                                (ue.el = y),
                                (V.component.subTree = ue);
                        }
                    } else
                        oe & 64
                            ? ee !== 8
                                ? (F = M())
                                : (F = V.type.hydrate(y, V, U, G, te, ae, e, C))
                            : oe & 128 && (F = V.type.hydrate(y, V, U, G, $n(i(y)), te, ae, e, g));
            }
            return Z != null && In(Z, null, G, V), F;
        },
        w = (y, V, U, G, te, ae) => {
            ae = ae || !!V.dynamicChildren;
            const { type: le, props: M, patchFlag: Y, shapeFlag: Z, dirs: oe } = V,
                A = (le === "input" && oe) || le === "option";
            if (A || Y !== -1) {
                if ((oe && Ye(V, null, U, "created"), M))
                    if (A || !ae || Y & 48)
                        for (const F in M) ((A && F.endsWith("value")) || (dn(F) && !Jt(F))) && s(y, F, null, M[F], !1, void 0, U);
                    else M.onClick && s(y, "onClick", null, M.onClick, !1, void 0, U);
                let ee;
                if (
                    ((ee = M && M.onVnodeBeforeMount) && Oe(ee, U, V),
                    oe && Ye(V, null, U, "beforeMount"),
                    ((ee = M && M.onVnodeMounted) || oe) &&
                        Fr(() => {
                            ee && Oe(ee, U, V), oe && Ye(V, null, U, "mounted");
                        }, G),
                    Z & 16 && !(M && (M.innerHTML || M.textContent)))
                ) {
                    let F = C(y.firstChild, V, y, U, G, te, ae);
                    for (; F; ) {
                        rt = !0;
                        const Ve = F;
                        (F = F.nextSibling), l(Ve);
                    }
                } else Z & 8 && y.textContent !== V.children && ((rt = !0), (y.textContent = V.children));
            }
            return y.nextSibling;
        },
        C = (y, V, U, G, te, ae, le) => {
            le = le || !!V.dynamicChildren;
            const M = V.children,
                Y = M.length;
            for (let Z = 0; Z < Y; Z++) {
                const oe = le ? M[Z] : (M[Z] = Ue(M[Z]));
                if (y) y = g(y, oe, G, te, ae, le);
                else {
                    if (oe.type === an && !oe.children) continue;
                    (rt = !0), n(null, oe, U, null, G, te, $n(U), ae);
                }
            }
            return y;
        },
        N = (y, V, U, G, te, ae) => {
            const { slotScopeIds: le } = V;
            le && (te = te ? te.concat(le) : le);
            const M = i(y),
                Y = C(r(y), V, M, U, G, te, ae);
            return Y && Pn(Y) && Y.data === "]" ? r((V.anchor = Y)) : ((rt = !0), c((V.anchor = f("]")), M, Y), Y);
        },
        z = (y, V, U, G, te, ae) => {
            if (((rt = !0), (V.el = null), ae)) {
                const Y = D(y);
                for (;;) {
                    const Z = r(y);
                    if (Z && Z !== Y) l(Z);
                    else break;
                }
            }
            const le = r(y),
                M = i(y);
            return l(y), n(null, V, M, le, U, G, $n(M), te), le;
        },
        D = y => {
            let V = 0;
            for (; y; )
                if (((y = r(y)), y && Pn(y) && (y.data === "[" && V++, y.data === "]"))) {
                    if (V === 0) return r(y);
                    V--;
                }
            return y;
        };
    return [_, g];
}
const Ee = Fr;
function ac(e) {
    return uc(e, cc);
}
function uc(e, t) {
    const n = ji();
    n.__VUE__ = !0;
    const {
            insert: s,
            remove: o,
            patchProp: r,
            createElement: i,
            createText: l,
            createComment: c,
            setText: f,
            setElementText: _,
            parentNode: g,
            nextSibling: w,
            setScopeId: C = We,
            cloneNode: N,
            insertStaticContent: z,
        } = e,
        D = (a, u, h, x = null, b = null, k = null, T = !1, P = null, S = !!u.dynamicChildren) => {
            if (a === u) return;
            a && !bt(a, u) && ((x = mn(a)), st(a, b, k, !0), (a = null)), u.patchFlag === -2 && ((S = !1), (u.dynamicChildren = null));
            const { type: $, ref: O, shapeFlag: I } = u;
            switch ($) {
                case an:
                    y(a, u, h, x);
                    break;
                case Ie:
                    V(a, u, h, x);
                    break;
                case en:
                    a == null && U(u, h, x, T);
                    break;
                case Q:
                    ee(a, u, h, x, b, k, T, P, S);
                    break;
                default:
                    I & 1
                        ? ae(a, u, h, x, b, k, T, P, S)
                        : I & 6
                        ? F(a, u, h, x, b, k, T, P, S)
                        : (I & 64 || I & 128) && $.process(a, u, h, x, b, k, T, P, S, Vt);
            }
            O != null && b && In(O, a && a.ref, k, u || a, !u);
        },
        y = (a, u, h, x) => {
            if (a == null) s((u.el = l(u.children)), h, x);
            else {
                const b = (u.el = a.el);
                u.children !== a.children && f(b, u.children);
            }
        },
        V = (a, u, h, x) => {
            a == null ? s((u.el = c(u.children || "")), h, x) : (u.el = a.el);
        },
        U = (a, u, h, x) => {
            [a.el, a.anchor] = z(a.children, u, h, x, a.el, a.anchor);
        },
        G = ({ el: a, anchor: u }, h, x) => {
            let b;
            for (; a && a !== u; ) (b = w(a)), s(a, h, x), (a = b);
            s(u, h, x);
        },
        te = ({ el: a, anchor: u }) => {
            let h;
            for (; a && a !== u; ) (h = w(a)), o(a), (a = h);
            o(u);
        },
        ae = (a, u, h, x, b, k, T, P, S) => {
            (T = T || u.type === "svg"), a == null ? le(u, h, x, b, k, T, P, S) : Z(a, u, b, k, T, P, S);
        },
        le = (a, u, h, x, b, k, T, P) => {
            let S, $;
            const { type: O, props: I, shapeFlag: H, transition: W, patchFlag: re, dirs: fe } = a;
            if (a.el && N !== void 0 && re === -1) S = a.el = N(a.el);
            else {
                if (
                    ((S = a.el = i(a.type, k, I && I.is, I)),
                    H & 8 ? _(S, a.children) : H & 16 && Y(a.children, S, null, x, b, k && O !== "foreignObject", T, P),
                    fe && Ye(a, null, x, "created"),
                    I)
                ) {
                    for (const pe in I) pe !== "value" && !Jt(pe) && r(S, pe, null, I[pe], k, a.children, x, b, Qe);
                    "value" in I && r(S, "value", null, I.value), ($ = I.onVnodeBeforeMount) && Oe($, x, a);
                }
                M(S, a, a.scopeId, T, x);
            }
            fe && Ye(a, null, x, "beforeMount");
            const de = (!b || (b && !b.pendingBranch)) && W && !W.persisted;
            de && W.beforeEnter(S),
                s(S, u, h),
                (($ = I && I.onVnodeMounted) || de || fe) &&
                    Ee(() => {
                        $ && Oe($, x, a), de && W.enter(S), fe && Ye(a, null, x, "mounted");
                    }, b);
        },
        M = (a, u, h, x, b) => {
            if ((h && C(a, h), x)) for (let k = 0; k < x.length; k++) C(a, x[k]);
            if (b) {
                let k = b.subTree;
                if (u === k) {
                    const T = b.vnode;
                    M(a, T, T.scopeId, T.slotScopeIds, b.parent);
                }
            }
        },
        Y = (a, u, h, x, b, k, T, P, S = 0) => {
            for (let $ = S; $ < a.length; $++) {
                const O = (a[$] = P ? at(a[$]) : Ue(a[$]));
                D(null, O, u, h, x, b, k, T, P);
            }
        },
        Z = (a, u, h, x, b, k, T) => {
            const P = (u.el = a.el);
            let { patchFlag: S, dynamicChildren: $, dirs: O } = u;
            S |= a.patchFlag & 16;
            const I = a.props || _e,
                H = u.props || _e;
            let W;
            h && vt(h, !1), (W = H.onVnodeBeforeUpdate) && Oe(W, h, u, a), O && Ye(u, a, h, "beforeUpdate"), h && vt(h, !0);
            const re = b && u.type !== "foreignObject";
            if (($ ? oe(a.dynamicChildren, $, P, h, x, re, k) : T || Xe(a, u, P, null, h, x, re, k, !1), S > 0)) {
                if (S & 16) A(P, u, I, H, h, x, b);
                else if ((S & 2 && I.class !== H.class && r(P, "class", null, H.class, b), S & 4 && r(P, "style", I.style, H.style, b), S & 8)) {
                    const fe = u.dynamicProps;
                    for (let de = 0; de < fe.length; de++) {
                        const pe = fe[de],
                            ze = I[pe],
                            Et = H[pe];
                        (Et !== ze || pe === "value") && r(P, pe, ze, Et, b, a.children, h, x, Qe);
                    }
                }
                S & 1 && a.children !== u.children && _(P, u.children);
            } else !T && $ == null && A(P, u, I, H, h, x, b);
            ((W = H.onVnodeUpdated) || O) &&
                Ee(() => {
                    W && Oe(W, h, u, a), O && Ye(u, a, h, "updated");
                }, x);
        },
        oe = (a, u, h, x, b, k, T) => {
            for (let P = 0; P < u.length; P++) {
                const S = a[P],
                    $ = u[P],
                    O = S.el && (S.type === Q || !bt(S, $) || S.shapeFlag & 70) ? g(S.el) : h;
                D(S, $, O, null, x, b, k, T, !0);
            }
        },
        A = (a, u, h, x, b, k, T) => {
            if (h !== x) {
                for (const P in x) {
                    if (Jt(P)) continue;
                    const S = x[P],
                        $ = h[P];
                    S !== $ && P !== "value" && r(a, P, $, S, T, u.children, b, k, Qe);
                }
                if (h !== _e) for (const P in h) !Jt(P) && !(P in x) && r(a, P, h[P], null, T, u.children, b, k, Qe);
                "value" in x && r(a, "value", h.value, x.value);
            }
        },
        ee = (a, u, h, x, b, k, T, P, S) => {
            const $ = (u.el = a ? a.el : l("")),
                O = (u.anchor = a ? a.anchor : l(""));
            let { patchFlag: I, dynamicChildren: H, slotScopeIds: W } = u;
            W && (P = P ? P.concat(W) : W),
                a == null
                    ? (s($, h, x), s(O, h, x), Y(u.children, h, O, b, k, T, P, S))
                    : I > 0 && I & 64 && H && a.dynamicChildren
                    ? (oe(a.dynamicChildren, H, h, b, k, T, P), (u.key != null || (b && u === b.subTree)) && si(a, u, !0))
                    : Xe(a, u, h, O, b, k, T, P, S);
        },
        F = (a, u, h, x, b, k, T, P, S) => {
            (u.slotScopeIds = P), a == null ? (u.shapeFlag & 512 ? b.ctx.activate(u, h, x, T, S) : Ve(u, h, x, b, k, T, S)) : ue(a, u, S);
        },
        Ve = (a, u, h, x, b, k, T) => {
            const P = (a.component = yc(a, x, b));
            if ((Qn(a) && (P.ctx.renderer = Vt), bc(P), P.asyncDep)) {
                if ((b && b.registerDep(P, ge), !a.el)) {
                    const S = (P.subTree = E(Ie));
                    V(null, S, u, h);
                }
                return;
            }
            ge(P, a, u, h, b, k, T);
        },
        ue = (a, u, h) => {
            const x = (u.component = a.component);
            if (Il(a, u, h))
                if (x.asyncDep && !x.asyncResolved) {
                    he(x, u, h);
                    return;
                } else (x.next = u), Vl(x.update), x.update();
            else (u.el = a.el), (x.vnode = u);
        },
        ge = (a, u, h, x, b, k, T) => {
            const P = () => {
                    if (a.isMounted) {
                        let { next: O, bu: I, u: H, parent: W, vnode: re } = a,
                            fe = O,
                            de;
                        vt(a, !1),
                            O ? ((O.el = re.el), he(a, O, T)) : (O = re),
                            I && fs(I),
                            (de = O.props && O.props.onVnodeBeforeUpdate) && Oe(de, W, O, re),
                            vt(a, !0);
                        const pe = ds(a),
                            ze = a.subTree;
                        (a.subTree = pe),
                            D(ze, pe, g(ze.el), mn(ze), a, b, k),
                            (O.el = pe.el),
                            fe === null && Nl(a, pe.el),
                            H && Ee(H, b),
                            (de = O.props && O.props.onVnodeUpdated) && Ee(() => Oe(de, W, O, re), b);
                    } else {
                        let O;
                        const { el: I, props: H } = u,
                            { bm: W, m: re, parent: fe } = a,
                            de = Nt(u);
                        if ((vt(a, !1), W && fs(W), !de && (O = H && H.onVnodeBeforeMount) && Oe(O, fe, u), vt(a, !0), I && as)) {
                            const pe = () => {
                                (a.subTree = ds(a)), as(I, a.subTree, a, b, null);
                            };
                            de ? u.type.__asyncLoader().then(() => !a.isUnmounted && pe()) : pe();
                        } else {
                            const pe = (a.subTree = ds(a));
                            D(null, pe, h, x, a, b, k), (u.el = pe.el);
                        }
                        if ((re && Ee(re, b), !de && (O = H && H.onVnodeMounted))) {
                            const pe = u;
                            Ee(() => Oe(O, fe, pe), b);
                        }
                        (u.shapeFlag & 256 || (fe && Nt(fe.vnode) && fe.vnode.shapeFlag & 256)) && a.a && Ee(a.a, b),
                            (a.isMounted = !0),
                            (u = h = x = null);
                    }
                },
                S = (a.effect = new Ks(P, () => Mr($), a.scope)),
                $ = (a.update = () => S.run());
            ($.id = a.uid), vt(a, !0), $();
        },
        he = (a, u, h) => {
            u.component = a;
            const x = a.vnode.props;
            (a.vnode = u), (a.next = null), nc(a, u.props, x, h), rc(a, u.children, h), Rt(), qn(void 0, a.update), Dt();
        },
        Xe = (a, u, h, x, b, k, T, P, S = !1) => {
            const $ = a && a.children,
                O = a ? a.shapeFlag : 0,
                I = u.children,
                { patchFlag: H, shapeFlag: W } = u;
            if (H > 0) {
                if (H & 128) {
                    jt($, I, h, x, b, k, T, P, S);
                    return;
                } else if (H & 256) {
                    ls($, I, h, x, b, k, T, P, S);
                    return;
                }
            }
            W & 8
                ? (O & 16 && Qe($, b, k), I !== $ && _(h, I))
                : O & 16
                ? W & 16
                    ? jt($, I, h, x, b, k, T, P, S)
                    : Qe($, b, k, !0)
                : (O & 8 && _(h, ""), W & 16 && Y(I, h, x, b, k, T, P, S));
        },
        ls = (a, u, h, x, b, k, T, P, S) => {
            (a = a || Mt), (u = u || Mt);
            const $ = a.length,
                O = u.length,
                I = Math.min($, O);
            let H;
            for (H = 0; H < I; H++) {
                const W = (u[H] = S ? at(u[H]) : Ue(u[H]));
                D(a[H], W, h, null, b, k, T, P, S);
            }
            $ > O ? Qe(a, b, k, !0, !1, I) : Y(u, h, x, b, k, T, P, S, I);
        },
        jt = (a, u, h, x, b, k, T, P, S) => {
            let $ = 0;
            const O = u.length;
            let I = a.length - 1,
                H = O - 1;
            for (; $ <= I && $ <= H; ) {
                const W = a[$],
                    re = (u[$] = S ? at(u[$]) : Ue(u[$]));
                if (bt(W, re)) D(W, re, h, null, b, k, T, P, S);
                else break;
                $++;
            }
            for (; $ <= I && $ <= H; ) {
                const W = a[I],
                    re = (u[H] = S ? at(u[H]) : Ue(u[H]));
                if (bt(W, re)) D(W, re, h, null, b, k, T, P, S);
                else break;
                I--, H--;
            }
            if ($ > I) {
                if ($ <= H) {
                    const W = H + 1,
                        re = W < O ? u[W].el : x;
                    for (; $ <= H; ) D(null, (u[$] = S ? at(u[$]) : Ue(u[$])), h, re, b, k, T, P, S), $++;
                }
            } else if ($ > H) for (; $ <= I; ) st(a[$], b, k, !0), $++;
            else {
                const W = $,
                    re = $,
                    fe = new Map();
                for ($ = re; $ <= H; $++) {
                    const Le = (u[$] = S ? at(u[$]) : Ue(u[$]));
                    Le.key != null && fe.set(Le.key, $);
                }
                let de,
                    pe = 0;
                const ze = H - re + 1;
                let Et = !1,
                    fo = 0;
                const Kt = new Array(ze);
                for ($ = 0; $ < ze; $++) Kt[$] = 0;
                for ($ = W; $ <= I; $++) {
                    const Le = a[$];
                    if (pe >= ze) {
                        st(Le, b, k, !0);
                        continue;
                    }
                    let qe;
                    if (Le.key != null) qe = fe.get(Le.key);
                    else
                        for (de = re; de <= H; de++)
                            if (Kt[de - re] === 0 && bt(Le, u[de])) {
                                qe = de;
                                break;
                            }
                    qe === void 0
                        ? st(Le, b, k, !0)
                        : ((Kt[qe - re] = $ + 1), qe >= fo ? (fo = qe) : (Et = !0), D(Le, u[qe], h, null, b, k, T, P, S), pe++);
                }
                const _o = Et ? fc(Kt) : Mt;
                for (de = _o.length - 1, $ = ze - 1; $ >= 0; $--) {
                    const Le = re + $,
                        qe = u[Le],
                        ho = Le + 1 < O ? u[Le + 1].el : x;
                    Kt[$] === 0 ? D(null, qe, h, ho, b, k, T, P, S) : Et && (de < 0 || $ !== _o[de] ? St(qe, h, ho, 2) : de--);
                }
            }
        },
        St = (a, u, h, x, b = null) => {
            const { el: k, type: T, transition: P, children: S, shapeFlag: $ } = a;
            if ($ & 6) {
                St(a.component.subTree, u, h, x);
                return;
            }
            if ($ & 128) {
                a.suspense.move(u, h, x);
                return;
            }
            if ($ & 64) {
                T.move(a, u, h, Vt);
                return;
            }
            if (T === Q) {
                s(k, u, h);
                for (let I = 0; I < S.length; I++) St(S[I], u, h, x);
                s(a.anchor, u, h);
                return;
            }
            if (T === en) {
                G(a, u, h);
                return;
            }
            if (x !== 2 && $ & 1 && P)
                if (x === 0) P.beforeEnter(k), s(k, u, h), Ee(() => P.enter(k), b);
                else {
                    const { leave: I, delayLeave: H, afterLeave: W } = P,
                        re = () => s(k, u, h),
                        fe = () => {
                            I(k, () => {
                                re(), W && W();
                            });
                        };
                    H ? H(k, re, fe) : fe();
                }
            else s(k, u, h);
        },
        st = (a, u, h, x = !1, b = !1) => {
            const { type: k, props: T, ref: P, children: S, dynamicChildren: $, shapeFlag: O, patchFlag: I, dirs: H } = a;
            if ((P != null && In(P, null, h, a, !0), O & 256)) {
                u.ctx.deactivate(a);
                return;
            }
            const W = O & 1 && H,
                re = !Nt(a);
            let fe;
            if ((re && (fe = T && T.onVnodeBeforeUnmount) && Oe(fe, u, a), O & 6)) Ei(a.component, h, x);
            else {
                if (O & 128) {
                    a.suspense.unmount(h, x);
                    return;
                }
                W && Ye(a, null, u, "beforeUnmount"),
                    O & 64
                        ? a.type.remove(a, u, h, b, Vt, x)
                        : $ && (k !== Q || (I > 0 && I & 64))
                        ? Qe($, u, h, !1, !0)
                        : ((k === Q && I & 384) || (!b && O & 16)) && Qe(S, u, h),
                    x && ao(a);
            }
            ((re && (fe = T && T.onVnodeUnmounted)) || W) &&
                Ee(() => {
                    fe && Oe(fe, u, a), W && Ye(a, null, u, "unmounted");
                }, h);
        },
        ao = a => {
            const { type: u, el: h, anchor: x, transition: b } = a;
            if (u === Q) {
                Vi(h, x);
                return;
            }
            if (u === en) {
                te(a);
                return;
            }
            const k = () => {
                o(h), b && !b.persisted && b.afterLeave && b.afterLeave();
            };
            if (a.shapeFlag & 1 && b && !b.persisted) {
                const { leave: T, delayLeave: P } = b,
                    S = () => T(h, k);
                P ? P(a.el, k, S) : S();
            } else k();
        },
        Vi = (a, u) => {
            let h;
            for (; a !== u; ) (h = w(a)), o(a), (a = h);
            o(u);
        },
        Ei = (a, u, h) => {
            const { bum: x, scope: b, update: k, subTree: T, um: P } = a;
            x && fs(x),
                b.stop(),
                k && ((k.active = !1), st(T, a, u, h)),
                P && Ee(P, u),
                Ee(() => {
                    a.isUnmounted = !0;
                }, u),
                u &&
                    u.pendingBranch &&
                    !u.isUnmounted &&
                    a.asyncDep &&
                    !a.asyncResolved &&
                    a.suspenseId === u.pendingId &&
                    (u.deps--, u.deps === 0 && u.resolve());
        },
        Qe = (a, u, h, x = !1, b = !1, k = 0) => {
            for (let T = k; T < a.length; T++) st(a[T], u, h, x, b);
        },
        mn = a => (a.shapeFlag & 6 ? mn(a.component.subTree) : a.shapeFlag & 128 ? a.suspense.next() : w(a.anchor || a.el)),
        uo = (a, u, h) => {
            a == null ? u._vnode && st(u._vnode, null, null, !0) : D(u._vnode || null, a, u, null, null, null, h), Tn(), (u._vnode = a);
        },
        Vt = { p: D, um: st, m: St, r: ao, mt: Ve, mc: Y, pc: Xe, pbc: oe, n: mn, o: e };
    let cs, as;
    return t && ([cs, as] = t(Vt)), { render: uo, hydrate: cs, createApp: lc(uo, cs) };
}
function vt({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
}
function si(e, t, n = !1) {
    const s = e.children,
        o = t.children;
    if (K(s) && K(o))
        for (let r = 0; r < s.length; r++) {
            const i = s[r];
            let l = o[r];
            l.shapeFlag & 1 &&
                !l.dynamicChildren &&
                ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = o[r] = at(o[r])), (l.el = i.el)), n || si(i, l));
        }
}
function fc(e) {
    const t = e.slice(),
        n = [0];
    let s, o, r, i, l;
    const c = e.length;
    for (s = 0; s < c; s++) {
        const f = e[s];
        if (f !== 0) {
            if (((o = n[n.length - 1]), e[o] < f)) {
                (t[s] = o), n.push(s);
                continue;
            }
            for (r = 0, i = n.length - 1; r < i; ) (l = (r + i) >> 1), e[n[l]] < f ? (r = l + 1) : (i = l);
            f < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), (n[r] = s));
        }
    }
    for (r = n.length, i = n[r - 1]; r-- > 0; ) (n[r] = i), (i = t[i]);
    return n;
}
const dc = e => e.__isTeleport,
    Q = Symbol(void 0),
    an = Symbol(void 0),
    Ie = Symbol(void 0),
    en = Symbol(void 0),
    tn = [];
let Ke = null;
function d(e = !1) {
    tn.push((Ke = e ? null : []));
}
function _c() {
    tn.pop(), (Ke = tn[tn.length - 1] || null);
}
let un = 1;
function No(e) {
    un += e;
}
function oi(e) {
    return (e.dynamicChildren = un > 0 ? Ke || Mt : null), _c(), un > 0 && Ke && Ke.push(e), e;
}
function m(e, t, n, s, o, r) {
    return oi(p(e, t, n, s, o, r, !0));
}
function J(e, t, n, s, o) {
    return oi(E(e, t, n, s, o, !0));
}
function Nn(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function bt(e, t) {
    return e.type === t.type && e.key === t.key;
}
const ns = "__vInternal",
    ri = ({ key: e }) => (e != null ? e : null),
    Cn = ({ ref: e, ref_key: t, ref_for: n }) => (e != null ? (we(e) || Pe(e) || X(e) ? { i: ke, r: e, k: t, f: !!n } : e) : null);
function p(e, t = null, n = null, s = 0, o = null, r = e === Q ? 0 : 1, i = !1, l = !1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && ri(t),
        ref: t && Cn(t),
        scopeId: Gn,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: r,
        patchFlag: s,
        dynamicProps: o,
        dynamicChildren: null,
        appContext: null,
    };
    return (
        l ? (no(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= we(n) ? 8 : 16),
        un > 0 && !i && Ke && (c.patchFlag > 0 || r & 6) && c.patchFlag !== 32 && Ke.push(c),
        c
    );
}
const E = hc;
function hc(e, t = null, n = null, s = 0, o = null, r = !1) {
    if (((!e || e === Wr) && (e = Ie), Nn(e))) {
        const l = pt(e, t, !0);
        return n && no(l, n), un > 0 && !r && Ke && (l.shapeFlag & 6 ? (Ke[Ke.indexOf(e)] = l) : Ke.push(l)), (l.patchFlag |= -2), l;
    }
    if ((kc(e) && (e = e.__vccOpts), t)) {
        t = pc(t);
        let { class: l, style: c } = t;
        l && !we(l) && (t.class = ve(l)), ye(c) && (Cr(c) && !K(c) && (c = $e({}, c)), (t.style = Hs(c)));
    }
    const i = we(e) ? 1 : Bl(e) ? 128 : dc(e) ? 64 : ye(e) ? 4 : X(e) ? 2 : 0;
    return p(e, t, n, s, o, i, r, !0);
}
function pc(e) {
    return e ? (Cr(e) || ns in e ? $e({}, e) : e) : null;
}
function pt(e, t, n = !1) {
    const { props: s, ref: o, patchFlag: r, children: i } = e,
        l = t ? Sn(s || {}, t) : s;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: l,
        key: l && ri(l),
        ref: t && t.ref ? (n && o ? (K(o) ? o.concat(Cn(t)) : [o, Cn(t)]) : Cn(t)) : o,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Q ? (r === -1 ? 16 : r | 16) : r,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && pt(e.ssContent),
        ssFallback: e.ssFallback && pt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
    };
}
function Be(e = " ", t = 0) {
    return E(an, null, e, t);
}
function vc(e, t) {
    const n = E(en, null, e);
    return (n.staticCount = t), n;
}
function q(e = "", t = !1) {
    return t ? (d(), J(Ie, null, e)) : E(Ie, null, e);
}
function Ue(e) {
    return e == null || typeof e == "boolean" ? E(Ie) : K(e) ? E(Q, null, e.slice()) : typeof e == "object" ? at(e) : E(an, null, String(e));
}
function at(e) {
    return e.el === null || e.memo ? e : pt(e);
}
function no(e, t) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (t == null) t = null;
    else if (K(t)) n = 16;
    else if (typeof t == "object")
        if (s & 65) {
            const o = t.default;
            o && (o._c && (o._d = !1), no(e, o()), o._c && (o._d = !0));
            return;
        } else {
            n = 32;
            const o = t._;
            !o && !(ns in t) ? (t._ctx = ke) : o === 3 && ke && (ke.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else X(t) ? ((t = { default: t, _ctx: ke }), (n = 32)) : ((t = String(t)), s & 64 ? ((n = 16), (t = [Be(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
}
function Sn(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const o in s)
            if (o === "class") t.class !== s.class && (t.class = ve([t.class, s.class]));
            else if (o === "style") t.style = Hs([t.style, s.style]);
            else if (dn(o)) {
                const r = t[o],
                    i = s[o];
                i && r !== i && !(K(r) && r.includes(i)) && (t[o] = r ? [].concat(r, i) : i);
            } else o !== "" && (t[o] = s[o]);
    }
    return t;
}
function Oe(e, t, n, s = null) {
    He(e, t, 7, [n, s]);
}
const mc = ni();
let gc = 0;
function yc(e, t, n) {
    const s = e.type,
        o = (t ? t.appContext : e.appContext) || mc,
        r = {
            uid: gc++,
            vnode: e,
            type: s,
            parent: t,
            appContext: o,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new Ki(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(o.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Qr(s, o),
            emitsOptions: Br(s, o),
            emit: null,
            emitted: null,
            propsDefaults: _e,
            inheritAttrs: s.inheritAttrs,
            ctx: _e,
            data: _e,
            props: _e,
            attrs: _e,
            slots: _e,
            refs: _e,
            setupState: _e,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
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
    return (r.ctx = { _: r }), (r.root = t ? t.root : r), (r.emit = Ll.bind(null, r)), e.ce && e.ce(r), r;
}
let xe = null;
const ii = () => xe || ke,
    Ft = e => {
        (xe = e), e.scope.on();
    },
    kt = () => {
        xe && xe.scope.off(), (xe = null);
    };
function li(e) {
    return e.vnode.shapeFlag & 4;
}
let fn = !1;
function bc(e, t = !1) {
    fn = t;
    const { props: n, children: s } = e.vnode,
        o = li(e);
    tc(e, n, o, t), oc(e, s);
    const r = o ? wc(e, t) : void 0;
    return (fn = !1), r;
}
function wc(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = Xt(new Proxy(e.ctx, Gl)));
    const { setup: s } = n;
    if (s) {
        const o = (e.setupContext = s.length > 1 ? $c(e) : null);
        Ft(e), Rt();
        const r = ft(s, e, 0, [e.props, o]);
        if ((Dt(), kt(), dr(r))) {
            if ((r.then(kt, kt), t))
                return r
                    .then(i => {
                        Bo(e, i, t);
                    })
                    .catch(i => {
                        Wn(i, e, 0);
                    });
            e.asyncDep = r;
        } else Bo(e, r, t);
    } else ci(e, t);
}
function Bo(e, t, n) {
    X(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : ye(t) && (e.setupState = Tr(t)), ci(e, n);
}
let Fo;
function ci(e, t, n) {
    const s = e.type;
    if (!e.render) {
        if (!t && Fo && !s.render) {
            const o = s.template;
            if (o) {
                const { isCustomElement: r, compilerOptions: i } = e.appContext.config,
                    { delimiters: l, compilerOptions: c } = s,
                    f = $e($e({ isCustomElement: r, delimiters: l }, i), c);
                s.render = Fo(o, f);
            }
        }
        e.render = s.render || We;
    }
    Ft(e), Rt(), Jl(e), Dt(), kt();
}
function xc(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return Ne(e, "get", "$attrs"), t[n];
        },
    });
}
function $c(e) {
    const t = s => {
        e.exposed = s || {};
    };
    let n;
    return {
        get attrs() {
            return n || (n = xc(e));
        },
        slots: e.slots,
        emit: e.emit,
        expose: t,
    };
}
function ss(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy(Tr(Xt(e.exposed)), {
                get(t, n) {
                    if (n in t) return t[n];
                    if (n in Mn) return Mn[n](e);
                },
            }))
        );
}
function Pc(e, t = !0) {
    return X(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function kc(e) {
    return X(e) && "__vccOpts" in e;
}
const me = (e, t) => kl(e, t, fn);
function Bn(e, t, n) {
    const s = arguments.length;
    return s === 2
        ? ye(t) && !K(t)
            ? Nn(t)
                ? E(e, null, [t])
                : E(e, t)
            : E(e, null, t)
        : (s > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : s === 3 && Nn(n) && (n = [n]), E(e, t, n));
}
const Cc = "3.2.37",
    Sc = "http://www.w3.org/2000/svg",
    wt = typeof document != "undefined" ? document : null,
    Oo = wt && wt.createElement("template"),
    Vc = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, s) => {
            const o = t ? wt.createElementNS(Sc, e) : wt.createElement(e, n ? { is: n } : void 0);
            return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
        },
        createText: e => wt.createTextNode(e),
        createComment: e => wt.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => wt.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "");
        },
        cloneNode(e) {
            const t = e.cloneNode(!0);
            return "_value" in e && (t._value = e._value), t;
        },
        insertStaticContent(e, t, n, s, o, r) {
            const i = n ? n.previousSibling : t.lastChild;
            if (o && (o === r || o.nextSibling)) for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); );
            else {
                Oo.innerHTML = s ? `<svg>${e}</svg>` : e;
                const l = Oo.content;
                if (s) {
                    const c = l.firstChild;
                    for (; c.firstChild; ) l.appendChild(c.firstChild);
                    l.removeChild(c);
                }
                t.insertBefore(l, n);
            }
            return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
        },
    };
function Ec(e, t, n) {
    const s = e._vtc;
    s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : (e.className = t);
}
function Tc(e, t, n) {
    const s = e.style,
        o = we(n);
    if (n && !o) {
        for (const r in n) Ms(s, r, n[r]);
        if (t && !we(t)) for (const r in t) n[r] == null && Ms(s, r, "");
    } else {
        const r = s.display;
        o ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
    }
}
const Ho = /\s*!important$/;
function Ms(e, t, n) {
    if (K(n)) n.forEach(s => Ms(e, t, s));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
        const s = Lc(e, t);
        Ho.test(n) ? e.setProperty(Ht(s), n.replace(Ho, ""), "important") : (e[s] = n);
    }
}
const Ro = ["Webkit", "Moz", "ms"],
    hs = {};
function Lc(e, t) {
    const n = hs[t];
    if (n) return n;
    let s = Ge(t);
    if (s !== "filter" && s in e) return (hs[t] = s);
    s = Un(s);
    for (let o = 0; o < Ro.length; o++) {
        const r = Ro[o] + s;
        if (r in e) return (hs[t] = r);
    }
    return t;
}
const Do = "http://www.w3.org/1999/xlink";
function Mc(e, t, n, s, o) {
    if (s && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(Do, t.slice(6, t.length)) : e.setAttributeNS(Do, t, n);
    else {
        const r = Ii(t);
        n == null || (r && !ar(n)) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
    }
}
function Ac(e, t, n, s, o, r, i) {
    if (t === "innerHTML" || t === "textContent") {
        s && i(s, o, r), (e[t] = n == null ? "" : n);
        return;
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const c = n == null ? "" : n;
        (e.value !== c || e.tagName === "OPTION") && (e.value = c), n == null && e.removeAttribute(t);
        return;
    }
    let l = !1;
    if (n === "" || n == null) {
        const c = typeof e[t];
        c === "boolean" ? (n = ar(n)) : n == null && c === "string" ? ((n = ""), (l = !0)) : c === "number" && ((n = 0), (l = !0));
    }
    try {
        e[t] = n;
    } catch {}
    l && e.removeAttribute(t);
}
const [ai, Ic] = (() => {
    let e = Date.now,
        t = !1;
    if (typeof window != "undefined") {
        Date.now() > document.createEvent("Event").timeStamp && (e = performance.now.bind(performance));
        const n = navigator.userAgent.match(/firefox\/(\d+)/i);
        t = !!(n && Number(n[1]) <= 53);
    }
    return [e, t];
})();
let As = 0;
const Nc = Promise.resolve(),
    Bc = () => {
        As = 0;
    },
    Fc = () => As || (Nc.then(Bc), (As = ai()));
function Oc(e, t, n, s) {
    e.addEventListener(t, n, s);
}
function Hc(e, t, n, s) {
    e.removeEventListener(t, n, s);
}
function Rc(e, t, n, s, o = null) {
    const r = e._vei || (e._vei = {}),
        i = r[t];
    if (s && i) i.value = s;
    else {
        const [l, c] = Dc(t);
        if (s) {
            const f = (r[t] = zc(s, o));
            Oc(e, l, f, c);
        } else i && (Hc(e, l, i, c), (r[t] = void 0));
    }
}
const zo = /(?:Once|Passive|Capture)$/;
function Dc(e) {
    let t;
    if (zo.test(e)) {
        t = {};
        let n;
        for (; (n = e.match(zo)); ) (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
    }
    return [Ht(e.slice(2)), t];
}
function zc(e, t) {
    const n = s => {
        const o = s.timeStamp || ai();
        (Ic || o >= n.attached - 1) && He(Uc(s, n.value), t, 5, [s]);
    };
    return (n.value = e), (n.attached = Fc()), n;
}
function Uc(e, t) {
    if (K(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                n.call(e), (e._stopped = !0);
            }),
            t.map(s => o => !o._stopped && s && s(o))
        );
    } else return t;
}
const Uo = /^on[a-z]/,
    jc = (e, t, n, s, o = !1, r, i, l, c) => {
        t === "class"
            ? Ec(e, s, o)
            : t === "style"
            ? Tc(e, n, s)
            : dn(t)
            ? Rs(t) || Rc(e, t, n, s, i)
            : (t[0] === "." ? ((t = t.slice(1)), !0) : t[0] === "^" ? ((t = t.slice(1)), !1) : Kc(e, t, s, o))
            ? Ac(e, t, s, r, i, l, c)
            : (t === "true-value" ? (e._trueValue = s) : t === "false-value" && (e._falseValue = s), Mc(e, t, s, o));
    };
function Kc(e, t, n, s) {
    return s
        ? !!(t === "innerHTML" || t === "textContent" || (t in e && Uo.test(t) && X(n)))
        : t === "spellcheck" ||
          t === "draggable" ||
          t === "translate" ||
          t === "form" ||
          (t === "list" && e.tagName === "INPUT") ||
          (t === "type" && e.tagName === "TEXTAREA") ||
          (Uo.test(t) && we(n))
        ? !1
        : t in e;
}
const it = "transition",
    Wt = "animation",
    os = (e, { slots: t }) => Bn(Hr, Wc(e), t);
os.displayName = "Transition";
const ui = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
};
os.props = $e({}, Hr.props, ui);
const mt = (e, t = []) => {
        K(e) ? e.forEach(n => n(...t)) : e && e(...t);
    },
    jo = e => (e ? (K(e) ? e.some(t => t.length > 1) : e.length > 1) : !1);
function Wc(e) {
    const t = {};
    for (const A in e) A in ui || (t[A] = e[A]);
    if (e.css === !1) return t;
    const {
            name: n = "v",
            type: s,
            duration: o,
            enterFromClass: r = `${n}-enter-from`,
            enterActiveClass: i = `${n}-enter-active`,
            enterToClass: l = `${n}-enter-to`,
            appearFromClass: c = r,
            appearActiveClass: f = i,
            appearToClass: _ = l,
            leaveFromClass: g = `${n}-leave-from`,
            leaveActiveClass: w = `${n}-leave-active`,
            leaveToClass: C = `${n}-leave-to`,
        } = e,
        N = qc(o),
        z = N && N[0],
        D = N && N[1],
        {
            onBeforeEnter: y,
            onEnter: V,
            onEnterCancelled: U,
            onLeave: G,
            onLeaveCancelled: te,
            onBeforeAppear: ae = y,
            onAppear: le = V,
            onAppearCancelled: M = U,
        } = t,
        Y = (A, ee, F) => {
            gt(A, ee ? _ : l), gt(A, ee ? f : i), F && F();
        },
        Z = (A, ee) => {
            (A._isLeaving = !1), gt(A, g), gt(A, C), gt(A, w), ee && ee();
        },
        oe = A => (ee, F) => {
            const Ve = A ? le : V,
                ue = () => Y(ee, A, F);
            mt(Ve, [ee, ue]),
                Ko(() => {
                    gt(ee, A ? c : r), lt(ee, A ? _ : l), jo(Ve) || Wo(ee, s, z, ue);
                });
        };
    return $e(t, {
        onBeforeEnter(A) {
            mt(y, [A]), lt(A, r), lt(A, i);
        },
        onBeforeAppear(A) {
            mt(ae, [A]), lt(A, c), lt(A, f);
        },
        onEnter: oe(!1),
        onAppear: oe(!0),
        onLeave(A, ee) {
            A._isLeaving = !0;
            const F = () => Z(A, ee);
            lt(A, g),
                Jc(),
                lt(A, w),
                Ko(() => {
                    !A._isLeaving || (gt(A, g), lt(A, C), jo(G) || Wo(A, s, D, F));
                }),
                mt(G, [A, F]);
        },
        onEnterCancelled(A) {
            Y(A, !1), mt(U, [A]);
        },
        onAppearCancelled(A) {
            Y(A, !0), mt(M, [A]);
        },
        onLeaveCancelled(A) {
            Z(A), mt(te, [A]);
        },
    });
}
function qc(e) {
    if (e == null) return null;
    if (ye(e)) return [ps(e.enter), ps(e.leave)];
    {
        const t = ps(e);
        return [t, t];
    }
}
function ps(e) {
    return pr(e);
}
function lt(e, t) {
    t.split(/\s+/).forEach(n => n && e.classList.add(n)), (e._vtc || (e._vtc = new Set())).add(t);
}
function gt(e, t) {
    t.split(/\s+/).forEach(s => s && e.classList.remove(s));
    const { _vtc: n } = e;
    n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Ko(e) {
    requestAnimationFrame(() => {
        requestAnimationFrame(e);
    });
}
let Yc = 0;
function Wo(e, t, n, s) {
    const o = (e._endId = ++Yc),
        r = () => {
            o === e._endId && s();
        };
    if (n) return setTimeout(r, n);
    const { type: i, timeout: l, propCount: c } = Gc(e, t);
    if (!i) return s();
    const f = i + "end";
    let _ = 0;
    const g = () => {
            e.removeEventListener(f, w), r();
        },
        w = C => {
            C.target === e && ++_ >= c && g();
        };
    setTimeout(() => {
        _ < c && g();
    }, l + 1),
        e.addEventListener(f, w);
}
function Gc(e, t) {
    const n = window.getComputedStyle(e),
        s = N => (n[N] || "").split(", "),
        o = s(it + "Delay"),
        r = s(it + "Duration"),
        i = qo(o, r),
        l = s(Wt + "Delay"),
        c = s(Wt + "Duration"),
        f = qo(l, c);
    let _ = null,
        g = 0,
        w = 0;
    t === it
        ? i > 0 && ((_ = it), (g = i), (w = r.length))
        : t === Wt
        ? f > 0 && ((_ = Wt), (g = f), (w = c.length))
        : ((g = Math.max(i, f)), (_ = g > 0 ? (i > f ? it : Wt) : null), (w = _ ? (_ === it ? r.length : c.length) : 0));
    const C = _ === it && /\b(transform|all)(,|$)/.test(n[it + "Property"]);
    return { type: _, timeout: g, propCount: w, hasTransform: C };
}
function qo(e, t) {
    for (; e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map((n, s) => Yo(n) + Yo(e[s])));
}
function Yo(e) {
    return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Jc() {
    return document.body.offsetHeight;
}
const Xc = ["ctrl", "shift", "alt", "meta"],
    Qc = {
        stop: e => e.stopPropagation(),
        prevent: e => e.preventDefault(),
        self: e => e.target !== e.currentTarget,
        ctrl: e => !e.ctrlKey,
        shift: e => !e.shiftKey,
        alt: e => !e.altKey,
        meta: e => !e.metaKey,
        left: e => "button" in e && e.button !== 0,
        middle: e => "button" in e && e.button !== 1,
        right: e => "button" in e && e.button !== 2,
        exact: (e, t) => Xc.some(n => e[`${n}Key`] && !t.includes(n)),
    },
    Zc =
        (e, t) =>
        (n, ...s) => {
            for (let o = 0; o < t.length; o++) {
                const r = Qc[t[o]];
                if (r && r(n, t)) return;
            }
            return e(n, ...s);
        },
    Go = {
        beforeMount(e, { value: t }, { transition: n }) {
            (e._vod = e.style.display === "none" ? "" : e.style.display), n && t ? n.beforeEnter(e) : qt(e, t);
        },
        mounted(e, { value: t }, { transition: n }) {
            n && t && n.enter(e);
        },
        updated(e, { value: t, oldValue: n }, { transition: s }) {
            !t != !n &&
                (s
                    ? t
                        ? (s.beforeEnter(e), qt(e, !0), s.enter(e))
                        : s.leave(e, () => {
                              qt(e, !1);
                          })
                    : qt(e, t));
        },
        beforeUnmount(e, { value: t }) {
            qt(e, t);
        },
    };
function qt(e, t) {
    e.style.display = t ? e._vod : "none";
}
const ea = $e({ patchProp: jc }, Vc);
let vs,
    Jo = !1;
function ta() {
    return (vs = Jo ? vs : ac(ea)), (Jo = !0), vs;
}
const na = (...e) => {
    const t = ta().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = s => {
            const o = sa(s);
            if (o) return n(o, !0, o instanceof SVGElement);
        }),
        t
    );
};
function sa(e) {
    return we(e) ? document.querySelector(e) : e;
}
var oa = JSON.parse(
    '{"lang":"en-US","title":"WarmthSea","description":"Just playing around.","base":"/website/","head":[],"appearance":true,"themeConfig":{"logo":"/logo.svg","socialLinks":[{"icon":"twitter","link":""},{"icon":"instagram","link":"https://www.instagram.com/warmthsea/"},{"icon":"github","link":"https://github.com/warmthsea"}]},"locales":{},"langs":{},"scrollOffset":90}'
);
const ra = /^https?:/i,
    Xo = "vitepress-theme-appearance",
    Te = typeof window != "undefined",
    fi = { relativePath: "", title: "404", description: "Not Found", headers: [], frontmatter: {}, lastUpdated: 0 };
function ia(e, t) {
    t.sort((n, s) => {
        const o = s.split("/").length - n.split("/").length;
        return o !== 0 ? o : s.length - n.length;
    });
    for (const n of t) if (e.startsWith(n)) return n;
}
function Qo(e, t) {
    const n = ia(t, Object.keys(e));
    return n ? e[n] : void 0;
}
function la(e) {
    const { locales: t } = e.themeConfig || {},
        n = e.locales;
    return t && n ? Object.keys(t).reduce((s, o) => ((s[o] = { label: t[o].label, lang: n[o].lang }), s), {}) : {};
}
function ca(e, t) {
    t = ua(e, t);
    const n = Qo(e.locales || {}, t),
        s = Qo(e.themeConfig.locales || {}, t);
    return Object.assign({}, e, n, {
        themeConfig: Object.assign({}, e.themeConfig, s, { locales: {} }),
        lang: (n || e).lang,
        locales: {},
        langs: la(e),
    });
}
function di(e, t) {
    var r;
    const n = t.title || e.title,
        s = (r = t.titleTemplate) != null ? r : e.titleTemplate,
        o = aa(e.title, s);
    return `${n}${o}`;
}
function aa(e, t) {
    return t === !1 ? "" : t === !0 || t === void 0 ? ` | ${e}` : e === t ? "" : ` | ${t}`;
}
function ua(e, t) {
    if (!Te) return t;
    const n = e.base,
        s = n.endsWith("/") ? n.slice(0, -1) : n;
    return t.slice(s.length);
}
function fa(e, t) {
    return `${e}${t}`.replace(/\/+/g, "/");
}
function Ot(e) {
    return ra.test(e) ? e : fa(hn.value.base, e);
}
function _i(e) {
    let t = e.replace(/\.html$/, "");
    if (((t = decodeURIComponent(t)), t.endsWith("/") && (t += "index"), Te)) {
        const n = "/website/";
        t = t.slice(n.length).replace(/\//g, "_") + ".md";
        const s = __VP_HASH_MAP__[t.toLowerCase()];
        t = `${n}assets/${t}.${s}.js`;
    } else t = `./${t.slice(1).replace(/\//g, "_")}.md.js`;
    return t;
}
const hi = Symbol(),
    hn = wl(oa);
function da(e) {
    const t = me(() => ca(hn.value, e.path));
    return {
        site: t,
        theme: me(() => t.value.themeConfig),
        page: me(() => e.data),
        frontmatter: me(() => e.data.frontmatter),
        lang: me(() => t.value.lang),
        localePath: me(() => {
            const { langs: n, lang: s } = t.value,
                o = Object.keys(n).find(r => n[r].lang === s);
            return Ot(o || "/");
        }),
        title: me(() => di(t.value, e.data)),
        description: me(() => e.data.description || t.value.description),
    };
}
function ce() {
    const e = dt(hi);
    if (!e) throw new Error("vitepress data not properly injected in app");
    return e;
}
const pi = Symbol(),
    Zo = "http://a.com",
    _a = () => ({ path: "/", component: null, data: fi });
function ha(e, t) {
    const n = Kn(_a());
    function s(i = Te ? location.href : "/") {
        const l = new URL(i, Zo);
        return (
            !l.pathname.endsWith("/") && !l.pathname.endsWith(".html") && ((l.pathname += ".html"), (i = l.pathname + l.search + l.hash)),
            Te && (history.replaceState({ scrollPosition: window.scrollY }, document.title), history.pushState(null, "", i)),
            r(i)
        );
    }
    let o = null;
    async function r(i, l = 0, c = !1) {
        const f = new URL(i, Zo),
            _ = (o = f.pathname);
        try {
            let g = e(_);
            if (("then" in g && typeof g.then == "function" && (g = await g), o === _)) {
                o = null;
                const { default: w, __pageData: C } = g;
                if (!w) throw new Error(`Invalid route component: ${w}`);
                (n.path = Te ? _ : Ot(_)),
                    (n.component = Xt(w)),
                    (n.data = Xt(C)),
                    Te &&
                        _n(() => {
                            if (f.hash && !l) {
                                let N = null;
                                try {
                                    N = document.querySelector(decodeURIComponent(f.hash));
                                } catch (z) {
                                    console.warn(z);
                                }
                                if (N) {
                                    er(N, f.hash);
                                    return;
                                }
                            }
                            window.scrollTo(0, l);
                        });
            }
        } catch (g) {
            if ((!g.message.match(/fetch/) && !i.match(/^[\\/]404\.html$/) && console.error(g), !c))
                try {
                    const w = await fetch(hn.value.base + "hashmap.json");
                    (window.__VP_HASH_MAP__ = await w.json()), await r(i, l, !0);
                    return;
                } catch {}
            o === _ && ((o = null), (n.path = Te ? _ : Ot(_)), (n.component = t ? Xt(t) : null), (n.data = fi));
        }
    }
    return (
        Te &&
            (window.addEventListener(
                "click",
                i => {
                    const l = i.target.closest("a");
                    if (l) {
                        const { href: c, protocol: f, hostname: _, pathname: g, hash: w, target: C } = l,
                            N = window.location,
                            z = g.match(/\.\w+$/);
                        !i.ctrlKey &&
                            !i.shiftKey &&
                            !i.altKey &&
                            !i.metaKey &&
                            C !== "_blank" &&
                            f === N.protocol &&
                            _ === N.hostname &&
                            !(z && z[0] !== ".html") &&
                            (i.preventDefault(),
                            g === N.pathname
                                ? w &&
                                  w !== N.hash &&
                                  (history.pushState(null, "", w),
                                  window.dispatchEvent(new Event("hashchange")),
                                  er(l, w, l.classList.contains("header-anchor")))
                                : s(c));
                    }
                },
                { capture: !0 }
            ),
            window.addEventListener("popstate", i => {
                r(location.href, (i.state && i.state.scrollPosition) || 0);
            }),
            window.addEventListener("hashchange", i => {
                i.preventDefault();
            })),
        { route: n, go: s }
    );
}
function pa() {
    const e = dt(pi);
    if (!e) throw new Error("useRouter() is called without provider.");
    return e;
}
function zt() {
    return pa().route;
}
function er(e, t, n = !1) {
    let s = null;
    try {
        s = e.classList.contains("header-anchor") ? e : document.querySelector(decodeURIComponent(t));
    } catch (o) {
        console.warn(o);
    }
    if (s) {
        let o = hn.value.scrollOffset;
        typeof o == "string" && (o = document.querySelector(o).getBoundingClientRect().bottom + 24);
        const r = parseInt(window.getComputedStyle(s).paddingTop, 10),
            i = window.scrollY + s.getBoundingClientRect().top - o + r;
        !n || Math.abs(i - window.scrollY) > window.innerHeight ? window.scrollTo(0, i) : window.scrollTo({ left: 0, top: i, behavior: "smooth" });
    }
}
const va = B({
        name: "VitePressContent",
        setup() {
            const e = zt();
            return () => Bn("div", { style: { position: "relative" } }, [e.component ? Bn(e.component) : null]);
        },
    }),
    vi = /#.*$/,
    ma = /(index)?\.(md|html)$/,
    ga = /^[a-z]+:/i,
    ya = typeof window != "undefined",
    ba = be(ya ? location.hash : "");
function wa(e) {
    return ga.test(e);
}
function xa(e, t) {
    let n,
        s = !1;
    return () => {
        n && clearTimeout(n),
            s
                ? (n = setTimeout(e, t))
                : (e(),
                  (s = !0),
                  setTimeout(() => {
                      s = !1;
                  }, t));
    };
}
function pn(e, t, n = !1) {
    if (t === void 0) return !1;
    if (((e = nr(`/${e}`)), n)) return new RegExp(t).test(e);
    if (nr(t) !== e) return !1;
    const s = t.match(vi);
    return s ? ba.value === s[0] : !0;
}
function tr(e) {
    return /^\//.test(e) ? e : `/${e}`;
}
function nr(e) {
    return decodeURI(e).replace(vi, "").replace(ma, "");
}
function Is(e) {
    if (wa(e)) return e;
    const { pathname: t, search: n, hash: s } = new URL(e, "http://example.com"),
        o = t.endsWith("/") || t.endsWith(".html") ? e : `${t.replace(/(\.md)?$/, ".html")}${n}${s}`;
    return Ot(o);
}
function mi(e, t) {
    if (Array.isArray(e)) return e;
    t = tr(t);
    for (const n in e) if (t.startsWith(tr(n))) return e[n];
    return [];
}
function $a(e) {
    const t = [];
    for (const n of e) for (const s of n.items) t.push(s);
    return t;
}
function Je() {
    const e = zt(),
        { theme: t, frontmatter: n } = ce(),
        s = be(!1),
        o = me(() => {
            const f = t.value.sidebar,
                _ = e.data.relativePath;
            return f ? mi(f, _) : [];
        }),
        r = me(() => n.value.sidebar !== !1 && o.value.length > 0 && n.value.layout !== "home");
    function i() {
        s.value = !0;
    }
    function l() {
        s.value = !1;
    }
    function c() {
        s.value ? l() : i();
    }
    return { isOpen: s, sidebar: o, hasSidebar: r, open: i, close: l, toggle: c };
}
function Pa(e, t) {
    let n;
    Jn(() => {
        n = e.value ? document.activeElement : void 0;
    }),
        nt(() => {
            window.addEventListener("keyup", s);
        }),
        Ct(() => {
            window.removeEventListener("keyup", s);
        });
    function s(o) {
        o.key === "Escape" && e.value && (t(), n == null || n.focus());
    }
}
var L = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, o] of t) n[s] = o;
    return n;
};
const ka = B({
    __name: "VPSkipLink",
    setup(e) {
        const t = zt(),
            n = be();
        _t(
            () => t.path,
            () => n.value.focus()
        );
        function s({ target: o }) {
            const r = document.querySelector(o.hash);
            if (r) {
                const i = () => {
                    r.removeAttribute("tabindex"), r.removeEventListener("blur", i);
                };
                r.setAttribute("tabindex", "-1"), r.addEventListener("blur", i), r.focus(), window.scrollTo(0, 0);
            }
        }
        return (o, r) => (
            d(),
            m(
                Q,
                null,
                [
                    p("span", { ref_key: "backToTop", ref: n, tabindex: "-1" }, null, 512),
                    p("a", { href: "#VPContent", class: "VPSkipLink visually-hidden", onClick: s }, " Skip to content "),
                ],
                64
            )
        );
    },
});
var Ca = L(ka, [["__scopeId", "data-v-45f6ae50"]]);
const Sa = { key: 0, class: "VPBackdrop" },
    Va = B({
        __name: "VPBackdrop",
        props: { show: { type: Boolean } },
        setup(e) {
            return (t, n) => (d(), J(os, { name: "fade" }, { default: j(() => [e.show ? (d(), m("div", Sa)) : q("", !0)]), _: 1 }));
        },
    });
var Ea = L(Va, [["__scopeId", "data-v-0e94ce1c"]]);
function Ta() {
    const e = be(!1);
    function t() {
        (e.value = !0), window.addEventListener("resize", o);
    }
    function n() {
        (e.value = !1), window.removeEventListener("resize", o);
    }
    function s() {
        e.value ? n() : t();
    }
    function o() {
        window.outerWidth >= 768 && n();
    }
    return { isScreenOpen: e, openScreen: t, closeScreen: n, toggleScreen: s };
}
const La = ["src"],
    Ma = { inheritAttrs: !1 },
    Aa = B({
        ...Ma,
        __name: "VPImage",
        props: { image: null },
        setup(e) {
            return (t, n) => {
                const s = es("VPImage", !0);
                return e.image
                    ? (d(),
                      m(
                          Q,
                          { key: 0 },
                          [
                              typeof e.image == "string" || "src" in e.image
                                  ? (d(),
                                    m(
                                        "img",
                                        Sn({ key: 0, class: "VPImage" }, typeof e.image == "string" ? t.$attrs : { ...e.image, ...t.$attrs }, {
                                            src: v(Ot)(typeof e.image == "string" ? e.image : e.image.src),
                                        }),
                                        null,
                                        16,
                                        La
                                    ))
                                  : (d(),
                                    m(
                                        Q,
                                        { key: 1 },
                                        [
                                            E(s, Sn({ class: "dark", image: e.image.dark }, t.$attrs), null, 16, ["image"]),
                                            E(s, Sn({ class: "light", image: e.image.light }, t.$attrs), null, 16, ["image"]),
                                        ],
                                        64
                                    )),
                          ],
                          64
                      ))
                    : q("", !0);
            };
        },
    });
var gi = L(Aa, [["__scopeId", "data-v-73ae1788"]]);
const Ia = ["href"],
    Na = B({
        __name: "VPNavBarTitle",
        setup(e) {
            const { site: t, theme: n } = ce(),
                { hasSidebar: s } = Je();
            return (o, r) => (
                d(),
                m(
                    "div",
                    { class: ve(["VPNavBarTitle", { "has-sidebar": v(s) }]) },
                    [
                        p(
                            "a",
                            { class: "title", href: v(t).base },
                            [
                                E(gi, { class: "logo", image: v(n).logo }, null, 8, ["image"]),
                                v(n).siteTitle
                                    ? (d(), m(Q, { key: 0 }, [Be(se(v(n).siteTitle), 1)], 64))
                                    : v(n).siteTitle === void 0
                                    ? (d(), m(Q, { key: 1 }, [Be(se(v(t).title), 1)], 64))
                                    : q("", !0),
                            ],
                            8,
                            Ia
                        ),
                    ],
                    2
                )
            );
        },
    });
var Ba = L(Na, [["__scopeId", "data-v-6a6f7ff6"]]);
const Fa = { key: 0, class: "VPNavBarSearch" },
    Oa = { type: "button", class: "DocSearch DocSearch-Button", "aria-label": "Search" },
    Ha = p(
        "span",
        { class: "DocSearch-Button-Container" },
        [
            p("svg", { class: "DocSearch-Search-Icon", width: "20", height: "20", viewBox: "0 0 20 20" }, [
                p("path", {
                    d: "M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z",
                    stroke: "currentColor",
                    fill: "none",
                    "fill-rule": "evenodd",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                }),
            ]),
            p("span", { class: "DocSearch-Button-Placeholder" }, "Search"),
        ],
        -1
    ),
    Ra = { class: "DocSearch-Button-Keys" },
    Da = p("kbd", { class: "DocSearch-Button-Key" }, "K", -1),
    za = B({
        __name: "VPNavBarSearch",
        setup(e) {
            const t = () => null,
                { theme: n } = ce(),
                s = be(!1),
                o = be();
            nt(() => {
                if (!n.value.algolia) return;
                o.value.textContent = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "\u2318" : "Ctrl";
                const i = c => {
                        c.key === "k" && (c.ctrlKey || c.metaKey) && (c.preventDefault(), r(), l());
                    },
                    l = () => {
                        window.removeEventListener("keydown", i);
                    };
                window.addEventListener("keydown", i), Ct(l);
            });
            function r() {
                s.value || (s.value = !0);
            }
            return (i, l) =>
                v(n).algolia
                    ? (d(),
                      m("div", Fa, [
                          s.value
                              ? (d(), J(v(t), { key: 0 }))
                              : (d(),
                                m("div", { key: 1, id: "docsearch", onClick: r }, [
                                    p("button", Oa, [
                                        Ha,
                                        p("span", Ra, [p("kbd", { class: "DocSearch-Button-Key", ref_key: "metaKey", ref: o }, "Meta", 512), Da]),
                                    ]),
                                ])),
                      ]))
                    : q("", !0);
        },
    }),
    Ua = {},
    ja = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", height: "24px", viewBox: "0 0 24 24", width: "24px" },
    Ka = p("path", { d: "M0 0h24v24H0V0z", fill: "none" }, null, -1),
    Wa = p("path", { d: "M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z" }, null, -1),
    qa = [Ka, Wa];
function Ya(e, t) {
    return d(), m("svg", ja, qa);
}
var Ga = L(Ua, [["render", Ya]]);
const Ja = B({
    __name: "VPLink",
    props: { href: null, noIcon: { type: Boolean } },
    setup(e) {
        const t = e,
            n = me(() => t.href && /^[a-z]+:/i.test(t.href));
        return (s, o) => (
            d(),
            J(
                ts(e.href ? "a" : "span"),
                {
                    class: ve(["VPLink", { link: e.href }]),
                    href: e.href ? v(Is)(e.href) : void 0,
                    target: v(n) ? "_blank" : void 0,
                    rel: v(n) ? "noopener noreferrer" : void 0,
                },
                {
                    default: j(() => [
                        R(s.$slots, "default", {}, void 0, !0),
                        v(n) && !e.noIcon ? (d(), J(Ga, { key: 0, class: "icon" })) : q("", !0),
                    ]),
                    _: 3,
                },
                8,
                ["class", "href", "target", "rel"]
            )
        );
    },
});
var Ut = L(Ja, [["__scopeId", "data-v-5704c677"]]);
const Xa = B({
    __name: "VPNavBarMenuLink",
    props: { item: null },
    setup(e) {
        const { page: t } = ce();
        return (n, s) => (
            d(),
            J(
                Ut,
                {
                    class: ve({ VPNavBarMenuLink: !0, active: v(pn)(v(t).relativePath, e.item.activeMatch || e.item.link, !!e.item.activeMatch) }),
                    href: e.item.link,
                    noIcon: !0,
                },
                { default: j(() => [Be(se(e.item.text), 1)]), _: 1 },
                8,
                ["class", "href"]
            )
        );
    },
});
var Qa = L(Xa, [["__scopeId", "data-v-8fba5fa8"]]);
const so = be();
let yi = !1,
    ms = 0;
function Za(e) {
    const t = be(!1);
    if (typeof window != "undefined") {
        !yi && eu(), ms++;
        const n = _t(so, s => {
            var o, r, i;
            s === e.el.value || ((o = e.el.value) == null ? void 0 : o.contains(s))
                ? ((t.value = !0), (r = e.onFocus) == null || r.call(e))
                : ((t.value = !1), (i = e.onBlur) == null || i.call(e));
        });
        Ct(() => {
            n(), ms--, ms || tu();
        });
    }
    return Gs(t);
}
function eu() {
    document.addEventListener("focusin", bi), (yi = !0), (so.value = document.activeElement);
}
function tu() {
    document.removeEventListener("focusin", bi);
}
function bi() {
    so.value = document.activeElement;
}
const nu = {},
    su = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    ou = p(
        "path",
        {
            d: "M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z",
        },
        null,
        -1
    ),
    ru = [ou];
function iu(e, t) {
    return d(), m("svg", su, ru);
}
var wi = L(nu, [["render", iu]]);
const lu = {},
    cu = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    au = p("circle", { cx: "12", cy: "12", r: "2" }, null, -1),
    uu = p("circle", { cx: "19", cy: "12", r: "2" }, null, -1),
    fu = p("circle", { cx: "5", cy: "12", r: "2" }, null, -1),
    du = [au, uu, fu];
function _u(e, t) {
    return d(), m("svg", cu, du);
}
var hu = L(lu, [["render", _u]]);
const pu = { class: "VPMenuLink" },
    vu = B({
        __name: "VPMenuLink",
        props: { item: null },
        setup(e) {
            const { page: t } = ce();
            return (n, s) => (
                d(),
                m("div", pu, [
                    E(
                        Ut,
                        { class: ve({ active: v(pn)(v(t).relativePath, e.item.activeMatch || e.item.link) }), href: e.item.link },
                        { default: j(() => [Be(se(e.item.text), 1)]), _: 1 },
                        8,
                        ["class", "href"]
                    ),
                ])
            );
        },
    });
var rs = L(vu, [["__scopeId", "data-v-06b18c43"]]);
const mu = { class: "VPMenuGroup" },
    gu = { key: 0, class: "title" },
    yu = B({
        __name: "VPMenuGroup",
        props: { text: null, items: null },
        setup(e) {
            return (t, n) => (
                d(),
                m("div", mu, [
                    e.text ? (d(), m("p", gu, se(e.text), 1)) : q("", !0),
                    (d(!0),
                    m(
                        Q,
                        null,
                        Ce(e.items, s => (d(), m(Q, null, ["link" in s ? (d(), J(rs, { key: 0, item: s }, null, 8, ["item"])) : q("", !0)], 64))),
                        256
                    )),
                ])
            );
        },
    });
var bu = L(yu, [["__scopeId", "data-v-4bc84c0d"]]);
const wu = { class: "VPMenu" },
    xu = { key: 0, class: "items" },
    $u = B({
        __name: "VPMenu",
        props: { items: null },
        setup(e) {
            return (t, n) => (
                d(),
                m("div", wu, [
                    e.items
                        ? (d(),
                          m("div", xu, [
                              (d(!0),
                              m(
                                  Q,
                                  null,
                                  Ce(
                                      e.items,
                                      s => (
                                          d(),
                                          m(
                                              Q,
                                              { key: s.text },
                                              [
                                                  "link" in s
                                                      ? (d(), J(rs, { key: 0, item: s }, null, 8, ["item"]))
                                                      : (d(), J(bu, { key: 1, text: s.text, items: s.items }, null, 8, ["text", "items"])),
                                              ],
                                              64
                                          )
                                      )
                                  ),
                                  128
                              )),
                          ]))
                        : q("", !0),
                    R(t.$slots, "default", {}, void 0, !0),
                ])
            );
        },
    });
var Pu = L($u, [["__scopeId", "data-v-e73581a2"]]);
const ku = ["aria-expanded", "aria-label"],
    Cu = { key: 0, class: "text" },
    Su = { class: "menu" },
    Vu = B({
        __name: "VPFlyout",
        props: { icon: null, button: null, label: null, items: null },
        setup(e) {
            const t = be(!1),
                n = be();
            Za({ el: n, onBlur: s });
            function s() {
                t.value = !1;
            }
            return (o, r) => (
                d(),
                m(
                    "div",
                    {
                        class: "VPFlyout",
                        ref_key: "el",
                        ref: n,
                        onMouseenter: r[1] || (r[1] = i => (t.value = !0)),
                        onMouseleave: r[2] || (r[2] = i => (t.value = !1)),
                    },
                    [
                        p(
                            "button",
                            {
                                type: "button",
                                class: "button",
                                "aria-haspopup": "true",
                                "aria-expanded": t.value,
                                "aria-label": e.label,
                                onClick: r[0] || (r[0] = i => (t.value = !t.value)),
                            },
                            [
                                e.button || e.icon
                                    ? (d(),
                                      m("span", Cu, [
                                          e.icon ? (d(), J(ts(e.icon), { key: 0, class: "option-icon" })) : q("", !0),
                                          Be(" " + se(e.button) + " ", 1),
                                          E(wi, { class: "text-icon" }),
                                      ]))
                                    : (d(), J(hu, { key: 1, class: "icon" })),
                            ],
                            8,
                            ku
                        ),
                        p("div", Su, [E(Pu, { items: e.items }, { default: j(() => [R(o.$slots, "default", {}, void 0, !0)]), _: 3 }, 8, ["items"])]),
                    ],
                    544
                )
            );
        },
    });
var oo = L(Vu, [["__scopeId", "data-v-8dccea88"]]);
const Eu = B({
    __name: "VPNavBarMenuGroup",
    props: { item: null },
    setup(e) {
        const { page: t } = ce();
        return (n, s) => (
            d(),
            J(
                oo,
                {
                    class: ve({ VPNavBarMenuGroup: !0, active: v(pn)(v(t).relativePath, e.item.activeMatch, !!e.item.activeMatch) }),
                    button: e.item.text,
                    items: e.item.items,
                },
                null,
                8,
                ["class", "button", "items"]
            )
        );
    },
});
const Tu = e => (Re("data-v-a30758ee"), (e = e()), De(), e),
    Lu = { key: 0, "aria-labelledby": "main-nav-aria-label", class: "VPNavBarMenu" },
    Mu = Tu(() => p("span", { id: "main-nav-aria-label", class: "visually-hidden" }, "Main Navigation", -1)),
    Au = B({
        __name: "VPNavBarMenu",
        setup(e) {
            const { theme: t } = ce();
            return (n, s) =>
                v(t).nav
                    ? (d(),
                      m("nav", Lu, [
                          Mu,
                          (d(!0),
                          m(
                              Q,
                              null,
                              Ce(
                                  v(t).nav,
                                  o => (
                                      d(),
                                      m(
                                          Q,
                                          { key: o.text },
                                          [
                                              "link" in o
                                                  ? (d(), J(Qa, { key: 0, item: o }, null, 8, ["item"]))
                                                  : (d(), J(Eu, { key: 1, item: o }, null, 8, ["item"])),
                                          ],
                                          64
                                      )
                                  )
                              ),
                              128
                          )),
                      ]))
                    : q("", !0);
        },
    });
var Iu = L(Au, [["__scopeId", "data-v-a30758ee"]]);
const Nu = {},
    Bu = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    Fu = p("path", { d: "M0 0h24v24H0z", fill: "none" }, null, -1),
    Ou = p(
        "path",
        {
            d: " M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",
            class: "css-c4d79v",
        },
        null,
        -1
    ),
    Hu = [Fu, Ou];
function Ru(e, t) {
    return d(), m("svg", Bu, Hu);
}
var xi = L(Nu, [["render", Ru]]);
const Du = { class: "items" },
    zu = { class: "title" },
    Uu = B({
        __name: "VPNavBarTranslations",
        setup(e) {
            const { theme: t } = ce();
            return (n, s) =>
                v(t).localeLinks
                    ? (d(),
                      J(
                          oo,
                          { key: 0, class: "VPNavBarTranslations", icon: xi },
                          {
                              default: j(() => [
                                  p("div", Du, [
                                      p("p", zu, se(v(t).localeLinks.text), 1),
                                      (d(!0),
                                      m(
                                          Q,
                                          null,
                                          Ce(v(t).localeLinks.items, o => (d(), J(rs, { key: o.link, item: o }, null, 8, ["item"]))),
                                          128
                                      )),
                                  ]),
                              ]),
                              _: 1,
                          }
                      ))
                    : q("", !0);
        },
    });
var ju = L(Uu, [["__scopeId", "data-v-2ec6e3c4"]]);
const Ku = {},
    Wu = { class: "VPSwitch", type: "button", role: "switch" },
    qu = { class: "check" },
    Yu = { key: 0, class: "icon" };
function Gu(e, t) {
    return d(), m("button", Wu, [p("span", qu, [e.$slots.default ? (d(), m("span", Yu, [R(e.$slots, "default", {}, void 0, !0)])) : q("", !0)])]);
}
var Ju = L(Ku, [
    ["render", Gu],
    ["__scopeId", "data-v-1dda4c9c"],
]);
const Xu = {},
    Qu = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    Zu = vc(
        '<path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path><path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path><path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path><path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path><path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path><path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path><path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path><path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path><path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path>',
        9
    ),
    ef = [Zu];
function tf(e, t) {
    return d(), m("svg", Qu, ef);
}
var nf = L(Xu, [["render", tf]]);
const sf = {},
    of = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    rf = p(
        "path",
        {
            d: "M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z",
        },
        null,
        -1
    ),
    lf = [rf];
function cf(e, t) {
    return d(), m("svg", of, lf);
}
var af = L(sf, [["render", cf]]);
const uf = B({
    __name: "VPSwitchAppearance",
    setup(e) {
        const t = typeof localStorage != "undefined" ? n() : () => {};
        function n() {
            const s = window.matchMedia("(prefers-color-scheme: dark)"),
                o = document.documentElement.classList;
            let r = localStorage.getItem(Xo) || "auto",
                i = r === "auto" ? s.matches : r === "dark";
            s.onchange = f => {
                r === "auto" && c((i = f.matches));
            };
            function l() {
                c((i = !i)), (r = i ? (s.matches ? "auto" : "dark") : s.matches ? "light" : "auto"), localStorage.setItem(Xo, r);
            }
            function c(f) {
                o[f ? "add" : "remove"]("dark");
            }
            return l;
        }
        return (s, o) => (
            d(),
            J(
                Ju,
                { class: "VPSwitchAppearance", "aria-label": "toggle dark mode", onClick: v(t) },
                { default: j(() => [E(nf, { class: "sun" }), E(af, { class: "moon" })]), _: 1 },
                8,
                ["onClick"]
            )
        );
    },
});
var ro = L(uf, [["__scopeId", "data-v-781f9d1b"]]);
const ff = { key: 0, class: "VPNavBarAppearance" },
    df = B({
        __name: "VPNavBarAppearance",
        setup(e) {
            const { site: t } = ce();
            return (n, s) => (v(t).appearance ? (d(), m("div", ff, [E(ro)])) : q("", !0));
        },
    });
var _f = L(df, [["__scopeId", "data-v-311055f2"]]);
const hf = {},
    pf = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    vf = p(
        "path",
        {
            d: "M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z",
        },
        null,
        -1
    ),
    mf = [vf];
function gf(e, t) {
    return d(), m("svg", pf, mf);
}
var yf = L(hf, [["render", gf]]);
const bf = {},
    wf = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    xf = p(
        "path",
        {
            d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
        },
        null,
        -1
    ),
    $f = [xf];
function Pf(e, t) {
    return d(), m("svg", wf, $f);
}
var kf = L(bf, [["render", Pf]]);
const Cf = {},
    Sf = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    Vf = p(
        "path",
        {
            d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
        },
        null,
        -1
    ),
    Ef = [Vf];
function Tf(e, t) {
    return d(), m("svg", Sf, Ef);
}
var Lf = L(Cf, [["render", Tf]]);
const Mf = {},
    Af = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    If = p(
        "path",
        {
            d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
        },
        null,
        -1
    ),
    Nf = [If];
function Bf(e, t) {
    return d(), m("svg", Af, Nf);
}
var Ff = L(Mf, [["render", Bf]]);
const Of = {},
    Hf = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    Rf = p(
        "path",
        {
            d: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
        },
        null,
        -1
    ),
    Df = [Rf];
function zf(e, t) {
    return d(), m("svg", Hf, Df);
}
var Uf = L(Of, [["render", zf]]);
const jf = {},
    Kf = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    Wf = p(
        "path",
        {
            d: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z",
        },
        null,
        -1
    ),
    qf = [Wf];
function Yf(e, t) {
    return d(), m("svg", Kf, qf);
}
var Gf = L(jf, [["render", Yf]]);
const Jf = {},
    Xf = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    Qf = p(
        "path",
        {
            d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
        },
        null,
        -1
    ),
    Zf = [Qf];
function ed(e, t) {
    return d(), m("svg", Xf, Zf);
}
var td = L(Jf, [["render", ed]]);
const nd = {},
    sd = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    od = p(
        "path",
        {
            d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
        },
        null,
        -1
    ),
    rd = [od];
function id(e, t) {
    return d(), m("svg", sd, rd);
}
var ld = L(nd, [["render", id]]);
const cd = ["href", "title"],
    ad = { class: "visually-hidden" },
    ud = B({
        __name: "VPSocialLink",
        props: { icon: null, link: null },
        setup(e) {
            const t = { discord: yf, facebook: kf, github: Lf, instagram: Uf, linkedin: Ff, slack: Gf, twitter: td, youtube: ld };
            return (n, s) => (
                d(),
                m(
                    "a",
                    { class: "VPSocialLink", href: e.link, title: e.icon, target: "_blank", rel: "noopener noreferrer" },
                    [(d(), J(ts(t[e.icon]), { class: "icon" })), p("span", ad, se(e.icon), 1)],
                    8,
                    cd
                )
            );
        },
    });
var fd = L(ud, [["__scopeId", "data-v-48c45ef6"]]);
const dd = { class: "VPSocialLinks" },
    _d = B({
        __name: "VPSocialLinks",
        props: { links: null },
        setup(e) {
            return (t, n) => (
                d(),
                m("div", dd, [
                    (d(!0),
                    m(
                        Q,
                        null,
                        Ce(e.links, ({ link: s, icon: o }) => (d(), J(fd, { key: s, icon: o, link: s }, null, 8, ["icon", "link"]))),
                        128
                    )),
                ])
            );
        },
    });
var io = L(_d, [["__scopeId", "data-v-4dcbaf3a"]]);
const hd = B({
    __name: "VPNavBarSocialLinks",
    setup(e) {
        const { theme: t } = ce();
        return (n, s) =>
            v(t).socialLinks ? (d(), J(io, { key: 0, class: "VPNavBarSocialLinks", links: v(t).socialLinks }, null, 8, ["links"])) : q("", !0);
    },
});
var pd = L(hd, [["__scopeId", "data-v-0ae890f7"]]);
const vd = e => (Re("data-v-0562f5c0"), (e = e()), De(), e),
    md = { key: 0, class: "group" },
    gd = { class: "trans-title" },
    yd = { key: 1, class: "group" },
    bd = { class: "item appearance" },
    wd = vd(() => p("p", { class: "label" }, "Appearance", -1)),
    xd = { class: "appearance-action" },
    $d = { key: 2, class: "group" },
    Pd = { class: "item social-links" },
    kd = B({
        __name: "VPNavBarExtra",
        setup(e) {
            const { site: t, theme: n } = ce();
            return (s, o) => (
                d(),
                J(
                    oo,
                    { class: "VPNavBarExtra", label: "extra navigation" },
                    {
                        default: j(() => [
                            v(n).localeLinks
                                ? (d(),
                                  m("div", md, [
                                      p("p", gd, se(v(n).localeLinks.text), 1),
                                      (d(!0),
                                      m(
                                          Q,
                                          null,
                                          Ce(v(n).localeLinks.items, r => (d(), J(rs, { key: r.link, item: r }, null, 8, ["item"]))),
                                          128
                                      )),
                                  ]))
                                : q("", !0),
                            v(t).appearance ? (d(), m("div", yd, [p("div", bd, [wd, p("div", xd, [E(ro)])])])) : q("", !0),
                            v(n).socialLinks
                                ? (d(),
                                  m("div", $d, [p("div", Pd, [E(io, { class: "social-links-list", links: v(n).socialLinks }, null, 8, ["links"])])]))
                                : q("", !0),
                        ]),
                        _: 1,
                    }
                )
            );
        },
    });
var Cd = L(kd, [["__scopeId", "data-v-0562f5c0"]]);
const Sd = e => (Re("data-v-6f008456"), (e = e()), De(), e),
    Vd = ["aria-expanded"],
    Ed = Sd(() =>
        p("span", { class: "container" }, [p("span", { class: "top" }), p("span", { class: "middle" }), p("span", { class: "bottom" })], -1)
    ),
    Td = [Ed],
    Ld = B({
        __name: "VPNavBarHamburger",
        props: { active: { type: Boolean } },
        emits: ["click"],
        setup(e) {
            return (t, n) => (
                d(),
                m(
                    "button",
                    {
                        type: "button",
                        class: ve(["VPNavBarHamburger", { active: e.active }]),
                        "aria-label": "mobile navigation",
                        "aria-expanded": e.active,
                        "aria-controls": "VPNavScreen",
                        onClick: n[0] || (n[0] = s => t.$emit("click")),
                    },
                    Td,
                    10,
                    Vd
                )
            );
        },
    });
var Md = L(Ld, [["__scopeId", "data-v-6f008456"]]);
const Ad = { class: "container" },
    Id = { class: "content" },
    Nd = B({
        __name: "VPNavBar",
        props: { isScreenOpen: { type: Boolean } },
        emits: ["toggle-screen"],
        setup(e) {
            const { hasSidebar: t } = Je();
            return (n, s) => (
                d(),
                m(
                    "div",
                    { class: ve(["VPNavBar", { "has-sidebar": v(t) }]) },
                    [
                        p("div", Ad, [
                            E(Ba),
                            p("div", Id, [
                                E(za, { class: "search" }),
                                E(Iu, { class: "menu" }),
                                E(ju, { class: "translations" }),
                                E(_f, { class: "appearance" }),
                                E(pd, { class: "social-links" }),
                                E(Cd, { class: "extra" }),
                                E(
                                    Md,
                                    { class: "hamburger", active: e.isScreenOpen, onClick: s[0] || (s[0] = o => n.$emit("toggle-screen")) },
                                    null,
                                    8,
                                    ["active"]
                                ),
                            ]),
                        ]),
                    ],
                    2
                )
            );
        },
    });
var Bd = L(Nd, [["__scopeId", "data-v-8856f192"]]);
function Fd(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    } else return Array.from(e);
}
var lo = !1;
if (typeof window != "undefined") {
    var sr = {
        get passive() {
            lo = !0;
        },
    };
    window.addEventListener("testPassive", null, sr), window.removeEventListener("testPassive", null, sr);
}
var Fn =
        typeof window != "undefined" &&
        window.navigator &&
        window.navigator.platform &&
        (/iP(ad|hone|od)/.test(window.navigator.platform) || (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1)),
    Bt = [],
    On = !1,
    co = -1,
    nn = void 0,
    xt = void 0,
    sn = void 0,
    $i = function (t) {
        return Bt.some(function (n) {
            return !!(n.options.allowTouchMove && n.options.allowTouchMove(t));
        });
    },
    Hn = function (t) {
        var n = t || window.event;
        return $i(n.target) || n.touches.length > 1 ? !0 : (n.preventDefault && n.preventDefault(), !1);
    },
    Od = function (t) {
        if (sn === void 0) {
            var n = !!t && t.reserveScrollBarGap === !0,
                s = window.innerWidth - document.documentElement.clientWidth;
            if (n && s > 0) {
                var o = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
                (sn = document.body.style.paddingRight), (document.body.style.paddingRight = o + s + "px");
            }
        }
        nn === void 0 && ((nn = document.body.style.overflow), (document.body.style.overflow = "hidden"));
    },
    Hd = function () {
        sn !== void 0 && ((document.body.style.paddingRight = sn), (sn = void 0)),
            nn !== void 0 && ((document.body.style.overflow = nn), (nn = void 0));
    },
    Rd = function () {
        return window.requestAnimationFrame(function () {
            if (xt === void 0) {
                xt = { position: document.body.style.position, top: document.body.style.top, left: document.body.style.left };
                var t = window,
                    n = t.scrollY,
                    s = t.scrollX,
                    o = t.innerHeight;
                (document.body.style.position = "fixed"),
                    (document.body.style.top = -n),
                    (document.body.style.left = -s),
                    setTimeout(function () {
                        return window.requestAnimationFrame(function () {
                            var r = o - window.innerHeight;
                            r && n >= o && (document.body.style.top = -(n + r));
                        });
                    }, 300);
            }
        });
    },
    Dd = function () {
        if (xt !== void 0) {
            var t = -parseInt(document.body.style.top, 10),
                n = -parseInt(document.body.style.left, 10);
            (document.body.style.position = xt.position),
                (document.body.style.top = xt.top),
                (document.body.style.left = xt.left),
                window.scrollTo(n, t),
                (xt = void 0);
        }
    },
    zd = function (t) {
        return t ? t.scrollHeight - t.scrollTop <= t.clientHeight : !1;
    },
    Ud = function (t, n) {
        var s = t.targetTouches[0].clientY - co;
        return $i(t.target) ? !1 : (n && n.scrollTop === 0 && s > 0) || (zd(n) && s < 0) ? Hn(t) : (t.stopPropagation(), !0);
    },
    jd = function (t, n) {
        if (!t) {
            console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
            return;
        }
        if (
            !Bt.some(function (o) {
                return o.targetElement === t;
            })
        ) {
            var s = { targetElement: t, options: n || {} };
            (Bt = [].concat(Fd(Bt), [s])),
                Fn ? Rd() : Od(n),
                Fn &&
                    ((t.ontouchstart = function (o) {
                        o.targetTouches.length === 1 && (co = o.targetTouches[0].clientY);
                    }),
                    (t.ontouchmove = function (o) {
                        o.targetTouches.length === 1 && Ud(o, t);
                    }),
                    On || (document.addEventListener("touchmove", Hn, lo ? { passive: !1 } : void 0), (On = !0)));
        }
    },
    Kd = function () {
        Fn &&
            (Bt.forEach(function (t) {
                (t.targetElement.ontouchstart = null), (t.targetElement.ontouchmove = null);
            }),
            On && (document.removeEventListener("touchmove", Hn, lo ? { passive: !1 } : void 0), (On = !1)),
            (co = -1)),
            Fn ? Dd() : Hd(),
            (Bt = []);
    };
const Wd = B({
    __name: "VPNavScreenMenuLink",
    props: { text: null, link: null },
    setup(e) {
        const t = dt("close-screen");
        return (n, s) => (
            d(),
            J(Ut, { class: "VPNavScreenMenuLink", href: e.link, onClick: v(t) }, { default: j(() => [Be(se(e.text), 1)]), _: 1 }, 8, [
                "href",
                "onClick",
            ])
        );
    },
});
var qd = L(Wd, [["__scopeId", "data-v-c866d100"]]);
const Yd = {},
    Gd = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    Jd = p(
        "path",
        {
            d: "M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z",
        },
        null,
        -1
    ),
    Xd = [Jd];
function Qd(e, t) {
    return d(), m("svg", Gd, Xd);
}
var Zd = L(Yd, [["render", Qd]]);
const e_ = B({
    __name: "VPNavScreenMenuGroupLink",
    props: { text: null, link: null },
    setup(e) {
        const t = dt("close-screen");
        return (n, s) => (
            d(),
            J(Ut, { class: "VPNavScreenMenuGroupLink", href: e.link, onClick: v(t) }, { default: j(() => [Be(se(e.text), 1)]), _: 1 }, 8, [
                "href",
                "onClick",
            ])
        );
    },
});
var Pi = L(e_, [["__scopeId", "data-v-75257eac"]]);
const t_ = { class: "VPNavScreenMenuGroupSection" },
    n_ = { key: 0, class: "title" },
    s_ = B({
        __name: "VPNavScreenMenuGroupSection",
        props: { text: null, items: null },
        setup(e) {
            return (t, n) => (
                d(),
                m("div", t_, [
                    e.text ? (d(), m("p", n_, se(e.text), 1)) : q("", !0),
                    (d(!0),
                    m(
                        Q,
                        null,
                        Ce(e.items, s => (d(), J(Pi, { key: s.text, text: s.text, link: s.link }, null, 8, ["text", "link"]))),
                        128
                    )),
                ])
            );
        },
    });
var o_ = L(s_, [["__scopeId", "data-v-3e75c0f2"]]);
const r_ = ["aria-controls", "aria-expanded"],
    i_ = { class: "button-text" },
    l_ = ["id"],
    c_ = { key: 1, class: "group" },
    a_ = B({
        __name: "VPNavScreenMenuGroup",
        props: { text: null, items: null },
        setup(e) {
            const t = e,
                n = be(!1),
                s = me(() => `NavScreenGroup-${t.text.replace(" ", "-").toLowerCase()}`);
            function o() {
                n.value = !n.value;
            }
            return (r, i) => (
                d(),
                m(
                    "div",
                    { class: ve(["VPNavScreenMenuGroup", { open: n.value }]) },
                    [
                        p(
                            "button",
                            { class: "button", "aria-controls": v(s), "aria-expanded": n.value, onClick: o },
                            [p("span", i_, se(e.text), 1), E(Zd, { class: "button-icon" })],
                            8,
                            r_
                        ),
                        p(
                            "div",
                            { id: v(s), class: "items" },
                            [
                                (d(!0),
                                m(
                                    Q,
                                    null,
                                    Ce(
                                        e.items,
                                        l => (
                                            d(),
                                            m(
                                                Q,
                                                { key: l.text },
                                                [
                                                    "link" in l
                                                        ? (d(),
                                                          m("div", { key: l.text, class: "item" }, [
                                                              E(Pi, { text: l.text, link: l.link }, null, 8, ["text", "link"]),
                                                          ]))
                                                        : (d(), m("div", c_, [E(o_, { text: l.text, items: l.items }, null, 8, ["text", "items"])])),
                                                ],
                                                64
                                            )
                                        )
                                    ),
                                    128
                                )),
                            ],
                            8,
                            l_
                        ),
                    ],
                    2
                )
            );
        },
    });
var u_ = L(a_, [["__scopeId", "data-v-4e1ea8d2"]]);
const f_ = { key: 0, class: "VPNavScreenMenu" },
    d_ = B({
        __name: "VPNavScreenMenu",
        setup(e) {
            const { theme: t } = ce();
            return (n, s) =>
                v(t).nav
                    ? (d(),
                      m("nav", f_, [
                          (d(!0),
                          m(
                              Q,
                              null,
                              Ce(
                                  v(t).nav,
                                  o => (
                                      d(),
                                      m(
                                          Q,
                                          { key: o.text },
                                          [
                                              "link" in o
                                                  ? (d(), J(qd, { key: 0, text: o.text, link: o.link }, null, 8, ["text", "link"]))
                                                  : (d(), J(u_, { key: 1, text: o.text || "", items: o.items }, null, 8, ["text", "items"])),
                                          ],
                                          64
                                      )
                                  )
                              ),
                              128
                          )),
                      ]))
                    : q("", !0);
        },
    });
const __ = e => (Re("data-v-03f5dbc0"), (e = e()), De(), e),
    h_ = { key: 0, class: "VPNavScreenAppearance" },
    p_ = __(() => p("p", { class: "text" }, "Appearance", -1)),
    v_ = B({
        __name: "VPNavScreenAppearance",
        setup(e) {
            const { site: t } = ce();
            return (n, s) => (v(t).appearance ? (d(), m("div", h_, [p_, E(ro)])) : q("", !0));
        },
    });
var m_ = L(v_, [["__scopeId", "data-v-03f5dbc0"]]);
const g_ = { class: "list" },
    y_ = ["href"],
    b_ = B({
        __name: "VPNavScreenTranslations",
        setup(e) {
            const { theme: t } = ce(),
                n = be(!1);
            function s() {
                n.value = !n.value;
            }
            return (o, r) =>
                v(t).localeLinks
                    ? (d(),
                      m(
                          "div",
                          { key: 0, class: ve(["VPNavScreenTranslations", { open: n.value }]) },
                          [
                              p("button", { class: "title", onClick: s }, [
                                  E(xi, { class: "icon lang" }),
                                  Be(" " + se(v(t).localeLinks.text) + " ", 1),
                                  E(wi, { class: "icon chevron" }),
                              ]),
                              p("ul", g_, [
                                  (d(!0),
                                  m(
                                      Q,
                                      null,
                                      Ce(
                                          v(t).localeLinks.items,
                                          i => (
                                              d(),
                                              m("li", { key: i.link, class: "item" }, [p("a", { class: "link", href: i.link }, se(i.text), 9, y_)])
                                          )
                                      ),
                                      128
                                  )),
                              ]),
                          ],
                          2
                      ))
                    : q("", !0);
        },
    });
var w_ = L(b_, [["__scopeId", "data-v-2820938e"]]);
const x_ = B({
    __name: "VPNavScreenSocialLinks",
    setup(e) {
        const { theme: t } = ce();
        return (n, s) =>
            v(t).socialLinks ? (d(), J(io, { key: 0, class: "VPNavScreenSocialLinks", links: v(t).socialLinks }, null, 8, ["links"])) : q("", !0);
    },
});
const $_ = { class: "container" },
    P_ = B({
        __name: "VPNavScreen",
        props: { open: { type: Boolean } },
        setup(e) {
            const t = be(null);
            function n() {
                jd(t.value, { reserveScrollBarGap: !0 });
            }
            function s() {
                Kd();
            }
            return (o, r) => (
                d(),
                J(
                    os,
                    { name: "fade", onEnter: n, onAfterLeave: s },
                    {
                        default: j(() => [
                            e.open
                                ? (d(),
                                  m(
                                      "div",
                                      { key: 0, class: "VPNavScreen", ref_key: "screen", ref: t },
                                      [
                                          p("div", $_, [
                                              E(d_, { class: "menu" }),
                                              E(w_, { class: "translations" }),
                                              E(m_, { class: "appearance" }),
                                              E(x_, { class: "social-links" }),
                                          ]),
                                      ],
                                      512
                                  ))
                                : q("", !0),
                        ]),
                        _: 1,
                    }
                )
            );
        },
    });
var k_ = L(P_, [["__scopeId", "data-v-031c365f"]]);
const C_ = B({
    __name: "VPNav",
    setup(e) {
        const { isScreenOpen: t, closeScreen: n, toggleScreen: s } = Ta(),
            { hasSidebar: o } = Je();
        return (
            Zs("close-screen", n),
            (r, i) => (
                d(),
                m(
                    "header",
                    { class: ve(["VPNav", { "no-sidebar": !v(o) }]) },
                    [
                        E(Bd, { "is-screen-open": v(t), onToggleScreen: v(s) }, null, 8, ["is-screen-open", "onToggleScreen"]),
                        E(k_, { open: v(t) }, null, 8, ["open"]),
                    ],
                    2
                )
            )
        );
    },
});
var S_ = L(C_, [["__scopeId", "data-v-0e356168"]]);
const V_ = {},
    E_ = { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", viewBox: "0 0 24 24" },
    T_ = p("path", { d: "M17,11H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,11,17,11z" }, null, -1),
    L_ = p("path", { d: "M21,7H3C2.4,7,2,6.6,2,6s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,7,21,7z" }, null, -1),
    M_ = p("path", { d: "M21,15H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,15,21,15z" }, null, -1),
    A_ = p("path", { d: "M17,19H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,19,17,19z" }, null, -1),
    I_ = [T_, L_, M_, A_];
function N_(e, t) {
    return d(), m("svg", E_, I_);
}
var B_ = L(V_, [["render", N_]]);
const F_ = e => (Re("data-v-92b0f14a"), (e = e()), De(), e),
    O_ = { key: 0, class: "VPLocalNav" },
    H_ = ["aria-expanded"],
    R_ = F_(() => p("span", { class: "menu-text" }, "Menu", -1)),
    D_ = B({
        __name: "VPLocalNav",
        props: { open: { type: Boolean } },
        emits: ["open-menu"],
        setup(e) {
            const { hasSidebar: t } = Je();
            function n() {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
            return (s, o) =>
                v(t)
                    ? (d(),
                      m("div", O_, [
                          p(
                              "button",
                              {
                                  class: "menu",
                                  "aria-expanded": e.open,
                                  "aria-controls": "VPSidebarNav",
                                  onClick: o[0] || (o[0] = r => s.$emit("open-menu")),
                              },
                              [E(B_, { class: "menu-icon" }), R_],
                              8,
                              H_
                          ),
                          p("a", { class: "top-link", href: "#", onClick: n }, " Return to top "),
                      ]))
                    : q("", !0);
        },
    });
var z_ = L(D_, [["__scopeId", "data-v-92b0f14a"]]);
const U_ = {},
    j_ = { version: "1.1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
    K_ = p(
        "path",
        {
            d: "M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M20,19c0,0.6-0.4,1-1,1H5c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V19z",
        },
        null,
        -1
    ),
    W_ = p(
        "path",
        {
            d: "M16,11h-3V8c0-0.6-0.4-1-1-1s-1,0.4-1,1v3H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h3v3c0,0.6,0.4,1,1,1s1-0.4,1-1v-3h3c0.6,0,1-0.4,1-1S16.6,11,16,11z",
        },
        null,
        -1
    ),
    q_ = [K_, W_];
function Y_(e, t) {
    return d(), m("svg", j_, q_);
}
var G_ = L(U_, [["render", Y_]]);
const J_ = {},
    X_ = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", viewBox: "0 0 24 24" },
    Q_ = p(
        "path",
        {
            d: "M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2zM20,19c0,0.6-0.4,1-1,1H5c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V19z",
        },
        null,
        -1
    ),
    Z_ = p("path", { d: "M16,11H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S16.6,11,16,11z" }, null, -1),
    eh = [Q_, Z_];
function th(e, t) {
    return d(), m("svg", X_, eh);
}
var nh = L(J_, [["render", th]]);
const sh = { class: "link-text" },
    oh = B({
        __name: "VPSidebarLink",
        props: { item: null },
        setup(e) {
            const { page: t } = ce(),
                n = dt("close-sidebar");
            return (s, o) => (
                d(),
                J(
                    Ut,
                    { class: ve({ active: v(pn)(v(t).relativePath, e.item.link) }), href: e.item.link, onClick: v(n) },
                    { default: j(() => [p("span", sh, se(e.item.text), 1)]), _: 1 },
                    8,
                    ["class", "href", "onClick"]
                )
            );
        },
    });
var rh = L(oh, [["__scopeId", "data-v-f53f775e"]]);
const ih = ["role"],
    lh = { class: "title-text" },
    ch = { class: "action" },
    ah = { class: "items" },
    uh = B({
        __name: "VPSidebarGroup",
        props: { text: null, items: null, collapsible: { type: Boolean }, collapsed: { type: Boolean } },
        setup(e) {
            const t = e,
                n = be(!1);
            Jn(() => {
                n.value = !!(t.collapsible && t.collapsed);
            });
            function s() {
                t.collapsible && (n.value = !n.value);
            }
            return (o, r) => (
                d(),
                m(
                    "section",
                    { class: ve(["VPSidebarGroup", { collapsible: e.collapsible, collapsed: n.value }]) },
                    [
                        e.text
                            ? (d(),
                              m(
                                  "div",
                                  { key: 0, class: "title", role: e.collapsible ? "button" : void 0, onClick: s },
                                  [p("h2", lh, se(e.text), 1), p("div", ch, [E(nh, { class: "icon minus" }), E(G_, { class: "icon plus" })])],
                                  8,
                                  ih
                              ))
                            : q("", !0),
                        p("div", ah, [
                            (d(!0),
                            m(
                                Q,
                                null,
                                Ce(e.items, i => (d(), J(rh, { key: i.link, item: i }, null, 8, ["item"]))),
                                128
                            )),
                        ]),
                    ],
                    2
                )
            );
        },
    });
var fh = L(uh, [["__scopeId", "data-v-1f69a7ed"]]);
const dh = e => (Re("data-v-55e4c7db"), (e = e()), De(), e),
    _h = { class: "nav", id: "VPSidebarNav", "aria-labelledby": "sidebar-aria-label", tabindex: "-1" },
    hh = dh(() => p("span", { class: "visually-hidden", id: "sidebar-aria-label" }, " Sidebar Navigation ", -1)),
    ph = B({
        __name: "VPSidebar",
        props: { open: { type: Boolean } },
        setup(e) {
            const t = e,
                { sidebar: n, hasSidebar: s } = Je();
            let o = be(null);
            return (
                Fl(async () => {
                    var r;
                    t.open && (await _n(), (r = o.value) == null || r.focus());
                }),
                (r, i) =>
                    v(s)
                        ? (d(),
                          m(
                              "aside",
                              {
                                  key: 0,
                                  class: ve(["VPSidebar", { open: e.open }]),
                                  ref_key: "navEl",
                                  ref: o,
                                  onClick: i[0] || (i[0] = Zc(() => {}, ["stop"])),
                              },
                              [
                                  p("nav", _h, [
                                      hh,
                                      (d(!0),
                                      m(
                                          Q,
                                          null,
                                          Ce(
                                              v(n),
                                              l => (
                                                  d(),
                                                  m("div", { key: l.text, class: "group" }, [
                                                      E(
                                                          fh,
                                                          { text: l.text, items: l.items, collapsible: l.collapsible, collapsed: l.collapsed },
                                                          null,
                                                          8,
                                                          ["text", "items", "collapsible", "collapsed"]
                                                      ),
                                                  ])
                                              )
                                          ),
                                          128
                                      )),
                                  ]),
                              ],
                              2
                          ))
                        : q("", !0)
            );
        },
    });
var vh = L(ph, [["__scopeId", "data-v-55e4c7db"]]);
function mh() {
    const { page: e } = ce();
    Te &&
        _t(
            () => e.value.relativePath,
            () => {
                _n(() => {
                    document.querySelectorAll('.vp-doc div[class*="language-"]>span.copy').forEach(yh);
                });
            },
            { immediate: !0, flush: "post" }
        );
}
async function gh(e) {
    try {
        return navigator.clipboard.writeText(e);
    } catch {
        const t = document.createElement("textarea"),
            n = document.activeElement;
        (t.value = e),
            t.setAttribute("readonly", ""),
            (t.style.contain = "strict"),
            (t.style.position = "absolute"),
            (t.style.left = "-9999px"),
            (t.style.fontSize = "12pt");
        const s = document.getSelection(),
            o = s ? s.rangeCount > 0 && s.getRangeAt(0) : null;
        document.body.appendChild(t),
            t.select(),
            (t.selectionStart = 0),
            (t.selectionEnd = e.length),
            document.execCommand("copy"),
            document.body.removeChild(t),
            o && (s.removeAllRanges(), s.addRange(o)),
            n && n.focus();
    }
}
function yh(e) {
    e.onclick = () => {
        const t = e.parentElement;
        if (!t) return;
        const n = t.classList.contains("language-sh") || t.classList.contains("language-bash");
        let { innerText: s = "" } = t;
        n && (s = s.replace(/^ *\$ /gm, "")),
            gh(s).then(() => {
                e.classList.add("copied"),
                    setTimeout(() => {
                        e.classList.remove("copied");
                    }, 3e3);
            });
    };
}
const is = e => (Re("data-v-689a417a"), (e = e()), De(), e),
    bh = { class: "NotFound" },
    wh = is(() => p("p", { class: "code" }, "404", -1)),
    xh = is(() => p("h1", { class: "title" }, "PAGE NOT FOUND", -1)),
    $h = is(() => p("div", { class: "divider" }, null, -1)),
    Ph = is(() =>
        p(
            "blockquote",
            { class: "quote" },
            " But if you don't change your direction, and if you keep looking, you may end up where you are heading. ",
            -1
        )
    ),
    kh = { class: "action" },
    Ch = ["href"],
    Sh = B({
        __name: "NotFound",
        setup(e) {
            const { site: t } = ce();
            return (n, s) => (
                d(),
                m("div", bh, [
                    wh,
                    xh,
                    $h,
                    Ph,
                    p("div", kh, [p("a", { class: "link", href: v(t).base, "aria-label": "go to home" }, " Take me home ", 8, Ch)]),
                ])
            );
        },
    });
var Ns = L(Sh, [["__scopeId", "data-v-689a417a"]]);
const Vh = {},
    Eh = { class: "VPPage" };
function Th(e, t) {
    const n = es("Content");
    return d(), m("div", Eh, [E(n)]);
}
var Lh = L(Vh, [["render", Th]]);
const Mh = B({
    __name: "VPButton",
    props: { tag: null, size: null, theme: null, text: null, href: null },
    setup(e) {
        const t = e,
            n = me(() => {
                var r, i;
                return [(r = t.size) != null ? r : "medium", (i = t.theme) != null ? i : "brand"];
            }),
            s = me(() => t.href && /^[a-z]+:/i.test(t.href)),
            o = me(() => (t.tag ? t.tag : t.href ? "a" : "button"));
        return (r, i) => (
            d(),
            J(
                ts(v(o)),
                {
                    class: ve(["VPButton", v(n)]),
                    href: e.href ? v(Ot)(e.href) : void 0,
                    target: v(s) ? "_blank" : void 0,
                    rel: v(s) ? "noopener noreferrer" : void 0,
                },
                { default: j(() => [Be(se(e.text), 1)]), _: 1 },
                8,
                ["class", "href", "target", "rel"]
            )
        );
    },
});
var Ah = L(Mh, [["__scopeId", "data-v-be07d988"]]);
const Ih = e => (Re("data-v-5d590baf"), (e = e()), De(), e),
    Nh = { class: "container" },
    Bh = { class: "main" },
    Fh = { key: 0, class: "name" },
    Oh = { class: "clip" },
    Hh = { key: 1, class: "text" },
    Rh = { key: 2, class: "tagline" },
    Dh = { key: 3, class: "actions" },
    zh = { key: 0, class: "image" },
    Uh = { class: "image-container" },
    jh = Ih(() => p("div", { class: "image-bg" }, null, -1)),
    Kh = B({
        __name: "VPHero",
        props: { name: null, text: null, tagline: null, image: null, actions: null },
        setup(e) {
            return (t, n) => (
                d(),
                m(
                    "div",
                    { class: ve(["VPHero", { "has-image": e.image }]) },
                    [
                        p("div", Nh, [
                            p("div", Bh, [
                                e.name ? (d(), m("h1", Fh, [p("span", Oh, se(e.name), 1)])) : q("", !0),
                                e.text ? (d(), m("p", Hh, se(e.text), 1)) : q("", !0),
                                e.tagline ? (d(), m("p", Rh, se(e.tagline), 1)) : q("", !0),
                                e.actions
                                    ? (d(),
                                      m("div", Dh, [
                                          (d(!0),
                                          m(
                                              Q,
                                              null,
                                              Ce(
                                                  e.actions,
                                                  s => (
                                                      d(),
                                                      m("div", { key: s.link, class: "action" }, [
                                                          E(Ah, { tag: "a", size: "medium", theme: s.theme, text: s.text, href: s.link }, null, 8, [
                                                              "theme",
                                                              "text",
                                                              "href",
                                                          ]),
                                                      ])
                                                  )
                                              ),
                                              128
                                          )),
                                      ]))
                                    : q("", !0),
                            ]),
                            e.image
                                ? (d(), m("div", zh, [p("div", Uh, [jh, E(gi, { class: "image-src", image: e.image }, null, 8, ["image"])])]))
                                : q("", !0),
                        ]),
                    ],
                    2
                )
            );
        },
    });
var Wh = L(Kh, [["__scopeId", "data-v-5d590baf"]]);
const qh = B({
    __name: "VPHomeHero",
    setup(e) {
        const { frontmatter: t } = ce();
        return (n, s) =>
            v(t).hero
                ? (d(),
                  J(
                      Wh,
                      {
                          key: 0,
                          class: "VPHomeHero",
                          name: v(t).hero.name,
                          text: v(t).hero.text,
                          tagline: v(t).hero.tagline,
                          image: v(t).hero.image,
                          actions: v(t).hero.actions,
                      },
                      null,
                      8,
                      ["name", "text", "tagline", "image", "actions"]
                  ))
                : q("", !0);
    },
});
const Yh = { class: "VPFeature" },
    Gh = { key: 0, class: "icon" },
    Jh = { class: "title" },
    Xh = { class: "details" },
    Qh = B({
        __name: "VPFeature",
        props: { icon: null, title: null, details: null },
        setup(e) {
            return (t, n) => (
                d(),
                m("article", Yh, [e.icon ? (d(), m("div", Gh, se(e.icon), 1)) : q("", !0), p("h2", Jh, se(e.title), 1), p("p", Xh, se(e.details), 1)])
            );
        },
    });
var Zh = L(Qh, [["__scopeId", "data-v-3aa4af24"]]);
const e1 = { key: 0, class: "VPFeatures" },
    t1 = { class: "container" },
    n1 = { class: "items" },
    s1 = B({
        __name: "VPFeatures",
        props: { features: null },
        setup(e) {
            const t = e,
                n = me(() => {
                    const s = t.features.length;
                    if (s) {
                        if (s === 2) return "grid-2";
                        if (s === 3) return "grid-3";
                        if (s % 3 === 0) return "grid-6";
                        if (s % 2 === 0) return "grid-4";
                    } else return;
                });
            return (s, o) =>
                e.features
                    ? (d(),
                      m("div", e1, [
                          p("div", t1, [
                              p("div", n1, [
                                  (d(!0),
                                  m(
                                      Q,
                                      null,
                                      Ce(
                                          e.features,
                                          r => (
                                              d(),
                                              m(
                                                  "div",
                                                  { key: r.title, class: ve(["item", [v(n)]]) },
                                                  [
                                                      E(Zh, { icon: r.icon, title: r.title, details: r.details }, null, 8, [
                                                          "icon",
                                                          "title",
                                                          "details",
                                                      ]),
                                                  ],
                                                  2
                                              )
                                          )
                                      ),
                                      128
                                  )),
                              ]),
                          ]),
                      ]))
                    : q("", !0);
        },
    });
var o1 = L(s1, [["__scopeId", "data-v-1812ea91"]]);
const r1 = B({
    __name: "VPHomeFeatures",
    setup(e) {
        const { frontmatter: t } = ce();
        return (n, s) =>
            v(t).features ? (d(), J(o1, { key: 0, class: "VPHomeFeatures", features: v(t).features }, null, 8, ["features"])) : q("", !0);
    },
});
const i1 = { class: "VPHome" },
    l1 = B({
        __name: "VPHome",
        setup(e) {
            return (t, n) => {
                const s = es("Content");
                return (
                    d(),
                    m("div", i1, [
                        R(t.$slots, "home-hero-before", {}, void 0, !0),
                        E(qh),
                        R(t.$slots, "home-hero-after", {}, void 0, !0),
                        R(t.$slots, "home-features-before", {}, void 0, !0),
                        E(r1),
                        R(t.$slots, "home-features-after", {}, void 0, !0),
                        E(s),
                    ])
                );
            };
        },
    });
var c1 = L(l1, [["__scopeId", "data-v-3e80d098"]]),
    or;
const vn = typeof window != "undefined";
vn && ((or = window == null ? void 0 : window.navigator) == null ? void 0 : or.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function a1(e) {
    return qi() ? (Yi(e), !0) : !1;
}
function u1(e, t = !0) {
    ii() ? Ur(e) : t ? e() : _n(e);
}
const f1 = vn ? window : void 0;
vn && window.document;
vn && window.navigator;
vn && window.location;
function rr(e, t = {}) {
    const { window: n = f1 } = t,
        s = Boolean(n && "matchMedia" in n && typeof n.matchMedia == "function");
    let o;
    const r = be(!1),
        i = () => {
            !s || (o || (o = n.matchMedia(e)), (r.value = o.matches));
        };
    return (
        u1(() => {
            i(),
                o &&
                    ("addEventListener" in o ? o.addEventListener("change", i) : o.addListener(i),
                    a1(() => {
                        "removeEventListener" in o ? o.removeEventListener("change", i) : o.removeListener(i);
                    }));
        }),
        r
    );
}
const Bs =
        typeof globalThis != "undefined"
            ? globalThis
            : typeof window != "undefined"
            ? window
            : typeof global != "undefined"
            ? global
            : typeof self != "undefined"
            ? self
            : {},
    Fs = "__vueuse_ssr_handlers__";
Bs[Fs] = Bs[Fs] || {};
Bs[Fs];
var ir;
(function (e) {
    (e.UP = "UP"), (e.RIGHT = "RIGHT"), (e.DOWN = "DOWN"), (e.LEFT = "LEFT"), (e.NONE = "NONE");
})(ir || (ir = {}));
function d1() {
    const { hasSidebar: e } = Je(),
        t = rr("(min-width: 960px)"),
        n = rr("(min-width: 1280px)");
    return { isAsideEnabled: me(() => (!n.value && !t.value ? !1 : e.value ? n.value : t.value)) };
}
const _1 = 56;
function h1() {
    const { page: e } = ce();
    return { hasOutline: me(() => e.value.headers.length > 0) };
}
function p1(e) {
    return ki(v1(e));
}
function v1(e) {
    e = e.map(n => Object.assign({}, n));
    let t;
    for (const n of e) n.level === 2 ? (t = n) : t && n.level <= 3 && (t.children || (t.children = [])).push(n);
    return e.filter(n => n.level === 2);
}
function ki(e) {
    return e.map(t => ({ text: t.title, link: `#${t.slug}`, children: t.children ? ki(t.children) : void 0, hidden: t.hidden }));
}
function m1(e, t) {
    const { isAsideEnabled: n } = d1(),
        s = xa(r, 100);
    let o = null;
    nt(() => {
        requestAnimationFrame(r), window.addEventListener("scroll", s);
    }),
        jr(() => {
            i(location.hash);
        }),
        Ct(() => {
            window.removeEventListener("scroll", s);
        });
    function r() {
        if (!n.value) return;
        const l = [].slice.call(e.value.querySelectorAll(".outline-link")),
            c = [].slice
                .call(document.querySelectorAll(".content .header-anchor"))
                .filter(C => l.some(N => N.hash === C.hash && C.offsetParent !== null)),
            f = window.scrollY,
            _ = window.innerHeight,
            g = document.body.offsetHeight,
            w = f + _ === g;
        if (c.length && w) {
            i(c[c.length - 1].hash);
            return;
        }
        for (let C = 0; C < c.length; C++) {
            const N = c[C],
                z = c[C + 1],
                [D, y] = g1(C, N, z);
            if (D) {
                history.replaceState(null, document.title, y || " "), i(y);
                return;
            }
        }
    }
    function i(l) {
        o && o.classList.remove("active"), l !== null && (o = e.value.querySelector(`a[href="${decodeURIComponent(l)}"]`));
        const c = o;
        c
            ? (c.classList.add("active"), (t.value.style.top = c.offsetTop + 33 + "px"), (t.value.style.opacity = "1"))
            : ((t.value.style.top = "33px"), (t.value.style.opacity = "0"));
    }
}
function lr(e) {
    return e.parentElement.offsetTop - _1 - 15;
}
function g1(e, t, n) {
    const s = window.scrollY;
    return e === 0 && s === 0 ? [!0, null] : s < lr(t) ? [!1, null] : !n || s < lr(n) ? [!0, t.hash] : [!1, null];
}
const y1 = e => (Re("data-v-51e5a8ce"), (e = e()), De(), e),
    b1 = { class: "content" },
    w1 = { class: "outline-title" },
    x1 = { "aria-labelledby": "doc-outline-aria-label" },
    $1 = y1(() => p("span", { class: "visually-hidden", id: "doc-outline-aria-label" }, " Table of Contents for current page ", -1)),
    P1 = { class: "root" },
    k1 = ["href"],
    C1 = { key: 0 },
    S1 = ["href"],
    V1 = B({
        __name: "VPDocAsideOutline",
        setup(e) {
            const { page: t, frontmatter: n, theme: s } = ce(),
                { hasOutline: o } = h1(),
                r = be(),
                i = be();
            m1(r, i);
            const l = me(() => p1(t.value.headers));
            function c({ target: f }) {
                const _ = "#" + f.href.split("#")[1],
                    g = document.querySelector(_);
                g == null || g.focus();
            }
            return (f, _) => (
                d(),
                m(
                    "div",
                    { class: ve(["VPDocAsideOutline", { "has-outline": v(o) }]), ref_key: "container", ref: r },
                    [
                        p("div", b1, [
                            p("div", { class: "outline-marker", ref_key: "marker", ref: i }, null, 512),
                            p("div", w1, se(v(s).outlineTitle || "On this page"), 1),
                            p("nav", x1, [
                                $1,
                                p("ul", P1, [
                                    (d(!0),
                                    m(
                                        Q,
                                        null,
                                        Ce(v(l), ({ text: g, link: w, children: C, hidden: N }) =>
                                            So(
                                                (d(),
                                                m(
                                                    "li",
                                                    null,
                                                    [
                                                        p("a", { class: "outline-link", href: w, onClick: c }, se(g), 9, k1),
                                                        C && v(n).outline === "deep"
                                                            ? (d(),
                                                              m("ul", C1, [
                                                                  (d(!0),
                                                                  m(
                                                                      Q,
                                                                      null,
                                                                      Ce(C, ({ text: z, link: D, hidden: y }) =>
                                                                          So(
                                                                              (d(),
                                                                              m(
                                                                                  "li",
                                                                                  null,
                                                                                  [
                                                                                      p(
                                                                                          "a",
                                                                                          { class: "outline-link nested", href: D, onClick: c },
                                                                                          se(z),
                                                                                          9,
                                                                                          S1
                                                                                      ),
                                                                                  ],
                                                                                  512
                                                                              )),
                                                                              [[Go, !y]]
                                                                          )
                                                                      ),
                                                                      256
                                                                  )),
                                                              ]))
                                                            : q("", !0),
                                                    ],
                                                    512
                                                )),
                                                [[Go, !N]]
                                            )
                                        ),
                                        256
                                    )),
                                ]),
                            ]),
                        ]),
                    ],
                    2
                )
            );
        },
    });
var E1 = L(V1, [["__scopeId", "data-v-51e5a8ce"]]);
const T1 = { class: "VPDocAsideCarbonAds" },
    L1 = B({
        __name: "VPDocAsideCarbonAds",
        setup(e) {
            const t = () => null;
            return (n, s) => (d(), m("div", T1, [E(v(t))]));
        },
    });
const M1 = e => (Re("data-v-779d834d"), (e = e()), De(), e),
    A1 = { class: "VPDocAside" },
    I1 = M1(() => p("div", { class: "spacer" }, null, -1)),
    N1 = B({
        __name: "VPDocAside",
        setup(e) {
            const { page: t, theme: n } = ce();
            return (s, o) => (
                d(),
                m("div", A1, [
                    R(s.$slots, "aside-top", {}, void 0, !0),
                    R(s.$slots, "aside-outline-before", {}, void 0, !0),
                    v(t).headers.length ? (d(), J(E1, { key: 0 })) : q("", !0),
                    R(s.$slots, "aside-outline-after", {}, void 0, !0),
                    I1,
                    R(s.$slots, "aside-ads-before", {}, void 0, !0),
                    v(n).carbonAds ? (d(), J(L1, { key: 1 })) : q("", !0),
                    R(s.$slots, "aside-ads-after", {}, void 0, !0),
                    R(s.$slots, "aside-bottom", {}, void 0, !0),
                ])
            );
        },
    });
var B1 = L(N1, [["__scopeId", "data-v-779d834d"]]);
function F1() {
    const { theme: e, page: t } = ce();
    return me(() => {
        const { text: n = "Edit this page", pattern: s } = e.value.editLink || {},
            { relativePath: o } = t.value;
        return { url: s.replace(/:path/g, o), text: n };
    });
}
function O1() {
    const { page: e, theme: t } = ce();
    return me(() => {
        const n = mi(t.value.sidebar, e.value.relativePath),
            s = $a(n),
            o = s.findIndex(r => pn(e.value.relativePath, r.link));
        return { prev: s[o - 1], next: s[o + 1] };
    });
}
const H1 = {},
    R1 = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
    D1 = p(
        "path",
        {
            d: "M18,23H4c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3h7c0.6,0,1,0.4,1,1s-0.4,1-1,1H4C3.4,5,3,5.4,3,6v14c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-7c0-0.6,0.4-1,1-1s1,0.4,1,1v7C21,21.7,19.7,23,18,23z",
        },
        null,
        -1
    ),
    z1 = p(
        "path",
        {
            d: "M8,17c-0.3,0-0.5-0.1-0.7-0.3C7,16.5,6.9,16.1,7,15.8l1-4c0-0.2,0.1-0.3,0.3-0.5l9.5-9.5c1.2-1.2,3.2-1.2,4.4,0c1.2,1.2,1.2,3.2,0,4.4l-9.5,9.5c-0.1,0.1-0.3,0.2-0.5,0.3l-4,1C8.2,17,8.1,17,8,17zM9.9,12.5l-0.5,2.1l2.1-0.5l9.3-9.3c0.4-0.4,0.4-1.1,0-1.6c-0.4-0.4-1.2-0.4-1.6,0l0,0L9.9,12.5z M18.5,2.5L18.5,2.5L18.5,2.5z",
        },
        null,
        -1
    ),
    U1 = [D1, z1];
function j1(e, t) {
    return d(), m("svg", R1, U1);
}
var K1 = L(H1, [["render", j1]]);
const W1 = { class: "VPLastUpdated" },
    q1 = ["datatime"],
    Y1 = B({
        __name: "VPDocFooterLastUpdated",
        setup(e) {
            const { theme: t, page: n } = ce(),
                s = new Date(n.value.lastUpdated),
                o = s.toISOString(),
                r = be("");
            return (
                nt(() => {
                    Jn(() => {
                        r.value = s.toLocaleString(window.navigator.language);
                    });
                }),
                (i, l) => {
                    var c;
                    return (
                        d(),
                        m("p", W1, [
                            Be(se((c = v(t).lastUpdatedText) != null ? c : "Last updated") + ": ", 1),
                            p("time", { datatime: v(o) }, se(r.value), 9, q1),
                        ])
                    );
                }
            );
        },
    });
var G1 = L(Y1, [["__scopeId", "data-v-0ce8c960"]]);
const Ci = e => (Re("data-v-04568844"), (e = e()), De(), e),
    J1 = { class: "VPDocFooter" },
    X1 = { class: "edit-info" },
    Q1 = { key: 0, class: "edit-link" },
    Z1 = { key: 1, class: "last-updated" },
    ep = { key: 0, class: "prev-next" },
    tp = { class: "pager" },
    np = ["href"],
    sp = Ci(() => p("span", { class: "desc" }, "Previous page", -1)),
    op = { class: "title" },
    rp = ["href"],
    ip = Ci(() => p("span", { class: "desc" }, "Next page", -1)),
    lp = { class: "title" },
    cp = B({
        __name: "VPDocFooter",
        setup(e) {
            const { theme: t, page: n, frontmatter: s } = ce(),
                o = F1(),
                r = O1(),
                i = me(() => n.value.lastUpdated && s.value.lastUpdated !== !1);
            return (l, c) => (
                d(),
                m("footer", J1, [
                    p("div", X1, [
                        v(t).editLink && v(s).editLink !== !1
                            ? (d(),
                              m("div", Q1, [
                                  E(
                                      Ut,
                                      { class: "edit-link-button", href: v(o).url, "no-icon": !0 },
                                      { default: j(() => [E(K1, { class: "edit-link-icon" }), Be(" " + se(v(o).text), 1)]), _: 1 },
                                      8,
                                      ["href"]
                                  ),
                              ]))
                            : q("", !0),
                        v(i) ? (d(), m("div", Z1, [E(G1)])) : q("", !0),
                    ]),
                    v(r).prev || v(r).next
                        ? (d(),
                          m("div", ep, [
                              p("div", tp, [
                                  v(r).prev
                                      ? (d(),
                                        m(
                                            "a",
                                            { key: 0, class: "pager-link prev", href: v(Is)(v(r).prev.link) },
                                            [sp, p("span", op, se(v(r).prev.text), 1)],
                                            8,
                                            np
                                        ))
                                      : q("", !0),
                              ]),
                              p(
                                  "div",
                                  { class: ve(["pager", { "has-prev": v(r).prev }]) },
                                  [
                                      v(r).next
                                          ? (d(),
                                            m(
                                                "a",
                                                { key: 0, class: "pager-link next", href: v(Is)(v(r).next.link) },
                                                [ip, p("span", lp, se(v(r).next.text), 1)],
                                                8,
                                                rp
                                            ))
                                          : q("", !0),
                                  ],
                                  2
                              ),
                          ]))
                        : q("", !0),
                ])
            );
        },
    });
var ap = L(cp, [["__scopeId", "data-v-04568844"]]);
const up = e => (Re("data-v-79ca2460"), (e = e()), De(), e),
    fp = { class: "container" },
    dp = { class: "aside" },
    _p = up(() => p("div", { class: "aside-curtain" }, null, -1)),
    hp = { class: "aside-container" },
    pp = { class: "aside-content" },
    vp = { class: "content" },
    mp = { class: "content-container" },
    gp = { class: "main" },
    yp = B({
        __name: "VPDoc",
        setup(e) {
            const { path: t } = zt(),
                { hasSidebar: n } = Je(),
                s = t.replace(/[./]+/g, "_").replace(/_html$/, "");
            return (o, r) => {
                const i = es("Content");
                return (
                    d(),
                    m(
                        "div",
                        { class: ve(["VPDoc", { "has-sidebar": v(n) }]) },
                        [
                            p("div", fp, [
                                p("div", dp, [
                                    _p,
                                    p("div", hp, [
                                        p("div", pp, [
                                            E(B1, null, {
                                                "aside-top": j(() => [R(o.$slots, "aside-top", {}, void 0, !0)]),
                                                "aside-bottom": j(() => [R(o.$slots, "aside-bottom", {}, void 0, !0)]),
                                                "aside-outline-before": j(() => [R(o.$slots, "aside-outline-before", {}, void 0, !0)]),
                                                "aside-outline-after": j(() => [R(o.$slots, "aside-outline-after", {}, void 0, !0)]),
                                                "aside-ads-before": j(() => [R(o.$slots, "aside-ads-before", {}, void 0, !0)]),
                                                "aside-ads-after": j(() => [R(o.$slots, "aside-ads-after", {}, void 0, !0)]),
                                                _: 3,
                                            }),
                                        ]),
                                    ]),
                                ]),
                                p("div", vp, [
                                    p("div", mp, [
                                        R(o.$slots, "doc-before", {}, void 0, !0),
                                        p("main", gp, [E(i, { class: ve(["vp-doc", v(s)]) }, null, 8, ["class"])]),
                                        E(ap),
                                        R(o.$slots, "doc-after", {}, void 0, !0),
                                    ]),
                                ]),
                            ]),
                        ],
                        2
                    )
                );
            };
        },
    });
var bp = L(yp, [["__scopeId", "data-v-79ca2460"]]);
const wp = B({
    __name: "VPContent",
    setup(e) {
        const t = zt(),
            { frontmatter: n } = ce(),
            { hasSidebar: s } = Je();
        return (
            mh(),
            (o, r) => (
                d(),
                m(
                    "div",
                    { class: ve(["VPContent", { "has-sidebar": v(s), "is-home": v(n).layout === "home" }]), id: "VPContent" },
                    [
                        v(t).component === Ns
                            ? (d(), J(Ns, { key: 0 }))
                            : v(n).layout === "page"
                            ? (d(), J(Lh, { key: 1 }))
                            : v(n).layout === "home"
                            ? (d(),
                              J(
                                  c1,
                                  { key: 2 },
                                  {
                                      "home-hero-before": j(() => [R(o.$slots, "home-hero-before", {}, void 0, !0)]),
                                      "home-hero-after": j(() => [R(o.$slots, "home-hero-after", {}, void 0, !0)]),
                                      "home-features-before": j(() => [R(o.$slots, "home-features-before", {}, void 0, !0)]),
                                      "home-features-after": j(() => [R(o.$slots, "home-features-after", {}, void 0, !0)]),
                                      _: 3,
                                  }
                              ))
                            : (d(),
                              J(
                                  bp,
                                  { key: 3 },
                                  {
                                      "doc-before": j(() => [R(o.$slots, "doc-before", {}, void 0, !0)]),
                                      "doc-after": j(() => [R(o.$slots, "doc-after", {}, void 0, !0)]),
                                      "aside-top": j(() => [R(o.$slots, "aside-top", {}, void 0, !0)]),
                                      "aside-outline-before": j(() => [R(o.$slots, "aside-outline-before", {}, void 0, !0)]),
                                      "aside-outline-after": j(() => [R(o.$slots, "aside-outline-after", {}, void 0, !0)]),
                                      "aside-ads-before": j(() => [R(o.$slots, "aside-ads-before", {}, void 0, !0)]),
                                      "aside-ads-after": j(() => [R(o.$slots, "aside-ads-after", {}, void 0, !0)]),
                                      "aside-bottom": j(() => [R(o.$slots, "aside-bottom", {}, void 0, !0)]),
                                      _: 3,
                                  }
                              )),
                    ],
                    2
                )
            )
        );
    },
});
var xp = L(wp, [["__scopeId", "data-v-a4c57a06"]]);
const $p = { class: "container" },
    Pp = { class: "message" },
    kp = { class: "copyright" },
    Cp = B({
        __name: "VPFooter",
        setup(e) {
            const { theme: t } = ce(),
                { hasSidebar: n } = Je();
            return (s, o) =>
                v(t).footer
                    ? (d(),
                      m(
                          "footer",
                          { key: 0, class: ve(["VPFooter", { "has-sidebar": v(n) }]) },
                          [p("div", $p, [p("p", Pp, se(v(t).footer.message), 1), p("p", kp, se(v(t).footer.copyright), 1)])],
                          2
                      ))
                    : q("", !0);
        },
    });
var Sp = L(Cp, [["__scopeId", "data-v-5b331722"]]);
const Vp = { class: "Layout" },
    Ep = B({
        __name: "Layout",
        setup(e) {
            const { isOpen: t, open: n, close: s } = Je();
            return (
                Pa(t, s),
                Zs("close-sidebar", s),
                (o, r) => (
                    d(),
                    m("div", Vp, [
                        R(o.$slots, "layout-top", {}, void 0, !0),
                        E(Ca),
                        E(Ea, { class: "backdrop", show: v(t), onClick: v(s) }, null, 8, ["show", "onClick"]),
                        E(S_),
                        E(z_, { open: v(t), onOpenMenu: v(n) }, null, 8, ["open", "onOpenMenu"]),
                        E(vh, { open: v(t) }, null, 8, ["open"]),
                        E(xp, null, {
                            "home-hero-before": j(() => [R(o.$slots, "home-hero-before", {}, void 0, !0)]),
                            "home-hero-after": j(() => [R(o.$slots, "home-hero-after", {}, void 0, !0)]),
                            "home-features-before": j(() => [R(o.$slots, "home-features-before", {}, void 0, !0)]),
                            "home-features-after": j(() => [R(o.$slots, "home-features-after", {}, void 0, !0)]),
                            "doc-before": j(() => [R(o.$slots, "doc-before", {}, void 0, !0)]),
                            "doc-after": j(() => [R(o.$slots, "doc-after", {}, void 0, !0)]),
                            "aside-top": j(() => [R(o.$slots, "aside-top", {}, void 0, !0)]),
                            "aside-bottom": j(() => [R(o.$slots, "aside-bottom", {}, void 0, !0)]),
                            "aside-outline-before": j(() => [R(o.$slots, "aside-outline-before", {}, void 0, !0)]),
                            "aside-outline-after": j(() => [R(o.$slots, "aside-outline-after", {}, void 0, !0)]),
                            "aside-ads-before": j(() => [R(o.$slots, "aside-ads-before", {}, void 0, !0)]),
                            "aside-ads-after": j(() => [R(o.$slots, "aside-ads-after", {}, void 0, !0)]),
                            _: 3,
                        }),
                        E(Sp),
                        R(o.$slots, "layout-bottom", {}, void 0, !0),
                    ])
                )
            );
        },
    });
var Tp = L(Ep, [["__scopeId", "data-v-6b5fd0a9"]]);
const Rn = { Layout: Tp, NotFound: Ns };
function Lp(e, t) {
    let n = [],
        s = !0;
    const o = r => {
        if (s) {
            s = !1;
            return;
        }
        const i = [],
            l = Math.min(n.length, r.length);
        for (let c = 0; c < l; c++) {
            let f = n[c];
            const [_, g, w = ""] = r[c];
            if (f.tagName.toLocaleLowerCase() === _) {
                for (const C in g) f.getAttribute(C) !== g[C] && f.setAttribute(C, g[C]);
                for (let C = 0; C < f.attributes.length; C++) {
                    const N = f.attributes[C].name;
                    N in g || f.removeAttribute(N);
                }
                f.innerHTML !== w && (f.innerHTML = w);
            } else document.head.removeChild(f), (f = cr(r[c])), document.head.append(f);
            i.push(f);
        }
        n.slice(l).forEach(c => document.head.removeChild(c)),
            r.slice(l).forEach(c => {
                const f = cr(c);
                document.head.appendChild(f), i.push(f);
            }),
            (n = i);
    };
    Jn(() => {
        const r = e.data,
            i = t.value,
            l = r && r.description,
            c = r && r.frontmatter.head;
        (document.title = di(i, r)),
            document.querySelector("meta[name=description]").setAttribute("content", l || i.description),
            o([...(c ? Ap(c) : [])]);
    });
}
function cr([e, t, n]) {
    const s = document.createElement(e);
    for (const o in t) s.setAttribute(o, t[o]);
    return n && (s.innerHTML = n), s;
}
function Mp(e) {
    return e[0] === "meta" && e[1] && e[1].name === "description";
}
function Ap(e) {
    return e.filter(t => !Mp(t));
}
const gs = new Set(),
    Si = () => document.createElement("link"),
    Ip = e => {
        const t = Si();
        (t.rel = "prefetch"), (t.href = e), document.head.appendChild(t);
    },
    Np = e => {
        const t = new XMLHttpRequest();
        t.open("GET", e, (t.withCredentials = !0)), t.send();
    };
let kn;
const Bp = Te && (kn = Si()) && kn.relList && kn.relList.supports && kn.relList.supports("prefetch") ? Ip : Np;
function Fp() {
    if (!Te || !window.IntersectionObserver) return;
    let e;
    if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType))) return;
    const t = window.requestIdleCallback || setTimeout;
    let n = null;
    const s = () => {
        n && n.disconnect(),
            (n = new IntersectionObserver(r => {
                r.forEach(i => {
                    if (i.isIntersecting) {
                        const l = i.target;
                        n.unobserve(l);
                        const { pathname: c } = l;
                        if (!gs.has(c)) {
                            gs.add(c);
                            const f = _i(c);
                            Bp(f);
                        }
                    }
                });
            })),
            t(() => {
                document.querySelectorAll("#app a").forEach(r => {
                    const { target: i, hostname: l, pathname: c } = r,
                        f = c.match(/\.\w+$/);
                    (f && f[0] !== ".html") || (i !== "_blank" && l === location.hostname && (c !== location.pathname ? n.observe(r) : gs.add(c)));
                });
            });
    };
    nt(s);
    const o = zt();
    _t(() => o.path, s),
        Ct(() => {
            n && n.disconnect();
        });
}
const Op = B({
        setup(e, { slots: t }) {
            const n = be(!1);
            return (
                nt(() => {
                    n.value = !0;
                }),
                () => (n.value && t.default ? t.default() : null)
            );
        },
    }),
    Hp = Rn.NotFound || (() => "404 Not Found"),
    Rp = {
        name: "VitePressApp",
        setup() {
            const { site: e } = ce();
            return (
                nt(() => {
                    _t(
                        () => e.value.lang,
                        t => {
                            document.documentElement.lang = t;
                        },
                        { immediate: !0 }
                    );
                }),
                Fp(),
                () => Bn(Rn.Layout)
            );
        },
    };
function Dp() {
    const e = Up(),
        t = zp();
    t.provide(pi, e);
    const n = da(e.route);
    return (
        t.provide(hi, n),
        t.component("Content", va),
        t.component("ClientOnly", Op),
        Object.defineProperty(t.config.globalProperties, "$frontmatter", {
            get() {
                return n.frontmatter.value;
            },
        }),
        Rn.enhanceApp && Rn.enhanceApp({ app: t, router: e, siteData: hn }),
        { app: t, router: e, data: n }
    );
}
function zp() {
    return na(Rp);
}
function Up() {
    let e = Te,
        t;
    return ha(n => {
        let s = _i(n);
        return e && (t = s), (e || t === s) && (s = s.replace(/\.js$/, ".lean.js")), Te && (e = !1), Mi(() => import(s), []);
    }, Hp);
}
if (Te) {
    const { app: e, router: t, data: n } = Dp();
    t.go().then(() => {
        Lp(t.route, n.site), e.mount("#app");
    });
}
export { L as _, p as a, m as c, Dp as createApp, d as o };
