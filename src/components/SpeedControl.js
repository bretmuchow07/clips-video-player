import Component from './Component.js';

export default class SpeedControl extends Component {
    constructor(player) {
        super(player);
        this.isOpen = false;

        this.toggleMenu = this.toggleMenu.bind(this);
        this.onSpeedSelect = this.onSpeedSelect.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onRateChange = this.onRateChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    create() {
        const container = this.createElement('div', 'vp-speed-control');
        container.style.position = 'relative';

        this.btn = this.createElement('button', 'vp-button vp-button--speed', {
            type: 'button',
            'aria-label': 'Playback speed',
            title: 'Playback Speed',
            'aria-haspopup': 'true',
            'aria-expanded': 'false'
        });
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/></svg>';
        this.addDomListener(this.btn, 'click', this.toggleMenu);

        this.menu = this.createElement('div', 'vp-menu', {
            role: 'menu',
            'aria-label': 'Playback speed options'
        });

        const currentSpeed = this.player.video?.playbackRate || 1;
        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        this.speedButtons = [];

        speeds.forEach(speed => {
            const isSelected = speed === currentSpeed;
            const item = this.createElement('button', `vp-menu-btn ${isSelected ? 'vp-selected' : ''}`, {
                type: 'button',
                role: 'menuitemradio',
                'aria-checked': isSelected ? 'true' : 'false',
                'data-speed': speed.toString()
            });
            item.textContent = speed === 1 ? 'Normal' : `${speed}x`;

            this.addDomListener(item, 'click', (e) => {
                e.stopPropagation();
                this.onSpeedSelect(speed);
            });

            this.speedButtons.push({ speed, el: item });
            this.menu.appendChild(item);
        });

        container.appendChild(this.btn);
        container.appendChild(this.menu);

        this.containerEl = container;

        // Auto-cleanup listeners
        this.addDomListener(document, 'click', this.onDocumentClick);
        this.addDomListener(container, 'keydown', this.onKeyDown);
        this.addPlayerListener('menu:open', (source) => {
            if (source !== this) this.closeMenu();
        });

        if (this.player.video) {
            this.addDomListener(this.player.video, 'ratechange', this.onRateChange);
        }

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

        // Focus first selected item or first item
        const selectedBtn = this.menu.querySelector('.vp-selected') || this.menu.querySelector('button');
        if (selectedBtn) selectedBtn.focus();
    }

    closeMenu() {
        if (!this.isOpen) return;
        this.isOpen = false;
        this.menu.classList.remove('vp-active');
        this.btn.setAttribute('aria-expanded', 'false');
    }

    onDocumentClick(e) {
        if (!this.containerEl.contains(e.target)) {
            this.closeMenu();
        }
    }

    onSpeedSelect(speed) {
        if (this.player.video) {
            this.player.video.playbackRate = speed;
        }
        this.syncSpeedUI(speed);
        this.closeMenu();
        this.btn.focus();
        this.player.emit('speedchange', speed);
    }

    onRateChange() {
        const rate = this.player.video?.playbackRate || 1;
        this.syncSpeedUI(rate);
    }

    syncSpeedUI(activeSpeed) {
        this.speedButtons.forEach(({ speed, el }) => {
            const isMatch = Math.abs(speed - activeSpeed) < 0.01;
            el.classList.toggle('vp-selected', isMatch);
            el.setAttribute('aria-checked', isMatch ? 'true' : 'false');
        });
    }

    onKeyDown(e) {
        if (e.key === 'Escape' && this.isOpen) {
            e.stopPropagation();
            this.closeMenu();
            this.btn.focus();
        }
    }
}
