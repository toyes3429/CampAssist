import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import Navbar from "../components/Navbar";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState("error");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await loginUser(email, password);
      setMsgType("success");
      setMessage(res.data.message);

      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userEmail", res.data.email);

      setTimeout(() => navigate("/buyer"), 1200);
    } catch (err) {
      setMsgType("error");
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="dashboard-section">
        <div className="cta-card" style={{ backgroundColor: "#212121", padding: "4rem", borderRadius: "20px", width: "380px", margin: "auto" }}>

          <h2 className="hero-heading" style={{ color: "white", marginBottom: "1.5rem", textAlign: "center" }}>Login</h2>



          <form onSubmit={handleLogin}>
            <input
              placeholder="College Email"
              className="auth-input"
              style={{ width: "100%", marginBottom: "12px", padding: "10px", borderRadius: "10px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Password"
              className="auth-input"
              type="password"
              style={{ width: "100%", marginBottom: "18px", padding: "10px", borderRadius: "10px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {message && (
              <div
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  marginBottom: "16px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  backgroundColor: msgType === "success" ? "#2e7d32" : "#c62828",
                  color: "white"
                }}
              >
                {message}
              </div>
            )}
            <button type="submit" className="btn role-btn" style={{ width: "100%", padding: "10px", borderRadius: "10px" }} disabled={loading}>
              {loading ? "Verifying..." : "Login"}
            </button>
          </form>

          <p className="md-txt" style={{ marginTop: "1rem", textAlign: "center", color: "#ffe8cc" }}>
            New here?{" "}
            <span onClick={() => navigate("/register")} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>
              Create an account
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
