import Component from './Component';

export default class FullscreenButton extends Component {
    constructor(player) {
        super(player);
        this.onClick = this.onClick.bind(this);
    }

    create() {
        const btn = this.createElement('button', 'vp-button vp-button--fullscreen');
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';
        btn.onclick = this.onClick;
        return btn;
    }

    onClick() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            this.player.container.requestFullscreen();
        }
    }
}
