# Changelog

All notable changes to the `@clipse_video-player/video-player` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-10-30

### 🚀 Highlights & Major Improvements

This release brings an architectural overhaul focused on production resilience, zero-memory-leak lifecycles for Single Page Applications (React, Vue, Svelte, Next.js), buttery-smooth 60fps scrubbing via Pointer Events and `requestAnimationFrame`, full WCAG AAA accessibility, and a 99% reduction in npm tarball size.

### ✨ Added
- **Unified Pointer Capture Scrubbing:**
  - Migrated progress bar interaction from legacy mouse events to Pointer Events (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`).
  - Implemented `element.setPointerCapture()` so scrubbing continues uninterrupted even if the cursor or touch gesture exits the browser window.
  - Added hardware-decoder protection: seeks are throttled via `requestAnimationFrame` to maintain smooth 60fps scrubbing without dropping audio frames or stalling video decoders.
  - Added buffer progress track (`.vp-buffer-bar`) visualizing active buffered ranges dynamically.
- **YouTube-Standard Keyboard Shortcuts:**
  - `Space` / `K`: Toggle play/pause.
  - `M`: Toggle audio mute (with volume state retention).
  - `F`: Toggle fullscreen mode.
  - `←` / `J` & `→` / `L`: Seek backward / forward 5 seconds.
  - `↑` / `↓`: Increase / decrease volume by 5%.
  - `0`–`9`: Seek directly to 0%–90% of video duration.
  - `Escape`: Instantly close open menus (quality, speed, captions) and return focus.
  - Built-in form guard: hotkeys automatically disable when typing in `<input>` or `<textarea>` elements.
- **WCAG AAA Accessibility:**
  - Added `role="slider"`, `tabindex="0"`, `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` (e.g. `01:23 of 03:45`) to the timeline and volume sliders.
  - Added accessible popup menu roles (`role="menu"`, `role="menuitemradio"`, `aria-haspopup="true"`, `aria-expanded="false"`) to Quality and Speed menus.
  - Visible high-contrast focus rings (`:focus-visible`) for complete keyboard-only operation.
- **Cross-Browser & iOS Resilience:**
  - Automatic iOS detection: redirects container fullscreen requests to native `video.webkitEnterFullscreen()` on iPhone Safari where standard div fullscreen is disallowed.
  - Hides non-functional software volume sliders on iOS devices where audio volume is physically locked to hardware volume buttons.
  - Added `crossorigin` configuration support (`crossorigin="anonymous"` by default when subtitles/tracks are specified) to prevent WebVTT CORS security errors.
- **Multi-Source Quality & Subtitles:**
  - Native `<track>` integration in `Captions` component with automatic WebVTT parsing and CSS `::cue` rendering.
  - Quality selector menu allowing dynamic resolution switching while seamlessly preserving playback state, buffering, and `currentTime`.
- **TypeScript Support:**
  - Added complete TypeScript definitions in `types/index.d.ts` covering player options, methods, events, tracks, and qualities.
- **Event Architecture:**
  - Added `player.onAny(events, callback)` helper for subscribing to multiple events simultaneously.
  - `player.on()` now returns an unsubscribe function: `const unbind = player.on('play', ...)`.

### ⚡ Performance & Package Optimization
- **99% Smaller NPM Package:** Added explicit `"files": ["dist", "types", "src"]` to `package.json`, preventing test videos and demo media from bundling. Dropped package size from **10.3 MB** to **132 kB**.
- **Coordinated Teardown (`player.destroy()`):** Implemented an automated disposer lifecycle pattern in `Component.js` and `VideoPlayer.js`. Calling `player.destroy()` systematically clears:
  - All DOM element listeners (`pointermove`, `pointerup`, `keydown`, `resize`).
  - Active `setTimeout` / `requestAnimationFrame` timers.
  - Subscribed child components (`Controls`, `ProgressBar`, `VolumeControl`, menus).
  - Internal `EventEmitter` listeners.

### 🐛 Fixed
- Fixed crash in `formatTime` when passing `Infinity` (e.g. live HLS/DASH streams) or video durations greater than 24 hours.
- Fixed Rollup UMD export wrapper issue where importing via script tag required `VideoPlayer.default` instead of `window.VideoPlayer`.
- Fixed ESM missing `.js` extensions in internal imports under Node.js native test runner.
- Removed dead placeholder code (`SettingsMenu.js`).

---

## [1.0.1] - 2026-01-08

### 🐛 Fixed
- Fixed path resolution for `.deploy` directory in automated release workflows.
- Corrected CSS import paths for CDN usage.

---

## [1.0.0] - 2026-01-08

### ✨ Initial Release
- Core HTML5 video player wrapper with custom control bar.
- Play/pause toggle, volume slider, fullscreen toggle.
- Basic time display (`current / duration`).
- CSS custom properties for theming.
