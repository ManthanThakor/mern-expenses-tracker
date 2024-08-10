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
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import Dashboard from "./components/Users/Dashboard";
import UserProfile from "./components/Users/UserProfile";
import ParticleComponent from "./components/LoadingPage/Loading";
import ThreeLoadingScreen from "./components/LoadingPage/Loading";
import ParticleEmitter from "./components/LoadingPage/Loading";

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
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/add-transaction" element={<TransactionForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/Loading" element={<ParticleEmitter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
