import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HeroSection from "./components/Home/HomePage";
import LoginForm from "./components/Users/Login";
import RegistrationForm from "./components/Users/Register";
import { useSelector } from "react-redux";

import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { getUserFromStorage } from "./utils/getUserFromStorage";
import AddCategory from "./components/Category/AddCategory";

function App() {
  const token = getUserFromStorage();
  const user = useSelector((state) => state?.auth?.user);

  return (
    <>
      <BrowserRouter>
        {/* navbar */}

        {user ? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/add-category" element={<AddCategory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
