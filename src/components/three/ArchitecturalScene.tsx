import { Float, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

import heroBuildingDark from "@/assets/hero-building-dark-landing.png";
import heroBuildingLight from "@/assets/hero-building-light-landing.png";
import { useTheme } from "@/components/layout/ThemeProvider";

type ChapterKey = "hero" | "product" | "pricing" | "contact";
type Vec3 = [number, number, number];

type CameraState = {
  position: Vec3;
  target: Vec3;
  fov: number;
  roll: number;
  groupPosition: Vec3;
  groupRotation: Vec3;
  groupScale: number;
  overlayOpacity: number;
};

type SliceTransform = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  opacity: number;
};

type BuildingSlice = {
  key: string;
  uv: [number, number, number, number];
  size: Vec3;
  depth: number;
  chapterTransform: Record<ChapterKey, SliceTransform>;
};

type ArchitecturalSceneProps = {
  progressRef: MutableRefObject<number>;
  reducedMotion: boolean;
  compact?: boolean;
};

const CHAPTERS: ChapterKey[] = ["hero", "product", "pricing", "contact"];
const buildingModelUrl = new URL("../../assets/hatosfera-building.gltf", import.meta.url).href;

const CAMERA_STATES: Record<ChapterKey, CameraState> = {
  hero: {
    position: [-0.18, 0.46, 7.35],
    target: [0.72, -0.08, -0.38],
    fov: 31,
    roll: 0.012,
    groupPosition: [0.9, -0.06, -1.16],
    groupRotation: [0.018, -0.16, 0.004],
    groupScale: 0.96,
    overlayOpacity: 0.5,
  },
  product: {
    position: [1.36, 0.22, 5.12],
    target: [0.62, -0.12, -0.92],
    fov: 35,
    roll: -0.028,
    groupPosition: [0.58, -0.1, -1.36],
    groupRotation: [-0.03, 0.32, -0.018],
    groupScale: 1.18,
    overlayOpacity: 0.76,
  },
  pricing: {
    position: [0.44, 0.68, 5.9],
    target: [0.42, -0.26, -1],
    fov: 38,
    roll: 0.02,
    groupPosition: [0.52, -0.18, -1.5],
    groupRotation: [0.02, -0.18, 0.01],
    groupScale: 0.98,
    overlayOpacity: 0.68,
  },
  contact: {
    position: [-0.62, 1.18, 7.22],
    target: [0.28, -0.42, -1.22],
    fov: 34,
    roll: 0.04,
    groupPosition: [0.82, -0.38, -1.82],
    groupRotation: [-0.1, 0.18, 0.018],
    groupScale: 0.82,
    overlayOpacity: 0.52,
  },
};

const MODEL_STATES: Record<ChapterKey, SliceTransform> = {
  hero: transform([1.08, -0.28, 0.2], [0.02, -0.18, 0], [0.84, 0.84, 0.84], 0.58),
  product: transform([0.72, -0.3, 0.58], [-0.03, 0.2, -0.015], [1, 0.98, 1], 0.84),
  pricing: transform([0.58, -0.34, 0.12], [0.03, -0.12, 0.01], [0.86, 0.86, 0.86], 0.68),
  contact: transform([0.72, -0.52, -0.68], [-0.07, 0.12, 0.02], [0.74, 0.74, 0.74], 0.5),
};

