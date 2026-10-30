# Clipse Video Player

<p align="left">
  <a href="https://www.npmjs.com/package/@clipse_video-player/video-player"><img src="https://img.shields.io/npm/v/@clipse_video-player/video-player.svg?style=flat-square&color=8F62AA" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@clipse_video-player/video-player"><img src="https://img.shields.io/npm/dm/@clipse_video-player/video-player.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://bundlephobia.com/package/@clipse_video-player/video-player"><img src="https://img.shields.io/bundlephobia/minzip/@clipse_video-player/video-player?style=flat-square&color=success" alt="bundle size"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license"></a>
  <a href="types/index.d.ts"><img src="https://img.shields.io/badge/types-TypeScript-blue.svg?style=flat-square" alt="TypeScript"></a>
</p>

A modular, lightweight (<14 kB gzipped), zero-dependency HTML5 video player library engineered for **60fps scrubbing**, **WCAG AAA accessibility**, **YouTube-standard keyboard shortcuts**, and **guaranteed zero memory leaks** in Single-Page Applications (React, Vue, Svelte, or Vanilla JS).

---

## ✨ Features

- 📦 **Zero External Dependencies:** Built with pure vanilla JavaScript and CSS custom properties.
- ⚡ **60 FPS RAF-Throttled Scrubbing:** Unified Pointer Events with `setPointerCapture` track scrubbing even if the cursor leaves the window, throttled to 60fps via `requestAnimationFrame` to prevent hardware decoder stutter.
- 🛡️ **Zero SPA Memory Leaks:** Coordinated disposer lifecycle pattern systematically tears down DOM listeners, timers, child components, and event buses on `player.destroy()`.
- ♿ **WCAG AAA Accessible by Default:** Complete ARIA semantics (`role="slider"`, `aria-valuenow`, `aria-valuetext`), high-contrast focus rings, screen reader announcements, and keyboard-operable menus.
- ⌨️ **Rich Keyboard Navigation:** Standard YouTube hotkeys (`Space`, `K`, `M`, `F`, `←`, `→`, `↑`, `↓`, `0`–`9`, `Esc`) with automatic input-focus suppression.
- 📱 **Mobile & iOS Hardened:** Automatically handles iOS Safari restrictions (redirects fullscreen to `webkitEnterFullscreen()`, hides non-functional software volume sliders on iPhones).
- 🎬 **Multi-Source Quality & WebVTT Subtitles:** Switch resolutions dynamically while seamlessly preserving playback state and time. Native `<track>` parsing with CSS `::cue` rendering.
- 🎨 **Deep CSS Theming:** Control accent colors, background opacity, border radii, and dimensions via standard CSS variables.
- 📝 **TypeScript First:** Complete TypeScript typings included (`types/index.d.ts`).

---

## 📦 Installation

Install via your preferred package manager:

```bash
# npm
npm install @clipse_video-player/video-player

# yarn
yarn add @clipse_video-player/video-player

# pnpm
pnpm add @clipse_video-player/video-player

# bun
bun add @clipse_video-player/video-player
```

### CDN (Direct HTML Import)

```html
<!-- Stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/@clipse_video-player/video-player/dist/video-player.css">

<!-- UMD Script (defines window.VideoPlayer) -->
<script src="https://unpkg.com/@clipse_video-player/video-player/dist/video-player.min.js"></script>
```

---

## 🚀 Quickstart

### 1. Vanilla JavaScript

```javascript
import VideoPlayer from '@clipse_video-player/video-player';
import '@clipse_video-player/video-player/dist/video-player.css';

const player = new VideoPlayer({
    container: '#player-container',
    src: 'https://vjs.zencdn.net/v/oceans.mp4',
    autoplay: false,
    keyboard: true,
    tracks: [
        { label: 'English', src: 'https://vjs.zencdn.net/v/oceans.vtt', srclang: 'en', default: true }
    ],
    qualities: [
        { label: '1080p', src: 'https://example.com/video-1080p.mp4', res: 1080 },
        { label: '720p', src: 'https://example.com/video-720p.mp4', res: 720 },
        { label: '480p', src: 'https://example.com/video-480p.mp4', res: 480 }
    ]
});

player.on('play', () => console.log('Playback started'));
player.on('timeupdate', () => console.log('Current time:', player.video.currentTime));
```

### 2. Enhancing an Existing HTML5 `<video>` Tag

Clipse automatically detects existing `<video>` elements inside your container, preserving pre-existing sources and attributes without modifying your markup:

```html
<div id="player-container">
    <video src="video.mp4" playsinline controls></video>
</div>

<script>
    const player = new VideoPlayer({
        container: '#player-container'
    });
</script>
```

### 3. React Integration

Clipse guarantees 100% memory cleanup upon component unmount:

```tsx
import React, { useEffect, useRef } from 'react';
import VideoPlayer from '@clipse_video-player/video-player';
import '@clipse_video-player/video-player/dist/video-player.css';

interface PlayerProps {
    src: string;
}

export const VideoPlayerComponent: React.FC<PlayerProps> = ({ src }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<VideoPlayer | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        playerRef.current = new VideoPlayer({
            container: containerRef.current,
            src,
            keyboard: true
        });

        // Coordinated disposer pattern tears down all DOM listeners and timers
        return () => {
            playerRef.current?.destroy();
            playerRef.current = null;
        };
    }, [src]);

    return <div ref={containerRef} style={{ width: '100%', aspectRatio: '16/9' }} />;
};
```

### 4. Vue 3 Integration

