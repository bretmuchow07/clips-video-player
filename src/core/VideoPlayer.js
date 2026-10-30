import EventEmitter from './Events.js';
import Controls from '../components/Controls.js';

export default class VideoPlayer extends EventEmitter {
    constructor(config) {
        super();
        this.config = {
            controls: true,
            autoplay: false,
            muted: false,
            playsinline: true,
            keyboard: true,
            theme: 'dark',
            ...config
        };

        this.container = typeof this.config.container === 'string'
            ? document.querySelector(this.config.container)
            : this.config.container;

        if (!this.container) {
            throw new Error('VideoPlayer: Container not found');
        }

        this.video = null;
        this.controls = null;
        this.spinner = null;
        this.createdVideoElement = false;
        this.controlsTimeout = null;
        this.disposers = [];

        this.init();
    }

    init() {
        this.container.classList.add('vp-player');
        if (this.config.keyboard && !this.container.hasAttribute('tabindex')) {
            this.container.setAttribute('tabindex', '0');
        }

        // 1. Setup Video Element
        const existingVideo = this.container.querySelector('video');
        if (existingVideo) {
            this.video = existingVideo;
            this.video.classList.add('vp-player__video');
            this.createdVideoElement = false;
        } else {
            this.video = document.createElement('video');
            this.video.className = 'vp-player__video';
            this.container.appendChild(this.video);
            this.createdVideoElement = true;
        }

        // Apply Video Attributes
        if (this.config.src && this.video.src !== this.config.src) {
            this.video.src = this.config.src;
        }
        if (this.config.crossorigin) {
            this.video.setAttribute('crossorigin', typeof this.config.crossorigin === 'string' ? this.config.crossorigin : 'anonymous');
        } else if (this.config.tracks && this.config.tracks.length > 0) {
            this.video.setAttribute('crossorigin', 'anonymous');
        }
        if (this.config.playsinline) {
            this.video.setAttribute('playsinline', '');
            this.video.setAttribute('webkit-playsinline', '');
        }
        if (this.config.autoplay) {
            this.video.autoplay = true;
            // Browsers require muted for autoplay
            if (this.config.muted) {
                this.video.muted = true;
            }
        }
        if (this.config.muted) {
            this.video.muted = true;
        }

        // 2. Loading Spinner
        this.spinner = document.createElement('div');
        this.spinner.className = 'vp-player__spinner';
        this.spinner.setAttribute('aria-hidden', 'true');
        this.container.appendChild(this.spinner);

        // 3. Mount Controls
        if (this.config.controls) {
            this.controls = new Controls(this);
            this.controls.mount(this.container);
        }

        // 4. Attach Events
        this.attachEvents();

        // 5. Initial State
        this.showControls();
    }

    addDomListener(target, event, handler, options) {
        if (!target) return;
        target.addEventListener(event, handler, options);
        this.disposers.push(() => {
            try {
                target.removeEventListener(event, handler, options);
            } catch (e) {}
        });
    }

    attachEvents() {
        // Video State Events
        const videoEvents = [
            'play', 'pause', 'ended', 'timeupdate', 'volumechange',
            'loadedmetadata', 'durationchange', 'progress', 'ratechange'
        ];

        videoEvents.forEach(evt => {
            this.addDomListener(this.video, evt, () => this.emit(evt));
        });

        this.addDomListener(this.video, 'play', () => {
            this.hideControlsDelayed();
        });

        this.addDomListener(this.video, 'pause', () => {
            this.showControls();
        });

        this.addDomListener(this.video, 'ended', () => {
            this.showControls();
        });

        // Buffering / Loading State Events
        const showSpinner = () => this.container.classList.add('vp-loading');
        const hideSpinner = () => this.container.classList.remove('vp-loading');

        this.addDomListener(this.video, 'waiting', showSpinner);
        this.addDomListener(this.video, 'seeking', showSpinner);
        this.addDomListener(this.video, 'canplay', hideSpinner);
        this.addDomListener(this.video, 'playing', hideSpinner);
        this.addDomListener(this.video, 'seeked', hideSpinner);

        // Hover & Interaction for Controls Visibility
        this.addDomListener(this.container, 'mouseenter', () => this.showControls());
        this.addDomListener(this.container, 'mouseleave', () => this.hideControlsDelayed());
        this.addDomListener(this.container, 'mousemove', () => {
            this.showControls();
            this.hideControlsDelayed();
        });

        // Click / Touch on video toggles play or controls
        this.addDomListener(this.video, 'click', (e) => {
            e.stopPropagation();
            this.togglePlay();
        });

        // Tap on touch devices
        this.addDomListener(this.container, 'pointerdown', (e) => {
            if (e.pointerType === 'touch') {
                if (!this.container.classList.contains('vp-show-controls')) {
                    this.showControls();
                    this.hideControlsDelayed();
                }
            }
        });

        // Keyboard Shortcuts
        if (this.config.keyboard) {
            this.addDomListener(this.container, 'keydown', (e) => this.handleKeyDown(e));
        }
    }

