import Component from './Component';

export default class SettingsMenu extends Component {
    constructor(player) {
        super(player);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    create() {
        const container = this.createElement('div', 'vp-player__settings');
        container.style.position = 'relative';

        this.btn = this.createElement('button', 'vp-button vp-button--settings');
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>';
        this.btn.onclick = this.toggleMenu;

        this.menu = this.createElement('div', 'vp-player__settings-menu');
        this.menu.innerHTML = '<div style="padding: 10px; color: white; background: rgba(0,0,0,0.9);">Settings Placeholder</div>';
        this.menu.style.display = 'none';
        this.menu.style.position = 'absolute';
        this.menu.style.bottom = '100%';
        this.menu.style.right = '0';

        container.appendChild(this.btn);
        container.appendChild(this.menu);

        return container;
    }

    toggleMenu() {
        // Close others if needed
        this.menu.style.display = this.menu.style.display === 'none' ? 'block' : 'none';
    }
}
