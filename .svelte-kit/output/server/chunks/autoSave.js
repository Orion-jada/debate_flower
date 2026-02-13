import { w as writable, d as derived } from "./index.js";
import { l as set_current_component, r as run_all, p as current_component, c as create_ssr_component, a as subscribe, o as onDestroy, b as add_attribute, v as validate_component, e as escape, f as null_to_empty, q as get_store_value } from "./ssr.js";
import { I as Icon } from "./Icon.js";
import "exceljs";
import { Some, None } from "ts-results";
import { createClient } from "@supabase/supabase-js";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const SETTINGS_VERSION = 1;
class Settings {
  data;
  callbacks = { any: [] };
  constructor(settings2) {
    this.data = settings2;
  }
  init() {
    this.loadFromLocalStorage();
  }
  setValue(key, value) {
    this.data[key].value = value;
    if (this.callbacks[key]) {
      for (const callback of this.callbacks[key]) {
        callback(key);
      }
    }
    for (const callback of this.callbacks["any"]) {
      callback(key);
    }
  }
  subscribe(keys, callback) {
    for (const key of keys) {
      if (!this.callbacks[key]) {
        this.callbacks[key] = [];
      }
      this.callbacks[key].push(callback);
      callback(key);
    }
    return () => {
      for (const key of keys) {
        this.callbacks[key] = this.callbacks[key].filter((el) => el != callback);
      }
    };
  }
  convertSettingsToJson(includeDefaults) {
    const jsonSettingsData = {};
    for (const key of Object.keys(this.data)) {
      if (this.data[key].value != this.data[key].auto || includeDefaults) {
        jsonSettingsData[key] = this.data[key].value;
        if (this.data[key].type == "radio") {
          const setting = this.data[key];
          if (setting.detail.customOptionValue) {
            jsonSettingsData[key + "Custom"] = setting.detail.customOptionValue;
          }
        }
      }
    }
    let jsonData = {
      settings: jsonSettingsData,
      isSettings: true,
      version: SETTINGS_VERSION
    };
    return JSON.stringify(jsonData);
  }
  parseJsonToSettings(jsonData) {
    if (!jsonData["isSettings"]) {
      return;
    }
    const settingsData = jsonData;
    try {
      for (const key in settingsData.settings) {
        if (this.data[key] == null) {
          continue;
        }
        ;
        if (this.data[key].type == "radio") {
          const setting = this.data[key];
          if (settingsData["settings"][key + "Custom"]) {
            setting.detail.customOptionValue = settingsData["settings"][key + "Custom"];
          }
        }
        this.setValue(key, settingsData["settings"][key]);
      }
    } catch (e) {
      localStorage.setItem("settings", JSON.stringify({}));
      this.resetToAuto();
      return;
    }
  }
  saveToLocalStorage() {
    const jsonData = this.convertSettingsToJson();
    localStorage.setItem("settings", jsonData);
  }
  loadFromLocalStorage() {
    const settingsData = localStorage.getItem("settings");
    if (settingsData) {
      const settingsObj = JSON.parse(settingsData);
      this.parseJsonToSettings(settingsObj);
    }
  }
  resetToAuto() {
    for (const key in this.data) {
      this.setValue(key, this.data[key].auto);
    }
  }
  randomize() {
    for (const key in this.data) {
      const setting = this.data[key];
      if (setting.type == "slider") {
        this.setValue(
          key,
          setting.detail.min + Math.random() * (setting.detail.max - setting.detail.min)
        );
      } else if (setting.type == "radio") {
        this.setValue(key, Math.floor(Math.random() * setting.detail.options.length));
      } else if (setting.type == "toggle") {
        this.setValue(key, Math.random() < 0.5);
      } else if (setting.type == "color") {
        const r = Math.floor(Math.random() * 256).toString(16);
        const g = Math.floor(Math.random() * 256).toString(16);
        const b = Math.floor(Math.random() * 256).toString(16);
        this.setValue(key, "#" + r + g + b);
      }
    }
  }
}
const settings = new Settings({
  debateStyle: {
    name: "Debate style",
    type: "radio",
    value: 0,
    auto: 0,
    detail: {
      options: [
        "Policy",
        "Public Forum",
        "Lincoln Douglas",
        "Congress",
        "World Schools",
        "Big Questions",
        "NOF SPAR",
        "Parli",
        "Classic"
      ]
    },
    info: "Already created flows won't be affected by this setting"
  },
  LDSubstyle: {
    name: "Debate substyle",
    value: 0,
    auto: 0,
    type: "radio",
    detail: {
      options: ["Classical", "TOC Circuit"]
    },
    visibilityCondition: () => {
      return settings.data.debateStyle.value == 2;
    }
  },
  colorTheme: {
    name: "Color theme",
    type: "radio",
    value: 0,
    auto: 0,
    detail: {
      options: ["System default", "Light theme", "Dark theme", "Custom theme"]
    }
  },
  customBackgroundBack: {
    name: "Back background",
    type: "color",
    value: "#1a1a1a",
    auto: "#1a1a1a",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customBackground: {
    name: "Background",
    type: "color",
    value: "#292929",
    auto: "#292929",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customBackgroundIndent: {
    name: "Highlighted background",
    type: "color",
    value: "#3d3d3d",
    auto: "#3d3d3d",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customBackgroundActive: {
    name: "Clicked background",
    type: "color",
    value: "#4d4d4d",
    auto: "#4d4d4d",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customBackgroundSecondary: {
    name: "Background",
    type: "color",
    value: "#2e2e2e",
    auto: "#2e2e2e",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customBackgroundSecondaryIndent: {
    name: "Highlighted background",
    type: "color",
    value: "#474747",
    auto: "#474747",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customBackgroundSecondaryActive: {
    name: "Clicked background",
    type: "color",
    value: "#374143",
    auto: "#374143",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customBackgroundAccentIndent: {
    name: "Accent",
    type: "color",
    value: "#3d565c",
    auto: "#3d565c",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customBackgroundAccentActive: {
    name: "Clicked accent",
    type: "color",
    value: "#3d565c",
    auto: "#3d565c",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customBackgroundAccentSecondaryIndent: {
    name: "Accent",
    type: "color",
    value: "#373737",
    auto: "#373737",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customBackgroundAccentSecondaryActive: {
    name: "Clicked accent",
    type: "color",
    value: "#3d3d3d",
    auto: "#3d3d3d",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customText: {
    name: "Text",
    type: "color",
    value: "#cccccc",
    auto: "#cccccc",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customTextSelect: {
    name: "Selection",
    type: "color",
    value: "#4d4d4d",
    auto: "#4d4d4d",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customTextWeak: {
    name: "Weak text",
    type: "color",
    value: "#808080",
    auto: "#808080",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customTextAccent: {
    name: "Aff text",
    type: "color",
    value: "#addeeb",
    auto: "#addeeb",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customTextAccentSelect: {
    name: "Aff selection",
    type: "color",
    value: "#0b4f60",
    auto: "#0b4f60",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customTextAccentWeak: {
    name: "Aff weak text",
    type: "color",
    value: "#6c8b93",
    auto: "#6c8b93",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customTextAccentSecondary: {
    name: "Neg text",
    type: "color",
    value: "#ebc8ad",
    auto: "#ebc8ad",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customTextAccentSecondarySelect: {
    name: "Neg selection",
    type: "color",
    value: "#60300b",
    auto: "#60300b",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customTextAccentSecondaryWeak: {
    name: "Weak neg text",
    type: "color",
    value: "#937d6c",
    auto: "#937d6c",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customColor: {
    name: "Selected lines",
    type: "color",
    value: "#6b6b6b",
    auto: "#6b6b6b",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customColorFade: {
    name: "Unselected Lines",
    type: "color",
    value: "#525252",
    auto: "#525252",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customColorAccent: {
    name: "Aff selected lines",
    type: "color",
    value: "#408596",
    auto: "#408596",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customColorAccentFade: {
    name: "Aff highlighted lines",
    type: "color",
    value: "#3d5e66",
    auto: "#3d5e66",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customColorAccentSecondary: {
    name: "Neg selected lines",
    type: "color",
    value: "#966540",
    auto: "#966540",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customColorAccentSecondaryFade: {
    name: "Neg highlighted lines",
    type: "color",
    value: "#664f3d",
    auto: "#664f3d",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    }
  },
  customScrollbarThumb: {
    name: "Scrollbar thumb",
    type: "color",
    value: "#808080",
    auto: "#808080",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    },
    info: "Only works with custom scrollbars enabled"
  },
  customScrollbarThumbHover: {
    name: "Hovered scrollbar thumb",
    type: "color",
    value: "#8c8c8c",
    auto: "#8c8c8c",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    },
    info: "Only works with custom scrollbars enabled"
  },
  customScrollbarBackground: {
    name: "Scrollbar background",
    type: "color",
    value: "#1a1a1a",
    auto: "#1a1a1a",
    visibilityCondition: () => {
      return settings.data.colorTheme.value == 3;
    },
    info: "Only works with custom scrollbars enabled"
  },
  columnWidth: {
    name: "Column width",
    type: "slider",
    value: 150,
    auto: 150,
    detail: {
      min: 50,
      max: 300,
      step: 1
    }
  },
  accentHue: {
    name: "Primary color hue",
    type: "slider",
    value: 192,
    auto: 192,
    detail: {
      min: 0,
      max: 360,
      step: 1,
      hue: true
    },
    info: "This color will be used for aff",
    visibilityCondition: () => {
      return settings.data.colorTheme.value != 3;
    }
  },
  accentSecondaryHue: {
    name: "Secondary color hue",
    type: "slider",
    value: 26,
    auto: 26,
    detail: {
      min: 0,
      max: 360,
      step: 1,
      hue: true
    },
    info: "This color will be used for neg",
    visibilityCondition: () => {
      return settings.data.colorTheme.value != 3;
    }
  },
  transitionSpeed: {
    name: "Transition duration",
    type: "slider",
    value: 300,
    auto: 300,
    detail: {
      min: 0,
      max: 1e3,
      step: 1
    }
  },
  useTooltips: {
    name: "Use tooltips",
    type: "toggle",
    value: true,
    auto: true
  },
  fontSize: {
    name: "Font size",
    type: "slider",
    value: 0.9,
    auto: 0.9,
    detail: {
      min: 0.2,
      max: 2,
      step: 0.01
    }
  },
  fontWeight: {
    name: "Font weight",
    type: "slider",
    value: 300,
    auto: 300,
    detail: {
      min: 100,
      max: 900,
      step: 50
    }
  },
  fontWeightBold: {
    name: "Font weight bold",
    type: "slider",
    value: 700,
    auto: 700,
    detail: {
      min: 100,
      max: 900,
      step: 50
    }
  },
  fontFamily: {
    name: "Font",
    type: "radio",
    value: 0,
    auto: 0,
    detail: {
      options: ["Merriweather Sans", "Helvetica", "Georgia", "Courier New"],
      customOption: true,
      customOptionValue: ""
    },
    info: "Type in a custom font name if it is installed on your computer"
  },
  buttonSize: {
    name: "Button size",
    type: "slider",
    value: 20,
    auto: 20,
    detail: {
      min: 10,
      max: 50,
      step: 1
    }
  },
  lineWidth: {
    name: "Line width",
    type: "slider",
    value: 4,
    auto: 4,
    detail: {
      min: 0,
      max: 8,
      step: 1
    }
  },
  borderRadius: {
    name: "Border radius",
    type: "slider",
    value: 8,
    auto: 8,
    detail: {
      min: 0,
      max: 30,
      step: 1
    }
  },
  padding: {
    name: "Padding",
    value: 8,
    auto: 8,
    type: "slider",
    detail: {
      min: 0,
      max: 30,
      step: 1
    }
  },
  gap: {
    name: "Grid gap",
    value: 8,
    auto: 8,
    type: "slider",
    detail: {
      min: 0,
      max: 30,
      step: 1
    }
  },
  sidebarWidth: {
    name: "Sidebar width",
    value: 184,
    auto: 184,
    type: "slider",
    detail: {
      min: 50,
      max: 500,
      step: 1
    }
  },
  showUndoRedoButtons: {
    name: "Undo/redo buttons",
    value: true,
    auto: true,
    type: "toggle"
  },
  showBoxCreationButtons: {
    name: "Cell creation/deletion buttons",
    value: true,
    auto: true,
    type: "toggle"
  },
  showQuickExtensionButtons: {
    name: "Quick extension button",
    value: true,
    auto: true,
    type: "toggle"
  },
  showBoxFormatButtons: {
    name: "Cell format buttons",
    value: true,
    auto: true,
    type: "toggle"
  },
  showSideDoc: {
    name: "Show notes doc",
    value: false,
    auto: false,
    type: "toggle"
  },
  sideDocWidth: {
    name: "Notes doc width",
    value: 300,
    auto: 300,
    type: "slider",
    detail: {
      min: 50,
      max: 1e3,
      step: 1
    }
  },
  customScrollbar: {
    name: "Custom scrollbars",
    type: "toggle",
    value: false,
    auto: false,
    info: "Reload for these changes to take effect"
  },
  customScrollbarWidth: {
    name: "Custom scrollbar width",
    value: 6,
    auto: 6,
    type: "slider",
    detail: {
      min: 1,
      max: 26,
      step: 1
    },
    info: "Does not work on Firefox"
  },
  consistentEnterBehaviour: {
    name: "Pressing enter always creates new cell",
    value: false,
    auto: false,
    type: "toggle",
    info: "Reload for these changes to take effect"
  },
  tabReturnsToParent: {
    name: "Pressing tab returns to parent on overrun",
    value: false,
    auto: false,
    type: "toggle",
    info: "Reload for these changes to take effect"
  }
});
const settingsGroups = [
  {
    name: "General",
    settings: [
      "debateStyle",
      "LDSubstyle",
      "colorTheme",
      "columnWidth",
      "transitionSpeed",
      "useTooltips",
      "showSideDoc"
    ]
  },
  {
    name: "Colors",
    settings: ["colorTheme", "accentHue", "accentSecondaryHue"]
  },
  {
    name: "Background Colors",
    settings: [
      "customBackgroundBack",
      "customBackground",
      "customBackgroundIndent",
      "customBackgroundActive",
      "customBackgroundAccentIndent",
      "customBackgroundAccentActive"
    ]
  },
  {
    name: "Neg Background Colors",
    settings: [
      "customBackgroundSecondary",
      "customBackgroundSecondaryIndent",
      "customBackgroundSecondaryActive",
      "customBackgroundAccentSecondaryIndent",
      "customBackgroundAccentSecondaryActive"
    ]
  },
  {
    name: "Text Colors",
    settings: [
      "customText",
      "customTextSelect",
      "customTextWeak",
      "customTextAccent",
      "customTextAccentSelect",
      "customTextAccentWeak",
      "customTextAccentSecondary",
      "customTextAccentSecondarySelect",
      "customTextAccentSecondaryWeak"
    ]
  },
  {
    name: "Line Colors",
    settings: [
      "customColor",
      "customColorFade",
      "customColorAccent",
      "customColorAccentFade",
      "customColorAccentSecondary",
      "customColorAccentSecondaryFade"
    ]
  },
  {
    name: "Scrollbar Colors",
    settings: ["customScrollbarThumb", "customScrollbarThumbHover", "customScrollbarBackground"]
  },
  {
    name: "Font",
    settings: ["fontFamily", "fontSize", "fontWeight", "fontWeightBold"]
  },
  {
    name: "Spacing",
    settings: ["columnWidth", "sidebarWidth", "sideDocWidth", "buttonSize", "padding", "gap"]
  },
  {
    name: "Borders",
    settings: ["lineWidth", "borderRadius"]
  },
  {
    name: "Animations",
    settings: ["transitionSpeed", "useTooltips"]
  },
  {
    name: "Toolbar",
    settings: ["showUndoRedoButtons", "showBoxCreationButtons", "showQuickExtensionButtons", "showBoxFormatButtons"]
  },
  {
    name: "Scrollbars",
    settings: ["customScrollbar", "customScrollbarWidth"]
  },
  { name: "Controls", settings: ["consistentEnterBehaviour", "tabReturnsToParent"] }
];
const popups = writable([]);
function closePopup(index) {
  popups.update((popups2) => {
    popups2.splice(index, 1);
    return popups2;
  });
}
function openPopup(component, title, props) {
  popups.update((popups2) => [...popups2, { component, props, title }]);
}
const selectedFlowId = writable(null);
const focusId = writable(null);
const lastFocusIds = writable({});
function newNodes() {
  return {
    root: { value: { tag: "root" }, level: -1, parent: null, children: [] }
  };
}
const _nodesMut = writable(newNodes());
const nodes = derived(_nodesMut, (value) => value);
const connections = writable({
  tag: "empty"
});
const pendingAction = writable(null);
const tutorialStep = writable(0);
const activeMouse = writable(true);
const tooltipState = writable({
  open: false,
  claimed: false
});
const currentCloudFlowId = writable(null);
const cloudFlowList = writable([]);
const saveStatus = writable("idle");
const flowsChangeCallbacks = [];
function subscribeFlowsChange(callback) {
  flowsChangeCallbacks.push(callback);
  return () => {
    const index = flowsChangeCallbacks.indexOf(callback);
    if (index !== -1) {
      flowsChangeCallbacks.splice(index, 1);
    }
  };
}
function flowsChange() {
  flowsChangeCallbacks.forEach((callback) => callback());
}
const sideDocText = writable("");
const frozen = derived(connections, (connections2) => {
  return connections2.tag == "guest" && connections2.connection.tag == "guestConnected" && connections2.connection.awaitingSync;
});
let lastNonNullFocusId;
focusId.subscribe((value) => {
  if (value != null) {
    lastNonNullFocusId = value;
  }
});
let $nodes$4;
nodes.subscribe((nodes2) => {
  $nodes$4 = nodes2;
});
class HistoryHolder {
  histories;
  lastAddedOwner;
  constructor() {
    this.histories = {
      root: new History()
    };
    this.lastAddedOwner = null;
  }
  add(actionBundle, owner) {
    if (!Object.prototype.hasOwnProperty.call(this.histories, owner)) {
      this.histories[owner] = new History();
    }
    this.histories[owner].add(actionBundle);
    this.lastAddedOwner = owner;
  }
  undo(owner, pendingAction2) {
    if (!this.canUndo(owner, pendingAction2)) return;
    resolvePendingAction($nodes$4);
    this.histories[owner].undo();
  }
  redo(owner, pendingAction2) {
    if (!this.canRedo(owner, pendingAction2)) return;
    resolvePendingAction($nodes$4);
    this.histories[owner].redo();
  }
  canUndo(owner, pendingAction2) {
    if (pendingAction2?.ownerId == owner) return true;
    if (!Object.prototype.hasOwnProperty.call(this.histories, owner)) return false;
    return this.histories[owner].canUndo();
  }
  canRedo(owner, pendingAction2) {
    if (pendingAction2?.ownerId == owner) return false;
    if (!Object.prototype.hasOwnProperty.call(this.histories, owner)) return false;
    return this.histories[owner].canRedo();
  }
  setNextBeforeFocus(beforeFocus, owner) {
    if (!Object.prototype.hasOwnProperty.call(this.histories, owner)) {
      this.histories[owner] = new History();
    }
    this.histories[owner].setNextBeforeFocus(beforeFocus);
  }
  setPrevAfterFocus(afterFocus, owner) {
    const validOwner = owner ?? this.lastAddedOwner;
    if (validOwner == null) return;
    if (!Object.prototype.hasOwnProperty.call(this.histories, validOwner)) return;
    this.histories[validOwner].setPrevAfterFocus(afterFocus);
  }
}
class History {
  index;
  actions;
  // nextBeforeFocus is the focusId before the next action
  nextBeforeFocus;
  constructor() {
    this.index = -1;
    this.actions = [];
    this.nextBeforeFocus = null;
  }
  setNextBeforeFocus(beforeFocus) {
    if (this.nextBeforeFocus != null) return;
    this.nextBeforeFocus = beforeFocus;
  }
  setPrevAfterFocus(afterFocus) {
    if (this.actions[this.index].afterFocus != null) return;
    this.actions[this.index].afterFocus = afterFocus;
  }
  add(actionBundle) {
    const action = {
      beforeFocus: this.nextBeforeFocus ?? lastNonNullFocusId,
      afterFocus: null,
      actionBundle
    };
    this.nextBeforeFocus = null;
    this.actions = this.actions.slice(0, this.index + 1);
    this.actions.push(action);
    this.index = this.actions.length - 1;
  }
  undo() {
    if (!this.canUndo()) return;
    const action = this.actions[this.index];
    const actionBundle = applyActionBundleAndSend(structuredClone(action.actionBundle));
    if (actionBundle == null) return;
    action.actionBundle = actionBundle;
    focusId.set(action.beforeFocus);
    this.index -= 1;
  }
  redo() {
    if (!this.canRedo()) return;
    this.index += 1;
    const action = this.actions[this.index];
    const actionBundle = applyActionBundleAndSend(structuredClone(action.actionBundle));
    if (actionBundle == null) return;
    action.actionBundle = actionBundle;
    focusId.set(action.afterFocus ?? action.beforeFocus);
  }
  canUndo() {
    return this.index >= 0;
  }
  canRedo() {
    return this.index < this.actions.length - 1;
  }
}
const history = new HistoryHolder();
function syncUi(nodes2) {
  _nodesMut.set(nodes2);
}
let $nodes$3;
nodes.subscribe((nodes2) => {
  $nodes$3 = nodes2;
});
let $frozen;
frozen.subscribe((frozen2) => {
  $frozen = frozen2;
});
function constrainIndex(index, length) {
  return Math.max(0, Math.min(index, length));
}
function applyAction(nodes2, action) {
  switch (action.tag) {
    case "add": {
      const parentRes = getNode(nodes2, action.parent);
      if (!parentRes.some) return { tag: "identity" };
      const parent = parentRes.val;
      const child = {
        value: action.value,
        level: parent.level + 1,
        parent: action.parent,
        children: []
      };
      nodes2[action.id] = child;
      parent.children.splice(
        constrainIndex(action.index, parent.children.length),
        0,
        action.id
      );
      return {
        tag: "delete",
        id: action.id
      };
    }
    case "delete": {
      const nodeRes = getNode(nodes2, action.id);
      if (!nodeRes.some) return { tag: "identity" };
      const node = nodeRes.val;
      const parentRes = getNode(nodes2, node.parent);
      if (!parentRes.some) return { tag: "identity" };
      const parent = parentRes.val;
      const index = parent.children.indexOf(action.id);
      if (index == -1) return { tag: "identity" };
      parent.children.splice(index, 1);
      delete nodes2[action.id];
      return {
        tag: "add",
        parent: node.parent,
        id: action.id,
        index,
        value: node.value
      };
    }
    case "update": {
      const nodeRes = getNode(nodes2, action.id);
      if (!nodeRes.some) return { tag: "identity" };
      const node = nodeRes.val;
      const inverseAction = {
        tag: "update",
        id: action.id,
        newValue: structuredClone(node.value)
      };
      node.value = action.newValue;
      return inverseAction;
    }
    case "move": {
      const nodeRes = getNode(nodes2, action.id);
      if (!nodeRes.some) return { tag: "identity" };
      const node = nodeRes.val;
      const parentRes = getNode(nodes2, node.parent);
      if (!parentRes.some) return { tag: "identity" };
      const parent = parentRes.val;
      const index = parent.children.indexOf(action.id);
      if (index == -1) return { tag: "identity" };
      const inverseAction = {
        tag: "move",
        id: action.id,
        newIndex: index
      };
      parent.children.splice(index, 1);
      parent.children.splice(
        constrainIndex(action.newIndex, parent.children.length),
        0,
        action.id
      );
      return inverseAction;
    }
    case "replace": {
      const inverseAction = {
        tag: "replace",
        newNodes: structuredClone(nodes2)
      };
      for (const id of Object.keys(nodes2)) {
        delete nodes2[id];
      }
      for (const id of Object.keys(action.newNodes)) {
        nodes2[id] = action.newNodes[id];
      }
      return inverseAction;
    }
    case "identity":
      return action;
  }
}
function applyActionBundle(nodes2, actions, change = true) {
  if (change) {
    flowsChange();
  }
  const inverseActionBundle = [];
  for (const action of actions) {
    const inverseAction = applyAction(nodes2, action);
    inverseActionBundle.push(inverseAction);
  }
  return inverseActionBundle.toReversed();
}
function applyActionBundleAndSyncUi(actionBundle) {
  const inverseActionBundle = applyActionBundle($nodes$3, actionBundle);
  syncUi($nodes$3);
  return inverseActionBundle;
}
function toBundle(actions) {
  if (Array.isArray(actions)) {
    return actions;
  } else {
    return [actions];
  }
}
function applyActionBundleAndSend(actionBundle) {
  if ($frozen) {
    alert("You cannot make changes while waiting for sync");
    return null;
  }
  const inverseActionBundle = applyActionBundleAndSyncUi(structuredClone(actionBundle));
  sendActionBundle(actionBundle, structuredClone(inverseActionBundle));
  return inverseActionBundle;
}
function doActionBundle(actions, owner) {
  const inverseActionBundle = applyActionBundleAndSend(toBundle(structuredClone(actions)));
  if (inverseActionBundle == null) return;
  history.add(inverseActionBundle, owner);
}
let $pendingAction;
pendingAction.subscribe((value) => {
  $pendingAction = value;
});
function resolvePendingAction(nodes2) {
  if ($pendingAction == null) return;
  history.setNextBeforeFocus($pendingAction.beforeFocusId, $pendingAction.ownerId);
  const action = $pendingAction.action(nodes2);
  doActionBundle(action, $pendingAction.ownerId);
  history.setPrevAfterFocus($pendingAction.afterFocusId, $pendingAction.ownerId);
  pendingAction.set(null);
}
let $nodes$2;
nodes.subscribe((nodes2) => {
  $nodes$2 = nodes2;
});
const nodesAndFocusId = derived([nodes, focusId], function([nodes2, focusId2]) {
  return [nodes2, focusId2];
});
nodesAndFocusId.subscribe(([nodes2, focusId2]) => {
  if (focusId2 == null) return;
  const parentFlowIdRes = getParentFlowId(nodes2, focusId2);
  if (!parentFlowIdRes.some) return;
  const parentFlowId = parentFlowIdRes.val;
  lastFocusIds.update((lastFocusIds2) => {
    lastFocusIds2[parentFlowId] = focusId2;
    return lastFocusIds2;
  });
});
let $focusId = null;
focusId.subscribe((newFocusId) => {
  if ($focusId != newFocusId) {
    resolvePendingAction($nodes$2);
    $focusId = newFocusId;
  }
});
function newNodeId() {
  return crypto.randomUUID();
}
function newBoxId() {
  return newNodeId();
}
function newFlowId() {
  return newNodeId();
}
function getNode(nodes2, id) {
  const res = nodes2[id];
  if (res == void 0) return None;
  return Some(res);
}
function getParentFlowId(nodes2, id) {
  const nodeRes = getNode(nodes2, id);
  if (!nodeRes.some) return nodeRes;
  const node = nodeRes.val;
  switch (node.value.tag) {
    case "box":
      return Some(node.value.flowId);
    case "flow":
      return Some(id);
  }
}
function checkIdBox(nodes2, id) {
  const nodeRes = getNode(nodes2, id);
  if (!nodeRes.some) return null;
  const node = nodeRes.val;
  if (node == null) return null;
  if (node.value && node.value.tag === "box") return id;
  return null;
}
function isNodesWorthSaving(nodes2, ignoreFirstEmptyFlow = false) {
  if (nodes2.root.children.length == 0) return false;
  if (nodes2.root.children.length == 1 && ignoreFirstEmptyFlow) {
    const flow = getNode(nodes2, nodes2.root.children[0]).unwrap();
    if (flow.value.content != "") return true;
    if (flow.children.length == 0) return false;
    if (flow.children.length > 1) return true;
    const firstNode = getNode(nodes2, flow.children[0]).unwrap();
    if (firstNode.value.content == "" && firstNode.children.length == 0) return false;
    return true;
  } else {
    return true;
  }
}
function getAdjacentBox(nodes2, id, direction) {
  const box = nodes2[id];
  if (box == null) return null;
  const parent = nodes2[box.parent];
  if (parent == null) return null;
  const index = parent.children.indexOf(id);
  let newIndex;
  if (direction === "up") {
    newIndex = index - 1;
  } else {
    newIndex = index + 1;
  }
  if (newIndex < 0 || newIndex >= parent.children.length) {
    const parentId = checkIdBox(nodes2, box.parent);
    if (parentId == null) return null;
    let adjacentParent = getAdjacentBox(nodes2, parentId, direction);
    if (adjacentParent == null) return null;
    let node = nodes2[adjacentParent];
    if (node == null) return null;
    while (node.children.length == 0) {
      adjacentParent = getAdjacentBox(nodes2, adjacentParent, direction);
      if (adjacentParent == null) return null;
      node = nodes2[adjacentParent];
      if (node == null) return null;
    }
    node = nodes2[adjacentParent];
    if (node == null) return null;
    if (direction === "up") {
      newIndex = node.children.length - 1;
    } else {
      newIndex = 0;
    }
    return node.children[newIndex];
  } else {
    return parent.children[newIndex];
  }
}
let $connections;
connections.subscribe((connections2) => {
  $connections = connections2;
});
nodes.subscribe((nodes2) => {
});
function newActionId() {
  return crypto.randomUUID();
}
function sendActionBundle(actionBundle, inverseActionBundle) {
  if ($connections.tag === "host") {
    const id = newActionId();
    const message = {
      tag: "action",
      action: {
        id,
        actionBundle
      }
    };
    for (const connectionId of Object.keys($connections.holder)) {
      $connections.holder[connectionId].channel.send(message);
    }
  } else if ($connections.tag === "guest" && $connections.connection.tag === "guestConnected") {
    const id = newActionId();
    $connections.connection.channel.send({
      tag: "action",
      action: {
        id,
        actionBundle
      }
    });
  }
}
const css$3 = {
  code: ".element.svelte-wra7wq{width:min-content;height:min-content}.element.inline.svelte-wra7wq{display:inline-block}.tooltip.svelte-wra7wq{border:none;padding:var(--padding);color:var(--text);background-color:var(--background-back);border-radius:var(--border-radius);position:fixed;white-space:nowrap;z-index:10000;font-size:var(--font-size);box-shadow:var(--box-shadow);display:flex;flex-direction:column;gap:var(--padding-small)}.disabled.svelte-wra7wq{color:var(--text-weak)}",
  map: '{"version":3,"file":"Tooltip.svelte","sources":["Tooltip.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { tooltipTransition } from \\"../models/transition\\";\\nimport Shortcut from \\"./Shortcut.svelte\\";\\nimport { tick, onDestroy } from \\"svelte\\";\\nimport { settings } from \\"$lib/models/settings\\";\\nimport { tooltipState } from \\"$lib/models/store\\";\\nexport let content;\\nexport let shortcut = null;\\nexport let disabled = false;\\nexport let layout = \\"bottom\\";\\nexport let inline = false;\\nlet isHovered = false;\\nlet x = 0;\\nlet y = 0;\\nlet element;\\nlet tooltip;\\nlet useTooltips = true;\\nonDestroy(\\n  settings.subscribe([\\"useTooltips\\"], function() {\\n    useTooltips = settings.data.useTooltips.value;\\n  })\\n);\\nlet openTimeout = null;\\nasync function openTooltip() {\\n  isHovered = true;\\n  mouseMove();\\n  await tick();\\n  $tooltipState.open = true;\\n}\\nfunction mouseOver() {\\n  if (!isHovered) {\\n    $tooltipState.claimed = true;\\n    if ($tooltipState.open) {\\n      openTooltip();\\n    } else {\\n      if (openTimeout == null) {\\n        openTimeout = setTimeout(openTooltip, 0);\\n      }\\n    }\\n  }\\n}\\nfunction mouseMove() {\\n  if (tooltip) {\\n    let rect = element.getBoundingClientRect();\\n    if (layout == \\"bottom\\" || layout == \\"top\\") {\\n      x = rect.left - tooltip.offsetWidth / 2 + rect.width / 2;\\n      if (x < 4) {\\n        x = 4;\\n      } else if (x + tooltip.offsetWidth > window.innerWidth - 4) {\\n        x = window.innerWidth - tooltip.offsetWidth - 4;\\n      }\\n      if (layout == \\"bottom\\") {\\n        y = rect.bottom + 4;\\n      } else if (layout == \\"top\\") {\\n        y = rect.top - tooltip.offsetHeight - 4;\\n      }\\n    } else if (layout == \\"left\\" || layout == \\"right\\") {\\n      y = rect.top - tooltip.offsetHeight / 2 + rect.height / 2;\\n      if (y < 4) {\\n        y = 4;\\n      } else if (y + tooltip.offsetHeight > window.innerHeight - 4) {\\n        y = window.innerHeight - tooltip.offsetHeight - 4;\\n      }\\n      if (layout == \\"left\\") {\\n        x = rect.left - tooltip.offsetWidth - 4;\\n      } else if (layout == \\"right\\") {\\n        x = rect.right + 4;\\n      }\\n    }\\n  }\\n}\\nasync function onContentChanged() {\\n  await tick();\\n  mouseMove();\\n}\\n$: tooltip, content, shortcut, disabled, layout, onContentChanged();\\nfunction mouseLeave() {\\n  if (openTimeout != null) {\\n    clearTimeout(openTimeout);\\n    openTimeout = null;\\n  }\\n  $tooltipState.claimed = false;\\n  isHovered = false;\\n  setTimeout(function() {\\n    if (!$tooltipState.claimed) {\\n      $tooltipState.open = false;\\n    }\\n  }, 300);\\n}\\n<\/script>\\n\\n{#if content != null && useTooltips}\\n\\t<div\\n\\t\\tclass=\\"element\\"\\n\\t\\tclass:inline\\n\\t\\ton:mouseover={mouseOver}\\n\\t\\ton:focus={mouseOver}\\n\\t\\ton:mouseleave={mouseLeave}\\n\\t\\ton:blur={mouseLeave}\\n\\t\\ton:mousemove={mouseMove}\\n\\t\\tbind:this={element}\\n\\t\\trole=\\"tooltip\\"\\n\\t>\\n\\t\\t<slot />\\n\\t</div>\\n\\n\\t{#if isHovered}\\n\\t\\t<div\\n\\t\\t\\tbind:this={tooltip}\\n\\t\\t\\tstyle=\\"top: {y}px; left: {x}px;\\"\\n\\t\\t\\tclass=\\"tooltip\\"\\n\\t\\t\\ttransition:tooltipTransition\\n\\t\\t>\\n\\t\\t\\t<div class=\\"content\\">\\n\\t\\t\\t\\t{content}\\n\\t\\t\\t</div>\\n\\t\\t\\t{#if !disabled && shortcut != null}\\n\\t\\t\\t\\t<Shortcut keys={shortcut} />\\n\\t\\t\\t{/if}\\n\\t\\t\\t{#if disabled}\\n\\t\\t\\t\\t<div class=\\"disabled\\">\\n\\t\\t\\t\\t\\t{disabled}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t{/if}\\n{:else}\\n\\t<slot />\\n{/if}\\n\\n<style>\\n\\t.element {\\n\\t\\twidth: min-content;\\n\\t\\theight: min-content;\\n\\t}\\n\\t.element.inline {\\n\\t\\tdisplay: inline-block;\\n\\t}\\n\\t.tooltip {\\n\\t\\tborder: none;\\n\\t\\tpadding: var(--padding);\\n\\t\\tcolor: var(--text);\\n\\t\\tbackground-color: var(--background-back);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tposition: fixed;\\n\\t\\twhite-space: nowrap;\\n\\t\\tz-index: 10000;\\n\\t\\tfont-size: var(--font-size);\\n\\t\\tbox-shadow: var(--box-shadow);\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: var(--padding-small);\\n\\t}\\n\\t.disabled {\\n\\t\\tcolor: var(--text-weak);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAkIC,sBAAS,CACR,KAAK,CAAE,WAAW,CAClB,MAAM,CAAE,WACT,CACA,QAAQ,qBAAQ,CACf,OAAO,CAAE,YACV,CACA,sBAAS,CACR,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,gBAAgB,CAAE,IAAI,iBAAiB,CAAC,CACxC,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,QAAQ,CAAE,KAAK,CACf,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,IAAI,WAAW,CAAC,CAC3B,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IAAI,eAAe,CACzB,CACA,uBAAU,CACT,KAAK,CAAE,IAAI,WAAW,CACvB"}'
};
const Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_tooltipState;
  $$unsubscribe_tooltipState = subscribe(tooltipState, (value) => value);
  let { content } = $$props;
  let { shortcut = null } = $$props;
  let { disabled = false } = $$props;
  let { layout = "bottom" } = $$props;
  let { inline = false } = $$props;
  let element;
  let useTooltips = true;
  onDestroy(settings.subscribe(["useTooltips"], function() {
    useTooltips = settings.data.useTooltips.value;
  }));
  async function onContentChanged() {
    await tick();
  }
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  if ($$props.shortcut === void 0 && $$bindings.shortcut && shortcut !== void 0) $$bindings.shortcut(shortcut);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0) $$bindings.layout(layout);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  $$result.css.add(css$3);
  {
    onContentChanged();
  }
  $$unsubscribe_tooltipState();
  return `${content != null && useTooltips ? `<div class="${["element svelte-wra7wq", inline ? "inline" : ""].join(" ").trim()}" role="tooltip"${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</div> ${``}` : `${slots.default ? slots.default({}) : ``}`}`;
});
const css$2 = {
  code: "@keyframes svelte-1hvoabu-pulsate{0%{box-shadow:0 0 0 var(--padding-small) var(--text-weak) inset}50%{box-shadow:0 0 0 var(--padding-small) var(--text) inset}100%{box-shadow:0 0 0 var(--padding-small) var(--text-weak) inset}}.tutorialHighlight.svelte-1hvoabu{display:block;width:min-content;height:min-content;border-radius:var(--border-radius);animation:svelte-1hvoabu-pulsate 2s infinite}",
  map: '{"version":3,"file":"TutorialHighlight.svelte","sources":["TutorialHighlight.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { tutorialStep } from \\"$lib/models/store\\";\\nexport let step = null;\\nlet stepList;\\nif (typeof step === \\"number\\") {\\n  stepList = [step];\\n} else if (step === null) {\\n  stepList = [];\\n} else {\\n  stepList = step;\\n}\\n$: show = stepList.includes($tutorialStep);\\n<\/script>\\n\\n{#if show}\\n\\t<div class=\\"tutorialHighlight\\">\\n\\t\\t<slot />\\n\\t</div>\\n{:else}\\n\\t<slot />\\n{/if}\\n\\n<style>\\n\\t@keyframes pulsate {\\n\\t\\t0% {\\n\\t\\t\\tbox-shadow: 0 0 0 var(--padding-small) var(--text-weak) inset;\\n\\t\\t}\\n\\t\\t50% {\\n\\t\\t\\tbox-shadow: 0 0 0 var(--padding-small) var(--text) inset;\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\tbox-shadow: 0 0 0 var(--padding-small) var(--text-weak) inset;\\n\\t\\t}\\n\\t}\\n\\t.tutorialHighlight {\\n\\t\\tdisplay: block;\\n\\t\\twidth: min-content;\\n\\t\\theight: min-content;\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tanimation: pulsate 2s infinite;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAsBC,WAAW,sBAAQ,CAClB,EAAG,CACF,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,IAAI,WAAW,CAAC,CAAC,KACzD,CACA,GAAI,CACH,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,IAAI,MAAM,CAAC,CAAC,KACpD,CACA,IAAK,CACJ,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,IAAI,WAAW,CAAC,CAAC,KACzD,CACD,CACA,iCAAmB,CAClB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,WAAW,CAClB,MAAM,CAAE,WAAW,CACnB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,SAAS,CAAE,sBAAO,CAAC,EAAE,CAAC,QACvB"}'
};
const TutorialHighlight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let show;
  let $tutorialStep, $$unsubscribe_tutorialStep;
  $$unsubscribe_tutorialStep = subscribe(tutorialStep, (value) => $tutorialStep = value);
  let { step = null } = $$props;
  let stepList;
  if (typeof step === "number") {
    stepList = [step];
  } else if (step === null) {
    stepList = [];
  } else {
    stepList = step;
  }
  if ($$props.step === void 0 && $$bindings.step && step !== void 0) $$bindings.step(step);
  $$result.css.add(css$2);
  show = stepList.includes($tutorialStep);
  $$unsubscribe_tutorialStep();
  return `${show ? `<div class="tutorialHighlight svelte-1hvoabu">${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`}`;
});
const css$1 = {
  code: "a.svelte-in9ows{display:block;color:inherit;text-decoration:none}",
  map: '{"version":3,"file":"Link.svelte","sources":["Link.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let link = null;\\nexport let target = null;\\n<\/script>\\n\\n{#if link}\\n\\t<a href={link} {target}>\\n\\t\\t<slot />\\n\\t</a>\\n{:else}\\n\\t<slot />\\n{/if}\\n\\n<style>\\n\\ta {\\n\\t\\tdisplay: block;\\n\\t\\tcolor: inherit;\\n\\t\\ttext-decoration: none;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAaC,eAAE,CACD,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,OAAO,CACd,eAAe,CAAE,IAClB"}'
};
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { link = null } = $$props;
  let { target = null } = $$props;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0) $$bindings.link(link);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
  $$result.css.add(css$1);
  return `${link ? `<a${add_attribute("href", link, 0)}${add_attribute("target", target, 0)} class="svelte-in9ows">${slots.default ? slots.default({}) : ``}</a>` : `${slots.default ? slots.default({}) : ``}`}`;
});
const css = {
  code: ".top.svelte-1to9yvs{display:flex;flex-direction:row;align-items:center;gap:var(--padding-small);box-sizing:content-box;padding:var(--padding);width:max-content;min-width:var(--button-size);height:var(--button-size);border:none;background:none;margin:0;text-align:left;border-radius:var(--border-radius);font-weight:var(--font-weight);color:var(--this-text);transition:background var(--transition-speed)}.top.inline.svelte-1to9yvs{display:inline-flex;padding:var(--padding-small);vertical-align:middle}.top.disabled.svelte-1to9yvs{color:var(--this-text-weak)}.top.svelte-1to9yvs:hover,.top.notification.svelte-1to9yvs{background-color:var(--this-background-indent)}.top.disabled.svelte-1to9yvs:hover,.top.disabled.svelte-1to9yvs:active{background:none}.top.svelte-1to9yvs:active,.top.toggled.svelte-1to9yvs{transition:none;background-color:var(--this-background-active)}.top.notification.svelte-1to9yvs{position:relative}.dot.svelte-1to9yvs{width:6px;height:6px;border-radius:50%;background:var(--color-accent);position:absolute;right:calc(var(--border-radius) / 2);top:calc(var(--border-radius) / 2)}",
  map: `{"version":3,"file":"Button.svelte","sources":["Button.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Icon from \\"./Icon.svelte\\";\\nimport Tooltip from \\"./Tooltip.svelte\\";\\nimport TutorialHighlight from \\"./TutorialHighlight.svelte\\";\\nimport Link from \\"./Link.svelte\\";\\nexport let icon;\\nexport let text = null;\\nexport let tooltip = null;\\nexport let disabled = false;\\nexport let shortcut = null;\\nexport let palette = null;\\nexport let link = null;\\nexport let target = null;\\nexport let disabledReason = \\"disabled\\";\\nexport let tooltipLayout = \\"bottom\\";\\nexport let tutorialHighlight = null;\\nexport let onclick = () => {\\n};\\nexport let notification = false;\\nexport let toggled = false;\\nexport let inline = false;\\nexport let preventBlur = true;\\nfunction handleMouseDown(e) {\\n  if (preventBlur) {\\n    e.preventDefault();\\n  }\\n}\\n<\/script>\\n\\n<TutorialHighlight step={tutorialHighlight}>\\n\\t<Tooltip\\n\\t\\tcontent={tooltip}\\n\\t\\tdisabled={disabled && disabledReason}\\n\\t\\t{shortcut}\\n\\t\\tlayout={tooltipLayout}\\n\\t>\\n\\t\\t<Link {link} {target}>\\n\\t\\t\\t<button\\n\\t\\t\\t\\tclass={\`top \${palette ? 'palette-' + palette : ''}\`}\\n\\t\\t\\t\\tclass:notification\\n\\t\\t\\t\\tclass:toggled\\n\\t\\t\\t\\tclass:disabled\\n\\t\\t\\t\\ton:click\\n\\t\\t\\t\\ton:click={onclick}\\n\\t\\t\\t\\ton:mousedown={handleMouseDown}\\n\\t\\t\\t\\tclass:inline\\n\\t\\t\\t\\tdisabled={!!disabled}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{#if notification}\\n\\t\\t\\t\\t\\t<div class=\\"dot\\" />\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t<Icon name={icon} size=\\"var(--button-size)\\" />\\n\\t\\t\\t\\t{#if text != null}\\n\\t\\t\\t\\t\\t{text}\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</button>\\n\\t\\t</Link>\\n\\t</Tooltip>\\n</TutorialHighlight>\\n\\n<style>\\n\\t.top {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: row;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--padding-small);\\n\\n\\t\\tbox-sizing: content-box;\\n\\t\\tpadding: var(--padding);\\n\\t\\twidth: max-content;\\n\\t\\tmin-width: var(--button-size);\\n\\t\\theight: var(--button-size);\\n\\n\\t\\tborder: none;\\n\\t\\tbackground: none;\\n\\t\\tmargin: 0;\\n\\t\\ttext-align: left;\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tfont-weight: var(--font-weight);\\n\\t\\tcolor: var(--this-text);\\n\\t\\ttransition: background var(--transition-speed);\\n\\t}\\n\\n\\t.top.inline {\\n\\t\\tdisplay: inline-flex;\\n\\t\\tpadding: var(--padding-small);\\n\\t\\tvertical-align: middle;\\n\\t}\\n\\t.top.disabled {\\n\\t\\tcolor: var(--this-text-weak);\\n\\t}\\n\\n\\t.top:hover,\\n\\t.top.notification {\\n\\t\\tbackground-color: var(--this-background-indent);\\n\\t}\\n\\t.top.disabled:hover,\\n\\t.top.disabled:active {\\n\\t\\tbackground: none;\\n\\t}\\n\\t.top:active,\\n\\t.top.toggled {\\n\\t\\ttransition: none;\\n\\t\\tbackground-color: var(--this-background-active);\\n\\t}\\n\\t.top.notification {\\n\\t\\tposition: relative;\\n\\t}\\n\\t.dot {\\n\\t\\twidth: 6px;\\n\\t\\theight: 6px;\\n\\t\\tborder-radius: 50%;\\n\\t\\tbackground: var(--color-accent);\\n\\t\\tposition: absolute;\\n\\t\\tright: calc(var(--border-radius) / 2);\\n\\t\\ttop: calc(var(--border-radius) / 2);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA4DC,mBAAK,CACJ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,eAAe,CAAC,CAEzB,UAAU,CAAE,WAAW,CACvB,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,KAAK,CAAE,WAAW,CAClB,SAAS,CAAE,IAAI,aAAa,CAAC,CAC7B,MAAM,CAAE,IAAI,aAAa,CAAC,CAE1B,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,WAAW,CAAE,IAAI,aAAa,CAAC,CAC/B,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,UAAU,CAAE,UAAU,CAAC,IAAI,kBAAkB,CAC9C,CAEA,IAAI,sBAAQ,CACX,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,IAAI,eAAe,CAAC,CAC7B,cAAc,CAAE,MACjB,CACA,IAAI,wBAAU,CACb,KAAK,CAAE,IAAI,gBAAgB,CAC5B,CAEA,mBAAI,MAAM,CACV,IAAI,4BAAc,CACjB,gBAAgB,CAAE,IAAI,wBAAwB,CAC/C,CACA,IAAI,wBAAS,MAAM,CACnB,IAAI,wBAAS,OAAQ,CACpB,UAAU,CAAE,IACb,CACA,mBAAI,OAAO,CACX,IAAI,uBAAS,CACZ,UAAU,CAAE,IAAI,CAChB,gBAAgB,CAAE,IAAI,wBAAwB,CAC/C,CACA,IAAI,4BAAc,CACjB,QAAQ,CAAE,QACX,CACA,mBAAK,CACJ,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,cAAc,CAAC,CAC/B,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,IAAI,eAAe,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACrC,GAAG,CAAE,KAAK,IAAI,eAAe,CAAC,CAAC,CAAC,CAAC,CAAC,CACnC"}`
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon } = $$props;
  let { text = null } = $$props;
  let { tooltip = null } = $$props;
  let { disabled = false } = $$props;
  let { shortcut = null } = $$props;
  let { palette = null } = $$props;
  let { link = null } = $$props;
  let { target = null } = $$props;
  let { disabledReason = "disabled" } = $$props;
  let { tooltipLayout = "bottom" } = $$props;
  let { tutorialHighlight = null } = $$props;
  let { onclick = () => {
  } } = $$props;
  let { notification = false } = $$props;
  let { toggled = false } = $$props;
  let { inline = false } = $$props;
  let { preventBlur = true } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0) $$bindings.text(text);
  if ($$props.tooltip === void 0 && $$bindings.tooltip && tooltip !== void 0) $$bindings.tooltip(tooltip);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.shortcut === void 0 && $$bindings.shortcut && shortcut !== void 0) $$bindings.shortcut(shortcut);
  if ($$props.palette === void 0 && $$bindings.palette && palette !== void 0) $$bindings.palette(palette);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0) $$bindings.link(link);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
  if ($$props.disabledReason === void 0 && $$bindings.disabledReason && disabledReason !== void 0) $$bindings.disabledReason(disabledReason);
  if ($$props.tooltipLayout === void 0 && $$bindings.tooltipLayout && tooltipLayout !== void 0) $$bindings.tooltipLayout(tooltipLayout);
  if ($$props.tutorialHighlight === void 0 && $$bindings.tutorialHighlight && tutorialHighlight !== void 0) $$bindings.tutorialHighlight(tutorialHighlight);
  if ($$props.onclick === void 0 && $$bindings.onclick && onclick !== void 0) $$bindings.onclick(onclick);
  if ($$props.notification === void 0 && $$bindings.notification && notification !== void 0) $$bindings.notification(notification);
  if ($$props.toggled === void 0 && $$bindings.toggled && toggled !== void 0) $$bindings.toggled(toggled);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.preventBlur === void 0 && $$bindings.preventBlur && preventBlur !== void 0) $$bindings.preventBlur(preventBlur);
  $$result.css.add(css);
  return `${validate_component(TutorialHighlight, "TutorialHighlight").$$render($$result, { step: tutorialHighlight }, {}, {
    default: () => {
      return `${validate_component(Tooltip, "Tooltip").$$render(
        $$result,
        {
          content: tooltip,
          disabled: disabled && disabledReason,
          shortcut,
          layout: tooltipLayout
        },
        {},
        {
          default: () => {
            return `${validate_component(Link, "Link").$$render($$result, { link, target }, {}, {
              default: () => {
                return `<button class="${[
                  escape(null_to_empty(`top ${palette ? "palette-" + palette : ""}`), true) + " svelte-1to9yvs",
                  (notification ? "notification" : "") + " " + (toggled ? "toggled" : "") + " " + (disabled ? "disabled" : "") + " " + (inline ? "inline" : "")
                ].join(" ").trim()}" ${!!disabled ? "disabled" : ""}>${notification ? `<div class="dot svelte-1to9yvs"></div>` : ``} ${validate_component(Icon, "Icon").$$render($$result, { name: icon, size: "var(--button-size)" }, {}, {})} ${text != null ? `${escape(text)}` : ``}</button>`;
              }
            })}`;
          }
        }
      )}`;
    }
  })}`;
});
const CURRENT_VERSION = "1.1.7";
function getLastChangelogVersion() {
  const version = localStorage.getItem("lastUsedVersion") ?? "1.0.0";
  return version;
}
const isChangelogVersionCurrent = writable(
  getLastChangelogVersion() === CURRENT_VERSION
);
const PUBLIC_SUPABASE_URL = "https://nshjlxxhhejnkqgavkrb.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "sb_publishable__g-UzdUUX3OW4TiWjj9_5Q_Nfe8OjZ2";
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
const currentUser = writable(null);
const session = writable(null);
const authLoading = writable(true);
const isLoggedIn = derived(currentUser, ($user) => $user != null);
function initAuth() {
  supabase.auth.getSession().then(({ data: { session: s } }) => {
    session.set(s);
    currentUser.set(s?.user ?? null);
    authLoading.set(false);
  });
  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange((_event, s) => {
    session.set(s);
    currentUser.set(s?.user ?? null);
    authLoading.set(false);
  });
  return () => subscription.unsubscribe();
}
async function listFlows() {
  const user = get_store_value(currentUser);
  if (!user) return [];
  const { data: owned, error: ownedError } = await supabase.from("flows").select("*").eq("owner_id", user.id).order("updated_at", { ascending: false });
  if (ownedError) {
    console.error("Error fetching owned flows:", ownedError);
    return [];
  }
  const { data: shares, error: sharesError } = await supabase.from("flow_shares").select("flow_id, permission").eq("shared_with", user.id);
  let sharedFlows = [];
  if (!sharesError && shares && shares.length > 0) {
    const sharedFlowIds = shares.map((s) => s.flow_id);
    const { data: sharedData, error: sharedError } = await supabase.from("flows").select("*").in("id", sharedFlowIds).order("updated_at", { ascending: false });
    if (!sharedError && sharedData) {
      sharedFlows = sharedData.map((flow) => {
        const share = shares.find((s) => s.flow_id === flow.id);
        return {
          ...flow,
          is_shared: true,
          permission: share?.permission ?? "view"
        };
      });
    }
  }
  const ownedFlows = (owned ?? []).map((f) => ({ ...f, is_shared: false }));
  return [...ownedFlows, ...sharedFlows];
}
async function createFlow(title, nodesData) {
  const user = get_store_value(currentUser);
  if (!user) return null;
  const { data, error } = await supabase.from("flows").insert({
    owner_id: user.id,
    title,
    nodes_data: nodesData
  }).select().single();
  if (error) {
    console.error("Error creating flow:", error);
    return null;
  }
  return data;
}
async function saveFlow(id, nodesData, title) {
  const updateObj = {
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (nodesData !== void 0) {
    updateObj.nodes_data = nodesData;
  }
  if (title !== void 0) {
    updateObj.title = title;
  }
  const { error } = await supabase.from("flows").update(updateObj).eq("id", id);
  if (error) {
    console.error("Error saving flow:", error);
    return false;
  }
  return true;
}
async function listFlowShares(flowId) {
  const { data, error } = await supabase.from("flow_shares").select("*").eq("flow_id", flowId);
  if (error) {
    console.error("Error listing shares:", error);
    return [];
  }
  const shares = data ?? [];
  const userIds = shares.map((s) => s.shared_with).filter((id) => id != null);
  let profileMap = {};
  if (userIds.length > 0) {
    const { data: profiles } = await supabase.from("profiles").select("id, email, display_name").in("id", userIds);
    if (profiles) {
      for (const p of profiles) {
        profileMap[p.id] = { email: p.email, display_name: p.display_name };
      }
    }
  }
  return shares.map((s) => ({
    ...s,
    shared_with_email: s.shared_with ? profileMap[s.shared_with]?.email : void 0,
    shared_with_name: s.shared_with ? profileMap[s.shared_with]?.display_name : void 0
  }));
}
const CURRENT_SAVE_VERSION = 1;
function getJson(nodes2) {
  const saveable = {
    nodes: nodes2,
    version: CURRENT_SAVE_VERSION
  };
  return JSON.stringify(saveable);
}
let $nodes$1;
nodes.subscribe((nodes2) => {
  $nodes$1 = nodes2;
});
function decorate(fn) {
  return function(...args) {
    resolvePendingAction($nodes$1);
    const output = fn($nodes$1, ...args);
    doActionBundle(output.action, output.owner);
    return output.ret;
  };
}
function newBoxAction(parent, parentFlowId, index, placeholder) {
  const addAction = {
    tag: "add",
    parent,
    id: newBoxId(),
    index,
    value: {
      tag: "box",
      content: "",
      placeholder,
      flowId: parentFlowId
    }
  };
  return addAction;
}
function newExtensionAction(parent, parentFlowId, selfId) {
  const addAction = {
    tag: "add",
    parent,
    id: selfId,
    index: 0,
    // Extensions are always at position 0
    value: {
      tag: "box",
      content: "",
      flowId: parentFlowId,
      isExtension: true
    }
  };
  return addAction;
}
const addNewBox = decorate(function(nodes2, parent, index, placeholder) {
  const flowId = getParentFlowId(nodes2, parent).unwrap();
  return {
    action: newBoxAction(parent, flowId, index, placeholder),
    owner: flowId
  };
});
const addNewExtension = decorate(function(nodes2, parent) {
  const flowId = getParentFlowId(nodes2, parent).unwrap();
  const extensionId = newBoxId();
  return {
    action: [newExtensionAction(parent, flowId, extensionId), newBoxAction(extensionId, flowId, 0)],
    owner: flowId
  };
});
const addNewFlow = decorate(function(nodes2, index, style, switchSpeakers = false) {
  const starterBoxes = style.starterBoxes;
  let columns;
  if (style.columnsSwitch != null && switchSpeakers) {
    columns = style.columnsSwitch;
  } else {
    columns = style.columns;
  }
  const id = newFlowId();
  const addAction = {
    tag: "add",
    parent: "root",
    id,
    index,
    value: {
      tag: "flow",
      content: "",
      invert: style.invert,
      columns
    }
  };
  const actionBundle = [addAction];
  if (starterBoxes != null) {
    starterBoxes.forEach((placeholder, index2) => {
      actionBundle.push(newBoxAction(id, id, index2, placeholder));
    });
  } else {
    actionBundle.push(newBoxAction(id, id, 0));
  }
  return {
    action: actionBundle,
    owner: "root",
    ret: id
  };
});
const toggleBoxFormat = decorate(function(nodes2, id, format) {
  const box = getNode(nodes2, id).unwrap();
  return {
    action: newUpdateAction(id, { ...box.value, [format]: !box.value[format] }),
    owner: getParentFlowId(nodes2, id).unwrap()
  };
});
function newUpdateAction(id, value) {
  return {
    tag: "update",
    id,
    newValue: value
  };
}
function newDeleteAction(nodes2, id) {
  const actionBundle = [];
  const box = getNode(nodes2, id).unwrap();
  if (box == null) return actionBundle;
  const parent = getNode(nodes2, box.parent).unwrap();
  if (parent == null) return actionBundle;
  for (const child of box.children.toReversed()) {
    actionBundle.push(...newDeleteAction(nodes2, child));
  }
  actionBundle.push({
    tag: "delete",
    id
  });
  return actionBundle;
}
const deleteBox = decorate(function(nodes2, id) {
  const actionBundle = newDeleteAction(nodes2, id);
  return { action: actionBundle, owner: getParentFlowId(nodes2, id).unwrap() };
});
const deleteFlow = decorate(function(nodes2, id) {
  const actionBundle = newDeleteAction(nodes2, id);
  return { action: actionBundle, owner: "root" };
});
const addNewEmpty = decorate(function(nodes2, flowId, level) {
  const actions = [];
  let parentId = flowId;
  for (let i = 0; i < level; i++) {
    const newId = newBoxId();
    const addAction = {
      tag: "add",
      parent: parentId,
      id: newId,
      index: 0,
      value: {
        tag: "box",
        content: "",
        flowId,
        empty: true
      }
    };
    actions.push(addAction);
    parentId = newId;
  }
  const finalBoxAction = newBoxAction(parentId, flowId, 0);
  actions.push(finalBoxAction);
  return {
    action: actions,
    ret: finalBoxAction.id,
    owner: flowId
  };
});
const replaceNodes = decorate(function(nodes2, newNodes2) {
  return {
    action: {
      tag: "replace",
      newNodes: structuredClone(newNodes2)
    },
    owner: "root"
  };
});
let currentChannel = null;
let suppressNextRemoteUpdate = false;
const flowPresence = writable([]);
function subscribeToFlow(flowId) {
  unsubscribeFromFlow();
  const user = get_store_value(currentUser);
  const userPresence = {
    user_id: user?.id ?? "unknown",
    email: user?.email ?? "unknown",
    display_name: user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "Unknown",
    online_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  currentChannel = supabase.channel(`flow:${flowId}`, {
    config: {
      presence: {
        key: user?.id ?? "unknown"
      }
    }
  }).on(
    "postgres_changes",
    {
      event: "UPDATE",
      schema: "public",
      table: "flows",
      filter: `id=eq.${flowId}`
    },
    (payload) => {
      if (suppressNextRemoteUpdate) {
        suppressNextRemoteUpdate = false;
        return;
      }
      const newNodesData = payload.new.nodes_data;
      if (newNodesData) {
        replaceNodes(newNodesData);
      }
    }
  ).on("presence", { event: "sync" }, () => {
    if (!currentChannel) return;
    const state = currentChannel.presenceState();
    const users = [];
    const seenIds = /* @__PURE__ */ new Set();
    for (const key of Object.keys(state)) {
      for (const presence of state[key]) {
        if (!seenIds.has(presence.user_id)) {
          seenIds.add(presence.user_id);
          users.push({
            user_id: presence.user_id,
            email: presence.email,
            display_name: presence.display_name,
            online_at: presence.online_at
          });
        }
      }
    }
    flowPresence.set(users);
  }).subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      await currentChannel?.track(userPresence);
    }
  });
}
function unsubscribeFromFlow() {
  if (currentChannel) {
    currentChannel.untrack();
    supabase.removeChannel(currentChannel);
    currentChannel = null;
    flowPresence.set([]);
  }
}
function suppressNextUpdate() {
  suppressNextRemoteUpdate = true;
}
let localFlowKey = null;
const savedNodesDatasMut = writable(getSavedNodesDatas());
const savedNodesDatas = derived(savedNodesDatasMut, (value) => value);
const MAX_SAVED_FLOWS = 20;
function newLocalNodeKey() {
  const uuid = crypto.randomUUID();
  return `flow:${uuid}`;
}
let $nodes;
nodes.subscribe((nodes2) => {
  $nodes = nodes2;
});
let $savedNodesDatasMut;
savedNodesDatasMut.subscribe((value) => {
  $savedNodesDatasMut = value;
  try {
    localStorage.setItem("savedFlows", JSON.stringify(value));
  } catch {
  }
});
let lastSaveTime = Date.now();
let saveTimeout = null;
function maybeSaveNodes() {
  if (!isNodesWorthSaving($nodes)) return;
  const now = Date.now();
  if (now - lastSaveTime < 3e3) {
    if (saveTimeout == null) {
      saveTimeout = setTimeout(() => {
        saveTimeout = null;
        maybeSaveNodes();
      }, 3e3 - (now - lastSaveTime));
    }
    return;
  }
  lastSaveTime = now;
  if (get_store_value(isLoggedIn)) {
    saveToCloud($nodes);
  } else {
    saveToLocal($nodes);
  }
}
async function saveToCloud(nodesData) {
  const cloudId = get_store_value(currentCloudFlowId);
  saveStatus.set("saving");
  try {
    if (cloudId) {
      const title = nodesData.root.children.length > 0 ? getNode(nodesData, nodesData.root.children[0]).unwrap().value.content || "Untitled" : "Untitled";
      suppressNextUpdate();
      const success = await saveFlow(cloudId, nodesData, title);
      if (success) {
        saveStatus.set("saved");
        refreshFlowList();
      } else {
        saveStatus.set("error");
        saveToLocal(nodesData);
      }
    } else {
      const title = nodesData.root.children.length > 0 ? getNode(nodesData, nodesData.root.children[0]).unwrap().value.content || "Untitled" : "Untitled";
      const record = await createFlow(title, nodesData);
      if (record) {
        currentCloudFlowId.set(record.id);
        subscribeToFlow(record.id);
        saveStatus.set("saved");
        refreshFlowList();
      } else {
        saveStatus.set("error");
        saveToLocal(nodesData);
      }
    }
  } catch {
    saveStatus.set("error");
    saveToLocal(nodesData);
  }
}
function saveToLocal(nodesData) {
  try {
    savedNodesDatasMut.set(getSavedNodesDatas());
    const data = getJson(nodesData);
    if (localFlowKey === null) {
      localFlowKey = newLocalNodeKey();
    }
    localStorage.setItem(localFlowKey, data);
    $savedNodesDatasMut[localFlowKey] = {
      created: $savedNodesDatasMut[localFlowKey]?.created ?? (/* @__PURE__ */ new Date()).toISOString(),
      modified: (/* @__PURE__ */ new Date()).toISOString(),
      flowInfos: nodesData.root.children.map((flowId) => ({
        content: getNode(nodesData, flowId).unwrap().value.content,
        invert: getNode(nodesData, flowId).unwrap().value.invert
      }))
    };
    const keys = Object.keys($savedNodesDatasMut);
    if (keys.length > MAX_SAVED_FLOWS) {
      const oldestKey = keys.reduce(
        (a, b) => $savedNodesDatasMut[a].modified < $savedNodesDatasMut[b].modified ? a : b
      );
      delete $savedNodesDatasMut[oldestKey];
      localStorage.removeItem(oldestKey);
    }
    savedNodesDatasMut.set($savedNodesDatasMut);
  } catch {
  }
}
subscribeFlowsChange(maybeSaveNodes);
async function refreshFlowList() {
  if (!get_store_value(isLoggedIn)) {
    cloudFlowList.set([]);
    return;
  }
  try {
    const flows = await listFlows();
    cloudFlowList.set(flows);
  } catch {
    console.error("Failed to refresh flow list");
  }
}
function getSavedNodesDatas() {
  try {
    const raw = localStorage.getItem("savedFlows");
    if (raw === null) {
      localStorage.setItem("savedFlows", JSON.stringify({}));
      return {};
    }
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
export {
  Tooltip as A,
  Button as B,
  savedNodesDatas as C,
  sideDocText as D,
  currentCloudFlowId as E,
  currentUser as F,
  flowPresence as G,
  listFlowShares as H,
  saveStatus as I,
  cloudFlowList as J,
  authLoading as K,
  openPopup as L,
  MAX_SAVED_FLOWS as M,
  addNewFlow as N,
  deleteFlow as O,
  TutorialHighlight as T,
  initAuth as a,
  isChangelogVersionCurrent as b,
  closePopup as c,
  connections as d,
  pendingAction as e,
  focusId as f,
  activeMouse as g,
  history as h,
  isLoggedIn as i,
  checkIdBox as j,
  getAdjacentBox as k,
  addNewBox as l,
  addNewExtension as m,
  nodes as n,
  tick as o,
  popups as p,
  deleteBox as q,
  refreshFlowList as r,
  settings as s,
  toggleBoxFormat as t,
  getNode as u,
  addNewEmpty as v,
  selectedFlowId as w,
  lastFocusIds as x,
  settingsGroups as y,
  tutorialStep as z
};
