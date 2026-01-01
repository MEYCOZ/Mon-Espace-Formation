import "./Salle3D.css";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import { Physics } from "@react-three/rapier";
import Salle from "../components/Salle";
import Player from "../components/Player";
import Crosshair from "../components/Crosshair";
import ControlsHint from "../components/ControlsHint";
import InteractionRaycaster from "../components/InteractionRaycaster";
import InteractHint from "../components/InteractHint";

export default function Salle3D() {
  const [on, setOn] = useState(false);

  const [canInteract, setCanInteract] = useState(false);
  const [label, setLabel] = useState("");

  const onInteractChangeRef = useRef((v, l) => {});
  onInteractChangeRef.current = (v, l) => {
    setCanInteract(v);
    setLabel(l);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ position: "relative", height: "90vh", width: "100%", overflow: "hidden" }}>
        <Canvas style={{ width: "100%", height: "100%" }} camera={{ fov: 60 }}>
          <ambientLight intensity={0.1} />
          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]}>
              <Salle on={on} toggle={() => setOn((v) => !v)} />
              <Player eyeHeight={1.5} />

              {/* ✅ Détection centre écran */}
              <InteractionRaycaster
                onChange={(v, l) => onInteractChangeRef.current(v, l)}
              />
            </Physics>
          </Suspense>
        </Canvas>

        {/* Overlays */}
        <Crosshair active={canInteract} />
        <InteractHint visible={canInteract} label={label} />
        <ControlsHint lightOn={on} />

        {/* bouton quitter (le tien) */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => {
            if (document.pointerLockElement) document.exitPointerLock();
            navigate("/");
          }}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 30,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            cursor: "pointer",
          }}
        >
          Quitter la salle
        </button>
      </div>
    </div>
  );
}
