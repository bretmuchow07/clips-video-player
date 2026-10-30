import test from 'node:test';
import assert from 'node:assert/strict';
import VideoPlayer from '../src/core/VideoPlayer.js';

// Minimal DOM mock for unit testing VideoPlayer in Node environment
function createMockDOM() {
    class MockElement {
        constructor(tagName) {
            this.tagName = tagName.toUpperCase();
            this.classList = {
                classes: new Set(),
                add(c) { this.classes.add(c); },
                remove(c) { this.classes.delete(c); },
                contains(c) { return this.classes.has(c); }
            };
            this.attributes = {};
            this.style = {};
            this.children = [];
            this.parentNode = null;
            this.listeners = {};
            this.volume = 1;
            this.muted = false;
            this.paused = true;
            this.currentTime = 0;
            this.duration = 100;
        }

        setAttribute(key, val) { this.attributes[key] = String(val); }
        getAttribute(key) { return this.attributes[key] || null; }
        hasAttribute(key) { return key in this.attributes; }

        appendChild(child) {
            child.parentNode = this;
            this.children.push(child);
            return child;
        }

        removeChild(child) {
            const idx = this.children.indexOf(child);
            if (idx >= 0) this.children.splice(idx, 1);
            child.parentNode = null;
            return child;
        }

        querySelector(sel) {
            if (sel === 'video') {
                return this.children.find(c => c.tagName === 'VIDEO') || null;
            }
            return null;
        }

        addEventListener(event, handler) {
            if (!this.listeners[event]) this.listeners[event] = [];
            this.listeners[event].push(handler);
        }

        removeEventListener(event, handler) {
            if (!this.listeners[event]) return;
            this.listeners[event] = this.listeners[event].filter(h => h !== handler);
        }

        play() {
            this.paused = false;
            return Promise.resolve();
        }

        pause() {
            this.paused = true;
        }
    }

    global.document = {
        createElement(tag) { return new MockElement(tag); },
        addEventListener() {},
        removeEventListener() {}
    };

    return new MockElement('div');
}

test('VideoPlayer: constructor initializes with container and options', () => {
    const container = createMockDOM();
    const player = new VideoPlayer({
        container,
        src: 'https://example.com/test.mp4',
        autoplay: false
    });

    assert.ok(player.video);
    assert.strictEqual(player.video.src, 'https://example.com/test.mp4');
    assert.ok(container.classList.contains('vp-player'));

    player.destroy();
    assert.strictEqual(player.video, null);
    assert.ok(!container.classList.contains('vp-player'));
});

test('VideoPlayer: play, pause, volume, seek controls', () => {
    const container = createMockDOM();
    const player = new VideoPlayer({
        container,
        src: 'https://example.com/test.mp4'
    });

    player.setVolume(0.5);
    assert.strictEqual(player.video.volume, 0.5);
    assert.strictEqual(player.video.muted, false);

    player.setVolume(0);
    assert.strictEqual(player.video.volume, 0);
    assert.strictEqual(player.video.muted, true);

    player.seek(30);
    assert.strictEqual(player.video.currentTime, 30);

    player.destroy();
});

test('VideoPlayer: configures crossorigin attribute', () => {
    const container = createMockDOM();
    const player = new VideoPlayer({
        container,
        src: 'https://example.com/test.mp4',
        crossorigin: 'anonymous'
    });

    assert.strictEqual(player.video.getAttribute('crossorigin'), 'anonymous');
    player.destroy();
});