    handleKeyDown(e) {
        // Don't intercept typing in inputs or textareas
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag === 'input' || activeTag === 'textarea') return;

        let handled = true;

        switch (e.key) {
            case ' ':
            case 'k':
            case 'K':
                this.togglePlay();
                break;
            case 'm':
            case 'M':
                this.setVolume(this.video.muted ? 1 : 0);
                break;
            case 'f':
            case 'F':
                this.toggleFullscreen();
                break;
            case 'ArrowLeft':
            case 'j':
            case 'J':
                this.seek(Math.max(0, this.video.currentTime - 5));
                break;
            case 'ArrowRight':
            case 'l':
            case 'L':
                this.seek(Math.min(this.video.duration || 0, this.video.currentTime + 5));
                break;
            case 'ArrowUp':
                this.setVolume(Math.min(1, this.video.volume + 0.05));
                break;
            case 'ArrowDown':
                this.setVolume(Math.max(0, this.video.volume - 0.05));
                break;
            default:
                if (e.key >= '0' && e.key <= '9' && this.video.duration) {
                    const percent = parseInt(e.key, 10) * 0.1;
                    this.seek(this.video.duration * percent);
                } else {
                    handled = false;
                }
        }

        if (handled) {
            e.preventDefault();
            this.showControls();
            this.hideControlsDelayed();
        }
    }

    showControls() {
        this.container.classList.add('vp-show-controls');
        if (this.controlsTimeout) {
            clearTimeout(this.controlsTimeout);
            this.controlsTimeout = null;
        }
    }

    hideControlsDelayed() {
        if (!this.video || this.video.paused) return; // Keep controls visible if paused

        if (this.controlsTimeout) clearTimeout(this.controlsTimeout);
        this.controlsTimeout = setTimeout(() => {
            if (this.video && !this.video.paused) {
                this.container.classList.remove('vp-show-controls');
            }
        }, 3000);
    }

    play() {
        if (!this.video) return Promise.reject(new Error('Video element not found'));
        return this.video.play().catch(err => {
            this.emit('error', err);
            throw err;
        });
    }

    pause() {
        if (this.video) this.video.pause();
    }

    seek(time) {
        if (!this.video) return;
        this.video.currentTime = Math.max(0, Math.min(this.video.duration || 0, time));
    }

    setVolume(volume) {
        if (!this.video) return;
        const clamped = Math.max(0, Math.min(1, volume));
        this.video.volume = clamped;
        this.video.muted = (clamped === 0);
    }

    togglePlay() {
        if (!this.video) return;
        if (this.video.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        } else if (this.container.requestFullscreen) {
            this.container.requestFullscreen().catch(() => {
                if (this.video?.webkitEnterFullscreen) {
                    this.video.webkitEnterFullscreen();
                }
            });
        } else if (this.video?.webkitEnterFullscreen) {
            this.video.webkitEnterFullscreen();
        }
    }

    destroy() {
        if (this.controlsTimeout) {
            clearTimeout(this.controlsTimeout);
            this.controlsTimeout = null;
        }

        // Clean up DOM event listeners
        while (this.disposers.length > 0) {
            const dispose = this.disposers.pop();
            try { dispose(); } catch (e) {}
        }

        // Teardown controls
        if (this.controls && typeof this.controls.destroy === 'function') {
            this.controls.destroy();
            this.controls = null;
        }

        // Remove spinner
        if (this.spinner && this.spinner.parentNode) {
            this.spinner.parentNode.removeChild(this.spinner);
            this.spinner = null;
        }

        // Teardown video element
        if (this.video) {
            this.video.pause();
            if (this.createdVideoElement) {
                if (this.video.parentNode) {
                    this.video.parentNode.removeChild(this.video);
                }
            } else {
                this.video.classList.remove('vp-player__video');
            }
            this.video = null;
        }

        // Clean container classes
        if (this.container) {
            this.container.classList.remove(
                'vp-player', 'vp-show-controls', 'vp-loading', 'vp-fullscreen'
            );
        }

        // Clean EventEmitter
        this.removeAllListeners();
    }
}
