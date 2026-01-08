import Component from './Component';
import { formatTime } from '../utils/time';

export default class TimeDisplay extends Component {
    constructor(player) {
        super(player);
        this.onTimeUpdate = this.onTimeUpdate.bind(this);
    }

    create() {
        const container = this.createElement('div', 'vp-time-display');

        this.currentObj = this.createElement('span');
        this.currentObj.textContent = '00:00';

        const divider = document.createElement('span');
        divider.textContent = ' / ';

        this.durationObj = this.createElement('span');
        this.durationObj.textContent = '00:00';

        container.appendChild(this.currentObj);
        container.appendChild(divider);
        container.appendChild(this.durationObj);

        this.player.on('timeupdate', this.onTimeUpdate);
        this.player.on('loadedmetadata', this.onTimeUpdate);

        return container;
    }

    onTimeUpdate() {
        this.currentObj.textContent = formatTime(this.player.video.currentTime);
        this.durationObj.textContent = formatTime(this.player.video.duration);
    }
}
