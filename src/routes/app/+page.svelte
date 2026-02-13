<script lang="ts">
  import Flow from "$lib/components/Flow.svelte";
  import Title from "$lib/components/Title.svelte";
  import BoxControl from "$lib/components/BoxControl.svelte";
  import ButtonBar from "$lib/components/ButtonBar.svelte";
  import DownloadUpload from "$lib/components/DownloadUpload.svelte";
  import Message from "$lib/components/Message.svelte";
  import Settings from "$lib/components/Settings.svelte";
  import SortableList from "$lib/components/SortableList.svelte";
  import AddTab from "$lib/components/AddTab.svelte";
  import Share from "$lib/components/Share.svelte";
  import Tab from "$lib/components/Tab.svelte";
  import { dev } from "$app/environment";
  import { openPopup } from "$lib/models/popup";
  import type { FlowId, Nodes } from "$lib/models/node";
  import { onDestroy, onMount } from "svelte";
  import {
    activeMouse,
    flowsChange,
    nodes,
    pendingAction,
    currentCloudFlowId,
    cloudFlowList,
    saveStatus,
  } from "$lib/models/store";
  import { createKeyDownHandler } from "$lib/models/key";
  import Prelude from "$lib/components/Prelude.svelte";
  import { loadNodes, importSettingsJson } from "$lib/models/file";
  import Timers from "$lib/components/Timers.svelte";
  import Help from "$lib/components/Help.svelte";
  import { settings } from "$lib/models/settings";
  import SideDoc from "$lib/components/SideDoc.svelte";
  import { history } from "$lib/models/history";
  import { focusId, lastFocusIds, selectedFlowId } from "$lib/models/focus";
  import { isChangelogVersionCurrent } from "$lib/models/version";
  import {
    addNewFlow,
    deleteFlow,
    moveFlow,
    replaceNodes,
  } from "$lib/models/nodeDecorateAction";
  import {
    getDebateStyleFlow,
    type DebateStyleFlow,
  } from "$lib/models/debateStyle";
  import Auth from "$lib/components/Auth.svelte";
  import ShareFlow from "$lib/components/ShareFlow.svelte";
  import {
    isLoggedIn,
    authLoading,
    signOut,
    currentUser,
  } from "$lib/models/auth";
  import {
    openCloudFlow,
    deleteCloudFlow,
    startNewCloudFlow,
    refreshFlowList,
  } from "$lib/models/autoSave";
  import { newNodes } from "$lib/models/store";
  import { saveFlow as saveFlowApi } from "$lib/models/flowApi";
  import { flowPresence } from "$lib/models/flowSync";

  $: otherViewers = $flowPresence.filter((u) => u.user_id !== $currentUser?.id);

  function getInitials(name: string): string {
    return (
      name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "?"
    );
  }

  function getAvatarColor(userId: string): string {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${Math.abs(hash) % 360}, 55%, 50%)`;
  }

  let editingFlowId: string | null = null;
  let editingFlowTitle = "";

  function startEditingFlow(flowId: string, currentTitle: string) {
    editingFlowId = flowId;
    editingFlowTitle = currentTitle;
    // Focus the input after it renders
    setTimeout(() => {
      const input = document.getElementById("cloud-flow-edit-input");
      if (input) {
        (input as HTMLInputElement).select();
        input.focus();
      }
    }, 0);
  }

  async function finishEditingFlow() {
    if (editingFlowId && editingFlowTitle.trim()) {
      await saveFlowApi(editingFlowId, undefined, editingFlowTitle.trim());
      await refreshFlowList();
    }
    editingFlowId = null;
    editingFlowTitle = "";
  }

  async function handleDeleteCloudFlow(flowId: string, title: string) {
    if (
      confirm(`Delete flow "${title || "Untitled"}"? This cannot be undone.`)
    ) {
      await deleteCloudFlow(flowId);
    }
  }

  $: unsavedChanges = $nodes.root.children.length > 0;

  onMount(() => {
    window.addEventListener(
      "dragover",
      function (e) {
        e.preventDefault();
      },
      false
    );
    window.addEventListener(
      "drop",
      function (e) {
        e.preventDefault();
      },
      false
    );
    // changes you made may not be saved
    window.addEventListener("beforeunload", function (e) {
      if (unsavedChanges && !dev) {
        let confirmationMessage = "Are you sure you want to leave?";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    });
  });

  let showSideDoc: boolean = settings.data["showSideDoc"].value as boolean;

  onDestroy(
    settings.subscribe(["showSideDoc"], (key: string) => {
      showSideDoc = settings.data[key].value as boolean;
    })
  );

  function clickTab(id: FlowId) {
    blurFlow();
    $selectedFlowId = id;
    focusFlow();
  }
  function focusFlow() {
    if ($selectedFlowId == null) return;
    let lastFocus = $lastFocusIds[$selectedFlowId];
    if (lastFocus == null) {
      lastFocus = $selectedFlowId;
    }
    $focusId = lastFocus;
  }
  function blurFlow() {
    $focusId = null;
  }

  function addFlow(style: DebateStyleFlow) {
    blurFlow();
    let id = addNewFlow($nodes.root.children.length, style, switchSpeakers);
    if (id != null) {
      $selectedFlowId = id;
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
      $selectedFlowId = $nodes.root.children[nextIndex];
      focusFlow();
    } else {
      $selectedFlowId = null;
    }
  }

  function handleSort(e: { detail: { from: number; to: number } }) {
    let { from, to } = e.detail;
    if (from > to) {
      to += 1;
    }
    moveFlow($nodes.root.children[from], to);
  }

  function handleMouseMove(e: MouseEvent) {
    $activeMouse = true;
  }
  const keyDownHandler = createKeyDownHandler({
    control: {
      n: {
        handle: () => {
          const style = getDebateStyleFlow("primary");
          if (style == null) return;
          addFlow(style);
        },
        require: () => getDebateStyleFlow("primary") != null,
      },
    },
    "control shift": {
      n: {
        handle: () => {
          const style = getDebateStyleFlow("secondary");
          if (style == null) return;
          addFlow(style);
        },
        require: () => getDebateStyleFlow("secondary") != null,
      },
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
        preventDefault: "always",
      },
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
        preventDefault: "always",
      },
    },
    "commandControl alt": {
      ArrowUp: {
        handle: () => {
          if ($selectedFlowId == null) return;
          let index =
            ($nodes.root.children.indexOf($selectedFlowId) - 1) %
            $nodes.root.children.length;
          if (index < 0) {
            index = $nodes.root.children.length - 1;
          }
          clickTab($nodes.root.children[index]);
        },
        require: () => $nodes.root.children.length > 0,
        stopRepeat: false,
      },
      ArrowDown: {
        handle: () => {
          if ($selectedFlowId == null) return;
          let index =
            ($nodes.root.children.indexOf($selectedFlowId) + 1) %
            $nodes.root.children.length;
          clickTab($nodes.root.children[index]);
        },
        require: () => $nodes.root.children.length > 0,
        stopRepeat: false,
      },
    },
  });
  function handleKeydown(e: KeyboardEvent) {
    $activeMouse = false;
    keyDownHandler(e);
  }

  function readUploadDragged(e: DragEvent) {
    e.preventDefault();
    let file = e?.dataTransfer?.files[0];
    if (file == undefined) {
      return;
    }

    let reader: FileReader = new FileReader();
    reader.onload = function (fileLoadedEvent) {
      let uploadData = fileLoadedEvent.target?.result;
      if (uploadData == undefined) return;
      handleUpload(uploadData.toString());
    };
    // check if can readAsText
    if (file.type == "text/plain") {
      reader.readAsText(file, "UTF-8");
    } else if (file.type == "application/json") {
      reader.readAsText(file, "UTF-8");
    } else {
      openPopup(Message, "File Message", {
        message: "Invalid file",
        error: true,
      });
    }
  }
  function readUpload() {
    const fileInput = document.getElementById("uploadId") as HTMLInputElement;
    if (!fileInput?.files?.length) return;
    const file = fileInput.files[0];

    let reader: FileReader = new FileReader();
    reader.onload = function (fileLoadedEvent) {
      let uploadData = fileLoadedEvent.target?.result;
      if (uploadData == undefined) return;
      handleUpload(uploadData.toString());

      fileInput.value = ""; // allow for the same file to be reuploaded
    };
    reader.readAsText(file, "UTF-8");
  }

  function preventDefault(e: { preventDefault: () => void }) {
    e.preventDefault();
  }

  async function handleUpload(data: string) {
    let dataObj = JSON.parse(data);
    if (dataObj["isSettings"]) {
      importSettingsJson(dataObj);
      return;
    }

    let newNodes: Nodes | null = null;
    try {
      newNodes = loadNodes(dataObj);
    } catch (e) {
      openPopup(Message, "File Message", {
        message: "Invalid file",
        error: true,
      });
    }
    if (newNodes != null) {
      if (
        !unsavedChanges ||
        confirm("Are you sure you want to overwrite your current flows?")
      ) {
        replaceNodes(newNodes);
        $selectedFlowId = null;
        flowsChange();
      }
    }
  }

  let switchSpeakers = false;

  // Custom scrollbar/overflow logic
  onMount(() => {
    document.body.classList.add("app");
  });

  onDestroy(() => {
    document.body.classList.remove("app");
    document.body.classList.remove("customScrollbar");
  });

  $: {
    if (settings.data.customScrollbar.value) {
      document.body.classList.add("customScrollbar");
    } else {
      document.body.classList.remove("customScrollbar");
    }
  }

  function fixScroll(event: Event) {
    const el = event.currentTarget as HTMLDivElement;
    if (el.scrollTop !== 0) {
      el.scrollTop = 0;
    }
  }

  // TODO:
  // add custom background color
  // add command K
  // add command f
  // add capitalization
</script>

<svelte:body
  on:keydown={handleKeydown}
  on:mousemove={handleMouseMove}
  on:dragenter={preventDefault}
  on:drop={readUploadDragged}
/>
<main class:activeMouse class="palette-plain">
  <input id="uploadId" type="file" hidden on:change={readUpload} />
  <div class="grid" class:showPrelude={!($nodes.root.children.length > 0)}>
    <div class="sidebar">
      <div class="header">
        <ButtonBar
          resize
          buttons={[
            {
              icon: "link",
              onclick: () => openPopup(Help, "Help"),
              tooltip: $isChangelogVersionCurrent ? "help" : "new updates",
              tutorialHighlight: 1,
              notification: !$isChangelogVersionCurrent,
            },
            {
              icon: "gear",
              onclick: () => openPopup(Settings, "Settings"),
              tooltip: "settings",
              tutorialHighlight: 2,
            },
            {
              icon: "file",
              onclick: () => openPopup(DownloadUpload, "File"),
              tooltip: "file",
              tutorialHighlight: 3,
            },
            {
              icon: "people",
              onclick: () =>
                $isLoggedIn
                  ? openPopup(ShareFlow, "Share Flow")
                  : openPopup(Share, "Share"),
              tooltip: "share",
              tutorialHighlight: 4,
            },
          ]}
        />
        {#if $isLoggedIn}
          <div class="cloud-status">
            <span
              class="save-indicator"
              class:saved={$saveStatus === "saved"}
              class:saving={$saveStatus === "saving"}
              class:error={$saveStatus === "error"}
            >
              {#if $saveStatus === "saving"}Saving...{:else if $saveStatus === "saved"}Saved
                ✓{:else if $saveStatus === "error"}Save error{:else}&nbsp;{/if}
            </span>
          </div>
        {/if}
      </div>
      <div
        class="tabs"
        class:customScrollbar={settings.data.customScrollbar.value}
      >
        <div class="tabScroll">
          {#if $isLoggedIn && $cloudFlowList.length > 0}
            <div class="cloud-flows-section">
              <div class="section-label">Your Flows</div>
              {#each $cloudFlowList as flow}
                <div class="cloud-flow-item-wrapper">
                  {#if editingFlowId === flow.id}
                    <input
                      id="cloud-flow-edit-input"
                      class="cloud-flow-edit-input"
                      bind:value={editingFlowTitle}
                      on:blur={finishEditingFlow}
                      on:keydown={(e) => {
                        if (e.key === "Enter") finishEditingFlow();
                        if (e.key === "Escape") {
                          editingFlowId = null;
                        }
                      }}
                    />
                  {:else}
                    <button
                      class="cloud-flow-item"
                      class:active={$currentCloudFlowId === flow.id}
                      class:shared={flow.is_shared}
                      on:click={() => openCloudFlow(flow.id)}
                    >
                      <span class="flow-title">{flow.title || "Untitled"}</span>
                      {#if flow.is_shared}
                        <span class="shared-badge">shared</span>
                      {/if}
                    </button>
                  {/if}
                  <button
                    class="cloud-flow-action cloud-flow-edit"
                    on:click|stopPropagation={() =>
                      startEditingFlow(flow.id, flow.title)}
                    title="Rename flow"
                  >
                    ✎
                  </button>
                  <button
                    class="cloud-flow-action cloud-flow-delete"
                    on:click|stopPropagation={() =>
                      handleDeleteCloudFlow(flow.id, flow.title)}
                    title="Delete flow"
                  >
                    ×
                  </button>
                </div>
              {/each}
            </div>
            <button
              class="new-flow-btn"
              on:click={() => {
                startNewCloudFlow();
                replaceNodes(newNodes());
                $selectedFlowId = null;
              }}
            >
              + New Flow
            </button>
            <div class="section-divider" />
            <div class="section-label">Current Flow Tabs</div>
          {/if}
          <SortableList
            list={$nodes.root.children}
            on:sort={handleSort}
            let:index
          >
            <Tab
              on:click={() => clickTab($nodes.root.children[index])}
              flowId={$nodes.root.children[index]}
              selected={$selectedFlowId == $nodes.root.children[index]}
            />
          </SortableList>
          <AddTab {addFlow} bind:switchSpeakers />
        </div>
      </div>
      <div class="sidebar-footer">
        {#if $isLoggedIn}
          <button
            class="sidebar-action-btn share-btn"
            on:click={() => openPopup(ShareFlow, "Share Flow")}
            disabled={!$currentCloudFlowId}
          >
            Share Flow
          </button>
          <button class="sidebar-action-btn signout-btn" on:click={signOut}>
            Sign Out
          </button>
        {/if}
      </div>
      <div class="timer">
        <Timers />
      </div>
    </div>
    {#if $authLoading}
      <div class="prelude">
        <div class="loading-message">Loading...</div>
      </div>
    {:else if !$isLoggedIn}
      <div class="prelude">
        <Auth />
      </div>
    {:else if $nodes.root.children.length > 0}
      {#if $selectedFlowId != null && $nodes[$selectedFlowId]}
        {#key $selectedFlowId}
          <div class="title">
            <Title
              flowId={$selectedFlowId}
              deleteSelf={() => deleteFlowAndFocus()}
            />
          </div>
          <div class="box-control">
            <BoxControl flowId={$selectedFlowId} />
          </div>
          {#if otherViewers.length > 0}
            <div class="presence-strip">
              {#each otherViewers as viewer}
                <div
                  class="viewer-avatar"
                  style="background: {getAvatarColor(viewer.user_id)}"
                  title="{viewer.display_name} is editing"
                >
                  {getInitials(viewer.display_name)}
                </div>
              {/each}
            </div>
          {/if}
          <div
            class="flow"
            class:customScrollbar={settings.data.customScrollbar.value}
            on:scroll={fixScroll}
          >
            <Flow on:focusFlow={focusFlow} flowId={$selectedFlowId} />
          </div>
        {/key}
      {/if}
      {#if showSideDoc}
        <div class="side-doc">
          <SideDoc />
        </div>
      {/if}
    {:else}
      <div class="prelude">
        <Prelude />
      </div>
    {/if}
  </div>
</main>

<style>
  :global(body.app) {
    overflow-x: auto;
    overflow-y: clip;
  }
  .grid {
    display: grid;
    gap: var(--gap);
    grid-template-areas:
      "sidebar title box-control presence"
      "sidebar flow flow flow";
    grid-template-columns: var(--sidebar-width) 1fr auto auto;
    padding: var(--main-margin);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .grid:has(.side-doc) {
    grid-template-areas:
      "sidebar title box-control presence side-doc"
      "sidebar flow flow flow side-doc";
    grid-template-columns: var(--sidebar-width) 1fr auto auto auto;
  }
  .grid.showPrelude {
    grid-template-areas: "sidebar prelude";
    grid-template-columns: var(--sidebar-width) auto;
  }

  .sidebar {
    background: var(--background);
    width: 100%;
    height: var(--main-height);
    border-radius: var(--border-radius);
    padding: var(--padding);
    grid-area: sidebar;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .header {
    height: auto;
    padding-bottom: var(--padding);
  }
  .tabs {
    overflow-y: auto;
    height: var(--main-height);
    box-sizing: border-box;
    position: relative;
  }
  .tabScroll {
    padding: 0;
    margin: 0;
    padding-top: 0;
    padding-bottom: calc(var(--view-height) * 0.6);
  }

  .title {
    background: var(--background);
    border-radius: var(--border-radius);
    width: 100%;
    grid-area: title;
    height: var(--title-height);
  }
  .box-control {
    background: var(--background);
    border-radius: var(--border-radius);
    width: 100%;
    grid-area: box-control;
    height: var(--title-height);
  }
  .flow {
    width: 100%;
    overflow-x: auto;
    overflow-y: clip;
    background: var(--background);
    z-index: 0;
    border-radius: var(--border-radius);
    grid-area: flow;
    height: var(--view-height);
  }
  .prelude {
    position: relative;
    width: calc(100vw - var(--sidebar-width) - var(--gap) * 3);
    height: var(--main-height);
    grid-area: prelude;
  }
  .side-doc {
    position: relative;
    width: var(--side-doc-width);
    height: var(--main-height);
    grid-area: side-doc;
  }

  /* ─── Cloud flow list & sidebar additions ─── */
  .cloud-status {
    padding: 0.25rem 0;
    text-align: center;
  }
  .save-indicator {
    font-size: 0.75rem;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  .save-indicator.saving {
    opacity: 0.8;
  }
  .save-indicator.saved {
    opacity: 0.7;
    color: hsl(120, 40%, 55%);
  }
  .save-indicator.error {
    opacity: 1;
    color: hsl(0, 60%, 55%);
  }
  .cloud-flows-section {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 0.25rem;
  }
  .section-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.5;
    padding: 0.35rem 0.5rem 0.15rem;
    font-weight: var(--font-weight-bold);
  }
  .section-divider {
    height: 1px;
    background: currentColor;
    opacity: 0.1;
    margin: 0.5rem 0;
  }
  .cloud-flow-item-wrapper {
    display: flex;
    align-items: center;
    gap: 0;
    position: relative;
  }

  .cloud-flow-edit-input {
    flex: 1;
    padding: 0.35rem 0.5rem;
    border: 1px solid var(--accent-text);
    border-radius: calc(var(--border-radius) * 0.4);
    background: var(--background-accent-indent);
    color: inherit;
    font-family: inherit;
    font-size: 0.85rem;
    outline: none;
  }
  .cloud-flow-action {
    background: none;
    border: none;
    color: inherit;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.15rem 0.3rem;
    opacity: 0;
    transition: opacity var(--transition-speed) ease;
    flex-shrink: 0;
    line-height: 1;
  }
  .cloud-flow-item-wrapper:hover .cloud-flow-action {
    opacity: 0.45;
  }
  .cloud-flow-action:hover {
    opacity: 1 !important;
  }
  .cloud-flow-delete:hover {
    color: hsl(0, 60%, 55%);
  }
  .cloud-flow-edit:hover {
    color: var(--accent-text);
  }
  .cloud-flow-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.4rem 0.5rem;
    border: none;
    border-radius: calc(var(--border-radius) * 0.4);
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: 0.85rem;
    cursor: pointer;
    text-align: left;
    transition: background var(--transition-speed) ease;
  }
  .cloud-flow-item:hover {
    background: var(--background-accent-indent);
  }
  .cloud-flow-item.active {
    background: var(--background-accent-active);
  }
  .cloud-flow-item .flow-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
  .shared-badge {
    font-size: 0.65rem;
    padding: 0.1rem 0.35rem;
    border-radius: 3px;
    background: hsl(210, 50%, 45%);
    color: white;
    margin-left: 0.5rem;
    flex-shrink: 0;
  }
  .new-flow-btn {
    width: 100%;
    padding: 0.4rem 0.5rem;
    border: 1px dashed currentColor;
    border-radius: calc(var(--border-radius) * 0.4);
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity var(--transition-speed) ease;
  }
  .new-flow-btn:hover {
    opacity: 0.8;
  }
  .sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding-top: 0.5rem;
    margin-top: auto;
  }
  .sidebar-action-btn {
    width: 100%;
    padding: 0.45rem 0.5rem;
    border: none;
    border-radius: calc(var(--border-radius) * 0.4);
    font-family: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    transition: opacity var(--transition-speed) ease;
  }
  .sidebar-action-btn:hover:not(:disabled) {
    opacity: 0.85;
  }
  .sidebar-action-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .share-btn {
    background: var(--accent-text);
    color: var(--background);
    font-weight: var(--font-weight-bold);
  }
  .signout-btn {
    background: transparent;
    color: inherit;
    opacity: 0.5;
    border: 1px solid currentColor;
  }
  .signout-btn:hover {
    opacity: 0.7 !important;
  }
  .loading-message {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    font-size: 1.1rem;
  }

  /* ─── Presence strip ─── */
  .presence-strip {
    display: flex;
    align-items: center;
    gap: -4px;
    padding: 0 0.5rem;
    height: var(--title-height);
    grid-area: presence;
  }
  .viewer-avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-weight: bold;
    color: white;
    border: 2px solid var(--background);
    margin-left: -4px;
    cursor: default;
    flex-shrink: 0;
  }
  .viewer-avatar:first-child {
    margin-left: 0;
  }
</style>
