"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CLUSTER_COLORS = [
  new THREE.Color("#78a0ff"),
  new THREE.Color("#7dd8b2"),
  new THREE.Color("#f2b86b"),
  new THREE.Color("#bd91ff"),
];

const DIM_COLOR = new THREE.Color("#344058");

const CLUSTER_CENTERS = [
  new THREE.Vector3(-2.15, 1.35, 0),
  new THREE.Vector3(2.1, 1.25, -0.25),
  new THREE.Vector3(-2.0, -1.4, 0.2),
  new THREE.Vector3(2.15, -1.35, -0.1),
];

const MODE_TO_CLUSTER = {
  revenue: 0,
  customer: 1,
  operations: 2,
  risk: 3,
};

function createRandom(seed = 9137) {
  let value = seed;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function randomInSphere(random, radius = 1) {
  const theta = random() * Math.PI * 2;
  const phi = Math.acos(2 * random() - 1);
  const distance = Math.cbrt(random()) * radius;

  return new THREE.Vector3(
    distance * Math.sin(phi) * Math.cos(theta),
    distance * Math.sin(phi) * Math.sin(theta),
    distance * Math.cos(phi)
  );
}

export default function ConstellationScene({
  mode = "raw",
  reduceMotion = false,
}) {
  const pointsRef = useRef(null);
  const linesRef = useRef(null);
  const coreRef = useRef(null);
  const groupRef = useRef(null);
  const { pointer } = useThree();

  const constellation = useMemo(() => {
    const random = createRandom();
    const count = 128;

    const rawPositions = new Float32Array(count * 3);
    const structuredPositions = new Float32Array(count * 3);
    const clusterFocusPositions = {
      revenue: new Float32Array(count * 3),
      customer: new Float32Array(count * 3),
      operations: new Float32Array(count * 3),
      risk: new Float32Array(count * 3),
    };

    const clusters = new Uint8Array(count);
    const currentPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const i3 = index * 3;
      const cluster = index % 4;
      clusters[index] = cluster;

      const raw = randomInSphere(random, 4.7);
      raw.x += (random() - 0.5) * 2.2;
      raw.y += (random() - 0.5) * 1.2;

      rawPositions[i3] = raw.x;
      rawPositions[i3 + 1] = raw.y;
      rawPositions[i3 + 2] = raw.z;

      currentPositions[i3] = raw.x;
      currentPositions[i3 + 1] = raw.y;
      currentPositions[i3 + 2] = raw.z;

      const local = randomInSphere(random, 0.88);
      const center = CLUSTER_CENTERS[cluster];

      structuredPositions[i3] = center.x + local.x;
      structuredPositions[i3 + 1] = center.y + local.y;
      structuredPositions[i3 + 2] = center.z + local.z * 0.7;

      Object.entries(MODE_TO_CLUSTER).forEach(([modeName, focusCluster]) => {
        const focused = clusterFocusPositions[modeName];

        if (cluster === focusCluster) {
          const focusLocal = randomInSphere(random, 1.65);
          focused[i3] = focusLocal.x;
          focused[i3 + 1] = focusLocal.y;
          focused[i3 + 2] = focusLocal.z * 0.85;
        } else {
          const direction = CLUSTER_CENTERS[cluster].clone().normalize();
          const sideLocal = randomInSphere(random, 0.45);

          focused[i3] = direction.x * 5.2 + sideLocal.x;
          focused[i3 + 1] = direction.y * 3.8 + sideLocal.y;
          focused[i3 + 2] = direction.z * 2.2 + sideLocal.z;
        }
      });

      const initialColor = CLUSTER_COLORS[cluster];
      colors[i3] = initialColor.r;
      colors[i3 + 1] = initialColor.g;
      colors[i3 + 2] = initialColor.b;
    }

    const pairCount = 86;
    const pairs = [];

    for (let index = 0; index < pairCount; index += 1) {
      const first = index % count;
      let second = (first + 4 + (index % 7) * 4) % count;

      if (clusters[first] !== clusters[second]) {
        second = (first + 4) % count;
      }

      pairs.push([first, second]);
    }

    return {
      count,
      rawPositions,
      structuredPositions,
      clusterFocusPositions,
      currentPositions,
      colors,
      clusters,
      pairs,
    };
  }, []);

  const pointGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(constellation.currentPositions, 3)
    );

    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(constellation.colors, 3)
    );

    return geometry;
  }, [constellation]);

  const lineGeometry = useMemo(() => {
    const positions = new Float32Array(constellation.pairs.length * 6);
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return geometry;
  }, [constellation]);

  useFrame((state, delta) => {
    const pointPositionAttribute = pointGeometry.getAttribute("position");
    const pointColorAttribute = pointGeometry.getAttribute("color");
    const current = pointPositionAttribute.array;
    const colors = pointColorAttribute.array;

    let target = constellation.rawPositions;

    if (mode === "structured") {
      target = constellation.structuredPositions;
    } else if (constellation.clusterFocusPositions[mode]) {
      target = constellation.clusterFocusPositions[mode];
    }

    const focusedCluster = MODE_TO_CLUSTER[mode];
    const smoothing = reduceMotion
      ? 1
      : 1 - Math.pow(0.0015, Math.min(delta, 0.05));

    for (let index = 0; index < constellation.count; index += 1) {
      const i3 = index * 3;

      current[i3] = THREE.MathUtils.lerp(
        current[i3],
        target[i3],
        smoothing
      );
      current[i3 + 1] = THREE.MathUtils.lerp(
        current[i3 + 1],
        target[i3 + 1],
        smoothing
      );
      current[i3 + 2] = THREE.MathUtils.lerp(
        current[i3 + 2],
        target[i3 + 2],
        smoothing
      );

      const cluster = constellation.clusters[index];
      const baseColor =
        focusedCluster === undefined || cluster === focusedCluster
          ? CLUSTER_COLORS[cluster]
          : DIM_COLOR;

      colors[i3] = THREE.MathUtils.lerp(
        colors[i3],
        baseColor.r,
        smoothing
      );
      colors[i3 + 1] = THREE.MathUtils.lerp(
        colors[i3 + 1],
        baseColor.g,
        smoothing
      );
      colors[i3 + 2] = THREE.MathUtils.lerp(
        colors[i3 + 2],
        baseColor.b,
        smoothing
      );
    }

    pointPositionAttribute.needsUpdate = true;
    pointColorAttribute.needsUpdate = true;

    const linePositions = lineGeometry.getAttribute("position").array;

    constellation.pairs.forEach(([first, second], pairIndex) => {
      const first3 = first * 3;
      const second3 = second * 3;
      const lineIndex = pairIndex * 6;

      linePositions[lineIndex] = current[first3];
      linePositions[lineIndex + 1] = current[first3 + 1];
      linePositions[lineIndex + 2] = current[first3 + 2];

      linePositions[lineIndex + 3] = current[second3];
      linePositions[lineIndex + 4] = current[second3 + 1];
      linePositions[lineIndex + 5] = current[second3 + 2];
    });

    lineGeometry.getAttribute("position").needsUpdate = true;

    if (!reduceMotion && groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.22,
        0.045
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.14,
        0.045
      );
    }

    if (coreRef.current) {
      const visible = mode !== "raw";
      const targetScale = visible ? 1 : 0.28;

      coreRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        reduceMotion ? 1 : 0.07
      );

      if (!reduceMotion) {
        coreRef.current.rotation.x += delta * 0.18;
        coreRef.current.rotation.y += delta * 0.24;
      }
    }

    if (!reduceMotion && pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.018;
    }

    if (linesRef.current?.material) {
      const targetOpacity = mode === "raw" ? 0.08 : 0.22;
      linesRef.current.material.opacity = THREE.MathUtils.lerp(
        linesRef.current.material.opacity,
        targetOpacity,
        0.06
      );
    }

    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointGeometry}>
        <pointsMaterial
          size={0.075}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#6f91ee"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </lineSegments>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          color="#4e7cff"
          emissive="#17398c"
          emissiveIntensity={1.5}
          metalness={0.45}
          roughness={0.25}
          transparent
          opacity={0.9}
          wireframe
        />
      </mesh>

      <pointLight position={[0, 0, 2]} intensity={7} color="#4f7cff" />
      <ambientLight intensity={0.75} />
    </group>
  );
}