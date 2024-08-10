import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroSection from "./components/Home/HomePage";
import LoginForm from "./components/Users/Login";
import RegistrationForm from "./components/Users/Register";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import Dashboard from "./components/Users/Dashboard";
import UserProfile from "./components/Users/UserProfile";
import ParticleEmitter from "./components/LoadingPage/Loading"; // Loader component
import useNavigationDelay from "./hooks/UseNavigateDelay";

const AppContent = () => {
  const user = useSelector((state) => state?.auth?.user);
  const loading = useNavigationDelay(100);

  return (
    <>
      {/* Navbar */}
      {user ? <PrivateNavbar /> : <PublicNavbar />}

      {loading && <ParticleEmitter />}

      {/* Routes */}
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
      </Routes>
      {/* Footer */}
      <footer className="text-gray-200 bg-gray-800 text-center py-4">
        Copyright &copy; {new Date().getFullYear()} Mr Expenses Tracker
      </footer>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
