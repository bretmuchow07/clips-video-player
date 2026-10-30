(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VideoPlayer = factory());
})(this, (function () { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function _get() {
    return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get.apply(null, arguments);
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: true,
        configurable: true
      }
    }), Object.defineProperty(t, "prototype", {
      writable: false
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = true,
        o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = true, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
    return t;
  }
  function _superPropGet(t, o, e, r) {
    var p = _get(_getPrototypeOf(t.prototype ), o, e);
    return "function" == typeof p ? function (t) {
      return p.apply(e, t);
    } : p;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /**
   * Lightweight, robust Pub/Sub Event System
   */
  var EventEmitter = /*#__PURE__*/function () {
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);
      this.events = {};
    }
    return _createClass(EventEmitter, [{
      key: "on",
      value: function on(event, listener) {
        var _this = this;
        if (typeof listener !== 'function') {
          throw new TypeError('Event listener must be a function');
        }
        if (!this.events[event]) {
          this.events[event] = [];
        }
        this.events[event].push(listener);
        return function () {
          return _this.off(event, listener);
        };
      }
    }, {
      key: "off",
      value: function off(event, listenerToRemove) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(function (listener) {
          return listener !== listenerToRemove;
        });
      }
    }, {
      key: "emit",
      value: function emit(event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        if (!this.events[event]) return;
        // Slice to prevent issues if a listener unbinds itself during iteration
        var listeners = this.events[event].slice();
        listeners.forEach(function (listener) {
          try {
            listener.apply(void 0, args);
          } catch (err) {
            console.error("Error in event listener for \"".concat(event, "\":"), err);
          }
        });
      }
    }, {
      key: "removeAllListeners",
      value: function removeAllListeners(event) {
        if (event) {
          delete this.events[event];
        } else {
          this.events = {};
        }
      }

      // Allow multiple events to be registered at once with combined unbinder
    }, {
      key: "onAny",
      value: function onAny(events, listener) {
        var _this2 = this;
        var unbinders = events.map(function (event) {
          return _this2.on(event, listener);
        });
        return function () {
          return unbinders.forEach(function (unbind) {
            return unbind();
          });
        };
      }
    }]);
  }();

  /**
   * Base Component Class with automatic resource disposal and DOM helpers
   */
  var Component = /*#__PURE__*/function () {
    function Component(player) {
      _classCallCheck(this, Component);
      this.player = player;
      this.el = null;
      this.disposers = [];
    }

    /**
     * Create the DOM element for this component
     * @returns {HTMLElement}
     */
    return _createClass(Component, [{
      key: "create",
      value: function create() {
        throw new Error('Component must implement create() method');
      }

      /**
       * Mount the component to a container
       * @param {HTMLElement} container
       * @returns {HTMLElement}
       */
    }, {
      key: "mount",
      value: function mount(container) {
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
    }, {
      key: "addDomListener",
      value: function addDomListener(target, event, handler, options) {
        if (!target || typeof target.addEventListener !== 'function') return;
        target.addEventListener(event, handler, options);
        this.disposers.push(function () {
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
    }, {
      key: "addPlayerListener",
      value: function addPlayerListener(event, handler) {
        if (!this.player || typeof this.player.on !== 'function') return;
        var unbind = this.player.on(event, handler);
        this.disposers.push(unbind);
      }

      /**
       * Destroy the component, removing listeners and clearing DOM
       */
    }, {
      key: "destroy",
      value: function destroy() {
        while (this.disposers.length > 0) {
          var dispose = this.disposers.pop();
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
    }, {
      key: "createElement",
      value: function createElement(tag, className) {
        var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var el = document.createElement(tag);
        if (className) el.className = className;
        Object.entries(attributes).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];
          if (val === undefined || val === null) return;
          if (key.startsWith('aria-') || key.startsWith('data-') || ['role', 'title', 'type', 'tabindex', 'min', 'max', 'step', 'value'].includes(key)) {
            el.setAttribute(key, String(val));
          } else {
            el[key] = val;
          }
        });
        return el;
      }
    }]);
  }();

  var PlayButton = /*#__PURE__*/function (_Component) {
    function PlayButton(player) {
      var _this;
      _classCallCheck(this, PlayButton);
      _this = _callSuper(this, PlayButton, [player]);
      _this.onClick = _this.onClick.bind(_this);
      _this.onPlay = _this.onPlay.bind(_this);
      _this.onPause = _this.onPause.bind(_this);
      return _this;
    }
    _inherits(PlayButton, _Component);
    return _createClass(PlayButton, [{
      key: "create",
      value: function create() {
        var isPlaying = this.player.video && !this.player.video.paused && !this.player.video.ended;
        var btn = this.createElement('button', 'vp-button vp-button--play', {
          type: 'button',
          'aria-label': isPlaying ? 'Pause (k)' : 'Play (k)',
          title: isPlaying ? 'Pause (k)' : 'Play (k)'
        });
        btn.innerHTML = this.getIcon(isPlaying);
        this.addDomListener(btn, 'click', this.onClick);

        // Listen to player state changes
        this.addPlayerListener('play', this.onPlay);
        this.addPlayerListener('pause', this.onPause);
        this.addPlayerListener('ended', this.onPause);
        return btn;
      }
    }, {
      key: "onClick",
      value: function onClick() {
        this.player.togglePlay();
      }
    }, {
      key: "onPlay",
      value: function onPlay() {
        if (!this.el) return;
        this.el.innerHTML = this.getIcon(true);
        this.el.classList.add('vp-button--active');
        this.el.setAttribute('aria-label', 'Pause (k)');
        this.el.setAttribute('title', 'Pause (k)');
      }
    }, {
      key: "onPause",
      value: function onPause() {
        if (!this.el) return;
        this.el.innerHTML = this.getIcon(false);
        this.el.classList.remove('vp-button--active');
        this.el.setAttribute('aria-label', 'Play (k)');
        this.el.setAttribute('title', 'Play (k)');
      }
    }, {
      key: "getIcon",
      value: function getIcon(isPlaying) {
        return isPlaying ? '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>' // Pause icon
        : '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>'; // Play icon
      }
    }]);
  }(Component);

  /**
   * Format seconds into human-readable mm:ss or hh:mm:ss
   * @param {number} seconds 
   * @returns {string}
   */
  function formatTime(seconds) {
    if (seconds === null || seconds === undefined || isNaN(seconds) || seconds < 0) {
      return '00:00';
    }
    if (!isFinite(seconds)) {
      return 'LIVE';
    }
    var totalSeconds = Math.floor(seconds);
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor(totalSeconds % 3600 / 60);
    var secs = totalSeconds % 60;
    var paddedSecs = secs.toString().padStart(2, '0');
    var paddedMins = minutes.toString().padStart(2, '0');
    if (hours > 0) {
      return "".concat(hours, ":").concat(paddedMins, ":").concat(paddedSecs);
    }
    return "".concat(paddedMins, ":").concat(paddedSecs);
  }

  var ProgressBar = /*#__PURE__*/function (_Component) {
    function ProgressBar(player) {
      var _this;
      _classCallCheck(this, ProgressBar);
      _this = _callSuper(this, ProgressBar, [player]);
      _this.isDragging = false;
      _this.rafId = null;
      _this.targetSeekTime = null;

      // Bind methods
      _this.onTimeUpdate = _this.onTimeUpdate.bind(_this);
      _this.onProgress = _this.onProgress.bind(_this);
      _this.onPointerDown = _this.onPointerDown.bind(_this);
      _this.onPointerMove = _this.onPointerMove.bind(_this);
      _this.onPointerUp = _this.onPointerUp.bind(_this);
      _this.onPointerCancel = _this.onPointerCancel.bind(_this);
      _this.onHoverMove = _this.onHoverMove.bind(_this);
      _this.onHoverLeave = _this.onHoverLeave.bind(_this);
      _this.onKeyDown = _this.onKeyDown.bind(_this);
      return _this;
    }
    _inherits(ProgressBar, _Component);
    return _createClass(ProgressBar, [{
      key: "create",
      value: function create() {
        var timeline = this.createElement('div', 'vp-timeline', {
          role: 'slider',
          tabindex: 0,
          'aria-label': 'Video progress slider',
          'aria-valuemin': 0,
          'aria-valuemax': 100,
          'aria-valuenow': 0,
          'aria-valuetext': '00:00'
        });

        // 1. Buffer Bar (loaded content)
        this.bufferBar = this.createElement('div', 'vp-buffer-bar');
        timeline.appendChild(this.bufferBar);

        // 2. Played Progress Bar
        this.progressBar = this.createElement('div', 'vp-progress-bar');
        this.progressHandle = this.createElement('div', 'vp-progress-handle');
        this.progressBar.appendChild(this.progressHandle);
        timeline.appendChild(this.progressBar);

        // 3. Time Preview Tooltip
        this.timePreview = this.createElement('div', 'vp-time-preview');
        this.timePreview.style.display = 'none';
        timeline.appendChild(this.timePreview);
        this.timeline = timeline;

        // Player subscriptions
        this.addPlayerListener('timeupdate', this.onTimeUpdate);
        this.addPlayerListener('loadedmetadata', this.onTimeUpdate);
        this.addPlayerListener('progress', this.onProgress);

        // Pointer interactions (works for mouse, touch, and pen)
        this.addDomListener(timeline, 'pointerdown', this.onPointerDown);
        this.addDomListener(timeline, 'pointermove', this.onHoverMove);
        this.addDomListener(timeline, 'pointerleave', this.onHoverLeave);
        this.addDomListener(timeline, 'keydown', this.onKeyDown);
        return timeline;
      }
    }, {
      key: "onTimeUpdate",
      value: function onTimeUpdate() {
        var _this$player$video, _this$player$video2;
        if (this.isDragging) return;
        var duration = (_this$player$video = this.player.video) === null || _this$player$video === void 0 ? void 0 : _this$player$video.duration;
        var currentTime = ((_this$player$video2 = this.player.video) === null || _this$player$video2 === void 0 ? void 0 : _this$player$video2.currentTime) || 0;
        if (!duration || isNaN(duration) || !isFinite(duration)) {
          this.updateUI(0, currentTime);
          return;
        }
        var percent = Math.max(0, Math.min(100, currentTime / duration * 100));
        this.updateUI(percent, currentTime);
      }
    }, {
      key: "onProgress",
      value: function onProgress() {
        if (!this.player.video) return;
        var video = this.player.video;
        var duration = video.duration;
        if (!duration || isNaN(duration) || !isFinite(duration)) {
          this.bufferBar.style.width = '0%';
          return;
        }
        var buffered = video.buffered;
        if (buffered && buffered.length > 0) {
          var currentTime = video.currentTime;
          var loadedEnd = 0;
          for (var i = 0; i < buffered.length; i++) {
            if (buffered.start(i) <= currentTime && currentTime <= buffered.end(i)) {
              loadedEnd = buffered.end(i);
              break;
            } else if (buffered.end(i) > loadedEnd) {
              loadedEnd = buffered.end(i);
            }
          }
          var percent = Math.max(0, Math.min(100, loadedEnd / duration * 100));
          this.bufferBar.style.width = "".concat(percent, "%");
        }
      }
    }, {
      key: "updateUI",
      value: function updateUI(percent, time) {
        if (this.progressBar) {
          this.progressBar.style.width = "".concat(percent, "%");
        }
        if (this.timeline) {
          this.timeline.setAttribute('aria-valuenow', Math.round(percent).toString());
          this.timeline.setAttribute('aria-valuetext', formatTime(time));
        }
      }
    }, {
      key: "onPointerDown",
      value: function onPointerDown(e) {
        if (e.button !== undefined && e.button !== 0) return; // Only primary button
        this.isDragging = true;
        this.timeline.classList.add('vp-dragging');
        try {
          e.target.setPointerCapture(e.pointerId);
        } catch (err) {
          // Fallback if pointer capture not supported
        }
        this.addDomListener(this.timeline, 'pointermove', this.onPointerMove);
        this.addDomListener(this.timeline, 'pointerup', this.onPointerUp);
        this.addDomListener(this.timeline, 'pointercancel', this.onPointerCancel);
        this.handlePointerPosition(e, true);
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(e) {
        if (!this.isDragging) return;
        this.handlePointerPosition(e, false);
      }
    }, {
      key: "onPointerUp",
      value: function onPointerUp(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.timeline.classList.remove('vp-dragging');
        try {
          e.target.releasePointerCapture(e.pointerId);
        } catch (err) {
          // Ignore
        }
        this.timeline.removeEventListener('pointermove', this.onPointerMove);
        this.timeline.removeEventListener('pointerup', this.onPointerUp);
        this.timeline.removeEventListener('pointercancel', this.onPointerCancel);
        if (this.rafId) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }

        // Commit final seek immediately
        this.handlePointerPosition(e, true);
      }
    }, {
      key: "onPointerCancel",
      value: function onPointerCancel(e) {
        this.onPointerUp(e);
      }
    }, {
      key: "handlePointerPosition",
      value: function handlePointerPosition(e) {
        var _this$player$video3,
          _this2 = this;
        var immediateSeek = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var rect = this.timeline.getBoundingClientRect();
        if (rect.width === 0) return;
        var pos = (e.clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        var duration = ((_this$player$video3 = this.player.video) === null || _this$player$video3 === void 0 ? void 0 : _this$player$video3.duration) || 0;
        var targetTime = duration * pos;
        this.updateUI(pos * 100, targetTime);
        if (!duration || isNaN(duration) || !isFinite(duration)) return;
        if (immediateSeek) {
          this.player.seek(targetTime);
        } else {
          // Throttle seeks during active dragging using requestAnimationFrame
          this.targetSeekTime = targetTime;
          if (!this.rafId) {
            this.rafId = requestAnimationFrame(function () {
              if (_this2.targetSeekTime !== null) {
                _this2.player.seek(_this2.targetSeekTime);
                _this2.targetSeekTime = null;
              }
              _this2.rafId = null;
            });
          }
        }
      }
    }, {
      key: "onHoverMove",
      value: function onHoverMove(e) {
        var _this$player$video4;
        if (this.isDragging) return;
        var duration = (_this$player$video4 = this.player.video) === null || _this$player$video4 === void 0 ? void 0 : _this$player$video4.duration;
        if (!duration || isNaN(duration) || !isFinite(duration)) {
          this.timePreview.style.display = 'none';
          return;
        }
        var rect = this.timeline.getBoundingClientRect();
        if (rect.width === 0) return;
        var pos = (e.clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        var time = pos * duration;
        this.timePreview.textContent = formatTime(time);
        this.timePreview.style.display = 'block';
        this.timePreview.style.left = "".concat(pos * 100, "%");
      }
    }, {
      key: "onHoverLeave",
      value: function onHoverLeave() {
        if (!this.isDragging) {
          this.timePreview.style.display = 'none';
        }
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(e) {
        var _this$player$video5, _this$player$video6;
        var duration = (_this$player$video5 = this.player.video) === null || _this$player$video5 === void 0 ? void 0 : _this$player$video5.duration;
        var currentTime = ((_this$player$video6 = this.player.video) === null || _this$player$video6 === void 0 ? void 0 : _this$player$video6.currentTime) || 0;
        if (!duration || isNaN(duration) || !isFinite(duration)) return;
        var handled = true;
        switch (e.key) {
          case 'ArrowLeft':
            this.player.seek(Math.max(0, currentTime - 5));
            break;
          case 'ArrowRight':
            this.player.seek(Math.min(duration, currentTime + 5));
            break;
          case 'PageDown':
            this.player.seek(Math.max(0, currentTime - 30));
            break;
          case 'PageUp':
            this.player.seek(Math.min(duration, currentTime + 30));
            break;
          case 'Home':
            this.player.seek(0);
            break;
          case 'End':
            this.player.seek(duration);
            break;
          default:
            handled = false;
        }
        if (handled) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.rafId) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
        _superPropGet(ProgressBar, "destroy", this)([]);
      }
    }]);
  }(Component);

  var VolumeControl = /*#__PURE__*/function (_Component) {
    function VolumeControl(player) {
      var _this;
      _classCallCheck(this, VolumeControl);
      _this = _callSuper(this, VolumeControl, [player]);
      _this.lastVolume = 1;
      _this.onClick = _this.onClick.bind(_this);
      _this.onInput = _this.onInput.bind(_this);
      _this.onVolumeChange = _this.onVolumeChange.bind(_this);
      return _this;
    }
    _inherits(VolumeControl, _Component);
    return _createClass(VolumeControl, [{
      key: "create",
      value: function create() {
        var _this$player$video$vo, _this$player$video, _this$player$video2;
        var container = this.createElement('div', 'vp-volume');

        // Detect iOS where volume manipulation is blocked by the OS
        var isIOS = typeof navigator !== 'undefined' && (/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        var currentVol = (_this$player$video$vo = (_this$player$video = this.player.video) === null || _this$player$video === void 0 ? void 0 : _this$player$video.volume) !== null && _this$player$video$vo !== void 0 ? _this$player$video$vo : 1;
        var isMuted = ((_this$player$video2 = this.player.video) === null || _this$player$video2 === void 0 ? void 0 : _this$player$video2.muted) || currentVol === 0;
        this.btn = this.createElement('button', 'vp-button vp-button--volume', {
          type: 'button',
          'aria-label': isMuted ? 'Unmute (m)' : 'Mute (m)',
          title: isMuted ? 'Unmute (m)' : 'Mute (m)'
        });
        this.btn.innerHTML = this.getIcon(isMuted ? 0 : currentVol);
        this.addDomListener(this.btn, 'click', this.onClick);
        container.appendChild(this.btn);
        if (!isIOS) {
          this.slider = this.createElement('input', 'vp-volume__slider', {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
            value: isMuted ? 0 : currentVol,
            'aria-label': 'Volume slider',
            'aria-valuemin': 0,
            'aria-valuemax': 100,
            'aria-valuenow': Math.round((isMuted ? 0 : currentVol) * 100)
          });
          this.addDomListener(this.slider, 'input', this.onInput);
          container.appendChild(this.slider);
        }
        this.addPlayerListener('volumechange', this.onVolumeChange);
        return container;
      }
    }, {
      key: "onClick",
      value: function onClick() {
        if (!this.player.video) return;
        if (this.player.video.muted || this.player.video.volume === 0) {
          this.player.video.muted = false;
          var restoreVol = this.lastVolume && this.lastVolume > 0.05 ? this.lastVolume : 1;
          this.player.setVolume(restoreVol);
        } else {
          this.lastVolume = this.player.video.volume;
          this.player.video.muted = true;
          this.player.setVolume(0);
        }
      }
    }, {
      key: "onInput",
      value: function onInput(e) {
        var val = parseFloat(e.target.value);
        if (val > 0) {
          this.lastVolume = val;
        }
        this.player.setVolume(val);
      }
    }, {
      key: "onVolumeChange",
      value: function onVolumeChange() {
        if (!this.player.video) return;
        var volume = this.player.video.volume;
        var isMuted = this.player.video.muted || volume === 0;
        var displayVol = isMuted ? 0 : volume;
        if (this.slider) {
          this.slider.value = displayVol.toString();
          this.slider.setAttribute('aria-valuenow', Math.round(displayVol * 100).toString());
        }
        if (this.btn) {
          this.btn.innerHTML = this.getIcon(displayVol);
          var label = isMuted ? 'Unmute (m)' : 'Mute (m)';
          this.btn.setAttribute('aria-label', label);
          this.btn.setAttribute('title', label);
        }
      }
    }, {
      key: "getIcon",
      value: function getIcon(level) {
        if (level === 0) {
          return '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
        } else if (level < 0.5) {
          return '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>';
        } else {
          return '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L9 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
        }
      }
    }]);
  }(Component);

  var TimeDisplay = /*#__PURE__*/function (_Component) {
    function TimeDisplay(player) {
      var _this;
      _classCallCheck(this, TimeDisplay);
      _this = _callSuper(this, TimeDisplay, [player]);
      _this.onTimeUpdate = _this.onTimeUpdate.bind(_this);
      return _this;
    }
    _inherits(TimeDisplay, _Component);
    return _createClass(TimeDisplay, [{
      key: "create",
      value: function create() {
        var container = this.createElement('div', 'vp-time-display', {
          'aria-label': 'Playback time'
        });
        this.currentObj = this.createElement('span', 'vp-time-current');
        this.currentObj.textContent = '00:00';
        var divider = this.createElement('span', 'vp-time-divider');
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
    }, {
      key: "onTimeUpdate",
      value: function onTimeUpdate() {
        if (!this.player.video) return;
        var currentTime = this.player.video.currentTime || 0;
        var duration = this.player.video.duration;
        this.currentObj.textContent = formatTime(currentTime);
        this.durationObj.textContent = formatTime(duration);
      }
    }]);
  }(Component);

  var FullscreenButton = /*#__PURE__*/function (_Component) {
    function FullscreenButton(player) {
      var _this;
      _classCallCheck(this, FullscreenButton);
      _this = _callSuper(this, FullscreenButton, [player]);
      _this.onClick = _this.onClick.bind(_this);
      _this.onFullscreenChange = _this.onFullscreenChange.bind(_this);
      return _this;
    }
    _inherits(FullscreenButton, _Component);
    return _createClass(FullscreenButton, [{
      key: "create",
      value: function create() {
        var isFS = this.isFullscreen();
        var btn = this.createElement('button', 'vp-button vp-button--fullscreen', {
          type: 'button',
          'aria-label': isFS ? 'Exit Fullscreen (f)' : 'Fullscreen (f)',
          title: isFS ? 'Exit Fullscreen (f)' : 'Fullscreen (f)'
        });
        btn.innerHTML = this.getIcon(isFS);
        this.addDomListener(btn, 'click', this.onClick);

        // Listen for document fullscreen change
        this.addDomListener(document, 'fullscreenchange', this.onFullscreenChange);
        this.addDomListener(document, 'webkitfullscreenchange', this.onFullscreenChange);

        // iOS webkit fullscreen on video
        if (this.player.video) {
          this.addDomListener(this.player.video, 'webkitbeginfullscreen', this.onFullscreenChange);
          this.addDomListener(this.player.video, 'webkitendfullscreen', this.onFullscreenChange);
        }
        return btn;
      }
    }, {
      key: "isFullscreen",
      value: function isFullscreen() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement || this.player.video && this.player.video.webkitDisplayingFullscreen);
      }
    }, {
      key: "onClick",
      value: function onClick() {
        var container = this.player.container;
        var video = this.player.video;
        if (this.isFullscreen()) {
          if (document.exitFullscreen) {
            document.exitFullscreen()["catch"](function () {});
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        } else {
          if (container.requestFullscreen) {
            container.requestFullscreen()["catch"](function () {
              // Fallback to video on failure
              if (video && video.webkitEnterFullscreen) {
                video.webkitEnterFullscreen();
              }
            });
          } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
          } else if (video && video.webkitEnterFullscreen) {
            // iOS iPhone Safari requires fullscreen directly on video element
            video.webkitEnterFullscreen();
          }
        }
      }
    }, {
      key: "onFullscreenChange",
      value: function onFullscreenChange() {
        var isFS = this.isFullscreen();
        if (this.el) {
          this.el.innerHTML = this.getIcon(isFS);
          var label = isFS ? 'Exit Fullscreen (f)' : 'Fullscreen (f)';
          this.el.setAttribute('aria-label', label);
          this.el.setAttribute('title', label);
        }
        if (this.player.container) {
          if (isFS) {
            this.player.container.classList.add('vp-fullscreen');
          } else {
            this.player.container.classList.remove('vp-fullscreen');
          }
        }
        this.player.emit('fullscreenchange', isFS);
      }
    }, {
      key: "getIcon",
      value: function getIcon(isFullscreen) {
        return isFullscreen ? '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>' // Exit fullscreen
        : '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>'; // Enter fullscreen
      }
    }]);
  }(Component);

  var SpeedControl = /*#__PURE__*/function (_Component) {
    function SpeedControl(player) {
      var _this;
      _classCallCheck(this, SpeedControl);
      _this = _callSuper(this, SpeedControl, [player]);
      _this.isOpen = false;
      _this.toggleMenu = _this.toggleMenu.bind(_this);
      _this.onSpeedSelect = _this.onSpeedSelect.bind(_this);
      _this.onDocumentClick = _this.onDocumentClick.bind(_this);
      _this.onRateChange = _this.onRateChange.bind(_this);
      _this.onKeyDown = _this.onKeyDown.bind(_this);
      return _this;
    }
    _inherits(SpeedControl, _Component);
    return _createClass(SpeedControl, [{
      key: "create",
      value: function create() {
        var _this$player$video,
          _this2 = this;
        var container = this.createElement('div', 'vp-speed-control');
        container.style.position = 'relative';
        this.btn = this.createElement('button', 'vp-button vp-button--speed', {
          type: 'button',
          'aria-label': 'Playback speed',
          title: 'Playback Speed',
          'aria-haspopup': 'true',
          'aria-expanded': 'false'
        });
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/></svg>';
        this.addDomListener(this.btn, 'click', this.toggleMenu);
        this.menu = this.createElement('div', 'vp-menu', {
          role: 'menu',
          'aria-label': 'Playback speed options'
        });
        var currentSpeed = ((_this$player$video = this.player.video) === null || _this$player$video === void 0 ? void 0 : _this$player$video.playbackRate) || 1;
        var speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        this.speedButtons = [];
        speeds.forEach(function (speed) {
          var isSelected = speed === currentSpeed;
          var item = _this2.createElement('button', "vp-menu-btn ".concat(isSelected ? 'vp-selected' : ''), {
            type: 'button',
            role: 'menuitemradio',
            'aria-checked': isSelected ? 'true' : 'false',
            'data-speed': speed.toString()
          });
          item.textContent = speed === 1 ? 'Normal' : "".concat(speed, "x");
          _this2.addDomListener(item, 'click', function (e) {
            e.stopPropagation();
            _this2.onSpeedSelect(speed);
          });
          _this2.speedButtons.push({
            speed: speed,
            el: item
          });
          _this2.menu.appendChild(item);
        });
        container.appendChild(this.btn);
        container.appendChild(this.menu);
        this.containerEl = container;

        // Auto-cleanup listeners
        this.addDomListener(document, 'click', this.onDocumentClick);
        this.addDomListener(container, 'keydown', this.onKeyDown);
        this.addPlayerListener('menu:open', function (source) {
          if (source !== _this2) _this2.closeMenu();
        });
        if (this.player.video) {
          this.addDomListener(this.player.video, 'ratechange', this.onRateChange);
        }
        return container;
      }
    }, {
      key: "toggleMenu",
      value: function toggleMenu(e) {
        if (e) e.stopPropagation();
        if (this.isOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
      }
    }, {
      key: "openMenu",
      value: function openMenu() {
        this.isOpen = true;
        this.menu.classList.add('vp-active');
        this.btn.setAttribute('aria-expanded', 'true');
        this.player.emit('menu:open', this);

        // Focus first selected item or first item
        var selectedBtn = this.menu.querySelector('.vp-selected') || this.menu.querySelector('button');
        if (selectedBtn) selectedBtn.focus();
      }
    }, {
      key: "closeMenu",
      value: function closeMenu() {
        if (!this.isOpen) return;
        this.isOpen = false;
        this.menu.classList.remove('vp-active');
        this.btn.setAttribute('aria-expanded', 'false');
      }
    }, {
      key: "onDocumentClick",
      value: function onDocumentClick(e) {
        if (!this.containerEl.contains(e.target)) {
          this.closeMenu();
        }
      }
    }, {
      key: "onSpeedSelect",
      value: function onSpeedSelect(speed) {
        if (this.player.video) {
          this.player.video.playbackRate = speed;
        }
        this.syncSpeedUI(speed);
        this.closeMenu();
        this.btn.focus();
        this.player.emit('speedchange', speed);
      }
    }, {
      key: "onRateChange",
      value: function onRateChange() {
        var _this$player$video2;
        var rate = ((_this$player$video2 = this.player.video) === null || _this$player$video2 === void 0 ? void 0 : _this$player$video2.playbackRate) || 1;
        this.syncSpeedUI(rate);
      }
    }, {
      key: "syncSpeedUI",
      value: function syncSpeedUI(activeSpeed) {
        this.speedButtons.forEach(function (_ref) {
          var speed = _ref.speed,
            el = _ref.el;
          var isMatch = Math.abs(speed - activeSpeed) < 0.01;
          el.classList.toggle('vp-selected', isMatch);
          el.setAttribute('aria-checked', isMatch ? 'true' : 'false');
        });
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(e) {
        if (e.key === 'Escape' && this.isOpen) {
          e.stopPropagation();
          this.closeMenu();
          this.btn.focus();
        }
      }
    }]);
  }(Component);

  var QualityControl = /*#__PURE__*/function (_Component) {
    function QualityControl(player) {
      var _this;
      _classCallCheck(this, QualityControl);
      _this = _callSuper(this, QualityControl, [player]);
      _this.isOpen = false;
      _this.currentQuality = 'auto';
      _this.toggleMenu = _this.toggleMenu.bind(_this);
      _this.onDocumentClick = _this.onDocumentClick.bind(_this);
      _this.onKeyDown = _this.onKeyDown.bind(_this);
      return _this;
    }
    _inherits(QualityControl, _Component);
    return _createClass(QualityControl, [{
      key: "create",
      value: function create() {
        var _this$player$config,
          _this$player$config2,
          _this2 = this;
        var container = this.createElement('div', 'vp-quality-control');
        container.style.position = 'relative';
        var sources = ((_this$player$config = this.player.config) === null || _this$player$config === void 0 ? void 0 : _this$player$config.qualities) || ((_this$player$config2 = this.player.config) === null || _this$player$config2 === void 0 ? void 0 : _this$player$config2.sources);
        var hasQualities = Array.isArray(sources) && sources.length > 1;

        // If the user hasn't provided multiple quality sources, hide control cleanly
        if (!hasQualities) {
          container.style.display = 'none';
          this.containerEl = container;
          return container;
        }
        this.btn = this.createElement('button', 'vp-button vp-button--quality', {
          type: 'button',
          'aria-label': 'Video quality settings',
          title: 'Quality',
          'aria-haspopup': 'true',
          'aria-expanded': 'false'
        });
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4zm0 13.5h-15a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5zM7.5 15h2v-6h-2v6zm5-6v6h2V9h-2zm5 0v6h2V9h-2z"/></svg>';
        this.addDomListener(this.btn, 'click', this.toggleMenu);
        this.menu = this.createElement('div', 'vp-menu', {
          role: 'menu',
          'aria-label': 'Available qualities'
        });
        this.items = [];
        sources.forEach(function (source, index) {
          var isSelected = index === 0;
          var item = _this2.createElement('button', "vp-menu-btn ".concat(isSelected ? 'vp-selected' : ''), {
            type: 'button',
            role: 'menuitemradio',
            'aria-checked': isSelected ? 'true' : 'false'
          });
          item.textContent = source.label || "".concat(source.res || '', "p") || "Stream ".concat(index + 1);
          _this2.addDomListener(item, 'click', function (e) {
            e.stopPropagation();
            _this2.onQualitySelect(source, item);
          });
          _this2.items.push({
            source: source,
            el: item
          });
          _this2.menu.appendChild(item);
        });
        container.appendChild(this.btn);
        container.appendChild(this.menu);
        this.containerEl = container;
        this.addDomListener(document, 'click', this.onDocumentClick);
        this.addDomListener(container, 'keydown', this.onKeyDown);
        this.addPlayerListener('menu:open', function (source) {
          if (source !== _this2) _this2.closeMenu();
        });
        return container;
      }
    }, {
      key: "toggleMenu",
      value: function toggleMenu(e) {
        if (e) e.stopPropagation();
        if (this.isOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
      }
    }, {
      key: "openMenu",
      value: function openMenu() {
        this.isOpen = true;
        this.menu.classList.add('vp-active');
        this.btn.setAttribute('aria-expanded', 'true');
        this.player.emit('menu:open', this);
        var active = this.menu.querySelector('.vp-selected') || this.menu.querySelector('button');
        if (active) active.focus();
      }
    }, {
      key: "closeMenu",
      value: function closeMenu() {
        if (!this.isOpen) return;
        this.isOpen = false;
        this.menu.classList.remove('vp-active');
        this.btn.setAttribute('aria-expanded', 'false');
      }
    }, {
      key: "onDocumentClick",
      value: function onDocumentClick(e) {
        if (this.containerEl && !this.containerEl.contains(e.target)) {
          this.closeMenu();
        }
      }
    }, {
      key: "onQualitySelect",
      value: function onQualitySelect(source, element) {
        this.items.forEach(function (_ref) {
          var el = _ref.el;
          el.classList.remove('vp-selected');
          el.setAttribute('aria-checked', 'false');
        });
        element.classList.add('vp-selected');
        element.setAttribute('aria-checked', 'true');

        // Seamlessly switch video source preserving playback time
        var video = this.player.video;
        if (video && source.src && video.src !== source.src) {
          var currentTime = video.currentTime;
          var wasPlaying = !video.paused;
          video.src = source.src;
          var onLoaded = function onLoaded() {
            video.currentTime = currentTime;
            if (wasPlaying) {
              video.play()["catch"](function () {});
            }
          };
          video.addEventListener('loadedmetadata', onLoaded, {
            once: true
          });
        }
        this.closeMenu();
        this.btn.focus();
        this.player.emit('qualitychange', source);
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(e) {
        if (e.key === 'Escape' && this.isOpen) {
          e.stopPropagation();
          this.closeMenu();
          this.btn.focus();
        }
      }
    }]);
  }(Component);

  var Captions = /*#__PURE__*/function (_Component) {
    function Captions(player) {
      var _this;
      _classCallCheck(this, Captions);
      _this = _callSuper(this, Captions, [player]);
      _this.isOpen = false;
      _this.currentTrackIndex = -1; // -1 means Off

      _this.toggleMenu = _this.toggleMenu.bind(_this);
      _this.onDocumentClick = _this.onDocumentClick.bind(_this);
      _this.onKeyDown = _this.onKeyDown.bind(_this);
      return _this;
    }
    _inherits(Captions, _Component);
    return _createClass(Captions, [{
      key: "create",
      value: function create() {
        var _this2 = this;
        var container = this.createElement('div', 'vp-captions-control');
        container.style.position = 'relative';

        // Check if config has tracks and inject them into video if needed
        this.initTracks();
        var tracks = this.getTracks();
        if (tracks.length === 0) {
          container.style.display = 'none';
          this.containerEl = container;
          return container;
        }
        this.btn = this.createElement('button', 'vp-button vp-button--captions', {
          type: 'button',
          'aria-label': 'Subtitles and captions',
          title: 'Subtitles / Captions (c)',
          'aria-haspopup': 'true',
          'aria-expanded': 'false'
        });
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H7.5v-1.5h-2v3h2V11H11v2H5.5v-4h5.5v2zM19 11h-5.5v4h2v-1.5h2v1.5h1.5v-4h-5.5v2H18v-2h-1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>';
        this.addDomListener(this.btn, 'click', this.toggleMenu);
        this.menu = this.createElement('div', 'vp-menu', {
          role: 'menu',
          'aria-label': 'Subtitles options'
        });
        this.menuItems = [];

        // 1. "Off" option
        var offBtn = this.createElement('button', 'vp-menu-btn vp-selected', {
          type: 'button',
          role: 'menuitemradio',
          'aria-checked': 'true'
        });
        offBtn.textContent = 'Off';
        this.addDomListener(offBtn, 'click', function (e) {
          e.stopPropagation();
          _this2.setTrack(-1);
        });
        this.menu.appendChild(offBtn);
        this.offBtn = offBtn;

        // 2. Available Tracks
        tracks.forEach(function (track, index) {
          var isDefault = track["default"];
          var btn = _this2.createElement('button', 'vp-menu-btn', {
            type: 'button',
            role: 'menuitemradio',
            'aria-checked': 'false'
          });
          btn.textContent = track.label || track.language || "Track ".concat(index + 1);
          _this2.addDomListener(btn, 'click', function (e) {
            e.stopPropagation();
            _this2.setTrack(index);
          });
          _this2.menu.appendChild(btn);
          _this2.menuItems.push({
            index: index,
            el: btn,
            track: track
          });
          if (isDefault) {
            _this2.setTrack(index);
          }
        });
        container.appendChild(this.btn);
        container.appendChild(this.menu);
        this.containerEl = container;
        this.addDomListener(document, 'click', this.onDocumentClick);
        this.addDomListener(container, 'keydown', this.onKeyDown);
        this.addPlayerListener('menu:open', function (source) {
          if (source !== _this2) _this2.closeMenu();
        });
        return container;
      }
    }, {
      key: "initTracks",
      value: function initTracks() {
        var _this$player$config;
        var video = this.player.video;
        if (!video) return;
        var configTracks = (_this$player$config = this.player.config) === null || _this$player$config === void 0 ? void 0 : _this$player$config.tracks;
        if (Array.isArray(configTracks)) {
          configTracks.forEach(function (t) {
            var track = document.createElement('track');
            track.kind = t.kind || 'subtitles';
            track.label = t.label;
            track.srclang = t.srclang || 'en';
            track.src = t.src;
            if (t["default"]) track["default"] = true;
            video.appendChild(track);
          });
        }
      }
    }, {
      key: "getTracks",
      value: function getTracks() {
        var video = this.player.video;
        if (!video || !video.textTracks) return [];
        return Array.from(video.textTracks).filter(function (t) {
          return t.kind === 'subtitles' || t.kind === 'captions';
        });
      }
    }, {
      key: "setTrack",
      value: function setTrack(trackIndex) {
        var tracks = this.getTracks();
        this.currentTrackIndex = trackIndex;
        tracks.forEach(function (track, idx) {
          if (idx === trackIndex) {
            track.mode = 'showing';
          } else {
            track.mode = 'disabled';
          }
        });

        // Update UI
        if (this.offBtn) {
          var isOff = trackIndex === -1;
          this.offBtn.classList.toggle('vp-selected', isOff);
          this.offBtn.setAttribute('aria-checked', isOff ? 'true' : 'false');
        }
        this.menuItems.forEach(function (_ref) {
          var index = _ref.index,
            el = _ref.el;
          var isSelected = index === trackIndex;
          el.classList.toggle('vp-selected', isSelected);
          el.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        });
        if (this.btn) {
          this.btn.classList.toggle('vp-button--active', trackIndex !== -1);
        }
        this.closeMenu();
        if (this.btn) this.btn.focus();
        this.player.emit('captionschange', trackIndex >= 0 ? tracks[trackIndex] : null);
      }
    }, {
      key: "toggleMenu",
      value: function toggleMenu(e) {
        if (e) e.stopPropagation();
        if (this.isOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
      }
    }, {
      key: "openMenu",
      value: function openMenu() {
        this.isOpen = true;
        this.menu.classList.add('vp-active');
        this.btn.setAttribute('aria-expanded', 'true');
        this.player.emit('menu:open', this);
        var active = this.menu.querySelector('.vp-selected') || this.menu.querySelector('button');
        if (active) active.focus();
      }
    }, {
      key: "closeMenu",
      value: function closeMenu() {
        if (!this.isOpen) return;
        this.isOpen = false;
        this.menu.classList.remove('vp-active');
        this.btn.setAttribute('aria-expanded', 'false');
      }
    }, {
      key: "onDocumentClick",
      value: function onDocumentClick(e) {
        if (this.containerEl && !this.containerEl.contains(e.target)) {
          this.closeMenu();
        }
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(e) {
        if (e.key === 'Escape' && this.isOpen) {
          e.stopPropagation();
          this.closeMenu();
          this.btn.focus();
        }
      }
    }]);
  }(Component);

  var Controls = /*#__PURE__*/function (_Component) {
    function Controls(player) {
      var _this;
      _classCallCheck(this, Controls);
      _this = _callSuper(this, Controls, [player]);
      _this.children = [];
      return _this;
    }
    _inherits(Controls, _Component);
    return _createClass(Controls, [{
      key: "create",
      value: function create() {
        var controls = this.createElement('div', 'vp-player__controls');

        // 1. Timeline Container (Top)
        var timelineContainer = this.createElement('div', 'vp-timeline-container');
        var progressBar = new ProgressBar(this.player);
        progressBar.mount(timelineContainer);
        this.children.push(progressBar);
        controls.appendChild(timelineContainer);

        // 2. Controls Row (Bottom)
        var controlsRow = this.createElement('div', 'vp-controls-row');
        controls.appendChild(controlsRow);

        // -- Left Controls: Play, Volume, Time
        var leftControls = this.createElement('div', 'vp-controls-left');
        controlsRow.appendChild(leftControls);
        var playBtn = new PlayButton(this.player);
        playBtn.mount(leftControls);
        this.children.push(playBtn);
        var volumeControl = new VolumeControl(this.player);
        volumeControl.mount(leftControls);
        this.children.push(volumeControl);
        var timeDisplay = new TimeDisplay(this.player);
        timeDisplay.mount(leftControls);
        this.children.push(timeDisplay);

        // -- Center Spacer (or custom center slot)
        var centerControls = this.createElement('div', 'vp-controls-center');
        controlsRow.appendChild(centerControls);

        // -- Right Controls: Quality, Captions, Speed, Fullscreen
        var rightControls = this.createElement('div', 'vp-controls-right');
        controlsRow.appendChild(rightControls);
        var qualityControl = new QualityControl(this.player);
        qualityControl.mount(rightControls);
        this.children.push(qualityControl);
        var captions = new Captions(this.player);
        captions.mount(rightControls);
        this.children.push(captions);
        var speedControl = new SpeedControl(this.player);
        speedControl.mount(rightControls);
        this.children.push(speedControl);
        var fullscreenBtn = new FullscreenButton(this.player);
        fullscreenBtn.mount(rightControls);
        this.children.push(fullscreenBtn);
        return controls;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.children.forEach(function (child) {
          if (child && typeof child.destroy === 'function') {
            child.destroy();
          }
        });
        this.children = [];
        _superPropGet(Controls, "destroy", this)([]);
      }
    }]);
  }(Component);

  var VideoPlayer = /*#__PURE__*/function (_EventEmitter) {
    function VideoPlayer(config) {
      var _this;
      _classCallCheck(this, VideoPlayer);
      _this = _callSuper(this, VideoPlayer);
      _this.config = _objectSpread2({
        controls: true,
        autoplay: false,
        muted: false,
        playsinline: true,
        keyboard: true,
        theme: 'dark'
      }, config);
      _this.container = typeof _this.config.container === 'string' ? document.querySelector(_this.config.container) : _this.config.container;
      if (!_this.container) {
        throw new Error('VideoPlayer: Container not found');
      }
      _this.video = null;
      _this.controls = null;
      _this.spinner = null;
      _this.createdVideoElement = false;
      _this.controlsTimeout = null;
      _this.disposers = [];
      _this.init();
      return _this;
    }
    _inherits(VideoPlayer, _EventEmitter);
    return _createClass(VideoPlayer, [{
      key: "init",
      value: function init() {
        this.container.classList.add('vp-player');
        if (this.config.keyboard && !this.container.hasAttribute('tabindex')) {
          this.container.setAttribute('tabindex', '0');
        }

        // 1. Setup Video Element
        var existingVideo = this.container.querySelector('video');
        if (existingVideo) {
          this.video = existingVideo;
          this.video.classList.add('vp-player__video');
          this.createdVideoElement = false;
        } else {
          this.video = document.createElement('video');
          this.video.className = 'vp-player__video';
          this.container.appendChild(this.video);
          this.createdVideoElement = true;
        }

        // Apply Video Attributes
        if (this.config.src && this.video.src !== this.config.src) {
          this.video.src = this.config.src;
        }
        if (this.config.crossorigin) {
          this.video.setAttribute('crossorigin', typeof this.config.crossorigin === 'string' ? this.config.crossorigin : 'anonymous');
        } else if (this.config.tracks && this.config.tracks.length > 0) {
          this.video.setAttribute('crossorigin', 'anonymous');
        }
        if (this.config.playsinline) {
          this.video.setAttribute('playsinline', '');
          this.video.setAttribute('webkit-playsinline', '');
        }
        if (this.config.autoplay) {
          this.video.autoplay = true;
          // Browsers require muted for autoplay
          if (this.config.muted) {
            this.video.muted = true;
          }
        }
        if (this.config.muted) {
          this.video.muted = true;
        }

        // 2. Loading Spinner
        this.spinner = document.createElement('div');
        this.spinner.className = 'vp-player__spinner';
        this.spinner.setAttribute('aria-hidden', 'true');
        this.container.appendChild(this.spinner);

        // 3. Mount Controls
        if (this.config.controls) {
          this.controls = new Controls(this);
          this.controls.mount(this.container);
        }

        // 4. Attach Events
        this.attachEvents();

        // 5. Initial State
        this.showControls();
      }
    }, {
      key: "addDomListener",
      value: function addDomListener(target, event, handler, options) {
        if (!target) return;
        target.addEventListener(event, handler, options);
        this.disposers.push(function () {
          try {
            target.removeEventListener(event, handler, options);
          } catch (e) {}
        });
      }
    }, {
      key: "attachEvents",
      value: function attachEvents() {
        var _this2 = this;
        // Video State Events
        var videoEvents = ['play', 'pause', 'ended', 'timeupdate', 'volumechange', 'loadedmetadata', 'durationchange', 'progress', 'ratechange'];
        videoEvents.forEach(function (evt) {
          _this2.addDomListener(_this2.video, evt, function () {
            return _this2.emit(evt);
          });
        });
        this.addDomListener(this.video, 'play', function () {
          _this2.hideControlsDelayed();
        });
        this.addDomListener(this.video, 'pause', function () {
          _this2.showControls();
        });
        this.addDomListener(this.video, 'ended', function () {
          _this2.showControls();
        });

        // Buffering / Loading State Events
        var showSpinner = function showSpinner() {
          return _this2.container.classList.add('vp-loading');
        };
        var hideSpinner = function hideSpinner() {
          return _this2.container.classList.remove('vp-loading');
        };
        this.addDomListener(this.video, 'waiting', showSpinner);
        this.addDomListener(this.video, 'seeking', showSpinner);
        this.addDomListener(this.video, 'canplay', hideSpinner);
        this.addDomListener(this.video, 'playing', hideSpinner);
        this.addDomListener(this.video, 'seeked', hideSpinner);

        // Hover & Interaction for Controls Visibility
        this.addDomListener(this.container, 'mouseenter', function () {
          return _this2.showControls();
        });
        this.addDomListener(this.container, 'mouseleave', function () {
          return _this2.hideControlsDelayed();
        });
        this.addDomListener(this.container, 'mousemove', function () {
          _this2.showControls();
          _this2.hideControlsDelayed();
        });

        // Click / Touch on video toggles play or controls
        this.addDomListener(this.video, 'click', function (e) {
          e.stopPropagation();
          _this2.togglePlay();
        });

        // Tap on touch devices
        this.addDomListener(this.container, 'pointerdown', function (e) {
          if (e.pointerType === 'touch') {
            if (!_this2.container.classList.contains('vp-show-controls')) {
              _this2.showControls();
              _this2.hideControlsDelayed();
            }
          }
        });

        // Keyboard Shortcuts
        if (this.config.keyboard) {
          this.addDomListener(this.container, 'keydown', function (e) {
            return _this2.handleKeyDown(e);
          });
        }
      }
    }, {
      key: "handleKeyDown",
      value: function handleKeyDown(e) {
        var _document$activeEleme;
        // Don't intercept typing in inputs or textareas
        var activeTag = (_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 || (_document$activeEleme = _document$activeEleme.tagName) === null || _document$activeEleme === void 0 ? void 0 : _document$activeEleme.toLowerCase();
        if (activeTag === 'input' || activeTag === 'textarea') return;
        var handled = true;
        switch (e.key) {
          case ' ':
          case 'k':
          case 'K':
            this.togglePlay();
            break;
          case 'm':
          case 'M':
            this.setVolume(this.video.muted ? 1 : 0);
            break;
          case 'f':
          case 'F':
            this.toggleFullscreen();
            break;
          case 'ArrowLeft':
          case 'j':
          case 'J':
            this.seek(Math.max(0, this.video.currentTime - 5));
            break;
          case 'ArrowRight':
          case 'l':
          case 'L':
            this.seek(Math.min(this.video.duration || 0, this.video.currentTime + 5));
            break;
          case 'ArrowUp':
            this.setVolume(Math.min(1, this.video.volume + 0.05));
            break;
          case 'ArrowDown':
            this.setVolume(Math.max(0, this.video.volume - 0.05));
            break;
          default:
            if (e.key >= '0' && e.key <= '9' && this.video.duration) {
              var percent = parseInt(e.key, 10) * 0.1;
              this.seek(this.video.duration * percent);
            } else {
              handled = false;
            }
        }
        if (handled) {
          e.preventDefault();
          this.showControls();
          this.hideControlsDelayed();
        }
      }
    }, {
      key: "showControls",
      value: function showControls() {
        this.container.classList.add('vp-show-controls');
        if (this.controlsTimeout) {
          clearTimeout(this.controlsTimeout);
          this.controlsTimeout = null;
        }
      }
    }, {
      key: "hideControlsDelayed",
      value: function hideControlsDelayed() {
        var _this3 = this;
        if (!this.video || this.video.paused) return; // Keep controls visible if paused

        if (this.controlsTimeout) clearTimeout(this.controlsTimeout);
        this.controlsTimeout = setTimeout(function () {
          if (_this3.video && !_this3.video.paused) {
            _this3.container.classList.remove('vp-show-controls');
          }
        }, 3000);
      }
    }, {
      key: "play",
      value: function play() {
        var _this4 = this;
        if (!this.video) return Promise.reject(new Error('Video element not found'));
        return this.video.play()["catch"](function (err) {
          _this4.emit('error', err);
          throw err;
        });
      }
    }, {
      key: "pause",
      value: function pause() {
        if (this.video) this.video.pause();
      }
    }, {
      key: "seek",
      value: function seek(time) {
        if (!this.video) return;
        this.video.currentTime = Math.max(0, Math.min(this.video.duration || 0, time));
      }
    }, {
      key: "setVolume",
      value: function setVolume(volume) {
        if (!this.video) return;
        var clamped = Math.max(0, Math.min(1, volume));
        this.video.volume = clamped;
        this.video.muted = clamped === 0;
      }
    }, {
      key: "togglePlay",
      value: function togglePlay() {
        if (!this.video) return;
        if (this.video.paused) {
          this.play();
        } else {
          this.pause();
        }
      }
    }, {
      key: "toggleFullscreen",
      value: function toggleFullscreen() {
        var _this5 = this,
          _this$video;
        if (document.fullscreenElement) {
          document.exitFullscreen()["catch"](function () {});
        } else if (this.container.requestFullscreen) {
          this.container.requestFullscreen()["catch"](function () {
            var _this5$video;
            if ((_this5$video = _this5.video) !== null && _this5$video !== void 0 && _this5$video.webkitEnterFullscreen) {
              _this5.video.webkitEnterFullscreen();
            }
          });
        } else if ((_this$video = this.video) !== null && _this$video !== void 0 && _this$video.webkitEnterFullscreen) {
          this.video.webkitEnterFullscreen();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.controlsTimeout) {
          clearTimeout(this.controlsTimeout);
          this.controlsTimeout = null;
        }

        // Clean up DOM event listeners
        while (this.disposers.length > 0) {
          var dispose = this.disposers.pop();
          try {
            dispose();
          } catch (e) {}
        }

        // Teardown controls
        if (this.controls && typeof this.controls.destroy === 'function') {
          this.controls.destroy();
          this.controls = null;
        }

        // Remove spinner
        if (this.spinner && this.spinner.parentNode) {
          this.spinner.parentNode.removeChild(this.spinner);
          this.spinner = null;
        }

        // Teardown video element
        if (this.video) {
          this.video.pause();
          if (this.createdVideoElement) {
            if (this.video.parentNode) {
              this.video.parentNode.removeChild(this.video);
            }
          } else {
            this.video.classList.remove('vp-player__video');
          }
          this.video = null;
        }

        // Clean container classes
        if (this.container) {
          this.container.classList.remove('vp-player', 'vp-show-controls', 'vp-loading', 'vp-fullscreen');
        }

        // Clean EventEmitter
        this.removeAllListeners();
      }
    }]);
  }(EventEmitter);

  return VideoPlayer;

}));
//# sourceMappingURL=video-player.js.map
