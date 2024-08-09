import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HeroSection from "./components/Home/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
