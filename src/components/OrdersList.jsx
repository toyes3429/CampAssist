import React from "react";
import { completeRequest } from "../api";

export default function OrdersList({ requests, onRefresh }) {

  const handleDelivered = async (id) => {
    try {
      await completeRequest(id);
      onRefresh();
    } catch {}
  };

  return (
    <div
      style={{
        overflowY: "auto",
        maxHeight:"50rem",
        padding: "1rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "2rem",
        scrollbarWidth:"none"
      }}
    >
      {requests.map((r) => (
        <div
          key={r.id}
          className="cta-card"
          style={{
            backgroundColor: "var(--secondary-base)",
            padding: "2rem",
            margin: "1rem 0",
            height : "100%",
          }}
        >
          <h4 style={{ color: "white" }}>Product : {r.item_name}</h4>
          <p className="md-txt">Total Price : ₹{r.price} + Reward ₹{r.tip}</p>
          <p className="md-txt">Status: {r.status}</p>
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent:"center" }}>
            <label className="md-txt" style={{ color: "white", marginRight: "1rem" }}>
              Delivered
            </label>

            <input
              type="checkbox"
              className="big-checkbox"
              checked={r.status === "COMPLETED"}
              disabled={r.status === "COMPLETED"}
              onChange={() => handleDelivered(r.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
