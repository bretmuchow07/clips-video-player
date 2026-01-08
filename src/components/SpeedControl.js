import Component from './Component';

export default class SpeedControl extends Component {
    constructor(player) {
        super(player);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.onSpeedSelect = this.onSpeedSelect.bind(this);
    }

    create() {
        const container = this.createElement('div', 'vp-speed-control');
        container.style.position = 'relative';

        this.btn = this.createElement('button', 'vp-button');
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/></svg>';
        this.btn.title = 'Playback Speed';
        this.btn.onclick = this.toggleMenu;

        this.menu = this.createElement('div', 'vp-menu');

        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        speeds.forEach(speed => {
            const item = this.createElement('button', 'vp-menu-btn');
            item.textContent = speed + 'x';
            item.dataset.speed = speed;
            if (speed === 1) item.classList.add('vp-selected');
            item.onclick = (e) => this.onSpeedSelect(speed, e);
            this.menu.appendChild(item);
        });

        container.appendChild(this.btn);
        container.appendChild(this.menu);

        // Close menu on click outside - basic implementation
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                this.menu.classList.remove('vp-active');
            }
        });

        return container;
    }

    toggleMenu() {
        this.menu.classList.toggle('vp-active');
    }

    onSpeedSelect(speed, e) {
        this.player.video.playbackRate = speed;

        // Update UI
        Array.from(this.menu.children).forEach(child => child.classList.remove('vp-selected'));
        e.target.classList.add('vp-selected');

        this.menu.classList.remove('vp-active');
    }
}
