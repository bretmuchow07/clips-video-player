import Component from './Component.js';

export default class VolumeControl extends Component {
    constructor(player) {
        super(player);
        this.lastVolume = 1;

        this.onClick = this.onClick.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onVolumeChange = this.onVolumeChange.bind(this);
    }

    create() {
        const container = this.createElement('div', 'vp-volume');

        // Detect iOS where volume manipulation is blocked by the OS
        const isIOS = typeof navigator !== 'undefined' && (
            /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
        );

        const currentVol = this.player.video?.volume ?? 1;
        const isMuted = this.player.video?.muted || currentVol === 0;

        this.btn = this.createElement('button', 'vp-button vp-button--volume', {
            type: 'button',
            'aria-label': isMuted ? 'Unmute (m)' : 'Mute (m)',
            title: isMuted ? 'Unmute (m)' : 'Mute (m)'
        });
        this.btn.innerHTML = this.getIcon(isMuted ? 0 : currentVol);
        this.addDomListener(this.btn, 'click', this.onClick);
        container.appendChild(this.btn);

        if (!isIOS) {
            this.slider = this.createElement('input', 'vp-volume__slider', {
                type: 'range',
                min: 0,
                max: 1,
                step: 0.05,
                value: isMuted ? 0 : currentVol,
                'aria-label': 'Volume slider',
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuenow': Math.round((isMuted ? 0 : currentVol) * 100)
            });
            this.addDomListener(this.slider, 'input', this.onInput);
            container.appendChild(this.slider);
        }

        this.addPlayerListener('volumechange', this.onVolumeChange);

        return container;
    }

    onClick() {
        if (!this.player.video) return;

        if (this.player.video.muted || this.player.video.volume === 0) {
            this.player.video.muted = false;
            const restoreVol = (this.lastVolume && this.lastVolume > 0.05) ? this.lastVolume : 1;
            this.player.setVolume(restoreVol);
        } else {
            this.lastVolume = this.player.video.volume;
            this.player.video.muted = true;
            this.player.setVolume(0);
        }
    }

    onInput(e) {
        const val = parseFloat(e.target.value);
        if (val > 0) {
            this.lastVolume = val;
        }
        this.player.setVolume(val);
    }

    onVolumeChange() {
        if (!this.player.video) return;
        const volume = this.player.video.volume;
        const isMuted = this.player.video.muted || volume === 0;
        const displayVol = isMuted ? 0 : volume;

        if (this.slider) {
            this.slider.value = displayVol.toString();
            this.slider.setAttribute('aria-valuenow', Math.round(displayVol * 100).toString());
        }

        if (this.btn) {
            this.btn.innerHTML = this.getIcon(displayVol);
            const label = isMuted ? 'Unmute (m)' : 'Mute (m)';
            this.btn.setAttribute('aria-label', label);
            this.btn.setAttribute('title', label);
        }
    }

    getIcon(level) {
        if (level === 0) {
            return '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
        } else if (level < 0.5) {
            return '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>';
        } else {
            return '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L9 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
        }
    }
}
