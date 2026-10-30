import Component from './Component.js';

export default class QualityControl extends Component {
    constructor(player) {
        super(player);
        this.isOpen = false;
        this.currentQuality = 'auto';

        this.toggleMenu = this.toggleMenu.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    create() {
        const container = this.createElement('div', 'vp-quality-control');
        container.style.position = 'relative';

        const sources = this.player.config?.qualities || this.player.config?.sources;
        const hasQualities = Array.isArray(sources) && sources.length > 1;

        // If the user hasn't provided multiple quality sources, hide control cleanly
        if (!hasQualities) {
            container.style.display = 'none';
            this.containerEl = container;
            return container;
        }

        this.btn = this.createElement('button', 'vp-button vp-button--quality', {
            type: 'button',
            'aria-label': 'Video quality settings',
            title: 'Quality',
            'aria-haspopup': 'true',
            'aria-expanded': 'false'
        });
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4zm0 13.5h-15a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5zM7.5 15h2v-6h-2v6zm5-6v6h2V9h-2zm5 0v6h2V9h-2z"/></svg>';
        this.addDomListener(this.btn, 'click', this.toggleMenu);

        this.menu = this.createElement('div', 'vp-menu', {
            role: 'menu',
            'aria-label': 'Available qualities'
        });

        this.items = [];

        sources.forEach((source, index) => {
            const isSelected = index === 0;
            const item = this.createElement('button', `vp-menu-btn ${isSelected ? 'vp-selected' : ''}`, {
                type: 'button',
                role: 'menuitemradio',
                'aria-checked': isSelected ? 'true' : 'false'
            });
            item.textContent = source.label || `${source.res || ''}p` || `Stream ${index + 1}`;

            this.addDomListener(item, 'click', (e) => {
                e.stopPropagation();
                this.onQualitySelect(source, item);
            });

            this.items.push({ source, el: item });
            this.menu.appendChild(item);
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

    onQualitySelect(source, element) {
        this.items.forEach(({ el }) => {
            el.classList.remove('vp-selected');
            el.setAttribute('aria-checked', 'false');
        });
        element.classList.add('vp-selected');
        element.setAttribute('aria-checked', 'true');

        // Seamlessly switch video source preserving playback time
        const video = this.player.video;
        if (video && source.src && video.src !== source.src) {
            const currentTime = video.currentTime;
            const wasPlaying = !video.paused;

            video.src = source.src;
            const onLoaded = () => {
                video.currentTime = currentTime;
                if (wasPlaying) {
                    video.play().catch(() => {});
                }
            };
            video.addEventListener('loadedmetadata', onLoaded, { once: true });
        }

        this.closeMenu();
        this.btn.focus();
        this.player.emit('qualitychange', source);
    }

    onKeyDown(e) {
        if (e.key === 'Escape' && this.isOpen) {
            e.stopPropagation();
            this.closeMenu();
            this.btn.focus();
        }
    }
}
