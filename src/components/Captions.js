import Component from './Component.js';

export default class Captions extends Component {
    constructor(player) {
        super(player);
        this.isOpen = false;
        this.currentTrackIndex = -1; // -1 means Off

        this.toggleMenu = this.toggleMenu.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    create() {
        const container = this.createElement('div', 'vp-captions-control');
        container.style.position = 'relative';

        // Check if config has tracks and inject them into video if needed
        this.initTracks();

        const tracks = this.getTracks();
        if (tracks.length === 0) {
            container.style.display = 'none';
            this.containerEl = container;
            return container;
        }

        this.btn = this.createElement('button', 'vp-button vp-button--captions', {
            type: 'button',
            'aria-label': 'Subtitles and captions',
            title: 'Subtitles / Captions (c)',
            'aria-haspopup': 'true',
            'aria-expanded': 'false'
        });
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H7.5v-1.5h-2v3h2V11H11v2H5.5v-4h5.5v2zM19 11h-5.5v4h2v-1.5h2v1.5h1.5v-4h-5.5v2H18v-2h-1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>';
        this.addDomListener(this.btn, 'click', this.toggleMenu);

        this.menu = this.createElement('div', 'vp-menu', {
            role: 'menu',
            'aria-label': 'Subtitles options'
        });

        this.menuItems = [];

        // 1. "Off" option
        const offBtn = this.createElement('button', 'vp-menu-btn vp-selected', {
            type: 'button',
            role: 'menuitemradio',
            'aria-checked': 'true'
        });
        offBtn.textContent = 'Off';
        this.addDomListener(offBtn, 'click', (e) => {
            e.stopPropagation();
            this.setTrack(-1);
        });
        this.menu.appendChild(offBtn);
        this.offBtn = offBtn;

        // 2. Available Tracks
        tracks.forEach((track, index) => {
            const isDefault = track.default;
            const btn = this.createElement('button', 'vp-menu-btn', {
                type: 'button',
                role: 'menuitemradio',
                'aria-checked': 'false'
            });
            btn.textContent = track.label || track.language || `Track ${index + 1}`;

            this.addDomListener(btn, 'click', (e) => {
                e.stopPropagation();
                this.setTrack(index);
            });

            this.menu.appendChild(btn);
            this.menuItems.push({ index, el: btn, track });

            if (isDefault) {
                this.setTrack(index);
            }
        });

        container.appendChild(this.btn);
        container.appendChild(this.menu);

        this.containerEl = container;

        this.addDomListener(document, 'click', this.onDocumentClick);
        this.addDomListener(container, 'keydown', this.onKeyDown);
        this.addPlayerListener('menu:open', (source) => {
            if (source !== this) this.closeMenu();
        });

        return container;
    }

    initTracks() {
        const video = this.player.video;
        if (!video) return;

        const configTracks = this.player.config?.tracks;
        if (Array.isArray(configTracks)) {
            configTracks.forEach(t => {
                const track = document.createElement('track');
                track.kind = t.kind || 'subtitles';
                track.label = t.label;
                track.srclang = t.srclang || 'en';
                track.src = t.src;
                if (t.default) track.default = true;
                video.appendChild(track);
            });
        }
    }

    getTracks() {
        const video = this.player.video;
        if (!video || !video.textTracks) return [];
        return Array.from(video.textTracks).filter(
            t => t.kind === 'subtitles' || t.kind === 'captions'
        );
    }

    setTrack(trackIndex) {
        const tracks = this.getTracks();
        this.currentTrackIndex = trackIndex;

        tracks.forEach((track, idx) => {
            if (idx === trackIndex) {
                track.mode = 'showing';
            } else {
                track.mode = 'disabled';
            }
        });

        // Update UI
        if (this.offBtn) {
            const isOff = trackIndex === -1;
            this.offBtn.classList.toggle('vp-selected', isOff);
            this.offBtn.setAttribute('aria-checked', isOff ? 'true' : 'false');
        }

        this.menuItems.forEach(({ index, el }) => {
            const isSelected = index === trackIndex;
            el.classList.toggle('vp-selected', isSelected);
            el.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        });

        if (this.btn) {
            this.btn.classList.toggle('vp-button--active', trackIndex !== -1);
        }

        this.closeMenu();
        if (this.btn) this.btn.focus();
        this.player.emit('captionschange', trackIndex >= 0 ? tracks[trackIndex] : null);
    }

    toggleMenu(e) {
        if (e) e.stopPropagation();
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.menu.classList.add('vp-active');
        this.btn.setAttribute('aria-expanded', 'true');
        this.player.emit('menu:open', this);

        const active = this.menu.querySelector('.vp-selected') || this.menu.querySelector('button');
        if (active) active.focus();
    }

    closeMenu() {
        if (!this.isOpen) return;
        this.isOpen = false;
        this.menu.classList.remove('vp-active');
        this.btn.setAttribute('aria-expanded', 'false');
    }

    onDocumentClick(e) {
        if (this.containerEl && !this.containerEl.contains(e.target)) {
            this.closeMenu();
        }
    }

    onKeyDown(e) {
        if (e.key === 'Escape' && this.isOpen) {
            e.stopPropagation();
            this.closeMenu();
            this.btn.focus();
        }
    }
}
