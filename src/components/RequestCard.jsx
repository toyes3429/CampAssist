export default function RequestCard({ r, isRunner, onAccept, onComplete }) {

  const urgencyClass = r.urgency
    ? `urgency-${r.urgency.toLowerCase().trim()}`
    : "urgency-low";

  return (
    <div className={`request-card ${urgencyClass}`}>

      {/* RUNNER EARNING (TOP PRIORITY) */}
      {isRunner && (
        <>
          <div className="runner-earning">
            <span className="earning-label">Runner incentive</span>
            <span className="earning-amount">
              ₹{r.tip || 0}
            </span>
          </div>

          {r.tip >= 20 && (
            <span className="high-incentive">
              🔥 High incentive
            </span>
          )}
        </>
      )}
      {!isRunner && (
  <div className="status-timeline">
    <span className={r.status === "OPEN" ? "active" : ""}>🟡 Open</span>
    <span className={r.status === "ACCEPTED" ? "active" : ""}>🟠 Accepted</span>
    <span className={r.status === "DELIVERED" ? "active" : ""}>🟢 Delivered</span>
  </div>
)}


      {/* HEADER */}
      <div className="request-header">
        <div className="request-title">{r.item_name}</div>

        <span className={`status-badge status-${r.status.toLowerCase()}`}>
          {r.status}
        </span>
      </div>

      {/* META INFO */}
      <div className="request-meta">
        Category: <span>{r.category}</span>
      </div>

      <div className="request-meta">
        Urgency: <span>{r.urgency}</span>
      </div>

      {r.notes && (
        <div className="request-meta">
          Notes: <span>{r.notes}</span>
        </div>
      )}

      {/* BUYER PRICE VIEW */}
      {!isRunner && (
        <div className="price-breakdown">
          <p>Item price: <strong>₹{r.price || 0}</strong></p>
          <p>Runner incentive: <strong>₹{r.tip || 0}</strong></p>
          <p className="total">
            Total: ₹{Number(r.price || 0) + Number(r.tip || 0)}
          </p>
        </div>
      )}

      {/* ACTIONS */}
      {isRunner && (
        <div className="request-actions">

          {r.status === "OPEN" && (
            <button
              className="request-btn btn-accept"
              onClick={() => onAccept(r._id)}
            >
              Accept Request
            </button>
          )}

          {r.status === "ACCEPTED" && (
            <button
              className="request-btn btn-complete"
              onClick={() => onComplete(r._id)}
            >
              Mark Delivered
            </button>
          )}

        </div>
      )}
    </div>
  );
}
