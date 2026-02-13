import { c as create_ssr_component, v as validate_component, e as escape, m as missing_component, a as subscribe, o as onDestroy } from "../../chunks/ssr.js";
import { B as Button, p as popups, i as isLoggedIn, s as settings, a as initAuth, r as refreshFlowList, c as closePopup } from "../../chunks/autoSave.js";
import "../../chunks/Icon.js";
var name = "@vercel/analytics";
var version = "1.4.1";
var initQueue = () => {
  if (window.va)
    return;
  window.va = function a(...params) {
    (window.vaq = window.vaq || []).push(params);
  };
};
function isBrowser() {
  return typeof window !== "undefined";
}
function detectEnvironment() {
  try {
    const env = process.env.NODE_ENV;
    if (env === "development" || env === "test") {
      return "development";
    }
  } catch (e) {
  }
  return "production";
}
function setMode(mode = "auto") {
  if (mode === "auto") {
    window.vam = detectEnvironment();
    return;
  }
  window.vam = mode;
}
function getMode() {
  const mode = isBrowser() ? window.vam : detectEnvironment();
  return mode || "production";
}
function isDevelopment() {
  return getMode() === "development";
}
var DEV_SCRIPT_URL = "https://va.vercel-scripts.com/v1/script.debug.js";
var PROD_SCRIPT_URL = "/_vercel/insights/script.js";
function inject(props = {
  debug: true
}) {
  var _a;
  if (!isBrowser())
    return;
  setMode(props.mode);
  initQueue();
  if (props.beforeSend) {
    (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
  }
  const src = props.scriptSrc || (isDevelopment() ? DEV_SCRIPT_URL : PROD_SCRIPT_URL);
  if (document.head.querySelector(`script[src*="${src}"]`))
    return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
  script.dataset.sdkv = version;
  if (props.disableAutoTrack) {
    script.dataset.disableAutoTrack = "1";
  }
  if (props.endpoint) {
    script.dataset.endpoint = props.endpoint;
  }
  if (props.dsn) {
    script.dataset.dsn = props.dsn;
  }
  script.onerror = () => {
    const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
    console.log(
      `[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`
    );
  };
  if (isDevelopment() && props.debug === false) {
    script.dataset.debug = "false";
  }
  document.head.appendChild(script);
}
const css$1 = {
  code: ".top.svelte-let7br{background:var(--background);display:block;position:absolute;border-radius:var(--border-radius);overflow:hidden}.upper.svelte-let7br{position:absolute;display:flex;align-items:center;flex-direction:row;gap:var(--padding-small)}span.svelte-let7br{font-weight:bold}",
  map: '{"version":3,"file":"Popup.svelte","sources":["Popup.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Button from \\"./Button.svelte\\";\\nimport { popupIn, popupOut } from \\"../models/transition\\";\\nexport let component;\\nexport let props = {};\\nexport let title;\\nexport let closeSelf;\\nfunction handleKeydown(e) {\\n  if (e.key === \\"Escape\\") {\\n    closeSelf();\\n  }\\n}\\n<\/script>\\n\\n<svelte:window on:keydown={handleKeydown} />\\n<div class=\\"top\\" in:popupIn|global out:popupOut|global>\\n\\t<div class=\\"upper\\">\\n\\t\\t<Button icon=\\"delete\\" tooltip=\\"close\\" palette=\\"plain-secondary\\" on:click={closeSelf} /><span\\n\\t\\t\\t>{title}</span\\n\\t\\t>\\n\\t</div>\\n\\t<svelte:component this={component} closePopup={closeSelf} {...props} />\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tbackground: var(--background);\\n\\t\\tdisplay: block;\\n\\t\\tposition: absolute;\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\toverflow: hidden;\\n\\t}\\n\\t.upper {\\n\\t\\tposition: absolute;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding-small);\\n\\t}\\n\\tspan {\\n\\t\\tfont-weight: bold;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwBC,kBAAK,CACJ,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,QAAQ,CAAE,MACX,CACA,oBAAO,CACN,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,IAAI,eAAe,CACzB,CACA,kBAAK,CACJ,WAAW,CAAE,IACd"}'
};
const Popup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { component } = $$props;
  let { props = {} } = $$props;
  let { title } = $$props;
  let { closeSelf } = $$props;
  if ($$props.component === void 0 && $$bindings.component && component !== void 0) $$bindings.component(component);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.closeSelf === void 0 && $$bindings.closeSelf && closeSelf !== void 0) $$bindings.closeSelf(closeSelf);
  $$result.css.add(css$1);
  return ` <div class="top svelte-let7br"><div class="upper svelte-let7br">${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "delete",
      tooltip: "close",
      palette: "plain-secondary"
    },
    {},
    {}
  )}<span class="svelte-let7br">${escape(title)}</span></div> ${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({}, { closePopup: closeSelf }, props), {}, {})} </div>`;
});
const css = {
  code: ".screen.svelte-x9m0x1{background-color:var(--color-screen);width:100vw;height:100vh;position:fixed;display:flex;top:0;left:0;align-items:center;justify-content:center;z-index:999}.popups.svelte-x9m0x1{width:100vw;height:min-content;display:flex;align-items:center;justify-content:center}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import \\"./global.css\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport { popups, closePopup, openPopup } from \\"$lib/models/popup\\";\\nimport { screenTransition } from \\"$lib/models/transition\\";\\nimport { dev } from \\"$app/environment\\";\\nimport { inject } from \\"@vercel/analytics\\";\\nimport { onDestroy, onMount } from \\"svelte\\";\\nimport {\\n  giveGuestHostKey,\\n  initGuestConnection,\\n  parseConfirmLink,\\n  parseJoinLink\\n} from \\"$lib/models/sharingConnection\\";\\nimport Share from \\"$lib/components/Share.svelte\\";\\nimport CloseWindow from \\"$lib/components/CloseWindow.svelte\\";\\nimport Message from \\"$lib/components/Message.svelte\\";\\nimport Popup from \\"$lib/components/Popup.svelte\\";\\nimport { initAuth } from \\"$lib/models/auth\\";\\nimport { acceptShareInvite } from \\"$lib/models/flowApi\\";\\nimport { openCloudFlow, refreshFlowList } from \\"$lib/models/autoSave\\";\\nimport { isLoggedIn } from \\"$lib/models/auth\\";\\ninject({ mode: dev ? \\"development\\" : \\"production\\" });\\nconst colorThemeMediaQuery = window.matchMedia(\\"(prefers-color-scheme: dark)\\");\\nif (colorThemeMediaQuery.matches) {\\n  document.body.classList.add(\\"dark\\");\\n}\\nsettings.init();\\nfunction updateColorTheme() {\\n  if (settings.data.colorTheme.value == 0) {\\n    document.body.classList.toggle(\\"dark\\", colorThemeMediaQuery.matches);\\n  }\\n}\\ncolorThemeMediaQuery.addEventListener(\\"change\\", updateColorTheme);\\nonDestroy(\\n  settings.subscribe([\\"colorTheme\\"], function() {\\n    if (settings.data.colorTheme.value == 1) {\\n      document.body.classList.remove(\\"dark\\");\\n      document.body.classList.remove(\\"custom\\");\\n    } else if (settings.data.colorTheme.value == 2) {\\n      document.body.classList.add(\\"dark\\");\\n      document.body.classList.remove(\\"custom\\");\\n    } else if (settings.data.colorTheme.value == 3) {\\n      document.body.classList.remove(\\"dark\\");\\n      document.body.classList.add(\\"custom\\");\\n    } else {\\n      document.body.classList.remove(\\"custom\\");\\n      updateColorTheme();\\n    }\\n  })\\n);\\nconst cssVarIndex = {\\n  accentHue: {\\n    name: \\"accent-hue\\",\\n    unit: \\"\\"\\n  },\\n  accentSecondaryHue: {\\n    name: \\"accent-secondary-hue\\",\\n    unit: \\"\\"\\n  },\\n  transitionSpeed: {\\n    name: \\"transition-speed\\",\\n    unit: \\"ms\\"\\n  },\\n  columnWidth: {\\n    name: \\"column-width\\",\\n    unit: \\"px\\"\\n  },\\n  borderRadius: {\\n    name: \\"border-radius\\",\\n    unit: \\"px\\"\\n  },\\n  padding: {\\n    name: \\"padding\\",\\n    unit: \\"px\\"\\n  },\\n  fontWeight: {\\n    name: \\"font-weight\\",\\n    unit: \\"\\"\\n  },\\n  fontWeightBold: {\\n    name: \\"font-weight-bold\\",\\n    unit: \\"\\"\\n  },\\n  gap: {\\n    name: \\"gap\\",\\n    unit: \\"px\\"\\n  },\\n  buttonSize: {\\n    name: \\"button-size\\",\\n    unit: \\"px\\"\\n  },\\n  lineWidth: {\\n    name: \\"line-width\\",\\n    unit: \\"px\\"\\n  },\\n  sidebarWidth: {\\n    name: \\"sidebar-width\\",\\n    unit: \\"px\\"\\n  },\\n  sideDocWidth: {\\n    name: \\"side-doc-width\\",\\n    unit: \\"px\\"\\n  },\\n  customScrollbarWidth: {\\n    name: \\"custom-scrollbar-width\\",\\n    unit: \\"px\\"\\n  },\\n  customBackgroundBack: {\\n    name: \\"custom-background-back\\",\\n    unit: \\"\\"\\n  },\\n  customBackground: {\\n    name: \\"custom-background\\",\\n    unit: \\"\\"\\n  },\\n  customBackgroundIndent: {\\n    name: \\"custom-background-indent\\",\\n    unit: \\"\\"\\n  },\\n  customBackgroundActive: {\\n    name: \\"custom-background-active\\",\\n    unit: \\"\\"\\n  },\\n  customBackgroundSecondary: {\\n    name: \\"custom-background-secondary\\",\\n    unit: \\"\\"\\n  },\\n  customBackgroundSecondaryIndent: {\\n    name: \\"custom-background-secondary-indent\\",\\n    unit: \\"\\"\\n  },\\n  customBackgroundSecondaryActive: {\\n    name: \\"custom-background-secondary-active\\",\\n    unit: \\"\\"\\n  },\\n  customBackgroundAccentIndent: {\\n    name: \\"custom-background-accent-indent\\",\\n    unit: \\"\\"\\n  },\\n  customBackgroundAccentActive: {\\n    name: \\"custom-background-accent-active\\",\\n    unit: \\"\\"\\n  },\\n  customBackgroundAccentSecondaryIndent: {\\n    name: \\"custom-background-accent-secondary-indent\\",\\n    unit: \\"\\"\\n  },\\n  customBackgroundAccentSecondaryActive: {\\n    name: \\"custom-background-accent-secondary-active\\",\\n    unit: \\"\\"\\n  },\\n  customText: {\\n    name: \\"custom-text\\",\\n    unit: \\"\\"\\n  },\\n  customTextSelect: {\\n    name: \\"custom-text-select\\",\\n    unit: \\"\\"\\n  },\\n  customTextWeak: {\\n    name: \\"custom-text-weak\\",\\n    unit: \\"\\"\\n  },\\n  customTextAccent: {\\n    name: \\"custom-text-accent\\",\\n    unit: \\"\\"\\n  },\\n  customTextAccentSelect: {\\n    name: \\"custom-text-accent-select\\",\\n    unit: \\"\\"\\n  },\\n  customTextAccentWeak: {\\n    name: \\"custom-background-weak\\",\\n    unit: \\"\\"\\n  },\\n  customTextAccentSecondary: {\\n    name: \\"custom-text-accent-secondary\\",\\n    unit: \\"\\"\\n  },\\n  customTextAccentSecondarySelect: {\\n    name: \\"custom-text-accent-secondary-select\\",\\n    unit: \\"\\"\\n  },\\n  customTextAccentSecondaryWeak: {\\n    name: \\"custom-text-accent-secondary-weak\\",\\n    unit: \\"\\"\\n  },\\n  customColor: {\\n    name: \\"custom-color\\",\\n    unit: \\"\\"\\n  },\\n  customColorFade: {\\n    name: \\"custom-color-fade\\",\\n    unit: \\"\\"\\n  },\\n  customColorAccent: {\\n    name: \\"custom-color-accent\\",\\n    unit: \\"\\"\\n  },\\n  customColorAccentFade: {\\n    name: \\"custom-color-accent-fade\\",\\n    unit: \\"\\"\\n  },\\n  customColorAccentSecondary: {\\n    name: \\"custom-color-accent-secondary\\",\\n    unit: \\"\\"\\n  },\\n  customColorAccentSecondaryFade: {\\n    name: \\"custom-color-accent-secondary-fade\\",\\n    unit: \\"\\"\\n  },\\n  customScrollbarThumb: {\\n    name: \\"custom-scrollbar-thumb\\",\\n    unit: \\"\\"\\n  },\\n  customScrollbarThumbHover: {\\n    name: \\"custom-scrollbar-thumb-hover\\",\\n    unit: \\"\\"\\n  },\\n  customScrollbarBackground: {\\n    name: \\"custom-scrollbar-background\\",\\n    unit: \\"\\"\\n  }\\n};\\nonDestroy(\\n  settings.subscribe([\\"fontFamily\\"], function(key) {\\n    const setting = settings.data.fontFamily;\\n    if (setting.type != \\"radio\\") return;\\n    const index = setting.value;\\n    let chosenFont = void 0;\\n    if (setting.detail.customOption && setting.detail.options.length == index) {\\n      chosenFont = setting.detail.customOptionValue;\\n    } else if (setting.detail.options[index]) {\\n      chosenFont = setting.detail.options[index];\\n    }\\n    if (chosenFont) {\\n      document.body.style.setProperty(\\n        \\"--font-family\\",\\n        `\'${chosenFont}\', \'Merriweather Sans\', sans-serif`\\n      );\\n    } else {\\n      document.body.style.setProperty(\\"--font-family\\", `\'Merriweather Sans\', sans-serif`);\\n    }\\n  })\\n);\\nonDestroy(\\n  settings.subscribe([\\"fontSize\\"], function(_key) {\\n    const remFontSize = settings.data.fontSize.value;\\n    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);\\n    const pixelValue = remFontSize * rootFontSize;\\n    const roundedPixelValue = Math.round(pixelValue);\\n    const roundedRemFontSize = roundedPixelValue / rootFontSize;\\n    document.body.style.setProperty(\\"--font-size\\", roundedRemFontSize + \\"rem\\");\\n  })\\n);\\nonDestroy(\\n  settings.subscribe(Object.keys(cssVarIndex), function(key) {\\n    const name = cssVarIndex[key].name;\\n    const value = settings.data[key].value;\\n    const unit = cssVarIndex[key].unit;\\n    document.body.style.setProperty(`--${name}`, `${value}${unit}`);\\n  })\\n);\\nconst unsubAuth = initAuth();\\nonDestroy(unsubAuth);\\n$: if ($isLoggedIn) {\\n  refreshFlowList();\\n}\\nlet closeWindow = false;\\nonMount(async function() {\\n  const url = new URL(window.location.href);\\n  const inviteToken = url.searchParams.get(\\"invite\\");\\n  if (inviteToken) {\\n    url.searchParams.delete(\\"invite\\");\\n    window.history.replaceState({}, \\"\\", url.toString());\\n    const waitForAuth = () => new Promise((resolve) => {\\n      const unsub = isLoggedIn.subscribe((loggedIn) => {\\n        if (loggedIn) {\\n          unsub();\\n          resolve();\\n        }\\n      });\\n      setTimeout(() => {\\n        unsub();\\n        resolve();\\n      }, 3e4);\\n    });\\n    await waitForAuth();\\n    const flow = await acceptShareInvite(inviteToken);\\n    if (flow) {\\n      openCloudFlow(flow.id);\\n      openPopup(Message, \\"Share\\", {\\n        message: \\"Shared flow added to your flows!\\",\\n        error: false\\n      });\\n    } else {\\n      openPopup(Message, \\"Share Error\\", {\\n        message: \\"Invalid or expired share link\\",\\n        error: true\\n      });\\n    }\\n  }\\n  const hostKey = parseJoinLink();\\n  const guestKey = parseConfirmLink();\\n  if (hostKey != null) {\\n    initGuestConnection();\\n    giveGuestHostKey(hostKey);\\n    openPopup(Share, \\"Share\\");\\n  } else if (guestKey != null) {\\n    const channel = new BroadcastChannel(\\"guestKeySend\\");\\n    const message = {\\n      tag: \\"guestKey\\",\\n      key: guestKey\\n    };\\n    channel.postMessage(message);\\n    let mismatch = false;\\n    channel.addEventListener(\\"message\\", function(event) {\\n      const response = event.data;\\n      if (response.tag == \\"guestKeyRecieved\\") {\\n        if (response.broadcastId != guestKey.broadcastId) return;\\n        closeWindow = true;\\n        window.close();\\n      } else if (response.tag == \\"guestKeyMismatch\\") {\\n        if (response.broadcastId != guestKey.broadcastId) return;\\n        mismatch = true;\\n      }\\n    });\\n    setTimeout(function() {\\n      if (!closeWindow) {\\n        if (mismatch) {\\n          openPopup(Message, \\"Connection Message\\", {\\n            message: \\"Connection id mismatch\\",\\n            error: true\\n          });\\n        } else {\\n          openPopup(Message, \\"Connection Message\\", {\\n            message: \\"No host awaiting guests\\",\\n            error: true\\n          });\\n        }\\n      }\\n    }, 1e3);\\n  }\\n});\\nlet popupsUpdate = true;\\nlet oldFirstPopup = void 0;\\nfunction onPopupsChange() {\\n  if (oldFirstPopup == $popups[0]) return;\\n  oldFirstPopup = $popups[0];\\n  popupsUpdate = !popupsUpdate;\\n}\\n$: $popups, onPopupsChange();\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Flower: Debate Flowing App</title>\\n\\t<meta\\n\\t\\tname=\\"description\\"\\n\\t\\tcontent=\\"App for flowing in competitive debate, better than Excel or Google Sheets. Supports Policy, Lincoln-Douglas, Public Forum, Congress, and World Schools debate.\\"\\n\\t/>\\n\\t<link rel=\\"canonical\\" href=\\"https://debate-flow.vercel.app/\\" />\\n</svelte:head>\\n{#if closeWindow}\\n\\t<CloseWindow reason=\\"confirm link information has been sent to host tab\\" />\\n{:else}\\n\\t<slot />\\n{/if}\\n{#if $popups.length > 0}\\n\\t<!-- we can ignore because pressing escape on window already has same functionality -->\\n\\t<!-- svelte-ignore a11y-click-events-have-key-events -->\\n\\t<!-- svelte-ignore a11y-no-static-element-interactions -->\\n\\t<div\\n\\t\\tclass=\\"screen\\"\\n\\t\\ton:click|self={() => {\\n\\t\\t\\tclosePopup(0);\\n\\t\\t}}\\n\\t\\ttransition:screenTransition\\n\\t>\\n\\t\\t<!-- svelte-ignore a11y-no-static-element-interactions -->\\n\\t\\t<!-- svelte-ignore a11y-click-events-have-key-events -->\\n\\t\\t<div\\n\\t\\t\\tclass=\\"popups\\"\\n\\t\\t\\ton:click|self={() => {\\n\\t\\t\\t\\tclosePopup(0);\\n\\t\\t\\t}}\\n\\t\\t>\\n\\t\\t\\t{#key popupsUpdate}\\n\\t\\t\\t\\t<Popup\\n\\t\\t\\t\\t\\tcomponent={$popups[0].component}\\n\\t\\t\\t\\t\\tcloseSelf={() => closePopup(0)}\\n\\t\\t\\t\\t\\ttitle={$popups[0].title}\\n\\t\\t\\t\\t\\tprops={$popups[0].props}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t{/key}\\n\\t\\t</div>\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t.screen {\\n\\t\\tbackground-color: var(--color-screen);\\n\\t\\twidth: 100vw;\\n\\t\\theight: 100vh;\\n\\t\\tposition: fixed;\\n\\t\\tdisplay: flex;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tz-index: 999;\\n\\t}\\n\\t.popups {\\n\\t\\twidth: 100vw;\\n\\t\\theight: min-content;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA+YC,qBAAQ,CACP,gBAAgB,CAAE,IAAI,cAAc,CAAC,CACrC,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,GACV,CACA,qBAAQ,CACP,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,WAAW,CACnB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAClB"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $popups, $$unsubscribe_popups;
  let $isLoggedIn, $$unsubscribe_isLoggedIn;
  $$unsubscribe_popups = subscribe(popups, (value) => $popups = value);
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => $isLoggedIn = value);
  inject({ mode: "production" });
  const colorThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (colorThemeMediaQuery.matches) {
    document.body.classList.add("dark");
  }
  settings.init();
  function updateColorTheme() {
    if (settings.data.colorTheme.value == 0) {
      document.body.classList.toggle("dark", colorThemeMediaQuery.matches);
    }
  }
  colorThemeMediaQuery.addEventListener("change", updateColorTheme);
  onDestroy(settings.subscribe(["colorTheme"], function() {
    if (settings.data.colorTheme.value == 1) {
      document.body.classList.remove("dark");
      document.body.classList.remove("custom");
    } else if (settings.data.colorTheme.value == 2) {
      document.body.classList.add("dark");
      document.body.classList.remove("custom");
    } else if (settings.data.colorTheme.value == 3) {
      document.body.classList.remove("dark");
      document.body.classList.add("custom");
    } else {
      document.body.classList.remove("custom");
      updateColorTheme();
    }
  }));
  const cssVarIndex = {
    accentHue: { name: "accent-hue", unit: "" },
    accentSecondaryHue: { name: "accent-secondary-hue", unit: "" },
    transitionSpeed: { name: "transition-speed", unit: "ms" },
    columnWidth: { name: "column-width", unit: "px" },
    borderRadius: { name: "border-radius", unit: "px" },
    padding: { name: "padding", unit: "px" },
    fontWeight: { name: "font-weight", unit: "" },
    fontWeightBold: { name: "font-weight-bold", unit: "" },
    gap: { name: "gap", unit: "px" },
    buttonSize: { name: "button-size", unit: "px" },
    lineWidth: { name: "line-width", unit: "px" },
    sidebarWidth: { name: "sidebar-width", unit: "px" },
    sideDocWidth: { name: "side-doc-width", unit: "px" },
    customScrollbarWidth: {
      name: "custom-scrollbar-width",
      unit: "px"
    },
    customBackgroundBack: { name: "custom-background-back", unit: "" },
    customBackground: { name: "custom-background", unit: "" },
    customBackgroundIndent: {
      name: "custom-background-indent",
      unit: ""
    },
    customBackgroundActive: {
      name: "custom-background-active",
      unit: ""
    },
    customBackgroundSecondary: {
      name: "custom-background-secondary",
      unit: ""
    },
    customBackgroundSecondaryIndent: {
      name: "custom-background-secondary-indent",
      unit: ""
    },
    customBackgroundSecondaryActive: {
      name: "custom-background-secondary-active",
      unit: ""
    },
    customBackgroundAccentIndent: {
      name: "custom-background-accent-indent",
      unit: ""
    },
    customBackgroundAccentActive: {
      name: "custom-background-accent-active",
      unit: ""
    },
    customBackgroundAccentSecondaryIndent: {
      name: "custom-background-accent-secondary-indent",
      unit: ""
    },
    customBackgroundAccentSecondaryActive: {
      name: "custom-background-accent-secondary-active",
      unit: ""
    },
    customText: { name: "custom-text", unit: "" },
    customTextSelect: { name: "custom-text-select", unit: "" },
    customTextWeak: { name: "custom-text-weak", unit: "" },
    customTextAccent: { name: "custom-text-accent", unit: "" },
    customTextAccentSelect: {
      name: "custom-text-accent-select",
      unit: ""
    },
    customTextAccentWeak: { name: "custom-background-weak", unit: "" },
    customTextAccentSecondary: {
      name: "custom-text-accent-secondary",
      unit: ""
    },
    customTextAccentSecondarySelect: {
      name: "custom-text-accent-secondary-select",
      unit: ""
    },
    customTextAccentSecondaryWeak: {
      name: "custom-text-accent-secondary-weak",
      unit: ""
    },
    customColor: { name: "custom-color", unit: "" },
    customColorFade: { name: "custom-color-fade", unit: "" },
    customColorAccent: { name: "custom-color-accent", unit: "" },
    customColorAccentFade: {
      name: "custom-color-accent-fade",
      unit: ""
    },
    customColorAccentSecondary: {
      name: "custom-color-accent-secondary",
      unit: ""
    },
    customColorAccentSecondaryFade: {
      name: "custom-color-accent-secondary-fade",
      unit: ""
    },
    customScrollbarThumb: { name: "custom-scrollbar-thumb", unit: "" },
    customScrollbarThumbHover: {
      name: "custom-scrollbar-thumb-hover",
      unit: ""
    },
    customScrollbarBackground: {
      name: "custom-scrollbar-background",
      unit: ""
    }
  };
  onDestroy(settings.subscribe(["fontFamily"], function(key) {
    const setting = settings.data.fontFamily;
    if (setting.type != "radio") return;
    const index = setting.value;
    let chosenFont = void 0;
    if (setting.detail.customOption && setting.detail.options.length == index) {
      chosenFont = setting.detail.customOptionValue;
    } else if (setting.detail.options[index]) {
      chosenFont = setting.detail.options[index];
    }
    if (chosenFont) {
      document.body.style.setProperty("--font-family", `'${chosenFont}', 'Merriweather Sans', sans-serif`);
    } else {
      document.body.style.setProperty("--font-family", `'Merriweather Sans', sans-serif`);
    }
  }));
  onDestroy(settings.subscribe(["fontSize"], function(_key) {
    const remFontSize = settings.data.fontSize.value;
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const pixelValue = remFontSize * rootFontSize;
    const roundedPixelValue = Math.round(pixelValue);
    const roundedRemFontSize = roundedPixelValue / rootFontSize;
    document.body.style.setProperty("--font-size", roundedRemFontSize + "rem");
  }));
  onDestroy(settings.subscribe(Object.keys(cssVarIndex), function(key) {
    const name2 = cssVarIndex[key].name;
    const value = settings.data[key].value;
    const unit = cssVarIndex[key].unit;
    document.body.style.setProperty(`--${name2}`, `${value}${unit}`);
  }));
  const unsubAuth = initAuth();
  onDestroy(unsubAuth);
  let oldFirstPopup = void 0;
  function onPopupsChange() {
    if (oldFirstPopup == $popups[0]) return;
    oldFirstPopup = $popups[0];
  }
  $$result.css.add(css);
  {
    if ($isLoggedIn) {
      refreshFlowList();
    }
  }
  {
    onPopupsChange();
  }
  $$unsubscribe_popups();
  $$unsubscribe_isLoggedIn();
  return `${$$result.head += `<!-- HEAD_svelte-1ojtgtu_START -->${$$result.title = `<title>Flower: Debate Flowing App</title>`, ""}<meta name="description" content="App for flowing in competitive debate, better than Excel or Google Sheets. Supports Policy, Lincoln-Douglas, Public Forum, Congress, and World Schools debate."><link rel="canonical" href="https://debate-flow.vercel.app/"><!-- HEAD_svelte-1ojtgtu_END -->`, ""} ${`${slots.default ? slots.default({}) : ``}`} ${$popups.length > 0 ? `   <div class="screen svelte-x9m0x1">  <div class="popups svelte-x9m0x1">${validate_component(Popup, "Popup").$$render(
    $$result,
    {
      component: $popups[0].component,
      closeSelf: () => closePopup(0),
      title: $popups[0].title,
      props: $popups[0].props
    },
    {},
    {}
  )}</div></div>` : ``}`;
});
export {
  Layout as default
};
