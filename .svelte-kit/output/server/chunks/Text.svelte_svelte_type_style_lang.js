const keyDict = {
  commandControl: "cmd/ctrl",
  command: "cmd",
  shift: "shift",
  option: "alt",
  control: "ctrl",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  escape: "esc",
  return: "↵",
  space: "space",
  delete: "delete",
  tab: "tab"
};
const defaultKeyComboHandlerOptions = {
  require: () => true,
  stopRepeat: true,
  preventDefault: true
};
function createKeyComboHandler(options) {
  const { handle, require: require2, stopRepeat, preventDefault } = {
    ...defaultKeyComboHandlerOptions,
    ...options
  };
  return function(e) {
    if (preventDefault === "always") {
      e.preventDefault();
    }
    if (!require2()) {
      return false;
    }
    if (preventDefault === true) {
      e.preventDefault();
    }
    if (stopRepeat && e.repeat == true) {
      return false;
    }
    handle();
    return true;
  };
}
function createKeyDownHandler(keyComboOptionIndex) {
  const keyComboIndex = {};
  for (const [modifiersKey, keyComboOptions] of Object.entries(keyComboOptionIndex)) {
    keyComboIndex[modifiersKey] = {};
    for (const [key, keyComboOption] of Object.entries(keyComboOptions)) {
      keyComboIndex[modifiersKey][key] = createKeyComboHandler(keyComboOption);
    }
  }
  return function(e) {
    const modifiers = [];
    if (e.metaKey) {
      modifiers.push("command");
    }
    if (e.ctrlKey) {
      modifiers.push("control");
    }
    if (e.altKey) {
      modifiers.push("alt");
    }
    if (e.shiftKey) {
      modifiers.push("shift");
    }
    const key = e.key.length == 1 ? e.key.toLowerCase() : e.key;
    let modifiersKey = modifiers.length == 0 ? "none" : modifiers.join(" ");
    let handler = keyComboIndex[modifiersKey]?.[key];
    if (handler == null) {
      if ((e.metaKey || e.ctrlKey) && !(e.metaKey && e.ctrlKey)) {
        modifiersKey = modifiersKey.replace("command", "commandControl").replace("control", "commandControl");
        handler = keyComboIndex[modifiersKey]?.[key];
      }
    }
    if (handler == null) return;
    handler(e);
  };
}
export {
  createKeyDownHandler as c,
  keyDict as k
};
