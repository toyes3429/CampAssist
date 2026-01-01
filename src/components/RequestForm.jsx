import React, { useState } from "react";
import { createRequest } from "../api";

export default function RequestForm({ onRefresh }) {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [reward, setReward] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!item || !price || !reward) throw new Error("Fill all fields");

      const res = await createRequest({
        item_name: item,
        price,
        tip: reward,
        requester_email: localStorage.getItem("userEmail"),
      });

      setMsgType("success");
      setMessage("Request posted successfully!");
      setItem(""); setPrice(""); setReward("");
      onRefresh();
    } catch (err) {
      setMsgType("error");
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cta-card" style={{ backgroundColor:"#212121", padding:"3rem",height:"100%"} }>
      <h2 className="feature-headings" style={{ color:"white", marginBottom:"1.5rem" }}>
        Hi, <span style={{color:"var(--white)"}}>{localStorage.getItem("userName")}</span>
      </h2>


      <p className="md-txt" style={{ color:"var(--primary-tint)", marginBottom:"2rem" }}>
        Post a new request below:
      </p>

      <form onSubmit={handleSubmit}>
        <input value={item} onChange={e=>setItem(e.target.value)} placeholder="Item Name" className="auth-input"/>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Item Price (₹)" className="auth-input"/>
        <input value={reward} onChange={e=>setReward(e.target.value)} placeholder="Runner Reward (₹)" className="auth-input"/>

        <button type="submit" className="btn role-btn" style={{ width:"100%" }} disabled={loading}>
          {loading ? <div className="loader"></div> : "Post Request"}
        </button>
      {message && <div className={`msg-box ${msgType}`}>{message}</div>}

      </form>
    </div>
  );
}
