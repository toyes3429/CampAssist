import React, { useEffect, useState } from "react";
import { getRequests, acceptRequest } from "../api";
import Navbar from "../components/NavbarBR";
import "./RunnerDashboard.css";

export default function RunnerDashboard() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await getRequests();
    const open = res.data.filter(r => r.status === "OPEN");
    setRequests(open.reverse());
  };

  const handleAccept = async (id) => {
    setLoading(true);
    setMessage("");

    try {
      await acceptRequest(id, localStorage.getItem("userEmail"));
      setMsgType("success");
      setMessage("Task accepted!");
      load();
    } catch (err) {
      setMsgType("error");
      setMessage(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); },[]);

  return (
    <div className="container">
      <Navbar mode="Runner" />
      {message && <div className={`msg-box ${msgType}`}>{message}</div>}

      <section className="orders-section">
        <div className="orders-grid">
          {requests.length === 0 ? (
            <div className="cta-card no-task-card">
              <h3>No Tasks Available</h3>
              <p className="md-txt">Check again later!</p>
            </div>
          ) : (
            requests.map(r => (
              <div className="cta-card order-card" key={r.id}>
                <h5 className="order-title">{r.item_name}</h5>
                <p className="md-txt order-price">₹{r.price}</p>
                <p className="md-txt order-reward">Reward: ₹{r.tip}</p>

                <button onClick={()=>handleAccept(r.id)} className="btn order-btn" disabled={loading}>
                  {loading ? "Accepting..." : "Accept Task"}
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
