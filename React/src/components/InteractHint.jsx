export default function InteractHint({ visible, label }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(50% + 18px)",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "6px 10px",
        borderRadius: 10,
        background: "rgba(0,0,0,0.6)",
        color: "white",
        fontSize: 13,
        pointerEvents: "none",
        zIndex: 20,
        whiteSpace: "nowrap",
      }}
    >
      Cliquer pour interagir{label ? ` : ${label}` : ""}
    </div>
  );
}
