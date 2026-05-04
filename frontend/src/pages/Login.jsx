import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

export default function Login({ setRole }) {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();

            // ❌ if no token → stop
            if (!data.token) {
                alert("Login failed");
                return;
            }

            // ✅ store data
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);

            // ❌ if no role → stop
            if (!data.role) {
                alert("Role not found");
                return;
            }

            // ✅ store role
            localStorage.setItem("role", data.role);

            // 🔥 IMPORTANT: update React state (fixes auto refresh issue)
            setRole(data.role);

            // ✅ redirect based on role
            if (data.role === "ADMIN") {
                navigate("/admin");
            } else if (data.role === "USER") {
                navigate("/user");
            } else {
                alert("Unknown role");
                navigate("/");
            }

            alert("Login Successful");

        } catch (error) {
            alert(error.message || "Login failed");
        }
    };

   return (
  <div className="login-container">
    <div className="login-card">

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <button className='close-btn' onClick={()=>navigate("/")}>
            Cancle
        </button>
      </form>
    </div>
  </div>
);
}