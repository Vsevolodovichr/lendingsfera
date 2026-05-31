import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../src/assets/hatosfera-building.gltf");

const materials = [
  material("glass", [0.08, 0.14, 0.16, 0.48], 0.18, 0.18, [0.02, 0.035, 0.04]),
  material("slab", [0.86, 0.82, 0.72, 0.92], 0.1, 0.42, [0.02, 0.018, 0.014]),
  material("gold", [0.95, 0.62, 0.18, 1], 0.72, 0.28, [0.9, 0.5, 0.14]),
  material("window", [1, 0.58, 0.22, 1], 0.08, 0.18, [1.6, 0.72, 0.22]),
  material("concrete", [0.3, 0.3, 0.28, 1], 0.12, 0.55, [0.015, 0.014, 0.012]),
  material("green", [0.12, 0.32, 0.15, 1], 0, 0.72, [0.02, 0.05, 0.02]),
  material("darkMetal", [0.05, 0.065, 0.07, 1], 0.68, 0.32, [0.01, 0.012, 0.012]),
];

const materialIndex = Object.fromEntries(materials.map((entry, index) => [entry.name, index]));
const nodes = [];
const rootChildren = [];

const cube = createCubeGeometry();
const chunks = [];
const bufferViews = [];
const accessors = [];

const positionAccessor = addAccessor(
  cube.positions,
  5126,
  "VEC3",
  34962,
  [-0.5, -0.5, -0.5],
  [0.5, 0.5, 0.5],
);
const normalAccessor = addAccessor(cube.normals, 5126, "VEC3", 34962);
const indexAccessor = addAccessor(cube.indices, 5123, "SCALAR", 34963);

const meshes = materials.map((entry, index) => ({
  name: `${entry.name}-cube`,
  primitives: [
    {
      attributes: {
        POSITION: positionAccessor,
        NORMAL: normalAccessor,
      },
      indices: indexAccessor,
      material: index,
    },
  ],
}));

const meshIndex = Object.fromEntries(materials.map((entry, index) => [entry.name, index]));

const rootNode = addNode("hatosfera-building-root");

box("podium-base", "concrete", [0.32, -1.45, 0], [5.8, 0.24, 1.12]);
box("reflective-plaza", "darkMetal", [0.32, -1.68, 0.2], [6.6, 0.04, 2.2]);

box("left-glass-core", "glass", [-2.05, 0.02, 0], [1.28, 2.62, 0.74]);
box("left-back-core", "glass", [-1.54, 0.22, -0.36], [1.0, 2.95, 0.56]);
for (let i = 0; i < 5; i += 1) {
  box(`left-terrace-slab-${i}`, "slab", [-2.06, 0.8 - i * 0.47, 0.42], [1.82, 0.07, 0.88]);
  box(`left-terrace-glow-${i}`, "window", [-2.06, 0.67 - i * 0.47, 0.86], [1.4, 0.035, 0.02]);
}
addFacadeStrips("left", -2.05, 0.08, 0.4, 1.3, 2.65, 9, 7);

box("logo-tower", "darkMetal", [-0.72, 0.04, 0.28], [0.74, 2.92, 0.76]);
for (let i = 0; i < 10; i += 1) {
  box(`logo-tower-rib-${i}`, "slab", [-1.04 + i * 0.072, 0.04, 0.72], [0.018, 2.86, 0.07]);
}
addLogoMark([-0.72, 0.56, 0.82], 0.26);
box("logo-name-line", "gold", [-0.72, 0.12, 0.82], [0.44, 0.035, 0.035]);

box("center-glass-mass", "glass", [0.32, 0.24, -0.08], [1.56, 2.54, 0.86]);
box("center-connector", "glass", [0.78, -0.12, 0.36], [1.12, 1.68, 0.74]);
addFacadeStrips("center", 0.38, 0.18, 0.42, 1.64, 2.42, 8, 6);

