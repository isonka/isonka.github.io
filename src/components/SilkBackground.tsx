import { useEffect, useRef } from 'react';
import { isPrerender } from '../utils/prerender';
import '../styles/SilkBackground.css';

const FRAME_MS = 1000 / 15;

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2 uRes;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime * 0.12;
  float t2 = uTime * 0.19;

  vec2 drift = vec2(
    sin(t * 0.62) * 0.32 + cos(t2 * 0.35) * 0.12,
    cos(t * 0.48) * 0.26 + sin(t2 * 0.3) * 0.1
  );

  vec2 q = p * 1.85 + drift;
  float n1 = fbm(q + vec2(t * 0.38, -t * 0.28));
  float n2 = fbm(q * 1.35 + vec2(n1 * 1.4, t2 * 0.2));

  float folds = smoothstep(0.28, 0.72, n2);
  float breath = 0.5 + 0.5 * sin(t * 1.05 + n1 * 4.0);

  vec3 paper = vec3(1.0, 0.996, 0.978);
  vec3 gold = vec3(0.98, 0.86, 0.28);
  vec3 deep = vec3(0.92, 0.76, 0.18);

  vec3 col = mix(paper, mix(paper, gold, 0.35), n1 * 0.75);
  col = mix(col, mix(paper, gold, 0.55), folds * (0.5 + 0.15 * breath));
  col = mix(col, mix(paper, deep, 0.35), smoothstep(0.62, 0.9, n1) * 0.28);
  col = mix(col, gold, smoothstep(0.6, 0.92, n2) * (0.12 + 0.08 * breath));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function isSoftwareRenderer(gl: WebGLRenderingContext) {
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  if (!ext) return false;
  const vendor = String(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || '');
  const renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '');
  return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(`${vendor} ${renderer}`);
}

function startSilk(canvas: HTMLCanvasElement, motion: MediaQueryList) {
  const gl = (
    canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    }) || canvas.getContext('experimental-webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    })
  ) as WebGLRenderingContext | null;
  if (!gl) return () => {};

  if (isSoftwareRenderer(gl)) {
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return () => {};
  }

  const wrap = canvas.parentElement;
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return () => {};

  const program = gl.createProgram();
  if (!program) return () => {};
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return () => {};
  gl.useProgram(program);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const loc = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(program, 'uTime');
  const uRes = gl.getUniformLocation(program, 'uRes');

  let raf = 0;
  let running = !document.hidden;
  let lastDraw = 0;
  const start = performance.now();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
    const w = Math.max(1, Math.floor(window.innerWidth * dpr));
    const h = Math.max(1, Math.floor(window.innerHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
  };

  const frame = (now: number) => {
    if (!running) {
      raf = 0;
      return;
    }
    raf = requestAnimationFrame(frame);
    if (now - lastDraw < FRAME_MS) return;
    lastDraw = now;
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const onVis = () => {
    running = !document.hidden && !motion.matches;
    if (running && raf === 0) raf = requestAnimationFrame(frame);
  };
  const onMotion = () => {
    running = !motion.matches && !document.hidden;
    if (running && raf === 0) raf = requestAnimationFrame(frame);
    if (!running) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  wrap?.classList.add('instructors-silk-wrap--gl');
  resize();
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform1f(uTime, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  lastDraw = performance.now();
  raf = requestAnimationFrame(frame);
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', onVis);
  motion.addEventListener('change', onMotion);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVis);
    motion.removeEventListener('change', onMotion);
    wrap?.classList.remove('instructors-silk-wrap--gl');
    gl.deleteBuffer(buf);
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
  };
}

export const SilkBackground= () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isPrerender()) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 900px)');
    if (motion.matches || narrow.matches) return;

    let cancelled = false;
    let stopSilk: (() => void) | undefined;

    const start = () => {
      const canvas = canvasRef.current;
      if (cancelled || stopSilk || !canvas) return;
      if (motion.matches || narrow.matches) return;
      stopSilk = startSilk(canvas, motion);
    };

    const events = ['pointerdown', 'keydown'] as const;
    events.forEach((event) =>
      window.addEventListener(event, start, { once: true, passive: true }),
    );

    return () => {
      cancelled = true;
      events.forEach((event) => window.removeEventListener(event, start));
      stopSilk?.();
    };
  }, []);

  return (
    <div className="instructors-silk-wrap" aria-hidden="true">
      <div className="instructors-silk-fallback" />
      <canvas ref={canvasRef} className="instructors-silk" />
    </div>
  );
};
