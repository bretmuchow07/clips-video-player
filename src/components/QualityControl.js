import Component from './Component';

export default class QualityControl extends Component {
    constructor(player) {
        super(player);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    create() {
        const container = this.createElement('div', 'vp-quality-control');
        container.style.position = 'relative';

        this.btn = this.createElement('button', 'vp-button');
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4zm0 13.5h-15a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5zM7.5 15h2v-6h-2v6zm5-6v6h2V9h-2zm5 0v6h2V9h-2z"/></svg>';
        this.btn.title = 'Quality';
        this.btn.onclick = this.toggleMenu;

        this.menu = this.createElement('div', 'vp-menu');

        // Placeholder qualities mirroring legacy options
        const qualities = [
            { label: 'Auto', value: 'auto' },
            { label: '1080p', value: '1080p' },
            { label: '720p', value: '720p' },
            { label: '480p', value: '480p' }
        ];

        qualities.forEach(q => {
            const item = this.createElement('button', 'vp-menu-btn');
            item.innerHTML = `<span>${q.label}</span>${q.value === 'auto' ? '<span style="background:#4facfe;color:white;padding:2px 4px;border-radius:2px;font-size:10px;margin-left:5px">AUTO</span>' : ''}`;
            if (q.value === 'auto') item.classList.add('vp-selected');
            item.onclick = () => this.onQualitySelect(q.value, item);
            this.menu.appendChild(item);
        });

        container.appendChild(this.btn);
        container.appendChild(this.menu);

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

    onQualitySelect(quality, element) {
        console.log('Switching quality to:', quality);
        // Dispatch event for VideoPlayer or handle logic if passed options
        // For now just update UI
        Array.from(this.menu.children).forEach(child => child.classList.remove('vp-selected'));
        element.classList.add('vp-selected');

        this.menu.classList.remove('vp-active');
    }
}
