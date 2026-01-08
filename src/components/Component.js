/**
 * Base Component Class
 */
export default class Component {
    constructor(player) {
        this.player = player;
        this.el = null;
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
     */
    mount(container) {
        if (!this.el) {
            this.el = this.create();
        }
        container.appendChild(this.el);
    }

    /**
     * Destroy the component and remove from DOM
     */
    destroy() {
        if (this.el && this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }
        this.el = null;
    }

    /**
     * Utility to create an element with class name
     * @param {string} tag 
     * @param {string} className 
     * @returns {HTMLElement}
     */
    createElement(tag, className) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        return el;
    }
}
