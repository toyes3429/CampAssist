import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BuyerDashboard from "./pages/BuyerDashboard";
import RunnerDashboard from "./pages/RunnerDashboard";
import HomePage from "./pages/Home/HomePage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/runner" element={<RunnerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