box("right-glass-tower", "glass", [1.72, 0.12, 0.12], [1.82, 2.42, 0.86]);
box("right-back-tower", "glass", [2.28, 0.22, -0.42], [1.02, 2.68, 0.62]);
for (let i = 0; i < 4; i += 1) {
  box(`right-terrace-slab-${i}`, "slab", [1.52, 0.46 - i * 0.5, 0.62], [1.68, 0.07, 0.96]);
  box(`right-planter-${i}`, "green", [1.52, 0.55 - i * 0.5, 1.08], [1.1, 0.08, 0.1]);
}
for (let i = 0; i < 11; i += 1) {
  box(
    `right-vertical-fin-${i}`,
    "slab",
    [2.58 + (i % 3) * 0.08, 0.34 - Math.floor(i / 3) * 0.48, 0.84],
    [0.035, 0.76, 0.11],
  );
}
addFacadeStrips("right", 1.72, 0.12, 0.54, 1.8, 2.32, 10, 6);

for (let i = 0; i < 24; i += 1) {
  const x = -2.6 + (i % 8) * 0.72;
  const y = -1.2 + Math.floor(i / 8) * 0.36;
  const z = 0.88 + ((i * 17) % 5) * 0.018;
  box(`podium-window-${i}`, "window", [x, y, z], [0.22, 0.035, 0.025]);
}

for (let i = 0; i < 16; i += 1) {
  const x = -2.7 + (i % 8) * 0.78;
  const z = -0.78 + Math.floor(i / 8) * 0.34;
  box(`landscape-${i}`, "green", [x, -1.55, z], [0.2, 0.11 + (i % 3) * 0.04, 0.18]);
}

nodes[rootNode].children = rootChildren.filter((index) => index !== rootNode);

const buffer = Buffer.concat(chunks);
const gltf = {
  asset: {
    version: "2.0",
    generator: "Codex procedural Hatosfera building generator",
  },
  scene: 0,
  scenes: [{ name: "Hatosfera Building", nodes: [rootNode] }],
  nodes,
  meshes,
  materials: materials.map(({ name, ...entry }) => ({ name, ...entry })),
  buffers: [
    {
      byteLength: buffer.byteLength,
      uri: `data:application/octet-stream;base64,${buffer.toString("base64")}`,
    },
  ],
  bufferViews,
  accessors,
};

writeFileSync(outputPath, `${JSON.stringify(gltf)}\n`, "utf8");
console.log(`Generated ${outputPath}`);

function material(name, baseColorFactor, metallicFactor, roughnessFactor, emissiveFactor) {
  return {
    name,
    pbrMetallicRoughness: {
      baseColorFactor,
      metallicFactor,
      roughnessFactor,
    },
    emissiveFactor,
    alphaMode: baseColorFactor[3] < 1 ? "BLEND" : "OPAQUE",
    doubleSided: true,
  };
}

function box(name, materialName, translation, scale, rotation = [0, 0, 0]) {
  const node = addNode(name, meshIndex[materialName], translation, scale, rotation);
  rootChildren.push(node);
  return node;
}

function addNode(name, mesh, translation = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0]) {
  const node = { name };
  if (mesh !== undefined) node.mesh = mesh;
  if (translation) node.translation = translation;
  if (scale) node.scale = scale;
  if (rotation) node.rotation = eulerToQuaternion(rotation);
  nodes.push(node);
  return nodes.length - 1;
}

function addFacadeStrips(prefix, centerX, centerY, frontZ, width, height, columns, rows) {
  for (let i = 0; i < columns; i += 1) {
    const x = centerX - width / 2 + (width / Math.max(1, columns - 1)) * i;
    box(`${prefix}-mullion-${i}`, "gold", [x, centerY, frontZ], [0.012, height, 0.018]);
  }
  for (let row = 0; row < rows; row += 1) {
    const y = centerY - height / 2 + (height / Math.max(1, rows - 1)) * row;
    box(`${prefix}-floor-line-${row}`, "gold", [centerX, y, frontZ + 0.012], [width, 0.01, 0.014]);
  }
  for (let i = 0; i < columns * 2; i += 1) {
    const x = centerX - width * 0.38 + (i % columns) * (width / columns);
    const y = centerY - height * 0.28 + Math.floor(i / columns) * (height * 0.28);
    box(`${prefix}-warm-window-${i}`, "window", [x, y, frontZ + 0.035], [0.11, 0.025, 0.018]);
  }
}

