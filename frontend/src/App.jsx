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
import AuthRoute from "./components/AuthRoute/AuthRoute";

const AppContent = () => {
  const user = useSelector((state) => state?.auth?.user);
  const loading = useNavigationDelay(100);

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        {/* Navbar */}
        {user ? <PrivateNavbar /> : <PublicNavbar />}

        {loading && <ParticleEmitter />}

        {/* Main Content */}
        <main className="flex flex-col justify-center">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />

            {/* Protected Routes */}
            <Route
              path="/add-category"
              element={
                <AuthRoute>
                  <AddCategory />
                </AuthRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <AuthRoute>
                  <CategoriesList />
                </AuthRoute>
              }
            />
            <Route
              path="/update-category/:id"
              element={
                <AuthRoute>
                  <UpdateCategory />
                </AuthRoute>
              }
            />
            <Route
              path="/add-transaction"
              element={
                <AuthRoute>
                  <TransactionForm />
                </AuthRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AuthRoute>
                  <Dashboard />
                </AuthRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <UserProfile />
                </AuthRoute>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-200 text-center py-4">
          Copyright &copy; {new Date().getFullYear()} Mr Expenses Tracker
        </footer>
      </div>
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
