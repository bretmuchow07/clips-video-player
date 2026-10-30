/**
 * Base Component Class with automatic resource disposal and DOM helpers
 */
export default class Component {
    constructor(player) {
        this.player = player;
        this.el = null;
        this.disposers = [];
    }

    /**
     * Create the DOM element for this component
     * @returns {HTMLElement}
     */
    create() {
        throw new Error('Component must implement create() method');
    }

    /**
     * Mount the component to a container
     * @param {HTMLElement} container
     * @returns {HTMLElement}
     */
    mount(container) {
        if (!this.el) {
            this.el = this.create();
        }
        container.appendChild(this.el);
        return this.el;
    }

    /**
     * Attach a DOM event listener that will be automatically unbound on destroy()
     * @param {EventTarget} target 
     * @param {string} event 
     * @param {Function} handler 
     * @param {boolean|AddEventListenerOptions} [options] 
     */
    addDomListener(target, event, handler, options) {
        if (!target || typeof target.addEventListener !== 'function') return;
        target.addEventListener(event, handler, options);
        this.disposers.push(() => {
            try {
                target.removeEventListener(event, handler, options);
            } catch (e) {
                // Ignore errors on detached nodes
            }
        });
    }

    /**
     * Subscribe to a player event that will be automatically unbound on destroy()
     * @param {string} event 
     * @param {Function} handler 
     */
    addPlayerListener(event, handler) {
        if (!this.player || typeof this.player.on !== 'function') return;
        const unbind = this.player.on(event, handler);
        this.disposers.push(unbind);
    }

    /**
     * Destroy the component, removing listeners and clearing DOM
     */
    destroy() {
        while (this.disposers.length > 0) {
            const dispose = this.disposers.pop();
            try {
                if (typeof dispose === 'function') dispose();
            } catch (err) {
                console.error('Error during component disposal:', err);
            }
        }

        if (this.el && this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }
        this.el = null;
    }

    /**
     * Utility to create an element with class name and optional attributes
     * @param {string} tag 
     * @param {string} [className] 
     * @param {Record<string, string|number|boolean>} [attributes]
     * @returns {HTMLElement}
     */
    createElement(tag, className, attributes = {}) {
        const el = document.createElement(tag);
        if (className) el.className = className;

        Object.entries(attributes).forEach(([key, val]) => {
            if (val === undefined || val === null) return;
            if (key.startsWith('aria-') || key.startsWith('data-') || ['role', 'title', 'type', 'tabindex', 'min', 'max', 'step', 'value'].includes(key)) {
                el.setAttribute(key, String(val));
            } else {
                el[key] = val;
            }
        });

        return el;
    }
}
