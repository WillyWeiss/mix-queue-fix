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
 *  FILE    : popup.js
 *  MODULE  : POPUP CONTROL UNIT
 *  VERSION : 1.1.0
 *  LICENSE : MIT
 *  -----------------------------------------------------------------
 */

(() => {
  "use strict";
  const toggle = document.getElementById("enabled-switch");
  const status = document.querySelector(".status");
  const title = document.getElementById("status-title");
  const detail = document.getElementById("status-detail");
  const label = document.getElementById("status-label");

  /* ===[ MQF :: POPUP STATUS DISPLAY ]======================== */
  function render(enabled) {
    toggle.checked = enabled;
    status.classList.toggle("active", enabled);
    status.classList.toggle("inactive", !enabled);
    title.textContent = enabled ? "Fix is enabled" : "Fix is paused";
    detail.textContent = enabled ? "Ready on YouTube Mix pages" : "Automatic queue fix is off";
    label.textContent = enabled ? "ON" : "OFF";
  }

  function showError() {
    title.textContent = "Could not save setting";
    detail.textContent = "Try closing and reopening the popup";
    label.textContent = "ERROR";
  }

  chrome.storage.local.get({ enabled: true }, (result) => {
    if (chrome.runtime.lastError) { showError(); return; }
    render(result.enabled !== false);
    toggle.disabled = false;
  });

  /* ===[ MQF :: ON/OFF CONTROL ]============================== */
  toggle.addEventListener("change", () => {
    const requested = toggle.checked;
    toggle.disabled = true;
    chrome.storage.local.set({ enabled: requested }, () => {
      if (chrome.runtime.lastError) {
        render(!requested);
        showError();
      } else {
        render(requested);
      }
      toggle.disabled = false;
    });
  });
})();
