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
   * Simple Pub/Sub Event System
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
        this.events[event].forEach(function (listener) {
          return listener.apply(void 0, args);
        });
      }

      // Allow multiple events to be registered at once
    }, {
      key: "onAny",
      value: function onAny(events, listener) {
        var _this2 = this;
        events.forEach(function (event) {
          return _this2.on(event, listener);
        });
      }
    }]);
  }();

  /**
   * Base Component Class
   */
  var Component = /*#__PURE__*/function () {
    function Component(player) {
      _classCallCheck(this, Component);
      this.player = player;
      this.el = null;
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
       */
    }, {
      key: "mount",
      value: function mount(container) {
        if (!this.el) {
          this.el = this.create();
        }
        container.appendChild(this.el);
      }

      /**
       * Destroy the component and remove from DOM
       */
    }, {
      key: "destroy",
      value: function destroy() {
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
    }, {
      key: "createElement",
      value: function createElement(tag, className) {
        var el = document.createElement(tag);
        if (className) el.className = className;
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
        var btn = this.createElement('button', 'vp-button vp-button--play');
        btn.innerHTML = this.getIcon(false);
        btn.onclick = this.onClick;

        // Listen to player state changes
        this.player.on('play', this.onPlay);
        this.player.on('pause', this.onPause);
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
        this.el.innerHTML = this.getIcon(true);
        this.el.classList.add('vp-button--active');
      }
    }, {
      key: "onPause",
      value: function onPause() {
        this.el.innerHTML = this.getIcon(false);
        this.el.classList.remove('vp-button--active');
      }
    }, {
      key: "getIcon",
      value: function getIcon(isPlaying) {
        return isPlaying ? '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>' // Pause icon
        : '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>'; // Play icon
      }
    }]);
  }(Component);

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    var date = new Date(seconds * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return "".concat(hh, ":").concat(mm.toString().padStart(2, '0'), ":").concat(ss);
    }
    return "".concat(mm, ":").concat(ss);
  }

  var ProgressBar = /*#__PURE__*/function (_Component) {
    function ProgressBar(player) {
      var _this;
      _classCallCheck(this, ProgressBar);
      _this = _callSuper(this, ProgressBar, [player]);
      _this.isDragging = false;

      // Bind methods
      _this.onTimeUpdate = _this.onTimeUpdate.bind(_this);
      _this.onMouseDown = _this.onMouseDown.bind(_this);
      _this.onMouseMove = _this.onMouseMove.bind(_this);
      _this.onMouseUp = _this.onMouseUp.bind(_this);
      return _this;
    }
    _inherits(ProgressBar, _Component);
    return _createClass(ProgressBar, [{
      key: "create",
      value: function create() {
        // The mounting point (in Controls.js) is .vp-timeline-container
        // So here we create .vp-timeline
        var timeline = this.createElement('div', 'vp-timeline');
        this.progressBar = this.createElement('div', 'vp-progress-bar');

        // Handle is just visual in legacy CSS (pseudo-element on progress-bar::after)
        // But here we might want an explicit element or stick to CSS.
        // Legacy CSS used: .progress-bar::after for handle.
        // My controls.css uses: .vp-progress-handle element.
        this.progressHandle = this.createElement('div', 'vp-progress-handle');
        this.progressBar.appendChild(this.progressHandle);
        timeline.appendChild(this.progressBar);

        // Events
        this.player.on('timeupdate', this.onTimeUpdate);

        // Time Preview
        this.timePreview = this.createElement('div', 'vp-time-preview');
        timeline.appendChild(this.timePreview);

        // Attach events for preview
        timeline.addEventListener('mousemove', this.onMouseMovePreview.bind(this));

        // Attach events to the timeline element for seeking
        timeline.addEventListener('mousedown', this.onMouseDown);

        // Save refernece
        this.timeline = timeline;
        return timeline;
      }
    }, {
      key: "onMouseMovePreview",
      value: function onMouseMovePreview(e) {
        var rect = this.timeline.getBoundingClientRect();
        var pos = (e.clientX - rect.left) / rect.width;
        var time = pos * this.player.video.duration;
        this.timePreview.textContent = formatTime(time);
        // Position it
        var previewX = e.clientX - rect.left;
        this.timePreview.style.left = "".concat(previewX, "px");
        this.timePreview.style.transform = 'translateX(-50%)';
      }
    }, {
      key: "onTimeUpdate",
      value: function onTimeUpdate() {
        if (this.isDragging) return;
        var percent = this.player.video.currentTime / this.player.video.duration * 100 || 0;
        this.updateUI(percent);
      }
    }, {
      key: "updateUI",
      value: function updateUI(percent) {
        this.progressBar.style.width = "".concat(percent, "%");
        // Handle moves with the end of the bar naturally if appended to it?
        // If handle is absolute right: -6px of the bar, then yes.
        // My CSS: .vp-progress-handle { right: -6px; top: 50%; ... }
        // So just changing bar width is enough.
      }
    }, {
      key: "onMouseDown",
      value: function onMouseDown(e) {
        this.isDragging = true;
        this.updateFromEvent(e);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);

        // Optional: Pause while dragging? 
        // this.wasPlaying = !this.player.video.paused;
        // if (this.wasPlaying) this.player.pause();
      }
    }, {
      key: "onMouseMove",
      value: function onMouseMove(e) {
        if (!this.isDragging) return;
        this.updateFromEvent(e);
      }
    }, {
      key: "onMouseUp",
      value: function onMouseUp(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);

        // Final seek
        this.updateFromEvent(e);

        // if (this.wasPlaying) this.player.play();
      }
    }, {
      key: "updateFromEvent",
      value: function updateFromEvent(e) {
        var rect = this.timeline.getBoundingClientRect();
        var pos = (e.clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        this.updateUI(pos * 100);
        if (this.player.video.duration) {
          this.player.seek(this.player.video.duration * pos);
        }
      }
    }]);
  }(Component);

  var VolumeControl = /*#__PURE__*/function (_Component) {
    function VolumeControl(player) {
      var _this;
      _classCallCheck(this, VolumeControl);
      _this = _callSuper(this, VolumeControl, [player]);
      _this.onClick = _this.onClick.bind(_this);
      _this.onInput = _this.onInput.bind(_this);
      _this.onVolumeChange = _this.onVolumeChange.bind(_this);
      return _this;
    }
    _inherits(VolumeControl, _Component);
    return _createClass(VolumeControl, [{
      key: "create",
      value: function create() {
        var container = this.createElement('div', 'vp-volume');
        this.btn = this.createElement('button', 'vp-button');
        this.btn.innerHTML = this.getIcon(1);
        this.btn.onclick = this.onClick;
        this.slider = this.createElement('input', 'vp-volume__slider');
        this.slider.type = 'range';
        this.slider.min = 0;
        this.slider.max = 1;
        this.slider.step = 0.1;
        this.slider.value = 1;
        this.slider.oninput = this.onInput;
        container.appendChild(this.btn);
        container.appendChild(this.slider);
        this.player.on('volumechange', this.onVolumeChange);
        return container;
      }
    }, {
      key: "onClick",
      value: function onClick() {
        if (this.player.video.muted) {
          this.player.video.muted = false;
          this.player.setVolume(this.lastVolume || 1);
        } else {
          this.lastVolume = this.player.video.volume;
          this.player.video.muted = true;
          this.player.setVolume(0);
        }
      }
    }, {
      key: "onInput",
      value: function onInput(e) {
        this.player.setVolume(e.target.value);
      }
    }, {
      key: "onVolumeChange",
      value: function onVolumeChange() {
        var volume = this.player.video.volume;
        var isMuted = this.player.video.muted || volume === 0;
        this.slider.value = isMuted ? 0 : volume;
        this.btn.innerHTML = this.getIcon(isMuted ? 0 : volume);
      }
    }, {
      key: "getIcon",
      value: function getIcon(level) {
        if (level === 0) {
          return '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
        } else if (level < 0.5) {
          return '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>';
        } else {
          return '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 9v6h4l5 5V4L9 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
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
        var container = this.createElement('div', 'vp-time-display');
        this.currentObj = this.createElement('span');
        this.currentObj.textContent = '00:00';
        var divider = document.createElement('span');
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
    }, {
      key: "onTimeUpdate",
      value: function onTimeUpdate() {
        this.currentObj.textContent = formatTime(this.player.video.currentTime);
        this.durationObj.textContent = formatTime(this.player.video.duration);
      }
    }]);
  }(Component);

  var FullscreenButton = /*#__PURE__*/function (_Component) {
    function FullscreenButton(player) {
      var _this;
      _classCallCheck(this, FullscreenButton);
      _this = _callSuper(this, FullscreenButton, [player]);
      _this.onClick = _this.onClick.bind(_this);
      return _this;
    }
    _inherits(FullscreenButton, _Component);
    return _createClass(FullscreenButton, [{
      key: "create",
      value: function create() {
        var btn = this.createElement('button', 'vp-button vp-button--fullscreen');
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';
        btn.onclick = this.onClick;
        return btn;
      }
    }, {
      key: "onClick",
      value: function onClick() {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          this.player.container.requestFullscreen();
        }
      }
    }]);
  }(Component);

  var SpeedControl = /*#__PURE__*/function (_Component) {
    function SpeedControl(player) {
      var _this;
      _classCallCheck(this, SpeedControl);
      _this = _callSuper(this, SpeedControl, [player]);
      _this.toggleMenu = _this.toggleMenu.bind(_this);
      _this.onSpeedSelect = _this.onSpeedSelect.bind(_this);
      return _this;
    }
    _inherits(SpeedControl, _Component);
    return _createClass(SpeedControl, [{
      key: "create",
      value: function create() {
        var _this2 = this;
        var container = this.createElement('div', 'vp-speed-control');
        container.style.position = 'relative';
        this.btn = this.createElement('button', 'vp-button');
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/></svg>';
        this.btn.title = 'Playback Speed';
        this.btn.onclick = this.toggleMenu;
        this.menu = this.createElement('div', 'vp-menu');
        var speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        speeds.forEach(function (speed) {
          var item = _this2.createElement('button', 'vp-menu-btn');
          item.textContent = speed + 'x';
          item.dataset.speed = speed;
          if (speed === 1) item.classList.add('vp-selected');
          item.onclick = function (e) {
            return _this2.onSpeedSelect(speed, e);
          };
          _this2.menu.appendChild(item);
        });
        container.appendChild(this.btn);
        container.appendChild(this.menu);

        // Close menu on click outside - basic implementation
        document.addEventListener('click', function (e) {
          if (!container.contains(e.target)) {
            _this2.menu.classList.remove('vp-active');
          }
        });
        return container;
      }
    }, {
      key: "toggleMenu",
      value: function toggleMenu() {
        this.menu.classList.toggle('vp-active');
      }
    }, {
      key: "onSpeedSelect",
      value: function onSpeedSelect(speed, e) {
        this.player.video.playbackRate = speed;

        // Update UI
        Array.from(this.menu.children).forEach(function (child) {
          return child.classList.remove('vp-selected');
        });
        e.target.classList.add('vp-selected');
        this.menu.classList.remove('vp-active');
      }
    }]);
  }(Component);

  var QualityControl = /*#__PURE__*/function (_Component) {
    function QualityControl(player) {
      var _this;
      _classCallCheck(this, QualityControl);
      _this = _callSuper(this, QualityControl, [player]);
      _this.toggleMenu = _this.toggleMenu.bind(_this);
      return _this;
    }
    _inherits(QualityControl, _Component);
    return _createClass(QualityControl, [{
      key: "create",
      value: function create() {
        var _this2 = this;
        var container = this.createElement('div', 'vp-quality-control');
        container.style.position = 'relative';
        this.btn = this.createElement('button', 'vp-button');
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4zm0 13.5h-15a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5zM7.5 15h2v-6h-2v6zm5-6v6h2V9h-2zm5 0v6h2V9h-2z"/></svg>';
        this.btn.title = 'Quality';
        this.btn.onclick = this.toggleMenu;
        this.menu = this.createElement('div', 'vp-menu');

        // Placeholder qualities mirroring legacy options
        var qualities = [{
          label: 'Auto',
          value: 'auto'
        }, {
          label: '1080p',
          value: '1080p'
        }, {
          label: '720p',
          value: '720p'
        }, {
          label: '480p',
          value: '480p'
        }];
        qualities.forEach(function (q) {
          var item = _this2.createElement('button', 'vp-menu-btn');
          item.innerHTML = "<span>".concat(q.label, "</span>").concat(q.value === 'auto' ? '<span style="background:#4facfe;color:white;padding:2px 4px;border-radius:2px;font-size:10px;margin-left:5px">AUTO</span>' : '');
          if (q.value === 'auto') item.classList.add('vp-selected');
          item.onclick = function () {
            return _this2.onQualitySelect(q.value, item);
          };
          _this2.menu.appendChild(item);
        });
        container.appendChild(this.btn);
        container.appendChild(this.menu);
        document.addEventListener('click', function (e) {
          if (!container.contains(e.target)) {
            _this2.menu.classList.remove('vp-active');
          }
        });
        return container;
      }
    }, {
      key: "toggleMenu",
      value: function toggleMenu() {
        this.menu.classList.toggle('vp-active');
      }
    }, {
      key: "onQualitySelect",
      value: function onQualitySelect(quality, element) {
        console.log('Switching quality to:', quality);
        // Dispatch event for VideoPlayer or handle logic if passed options
        // For now just update UI
        Array.from(this.menu.children).forEach(function (child) {
          return child.classList.remove('vp-selected');
        });
        element.classList.add('vp-selected');
        this.menu.classList.remove('vp-active');
      }
    }]);
  }(Component);

  var Captions = /*#__PURE__*/function (_Component) {
    function Captions(player) {
      var _this;
      _classCallCheck(this, Captions);
      _this = _callSuper(this, Captions, [player]);
      _this.toggleMenu = _this.toggleMenu.bind(_this);
      _this.onTimeUpdate = _this.onTimeUpdate.bind(_this);
      _this.tracks = {};
      _this.currentTrack = null;
      _this.cues = [];

      // Mock data from legacy script for demonstration if none provided
      // Real implementation would fetch URLs
      _this.mockCaptions = {
        en: "WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nWelcome to the enhanced video player with caption support!\n\n00:00:05.000 --> 00:00:10.000\nThis player features multiple subtitle languages and customizable styling.\n\n00:00:10.000 --> 00:00:15.000\nYou can adjust the size, color, and background of captions.",
        es: "WEBVTT\n\n00:00:00.000 --> 00:00:05.000\n\xA1Bienvenido al reproductor de video mejorado!\n\n00:00:05.000 --> 00:00:10.000\nEste reproductor incluye m\xFAltiples idiomas."
      };
      return _this;
    }
    _inherits(Captions, _Component);
    return _createClass(Captions, [{
      key: "create",
      value: function create() {
        var _this2 = this;
        var container = this.createElement('div', 'vp-captions-control');
        container.style.position = 'relative';
        this.btn = this.createElement('button', 'vp-button');
        this.btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H7.5v-1.5h-2v3h2V11H11v2H5.5v-4h5.5v2zM19 11h-5.5v4h2v-1.5h2v1.5h1.5v-4h-5.5v2H18v-2h-1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>';
        this.btn.title = 'Captions';
        this.btn.onclick = this.toggleMenu;
        this.menu = this.createElement('div', 'vp-menu');

        // Create Overlay for captions
        this.createOverlay();

        // Populate Menu
        this.populateMenu();
        container.appendChild(this.btn);
        container.appendChild(this.menu);

        // Listeners
        this.player.on('timeupdate', this.onTimeUpdate);
        document.addEventListener('click', function (e) {
          if (!container.contains(e.target)) {
            _this2.menu.classList.remove('vp-active');
          }
        });
        return container;
      }
    }, {
      key: "createOverlay",
      value: function createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'vp-captions-overlay';
        this.overlay.style.display = 'none';
        this.captionText = document.createElement('span');
        this.captionText.className = 'vp-caption-text';
        this.overlay.appendChild(this.captionText);

        // Append to player container (parent of controls usually)
        // We defer this slightly to ensure player.container is ready/accessible
        // But controls is mounted in player.container, so this.player.container should be the root.
        this.player.container.appendChild(this.overlay);
      }
    }, {
      key: "populateMenu",
      value: function populateMenu() {
        var _this3 = this;
        // Off option
        var offBtn = this.createElement('button', 'vp-menu-btn');
        offBtn.textContent = 'Off';
        offBtn.onclick = function () {
          return _this3.setTrack(null);
        };
        if (!this.currentTrack) offBtn.classList.add('vp-selected');
        this.menu.appendChild(offBtn);

        // Mock tracks
        ['en', 'es'].forEach(function (lang) {
          var btn = _this3.createElement('button', 'vp-menu-btn');
          btn.textContent = lang.toUpperCase();
          btn.dataset.lang = lang;
          btn.onclick = function (e) {
            _this3.setTrack(lang);
            Array.from(_this3.menu.children).forEach(function (c) {
              return c.classList.remove('vp-selected');
            });
            e.target.classList.add('vp-selected');
            // Remove selected from 'Off'
            offBtn.classList.remove('vp-selected');
          };
          _this3.menu.appendChild(btn);

          // Parse immediately for mock
          _this3.tracks[lang] = _this3.parseVTT(_this3.mockCaptions[lang]);
        });
      }
    }, {
      key: "toggleMenu",
      value: function toggleMenu() {
        this.menu.classList.toggle('vp-active');
      }
    }, {
      key: "setTrack",
      value: function setTrack(lang) {
        this.currentTrack = lang;
        if (lang) {
          this.cues = this.tracks[lang];
          this.overlay.style.display = 'block';
          this.btn.classList.add('vp-button--active');
        } else {
          this.cues = [];
          this.overlay.style.display = 'none';
          this.btn.classList.remove('vp-button--active');
        }
        this.menu.classList.remove('vp-active');
      }
    }, {
      key: "onTimeUpdate",
      value: function onTimeUpdate() {
        if (!this.currentTrack || !this.cues.length) return;
        var time = this.player.video.currentTime;
        var activeCue = this.cues.find(function (cue) {
          return time >= cue.startTime && time <= cue.endTime;
        });
        if (activeCue) {
          this.captionText.textContent = activeCue.text;
          this.captionText.style.display = 'inline-block';
        } else {
          this.captionText.style.display = 'none';
        }
      }
    }, {
      key: "parseVTT",
      value: function parseVTT(vttContent) {
        var lines = vttContent.split('\n').filter(function (line) {
          return line.trim();
        });
        var cues = [];
        var currentCue = null;
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (line === 'WEBVTT') continue;
          if (line.includes('-->')) {
            var _line$split$map = line.split('-->').map(function (t) {
                return t.trim();
              }),
              _line$split$map2 = _slicedToArray(_line$split$map, 2),
              start = _line$split$map2[0],
              end = _line$split$map2[1];
            currentCue = {
              startTime: this.parseTimeStamp(start),
              endTime: this.parseTimeStamp(end),
              text: ''
            };
          } else if (currentCue && line) {
            currentCue.text += (currentCue.text ? ' ' : '') + line;
            if (i === lines.length - 1 || lines[i + 1].includes('-->') || !lines[i + 1].trim()) {
              cues.push(currentCue);
              currentCue = null;
            }
          }
        }
        return cues;
      }
    }, {
      key: "parseTimeStamp",
      value: function parseTimeStamp(timeStr) {
        var parts = timeStr.split(':');
        var seconds = parts[parts.length - 1].split('.');
        var s = parseInt(seconds[0]) + parseInt(seconds[1] || 0) / 1000;
        if (parts.length === 3) {
          return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + s;
        } else {
          return parseInt(parts[0]) * 60 + s;
        }
      }
    }]);
  }(Component);

  var Controls = /*#__PURE__*/function (_Component) {
    function Controls(player) {
      _classCallCheck(this, Controls);
      return _callSuper(this, Controls, [player]);
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
        controls.appendChild(timelineContainer);

        // 2. Controls Row (Bottom)
        var controlsRow = this.createElement('div', 'vp-controls-row');
        controls.appendChild(controlsRow);

        // -- Left Controls (Volume, Time)
        var leftControls = this.createElement('div', 'vp-controls-left');
        controlsRow.appendChild(leftControls);
        var playBtn = new PlayButton(this.player); // Moving Play to Center optionally, but legacy has it in center usually? 
        // Legacy CSS says: .controls-center { flex: 0 0 auto } which implies Play might be there.
        // Legacy script Step 10 HTML: 
        // controls-center: skip-backward, play-pause, skip-forward.
        // controls-left: volume, time.
        // controls-right: captions, quality, speed, pip, fullscreen.

        // Actually, let's follow that exactly.

        // Volume
        var volumeControl = new VolumeControl(this.player);
        volumeControl.mount(leftControls);

        // Time
        var timeDisplay = new TimeDisplay(this.player);
        timeDisplay.mount(leftControls);

        // -- Center Controls (Skip, Play, Skip)
        var centerControls = this.createElement('div', 'vp-controls-center');
        controlsRow.appendChild(centerControls);

        // TODO: Add Skip Buttons later
        playBtn.mount(centerControls);

        // -- Right Controls (Quality, Speed, Settings, Fullscreen)
        var rightControls = this.createElement('div', 'vp-controls-right');
        controlsRow.appendChild(rightControls);
        var qualityControl = new QualityControl(this.player);
        qualityControl.mount(rightControls);
        var captions = new Captions(this.player);
        captions.mount(rightControls);
        var speedControl = new SpeedControl(this.player);
        speedControl.mount(rightControls);

        // Settings Menu (General) - keeping it but maybe legacy didn't have both?
        // Legacy has: qualityBtn, speedBtn, captionsBtn, pipBtn, fullscreenBtn.
        // It does NOT have a generic 'settings' gear in the same way, but let's keep it or remove if redundant.
        // The requester said "use... behaviors from components".
        // I'll keep generic settings as per my specific instruction earlier, but maybe I should have removed it if it wasn't in legacy.
        // Actually legacy script has "speedMenu", "qualityMenu".
        // I will stick to adding Speed and Quality specifically.

        var fullscreenBtn = new FullscreenButton(this.player);
        fullscreenBtn.mount(rightControls);
        return controls;
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
        theme: 'dark'
      }, config);
      _this.container = typeof _this.config.container === 'string' ? document.querySelector(_this.config.container) : _this.config.container;
      if (!_this.container) {
        throw new Error('VideoPlayer: Container not found');
      }
      _this.video = null;
      _this.controls = null;
      _this.init();
      return _this;
    }
    _inherits(VideoPlayer, _EventEmitter);
    return _createClass(VideoPlayer, [{
      key: "init",
      value: function init() {
        this.container.classList.add('vp-player');

        // Setup Video Element
        var existingVideo = this.container.querySelector('video');
        if (existingVideo) {
          this.video = existingVideo;
          this.video.classList.add('vp-player__video');
          // Allow config to override/set src if not present
          if (this.config.src) this.video.src = this.config.src;
          if (this.config.autoplay) this.video.autoplay = true;
        } else {
          this.video = document.createElement('video');
          this.video.className = 'vp-player__video';
          if (this.config.src) this.video.src = this.config.src;
          if (this.config.autoplay) this.video.autoplay = true;
          this.container.appendChild(this.video);
        }

        // Mount Controls
        if (this.config.controls) {
          this.controlsComponent = new Controls(this);
          this.controlsComponent.mount(this.container);
        }

        // Event Listeners
        this.attachEvents();

        // Initial state
        this.showControls();
      }
    }, {
      key: "attachEvents",
      value: function attachEvents() {
        var _this2 = this;
        // Video Events
        this.video.addEventListener('play', function () {
          _this2.emit('play');
          _this2.hideControlsDelayed();
        });
        this.video.addEventListener('pause', function () {
          _this2.emit('pause');
          _this2.showControls();
        });
        this.video.addEventListener('ended', function () {
          _this2.emit('ended');
          _this2.showControls();
        });
        this.video.addEventListener('timeupdate', function () {
          return _this2.emit('timeupdate');
        });
        this.video.addEventListener('volumechange', function () {
          return _this2.emit('volumechange');
        });
        this.video.addEventListener('loadedmetadata', function () {
          return _this2.emit('loadedmetadata');
        });

        // Mouse Interaction for Controls
        this.container.addEventListener('mouseenter', function () {
          return _this2.showControls();
        });
        this.container.addEventListener('mouseleave', function () {
          return _this2.hideControlsDelayed();
        });
        this.container.addEventListener('mousemove', function () {
          _this2.showControls();
          _this2.hideControlsDelayed();
        });

        // Click to toggle play
        this.video.addEventListener('click', function () {
          return _this2.togglePlay();
        });
      }
    }, {
      key: "showControls",
      value: function showControls() {
        this.container.classList.add('vp-show-controls');
        if (this.controlsTimeout) clearTimeout(this.controlsTimeout);
      }
    }, {
      key: "hideControlsDelayed",
      value: function hideControlsDelayed() {
        var _this3 = this;
        if (this.video.paused) return; // Keep controls visible if paused

        if (this.controlsTimeout) clearTimeout(this.controlsTimeout);
        this.controlsTimeout = setTimeout(function () {
          _this3.container.classList.remove('vp-show-controls');
        }, 3000);
      }
    }, {
      key: "play",
      value: function play() {
        return this.video.play();
      }
    }, {
      key: "pause",
      value: function pause() {
        this.video.pause();
      }
    }, {
      key: "seek",
      value: function seek(time) {
        this.video.currentTime = time;
      }
    }, {
      key: "setVolume",
      value: function setVolume(volume) {
        this.video.volume = Math.max(0, Math.min(1, volume));
        this.video.muted = volume === 0;
      }
    }, {
      key: "togglePlay",
      value: function togglePlay() {
        if (this.video.paused) {
          this.play();
        } else {
          this.pause();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.video.remove();
        if (this.controls) this.controls.destroy();
        this.container.innerHTML = '';
      }
    }]);
  }(EventEmitter);

  return VideoPlayer;

}));
//# sourceMappingURL=video-player.js.map