const SLICES: BuildingSlice[] = [
  {
    key: "left-terraces",
    uv: [0.07, 0.14, 0.26, 0.62],
    size: [2.05, 2.75, 1],
    depth: 0.52,
    chapterTransform: {
      hero: transform([-1.56, -0.1, 0.1], [0.01, -0.22, 0], [0.95, 0.96, 1], 0.28),
      product: transform([-1.9, -0.14, 0.52], [-0.02, -0.38, 0.02], [1.08, 1.04, 1], 0.46),
      pricing: transform([-2.08, -0.1, -0.05], [0.03, -0.22, 0.03], [0.8, 0.94, 1], 0.34),
      contact: transform([-1.9, -0.34, -0.68], [-0.06, -0.32, 0.03], [0.68, 0.8, 1], 0.24),
    },
  },
  {
    key: "logo-tower",
    uv: [0.32, 0.15, 0.15, 0.58],
    size: [1.1, 2.72, 1],
    depth: 0.7,
    chapterTransform: {
      hero: transform([-0.34, 0.02, 0.56], [0, -0.12, 0.004], [0.96, 1, 1], 0.42),
      product: transform([-0.7, 0.03, 0.86], [-0.02, -0.28, 0.02], [1.08, 1.04, 1], 0.62),
      pricing: transform([-0.72, 0.16, 0.12], [0.02, -0.1, 0.01], [0.86, 0.9, 1], 0.46),
      contact: transform([-0.58, -0.08, -0.62], [-0.06, -0.2, 0.02], [0.68, 0.76, 1], 0.32),
    },
  },
  {
    key: "center-glass",
    uv: [0.44, 0.16, 0.24, 0.56],
    size: [1.92, 2.68, 1],
    depth: 0.46,
    chapterTransform: {
      hero: transform([0.7, 0.03, 0.16], [0.01, 0.02, 0], [1, 1, 1], 0.56),
      product: transform([0.4, 0.0, 0.66], [-0.03, 0.12, 0], [1.1, 1.04, 1], 0.84),
      pricing: transform([-0.03, 0.08, -0.12], [0.02, -0.02, 0], [0.88, 0.96, 1], 0.58),
      contact: transform([0.18, -0.16, -0.72], [-0.08, 0.02, 0], [0.72, 0.8, 1], 0.42),
    },
  },
  {
    key: "right-tower",
    uv: [0.59, 0.2, 0.29, 0.54],
    size: [2.28, 2.62, 1],
    depth: 0.58,
    chapterTransform: {
      hero: transform([1.94, -0.06, 0.02], [0.01, 0.22, 0.004], [1.02, 1, 1], 0.66),
      product: transform([2.0, -0.08, 0.42], [-0.02, 0.38, -0.02], [1.1, 1.04, 1], 0.72),
      pricing: transform([1.58, 0.04, 0.0], [0.02, 0.16, -0.01], [0.9, 0.94, 1], 0.48),
      contact: transform([1.2, -0.18, -0.76], [-0.08, 0.22, -0.01], [0.72, 0.8, 1], 0.36),
    },
  },
  {
    key: "podium",
    uv: [0.12, 0.63, 0.78, 0.24],
    size: [5.65, 1.18, 1],
    depth: 0.34,
    chapterTransform: {
      hero: transform([0.32, -1.38, 0.02], [0.03, 0.02, 0], [0.92, 0.92, 1], 0.32),
      product: transform([0.28, -1.46, 0.46], [0.02, 0.12, 0], [1, 0.96, 1], 0.5),
      pricing: transform([0.22, -1.38, -0.24], [0.02, 0.02, 0], [0.78, 0.86, 1], 0.34),
      contact: transform([0.42, -1.45, -0.88], [-0.02, 0.1, 0], [0.64, 0.72, 1], 0.24),
    },
  },
];

const FLOORPLATES = [
  [-2.28, 0.62, 0.7, 1.62],
  [-2.18, 0.08, 0.72, 1.72],
  [-2.06, -0.48, 0.68, 1.86],
  [-1.86, -0.94, 0.58, 1.82],
  [1.34, 0.32, 0.58, 1.54],
  [1.44, -0.28, 0.5, 1.72],
  [1.7, -0.88, 0.38, 1.92],
] satisfies Array<[number, number, number, number]>;

