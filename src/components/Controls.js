import Component from './Component.js';
import PlayButton from './PlayButton.js';
import ProgressBar from './ProgressBar.js';
import VolumeControl from './VolumeControl.js';
import TimeDisplay from './TimeDisplay.js';
import FullscreenButton from './FullscreenButton.js';
import SpeedControl from './SpeedControl.js';
import QualityControl from './QualityControl.js';
import Captions from './Captions.js';

export default class Controls extends Component {
    constructor(player) {
        super(player);
        this.children = [];
    }

    create() {
        const controls = this.createElement('div', 'vp-player__controls');

        // 1. Timeline Container (Top)
        const timelineContainer = this.createElement('div', 'vp-timeline-container');
        const progressBar = new ProgressBar(this.player);
        progressBar.mount(timelineContainer);
        this.children.push(progressBar);
        controls.appendChild(timelineContainer);

        // 2. Controls Row (Bottom)
        const controlsRow = this.createElement('div', 'vp-controls-row');
        controls.appendChild(controlsRow);

        // -- Left Controls: Play, Volume, Time
        const leftControls = this.createElement('div', 'vp-controls-left');
        controlsRow.appendChild(leftControls);

        const playBtn = new PlayButton(this.player);
        playBtn.mount(leftControls);
        this.children.push(playBtn);

        const volumeControl = new VolumeControl(this.player);
        volumeControl.mount(leftControls);
        this.children.push(volumeControl);

        const timeDisplay = new TimeDisplay(this.player);
        timeDisplay.mount(leftControls);
        this.children.push(timeDisplay);

        // -- Center Spacer (or custom center slot)
        const centerControls = this.createElement('div', 'vp-controls-center');
        controlsRow.appendChild(centerControls);

        // -- Right Controls: Quality, Captions, Speed, Fullscreen
        const rightControls = this.createElement('div', 'vp-controls-right');
        controlsRow.appendChild(rightControls);

        const qualityControl = new QualityControl(this.player);
        qualityControl.mount(rightControls);
        this.children.push(qualityControl);

        const captions = new Captions(this.player);
        captions.mount(rightControls);
        this.children.push(captions);

        const speedControl = new SpeedControl(this.player);
        speedControl.mount(rightControls);
        this.children.push(speedControl);

        const fullscreenBtn = new FullscreenButton(this.player);
        fullscreenBtn.mount(rightControls);
        this.children.push(fullscreenBtn);

        return controls;
    }

    destroy() {
        this.children.forEach(child => {
            if (child && typeof child.destroy === 'function') {
                child.destroy();
            }
        });
        this.children = [];
        super.destroy();
    }
}
