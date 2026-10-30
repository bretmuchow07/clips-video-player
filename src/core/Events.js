/**
 * Lightweight, robust Pub/Sub Event System
 */
export default class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (typeof listener !== 'function') {
            throw new TypeError('Event listener must be a function');
        }
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return () => this.off(event, listener);
    }

    off(event, listenerToRemove) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }

    emit(event, ...args) {
        if (!this.events[event]) return;
        // Slice to prevent issues if a listener unbinds itself during iteration
        const listeners = this.events[event].slice();
        listeners.forEach(listener => {
            try {
                listener(...args);
            } catch (err) {
                console.error(`Error in event listener for "${event}":`, err);
            }
        });
    }

    removeAllListeners(event) {
        if (event) {
            delete this.events[event];
        } else {
            this.events = {};
        }
    }

    // Allow multiple events to be registered at once with combined unbinder
    onAny(events, listener) {
        const unbinders = events.map(event => this.on(event, listener));
        return () => unbinders.forEach(unbind => unbind());
    }
}
