import { useEffect, useRef } from 'react';
import { isPrerender } from '../utils/prerender';
import '../styles/SilkBackground.css';

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
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.03;
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

  float warp = fbm(q * 0.85 + vec2(t * 0.34, -t * 0.22));
  vec2 w = q + vec2(warp * 1.7, warp * 1.4);

  float n1 = fbm(w + vec2(t * 0.38, -t * 0.28));
  float n2 = fbm(w * 1.28 + vec2(n1 * 2.1, t2 * 0.18));
  float n3 = fbm(w * 1.9 - vec2(t * 0.22, n2 * 1.4));

  float folds = smoothstep(0.32, 0.68, n2);
  float ridges = smoothstep(0.48, 0.82, n3);
  float breath = 0.5 + 0.5 * sin(t * 1.05 + n1 * 4.0);

  vec3 paper = vec3(1.0, 0.996, 0.978);
  vec3 gold = vec3(0.98, 0.86, 0.28);
  vec3 deep = vec3(0.92, 0.76, 0.18);

  vec3 col = mix(paper, mix(paper, gold, 0.32), n1 * 0.7);
  col = mix(col, mix(paper, gold, 0.55), folds * (0.55 + 0.12 * breath));
  col = mix(col, mix(paper, deep, 0.4), ridges * 0.3);
  col = mix(col, gold, smoothstep(0.65, 0.92, n2) * (0.14 + 0.07 * breath));

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

export const SilkBackground= () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isPrerender()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;
    if (window.matchMedia('(max-width: 900px)').matches) return;

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
    if (!gl) return;

    const wrap = canvas.parentElement;
    wrap?.classList.add('instructors-silk-wrap--gl');

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
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
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
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

    resize();
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
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
  }, []);

  return (
    <div className="instructors-silk-wrap" aria-hidden="true">
      <div className="instructors-silk-fallback" />
      <canvas ref={canvasRef} className="instructors-silk" />
    </div>
  );
};