```vue
<template>
  <div ref="container" style="width: 100%; aspect-ratio: 16/9;" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import VideoPlayer from '@clipse_video-player/video-player';
import '@clipse_video-player/video-player/dist/video-player.css';

const container = ref(null);
let player = null;

onMounted(() => {
  player = new VideoPlayer({
    container: container.value,
    src: 'https://example.com/video.mp4',
    keyboard: true
  });
});

onUnmounted(() => {
  player?.destroy();
});
</script>
```

---

## ⚙️ Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `container` | `string \| HTMLElement` | *(required)* | CSS selector or DOM element where the player will mount. |
| `src` | `string` | `undefined` | Direct URL to the video file. Optional if container wraps an existing `<video>`. |
| `controls` | `boolean` | `true` | Whether to render the custom Clipse UI controls. |
| `autoplay` | `boolean` | `false` | Automatically begin playback upon load. Note: modern browsers require `muted: true` for autoplay. |
| `muted` | `boolean` | `false` | Start playback in muted state. |
| `playsinline` | `boolean` | `true` | Prevents mobile Safari from launching the default native fullscreen player automatically. |
| `keyboard` | `boolean` | `true` | Enables YouTube-style keyboard hotkeys when the player is focused. |
| `crossorigin` | `'anonymous' \| 'use-credentials'` | `'anonymous'` | Configures the `crossorigin` attribute for CORS-compliant subtitle fetching. |
| `tracks` | `VideoPlayerTrack[]` | `[]` | Array of subtitle/caption track configurations (`{ label, src, srclang, kind, default }`). |
| `qualities` | `VideoPlayerQuality[]` | `[]` | Array of video quality variants (`{ label, src, res }`) for the resolution menu. |
| `theme` | `string` | `'dark'` | Theme identifier applied as a CSS class to the container. |

---

## ⌨️ Keyboard Shortcuts

When the player container is focused, the following hotkeys are available:

| Key | Action |
| :--- | :--- |
| <kbd>Space</kbd> / <kbd>K</kbd> | Toggle play / pause |
| <kbd>M</kbd> | Toggle mute |
| <kbd>F</kbd> | Toggle fullscreen mode |
| <kbd>←</kbd> / <kbd>J</kbd> | Seek backward 5 seconds |
| <kbd>→</kbd> / <kbd>L</kbd> | Seek forward 5 seconds |
| <kbd>↑</kbd> | Increase volume by 5% |
| <kbd>↓</kbd> | Decrease volume by 5% |
| <kbd>0</kbd>–<kbd>9</kbd> | Jump directly to 0% – 90% of the video duration |
| <kbd>Escape</kbd> | Close active popup menu (speed, quality, captions) |
| <kbd>Tab</kbd> | Focus through interactive controls |

*Note: All shortcuts automatically suppress when the user is actively typing inside an `<input>` or `<textarea>` element.*

---

## 🛠️ API Reference

### Methods

```javascript
// Playback Controls
player.play();               // Returns Promise<void>
player.pause();              // Pauses playback
player.togglePlay();         // Toggles between play and pause
player.seek(seconds);        // Clamps and seeks to target timestamp in seconds
player.setVolume(level);     // Sets volume (0.0 to 1.0) and adjusts mute state automatically
player.toggleFullscreen();   // Toggles container or native iOS fullscreen

// UI Controls
player.showControls();       // Forces the control bar visible
player.hideControlsDelayed();// Starts the 3-second auto-hide timeout

// Teardown
player.destroy();            // Completely removes listeners, timers, child components, and DOM nodes
```

### Event Bus

Clipse includes a lightweight, built-in EventEmitter:

```javascript
// Listen to a specific event
const unsubscribe = player.on('play', () => console.log('Playing'));

// Remove listener
unsubscribe(); 
// or: player.off('play', handler);

// Listen to multiple events simultaneously
player.onAny(['play', 'pause', 'ended'], (event) => {
    console.log('Playback state changed:', event);
});
```

#### Supported Events

| Event | Arguments | Description |
| :--- | :--- | :--- |
| `play` | - | Emitted when playback starts or resumes. |
| `pause` | - | Emitted when playback pauses. |
| `ended` | - | Emitted when playback reaches the end of the media. |
| `timeupdate` | - | Emitted periodically as the playback position changes. |
| `seeking` | - | Emitted when the user begins seeking. |
| `seeked` | - | Emitted when seek completes and new frame renders. |
| `volumechange`| - | Emitted when volume or mute state changes. |
| `speedchange` | `(speed: number)` | Emitted when playback rate changes (e.g. `1.5x`, `2x`). |
| `qualitychange`| `(quality: object)` | Emitted when resolution is switched. |
| `captionschange`| `(track: object \| null)` | Emitted when subtitle track is changed or turned off. |
| `fullscreenchange`| `(isFullscreen: boolean)` | Emitted when fullscreen mode is entered or exited. |
| `error` | `(error: Error)` | Emitted on media loading or decoding failures. |

---

## 🎨 Theming with CSS Variables

Customize the player's visual appearance by overriding CSS custom properties on your container or globally:

```css
:root {
    /* Primary Accent Color (progress bar, active menu items, volume) */
    --vp-primary-color: #8F62AA;

    /* Backgrounds & Overlays */
    --vp-bg-color: #0B0F17;
    --vp-control-bg: rgba(11, 15, 23, 0.85);
    --vp-menu-bg: rgba(18, 24, 38, 0.95);

    /* Text & Icon Colors */
    --vp-text-color: #EDF2F4;
    --vp-text-muted: #8D99AE;

    /* Metrics */
    --vp-border-radius: 8px;
    --vp-progress-height: 4px;
}
```

---

## 🧪 Testing

Run the test suite using Node.js's native test runner:

```bash
npm test
```

Build the distribution bundles:

```bash
npm run build
```

---

## 📄 License

Released under the [MIT License](LICENSE). Built for production reliability.
