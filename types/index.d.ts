export interface VideoPlayerTrack {
    label: string;
    src: string;
    srclang?: string;
    kind?: 'subtitles' | 'captions';
    default?: boolean;
}

export interface VideoPlayerQuality {
    label?: string;
    res?: number;
    src: string;
}

export interface VideoPlayerOptions {
    container: string | HTMLElement;
    src?: string;
    controls?: boolean;
    autoplay?: boolean;
    muted?: boolean;
    playsinline?: boolean;
    keyboard?: boolean;
    theme?: 'dark' | 'yellowstone' | string;
    crossorigin?: 'anonymous' | 'use-credentials' | string | boolean;
    tracks?: VideoPlayerTrack[];
    qualities?: VideoPlayerQuality[];
    sources?: VideoPlayerQuality[];
}

export type EventCallback = (...args: any[]) => void;

export default class VideoPlayer {
    constructor(config: VideoPlayerOptions);

    config: VideoPlayerOptions;
    container: HTMLElement;
    video: HTMLVideoElement | null;

    play(): Promise<void>;
    pause(): void;
    seek(time: number): void;
    setVolume(volume: number): void;
    togglePlay(): void;
    toggleFullscreen(): void;
    showControls(): void;
    hideControlsDelayed(): void;
    destroy(): void;

    on(event: string, listener: EventCallback): () => void;
    off(event: string, listener: EventCallback): void;
    emit(event: string, ...args: any[]): void;
    onAny(events: string[], listener: EventCallback): () => void;
    removeAllListeners(event?: string): void;
}
