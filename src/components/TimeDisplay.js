import Component from './Component.js';
import { formatTime } from '../utils/time.js';

export default class TimeDisplay extends Component {
    constructor(player) {
        super(player);
        this.onTimeUpdate = this.onTimeUpdate.bind(this);
    }

    create() {
        const container = this.createElement('div', 'vp-time-display', {
            'aria-label': 'Playback time'
        });

        this.currentObj = this.createElement('span', 'vp-time-current');
        this.currentObj.textContent = '00:00';

        const divider = this.createElement('span', 'vp-time-divider');
        divider.textContent = ' / ';

        this.durationObj = this.createElement('span', 'vp-time-duration');
        this.durationObj.textContent = '00:00';

        container.appendChild(this.currentObj);
        container.appendChild(divider);
        container.appendChild(this.durationObj);

        this.addPlayerListener('timeupdate', this.onTimeUpdate);
        this.addPlayerListener('loadedmetadata', this.onTimeUpdate);
        this.addPlayerListener('durationchange', this.onTimeUpdate);

        return container;
    }

    onTimeUpdate() {
        if (!this.player.video) return;
        const currentTime = this.player.video.currentTime || 0;
        const duration = this.player.video.duration;

        this.currentObj.textContent = formatTime(currentTime);
        this.durationObj.textContent = formatTime(duration);
    }
}
