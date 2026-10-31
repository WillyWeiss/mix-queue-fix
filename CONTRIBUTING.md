<!--
  +----------------------------------------------------------------+
  |                                                                |
  |     __  __    ___    _____                                     |
  |    |  \/  |  / _ \  |  ___|                                    |
  |    | |\/| | | | | | | |_                                       |
  |    | |  | | | |_| | |  _|                                      |
  |    |_|  |_|  \__\_\ |_|                                        |
  |                                                                |
  |    M I X   Q U E U E   F I X                                   |
  |    ~~~~~~~~~~~~~~~~~~~~~~~~~                                   |
  |                                                                |
  |    [ SYS: MQF-01 ]       [ MODE: QUEUE RESTORE ]               |
  |    [ EST: 2026  ]       [ SIGNAL: ACTIVE     ]                 |
  |                                                                |
  |    "The queue was never gone. Just hidden."                    |
  |                                                                |
  +----------------------------------------------------------------+
   FILE    : CONTRIBUTING.md
   MODULE  : CONTRIBUTOR GUIDE
   VERSION : 1.1.0
   LICENSE : MIT
   -----------------------------------------------------------------
-->

# Contributing to Mix Queue Fix

Thanks for helping improve the extension. Keep changes small, testable and privacy-focused.

## Development

1. Load the repository root via **Load unpacked** at `edge://extensions` (or `chrome://extensions`).
2. Open a YouTube Mix and verify that the upcoming queue is shown.
3. Check that turning the popup switch **OFF** stops automatic restoration and the preference persists after reopening the popup.
4. Test ordinary YouTube playlists to ensure they are unaffected.
5. Before sending a pull request, run `node --test tests/*.test.cjs` if Node.js is installed.

## Code conventions

- Use descriptive comments and small functions; retain the established JavaScript style.
- Preserve the **Classic Terminal** banner at the beginning of all comment-compatible source files and add concise MQF section dividers where useful.
- Keep `manifest.json` strict JSON: comments are not allowed.
- Do not introduce analytics, tracking, external requests or additional permissions without explaining the need and reviewing privacy implications.
- If YouTube changes its markup, describe the affected behavior and include reproduction steps in the issue or pull request.

## Reporting bugs

Include the browser/version, whether the extension switch is ON, a sample Mix URL with sensitive parameters removed if needed, the observed versus expected result, and console messages if available. Avoid sharing personal account information.

## Third-party trademarks

This is an independent project and is not affiliated with YouTube, Google, Microsoft or Brave.
