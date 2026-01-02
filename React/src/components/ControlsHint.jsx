export default function ControlsHint({ lightOn, flashOn }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        padding: "10px 12px",
        borderRadius: 10,
        background: "rgba(0,0,0,0.6)",
        color: "white",
        fontSize: 14,
        lineHeight: 1.35,
        pointerEvents: "none",
        zIndex: 20,
        maxWidth: 260,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Contrôles</div>
      <div>Se déplacer : ZQSD</div>
      <div>Regarder : souris</div>
      <div>Interagir : clic</div>
      <div>Lampe torche : F</div>

      <div style={{ marginTop: 6, opacity: 0.9 }}>Échap : libérer la souris</div>

      {/* Status lumière */}
      <div style={{ marginTop: 6 }}>
        Lumière : <span style={{ fontWeight: 700 }}>{lightOn ? "ON" : "OFF"}</span>
      </div>

      {/* Status lampe */}
      <div style={{ marginTop: 6 }}>
        Lampe : <span style={{ fontWeight: 700 }}>{flashOn ? "ON" : "OFF"}</span>
      </div>
    </div>
  );
}
