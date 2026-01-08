import Component from './Component';
import { formatTime } from '../utils/time';

export default class Captions extends Component {
    constructor(player) {
        super(player);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.onTimeUpdate = this.onTimeUpdate.bind(this);

        this.tracks = {};
        this.currentTrack = null;
        this.cues = [];

        // Mock data from legacy script for demonstration if none provided
        // Real implementation would fetch URLs
        this.mockCaptions = {
            en: `WEBVTT

00:00:00.000 --> 00:00:05.000
Welcome to the enhanced video player with caption support!

00:00:05.000 --> 00:00:10.000
This player features multiple subtitle languages and customizable styling.

00:00:10.000 --> 00:00:15.000
You can adjust the size, color, and background of captions.`,
            es: `WEBVTT

00:00:00.000 --> 00:00:05.000
¡Bienvenido al reproductor de video mejorado!

00:00:05.000 --> 00:00:10.000
Este reproductor incluye múltiples idiomas.`
        };
    }

    create() {
        const container = this.createElement('div', 'vp-captions-control');
        container.style.position = 'relative';

        this.btn = this.createElement('button', 'vp-button');
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H7.5v-1.5h-2v3h2V11H11v2H5.5v-4h5.5v2zM19 11h-5.5v4h2v-1.5h2v1.5h1.5v-4h-5.5v2H18v-2h-1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>';
        this.btn.title = 'Captions';
        this.btn.onclick = this.toggleMenu;

        this.menu = this.createElement('div', 'vp-menu');

        // Create Overlay for captions
        this.createOverlay();

        // Populate Menu
        this.populateMenu();

        container.appendChild(this.btn);
        container.appendChild(this.menu);

        // Listeners
        this.player.on('timeupdate', this.onTimeUpdate);

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                this.menu.classList.remove('vp-active');
            }
        });

        return container;
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'vp-captions-overlay';
        this.overlay.style.display = 'none';

        this.captionText = document.createElement('span');
        this.captionText.className = 'vp-caption-text';

        this.overlay.appendChild(this.captionText);

        // Append to player container (parent of controls usually)
        // We defer this slightly to ensure player.container is ready/accessible
        // But controls is mounted in player.container, so this.player.container should be the root.
        this.player.container.appendChild(this.overlay);
    }

    populateMenu() {
        // Off option
        const offBtn = this.createElement('button', 'vp-menu-btn');
        offBtn.textContent = 'Off';
        offBtn.onclick = () => this.setTrack(null);
        if (!this.currentTrack) offBtn.classList.add('vp-selected');
        this.menu.appendChild(offBtn);

        // Mock tracks
        ['en', 'es'].forEach(lang => {
            const btn = this.createElement('button', 'vp-menu-btn');
            btn.textContent = lang.toUpperCase();
            btn.dataset.lang = lang;
            btn.onclick = (e) => {
                this.setTrack(lang);
                Array.from(this.menu.children).forEach(c => c.classList.remove('vp-selected'));
                e.target.classList.add('vp-selected');
                // Remove selected from 'Off'
                offBtn.classList.remove('vp-selected');
            };
            this.menu.appendChild(btn);

            // Parse immediately for mock
            this.tracks[lang] = this.parseVTT(this.mockCaptions[lang]);
        });
    }

    toggleMenu() {
        this.menu.classList.toggle('vp-active');
    }

    setTrack(lang) {
        this.currentTrack = lang;
        if (lang) {
            this.cues = this.tracks[lang];
            this.overlay.style.display = 'block';
            this.btn.classList.add('vp-button--active');
        } else {
            this.cues = [];
            this.overlay.style.display = 'none';
            this.btn.classList.remove('vp-button--active');
        }
        this.menu.classList.remove('vp-active');
    }

    onTimeUpdate() {
        if (!this.currentTrack || !this.cues.length) return;

        const time = this.player.video.currentTime;
        const activeCue = this.cues.find(cue => time >= cue.startTime && time <= cue.endTime);

        if (activeCue) {
            this.captionText.textContent = activeCue.text;
            this.captionText.style.display = 'inline-block';
        } else {
            this.captionText.style.display = 'none';
        }
    }

    parseVTT(vttContent) {
        const lines = vttContent.split('\n').filter(line => line.trim());
        const cues = [];
        let currentCue = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === 'WEBVTT') continue;

            if (line.includes('-->')) {
                const [start, end] = line.split('-->').map(t => t.trim());
                currentCue = {
                    startTime: this.parseTimeStamp(start),
                    endTime: this.parseTimeStamp(end),
                    text: ''
                };
            } else if (currentCue && line) {
                currentCue.text += (currentCue.text ? ' ' : '') + line;
                if (i === lines.length - 1 || lines[i + 1].includes('-->') || !lines[i + 1].trim()) {
                    cues.push(currentCue);
                    currentCue = null;
                }
            }
        }
        return cues;
    }

    parseTimeStamp(timeStr) {
        const parts = timeStr.split(':');
        const seconds = parts[parts.length - 1].split('.');
        const s = parseInt(seconds[0]) + (parseInt(seconds[1] || 0) / 1000);

        if (parts.length === 3) {
            return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + s;
        } else {
            return parseInt(parts[0]) * 60 + s;
        }
    }
}
