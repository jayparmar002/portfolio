import { useEffect, useRef } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';

const Prism = ({
    height = 3.5,
    baseWidth = 5.5,
    glow = 1,
    noise = 0.5,
    transparent = true,
    scale = 3.6,
    hueShift = 0,
    colorFrequency = 1,
    timeScale = 0.5
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const H = Math.max(0.001, height);
        const BW = Math.max(0.001, baseWidth);
        const BASE_HALF = BW * 0.5;
        const GLOW = Math.max(0.0, glow);
        const NOISE = Math.max(0.0, noise);
        const SAT = transparent ? 1.5 : 1;
        const SCALE = Math.max(0.001, scale);
        const HUE = hueShift || 0;
        const CFREQ = Math.max(0.0, colorFrequency || 1);
        const TS = Math.max(0, timeScale || 1);

        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const renderer = new Renderer({
            dpr,
            alpha: transparent,
            antialias: false
        });
        const gl = renderer.gl;
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.BLEND);

        Object.assign(gl.canvas.style, {
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
            display: 'block'
        });
        container.appendChild(gl.canvas);

        const vertex = /* glsl */ `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fragment = /* glsl */ `
      precision highp float;

      uniform vec2  iResolution;
      uniform float iTime;
      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform float uGlow;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x){
        vec4 e2x = exp(2.0*x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co){
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float sdOctaAnisoInv(vec3 p){
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.5773502691896258;
      }

      float sdPyramidUpInv(vec3 p){
        float oct = sdOctaAnisoInv(p);
        float halfSpace = -p.y;
        return max(oct, halfSpace);
      }

      mat3 hueRotation(float a){
        float c = cos(a), s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main(){
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy) * uPxScale;

        float z = 5.0;
        float d = 0.0;
        vec3 p;
        vec4 o = vec4(0.0);

        float centerShift = uCenterShift;
        float cf = uColorFreq;

        const int STEPS = 50;
        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p = uRot * p;
          vec3 q = p;
          q.y += centerShift;
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        o = tanh4(o * o * uGlow / 1e5);

        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);

        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

        if(abs(uHueShift) > 0.0001){
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }

        gl_FragColor = vec4(col, o.a);
      }
    `;

        const geometry = new Triangle(gl);
        const iResBuf = new Float32Array(2);

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                iResolution: { value: iResBuf },
                iTime: { value: 0 },
                uHeight: { value: H },
                uBaseHalf: { value: BASE_HALF },
                uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },
                uGlow: { value: GLOW },
                uNoise: { value: NOISE },
                uSaturation: { value: SAT },
                uScale: { value: SCALE },
                uHueShift: { value: HUE },
                uColorFreq: { value: CFREQ },
                uCenterShift: { value: H * 0.25 },
                uInvBaseHalf: { value: 1 / BASE_HALF },
                uInvHeight: { value: 1 / H },
                uMinAxis: { value: Math.min(BASE_HALF, H) },
                uPxScale: {
                    value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE)
                },
                uTimeScale: { value: TS }
            }
        });
        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            const w = container.clientWidth || 1;
            const h = container.clientHeight || 1;
            renderer.setSize(w, h);
            iResBuf[0] = gl.drawingBufferWidth;
            iResBuf[1] = gl.drawingBufferHeight;
            program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
        };
        const ro = new ResizeObserver(resize);
        ro.observe(container);
        resize();

        const rotBuf = new Float32Array(9);
        const setMat3FromEuler = (yawY, pitchX, rollZ, out) => {
            const cy = Math.cos(yawY), sy = Math.sin(yawY);
            const cx = Math.cos(pitchX), sx = Math.sin(pitchX);
            const cz = Math.cos(rollZ), sz = Math.sin(rollZ);

            out[0] = cy * cz + sy * sx * sz;
            out[1] = cx * sz;
            out[2] = -sy * cz + cy * sx * sz;
            out[3] = -cy * sz + sy * sx * cz;
            out[4] = cx * cz;
            out[5] = sy * sz + cy * sx * cz;
            out[6] = sy * cx;
            out[7] = -sx;
            out[8] = cy * cx;
            return out;
        };

        let raf = 0;
        const t0 = performance.now();

        const rnd = () => Math.random();
        const wX = (0.3 + rnd() * 0.6);
        const wY = (0.2 + rnd() * 0.7);
        const wZ = (0.1 + rnd() * 0.5);
        const phX = rnd() * Math.PI * 2;
        const phZ = rnd() * Math.PI * 2;

        const render = t => {
            const time = (t - t0) * 0.001;
            program.uniforms.iTime.value = time;

            const tScaled = time * TS;
            const yaw = tScaled * wY;
            const pitch = Math.sin(tScaled * wX + phX) * 0.6;
            const roll = Math.sin(tScaled * wZ + phZ) * 0.5;

            program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);
            renderer.render({ scene: mesh });

            raf = requestAnimationFrame(render);
        };

        raf = requestAnimationFrame(render);

        return () => {
            if (raf) cancelAnimationFrame(raf);
            ro.disconnect();
            if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
        };
    }, [height, baseWidth, glow, noise, transparent, scale, hueShift, colorFrequency, timeScale]);

    return <div className="w-full h-full relative" ref={containerRef} />;
};

export default Prism;
