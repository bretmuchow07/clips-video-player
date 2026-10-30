/**
 * CursorGrid - Vanilla JavaScript + WebGL2 Component (from React Bits)
 * Ported for vanilla HTML/JS applications and demo landing pages.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CursorGrid = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const INTRO_SECONDS = 1.4;
  const STYLES = { lines: 0, dashed: 1, dots: 2, crosses: 3 };

  const FALLOFF_CURVES = {
    linear: t => t,
    smooth: t => t * t * (3 - 2 * t),
    sharp: t => t * t * t
  };

  const VERTEX = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

  const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uOffset;
uniform float uCellSize;
uniform sampler2D uState;
uniform ivec2 uCells;
uniform vec3 uColor;
uniform vec3 uGridColor;
uniform float uLineWidth;
uniform float uMaxOpacity;
uniform float uFillOpacity;
uniform float uGridOpacity;
uniform float uCellRadius;
uniform float uCellGap;
uniform int uGridStyle;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uSpotlight;
uniform float uPresence;
uniform float uEdgeFade;
uniform float uReveal;

out vec4 outColor;

float level(vec2 cell) {
  if (cell.x < 0.0 || cell.y < 0.0 || cell.x >= float(uCells.x) || cell.y >= float(uCells.y)) return 0.0;
  float v = texelFetch(uState, ivec2(cell), 0).r;
  return v * v * (3.0 - 2.0 * v);
}

float line(float d, float width) {
  float w = max(width, 1.0);
  return clamp(w * 0.5 + 0.5 - d, 0.0, 1.0) * (width / w);
}

float roundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 pos = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
  vec2 g = (pos - uOffset) / uCellSize;
  vec2 cell = floor(g);
  vec2 f = g - cell;
  vec2 edge = min(f, 1.0 - f) * uCellSize;

  float vx = line(edge.x, uLineWidth);
  float vy = line(edge.y, uLineWidth);
  if (uGridStyle == 1) {
    float dash = uCellSize / 6.0;
    vx *= step(0.5, fract((pos.y - uOffset.y) / dash + 0.25));
    vy *= step(0.5, fract((pos.x - uOffset.x) / dash + 0.25));
  } else if (uGridStyle == 2) {
    float r = max(uLineWidth * 1.25, 1.2);
    float d = length(edge);
    vx = clamp(r + 0.5 - d, 0.0, 1.0);
    vy = 0.0;
  } else if (uGridStyle == 3) {
    float arm = uCellSize * 0.1 + uLineWidth;
    vx *= step(edge.y, arm);
    vy *= step(edge.x, arm);
  }
  float mark = max(vx, vy);

  vec2 toMouse = pos - uMouse;
  float spot = exp(-dot(toMouse, toMouse) / max(uRadius * uRadius, 1.0) * 1.6) * uSpotlight * uPresence;

  vec2 center = uResolution * 0.5;
  float reach = length(center);
  float shown = smoothstep(uReveal * (reach + uCellSize * 2.0), uReveal * (reach + uCellSize * 2.0) - uCellSize * 2.0, length(pos - center));
  shown = uReveal >= 1.0 ? 1.0 : shown;

  float fade = 1.0;
  if (uEdgeFade > 0.0) {
    vec2 norm = pos / uResolution;
    vec2 a = clamp(norm / uEdgeFade, 0.0, 1.0);
    vec2 b = clamp((1.0 - norm) / uEdgeFade, 0.0, 1.0);
    vec2 sa = a * a * a * (a * (a * 6.0 - 15.0) + 10.0);
    vec2 sb = b * b * b * (b * (b * 6.0 - 15.0) + 10.0);
    fade = sa.x * sa.y * sb.x * sb.y;
  }

  float own = level(cell);
  float gridAlpha = mark * min(uGridOpacity + spot * 0.45, 1.0) * fade * shown;
  float litAlpha = 0.0;
  float fillAlpha = 0.0;

  if (uCellGap <= 0.0 && uCellRadius <= 0.0) {
    vec2 side = step(0.5, f) * 2.0 - 1.0;
    float nx = level(cell + vec2(side.x, 0.0));
    float ny = level(cell + vec2(0.0, side.y));
    float nc = level(cell + side);
    float ex = max(own, nx);
    float ey = max(own, ny);
    float joint = max(max(ex, ey), nc);
    float lit;
    if (uGridStyle == 2) lit = vx * joint;
    else if (uGridStyle == 3) lit = max(vx * (edge.y < uLineWidth ? joint : ex), vy * (edge.x < uLineWidth ? joint : ey));
    else lit = max(vx * (edge.y < uLineWidth ? joint : ex), vy * (edge.x < uLineWidth ? joint : ey));
    litAlpha = lit * uMaxOpacity;
    fillAlpha = own * uFillOpacity;
  } else if (own > 0.0) {
    vec2 local = (f - 0.5) * uCellSize;
    float halfSize = uCellSize * 0.5 - max(uCellGap, 0.0);
    float radius = min(uCellRadius, halfSize);
    float sd = roundBox(local, vec2(halfSize), radius);
    float inside = clamp(0.5 - sd, 0.0, 1.0);
    float border = line(abs(sd + uLineWidth * 0.5), uLineWidth) * inside;
    litAlpha = border * own * uMaxOpacity;
    fillAlpha = inside * own * uFillOpacity;
  }
  litAlpha *= fade;
  fillAlpha *= fade;

  float cellAlpha = clamp(max(litAlpha, fillAlpha), 0.0, 1.0);
  float alpha = cellAlpha + gridAlpha * (1.0 - cellAlpha);
  vec3 premul = uColor * cellAlpha + uGridColor * gridAlpha * (1.0 - cellAlpha);
  outColor = vec4(premul, alpha);
}`;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const compile = (gl, type, source) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    console.warn('CursorGrid shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  };

  const link = gl => {
    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return null;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('CursorGrid program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    const uniforms = {};
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }
    return { program, uniforms };
  };

  const colorCache = new Map();

  const parseHex = hex => {
    let h = String(hex || '#ffffff')
      .replace('#', '')
      .trim();
    if (h.length === 3 || h.length === 4)
      h = h
        .slice(0, 3)
        .split('')
        .map(c => c + c)
        .join('');
    const num = parseInt(h.slice(0, 6), 16);
    if (Number.isNaN(num)) return [1, 1, 1];
    return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
  };

  const hexToRgb = hex => {
    const key = String(hex);
    const cached = colorCache.get(key);
    if (cached) return cached;
    const rgb = parseHex(hex);
    if (colorCache.size > 64) colorCache.clear();
    colorCache.set(key, rgb);
    return rgb;
  };

  class CursorGrid {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) {
        console.warn('CursorGrid: container element not found');
        return;
      }

      this.options = { ...options };
      this.init();
    }

    init() {
      const container = this.container;
      container.classList.add('cursor-grid');

      let canvas = container.querySelector('.cursor-grid__canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'cursor-grid__canvas';
        canvas.setAttribute('aria-hidden', 'true');
        container.appendChild(canvas);
      }
      this.canvas = canvas;

      const gl = canvas.getContext('webgl2', {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false
      });

      if (!gl) {
        console.warn('CursorGrid: WebGL2 context not available');
        return;
      }
      this.gl = gl;

      const shader = link(gl);
      if (!shader) return;
      this.shader = shader;
      const u = shader.uniforms;
      this.u = u;

      const vao = gl.createVertexArray();
      this.vao = vao;

      const stateTexture = gl.createTexture();
      this.stateTexture = stateTexture;
      gl.bindTexture(gl.TEXTURE_2D, stateTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

      this.reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      this.view = { width: 1, height: 1, ratio: 1, cellSize: 0 };
      this.grid = { cols: 0, rows: 0, offX: 0, offY: 0 };
      this.pointer = { x: 0, y: 0, inside: false };
      this.mouse = { x: 0, y: 0 };
      this.pulses = [];

      this.levels = new Float32Array(0);
      this.waves = new Float32Array(0);
      this.targets = new Float32Array(0);
      this.touched = new Float32Array(0);
      this.pixels = new Uint8Array(0);

      this.presence = 0;
      this.clock = 0;
      this.introClock = (this.options.intro ?? true) && !this.reduceMotion ? 0 : 1;
      this.raf = 0;
      this.last = 0;
      this.visible = true;
      this.dirty = true;

      this.buildSettings();

      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerLeave = this.onPointerLeave.bind(this);
      this.onVisibility = this.onVisibility.bind(this);
      this.frame = this.frame.bind(this);

      this.resizeObserver = new ResizeObserver(() => {
        this.rebuild();
        this.draw();
        this.wake();
      });
      this.resizeObserver.observe(container);

      this.intersectionObserver = new IntersectionObserver(entries => {
        this.visible = entries.some(entry => entry.isIntersecting);
        if (this.visible) this.wake();
      });
      this.intersectionObserver.observe(container);

      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
      window.addEventListener('pointerdown', this.onPointerDown, { passive: true });
      document.documentElement.addEventListener('pointerleave', this.onPointerLeave);
      document.addEventListener('visibilitychange', this.onVisibility);

      this.rebuild();
      if (this.introClock < 1) {
        this.pulses.push({ x: this.view.width / 2, y: this.view.height / 2, t0: 0.15, strength: 0.6 });
      }
      this.draw();
      this.wake();
    }

    buildSettings() {
      const o = this.options;
      const ink = o.lightMode ? '#18181b' : '#ffffff';
      this.settings = {
        cellSize: Math.max(8, o.cellSize ?? 60),
        color: o.color || ink,
        gridColor: o.gridColor || ink,
        radius: Math.max(1, o.radius ?? 140),
        falloff: o.falloff || 'smooth',
        highlight: o.highlight || 'area',
        holdTime: Math.max(0, o.holdTime ?? 400),
        fadeDuration: Math.max(16, o.fadeDuration ?? 800),
        lineWidth: Math.max(0.25, o.lineWidth ?? 1),
        maxOpacity: clamp(o.maxOpacity ?? 1, 0, 1),
        fillOpacity: clamp(o.fillOpacity ?? 0.06, 0, 1),
        gridOpacity: clamp(o.gridOpacity ?? 0.08, 0, 1),
        gridStyle: typeof o.gridStyle === 'number' ? o.gridStyle : (STYLES[o.gridStyle] ?? 0),
        cellRadius: Math.max(0, o.cellRadius ?? 0),
        cellGap: Math.max(0, o.cellGap ?? 0),
        spotlight: clamp(o.spotlight ?? 0.6, 0, 1),
        clickPulse: o.clickPulse ?? true,
        pulseSpeed: Math.max(1, o.pulseSpeed ?? 600),
        ambient: clamp(o.ambient ?? 0, 0, 1),
        edgeFade: clamp(o.edgeFade ?? 0.2, 0, 0.5),
        intro: o.intro ?? true,
        dpr: o.dpr
      };
    }

    update(newOptions = {}) {
      this.options = { ...this.options, ...newOptions };
      const oldCellSize = this.settings.cellSize;
      this.buildSettings();
      if (this.settings.cellSize !== oldCellSize) {
        this.rebuild();
      }
      this.dirty = true;
      this.draw();
      this.wake();
    }

    rebuild() {
      if (!this.gl || !this.container) return;
      const s = this.settings;
      const gl = this.gl;
      const view = this.view;
      const grid = this.grid;

      view.width = Math.max(1, this.container.clientWidth);
      view.height = Math.max(1, this.container.clientHeight);
      view.ratio = Math.min(s.dpr || window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.max(1, Math.round(view.width * view.ratio));
      this.canvas.height = Math.max(1, Math.round(view.height * view.ratio));

      const size = s.cellSize;
      const cols = Math.ceil(view.width / size) + 1;
      const rows = Math.ceil(view.height / size) + 1;
      const resized = cols !== grid.cols || rows !== grid.rows || size !== view.cellSize;

      grid.cols = cols;
      grid.rows = rows;
      grid.offX = (view.width - cols * size) / 2;
      grid.offY = (view.height - rows * size) / 2;
      view.cellSize = size;

      if (resized) {
        this.levels = new Float32Array(cols * rows);
        this.waves = new Float32Array(cols * rows);
        this.targets = new Float32Array(cols * rows);
        this.touched = new Float32Array(cols * rows).fill(-1e9);
        this.pixels = new Uint8Array(cols * rows);
        gl.bindTexture(gl.TEXTURE_2D, this.stateTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, cols, rows, 0, gl.RED, gl.UNSIGNED_BYTE, this.pixels);
      }
      this.dirty = true;
    }

    light(index, value) {
      if (value > this.targets[index]) this.targets[index] = value;
      this.touched[index] = this.clock;
    }

    energize(x, y) {
      const s = this.settings;
      const size = s.cellSize;
      const grid = this.grid;

      if (s.highlight === 'cell') {
        const col = Math.floor((x - grid.offX) / size);
        const row = Math.floor((y - grid.offY) / size);
        if (col >= 0 && row >= 0 && col < grid.cols && row < grid.rows) {
          this.light(row * grid.cols + col, 1);
        }
        return;
      }

      const r = s.radius;
      const ease = FALLOFF_CURVES[s.falloff] ?? FALLOFF_CURVES.linear;
      const minCol = Math.max(0, Math.floor((x - r - grid.offX) / size));
      const maxCol = Math.min(grid.cols - 1, Math.floor((x + r - grid.offX) / size));
      const minRow = Math.max(0, Math.floor((y - r - grid.offY) / size));
      const maxRow = Math.min(grid.rows - 1, Math.floor((y + r - grid.offY) / size));

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const cx = grid.offX + col * size + size / 2;
          const cy = grid.offY + row * size + size / 2;
          const dist = Math.hypot(cx - x, cy - y);
          if (dist > r) continue;
          const value = ease(1 - dist / r);
          if (value > 0) this.light(row * grid.cols + col, value);
        }
      }
    }

    sweepPulses(s) {
      const size = s.cellSize;
      const ahead = size * 0.6;
      const behind = size * 1.4;
      const far = Math.hypot(this.view.width, this.view.height);
      const grid = this.grid;
      this.waves.fill(0);

      for (let k = this.pulses.length - 1; k >= 0; k--) {
        const pulse = this.pulses[k];
        const ringR = (this.clock - pulse.t0) * s.pulseSpeed;
        if (ringR - behind * 2 > far) {
          this.pulses.splice(k, 1);
          continue;
        }
        if (ringR < 0) continue;
        const envelope = pulse.strength * Math.pow(Math.max(0, 1 - ringR / (far + behind)), 0.6);
        const outer = ringR + ahead * 2;
        const minCol = Math.max(0, Math.floor((pulse.x - outer - grid.offX) / size));
        const maxCol = Math.min(grid.cols - 1, Math.floor((pulse.x + outer - grid.offX) / size));
        const minRow = Math.max(0, Math.floor((pulse.y - outer - grid.offY) / size));
        const maxRow = Math.min(grid.rows - 1, Math.floor((pulse.y + outer - grid.offY) / size));

        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            const cx = grid.offX + col * size + size / 2;
            const cy = grid.offY + row * size + size / 2;
            const off = Math.hypot(cx - pulse.x, cy - pulse.y) - ringR;
            if (off > ahead * 2 || off < -behind * 2) continue;
            const t = off > 0 ? off / ahead : off / behind;
            const value = envelope * Math.exp(-t * t);
            const index = row * grid.cols + col;
            if (value > this.waves[index]) this.waves[index] = value;
          }
        }
      }
      this.dirty = true;
    }

    draw() {
      if (!this.gl || !this.shader) return;
      const s = this.settings;
      const gl = this.gl;
      const u = this.u;
      const grid = this.grid;
      const ratio = this.view.ratio;

      gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(this.shader.program);
      gl.bindVertexArray(this.vao);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.stateTexture);

      if (this.dirty) {
        for (let i = 0; i < this.levels.length; i++) {
          this.pixels[i] = Math.round(clamp(Math.max(this.levels[i], this.waves[i]), 0, 1) * 255);
        }
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, grid.cols, grid.rows, gl.RED, gl.UNSIGNED_BYTE, this.pixels);
        this.dirty = false;
      }

      const lineDevice = s.lineWidth * ratio;
      const snap = Math.round(lineDevice) % 2 === 1 ? 0.5 : 0;

      gl.uniform1i(u.uState, 0);
      gl.uniform2f(u.uResolution, this.canvas.width, this.canvas.height);
      gl.uniform2f(u.uOffset, Math.round(grid.offX * ratio) + snap, Math.round(grid.offY * ratio) + snap);
      gl.uniform1f(u.uCellSize, s.cellSize * ratio);
      gl.uniform2i(u.uCells, grid.cols, grid.rows);
      gl.uniform3fv(u.uColor, hexToRgb(s.color));
      gl.uniform3fv(u.uGridColor, hexToRgb(s.gridColor));
      gl.uniform1f(u.uLineWidth, lineDevice);
      gl.uniform1f(u.uMaxOpacity, s.maxOpacity);
      gl.uniform1f(u.uFillOpacity, s.fillOpacity);
      gl.uniform1f(u.uGridOpacity, s.gridOpacity);
      gl.uniform1f(u.uCellRadius, s.cellRadius * ratio);
      gl.uniform1f(u.uCellGap, s.cellGap * ratio);
      gl.uniform1i(u.uGridStyle, s.gridStyle);
      gl.uniform2f(u.uMouse, this.mouse.x * ratio, this.mouse.y * ratio);
      gl.uniform1f(u.uRadius, s.radius * ratio);
      gl.uniform1f(u.uSpotlight, s.spotlight);
      gl.uniform1f(u.uPresence, this.presence);
      gl.uniform1f(u.uEdgeFade, s.edgeFade);
      gl.uniform1f(u.uReveal, this.introClock >= 1 ? 1 : 1 - Math.pow(1 - this.introClock, 2.2));

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindVertexArray(null);
    }

    frame(now) {
      this.raf = 0;
      if (!this.visible || document.hidden) return;

      const s = this.settings;
      const dt = this.last ? clamp((now - this.last) / 1000, 0, 1 / 20) : 1 / 60;
      this.last = now;
      this.clock += dt;
      if (this.introClock < 1) this.introClock = Math.min(1, this.introClock + dt / INTRO_SECONDS);

      const follow = 1 - Math.exp(-dt / 0.07);
      this.mouse.x += (this.pointer.x - this.mouse.x) * follow;
      this.mouse.y += (this.pointer.y - this.mouse.y) * follow;
      const presenceGoal = this.pointer.inside ? 1 : 0;
      this.presence += (presenceGoal - this.presence) * (1 - Math.exp(-dt / 0.25));

      if (s.ambient > 0 && !this.reduceMotion && this.levels.length) {
        const chance = s.ambient * dt * this.levels.length * 0.04;
        let spawns = Math.floor(chance) + (Math.random() < chance % 1 ? 1 : 0);
        while (spawns-- > 0) this.light(Math.floor(Math.random() * this.levels.length), 0.25 + Math.random() * 0.45);
      }

      if (this.pulses.length) {
        this.sweepPulses(s);
      } else if (this.waves.length && this.waves.some(value => value > 0)) {
        this.waves.fill(0);
        this.dirty = true;
      }

      const holdSeconds = s.holdTime / 1000;
      const fadeStep = dt / (s.fadeDuration / 1000);
      const attack = 1 - Math.exp(-dt / 0.045);
      let active = this.pulses.length > 0 || this.introClock < 1 || Math.abs(this.presence - presenceGoal) > 0.002;

      for (let i = 0; i < this.levels.length; i++) {
        let target = this.targets[i];
        if (target <= 0 && this.levels[i] <= 0) continue;
        if (this.clock - this.touched[i] > holdSeconds) target = Math.max(0, target - fadeStep);
        this.targets[i] = target;
        const before = this.levels[i];
        const next = target > before ? before + (target - before) * attack : target;
        this.levels[i] = next < 0.002 ? 0 : next;
        if (this.levels[i] !== before) this.dirty = true;
        if (this.levels[i] > 0 || this.targets[i] > 0) active = true;
      }

      if (Math.abs(this.mouse.x - this.pointer.x) + Math.abs(this.mouse.y - this.pointer.y) > 0.05 && this.presence > 0.002) {
        active = true;
      }
      if (s.ambient > 0 && !this.reduceMotion) active = true;

      this.draw();
      if (active) this.raf = requestAnimationFrame(this.frame);
    }

    wake() {
      if (!this.raf && this.visible && !document.hidden) {
        this.last = 0;
        this.raf = requestAnimationFrame(this.frame);
      }
    }

    locate(event) {
      if (!this.container) return { x: 0, y: 0, inside: false };
      const rect = this.container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      return { x, y, inside: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height };
    }

    onPointerMove(event) {
      const { x, y, inside } = this.locate(event);
      const was = this.pointer.inside;
      this.pointer.inside = inside;
      if (!inside) {
        if (was) this.wake();
        return;
      }
      this.pointer.x = x;
      this.pointer.y = y;
      if (!was) {
        this.mouse.x = x;
        this.mouse.y = y;
      }
      this.energize(x, y);
      this.wake();
    }

    onPointerDown(event) {
      const s = this.settings;
      const { x, y, inside } = this.locate(event);
      if (!inside || !s.clickPulse || this.reduceMotion) return;
      this.pulses.push({ x, y, t0: this.clock, strength: 1 });
      this.wake();
    }

    onPointerLeave() {
      this.pointer.inside = false;
      this.wake();
    }

    onVisibility() {
      this.wake();
    }

    destroy() {
      if (this.raf) cancelAnimationFrame(this.raf);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.intersectionObserver) this.intersectionObserver.disconnect();

      window.removeEventListener('pointermove', this.onPointerMove);
      window.removeEventListener('pointerdown', this.onPointerDown);
      document.documentElement.removeEventListener('pointerleave', this.onPointerLeave);
      document.removeEventListener('visibilitychange', this.onVisibility);

      if (this.gl) {
        this.gl.deleteTexture(this.stateTexture);
        this.gl.deleteVertexArray(this.vao);
        if (this.shader) this.gl.deleteProgram(this.shader.program);
        this.gl.getExtension('WEBGL_lose_context')?.loseContext();
      }

      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
    }
  }

  return CursorGrid;
}));
