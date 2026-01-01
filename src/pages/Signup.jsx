import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState("error");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const checkStrength = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(pass)) return "Password must contain 1 uppercase letter";
    if (!/[0-9]/.test(pass)) return "Password must contain 1 number";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (password !== confirm) throw new Error("Passwords do not match");

      const weak = checkStrength(password);
      if (weak) throw new Error(weak);

      const res = await registerUser(name, email, password);
      setMsgType("success");
      setMessage(res.data.message);

      // Auto login after register
      const loginRes = await loginUser(email, password);
      localStorage.setItem("userName", loginRes.data.name);
      localStorage.setItem("userEmail", loginRes.data.email);

      setTimeout(() => navigate("/buyer"), 1200);
    } catch (err) {
      setMsgType("error");
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="dashboard-section">
        <div className="cta-card" style={{ backgroundColor: "#212121", padding: "4rem", borderRadius: "20px", width: "380px", margin: "auto" }}>
          <h2 className="hero-heading" style={{ color: "white", marginBottom: "1.5rem", textAlign: "center" }}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              className="auth-input"
              style={{ width: "100%", marginBottom: "12px", padding: "10px", borderRadius: "10px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              style={{ width: "100%", marginBottom: "12px", padding: "10px", borderRadius: "10px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              placeholder="Confirm Password"
              className="auth-input"
              type="password"
              style={{ width: "100%", marginBottom: "18px", padding: "10px", borderRadius: "10px" }}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="md-txt" style={{ marginTop: "1rem", textAlign: "center", color: "#ffe8cc" }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>
              Login
            </span>
          </p>

        </div>
      </section>
    </>
  );
}
