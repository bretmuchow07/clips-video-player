import Component from './Component';
import { formatTime } from '../utils/time';

export default class ProgressBar extends Component {
    constructor(player) {
        super(player);
        this.isDragging = false;

        // Bind methods
        this.onTimeUpdate = this.onTimeUpdate.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    create() {
        // The mounting point (in Controls.js) is .vp-timeline-container
        // So here we create .vp-timeline
        const timeline = this.createElement('div', 'vp-timeline');

        this.progressBar = this.createElement('div', 'vp-progress-bar');

        // Handle is just visual in legacy CSS (pseudo-element on progress-bar::after)
        // But here we might want an explicit element or stick to CSS.
        // Legacy CSS used: .progress-bar::after for handle.
        // My controls.css uses: .vp-progress-handle element.
        this.progressHandle = this.createElement('div', 'vp-progress-handle');

        this.progressBar.appendChild(this.progressHandle);
        timeline.appendChild(this.progressBar);

        // Events
        this.player.on('timeupdate', this.onTimeUpdate);

        // Time Preview
        this.timePreview = this.createElement('div', 'vp-time-preview');
        timeline.appendChild(this.timePreview);

        // Attach events for preview
        timeline.addEventListener('mousemove', this.onMouseMovePreview.bind(this));

        // Attach events to the timeline element for seeking
        timeline.addEventListener('mousedown', this.onMouseDown);

        // Save refernece
        this.timeline = timeline;

        return timeline;
    }

    onMouseMovePreview(e) {
        const rect = this.timeline.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const time = pos * this.player.video.duration;

        this.timePreview.textContent = formatTime(time);
        // Position it
        const previewX = e.clientX - rect.left;
        this.timePreview.style.left = `${previewX}px`;
        this.timePreview.style.transform = 'translateX(-50%)';
    }

    onTimeUpdate() {
        if (this.isDragging) return;
        const percent = (this.player.video.currentTime / this.player.video.duration) * 100 || 0;
        this.updateUI(percent);
    }

    updateUI(percent) {
        this.progressBar.style.width = `${percent}%`;
        // Handle moves with the end of the bar naturally if appended to it?
        // If handle is absolute right: -6px of the bar, then yes.
        // My CSS: .vp-progress-handle { right: -6px; top: 50%; ... }
        // So just changing bar width is enough.
    }

    onMouseDown(e) {
        this.isDragging = true;
        this.updateFromEvent(e);

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);

        // Optional: Pause while dragging? 
        // this.wasPlaying = !this.player.video.paused;
        // if (this.wasPlaying) this.player.pause();
    }

    onMouseMove(e) {
        if (!this.isDragging) return;
        this.updateFromEvent(e);
    }

    onMouseUp(e) {
        if (!this.isDragging) return;
        this.isDragging = false;

        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);

        // Final seek
        this.updateFromEvent(e);

        // if (this.wasPlaying) this.player.play();
    }

    updateFromEvent(e) {
        const rect = this.timeline.getBoundingClientRect();
        let pos = (e.clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));

        this.updateUI(pos * 100);

        if (this.player.video.duration) {
            this.player.seek(this.player.video.duration * pos);
        }
    }
}
