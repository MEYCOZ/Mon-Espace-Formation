export default function Crosshair({ active }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: active ? 10 : 8,
        height: active ? 10 : 8,
        borderRadius: "50%",
        background: active ? "rgba(120, 255, 160, 0.95)" : "white",
        boxShadow: active ? "0 0 10px rgba(120, 255, 160, 0.7)" : "none",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
}
