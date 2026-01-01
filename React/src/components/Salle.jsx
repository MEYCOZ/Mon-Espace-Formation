import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

/* -------------------------------
   LUMIÈRES PLAFOND (2 BARRES)
-------------------------------- */
function CeilingLights({ on }) {
  const y = 2.20699 - 0.02;
  const width = 0.106127;
  const height = 2.98857;

  return (
    <>
      <rectAreaLight
        position={[0.9468565, y, -3.011125]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={width}
        height={height}
        intensity={on ? 10 : 0}
        color="#ffffff"
      />
      <rectAreaLight
        position={[3.197385, y, -3.011125]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={width}
        height={height}
        intensity={on ? 10 : 0}
        color="#ffffff"
      />
    </>
  );
}

export default function Salle({ on, toggle }) {
  const group = useRef();

  const { scene, animations } = useGLTF("/salle.glb");
  const { actions } = useAnimations(animations, group);

  const [locked, setLocked] = useState(false);

  // Init obligatoire pour RectAreaLight
  useEffect(() => {
    RectAreaLightUniformsLib.init();
  }, []);

  /* -------------------------------
     SWITCH (OBJET + ANIMATION)
  -------------------------------- */
  const switchObj = useMemo(() => scene.getObjectByName("Switch"), [scene]);

  useEffect(() => {
    if (!switchObj) return;
    switchObj.traverse((c) => {
      if (c.isMesh) {
        c.userData.isSwitch = true;
        c.userData.interactable = true;
        c.userData.interactLabel = "Interrupteur";
      }
    });
  }, [switchObj]);

  const actionName = useMemo(() => {
    if (!actions) return null;
    return Object.keys(actions).find((k) => k.toLowerCase().includes("switch")) || null;
  }, [actions]);

  useEffect(() => {
    if (!actionName) return;

    const a = actions[actionName];
    if (!a) return;

    a.setLoop(THREE.LoopOnce, 1);
    a.clampWhenFinished = true;

    setLocked(true);
    a.reset();

    if (on) {
      // OFF -> ON
      a.timeScale = 1;
      a.play();
    } else {
      // ON -> OFF
      a.time = a.getClip().duration;
      a.timeScale = -1;
      a.play();
    }

    const t = setTimeout(() => setLocked(false), a.getClip().duration * 1000);
    return () => clearTimeout(t);
  }, [on, actions, actionName]);

  /* -------------------------------
     LED VISIBLES (EMISSIVE)
     ledDroite1002, ledDroite2002, ledDroite3002
     ledGauche1002, ledGauche2002, ledGauche3002
  -------------------------------- */
  useEffect(() => {
    if (!scene) return;

    const isLed = (name) => /^led(Droite|Gauche)[123]002$/i.test(name);

    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      if (!isLed(obj.name)) return;

      if (obj.material?.clone) obj.material = obj.material.clone();

      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((m) => {
        if (!m) return;
        m.emissive = new THREE.Color("#ffffff");
        m.emissiveIntensity = on ? 3.5 : 0;
        m.needsUpdate = true;
      });
    });
  }, [scene, on]);

  /* -------------------------------
     COLLIDERS AUTO CHAISES + TABLES (si les noms matchent)
     - Chaises: "chaise" ou "chair"
     - Tables: "table"
     (Si une table n'est pas matchée, on peut ajouter un collider manuel comme ci-dessous)
  -------------------------------- */
  const furnitureColliders = useMemo(() => {
    if (!scene) return [];

    scene.updateMatrixWorld(true);

    const colliders = [];
    const box = new THREE.Box3();
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    scene.traverse((obj) => {
      if (!obj.isMesh) return;

      const name = (obj.name || "").toLowerCase();
      const isTable = name.includes("table");
      const isChair = name.includes("chaise") || name.includes("chair");

      if (!isTable && !isChair) return;

      box.setFromObject(obj);
      box.getSize(size);
      box.getCenter(center);

      // évite les colliders inutiles (petites pièces)
      if (size.x < 0.2 || size.y < 0.2 || size.z < 0.2) return;

      colliders.push({
        key: obj.uuid,
        half: [size.x / 2, size.y / 2, size.z / 2],
        pos: [center.x, center.y, center.z],
      });
    });

    return colliders;
  }, [scene]);

  return (
    <group ref={group}>
      {/* Lumières */}
      <CeilingLights on={on} />

      {/* Modèle + clic switch */}
      <primitive
        object={scene}
        onPointerDown={(e) => {
          if (locked) return;
          if (e.object?.userData?.isSwitch) {
            e.stopPropagation();
            toggle();
          }
        }}
      />

      {/* -------------------------------
         COLLISIONS FIXES : SOL + MURS + TABLE PROF (manuel)
      -------------------------------- */}
      <RigidBody type="fixed" colliders={false}>
        {/* Sol (ton réglage actuel) */}
        <CuboidCollider args={[20, 0.1, 20]} position={[2, -0.8, -3]} />

        {/* Mur gauche */}
        <CuboidCollider args={[0.1, 2, 6]} position={[0, 2, -3]} />

        {/* Mur droit (validé chez toi) */}
        <CuboidCollider args={[0.1, 2, 6]} position={[5, 2, -3]} />

        {/* Mur fond (élargi) */}
        <CuboidCollider args={[3, 2, 0.1]} position={[2, 2, -6]} />

        {/* Mur avant (élargi) */}
        <CuboidCollider args={[3, 2, 0.1]} position={[2, 2, 0]} />

        {/* ✅ Table prof : collider manuel basé sur les coins du plateau (Blender) */}
        {/* Conversion utilisée : (x,y,z)_blender -> (x,z,-y)_three */}
        {/* On fait un bloc du sol jusqu'au plateau pour empêcher de traverser */}
        <CuboidCollider
          args={[0.82536, 0.373887, 0.316618]} // halfX, halfY, halfZ
          position={[4.00966, 0.373887, -0.926552]}
        />
      </RigidBody>

      {/* -------------------------------
         COLLISIONS AUTO : CHAISES + TABLES (noms contenant "chaise/chair/table")
      -------------------------------- */}
      <RigidBody type="fixed" colliders={false}>
        {furnitureColliders.map((c) => (
          <CuboidCollider key={c.key} args={c.half} position={c.pos} />
        ))}
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/salle.glb");
