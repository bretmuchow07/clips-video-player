/**
 * Format seconds into human-readable mm:ss or hh:mm:ss
 * @param {number} seconds 
 * @returns {string}
 */
export function formatTime(seconds) {
    if (seconds === null || seconds === undefined || isNaN(seconds) || seconds < 0) {
        return '00:00';
    }
    if (!isFinite(seconds)) {
        return 'LIVE';
    }

    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const paddedSecs = secs.toString().padStart(2, '0');
    const paddedMins = minutes.toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours}:${paddedMins}:${paddedSecs}`;
    }
    return `${paddedMins}:${paddedSecs}`;
}
