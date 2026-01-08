# Clipse Video Player Library

A modular, framework-agnostic video player library built with vanilla JavaScript.

## Features
- 📦 Zero dependencies
- 🔧 Highly customizable
- 📱 Responsive and mobile-friendly
- 🎨 Easy theming with CSS variables
- 🔌 Modular component architecture

## Installation

```bash
npm install @clipse_video-player/video-player
```

Or via CDN:

```html
<script src="https://unpkg.com/@clipse_video-player/video-player/dist/video-player.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@clipse_video-player/video-player/dist/video-player.css">
```

## Usage

### Basic Usage (JS)

```javascript
import VideoPlayer from '@clipse_video-player/video-player';
import '@clipse_video-player/video-player/dist/video-player.css'; // Don't forget CSS

const player = new VideoPlayer({
    container: '#video-container',
    src: 'path/to/video.mp4'
});
```

### Usage with HTML

You can wrap an existing HTML `<video>` element. The library will automatically detect it and apply the custom UI.

```html
<div id="my-player">
    <video src="my-video.mp4" playsinline></video>
</div>

<script>
    // Assuming script is loaded via CDN or bundle
    const player = new VideoPlayer({
        container: '#my-player'
    });
</script>
```

### Usage with React

Use a `ref` to access the container and `useEffect` to initialize the player.

```jsx
import React, { useEffect, useRef } from 'react';
import VideoPlayer from '@clipse_video-player/video-player';
import '@clipse_video-player/video-player/dist/video-player.css';

const MyVideoPlayer = () => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize player
        playerRef.current = new VideoPlayer({
            container: containerRef.current,
            src: 'https://example.com/video.mp4',
            // Or remove src if wrapping a video tag inside the div
        });

        // Cleanup
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, []);

    return <div ref={containerRef} style={{ width: '100%', aspectRatio: '16/9' }} />;
};

export default MyVideoPlayer;
```

## API

### Methods
- `player.play()`: Start playback
- `player.pause()`: Pause playback
- `player.seek(time)`: Seek to specific time
- `player.setVolume(level)`: Set volume (0-1)
- `player.destroy()`: Cleanup and remove player

### Events
- `play`, `pause`, `timeupdate`, `ended`, `volumechange`

## License
MIT
