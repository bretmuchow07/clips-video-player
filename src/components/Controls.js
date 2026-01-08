import Component from './Component';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import TimeDisplay from './TimeDisplay';
import FullscreenButton from './FullscreenButton';
import SettingsMenu from './SettingsMenu';
import SpeedControl from './SpeedControl';
import QualityControl from './QualityControl';
import Captions from './Captions';

export default class Controls extends Component {
    constructor(player) {
        super(player);
    }

    create() {
        const controls = this.createElement('div', 'vp-player__controls');

        // 1. Timeline Container (Top)
        const timelineContainer = this.createElement('div', 'vp-timeline-container');

        const progressBar = new ProgressBar(this.player);
        progressBar.mount(timelineContainer);

        controls.appendChild(timelineContainer);

        // 2. Controls Row (Bottom)
        const controlsRow = this.createElement('div', 'vp-controls-row');
        controls.appendChild(controlsRow);

        // -- Left Controls (Volume, Time)
        const leftControls = this.createElement('div', 'vp-controls-left');
        controlsRow.appendChild(leftControls);

        const playBtn = new PlayButton(this.player); // Moving Play to Center optionally, but legacy has it in center usually? 
        // Legacy CSS says: .controls-center { flex: 0 0 auto } which implies Play might be there.
        // Legacy script Step 10 HTML: 
        // controls-center: skip-backward, play-pause, skip-forward.
        // controls-left: volume, time.
        // controls-right: captions, quality, speed, pip, fullscreen.

        // Actually, let's follow that exactly.

        // Volume
        const volumeControl = new VolumeControl(this.player);
        volumeControl.mount(leftControls);

        // Time
        const timeDisplay = new TimeDisplay(this.player);
        timeDisplay.mount(leftControls);

        // -- Center Controls (Skip, Play, Skip)
        const centerControls = this.createElement('div', 'vp-controls-center');
        controlsRow.appendChild(centerControls);

        // TODO: Add Skip Buttons later
        playBtn.mount(centerControls);

        // -- Right Controls (Quality, Speed, Settings, Fullscreen)
        const rightControls = this.createElement('div', 'vp-controls-right');
        controlsRow.appendChild(rightControls);

        const qualityControl = new QualityControl(this.player);
        qualityControl.mount(rightControls);

        const captions = new Captions(this.player);
        captions.mount(rightControls);

        const speedControl = new SpeedControl(this.player);
        speedControl.mount(rightControls);

        // Settings Menu (General) - keeping it but maybe legacy didn't have both?
        // Legacy has: qualityBtn, speedBtn, captionsBtn, pipBtn, fullscreenBtn.
        // It does NOT have a generic 'settings' gear in the same way, but let's keep it or remove if redundant.
        // The requester said "use... behaviors from components".
        // I'll keep generic settings as per my specific instruction earlier, but maybe I should have removed it if it wasn't in legacy.
        // Actually legacy script has "speedMenu", "qualityMenu".
        // I will stick to adding Speed and Quality specifically.

        const fullscreenBtn = new FullscreenButton(this.player);
        fullscreenBtn.mount(rightControls);

        return controls;
    }
}
