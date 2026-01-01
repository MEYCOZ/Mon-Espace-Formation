import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export default function InteractionRaycaster({ onChange }) {
  const { camera, scene } = useThree();

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(0, 0), []); // centre écran

  const lastIdRef = useRef(null);

  useEffect(() => {
    lastIdRef.current = null;
  }, [scene]);

  useFrame(() => {
    raycaster.setFromCamera(ndc, camera);

    const hits = raycaster.intersectObjects(scene.children, true);

    const hit = hits.find((h) => h.object?.userData?.interactable);

    const id = hit ? hit.object.uuid : null;
    if (id === lastIdRef.current) return;

    lastIdRef.current = id;

    if (!hit) {
      onChange(false, "");
      return;
    }

    const label = hit.object.userData.interactLabel || "Objet";
    onChange(true, label);
  });

  return null;
}
