import React, { useEffect } from "react";

export default function Toast({ message, type="error", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "2rem",
        borderRadius: "10px",
        color: "white",
        fontWeight: "bold",
        minWidth: "220px",
        textAlign: "center",
        backgroundColor: type === "success" ? "#4CAF50" : "#E74C3C",
      }}
    >
      {message}
    </div>
  );
}