function addLogoMark(center, radius) {
  const segments = 28;
  for (let i = 0; i < segments; i += 1) {
    const angle = (Math.PI * 2 * i) / segments;
    const x = center[0] + Math.cos(angle) * radius;
    const y = center[1] + Math.sin(angle) * radius;
    box(`logo-ring-${i}`, "gold", [x, y, center[2]], [0.06, 0.018, 0.022], [0, 0, angle]);
  }
  box("logo-slash", "gold", center, [radius * 1.75, 0.028, 0.026], [0, 0, 0.82]);
  box(
    "logo-vertical",
    "gold",
    [center[0] + radius * 0.2, center[1], center[2]],
    [0.028, radius * 1.58, 0.026],
    [0, 0, -0.12],
  );
}

function addAccessor(array, componentType, type, target, min, max) {
  const bufferView = addBufferView(Buffer.from(array.buffer), target);
  const accessor = {
    bufferView,
    componentType,
    count: array.length / componentCount(type),
    type,
  };
  if (min) accessor.min = min;
  if (max) accessor.max = max;
  accessors.push(accessor);
  return accessors.length - 1;
}

function addBufferView(buffer, target) {
  const offset = chunks.reduce((total, chunk) => total + chunk.byteLength, 0);
  const padding = (4 - (offset % 4)) % 4;
  if (padding) chunks.push(Buffer.alloc(padding));
  const byteOffset = offset + padding;
  chunks.push(buffer);
  bufferViews.push({
    buffer: 0,
    byteOffset,
    byteLength: buffer.byteLength,
    target,
  });
  return bufferViews.length - 1;
}

function componentCount(type) {
  return { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[type];
}

function createCubeGeometry() {
  const p = [
    [-0.5, -0.5, 0.5],
    [0.5, -0.5, 0.5],
    [0.5, 0.5, 0.5],
    [-0.5, 0.5, 0.5],
    [0.5, -0.5, -0.5],
    [-0.5, -0.5, -0.5],
    [-0.5, 0.5, -0.5],
    [0.5, 0.5, -0.5],
    [-0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5],
    [0.5, 0.5, -0.5],
    [-0.5, 0.5, -0.5],
    [-0.5, -0.5, -0.5],
    [0.5, -0.5, -0.5],
    [0.5, -0.5, 0.5],
    [-0.5, -0.5, 0.5],
    [0.5, -0.5, 0.5],
    [0.5, -0.5, -0.5],
    [0.5, 0.5, -0.5],
    [0.5, 0.5, 0.5],
    [-0.5, -0.5, -0.5],
    [-0.5, -0.5, 0.5],
    [-0.5, 0.5, 0.5],
    [-0.5, 0.5, -0.5],
  ].flat();
  const n = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, -1],
    [0, 0, -1],
    [0, 0, -1],
    [0, 0, -1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, -1, 0],
    [0, -1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [-1, 0, 0],
    [-1, 0, 0],
    [-1, 0, 0],
  ].flat();
  const indices = [
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16,
    18, 19, 20, 21, 22, 20, 22, 23,
  ];
  return {
    positions: new Float32Array(p),
    normals: new Float32Array(n),
    indices: new Uint16Array(indices),
  };
}

function eulerToQuaternion([x, y, z]) {
  const c1 = Math.cos(x / 2);
  const c2 = Math.cos(y / 2);
  const c3 = Math.cos(z / 2);
  const s1 = Math.sin(x / 2);
  const s2 = Math.sin(y / 2);
  const s3 = Math.sin(z / 2);
  return [
    s1 * c2 * c3 + c1 * s2 * s3,
    c1 * s2 * c3 - s1 * c2 * s3,
    c1 * c2 * s3 + s1 * s2 * c3,
    c1 * c2 * c3 - s1 * s2 * s3,
  ];
}
