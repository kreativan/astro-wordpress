var Z = Object.defineProperty;
var M = Object.getOwnPropertySymbols;
var J = Object.prototype.hasOwnProperty, X = Object.prototype.propertyIsEnumerable;
var j = (e, t, n) => t in e ? Z(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, y = (e, t) => {
  for (var n in t || (t = {}))
    J.call(t, n) && j(e, n, t[n]);
  if (M)
    for (var n of M(t))
      X.call(t, n) && j(e, n, t[n]);
  return e;
};
var L = (e, t, n) => new Promise((i, r) => {
  var o = (l) => {
    try {
      a(n.next(l));
    } catch (c) {
      r(c);
    }
  }, s = (l) => {
    try {
      a(n.throw(l));
    } catch (c) {
      r(c);
    }
  }, a = (l) => l.done ? i(l.value) : Promise.resolve(l.value).then(o, s);
  a((n = n.apply(e, t)).next());
});
const ee = {
  setCookie: te,
  getCookie: ne
};
function Y() {
  return window.location.hostname === "localhost";
}
function te(e, t, n, i = {}) {
  const {
    path: r = "/",
    sameSite: o = "Lax",
    secure: s = window.location.protocol === "https:"
  } = i, a = n ? `expires=${new Date(Date.now() + n * 864e5).toUTCString()};` : "", l = s ? "Secure;" : "";
  document.cookie = `${e}=${encodeURIComponent(t)};${a}path=${r};SameSite=${o};${l}`;
}
function ne(e) {
  const t = `${e}=`, n = document.cookie.split(";");
  for (let i of n)
    if (i = i.trim(), i.startsWith(t))
      return decodeURIComponent(i.substring(t.length));
  return "";
}
function _(e, t, n = !0) {
  let i = new CustomEvent(e, {
    detail: t,
    cancelable: n
  });
  return window.dispatchEvent(i), i;
}
function ie(e = null) {
  const t = e ? document.querySelector(e) : event.target;
  t.value = t.value.replace(/\D/g, "");
}
function T(e, t = "", n = {}) {
  var r, o, s;
  let i = (s = (o = (r = window.supersonic) == null ? void 0 : r.i18n) == null ? void 0 : o[e]) != null ? s : t || e;
  return n && typeof n == "object" && (i = i.replace(/\{(\w+)\}/g, (a, l) => n[l] !== void 0 ? n[l] : a)), i;
}
const R = {
  validate: re,
  validateNumbCaptcha: ae
};
function re(e) {
  let t = [];
  return e.forEach((n) => {
    let i = G(n);
    i && t.push(i);
  }), t;
}
function G(e) {
  let t = T("invalid_email", "Invalid email address"), n = T("required_field", 'This field is required"'), i = e.getAttribute("type"), r = oe(e), o = se(e.value);
  if (r)
    e.parentNode.classList.remove("error");
  else
    return e.parentNode.classList.add("error"), { name: e.getAttribute("name"), error: n };
  return i === "email" && !o ? (e.parentNode.classList.add("error"), { name: e.getAttribute("name"), error: t }) : (e.parentNode.classList.remove("error"), !1);
}
function oe(e) {
  let t = e.hasAttribute("required"), n = e.value;
  return !(t && n === "");
}
function se(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e).toLowerCase());
}
function ae(e) {
  let t = document.getElementById(e), n = t.querySelector("input[name='numb_captcha']");
  if (!n) return !0;
  let i = t.querySelector("input[name='num1']").value, r = t.querySelector("input[name='num2']").value, o = n.value;
  return parseInt(i) + parseInt(r) === parseInt(o);
}
function q(e) {
  return document.getElementById(e).querySelectorAll("input, select, textarea, file");
}
function le(e, t = null) {
  let n = q(e), i = new FormData();
  if (t)
    for (const r in t) i.append(r, t[r]);
  return n.forEach((r) => {
    let o = r.getAttribute("type"), s = r.getAttribute("name");
    o === "file" ? i.append(s, r.files[0]) : o === "checkbox" ? r.checked && i.append(s, r.value) : i.append(s, r.value);
  }), i;
}
function ce(e) {
  q(e).forEach((n) => {
    let i = n.getAttribute("type");
    i !== "submit" && i !== "hidden" && i !== "button" && (n.value = ""), i == "checkbox" && (n.checked = !1);
  });
}
function ue(e) {
  e.forEach((t) => {
    W(t);
  });
}
function W(e) {
  let t = document.querySelector(`[name='${e.name}']`);
  if (t.parentNode.querySelector(".error-message")) return;
  let n = document.createElement("span");
  n.classList.add("error-message"), n.innerHTML = e.error, t.parentNode.appendChild(n);
}
function de(e) {
  e.forEach((t) => {
    V(t);
  });
}
function V(e) {
  let t = e.parentNode.querySelector(".error-message");
  t && t.remove();
}
function I(e) {
  V(e);
  let t = G(e);
  t && W(t);
}
function me(e) {
  q(e).forEach((n) => {
    n.addEventListener("keyup", (i) => {
      I(n);
    }), n.addEventListener("change", (i) => {
      I(n);
    }), n.addEventListener("blur", (i) => {
      I(n);
    });
  });
}
function fe(e) {
  let t = document.getElementById(e), n = t.querySelector("input[name='numb_captcha']");
  if (!n) return;
  let i = Math.ceil(Math.random() * 10), r = Math.ceil(Math.random() * 10);
  n.setAttribute("placeholder", `${i} + ${r} = ?`);
  let o = document.createElement("input");
  o.setAttribute("type", "hidden"), o.setAttribute("name", "num1"), o.setAttribute("value", i), t.appendChild(o);
  let s = document.createElement("input");
  s.setAttribute("type", "hidden"), s.setAttribute("name", "num2"), s.setAttribute("value", r), t.appendChild(s);
}
function pe(e) {
  return e.status === "success" || e.code === 200 || e.code === "success" || e.status === 200 || e.code === "ok" || e.code === "OK";
}
function he(e) {
  return e.status === "error" || e.code === 400 || e.code === "error" || e.status === 400 || e.code === "error" || e.code === "ERROR";
}
function H(e, t) {
  Swal.fire({
    toast: !0,
    position: "top-end",
    icon: e,
    title: t,
    showConfirmButton: !1,
    timer: 3e3
  });
}
function ye(e) {
  e && Array.isArray(e) ? e.forEach((n) => {
    H("error", n);
  }) : typeof e == "string" && H("error", e);
}
function we(e, t = "#333") {
  Swal.fire({
    html: e,
    icon: "success",
    confirmButtonText: T("ok", "OK"),
    confirmButtonColor: t
  });
}
function P(e) {
  if (Y() && console.log(e), e.fields && de(e.fields), e.clientSideErrors && e.clientSideErrors.length > 0) {
    ue(e.clientSideErrors);
    return;
  }
  if (e.errors && e.errors.length > 0) {
    e.errors.forEach((t) => {
    });
    return;
  }
  if (he(e) && (_("supersonic:AjaxResponseError", e), e.responseType == "swal" && Swal && ye(message)), pe(e)) {
    if (_("supersonic:AjaxResponseSuccess", e), e.responseType == "swal" && Swal) {
      let t = e.body ? e.body : `<p>${e.message}</p>`;
      we(t, "#333");
    }
    setTimeout(() => {
      ce(e.form_css_id);
    }, 300);
  }
}
function ge() {
  return L(this, arguments, function* (e = {}, t = null) {
    var $, O, F, B, N;
    t.preventDefault();
    let n = ($ = e.method) != null ? $ : "POST", i = (O = e.data) != null ? O : null, r = e.submitButton ? document.querySelector(e.submitButton) : t.target, o = (F = e.formId) != null ? F : null, s = (B = e.ajaxUrl) != null ? B : null, a = e.indicator ? document.querySelector(e.indicator) : null, l = !!(e.recaptcha && e.recaptcha != "false"), c = e.recaptcha_site_key ? e.recaptcha_site_key : null, u = (N = e.responseType) != null ? N : "default", d = e.callback ? e.callback : null;
    if (!o) {
      console.error("Form ID is required");
      return;
    }
    if (!s) {
      console.error("Ajax URL is required");
      return;
    }
    r && r.setAttribute("disabled", "disabled"), document.getElementById(o);
    const f = q(o);
    a && a.classList.remove("hidden");
    let p = R.validate(f);
    if (R.validateNumbCaptcha(o) || p.push({ name: "numb_captcha", error: "Invalid captcha" }), p.length > 0)
      return r.removeAttribute("disabled"), a && a.classList.add("hidden"), P({ clientSideErrors: p });
    let w = le(o);
    if (i)
      for (const S in i) w.append(S, i[S]);
    if (l && c) {
      let S = yield grecaptcha.execute(c, { action: "submit" });
      w.append("recaptcha_response", S);
    }
    if (_("supersonic:FormSubmitBefore", w).defaultPrevented) {
      a && (a.classList.add("uk-hidden"), a.classList.add("hidden"), r.removeAttribute("disabled"));
      return;
    }
    let v = yield (yield fetch(s, {
      method: n,
      cache: "no-cache",
      body: w
    })).json();
    return v.form_css_id = o, v.responseType = u, d ? d(v) : P(v), _("supersonic:FormSubmitAfter", v), a && (a.classList.add("uk-hidden"), a.classList.add("hidden")), setTimeout(() => {
      r.removeAttribute("disabled");
    }, 2e3), v;
  });
}
const ve = {
  formId: null,
  submitButton: null,
  data: null,
  indicator: null,
  ajaxUrl: null,
  method: "POST",
  recaptcha: null,
  recaptcha_site_key: null,
  responseType: "default",
  callback: null
};
class be {
  constructor(t = {}) {
    this.options = y(y({}, ve), t), this.handleSubmit = this.handleSubmit.bind(this), this.validate() && (me(this.options.formId), fe(this.options.formId), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => this.init()) : this.init());
  }
  /**
   * Validate constructor options
   * @returns {boolean}
   */
  validate() {
    return this.options.formId ? this.options.submitButton ? this.options.ajaxUrl ? !0 : (console.error("Ajax URL is required. Please provide a valid URL."), !1) : (console.error("Submit button selector is required. Please provide a valid selector."), !1) : (console.error("Form ID is required. Please provide a valid form ID."), !1);
  }
  /**
   * Handle form submission
   * @param {Event} event
   */
  handleSubmit(t) {
    t.preventDefault(), ge(this.options, t);
  }
  /**
   * Initialize form listeners
   */
  init() {
    if (this.submitButton = document.querySelector(this.options.submitButton), this.formElement = document.getElementById(this.options.formId), !this.submitButton) {
      console.warn(`Submit button not found: ${this.options.submitButton}`);
      return;
    }
    this.submitButton.addEventListener("click", this.handleSubmit), this.formElement && this.formElement.addEventListener("submit", this.handleSubmit);
  }
  /**
   * Cleanup event listeners
   */
  destroy() {
    this.submitButton && this.submitButton.removeEventListener("click", this.handleSubmit), this.formElement && this.formElement.removeEventListener("submit", this.handleSubmit);
  }
}
function Ee(e) {
  if (e) {
    if (!e || !/^GTM-[A-Z0-9]+$/.test(e)) {
      console.error("Invalid GTM ID");
      return;
    }
    try {
      window.dataLayer = window.dataLayer || [], window.dataLayer.push({
        "gtm.start": (/* @__PURE__ */ new Date()).getTime(),
        event: "gtm.js"
      });
      const t = document.createElement("script");
      if (t.async = !0, t.src = `https://www.googletagmanager.com/gtm.js?id=${e}`, t.onerror = () => console.error("Failed to load GTM script"), document.head.appendChild(t), document.body) {
        const n = document.createElement("noscript"), i = document.createElement("iframe");
        i.src = `https://www.googletagmanager.com/ns.html?id=${e}`, i.height = "0", i.width = "0", i.style.display = "none", i.style.visibility = "hidden", n.appendChild(i), document.body.appendChild(n);
      }
    } catch (t) {
      console.error("Error loading GTM:", t);
    }
  }
}
function Se() {
  return new Promise((e, t) => {
    if (window.Swal) return e(window.Swal);
    const n = document.createElement("script");
    n.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11", n.defer = !0, n.onload = () => e(window.Swal), n.onerror = t, document.head.appendChild(n);
  });
}
function Le() {
  return L(this, arguments, function* (e = "#input-phone-iti", t = {}) {
    yield _e();
    const n = t.country || "bg";
    delete t.country;
    const i = document.querySelector(e);
    if (i) {
      const r = window.intlTelInput(i, y({
        initialCountry: n,
        separateDialCode: !0,
        showSelectedDialCode: !0
      }, t)), o = () => {
        const s = r.getSelectedCountryData() || {}, a = s.dialCode || "", l = s.name || "", c = document.querySelector('input[name="country_code"]') || document.getElementById("country_code");
        c && (c.value = a);
        const u = document.querySelector('input[name="country_name"]') || document.getElementById("country_name");
        u && (u.value = l);
      };
      o(), i.addEventListener("countrychange", o);
    }
  });
}
function _e() {
  return new Promise((e, t) => {
    if (!document.querySelector("link[data-intl-tel-input]")) {
      const i = document.createElement("link");
      i.rel = "stylesheet", i.href = "https://cdn.jsdelivr.net/npm/intl-tel-input@25.5.2/build/css/intlTelInput.min.css", i.setAttribute("data-intl-tel-input", "true"), document.head.appendChild(i);
    }
    if (window.intlTelInput) return e(window.intlTelInput);
    const n = document.createElement("script");
    n.src = "https://cdn.jsdelivr.net/npm/intl-tel-input@25.5.2/build/js/intlTelInput.min.js", n.defer = !0, n.onload = () => e(window.intlTelInput), n.onerror = t, document.head.appendChild(n);
  });
}
function Ae(e, { duration: t = 1500, decimals: n = 0 } = {}) {
  const i = +e.dataset.countTo || 0, r = 0, o = performance.now(), s = new Intl.NumberFormat(void 0, {
    minimumFractionDigits: n,
    maximumFractionDigits: n
  });
  function a(l) {
    const c = Math.min((l - o) / t, 1), u = 1 - Math.pow(1 - c, 3), d = r + (i - r) * u;
    e.textContent = s.format(c < 1 ? d : i), c < 1 && requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
}
const ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  counter: Ae
}, Symbol.toStringTag, { value: "Module" }));
function qe(e) {
  const t = e.selector, n = e.root || null, i = e.rootMargin || "0px", r = e.threshold || 0.2, o = e.repeat || !1, s = e.onEnter || null, a = document.querySelectorAll(t);
  if (!a.length) {
    console.warn(`No elements found with selector "${t}".`);
    return;
  }
  const l = new IntersectionObserver((c, u) => {
    c.forEach((d) => {
      d.isIntersecting ? (d.target.classList.add("in-view"), s && typeof s == "function" && s(d.target, d), o || u.unobserve(d.target)) : o && d.target.classList.remove("in-view");
    });
  }, {
    root: n,
    // Element used as viewport (null for browser viewport)
    rootMargin: i,
    // Margin around root
    threshold: r
    // Percentage of element visibility to trigger
  });
  a.forEach((c) => l.observe(c));
}
function Ie(e) {
  const n = y(y({}, {
    selector: "[data-viewport-animation]",
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
    repeat: !1
  }), e), { selector: i, root: r, rootMargin: o, threshold: s, repeat: a } = n, l = document.querySelectorAll(i);
  if (!l.length)
    return;
  const c = new IntersectionObserver((u, d) => {
    requestAnimationFrame(() => {
      u.forEach((f) => {
        f.isIntersecting ? (f.target.classList.add("in-view"), z(f.target, !0), a || d.unobserve(f.target)) : a && (f.target.classList.remove("in-view"), z(f.target, !1));
      });
    });
  }, {
    root: r,
    // Element used as viewport (null for browser viewport)
    rootMargin: o,
    // Margin around root
    threshold: s
    // Percentage of element visibility to trigger
  });
  l.forEach((u) => c.observe(u));
}
function De(e) {
  const t = {};
  return e && e.split(";").forEach((n) => {
    const [i, r] = n.split(":");
    i && r && (t[i.trim()] = r.trim());
  }), t;
}
const U = (e, t) => {
  const n = e.getAttribute("data-viewport-animation"), i = De(n), r = i.animation;
  if (!r) return;
  let o = i.delay ? `${i.delay}ms` : "0ms", s = i.duration ? `${i.duration}ms` : "";
  t ? (e.style.animationDelay = o, e.style.animationDuration = s, e.classList.add("animate__animated", `animate__${r}`)) : (e.style.animationDelay = "", e.style.animationDuration = "", e.classList.remove("animate__animated", `animate__${r}`));
}, z = (e, t) => {
  U(e, t), e.querySelectorAll("[data-viewport-animation]").forEach((n) => {
    U(n, t);
  });
};
let E = 0, D = null, g = !1, m = null, h = !1;
function Te(e, t = {}) {
  const {
    cls: n = "sticky",
    threshold: i = 100,
    offset: r = 0,
    animateIn: o = "slideInDown",
    animateOut: s = "slideOutUp",
    scrollDelay: a = 50,
    minScrollDistance: l = 20
  } = t;
  m = document.createElement("div"), m.className = "sticky-navbar-placeholder", m.style.display = "none", m.style.height = "0px", m.style.visibility = "hidden", e.parentNode.insertBefore(m, e.nextSibling);
  function c() {
    D && clearTimeout(D), D = setTimeout(() => {
      const u = window.pageYOffset || document.documentElement.scrollTop;
      if (!(Math.abs(u - E) < l && !h)) {
        if (u <= 100) {
          g && !h && (h = !0, e.classList.remove(n), e.style.position = "", e.style.top = "", e.style.zIndex = "", e.style.width = "", e.classList.remove("animate__animated", `animate__${o}`, `animate__${s}`), m.style.display = "none", m.style.height = "0px", g = !1, h = !1), E = u;
          return;
        }
        if (u < E && u > i && !g && !h) {
          h = !0;
          const f = e.offsetHeight;
          e.classList.add(n), e.style.position = "fixed", e.style.top = `${r}px`, e.style.zIndex = "1000", e.style.width = "100%", e.style.animationDuration = "0.3s", m.style.display = "block", m.style.height = `${f}px`, e.classList.add("animate__animated", `animate__${o}`), e.classList.remove(`animate__${s}`), g = !0, setTimeout(() => {
            h = !1;
          }, 300);
        } else u > E && g && !h && (h = !0, e.classList.add("animate__animated", `animate__${s}`), e.classList.remove(`animate__${o}`), setTimeout(() => {
          g && (e.classList.remove(n), e.style.position = "", e.style.top = "", e.style.zIndex = "", e.style.width = "", e.classList.remove("animate__animated", `animate__${s}`), m.style.display = "none", m.style.height = "0px", g = !1, h = !1);
        }, 300));
        E = u <= 0 ? 0 : u;
      }
    }, a);
  }
  return window.addEventListener("scroll", c, { passive: !0 }), () => {
    window.removeEventListener("scroll", c), m && m.parentNode && m.parentNode.removeChild(m);
  };
}
function xe(e) {
  const t = {};
  return e && e.split(";").forEach((n) => {
    const [i, r] = n.split(":");
    i && r && (t[i.trim()] = r.trim());
  }), t;
}
function Ce(e = "[data-sticky-navbar]") {
  const t = document.querySelector(e);
  if (!t)
    return null;
  const n = xe(t.getAttribute("data-sticky-navbar")), i = {
    cls: n.cls || "sticky",
    threshold: n.threshold ? parseInt(n.threshold) : 100,
    offset: n.offset ? parseInt(n.offset) : 0,
    animateIn: n.animateIn || "slideInDown",
    animateOut: n.animateOut || "slideOutUp",
    scrollDelay: n.scrollDelay ? parseInt(n.scrollDelay) : 50,
    minScrollDistance: n.minScrollDistance ? parseInt(n.minScrollDistance) : 20
  };
  return Te(t, i);
}
class Q {
  constructor(t) {
    this.element = t, this.trigger = t.querySelector("a, button"), this.menu = this.trigger ? this.trigger.nextElementSibling : null, this.icon = t.querySelector("svg"), this.isOpen = !1, this.handleClickAway = this.handleClickAway.bind(this), this.handleEscape = this.handleEscape.bind(this), this.handleTriggerClick = this.handleTriggerClick.bind(this), this.init();
  }
  init() {
    !this.trigger || !this.menu || (this.menu.style.display = "none", this.menu.style.position = "absolute", this.trigger.addEventListener("click", this.handleTriggerClick), document.addEventListener("click", this.handleClickAway), document.addEventListener("keydown", this.handleEscape));
  }
  handleTriggerClick(t) {
    t.preventDefault(), this.toggle();
  }
  handleClickAway(t) {
    this.element.contains(t.target) || this.close();
  }
  handleEscape(t) {
    t.key === "Escape" && this.isOpen && this.close();
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  open() {
    this.isOpen = !0, this.icon && (this.icon.style.transform = "rotate(180deg)"), this.menu.style.cssText = "display:block;opacity:0;transform:translateY(-10px);position:absolute", requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.menu.style.transition = "opacity 200ms ease, transform 200ms ease", this.menu.style.opacity = "1", this.menu.style.transform = "translateY(0)";
      });
    });
  }
  close() {
    this.isOpen = !1, this.icon && (this.icon.style.transform = "rotate(0deg)"), this.menu.style.transition = "opacity 200ms ease, transform 200ms ease", this.menu.style.opacity = "0", this.menu.style.transform = "translateY(-10px)", setTimeout(() => {
      this.menu.style.display = "none", this.menu.style.transition = "";
    }, 200);
  }
  /**
   * Cleanup method to remove event listeners and prevent memory leaks
   */
  destroy() {
    this.trigger && this.trigger.removeEventListener("click", this.handleTriggerClick), document.removeEventListener("click", this.handleClickAway), document.removeEventListener("keydown", this.handleEscape);
  }
}
const x = /* @__PURE__ */ new WeakMap();
function K() {
  document.querySelectorAll("[data-dropdown]").forEach((t) => {
    const n = new Q(t);
    x.set(t, n);
  });
}
function $e() {
  document.querySelectorAll("[data-dropdown]").forEach((t) => {
    const n = x.get(t);
    n && (n.destroy(), x.delete(t));
  });
}
const Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Dropdown: Q,
  destroyDropdowns: $e,
  initDropdowns: K
}, Symbol.toStringTag, { value: "Module" })), A = /* @__PURE__ */ new Set();
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && A.size > 0) {
    const t = Array.from(A).pop();
    k(t);
  }
});
function Fe() {
  document.querySelectorAll("[data-drawer]").forEach((t) => {
    const n = t.getAttribute("data-drawer"), i = document.querySelectorAll(`[data-drawer-trigger="${n}"]`), r = document.querySelectorAll(`[data-drawer-close="${n}"]`);
    i.forEach((s) => {
      s.addEventListener("click", () => Be(n));
    }), r.forEach((s) => {
      s.addEventListener("click", () => k(n));
    }), t.querySelectorAll("a").forEach((s) => {
      s.addEventListener("click", (a) => {
        s.closest("li[data-submenu]") || k(n);
      });
    });
  });
}
function Be(e) {
  const t = document.querySelector(`[data-drawer="${e}"]`);
  if (t && (A.add(e), t.classList.remove("hidden"), t.style.animationDuration = "0.3s", t.classList.add("animate__animated", "animate__slideInLeft"), t.style.position = "fixed", t.style.top = "0", t.style.left = "0", t.style.zIndex = "1002", document.body.style.overflowY = "hidden", t.getAttribute("data-drawer-overlay") === "true")) {
    let n = document.createElement("div");
    n.className = "drawer-overlay", n.style.position = "fixed", n.style.top = "0", n.style.left = "0", n.style.width = "100vw", n.style.height = "100vh", n.style.background = "rgba(0,0,0,0.5)", n.style.zIndex = "999", n.setAttribute("data-drawer-overlay", "true"), n.addEventListener("click", () => k(e)), document.body.prepend(n);
  }
}
function k(e) {
  const t = document.querySelector(`[data-drawer="${e}"]`);
  if (t) {
    if (A.delete(e), t.classList.remove("animate__slideInLeft"), t.style.animationDuration = "0.3s", t.classList.add("animate__slideOutLeft"), t.addEventListener("animationend", function n() {
      t.classList.add("hidden"), t.classList.remove("animate__animated", "animate__slideOutLeft"), t.style.animationDuration = "", t.style.position = "", t.style.top = "", t.style.left = "", t.style.zIndex = "", t.removeEventListener("animationend", n);
    }), t.getAttribute("data-drawer-overlay") === "true") {
      const n = document.querySelector('.drawer-overlay[data-drawer-overlay="true"]');
      n && n.remove();
    }
    document.body.style.overflowY = "";
  }
}
function Ne() {
  document.querySelectorAll("[data-submenu]").forEach((t) => {
    const n = t.querySelector("a"), i = t.querySelector("ul"), r = n == null ? void 0 : n.querySelector("svg");
    !n || !i || (i.style.display = "none", n.addEventListener("click", (o) => {
      o.preventDefault(), Me(t, i, r);
    }));
  });
}
function Me(e, t, n) {
  e.classList.contains("submenu-open") ? (t.style.display = "none", e.classList.remove("submenu-open"), n && (n.style.transform = "rotate(0deg)")) : (t.style.display = "block", e.classList.add("submenu-open"), n && (n.style.transform = "rotate(180deg)"));
}
function je(e) {
  const t = {};
  return e && e.split(";").forEach((n) => {
    const [i, r] = n.split(":");
    i && r && (t[i.trim()] = r.trim());
  }), t;
}
function Re() {
  document.querySelectorAll("[data-scroll]").forEach((e) => {
    e.addEventListener("click", function(t) {
      const n = je(e.getAttribute("data-scroll"));
      let i = n.target || e.getAttribute("href");
      if (i && (i.startsWith("#") || i.startsWith("/#"))) {
        i.startsWith("/#") && (i = i.slice(1));
        const r = document.querySelector(i);
        if (r) {
          t.preventDefault();
          let o = n.offset && parseInt(n.offset, 10) || 0, s = n.speed ? parseFloat(n.speed) : 0;
          const a = r.getBoundingClientRect().top + window.scrollY - o;
          if (s > 0) {
            let d = function(p) {
              const C = p - u, w = Math.min(C / s, 1);
              window.scrollTo(0, l + c * f(w)), w < 1 && requestAnimationFrame(d);
            }, f = function(p) {
              return p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
            };
            const l = window.scrollY, c = a - l, u = performance.now();
            requestAnimationFrame(d);
          } else
            window.scrollTo({
              top: a,
              behavior: "smooth"
            });
        }
      }
    });
  });
}
function He() {
  document.querySelectorAll("[data-accordion]").forEach((t) => {
    const n = t.getAttribute("data-accordion"), i = {};
    n && n.split(";").forEach((o) => {
      const [s, a] = o.split(":");
      s && a && (i[s.trim()] = a.trim() === "true");
    });
    const r = t.querySelectorAll(".accordion-item");
    r.forEach((o) => {
      const s = o.querySelector(".accordion-title"), a = o.querySelector(".accordion-content");
      if (s && a) {
        a.style.maxHeight = o.classList.contains("open") ? `${a.scrollHeight}px` : "0", s.addEventListener("click", () => {
          const c = o.classList.contains("open");
          i.multiple ? c ? (o.classList.remove("open"), a.style.maxHeight = "0") : (o.classList.add("open"), a.style.maxHeight = `${a.scrollHeight}px`) : (r.forEach((u) => {
            u.classList.remove("open");
            const d = u.querySelector(".accordion-content");
            d && (d.style.maxHeight = "0");
          }), c || (o.classList.add("open"), a.style.maxHeight = `${a.scrollHeight}px`));
        });
        const l = o.querySelector("[data-accordion-close]");
        l && l.addEventListener("click", (c) => {
          c.stopPropagation(), o.classList.remove("open"), a.style.maxHeight = "0";
        });
      }
    });
  });
}
const b = typeof window != "undefined" ? window : globalThis;
b.supersonic || (b.supersonic = {});
b.supersonic.init = Pe;
b.supersonic.destroy = ze;
function Pe(e = {}) {
  const t = {
    i18n: {},
    lang: document.documentElement.lang || "en",
    gtm: null,
    swal: !1,
    iti: !1,
    country: null
  }, n = y(y({}, t), e);
  supersonic = n, supersonic.newForm = be, supersonic.isLocal = Y(), supersonic.utility = ee, supersonic.animations = ke, supersonic.ui = {}, supersonic.ui.observeElement = qe, supersonic.ui.onlyAllowNumbers = ie, Ue(supersonic).catch((r) => {
    console.error("Failed to initialize async components:", r);
  });
  const i = [
    { name: "gtm", function: () => Ee(supersonic.gtm) },
    // Google Tag Manager
    { name: "swal", function: () => Se() },
    // Load SweetAlert library
    { name: "stickyNavbar", function: () => Ce() },
    // Sticky navbar
    { name: "viewportAnimations", function: () => Ie() },
    // Viewport animations
    { name: "dropdowns", function: () => K() },
    // Dropdowns
    { name: "drawers", function: () => Fe() },
    // Drawers
    { name: "submenus", function: () => Ne() },
    // Submenus
    { name: "scroll", function: () => Re() },
    // Smooth scroll
    { name: "accordions", function: () => He() }
    // Accordions
  ];
  supersonic.supersonic_mode === "dev" ? i.forEach((r) => {
    r.function();
  }) : window.addEventListener("DOMContentLoaded", () => {
    i.forEach((r) => {
      r.function();
    });
  });
}
function Ue(e) {
  return L(this, null, function* () {
    e.iti && (yield Le("#input-phone-iti", {
      country: e.country || "bg"
    }));
  });
}
function ze() {
  Promise.resolve().then(() => Oe).then((e) => {
    var t;
    return (t = e.destroyDropdowns) == null ? void 0 : t.call(e);
  }).catch((e) => console.warn("Failed to destroy dropdowns:", e)), b.supersonic && (b.supersonic = null), console.log("Supersonic components destroyed");
}
export {
  ze as destroy,
  Pe as init
};
