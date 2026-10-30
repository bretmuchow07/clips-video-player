import Component from './Component.js';
import { formatTime } from '../utils/time.js';

export default class ProgressBar extends Component {
    constructor(player) {
        super(player);
        this.isDragging = false;
        this.rafId = null;
        this.targetSeekTime = null;

        // Bind methods
        this.onTimeUpdate = this.onTimeUpdate.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onPointerCancel = this.onPointerCancel.bind(this);
        this.onHoverMove = this.onHoverMove.bind(this);
        this.onHoverLeave = this.onHoverLeave.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    create() {
        const timeline = this.createElement('div', 'vp-timeline', {
            role: 'slider',
            tabindex: 0,
            'aria-label': 'Video progress slider',
            'aria-valuemin': 0,
            'aria-valuemax': 100,
            'aria-valuenow': 0,
            'aria-valuetext': '00:00'
        });

        // 1. Buffer Bar (loaded content)
        this.bufferBar = this.createElement('div', 'vp-buffer-bar');
        timeline.appendChild(this.bufferBar);

        // 2. Played Progress Bar
        this.progressBar = this.createElement('div', 'vp-progress-bar');
        this.progressHandle = this.createElement('div', 'vp-progress-handle');
        this.progressBar.appendChild(this.progressHandle);
        timeline.appendChild(this.progressBar);

        // 3. Time Preview Tooltip
        this.timePreview = this.createElement('div', 'vp-time-preview');
        this.timePreview.style.display = 'none';
        timeline.appendChild(this.timePreview);

        this.timeline = timeline;

        // Player subscriptions
        this.addPlayerListener('timeupdate', this.onTimeUpdate);
        this.addPlayerListener('loadedmetadata', this.onTimeUpdate);
        this.addPlayerListener('progress', this.onProgress);

        // Pointer interactions (works for mouse, touch, and pen)
        this.addDomListener(timeline, 'pointerdown', this.onPointerDown);
        this.addDomListener(timeline, 'pointermove', this.onHoverMove);
        this.addDomListener(timeline, 'pointerleave', this.onHoverLeave);
        this.addDomListener(timeline, 'keydown', this.onKeyDown);

        return timeline;
    }

    onTimeUpdate() {
        if (this.isDragging) return;
        const duration = this.player.video?.duration;
        const currentTime = this.player.video?.currentTime || 0;

        if (!duration || isNaN(duration) || !isFinite(duration)) {
            this.updateUI(0, currentTime);
            return;
        }

        const percent = Math.max(0, Math.min(100, (currentTime / duration) * 100));
        this.updateUI(percent, currentTime);
    }

    onProgress() {
        if (!this.player.video) return;
        const video = this.player.video;
        const duration = video.duration;

        if (!duration || isNaN(duration) || !isFinite(duration)) {
            this.bufferBar.style.width = '0%';
            return;
        }

        const buffered = video.buffered;
        if (buffered && buffered.length > 0) {
            const currentTime = video.currentTime;
            let loadedEnd = 0;

            for (let i = 0; i < buffered.length; i++) {
                if (buffered.start(i) <= currentTime && currentTime <= buffered.end(i)) {
                    loadedEnd = buffered.end(i);
                    break;
                } else if (buffered.end(i) > loadedEnd) {
                    loadedEnd = buffered.end(i);
                }
            }

            const percent = Math.max(0, Math.min(100, (loadedEnd / duration) * 100));
            this.bufferBar.style.width = `${percent}%`;
        }
    }

    updateUI(percent, time) {
        if (this.progressBar) {
            this.progressBar.style.width = `${percent}%`;
        }
        if (this.timeline) {
            this.timeline.setAttribute('aria-valuenow', Math.round(percent).toString());
            this.timeline.setAttribute('aria-valuetext', formatTime(time));
        }
    }

    onPointerDown(e) {
        if (e.button !== undefined && e.button !== 0) return; // Only primary button
        this.isDragging = true;
        this.timeline.classList.add('vp-dragging');

        try {
            e.target.setPointerCapture(e.pointerId);
        } catch (err) {
            // Fallback if pointer capture not supported
        }

        this.addDomListener(this.timeline, 'pointermove', this.onPointerMove);
        this.addDomListener(this.timeline, 'pointerup', this.onPointerUp);
        this.addDomListener(this.timeline, 'pointercancel', this.onPointerCancel);

        this.handlePointerPosition(e, true);
    }

    onPointerMove(e) {
        if (!this.isDragging) return;
        this.handlePointerPosition(e, false);
    }

    onPointerUp(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.timeline.classList.remove('vp-dragging');

        try {
            e.target.releasePointerCapture(e.pointerId);
        } catch (err) {
            // Ignore
        }

        this.timeline.removeEventListener('pointermove', this.onPointerMove);
        this.timeline.removeEventListener('pointerup', this.onPointerUp);
        this.timeline.removeEventListener('pointercancel', this.onPointerCancel);

        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }

        // Commit final seek immediately
        this.handlePointerPosition(e, true);
    }

    onPointerCancel(e) {
        this.onPointerUp(e);
    }

    handlePointerPosition(e, immediateSeek = false) {
        const rect = this.timeline.getBoundingClientRect();
        if (rect.width === 0) return;

        let pos = (e.clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));

        const duration = this.player.video?.duration || 0;
        const targetTime = duration * pos;

        this.updateUI(pos * 100, targetTime);

        if (!duration || isNaN(duration) || !isFinite(duration)) return;

        if (immediateSeek) {
            this.player.seek(targetTime);
        } else {
            // Throttle seeks during active dragging using requestAnimationFrame
            this.targetSeekTime = targetTime;
            if (!this.rafId) {
                this.rafId = requestAnimationFrame(() => {
                    if (this.targetSeekTime !== null) {
                        this.player.seek(this.targetSeekTime);
                        this.targetSeekTime = null;
                    }
                    this.rafId = null;
                });
            }
        }
    }

    onHoverMove(e) {
        if (this.isDragging) return;
        const duration = this.player.video?.duration;
        if (!duration || isNaN(duration) || !isFinite(duration)) {
            this.timePreview.style.display = 'none';
            return;
        }

        const rect = this.timeline.getBoundingClientRect();
        if (rect.width === 0) return;

        let pos = (e.clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        const time = pos * duration;

        this.timePreview.textContent = formatTime(time);
        this.timePreview.style.display = 'block';
        this.timePreview.style.left = `${pos * 100}%`;
    }

    onHoverLeave() {
        if (!this.isDragging) {
            this.timePreview.style.display = 'none';
        }
    }

    onKeyDown(e) {
        const duration = this.player.video?.duration;
        const currentTime = this.player.video?.currentTime || 0;
        if (!duration || isNaN(duration) || !isFinite(duration)) return;

        let handled = true;
        switch (e.key) {
            case 'ArrowLeft':
                this.player.seek(Math.max(0, currentTime - 5));
                break;
            case 'ArrowRight':
                this.player.seek(Math.min(duration, currentTime + 5));
                break;
            case 'PageDown':
                this.player.seek(Math.max(0, currentTime - 30));
                break;
            case 'PageUp':
                this.player.seek(Math.min(duration, currentTime + 30));
                break;
            case 'Home':
                this.player.seek(0);
                break;
            case 'End':
                this.player.seek(duration);
                break;
            default:
                handled = false;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
        super.destroy();
    }
}
