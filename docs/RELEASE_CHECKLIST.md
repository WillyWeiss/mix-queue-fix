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
   FILE    : docs/RELEASE_CHECKLIST.md
   MODULE  : PUBLISHING CHECKLIST
   VERSION : 1.1.0
   LICENSE : MIT
   -----------------------------------------------------------------
-->

# Pre-release checklist

## Extension functionality

- [x] Classic Terminal ASCII headers added without changing application logic

- [x] Verified by owner in **Microsoft Edge** v1.1.0
- [x] ON/OFF switch, local storage and Mix queue restoring present in source
- [ ] Test a new Mix and navigation to subsequent video
- [ ] Test disabled state remains after browser restart
- [ ] Test Chrome and Brave independently
- [ ] Confirm no errors in extension developer console

## Public repository (next step)

- [ ] Choose repository owner/name and create GitHub repository
- [ ] Upload the **contents** of this folder to the repository root
- [ ] Confirm the README banner, licence and image links render properly
- [ ] Set `assets/social-preview-1280x640.png` under Settings → General → Social preview
- [ ] Add topics: `browser-extension`, `microsoft-edge`, `chrome-extension`, `youtube`, `playlist`, `manifest-v3`
- [ ] Create a GitHub Release `v1.1.0`, with a ZIP of runtime extension files
- [ ] Consider making a support/contact address or issue template

## Store assets / compliance

- [x] 128×128 extension icon exists (`icon128.png`)
- [x] 440×280 small promo image ready
- [x] 1400×560 optional marquee image ready
- [ ] Capture **real** browser screenshot 1280×800 (preferred) or 640×400 showing the working extension
- [ ] Confirm store descriptions and privacy declarations accurately reflect current version
- [ ] Publish a public HTTPS Privacy Policy URL (GitHub Pages is one option)
- [ ] Submit separate listings for Microsoft Edge Add-ons and Chrome Web Store

Do not submit an artificial preview as a real extension screenshot.
