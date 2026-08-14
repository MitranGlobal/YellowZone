'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Gradient Waves — the raymarched plasma background from
 * https://reactbits.dev/backgrounds/gradient-waves
 *
 * The published component ships against `ogl`. The fragment shader below is
 * that component's shader carried over unchanged; only the plumbing is
 * rewritten so it runs on Three.js / React Three Fiber / Drei per the project
 * stack. Drei's `shaderMaterial` builds the material class, R3F drives the
 * clock and resize, and the program is compiled as GLSL3 so the original
 * `#version 300 es` source works as written.
 *
 * Colour is the YellowZone palette: a gold swell resolving into a white
 * horizon, so the waves dissolve into the page rather than sitting on top
 * of it.
 */

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2  iResolution;
  uniform float iTime;
  uniform float uSpeed;
  uniform float uAmplitude;
  uniform float uWaveScale;
  uniform float uWaveRatio;
  uniform float uSwell;
  uniform float uTurbulence;
  uniform float uTilt;
  uniform float uZoom;
  uniform float uHeight;
  uniform float uFogDepth;
  uniform float uSteps;
  uniform float uBrightness;
  uniform float uOpacity;
  uniform float uGrain;
  uniform float uGrainIntensity;
  uniform vec2  uMouse;
  uniform float uParallax;
  uniform bool  uEnableMouse;
  uniform vec3  uHorizonColor;
  uniform vec3  uWaveColor;
  uniform vec3  uCrestColor;

  out vec4 fragColor;

  const float MAX_DIST = 20000.0;

  float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float plasma(vec3 r, vec2 freq, vec4 tc) {
    float mx = r.x + tc.x;
    mx += uSwell * sin((r.y + mx) / 20.0 + tc.y);
    float my = r.y - tc.z;
    my += uTurbulence * cos(r.x / 23.0 + tc.w);
    return r.z - (sin(mx * freq.x) * uAmplitude + sin(my * freq.y) * uAmplitude + uHeight);
  }

  float raymarch(vec3 pos, vec3 dir, vec2 freq, vec4 tc) {
    float dist = 0.0;
    for (int i = 0; i < 128; i++) {
      if (float(i) >= uSteps) break;
      float dscene = plasma(pos + dist * dir, freq, tc);
      if (abs(dscene) < 0.1) break;
      dist += 0.9 * dscene;
      if (!(abs(dist) < MAX_DIST)) return MAX_DIST;
    }
    return dist;
  }

  void main() {
    float T = iTime * uSpeed;
    vec2 freq = vec2(uWaveScale / 7.0, (uWaveScale * uWaveRatio) / 3.0);
    vec4 tc = vec4(T / 0.130, T / 0.810, T / 0.200, T / 0.710);
    float c, s;
    float vfov = (3.14159 / 2.3) / max(uZoom, 0.05);
    vec3 cam = vec3(0.0, 0.0, 30.0);
    vec2 uv = (gl_FragCoord.xy / iResolution.xy) - 0.5;
    uv.x *= iResolution.x / iResolution.y;
    uv.y *= -1.0;

    vec3 dir = vec3(0.0, 0.0, -1.0);
    float ulen = length(uv);
    float xrot = vfov * ulen;
    c = cos(xrot); s = sin(xrot);
    dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
    vec2 nuv = ulen > 1e-5 ? uv / ulen : vec2(1.0, 0.0);
    c = nuv.x; s = nuv.y;
    dir = mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0) * dir;
    c = cos(uTilt); s = sin(uTilt);
    dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;

    if (uEnableMouse) {
      float yaw   = (uMouse.x - 0.5) * uParallax * 0.4;
      float pitch = (uMouse.y - 0.5) * uParallax * 0.4;
      c = cos(yaw); s = sin(yaw);
      dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;
      c = cos(pitch); s = sin(pitch);
      dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
    }

    float dist = raymarch(cam, dir, freq, tc);
    vec3 pos = cam + dist * dir;

    float t = clamp(uFogDepth / max(dist, 0.001), 0.0, 1.0);
    vec3 body = mix(uWaveColor, uCrestColor, clamp(pos.z * 0.08 + 0.5, 0.0, 1.0));
    vec3 col = mix(uHorizonColor, body, t);
    col *= uBrightness;
    col = clamp(col, 0.0, 1.0);

    float alpha = clamp(t, 0.0, 1.0) * uOpacity;
    if (uGrain > 0.5) {
      float g = hash21(gl_FragCoord.xy + mod(iTime, 64.0) * 11.0);
      alpha += (g - 0.5) * uGrainIntensity;
    }
    alpha = clamp(alpha, 0.0, 1.0);
    fragColor = vec4(col * alpha, alpha);
  }
