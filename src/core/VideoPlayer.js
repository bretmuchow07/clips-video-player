import EventEmitter from './Events';
import Controls from '../components/Controls';

export default class VideoPlayer extends EventEmitter {
    constructor(config) {
        super();
        this.config = {
            controls: true,
            autoplay: false,
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

        this.init();
    }

    init() {
        this.container.classList.add('vp-player');

        // Setup Video Element
        const existingVideo = this.container.querySelector('video');
        if (existingVideo) {
            this.video = existingVideo;
            this.video.classList.add('vp-player__video');
            // Allow config to override/set src if not present
            if (this.config.src) this.video.src = this.config.src;
            if (this.config.autoplay) this.video.autoplay = true;
        } else {
            this.video = document.createElement('video');
            this.video.className = 'vp-player__video';
            if (this.config.src) this.video.src = this.config.src;
            if (this.config.autoplay) this.video.autoplay = true;
            this.container.appendChild(this.video);
        }

        // Mount Controls
        if (this.config.controls) {
            this.controlsComponent = new Controls(this);
            this.controlsComponent.mount(this.container);
        }

        // Event Listeners
        this.attachEvents();

        // Initial state
        this.showControls();
    }

    attachEvents() {
        // Video Events
        this.video.addEventListener('play', () => {
            this.emit('play');
            this.hideControlsDelayed();
        });

        this.video.addEventListener('pause', () => {
            this.emit('pause');
            this.showControls();
        });

        this.video.addEventListener('ended', () => {
            this.emit('ended');
            this.showControls();
        });

        this.video.addEventListener('timeupdate', () => this.emit('timeupdate'));
        this.video.addEventListener('volumechange', () => this.emit('volumechange'));
        this.video.addEventListener('loadedmetadata', () => this.emit('loadedmetadata'));

        // Mouse Interaction for Controls
        this.container.addEventListener('mouseenter', () => this.showControls());
        this.container.addEventListener('mouseleave', () => this.hideControlsDelayed());
        this.container.addEventListener('mousemove', () => {
            this.showControls();
            this.hideControlsDelayed();
        });

        // Click to toggle play
        this.video.addEventListener('click', () => this.togglePlay());
    }

    showControls() {
        this.container.classList.add('vp-show-controls');
        if (this.controlsTimeout) clearTimeout(this.controlsTimeout);
    }

    hideControlsDelayed() {
        if (this.video.paused) return; // Keep controls visible if paused

        if (this.controlsTimeout) clearTimeout(this.controlsTimeout);
        this.controlsTimeout = setTimeout(() => {
            this.container.classList.remove('vp-show-controls');
        }, 3000);
    }

    play() {
        return this.video.play();
    }

    pause() {
        this.video.pause();
    }

    seek(time) {
        this.video.currentTime = time;
    }

    setVolume(volume) {
        this.video.volume = Math.max(0, Math.min(1, volume));
        this.video.muted = (volume === 0);
    }

    togglePlay() {
        if (this.video.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    destroy() {
        this.video.remove();
        if (this.controls) this.controls.destroy();
        this.container.innerHTML = '';
    }
}
