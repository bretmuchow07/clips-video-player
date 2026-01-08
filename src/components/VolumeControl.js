import Component from './Component';

export default class VolumeControl extends Component {
    constructor(player) {
        super(player);
        this.onClick = this.onClick.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onVolumeChange = this.onVolumeChange.bind(this);
    }

    create() {
        const container = this.createElement('div', 'vp-volume');

        this.btn = this.createElement('button', 'vp-button');
        this.btn.innerHTML = this.getIcon(1);
        this.btn.onclick = this.onClick;

        this.slider = this.createElement('input', 'vp-volume__slider');
        this.slider.type = 'range';
        this.slider.min = 0;
        this.slider.max = 1;
        this.slider.step = 0.1;
        this.slider.value = 1;
        this.slider.oninput = this.onInput;

        container.appendChild(this.btn);
        container.appendChild(this.slider);

        this.player.on('volumechange', this.onVolumeChange);

        return container;
    }

    onClick() {
        if (this.player.video.muted) {
            this.player.video.muted = false;
            this.player.setVolume(this.lastVolume || 1);
        } else {
            this.lastVolume = this.player.video.volume;
            this.player.video.muted = true;
            this.player.setVolume(0);
        }
    }

    onInput(e) {
        this.player.setVolume(e.target.value);
    }

    onVolumeChange() {
        const volume = this.player.video.volume;
        const isMuted = this.player.video.muted || volume === 0;

        this.slider.value = isMuted ? 0 : volume;
        this.btn.innerHTML = this.getIcon(isMuted ? 0 : volume);
    }

    getIcon(level) {
        if (level === 0) {
            return '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
        } else if (level < 0.5) {
            return '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>';
        } else {
            return '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 9v6h4l5 5V4L9 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
        }
    }
}
