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
   FILE    : docs/BRAND_GUIDE.md
   MODULE  : BRAND SYSTEM
   VERSION : 1.1.0
   LICENSE : MIT
   -----------------------------------------------------------------
-->

# Mix Queue Fix — Brand guide

## Identity

**Name:** Mix Queue Fix (extension display name: Mix Queue Fix for YouTube™)  
**Tagline:** Your mix. Your queue. Back where it belongs.  
**Voice:** clear, practical, calm, friendly; no affiliation claims.

## Palette

| Role | Hex |
| --- | --- |
| Midnight background | `#061328` |
| Navy | `#122C57` |
| Icon blue | `#21447E` |
| Mint accent | `#47E2BB` |
| White text | `#F6F9FF` |
| Supporting text | `#BACFE2` |

**Typography:** Inter or a comparable neutral sans-serif.

## Assets

- `assets/github-banner.png` — README hero, 1600 × 600 px
- `assets/social-preview-1280x640.png` — GitHub social preview, 1280 × 640 px
- `assets/store-small-440x280.png` — Chrome Web Store small promotional graphic
- `assets/store-marquee-1400x560.png` — Chrome Web Store optional large promotional graphic
- `assets/logo-mark-512.png` — larger marketing rendition of the icon
- `assets/logo-vector.svg` — editable vector approximation of the original logo
- `assets/popup-preview.png` — existing popup **design preview** (not an actual store screenshot)

## Usage rules

- Keep the exact icon and popup in the working v1.1.0 extension unless we decide on a versioned release.
- Do not imply Google, YouTube or Microsoft affiliation.
- For store submissions use a real browser screenshot of the extension in action, not a mock-up.
- Avoid fake reviews, false technical claims or copying YouTube's official logo.
- Promotional graphics are marketing material, not screenshots of real functionality.

## Source file headers

Use **Concept 01 — Classic Terminal** as the canonical ASCII comment header. It includes the MQF logo, system identifiers, tagline and file-specific metadata. Source section separators use the same MQF terminal style.

Keep ASCII banners in comment-safe text files only. Do not add comments to `manifest.json`, modify the MIT licence text or embed banners in binary image files.
