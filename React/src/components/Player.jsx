import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function Player({ eyeHeight = 1.5 }) {
  const body = useRef();
  const { camera, gl } = useThree();

  const keys = useRef({
    forward: false,
    back: false,
    left: false,
    right: false,
    sprint: false,
  });

  const dir = useMemo(() => new THREE.Vector3(), []);
  const forward = useMemo(() => new THREE.Vector3(), []);
  const right = useMemo(() => new THREE.Vector3(), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useEffect(() => {
    const onKeyDown = (e) => {
      switch (e.code) {
        case "KeyW":
        case "KeyZ":
          keys.current.forward = true;
          break;
        case "KeyS":
          keys.current.back = true;
          break;
        case "KeyA":
        case "KeyQ":
          keys.current.left = true;
          break;
        case "KeyD":
          keys.current.right = true;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          keys.current.sprint = true;
          break;
        default:
          break;
      }
    };

    const onKeyUp = (e) => {
      switch (e.code) {
        case "KeyW":
        case "KeyZ":
          keys.current.forward = false;
          break;
        case "KeyS":
          keys.current.back = false;
          break;
        case "KeyA":
        case "KeyQ":
          keys.current.left = false;
          break;
        case "KeyD":
          keys.current.right = false;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          keys.current.sprint = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const rb = body.current;
    if (!rb) return;

    const baseSpeed = 2.5;
    const sprintMult = keys.current.sprint ? 2 : 1;
    const speed = baseSpeed * sprintMult;

    // direction au sol
    camera.getWorldDirection(forward);
    forward.y = 0;
    if (forward.lengthSq() > 0) forward.normalize();

    right.crossVectors(forward, up).normalize();

    dir.set(0, 0, 0);
    if (keys.current.forward) dir.add(forward);
    if (keys.current.back) dir.sub(forward);
    if (keys.current.right) dir.add(right);
    if (keys.current.left) dir.sub(right);

    if (dir.lengthSq() > 0) dir.normalize();

    // On garde la composante Y actuelle (gravité), mais on force la position caméra ensuite
    const v = rb.linvel();
    rb.setLinvel(
      {
        x: dir.x * speed,
        y: v.y,
        z: dir.z * speed,
      },
      true
    );

    // Caméra suit le rigidbody, hauteur yeux
    const p = rb.translation();
    camera.position.set(p.x, p.y + eyeHeight, p.z);
  });

  return (
    <>
      <PointerLockControls args={[camera, gl.domElement]} />

      <RigidBody
        ref={body}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[1.5, 0.7, -0.8]}
        enabledRotations={[false, false, false]}
        friction={0.0}
      >
        {/* Capsule: rayon 0.25m, demi-hauteur 0.45m => hauteur ~1.15m */}
        <CapsuleCollider args={[0.45, 0.25]} />
      </RigidBody>
    </>
  );
}
