/*
 * +----------------------------------------------------------------+
 * |                                                                |
 * |     __  __    ___    _____                                     |
 * |    |  \/  |  / _ \  |  ___|                                    |
 * |    | |\/| | | | | | | |_                                       |
 * |    | |  | | | |_| | |  _|                                      |
 * |    |_|  |_|  \__\_\ |_|                                        |
 * |                                                                |
 * |    M I X   Q U E U E   F I X                                   |
 * |    ~~~~~~~~~~~~~~~~~~~~~~~~~                                   |
 * |                                                                |
 * |    [ SYS: MQF-01 ]       [ MODE: QUEUE RESTORE ]               |
 * |    [ EST: 2026  ]       [ SIGNAL: ACTIVE     ]                 |
 * |                                                                |
 * |    "The queue was never gone. Just hidden."                    |
 * |                                                                |
 * +----------------------------------------------------------------+
 *  FILE    : content.js
 *  MODULE  : QUEUE VISIBILITY ENGINE
 *  VERSION : 1.1.0
 *  LICENSE : MIT
 *  -----------------------------------------------------------------
 */

(() => {
  "use strict";

  const SETTING = "enabled";
  let enabled = true;
  let observedPlaylist = null;
  let restoredPlaylist = null;

  /* ===[ MQF :: MIX PAGE DETECTION ]=========================== */
  const isMixPage = () => {
    if (location.pathname !== "/watch") return false;
    const listId = new URLSearchParams(location.search).get("list");
    return Boolean(listId && listId.startsWith("RD"));
  };

  // Observe the list element itself so YouTube cannot quietly hide it again.
  const playlistObserver = new MutationObserver(() => {
    if (enabled && isMixPage() && observedPlaylist?.hasAttribute("hidden")) {
      showPlaylist(observedPlaylist);
    }
  });

  /* ===[ MQF :: QUEUE VISIBILITY ENGINE ]====================== */
  function showPlaylist(playlist) {
    if (!playlist?.hasAttribute("hidden")) return;
    restoredPlaylist = playlist;
    playlist.removeAttribute("hidden");
  }

  function attachPlaylist(playlist) {
    if (playlist === observedPlaylist) return;
    playlistObserver.disconnect();
    observedPlaylist = playlist;
    if (playlist) {
      playlistObserver.observe(playlist, {
        attributes: true,
        attributeFilter: ["hidden"]
      });
    }
  }

  function fixPlaylist() {
    if (!enabled) {
      attachPlaylist(null);
      return;
    }
    const playlist = isMixPage() ? document.getElementById("playlist") : null;
    attachPlaylist(playlist);
    showPlaylist(playlist);
  }

  function onNavigation() {
    fixPlaylist();
    // Some YouTube navigations render the queue after the navigation event.
    setTimeout(fixPlaylist, 250);
    setTimeout(fixPlaylist, 1000);
  }

  /* ===[ MQF :: PREFERENCE SYNC ]============================= */
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local" || !changes[SETTING]) return;
    enabled = changes[SETTING].newValue !== false;

    if (!enabled && restoredPlaylist?.isConnected && isMixPage()) {
      // Undo the most recent change we made, without touching regular playlists.
      restoredPlaylist.setAttribute("hidden", "");
    }
    if (!enabled) restoredPlaylist = null;
    onNavigation();
  });

  document.addEventListener("yt-navigate-finish", onNavigation);
  document.addEventListener("yt-page-data-updated", onNavigation);
  window.addEventListener("popstate", onNavigation);

  // Fallback for late renders and queue replacements in YouTube's SPA.
  setInterval(fixPlaylist, 1200);

  chrome.storage.local.get({ enabled: true }, ({ enabled: storedEnabled }) => {
    enabled = storedEnabled !== false;
    onNavigation();
  });
})();
