import { n as noop, c as create_ssr_component, e as escape, v as validate_component, a as subscribe, d as each, o as onDestroy, b as add_attribute, g as getContext, f as null_to_empty, h as set_store_value, s as setContext, i as createEventDispatcher, j as assign, k as identity } from "../../../chunks/ssr.js";
import { B as Button, b as isChangelogVersionCurrent, d as connections, s as settings, n as nodes, e as pendingAction, f as focusId, g as activeMouse, h as history, j as checkIdBox, k as getAdjacentBox, l as addNewBox, t as toggleBoxFormat, m as addNewExtension, o as tick, q as deleteBox, u as getNode, v as addNewEmpty, w as selectedFlowId, x as lastFocusIds, y as settingsGroups, T as TutorialHighlight, z as tutorialStep, A as Tooltip, M as MAX_SAVED_FLOWS, C as savedNodesDatas, D as sideDocText, i as isLoggedIn, E as saveStatus, F as cloudFlowList, G as currentCloudFlowId, H as authLoading, I as openPopup, J as addNewFlow, K as deleteFlow } from "../../../chunks/autoSave.js";
import { c as createKeyDownHandler } from "../../../chunks/Text.svelte_svelte_type_style_lang.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { w as writable } from "../../../chunks/index.js";
import "exceljs";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function createLinkWithParam(param, value) {
  const currentUrl = new URL(location.pathname, location.href);
  currentUrl.searchParams.set(param, value);
  return currentUrl.href;
}
function createJoinLink(hostKey) {
  return createLinkWithParam("join", JSON.stringify(hostKey));
}
function createConfirmLink(guestKey) {
  return createLinkWithParam("confirm", JSON.stringify(guestKey));
}
const css$t = {
  code: "code.svelte-6c0fy6{word-break:break-all;background:var(--this-background-indent);font-family:var(--font-family);border-radius:var(--border-radius);height:7rem;width:100%;display:flex;flex-direction:row;align-items:center;justify-content:center}.message.svelte-6c0fy6{position:absolute;color:var(--this-text-weak);pointer-events:none}textarea.svelte-6c0fy6,.text.svelte-6c0fy6{color:var(--this-text);font-size:0.6rem;box-sizing:border-box;resize:none;outline:none;display:block;margin:0;line-height:1.5em;overflow:scroll;width:100%;background:none;padding:0;border:none;border-radius:0;text-decoration:inherit;height:100%;padding:var(--padding)}",
  map: '{"version":3,"file":"CopyBox.svelte","sources":["CopyBox.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let message = null;\\nexport let content;\\nexport let editable = false;\\nexport let placeholder = null;\\n<\/script>\\n\\n<code class=\\"copyBox\\">\\n\\t{#if message != null}\\n\\t\\t<div class=\\"message\\">{message}</div>\\n\\t{:else if placeholder != null && content.length == 0 && editable}\\n\\t\\t<div class=\\"message\\">{placeholder}</div>\\n\\t{/if}\\n\\t{#if editable}\\n\\t\\t<textarea bind:value={content} on:keypress />\\n\\t{:else}\\n\\t\\t<div class=\\"text\\">\\n\\t\\t\\t{content}\\n\\t\\t</div>\\n\\t{/if}\\n</code>\\n\\n<style>\\n\\tcode {\\n\\t\\t/* break all words */\\n\\t\\tword-break: break-all;\\n\\t\\tbackground: var(--this-background-indent);\\n\\t\\tfont-family: var(--font-family);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\theight: 7rem;\\n\\t\\twidth: 100%;\\n\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t}\\n\\t.message {\\n\\t\\tposition: absolute;\\n\\t\\tcolor: var(--this-text-weak);\\n\\t\\tpointer-events: none;\\n\\t}\\n\\ttextarea,\\n\\t.text {\\n\\t\\tcolor: var(--this-text);\\n\\t\\tfont-size: 0.6rem;\\n\\n\\t\\tbox-sizing: border-box;\\n\\t\\tresize: none;\\n\\t\\toutline: none;\\n\\t\\tdisplay: block;\\n\\t\\tmargin: 0;\\n\\t\\tline-height: 1.5em;\\n\\t\\toverflow: scroll;\\n\\n\\t\\twidth: 100%;\\n\\t\\tbackground: none;\\n\\t\\tpadding: 0;\\n\\t\\tborder: none;\\n\\t\\tborder-radius: 0;\\n\\t\\ttext-decoration: inherit;\\n\\t\\theight: 100%;\\n\\t\\tpadding: var(--padding);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAsBC,kBAAK,CAEJ,UAAU,CAAE,SAAS,CACrB,UAAU,CAAE,IAAI,wBAAwB,CAAC,CACzC,WAAW,CAAE,IAAI,aAAa,CAAC,CAC/B,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CAEX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAClB,CACA,sBAAS,CACR,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,cAAc,CAAE,IACjB,CACA,sBAAQ,CACR,mBAAM,CACL,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,SAAS,CAAE,MAAM,CAEjB,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,CAAC,CACT,WAAW,CAAE,KAAK,CAClB,QAAQ,CAAE,MAAM,CAEhB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,CAAC,CAChB,eAAe,CAAE,OAAO,CACxB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,SAAS,CACvB"}'
};
const CopyBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { message = null } = $$props;
  let { content } = $$props;
  let { editable = false } = $$props;
  let { placeholder = null } = $$props;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0) $$bindings.editable(editable);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  $$result.css.add(css$t);
  return `<code class="copyBox svelte-6c0fy6">${message != null ? `<div class="message svelte-6c0fy6">${escape(message)}</div>` : `${placeholder != null && content.length == 0 && editable ? `<div class="message svelte-6c0fy6">${escape(placeholder)}</div>` : ``}`} ${editable ? `<textarea class="svelte-6c0fy6">${escape(content || "")}</textarea>` : `<div class="text svelte-6c0fy6">${escape(content)}</div>`} </code>`;
});
const css$s = {
  code: ".top.svelte-1xrfvuy{display:flex;align-items:left;flex-direction:column;padding:0 var(--padding)}.above.svelte-1xrfvuy{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;height:3rem;box-sizing:border-box}p.svelte-1xrfvuy{padding-left:var(--padding)}span.usePalette.svelte-1xrfvuy{color:var(--this-text)}",
  map: `{"version":3,"file":"ConnectLink.svelte","sources":["ConnectLink.svelte"],"sourcesContent":["<script lang=\\"ts\\">import {\\n  createConfirmLink,\\n  createJoinLink,\\n  giveHostGuestKey\\n} from \\"$lib/models/sharingConnection\\";\\nimport { onDestroy } from \\"svelte\\";\\nimport Button from \\"./Button.svelte\\";\\nimport CopyBox from \\"./CopyBox.svelte\\";\\nfunction copyText(text) {\\n  navigator.clipboard.writeText(text);\\n}\\nexport let connection;\\n<\/script>\\n\\n<div class=\\"top\\">\\n\\t{#if connection.tag == 'hostCreatingKey'}\\n\\t\\t<p>creating join link</p>\\n\\t{:else if connection.tag == 'hostAwaitingGuestKey'}\\n\\t\\t<div class=\\"above\\">\\n\\t\\t\\t<p>\\n\\t\\t\\t\\tcopy this <span class=\\"usePalette palette-accent\\">join link</span> and send it to partners, through\\n\\t\\t\\t\\tdiscord, email, etc..\\n\\t\\t\\t</p>\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"copy\\"\\n\\t\\t\\t\\ttext=\\"copy\\"\\n\\t\\t\\t\\tpalette=\\"accent\\"\\n\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\tif (connection.tag == 'hostAwaitingGuestKey') {\\n\\t\\t\\t\\t\\t\\tcopyText(createJoinLink(connection.key));\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t\\t<div class=\\"palette-accent\\">\\n\\t\\t\\t<CopyBox content={createJoinLink(connection.key)} />\\n\\t\\t</div>\\n\\t\\t<p>\\n\\t\\t\\tthen, click on <span class=\\"usePalette palette-accent-secondary\\">confirm links</span> sent to you\\n\\t\\t\\tby your partners to connect (make sure to open it in the same browser as this tab).\\n\\t\\t</p>\\n\\t{:else if connection.tag == 'guestAwaitingHostKey'}\\n\\t\\t<p>reading URL for host key</p>\\n\\t{:else if connection.tag == 'guestCreatingKey'}\\n\\t\\t<p>creating confirm link</p>\\n\\t{:else if connection.tag == 'guestAwaitingChannel'}\\n\\t\\t<div class=\\"above\\">\\n\\t\\t\\t<p>\\n\\t\\t\\t\\tcopy this <span class=\\"usePalette palette-accent-secondary\\">confirm link</span> and send it to\\n\\t\\t\\t\\tthe host, through discord, email, etc..\\n\\t\\t\\t</p>\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"copy\\"\\n\\t\\t\\t\\ttext=\\"copy\\"\\n\\t\\t\\t\\tpalette=\\"accent-secondary\\"\\n\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\tif (connection.tag == 'guestAwaitingChannel') {\\n\\t\\t\\t\\t\\t\\tcopyText(createConfirmLink(connection.key));\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t\\t<div class=\\"palette-accent-secondary\\">\\n\\t\\t\\t<CopyBox content={createConfirmLink(connection.key)} />\\n\\t\\t</div>\\n\\t\\t<p>\\n\\t\\t\\tthen, wait for the <span class=\\"usePalette palette-accent\\">host</span> to click on the\\n\\t\\t\\t<span class=\\"usePalette palette-accent-secondary\\">confirm link</span> and connect.\\n\\t\\t</p>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: left;\\n\\t\\tflex-direction: column;\\n\\t\\tpadding: 0 var(--padding);\\n\\t}\\n\\t.above {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: space-between;\\n\\t\\twidth: 100%;\\n\\t\\theight: 3rem;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\tp {\\n\\t\\tpadding-left: var(--padding);\\n\\t}\\n\\n\\tspan.usePalette {\\n\\t\\tcolor: var(--this-text);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAyEC,mBAAK,CACJ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,CAAC,CAAC,IAAI,SAAS,CACzB,CACA,qBAAO,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,UACb,CACA,gBAAE,CACD,YAAY,CAAE,IAAI,SAAS,CAC5B,CAEA,IAAI,0BAAY,CACf,KAAK,CAAE,IAAI,WAAW,CACvB"}`
};
const ConnectLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { connection } = $$props;
  if ($$props.connection === void 0 && $$bindings.connection && connection !== void 0) $$bindings.connection(connection);
  $$result.css.add(css$s);
  return `<div class="top svelte-1xrfvuy">${connection.tag == "hostCreatingKey" ? `<p class="svelte-1xrfvuy" data-svelte-h="svelte-thxqxl">creating join link</p>` : `${connection.tag == "hostAwaitingGuestKey" ? `<div class="above svelte-1xrfvuy"><p class="svelte-1xrfvuy" data-svelte-h="svelte-e5k8hh">copy this <span class="usePalette palette-accent svelte-1xrfvuy">join link</span> and send it to partners, through
				discord, email, etc..</p> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "copy",
      text: "copy",
      palette: "accent"
    },
    {},
    {}
  )}</div> <div class="palette-accent">${validate_component(CopyBox, "CopyBox").$$render($$result, { content: createJoinLink(connection.key) }, {}, {})}</div> <p class="svelte-1xrfvuy" data-svelte-h="svelte-8d3v25">then, click on <span class="usePalette palette-accent-secondary svelte-1xrfvuy">confirm links</span> sent to you
			by your partners to connect (make sure to open it in the same browser as this tab).</p>` : `${connection.tag == "guestAwaitingHostKey" ? `<p class="svelte-1xrfvuy" data-svelte-h="svelte-3kc2dx">reading URL for host key</p>` : `${connection.tag == "guestCreatingKey" ? `<p class="svelte-1xrfvuy" data-svelte-h="svelte-1wfg6d">creating confirm link</p>` : `${connection.tag == "guestAwaitingChannel" ? `<div class="above svelte-1xrfvuy"><p class="svelte-1xrfvuy" data-svelte-h="svelte-dzrw8g">copy this <span class="usePalette palette-accent-secondary svelte-1xrfvuy">confirm link</span> and send it to
				the host, through discord, email, etc..</p> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "copy",
      text: "copy",
      palette: "accent-secondary"
    },
    {},
    {}
  )}</div> <div class="palette-accent-secondary">${validate_component(CopyBox, "CopyBox").$$render(
    $$result,
    {
      content: createConfirmLink(connection.key)
    },
    {},
    {}
  )}</div> <p class="svelte-1xrfvuy" data-svelte-h="svelte-ypg4pf">then, wait for the <span class="usePalette palette-accent svelte-1xrfvuy">host</span> to click on the
			<span class="usePalette palette-accent-secondary svelte-1xrfvuy">confirm link</span> and connect.</p>` : ``}`}`}`}`} </div>`;
});
const css$r = {
  code: ".top.svelte-r16cux.svelte-r16cux{border-radius:var(--border-radius);display:flex;flex-direction:row;align-items:center;background:var(--background-indent)}.text.svelte-r16cux.svelte-r16cux{height:var(--button-size);padding:var(--padding) var(--padding) var(--padding) var(--padding);display:flex;flex-direction:row;align-items:center;white-space:nowrap}.weak.svelte-r16cux .text.svelte-r16cux{color:var(--text-weak)}",
  map: `{"version":3,"file":"ConnectStatus.svelte","sources":["ConnectStatus.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Button from \\"./Button.svelte\\";\\nexport let connection;\\nexport let close = null;\\nfunction describeConnectionState(state) {\\n  switch (state) {\\n    case \\"new\\":\\n      return \\"connecting\\";\\n    case \\"connecting\\":\\n      return \\"connecting\\";\\n    case \\"connected\\":\\n      return \\"connected\\";\\n    case \\"disconnected\\":\\n      return \\"reconnecting\\";\\n    case \\"failed\\":\\n      return \\"closed\\";\\n    case \\"closed\\":\\n      return \\"closed\\";\\n  }\\n}\\nfunction isConnectionWeak(state) {\\n  if (state == \\"connected\\") return false;\\n  return true;\\n}\\n<\/script>\\n\\n<div class=\\"top\\" class:weak={isConnectionWeak(connection.pc.connectionState)}>\\n\\t<div class=\\"text\\">\\n\\t\\t{describeConnectionState(connection.pc.connectionState)}\\n\\t\\t{#if connection.tag == 'hostConnected'}\\n\\t\\t\\tto\\n\\t\\t{:else}\\n\\t\\t\\tas\\n\\t\\t{/if}\\n\\t\\t{#if (connection.tag == 'hostConnected' || connection.tag == 'guestConnected') && connection.name != null}\\n\\t\\t\\t{connection.name}\\n\\t\\t{:else}\\n\\t\\t\\tunnamed\\n\\t\\t{/if}\\n\\t</div>\\n\\t{#if close != null}\\n\\t\\t<Button\\n\\t\\t\\ticon=\\"delete\\"\\n\\t\\t\\ttooltip=\\"kick\\"\\n\\t\\t\\tpalette=\\"plain-secondary\\"\\n\\t\\t\\tonclick={() => {\\n\\t\\t\\t\\tif (close == null) return;\\n\\t\\t\\t\\tclose();\\n\\t\\t\\t}}\\n\\t\\t/>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tbackground: var(--background-indent);\\n\\t}\\n\\t.text {\\n\\t\\theight: var(--button-size);\\n\\t\\tpadding: var(--padding) var(--padding) var(--padding) var(--padding);\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\twhite-space: nowrap;\\n\\t}\\n\\t.weak .text {\\n\\t\\tcolor: var(--text-weak);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAqDC,gCAAK,CACJ,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,mBAAmB,CACpC,CACA,iCAAM,CACL,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,OAAO,CAAE,IAAI,SAAS,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,IAAI,SAAS,CAAC,CACpE,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,MACd,CACA,mBAAK,CAAC,mBAAM,CACX,KAAK,CAAE,IAAI,WAAW,CACvB"}`
};
function describeConnectionState(state) {
  switch (state) {
    case "new":
      return "connecting";
    case "connecting":
      return "connecting";
    case "connected":
      return "connected";
    case "disconnected":
      return "reconnecting";
    case "failed":
      return "closed";
    case "closed":
      return "closed";
  }
}
function isConnectionWeak(state) {
  if (state == "connected") return false;
  return true;
}
const ConnectStatus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { connection } = $$props;
  let { close = null } = $$props;
  if ($$props.connection === void 0 && $$bindings.connection && connection !== void 0) $$bindings.connection(connection);
  if ($$props.close === void 0 && $$bindings.close && close !== void 0) $$bindings.close(close);
  $$result.css.add(css$r);
  return `<div class="${[
    "top svelte-r16cux",
    isConnectionWeak(connection.pc.connectionState) ? "weak" : ""
  ].join(" ").trim()}"><div class="text svelte-r16cux">${escape(describeConnectionState(connection.pc.connectionState))} ${connection.tag == "hostConnected" ? `to` : `as`} ${(connection.tag == "hostConnected" || connection.tag == "guestConnected") && connection.name != null ? `${escape(connection.name)}` : `unnamed`}</div> ${close != null ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "delete",
      tooltip: "kick",
      palette: "plain-secondary",
      onclick: () => {
        if (close == null) return;
        close();
      }
    },
    {},
    {}
  )}` : ``} </div>`;
});
const css$q = {
  code: ".top.svelte-589cw6.svelte-589cw6{width:min(calc(100vw - var(--padding) * 2), 500px);height:min(calc(100vh - var(--padding) * 2), min-content);box-sizing:border-box;display:grid;grid-template-columns:1fr 1fr;overflow:auto}section.svelte-589cw6.svelte-589cw6{width:100%;padding:var(--padding-big);padding-top:calc(var(--button-size) + var(--padding) * 2);box-sizing:border-box;display:flex;flex-direction:column;gap:var(--padding);color:var(--this-text)}.secondary.svelte-589cw6.svelte-589cw6{background:var(--background-secondary)}ul.svelte-589cw6.svelte-589cw6{margin:0;padding:0;color:var(--color-subtle);text-align:left;width:100%;box-sizing:border-box}.above.svelte-589cw6.svelte-589cw6{position:relative;display:flex;flex-direction:row;gap:var(--padding);align-items:center;justify-content:space-between}.above.svelte-589cw6>p.svelte-589cw6{margin:0;color:var(--this-text-weak);transition:opacity var(--transition-speed)}",
  map: `{"version":3,"file":"Help.svelte","sources":["Help.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { openPopup } from \\"$lib/models/popup\\";\\nimport { isChangelogVersionCurrent } from \\"$lib/models/version\\";\\nimport Button from \\"./Button.svelte\\";\\nimport Changelog from \\"./Changelog.svelte\\";\\nexport let closePopup;\\nfunction copyText(text) {\\n  navigator.clipboard.writeText(text);\\n}\\n<\/script>\\n\\n<div class=\\"top\\">\\n\\t<section class=\\"palette-plain\\">\\n\\t\\t<div class=\\"above\\">\\n\\t\\t\\t<h2>Links</h2>\\n\\t\\t\\t<p>useful resources</p>\\n\\t\\t</div>\\n\\t\\t<ul>\\n\\t\\t\\t<Button icon=\\"home\\" text=\\"home page\\" link=\\"/\\" on:click={closePopup} />\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"angleBrackets\\"\\n\\t\\t\\t\\ttext=\\"code\\"\\n\\t\\t\\t\\tlink=\\"https://github.com/Ashwagandhae/debate-flow\\"\\n\\t\\t\\t\\ttarget=\\"_blank\\"\\n\\t\\t\\t/>\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"delta\\"\\n\\t\\t\\t\\ttext=\\"changelog\\"\\n\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\tclosePopup();\\n\\t\\t\\t\\t\\topenPopup(Changelog, 'Changelog');\\n\\t\\t\\t\\t}}\\n\\t\\t\\t\\ttarget=\\"_blank\\"\\n\\t\\t\\t\\ttooltip={$isChangelogVersionCurrent ? undefined : 'see new updates'}\\n\\t\\t\\t\\tnotification={!$isChangelogVersionCurrent}\\n\\t\\t\\t/>\\n\\t\\t</ul>\\n\\t</section>\\n\\t<section class=\\"palette-plain-secondary secondary\\">\\n\\t\\t<div class=\\"above\\">\\n\\t\\t\\t<h2>Contact</h2>\\n\\t\\t\\t<p>send feedback</p>\\n\\t\\t</div>\\n\\t\\t<ul>\\n\\t\\t\\t<Button icon=\\"copy\\" text=\\"email\\" on:click={() => copyText('julianlianbauer@gmail.com')} />\\n\\t\\t\\t<Button icon=\\"copy\\" text=\\"discord\\" on:click={() => copyText('ashwagandhae')} />\\n\\t\\t\\t<Button icon=\\"link\\" text=\\"github\\" link=\\"https://github.com/Ashwagandhae/\\" target=\\"_blank\\" />\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"link\\"\\n\\t\\t\\t\\ttext=\\"reddit\\"\\n\\t\\t\\t\\tlink=\\"https://www.reddit.com/user/ash-wag-and\\"\\n\\t\\t\\t\\ttarget=\\"_blank\\"\\n\\t\\t\\t/>\\n\\t\\t</ul>\\n\\t</section>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\twidth: min(calc(100vw - var(--padding) * 2), 500px);\\n\\t\\theight: min(calc(100vh - var(--padding) * 2), min-content);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-columns: 1fr 1fr;\\n\\t\\toverflow: auto;\\n\\t}\\n\\tsection {\\n\\t\\twidth: 100%;\\n\\t\\tpadding: var(--padding-big);\\n\\t\\tpadding-top: calc(var(--button-size) + var(--padding) * 2);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: var(--padding);\\n\\t\\tcolor: var(--this-text);\\n\\t}\\n\\t.secondary {\\n\\t\\tbackground: var(--background-secondary);\\n\\t}\\n\\tul {\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tcolor: var(--color-subtle);\\n\\t\\ttext-align: left;\\n\\t\\twidth: 100%;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\t.above {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding);\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: space-between;\\n\\t}\\n\\t.above > p {\\n\\t\\tmargin: 0;\\n\\t\\tcolor: var(--this-text-weak);\\n\\t\\ttransition: opacity var(--transition-speed);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAyDC,gCAAK,CACJ,KAAK,CAAE,IAAI,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CACnD,MAAM,CAAE,IAAI,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,WAAW,CAAC,CAC1D,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,QAAQ,CAAE,IACX,CACA,mCAAQ,CACP,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,aAAa,CAAC,CAC3B,WAAW,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAC1D,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,KAAK,CAAE,IAAI,WAAW,CACvB,CACA,sCAAW,CACV,UAAU,CAAE,IAAI,sBAAsB,CACvC,CACA,8BAAG,CACF,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,UACb,CACA,kCAAO,CACN,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAClB,CACA,oBAAM,CAAG,eAAE,CACV,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,UAAU,CAAE,OAAO,CAAC,IAAI,kBAAkB,CAC3C"}`
};
const Help = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isChangelogVersionCurrent, $$unsubscribe_isChangelogVersionCurrent;
  $$unsubscribe_isChangelogVersionCurrent = subscribe(isChangelogVersionCurrent, (value) => $isChangelogVersionCurrent = value);
  let { closePopup } = $$props;
  if ($$props.closePopup === void 0 && $$bindings.closePopup && closePopup !== void 0) $$bindings.closePopup(closePopup);
  $$result.css.add(css$q);
  $$unsubscribe_isChangelogVersionCurrent();
  return `<div class="top svelte-589cw6"><section class="palette-plain svelte-589cw6"><div class="above svelte-589cw6" data-svelte-h="svelte-1cjg18s"><h2>Links</h2> <p class="svelte-589cw6">useful resources</p></div> <ul class="svelte-589cw6">${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "home",
      text: "home page",
      link: "/"
    },
    {},
    {}
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "angleBrackets",
      text: "code",
      link: "https://github.com/Ashwagandhae/debate-flow",
      target: "_blank"
    },
    {},
    {}
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "delta",
      text: "changelog",
      target: "_blank",
      tooltip: $isChangelogVersionCurrent ? void 0 : "see new updates",
      notification: !$isChangelogVersionCurrent
    },
    {},
    {}
  )}</ul></section> <section class="palette-plain-secondary secondary svelte-589cw6"><div class="above svelte-589cw6" data-svelte-h="svelte-8c1xxp"><h2>Contact</h2> <p class="svelte-589cw6">send feedback</p></div> <ul class="svelte-589cw6">${validate_component(Button, "Button").$$render($$result, { icon: "copy", text: "email" }, {}, {})} ${validate_component(Button, "Button").$$render($$result, { icon: "copy", text: "discord" }, {}, {})} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "link",
      text: "github",
      link: "https://github.com/Ashwagandhae/",
      target: "_blank"
    },
    {},
    {}
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "link",
      text: "reddit",
      link: "https://www.reddit.com/user/ash-wag-and",
      target: "_blank"
    },
    {},
    {}
  )}</ul></section> </div>`;
});
const css$p = {
  code: ".top.svelte-a0k7um{width:min(calc(100vw - var(--padding) * 2), 600px);height:min(calc(100vh - var(--padding) * 2), min-content);padding:calc(var(--button-size) + var(--padding) * 2) 0 0 0;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:var(--padding)}.hostGuestButtons.svelte-a0k7um{display:flex;flex-direction:row;gap:var(--padding);width:100%;justify-content:center}.start.svelte-a0k7um{display:flex;flex-direction:column;padding:0 var(--padding) 0 var(--padding)}span.usePalette.svelte-a0k7um{color:var(--this-text)}p.svelte-a0k7um{line-height:1.5em}.controls.svelte-a0k7um{padding:0 var(--padding) var(--padding) var(--padding);box-sizing:border-box;width:100%;display:flex;flex-direction:row;gap:var(--padding);justify-content:space-between}.buttons.svelte-a0k7um{display:flex;flex-direction:row;gap:var(--padding);justify-content:center}.statuses.svelte-a0k7um{display:flex;flex-direction:row;gap:var(--padding);flex-wrap:wrap;justify-content:center;padding:0 var(--padding)}",
  map: `{"version":3,"file":"Share.svelte","sources":["Share.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Button from \\"./Button.svelte\\";\\nimport {\\n  initGuestConnection,\\n  disconnect,\\n  initHost,\\n  addHostConnection,\\n  cancelBuilding,\\n  parseJoinLink,\\n  giveGuestHostKey,\\n  requestSync\\n} from \\"$lib/models/sharingConnection\\";\\nimport ConnectManual from \\"./ConnectManual.svelte\\";\\nimport ConnectLink from \\"./ConnectLink.svelte\\";\\nimport ConnectStatus from \\"./ConnectStatus.svelte\\";\\nimport { openPopup } from \\"$lib/models/popup\\";\\nimport Changelog from \\"./Changelog.svelte\\";\\nimport Help from \\"./Help.svelte\\";\\nimport { onMount } from \\"svelte\\";\\nimport { connections } from \\"$lib/models/store\\";\\nexport let closePopup = () => {\\n};\\nlet connectionMode = \\"link\\";\\nlet buildingConnection = null;\\n$: {\\n  if ($connections.tag == \\"guest\\" && $connections.building) {\\n    buildingConnection = $connections.connection;\\n  } else if ($connections.tag == \\"host\\" && $connections.building != null) {\\n    buildingConnection = $connections.holder[$connections.building];\\n  } else {\\n    buildingConnection = null;\\n  }\\n}\\nfunction asConnectionIds(ids) {\\n  return ids;\\n}\\nlet joinLinkHostKey = null;\\nonMount(function() {\\n  joinLinkHostKey = parseJoinLink();\\n});\\n<\/script>\\n\\n<div class=\\"top palette-plain\\">\\n\\t{#if $connections.tag == 'empty'}\\n\\t\\t<div class=\\"start\\">\\n\\t\\t\\t<div class=\\"explain\\">\\n\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\tFlower allows sharing through <a href=\\"https://en.wikipedia.org/wiki/WebRTC\\">WebRTC</a>.\\n\\t\\t\\t\\t\\tYou can either\\n\\t\\t\\t\\t\\t<span class=\\"usePalette palette-accent\\">host</span>\\n\\t\\t\\t\\t\\ta room to share your current flow, or edit someone else's flow as a\\n\\t\\t\\t\\t\\t<span class=\\"usePalette palette-accent-secondary\\">guest</span>.\\n\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\tIf you encounter any issues with sharing, first update your browser, then <Button\\n\\t\\t\\t\\t\\t\\ttext=\\"contact me\\"\\n\\t\\t\\t\\t\\t\\ticon=\\"link\\"\\n\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\tclosePopup();\\n\\t\\t\\t\\t\\t\\t\\topenPopup(Help, 'Help');\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\ttarget=\\"_blank\\"\\n\\t\\t\\t\\t\\t\\tinline\\n\\t\\t\\t\\t\\t/>. Looking for sheet sharing? See the\\n\\t\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\t\\ticon=\\"delta\\"\\n\\t\\t\\t\\t\\t\\ttext=\\"changelog\\"\\n\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\tclosePopup();\\n\\t\\t\\t\\t\\t\\t\\topenPopup(Changelog, 'Changelog');\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\ttarget=\\"_blank\\"\\n\\t\\t\\t\\t\\t\\tinline\\n\\t\\t\\t\\t\\t/> for more info.\\n\\t\\t\\t\\t</p>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"hostGuestButtons\\">\\n\\t\\t\\t\\t<div class=\\"buttons\\">\\n\\t\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\t\\tpalette=\\"accent\\"\\n\\t\\t\\t\\t\\t\\ticon=\\"add\\"\\n\\t\\t\\t\\t\\t\\ttext=\\"host new room\\"\\n\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\tinitHost();\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{#if connectionMode == 'manual'}\\n\\t\\t\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\t\\t\\tpalette=\\"accent-secondary\\"\\n\\t\\t\\t\\t\\t\\t\\ticon=\\"redo\\"\\n\\t\\t\\t\\t\\t\\t\\ttext=\\"join room\\"\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\tinitGuestConnection();\\n\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{:else if connectionMode == 'link' && joinLinkHostKey != null}\\n\\t\\t\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\t\\t\\tpalette=\\"accent-secondary\\"\\n\\t\\t\\t\\t\\t\\t\\ticon=\\"redo\\"\\n\\t\\t\\t\\t\\t\\t\\ttext=\\"join room from join link\\"\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\tif (joinLinkHostKey == null) return;\\n\\t\\t\\t\\t\\t\\t\\t\\tinitGuestConnection();\\n\\t\\t\\t\\t\\t\\t\\t\\tgiveGuestHostKey(joinLinkHostKey);\\n\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t{:else if $connections.tag == 'host' || $connections.tag == 'guest'}\\n\\t\\t{#if buildingConnection == null}\\n\\t\\t\\t{#if $connections.tag == 'host'}\\n\\t\\t\\t\\t{#if Object.keys($connections.holder).length > 0}\\n\\t\\t\\t\\t\\t<div class=\\"statuses\\">\\n\\t\\t\\t\\t\\t\\t{#each asConnectionIds(Object.keys($connections.holder)) as id}\\n\\t\\t\\t\\t\\t\\t\\t<ConnectStatus\\n\\t\\t\\t\\t\\t\\t\\t\\tconnection={$connections.holder[id]}\\n\\t\\t\\t\\t\\t\\t\\t\\tclose={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tif ($connections.tag != 'host') return;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t$connections.holder[id].pc.close();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tdelete $connections.holder[id];\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t$connections = $connections;\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\tpalette=\\"accent\\"\\n\\t\\t\\t\\t\\ticon=\\"add\\"\\n\\t\\t\\t\\t\\ttext=\\"add guest\\"\\n\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\taddHostConnection();\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t{:else if $connections.tag == 'guest'}\\n\\t\\t\\t\\t<ConnectStatus connection={$connections.connection} />\\n\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\tpalette=\\"accent-secondary\\"\\n\\t\\t\\t\\t\\ticon=\\"download\\"\\n\\t\\t\\t\\t\\ttext=\\"sync\\"\\n\\t\\t\\t\\t\\ttooltip=\\"use if flows get out of sync\\"\\n\\t\\t\\t\\t\\tdisabled={$connections.connection.tag == 'guestConnected'\\n\\t\\t\\t\\t\\t\\t? $connections.connection.awaitingSync\\n\\t\\t\\t\\t\\t\\t\\t? true\\n\\t\\t\\t\\t\\t\\t\\t: false\\n\\t\\t\\t\\t\\t\\t: true}\\n\\t\\t\\t\\t\\tdisabledReason={$connections.connection.tag == 'guestConnected'\\n\\t\\t\\t\\t\\t\\t? $connections.connection.awaitingSync\\n\\t\\t\\t\\t\\t\\t\\t? 'awaiting sync'\\n\\t\\t\\t\\t\\t\\t\\t: undefined\\n\\t\\t\\t\\t\\t\\t: 'not connected'}\\n\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\trequestSync();\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t{/if}\\n\\t\\t{:else if connectionMode == 'manual'}\\n\\t\\t\\t<ConnectManual connection={buildingConnection} />\\n\\t\\t{:else}\\n\\t\\t\\t<ConnectLink connection={buildingConnection} />\\n\\t\\t{/if}\\n\\t{/if}\\n\\t<div class=\\"controls\\">\\n\\t\\t<Button\\n\\t\\t\\ticon={connectionMode == 'manual' ? 'angleBrackets' : 'link'}\\n\\t\\t\\ttext={connectionMode == 'manual' ? 'using manual connect' : 'using link connect (default)'}\\n\\t\\t\\ttooltip={connectionMode == 'manual' ? 'switch to link connect' : 'switch to manual connect'}\\n\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\tconnectionMode = connectionMode == 'manual' ? 'link' : 'manual';\\n\\t\\t\\t}}\\n\\t\\t/>\\n\\t\\t{#if $connections.tag != 'empty'}\\n\\t\\t\\t{#if buildingConnection == null}\\n\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\ttext={$connections.tag == 'host'\\n\\t\\t\\t\\t\\t\\t? Object.keys($connections.holder).length == 0\\n\\t\\t\\t\\t\\t\\t\\t? 'cancel'\\n\\t\\t\\t\\t\\t\\t\\t: 'disconnect all'\\n\\t\\t\\t\\t\\t\\t: 'disconnect'}\\n\\t\\t\\t\\t\\ticon=\\"delete\\"\\n\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\tdisconnect();\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\ttext={'cancel'}\\n\\t\\t\\t\\t\\ticon=\\"delete\\"\\n\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\tcancelBuilding();\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t{/if}\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\twidth: min(calc(100vw - var(--padding) * 2), 600px);\\n\\t\\theight: min(calc(100vh - var(--padding) * 2), min-content);\\n\\t\\tpadding: calc(var(--button-size) + var(--padding) * 2) 0 0 0;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\n\\t.hostGuestButtons {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding);\\n\\t\\twidth: 100%;\\n\\t\\tjustify-content: center;\\n\\t}\\n\\t.start {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tpadding: 0 var(--padding) 0 var(--padding);\\n\\t}\\n\\n\\tspan.usePalette {\\n\\t\\tcolor: var(--this-text);\\n\\t}\\n\\n\\tp {\\n\\t\\tline-height: 1.5em;\\n\\t}\\n\\n\\t.controls {\\n\\t\\tpadding: 0 var(--padding) var(--padding) var(--padding);\\n\\t\\tbox-sizing: border-box;\\n\\t\\twidth: 100%;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding);\\n\\t\\tjustify-content: space-between;\\n\\t}\\n\\n\\t.buttons {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding);\\n\\t\\tjustify-content: center;\\n\\t}\\n\\n\\t.statuses {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding);\\n\\t\\tflex-wrap: wrap;\\n\\t\\tjustify-content: center;\\n\\t\\tpadding: 0 var(--padding);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAuMC,kBAAK,CACJ,KAAK,CAAE,IAAI,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CACnD,MAAM,CAAE,IAAI,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,WAAW,CAAC,CAC1D,OAAO,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAC5D,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,SAAS,CACnB,CAEA,+BAAkB,CACjB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,KAAK,CAAE,IAAI,CACX,eAAe,CAAE,MAClB,CACA,oBAAO,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAC1C,CAEA,IAAI,yBAAY,CACf,KAAK,CAAE,IAAI,WAAW,CACvB,CAEA,eAAE,CACD,WAAW,CAAE,KACd,CAEA,uBAAU,CACT,OAAO,CAAE,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,IAAI,SAAS,CAAC,CACvD,UAAU,CAAE,UAAU,CACtB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,eAAe,CAAE,aAClB,CAEA,sBAAS,CACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,eAAe,CAAE,MAClB,CAEA,uBAAU,CACT,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,CAAC,CAAC,IAAI,SAAS,CACzB"}`
};
function asConnectionIds(ids) {
  return ids;
}
const Share = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $connections, $$unsubscribe_connections;
  $$unsubscribe_connections = subscribe(connections, (value) => $connections = value);
  let { closePopup = () => {
  } } = $$props;
  let buildingConnection = null;
  if ($$props.closePopup === void 0 && $$bindings.closePopup && closePopup !== void 0) $$bindings.closePopup(closePopup);
  $$result.css.add(css$p);
  {
    {
      if ($connections.tag == "guest" && $connections.building) {
        buildingConnection = $connections.connection;
      } else if ($connections.tag == "host" && $connections.building != null) {
        buildingConnection = $connections.holder[$connections.building];
      } else {
        buildingConnection = null;
      }
    }
  }
  $$unsubscribe_connections();
  return `<div class="top palette-plain svelte-a0k7um">${$connections.tag == "empty" ? `<div class="start svelte-a0k7um"><div class="explain"><p class="svelte-a0k7um" data-svelte-h="svelte-1w15me9">Flower allows sharing through <a href="https://en.wikipedia.org/wiki/WebRTC">WebRTC</a>.
					You can either
					<span class="usePalette palette-accent svelte-a0k7um">host</span>
					a room to share your current flow, or edit someone else&#39;s flow as a
					<span class="usePalette palette-accent-secondary svelte-a0k7um">guest</span>.</p> <p class="svelte-a0k7um">If you encounter any issues with sharing, first update your browser, then ${validate_component(Button, "Button").$$render(
    $$result,
    {
      text: "contact me",
      icon: "link",
      target: "_blank",
      inline: true
    },
    {},
    {}
  )}. Looking for sheet sharing? See the
					${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "delta",
      text: "changelog",
      target: "_blank",
      inline: true
    },
    {},
    {}
  )} for more info.</p></div> <div class="hostGuestButtons svelte-a0k7um"><div class="buttons svelte-a0k7um">${validate_component(Button, "Button").$$render(
    $$result,
    {
      palette: "accent",
      icon: "add",
      text: "host new room"
    },
    {},
    {}
  )} ${`${``}`}</div></div></div>` : `${$connections.tag == "host" || $connections.tag == "guest" ? `${buildingConnection == null ? `${$connections.tag == "host" ? `${Object.keys($connections.holder).length > 0 ? `<div class="statuses svelte-a0k7um">${each(asConnectionIds(Object.keys($connections.holder)), (id) => {
    return `${validate_component(ConnectStatus, "ConnectStatus").$$render(
      $$result,
      {
        connection: $connections.holder[id],
        close: () => {
          if ($connections.tag != "host") return;
          $connections.holder[id].pc.close();
          delete $connections.holder[id];
          $connections = $connections;
        }
      },
      {},
      {}
    )}`;
  })}</div>` : ``} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      palette: "accent",
      icon: "add",
      text: "add guest"
    },
    {},
    {}
  )}` : `${$connections.tag == "guest" ? `${validate_component(ConnectStatus, "ConnectStatus").$$render($$result, { connection: $connections.connection }, {}, {})} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      palette: "accent-secondary",
      icon: "download",
      text: "sync",
      tooltip: "use if flows get out of sync",
      disabled: $connections.connection.tag == "guestConnected" ? $connections.connection.awaitingSync ? true : false : true,
      disabledReason: $connections.connection.tag == "guestConnected" ? $connections.connection.awaitingSync ? "awaiting sync" : void 0 : "not connected"
    },
    {},
    {}
  )}` : ``}`}` : `${`${validate_component(ConnectLink, "ConnectLink").$$render($$result, { connection: buildingConnection }, {}, {})}`}`}` : ``}`} <div class="controls svelte-a0k7um">${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "link",
      text: "using link connect (default)",
      tooltip: "switch to manual connect"
    },
    {},
    {}
  )} ${$connections.tag != "empty" ? `${buildingConnection == null ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      text: $connections.tag == "host" ? Object.keys($connections.holder).length == 0 ? "cancel" : "disconnect all" : "disconnect",
      icon: "delete"
    },
    {},
    {}
  )}` : `${validate_component(Button, "Button").$$render($$result, { text: "cancel", icon: "delete" }, {}, {})}`}` : ``}</div> </div>`;
});
const css$o = {
  code: "textarea.svelte-1ilfv2h{box-sizing:border-box;resize:none;outline:none;display:block;overflow-y:hidden;margin:0;line-height:1.5em;width:100%;height:calc(1em + var(--padding) * 2 + 6px);background:none;padding:0;border:none;border-radius:0;font-size:inherit;color:inherit;white-space:var(--white-space);text-decoration:inherit}textarea.svelte-1ilfv2h::-webkit-scrollbar{display:none}textarea.svelte-1ilfv2h{-ms-overflow-style:none;scrollbar-width:none}textarea.svelte-1ilfv2h:focus{z-index:10000}textarea.svelte-1ilfv2h::placeholder{color:var(--this-text-weak)}textarea.svelte-1ilfv2h::selection{background:var(--this-text-select)}",
  map: '{"version":3,"file":"Text.svelte","sources":["Text.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onDestroy, onMount } from \\"svelte\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nexport let value;\\nexport let placeholder = \\"\\";\\nexport let nowrap = false;\\nexport let strikethrough = false;\\nexport let readonly = false;\\nexport let bold = void 0;\\nexport let textHeight = 0;\\nlet whiteSpaceCss;\\n$: {\\n  if (nowrap) {\\n    whiteSpaceCss = \\"nowrap\\";\\n  } else {\\n    whiteSpaceCss = \\"auto\\";\\n  }\\n}\\nlet textarea;\\nlet lastValue;\\nlet lastBold;\\nexport function autoHeight(force) {\\n  if (textarea && (lastValue !== value || lastBold !== bold || force)) {\\n    textarea.value = textarea.value.replace(/\\\\r?\\\\n|\\\\r/g, \\"\\");\\n    textarea.style.height = \\"0px\\";\\n    textHeight = textarea.scrollHeight;\\n    textarea.style.height = textHeight + \\"px\\";\\n    lastValue = value;\\n    lastBold = bold;\\n  }\\n}\\nonDestroy(settings.subscribe([\\"fontSize\\"], () => autoHeight(true)));\\nonMount(() => {\\n  requestAnimationFrame(() => autoHeight());\\n});\\nexport const focus = () => {\\n  textarea.focus();\\n};\\n<\/script>\\n\\n<textarea\\n\\tbind:value\\n\\tbind:this={textarea}\\n\\ton:load\\n\\ton:input={() => requestAnimationFrame(() => autoHeight())}\\n\\ton:beforeinput\\n\\ton:keydown\\n\\ton:focus\\n\\ton:blur\\n\\tspellcheck=\\"false\\"\\n\\t{placeholder}\\n\\tstyle={`--white-space:${whiteSpaceCss};`}\\n\\tclass:strikethrough\\n\\treadonly={readonly}\\n/>\\n\\n<style>\\n\\ttextarea {\\n\\t\\tbox-sizing: border-box;\\n\\t\\tresize: none;\\n\\t\\toutline: none;\\n\\t\\tdisplay: block;\\n\\t\\toverflow-y: hidden;\\n\\t\\tmargin: 0;\\n\\t\\tline-height: 1.5em;\\n\\n\\t\\twidth: 100%;\\n\\t\\theight: calc(1em + var(--padding) * 2 + 6px);\\n\\n\\t\\tbackground: none;\\n\\t\\tpadding: 0;\\n\\t\\tborder: none;\\n\\t\\tborder-radius: 0;\\n\\t\\tfont-size: inherit;\\n\\t\\tcolor: inherit;\\n\\t\\twhite-space: var(--white-space);\\n\\t\\ttext-decoration: inherit;\\n\\t}\\n\\n\\ttextarea::-webkit-scrollbar {\\n\\t\\tdisplay: none;\\n\\t}\\n\\ttextarea {\\n\\t\\t-ms-overflow-style: none; /* IE and Edge */\\n\\t\\tscrollbar-width: none; /* Firefox */\\n\\t}\\n\\ttextarea:focus {\\n\\t\\tz-index: 10000;\\n\\t}\\n\\ttextarea::placeholder {\\n\\t\\tcolor: var(--this-text-weak);\\n\\t}\\n\\ttextarea::selection {\\n\\t\\tbackground: var(--this-text-select);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwDC,uBAAS,CACR,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,CAAC,CACT,WAAW,CAAE,KAAK,CAElB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAE5C,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,CAAC,CAChB,SAAS,CAAE,OAAO,CAClB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,aAAa,CAAC,CAC/B,eAAe,CAAE,OAClB,CAEA,uBAAQ,mBAAoB,CAC3B,OAAO,CAAE,IACV,CACA,uBAAS,CACR,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IAClB,CACA,uBAAQ,MAAO,CACd,OAAO,CAAE,KACV,CACA,uBAAQ,aAAc,CACrB,KAAK,CAAE,IAAI,gBAAgB,CAC5B,CACA,uBAAQ,WAAY,CACnB,UAAU,CAAE,IAAI,kBAAkB,CACnC"}'
};
const Text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  let { placeholder = "" } = $$props;
  let { nowrap = false } = $$props;
  let { strikethrough = false } = $$props;
  let { readonly = false } = $$props;
  let { bold = void 0 } = $$props;
  let { textHeight = 0 } = $$props;
  let whiteSpaceCss;
  let textarea;
  function autoHeight(force) {
  }
  onDestroy(settings.subscribe(["fontSize"], () => autoHeight()));
  const focus = () => {
    textarea.focus();
  };
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.nowrap === void 0 && $$bindings.nowrap && nowrap !== void 0) $$bindings.nowrap(nowrap);
  if ($$props.strikethrough === void 0 && $$bindings.strikethrough && strikethrough !== void 0) $$bindings.strikethrough(strikethrough);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  if ($$props.bold === void 0 && $$bindings.bold && bold !== void 0) $$bindings.bold(bold);
  if ($$props.textHeight === void 0 && $$bindings.textHeight && textHeight !== void 0) $$bindings.textHeight(textHeight);
  if ($$props.autoHeight === void 0 && $$bindings.autoHeight && autoHeight !== void 0) $$bindings.autoHeight(autoHeight);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0) $$bindings.focus(focus);
  $$result.css.add(css$o);
  {
    {
      if (nowrap) {
        whiteSpaceCss = "nowrap";
      } else {
        whiteSpaceCss = "auto";
      }
    }
  }
  return `<textarea spellcheck="false"${add_attribute("placeholder", placeholder, 0)}${add_attribute("style", `--white-space:${whiteSpaceCss};`, 0)} ${readonly ? "readonly" : ""} class="${["svelte-1ilfv2h", strikethrough ? "strikethrough" : ""].join(" ").trim()}"${add_attribute("this", textarea, 0)}>${escape(value || "")}</textarea>`;
});
const folded = writable(/* @__PURE__ */ new Map());
const css$n = {
  code: "svg.svelte-1q5bq9r{display:block;margin:auto;stroke:currentColor}.arrowAbove.svelte-1q5bq9r{transform-origin:50% 17%}.arrowBelow.svelte-1q5bq9r{transform-origin:50% 83%}.arrowAbove.svelte-1q5bq9r,.arrowBelow.svelte-1q5bq9r{transition:rotate var(--transition-speed)}.foldParent:hover .arrowAbove.svelte-1q5bq9r{rotate:-180deg}.foldParent:hover .arrowBelow.svelte-1q5bq9r{rotate:180deg}",
  map: '{"version":3,"file":"Fold.svelte","sources":["Fold.svelte"],"sourcesContent":["<script lang=\\"ts\\">let size = \\"var(--button-size)\\";\\n<\/script>\\n\\n<svg style={`width:${size};height:${size};`} viewBox=\\"0 0 100 100\\" fill=\\"none\\" stroke=\\"var(--text)\\">\\n\\t<path\\n\\t\\td=\\"M68 8L49 29L30 8\\"\\n\\t\\tstroke=\\"currentColor\\"\\n\\t\\tstroke-width=\\"10\\"\\n\\t\\tstroke-linecap=\\"round\\"\\n\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\tclass=\\"arrowAbove\\"\\n\\t/>\\n\\t<path\\n\\t\\td=\\"M30 92L49 71L68 92\\"\\n\\t\\tstroke=\\"currentColor\\"\\n\\t\\tstroke-width=\\"10\\"\\n\\t\\tstroke-linecap=\\"round\\"\\n\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\tclass=\\"arrowBelow\\"\\n\\t/>\\n</svg>\\n\\n<style>\\n\\tsvg {\\n\\t\\tdisplay: block;\\n\\t\\tmargin: auto;\\n\\t\\tstroke: currentColor;\\n\\t}\\n\\t.arrowAbove {\\n\\t\\ttransform-origin: 50% 17%;\\n\\t}\\n\\t.arrowBelow {\\n\\t\\ttransform-origin: 50% 83%;\\n\\t}\\n\\t.arrowAbove,\\n\\t.arrowBelow {\\n\\t\\ttransition: rotate var(--transition-speed);\\n\\t}\\n\\t:global(.foldParent:hover) .arrowAbove {\\n\\t\\trotate: -180deg;\\n\\t}\\n\\n\\t:global(.foldParent:hover) .arrowBelow {\\n\\t\\trotate: 180deg;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAuBC,kBAAI,CACH,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,YACT,CACA,0BAAY,CACX,gBAAgB,CAAE,GAAG,CAAC,GACvB,CACA,0BAAY,CACX,gBAAgB,CAAE,GAAG,CAAC,GACvB,CACA,0BAAW,CACX,0BAAY,CACX,UAAU,CAAE,MAAM,CAAC,IAAI,kBAAkB,CAC1C,CACQ,iBAAkB,CAAC,0BAAY,CACtC,MAAM,CAAE,OACT,CAEQ,iBAAkB,CAAC,0BAAY,CACtC,MAAM,CAAE,MACT"}'
};
let size = "var(--button-size)";
const Fold = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$n);
  return `<svg${add_attribute("style", `width:${size};height:${size};`, 0)} viewBox="0 0 100 100" fill="none" stroke="var(--text)" class="svelte-1q5bq9r"><path d="M68 8L49 29L30 8" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" class="arrowAbove svelte-1q5bq9r"></path><path d="M30 92L49 71L68 92" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" class="arrowBelow svelte-1q5bq9r"></path></svg>`;
});
const css$m = {
  code: ".top.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{display:grid;grid-template-areas:'a b';grid-template-rows:min-content;width:max-content;height:auto;overflow:visible;align-items:start}.content.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{width:var(--column-width);height:min-content;flex-direction:row;display:flex;grid-area:a;background:var(--this-background);transition:background var(--transition-speed);position:relative;border-radius:var(--border-radius-small);color:var(--this-text)}.empty.svelte-lfoydy>.content.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{pointer-events:none;height:10px;opacity:0}.text.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{padding:var(--padding);position:relative;z-index:2}.text.crossed.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{text-decoration:line-through;color:var(--this-text-weak)}.text.bold.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{font-weight:var(--font-weight-bold)}.extensionIcon.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{transform:translateY(calc(-100% - var(--padding)));position:absolute;width:100%;z-index:1}.childFocus.svelte-lfoydy>.content.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy,.activeMouse.svelte-lfoydy .content.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy:hover{background:var(--this-background-indent)}.svelte-lfoydy:is(.focus, .activeMouse.focus)>.content.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{background:var(--this-background-active)}.content.left.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{border-radius:var(--border-radius-small) 0 var(--border-radius-small)\n			var(--border-radius-small)}.content.right.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{border-radius:0 var(--border-radius-small) var(--border-radius-small)\n			var(--border-radius-small)}.content.left.right.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{border-radius:0 0 var(--border-radius-small) var(--border-radius-small)}.childless.svelte-lfoydy .content.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{width:max-content}.root.content.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{display:none}.line.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{z-index:-1}.line.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{content:'';display:block;background-color:var(--this-background-indent);height:var(--line-width);margin-left:var(--padding);width:calc(var(--column-width) - var(--padding) * 2);border-radius:var(--border-radius-small);margin-top:calc(-0.5 * var(--line-width));position:absolute;transition:width var(--transition-speed), margin var(--transition-speed),\n			background var(--transition-speed)}.line.below.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{margin-top:calc(-0.5 * var(--line-width))}.line.left.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{width:calc(var(--column-width) - var(--padding));border-radius:3px 0 0 3px}.line.right.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{width:calc(var(--column-width) - var(--padding));margin-left:0;border-radius:0 3px 3px 0}.line.left.right.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy,.activeMouse.svelte-lfoydy .line.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy:hover{width:calc(var(--column-width));border-radius:0;margin-left:0}.childFocus.svelte-lfoydy>.content.svelte-lfoydy>.barcontainer.svelte-lfoydy>.line.svelte-lfoydy,.activeMouse.svelte-lfoydy .content.svelte-lfoydy:hover>.barcontainer.svelte-lfoydy>.line.svelte-lfoydy{z-index:2;background-color:var(--this-color-fade)}.svelte-lfoydy:is(.focus, .focus.activeMouse)>.content.svelte-lfoydy>.barcontainer.svelte-lfoydy>.line.svelte-lfoydy{z-index:3;background-color:var(--this-color)}.barcontainer.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{width:var(--column-width)}.children.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{grid-area:b;width:max-content;padding:0;margin:0}.children.isFolded.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{height:0;overflow:hidden}.add.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy,.unfoldButton.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{opacity:0;transition:background var(--transition-speed);border:none;display:block;position:absolute;transform:translateX(var(--column-width));border-radius:var(--border-radius);padding:var(--padding);margin:var(--padding-small) var(--padding) 0 var(--padding);width:calc(var(--column-width) - var(--padding) * 2);background-color:var(--this-background);box-sizing:border-box;height:calc(1em + var(--padding) * 2);color:var(--this-text)}.unfoldButton.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy{opacity:1;width:calc(var(--button-size) + var(--padding) * 2);height:calc(100% - var(--padding));margin:0;margin-top:var(--padding-small);padding:0 var(--padding);border-radius:0 var(--border-radius) var(--border-radius) 0;display:flex;flex-direction:column;justify-content:flex-start}.focus.svelte-lfoydy>.content.svelte-lfoydy>.add.svelte-lfoydy.svelte-lfoydy,.focus.svelte-lfoydy>.content.svelte-lfoydy>.unfoldButton.svelte-lfoydy.svelte-lfoydy,.activeMouse.svelte-lfoydy .add.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy:hover,.activeMouse.svelte-lfoydy .unfoldButton.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy:hover{opacity:1}.activeMouse.svelte-lfoydy .add.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy:hover,.activeMouse.svelte-lfoydy .unfoldButton.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy:hover{background-color:var(--this-background-indent)}.add.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy:active,.activeMouse.svelte-lfoydy .add.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy:active,.unfoldButton.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy:active,.activeMouse.svelte-lfoydy .unfoldButton.svelte-lfoydy.svelte-lfoydy.svelte-lfoydy:active{background-color:var(--this-background-active)}",
  map: '{"version":3,"file":"Box.svelte","sources":["Box.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Text from \\"./Text.svelte\\";\\nimport Icon from \\"./Icon.svelte\\";\\nimport { getContext, onDestroy, onMount, tick } from \\"svelte\\";\\nimport { activeMouse, nodes, pendingAction } from \\"$lib/models/store\\";\\nimport {\\n  getParentFlowId,\\n  checkIdBox,\\n  getAdjacentBox,\\n  getNode,\\n  newBoxId\\n} from \\"$lib/models/node\\";\\nimport { createKeyDownHandler } from \\"$lib/models/key\\";\\nimport { boxIn, boxOut, boxButtonIn, brIn, brOut } from \\"../models/transition\\";\\nimport { history } from \\"$lib/models/history\\";\\nimport { focusId } from \\"$lib/models/focus\\";\\nimport {\\n  addNewBox,\\n  addNewExtension,\\n  deleteBox,\\n  newUpdateAction,\\n  toggleBoxFormat\\n} from \\"$lib/models/nodeDecorateAction\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport { folded } from \\"$lib/models/fold\\";\\nimport Tooltip from \\"./Tooltip.svelte\\";\\nimport Fold from \\"./Fold.svelte\\";\\nexport let id;\\nexport let parentIsEmpty = false;\\nlet consistentEnterBehaviour = settings.data[\\"consistentEnterBehaviour\\"].value;\\nlet tabReturnsToParent = settings.data[\\"tabReturnsToParent\\"].value;\\nlet node;\\nlet box;\\nlet extensionIconSize = 10;\\n$: $nodes, updateNodeData();\\nfunction updateNodeData() {\\n  let newNode = $nodes[id];\\n  if (newNode != null) {\\n    node = newNode;\\n    if (node.value.tag == \\"flow\\") {\\n      box = null;\\n    } else {\\n      box = node.value;\\n      requestAnimationFrame(() => updateTextHeight && updateTextHeight());\\n    }\\n  }\\n}\\nlet lastValidIndex;\\nfunction index() {\\n  let parentNode = $nodes[node.parent];\\n  if (parentNode == null) return lastValidIndex;\\n  let newIndex = parentNode.children.indexOf(id);\\n  if (newIndex == -1) return lastValidIndex;\\n  lastValidIndex = newIndex;\\n  return lastValidIndex;\\n}\\nexport let addSibling = () => false;\\nexport let deleteSelf = () => {\\n};\\nexport let focusSibling = () => {\\n};\\nexport let focusSiblingStrict = () => false;\\nexport let focusParent = () => {\\n};\\nexport let dispatchSelfFocus = () => {\\n};\\nconst getInvert = getContext(\\"invert\\");\\nlet invert = getInvert();\\nconst getColumnCount = getContext(\\"columnCount\\");\\nlet columnCount = getColumnCount();\\nlet textarea = void 0;\\nlet childFocus = false;\\nlet childFocusIds = /* @__PURE__ */ new Set();\\nfunction onChildFocus(childId, childIsFocused) {\\n  if (childIsFocused) {\\n    childFocusIds.add(childId);\\n  } else {\\n    childFocusIds.delete(childId);\\n  }\\n  childFocus = childFocusIds.size > 0;\\n}\\nlet mounted = false;\\nlet lastFocus = $focusId;\\nfunction focusChange() {\\n  if ($focusId == id) {\\n    dispatchSelfFocus(id, true);\\n    if (node.level >= 1 && mounted) {\\n      textarea && textarea.focus();\\n    }\\n  } else if (lastFocus == id) {\\n    dispatchSelfFocus(id, false);\\n  }\\n  lastFocus = $focusId;\\n}\\nonMount(() => {\\n  mounted = true;\\n  focusChange();\\n});\\nonDestroy(() => {\\n  dispatchSelfFocus(id, false);\\n});\\n$: $focusId, focusChange();\\nfunction handleBlur() {\\n  if ($focusId == id) {\\n    $focusId = null;\\n  }\\n}\\nfunction handleFocus() {\\n  if ($focusId != id) {\\n    $focusId = id;\\n  }\\n}\\nconst keyComboOptionsIndex = {\\n  \\"control shift\\": {\\n    x: {\\n      handle: () => {\\n        if (!box?.isExtension) formatSelf(\\"crossed\\");\\n      }\\n    }\\n  },\\n  commandControl: {\\n    Backspace: {\\n      handle: () => {\\n        blurSelf();\\n        deleteSelf(index());\\n        history.setPrevAfterFocus($focusId);\\n      }\\n    },\\n    b: {\\n      handle: () => {\\n        if (!box?.isExtension) formatSelf(\\"bold\\");\\n      }\\n    },\\n    e: {\\n      handle: () => {\\n        if (!box?.isExtension && addExtentionChild()) focusGrandchildStrict(0, 0);\\n      }\\n    }\\n  },\\n  \\"alt shift\\": {\\n    Enter: {\\n      handle: () => {\\n        let node2 = $nodes[id];\\n        if (node2 == null) return;\\n        let parentId = checkIdBox($nodes, node2.parent);\\n        if (parentId == null) return;\\n        let parentSiblingId = getAdjacentBox($nodes, parentId, \\"down\\");\\n        if (parentSiblingId == null) return;\\n        let parentSibling = $nodes[parentSiblingId];\\n        if (parentSibling == null) return;\\n        blurSelf();\\n        addNewBox(parentSiblingId, 0);\\n        let newChildId = parentSibling.children[0];\\n        $focusId = newChildId;\\n        history.setPrevAfterFocus($focusId);\\n      }\\n    }\\n  },\\n  alt: {\\n    Enter: {\\n      handle: () => {\\n        if (box?.isExtension) return;\\n        if (consistentEnterBehaviour) {\\n          if (addSibling(index(), 0)) {\\n            focusSibling(index(), 0);\\n            history.setPrevAfterFocus($focusId);\\n          }\\n        } else {\\n          blurSelf();\\n          if (focusSiblingStrict(index(), -1)) return;\\n          if (addSibling(index(), 0)) {\\n            focusSibling(index(), 0);\\n            history.setPrevAfterFocus($focusId);\\n          }\\n        }\\n      }\\n    }\\n  },\\n  shift: {\\n    Enter: {\\n      handle: () => {\\n        blurSelf();\\n        let childIndex = 0;\\n        if (node.children[0] && $nodes[node.children[0]]?.value.isExtension) childIndex = 1;\\n        if (addChild(childIndex, 0)) {\\n          focusChild(childIndex, 0);\\n          history.setPrevAfterFocus($focusId);\\n        }\\n      }\\n    },\\n    Tab: {\\n      handle: () => {\\n        blurSelf();\\n        focusSibling(index(), -1);\\n      }\\n    }\\n  },\\n  none: {\\n    Enter: {\\n      handle: () => {\\n        if (consistentEnterBehaviour) {\\n          if (addSibling(index(), 1)) {\\n            focusSibling(index(), 1);\\n            history.setPrevAfterFocus($focusId);\\n          }\\n        } else {\\n          blurSelf();\\n          if (focusSiblingStrict(index(), 1)) return;\\n          if (addSibling(index(), 1)) {\\n            focusSibling(index(), 1);\\n            history.setPrevAfterFocus($focusId);\\n          }\\n        }\\n      }\\n    },\\n    Backspace: {\\n      handle: () => {\\n        blurSelf();\\n        deleteSelf(index());\\n        history.setPrevAfterFocus($focusId);\\n      },\\n      // only delete if content is empty or is an extension and there are no children\\n      require: () => ((content?.length ?? 1) == 0 || (box?.isExtension ?? false)) && node.children.length == 0\\n    },\\n    ArrowUp: {\\n      handle: () => {\\n        blurSelf();\\n        if (!focusAdjacent(\\"up\\")) {\\n          if (node.level == 1) {\\n            focusParent();\\n          } else {\\n            focusSelf();\\n          }\\n        }\\n      }\\n    },\\n    ArrowDown: {\\n      handle: () => {\\n        blurSelf();\\n        focusAdjacent(\\"down\\") || focusSelf();\\n      }\\n    },\\n    Tab: {\\n      handle: () => {\\n        blurSelf();\\n        focusSibling(index(), 1, tabReturnsToParent);\\n      }\\n    },\\n    ArrowLeft: {\\n      handle: () => {\\n        blurSelf;\\n        focusParent();\\n      }\\n    },\\n    ArrowRight: {\\n      handle: () => {\\n        blurSelf();\\n        if (node.children.length > 0) {\\n          focusChild(0, 0);\\n        } else {\\n          focusSelf();\\n        }\\n      }\\n    }\\n  },\\n  control: {\\n    l: {\\n      handle: () => {\\n        if (!isFolded && node.children.length == 0) {\\n          return;\\n        }\\n        toggleFold();\\n      }\\n    }\\n  }\\n};\\nlet handleKeydown = createKeyDownHandler(keyComboOptionsIndex);\\nfunction formatSelf(format) {\\n  const boxId = checkIdBox($nodes, id);\\n  if (boxId == null) return;\\n  toggleBoxFormat(boxId, format);\\n  updateNodeData();\\n}\\nfunction addChild(childIndex, direction) {\\n  let newChildIndex = childIndex + direction;\\n  if (node.level < columnCount) {\\n    addNewBox(id, newChildIndex);\\n    return true;\\n  } else {\\n    focusSelf();\\n    return false;\\n  }\\n}\\nfunction addExtentionChild() {\\n  if (node.children.length >= 1 && $nodes[node.children[0]]?.value.isExtension) {\\n    return false;\\n  }\\n  if (node.level < columnCount - 1) {\\n    addNewExtension(id);\\n    return true;\\n  } else {\\n    focusSelf();\\n    return false;\\n  }\\n}\\nasync function deleteChild(childIndex) {\\n  if (node.children.length > 1 || node.level >= 1) {\\n    if (box?.empty && node.children.length == 1) {\\n      deleteSelf(index());\\n      return;\\n    }\\n    let deleteId = node.children[childIndex];\\n    if ($focusId == deleteId) {\\n      $focusId = null;\\n    }\\n    await tick();\\n    const childIsExtension = $nodes[deleteId] ? $nodes[deleteId].value.isExtension : false;\\n    deleteBox(deleteId);\\n    if (childIsExtension) {\\n      focusSelf();\\n    } else if (node.children[childIndex - 1]) {\\n      focusChild(childIndex - 1, 0);\\n    } else if (node.children.length == 0) {\\n      focusSelf();\\n    } else if (childIndex == 0) {\\n      focusChild(0, 0);\\n    }\\n    return true;\\n  } else {\\n    focusChild(0, 0);\\n    return false;\\n  }\\n}\\nfunction focusChild(childIndex, direction, defaultToSelf) {\\n  let newChildIndex = childIndex + direction;\\n  if (newChildIndex < 0) {\\n    focusSelf();\\n    return;\\n  }\\n  if (newChildIndex >= node.children.length) {\\n    if (defaultToSelf) {\\n      focusSelf();\\n      return;\\n    }\\n    let lastChild = $nodes[node.children[node.children.length - 1]];\\n    if (lastChild == null) return;\\n    if (lastChild.children.length > 0) {\\n      let grandChildId = lastChild.children[0];\\n      $focusId = grandChildId;\\n    } else {\\n      $focusId = id;\\n    }\\n  } else {\\n    let child = $nodes[node.children[newChildIndex]];\\n    if (child == null) return;\\n    if (child.value.empty && direction != 0) {\\n      focusChild(newChildIndex, direction, defaultToSelf);\\n    } else {\\n      $focusId = node.children[newChildIndex];\\n    }\\n  }\\n}\\nfunction focusChildStrict(childIndex, direction) {\\n  let newChildIndex = childIndex + direction;\\n  if (newChildIndex < 0 || newChildIndex >= node.children.length) {\\n    return false;\\n  }\\n  let child = $nodes[node.children[newChildIndex]];\\n  if (child == null) return false;\\n  if (child.value.empty && direction != 0) {\\n    return focusChildStrict(newChildIndex, direction);\\n  } else {\\n    $focusId = node.children[newChildIndex];\\n    return true;\\n  }\\n}\\nfunction focusGrandchildStrict(childIndex, grandchildIndex) {\\n  if (childIndex < 0 || childIndex >= node.children.length) {\\n    return false;\\n  }\\n  let child = $nodes[node.children[childIndex]];\\n  if (!child) return false;\\n  if (grandchildIndex < 0 || grandchildIndex >= child.children.length) {\\n    return false;\\n  }\\n  $focusId = child.children[grandchildIndex];\\n  return true;\\n}\\nfunction focusAdjacent(direction) {\\n  let boxId = checkIdBox($nodes, id);\\n  if (boxId == null) return false;\\n  while (true) {\\n    let adjacentBox = getAdjacentBox($nodes, boxId, direction);\\n    if (adjacentBox == null) return false;\\n    if (getNode($nodes, adjacentBox).unwrap().value.empty) {\\n      boxId = adjacentBox;\\n      continue;\\n    } else {\\n      $focusId = adjacentBox;\\n      return true;\\n    }\\n  }\\n}\\nfunction focusSelf() {\\n  if (box?.empty) {\\n    focusParent();\\n  } else {\\n    $focusId = id;\\n  }\\n}\\nfunction blurSelf() {\\n  if ($focusId == id) {\\n    $focusId = null;\\n  }\\n}\\nlet palette;\\nlet outsidePalette;\\n$: {\\n  let isEvenLevel = node.level % 2 == 0;\\n  let invertColor = isEvenLevel !== invert;\\n  palette = invertColor ? \\"accent-secondary\\" : \\"accent\\";\\n  outsidePalette = invertColor ? \\"accent\\" : \\"accent-secondary\\";\\n}\\nfunction preventBlur(e) {\\n  e.preventDefault();\\n}\\n$: box, syncNodesToContent();\\nlet content;\\nfunction syncNodesToContent() {\\n  if (box == null) return;\\n  if (content != box.content) {\\n    content = box.content;\\n  }\\n}\\nlet editAlreadyPending = false;\\nfunction handleBeforeInput() {\\n  if (editAlreadyPending) return;\\n  editAlreadyPending = true;\\n  $pendingAction = {\\n    beforeFocusId: id,\\n    afterFocusId: id,\\n    ownerId: getParentFlowId($nodes, id).unwrap(),\\n    action: function() {\\n      if (box == null) return { tag: \\"identity\\" };\\n      const boxId = checkIdBox($nodes, id);\\n      if (boxId == null) return { tag: \\"identity\\" };\\n      editAlreadyPending = false;\\n      return newUpdateAction(boxId, { ...box, content });\\n    }\\n  };\\n}\\nfunction getIsFolded(folded2) {\\n  let boxId = checkIdBox($nodes, id);\\n  if (boxId == null) return false;\\n  return folded2.get(boxId) ?? false;\\n}\\n$: isFolded = getIsFolded($folded);\\nfunction toggleFold() {\\n  let boxId = checkIdBox($nodes, id);\\n  if (boxId == null) return;\\n  let foldState = $folded.get(boxId) ?? false;\\n  $folded.set(boxId, !foldState);\\n  $folded = $folded;\\n}\\nfunction unfold() {\\n  let boxId = checkIdBox($nodes, id);\\n  if (boxId == null) return;\\n  $folded.delete(boxId);\\n  $folded = $folded;\\n}\\nlet updateTextHeight = void 0;\\n<\/script>\\n\\n<div\\n\\tclass={`box top palette-${palette}`}\\n\\tclass:childless={node.children.length == 0}\\n\\tclass:empty={box?.empty}\\n\\tclass:focus={$focusId == id}\\n\\tclass:childFocus\\n\\tclass:activeMouse={$activeMouse}\\n\\tclass:highlight={childFocus || $focusId == id}\\n\\tin:boxIn={{ skip: box == null }}\\n\\tout:boxOut={{ skip: box == null }}\\n>\\n\\t{#if box?.empty}\\n\\t\\t<div class=\\"content\\" />\\n\\t{:else}\\n\\t\\t<div\\n\\t\\t\\tclass=\\"content\\"\\n\\t\\t\\tclass:root={box == null}\\n\\t\\t\\tstyle={`--this-background: none`}\\n\\t\\t\\tclass:left={node.children.length > 0}\\n\\t\\t\\tclass:right={index() == 0 && node.level > 1 && !parentIsEmpty}\\n\\t\\t>\\n\\t\\t\\t<div class=\\"barcontainer\\">\\n\\t\\t\\t\\t<!-- svelte-ignore a11y-click-events-have-key-events -->\\n\\t\\t\\t\\t<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->\\n\\t\\t\\t\\t<!-- we can ignore accesibility because you can use keyboard inside the cell for same function -->\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"line above\\"\\n\\t\\t\\t\\t\\tclass:left={node.children.length > 0}\\n\\t\\t\\t\\t\\tclass:right={index() == 0 && node.level > 1 && !parentIsEmpty}\\n\\t\\t\\t\\t\\tin:brIn\\n\\t\\t\\t\\t\\tout:brOut\\n\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\tif (box?.isExtension) {\\n\\t\\t\\t\\t\\t\\t\\t// ignore if this is an extension box\\n\\t\\t\\t\\t\\t\\t\\treturn;\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\tlet couldAdd = addSibling(index(), 0);\\n\\t\\t\\t\\t\\t\\tif (couldAdd) {\\n\\t\\t\\t\\t\\t\\t\\tfocusSibling(index(), 0);\\n\\t\\t\\t\\t\\t\\t\\thistory.setPrevAfterFocus($focusId);\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\ton:mousedown={preventBlur}\\n\\t\\t\\t\\t\\trole=\\"separator\\"\\n\\t\\t\\t\\t/>\\n\\n\\t\\t\\t\\t<div class=\\"text\\" class:crossed={box?.crossed} class:bold={box?.bold}>\\n\\t\\t\\t\\t\\t{#if box != null}\\n\\t\\t\\t\\t\\t\\t<Text\\n\\t\\t\\t\\t\\t\\t\\ton:keydown={handleKeydown}\\n\\t\\t\\t\\t\\t\\t\\ton:blur={handleBlur}\\n\\t\\t\\t\\t\\t\\t\\ton:focus={handleFocus}\\n\\t\\t\\t\\t\\t\\t\\tbind:value={content}\\n\\t\\t\\t\\t\\t\\t\\tbold={box.bold ? true : false}\\n\\t\\t\\t\\t\\t\\t\\tbind:this={textarea}\\n\\t\\t\\t\\t\\t\\t\\ton:beforeinput={handleBeforeInput}\\n\\t\\t\\t\\t\\t\\t\\tbind:autoHeight={updateTextHeight}\\n\\t\\t\\t\\t\\t\\t\\tbind:textHeight={extensionIconSize}\\n\\t\\t\\t\\t\\t\\t\\tplaceholder={box.placeholder ?? (node.level == 1 && index() == 0 ? \'type here\' : \'\')}\\n\\t\\t\\t\\t\\t\\t\\treadonly={box?.isExtension ?? false}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{#if box?.isExtension}\\n\\t\\t\\t\\t\\t<div class=\\"extensionIcon\\">\\n\\t\\t\\t\\t\\t\\t<Icon name=\\"arrowRightThroughCircle\\" size={extensionIconSize + \'px\'} />\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t<!-- svelte-ignore a11y-click-events-have-key-events -->\\n\\t\\t\\t\\t<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->\\n\\t\\t\\t\\t<!-- we can ignore accesibility because you can use keyboard inside the cell for same function -->\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"line below\\"\\n\\t\\t\\t\\t\\tin:brIn\\n\\t\\t\\t\\t\\tout:brOut\\n\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\tlet couldAdd = addSibling(index(), 1);\\n\\t\\t\\t\\t\\t\\tif (couldAdd) {\\n\\t\\t\\t\\t\\t\\t\\tfocusSibling(index(), 1);\\n\\t\\t\\t\\t\\t\\t\\thistory.setPrevAfterFocus($focusId);\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\ton:mousedown={preventBlur}\\n\\t\\t\\t\\t\\trole=\\"separator\\"\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</div>\\n\\t\\t\\t{#if !isFolded && node.children.length == 0 && node.level < columnCount}\\n\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\tclass={`add palette-${outsidePalette}`}\\n\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\taddChild(0, 0);\\n\\t\\t\\t\\t\\t\\tfocusChild(0, 0);\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\ton:mousedown={preventBlur}\\n\\t\\t\\t\\t\\tin:boxButtonIn\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<Icon name=\\"add\\" />\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t{/if}\\n\\t\\t\\t{#if isFolded}\\n\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\tclass={`unfoldButton foldParent palette-${outsidePalette}`}\\n\\t\\t\\t\\t\\ton:click={unfold}\\n\\t\\t\\t\\t\\ton:mousedown={preventBlur}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<Fold />\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t{/if}\\n\\n\\t<ul class=\\"children\\" class:isFolded>\\n\\t\\t{#each node.children as childId, _ (childId)}\\n\\t\\t\\t<svelte:self\\n\\t\\t\\t\\tid={childId}\\n\\t\\t\\t\\taddSibling={addChild}\\n\\t\\t\\t\\tdeleteSelf={deleteChild}\\n\\t\\t\\t\\tfocusSibling={focusChild}\\n\\t\\t\\t\\tfocusSiblingStrict={focusChildStrict}\\n\\t\\t\\t\\tfocusParent={focusSelf}\\n\\t\\t\\t\\tdispatchSelfFocus={onChildFocus}\\n\\t\\t\\t\\tparentIsEmpty={box?.empty ?? false}\\n\\t\\t\\t\\ton:saveFocus\\n\\t\\t\\t/>\\n\\t\\t{/each}\\n\\t</ul>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-areas: \'a b\';\\n\\t\\tgrid-template-rows: min-content;\\n\\t\\twidth: max-content;\\n\\t\\theight: auto;\\n\\t\\toverflow: visible;\\n\\t\\talign-items: start;\\n\\t}\\n\\n\\t.content {\\n\\t\\twidth: var(--column-width);\\n\\t\\theight: min-content;\\n\\t\\tflex-direction: row;\\n\\t\\tdisplay: flex;\\n\\t\\tgrid-area: a;\\n\\t\\tbackground: var(--this-background);\\n\\t\\ttransition: background var(--transition-speed);\\n\\t\\tposition: relative;\\n\\t\\tborder-radius: var(--border-radius-small);\\n\\t\\tcolor: var(--this-text);\\n\\t}\\n\\n\\t.empty > .content {\\n\\t\\tpointer-events: none;\\n\\t\\theight: 10px;\\n\\t\\topacity: 0;\\n\\t}\\n\\t.text {\\n\\t\\tpadding: var(--padding);\\n\\t\\tposition: relative;\\n\\t\\tz-index: 2;\\n\\t}\\n\\t.text.crossed {\\n\\t\\ttext-decoration: line-through;\\n\\t\\tcolor: var(--this-text-weak);\\n\\t}\\n\\t.text.bold {\\n\\t\\tfont-weight: var(--font-weight-bold);\\n\\t}\\n\\n\\t.extensionIcon {\\n\\t\\ttransform: translateY(calc(-100% - var(--padding)));\\n\\t\\tposition: absolute;\\n\\t\\twidth: 100%;\\n\\t\\tz-index: 1;\\n\\t}\\n\\n\\t.childFocus > .content,\\n\\t.activeMouse .content:hover {\\n\\t\\tbackground: var(--this-background-indent);\\n\\t}\\n\\t:is(.focus, .activeMouse.focus) > .content {\\n\\t\\tbackground: var(--this-background-active);\\n\\t}\\n\\t.content.left {\\n\\t\\tborder-radius: var(--border-radius-small) 0 var(--border-radius-small)\\n\\t\\t\\tvar(--border-radius-small);\\n\\t}\\n\\t.content.right {\\n\\t\\tborder-radius: 0 var(--border-radius-small) var(--border-radius-small)\\n\\t\\t\\tvar(--border-radius-small);\\n\\t}\\n\\t.content.left.right {\\n\\t\\tborder-radius: 0 0 var(--border-radius-small) var(--border-radius-small);\\n\\t}\\n\\t.childless .content {\\n\\t\\twidth: max-content;\\n\\t}\\n\\t.root.content {\\n\\t\\tdisplay: none;\\n\\t}\\n\\t.line {\\n\\t\\tz-index: -1;\\n\\t}\\n\\t.line {\\n\\t\\tcontent: \'\';\\n\\t\\tdisplay: block;\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\t\\theight: var(--line-width);\\n\\t\\tmargin-left: var(--padding);\\n\\t\\twidth: calc(var(--column-width) - var(--padding) * 2);\\n\\t\\tborder-radius: var(--border-radius-small);\\n\\t\\tmargin-top: calc(-0.5 * var(--line-width));\\n\\t\\tposition: absolute;\\n\\t\\ttransition: width var(--transition-speed), margin var(--transition-speed),\\n\\t\\t\\tbackground var(--transition-speed);\\n\\t}\\n\\t.line.below {\\n\\t\\tmargin-top: calc(-0.5 * var(--line-width));\\n\\t}\\n\\t.line.left {\\n\\t\\twidth: calc(var(--column-width) - var(--padding));\\n\\t\\tborder-radius: 3px 0 0 3px;\\n\\t}\\n\\t.line.right {\\n\\t\\twidth: calc(var(--column-width) - var(--padding));\\n\\t\\tmargin-left: 0;\\n\\t\\tborder-radius: 0 3px 3px 0;\\n\\t}\\n\\t.line.left.right,\\n\\t.activeMouse .line:hover {\\n\\t\\twidth: calc(var(--column-width));\\n\\t\\tborder-radius: 0;\\n\\t\\tmargin-left: 0;\\n\\t}\\n\\t.childFocus > .content > .barcontainer > .line,\\n\\t.activeMouse .content:hover > .barcontainer > .line {\\n\\t\\tz-index: 2;\\n\\n\\t\\tbackground-color: var(--this-color-fade);\\n\\t}\\n\\t:is(.focus, .focus.activeMouse) > .content > .barcontainer > .line {\\n\\t\\tz-index: 3;\\n\\t\\tbackground-color: var(--this-color);\\n\\t}\\n\\n\\t.barcontainer {\\n\\t\\twidth: var(--column-width);\\n\\t}\\n\\t.children {\\n\\t\\tgrid-area: b;\\n\\t\\twidth: max-content;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t}\\n\\t.children.isFolded {\\n\\t\\theight: 0;\\n\\t\\toverflow: hidden;\\n\\t}\\n\\t.add,\\n\\t.unfoldButton {\\n\\t\\topacity: 0;\\n\\t\\ttransition: background var(--transition-speed);\\n\\t\\tborder: none;\\n\\t\\tdisplay: block;\\n\\t\\tposition: absolute;\\n\\t\\ttransform: translateX(var(--column-width));\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tpadding: var(--padding);\\n\\t\\tmargin: var(--padding-small) var(--padding) 0 var(--padding);\\n\\t\\twidth: calc(var(--column-width) - var(--padding) * 2);\\n\\t\\tbackground-color: var(--this-background);\\n\\t\\tbox-sizing: border-box;\\n\\t\\theight: calc(1em + var(--padding) * 2);\\n\\t\\tcolor: var(--this-text);\\n\\t}\\n\\n\\t.unfoldButton {\\n\\t\\topacity: 1;\\n\\t\\twidth: calc(var(--button-size) + var(--padding) * 2);\\n\\t\\theight: calc(100% - var(--padding));\\n\\t\\tmargin: 0;\\n\\t\\tmargin-top: var(--padding-small);\\n\\t\\tpadding: 0 var(--padding);\\n\\t\\tborder-radius: 0 var(--border-radius) var(--border-radius) 0;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tjustify-content: flex-start;\\n\\t}\\n\\t.focus > .content > .add,\\n\\t.focus > .content > .unfoldButton,\\n\\t.activeMouse .add:hover,\\n\\t.activeMouse .unfoldButton:hover {\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t.activeMouse .add:hover,\\n\\t.activeMouse .unfoldButton:hover {\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\t}\\n\\t.add:active,\\n\\t.activeMouse .add:active,\\n\\t.unfoldButton:active,\\n\\t.activeMouse .unfoldButton:active {\\n\\t\\tbackground-color: var(--this-background-active);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAylBC,4DAAK,CACJ,OAAO,CAAE,IAAI,CACb,mBAAmB,CAAE,KAAK,CAC1B,kBAAkB,CAAE,WAAW,CAC/B,KAAK,CAAE,WAAW,CAClB,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,OAAO,CACjB,WAAW,CAAE,KACd,CAEA,gEAAS,CACR,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,MAAM,CAAE,WAAW,CACnB,cAAc,CAAE,GAAG,CACnB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,CAAC,CACZ,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,UAAU,CAAE,UAAU,CAAC,IAAI,kBAAkB,CAAC,CAC9C,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,IAAI,qBAAqB,CAAC,CACzC,KAAK,CAAE,IAAI,WAAW,CACvB,CAEA,oBAAM,CAAG,kDAAS,CACjB,cAAc,CAAE,IAAI,CACpB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CACV,CACA,6DAAM,CACL,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CACV,CACA,KAAK,gEAAS,CACb,eAAe,CAAE,YAAY,CAC7B,KAAK,CAAE,IAAI,gBAAgB,CAC5B,CACA,KAAK,6DAAM,CACV,WAAW,CAAE,IAAI,kBAAkB,CACpC,CAEA,sEAAe,CACd,SAAS,CAAE,WAAW,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CACnD,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CACV,CAEA,yBAAW,CAAG,kDAAQ,CACtB,0BAAY,CAAC,kDAAQ,MAAO,CAC3B,UAAU,CAAE,IAAI,wBAAwB,CACzC,eACA,IAAI,MAAM,EAAE,YAAY,MAAM,CAAC,CAAG,kDAAS,CAC1C,UAAU,CAAE,IAAI,wBAAwB,CACzC,CACA,QAAQ,6DAAM,CACb,aAAa,CAAE,IAAI,qBAAqB,CAAC,CAAC,CAAC,CAAC,IAAI,qBAAqB;AACvE,GAAG,IAAI,qBAAqB,CAC3B,CACA,QAAQ,8DAAO,CACd,aAAa,CAAE,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,qBAAqB;AACvE,GAAG,IAAI,qBAAqB,CAC3B,CACA,QAAQ,KAAK,8DAAO,CACnB,aAAa,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,qBAAqB,CACxE,CACA,wBAAU,CAAC,kDAAS,CACnB,KAAK,CAAE,WACR,CACA,KAAK,gEAAS,CACb,OAAO,CAAE,IACV,CACA,6DAAM,CACL,OAAO,CAAE,EACV,CACA,6DAAM,CACL,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,gBAAgB,CAAE,IAAI,wBAAwB,CAAC,CAC/C,MAAM,CAAE,IAAI,YAAY,CAAC,CACzB,WAAW,CAAE,IAAI,SAAS,CAAC,CAC3B,KAAK,CAAE,KAAK,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACrD,aAAa,CAAE,IAAI,qBAAqB,CAAC,CACzC,UAAU,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,YAAY,CAAC,CAAC,CAC1C,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,KAAK,CAAC,IAAI,kBAAkB,CAAC,CAAC,CAAC,MAAM,CAAC,IAAI,kBAAkB,CAAC;AAC3E,GAAG,UAAU,CAAC,IAAI,kBAAkB,CACnC,CACA,KAAK,8DAAO,CACX,UAAU,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,YAAY,CAAC,CAC1C,CACA,KAAK,6DAAM,CACV,KAAK,CAAE,KAAK,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CACjD,aAAa,CAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GACxB,CACA,KAAK,8DAAO,CACX,KAAK,CAAE,KAAK,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CACjD,WAAW,CAAE,CAAC,CACd,aAAa,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAC1B,CACA,KAAK,KAAK,8DAAM,CAChB,0BAAY,CAAC,+CAAK,MAAO,CACxB,KAAK,CAAE,KAAK,IAAI,cAAc,CAAC,CAAC,CAChC,aAAa,CAAE,CAAC,CAChB,WAAW,CAAE,CACd,CACA,yBAAW,CAAG,sBAAQ,CAAG,2BAAa,CAAG,mBAAK,CAC9C,0BAAY,CAAC,sBAAQ,MAAM,CAAG,2BAAa,CAAG,mBAAM,CACnD,OAAO,CAAE,CAAC,CAEV,gBAAgB,CAAE,IAAI,iBAAiB,CACxC,eACA,IAAI,MAAM,EAAE,MAAM,YAAY,CAAC,CAAG,sBAAQ,CAAG,2BAAa,CAAG,mBAAM,CAClE,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,IAAI,YAAY,CACnC,CAEA,qEAAc,CACb,KAAK,CAAE,IAAI,cAAc,CAC1B,CACA,iEAAU,CACT,SAAS,CAAE,CAAC,CACZ,KAAK,CAAE,WAAW,CAClB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CACT,CACA,SAAS,iEAAU,CAClB,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,MACX,CACA,4DAAI,CACJ,qEAAc,CACb,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,UAAU,CAAC,IAAI,kBAAkB,CAAC,CAC9C,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,WAAW,IAAI,cAAc,CAAC,CAAC,CAC1C,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,MAAM,CAAE,IAAI,eAAe,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAC5D,KAAK,CAAE,KAAK,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACrD,gBAAgB,CAAE,IAAI,iBAAiB,CAAC,CACxC,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACtC,KAAK,CAAE,IAAI,WAAW,CACvB,CAEA,qEAAc,CACb,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACpD,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CACnC,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,IAAI,eAAe,CAAC,CAChC,OAAO,CAAE,CAAC,CAAC,IAAI,SAAS,CAAC,CACzB,aAAa,CAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,CAAC,CAC5D,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,UAClB,CACA,oBAAM,CAAG,sBAAQ,CAAG,gCAAI,CACxB,oBAAM,CAAG,sBAAQ,CAAG,yCAAa,CACjC,0BAAY,CAAC,8CAAI,MAAM,CACvB,0BAAY,CAAC,uDAAa,MAAO,CAChC,OAAO,CAAE,CACV,CAEA,0BAAY,CAAC,8CAAI,MAAM,CACvB,0BAAY,CAAC,uDAAa,MAAO,CAChC,gBAAgB,CAAE,IAAI,wBAAwB,CAC/C,CACA,4DAAI,OAAO,CACX,0BAAY,CAAC,8CAAI,OAAO,CACxB,qEAAa,OAAO,CACpB,0BAAY,CAAC,uDAAa,OAAQ,CACjC,gBAAgB,CAAE,IAAI,wBAAwB,CAC/C"}'
};
const Box = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFolded;
  let $folded, $$unsubscribe_folded;
  let $nodes, $$unsubscribe_nodes;
  let $$unsubscribe_pendingAction;
  let $focusId, $$unsubscribe_focusId;
  let $activeMouse, $$unsubscribe_activeMouse;
  $$unsubscribe_folded = subscribe(folded, (value) => $folded = value);
  $$unsubscribe_nodes = subscribe(nodes, (value) => $nodes = value);
  $$unsubscribe_pendingAction = subscribe(pendingAction, (value) => value);
  $$unsubscribe_focusId = subscribe(focusId, (value) => $focusId = value);
  $$unsubscribe_activeMouse = subscribe(activeMouse, (value) => $activeMouse = value);
  let { id } = $$props;
  let { parentIsEmpty = false } = $$props;
  let consistentEnterBehaviour = settings.data["consistentEnterBehaviour"].value;
  let tabReturnsToParent = settings.data["tabReturnsToParent"].value;
  let node;
  let box;
  let extensionIconSize = 10;
  function updateNodeData() {
    let newNode = $nodes[id];
    if (newNode != null) {
      node = newNode;
      if (node.value.tag == "flow") {
        box = null;
      } else {
        box = node.value;
        requestAnimationFrame(() => updateTextHeight && updateTextHeight());
      }
    }
  }
  let lastValidIndex;
  function index() {
    let parentNode = $nodes[node.parent];
    if (parentNode == null) return lastValidIndex;
    let newIndex = parentNode.children.indexOf(id);
    if (newIndex == -1) return lastValidIndex;
    lastValidIndex = newIndex;
    return lastValidIndex;
  }
  let { addSibling = () => false } = $$props;
  let { deleteSelf = () => {
  } } = $$props;
  let { focusSibling = () => {
  } } = $$props;
  let { focusSiblingStrict = () => false } = $$props;
  let { focusParent = () => {
  } } = $$props;
  let { dispatchSelfFocus = () => {
  } } = $$props;
  const getInvert = getContext("invert");
  let invert = getInvert();
  const getColumnCount = getContext("columnCount");
  let columnCount = getColumnCount();
  let textarea = void 0;
  let childFocus = false;
  let childFocusIds = /* @__PURE__ */ new Set();
  function onChildFocus(childId, childIsFocused) {
    if (childIsFocused) {
      childFocusIds.add(childId);
    } else {
      childFocusIds.delete(childId);
    }
    childFocus = childFocusIds.size > 0;
  }
  let mounted = false;
  let lastFocus = $focusId;
  function focusChange() {
    if ($focusId == id) {
      dispatchSelfFocus(id, true);
      if (node.level >= 1 && mounted) {
        textarea && textarea.focus();
      }
    } else if (lastFocus == id) {
      dispatchSelfFocus(id, false);
    }
    lastFocus = $focusId;
  }
  onDestroy(() => {
    dispatchSelfFocus(id, false);
  });
  const keyComboOptionsIndex = {
    "control shift": {
      x: {
        handle: () => {
          if (!box?.isExtension) formatSelf("crossed");
        }
      }
    },
    commandControl: {
      Backspace: {
        handle: () => {
          blurSelf();
          deleteSelf(index());
          history.setPrevAfterFocus($focusId);
        }
      },
      b: {
        handle: () => {
          if (!box?.isExtension) formatSelf("bold");
        }
      },
      e: {
        handle: () => {
          if (!box?.isExtension && addExtentionChild()) focusGrandchildStrict(0, 0);
        }
      }
    },
    "alt shift": {
      Enter: {
        handle: () => {
          let node2 = $nodes[id];
          if (node2 == null) return;
          let parentId = checkIdBox($nodes, node2.parent);
          if (parentId == null) return;
          let parentSiblingId = getAdjacentBox($nodes, parentId, "down");
          if (parentSiblingId == null) return;
          let parentSibling = $nodes[parentSiblingId];
          if (parentSibling == null) return;
          blurSelf();
          addNewBox(parentSiblingId, 0);
          let newChildId = parentSibling.children[0];
          set_store_value(focusId, $focusId = newChildId, $focusId);
          history.setPrevAfterFocus($focusId);
        }
      }
    },
    alt: {
      Enter: {
        handle: () => {
          if (box?.isExtension) return;
          if (consistentEnterBehaviour) {
            if (addSibling(index(), 0)) {
              focusSibling(index(), 0);
              history.setPrevAfterFocus($focusId);
            }
          } else {
            blurSelf();
            if (focusSiblingStrict(index(), -1)) return;
            if (addSibling(index(), 0)) {
              focusSibling(index(), 0);
              history.setPrevAfterFocus($focusId);
            }
          }
        }
      }
    },
    shift: {
      Enter: {
        handle: () => {
          blurSelf();
          let childIndex = 0;
          if (node.children[0] && $nodes[node.children[0]]?.value.isExtension) childIndex = 1;
          if (addChild(childIndex, 0)) {
            focusChild(childIndex, 0);
            history.setPrevAfterFocus($focusId);
          }
        }
      },
      Tab: {
        handle: () => {
          blurSelf();
          focusSibling(index(), -1);
        }
      }
    },
    none: {
      Enter: {
        handle: () => {
          if (consistentEnterBehaviour) {
            if (addSibling(index(), 1)) {
              focusSibling(index(), 1);
              history.setPrevAfterFocus($focusId);
            }
          } else {
            blurSelf();
            if (focusSiblingStrict(index(), 1)) return;
            if (addSibling(index(), 1)) {
              focusSibling(index(), 1);
              history.setPrevAfterFocus($focusId);
            }
          }
        }
      },
      Backspace: {
        handle: () => {
          blurSelf();
          deleteSelf(index());
          history.setPrevAfterFocus($focusId);
        },
        // only delete if content is empty or is an extension and there are no children
        require: () => ((content?.length ?? 1) == 0 || (box?.isExtension ?? false)) && node.children.length == 0
      },
      ArrowUp: {
        handle: () => {
          blurSelf();
          if (!focusAdjacent("up")) {
            if (node.level == 1) {
              focusParent();
            } else {
              focusSelf();
            }
          }
        }
      },
      ArrowDown: {
        handle: () => {
          blurSelf();
          focusAdjacent("down") || focusSelf();
        }
      },
      Tab: {
        handle: () => {
          blurSelf();
          focusSibling(index(), 1, tabReturnsToParent);
        }
      },
      ArrowLeft: {
        handle: () => {
          focusParent();
        }
      },
      ArrowRight: {
        handle: () => {
          blurSelf();
          if (node.children.length > 0) {
            focusChild(0, 0);
          } else {
            focusSelf();
          }
        }
      }
    },
    control: {
      l: {
        handle: () => {
          if (!isFolded && node.children.length == 0) {
            return;
          }
          toggleFold();
        }
      }
    }
  };
  createKeyDownHandler(keyComboOptionsIndex);
  function formatSelf(format) {
    const boxId = checkIdBox($nodes, id);
    if (boxId == null) return;
    toggleBoxFormat(boxId, format);
    updateNodeData();
  }
  function addChild(childIndex, direction) {
    let newChildIndex = childIndex + direction;
    if (node.level < columnCount) {
      addNewBox(id, newChildIndex);
      return true;
    } else {
      focusSelf();
      return false;
    }
  }
  function addExtentionChild() {
    if (node.children.length >= 1 && $nodes[node.children[0]]?.value.isExtension) {
      return false;
    }
    if (node.level < columnCount - 1) {
      addNewExtension(id);
      return true;
    } else {
      focusSelf();
      return false;
    }
  }
  async function deleteChild(childIndex) {
    if (node.children.length > 1 || node.level >= 1) {
      if (box?.empty && node.children.length == 1) {
        deleteSelf(index());
        return;
      }
      let deleteId = node.children[childIndex];
      if ($focusId == deleteId) {
        set_store_value(focusId, $focusId = null, $focusId);
      }
      await tick();
      const childIsExtension = $nodes[deleteId] ? $nodes[deleteId].value.isExtension : false;
      deleteBox(deleteId);
      if (childIsExtension) {
        focusSelf();
      } else if (node.children[childIndex - 1]) {
        focusChild(childIndex - 1, 0);
      } else if (node.children.length == 0) {
        focusSelf();
      } else if (childIndex == 0) {
        focusChild(0, 0);
      }
      return true;
    } else {
      focusChild(0, 0);
      return false;
    }
  }
  function focusChild(childIndex, direction, defaultToSelf) {
    let newChildIndex = childIndex + direction;
    if (newChildIndex < 0) {
      focusSelf();
      return;
    }
    if (newChildIndex >= node.children.length) {
      if (defaultToSelf) {
        focusSelf();
        return;
      }
      let lastChild = $nodes[node.children[node.children.length - 1]];
      if (lastChild == null) return;
      if (lastChild.children.length > 0) {
        let grandChildId = lastChild.children[0];
        set_store_value(focusId, $focusId = grandChildId, $focusId);
      } else {
        set_store_value(focusId, $focusId = id, $focusId);
      }
    } else {
      let child = $nodes[node.children[newChildIndex]];
      if (child == null) return;
      if (child.value.empty && direction != 0) {
        focusChild(newChildIndex, direction, defaultToSelf);
      } else {
        set_store_value(focusId, $focusId = node.children[newChildIndex], $focusId);
      }
    }
  }
  function focusChildStrict(childIndex, direction) {
    let newChildIndex = childIndex + direction;
    if (newChildIndex < 0 || newChildIndex >= node.children.length) {
      return false;
    }
    let child = $nodes[node.children[newChildIndex]];
    if (child == null) return false;
    if (child.value.empty && direction != 0) {
      return focusChildStrict(newChildIndex, direction);
    } else {
      set_store_value(focusId, $focusId = node.children[newChildIndex], $focusId);
      return true;
    }
  }
  function focusGrandchildStrict(childIndex, grandchildIndex) {
    if (childIndex >= node.children.length) {
      return false;
    }
    let child = $nodes[node.children[childIndex]];
    if (!child) return false;
    if (grandchildIndex >= child.children.length) {
      return false;
    }
    set_store_value(focusId, $focusId = child.children[grandchildIndex], $focusId);
    return true;
  }
  function focusAdjacent(direction) {
    let boxId = checkIdBox($nodes, id);
    if (boxId == null) return false;
    while (true) {
      let adjacentBox = getAdjacentBox($nodes, boxId, direction);
      if (adjacentBox == null) return false;
      if (getNode($nodes, adjacentBox).unwrap().value.empty) {
        boxId = adjacentBox;
        continue;
      } else {
        set_store_value(focusId, $focusId = adjacentBox, $focusId);
        return true;
      }
    }
  }
  function focusSelf() {
    if (box?.empty) {
      focusParent();
    } else {
      set_store_value(focusId, $focusId = id, $focusId);
    }
  }
  function blurSelf() {
    if ($focusId == id) {
      set_store_value(focusId, $focusId = null, $focusId);
    }
  }
  let palette;
  let outsidePalette;
  let content;
  function syncNodesToContent() {
    if (box == null) return;
    if (content != box.content) {
      content = box.content;
    }
  }
  function getIsFolded(folded2) {
    let boxId = checkIdBox($nodes, id);
    if (boxId == null) return false;
    return folded2.get(boxId) ?? false;
  }
  function toggleFold() {
    let boxId = checkIdBox($nodes, id);
    if (boxId == null) return;
    let foldState = $folded.get(boxId) ?? false;
    $folded.set(boxId, !foldState);
    folded.set($folded);
  }
  let updateTextHeight = void 0;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.parentIsEmpty === void 0 && $$bindings.parentIsEmpty && parentIsEmpty !== void 0) $$bindings.parentIsEmpty(parentIsEmpty);
  if ($$props.addSibling === void 0 && $$bindings.addSibling && addSibling !== void 0) $$bindings.addSibling(addSibling);
  if ($$props.deleteSelf === void 0 && $$bindings.deleteSelf && deleteSelf !== void 0) $$bindings.deleteSelf(deleteSelf);
  if ($$props.focusSibling === void 0 && $$bindings.focusSibling && focusSibling !== void 0) $$bindings.focusSibling(focusSibling);
  if ($$props.focusSiblingStrict === void 0 && $$bindings.focusSiblingStrict && focusSiblingStrict !== void 0) $$bindings.focusSiblingStrict(focusSiblingStrict);
  if ($$props.focusParent === void 0 && $$bindings.focusParent && focusParent !== void 0) $$bindings.focusParent(focusParent);
  if ($$props.dispatchSelfFocus === void 0 && $$bindings.dispatchSelfFocus && dispatchSelfFocus !== void 0) $$bindings.dispatchSelfFocus(dispatchSelfFocus);
  $$result.css.add(css$m);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      updateNodeData();
    }
    {
      focusChange();
    }
    {
      {
        let isEvenLevel = node.level % 2 == 0;
        let invertColor = isEvenLevel !== invert;
        palette = invertColor ? "accent-secondary" : "accent";
        outsidePalette = invertColor ? "accent" : "accent-secondary";
      }
    }
    {
      syncNodesToContent();
    }
    isFolded = getIsFolded($folded);
    $$rendered = `<div class="${[
      escape(null_to_empty(`box top palette-${palette}`), true) + " svelte-lfoydy",
      (node.children.length == 0 ? "childless" : "") + " " + (box?.empty ? "empty" : "") + " " + ($focusId == id ? "focus" : "") + " " + (childFocus ? "childFocus" : "") + " " + ($activeMouse ? "activeMouse" : "") + " " + (childFocus || $focusId == id ? "highlight" : "")
    ].join(" ").trim()}">${box?.empty ? `<div class="content svelte-lfoydy"></div>` : `<div class="${[
      "content svelte-lfoydy",
      (box == null ? "root" : "") + " " + (node.children.length > 0 ? "left" : "") + " " + (index() == 0 && node.level > 1 && !parentIsEmpty ? "right" : "")
    ].join(" ").trim()}"${add_attribute("style", `--this-background: none`, 0)}><div class="barcontainer svelte-lfoydy">   <div class="${[
      "line above svelte-lfoydy",
      (node.children.length > 0 ? "left" : "") + " " + (index() == 0 && node.level > 1 && !parentIsEmpty ? "right" : "")
    ].join(" ").trim()}" role="separator"></div> <div class="${[
      "text svelte-lfoydy",
      (box?.crossed ? "crossed" : "") + " " + (box?.bold ? "bold" : "")
    ].join(" ").trim()}">${box != null ? `${validate_component(Text, "Text").$$render(
      $$result,
      {
        bold: box.bold ? true : false,
        placeholder: box.placeholder ?? (node.level == 1 && index() == 0 ? "type here" : ""),
        readonly: box?.isExtension ?? false,
        value: content,
        this: textarea,
        autoHeight: updateTextHeight,
        textHeight: extensionIconSize
      },
      {
        value: ($$value) => {
          content = $$value;
          $$settled = false;
        },
        this: ($$value) => {
          textarea = $$value;
          $$settled = false;
        },
        autoHeight: ($$value) => {
          updateTextHeight = $$value;
          $$settled = false;
        },
        textHeight: ($$value) => {
          extensionIconSize = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}</div> ${box?.isExtension ? `<div class="extensionIcon svelte-lfoydy">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        name: "arrowRightThroughCircle",
        size: extensionIconSize + "px"
      },
      {},
      {}
    )}</div>` : ``}    <div class="line below svelte-lfoydy" role="separator"></div></div> ${!isFolded && node.children.length == 0 && node.level < columnCount ? `<button class="${escape(null_to_empty(`add palette-${outsidePalette}`), true) + " svelte-lfoydy"}">${validate_component(Icon, "Icon").$$render($$result, { name: "add" }, {}, {})}</button>` : ``} ${isFolded ? `<button class="${escape(null_to_empty(`unfoldButton foldParent palette-${outsidePalette}`), true) + " svelte-lfoydy"}">${validate_component(Fold, "Fold").$$render($$result, {}, {}, {})}</button>` : ``}</div>`} <ul class="${["children svelte-lfoydy", isFolded ? "isFolded" : ""].join(" ").trim()}">${each(node.children, (childId, _) => {
      return `${validate_component(Box, "svelte:self").$$render(
        $$result,
        {
          id: childId,
          addSibling: addChild,
          deleteSelf: deleteChild,
          focusSibling: focusChild,
          focusSiblingStrict: focusChildStrict,
          focusParent: focusSelf,
          dispatchSelfFocus: onChildFocus,
          parentIsEmpty: box?.empty ?? false
        },
        {},
        {}
      )}`;
    })}</ul> </div>`;
  } while (!$$settled);
  $$unsubscribe_folded();
  $$unsubscribe_nodes();
  $$unsubscribe_pendingAction();
  $$unsubscribe_focusId();
  $$unsubscribe_activeMouse();
  return $$rendered;
});
const css$l = {
  code: ".top.svelte-hup1mp.svelte-hup1mp{position:relative;width:var(--column-width);height:calc(var(--button-size) + var(--padding) * 2);text-align:center;box-sizing:border-box;user-select:none;display:flex;justify-content:center;align-items:center;flex-direction:row}.text.svelte-hup1mp.svelte-hup1mp{padding:var(--padding)}.add.svelte-hup1mp.svelte-hup1mp{position:absolute;right:0;opacity:0;overflow:show;transition:opacity var(--transition-speed)}.top.svelte-hup1mp:hover .add.svelte-hup1mp{opacity:1}",
  map: '{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Button from \\"./Button.svelte\\";\\nexport let column;\\nexport let addEmpty;\\n<\/script>\\n\\n<div class=\\"top\\">\\n\\t<div class=\\"text\\">\\n\\t\\t{column}\\n\\t</div>\\n\\t<div class=\\"add\\">\\n\\t\\t<Button icon=\\"add\\" on:click={addEmpty} />\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tposition: relative;\\n\\t\\twidth: var(--column-width);\\n\\t\\theight: calc(var(--button-size) + var(--padding) * 2);\\n\\t\\ttext-align: center;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tuser-select: none;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tflex-direction: row;\\n\\t}\\n\\t.text {\\n\\t\\tpadding: var(--padding);\\n\\t}\\n\\t.add {\\n\\t\\tposition: absolute;\\n\\t\\tright: 0;\\n\\t\\topacity: 0;\\n\\t\\toverflow: show;\\n\\t\\ttransition: opacity var(--transition-speed);\\n\\t}\\n\\t.top:hover .add {\\n\\t\\topacity: 1;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAeC,gCAAK,CACJ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,MAAM,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACrD,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,UAAU,CACtB,WAAW,CAAE,IAAI,CACjB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,GACjB,CACA,iCAAM,CACL,OAAO,CAAE,IAAI,SAAS,CACvB,CACA,gCAAK,CACJ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,IAAI,CACd,UAAU,CAAE,OAAO,CAAC,IAAI,kBAAkB,CAC3C,CACA,kBAAI,MAAM,CAAC,kBAAK,CACf,OAAO,CAAE,CACV"}'
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { column } = $$props;
  let { addEmpty } = $$props;
  if ($$props.column === void 0 && $$bindings.column && column !== void 0) $$bindings.column(column);
  if ($$props.addEmpty === void 0 && $$bindings.addEmpty && addEmpty !== void 0) $$bindings.addEmpty(addEmpty);
  $$result.css.add(css$l);
  return `<div class="top svelte-hup1mp"><div class="text svelte-hup1mp">${escape(column)}</div> <div class="add svelte-hup1mp">${validate_component(Button, "Button").$$render($$result, { icon: "add" }, {}, {})}</div> </div>`;
});
const css$k = {
  code: ".top.svelte-1nplt9v{width:calc(var(--column-width) * var(--column-count));overflow:hidden}.top.svelte-1nplt9v{--this-background:var(--background-secondary);--this-background-secondary:var(--background);--this-accent-text:var(--accent-secondary-text);--this-accent-secondary-text:var(--accent-text)}.top.invert.svelte-1nplt9v{--this-background:var(--background);--this-background-secondary:var(--background-secondary);--this-accent-text:var(--accent-text);--this-accent-secondary-text:var(--accent-secondary-text)}.viewer.svelte-1nplt9v{position:relative;width:max-content;margin:auto;height:var(--view-height);overflow:hidden;display:flex;flex-direction:row}.headers.svelte-1nplt9v{position:relative;display:flex;flex-direction:row;width:auto;z-index:3;height:2.4em;transform:translateX(-100%);background:var(--background)}.header.svelte-1nplt9v{border-radius:var(--border-radius) var(--border-radius) 0 0;background:var(--this-background);color:var(--this-text)}.columns.svelte-1nplt9v{position:relative;display:flex;flex-direction:row;width:max-content;height:var(--view-height);transform:translateX(-200%);pointer-events:none;z-index:-2}.column.svelte-1nplt9v{height:100%;width:var(--column-width);border-radius:var(--border-radius);background-color:var(--this-background)}.content.svelte-1nplt9v{padding-bottom:calc(var(--view-height) * 0.6);padding-top:calc(2.4em + var(--padding));width:calc(var(--column-width) * var(--column-count));height:var(--view-height);overflow-x:clip;overflow-y:auto;box-sizing:border-box}",
  map: '{"version":3,"file":"Flow.svelte","sources":["Flow.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Box from \\"./Box.svelte\\";\\nimport Header from \\"./Header.svelte\\";\\nimport { setContext } from \\"svelte\\";\\nimport { focusId } from \\"$lib/models/focus\\";\\nimport { nodes } from \\"$lib/models/store\\";\\nimport { addNewEmpty } from \\"$lib/models/nodeDecorateAction\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nexport let flowId;\\nlet node;\\n$: {\\n  if ($nodes[flowId] != null) {\\n    node = $nodes[flowId];\\n  }\\n}\\n$: flow = node.value;\\nsetContext(\\"invert\\", () => {\\n  return flow.invert;\\n});\\nsetContext(\\"columnCount\\", () => {\\n  return flow.columns.length;\\n});\\nfunction addEmpty(column) {\\n  let id = addNewEmpty(flowId, column);\\n  $focusId = id;\\n}\\nfunction fixScroll(event) {\\n  const el = event.currentTarget;\\n  if (el.scrollLeft !== 0) {\\n    el.scrollLeft = 0;\\n  }\\n}\\n<\/script>\\n\\n<div class=\\"top\\" class:invert={flow.invert} style={`--column-count: ${flow.columns.length};`}>\\n\\t<div class=\\"viewer\\">\\n\\t\\t<div class=\\"content\\" class:customScrollbar={settings.data.customScrollbar.value} on:scroll={fixScroll}>\\n\\t\\t\\t<Box id={flowId} />\\n\\t\\t</div>\\n\\t\\t<div class=\\"headers\\">\\n\\t\\t\\t{#each flow.columns as column, index}\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass={`header palette-${!!(index % 2) == flow.invert ? \'accent\' : \'accent-secondary\'}`}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<Header {column} on:focusFlow addEmpty={() => addEmpty(index)} />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t\\t<div class=\\"columns\\">\\n\\t\\t\\t{#each flow.columns as col, index}\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass={`column palette-${!!(index % 2) == flow.invert ? \'plain\' : \'plain-secondary\'}`}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\twidth: calc(var(--column-width) * var(--column-count));\\n\\t\\toverflow: hidden;\\n\\t}\\n\\t.top {\\n\\t\\t--this-background: var(--background-secondary);\\n\\t\\t--this-background-secondary: var(--background);\\n\\t\\t--this-accent-text: var(--accent-secondary-text);\\n\\t\\t--this-accent-secondary-text: var(--accent-text);\\n\\t}\\n\\t.top.invert {\\n\\t\\t--this-background: var(--background);\\n\\t\\t--this-background-secondary: var(--background-secondary);\\n\\t\\t--this-accent-text: var(--accent-text);\\n\\t\\t--this-accent-secondary-text: var(--accent-secondary-text);\\n\\t}\\n\\t.viewer {\\n\\t\\tposition: relative;\\n\\t\\twidth: max-content;\\n\\t\\tmargin: auto;\\n\\t\\theight: var(--view-height);\\n\\t\\toverflow: hidden;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t}\\n\\t.headers {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\twidth: auto;\\n\\t\\tz-index: 3;\\n\\t\\theight: 2.4em;\\n\\t\\ttransform: translateX(-100%);\\n\\t\\tbackground: var(--background);\\n\\t}\\n\\t.header {\\n\\t\\tborder-radius: var(--border-radius) var(--border-radius) 0 0;\\n\\t\\tbackground: var(--this-background);\\n\\t\\tcolor: var(--this-text);\\n\\t}\\n\\n\\t.columns {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\twidth: max-content;\\n\\t\\theight: var(--view-height);\\n\\t\\ttransform: translateX(-200%);\\n\\t\\tpointer-events: none;\\n\\t\\tz-index: -2;\\n\\t}\\n\\t.column {\\n\\t\\theight: 100%;\\n\\t\\twidth: var(--column-width);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tbackground-color: var(--this-background);\\n\\t}\\n\\n\\t.content {\\n\\t\\tpadding-bottom: calc(var(--view-height) * 0.6);\\n\\t\\tpadding-top: calc(2.4em + var(--padding));\\n\\t\\twidth: calc(var(--column-width) * var(--column-count));\\n\\t\\theight: var(--view-height);\\n\\t\\toverflow-x: clip;\\n\\t\\toverflow-y: auto;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA0DC,mBAAK,CACJ,KAAK,CAAE,KAAK,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CACtD,QAAQ,CAAE,MACX,CACA,mBAAK,CACJ,iBAAiB,CAAE,2BAA2B,CAC9C,2BAA2B,CAAE,iBAAiB,CAC9C,kBAAkB,CAAE,4BAA4B,CAChD,4BAA4B,CAAE,kBAC/B,CACA,IAAI,sBAAQ,CACX,iBAAiB,CAAE,iBAAiB,CACpC,2BAA2B,CAAE,2BAA2B,CACxD,kBAAkB,CAAE,kBAAkB,CACtC,4BAA4B,CAAE,4BAC/B,CACA,sBAAQ,CACP,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,WAAW,CAClB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,QAAQ,CAAE,MAAM,CAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GACjB,CACA,uBAAS,CACR,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,KAAK,CACb,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,UAAU,CAAE,IAAI,YAAY,CAC7B,CACA,sBAAQ,CACP,aAAa,CAAE,IAAI,eAAe,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,CAAC,CAAC,CAAC,CAC5D,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,KAAK,CAAE,IAAI,WAAW,CACvB,CAEA,uBAAS,CACR,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,KAAK,CAAE,WAAW,CAClB,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,cAAc,CAAE,IAAI,CACpB,OAAO,CAAE,EACV,CACA,sBAAQ,CACP,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,gBAAgB,CAAE,IAAI,iBAAiB,CACxC,CAEA,uBAAS,CACR,cAAc,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9C,WAAW,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CACzC,KAAK,CAAE,KAAK,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CACtD,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,UACb"}'
};
const Flow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let flow;
  let $focusId, $$unsubscribe_focusId;
  let $nodes, $$unsubscribe_nodes;
  $$unsubscribe_focusId = subscribe(focusId, (value) => $focusId = value);
  $$unsubscribe_nodes = subscribe(nodes, (value) => $nodes = value);
  let { flowId } = $$props;
  let node;
  setContext("invert", () => {
    return flow.invert;
  });
  setContext("columnCount", () => {
    return flow.columns.length;
  });
  function addEmpty(column) {
    let id = addNewEmpty(flowId, column);
    set_store_value(focusId, $focusId = id, $focusId);
  }
  if ($$props.flowId === void 0 && $$bindings.flowId && flowId !== void 0) $$bindings.flowId(flowId);
  $$result.css.add(css$k);
  {
    {
      if ($nodes[flowId] != null) {
        node = $nodes[flowId];
      }
    }
  }
  flow = node.value;
  $$unsubscribe_focusId();
  $$unsubscribe_nodes();
  return `<div class="${["top svelte-1nplt9v", flow.invert ? "invert" : ""].join(" ").trim()}"${add_attribute("style", `--column-count: ${flow.columns.length};`, 0)}><div class="viewer svelte-1nplt9v"><div class="${[
    "content svelte-1nplt9v",
    settings.data.customScrollbar.value ? "customScrollbar" : ""
  ].join(" ").trim()}">${validate_component(Box, "Box").$$render($$result, { id: flowId }, {}, {})}</div> <div class="headers svelte-1nplt9v">${each(flow.columns, (column, index) => {
    return `<div class="${escape(
      null_to_empty(`header palette-${!!(index % 2) == flow.invert ? "accent" : "accent-secondary"}`),
      true
    ) + " svelte-1nplt9v"}">${validate_component(Header, "Header").$$render($$result, { column, addEmpty: () => addEmpty(index) }, {}, {})} </div>`;
  })}</div> <div class="columns svelte-1nplt9v">${each(flow.columns, (col, index) => {
    return `<div class="${escape(
      null_to_empty(`column palette-${!!(index % 2) == flow.invert ? "plain" : "plain-secondary"}`),
      true
    ) + " svelte-1nplt9v"}"></div>`;
  })}</div></div> </div>`;
});
const css$j = {
  code: ".top.svelte-u08vkz{font-size:1.5rem;display:flex;flex-direction:row;box-sizing:border-box;height:var(--title-height);min-width:15ch}.content.svelte-u08vkz{width:100%;color:var(--this-text);display:flex;flex-direction:row;gap:var(--padding);padding-right:var(--padding)}.text.svelte-u08vkz{padding:var(--padding) var(--padding);border-radius:var(--border-radius);width:100%;transition:background var(--transition-speed)}.text.focus.svelte-u08vkz{background-color:var(--this-background-active)}.button.svelte-u08vkz{padding:var(--padding) 0}",
  map: '{"version":3,"file":"Title.svelte","sources":["Title.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Text from \\"./Text.svelte\\";\\nimport Button from \\"./Button.svelte\\";\\nimport { onMount, tick } from \\"svelte\\";\\nimport { createKeyDownHandler } from \\"$lib/models/key\\";\\nimport { focusId } from \\"$lib/models/focus\\";\\nimport { history } from \\"$lib/models/history\\";\\nimport { nodes, pendingAction } from \\"$lib/models/store\\";\\nimport { newUpdateAction } from \\"$lib/models/nodeDecorateAction\\";\\nexport let flowId;\\nexport let deleteSelf = () => {\\n};\\nlet node;\\n$: {\\n  let newNode = $nodes[flowId];\\n  if (newNode != null) {\\n    node = newNode;\\n  }\\n}\\n$: flow = node.value;\\nlet textarea;\\nfunction handleBlur() {\\n  if ($focusId == flowId) {\\n    $focusId = null;\\n  }\\n}\\nasync function handleFocus() {\\n  await tick();\\n  if ($focusId != flowId) {\\n    $focusId = flowId;\\n  }\\n}\\nfunction focusFirstChild() {\\n  let childId = node.children.find((childId2) => {\\n    const child = $nodes[childId2];\\n    return child && !child.value.empty;\\n  });\\n  if (childId) {\\n    $focusId = childId;\\n  }\\n}\\nconst handleKeydown = createKeyDownHandler({\\n  none: {\\n    Enter: {\\n      handle: focusFirstChild\\n    },\\n    ArrowDown: {\\n      handle: focusFirstChild\\n    },\\n    ArrowRight: {\\n      handle: focusFirstChild\\n    }\\n  }\\n});\\nfunction focusChange() {\\n  if ($focusId == flowId) {\\n    textarea && textarea.focus();\\n  }\\n}\\nonMount(focusChange);\\n$: $focusId, focusChange();\\n$: flow, syncNodesToContent();\\nlet content;\\nfunction syncNodesToContent() {\\n  if (content != flow.content) {\\n    content = flow.content;\\n  }\\n}\\nlet editAlreadyPending = false;\\nfunction handleBeforeInput() {\\n  if (editAlreadyPending) return;\\n  editAlreadyPending = true;\\n  $pendingAction = {\\n    beforeFocusId: flowId,\\n    afterFocusId: flowId,\\n    ownerId: flowId,\\n    action: function() {\\n      editAlreadyPending = false;\\n      return newUpdateAction(flowId, { ...flow, content });\\n    }\\n  };\\n}\\nlet palette = \\"plain\\";\\n$: {\\n  if (flow.invert) {\\n    palette = \\"accent-secondary\\";\\n  } else {\\n    palette = \\"accent\\";\\n  }\\n}\\n<\/script>\\n\\n<div class={`top`} class:invert={flow.invert}>\\n\\t<div class={`content palette-${palette}`}>\\n\\t\\t<div class=\\"text\\" class:focus={flowId == $focusId}>\\n\\t\\t\\t<Text\\n\\t\\t\\t\\ton:blur={handleBlur}\\n\\t\\t\\t\\ton:focus={handleFocus}\\n\\t\\t\\t\\ton:keydown={handleKeydown}\\n\\t\\t\\t\\ton:beforeinput={handleBeforeInput}\\n\\t\\t\\t\\tbind:value={content}\\n\\t\\t\\t\\tbind:this={textarea}\\n\\t\\t\\t\\tnowrap\\n\\t\\t\\t\\tplaceholder=\\"type name here\\"\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t\\t<div class=\\"button\\">\\n\\t\\t\\t<Button on:click={deleteSelf} icon=\\"trash\\" tooltip=\\"delete flow\\" />\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tfont-size: 1.5rem;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tbox-sizing: border-box;\\n\\t\\theight: var(--title-height);\\n\\t\\tmin-width: 15ch;\\n\\t}\\n\\t.content {\\n\\t\\twidth: 100%;\\n\\t\\tcolor: var(--this-text);\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding);\\n\\t\\tpadding-right: var(--padding);\\n\\t}\\n\\t.text {\\n\\t\\tpadding: var(--padding) var(--padding);\\n\\t\\tborder-radius: var(--border-radius);\\n\\n\\t\\twidth: 100%;\\n\\t\\ttransition: background var(--transition-speed);\\n\\t}\\n\\t.text.focus {\\n\\t\\tbackground-color: var(--this-background-active);\\n\\t}\\n\\t.button {\\n\\t\\tpadding: var(--padding) 0;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAgHC,kBAAK,CACJ,SAAS,CAAE,MAAM,CACjB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,IAAI,cAAc,CAAC,CAC3B,SAAS,CAAE,IACZ,CACA,sBAAS,CACR,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,aAAa,CAAE,IAAI,SAAS,CAC7B,CACA,mBAAM,CACL,OAAO,CAAE,IAAI,SAAS,CAAC,CAAC,IAAI,SAAS,CAAC,CACtC,aAAa,CAAE,IAAI,eAAe,CAAC,CAEnC,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,UAAU,CAAC,IAAI,kBAAkB,CAC9C,CACA,KAAK,oBAAO,CACX,gBAAgB,CAAE,IAAI,wBAAwB,CAC/C,CACA,qBAAQ,CACP,OAAO,CAAE,IAAI,SAAS,CAAC,CAAC,CACzB"}'
};
const Title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let flow;
  let $$unsubscribe_pendingAction;
  let $focusId, $$unsubscribe_focusId;
  let $nodes, $$unsubscribe_nodes;
  $$unsubscribe_pendingAction = subscribe(pendingAction, (value) => value);
  $$unsubscribe_focusId = subscribe(focusId, (value) => $focusId = value);
  $$unsubscribe_nodes = subscribe(nodes, (value) => $nodes = value);
  let { flowId } = $$props;
  let { deleteSelf = () => {
  } } = $$props;
  let node;
  let textarea;
  function focusFirstChild() {
    let childId = node.children.find((childId2) => {
      const child = $nodes[childId2];
      return child && !child.value.empty;
    });
    if (childId) {
      set_store_value(focusId, $focusId = childId, $focusId);
    }
  }
  createKeyDownHandler({
    none: {
      Enter: { handle: focusFirstChild },
      ArrowDown: { handle: focusFirstChild },
      ArrowRight: { handle: focusFirstChild }
    }
  });
  function focusChange() {
    if ($focusId == flowId) {
      textarea && textarea.focus();
    }
  }
  let content;
  function syncNodesToContent() {
    if (content != flow.content) {
      content = flow.content;
    }
  }
  let palette = "plain";
  if ($$props.flowId === void 0 && $$bindings.flowId && flowId !== void 0) $$bindings.flowId(flowId);
  if ($$props.deleteSelf === void 0 && $$bindings.deleteSelf && deleteSelf !== void 0) $$bindings.deleteSelf(deleteSelf);
  $$result.css.add(css$j);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        let newNode = $nodes[flowId];
        if (newNode != null) {
          node = newNode;
        }
      }
    }
    flow = node.value;
    {
      focusChange();
    }
    {
      syncNodesToContent();
    }
    {
      {
        if (flow.invert) {
          palette = "accent-secondary";
        } else {
          palette = "accent";
        }
      }
    }
    $$rendered = `<div class="${[
      escape(null_to_empty(`top`), true) + " svelte-u08vkz",
      flow.invert ? "invert" : ""
    ].join(" ").trim()}"><div class="${escape(null_to_empty(`content palette-${palette}`), true) + " svelte-u08vkz"}"><div class="${["text svelte-u08vkz", flowId == $focusId ? "focus" : ""].join(" ").trim()}">${validate_component(Text, "Text").$$render(
      $$result,
      {
        nowrap: true,
        placeholder: "type name here",
        value: content,
        this: textarea
      },
      {
        value: ($$value) => {
          content = $$value;
          $$settled = false;
        },
        this: ($$value) => {
          textarea = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="button svelte-u08vkz">${validate_component(Button, "Button").$$render($$result, { icon: "trash", tooltip: "delete flow" }, {}, {})}</div></div> </div>`;
  } while (!$$settled);
  $$unsubscribe_pendingAction();
  $$unsubscribe_focusId();
  $$unsubscribe_nodes();
  return $$rendered;
});
const css$i = {
  code: ".top.svelte-1w0szyh.svelte-1w0szyh{min-width:0;position:relative;box-sizing:border-box;width:auto;position:relative}.buttons.svelte-1w0szyh.svelte-1w0szyh{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.allButtonsHidden.svelte-1w0szyh .buttons.svelte-1w0szyh{justify-content:center}.showButtons.svelte-1w0szyh.svelte-1w0szyh{display:flex;flex-direction:row;align-items:center;gap:var(--padding)}.hideButtons.svelte-1w0szyh.svelte-1w0szyh{position:relative}.hidden.svelte-1w0szyh.svelte-1w0szyh{z-index:900;position:absolute;top:calc(var(--button-size) + var(--padding) * 2);right:calc(-1 * var(--padding));display:flex;flex-direction:column;align-items:center;gap:var(--padding);padding:var(--padding);background:var(--background-back);border-radius:var(--border-radius)}",
  map: `{"version":3,"file":"ButtonBar.svelte","sources":["ButtonBar.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Button from \\"./Button.svelte\\";\\nimport { onMount, onDestroy } from \\"svelte\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport { hiddenButtons as hiddenButtonsTransition } from \\"$lib/models/transition\\";\\nexport let buttons;\\nexport let showCount = buttons.length;\\nexport let resize = false;\\nlet element;\\nlet buttonSize = settings.data[\\"buttonSize\\"].value;\\nlet padding = settings.data[\\"padding\\"].value;\\nif (resize) {\\n  onDestroy(\\n    settings.subscribe([\\"padding\\"], (key) => {\\n      padding = settings.data[key].value;\\n      handleResize();\\n    })\\n  );\\n  onDestroy(\\n    settings.subscribe([\\"buttonSize\\"], (key) => {\\n      buttonSize = settings.data[key].value;\\n      handleResize();\\n    })\\n  );\\n}\\nlet resizeObserver;\\nonMount(() => {\\n  if (resize) {\\n    resizeObserver = new ResizeObserver(handleResize);\\n    resizeObserver.observe(element);\\n  }\\n});\\nonDestroy(() => {\\n  if (resize) {\\n    resizeObserver.unobserve(element);\\n  }\\n});\\nfunction handleResize() {\\n  if (element == null) return;\\n  let width = element.clientWidth;\\n  showCount = Math.max(0, Math.floor((width + padding) / (buttonSize + padding * 3)) - 1);\\n  if (showCount == buttons.length - 1) {\\n    showCount = buttons.length;\\n  }\\n}\\n$: showButtons = buttons.slice(0, showCount);\\n$: hiddenButtons = buttons.slice(showCount);\\nlet show = false;\\n<\/script>\\n\\n<div class=\\"top\\" bind:this={element} class:allButtonsHidden={showButtons.length == 0}>\\n\\t<div class=\\"buttons\\">\\n\\t\\t<div class=\\"showButtons\\">\\n\\t\\t\\t{#each showButtons as button}\\n\\t\\t\\t\\t<Button {...button} />\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t\\t<div class=\\"hideButtons\\">\\n\\t\\t\\t{#if hiddenButtons.length > 0}\\n\\t\\t\\t\\t<Button icon={show ? 'delete' : 'ellipses'} on:click={() => (show = !show)} />\\n\\t\\t\\t{/if}\\n\\t\\t\\t{#if show && hiddenButtons.length > 0}\\n\\t\\t\\t\\t<div class=\\"hidden\\" transition:hiddenButtonsTransition>\\n\\t\\t\\t\\t\\t{#each hiddenButtons as button}\\n\\t\\t\\t\\t\\t\\t<Button {...button} />\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\t/* min-width: calc(var(--button-size) + var(--padding) * 2); */\\n\\t\\tmin-width: 0;\\n\\t\\tposition: relative;\\n\\t\\tbox-sizing: border-box;\\n\\t\\twidth: auto;\\n\\t\\tposition: relative;\\n\\t}\\n\\t.buttons {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: space-between;\\n\\t}\\n\\t.allButtonsHidden .buttons {\\n\\t\\tjustify-content: center;\\n\\t}\\n\\t.showButtons {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\t.hideButtons {\\n\\t\\tposition: relative;\\n\\t}\\n\\t.hidden {\\n\\t\\tz-index: 900;\\n\\t\\tposition: absolute;\\n\\t\\ttop: calc(var(--button-size) + var(--padding) * 2);\\n\\t\\tright: calc(-1 * var(--padding));\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--padding);\\n\\t\\tpadding: var(--padding);\\n\\t\\tbackground: var(--background-back);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwEC,kCAAK,CAEJ,SAAS,CAAE,CAAC,CACZ,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,UAAU,CACtB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QACX,CACA,sCAAS,CACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAClB,CACA,gCAAiB,CAAC,uBAAS,CAC1B,eAAe,CAAE,MAClB,CACA,0CAAa,CACZ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,SAAS,CACnB,CACA,0CAAa,CACZ,QAAQ,CAAE,QACX,CACA,qCAAQ,CACP,OAAO,CAAE,GAAG,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAClD,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAChC,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,aAAa,CAAE,IAAI,eAAe,CACnC"}`
};
const ButtonBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showButtons;
  let hiddenButtons;
  let { buttons } = $$props;
  let { showCount = buttons.length } = $$props;
  let { resize = false } = $$props;
  let element;
  settings.data["buttonSize"].value;
  settings.data["padding"].value;
  if (resize) {
    onDestroy(settings.subscribe(["padding"], (key) => {
      settings.data[key].value;
    }));
    onDestroy(settings.subscribe(["buttonSize"], (key) => {
      settings.data[key].value;
    }));
  }
  let resizeObserver;
  onDestroy(() => {
    if (resize) {
      resizeObserver.unobserve(element);
    }
  });
  if ($$props.buttons === void 0 && $$bindings.buttons && buttons !== void 0) $$bindings.buttons(buttons);
  if ($$props.showCount === void 0 && $$bindings.showCount && showCount !== void 0) $$bindings.showCount(showCount);
  if ($$props.resize === void 0 && $$bindings.resize && resize !== void 0) $$bindings.resize(resize);
  $$result.css.add(css$i);
  showButtons = buttons.slice(0, showCount);
  hiddenButtons = buttons.slice(showCount);
  return `<div class="${["top svelte-1w0szyh", showButtons.length == 0 ? "allButtonsHidden" : ""].join(" ").trim()}"${add_attribute("this", element, 0)}><div class="buttons svelte-1w0szyh"><div class="showButtons svelte-1w0szyh">${each(showButtons, (button) => {
    return `${validate_component(Button, "Button").$$render($$result, Object.assign({}, button), {}, {})}`;
  })}</div> <div class="hideButtons svelte-1w0szyh">${hiddenButtons.length > 0 ? `${validate_component(Button, "Button").$$render($$result, { icon: "ellipses" }, {}, {})}` : ``} ${``}</div></div> </div>`;
});
const css$h = {
  code: ".top.svelte-aroqqm{padding:var(--padding);display:flex;flex-direction:row;box-sizing:border-box;height:var(--title-height);width:auto;position:relative}",
  map: `{"version":3,"file":"BoxControl.svelte","sources":["BoxControl.svelte"],"sourcesContent":["<script lang=\\"ts\\">import ButtonBar from \\"./ButtonBar.svelte\\";\\nimport { afterUpdate, onDestroy, tick } from \\"svelte\\";\\nimport { checkIdBox } from \\"../models/node\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport { history } from \\"$lib/models/history\\";\\nimport { focusId, lastFocusIds, selectedFlowId } from \\"$lib/models/focus\\";\\nimport { nodes, pendingAction } from \\"$lib/models/store\\";\\nimport { addNewBox, addNewExtension, deleteBox, toggleBoxFormat } from \\"$lib/models/nodeDecorateAction\\";\\nimport { folded } from \\"$lib/models/fold\\";\\nexport let flowId;\\nlet disabledReason = \\"no cell selected\\";\\nlet targetId = null;\\nasync function setValidTargetId() {\\n  await tick();\\n  if ($focusId == null) {\\n    targetId = null;\\n    return;\\n  }\\n  targetId = checkIdBox($nodes, $lastFocusIds[flowId]);\\n}\\nafterUpdate(function() {\\n  setValidTargetId();\\n});\\nfunction targetBox() {\\n  if (targetId == null) return null;\\n  let target = $nodes[targetId];\\n  if (target == null) return null;\\n  return target;\\n}\\nasync function deleteBoxAndFocus() {\\n  if (targetId == null) return;\\n  let target = $nodes[targetId];\\n  if (target == null) return;\\n  let parent = $nodes[target.parent];\\n  if (parent == null) return;\\n  if (target.children.length > 1 || parent.level >= 1) {\\n    $focusId = null;\\n    let targetIndex = parent.children.indexOf(targetId);\\n    await tick();\\n    deleteBox(targetId);\\n    if (target.children.length <= 0) {\\n      $focusId = target.parent;\\n    } else if (targetIndex >= parent.children.length) {\\n      $focusId = parent.children[parent.children.length - 1];\\n    } else {\\n      $focusId = parent.children[targetIndex];\\n    }\\n    history.setPrevAfterFocus($focusId);\\n  }\\n}\\nfunction addChild() {\\n  if (targetId == null) return;\\n  if ($selectedFlowId == null) return;\\n  let target = $nodes[targetId];\\n  if (target == null) return;\\n  let currentFlow = $nodes[$selectedFlowId];\\n  if (currentFlow == null) return;\\n  let addIndex = 0;\\n  if (target.children[0] && $nodes[target.children[0]]?.value.isExtension) {\\n    addIndex = 1;\\n  }\\n  if (target.level < currentFlow.value.columns.length) {\\n    addNewBox(targetId, addIndex);\\n  }\\n}\\nfunction addSibling(direction) {\\n  if (targetId == null) return;\\n  let target = $nodes[targetId];\\n  if (target == null) return;\\n  let parent = $nodes[target.parent];\\n  if (parent == null) return;\\n  let targetIndex = parent.children.indexOf(targetId);\\n  let newBoxIndex = targetIndex + direction;\\n  addNewBox(target.parent, newBoxIndex);\\n}\\nfunction extendArgument() {\\n  if (targetId == null) return;\\n  if ($selectedFlowId == null) return;\\n  let target = $nodes[targetId];\\n  if (target == null) return;\\n  let currentFlow = $nodes[$selectedFlowId];\\n  if (currentFlow == null) return;\\n  if (target.children.length >= 1 && $nodes[target.children[0]]?.value.isExtension) {\\n    return;\\n  }\\n  if (target.level < currentFlow.value.columns.length - 1) {\\n    addNewExtension(targetId);\\n    const grandchildId = $nodes[target.children[0]]?.children[0];\\n    $focusId = grandchildId ? grandchildId : targetId;\\n    return;\\n  }\\n}\\nfunction toggleFormat(format) {\\n  if (targetId == null) return;\\n  toggleBoxFormat(targetId, format);\\n}\\nfunction toggleFold() {\\n  if (targetId == null) return;\\n  if ($folded.get(targetId)) {\\n    $folded.delete(targetId);\\n  } else {\\n    $folded.set(targetId, true);\\n  }\\n  $folded = $folded;\\n}\\nfunction preventBlur(e) {\\n  e.preventDefault();\\n}\\nlet buttonGroups = getButtonGroups();\\nfunction getButtonGroups() {\\n  return {\\n    showUndoRedoButtons: [\\n      {\\n        icon: \\"undo\\",\\n        disabled: !history.canUndo(flowId, $pendingAction),\\n        onclick: () => {\\n          history.undo(flowId, $pendingAction);\\n        },\\n        tooltip: \\"undo\\",\\n        shortcut: [\\"commandControl\\", \\"z\\"],\\n        disabledReason: \\"nothing to undo\\"\\n      },\\n      {\\n        disabled: !history.canRedo(flowId, $pendingAction),\\n        icon: \\"redo\\",\\n        onclick: () => {\\n          history.redo(flowId, $pendingAction);\\n        },\\n        tooltip: \\"redo\\",\\n        shortcut: [\\"commandControl\\", \\"shift\\", \\"z\\"],\\n        disabledReason: \\"nothing to redo\\"\\n      }\\n    ],\\n    showBoxCreationButtons: [\\n      {\\n        icon: \\"addRight\\",\\n        onclick: addChild,\\n        disabled: targetId == null,\\n        tooltip: \\"add response\\",\\n        shortcut: [\\"shift\\", \\"return\\"],\\n        disabledReason\\n      },\\n      {\\n        icon: \\"addUp\\",\\n        onclick: () => addSibling(0),\\n        disabled: targetId == null || targetBox()?.value.isExtension,\\n        tooltip: \\"add argument above\\",\\n        shortcut: [\\"option\\", \\"return\\"],\\n        disabledReason: targetBox()?.value.isExtension ? \\"can't add responses above extensions\\" : disabledReason\\n      },\\n      {\\n        icon: \\"addDown\\",\\n        onclick: () => addSibling(1),\\n        disabled: targetId == null,\\n        tooltip: \\"add argument below\\",\\n        shortcut: [\\"return\\"],\\n        disabledReason\\n      },\\n      {\\n        icon: \\"trash\\",\\n        onclick: deleteBoxAndFocus,\\n        disabled: targetId == null,\\n        tooltip: \\"delete selected\\",\\n        shortcut: [\\"commandControl\\", \\"delete\\"],\\n        disabledReason\\n      }\\n    ],\\n    showQuickExtensionButtons: [\\n      {\\n        icon: \\"arrowRightThroughCircle\\",\\n        onclick: extendArgument,\\n        disabled: targetId == null || targetBox()?.children[0] && $nodes[targetBox()?.children[0]]?.value.isExtension || targetBox()?.value.isExtension,\\n        tooltip: \\"extend selected\\",\\n        shortcut: [\\"commandControl\\", \\"e\\"],\\n        disabledReason: targetBox()?.children[0] && $nodes[targetBox()?.children[0]]?.value.isExtension ? \\"can't extend an extended argument\\" : targetBox()?.value.isExtension ? \\"can't extend an extension\\" : disabledReason\\n      }\\n    ],\\n    showBoxFormatButtons: [\\n      {\\n        icon: \\"cross\\",\\n        onclick: () => toggleFormat(\\"crossed\\"),\\n        disabled: targetId == null || targetBox()?.value.isExtension,\\n        tooltip: \\"toggle crossed out\\",\\n        shortcut: [\\"commandControl\\", \\"shift\\", \\"x\\"],\\n        toggled: targetBox()?.value?.crossed,\\n        disabledReason: targetBox()?.value.isExtension ? \\"can't cross out an extension\\" : disabledReason\\n      },\\n      {\\n        icon: \\"letterB\\",\\n        onclick: () => toggleFormat(\\"bold\\"),\\n        disabled: targetId == null || targetBox()?.value.isExtension,\\n        tooltip: \\"toggle bold\\",\\n        shortcut: [\\"commandControl\\", \\"b\\"],\\n        toggled: targetBox()?.value?.bold,\\n        disabledReason: targetBox()?.value.isExtension ? \\"can't bold an extension\\" : disabledReason\\n      },\\n      {\\n        icon: \\"foldArrows\\",\\n        onclick: () => toggleFold(),\\n        disabled: targetId == null || targetBox()?.children?.length === 0,\\n        tooltip: \\"toggle folded\\",\\n        shortcut: [\\"control\\", \\"l\\"],\\n        toggled: targetId != null && $folded.get(targetId),\\n        disabledReason: targetBox()?.children?.length === 0 ? \\"no children to fold\\" : disabledReason\\n      }\\n    ]\\n  };\\n}\\nfunction updateButtonGroups() {\\n  buttonGroups = getButtonGroups();\\n}\\n$: targetId, $nodes, $pendingAction, $folded, updateButtonGroups();\\nlet buttonGroupsShow = {};\\nfor (let key of Object.keys(buttonGroups)) {\\n  buttonGroupsShow[key] = settings.data[key].value;\\n}\\nonDestroy(\\n  settings.subscribe(Object.keys(buttonGroups), (key) => {\\n    buttonGroupsShow[key] = settings.data[key].value;\\n    buttonGroupsShow = buttonGroupsShow;\\n  })\\n);\\nlet showButtons;\\nlet hideButtons;\\nfunction updateButtonLists() {\\n  showButtons = [];\\n  hideButtons = [];\\n  for (let key of Object.keys(buttonGroups)) {\\n    if (buttonGroupsShow[key]) {\\n      showButtons = [...showButtons, ...buttonGroups[key]];\\n    } else {\\n      hideButtons = [...hideButtons, ...buttonGroups[key]];\\n    }\\n  }\\n}\\n$: buttonGroups, buttonGroupsShow, updateButtonLists();\\n<\/script>\\n\\n<!-- svelte-ignore a11y-no-static-element-interactions -->\\n<!-- this isn't an actual interaction, its just preventing blur -->\\n<div class=\\"top\\" on:mousedown={preventBlur}>\\n\\t<ButtonBar buttons={[...showButtons, ...hideButtons]} showCount={showButtons.length} />\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tpadding: var(--padding);\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tbox-sizing: border-box;\\n\\t\\theight: var(--title-height);\\n\\t\\twidth: auto;\\n\\t\\tposition: relative;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAqPC,kBAAK,CACJ,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,IAAI,cAAc,CAAC,CAC3B,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QACX"}`
};
let disabledReason = "no cell selected";
const BoxControl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_folded;
  let $pendingAction, $$unsubscribe_pendingAction;
  let $nodes, $$unsubscribe_nodes;
  let $$unsubscribe_focusId;
  let $$unsubscribe_selectedFlowId;
  let $$unsubscribe_lastFocusIds;
  $$unsubscribe_folded = subscribe(folded, (value) => value);
  $$unsubscribe_pendingAction = subscribe(pendingAction, (value) => $pendingAction = value);
  $$unsubscribe_nodes = subscribe(nodes, (value) => $nodes = value);
  $$unsubscribe_focusId = subscribe(focusId, (value) => value);
  $$unsubscribe_selectedFlowId = subscribe(selectedFlowId, (value) => value);
  $$unsubscribe_lastFocusIds = subscribe(lastFocusIds, (value) => value);
  let { flowId } = $$props;
  let targetId = null;
  function targetBox() {
    return null;
  }
  async function deleteBoxAndFocus() {
    return;
  }
  function addChild() {
    return;
  }
  function addSibling(direction) {
    return;
  }
  function extendArgument() {
    return;
  }
  function toggleFormat(format) {
    return;
  }
  function toggleFold() {
    return;
  }
  let buttonGroups = getButtonGroups();
  function getButtonGroups() {
    return {
      showUndoRedoButtons: [
        {
          icon: "undo",
          disabled: !history.canUndo(flowId, $pendingAction),
          onclick: () => {
            history.undo(flowId, $pendingAction);
          },
          tooltip: "undo",
          shortcut: ["commandControl", "z"],
          disabledReason: "nothing to undo"
        },
        {
          disabled: !history.canRedo(flowId, $pendingAction),
          icon: "redo",
          onclick: () => {
            history.redo(flowId, $pendingAction);
          },
          tooltip: "redo",
          shortcut: ["commandControl", "shift", "z"],
          disabledReason: "nothing to redo"
        }
      ],
      showBoxCreationButtons: [
        {
          icon: "addRight",
          onclick: addChild,
          disabled: targetId == null,
          tooltip: "add response",
          shortcut: ["shift", "return"],
          disabledReason
        },
        {
          icon: "addUp",
          onclick: () => addSibling(),
          disabled: targetId == null,
          tooltip: "add argument above",
          shortcut: ["option", "return"],
          disabledReason: targetBox()?.value.isExtension ? "can't add responses above extensions" : disabledReason
        },
        {
          icon: "addDown",
          onclick: () => addSibling(),
          disabled: targetId == null,
          tooltip: "add argument below",
          shortcut: ["return"],
          disabledReason
        },
        {
          icon: "trash",
          onclick: deleteBoxAndFocus,
          disabled: targetId == null,
          tooltip: "delete selected",
          shortcut: ["commandControl", "delete"],
          disabledReason
        }
      ],
      showQuickExtensionButtons: [
        {
          icon: "arrowRightThroughCircle",
          onclick: extendArgument,
          disabled: targetId == null,
          tooltip: "extend selected",
          shortcut: ["commandControl", "e"],
          disabledReason: targetBox()?.children[0] && $nodes[targetBox()?.children[0]]?.value.isExtension ? "can't extend an extended argument" : targetBox()?.value.isExtension ? "can't extend an extension" : disabledReason
        }
      ],
      showBoxFormatButtons: [
        {
          icon: "cross",
          onclick: () => toggleFormat(),
          disabled: targetId == null,
          tooltip: "toggle crossed out",
          shortcut: ["commandControl", "shift", "x"],
          toggled: targetBox()?.value?.crossed,
          disabledReason: targetBox()?.value.isExtension ? "can't cross out an extension" : disabledReason
        },
        {
          icon: "letterB",
          onclick: () => toggleFormat(),
          disabled: targetId == null,
          tooltip: "toggle bold",
          shortcut: ["commandControl", "b"],
          toggled: targetBox()?.value?.bold,
          disabledReason: targetBox()?.value.isExtension ? "can't bold an extension" : disabledReason
        },
        {
          icon: "foldArrows",
          onclick: () => toggleFold(),
          disabled: targetId == null,
          tooltip: "toggle folded",
          shortcut: ["control", "l"],
          toggled: targetId != null,
          disabledReason: targetBox()?.children?.length === 0 ? "no children to fold" : disabledReason
        }
      ]
    };
  }
  function updateButtonGroups() {
    buttonGroups = getButtonGroups();
  }
  let buttonGroupsShow = {};
  for (let key of Object.keys(buttonGroups)) {
    buttonGroupsShow[key] = settings.data[key].value;
  }
  onDestroy(settings.subscribe(Object.keys(buttonGroups), (key) => {
    buttonGroupsShow[key] = settings.data[key].value;
    buttonGroupsShow = buttonGroupsShow;
  }));
  let showButtons;
  let hideButtons;
  function updateButtonLists() {
    showButtons = [];
    hideButtons = [];
    for (let key of Object.keys(buttonGroups)) {
      if (buttonGroupsShow[key]) {
        showButtons = [...showButtons, ...buttonGroups[key]];
      } else {
        hideButtons = [...hideButtons, ...buttonGroups[key]];
      }
    }
  }
  if ($$props.flowId === void 0 && $$bindings.flowId && flowId !== void 0) $$bindings.flowId(flowId);
  $$result.css.add(css$h);
  {
    updateButtonGroups();
  }
  {
    updateButtonLists();
  }
  $$unsubscribe_folded();
  $$unsubscribe_pendingAction();
  $$unsubscribe_nodes();
  $$unsubscribe_focusId();
  $$unsubscribe_selectedFlowId();
  $$unsubscribe_lastFocusIds();
  return `  <div class="top svelte-aroqqm">${validate_component(ButtonBar, "ButtonBar").$$render(
    $$result,
    {
      buttons: [...showButtons, ...hideButtons],
      showCount: showButtons.length
    },
    {},
    {}
  )} </div>`;
});
const css$g = {
  code: ".top.svelte-1a40mq2{width:min(calc(100vw - var(--padding) * 2), 500px);height:min(calc(100vh - var(--padding) * 2), min-content);box-sizing:border-box;display:grid;grid-template-columns:1fr 1fr;overflow:auto}ul.svelte-1a40mq2{line-height:1.6em;margin:0;padding-left:var(--padding-big);color:var(--color-subtle);text-align:left;width:100%;box-sizing:border-box}p.svelte-1a40mq2{margin:0;padding:0;color:var(--color-subtle);text-align:center}section.svelte-1a40mq2{width:100%;padding:var(--padding-big);padding-top:calc(var(--button-size) + var(--padding) * 2);box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:var(--padding)}.upload.svelte-1a40mq2{background:var(--background-secondary)}",
  map: `{"version":3,"file":"DownloadUpload.svelte","sources":["DownloadUpload.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Button from \\"./Button.svelte\\";\\nimport { downloadJson, downloadXlsx } from \\"$lib/models/file\\";\\nimport { nodes } from \\"$lib/models/store\\";\\nimport { resolvePendingAction } from \\"$lib/models/nodePendingAction\\";\\nexport let closePopup;\\nfunction openUploadDialog() {\\n  document.getElementById(\\"uploadId\\").click();\\n  closePopup();\\n}\\n<\/script>\\n\\n<div class=\\"top\\">\\n\\t<section class=\\"download\\">\\n\\t\\t<Button\\n\\t\\t\\ticon=\\"download\\"\\n\\t\\t\\ttext=\\"download as JSON\\"\\n\\t\\t\\ttooltip=\\"saves JSON file on your computer\\"\\n\\t\\t\\ttooltipLayout=\\"top\\"\\n\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\tresolvePendingAction($nodes);\\n\\t\\t\\t\\tdownloadJson($nodes);\\n\\t\\t\\t\\tclosePopup();\\n\\t\\t\\t}}\\n\\t\\t\\tdisabled={$nodes.root.children.length == 0}\\n\\t\\t\\tdisabledReason={'nothing to download'}\\n\\t\\t\\tpalette=\\"accent\\"\\n\\t\\t/>\\n\\t\\t<ul>\\n\\t\\t\\t<li>Can reopen file in this editor</li>\\n\\t\\t\\t<li>More data is saved (last focused cell etc.)</li>\\n\\t\\t</ul>\\n\\t\\t<Button\\n\\t\\t\\ticon=\\"download\\"\\n\\t\\t\\ttext=\\"download as XLSX\\"\\n\\t\\t\\ttooltip=\\"saves XLSX file on your computer\\"\\n\\t\\t\\ttooltipLayout=\\"top\\"\\n\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\tresolvePendingAction($nodes);\\n\\t\\t\\t\\tdownloadXlsx($nodes);\\n\\t\\t\\t\\tclosePopup();\\n\\t\\t\\t}}\\n\\t\\t\\tdisabled={$nodes.root.children.length == 0}\\n\\t\\t\\tdisabledReason={'nothing to download'}\\n\\t\\t\\tpalette=\\"accent-secondary\\"\\n\\t\\t/>\\n\\t\\t<ul>\\n\\t\\t\\t<li>Anyone can view it</li>\\n\\t\\t</ul>\\n\\t</section>\\n\\t<section class=\\"upload\\">\\n\\t\\t<Button\\n\\t\\t\\ticon=\\"upload\\"\\n\\t\\t\\ttext=\\"choose file from computer\\"\\n\\t\\t\\ttooltip=\\"upload a JSON file from your computer\\"\\n\\t\\t\\ttooltipLayout=\\"top\\"\\n\\t\\t\\ton:click={openUploadDialog}\\n\\t\\t\\tpalette=\\"accent\\"\\n\\t\\t/>\\n\\t\\t<p>Or drag and drop a JSON file anywhere in this window</p>\\n\\t</section>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\twidth: min(calc(100vw - var(--padding) * 2), 500px);\\n\\t\\theight: min(calc(100vh - var(--padding) * 2), min-content);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-columns: 1fr 1fr;\\n\\t\\toverflow: auto;\\n\\t}\\n\\tul {\\n\\t\\tline-height: 1.6em;\\n\\t\\tmargin: 0;\\n\\t\\tpadding-left: var(--padding-big);\\n\\t\\tcolor: var(--color-subtle);\\n\\t\\ttext-align: left;\\n\\t\\twidth: 100%;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\tp {\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tcolor: var(--color-subtle);\\n\\t\\ttext-align: center;\\n\\t}\\n\\n\\tsection {\\n\\t\\twidth: 100%;\\n\\t\\tpadding: var(--padding-big);\\n\\t\\tpadding-top: calc(var(--button-size) + var(--padding) * 2);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\t.upload {\\n\\t\\tbackground: var(--background-secondary);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA+DC,mBAAK,CACJ,KAAK,CAAE,IAAI,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CACnD,MAAM,CAAE,IAAI,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,WAAW,CAAC,CAC1D,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,QAAQ,CAAE,IACX,CACA,iBAAG,CACF,WAAW,CAAE,KAAK,CAClB,MAAM,CAAE,CAAC,CACT,YAAY,CAAE,IAAI,aAAa,CAAC,CAChC,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,UACb,CACA,gBAAE,CACD,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,UAAU,CAAE,MACb,CAEA,sBAAQ,CACP,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,aAAa,CAAC,CAC3B,WAAW,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAC1D,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,SAAS,CACnB,CACA,sBAAQ,CACP,UAAU,CAAE,IAAI,sBAAsB,CACvC"}`
};
const DownloadUpload = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $nodes, $$unsubscribe_nodes;
  $$unsubscribe_nodes = subscribe(nodes, (value) => $nodes = value);
  let { closePopup } = $$props;
  if ($$props.closePopup === void 0 && $$bindings.closePopup && closePopup !== void 0) $$bindings.closePopup(closePopup);
  $$result.css.add(css$g);
  $$unsubscribe_nodes();
  return `<div class="top svelte-1a40mq2"><section class="download svelte-1a40mq2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "download",
      text: "download as JSON",
      tooltip: "saves JSON file on your computer",
      tooltipLayout: "top",
      disabled: $nodes.root.children.length == 0,
      disabledReason: "nothing to download",
      palette: "accent"
    },
    {},
    {}
  )} <ul class="svelte-1a40mq2" data-svelte-h="svelte-1lnudwd"><li>Can reopen file in this editor</li> <li>More data is saved (last focused cell etc.)</li></ul> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "download",
      text: "download as XLSX",
      tooltip: "saves XLSX file on your computer",
      tooltipLayout: "top",
      disabled: $nodes.root.children.length == 0,
      disabledReason: "nothing to download",
      palette: "accent-secondary"
    },
    {},
    {}
  )} <ul class="svelte-1a40mq2" data-svelte-h="svelte-1vt00li"><li>Anyone can view it</li></ul></section> <section class="upload svelte-1a40mq2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "upload",
      text: "choose file from computer",
      tooltip: "upload a JSON file from your computer",
      tooltipLayout: "top",
      palette: "accent"
    },
    {},
    {}
  )} <p class="svelte-1a40mq2" data-svelte-h="svelte-yohosy">Or drag and drop a JSON file anywhere in this window</p></section> </div>`;
});
const css$f = {
  code: "label.svelte-8bq301.svelte-8bq301.svelte-8bq301{margin-left:auto}input.svelte-8bq301.svelte-8bq301.svelte-8bq301{display:none}.background.svelte-8bq301.svelte-8bq301.svelte-8bq301{position:relative;box-sizing:content-box;padding:var(--padding-small);width:calc(var(--button-size) * 2);height:var(--button-size);background-color:var(--this-background-indent);border-radius:var(--border-radius);transition:background var(--transition-speed)}.background.svelte-8bq301.svelte-8bq301.svelte-8bq301:hover{background-color:var(--this-background-active)}.switch.svelte-8bq301.svelte-8bq301.svelte-8bq301{position:absolute;display:flex;flex-direction:row;align-items:center;box-sizing:content-box;padding:calc(var(--padding-small) - var(--padding-small));width:var(--button-size);height:var(--button-size);left:var(--padding-small);top:var(--padding-small);border:none;background-color:var(--this-color);color:var(--this-text);border-radius:var(--border-radius);transition:background var(--transition-speed), left var(--transition-speed),\n      color var(--transition-speed)}input.svelte-8bq301:checked+.background.svelte-8bq301>.switch.svelte-8bq301{left:calc(var(--button-size) + var(--padding-small))}",
  map: '{"version":3,"file":"Toggle.svelte","sources":["Toggle.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let value = true;\\nexport let auto = true;\\nlet palette;\\n$: if (value) {\\n  if (value == auto) {\\n    palette = \\"accent-secondary\\";\\n  } else {\\n    palette = \\"accent\\";\\n  }\\n} else {\\n  palette = \\"plain\\";\\n}\\n<\/script>\\n\\n<label class={`palette-${palette}`}>\\n  <input type=\\"checkbox\\" bind:checked={value} />\\n  <div class=\\"background\\">\\n    <div class=\\"switch\\" />\\n  </div>\\n</label>\\n\\n<style>\\n  label {\\n    margin-left: auto;\\n  }\\n  input {\\n    display: none;\\n  }\\n  .background {\\n    position: relative;\\n    box-sizing: content-box;\\n    padding: var(--padding-small);\\n    width: calc(var(--button-size) * 2);\\n    height: var(--button-size);\\n    background-color: var(--this-background-indent);\\n    border-radius: var(--border-radius);\\n    transition: background var(--transition-speed);\\n  }\\n  .background:hover {\\n    background-color: var(--this-background-active);\\n  }\\n  .switch {\\n    position: absolute;\\n    display: flex;\\n    flex-direction: row;\\n    align-items: center;\\n\\n    box-sizing: content-box;\\n    padding: calc(var(--padding-small) - var(--padding-small));\\n    width: var(--button-size);\\n    height: var(--button-size);\\n    left: var(--padding-small);\\n    top: var(--padding-small);\\n\\n    border: none;\\n    background-color: var(--this-color);\\n    color: var(--this-text);\\n    border-radius: var(--border-radius);\\n    transition: background var(--transition-speed), left var(--transition-speed),\\n      color var(--transition-speed);\\n  }\\n  input:checked + .background > .switch {\\n    left: calc(var(--button-size) + var(--padding-small));\\n  }\\n</style>\\n"],"names":[],"mappings":"AAsBE,+CAAM,CACJ,WAAW,CAAE,IACf,CACA,+CAAM,CACJ,OAAO,CAAE,IACX,CACA,qDAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,WAAW,CACvB,OAAO,CAAE,IAAI,eAAe,CAAC,CAC7B,KAAK,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnC,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,gBAAgB,CAAE,IAAI,wBAAwB,CAAC,CAC/C,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,UAAU,CAAE,UAAU,CAAC,IAAI,kBAAkB,CAC/C,CACA,qDAAW,MAAO,CAChB,gBAAgB,CAAE,IAAI,wBAAwB,CAChD,CACA,iDAAQ,CACN,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CAEnB,UAAU,CAAE,WAAW,CACvB,OAAO,CAAE,KAAK,IAAI,eAAe,CAAC,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,CAC1D,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,IAAI,CAAE,IAAI,eAAe,CAAC,CAC1B,GAAG,CAAE,IAAI,eAAe,CAAC,CAEzB,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,UAAU,CAAE,UAAU,CAAC,IAAI,kBAAkB,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,kBAAkB,CAAC;AAChF,MAAM,KAAK,CAAC,IAAI,kBAAkB,CAChC,CACA,mBAAK,QAAQ,CAAG,yBAAW,CAAG,qBAAQ,CACpC,IAAI,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CACtD"}'
};
const Toggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = true } = $$props;
  let { auto = true } = $$props;
  let palette;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.auto === void 0 && $$bindings.auto && auto !== void 0) $$bindings.auto(auto);
  $$result.css.add(css$f);
  {
    if (value) {
      if (value == auto) {
        palette = "accent-secondary";
      } else {
        palette = "accent";
      }
    } else {
      palette = "plain";
    }
  }
  return `<label class="${escape(null_to_empty(`palette-${palette}`), true) + " svelte-8bq301"}"><input type="checkbox" class="svelte-8bq301"${add_attribute("checked", value, 1)}> <div class="background svelte-8bq301" data-svelte-h="svelte-17rpx7q"><div class="switch svelte-8bq301"></div></div> </label>`;
});
const css$e = {
  code: ".top.svelte-1pw4c7y.svelte-1pw4c7y.svelte-1pw4c7y{display:flex;flex-direction:row;position:relative;width:auto}.background.svelte-1pw4c7y.svelte-1pw4c7y.svelte-1pw4c7y{position:relative;box-sizing:content-box;padding:var(--padding-small);width:var(--button-size);height:auto;background-color:var(--this-background-indent);border-radius:var(--border-radius);transition:background var(--transition-speed);margin:calc(var(--padding-small)) 0}.top.svelte-1pw4c7y:hover>.background.svelte-1pw4c7y.svelte-1pw4c7y{background-color:var(--this-background-active)}.switch.svelte-1pw4c7y.svelte-1pw4c7y.svelte-1pw4c7y{position:absolute;box-sizing:content-box;padding:calc(var(--padding-small) - var(--padding-small));width:var(--button-size);height:var(--button-size);left:var(--padding-small);top:var(--pos);border:none;background-color:var(--this-color);color:var(--this-text);border-radius:var(--border-radius);transition:background var(--transition-speed), top var(--transition-speed),\n			color var(--transition-speed)}ul.svelte-1pw4c7y.svelte-1pw4c7y.svelte-1pw4c7y{list-style:none;box-sizing:border-box;padding:0;margin:0;width:calc(100% - var(--button-size) - var(--padding));display:block}label.svelte-1pw4c7y.svelte-1pw4c7y.svelte-1pw4c7y{position:relative;height:calc(var(--button-size) + var(--padding) * 2);margin-left:calc(-1 * (var(--button-size) + var(--padding)));display:block;padding-right:var(--padding);padding-left:calc(var(--button-size) + var(--padding) * 2);font-size:inherit;z-index:2}p.svelte-1pw4c7y.svelte-1pw4c7y.svelte-1pw4c7y{margin:0}label.svelte-1pw4c7y>li.svelte-1pw4c7y.svelte-1pw4c7y{display:flex;flex-direction:row;padding:var(--padding);border-radius:var(--border-radius)}label.svelte-1pw4c7y:hover>li.svelte-1pw4c7y.svelte-1pw4c7y{background-color:var(--this-background-indent)}label.svelte-1pw4c7y:active>li.svelte-1pw4c7y.svelte-1pw4c7y{background-color:var(--this-background-active);color:var(--this-text)}input.svelte-1pw4c7y.svelte-1pw4c7y.svelte-1pw4c7y{display:none}input.svelte-1pw4c7y:checked+li.svelte-1pw4c7y.svelte-1pw4c7y{color:var(--this-text)}.optionInfo.svelte-1pw4c7y.svelte-1pw4c7y.svelte-1pw4c7y{opacity:0;margin-left:auto;color:var(--this-text-weak);transition:opacity var(--transition-speed);width:min-content}label.svelte-1pw4c7y:hover>li.svelte-1pw4c7y>.optionInfo.svelte-1pw4c7y{opacity:1}",
  map: '{"version":3,"file":"Radio.svelte","sources":["Radio.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Text from \\"./Text.svelte\\";\\nimport { createEventDispatcher } from \\"svelte\\";\\nexport let name;\\nexport let value;\\nexport let auto;\\nconst dispatch = createEventDispatcher();\\nexport let detail;\\n$: palette = auto == value ? \\"accent-secondary\\" : \\"accent\\";\\n<\/script>\\n\\n<div class={`top palette-${palette}`}>\\n\\t<div class=\\"background\\">\\n\\t\\t<div\\n\\t\\t\\tclass=\\"switch\\"\\n\\t\\t\\tstyle={`--pos:calc(${value} * (var(--button-size) + var(--padding) * 2) + var(--padding-small))`}\\n\\t\\t/>\\n\\t</div>\\n\\t<ul>\\n\\t\\t{#each detail.options as option, index}\\n\\t\\t\\t<label>\\n\\t\\t\\t\\t<input type=\\"radio\\" bind:group={value} {name} checked={index == value} value={index} />\\n\\t\\t\\t\\t<li>\\n\\t\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\t\\t{option}\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t\\t{#if index == auto}\\n\\t\\t\\t\\t\\t\\t<p class=\\"optionInfo\\">default</p>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</li>\\n\\t\\t\\t</label>\\n\\t\\t{/each}\\n\\t\\t{#if detail.customOption && detail.customOptionValue != null}\\n\\t\\t\\t<label>\\n\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\ttype=\\"radio\\"\\n\\t\\t\\t\\t\\tbind:group={value}\\n\\t\\t\\t\\t\\t{name}\\n\\t\\t\\t\\t\\tchecked={value == detail.options.length}\\n\\t\\t\\t\\t\\tvalue={detail.options.length}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t<li>\\n\\t\\t\\t\\t\\t<Text\\n\\t\\t\\t\\t\\t\\tplaceholder=\\"custom\\"\\n\\t\\t\\t\\t\\t\\tnowrap={true}\\n\\t\\t\\t\\t\\t\\tbind:value={detail.customOptionValue}\\n\\t\\t\\t\\t\\t\\ton:input={() => dispatch(\'forceUpdate\')}\\n\\t\\t\\t\\t\\t\\ton:focus={() => (value = detail.options.length)}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{#if detail.customOptionValue != \'\'}\\n\\t\\t\\t\\t\\t\\t<p class=\\"optionInfo\\">custom</p>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</li>\\n\\t\\t\\t</label>\\n\\t\\t{/if}\\n\\t</ul>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tposition: relative;\\n\\t\\twidth: auto;\\n\\t}\\n\\t.background {\\n\\t\\tposition: relative;\\n\\t\\tbox-sizing: content-box;\\n\\t\\tpadding: var(--padding-small);\\n\\t\\twidth: var(--button-size);\\n\\t\\theight: auto;\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\ttransition: background var(--transition-speed);\\n\\t\\tmargin: calc(var(--padding-small)) 0;\\n\\t}\\n\\t.top:hover > .background {\\n\\t\\tbackground-color: var(--this-background-active);\\n\\t}\\n\\t.switch {\\n\\t\\tposition: absolute;\\n\\n\\t\\tbox-sizing: content-box;\\n\\t\\tpadding: calc(var(--padding-small) - var(--padding-small));\\n\\t\\twidth: var(--button-size);\\n\\t\\theight: var(--button-size);\\n\\t\\tleft: var(--padding-small);\\n\\t\\ttop: var(--pos);\\n\\n\\t\\tborder: none;\\n\\t\\tbackground-color: var(--this-color);\\n\\t\\tcolor: var(--this-text);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\ttransition: background var(--transition-speed), top var(--transition-speed),\\n\\t\\t\\tcolor var(--transition-speed);\\n\\t}\\n\\n\\tul {\\n\\t\\tlist-style: none;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\twidth: calc(100% - var(--button-size) - var(--padding));\\n\\t\\tdisplay: block;\\n\\t}\\n\\tlabel {\\n\\t\\tposition: relative;\\n\\t\\theight: calc(var(--button-size) + var(--padding) * 2);\\n\\t\\tmargin-left: calc(-1 * (var(--button-size) + var(--padding)));\\n\\t\\tdisplay: block;\\n\\t\\tpadding-right: var(--padding);\\n\\t\\tpadding-left: calc(var(--button-size) + var(--padding) * 2);\\n\\t\\tfont-size: inherit;\\n\\t\\tz-index: 2;\\n\\t}\\n\\tp {\\n\\t\\tmargin: 0;\\n\\t}\\n\\n\\tlabel > li {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tpadding: var(--padding);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t}\\n\\tlabel:hover > li {\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\t}\\n\\tlabel:active > li {\\n\\t\\tbackground-color: var(--this-background-active);\\n\\t\\tcolor: var(--this-text);\\n\\t}\\n\\tinput {\\n\\t\\tdisplay: none;\\n\\t}\\n\\tinput:checked + li {\\n\\t\\tcolor: var(--this-text);\\n\\t}\\n\\t.optionInfo {\\n\\t\\topacity: 0;\\n\\t\\tmargin-left: auto;\\n\\t\\tcolor: var(--this-text-weak);\\n\\t\\ttransition: opacity var(--transition-speed);\\n\\t\\twidth: min-content;\\n\\t}\\n\\tlabel:hover > li > .optionInfo {\\n\\t\\topacity: 1;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"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"}'
};
const Radio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let palette;
  let { name } = $$props;
  let { value } = $$props;
  let { auto } = $$props;
  createEventDispatcher();
  let { detail } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.auto === void 0 && $$bindings.auto && auto !== void 0) $$bindings.auto(auto);
  if ($$props.detail === void 0 && $$bindings.detail && detail !== void 0) $$bindings.detail(detail);
  $$result.css.add(css$e);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    palette = auto == value ? "accent-secondary" : "accent";
    $$rendered = `<div class="${escape(null_to_empty(`top palette-${palette}`), true) + " svelte-1pw4c7y"}"><div class="background svelte-1pw4c7y"><div class="switch svelte-1pw4c7y"${add_attribute("style", `--pos:calc(${value} * (var(--button-size) + var(--padding) * 2) + var(--padding-small))`, 0)}></div></div> <ul class="svelte-1pw4c7y">${each(detail.options, (option, index) => {
      return `<label class="svelte-1pw4c7y"><input type="radio"${add_attribute("name", name, 0)} ${index == value ? "checked" : ""}${add_attribute("value", index, 0)} class="svelte-1pw4c7y"${index === value ? add_attribute("checked", true, 1) : ""}> <li class="svelte-1pw4c7y"><p class="svelte-1pw4c7y">${escape(option)}</p> ${index == auto ? `<p class="optionInfo svelte-1pw4c7y" data-svelte-h="svelte-1fjeojb">default</p>` : ``}</li> </label>`;
    })} ${detail.customOption && detail.customOptionValue != null ? `<label class="svelte-1pw4c7y"><input type="radio"${add_attribute("name", name, 0)} ${value == detail.options.length ? "checked" : ""}${add_attribute("value", detail.options.length, 0)} class="svelte-1pw4c7y"${detail.options.length === value ? add_attribute("checked", true, 1) : ""}> <li class="svelte-1pw4c7y">${validate_component(Text, "Text").$$render(
      $$result,
      {
        placeholder: "custom",
        nowrap: true,
        value: detail.customOptionValue
      },
      {
        value: ($$value) => {
          detail.customOptionValue = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${detail.customOptionValue != "" ? `<p class="optionInfo svelte-1pw4c7y" data-svelte-h="svelte-o63ojb">custom</p>` : ``}</li></label>` : ``}</ul> </div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$d = {
  code: ".top.svelte-zo9dqx.svelte-zo9dqx{display:flex;flex-direction:row;gap:var(--padding)}label.svelte-zo9dqx.svelte-zo9dqx{width:100%;position:relative;box-sizing:content-box;display:block;padding:var(--padding-small) 0;height:var(--button-size);background-color:var(--this-background-indent);border-radius:var(--border-radius);transition:background var(--transition-speed), background-image var(--transition-speed);margin:calc(var(--padding-small)) 0}label.small.svelte-zo9dqx.svelte-zo9dqx{width:min-content}.hue.svelte-zo9dqx label.svelte-zo9dqx{background-image:linear-gradient(\n			to right,\n			hsl(360, var(--slider-saturation), var(--slider-lightness)),\n			hsl(60, var(--slider-saturation), var(--slider-lightness)),\n			hsl(120, var(--slider-saturation), var(--slider-lightness)),\n			hsl(180, var(--slider-saturation), var(--slider-lightness)),\n			hsl(240, var(--slider-saturation), var(--slider-lightness)),\n			hsl(300, var(--slider-saturation), var(--slider-lightness)),\n			hsl(360, var(--slider-saturation), var(--slider-lightness))\n		)}.hue.svelte-zo9dqx label.small.svelte-zo9dqx{background-image:none;background-color:hsl(var(--value), var(--slider-saturation), var(--slider-lightness))}.top.svelte-zo9dqx:hover label.svelte-zo9dqx{background-color:var(--this-background-active)}.top.hue.svelte-zo9dqx:hover label.svelte-zo9dqx{background-image:linear-gradient(\n			to right,\n			hsl(360, var(--slider-saturation), var(--slider-lightness-hover)),\n			hsl(60, var(--slider-saturation), var(--slider-lightness-hover)),\n			hsl(120, var(--slider-saturation), var(--slider-lightness-hover)),\n			hsl(180, var(--slider-saturation), var(--slider-lightness-hover)),\n			hsl(240, var(--slider-saturation), var(--slider-lightness-hover)),\n			hsl(300, var(--slider-saturation), var(--slider-lightness-hover)),\n			hsl(360, var(--slider-saturation), var(--slider-lightness-hover))\n		)}.top.hue.svelte-zo9dqx:hover label.small.svelte-zo9dqx{background-image:none;background-color:hsl(var(--value), var(--slider-saturation), var(--slider-lightness-hover))}input[type='range'].svelte-zo9dqx.svelte-zo9dqx{-webkit-appearance:none;appearance:none;margin:0;background:none}input[type='range'].svelte-zo9dqx.svelte-zo9dqx::-webkit-slider-thumb{-webkit-appearance:none;opacity:0;height:var(--button-size);width:var(--button-size)}input[type='range'].svelte-zo9dqx.svelte-zo9dqx::-moz-range-thumb{height:var(--button-size);opacity:0;width:var(--button-size)}input[type='range'].svelte-zo9dqx.svelte-zo9dqx::-webkit-slider-runnable-track{width:100%;background:none;box-sizing:border-box;height:100%;position:absolute;padding:0 var(--padding-small);top:var(--padding-small)}input[type='range'].svelte-zo9dqx.svelte-zo9dqx::-moz-range-track{width:100%;background:none;box-sizing:border-box;height:100%;position:absolute;padding:0 var(--padding-small);top:var(--padding-small)}input[type='number'].svelte-zo9dqx.svelte-zo9dqx{background:none;text-align:center;border:none;width:4ch;outline:none;margin:0;color:var(--this-text)}input[type='number'].svelte-zo9dqx.svelte-zo9dqx::-webkit-outer-spin-button,input[type='number'].svelte-zo9dqx.svelte-zo9dqx::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.hue.svelte-zo9dqx input[type='number'].svelte-zo9dqx{color:var(--text)}input[type='number'].svelte-zo9dqx.svelte-zo9dqx{-moz-appearance:textfield;appearance:textfield}.slider.svelte-zo9dqx.svelte-zo9dqx{width:100%}.switch.svelte-zo9dqx.svelte-zo9dqx{position:absolute;box-sizing:content-box;padding:calc(var(--padding-small) - var(--padding-small));width:var(--button-size);height:var(--button-size);left:var(--padding-small);top:var(--padding-small);border:none;background-color:var(--this-color);color:var(--this-text);border-radius:var(--border-radius)}.hue.svelte-zo9dqx .switch.svelte-zo9dqx{background-color:hsl(var(--value), var(--slider-saturation), var(--slider-switch-lightness))}",
  map: `{"version":3,"file":"Slider.svelte","sources":["Slider.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let value;\\nexport let auto;\\nexport let detail;\\nlet mousedown = false;\\nlet drag = false;\\nlet startX = 0;\\nfunction handleMouseDown(e) {\\n  mousedown = true;\\n  startX = e.pageX;\\n  drag = false;\\n}\\nfunction handleMouseMove(e) {\\n  if (mousedown && Math.abs(startX - e.pageX) > 3) {\\n    drag = true;\\n  }\\n}\\nfunction handleMouseUp(_) {\\n  mousedown = false;\\n  drag = false;\\n}\\n$: palette = auto == value ? \\"accent-secondary\\" : \\"accent\\";\\n<\/script>\\n\\n<div\\n\\tclass={\`top palette-\${palette}\`}\\n\\ton:mousedown={handleMouseDown}\\n\\ton:mousemove={handleMouseMove}\\n\\ton:mouseup={handleMouseUp}\\n\\tclass:hue={detail.hue}\\n\\tstyle={\`--value: \${value}\`}\\n\\taria-valuemin={detail.min}\\n\\taria-valuemax={detail.max}\\n\\taria-valuenow={value}\\n\\trole=\\"slider\\"\\n\\ttabindex=\\"0\\"\\n>\\n\\t<label>\\n\\t\\t<div\\n\\t\\t\\tclass=\\"switch\\"\\n\\t\\t\\tstyle={\`\\n      left: calc(var(--padding-small) + \${\\n\\t\\t\\t\\t(Math.max(Math.min(value, detail.max), detail.min) - detail.min) / (detail.max - detail.min)\\n\\t\\t\\t} * (100% - var(--button-size) - var(--padding-small) * 2));\\n      transition: left \${drag ? '0' : 'var(--transition-speed)'}\\n      , background var(--transition-speed);\`}\\n\\t\\t/>\\n\\t\\t<input\\n\\t\\t\\tclass=\\"slider\\"\\n\\t\\t\\ttype=\\"range\\"\\n\\t\\t\\tmin={detail.min}\\n\\t\\t\\tmax={detail.max}\\n\\t\\t\\tstep={detail.step}\\n\\t\\t\\tbind:value\\n\\t\\t/>\\n\\t</label>\\n\\t<label class=\\"small\\">\\n\\t\\t<input type=\\"number\\" bind:value />\\n\\t</label>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\tlabel {\\n\\t\\twidth: 100%;\\n\\t\\tposition: relative;\\n\\t\\tbox-sizing: content-box;\\n\\t\\tdisplay: block;\\n\\t\\tpadding: var(--padding-small) 0;\\n\\t\\theight: var(--button-size);\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\ttransition: background var(--transition-speed), background-image var(--transition-speed);\\n\\t\\tmargin: calc(var(--padding-small)) 0;\\n\\t}\\n\\tlabel.small {\\n\\t\\twidth: min-content;\\n\\t}\\n\\t.hue label {\\n\\t\\tbackground-image: linear-gradient(\\n\\t\\t\\tto right,\\n\\t\\t\\thsl(360, var(--slider-saturation), var(--slider-lightness)),\\n\\t\\t\\thsl(60, var(--slider-saturation), var(--slider-lightness)),\\n\\t\\t\\thsl(120, var(--slider-saturation), var(--slider-lightness)),\\n\\t\\t\\thsl(180, var(--slider-saturation), var(--slider-lightness)),\\n\\t\\t\\thsl(240, var(--slider-saturation), var(--slider-lightness)),\\n\\t\\t\\thsl(300, var(--slider-saturation), var(--slider-lightness)),\\n\\t\\t\\thsl(360, var(--slider-saturation), var(--slider-lightness))\\n\\t\\t);\\n\\t}\\n\\t.hue label.small {\\n\\t\\tbackground-image: none;\\n\\t\\tbackground-color: hsl(var(--value), var(--slider-saturation), var(--slider-lightness));\\n\\t}\\n\\n\\t.top:hover label {\\n\\t\\tbackground-color: var(--this-background-active);\\n\\t}\\n\\t.top.hue:hover label {\\n\\t\\tbackground-image: linear-gradient(\\n\\t\\t\\tto right,\\n\\t\\t\\thsl(360, var(--slider-saturation), var(--slider-lightness-hover)),\\n\\t\\t\\thsl(60, var(--slider-saturation), var(--slider-lightness-hover)),\\n\\t\\t\\thsl(120, var(--slider-saturation), var(--slider-lightness-hover)),\\n\\t\\t\\thsl(180, var(--slider-saturation), var(--slider-lightness-hover)),\\n\\t\\t\\thsl(240, var(--slider-saturation), var(--slider-lightness-hover)),\\n\\t\\t\\thsl(300, var(--slider-saturation), var(--slider-lightness-hover)),\\n\\t\\t\\thsl(360, var(--slider-saturation), var(--slider-lightness-hover))\\n\\t\\t);\\n\\t}\\n\\t.top.hue:hover label.small {\\n\\t\\tbackground-image: none;\\n\\t\\tbackground-color: hsl(var(--value), var(--slider-saturation), var(--slider-lightness-hover));\\n\\t}\\n\\n\\tinput[type='range'] {\\n\\t\\t-webkit-appearance: none;\\n\\t\\tappearance: none;\\n\\t\\tmargin: 0;\\n\\t\\tbackground: none;\\n\\t}\\n\\tinput[type='range']::-webkit-slider-thumb {\\n\\t\\t-webkit-appearance: none;\\n\\t\\topacity: 0;\\n\\t\\theight: var(--button-size);\\n\\t\\twidth: var(--button-size);\\n\\t}\\n\\tinput[type='range']::-moz-range-thumb {\\n\\t\\theight: var(--button-size);\\n\\t\\topacity: 0;\\n\\t\\twidth: var(--button-size);\\n\\t}\\n\\tinput[type='range']::-webkit-slider-runnable-track {\\n\\t\\twidth: 100%;\\n\\t\\tbackground: none;\\n\\t\\tbox-sizing: border-box;\\n\\t\\theight: 100%;\\n\\t\\tposition: absolute;\\n\\t\\tpadding: 0 var(--padding-small);\\n\\t\\ttop: var(--padding-small);\\n\\t}\\n\\tinput[type='range']::-moz-range-track {\\n\\t\\twidth: 100%;\\n\\t\\tbackground: none;\\n\\t\\tbox-sizing: border-box;\\n\\t\\theight: 100%;\\n\\t\\tposition: absolute;\\n\\t\\tpadding: 0 var(--padding-small);\\n\\t\\ttop: var(--padding-small);\\n\\t}\\n\\n\\tinput[type='number'] {\\n\\t\\tbackground: none;\\n\\t\\ttext-align: center;\\n\\t\\tborder: none;\\n\\t\\twidth: 4ch;\\n\\t\\toutline: none;\\n\\t\\tmargin: 0;\\n\\t\\tcolor: var(--this-text);\\n\\t}\\n\\n\\tinput[type='number']::-webkit-outer-spin-button,\\n\\tinput[type='number']::-webkit-inner-spin-button {\\n\\t\\t-webkit-appearance: none;\\n\\t\\tmargin: 0;\\n\\t}\\n\\t.hue input[type='number'] {\\n\\t\\tcolor: var(--text);\\n\\t}\\n\\n\\tinput[type='number'] {\\n\\t\\t-moz-appearance: textfield;\\n\\t\\tappearance: textfield;\\n\\t}\\n\\t.slider {\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t.switch {\\n\\t\\tposition: absolute;\\n\\n\\t\\tbox-sizing: content-box;\\n\\t\\tpadding: calc(var(--padding-small) - var(--padding-small));\\n\\t\\twidth: var(--button-size);\\n\\t\\theight: var(--button-size);\\n\\t\\tleft: var(--padding-small);\\n\\t\\ttop: var(--padding-small);\\n\\n\\t\\tborder: none;\\n\\t\\tbackground-color: var(--this-color);\\n\\t\\tcolor: var(--this-text);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t}\\n\\t.hue .switch {\\n\\t\\tbackground-color: hsl(var(--value), var(--slider-saturation), var(--slider-switch-lightness));\\n\\t}\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let palette;
  let { value } = $$props;
  let { auto } = $$props;
  let { detail } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.auto === void 0 && $$bindings.auto && auto !== void 0) $$bindings.auto(auto);
  if ($$props.detail === void 0 && $$bindings.detail && detail !== void 0) $$bindings.detail(detail);
  $$result.css.add(css$d);
  palette = auto == value ? "accent-secondary" : "accent";
  return `<div class="${[
    escape(null_to_empty(`top palette-${palette}`), true) + " svelte-zo9dqx",
    detail.hue ? "hue" : ""
  ].join(" ").trim()}"${add_attribute("style", `--value: ${value}`, 0)}${add_attribute("aria-valuemin", detail.min, 0)}${add_attribute("aria-valuemax", detail.max, 0)}${add_attribute("aria-valuenow", value, 0)} role="slider" tabindex="0"><label class="svelte-zo9dqx"><div class="switch svelte-zo9dqx"${add_attribute(
    "style",
    `
      left: calc(var(--padding-small) + ${(Math.max(Math.min(value, detail.max), detail.min) - detail.min) / (detail.max - detail.min)} * (100% - var(--button-size) - var(--padding-small) * 2));
      transition: left ${"var(--transition-speed)"}
      , background var(--transition-speed);`,
    0
  )}></div> <input class="slider svelte-zo9dqx" type="range"${add_attribute("min", detail.min, 0)}${add_attribute("max", detail.max, 0)}${add_attribute("step", detail.step, 0)}${add_attribute("value", value, 0)}></label> <label class="small svelte-zo9dqx"><input type="number" class="svelte-zo9dqx"${add_attribute("value", value, 0)}></label> </div>`;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start) return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function") duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const css$c = {
  code: "label.svelte-1pkld73{margin-left:auto}.background.svelte-1pkld73{position:relative;box-sizing:content-box;padding:var(--padding-small);width:calc(var(--button-size) * 2);height:calc(var(--button-size) - 2 * var(--line-width));background-color:var(--current-selector-color);border-radius:var(--border-radius);border:var(--line-width) solid var(--color);transition:filter var(--transition-speed)}.background.svelte-1pkld73:hover{filter:brightness(1.2)}input.svelte-1pkld73{visibility:hidden;position:absolute}",
  map: '{"version":3,"file":"ColorSelector.svelte","sources":["ColorSelector.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let value = \\"#ffffff\\";\\n<\/script>\\n\\n<label class=\\"palette-plain\\">\\n  <input type=\\"color\\" bind:value />\\n  <div class=\\"background\\" style={`--current-selector-color:${value}`}></div>\\n</label>\\n\\n<style>\\n  label {\\n    margin-left: auto;\\n  }\\n\\n  .background {\\n    position: relative;\\n    box-sizing: content-box;\\n    padding: var(--padding-small);\\n    width: calc(var(--button-size) * 2);\\n    height: calc(var(--button-size) - 2 * var(--line-width));\\n    background-color: var(--current-selector-color);\\n    border-radius: var(--border-radius);\\n    border: var(--line-width) solid var(--color);\\n    transition: filter var(--transition-speed);\\n  }\\n\\n  .background:hover {\\n    filter: brightness(1.2);\\n  }\\n\\n  input {\\n    visibility: hidden;\\n    position: absolute;\\n  }\\n</style>\\n"],"names":[],"mappings":"AASE,oBAAM,CACJ,WAAW,CAAE,IACf,CAEA,0BAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,WAAW,CACvB,OAAO,CAAE,IAAI,eAAe,CAAC,CAC7B,KAAK,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnC,MAAM,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,YAAY,CAAC,CAAC,CACxD,gBAAgB,CAAE,IAAI,wBAAwB,CAAC,CAC/C,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,MAAM,CAAE,IAAI,YAAY,CAAC,CAAC,KAAK,CAAC,IAAI,OAAO,CAAC,CAC5C,UAAU,CAAE,MAAM,CAAC,IAAI,kBAAkB,CAC3C,CAEA,0BAAW,MAAO,CAChB,MAAM,CAAE,WAAW,GAAG,CACxB,CAEA,oBAAM,CACJ,UAAU,CAAE,MAAM,CAClB,QAAQ,CAAE,QACZ"}'
};
const ColorSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "#ffffff" } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  $$result.css.add(css$c);
  return `<label class="palette-plain svelte-1pkld73"><input type="color" class="svelte-1pkld73"${add_attribute("value", value, 0)}> <div class="background svelte-1pkld73"${add_attribute("style", `--current-selector-color:${value}`, 0)}></div> </label>`;
});
const css$b = {
  code: ".top.svelte-wxkoz7.svelte-wxkoz7{position:relative;border-radius:var(--border-radius);padding:var(--padding);max-width:30rem;min-width:10rem;width:100%;box-sizing:border-box}.spotlight.svelte-wxkoz7.svelte-wxkoz7{background-color:var(--this-background-indent);opacity:var(--spotlight);border-radius:var(--border-radius);position:absolute;height:100%;width:100%;top:calc(-1 * var(--padding)/2);left:calc(-1 * var(--padding)/2)}.above.svelte-wxkoz7.svelte-wxkoz7{position:relative;display:flex;flex-direction:row;gap:1em;align-items:center;padding-bottom:var(--padding);height:auto}.above.svelte-wxkoz7 h2.svelte-wxkoz7{width:max-content;white-space:nowrap}.above.svelte-wxkoz7 .titleReset.svelte-wxkoz7{display:flex;flex-direction:row;align-items:center;gap:1em}p.info.svelte-wxkoz7.svelte-wxkoz7{color:var(--this-text-weak);opacity:0;transition:opacity var(--transition-speed);margin:0}.top.svelte-wxkoz7:hover p.info.svelte-wxkoz7{opacity:1}.hidden.svelte-wxkoz7.svelte-wxkoz7{color:var(--this-text-weak)}.reset.svelte-wxkoz7.svelte-wxkoz7{opacity:1;transition:opacity var(--transition-speed)}.reset.hidden.svelte-wxkoz7.svelte-wxkoz7{opacity:0}@media(max-width: 800px){.above.svelte-wxkoz7.svelte-wxkoz7{flex-direction:column;align-items:flex-start;gap:0}}",
  map: `{"version":3,"file":"Setting.svelte","sources":["Setting.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Toggle from \\"./Toggle.svelte\\";\\nimport Radio from \\"./Radio.svelte\\";\\nimport Slider from \\"./Slider.svelte\\";\\nimport Button from \\"./Button.svelte\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport { tweened } from \\"svelte/motion\\";\\nimport { onDestroy } from \\"svelte\\";\\nimport { settingIn, settingOut } from \\"$lib/models/transition\\";\\nimport ColorSelector from \\"./ColorSelector.svelte\\";\\nexport let setting;\\nexport let key;\\nlet value = setting.value;\\nfunction setValue(value2) {\\n  settings.setValue(key, value2);\\n  value2 = setting.value;\\n}\\n$: value, setValue(value);\\nfunction resetValue() {\\n  settings.setValue(key, setting.auto);\\n  value = setting.value;\\n}\\nonDestroy(\\n  settings.subscribe([key], function(key2) {\\n    if (setting.value != value) {\\n      value = setting.value;\\n    }\\n  })\\n);\\nlet spotlight = tweened(0);\\nlet element;\\nexport function scrollToSelf() {\\n  element.scrollIntoView();\\n  spotlight = tweened(1, {\\n    duration: 2e3\\n  });\\n  $spotlight = 0;\\n}\\n<\/script>\\n\\n<div class=\\"top\\" bind:this={element} in:settingIn={{skip: false}} out:settingOut={{skip: false}}>\\n\\t<div class=\\"spotlight\\" style={\`--spotlight:\${$spotlight}\`}>\\n\\t</div>\\n\\t<span class=\\"above\\">\\n\\t\\t<div class=\\"titleReset\\">\\n\\t\\t\\t<h2>{setting.name}</h2>\\n\\t\\t\\t<div class=\\"reset\\" class:hidden={value == setting.auto}>\\n\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\ticon=\\"arrowRoundLeft\\"\\n\\t\\t\\t\\t\\ttooltip=\\"reset to default\\"\\n\\t\\t\\t\\t\\ttooltipLayout=\\"right\\"\\n\\t\\t\\t\\t\\ton:click={resetValue}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\n\\t\\t{#if setting.type == 'toggle'}\\n\\t\\t\\t<Toggle bind:value auto={setting.auto} />\\n\\t\\t{/if}\\n\\t\\t{#if setting.type == 'color'}\\n\\t\\t\\t<ColorSelector bind:value />\\n\\t\\t{/if}\\n\\t\\t{#if setting.info && setting.type != 'toggle' && setting.type != 'color'}\\n\\t\\t\\t<p class=\\"info\\">{setting.info}</p>\\n\\t\\t{/if}\\n\\t</span>\\n\\t{#if setting.type == 'radio'}\\n\\t\\t<Radio\\n\\t\\t\\tname={setting.name}\\n\\t\\t\\tbind:value\\n\\t\\t\\tauto={setting.auto}\\n\\t\\t\\tdetail={setting.detail}\\n\\t\\t\\ton:forceUpdate={() => setValue(value)}\\n\\t\\t/>\\n\\t{/if}\\n\\t{#if setting.type == 'slider'}\\n\\t\\t<Slider bind:value auto={setting.auto} detail={setting.detail} />\\n\\t{/if}\\n\\t{#if setting.info && (setting.type == 'toggle' || setting.type == 'color')}\\n\\t\\t<p class=\\"info\\">{setting.info}</p>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tposition: relative;\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tpadding: var(--padding);\\n\\t\\tmax-width: 30rem;\\n\\t\\tmin-width: 10rem;\\n\\t\\twidth: 100%;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\t.spotlight {\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\t\\topacity: var(--spotlight);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tposition: absolute;\\n\\t\\theight: 100%;\\n\\t\\twidth: 100%;\\n\\t\\ttop: calc(-1 * var(--padding)/2);\\n\\t\\tleft: calc(-1 * var(--padding)/2);\\n\\t}\\n\\t.above {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: 1em;\\n\\t\\talign-items: center;\\n\\t\\tpadding-bottom: var(--padding);\\n\\t\\theight: auto;\\n\\t}\\n\\t.above h2 {\\n\\t\\twidth: max-content;\\n\\t\\twhite-space: nowrap;\\n\\t}\\n\\t.above .titleReset {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tgap: 1em;\\n\\t}\\n\\tp.info {\\n\\t\\tcolor: var(--this-text-weak);\\n\\t\\topacity: 0;\\n\\t\\ttransition: opacity var(--transition-speed);\\n\\t\\tmargin: 0;\\n\\t}\\n\\t.top:hover p.info {\\n\\t\\topacity: 1;\\n\\t}\\n\\t.hidden {\\n\\t\\tcolor: var(--this-text-weak);\\n\\t}\\n\\t.reset {\\n\\t\\topacity: 1;\\n\\n\\t\\ttransition: opacity var(--transition-speed);\\n\\t}\\n\\t.reset.hidden {\\n\\t\\topacity: 0;\\n\\t}\\n\\t@media (max-width: 800px) {\\n\\t\\t.above {\\n\\t\\t\\tflex-direction: column;\\n\\t\\t\\talign-items: flex-start;\\n\\t\\t\\tgap: 0;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAmFC,gCAAK,CACJ,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,UACb,CACA,sCAAW,CACV,gBAAgB,CAAE,IAAI,wBAAwB,CAAC,CAC/C,OAAO,CAAE,IAAI,WAAW,CAAC,CACzB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,KAAK,EAAE,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAChC,IAAI,CAAE,KAAK,EAAE,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CACjC,CACA,kCAAO,CACN,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,GAAG,CACR,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,IAAI,SAAS,CAAC,CAC9B,MAAM,CAAE,IACT,CACA,oBAAM,CAAC,gBAAG,CACT,KAAK,CAAE,WAAW,CAClB,WAAW,CAAE,MACd,CACA,oBAAM,CAAC,yBAAY,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,GACN,CACA,CAAC,iCAAM,CACN,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,IAAI,kBAAkB,CAAC,CAC3C,MAAM,CAAE,CACT,CACA,kBAAI,MAAM,CAAC,CAAC,mBAAM,CACjB,OAAO,CAAE,CACV,CACA,mCAAQ,CACP,KAAK,CAAE,IAAI,gBAAgB,CAC5B,CACA,kCAAO,CACN,OAAO,CAAE,CAAC,CAEV,UAAU,CAAE,OAAO,CAAC,IAAI,kBAAkB,CAC3C,CACA,MAAM,mCAAQ,CACb,OAAO,CAAE,CACV,CACA,MAAO,YAAY,KAAK,CAAE,CACzB,kCAAO,CACN,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,UAAU,CACvB,GAAG,CAAE,CACN,CACD"}`
};
const Setting = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $spotlight, $$unsubscribe_spotlight = noop, $$subscribe_spotlight = () => ($$unsubscribe_spotlight(), $$unsubscribe_spotlight = subscribe(spotlight, ($$value) => $spotlight = $$value), spotlight);
  let { setting } = $$props;
  let { key } = $$props;
  let value = setting.value;
  function setValue(value2) {
    settings.setValue(key, value2);
    value2 = setting.value;
  }
  onDestroy(settings.subscribe([key], function(key2) {
    if (setting.value != value) {
      value = setting.value;
    }
  }));
  let spotlight = tweened(0);
  $$subscribe_spotlight();
  let element;
  function scrollToSelf() {
    element.scrollIntoView();
    $$subscribe_spotlight(spotlight = tweened(1, { duration: 2e3 }));
    set_store_value(spotlight, $spotlight = 0, $spotlight);
  }
  if ($$props.setting === void 0 && $$bindings.setting && setting !== void 0) $$bindings.setting(setting);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0) $$bindings.key(key);
  if ($$props.scrollToSelf === void 0 && $$bindings.scrollToSelf && scrollToSelf !== void 0) $$bindings.scrollToSelf(scrollToSelf);
  $$result.css.add(css$b);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      setValue(value);
    }
    $$rendered = `<div class="top svelte-wxkoz7"${add_attribute("this", element, 0)}><div class="spotlight svelte-wxkoz7"${add_attribute("style", `--spotlight:${$spotlight}`, 0)}></div> <span class="above svelte-wxkoz7"><div class="titleReset svelte-wxkoz7"><h2 class="svelte-wxkoz7">${escape(setting.name)}</h2> <div class="${["reset svelte-wxkoz7", value == setting.auto ? "hidden" : ""].join(" ").trim()}">${validate_component(Button, "Button").$$render(
      $$result,
      {
        icon: "arrowRoundLeft",
        tooltip: "reset to default",
        tooltipLayout: "right"
      },
      {},
      {}
    )}</div></div> ${setting.type == "toggle" ? `${validate_component(Toggle, "Toggle").$$render(
      $$result,
      { auto: setting.auto, value },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} ${setting.type == "color" ? `${validate_component(ColorSelector, "ColorSelector").$$render(
      $$result,
      { value },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} ${setting.info && setting.type != "toggle" && setting.type != "color" ? `<p class="info svelte-wxkoz7">${escape(setting.info)}</p>` : ``}</span> ${setting.type == "radio" ? `${validate_component(Radio, "Radio").$$render(
      $$result,
      {
        name: setting.name,
        auto: setting.auto,
        detail: setting.detail,
        value
      },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} ${setting.type == "slider" ? `${validate_component(Slider, "Slider").$$render(
      $$result,
      {
        auto: setting.auto,
        detail: setting.detail,
        value
      },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} ${setting.info && (setting.type == "toggle" || setting.type == "color") ? `<p class="info svelte-wxkoz7">${escape(setting.info)}</p>` : ``} </div>`;
  } while (!$$settled);
  $$unsubscribe_spotlight();
  return $$rendered;
});
const css$a = {
  code: ".top.svelte-19hcj9o.svelte-19hcj9o.svelte-19hcj9o{width:min(calc(100vw - var(--padding) * 2), 1100px);height:min(calc(100vh - var(--padding) * 2), 700px);display:grid;grid-template-columns:calc(max(150px, 20%) + var(--padding-big)) 1fr}.outline.svelte-19hcj9o.svelte-19hcj9o.svelte-19hcj9o{width:100%;padding-top:calc(var(--button-size) + var(--padding) * 2);box-sizing:border-box;display:flex;flex-direction:column;align-items:left;gap:var(--padding);background-color:var(--background-secondary);overflow:hidden}.outlineScroll.svelte-19hcj9o.svelte-19hcj9o.svelte-19hcj9o{overflow:auto;height:100%;padding:0 var(--padding)}.outlineScroll.svelte-19hcj9o ul.svelte-19hcj9o.svelte-19hcj9o{padding-bottom:50vh}.settings.svelte-19hcj9o .title.svelte-19hcj9o.svelte-19hcj9o{width:100%;max-width:30rem;box-sizing:border-box;padding:calc(var(--padding-big) * 2) var(--padding) var(--padding) var(--padding)}.settings.svelte-19hcj9o .title h1.svelte-19hcj9o.svelte-19hcj9o{font-weight:var(--font-weight-bold)}.outline.svelte-19hcj9o button.svelte-19hcj9o.svelte-19hcj9o{border:none;background:none;display:block;width:calc(100% - var(--padding));text-align:left;border-radius:var(--border-radius);color:var(--this-text);padding:var(--padding);overflow-wrap:break-word;transition:background var(--transition-speed);font-weight:var(--font-weight);margin-left:var(--padding)}.outline.svelte-19hcj9o button.svelte-19hcj9o.svelte-19hcj9o:hover{background-color:var(--this-background-indent)}.outline.svelte-19hcj9o button.svelte-19hcj9o.svelte-19hcj9o:active{transition:none;background-color:var(--this-background-active)}.outline.svelte-19hcj9o .title button.svelte-19hcj9o.svelte-19hcj9o{font-weight:var(--font-weight-bold);margin-top:var(--padding);padding:var(--padding);margin-left:0;width:100%}.content.svelte-19hcj9o.svelte-19hcj9o.svelte-19hcj9o{box-sizing:border-box;width:100%;padding-top:calc(var(--button-size) + var(--padding));overflow:auto;scroll-behavior:smooth;display:flex;flex-direction:column;align-items:center;gap:var(--padding-big);height:inherit;position:relative}.settings.svelte-19hcj9o.svelte-19hcj9o.svelte-19hcj9o{width:100%}ul.svelte-19hcj9o.svelte-19hcj9o.svelte-19hcj9o{margin:0;padding:0;list-style:none}.settings.svelte-19hcj9o ul.svelte-19hcj9o.svelte-19hcj9o{display:flex;flex-direction:column;align-items:center}.content.svelte-19hcj9o>.settings.svelte-19hcj9o>ul.svelte-19hcj9o{padding-bottom:50vh}.controls.svelte-19hcj9o.svelte-19hcj9o.svelte-19hcj9o{display:flex;flex-direction:row;align-items:center;gap:var(--padding);justify-content:center}@media(max-width: 800px){.controls.svelte-19hcj9o.svelte-19hcj9o.svelte-19hcj9o{flex-direction:column}}",
  map: '{"version":3,"file":"Settings.svelte","sources":["Settings.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Setting from \\"./Setting.svelte\\";\\nimport Button from \\"./Button.svelte\\";\\nimport ButtonBar from \\"./ButtonBar.svelte\\";\\nimport { settingsGroups, settings } from \\"$lib/models/settings\\";\\nimport { onDestroy } from \\"svelte\\";\\nimport { settingScrollerIn, settingScrollerOut, settingTitleInOut } from \\"$lib/models/transition\\";\\nimport { downloadSettingsJson } from \\"$lib/models/file\\";\\nexport const closePopup = () => {\\n};\\nonDestroy(() => {\\n  settings.saveToLocalStorage();\\n});\\nlet settingComponents = [];\\nlet groupHeaderElements = [];\\nfor (let i = 0; i < settingsGroups.length; i++) {\\n  settingComponents.push([]);\\n}\\nfunction scrollToSettingElement(groupIndex, index) {\\n  settingComponents[groupIndex][index].scrollToSelf();\\n}\\nfunction scrollToGroupHeader(groupIndex) {\\n  groupHeaderElements[groupIndex].scrollIntoView();\\n}\\nlet groupVisibilities;\\nlet settingVisibilities;\\nfunction updateVisibilities() {\\n  settingVisibilities = settingsGroups.map((group, _groupIndex) => {\\n    return group.settings.map((key, _index) => {\\n      if (!settings.data[key]) {\\n        console.log(`Key: ${key} does not exist in settings.`);\\n        return false;\\n      }\\n      if (!settings.data[key].visibilityCondition || settings.data[key].visibilityCondition && settings.data[key].visibilityCondition()) {\\n        return true;\\n      }\\n      return false;\\n    });\\n  });\\n  groupVisibilities = settingVisibilities.map((group, _groupIndex) => {\\n    return group.some((vis) => vis);\\n  });\\n}\\nupdateVisibilities();\\nonDestroy(settings.subscribe([\\"any\\"], () => {\\n  updateVisibilities();\\n}));\\nfunction openUploadDialog() {\\n  document.getElementById(\\"uploadId\\").click();\\n  closePopup();\\n}\\n<\/script>\\n\\n<div class=\\"top palette-plain\\">\\n\\t<div class=\\"outline\\">\\n\\t\\t<div class=\\"outlineScroll\\" class:customScrollbar={settings.data.customScrollbar.value}>\\n\\t\\t\\t<ul>\\n\\t\\t\\t\\t{#each settingsGroups as group, groupIndex}\\n\\t\\t\\t\\t\\t{#if groupVisibilities[groupIndex]}\\n\\t\\t\\t\\t\\t\\t<li class=\\"title\\" in:settingTitleInOut={{skip:false}} out:settingTitleInOut={{skip:false}}>\\n\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click={(e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tscrollToGroupHeader(groupIndex);\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t{group.name}\\n\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t{#each group.settings as key, index}\\n\\t\\t\\t\\t\\t\\t{#if settingVisibilities[groupIndex][index]}\\n\\t\\t\\t\\t\\t\\t\\t<li in:settingScrollerIn={{skip:false}} out:settingScrollerOut={{skip:false}}>\\n\\t\\t\\t\\t\\t\\t\\t\\t<button on:click={() => scrollToSettingElement(groupIndex, index)}>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{settings.data[key].name}\\n\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t{/each}\\n\\t\\t\\t</ul>\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class=\\"content\\" class:customScrollbar={settings.data.customScrollbar.value}>\\n\\t\\t<section class=\\"controls\\">\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"arrowRoundLeft\\"\\n\\t\\t\\t\\ttext=\\"reset all settings\\"\\n\\t\\t\\t\\ton:click={() => settings.resetToAuto()}\\n\\t\\t\\t/>\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"dots\\"\\n\\t\\t\\t\\ttext=\\"randomize settings\\"\\n\\t\\t\\t\\ttooltip=\\"why would you click this\\"\\n\\t\\t\\t\\ton:click={() => settings.randomize()}\\n\\t\\t\\t/>\\n\\t\\t</section>\\n\\t\\t<section class=\\"controls\\">\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"upload\\"\\n\\t\\t\\t\\ttext=\\"import settings\\"\\n\\t\\t\\t\\ttooltip=\\"import settings from file\\"\\n\\t\\t\\t\\ton:click={() => openUploadDialog()}\\n\\t\\t\\t/>\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"download\\"\\n\\t\\t\\t\\ttext=\\"export settings\\"\\n\\t\\t\\t\\ttooltip=\\"export settings to file\\"\\n\\t\\t\\t\\ton:click={() => downloadSettingsJson()}\\n\\t\\t\\t/>\\n\\t\\t</section>\\n\\t\\t<section class=\\"settings\\">\\n\\t\\t\\t<ul>\\n\\t\\t\\t\\t<!-- {#each Object.keys(settings.data) as key, index}\\n\\t\\t\\t\\t\\t<Setting {key} setting={settings.data[key]} bind:this={settingComponents[index]} />\\n\\t\\t\\t\\t{/each} -->\\n\\t\\t\\t\\t{#each settingsGroups as group, groupIndex}\\n\\t\\t\\t\\t\\t{#if groupVisibilities[groupIndex]}\\n\\t\\t\\t\\t\\t\\t<li class=\\"title\\" bind:this={groupHeaderElements[groupIndex]} in:settingTitleInOut={{skip:false}} out:settingTitleInOut={{skip:false}}>\\n\\t\\t\\t\\t\\t\\t\\t<h1>\\n\\t\\t\\t\\t\\t\\t\\t\\t{group.name}\\n\\t\\t\\t\\t\\t\\t\\t</h1>\\n\\t\\t\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t{#each group.settings as key, index}\\n\\t\\t\\t\\t\\t\\t{#if settingVisibilities[groupIndex][index]}\\n\\t\\t\\t\\t\\t\\t\\t<Setting\\n\\t\\t\\t\\t\\t\\t\\t\\t{key}\\n\\t\\t\\t\\t\\t\\t\\t\\tsetting={settings.data[key]}\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:this={settingComponents[groupIndex][index]}\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</ul>\\n\\t\\t</section>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\twidth: min(calc(100vw - var(--padding) * 2), 1100px);\\n\\t\\theight: min(calc(100vh - var(--padding) * 2), 700px);\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-columns: calc(max(150px, 20%) + var(--padding-big)) 1fr;\\n\\t}\\n\\t.outline {\\n\\t\\twidth: 100%;\\n\\t\\tpadding-top: calc(var(--button-size) + var(--padding) * 2);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\talign-items: left;\\n\\t\\tgap: var(--padding);\\n\\t\\tbackground-color: var(--background-secondary);\\n\\t\\toverflow: hidden;\\n\\t}\\n\\t.outlineScroll {\\n\\t\\toverflow: auto;\\n\\t\\theight: 100%;\\n\\t\\tpadding: 0 var(--padding);\\n\\t}\\n\\t.outlineScroll ul {\\n\\t\\tpadding-bottom: 50vh;\\n\\t}\\n\\n\\t.settings .title {\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: 30rem;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tpadding: calc(var(--padding-big) * 2) var(--padding) var(--padding) var(--padding);\\n\\t}\\n\\t.settings .title h1 {\\n\\t\\tfont-weight: var(--font-weight-bold);\\n\\t}\\n\\t.outline button {\\n\\t\\tborder: none;\\n\\t\\tbackground: none;\\n\\t\\tdisplay: block;\\n\\t\\twidth: calc(100% - var(--padding));\\n\\t\\ttext-align: left;\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tcolor: var(--this-text);\\n\\t\\tpadding: var(--padding);\\n\\t\\toverflow-wrap: break-word;\\n\\t\\ttransition: background var(--transition-speed);\\n\\t\\tfont-weight: var(--font-weight);\\n\\t\\tmargin-left: var(--padding);\\n\\t}\\n\\t.outline button:hover {\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\t}\\n\\t.outline button:active {\\n\\t\\ttransition: none;\\n\\t\\tbackground-color: var(--this-background-active);\\n\\t}\\n\\n\\t.outline .title button {\\n\\t\\tfont-weight: var(--font-weight-bold);\\n\\t\\tmargin-top: var(--padding);\\n\\t\\tpadding: var(--padding);\\n\\t\\tmargin-left: 0;\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t.content {\\n\\t\\tbox-sizing: border-box;\\n\\t\\twidth: 100%;\\n\\t\\tpadding-top: calc(var(--button-size) + var(--padding));\\n\\t\\toverflow: auto;\\n\\t\\tscroll-behavior: smooth;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--padding-big);\\n\\t\\theight: inherit;\\n\\t\\tposition: relative;\\n\\t}\\n\\t.settings {\\n\\t\\twidth: 100%;\\n\\t}\\n\\tul {\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tlist-style: none;\\n\\t}\\n\\t.settings ul {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\talign-items: center;\\n\\t}\\n\\t.content > .settings > ul {\\n\\t\\tpadding-bottom: 50vh;\\n\\t}\\n\\t.controls {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--padding);\\n\\t\\tjustify-content: center;\\n\\t}\\n\\t@media (max-width: 800px) {\\n\\t\\t.controls {\\n\\t\\t\\tflex-direction: column;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"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"}'
};
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const closePopup = () => {
  };
  onDestroy(() => {
    settings.saveToLocalStorage();
  });
  let settingComponents = [];
  let groupHeaderElements = [];
  for (let i = 0; i < settingsGroups.length; i++) {
    settingComponents.push([]);
  }
  let groupVisibilities;
  let settingVisibilities;
  function updateVisibilities() {
    settingVisibilities = settingsGroups.map((group, _groupIndex) => {
      return group.settings.map((key, _index) => {
        if (!settings.data[key]) {
          console.log(`Key: ${key} does not exist in settings.`);
          return false;
        }
        if (!settings.data[key].visibilityCondition || settings.data[key].visibilityCondition && settings.data[key].visibilityCondition()) {
          return true;
        }
        return false;
      });
    });
    groupVisibilities = settingVisibilities.map((group, _groupIndex) => {
      return group.some((vis) => vis);
    });
  }
  updateVisibilities();
  onDestroy(settings.subscribe(["any"], () => {
    updateVisibilities();
  }));
  if ($$props.closePopup === void 0 && $$bindings.closePopup && closePopup !== void 0) $$bindings.closePopup(closePopup);
  $$result.css.add(css$a);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="top palette-plain svelte-19hcj9o"><div class="outline svelte-19hcj9o"><div class="${[
      "outlineScroll svelte-19hcj9o",
      settings.data.customScrollbar.value ? "customScrollbar" : ""
    ].join(" ").trim()}"><ul class="svelte-19hcj9o">${each(settingsGroups, (group, groupIndex) => {
      return `${groupVisibilities[groupIndex] ? `<li class="title"><button class="svelte-19hcj9o">${escape(group.name)}</button> </li>` : ``} ${each(group.settings, (key, index) => {
        return `${settingVisibilities[groupIndex][index] ? `<li><button class="svelte-19hcj9o">${escape(settings.data[key].name)}</button> </li>` : ``}`;
      })}`;
    })}</ul></div></div> <div class="${[
      "content svelte-19hcj9o",
      settings.data.customScrollbar.value ? "customScrollbar" : ""
    ].join(" ").trim()}"><section class="controls svelte-19hcj9o">${validate_component(Button, "Button").$$render(
      $$result,
      {
        icon: "arrowRoundLeft",
        text: "reset all settings"
      },
      {},
      {}
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        icon: "dots",
        text: "randomize settings",
        tooltip: "why would you click this"
      },
      {},
      {}
    )}</section> <section class="controls svelte-19hcj9o">${validate_component(Button, "Button").$$render(
      $$result,
      {
        icon: "upload",
        text: "import settings",
        tooltip: "import settings from file"
      },
      {},
      {}
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        icon: "download",
        text: "export settings",
        tooltip: "export settings to file"
      },
      {},
      {}
    )}</section> <section class="settings svelte-19hcj9o"><ul class="svelte-19hcj9o"> ${each(settingsGroups, (group, groupIndex) => {
      return `${groupVisibilities[groupIndex] ? `<li class="title svelte-19hcj9o"${add_attribute("this", groupHeaderElements[groupIndex], 0)}><h1 class="svelte-19hcj9o">${escape(group.name)}</h1> </li>` : ``} ${each(group.settings, (key, index) => {
        return `${settingVisibilities[groupIndex][index] ? `${validate_component(Setting, "Setting").$$render(
          $$result,
          {
            key,
            setting: settings.data[key],
            this: settingComponents[groupIndex][index]
          },
          {
            this: ($$value) => {
              settingComponents[groupIndex][index] = $$value;
              $$settled = false;
            }
          },
          {}
        )}` : ``}`;
      })}`;
    })}</ul></section></div> </div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$9 = {
  code: "ul.svelte-f52ckd{list-style:none;padding:0;margin:0;position:relative;transition:height var(--transition-speed) ease-in;display:block;height:0px;box-sizing:border-box}li.svelte-f52ckd{position:relative;z-index:1;height:min-content}",
  map: '{"version":3,"file":"SortableList.svelte","sources":["SortableList.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { quintOut } from \\"svelte/easing\\";\\nimport { crossfade } from \\"svelte/transition\\";\\nimport { flip } from \\"svelte/animate\\";\\nimport { tab, tabList } from \\"../models/transition\\";\\nimport { tick, onMount, onDestroy } from \\"svelte\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nlet transitionSpeed = settings.data[\\"transitionSpeed\\"].value;\\nonDestroy(\\n  settings.subscribe([\\"transitionSpeed\\"], (key2) => {\\n    transitionSpeed = settings.data[key2].value;\\n  })\\n);\\nconst [send, receive] = crossfade({\\n  duration: (d) => Math.sqrt(d * transitionSpeed),\\n  fallback: tab\\n});\\nlet overFirst = null;\\nlet overSecond = null;\\nlet dragSource = null;\\nconst overHalf = (ev) => {\\n  let rect = ev.target.getBoundingClientRect();\\n  let offset = ev.clientY - rect.top;\\n  let half = rect.height / 2;\\n  return offset > half;\\n};\\nconst getDraggedParent = (node) => node.dataset && node.dataset.index ? node.dataset : getDraggedParent(node.parentNode);\\nconst start = (ev) => {\\n  ev.dataTransfer.setData(\\"source\\", ev.target.dataset.index);\\n  dragSource = parseInt(ev.target.dataset.index);\\n};\\nconst over = (ev) => {\\n  ev.preventDefault();\\n  let dragged = getDraggedParent(ev.target);\\n  let index = parseInt(dragged.index);\\n  if (overHalf(ev)) {\\n    overFirst = index;\\n    overSecond = index + 1;\\n  } else {\\n    overFirst = index - 1;\\n    overSecond = index;\\n  }\\n};\\nconst leave = (ev) => {\\n  let dragged = getDraggedParent(ev.target);\\n  let index = parseInt(dragged.index);\\n  overFirst = null;\\n  overSecond = null;\\n};\\nconst drop = (ev) => {\\n  ev.preventDefault();\\n  overFirst = null;\\n  overSecond = null;\\n  dragSource = null;\\n  let dragged = getDraggedParent(ev.target);\\n  let from = parseInt(ev.dataTransfer.getData(\\"source\\"));\\n  let to = parseInt(dragged.index);\\n  if (!overHalf(ev)) {\\n    to -= 1;\\n  }\\n  reorder({ from, to });\\n};\\nimport { createEventDispatcher } from \\"svelte\\";\\nconst dispatch = createEventDispatcher();\\nconst reorder = ({ from, to }) => {\\n  dispatch(\\"sort\\", { from, to });\\n};\\nconst getKey = (item) => key ? item[key] : item;\\nexport let list;\\nexport let key = null;\\nlet element;\\nasync function changeHeight(reset = false) {\\n  if (reset && element != null) {\\n    element.style.height = \\"auto\\";\\n  }\\n  await tick();\\n  let height = 0;\\n  for (let i = 0; i < list.length; i++) {\\n    height += element.children[i].scrollHeight;\\n  }\\n  if (element == null) return;\\n  element.style.height = `calc(${height}px)`;\\n}\\nonMount(() => {\\n  changeHeight(true);\\n});\\nonDestroy(settings.subscribe([\\"sidebarWidth\\", \\"fontSize\\", \\"padding\\"], () => changeHeight()));\\n$: list, changeHeight();\\n<\/script>\\n\\n{#if list && list.length}\\n\\t<ul bind:this={element} out:tabList>\\n\\t\\t{#each list as item, index (getKey(item))}\\n\\t\\t\\t<li\\n\\t\\t\\t\\tdata-index={index}\\n\\t\\t\\t\\tdata-id={JSON.stringify(getKey(item))}\\n\\t\\t\\t\\tdraggable=\\"true\\"\\n\\t\\t\\t\\ton:dragstart={start}\\n\\t\\t\\t\\ton:dragover={over}\\n\\t\\t\\t\\ton:dragleave={leave}\\n\\t\\t\\t\\ton:drop={drop}\\n\\t\\t\\t\\tin:receive={{ key: getKey(item) }}\\n\\t\\t\\t\\tout:send={{ key: getKey(item) }}\\n\\t\\t\\t\\tanimate:flip={{ duration: transitionSpeed }}\\n\\t\\t\\t\\tclass:overFirst={index === overFirst}\\n\\t\\t\\t\\tclass:overSecond={index === overSecond}\\n\\t\\t\\t\\tclass:dragSource={index === dragSource}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<slot {item} {index} />\\n\\t\\t\\t</li>\\n\\t\\t{/each}\\n\\t</ul>\\n{/if}\\n\\n<style>\\n\\tul {\\n\\t\\tlist-style: none;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\tposition: relative;\\n\\t\\ttransition: height var(--transition-speed) ease-in;\\n\\t\\tdisplay: block;\\n\\t\\theight: 0px;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\tli {\\n\\t\\t/* need these to remove drag background */\\n\\t\\tposition: relative;\\n\\t\\tz-index: 1;\\n\\t\\theight: min-content;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAkHC,gBAAG,CACF,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,MAAM,CAAC,IAAI,kBAAkB,CAAC,CAAC,OAAO,CAClD,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,UACb,CACA,gBAAG,CAEF,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,WACT"}'
};
const SortableList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  settings.data["transitionSpeed"].value;
  onDestroy(settings.subscribe(["transitionSpeed"], (key2) => {
    settings.data[key2].value;
  }));
  let overFirst = null;
  let overSecond = null;
  let dragSource = null;
  createEventDispatcher();
  const getKey = (item) => key ? item[key] : item;
  let { list } = $$props;
  let { key = null } = $$props;
  let element;
  async function changeHeight(reset = false) {
    if (reset && element != null) {
      element.style.height = "auto";
    }
    await tick();
    let height = 0;
    for (let i = 0; i < list.length; i++) {
      height += element.children[i].scrollHeight;
    }
    return;
  }
  onDestroy(settings.subscribe(["sidebarWidth", "fontSize", "padding"], () => changeHeight()));
  if ($$props.list === void 0 && $$bindings.list && list !== void 0) $$bindings.list(list);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0) $$bindings.key(key);
  $$result.css.add(css$9);
  {
    changeHeight();
  }
  return `${list && list.length ? `<ul class="svelte-f52ckd"${add_attribute("this", element, 0)}>${each(list, (item, index) => {
    return `<li${add_attribute("data-index", index, 0)}${add_attribute("data-id", JSON.stringify(getKey(item)), 0)} draggable="true" class="${[
      "svelte-f52ckd",
      (index === overFirst ? "overFirst" : "") + " " + (index === overSecond ? "overSecond" : "") + " " + (index === dragSource ? "dragSource" : "")
    ].join(" ").trim()}">${slots.default ? slots.default({ item, index }) : ``} </li>`;
  })}</ul>` : ``}`;
});
const debateStyleMap = [
  "policy",
  "publicForum",
  "lincolnDouglas",
  "congress",
  "worldSchools",
  "bigQuestions",
  "nofSpar",
  "parli",
  "classic"
];
const debateTemplateMap = ["primary", "secondary", "tertiary", "quaternary"];
function getDebateStyle() {
  return debateStyles[debateStyleMap[settings.data.debateStyle.value]];
}
function getAllDebateStyleFlows() {
  let debateStyle = getDebateStyle();
  if (debateStyle.alternativeFlowSelectorSettingName && debateStyle.alternativeFlowSelectorSettingName in settings.data) {
    const subflow = debateStyle[`alternativeFlows${settings.data[debateStyle.alternativeFlowSelectorSettingName].value}`];
    if (subflow) return subflow;
  }
  return debateStyle.flows;
}
function getDebateStyleFlow(flowPostion) {
  let debateFlows = getAllDebateStyleFlows();
  let index;
  if (typeof flowPostion == "number") {
    index = flowPostion;
  } else {
    index = debateTemplateMap.indexOf(flowPostion);
  }
  if (index === -1) {
    return null;
  }
  return debateFlows[index] || null;
}
const debateStyles = {
  policy: {
    flows: [
      {
        name: "aff",
        columns: ["1AC", "1NC", "2AC", "2NC/1NR", "1AR", "2NR", "2AR"],
        invert: false
      },
      {
        name: "neg",
        columns: ["1NC", "2AC", "2NC/1NR", "1AR", "2NR", "2AR"],
        invert: true
      }
    ],
    timerSpeeches: [
      {
        name: "1AC",
        time: 8 * 60 * 1e3,
        secondary: false
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "1NC",
        time: 8 * 60 * 1e3,
        secondary: true
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: true
      },
      {
        name: "2AC",
        time: 8 * 60 * 1e3,
        secondary: false
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "2NC",
        time: 8 * 60 * 1e3,
        secondary: true
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: true
      },
      {
        name: "1NR",
        time: 5 * 60 * 1e3,
        secondary: true
      },
      {
        name: "1AR",
        time: 5 * 60 * 1e3,
        secondary: false
      },
      {
        name: "2NR",
        time: 5 * 60 * 1e3,
        secondary: true
      },
      {
        name: "2AR",
        time: 5 * 60 * 1e3,
        secondary: false
      }
    ],
    prepTime: 8 * 60 * 1e3
  },
  publicForum: {
    flows: [
      {
        name: "aff",
        columns: ["AC", "NC", "AR", "NR", "AS", "NS", "AFF", "NFF"],
        columnsSwitch: ["AC", "NR", "AR", "NS", "AS", "NFF", "AFF"],
        invert: false
      },
      {
        name: "neg",
        columns: ["NC", "AR", "NR", "AS", "NS", "AFF", "NFF"],
        columnsSwitch: ["NC", "AC", "NR", "AR", "NS", "AS", "NFF", "AFF"],
        invert: true
      }
    ],
    timerSpeeches: [
      {
        name: "AC",
        time: 4 * 60 * 1e3,
        secondary: false
      },
      {
        name: "NC",
        time: 4 * 60 * 1e3,
        secondary: true
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "AR",
        time: 4 * 60 * 1e3,
        secondary: false
      },
      {
        name: "NR",
        time: 4 * 60 * 1e3,
        secondary: true
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "AS",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "NS",
        time: 3 * 60 * 1e3,
        secondary: true
      },
      {
        name: "GCX",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "AFF",
        time: 2 * 60 * 1e3,
        secondary: false
      },
      {
        name: "NFF",
        time: 2 * 60 * 1e3,
        secondary: true
      }
    ],
    prepTime: 3 * 60 * 1e3
  },
  lincolnDouglas: {
    flows: [
      {
        name: "aff",
        columns: ["AC", "NR", "1AR", "2NR", "2AR"],
        starterBoxes: ["Value", "Criterion"],
        invert: false
      },
      {
        name: "neg",
        columns: ["NC", "1AR", "2NR", "2AR"],
        starterBoxes: ["Value", "Criterion"],
        invert: true
      }
    ],
    alternativeFlowSelectorSettingName: "LDSubstyle",
    alternativeFlows1: [
      {
        name: "aff",
        columns: ["AC", "NR", "1AR", "2NR", "2AR"],
        starterBoxes: ["type here"],
        invert: false
      },
      {
        name: "neg",
        columns: ["NC", "1AR", "2NR", "2AR"],
        starterBoxes: ["type here"],
        invert: true
      },
      {
        name: "1ar",
        columns: ["1AR", "2NR", "2AR"],
        starterBoxes: ["type here"],
        invert: false
      },
      {
        name: "2nr",
        columns: ["2NR", "2AR"],
        starterBoxes: ["type here"],
        invert: true
      }
    ],
    timerSpeeches: [
      {
        name: "AC",
        time: 6 * 60 * 1e3,
        secondary: false
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "NC",
        time: 7 * 60 * 1e3,
        secondary: true
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "1AR",
        time: 4 * 60 * 1e3,
        secondary: false
      },
      {
        name: "NR",
        time: 6 * 60 * 1e3,
        secondary: true
      },
      {
        name: "2AR",
        time: 3 * 60 * 1e3,
        secondary: false
      }
    ],
    prepTime: 4 * 60 * 1e3
  },
  congress: {
    flows: [
      {
        name: "bill",
        columns: [
          "1A",
          "Q/1N",
          "Q/2A",
          "Q/2N",
          "Q/3A",
          "Q/3N",
          "Q/4A",
          "Q/4N",
          "Q/5A",
          "Q/5N",
          "Q/6A",
          "Q/6N",
          "Q/7A",
          "Q/7N",
          "Q/8A",
          "Q/8N",
          "Q/9A",
          "Q/9N",
          "Q/10A",
          "Q/10N",
          "Q/11A",
          "Q/11N",
          "Q/12A",
          "Q/12N",
          "Q/13A",
          "Q/13N",
          "Q/14A",
          "Q/14N",
          "Q/15A",
          "Q/15N",
          "Q/16A",
          "Q/16N",
          "Q/17A",
          "Q/17N",
          "Q/18A",
          "Q/18N",
          "Q/19A",
          "Q/19N",
          "Q/20A",
          "Q/20N",
          "Q/20A",
          "Q/20N",
          "Q/21A",
          "Q/21N",
          "Q/22A",
          "Q/22N",
          "Q/23A",
          "Q/23N",
          "Q/24A",
          "Q/24N",
          "Q/25A",
          "Q/25N"
        ],
        invert: false
      }
    ],
    timerSpeeches: [
      {
        name: "speech",
        time: 3 * 60 * 1e3,
        secondary: false
      }
    ]
  },
  worldSchools: {
    flows: [
      {
        name: "prop",
        columns: ["P1", "O1", "P2", "O2", "PW", "OW", "OR", "PR"],
        invert: false
      },
      {
        name: "opp",
        columns: ["O1", "P2", "O2", "PW", "OW", "OR", "PR"],
        invert: true
      }
    ],
    timerSpeeches: [
      {
        name: "P1",
        time: 8 * 60 * 1e3,
        secondary: false
      },
      {
        name: "O1",
        time: 8 * 60 * 1e3,
        secondary: true
      },
      {
        name: "P2",
        time: 8 * 60 * 1e3,
        secondary: false
      },
      {
        name: "O2",
        time: 8 * 60 * 1e3,
        secondary: true
      },
      {
        name: "PW",
        time: 8 * 60 * 1e3,
        secondary: false
      },
      {
        name: "OW",
        time: 8 * 60 * 1e3,
        secondary: true
      },
      {
        name: "OR",
        time: 4 * 60 * 1e3,
        secondary: true
      },
      {
        name: "PR",
        time: 4 * 60 * 1e3,
        secondary: false
      }
    ]
  },
  bigQuestions: {
    flows: [
      {
        name: "aff",
        columns: ["AC", "NC", "ARb", "NRb", "A3", "N3", "ARt", "NRt"],
        invert: false
      },
      {
        name: "neg",
        columns: ["NC", "ARb", "NRb", "A3", "N3", "ARt", "NRt"],
        invert: true
      }
    ],
    timerSpeeches: [
      {
        name: "AC",
        time: 5 * 60 * 1e3,
        secondary: false
      },
      {
        name: "NC",
        time: 5 * 60 * 1e3,
        secondary: true
      },
      {
        name: "QS",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "ARb",
        time: 4 * 60 * 1e3,
        secondary: false
      },
      {
        name: "NRb",
        time: 4 * 60 * 1e3,
        secondary: true
      },
      {
        name: "QS",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "A3",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "N3",
        time: 3 * 60 * 1e3,
        secondary: true
      },
      {
        name: "ARt",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "NRt",
        time: 3 * 60 * 1e3,
        secondary: true
      }
    ],
    prepTime: 3 * 60 * 1e3
  },
  nofSpar: {
    flows: [
      {
        name: "pro",
        columns: ["PC", "CC", "PR", "CR"],
        invert: false
      },
      {
        name: "con",
        columns: ["CC", "PR", "CR"],
        invert: true
      }
    ],
    timerSpeeches: [
      {
        name: "PREP",
        time: 2 * 60 * 1e3,
        secondary: false
      },
      {
        name: "PC",
        time: 2 * 60 * 1e3,
        secondary: false
      },
      {
        name: "CC",
        time: 2 * 60 * 1e3,
        secondary: true
      },
      {
        name: "CX",
        time: 4 * 60 * 1e3,
        secondary: false
      },
      {
        name: "PR",
        time: 2 * 60 * 1e3,
        secondary: false
      },
      {
        name: "CR",
        time: 2 * 60 * 1e3,
        secondary: true
      }
    ]
  },
  parli: {
    flows: [
      {
        name: "pro",
        columns: ["1PC", "1OC", "2PC", "2OC/OR", "PR"],
        invert: false
      },
      {
        name: "opp",
        columns: ["1OC", "2PC", "2OC/OR", "PR"],
        invert: true
      }
    ],
    timerSpeeches: [
      {
        name: "1PC",
        time: 7 * 60 * 1e3,
        secondary: false
      },
      {
        name: "1OC",
        time: 8 * 60 * 1e3,
        secondary: true
      },
      {
        name: "2PC",
        time: 8 * 60 * 1e3,
        secondary: false
      },
      {
        name: "2OC",
        time: 8 * 60 * 1e3,
        secondary: true
      },
      {
        name: "OR",
        time: 4 * 60 * 1e3,
        secondary: true
      },
      {
        name: "PR",
        time: 5 * 60 * 1e3,
        secondary: false
      }
    ]
  },
  classic: {
    flows: [
      {
        name: "aff",
        columns: ["AC", "NC/1NR", "1AR", "2NR", "2AR", "NS", "AS"],
        invert: false
      },
      {
        name: "neg",
        columns: ["NC/1NR", "1AR", "2NR", "2AR", "AS", "NS"],
        invert: true
      }
    ],
    timerSpeeches: [
      {
        name: "AC",
        time: 6 * 60 * 1e3,
        secondary: false
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: true
      },
      {
        name: "NC",
        time: 6 * 60 * 1e3,
        secondary: true
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "1NR",
        time: 5 * 60 * 1e3,
        secondary: true
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: false
      },
      {
        name: "prep",
        time: 2 * 60 * 1e3,
        secondary: false
      },
      {
        name: "1AR",
        time: 7 * 60 * 1e3,
        secondary: false
      },
      {
        name: "CX",
        time: 3 * 60 * 1e3,
        secondary: true
      },
      {
        name: "prep",
        time: 2 * 60 * 1e3,
        secondary: true
      },
      {
        name: "2NR",
        time: 6 * 60 * 1e3,
        secondary: true
      },
      {
        name: "prep",
        time: 2 * 60 * 1e3,
        secondary: false
      },
      {
        name: "2AR",
        time: 4 * 60 * 1e3,
        secondary: false
      },
      {
        name: "prep",
        time: 2 * 60 * 1e3,
        secondary: true
      },
      {
        name: "NS",
        time: 3 * 60 * 1e3,
        secondary: true
      },
      {
        name: "prep",
        time: 2 * 60 * 1e3,
        secondary: false
      },
      {
        name: "AS",
        time: 3 * 60 * 1e3,
        secondary: false
      }
    ]
  }
};
const css$8 = {
  code: ".buttons.svelte-ti4de.svelte-ti4de{display:flex;position:relative;flex-wrap:wrap;align-items:stretch;flex-direction:row;gap:var(--padding)}.hasSwitch.svelte-ti4de .buttons.svelte-ti4de{flex-direction:column}.addTab.hasSwitch.svelte-ti4de.svelte-ti4de{display:flex;flex-direction:row;justify-content:space-between}",
  map: `{"version":3,"file":"AddTab.svelte","sources":["AddTab.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Button from \\"./Button.svelte\\";\\nimport TutorialHighlight from \\"./TutorialHighlight.svelte\\";\\nimport { getDebateStyleFlow, getAllDebateStyleFlows } from \\"$lib/models/debateStyle\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport { onDestroy } from \\"svelte\\";\\nexport let addFlow;\\nexport let switchSpeakers;\\nlet primaryFlow;\\nlet secondaryFlow;\\nlet templates;\\nlet hasSwitch;\\nonDestroy(\\n  settings.subscribe([\\"any\\"], (key) => {\\n    templates = getAllDebateStyleFlows();\\n    primaryFlow = getDebateStyleFlow(\\"primary\\");\\n    secondaryFlow = getDebateStyleFlow(\\"secondary\\");\\n    if (primaryFlow != null) {\\n      hasSwitch = primaryFlow.columnsSwitch != null;\\n    }\\n  })\\n);\\nfunction flipPairs(arr) {\\n  const result = [];\\n  for (let i = 0; i < arr.length; i += 2) {\\n    if (arr[i + 1]) {\\n      result.push(arr[i + 1]);\\n      result.push(arr[i]);\\n    } else {\\n      result.push(arr[i]);\\n    }\\n  }\\n  return result;\\n}\\n$: flippedTemplates = flipPairs(templates);\\n$: currentStyleTemplates = hasSwitch && switchSpeakers ? flippedTemplates : templates;\\n<\/script>\\n\\n<div class=\\"addTab\\" class:hasSwitch class:switch={switchSpeakers}>\\n\\t<div class=\\"buttons\\">\\n\\t\\t{#each currentStyleTemplates as flow, index}\\n\\t\\t\\t{#if index === 0 || index === 1}\\n\\t\\t\\t\\t<TutorialHighlight step={5 + index}> <!-- 5 is a magic number. It is the starting step when the add tab is shown  -->\\n\\t\\t\\t\\t\\t<!-- index % 2 === (switchSpeakers ? 1 : 0) can be used instead of !flow.invert for mandatory flip-flop colors -->\\n\\t\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\t\\ttext={flow.name}\\n\\t\\t\\t\\t\\t\\tpalette={!flow.invert ? \\"accent\\" : \\"accent-secondary\\"}\\n\\t\\t\\t\\t\\t\\ticon=\\"add\\"\\n\\t\\t\\t\\t\\t\\ton:click={() => addFlow(flow)}\\n\\t\\t\\t\\t\\t\\ttooltip={\`create new \${flow.name} flow\`}\\n\\t\\t\\t\\t\\t\\tshortcut={\\n\\t\\t\\t\\t\\t\\t\\tindex === 0\\n\\t\\t\\t\\t\\t\\t\\t\\t? ['control', 'n']\\n\\t\\t\\t\\t\\t\\t\\t\\t: index === 1\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t? ['control', 'shift', 'n']\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t: null\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</TutorialHighlight>\\n\\t\\t\\t{/if}\\n\\t\\t\\t{#if index > 1} <!-- Only use the first two buttons in the tutorial -->\\n\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\ttext={flow.name}\\n\\t\\t\\t\\t\\tpalette={!flow.invert ? \\"accent\\" : \\"accent-secondary\\"}\\n\\t\\t\\t\\t\\ticon=\\"add\\"\\n\\t\\t\\t\\t\\ton:click={() => addFlow(flow)}\\n\\t\\t\\t\\t\\ttooltip={\`create new \${flow.name} flow\`}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t{/if}\\n\\t\\t{/each}\\n\\t</div>\\n\\t{#if primaryFlow != null && secondaryFlow != null && hasSwitch}\\n\\t\\t<div class=\\"switch\\">\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ttext={'first'}\\n\\t\\t\\t\\ticon=\\"arrowLeft\\"\\n\\t\\t\\t\\tpalette={switchSpeakers ? 'accent-secondary' : 'accent'}\\n\\t\\t\\t\\ttooltip={switchSpeakers\\n\\t\\t\\t\\t\\t? \`set \${primaryFlow.name} to first speaker\`\\n\\t\\t\\t\\t\\t: \`set \${secondaryFlow.name} to first speaker\`}\\n\\t\\t\\t\\ton:click={() => (switchSpeakers = !switchSpeakers)}\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.buttons {\\n\\t\\tdisplay: flex;\\n\\t\\tposition: relative;\\n\\t\\tflex-wrap: wrap;\\n\\t\\talign-items: stretch;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\t.hasSwitch .buttons {\\n\\t\\tflex-direction: column;\\n\\t}\\n\\t.addTab.hasSwitch {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tjustify-content: space-between;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAsFC,kCAAS,CACR,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,OAAO,CACpB,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,IAAI,SAAS,CACnB,CACA,uBAAU,CAAC,qBAAS,CACnB,cAAc,CAAE,MACjB,CACA,OAAO,oCAAW,CACjB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,aAClB"}`
};
function flipPairs(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 2) {
    if (arr[i + 1]) {
      result.push(arr[i + 1]);
      result.push(arr[i]);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
const AddTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let flippedTemplates;
  let currentStyleTemplates;
  let { addFlow } = $$props;
  let { switchSpeakers } = $$props;
  let primaryFlow;
  let secondaryFlow;
  let templates;
  let hasSwitch;
  onDestroy(settings.subscribe(["any"], (key) => {
    templates = getAllDebateStyleFlows();
    primaryFlow = getDebateStyleFlow("primary");
    secondaryFlow = getDebateStyleFlow("secondary");
    if (primaryFlow != null) {
      hasSwitch = primaryFlow.columnsSwitch != null;
    }
  }));
  if ($$props.addFlow === void 0 && $$bindings.addFlow && addFlow !== void 0) $$bindings.addFlow(addFlow);
  if ($$props.switchSpeakers === void 0 && $$bindings.switchSpeakers && switchSpeakers !== void 0) $$bindings.switchSpeakers(switchSpeakers);
  $$result.css.add(css$8);
  flippedTemplates = flipPairs(templates);
  currentStyleTemplates = hasSwitch && switchSpeakers ? flippedTemplates : templates;
  return `<div class="${[
    "addTab svelte-ti4de",
    (hasSwitch ? "hasSwitch" : "") + " " + (switchSpeakers ? "switch" : "")
  ].join(" ").trim()}"><div class="buttons svelte-ti4de">${each(currentStyleTemplates, (flow, index) => {
    return `${index === 0 || index === 1 ? `${validate_component(TutorialHighlight, "TutorialHighlight").$$render($$result, { step: 5 + index }, {}, {
      default: () => {
        return `  ${validate_component(Button, "Button").$$render(
          $$result,
          {
            text: flow.name,
            palette: !flow.invert ? "accent" : "accent-secondary",
            icon: "add",
            tooltip: `create new ${flow.name} flow`,
            shortcut: index === 0 ? ["control", "n"] : index === 1 ? ["control", "shift", "n"] : null
          },
          {},
          {}
        )} `;
      }
    })}` : ``} ${index > 1 ? ` ${validate_component(Button, "Button").$$render(
      $$result,
      {
        text: flow.name,
        palette: !flow.invert ? "accent" : "accent-secondary",
        icon: "add",
        tooltip: `create new ${flow.name} flow`
      },
      {},
      {}
    )}` : ``}`;
  })}</div> ${primaryFlow != null && secondaryFlow != null && hasSwitch ? `<div class="switch">${validate_component(Button, "Button").$$render(
    $$result,
    {
      text: "first",
      icon: "arrowLeft",
      palette: switchSpeakers ? "accent-secondary" : "accent",
      tooltip: switchSpeakers ? `set ${primaryFlow.name} to first speaker` : `set ${secondaryFlow.name} to first speaker`
    },
    {},
    {}
  )}</div>` : ``} </div>`;
});
const css$7 = {
  code: ".top.svelte-g3ddtd{padding-bottom:var(--padding);border-radius:var(--border-radius-small);flex:1}button.svelte-g3ddtd{border:none;background:none;display:block;width:100%;text-align:left;border-radius:var(--border-radius);color:var(--this-text);padding:var(--padding);overflow-wrap:break-word;transition:background var(--transition-speed), transform var(--transition-speed) ease;font-weight:var(--font-weight);white-space:pre-wrap}button.empty.svelte-g3ddtd{color:var(--this-text-weak)}button.svelte-g3ddtd:hover{background-color:var(--this-background-indent)}button.svelte-g3ddtd:active{transition:none;background-color:var(--this-background-active)}button.selected.svelte-g3ddtd{background-color:var(--this-background-active)}.overFirst button.svelte-g3ddtd{background-color:var(--this-background-indent);transform:translateY(calc(var(--padding) * -1))}.overSecond button.svelte-g3ddtd{background-color:var(--this-background-indent);transform:translateY(calc(var(--padding) * 1))}.dragSource button.svelte-g3ddtd{transform:none;background-color:var(--this-background-active)}",
  map: '{"version":3,"file":"Tab.svelte","sources":["Tab.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { nodes } from \\"$lib/models/store\\";\\nexport let flowId;\\nexport let selected;\\n$: node = $nodes[flowId];\\nlet flow;\\n$: {\\n  if (node != null) {\\n    flow = node.value;\\n  }\\n}\\nlet palette;\\n$: {\\n  if (flow.invert) {\\n    palette = \\"accent-secondary\\";\\n  } else {\\n    palette = \\"accent\\";\\n  }\\n}\\n<\/script>\\n\\n<div class={`top palette-${palette}`} class:invert={flow.invert}>\\n\\t<button class:selected class:empty={flow.content.length == 0} on:click>\\n\\t\\t{#if flow.content}{flow.content}{:else}no name{/if}\\n\\t</button>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tpadding-bottom: var(--padding);\\n\\t\\tborder-radius: var(--border-radius-small);\\n\\t\\tflex: 1;\\n\\t}\\n\\tbutton {\\n\\t\\tborder: none;\\n\\t\\tbackground: none;\\n\\t\\tdisplay: block;\\n\\t\\twidth: 100%;\\n\\t\\ttext-align: left;\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tcolor: var(--this-text);\\n\\t\\tpadding: var(--padding);\\n\\t\\toverflow-wrap: break-word;\\n\\t\\ttransition: background var(--transition-speed), transform var(--transition-speed) ease;\\n\\t\\tfont-weight: var(--font-weight);\\n\\t\\twhite-space: pre-wrap;\\n\\t}\\n\\tbutton.empty {\\n\\t\\tcolor: var(--this-text-weak);\\n\\t}\\n\\tbutton:hover {\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\t}\\n\\tbutton:active {\\n\\t\\ttransition: none;\\n\\t\\tbackground-color: var(--this-background-active);\\n\\t}\\n\\tbutton.selected {\\n\\t\\tbackground-color: var(--this-background-active);\\n\\t}\\n\\t:global(.overFirst) button {\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\n\\t\\ttransform: translateY(calc(var(--padding) * -1));\\n\\t}\\n\\t:global(.overSecond) button {\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\n\\t\\ttransform: translateY(calc(var(--padding) * 1));\\n\\t}\\n\\t:global(.dragSource) button {\\n\\t\\ttransform: none;\\n\\t\\tbackground-color: var(--this-background-active);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA2BC,kBAAK,CACJ,cAAc,CAAE,IAAI,SAAS,CAAC,CAC9B,aAAa,CAAE,IAAI,qBAAqB,CAAC,CACzC,IAAI,CAAE,CACP,CACA,oBAAO,CACN,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,aAAa,CAAE,UAAU,CACzB,UAAU,CAAE,UAAU,CAAC,IAAI,kBAAkB,CAAC,CAAC,CAAC,SAAS,CAAC,IAAI,kBAAkB,CAAC,CAAC,IAAI,CACtF,WAAW,CAAE,IAAI,aAAa,CAAC,CAC/B,WAAW,CAAE,QACd,CACA,MAAM,oBAAO,CACZ,KAAK,CAAE,IAAI,gBAAgB,CAC5B,CACA,oBAAM,MAAO,CACZ,gBAAgB,CAAE,IAAI,wBAAwB,CAC/C,CACA,oBAAM,OAAQ,CACb,UAAU,CAAE,IAAI,CAChB,gBAAgB,CAAE,IAAI,wBAAwB,CAC/C,CACA,MAAM,uBAAU,CACf,gBAAgB,CAAE,IAAI,wBAAwB,CAC/C,CACQ,UAAW,CAAC,oBAAO,CAC1B,gBAAgB,CAAE,IAAI,wBAAwB,CAAC,CAE/C,SAAS,CAAE,WAAW,KAAK,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAChD,CACQ,WAAY,CAAC,oBAAO,CAC3B,gBAAgB,CAAE,IAAI,wBAAwB,CAAC,CAE/C,SAAS,CAAE,WAAW,KAAK,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAC/C,CACQ,WAAY,CAAC,oBAAO,CAC3B,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,IAAI,wBAAwB,CAC/C"}'
};
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let node;
  let $nodes, $$unsubscribe_nodes;
  $$unsubscribe_nodes = subscribe(nodes, (value) => $nodes = value);
  let { flowId } = $$props;
  let { selected } = $$props;
  let flow;
  let palette;
  if ($$props.flowId === void 0 && $$bindings.flowId && flowId !== void 0) $$bindings.flowId(flowId);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  $$result.css.add(css$7);
  node = $nodes[flowId];
  {
    {
      if (node != null) {
        flow = node.value;
      }
    }
  }
  {
    {
      if (flow.invert) {
        palette = "accent-secondary";
      } else {
        palette = "accent";
      }
    }
  }
  $$unsubscribe_nodes();
  return `<div class="${[
    escape(null_to_empty(`top palette-${palette}`), true) + " svelte-g3ddtd",
    flow.invert ? "invert" : ""
  ].join(" ").trim()}"><button class="${[
    "svelte-g3ddtd",
    (selected ? "selected" : "") + " " + (flow.content.length == 0 ? "empty" : "")
  ].join(" ").trim()}">${flow.content ? `${escape(flow.content)}` : `no name`}</button> </div>`;
});
const css$6 = {
  code: ".top.svelte-17bta5g.svelte-17bta5g{padding:0;margin:0;border:none;background:none;height:100%;width:100%;color:inherit;text-align:left;border-radius:var(--border-radius);background-color:var(--background);padding:var(--padding);box-sizing:border-box;display:flex;flex-direction:column;min-width:38ch}.instruction.svelte-17bta5g.svelte-17bta5g{display:flex;flex-direction:row;align-items:center;gap:var(--padding-small);box-sizing:content-box;padding:var(--padding) var(--padding) calc(var(--padding) * 2) var(--padding);width:max-content;min-width:var(--button-size);height:var(--button-size);border:none;background:none;margin:0;text-align:left;border-radius:var(--border-radius);font-weight:var(--font-weight);color:var(--this-text);transition:background var(--transition-speed)}.instruction.svelte-17bta5g.svelte-17bta5g:last-child{padding-bottom:var(--padding)}p.svelte-17bta5g.svelte-17bta5g{display:block;color:var(--text)}.primary.svelte-17bta5g.svelte-17bta5g{color:var(--text-accent)}.secondary.svelte-17bta5g.svelte-17bta5g{color:var(--text-accent-secondary)}.tips.svelte-17bta5g.svelte-17bta5g{display:flex;flex-direction:column;padding:var(--padding);padding-bottom:var(--padding);background:var(--background-indent);border-radius:var(--border-radius);width:min-content}.tipsWrapper.svelte-17bta5g.svelte-17bta5g{padding-bottom:var(--padding)}.continue.svelte-17bta5g.svelte-17bta5g{color:var(--text-weak)}.continue.svelte-17bta5g p.svelte-17bta5g{color:var(--text-weak)}.continue.start.svelte-17bta5g.svelte-17bta5g,.continue.start.svelte-17bta5g p.svelte-17bta5g{color:var(--text)}",
  map: '{"version":3,"file":"Tutorial.svelte","sources":["Tutorial.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Icon from \\"./Icon.svelte\\";\\nimport Tooltip from \\"./Tooltip.svelte\\";\\nimport { onDestroy } from \\"svelte\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport { tutorialStep } from \\"$lib/models/store\\";\\nimport { tutorialSpan, tutorialBlock } from \\"$lib/models/transition\\";\\nimport Button from \\"./Button.svelte\\";\\nlet transitionSpeed = settings.data[\\"transitionSpeed\\"].value;\\ntutorialStep.set(0);\\nonDestroy(\\n  settings.subscribe([\\"transitionSpeed\\"], (key) => {\\n    transitionSpeed = settings.data[key].value;\\n  })\\n);\\nlet delay = 600;\\nlet tutorialEnd = 8;\\nonDestroy(() => {\\n  tutorialStep.set(0);\\n});\\nexport let showTutorial;\\nexport let savedFlowsExist;\\n<\/script>\\n\\n<button\\n\\tclass=\\"top\\"\\n\\ton:click={() => {\\n\\t\\tif ($tutorialStep < tutorialEnd) {\\n\\t\\t\\t$tutorialStep += 1;\\n\\t\\t}\\n\\t}}\\n>\\n\\t{#if $tutorialStep > 0}\\n\\t\\t<div class=\\"instruction\\" in:tutorialBlock>\\n\\t\\t\\t<Icon name=\\"arrowLeft\\" />\\n\\t\\t\\t<p>\\n\\t\\t\\t\\t<span>\\n\\t\\t\\t\\t\\tclick to go <span class=\\"primary\\">home</span>,\\n\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t{#if $tutorialStep > 1}\\n\\t\\t\\t\\t\\t<span in:tutorialSpan>\\n\\t\\t\\t\\t\\t\\tto open <span class=\\"primary\\">settings</span>,\\n\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t{#if $tutorialStep > 2}\\n\\t\\t\\t\\t\\t<span in:tutorialSpan>\\n\\t\\t\\t\\t\\t\\tto <span class=\\"secondary\\">download/upload</span>,\\n\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t{#if $tutorialStep > 3}\\n\\t\\t\\t\\t\\t<span in:tutorialSpan>\\n\\t\\t\\t\\t\\t\\tand to <span class=\\"secondary\\">share</span>\\n\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</p>\\n\\t\\t</div>\\n\\t{/if}\\n\\t{#if $tutorialStep > 4}\\n\\t\\t<div class=\\"instruction\\" in:tutorialBlock>\\n\\t\\t\\t<Icon name=\\"arrowLeft\\" />\\n\\t\\t\\t<p>\\n\\t\\t\\t\\t<span>\\n\\t\\t\\t\\t\\tclick to create a new flow on <span class=\\"primary\\">aff</span>\\n\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t{#if $tutorialStep > 5}\\n\\t\\t\\t\\t\\t<span in:tutorialSpan>\\n\\t\\t\\t\\t\\t\\tor <span class=\\"secondary\\">neg</span>\\n\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</p>\\n\\t\\t</div>\\n\\t{/if}\\n\\t{#if $tutorialStep > 6}\\n\\t\\t<div class=\\"tipsWrapper\\">\\n\\t\\t\\t<div class=\\"tips\\" in:tutorialBlock>\\n\\t\\t\\t\\t<h1>Tips</h1>\\n\\t\\t\\t\\t<div class=\\"instruction\\" in:tutorialSpan={{ delay: delay }}>\\n\\t\\t\\t\\t\\t<Icon name=\\"dots\\" />\\n\\t\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\t\\t<Tooltip content=\\"yes like this\\" inline>\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"primary\\">hover</span>\\n\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t\\t\\tover buttons to see what they do\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"instruction\\" in:tutorialSpan={{ delay: delay * 2 }}>\\n\\t\\t\\t\\t\\t<Icon name=\\"undo\\" />\\n\\t\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\t\\tuse <span class=\\"secondary\\">undo</span> and\\n\\t\\t\\t\\t\\t\\t<span class=\\"secondary\\">redo</span> if you make a mistake\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"instruction\\" in:tutorialSpan={{ delay: delay * 3 }}>\\n\\t\\t\\t\\t\\t<Icon name=\\"arrowUp\\" />\\n\\t\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\t\\tuse the <span class=\\"primary\\">arrow keys</span> to move around\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"instruction\\" in:tutorialSpan={{ delay: delay * 4 }}>\\n\\t\\t\\t\\t\\t<Icon name=\\"gear\\" />\\n\\t\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\t\\tclick on <span class=\\"primary\\">settings</span> to customize\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t{/if}\\n\\t{#if $tutorialStep >= tutorialEnd}\\n\\t\\t<div class=\\"instruction continue\\">\\n\\t\\t\\t<Icon name=\\"check\\" />\\n\\t\\t\\t<p>tutorial done</p>\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"arrowRoundLeft\\"\\n\\t\\t\\t\\ttext=\\"reset\\"\\n\\t\\t\\t\\ton:click={(event) => {\\n\\t\\t\\t\\t\\tevent.stopPropagation();\\n\\t\\t\\t\\t\\t$tutorialStep = 0;\\n\\t\\t\\t\\t}}\\n\\t\\t\\t/>\\n\\t\\t\\t{#if savedFlowsExist}\\n\\t\\t\\t\\t<Button text=\\"show saved flows\\" icon=\\"undo\\" on:click={() => (showTutorial = false)} />\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t{:else if $tutorialStep == 0}\\n\\t\\t<div class=\\"instruction continue start\\">\\n\\t\\t\\t<Icon name=\\"add\\" />\\n\\t\\t\\t<p>click to start tutorial</p>\\n\\t\\t</div>\\n\\t{:else}\\n\\t\\t<div class=\\"instruction continue\\">\\n\\t\\t\\t<Icon name=\\"add\\" />\\n\\t\\t\\t<p>click to continue ({$tutorialStep}/{tutorialEnd})</p>\\n\\t\\t</div>\\n\\t{/if}\\n</button>\\n\\n<style>\\n\\t.top {\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\tborder: none;\\n\\t\\tbackground: none;\\n\\t\\theight: 100%;\\n\\t\\twidth: 100%;\\n\\t\\tcolor: inherit;\\n\\t\\ttext-align: left;\\n\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tbackground-color: var(--background);\\n\\t\\tpadding: var(--padding);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tmin-width: 38ch;\\n\\t}\\n\\t.instruction {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--padding-small);\\n\\n\\t\\tbox-sizing: content-box;\\n\\t\\tpadding: var(--padding) var(--padding) calc(var(--padding) * 2) var(--padding);\\n\\t\\twidth: max-content;\\n\\t\\tmin-width: var(--button-size);\\n\\t\\theight: var(--button-size);\\n\\n\\t\\tborder: none;\\n\\t\\tbackground: none;\\n\\t\\tmargin: 0;\\n\\t\\ttext-align: left;\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tfont-weight: var(--font-weight);\\n\\t\\tcolor: var(--this-text);\\n\\t\\ttransition: background var(--transition-speed);\\n\\t}\\n\\t.instruction:last-child {\\n\\t\\tpadding-bottom: var(--padding);\\n\\t}\\n\\tp {\\n\\t\\tdisplay: block;\\n\\t\\tcolor: var(--text);\\n\\t}\\n\\t.primary {\\n\\t\\tcolor: var(--text-accent);\\n\\t}\\n\\t.secondary {\\n\\t\\tcolor: var(--text-accent-secondary);\\n\\t}\\n\\t.tips {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tpadding: var(--padding);\\n\\t\\tpadding-bottom: var(--padding);\\n\\t\\tbackground: var(--background-indent);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\twidth: min-content;\\n\\t}\\n\\t.tipsWrapper {\\n\\t\\tpadding-bottom: var(--padding);\\n\\t}\\n\\t.continue {\\n\\t\\tcolor: var(--text-weak);\\n\\t}\\n\\t.continue p {\\n\\t\\tcolor: var(--text-weak);\\n\\t}\\n\\t.continue.start,\\n\\t.continue.start p {\\n\\t\\tcolor: var(--text);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwIC,kCAAK,CACJ,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,IAAI,CAEhB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,SAAS,CAAE,IACZ,CACA,0CAAa,CACZ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,eAAe,CAAC,CAEzB,UAAU,CAAE,WAAW,CACvB,OAAO,CAAE,IAAI,SAAS,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,KAAK,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAC9E,KAAK,CAAE,WAAW,CAClB,SAAS,CAAE,IAAI,aAAa,CAAC,CAC7B,MAAM,CAAE,IAAI,aAAa,CAAC,CAE1B,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,WAAW,CAAE,IAAI,aAAa,CAAC,CAC/B,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,UAAU,CAAE,UAAU,CAAC,IAAI,kBAAkB,CAC9C,CACA,0CAAY,WAAY,CACvB,cAAc,CAAE,IAAI,SAAS,CAC9B,CACA,+BAAE,CACD,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,MAAM,CAClB,CACA,sCAAS,CACR,KAAK,CAAE,IAAI,aAAa,CACzB,CACA,wCAAW,CACV,KAAK,CAAE,IAAI,uBAAuB,CACnC,CACA,mCAAM,CACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,cAAc,CAAE,IAAI,SAAS,CAAC,CAC9B,UAAU,CAAE,IAAI,mBAAmB,CAAC,CACpC,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,KAAK,CAAE,WACR,CACA,0CAAa,CACZ,cAAc,CAAE,IAAI,SAAS,CAC9B,CACA,uCAAU,CACT,KAAK,CAAE,IAAI,WAAW,CACvB,CACA,wBAAS,CAAC,gBAAE,CACX,KAAK,CAAE,IAAI,WAAW,CACvB,CACA,SAAS,oCAAM,CACf,SAAS,qBAAM,CAAC,gBAAE,CACjB,KAAK,CAAE,IAAI,MAAM,CAClB"}'
};
let tutorialEnd = 8;
const Tutorial = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tutorialStep, $$unsubscribe_tutorialStep;
  $$unsubscribe_tutorialStep = subscribe(tutorialStep, (value) => $tutorialStep = value);
  settings.data["transitionSpeed"].value;
  tutorialStep.set(0);
  onDestroy(settings.subscribe(["transitionSpeed"], (key) => {
    settings.data[key].value;
  }));
  onDestroy(() => {
    tutorialStep.set(0);
  });
  let { showTutorial } = $$props;
  let { savedFlowsExist } = $$props;
  if ($$props.showTutorial === void 0 && $$bindings.showTutorial && showTutorial !== void 0) $$bindings.showTutorial(showTutorial);
  if ($$props.savedFlowsExist === void 0 && $$bindings.savedFlowsExist && savedFlowsExist !== void 0) $$bindings.savedFlowsExist(savedFlowsExist);
  $$result.css.add(css$6);
  $$unsubscribe_tutorialStep();
  return `<button class="top svelte-17bta5g">${$tutorialStep > 0 ? `<div class="instruction svelte-17bta5g">${validate_component(Icon, "Icon").$$render($$result, { name: "arrowLeft" }, {}, {})} <p class="svelte-17bta5g"><span data-svelte-h="svelte-gxnhvd">click to go <span class="primary svelte-17bta5g">home</span>,</span> ${$tutorialStep > 1 ? `<span data-svelte-h="svelte-18dac0u">to open <span class="primary svelte-17bta5g">settings</span>,</span>` : ``} ${$tutorialStep > 2 ? `<span data-svelte-h="svelte-1ukkx1b">to <span class="secondary svelte-17bta5g">download/upload</span>,</span>` : ``} ${$tutorialStep > 3 ? `<span data-svelte-h="svelte-1w1nyup">and to <span class="secondary svelte-17bta5g">share</span></span>` : ``}</p></div>` : ``} ${$tutorialStep > 4 ? `<div class="instruction svelte-17bta5g">${validate_component(Icon, "Icon").$$render($$result, { name: "arrowLeft" }, {}, {})} <p class="svelte-17bta5g"><span data-svelte-h="svelte-rq5qab">click to create a new flow on <span class="primary svelte-17bta5g">aff</span></span> ${$tutorialStep > 5 ? `<span data-svelte-h="svelte-w7hc5z">or <span class="secondary svelte-17bta5g">neg</span></span>` : ``}</p></div>` : ``} ${$tutorialStep > 6 ? `<div class="tipsWrapper svelte-17bta5g"><div class="tips svelte-17bta5g"><h1 data-svelte-h="svelte-yr8oui">Tips</h1> <div class="instruction svelte-17bta5g">${validate_component(Icon, "Icon").$$render($$result, { name: "dots" }, {}, {})} <p class="svelte-17bta5g">${validate_component(Tooltip, "Tooltip").$$render($$result, { content: "yes like this", inline: true }, {}, {
    default: () => {
      return `<span class="primary svelte-17bta5g" data-svelte-h="svelte-180235d">hover</span>`;
    }
  })}
						over buttons to see what they do</p></div> <div class="instruction svelte-17bta5g">${validate_component(Icon, "Icon").$$render($$result, { name: "undo" }, {}, {})} <p class="svelte-17bta5g" data-svelte-h="svelte-1dukc0s">use <span class="secondary svelte-17bta5g">undo</span> and
						<span class="secondary svelte-17bta5g">redo</span> if you make a mistake</p></div> <div class="instruction svelte-17bta5g">${validate_component(Icon, "Icon").$$render($$result, { name: "arrowUp" }, {}, {})} <p class="svelte-17bta5g" data-svelte-h="svelte-o9bzm5">use the <span class="primary svelte-17bta5g">arrow keys</span> to move around</p></div> <div class="instruction svelte-17bta5g">${validate_component(Icon, "Icon").$$render($$result, { name: "gear" }, {}, {})} <p class="svelte-17bta5g" data-svelte-h="svelte-wmepqf">click on <span class="primary svelte-17bta5g">settings</span> to customize</p></div></div></div>` : ``} ${$tutorialStep >= tutorialEnd ? `<div class="instruction continue svelte-17bta5g">${validate_component(Icon, "Icon").$$render($$result, { name: "check" }, {}, {})} <p class="svelte-17bta5g" data-svelte-h="svelte-u71g22">tutorial done</p> ${validate_component(Button, "Button").$$render($$result, { icon: "arrowRoundLeft", text: "reset" }, {}, {})} ${savedFlowsExist ? `${validate_component(Button, "Button").$$render($$result, { text: "show saved flows", icon: "undo" }, {}, {})}` : ``}</div>` : `${$tutorialStep == 0 ? `<div class="instruction continue start svelte-17bta5g">${validate_component(Icon, "Icon").$$render($$result, { name: "add" }, {}, {})} <p class="svelte-17bta5g" data-svelte-h="svelte-n8r9xp">click to start tutorial</p></div>` : `<div class="instruction continue svelte-17bta5g">${validate_component(Icon, "Icon").$$render($$result, { name: "add" }, {}, {})} <p class="svelte-17bta5g">click to continue (${escape($tutorialStep)}/${escape(tutorialEnd)})</p></div>`}`} </button>`;
});
const css$5 = {
  code: ".flow.svelte-7294jv.svelte-7294jv{display:grid;flex-direction:row;width:100%;position:relative;grid-template-columns:1fr auto;gap:var(--padding)}.infoView.svelte-7294jv.svelte-7294jv{overflow-x:scroll;position:relative;border-radius:var(--border-radius)}.infos.svelte-7294jv.svelte-7294jv{display:flex;flex-direction:row;width:max-content;gap:var(--padding)}.info.svelte-7294jv.svelte-7294jv{padding:var(--padding);border-radius:var(--border-radius);background-color:var(--this-background-indent);color:var(--this-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:var(--button-size);display:flex;align-items:center}.fixed.svelte-7294jv.svelte-7294jv{display:flex;flex-direction:row;gap:var(--padding)}.times.svelte-7294jv.svelte-7294jv{display:flex;flex-direction:row;align-items:center}.time.svelte-7294jv.svelte-7294jv{padding:var(--padding);border-radius:var(--border-radius);color:var(--this-text);background-color:var(--background-indent);height:var(--button-size);display:flex;align-items:center;white-space:nowrap}.hidden.svelte-7294jv>.time.svelte-7294jv{background:none}.flowButtons.svelte-7294jv.svelte-7294jv{display:flex;flex-direction:row;gap:var(--padding)}.hidden.svelte-7294jv.svelte-7294jv{z-index:900;position:absolute;top:calc(var(--button-size) + var(--padding) * 2);right:calc(-1 * var(--padding));display:flex;flex-direction:column;align-items:flex-end;gap:var(--padding);padding:var(--padding);background:var(--background-back);border-radius:var(--border-radius)}",
  map: `{"version":3,"file":"SavedFlow.svelte","sources":["SavedFlow.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Button from \\"./Button.svelte\\";\\nimport {\\n  deleteNodes,\\n  loadSavedNodes,\\n  downloadSavedNodes\\n} from \\"$lib/models/autoSave\\";\\nimport { hiddenButtons, savedFlow } from \\"$lib/models/transition\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nfunction prettyDate(date) {\\n  const today = /* @__PURE__ */ new Date();\\n  const dateObj = new Date(date);\\n  if (today.getDate() === dateObj.getDate() && today.getMonth() === dateObj.getMonth() && today.getFullYear() === dateObj.getFullYear()) {\\n    return dateObj.toLocaleTimeString(\\"en-US\\", {\\n      hour: \\"numeric\\",\\n      minute: \\"numeric\\",\\n      hour12: true\\n    });\\n  } else {\\n    return dateObj.toLocaleDateString(\\"en-US\\", {\\n      year: \\"numeric\\",\\n      month: \\"short\\",\\n      day: \\"numeric\\"\\n    });\\n  }\\n}\\nexport let flowData;\\nexport let key;\\nlet showHidden = false;\\n<\/script>\\n\\n<div class=\\"flow\\" transition:savedFlow>\\n\\t<div class=\\"infoView\\" class:customScrollbar={settings.data.customScrollbar.value}>\\n\\t\\t<div class=\\"infos\\">\\n\\t\\t\\t{#each flowData.flowInfos as info}\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"info\\"\\n\\t\\t\\t\\t\\tclass:palette-accent={!info.invert}\\n\\t\\t\\t\\t\\tclass:palette-accent-secondary={info.invert}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t{info.content}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class=\\"fixed\\">\\n\\t\\t<div class=\\"times\\">\\n\\t\\t\\t<div class=\\"time\\">\\n\\t\\t\\t\\t{prettyDate(flowData.modified)}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class=\\"flowButtons\\">\\n\\t\\t\\t<!-- TODO: add undo/redo for deleteing whole tabs -->\\n\\t\\t\\t<!-- TODO: drag to resize sidebar-->\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon=\\"open\\"\\n\\t\\t\\t\\ttext=\\"open\\"\\n\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\tloadSavedNodes(key, true);\\n\\t\\t\\t\\t}}\\n\\t\\t\\t/>\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ticon={showHidden ? 'delete' : 'ellipses'}\\n\\t\\t\\t\\ton:click={() => (showHidden = !showHidden)}\\n\\t\\t\\t/>\\n\\t\\t\\t{#if showHidden}\\n\\t\\t\\t\\t<div class=\\"hidden\\" transition:hiddenButtons>\\n\\t\\t\\t\\t\\t<div class=\\"time\\">created {prettyDate(flowData.created)}</div>\\n\\t\\t\\t\\t\\t<div class=\\"time\\">edited {prettyDate(flowData.modified)}</div>\\n\\t\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\t\\ticon=\\"copy\\"\\n\\t\\t\\t\\t\\t\\ttext={'open copy'}\\n\\t\\t\\t\\t\\t\\ttooltip={'save changes in new'}\\n\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\tloadSavedNodes(key, false);\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\t\\ticon=\\"download\\"\\n\\t\\t\\t\\t\\t\\ttext={'download'}\\n\\t\\t\\t\\t\\t\\ttooltip={'download as JSON'}\\n\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\tdownloadSavedNodes(key);\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\n\\t\\t\\t\\t\\t<Button\\n\\t\\t\\t\\t\\t\\ticon=\\"trash\\"\\n\\t\\t\\t\\t\\t\\ttext={'delete'}\\n\\t\\t\\t\\t\\t\\ttooltip={'delete flow data'}\\n\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\tdeleteNodes(key);\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.flow {\\n\\t\\tdisplay: grid;\\n\\t\\tflex-direction: row;\\n\\t\\twidth: 100%;\\n\\t\\tposition: relative;\\n\\t\\tgrid-template-columns: 1fr auto;\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\t.infoView {\\n\\t\\toverflow-x: scroll;\\n\\t\\tposition: relative;\\n\\t\\tborder-radius: var(--border-radius);\\n\\t}\\n\\t.infos {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\twidth: max-content;\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\t.info {\\n\\t\\tpadding: var(--padding);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\t\\tcolor: var(--this-text);\\n\\t\\twhite-space: nowrap;\\n\\t\\toverflow: hidden;\\n\\t\\ttext-overflow: ellipsis;\\n\\t\\theight: var(--button-size);\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t}\\n\\t.fixed {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\t.times {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t}\\n\\t.time {\\n\\t\\tpadding: var(--padding);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tcolor: var(--this-text);\\n\\t\\tbackground-color: var(--background-indent);\\n\\t\\theight: var(--button-size);\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\twhite-space: nowrap;\\n\\t}\\n\\t.hidden > .time {\\n\\t\\tbackground: none;\\n\\t}\\n\\t.flowButtons {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\n\\t.hidden {\\n\\t\\tz-index: 900;\\n\\t\\tposition: absolute;\\n\\t\\ttop: calc(var(--button-size) + var(--padding) * 2);\\n\\t\\tright: calc(-1 * var(--padding));\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\talign-items: flex-end;\\n\\t\\tgap: var(--padding);\\n\\t\\tpadding: var(--padding);\\n\\t\\tbackground: var(--background-back);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAoGC,iCAAM,CACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,qBAAqB,CAAE,GAAG,CAAC,IAAI,CAC/B,GAAG,CAAE,IAAI,SAAS,CACnB,CACA,qCAAU,CACT,UAAU,CAAE,MAAM,CAClB,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,IAAI,eAAe,CACnC,CACA,kCAAO,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,KAAK,CAAE,WAAW,CAClB,GAAG,CAAE,IAAI,SAAS,CACnB,CACA,iCAAM,CACL,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,gBAAgB,CAAE,IAAI,wBAAwB,CAAC,CAC/C,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MACd,CACA,kCAAO,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,IAAI,SAAS,CACnB,CACA,kCAAO,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MACd,CACA,iCAAM,CACL,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,gBAAgB,CAAE,IAAI,mBAAmB,CAAC,CAC1C,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,MACd,CACA,qBAAO,CAAG,mBAAM,CACf,UAAU,CAAE,IACb,CACA,wCAAa,CACZ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,GAAG,CAAE,IAAI,SAAS,CACnB,CAEA,mCAAQ,CACP,OAAO,CAAE,GAAG,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAClD,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAChC,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,QAAQ,CACrB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,aAAa,CAAE,IAAI,eAAe,CACnC"}`
};
function prettyDate(date) {
  const today = /* @__PURE__ */ new Date();
  const dateObj = new Date(date);
  if (today.getDate() === dateObj.getDate() && today.getMonth() === dateObj.getMonth() && today.getFullYear() === dateObj.getFullYear()) {
    return dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  } else {
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
}
const SavedFlow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { flowData } = $$props;
  let { key } = $$props;
  if ($$props.flowData === void 0 && $$bindings.flowData && flowData !== void 0) $$bindings.flowData(flowData);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0) $$bindings.key(key);
  $$result.css.add(css$5);
  return `<div class="flow svelte-7294jv"><div class="${[
    "infoView svelte-7294jv",
    settings.data.customScrollbar.value ? "customScrollbar" : ""
  ].join(" ").trim()}"><div class="infos svelte-7294jv">${each(flowData.flowInfos, (info) => {
    return `<div class="${[
      "info svelte-7294jv",
      (!info.invert ? "palette-accent" : "") + " " + (info.invert ? "palette-accent-secondary" : "")
    ].join(" ").trim()}">${escape(info.content)} </div>`;
  })}</div></div> <div class="fixed svelte-7294jv"><div class="times svelte-7294jv"><div class="time svelte-7294jv">${escape(prettyDate(flowData.modified))}</div></div> <div class="flowButtons svelte-7294jv">  ${validate_component(Button, "Button").$$render($$result, { icon: "open", text: "open" }, {}, {})} ${validate_component(Button, "Button").$$render($$result, { icon: "ellipses" }, {}, {})} ${``}</div></div> </div>`;
});
const css$4 = {
  code: ".top.svelte-1ijc8ye{padding:0;margin:0;border:none;background:none;height:100%;width:100%;color:inherit;text-align:left;border-radius:var(--border-radius);background-color:var(--background);box-sizing:border-box;display:flex;flex-direction:column;min-width:38ch;gap:var(--padding)}.view.svelte-1ijc8ye{overflow-y:auto}.flows.svelte-1ijc8ye{display:flex;flex-direction:column;gap:var(--padding);padding:0 var(--padding) 50vh var(--padding)}h1.svelte-1ijc8ye{margin:0;padding:0;line-height:1em;white-space:nowrap}p.svelte-1ijc8ye{margin:0;padding:0;line-height:1em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text-weak)}.above.svelte-1ijc8ye{display:flex;flex-direction:row;align-items:center;justify-content:space-between;height:calc(var(--button-size) + var(--padding) * 4);padding:0 var(--padding);gap:var(--padding);box-sizing:border-box}.title.svelte-1ijc8ye{display:flex;flex-direction:row;align-items:center;gap:var(--padding)}",
  map: '{"version":3,"file":"SavedFlows.svelte","sources":["SavedFlows.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { MAX_SAVED_FLOWS } from \\"$lib/models/autoSave\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport Button from \\"./Button.svelte\\";\\nimport SavedFlow from \\"./SavedFlow.svelte\\";\\nexport let savedFlowsDatas;\\nexport let showTutorial = false;\\n$: sortedSavedFlowsDatas = Object.entries(savedFlowsDatas).sort(\\n  (a, b) => new Date(b[1].modified).getTime() - new Date(a[1].modified).getTime()\\n);\\n<\/script>\\n\\n<div class=\\"top\\">\\n\\t<div class=\\"above\\">\\n\\t\\t<div class=\\"title\\">\\n\\t\\t\\t<h1>saved flows</h1>\\n\\t\\t\\t<Button\\n\\t\\t\\t\\ttext=\\"tutorial\\"\\n\\t\\t\\t\\ticon=\\"undo\\"\\n\\t\\t\\t\\ttooltip=\\"start tutorial\\"\\n\\t\\t\\t\\ton:click={() => (showTutorial = true)}\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t\\t<p>\\n\\t\\t\\tup to {MAX_SAVED_FLOWS} flows saved in your browser but lost when you clear cookies\\n\\t\\t</p>\\n\\t</div>\\n\\t<div class=\\"view\\" class:customScrollbar={settings.data.customScrollbar.value}>\\n\\t\\t<div class=\\"flows\\">\\n\\t\\t\\t{#each sortedSavedFlowsDatas as [key, flowData] (key)}\\n\\t\\t\\t\\t<SavedFlow {flowData} {key} />\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.top {\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\tborder: none;\\n\\t\\tbackground: none;\\n\\t\\theight: 100%;\\n\\t\\twidth: 100%;\\n\\t\\tcolor: inherit;\\n\\t\\ttext-align: left;\\n\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tbackground-color: var(--background);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tmin-width: 38ch;\\n\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\t.view {\\n\\t\\toverflow-y: auto;\\n\\t}\\n\\t.flows {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: var(--padding);\\n\\t\\tpadding: 0 var(--padding) 50vh var(--padding);\\n\\t}\\n\\th1 {\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tline-height: 1em;\\n\\t\\twhite-space: nowrap;\\n\\t}\\n\\tp {\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tline-height: 1em;\\n\\t\\twhite-space: nowrap;\\n\\t\\t/* ellipses overflow */\\n\\t\\toverflow: hidden;\\n\\t\\ttext-overflow: ellipsis;\\n\\t\\tcolor: var(--text-weak);\\n\\t}\\n\\t.above {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: space-between;\\n\\t\\theight: calc(var(--button-size) + var(--padding) * 4);\\n\\t\\tpadding: 0 var(--padding);\\n\\t\\tgap: var(--padding);\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\t.title {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--padding);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAoCC,mBAAK,CACJ,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,IAAI,CAEhB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,SAAS,CAAE,IAAI,CAEf,GAAG,CAAE,IAAI,SAAS,CACnB,CACA,oBAAM,CACL,UAAU,CAAE,IACb,CACA,qBAAO,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,OAAO,CAAE,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,IAAI,CAAC,IAAI,SAAS,CAC7C,CACA,iBAAG,CACF,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,MACd,CACA,gBAAE,CACD,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,MAAM,CAEnB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,KAAK,CAAE,IAAI,WAAW,CACvB,CACA,qBAAO,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,MAAM,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,IAAI,SAAS,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACrD,OAAO,CAAE,CAAC,CAAC,IAAI,SAAS,CAAC,CACzB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,UAAU,CAAE,UACb,CACA,qBAAO,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,SAAS,CACnB"}'
};
const SavedFlows = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sortedSavedFlowsDatas;
  let { savedFlowsDatas } = $$props;
  let { showTutorial = false } = $$props;
  if ($$props.savedFlowsDatas === void 0 && $$bindings.savedFlowsDatas && savedFlowsDatas !== void 0) $$bindings.savedFlowsDatas(savedFlowsDatas);
  if ($$props.showTutorial === void 0 && $$bindings.showTutorial && showTutorial !== void 0) $$bindings.showTutorial(showTutorial);
  $$result.css.add(css$4);
  sortedSavedFlowsDatas = Object.entries(savedFlowsDatas).sort((a, b) => new Date(b[1].modified).getTime() - new Date(a[1].modified).getTime());
  return `<div class="top svelte-1ijc8ye"><div class="above svelte-1ijc8ye"><div class="title svelte-1ijc8ye"><h1 class="svelte-1ijc8ye" data-svelte-h="svelte-1c6y4s8">saved flows</h1> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      text: "tutorial",
      icon: "undo",
      tooltip: "start tutorial"
    },
    {},
    {}
  )}</div> <p class="svelte-1ijc8ye">up to ${escape(MAX_SAVED_FLOWS)} flows saved in your browser but lost when you clear cookies</p></div> <div class="${[
    "view svelte-1ijc8ye",
    settings.data.customScrollbar.value ? "customScrollbar" : ""
  ].join(" ").trim()}"><div class="flows svelte-1ijc8ye">${each(sortedSavedFlowsDatas, ([key, flowData]) => {
    return `${validate_component(SavedFlow, "SavedFlow").$$render($$result, { flowData, key }, {}, {})}`;
  })}</div></div> </div>`;
});
const Prelude = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let savedFlowsExist;
  let $savedNodesDatas, $$unsubscribe_savedNodesDatas;
  $$unsubscribe_savedNodesDatas = subscribe(savedNodesDatas, (value) => $savedNodesDatas = value);
  let showTutorial = false;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    savedFlowsExist = Object.keys($savedNodesDatas).length > 0;
    $$rendered = `${savedFlowsExist && !showTutorial ? `${validate_component(SavedFlows, "SavedFlows").$$render(
      $$result,
      {
        savedFlowsDatas: $savedNodesDatas,
        showTutorial
      },
      {
        showTutorial: ($$value) => {
          showTutorial = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : `${validate_component(Tutorial, "Tutorial").$$render(
      $$result,
      { savedFlowsExist, showTutorial },
      {
        showTutorial: ($$value) => {
          showTutorial = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}`;
  } while (!$$settled);
  $$unsubscribe_savedNodesDatas();
  return $$rendered;
});
const css$3 = {
  code: "div.top.svelte-10onzka{display:flex;flex-direction:column;gap:var(--padding)}.timer.svelte-10onzka{display:flex;flex-direction:column;gap:var(--padding);width:100%;height:auto}.buttons.svelte-10onzka{display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%}",
  map: `{"version":3,"file":"Timers.svelte","sources":["Timers.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Timer from \\"./Timer.svelte\\";\\nimport SpeechTimer from \\"./SpeechTimer.svelte\\";\\nimport Button from \\"./Button.svelte\\";\\nimport { timer } from \\"$lib/models/transition\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport { onDestroy, tick } from \\"svelte\\";\\nimport { debateStyles, debateStyleMap } from \\"$lib/models/debateStyle\\";\\nlet states;\\nlet showTimers = false;\\nlet update = false;\\nlet debateStyleIndex = settings.data[\\"debateStyle\\"].value;\\nlet debateStyle = debateStyles[debateStyleMap[debateStyleIndex]];\\nonDestroy(\\n  settings.subscribe([\\"debateStyle\\"], (key) => {\\n    let newDebateStyleIndex = settings.data[key].value;\\n    if (newDebateStyleIndex === debateStyleIndex) return;\\n    debateStyleIndex = newDebateStyleIndex;\\n    debateStyle = debateStyles[debateStyleMap[debateStyleIndex]];\\n    resetStates();\\n    update = !update;\\n  })\\n);\\nfunction resetStates() {\\n  let newStates = {\\n    speech: {\\n      resetTimeIndex: 0,\\n      time: debateStyle?.timerSpeeches[0].time,\\n      state: { name: \\"paused\\" }\\n    }\\n  };\\n  if (debateStyle?.prepTime != null) {\\n    newStates.prep = {\\n      resetTime: debateStyle.prepTime,\\n      time: debateStyle.prepTime,\\n      state: { name: \\"paused\\" }\\n    };\\n    newStates.prepSecondary = {\\n      resetTime: debateStyle.prepTime,\\n      time: debateStyle.prepTime,\\n      state: { name: \\"paused\\" }\\n    };\\n  }\\n  states = newStates;\\n}\\nresetStates();\\n<\/script>\\n\\n<div class=\\"top\\">\\n\\t{#key update}\\n\\t\\t{#if showTimers}\\n\\t\\t\\t<div class=\\"timer\\" transition:timer>\\n\\t\\t\\t\\t{#if states.prep}\\n\\t\\t\\t\\t\\t<Timer\\n\\t\\t\\t\\t\\t\\tresetTime={states.prep.resetTime}\\n\\t\\t\\t\\t\\t\\tbind:time={states.prep.time}\\n\\t\\t\\t\\t\\t\\tbind:state={states.prep.state}\\n\\t\\t\\t\\t\\t\\tpalette={'accent'}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t{#if states.prepSecondary}\\n\\t\\t\\t\\t\\t<Timer\\n\\t\\t\\t\\t\\t\\tresetTime={states.prepSecondary.resetTime}\\n\\t\\t\\t\\t\\t\\tbind:time={states.prepSecondary.time}\\n\\t\\t\\t\\t\\t\\tbind:state={states.prepSecondary.state}\\n\\t\\t\\t\\t\\t\\tpalette={'accent-secondary'}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t<SpeechTimer\\n\\t\\t\\t\\t\\tspeeches={debateStyle.timerSpeeches}\\n\\t\\t\\t\\t\\tbind:resetTimeIndex={states.speech.resetTimeIndex}\\n\\t\\t\\t\\t\\tbind:time={states.speech.time}\\n\\t\\t\\t\\t\\tbind:state={states.speech.state}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t{/key}\\n\\t<div class=\\"buttons\\">\\n\\t\\t<Button icon={showTimers ? 'delete' : 'clock'} on:click={() => (showTimers = !showTimers)} />\\n\\t</div>\\n</div>\\n\\n<style>\\n\\tdiv.top {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: var(--padding);\\n\\t}\\n\\t.timer {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: var(--padding);\\n\\t\\twidth: 100%;\\n\\t\\theight: auto;\\n\\t}\\n\\t.buttons {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\tjustify-content: space-between;\\n\\t\\talign-items: center;\\n\\t\\twidth: 100%;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAkFC,GAAG,mBAAK,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IAAI,SAAS,CACnB,CACA,qBAAO,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IAAI,SAAS,CAAC,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACT,CACA,uBAAS,CACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IACR"}`
};
const Timers = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let debateStyleIndex = settings.data["debateStyle"].value;
  let debateStyle = debateStyles[debateStyleMap[debateStyleIndex]];
  onDestroy(settings.subscribe(["debateStyle"], (key) => {
    let newDebateStyleIndex = settings.data[key].value;
    if (newDebateStyleIndex === debateStyleIndex) return;
    debateStyleIndex = newDebateStyleIndex;
    debateStyle = debateStyles[debateStyleMap[debateStyleIndex]];
    resetStates();
  }));
  function resetStates() {
    let newStates = {
      speech: {
        resetTimeIndex: 0,
        time: debateStyle?.timerSpeeches[0].time,
        state: { name: "paused" }
      }
    };
    if (debateStyle?.prepTime != null) {
      newStates.prep = {
        resetTime: debateStyle.prepTime,
        time: debateStyle.prepTime,
        state: { name: "paused" }
      };
      newStates.prepSecondary = {
        resetTime: debateStyle.prepTime,
        time: debateStyle.prepTime,
        state: { name: "paused" }
      };
    }
  }
  resetStates();
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="top svelte-10onzka">${``} <div class="buttons svelte-10onzka">${validate_component(Button, "Button").$$render($$result, { icon: "clock" }, {}, {})}</div> </div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$2 = {
  code: ".document.svelte-1ma8c8r{background:var(--background);width:100%;height:100%;border-radius:var(--border-radius);box-sizing:border-box}.text.svelte-1ma8c8r{height:100%;width:100%;outline:none;margin:none;overflow-y:scroll;line-height:1.5em;font-size:0.9rem;background:none;border:none;color:inherit;text-decoration:inherit;box-sizing:border-box;resize:none;padding:var(--padding);padding-bottom:calc(var(--main-height) * 0.6)}.text.svelte-1ma8c8r::placeholder{color:var(--text-weak)}",
  map: '{"version":3,"file":"SideDoc.svelte","sources":["SideDoc.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { settings } from \\"$lib/models/settings\\";\\nimport { sideDocText } from \\"$lib/models/store\\";\\n<\/script>\\n\\n<div class=\\"document\\">\\n\\t<textarea class=\\"text\\" placeholder=\\"type notes here\\" bind:value={$sideDocText} class:customScrollbar={settings.data.customScrollbar.value}/>\\n</div>\\n\\n<style>\\n\\t.document {\\n\\t\\tbackground: var(--background);\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\t.text {\\n\\t\\theight: 100%;\\n\\t\\twidth: 100%;\\n\\n\\t\\toutline: none;\\n\\t\\tmargin: none;\\n\\n\\t\\toverflow-y: scroll;\\n\\n\\t\\tline-height: 1.5em;\\n\\t\\tfont-size: 0.9rem;\\n\\n\\t\\tbackground: none;\\n\\t\\tborder: none;\\n\\t\\tcolor: inherit;\\n\\t\\ttext-decoration: inherit;\\n\\t\\tbox-sizing: border-box;\\n\\n\\t\\tresize: none;\\n\\t\\tpadding: var(--padding);\\n\\t\\tpadding-bottom: calc(var(--main-height) * 0.6);\\n\\t}\\n\\n\\t.text::placeholder {\\n\\t\\tcolor: var(--text-weak);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AASC,wBAAU,CACT,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,UAAU,CAAE,UACb,CACA,oBAAM,CACL,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CAEX,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CAEZ,UAAU,CAAE,MAAM,CAElB,WAAW,CAAE,KAAK,CAClB,SAAS,CAAE,MAAM,CAEjB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,OAAO,CACd,eAAe,CAAE,OAAO,CACxB,UAAU,CAAE,UAAU,CAEtB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,cAAc,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,GAAG,CAC9C,CAEA,oBAAK,aAAc,CAClB,KAAK,CAAE,IAAI,WAAW,CACvB"}'
};
const SideDoc = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sideDocText, $$unsubscribe_sideDocText;
  $$unsubscribe_sideDocText = subscribe(sideDocText, (value) => $sideDocText = value);
  $$result.css.add(css$2);
  $$unsubscribe_sideDocText();
  return `<div class="document svelte-1ma8c8r"><textarea class="${[
    "text svelte-1ma8c8r",
    settings.data.customScrollbar.value ? "customScrollbar" : ""
  ].join(" ").trim()}" placeholder="type notes here">${escape($sideDocText || "")}</textarea> </div>`;
});
const css$1 = {
  code: ".auth-container.svelte-1rc5oi{display:flex;align-items:center;justify-content:center;width:100%;height:100%;padding:2rem;box-sizing:border-box}.auth-card.svelte-1rc5oi{background:var(--background);border-radius:var(--border-radius);padding:2.5rem;width:100%;max-width:400px;display:flex;flex-direction:column;gap:1rem}h2.svelte-1rc5oi{margin:0;font-size:1.5rem;font-weight:var(--font-weight-bold);text-align:center}.subtitle.svelte-1rc5oi{margin:0;text-align:center;opacity:0.7;font-size:0.9rem}.google-btn.svelte-1rc5oi{display:flex;align-items:center;justify-content:center;gap:0.75rem;width:100%;padding:0.75rem 1rem;border:1px solid var(--text-weak);border-radius:calc(var(--border-radius) * 0.5);background:transparent;color:inherit;font-size:1rem;cursor:pointer;transition:background var(--transition-speed) ease}.google-btn.svelte-1rc5oi:hover:not(:disabled){background:var(--background-accent-indent)}.google-btn.svelte-1rc5oi:disabled{opacity:0.5;cursor:not-allowed}.divider.svelte-1rc5oi{display:flex;align-items:center;gap:1rem;opacity:0.5;font-size:0.85rem}.divider.svelte-1rc5oi::before,.divider.svelte-1rc5oi::after{content:'';flex:1;height:1px;background:currentColor;opacity:0.3}form.svelte-1rc5oi{display:flex;flex-direction:column;gap:0.75rem}input.svelte-1rc5oi{padding:0.75rem 1rem;border:1px solid var(--text-weak);border-radius:calc(var(--border-radius) * 0.5);background:transparent;color:inherit;font-size:1rem;font-family:inherit;outline:none;transition:border-color var(--transition-speed) ease}input.svelte-1rc5oi:focus{border-color:var(--accent-text)}input.svelte-1rc5oi:disabled{opacity:0.5}.email-btn.svelte-1rc5oi{padding:0.75rem 1rem;border:none;border-radius:calc(var(--border-radius) * 0.5);background:var(--accent-text);color:var(--background);font-size:1rem;font-weight:var(--font-weight-bold);cursor:pointer;transition:opacity var(--transition-speed) ease}.email-btn.svelte-1rc5oi:hover:not(:disabled){opacity:0.9}.email-btn.svelte-1rc5oi:disabled{opacity:0.5;cursor:not-allowed}.error.svelte-1rc5oi{color:hsl(0, 70%, 60%);font-size:0.85rem;text-align:center}.success.svelte-1rc5oi{background:hsla(120, 40%, 50%, 0.15);color:hsl(120, 40%, 60%);padding:1rem;border-radius:calc(var(--border-radius) * 0.5);text-align:center;font-size:0.9rem}.switch-mode.svelte-1rc5oi{background:none;border:none;color:var(--accent-text);cursor:pointer;font-size:0.85rem;text-align:center;padding:0.5rem}.switch-mode.svelte-1rc5oi:hover{text-decoration:underline}",
  map: `{"version":3,"file":"Auth.svelte","sources":["Auth.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { signInWithGoogle, signInWithEmail, signUpWithEmail } from \\"$lib/models/auth\\";\\nlet mode = \\"login\\";\\nlet email = \\"\\";\\nlet password = \\"\\";\\nlet error = \\"\\";\\nlet loading = false;\\nlet signupSuccess = false;\\nasync function handleGoogle() {\\n  loading = true;\\n  error = \\"\\";\\n  try {\\n    await signInWithGoogle();\\n  } catch (e) {\\n    error = e.message || \\"Failed to sign in with Google\\";\\n    loading = false;\\n  }\\n}\\nasync function handleEmailSubmit() {\\n  if (!email || !password) {\\n    error = \\"Please fill in both fields\\";\\n    return;\\n  }\\n  loading = true;\\n  error = \\"\\";\\n  try {\\n    if (mode === \\"login\\") {\\n      await signInWithEmail(email, password);\\n    } else {\\n      await signUpWithEmail(email, password);\\n      signupSuccess = true;\\n      loading = false;\\n    }\\n  } catch (e) {\\n    error = e.message || \\"Authentication failed\\";\\n    loading = false;\\n  }\\n}\\n<\/script>\\n\\n<div class=\\"auth-container\\">\\n\\t<div class=\\"auth-card\\">\\n\\t\\t<h2>{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>\\n\\t\\t<p class=\\"subtitle\\">\\n\\t\\t\\t{mode === 'login' ? 'Sign in to save and share your flows' : 'Create an account to get started'}\\n\\t\\t</p>\\n\\n\\t\\t{#if signupSuccess}\\n\\t\\t\\t<div class=\\"success\\">\\n\\t\\t\\t\\tCheck your email for a confirmation link!\\n\\t\\t\\t</div>\\n\\t\\t{:else}\\n\\t\\t\\t<button class=\\"google-btn\\" on:click={handleGoogle} disabled={loading}>\\n\\t\\t\\t\\t<svg viewBox=\\"0 0 24 24\\" width=\\"20\\" height=\\"20\\">\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#4285F4\\"\\n\\t\\t\\t\\t\\t\\td=\\"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#34A853\\"\\n\\t\\t\\t\\t\\t\\td=\\"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#FBBC05\\"\\n\\t\\t\\t\\t\\t\\td=\\"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\tfill=\\"#EA4335\\"\\n\\t\\t\\t\\t\\t\\td=\\"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\tContinue with Google\\n\\t\\t\\t</button>\\n\\n\\t\\t\\t<div class=\\"divider\\">\\n\\t\\t\\t\\t<span>or</span>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<form on:submit|preventDefault={handleEmailSubmit}>\\n\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\ttype=\\"email\\"\\n\\t\\t\\t\\t\\tplaceholder=\\"Email\\"\\n\\t\\t\\t\\t\\tbind:value={email}\\n\\t\\t\\t\\t\\tdisabled={loading}\\n\\t\\t\\t\\t\\tautocomplete=\\"email\\"\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\ttype=\\"password\\"\\n\\t\\t\\t\\t\\tplaceholder=\\"Password\\"\\n\\t\\t\\t\\t\\tbind:value={password}\\n\\t\\t\\t\\t\\tdisabled={loading}\\n\\t\\t\\t\\t\\tautocomplete={mode === 'login' ? 'current-password' : 'new-password'}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{#if error}\\n\\t\\t\\t\\t\\t<div class=\\"error\\">{error}</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t<button type=\\"submit\\" class=\\"email-btn\\" disabled={loading}>\\n\\t\\t\\t\\t\\t{loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t</form>\\n\\n\\t\\t\\t<button class=\\"switch-mode\\" on:click={() => { mode = mode === 'login' ? 'signup' : 'login'; error = ''; }}>\\n\\t\\t\\t\\t{mode === 'login' ? \\"Don't have an account? Sign up\\" : 'Already have an account? Sign in'}\\n\\t\\t\\t</button>\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.auth-container {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tpadding: 2rem;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\t.auth-card {\\n\\t\\tbackground: var(--background);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tpadding: 2.5rem;\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: 400px;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 1rem;\\n\\t}\\n\\th2 {\\n\\t\\tmargin: 0;\\n\\t\\tfont-size: 1.5rem;\\n\\t\\tfont-weight: var(--font-weight-bold);\\n\\t\\ttext-align: center;\\n\\t}\\n\\t.subtitle {\\n\\t\\tmargin: 0;\\n\\t\\ttext-align: center;\\n\\t\\topacity: 0.7;\\n\\t\\tfont-size: 0.9rem;\\n\\t}\\n\\t.google-btn {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tgap: 0.75rem;\\n\\t\\twidth: 100%;\\n\\t\\tpadding: 0.75rem 1rem;\\n\\t\\tborder: 1px solid var(--text-weak);\\n\\t\\tborder-radius: calc(var(--border-radius) * 0.5);\\n\\t\\tbackground: transparent;\\n\\t\\tcolor: inherit;\\n\\t\\tfont-size: 1rem;\\n\\t\\tcursor: pointer;\\n\\t\\ttransition: background var(--transition-speed) ease;\\n\\t}\\n\\t.google-btn:hover:not(:disabled) {\\n\\t\\tbackground: var(--background-accent-indent);\\n\\t}\\n\\t.google-btn:disabled {\\n\\t\\topacity: 0.5;\\n\\t\\tcursor: not-allowed;\\n\\t}\\n\\t.divider {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 1rem;\\n\\t\\topacity: 0.5;\\n\\t\\tfont-size: 0.85rem;\\n\\t}\\n\\t.divider::before,\\n\\t.divider::after {\\n\\t\\tcontent: '';\\n\\t\\tflex: 1;\\n\\t\\theight: 1px;\\n\\t\\tbackground: currentColor;\\n\\t\\topacity: 0.3;\\n\\t}\\n\\tform {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 0.75rem;\\n\\t}\\n\\tinput {\\n\\t\\tpadding: 0.75rem 1rem;\\n\\t\\tborder: 1px solid var(--text-weak);\\n\\t\\tborder-radius: calc(var(--border-radius) * 0.5);\\n\\t\\tbackground: transparent;\\n\\t\\tcolor: inherit;\\n\\t\\tfont-size: 1rem;\\n\\t\\tfont-family: inherit;\\n\\t\\toutline: none;\\n\\t\\ttransition: border-color var(--transition-speed) ease;\\n\\t}\\n\\tinput:focus {\\n\\t\\tborder-color: var(--accent-text);\\n\\t}\\n\\tinput:disabled {\\n\\t\\topacity: 0.5;\\n\\t}\\n\\t.email-btn {\\n\\t\\tpadding: 0.75rem 1rem;\\n\\t\\tborder: none;\\n\\t\\tborder-radius: calc(var(--border-radius) * 0.5);\\n\\t\\tbackground: var(--accent-text);\\n\\t\\tcolor: var(--background);\\n\\t\\tfont-size: 1rem;\\n\\t\\tfont-weight: var(--font-weight-bold);\\n\\t\\tcursor: pointer;\\n\\t\\ttransition: opacity var(--transition-speed) ease;\\n\\t}\\n\\t.email-btn:hover:not(:disabled) {\\n\\t\\topacity: 0.9;\\n\\t}\\n\\t.email-btn:disabled {\\n\\t\\topacity: 0.5;\\n\\t\\tcursor: not-allowed;\\n\\t}\\n\\t.error {\\n\\t\\tcolor: hsl(0, 70%, 60%);\\n\\t\\tfont-size: 0.85rem;\\n\\t\\ttext-align: center;\\n\\t}\\n\\t.success {\\n\\t\\tbackground: hsla(120, 40%, 50%, 0.15);\\n\\t\\tcolor: hsl(120, 40%, 60%);\\n\\t\\tpadding: 1rem;\\n\\t\\tborder-radius: calc(var(--border-radius) * 0.5);\\n\\t\\ttext-align: center;\\n\\t\\tfont-size: 0.9rem;\\n\\t}\\n\\t.switch-mode {\\n\\t\\tbackground: none;\\n\\t\\tborder: none;\\n\\t\\tcolor: var(--accent-text);\\n\\t\\tcursor: pointer;\\n\\t\\tfont-size: 0.85rem;\\n\\t\\ttext-align: center;\\n\\t\\tpadding: 0.5rem;\\n\\t}\\n\\t.switch-mode:hover {\\n\\t\\ttext-decoration: underline;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const Auth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  $$result.css.add(css$1);
  return `<div class="auth-container svelte-1rc5oi"><div class="auth-card svelte-1rc5oi"><h2 class="svelte-1rc5oi">${escape("Sign In")}</h2> <p class="subtitle svelte-1rc5oi">${escape(
    "Sign in to save and share your flows"
  )}</p> ${`<button class="google-btn svelte-1rc5oi" ${""}><svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path></svg>
				Continue with Google</button> <div class="divider svelte-1rc5oi" data-svelte-h="svelte-10d5nsd"><span>or</span></div> <form class="svelte-1rc5oi"><input type="email" placeholder="Email" ${""} autocomplete="email" class="svelte-1rc5oi"${add_attribute("value", email, 0)}> <input type="password" placeholder="Password" ${""}${add_attribute("autocomplete", "current-password", 0)} class="svelte-1rc5oi"${add_attribute("value", password, 0)}> ${``} <button type="submit" class="email-btn svelte-1rc5oi" ${""}>${escape("Sign In")}</button></form> <button class="switch-mode svelte-1rc5oi">${escape(
    "Don't have an account? Sign up"
  )}</button>`}</div> </div>`;
});
const css = {
  code: "body.app{overflow-x:auto;overflow-y:clip}.grid.svelte-4ab3j9.svelte-4ab3j9{display:grid;gap:var(--gap);grid-template-areas:'sidebar title box-control'\n			'sidebar flow flow';grid-template-columns:var(--sidebar-width) 1fr auto;padding:var(--main-margin);width:100%;height:100%;box-sizing:border-box;position:relative}.grid.svelte-4ab3j9.svelte-4ab3j9:has(.side-doc){grid-template-areas:'sidebar title box-control side-doc'\n			'sidebar flow flow side-doc'}.grid.showPrelude.svelte-4ab3j9.svelte-4ab3j9{grid-template-areas:'sidebar prelude';grid-template-columns:var(--sidebar-width) auto}.sidebar.svelte-4ab3j9.svelte-4ab3j9{background:var(--background);width:100%;height:var(--main-height);border-radius:var(--border-radius);padding:var(--padding);grid-area:sidebar;display:flex;flex-direction:column;box-sizing:border-box}.header.svelte-4ab3j9.svelte-4ab3j9{height:auto;padding-bottom:var(--padding)}.tabs.svelte-4ab3j9.svelte-4ab3j9{overflow-y:auto;height:var(--main-height);box-sizing:border-box;position:relative}.tabScroll.svelte-4ab3j9.svelte-4ab3j9{padding:0;margin:0;padding-top:0;padding-bottom:calc(var(--view-height) * 0.6)}.title.svelte-4ab3j9.svelte-4ab3j9{background:var(--background);border-radius:var(--border-radius);width:100%;grid-area:title;height:var(--title-height)}.box-control.svelte-4ab3j9.svelte-4ab3j9{background:var(--background);border-radius:var(--border-radius);width:100%;grid-area:box-control;height:var(--title-height)}.flow.svelte-4ab3j9.svelte-4ab3j9{width:100%;overflow-x:auto;overflow-y:clip;background:var(--background);z-index:0;border-radius:var(--border-radius);grid-area:flow;height:var(--view-height)}.prelude.svelte-4ab3j9.svelte-4ab3j9{position:relative;width:calc(100vw - var(--sidebar-width) - var(--gap) * 3);height:var(--main-height);grid-area:prelude}.side-doc.svelte-4ab3j9.svelte-4ab3j9{position:relative;width:var(--side-doc-width);height:var(--main-height);grid-area:side-doc}.cloud-status.svelte-4ab3j9.svelte-4ab3j9{padding:0.25rem 0;text-align:center}.save-indicator.svelte-4ab3j9.svelte-4ab3j9{font-size:0.75rem;opacity:0.5;transition:opacity 0.3s ease}.save-indicator.saving.svelte-4ab3j9.svelte-4ab3j9{opacity:0.8}.save-indicator.saved.svelte-4ab3j9.svelte-4ab3j9{opacity:0.7;color:hsl(120, 40%, 55%)}.save-indicator.error.svelte-4ab3j9.svelte-4ab3j9{opacity:1;color:hsl(0, 60%, 55%)}.cloud-flows-section.svelte-4ab3j9.svelte-4ab3j9{display:flex;flex-direction:column;gap:2px;margin-bottom:0.25rem}.section-label.svelte-4ab3j9.svelte-4ab3j9{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.5;padding:0.35rem 0.5rem 0.15rem;font-weight:var(--font-weight-bold)}.section-divider.svelte-4ab3j9.svelte-4ab3j9{height:1px;background:currentColor;opacity:0.1;margin:0.5rem 0}.cloud-flow-item.svelte-4ab3j9.svelte-4ab3j9{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0.4rem 0.5rem;border:none;border-radius:calc(var(--border-radius) * 0.4);background:transparent;color:inherit;font-family:inherit;font-size:0.85rem;cursor:pointer;text-align:left;transition:background var(--transition-speed) ease}.cloud-flow-item.svelte-4ab3j9.svelte-4ab3j9:hover{background:var(--background-accent-indent)}.cloud-flow-item.active.svelte-4ab3j9.svelte-4ab3j9{background:var(--background-accent-active)}.cloud-flow-item.svelte-4ab3j9 .flow-title.svelte-4ab3j9{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}.shared-badge.svelte-4ab3j9.svelte-4ab3j9{font-size:0.65rem;padding:0.1rem 0.35rem;border-radius:3px;background:hsl(210, 50%, 45%);color:white;margin-left:0.5rem;flex-shrink:0}.new-flow-btn.svelte-4ab3j9.svelte-4ab3j9{width:100%;padding:0.4rem 0.5rem;border:1px dashed currentColor;border-radius:calc(var(--border-radius) * 0.4);background:transparent;color:inherit;font-family:inherit;font-size:0.8rem;cursor:pointer;opacity:0.5;transition:opacity var(--transition-speed) ease}.new-flow-btn.svelte-4ab3j9.svelte-4ab3j9:hover{opacity:0.8}.sidebar-footer.svelte-4ab3j9.svelte-4ab3j9{display:flex;flex-direction:column;gap:0.35rem;padding-top:0.5rem;margin-top:auto}.sidebar-action-btn.svelte-4ab3j9.svelte-4ab3j9{width:100%;padding:0.45rem 0.5rem;border:none;border-radius:calc(var(--border-radius) * 0.4);font-family:inherit;font-size:0.8rem;cursor:pointer;transition:opacity var(--transition-speed) ease}.sidebar-action-btn.svelte-4ab3j9.svelte-4ab3j9:hover:not(:disabled){opacity:0.85}.sidebar-action-btn.svelte-4ab3j9.svelte-4ab3j9:disabled{opacity:0.35;cursor:not-allowed}.share-btn.svelte-4ab3j9.svelte-4ab3j9{background:var(--accent-text);color:var(--background);font-weight:var(--font-weight-bold)}.signout-btn.svelte-4ab3j9.svelte-4ab3j9{background:transparent;color:inherit;opacity:0.5;border:1px solid currentColor}.signout-btn.svelte-4ab3j9.svelte-4ab3j9:hover{opacity:0.7 !important}.loading-message.svelte-4ab3j9.svelte-4ab3j9{display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:0.5;font-size:1.1rem}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Flow from \\"$lib/components/Flow.svelte\\";\\nimport Title from \\"$lib/components/Title.svelte\\";\\nimport BoxControl from \\"$lib/components/BoxControl.svelte\\";\\nimport ButtonBar from \\"$lib/components/ButtonBar.svelte\\";\\nimport DownloadUpload from \\"$lib/components/DownloadUpload.svelte\\";\\nimport Message from \\"$lib/components/Message.svelte\\";\\nimport Settings from \\"$lib/components/Settings.svelte\\";\\nimport SortableList from \\"$lib/components/SortableList.svelte\\";\\nimport AddTab from \\"$lib/components/AddTab.svelte\\";\\nimport Share from \\"$lib/components/Share.svelte\\";\\nimport Tab from \\"$lib/components/Tab.svelte\\";\\nimport { dev } from \\"$app/environment\\";\\nimport { openPopup } from \\"$lib/models/popup\\";\\nimport { onDestroy, onMount } from \\"svelte\\";\\nimport { activeMouse, flowsChange, nodes, pendingAction, currentCloudFlowId, cloudFlowList, saveStatus } from \\"$lib/models/store\\";\\nimport { createKeyDownHandler } from \\"$lib/models/key\\";\\nimport Prelude from \\"$lib/components/Prelude.svelte\\";\\nimport { loadNodes, importSettingsJson } from \\"$lib/models/file\\";\\nimport Timers from \\"$lib/components/Timers.svelte\\";\\nimport Help from \\"$lib/components/Help.svelte\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport SideDoc from \\"$lib/components/SideDoc.svelte\\";\\nimport { history } from \\"$lib/models/history\\";\\nimport { focusId, lastFocusIds, selectedFlowId } from \\"$lib/models/focus\\";\\nimport { isChangelogVersionCurrent } from \\"$lib/models/version\\";\\nimport { addNewFlow, deleteFlow, moveFlow, replaceNodes } from \\"$lib/models/nodeDecorateAction\\";\\nimport { getDebateStyleFlow } from \\"$lib/models/debateStyle\\";\\nimport Auth from \\"$lib/components/Auth.svelte\\";\\nimport ShareFlow from \\"$lib/components/ShareFlow.svelte\\";\\nimport { isLoggedIn, authLoading, signOut, currentUser } from \\"$lib/models/auth\\";\\nimport { openCloudFlow, deleteCloudFlow, startNewCloudFlow, refreshFlowList } from \\"$lib/models/autoSave\\";\\nimport { newNodes } from \\"$lib/models/store\\";\\n$: unsavedChanges = $nodes.root.children.length > 0;\\nonMount(() => {\\n  window.addEventListener(\\n    \\"dragover\\",\\n    function(e) {\\n      e.preventDefault();\\n    },\\n    false\\n  );\\n  window.addEventListener(\\n    \\"drop\\",\\n    function(e) {\\n      e.preventDefault();\\n    },\\n    false\\n  );\\n  window.addEventListener(\\"beforeunload\\", function(e) {\\n    if (unsavedChanges && !dev) {\\n      let confirmationMessage = \\"Are you sure you want to leave?\\";\\n      e.returnValue = confirmationMessage;\\n      return confirmationMessage;\\n    }\\n  });\\n});\\nlet showSideDoc = settings.data[\\"showSideDoc\\"].value;\\nonDestroy(\\n  settings.subscribe([\\"showSideDoc\\"], (key) => {\\n    showSideDoc = settings.data[key].value;\\n  })\\n);\\nfunction clickTab(id) {\\n  blurFlow();\\n  $selectedFlowId = id;\\n  focusFlow();\\n}\\nfunction focusFlow() {\\n  if ($selectedFlowId == null) return;\\n  let lastFocus = $lastFocusIds[$selectedFlowId];\\n  if (lastFocus == null) {\\n    lastFocus = $selectedFlowId;\\n  }\\n  $focusId = lastFocus;\\n}\\nfunction blurFlow() {\\n  $focusId = null;\\n}\\nfunction addFlow(style) {\\n  blurFlow();\\n  let id = addNewFlow($nodes.root.children.length, style, switchSpeakers);\\n  if (id != null) {\\n    $selectedFlowId = id;\\n    focusFlow();\\n  }\\n}\\nasync function deleteFlowAndFocus() {\\n  if ($selectedFlowId == null) return;\\n  blurFlow();\\n  let oldIndex = $nodes.root.children.indexOf($selectedFlowId);\\n  deleteFlow($selectedFlowId);\\n  let nextIndex;\\n  if (oldIndex == 0) {\\n    nextIndex = 0;\\n  } else {\\n    nextIndex = oldIndex - 1;\\n  }\\n  if ($nodes.root.children.length > 0) {\\n    $selectedFlowId = $nodes.root.children[nextIndex];\\n    focusFlow();\\n  } else {\\n    $selectedFlowId = null;\\n  }\\n}\\nfunction handleSort(e) {\\n  let { from, to } = e.detail;\\n  if (from > to) {\\n    to += 1;\\n  }\\n  moveFlow($nodes.root.children[from], to);\\n}\\nfunction handleMouseMove(e) {\\n  $activeMouse = true;\\n}\\nconst keyDownHandler = createKeyDownHandler({\\n  control: {\\n    n: {\\n      handle: () => {\\n        const style = getDebateStyleFlow(\\"primary\\");\\n        if (style == null) return;\\n        addFlow(style);\\n      },\\n      require: () => getDebateStyleFlow(\\"primary\\") != null\\n    }\\n  },\\n  \\"control shift\\": {\\n    n: {\\n      handle: () => {\\n        const style = getDebateStyleFlow(\\"secondary\\");\\n        if (style == null) return;\\n        addFlow(style);\\n      },\\n      require: () => getDebateStyleFlow(\\"secondary\\") != null\\n    }\\n  },\\n  \\"commandControl shift\\": {\\n    z: {\\n      handle: () => {\\n        if ($selectedFlowId == null) return;\\n        history.redo($selectedFlowId, $pendingAction);\\n      },\\n      require: () => {\\n        if ($selectedFlowId == null) return false;\\n        return history.canRedo($selectedFlowId, $pendingAction);\\n      },\\n      stopRepeat: false,\\n      preventDefault: \\"always\\"\\n    }\\n  },\\n  commandControl: {\\n    z: {\\n      handle: () => {\\n        if ($selectedFlowId == null) return;\\n        history.undo($selectedFlowId, $pendingAction);\\n      },\\n      require: () => {\\n        if ($selectedFlowId == null) return false;\\n        return history.canUndo($selectedFlowId, $pendingAction);\\n      },\\n      stopRepeat: false,\\n      preventDefault: \\"always\\"\\n    }\\n  },\\n  \\"commandControl alt\\": {\\n    ArrowUp: {\\n      handle: () => {\\n        if ($selectedFlowId == null) return;\\n        let index = ($nodes.root.children.indexOf($selectedFlowId) - 1) % $nodes.root.children.length;\\n        if (index < 0) {\\n          index = $nodes.root.children.length - 1;\\n        }\\n        clickTab($nodes.root.children[index]);\\n      },\\n      require: () => $nodes.root.children.length > 0,\\n      stopRepeat: false\\n    },\\n    ArrowDown: {\\n      handle: () => {\\n        if ($selectedFlowId == null) return;\\n        let index = ($nodes.root.children.indexOf($selectedFlowId) + 1) % $nodes.root.children.length;\\n        clickTab($nodes.root.children[index]);\\n      },\\n      require: () => $nodes.root.children.length > 0,\\n      stopRepeat: false\\n    }\\n  }\\n});\\nfunction handleKeydown(e) {\\n  $activeMouse = false;\\n  keyDownHandler(e);\\n}\\nfunction readUploadDragged(e) {\\n  e.preventDefault();\\n  let file = e?.dataTransfer?.files[0];\\n  if (file == void 0) {\\n    return;\\n  }\\n  let reader = new FileReader();\\n  reader.onload = function(fileLoadedEvent) {\\n    let uploadData = fileLoadedEvent.target?.result;\\n    if (uploadData == void 0) return;\\n    handleUpload(uploadData.toString());\\n  };\\n  if (file.type == \\"text/plain\\") {\\n    reader.readAsText(file, \\"UTF-8\\");\\n  } else if (file.type == \\"application/json\\") {\\n    reader.readAsText(file, \\"UTF-8\\");\\n  } else {\\n    openPopup(Message, \\"File Message\\", {\\n      message: \\"Invalid file\\",\\n      error: true\\n    });\\n  }\\n}\\nfunction readUpload() {\\n  const fileInput = document.getElementById(\\"uploadId\\");\\n  if (!fileInput?.files?.length) return;\\n  const file = fileInput.files[0];\\n  let reader = new FileReader();\\n  reader.onload = function(fileLoadedEvent) {\\n    let uploadData = fileLoadedEvent.target?.result;\\n    if (uploadData == void 0) return;\\n    handleUpload(uploadData.toString());\\n    fileInput.value = \\"\\";\\n  };\\n  reader.readAsText(file, \\"UTF-8\\");\\n}\\nfunction preventDefault(e) {\\n  e.preventDefault();\\n}\\nasync function handleUpload(data) {\\n  let dataObj = JSON.parse(data);\\n  if (dataObj[\\"isSettings\\"]) {\\n    importSettingsJson(dataObj);\\n    return;\\n  }\\n  let newNodes2 = null;\\n  try {\\n    newNodes2 = loadNodes(dataObj);\\n  } catch (e) {\\n    openPopup(Message, \\"File Message\\", {\\n      message: \\"Invalid file\\",\\n      error: true\\n    });\\n  }\\n  if (newNodes2 != null) {\\n    if (!unsavedChanges || confirm(\\"Are you sure you want to overwrite your current flows?\\")) {\\n      replaceNodes(newNodes2);\\n      $selectedFlowId = null;\\n      flowsChange();\\n    }\\n  }\\n}\\nlet switchSpeakers = false;\\nonMount(() => {\\n  document.body.classList.add(\\"app\\");\\n});\\nonDestroy(() => {\\n  document.body.classList.remove(\\"app\\");\\n  document.body.classList.remove(\\"customScrollbar\\");\\n});\\n$: {\\n  if (settings.data.customScrollbar.value) {\\n    document.body.classList.add(\\"customScrollbar\\");\\n  } else {\\n    document.body.classList.remove(\\"customScrollbar\\");\\n  }\\n}\\nfunction fixScroll(event) {\\n  const el = event.currentTarget;\\n  if (el.scrollTop !== 0) {\\n    el.scrollTop = 0;\\n  }\\n}\\n<\/script>\\n\\n<svelte:body\\n\\ton:keydown={handleKeydown}\\n\\ton:mousemove={handleMouseMove}\\n\\ton:dragenter={preventDefault}\\n\\ton:drop={readUploadDragged}\\n/>\\n<main class:activeMouse class=\\"palette-plain\\">\\n\\t<input id=\\"uploadId\\" type=\\"file\\" hidden on:change={readUpload} />\\n\\t<div class=\\"grid\\" class:showPrelude={!($nodes.root.children.length > 0)}>\\n\\t\\t<div class=\\"sidebar\\">\\n\\t\\t\\t<div class=\\"header\\">\\n\\t\\t\\t\\t<ButtonBar\\n\\t\\t\\t\\t\\tresize\\n\\t\\t\\t\\t\\tbuttons={[\\n\\t\\t\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\t\\t\\ticon: 'link',\\n\\t\\t\\t\\t\\t\\t\\tonclick: () => openPopup(Help, 'Help'),\\n\\t\\t\\t\\t\\t\\t\\ttooltip: $isChangelogVersionCurrent ? 'help' : 'new updates',\\n\\t\\t\\t\\t\\t\\t\\ttutorialHighlight: 1,\\n\\t\\t\\t\\t\\t\\t\\tnotification: !$isChangelogVersionCurrent\\n\\t\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\t\\t\\ticon: 'gear',\\n\\t\\t\\t\\t\\t\\t\\tonclick: () => openPopup(Settings, 'Settings'),\\n\\t\\t\\t\\t\\t\\t\\ttooltip: 'settings',\\n\\t\\t\\t\\t\\t\\t\\ttutorialHighlight: 2\\n\\t\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\t\\t\\ticon: 'file',\\n\\t\\t\\t\\t\\t\\t\\tonclick: () => openPopup(DownloadUpload, 'File'),\\n\\t\\t\\t\\t\\t\\t\\ttooltip: 'file',\\n\\t\\t\\t\\t\\t\\t\\ttutorialHighlight: 3\\n\\t\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\t\\t\\ticon: 'people',\\n\\t\\t\\t\\t\\t\\t\\tonclick: () => openPopup(Share, 'Share'),\\n\\t\\t\\t\\t\\t\\t\\ttooltip: 'share (p2p)',\\n\\t\\t\\t\\t\\t\\t\\ttutorialHighlight: 4\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t]}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{#if $isLoggedIn}\\n\\t\\t\\t\\t\\t<div class=\\"cloud-status\\">\\n\\t\\t\\t\\t\\t\\t<span class=\\"save-indicator\\" class:saved={$saveStatus === 'saved'} class:saving={$saveStatus === 'saving'} class:error={$saveStatus === 'error'}>\\n\\t\\t\\t\\t\\t\\t\\t{#if $saveStatus === 'saving'}Saving...{:else if $saveStatus === 'saved'}Saved ✓{:else if $saveStatus === 'error'}Save error{:else}&nbsp;{/if}\\n\\t\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"tabs\\" class:customScrollbar={settings.data.customScrollbar.value}>\\n\\t\\t\\t\\t<div class=\\"tabScroll\\">\\n\\t\\t\\t\\t\\t{#if $isLoggedIn && $cloudFlowList.length > 0}\\n\\t\\t\\t\\t\\t\\t<div class=\\"cloud-flows-section\\">\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"section-label\\">Your Flows</div>\\n\\t\\t\\t\\t\\t\\t\\t{#each $cloudFlowList as flow}\\n\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"cloud-flow-item\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tclass:active={$currentCloudFlowId === flow.id}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tclass:shared={flow.is_shared}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => openCloudFlow(flow.id)}\\n\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"flow-title\\">{flow.title || 'Untitled'}</span>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if flow.is_shared}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"shared-badge\\">shared</span>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t<button class=\\"new-flow-btn\\" on:click={() => { startNewCloudFlow(); replaceNodes(newNodes()); $selectedFlowId = null; }}>\\n\\t\\t\\t\\t\\t\\t\\t+ New Flow\\n\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t<div class=\\"section-divider\\"></div>\\n\\t\\t\\t\\t\\t\\t<div class=\\"section-label\\">Current Flow Tabs</div>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t<SortableList list={$nodes.root.children} on:sort={handleSort} let:index>\\n\\t\\t\\t\\t\\t\\t<Tab\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => clickTab($nodes.root.children[index])}\\n\\t\\t\\t\\t\\t\\t\\tflowId={$nodes.root.children[index]}\\n\\t\\t\\t\\t\\t\\t\\tselected={$selectedFlowId == $nodes.root.children[index]}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</SortableList>\\n\\t\\t\\t\\t\\t<AddTab {addFlow} bind:switchSpeakers />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"sidebar-footer\\">\\n\\t\\t\\t\\t{#if $isLoggedIn}\\n\\t\\t\\t\\t\\t<button class=\\"sidebar-action-btn share-btn\\" on:click={() => openPopup(ShareFlow, 'Share Flow')} disabled={!$currentCloudFlowId}>\\n\\t\\t\\t\\t\\t\\tShare Flow\\n\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t<button class=\\"sidebar-action-btn signout-btn\\" on:click={signOut}>\\n\\t\\t\\t\\t\\t\\tSign Out\\n\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"timer\\">\\n\\t\\t\\t\\t<Timers />\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t{#if $authLoading}\\n\\t\\t\\t<div class=\\"prelude\\">\\n\\t\\t\\t\\t<div class=\\"loading-message\\">Loading...</div>\\n\\t\\t\\t</div>\\n\\t\\t{:else if !$isLoggedIn}\\n\\t\\t\\t<div class=\\"prelude\\">\\n\\t\\t\\t\\t<Auth />\\n\\t\\t\\t</div>\\n\\t\\t{:else if $nodes.root.children.length > 0}\\n\\t\\t\\t{#if $selectedFlowId != null && $nodes[$selectedFlowId]}\\n\\t\\t\\t\\t{#key $selectedFlowId}\\n\\t\\t\\t\\t\\t<div class=\\"title\\">\\n\\t\\t\\t\\t\\t\\t<Title flowId={$selectedFlowId} deleteSelf={() => deleteFlowAndFocus()} />\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<div class=\\"box-control\\">\\n\\t\\t\\t\\t\\t\\t<BoxControl flowId={$selectedFlowId} />\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<div class=\\"flow\\" class:customScrollbar={settings.data.customScrollbar.value} on:scroll={fixScroll}>\\n\\t\\t\\t\\t\\t\\t<Flow on:focusFlow={focusFlow} flowId={$selectedFlowId} />\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/key}\\n\\t\\t\\t{/if}\\n\\t\\t\\t{#if showSideDoc}\\n\\t\\t\\t\\t<div class=\\"side-doc\\">\\n\\t\\t\\t\\t\\t<SideDoc />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t{:else}\\n\\t\\t\\t<div class=\\"prelude\\">\\n\\t\\t\\t\\t<Prelude />\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t</div>\\n</main>\\n\\n<style>\\n\\t:global(body.app) {\\n\\t\\toverflow-x: auto;\\n\\t\\toverflow-y: clip;\\n\\t}\\n\\t.grid {\\n\\t\\tdisplay: grid;\\n\\t\\tgap: var(--gap);\\n\\t\\tgrid-template-areas:\\n\\t\\t\\t'sidebar title box-control'\\n\\t\\t\\t'sidebar flow flow';\\n\\t\\tgrid-template-columns: var(--sidebar-width) 1fr auto;\\n\\t\\tpadding: var(--main-margin);\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tposition: relative;\\n\\t}\\n\\t.grid:has(.side-doc) {\\n\\t\\tgrid-template-areas:\\n\\t\\t\\t'sidebar title box-control side-doc'\\n\\t\\t\\t'sidebar flow flow side-doc';\\n\\t}\\n\\t.grid.showPrelude {\\n\\t\\tgrid-template-areas: 'sidebar prelude';\\n\\t\\tgrid-template-columns: var(--sidebar-width) auto;\\n\\t}\\n\\n\\t.sidebar {\\n\\t\\tbackground: var(--background);\\n\\t\\twidth: 100%;\\n\\t\\theight: var(--main-height);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tpadding: var(--padding);\\n\\t\\tgrid-area: sidebar;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\t.header {\\n\\t\\theight: auto;\\n\\t\\tpadding-bottom: var(--padding);\\n\\t}\\n\\t.tabs {\\n\\t\\toverflow-y: auto;\\n\\t\\theight: var(--main-height);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tposition: relative;\\n\\t}\\n\\t.tabScroll {\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\tpadding-top: 0;\\n\\t\\tpadding-bottom: calc(var(--view-height) * 0.6);\\n\\t}\\n\\n\\t.title {\\n\\t\\tbackground: var(--background);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\twidth: 100%;\\n\\t\\tgrid-area: title;\\n\\t\\theight: var(--title-height);\\n\\t}\\n\\t.box-control {\\n\\t\\tbackground: var(--background);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\twidth: 100%;\\n\\t\\tgrid-area: box-control;\\n\\t\\theight: var(--title-height);\\n\\t}\\n\\t.flow {\\n\\t\\twidth: 100%;\\n\\t\\toverflow-x: auto;\\n\\t\\toverflow-y: clip;\\n\\t\\tbackground: var(--background);\\n\\t\\tz-index: 0;\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tgrid-area: flow;\\n\\t\\theight: var(--view-height);\\n\\t}\\n\\t.prelude {\\n\\t\\tposition: relative;\\n\\t\\twidth: calc(100vw - var(--sidebar-width) - var(--gap) * 3);\\n\\t\\theight: var(--main-height);\\n\\t\\tgrid-area: prelude;\\n\\t}\\n\\t.side-doc {\\n\\t\\tposition: relative;\\n\\t\\twidth: var(--side-doc-width);\\n\\t\\theight: var(--main-height);\\n\\t\\tgrid-area: side-doc;\\n\\t}\\n\\n\\t/* ─── Cloud flow list & sidebar additions ─── */\\n\\t.cloud-status {\\n\\t\\tpadding: 0.25rem 0;\\n\\t\\ttext-align: center;\\n\\t}\\n\\t.save-indicator {\\n\\t\\tfont-size: 0.75rem;\\n\\t\\topacity: 0.5;\\n\\t\\ttransition: opacity 0.3s ease;\\n\\t}\\n\\t.save-indicator.saving {\\n\\t\\topacity: 0.8;\\n\\t}\\n\\t.save-indicator.saved {\\n\\t\\topacity: 0.7;\\n\\t\\tcolor: hsl(120, 40%, 55%);\\n\\t}\\n\\t.save-indicator.error {\\n\\t\\topacity: 1;\\n\\t\\tcolor: hsl(0, 60%, 55%);\\n\\t}\\n\\t.cloud-flows-section {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 2px;\\n\\t\\tmargin-bottom: 0.25rem;\\n\\t}\\n\\t.section-label {\\n\\t\\tfont-size: 0.7rem;\\n\\t\\ttext-transform: uppercase;\\n\\t\\tletter-spacing: 0.05em;\\n\\t\\topacity: 0.5;\\n\\t\\tpadding: 0.35rem 0.5rem 0.15rem;\\n\\t\\tfont-weight: var(--font-weight-bold);\\n\\t}\\n\\t.section-divider {\\n\\t\\theight: 1px;\\n\\t\\tbackground: currentColor;\\n\\t\\topacity: 0.1;\\n\\t\\tmargin: 0.5rem 0;\\n\\t}\\n\\t.cloud-flow-item {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: space-between;\\n\\t\\twidth: 100%;\\n\\t\\tpadding: 0.4rem 0.5rem;\\n\\t\\tborder: none;\\n\\t\\tborder-radius: calc(var(--border-radius) * 0.4);\\n\\t\\tbackground: transparent;\\n\\t\\tcolor: inherit;\\n\\t\\tfont-family: inherit;\\n\\t\\tfont-size: 0.85rem;\\n\\t\\tcursor: pointer;\\n\\t\\ttext-align: left;\\n\\t\\ttransition: background var(--transition-speed) ease;\\n\\t}\\n\\t.cloud-flow-item:hover {\\n\\t\\tbackground: var(--background-accent-indent);\\n\\t}\\n\\t.cloud-flow-item.active {\\n\\t\\tbackground: var(--background-accent-active);\\n\\t}\\n\\t.cloud-flow-item .flow-title {\\n\\t\\toverflow: hidden;\\n\\t\\ttext-overflow: ellipsis;\\n\\t\\twhite-space: nowrap;\\n\\t\\tflex: 1;\\n\\t}\\n\\t.shared-badge {\\n\\t\\tfont-size: 0.65rem;\\n\\t\\tpadding: 0.1rem 0.35rem;\\n\\t\\tborder-radius: 3px;\\n\\t\\tbackground: hsl(210, 50%, 45%);\\n\\t\\tcolor: white;\\n\\t\\tmargin-left: 0.5rem;\\n\\t\\tflex-shrink: 0;\\n\\t}\\n\\t.new-flow-btn {\\n\\t\\twidth: 100%;\\n\\t\\tpadding: 0.4rem 0.5rem;\\n\\t\\tborder: 1px dashed currentColor;\\n\\t\\tborder-radius: calc(var(--border-radius) * 0.4);\\n\\t\\tbackground: transparent;\\n\\t\\tcolor: inherit;\\n\\t\\tfont-family: inherit;\\n\\t\\tfont-size: 0.8rem;\\n\\t\\tcursor: pointer;\\n\\t\\topacity: 0.5;\\n\\t\\ttransition: opacity var(--transition-speed) ease;\\n\\t}\\n\\t.new-flow-btn:hover {\\n\\t\\topacity: 0.8;\\n\\t}\\n\\t.sidebar-footer {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 0.35rem;\\n\\t\\tpadding-top: 0.5rem;\\n\\t\\tmargin-top: auto;\\n\\t}\\n\\t.sidebar-action-btn {\\n\\t\\twidth: 100%;\\n\\t\\tpadding: 0.45rem 0.5rem;\\n\\t\\tborder: none;\\n\\t\\tborder-radius: calc(var(--border-radius) * 0.4);\\n\\t\\tfont-family: inherit;\\n\\t\\tfont-size: 0.8rem;\\n\\t\\tcursor: pointer;\\n\\t\\ttransition: opacity var(--transition-speed) ease;\\n\\t}\\n\\t.sidebar-action-btn:hover:not(:disabled) {\\n\\t\\topacity: 0.85;\\n\\t}\\n\\t.sidebar-action-btn:disabled {\\n\\t\\topacity: 0.35;\\n\\t\\tcursor: not-allowed;\\n\\t}\\n\\t.share-btn {\\n\\t\\tbackground: var(--accent-text);\\n\\t\\tcolor: var(--background);\\n\\t\\tfont-weight: var(--font-weight-bold);\\n\\t}\\n\\t.signout-btn {\\n\\t\\tbackground: transparent;\\n\\t\\tcolor: inherit;\\n\\t\\topacity: 0.5;\\n\\t\\tborder: 1px solid currentColor;\\n\\t}\\n\\t.signout-btn:hover {\\n\\t\\topacity: 0.7 !important;\\n\\t}\\n\\t.loading-message {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\topacity: 0.5;\\n\\t\\tfont-size: 1.1rem;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedFlowId, $$unsubscribe_selectedFlowId;
  let $$unsubscribe_activeMouse;
  let $nodes, $$unsubscribe_nodes;
  let $pendingAction, $$unsubscribe_pendingAction;
  let $focusId, $$unsubscribe_focusId;
  let $lastFocusIds, $$unsubscribe_lastFocusIds;
  let $isChangelogVersionCurrent, $$unsubscribe_isChangelogVersionCurrent;
  let $isLoggedIn, $$unsubscribe_isLoggedIn;
  let $saveStatus, $$unsubscribe_saveStatus;
  let $cloudFlowList, $$unsubscribe_cloudFlowList;
  let $currentCloudFlowId, $$unsubscribe_currentCloudFlowId;
  let $authLoading, $$unsubscribe_authLoading;
  $$unsubscribe_selectedFlowId = subscribe(selectedFlowId, (value) => $selectedFlowId = value);
  $$unsubscribe_activeMouse = subscribe(activeMouse, (value) => value);
  $$unsubscribe_nodes = subscribe(nodes, (value) => $nodes = value);
  $$unsubscribe_pendingAction = subscribe(pendingAction, (value) => $pendingAction = value);
  $$unsubscribe_focusId = subscribe(focusId, (value) => $focusId = value);
  $$unsubscribe_lastFocusIds = subscribe(lastFocusIds, (value) => $lastFocusIds = value);
  $$unsubscribe_isChangelogVersionCurrent = subscribe(isChangelogVersionCurrent, (value) => $isChangelogVersionCurrent = value);
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => $isLoggedIn = value);
  $$unsubscribe_saveStatus = subscribe(saveStatus, (value) => $saveStatus = value);
  $$unsubscribe_cloudFlowList = subscribe(cloudFlowList, (value) => $cloudFlowList = value);
  $$unsubscribe_currentCloudFlowId = subscribe(currentCloudFlowId, (value) => $currentCloudFlowId = value);
  $$unsubscribe_authLoading = subscribe(authLoading, (value) => $authLoading = value);
  let showSideDoc = settings.data["showSideDoc"].value;
  onDestroy(settings.subscribe(["showSideDoc"], (key) => {
    showSideDoc = settings.data[key].value;
  }));
  function clickTab(id) {
    blurFlow();
    set_store_value(selectedFlowId, $selectedFlowId = id, $selectedFlowId);
    focusFlow();
  }
  function focusFlow() {
    if ($selectedFlowId == null) return;
    let lastFocus = $lastFocusIds[$selectedFlowId];
    if (lastFocus == null) {
      lastFocus = $selectedFlowId;
    }
    set_store_value(focusId, $focusId = lastFocus, $focusId);
  }
  function blurFlow() {
    set_store_value(focusId, $focusId = null, $focusId);
  }
  function addFlow(style) {
    blurFlow();
    let id = addNewFlow($nodes.root.children.length, style, switchSpeakers);
    if (id != null) {
      set_store_value(selectedFlowId, $selectedFlowId = id, $selectedFlowId);
      focusFlow();
    }
  }
  async function deleteFlowAndFocus() {
    if ($selectedFlowId == null) return;
    blurFlow();
    let oldIndex = $nodes.root.children.indexOf($selectedFlowId);
    deleteFlow($selectedFlowId);
    let nextIndex;
    if (oldIndex == 0) {
      nextIndex = 0;
    } else {
      nextIndex = oldIndex - 1;
    }
    if ($nodes.root.children.length > 0) {
      set_store_value(selectedFlowId, $selectedFlowId = $nodes.root.children[nextIndex], $selectedFlowId);
      focusFlow();
    } else {
      set_store_value(selectedFlowId, $selectedFlowId = null, $selectedFlowId);
    }
  }
  createKeyDownHandler({
    control: {
      n: {
        handle: () => {
          const style = getDebateStyleFlow("primary");
          if (style == null) return;
          addFlow(style);
        },
        require: () => getDebateStyleFlow("primary") != null
      }
    },
    "control shift": {
      n: {
        handle: () => {
          const style = getDebateStyleFlow("secondary");
          if (style == null) return;
          addFlow(style);
        },
        require: () => getDebateStyleFlow("secondary") != null
      }
    },
    "commandControl shift": {
      z: {
        handle: () => {
          if ($selectedFlowId == null) return;
          history.redo($selectedFlowId, $pendingAction);
        },
        require: () => {
          if ($selectedFlowId == null) return false;
          return history.canRedo($selectedFlowId, $pendingAction);
        },
        stopRepeat: false,
        preventDefault: "always"
      }
    },
    commandControl: {
      z: {
        handle: () => {
          if ($selectedFlowId == null) return;
          history.undo($selectedFlowId, $pendingAction);
        },
        require: () => {
          if ($selectedFlowId == null) return false;
          return history.canUndo($selectedFlowId, $pendingAction);
        },
        stopRepeat: false,
        preventDefault: "always"
      }
    },
    "commandControl alt": {
      ArrowUp: {
        handle: () => {
          if ($selectedFlowId == null) return;
          let index = ($nodes.root.children.indexOf($selectedFlowId) - 1) % $nodes.root.children.length;
          if (index < 0) {
            index = $nodes.root.children.length - 1;
          }
          clickTab($nodes.root.children[index]);
        },
        require: () => $nodes.root.children.length > 0,
        stopRepeat: false
      },
      ArrowDown: {
        handle: () => {
          if ($selectedFlowId == null) return;
          let index = ($nodes.root.children.indexOf($selectedFlowId) + 1) % $nodes.root.children.length;
          clickTab($nodes.root.children[index]);
        },
        require: () => $nodes.root.children.length > 0,
        stopRepeat: false
      }
    }
  });
  let switchSpeakers = false;
  onDestroy(() => {
    document.body.classList.remove("app");
    document.body.classList.remove("customScrollbar");
  });
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $nodes.root.children.length > 0;
    {
      {
        if (settings.data.customScrollbar.value) {
          document.body.classList.add("customScrollbar");
        } else {
          document.body.classList.remove("customScrollbar");
        }
      }
    }
    $$rendered = ` <main class="${["palette-plain", activeMouse ? "activeMouse" : ""].join(" ").trim()}"><input id="uploadId" type="file" hidden> <div class="${[
      "grid svelte-4ab3j9",
      !($nodes.root.children.length > 0) ? "showPrelude" : ""
    ].join(" ").trim()}"><div class="sidebar svelte-4ab3j9"><div class="header svelte-4ab3j9">${validate_component(ButtonBar, "ButtonBar").$$render(
      $$result,
      {
        resize: true,
        buttons: [
          {
            icon: "link",
            onclick: () => openPopup(Help, "Help"),
            tooltip: $isChangelogVersionCurrent ? "help" : "new updates",
            tutorialHighlight: 1,
            notification: !$isChangelogVersionCurrent
          },
          {
            icon: "gear",
            onclick: () => openPopup(Settings, "Settings"),
            tooltip: "settings",
            tutorialHighlight: 2
          },
          {
            icon: "file",
            onclick: () => openPopup(DownloadUpload, "File"),
            tooltip: "file",
            tutorialHighlight: 3
          },
          {
            icon: "people",
            onclick: () => openPopup(Share, "Share"),
            tooltip: "share (p2p)",
            tutorialHighlight: 4
          }
        ]
      },
      {},
      {}
    )} ${$isLoggedIn ? `<div class="cloud-status svelte-4ab3j9"><span class="${[
      "save-indicator svelte-4ab3j9",
      ($saveStatus === "saved" ? "saved" : "") + " " + ($saveStatus === "saving" ? "saving" : "") + " " + ($saveStatus === "error" ? "error" : "")
    ].join(" ").trim()}">${$saveStatus === "saving" ? `Saving...` : `${$saveStatus === "saved" ? `Saved ✓` : `${$saveStatus === "error" ? `Save error` : ` `}`}`}</span></div>` : ``}</div> <div class="${[
      "tabs svelte-4ab3j9",
      settings.data.customScrollbar.value ? "customScrollbar" : ""
    ].join(" ").trim()}"><div class="tabScroll svelte-4ab3j9">${$isLoggedIn && $cloudFlowList.length > 0 ? `<div class="cloud-flows-section svelte-4ab3j9"><div class="section-label svelte-4ab3j9" data-svelte-h="svelte-1g1s9en">Your Flows</div> ${each($cloudFlowList, (flow) => {
      return `<button class="${[
        "cloud-flow-item svelte-4ab3j9",
        ($currentCloudFlowId === flow.id ? "active" : "") + " " + (flow.is_shared ? "shared" : "")
      ].join(" ").trim()}"><span class="flow-title svelte-4ab3j9">${escape(flow.title || "Untitled")}</span> ${flow.is_shared ? `<span class="shared-badge svelte-4ab3j9" data-svelte-h="svelte-ox5vk7">shared</span>` : ``} </button>`;
    })}</div> <button class="new-flow-btn svelte-4ab3j9" data-svelte-h="svelte-140cvvy">+ New Flow</button> <div class="section-divider svelte-4ab3j9"></div> <div class="section-label svelte-4ab3j9" data-svelte-h="svelte-15dxj9u">Current Flow Tabs</div>` : ``} ${validate_component(SortableList, "SortableList").$$render($$result, { list: $nodes.root.children }, {}, {
      default: ({ index }) => {
        return `${validate_component(Tab, "Tab").$$render(
          $$result,
          {
            flowId: $nodes.root.children[index],
            selected: $selectedFlowId == $nodes.root.children[index]
          },
          {},
          {}
        )}`;
      }
    })} ${validate_component(AddTab, "AddTab").$$render(
      $$result,
      { addFlow, switchSpeakers },
      {
        switchSpeakers: ($$value) => {
          switchSpeakers = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="sidebar-footer svelte-4ab3j9">${$isLoggedIn ? `<button class="sidebar-action-btn share-btn svelte-4ab3j9" ${!$currentCloudFlowId ? "disabled" : ""}>Share Flow</button> <button class="sidebar-action-btn signout-btn svelte-4ab3j9" data-svelte-h="svelte-r9bwis">Sign Out</button>` : ``}</div> <div class="timer">${validate_component(Timers, "Timers").$$render($$result, {}, {}, {})}</div></div> ${$authLoading ? `<div class="prelude svelte-4ab3j9" data-svelte-h="svelte-quai5n"><div class="loading-message svelte-4ab3j9">Loading...</div></div>` : `${!$isLoggedIn ? `<div class="prelude svelte-4ab3j9">${validate_component(Auth, "Auth").$$render($$result, {}, {}, {})}</div>` : `${$nodes.root.children.length > 0 ? `${$selectedFlowId != null && $nodes[$selectedFlowId] ? `<div class="title svelte-4ab3j9">${validate_component(Title, "Title").$$render(
      $$result,
      {
        flowId: $selectedFlowId,
        deleteSelf: () => deleteFlowAndFocus()
      },
      {},
      {}
    )}</div> <div class="box-control svelte-4ab3j9">${validate_component(BoxControl, "BoxControl").$$render($$result, { flowId: $selectedFlowId }, {}, {})}</div> <div class="${[
      "flow svelte-4ab3j9",
      settings.data.customScrollbar.value ? "customScrollbar" : ""
    ].join(" ").trim()}">${validate_component(Flow, "Flow").$$render($$result, { flowId: $selectedFlowId }, {}, {})}</div>` : ``} ${showSideDoc ? `<div class="side-doc svelte-4ab3j9">${validate_component(SideDoc, "SideDoc").$$render($$result, {}, {}, {})}</div>` : ``}` : `<div class="prelude svelte-4ab3j9">${validate_component(Prelude, "Prelude").$$render($$result, {}, {}, {})}</div>`}`}`}</div> </main>`;
  } while (!$$settled);
  $$unsubscribe_selectedFlowId();
  $$unsubscribe_activeMouse();
  $$unsubscribe_nodes();
  $$unsubscribe_pendingAction();
  $$unsubscribe_focusId();
  $$unsubscribe_lastFocusIds();
  $$unsubscribe_isChangelogVersionCurrent();
  $$unsubscribe_isLoggedIn();
  $$unsubscribe_saveStatus();
  $$unsubscribe_cloudFlowList();
  $$unsubscribe_currentCloudFlowId();
  $$unsubscribe_authLoading();
  return $$rendered;
});
export {
  Page as default
};