`;

const GradientWavesMaterial = shaderMaterial(
  {
    iResolution: new THREE.Vector2(1, 1),
    iTime: 0,
    uSpeed: 0.32,
    uAmplitude: 2.5,
    uWaveScale: 0.6,
    uWaveRatio: 0.9,
    uSwell: 35,
    uTurbulence: 20,
    uTilt: 1.11,
    uZoom: 1.0,
    uHeight: 5.5,
    uFogDepth: 48,
    uSteps: 70,
    uBrightness: 1.0,
    uOpacity: 1.0,
    uGrain: 1.0,
    uGrainIntensity: 0.035,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uParallax: 0.5,
    uEnableMouse: true,
    // Gold body, near-white crests, white horizon.
    uHorizonColor: new THREE.Color('#FFFFFF'),
    uWaveColor: new THREE.Color('#E8A317'),
    uCrestColor: new THREE.Color('#FFFFFF'),
  },
  vertexShader,
  fragmentShader,
  (material) => {
    if (!material) return;
    const mat = material as THREE.ShaderMaterial;
    mat.glslVersion = THREE.GLSL3;
    mat.transparent = true;
    mat.depthWrite = false;
    mat.depthTest = false;
    // The shader emits premultiplied alpha.
    mat.blending = THREE.CustomBlending;
    mat.blendSrc = THREE.OneFactor;
    mat.blendDst = THREE.OneMinusSrcAlphaFactor;
  }
);

extend({ GradientWavesMaterial });

function Waves() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { size, gl } = useThree();

  const target = useRef<[number, number]>([0.5, 0.5]);
  const current = useRef<[number, number]>([0.5, 0.5]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current = [
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      ];
    };
    const onLeave = () => {
      target.current = [0.5, 0.5];
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    const dpr = gl.getPixelRatio();
    (mat.uniforms.iResolution.value as THREE.Vector2).set(
      size.width * dpr,
      size.height * dpr
    );
  }, [size, gl]);

  useFrame(({ clock }) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.iTime.value = clock.getElapsedTime();
    const [tx, ty] = target.current;
    current.current[0] += 0.05 * (tx - current.current[0]);
    current.current[1] += 0.05 * (ty - current.current[1]);
    (mat.uniforms.uMouse.value as THREE.Vector2).set(
      current.current[0],
      current.current[1]
    );
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      {/* @ts-expect-error -- element registered at runtime via extend() */}
      <gradientWavesMaterial ref={materialRef} />
    </mesh>
  );
}

export default function HeroScene() {
  const [mode, setMode] = useState<'pending' | 'still' | 'live'>('pending');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsWebgl2 = (() => {
      try {
        return !!document.createElement('canvas').getContext('webgl2');
      } catch {
        return false;
      }
    })();
    setMode(reduced || !supportsWebgl2 ? 'still' : 'live');
  }, []);

  // Static gold wash: the reduced-motion and no-WebGL2 fallback, and what
  // renders on the server so the hero never flashes empty.
  const Still = (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_18%,#F6E8C2_0%,#FDF7E6_38%,#FFFFFF_72%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/70 to-transparent" />
    </>
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {mode === 'live' ? (
        <>
          <Canvas
            orthographic
            camera={{ position: [0, 0, 1], zoom: 1 }}
            dpr={[1, 2]}
            gl={{ antialias: false, alpha: true, premultipliedAlpha: true }}
            style={{ background: 'transparent' }}
          >
            <Waves />
          </Canvas>
          {/* Legibility scrim. The headline column sits over the calm left
              side; the swell is pulled back to white at the fold. */}
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
        </>
      ) : (
        Still
      )}
    </div>
  );
}
