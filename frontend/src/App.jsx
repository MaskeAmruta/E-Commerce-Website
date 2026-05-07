import React, { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter, Link, Routes, Route, useNavigate } from 'react-router-dom';
import Cart from './pages/Cart';
import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './pages/ProtectedRoute'
import AddProduct from './pages/admin/AddProduct';
import ManageProducts from './pages/admin/ManageProducts';
import { toast, ToastContainer } from 'react-toastify';

function AppContent() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  // update role when app loads
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setRole(null);
    toast.success("Logged out successfully" , {style:{background:"#2b0b0b", color:"#f87171" }})
    navigate("/" );
  };

  return (
    <>
      {/* ✅ NAVBAR */}
      <nav className='navbar'>
        {role === "ADMIN" ? (
          <>
            <Link to="/admin">AdminDashboard</Link>
            <Link to="/admin/addproduct">Add Product</Link>
            <Link to="/admin/manage">Manage Products</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
          <div className="nav-left">
            <Link to="/">Home</Link>
          </div>
           
           <div className="nav-right">
           
            {!role && <Link to="/login">Login</Link>}
            {!role && <Link to="/register">Register</Link>}
           </div>
            
           

            {role === "USER" && (
              <>
                
                <div className="nav-right">
                  <Link to="/cart">Cart</Link>
                  <Link to="/user">Dashboard</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
                
              </>
            )}
          </>
        )}
      </nav>

      {/* ✅ ROUTES */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login  setRole={setRole}/>} />
        <Route path='/register' element={<Register />} />

        {/* ADMIN */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

         <Route 
            path='/admin/addproduct'
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AddProduct />
              </ProtectedRoute>
            } />
         
         
        <Route
          path='/admin/manage'
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <ManageProducts />
            </ProtectedRoute>
          }
        />

        {/* USER */}
        <Route
          path='/user'
          element={
            <ProtectedRoute roleRequired="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position='top-right' autoClose={1500} pauseOnHover={false} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}