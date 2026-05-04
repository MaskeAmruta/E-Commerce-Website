import React, { useState } from 'react'

export default function Register() {
const [user, setUser] = useState({
    name: " ",
    email: " ",
    password: " "
});

const handleChange =(e)=>{
    setUser({...user, [e.target.name]: e.target.value});
}

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();

        // ❌ if already exists
        if (data.message === "Email already registered !") {
            alert(data.message);
            return;
        }

        // ✅ store token
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert("Registered & Logged in!");

        // ✅ redirect
        if (data.role === "ADMIN") {
            navigate("/admin-dashboard");
        } else {
            navigate("/user-dashboard");
        }

    } catch (error) {
        alert("Error registering user");
    }
};


  return (
    <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input name='name' placeholder='Name' onChange={handleChange} />
            <input name='email' placeholder='Email' onChange={handleChange} />
            <input name='password' placeholder='Password' onChange={handleChange}/>
            
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}
