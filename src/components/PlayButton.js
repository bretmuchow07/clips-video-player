import Component from './Component.js';

export default class PlayButton extends Component {
    constructor(player) {
        super(player);
        this.onClick = this.onClick.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
    }

    create() {
        const isPlaying = this.player.video && !this.player.video.paused && !this.player.video.ended;
        const btn = this.createElement('button', 'vp-button vp-button--play', {
            type: 'button',
            'aria-label': isPlaying ? 'Pause (k)' : 'Play (k)',
            title: isPlaying ? 'Pause (k)' : 'Play (k)'
        });
        btn.innerHTML = this.getIcon(isPlaying);

        this.addDomListener(btn, 'click', this.onClick);

        // Listen to player state changes
        this.addPlayerListener('play', this.onPlay);
        this.addPlayerListener('pause', this.onPause);
        this.addPlayerListener('ended', this.onPause);

        return btn;
    }

    onClick() {
        this.player.togglePlay();
    }

    onPlay() {
        if (!this.el) return;
        this.el.innerHTML = this.getIcon(true);
        this.el.classList.add('vp-button--active');
        this.el.setAttribute('aria-label', 'Pause (k)');
        this.el.setAttribute('title', 'Pause (k)');
    }

    onPause() {
        if (!this.el) return;
        this.el.innerHTML = this.getIcon(false);
        this.el.classList.remove('vp-button--active');
        this.el.setAttribute('aria-label', 'Play (k)');
        this.el.setAttribute('title', 'Play (k)');
    }

    getIcon(isPlaying) {
        return isPlaying
            ? '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>' // Pause icon
            : '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>'; // Play icon
    }
}