export function ArchitecturalScene({
  progressRef,
  reducedMotion,
  compact = false,
}: ArchitecturalSceneProps) {
  const { theme } = useTheme();
  const [hasWebgl, setHasWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const contextOptions: WebGLContextAttributes = {
      alpha: true,
      antialias: true,
      failIfMajorPerformanceCaveat: false,
      powerPreference: "default",
    };
    let context: WebGLRenderingContext | WebGL2RenderingContext | null = null;

    try {
      context =
        canvas.getContext("webgl2", contextOptions) ?? canvas.getContext("webgl", contextOptions);
    } catch {
      context = null;
    }

    context?.getExtension("WEBGL_lose_context")?.loseContext();
    setHasWebgl(Boolean(context));
  }, []);

  if (reducedMotion || hasWebgl !== true) {
    return null;
  }

  return (
    <Canvas
      dpr={[1, compact ? 1.15 : 1.7]}
      camera={{
        position: [0, 0.5, compact ? 7.8 : 7.2],
        fov: compact ? 35 : 31,
        near: 0.1,
        far: 80,
      }}
      gl={{
        antialias: true,
        alpha: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference: "default",
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={theme === "dark" ? 1.05 : 1.38} />
        <directionalLight position={[4.4, 4.8, 4.2]} intensity={theme === "dark" ? 2.4 : 1.55} />
        <pointLight position={[-1.6, 1.2, 2.4]} intensity={theme === "dark" ? 2.2 : 0.9} />
        <Architecture progressRef={progressRef} theme={theme} compact={compact} />
      </Suspense>
    </Canvas>
  );
}

function Architecture({
  progressRef,
  theme,
  compact,
}: {
  progressRef: MutableRefObject<number>;
  theme: "dark" | "light";
  compact: boolean;
}) {
  const texture = useBuildingTexture(theme);
  const group = useRef<THREE.Group>(null);
  const opacityRef = useRef(0.7);
  const railRef = useRef(0);

  useFrame((state, delta) => {
    railRef.current = THREE.MathUtils.damp(railRef.current, progressRef.current, 3.8, delta);
    const cameraState = interpolateCamera(railRef.current);
    const camera = state.camera;
    const idle = state.clock.elapsedTime;
    const idleX = Math.sin(idle * 0.7) * (compact ? 0.07 : 0.12);
    const idleY = Math.sin(idle * 0.52) * (compact ? 0.05 : 0.08);
    const idleRotation = Math.sin(idle * 0.42) * (compact ? 0.045 : 0.075);

    camera.position.set(
      damp(camera.position.x, cameraState.position[0], delta),
      damp(camera.position.y, cameraState.position[1], delta),
      damp(camera.position.z, cameraState.position[2], delta),
    );
    camera.rotation.z = damp(camera.rotation.z, cameraState.roll, delta);
    camera.lookAt(vector(cameraState.target));

    if ("fov" in camera) {
      camera.fov = damp(camera.fov, cameraState.fov, delta);
      camera.updateProjectionMatrix();
    }

    opacityRef.current = damp(opacityRef.current, cameraState.overlayOpacity, delta);

    if (group.current) {
      group.current.position.set(
        damp(group.current.position.x, cameraState.groupPosition[0] + idleX, delta),
        damp(group.current.position.y, cameraState.groupPosition[1] + idleY, delta),
        damp(group.current.position.z, cameraState.groupPosition[2], delta),
      );
      group.current.rotation.set(
        damp(group.current.rotation.x, cameraState.groupRotation[0], delta),
        damp(group.current.rotation.y, cameraState.groupRotation[1] + idleRotation, delta),
        damp(group.current.rotation.z, cameraState.groupRotation[2], delta),
      );
      group.current.scale.setScalar(damp(group.current.scale.x, cameraState.groupScale, delta));
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.035} floatIntensity={0.08}>
      <group ref={group}>
        <GltfBuildingModel
          progressRef={progressRef}
          theme={theme}
          opacityRef={opacityRef}
          compact={compact}
        />
        <BuildingRelief
          texture={texture}
          progressRef={progressRef}
          theme={theme}
          opacityRef={opacityRef}
          compact={compact}
        />
        <AnimatedFloorplates
          progressRef={progressRef}
          theme={theme}
          opacityRef={opacityRef}
          compact={compact}
        />
        <GoldTraceLines
          progressRef={progressRef}
          theme={theme}
          opacityRef={opacityRef}
          compact={compact}
        />
        {!compact ? (
          <LightShafts progressRef={progressRef} theme={theme} opacityRef={opacityRef} />
        ) : null}
      </group>
    </Float>
  );
}

function GltfBuildingModel({
  progressRef,
  theme,
  opacityRef,
  compact,
}: {
  progressRef: MutableRefObject<number>;
  theme: "dark" | "light";
  opacityRef: MutableRefObject<number>;
  compact: boolean;
}) {
  const model = useGLTF(buildingModelUrl);
  const scene = useMemo(() => model.scene.clone(true), [model.scene]);
  const group = useRef<THREE.Group>(null);
  const materialRefs = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    const materials: THREE.MeshStandardMaterial[] = [];

    scene.traverse((object) => {
      if (!("isMesh" in object) || !object.isMesh) return;

      const mesh = object as THREE.Mesh;
      mesh.frustumCulled = false;
      const sourceMaterial = mesh.material;
      const material = Array.isArray(sourceMaterial)
        ? sourceMaterial[0]?.clone()
        : sourceMaterial?.clone();

      if (material && "opacity" in material) {
        material.transparent = material.name === "glass" || material.name === "window";
        material.depthWrite = material.name !== "glass";
        mesh.material = material;
        materials.push(material as THREE.MeshStandardMaterial);
      }
    });

    materialRefs.current = materials;

    return () => {
      materials.forEach((material) => material.dispose());
    };
  }, [scene]);

  useFrame((_, delta) => {
    const target = interpolateSlice(MODEL_STATES, progressRef.current);

    if (group.current) {
      group.current.position.set(
        damp(group.current.position.x, target.position[0], delta),
        damp(group.current.position.y, target.position[1], delta),
        damp(group.current.position.z, target.position[2], delta),
      );
      group.current.rotation.set(
        damp(group.current.rotation.x, target.rotation[0], delta),
        damp(group.current.rotation.y, target.rotation[1], delta),
        damp(group.current.rotation.z, target.rotation[2], delta),
      );
      group.current.scale.setScalar(damp(group.current.scale.x, target.scale[0], delta));
    }

    const globalOpacity = target.opacity * opacityRef.current * (compact ? 0.74 : 1);
    materialRefs.current.forEach((material) => {
      if (material.name === "glass") {
        material.opacity = (theme === "dark" ? 0.38 : 0.22) * globalOpacity;
        material.color.set(theme === "dark" ? "#14242a" : "#dce8e7");
        material.emissive.set(theme === "dark" ? "#071216" : "#f0ede5");
        material.emissiveIntensity = theme === "dark" ? 0.34 : 0.12;
        material.transparent = true;
      } else if (material.name === "window") {
        material.opacity = (theme === "dark" ? 0.86 : 0.42) * globalOpacity;
        material.emissive.set(theme === "dark" ? "#ff9f38" : "#c7892d");
        material.emissiveIntensity = theme === "dark" ? 1.6 : 0.72;
        material.transparent = true;
      } else if (material.name === "gold") {
        material.opacity = (theme === "dark" ? 0.92 : 0.58) * globalOpacity;
        material.emissive.set(theme === "dark" ? "#d38b29" : "#9a6a1f");
        material.emissiveIntensity = theme === "dark" ? 0.46 : 0.2;
        material.transparent = true;
      } else {
        material.opacity = globalOpacity;
        material.transparent = globalOpacity < 0.98;
      }
      material.needsUpdate = true;
    });
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

function BuildingRelief({
  texture,
  progressRef,
  theme,
  opacityRef,
  compact,
}: {
  texture: THREE.Texture;
  progressRef: MutableRefObject<number>;
  theme: "dark" | "light";
  opacityRef: MutableRefObject<number>;
  compact: boolean;
}) {
  const slices = compact
    ? SLICES.filter((slice) => slice.key !== "left-terraces" && slice.key !== "podium")
    : SLICES;

  return (
    <group>
      {slices.map((slice) => (
        <BuildingSliceMesh
          key={slice.key}
          slice={slice}
          texture={texture}
          progressRef={progressRef}
          theme={theme}
          opacityRef={opacityRef}
          compact={compact}
        />
      ))}
    </group>
  );
}

function BuildingSliceMesh({
  slice,
  texture,
  progressRef,
  theme,
  opacityRef,
  compact,
}: {
  slice: BuildingSlice;
  texture: THREE.Texture;
  progressRef: MutableRefObject<number>;
  theme: "dark" | "light";
  opacityRef: MutableRefObject<number>;
  compact: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const imageMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const depthMaterial = useRef<THREE.MeshPhysicalMaterial>(null);
  const sliceTexture = useSliceTexture(texture, slice.uv);

  useFrame((_, delta) => {
    const target = interpolateSlice(slice.chapterTransform, progressRef.current);

    if (group.current) {
      group.current.position.set(
        damp(group.current.position.x, target.position[0], delta),
        damp(group.current.position.y, target.position[1], delta),
        damp(group.current.position.z, target.position[2], delta),
      );
      group.current.rotation.set(
        damp(group.current.rotation.x, target.rotation[0], delta),
        damp(group.current.rotation.y, target.rotation[1], delta),
        damp(group.current.rotation.z, target.rotation[2], delta),
      );
      group.current.scale.set(
        damp(group.current.scale.x, target.scale[0], delta),
        damp(group.current.scale.y, target.scale[1], delta),
        damp(group.current.scale.z, target.scale[2], delta),
      );
    }

    if (imageMaterial.current) {
      imageMaterial.current.opacity =
        target.opacity * opacityRef.current * (compact ? 0.42 : theme === "dark" ? 0.58 : 0.38);
    }

    if (depthMaterial.current) {
      depthMaterial.current.opacity =
        target.opacity * opacityRef.current * (compact ? 0.08 : theme === "dark" ? 0.14 : 0.06);
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, slice.depth * 0.5]}>
        <planeGeometry args={[slice.size[0], slice.size[1]]} />
        <meshBasicMaterial
          ref={imageMaterial}
          map={sliceTexture}
          transparent
          opacity={0.42}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, -slice.depth * 0.08]}>
        <boxGeometry args={[slice.size[0] * 0.98, slice.size[1] * 0.98, slice.depth]} />
        <meshPhysicalMaterial
          ref={depthMaterial}
          color={theme === "dark" ? "#132026" : "#d9e2e1"}
          roughness={0.26}
          metalness={0.34}
          transmission={theme === "dark" ? 0.2 : 0.08}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
      <FacadeGrid
        width={slice.size[0]}
        height={slice.size[1]}
        depth={slice.depth}
        theme={theme}
        compact={compact}
      />
      {!compact ? (
        <WindowLights
          width={slice.size[0]}
          height={slice.size[1]}
          depth={slice.depth}
          theme={theme}
          seed={slice.key}
        />
      ) : null}
    </group>
  );
}

function FacadeGrid({
  width,
  height,
  depth,
  theme,
  compact,
}: {
  width: number;
  height: number;
  depth: number;
  theme: "dark" | "light";
  compact: boolean;
}) {
  const verticals = Math.max(3, Math.floor(width * (compact ? 3 : 5)));
  const horizontals = Math.max(3, Math.floor(height * (compact ? 2 : 3)));
  const color = theme === "dark" ? "#d8a043" : "#a87b24";
  const opacity = compact ? 0.08 : theme === "dark" ? 0.14 : 0.08;

  return (
    <group position={[0, 0, depth * 0.72]}>
      {Array.from({ length: verticals }, (_, index) => (
        <mesh key={`v-${index}`} position={[-width / 2 + (width / (verticals - 1)) * index, 0, 0]}>
          <boxGeometry args={[0.005, height, 0.006]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
        </mesh>
      ))}
      {Array.from({ length: horizontals }, (_, index) => (
        <mesh
          key={`h-${index}`}
          position={[0, -height / 2 + (height / (horizontals - 1)) * index, 0.002]}
        >
          <boxGeometry args={[width, 0.004, 0.006]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.7} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function WindowLights({
  width,
  height,
  depth,
  theme,
  seed,
}: {
  width: number;
  height: number;
  depth: number;
  theme: "dark" | "light";
  seed: string;
}) {
  const lights = useMemo(() => {
    const base = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return Array.from({ length: 18 }, (_, index) => {
      const row = index % 6;
      const col = Math.floor(index / 6);
      const jitter = ((base + index * 17) % 11) / 55;
      return [(-0.38 + col * 0.38 + jitter) * width, (0.32 - row * 0.13) * height, 0] as Vec3;
    });
  }, [height, seed, width]);

  return (
    <group position={[0, 0, depth * 0.74]}>
      {lights.map((position, index) => (
        <mesh key={index} position={position}>
          <planeGeometry args={[0.038, 0.012]} />
          <meshBasicMaterial
            color={theme === "dark" ? "#ffc66f" : "#c58e32"}
            transparent
            opacity={theme === "dark" ? 0.62 : 0.26}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function AnimatedFloorplates({
  progressRef,
  theme,
  opacityRef,
  compact,
}: {
  progressRef: MutableRefObject<number>;
  theme: "dark" | "light";
  opacityRef: MutableRefObject<number>;
  compact: boolean;
}) {
  const floorplates = compact ? FLOORPLATES.slice(2, 5) : FLOORPLATES;

  return (
    <group>
      {floorplates.map(([x, y, z, width], index) => (
        <Floorplate
          key={`${x}-${y}`}
          index={index}
          base={[x, y, z]}
          width={width}
          progressRef={progressRef}
          theme={theme}
          opacityRef={opacityRef}
        />
      ))}
    </group>
  );
}

function Floorplate({
  index,
  base,
  width,
  progressRef,
  theme,
  opacityRef,
}: {
  index: number;
  base: Vec3;
  width: number;
  progressRef: MutableRefObject<number>;
  theme: "dark" | "light";
  opacityRef: MutableRefObject<number>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    const progress = progressRef.current;
    const productSpread = smoothRange(progress, 0.12, 0.45);
    const pricingStack = smoothRange(progress, 0.42, 0.72);
    const contactFade = smoothRange(progress, 0.74, 1);
    const column = index % 4;
    const row = Math.floor(index / 4);
    const targetX = THREE.MathUtils.lerp(base[0], -1.65 + column * 1.08, pricingStack);
    const targetY = THREE.MathUtils.lerp(
      base[1] + productSpread * (index % 2 ? 0.2 : -0.08),
      -0.78 + row * 0.46,
      pricingStack,
    );
    const targetZ = THREE.MathUtils.lerp(
      base[2] + productSpread * 0.38,
      -0.32 - row * 0.18,
      pricingStack,
    );

    if (mesh.current) {
      mesh.current.position.set(
        damp(mesh.current.position.x, targetX, delta),
        damp(mesh.current.position.y, targetY - contactFade * 0.3, delta),
        damp(mesh.current.position.z, targetZ - contactFade * 0.6, delta),
      );
      mesh.current.rotation.set(
        damp(mesh.current.rotation.x, 0.03 + productSpread * 0.08, delta),
        damp(mesh.current.rotation.y, -0.16 + productSpread * 0.18, delta),
        damp(mesh.current.rotation.z, 0.01 - pricingStack * 0.04, delta),
      );
    }

    if (material.current) {
      material.current.opacity =
        opacityRef.current * (theme === "dark" ? 0.18 : 0.1) * (1 - contactFade * 0.38);
    }
  });

  return (
    <mesh ref={mesh} position={base} rotation={[0.03, -0.16, 0.01]}>
      <boxGeometry args={[width, 0.026, 0.58]} />
      <meshStandardMaterial
        ref={material}
        color={theme === "dark" ? "#d8a043" : "#b8862c"}
        roughness={0.34}
        metalness={0.68}
        transparent
        opacity={0.18}
      />
    </mesh>
  );
}

function GoldTraceLines({
  progressRef,
  theme,
  opacityRef,
  compact,
}: {
  progressRef: MutableRefObject<number>;
  theme: "dark" | "light";
  opacityRef: MutableRefObject<number>;
  compact: boolean;
}) {
  const curves = useMemo(
    () => [
      new THREE.CatmullRomCurve3([
        vector([-2.5, -0.95, 0.9]),
        vector([-0.6, -0.2, 1.25]),
        vector([1.95, 0.48, 0.62]),
      ]),
      new THREE.CatmullRomCurve3([
        vector([-1.8, 0.92, 0.7]),
        vector([0.02, 0.36, 1.2]),
        vector([2.45, -0.72, 0.48]),
      ]),
      new THREE.CatmullRomCurve3([
        vector([-0.52, 1.2, 0.78]),
        vector([0.42, 0.12, 1.5]),
        vector([0.96, -1.28, 0.64]),
      ]),
    ],
    [],
  );

  return (
    <group>
      {(compact ? curves.slice(0, 1) : curves).map((curve, index) => (
        <TraceLine
          key={index}
          curve={curve}
          index={index}
          progressRef={progressRef}
          theme={theme}
          opacityRef={opacityRef}
        />
      ))}
    </group>
  );
}

function TraceLine({
  curve,
  index,
  progressRef,
  theme,
  opacityRef,
}: {
  curve: THREE.CatmullRomCurve3;
  index: number;
  progressRef: MutableRefObject<number>;
  theme: "dark" | "light";
  opacityRef: MutableRefObject<number>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    const progress = progressRef.current;
    const product = smoothRange(progress, 0.16, 0.44);
    const contact = smoothRange(progress, 0.72, 1);

    if (mesh.current) {
      mesh.current.rotation.z = damp(
        mesh.current.rotation.z,
        (product - contact) * (0.12 + index * 0.035),
        delta,
      );
      mesh.current.position.z = damp(
        mesh.current.position.z,
        product * 0.42 - contact * 0.28,
        delta,
      );
      mesh.current.scale.setScalar(
        damp(mesh.current.scale.x, 1 + product * 0.16 - contact * 0.08, delta),
      );
    }

    if (material.current) {
      material.current.opacity =
        opacityRef.current * (theme === "dark" ? 0.28 : 0.14) * (0.58 + product * 0.28);
    }
  });

  return (
    <mesh ref={mesh}>
      <tubeGeometry args={[curve, 72, 0.006, 7, false]} />
      <meshBasicMaterial
        ref={material}
        color={theme === "dark" ? "#e3ad4d" : "#b8862c"}
        transparent
        opacity={0.2}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function LightShafts({
  progressRef,
  theme,
  opacityRef,
}: {
  progressRef: MutableRefObject<number>;
  theme: "dark" | "light";
  opacityRef: MutableRefObject<number>;
}) {
  const material = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    const contact = smoothRange(progressRef.current, 0.72, 1);

    if (material.current) {
      material.current.opacity = damp(
        material.current.opacity,
        opacityRef.current * (theme === "dark" ? 0.06 : 0.025) * (1 + contact * 0.45),
        delta,
      );
    }
  });

  return (
    <group position={[0.7, 0.2, 0.2]} rotation={[0.12, -0.22, -0.2]}>
      {Array.from({ length: 4 }, (_, index) => (
        <mesh key={index} position={[-1.2 + index * 0.8, 0.1 - index * 0.08, -0.2 - index * 0.12]}>
          <planeGeometry args={[0.42, 4.5]} />
          <meshBasicMaterial
            ref={index === 0 ? material : undefined}
            color={theme === "dark" ? "#d8a043" : "#c19a50"}
            transparent
            opacity={theme === "dark" ? 0.05 : 0.025}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function useBuildingTexture(theme: "dark" | "light") {
  const texture = useTexture(theme === "dark" ? heroBuildingDark : heroBuildingLight);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
  }, [texture]);

  return texture;
}

function useSliceTexture(texture: THREE.Texture, uv: [number, number, number, number]) {
  const sliceTexture = useMemo(() => {
    const clone = texture.clone();
    clone.colorSpace = THREE.SRGBColorSpace;
    clone.wrapS = THREE.ClampToEdgeWrapping;
    clone.wrapT = THREE.ClampToEdgeWrapping;
    clone.repeat.set(uv[2], uv[3]);
    clone.offset.set(uv[0], 1 - uv[1] - uv[3]);
    clone.needsUpdate = true;
    return clone;
  }, [texture, uv]);

  useEffect(() => () => sliceTexture.dispose(), [sliceTexture]);

  return sliceTexture;
}

function transform(position: Vec3, rotation: Vec3, scale: Vec3, opacity: number): SliceTransform {
  return { position, rotation, scale, opacity };
}

function interpolateCamera(progress: number): CameraState {
  const [from, to, local] = interpolateByChapter(progress);

  return {
    position: lerpVec(CAMERA_STATES[from].position, CAMERA_STATES[to].position, local),
    target: lerpVec(CAMERA_STATES[from].target, CAMERA_STATES[to].target, local),
    fov: THREE.MathUtils.lerp(CAMERA_STATES[from].fov, CAMERA_STATES[to].fov, local),
    roll: THREE.MathUtils.lerp(CAMERA_STATES[from].roll, CAMERA_STATES[to].roll, local),
    groupPosition: lerpVec(
      CAMERA_STATES[from].groupPosition,
      CAMERA_STATES[to].groupPosition,
      local,
    ),
    groupRotation: lerpVec(
      CAMERA_STATES[from].groupRotation,
      CAMERA_STATES[to].groupRotation,
      local,
    ),
    groupScale: THREE.MathUtils.lerp(
      CAMERA_STATES[from].groupScale,
      CAMERA_STATES[to].groupScale,
      local,
    ),
    overlayOpacity: THREE.MathUtils.lerp(
      CAMERA_STATES[from].overlayOpacity,
      CAMERA_STATES[to].overlayOpacity,
      local,
    ),
  };
}

function interpolateSlice(
  states: Record<ChapterKey, SliceTransform>,
  progress: number,
): SliceTransform {
  const [from, to, local] = interpolateByChapter(progress);

  return {
    position: lerpVec(states[from].position, states[to].position, local),
    rotation: lerpVec(states[from].rotation, states[to].rotation, local),
    scale: lerpVec(states[from].scale, states[to].scale, local),
    opacity: THREE.MathUtils.lerp(states[from].opacity, states[to].opacity, local),
  };
}

function interpolateByChapter(progress: number): [ChapterKey, ChapterKey, number] {
  const scaled = THREE.MathUtils.clamp(progress, 0, 1) * (CHAPTERS.length - 1);
  const index = Math.min(Math.floor(scaled), CHAPTERS.length - 2);
  return [CHAPTERS[index], CHAPTERS[index + 1], smoothstep(scaled - index)];
}

function smoothRange(value: number, start: number, end: number) {
  return smoothstep(THREE.MathUtils.clamp((value - start) / (end - start), 0, 1));
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function lerpVec(from: Vec3, to: Vec3, amount: number): Vec3 {
  return [
    THREE.MathUtils.lerp(from[0], to[0], amount),
    THREE.MathUtils.lerp(from[1], to[1], amount),
    THREE.MathUtils.lerp(from[2], to[2], amount),
  ];
}

function damp(current: number, target: number, delta: number) {
  return THREE.MathUtils.damp(current, target, 4.2, delta);
}

function vector(value: Vec3) {
  return new THREE.Vector3(value[0], value[1], value[2]);
}
