import Component from './Component';

export default class PlayButton extends Component {
    constructor(player) {
        super(player);
        this.onClick = this.onClick.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
    }

    create() {
        const btn = this.createElement('button', 'vp-button vp-button--play');
        btn.innerHTML = this.getIcon(false);

        btn.onclick = this.onClick;

        // Listen to player state changes
        this.player.on('play', this.onPlay);
        this.player.on('pause', this.onPause);

        return btn;
    }

    onClick() {
        this.player.togglePlay();
    }

    onPlay() {
        this.el.innerHTML = this.getIcon(true);
        this.el.classList.add('vp-button--active');
    }

    onPause() {
        this.el.innerHTML = this.getIcon(false);
        this.el.classList.remove('vp-button--active');
    }

    getIcon(isPlaying) {
        return isPlaying
            ? '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>' // Pause icon
            : '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>'; // Play icon
    }
}
