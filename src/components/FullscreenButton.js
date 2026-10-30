import Component from './Component.js';

export default class FullscreenButton extends Component {
    constructor(player) {
        super(player);
        this.onClick = this.onClick.bind(this);
        this.onFullscreenChange = this.onFullscreenChange.bind(this);
    }

    create() {
        const isFS = this.isFullscreen();
        const btn = this.createElement('button', 'vp-button vp-button--fullscreen', {
            type: 'button',
            'aria-label': isFS ? 'Exit Fullscreen (f)' : 'Fullscreen (f)',
            title: isFS ? 'Exit Fullscreen (f)' : 'Fullscreen (f)'
        });
        btn.innerHTML = this.getIcon(isFS);

        this.addDomListener(btn, 'click', this.onClick);

        // Listen for document fullscreen change
        this.addDomListener(document, 'fullscreenchange', this.onFullscreenChange);
        this.addDomListener(document, 'webkitfullscreenchange', this.onFullscreenChange);

        // iOS webkit fullscreen on video
        if (this.player.video) {
            this.addDomListener(this.player.video, 'webkitbeginfullscreen', this.onFullscreenChange);
            this.addDomListener(this.player.video, 'webkitendfullscreen', this.onFullscreenChange);
        }

        return btn;
    }

    isFullscreen() {
        return !!(
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            (this.player.video && this.player.video.webkitDisplayingFullscreen)
        );
    }

    onClick() {
        const container = this.player.container;
        const video = this.player.video;

        if (this.isFullscreen()) {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        } else {
            if (container.requestFullscreen) {
                container.requestFullscreen().catch(() => {
                    // Fallback to video on failure
                    if (video && video.webkitEnterFullscreen) {
                        video.webkitEnterFullscreen();
                    }
                });
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (video && video.webkitEnterFullscreen) {
                // iOS iPhone Safari requires fullscreen directly on video element
                video.webkitEnterFullscreen();
            }
        }
    }

    onFullscreenChange() {
        const isFS = this.isFullscreen();
        if (this.el) {
            this.el.innerHTML = this.getIcon(isFS);
            const label = isFS ? 'Exit Fullscreen (f)' : 'Fullscreen (f)';
            this.el.setAttribute('aria-label', label);
            this.el.setAttribute('title', label);
        }

        if (this.player.container) {
            if (isFS) {
                this.player.container.classList.add('vp-fullscreen');
            } else {
                this.player.container.classList.remove('vp-fullscreen');
            }
        }

        this.player.emit('fullscreenchange', isFS);
    }

    getIcon(isFullscreen) {
        return isFullscreen
            ? '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>' // Exit fullscreen
            : '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>'; // Enter fullscreen
    }
}
