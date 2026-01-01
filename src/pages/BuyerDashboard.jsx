import React, { useEffect, useState } from "react";
import { getRequests } from "../api";
import NavbarBR from "../components/NavbarBR";
import RequestForm from "../components/RequestForm";
import OrdersList from "../components/OrdersList";
export default function BuyerDashboard() {
  const [requests, setRequests] = useState([]);
  const load = async () => {
    const res = await getRequests();
    setRequests(res.data.reverse());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <NavbarBR mode={"Buyer"} />

      <section
        style={{
          display: "flex",
          gap: "3rem",
          height: "100%"
        }}
      >
        {/* LEFT */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent:"center",height:"460px"}}>
          <RequestForm onRefresh={load} />
        </div>

        {/* RIGHT */}
        <div style={{ flex: 2 }}>
          <h2
            className="md-txt highlight highlight-secondary"
            style={{
              fontSize: "3.2rem",
              padding: "1rem 2rem",
              color: "#ffffff",
              borderRadius: "8px",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Active Orders
          </h2>

          <OrdersList requests={requests} onRefresh={load} />
        </div>
      </section>
    </div>
  );
}
