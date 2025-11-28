import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InputSampah from "./pages/InputSampah";
import DailyPoin from "./pages/DailyPoin";
import CheckPoin from "./pages/CheckPoin";
import JemputSampah from "./pages/JemputSampah";
import Contact from "./pages/Contact";
import { initializeStorage } from "./utils/storage";

const App = () => {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/input-sampah" element={<InputSampah />} />
      <Route path="/daily-poin" element={<DailyPoin />} />
      <Route path="/check-poin" element={<CheckPoin />} />
      <Route path="/jemput-sampah" element={<JemputSampah />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default App;
