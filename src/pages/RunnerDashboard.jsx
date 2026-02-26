import { useEffect, useState, useMemo } from "react";
import { getRunnerRequests, acceptRequest, completeRequest } from "../api";
import RequestCard from "../components/RequestCard";
import RunnerProfile from "../components/RunnerProfile";
import "./RunnerDashboard.css";

export default function RunnerDashboard() {
  const runnerEmail = localStorage.getItem("userEmail");
  const [available, setAvailable] = useState(true);
  const [requests, setRequests] = useState([]);
  const [activeRequest, setActiveRequest] = useState(null);

  // 🔄 Load Requests
  const loadRequests = async () => {
    try {
      const res = await getRunnerRequests();
      setRequests(
        (res.data || []).filter((r) => r.status !== "DELIVERED")
      );
    } catch (err) {
      console.error("Failed to load requests", err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // ✅ ACCEPT REQUEST (Optimistic UI)
  const handleAccept = async (id) => {
    const accepted = requests.find(
      (r) => String(r._id) === String(id)
    );

    if (!accepted) return;

    // Update UI instantly
    setActiveRequest({ ...accepted, status: "ACCEPTED" });

    setRequests((prev) =>
      prev.map((r) =>
        String(r._id) === String(id)
          ? { ...r, status: "ACCEPTED" }
          : r
      )
    );

    try {
      await acceptRequest(id, runnerEmail);
    } catch (err) {
      console.error("Failed to accept request", err);
      loadRequests(); // rollback
      setActiveRequest(null);
    }
  };

  // ✅ COMPLETE REQUEST
  const handleComplete = async (id) => {
    try {
      await completeRequest(id);
      setActiveRequest(null);
      loadRequests();
    } catch (err) {
      console.error("Failed to complete request", err);
    }
  };

  // 🔥 SORT REQUESTS BY STATUS
  const sortedRequests = useMemo(() => {
    const statusOrder = {
      OPEN: 1,
      ACCEPTED: 2,
      DELIVERED: 3,
    };

    return [...requests].sort(
      (a, b) =>
        (statusOrder[a.status] || 99) -
        (statusOrder[b.status] || 99)
    );
  }, [requests]);

  // 📊 Stats
  const completedRequests = requests.filter(
    (r) => r.status === "DELIVERED"
  );

  const totalEarnings = completedRequests.reduce(
    (sum, r) => sum + (r.tip || 0),
    0
  );

  return (
    <div className="runner-control-card">

      {/* Availability Toggle */}
      <div className={`availability-toggle ${available ? "on" : "off"}`}>
        <div className="status-left">
          <span className="status-dot" />
          <span className="status-text">
            {available ? "Online" : "Offline"}
          </span>
        </div>

        <button
          className="toggle-btn"
          onClick={() => setAvailable(!available)}
        >
          {available ? "Go Offline" : "Go Online"}
        </button>
      </div>

      {/* LEFT PANEL */}
      <div className="runner-left">

        <h2 className="runner-title">Available Requests</h2>

        {requests.length === 0 && (
          <p className="runner-empty">
            No available requests right now.
          </p>
        )}

        {available ? (
          sortedRequests.map((r) => (
            <RequestCard
              key={r._id}
              r={r}
              isRunner
              onAccept={handleAccept}
              onComplete={handleComplete}
              isActive={
                activeRequest &&
                String(activeRequest._id) === String(r._id)
              }
            />
          ))
        ) : (
          <p className="runner-empty">
            You are currently offline.
          </p>
        )}

        {/* Stats */}
        <div className="runner-stats-card">
          <p className="stats-title">Today</p>

          <div className="stats-row">
            <span>Deliveries</span>
            <strong>{completedRequests.length}</strong>
          </div>

          <div className="stats-row">
            <span>Earnings</span>
            <strong>₹{totalEarnings}</strong>
          </div>
        </div>

        {/* Profile */}
        <div className="runner-profile-card">
          <div className="profile-header">
            <span className="profile-icon">👤</span>
            <span className="profile-title">Runner Profile</span>
          </div>

          <p className="profile-name">{runnerEmail}</p>

          <div className="profile-stats">
            <div className="stat">
              <span className="label">Deliveries</span>
              <strong>{completedRequests.length}</strong>
            </div>

            <div className="stat">
              <span className="label">Earnings</span>
              <strong>₹{totalEarnings}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="runner-right">
        <div className="map-container">
          {activeRequest ? (
            <RunnerProfile
              request={activeRequest}
              onComplete={handleComplete}
            />
          ) : (
            "Browse requests"
          )}
        </div>
      </div>

    </div>
  );
}