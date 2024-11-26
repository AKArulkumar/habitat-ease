import React, { useState } from "react";
import axios from "axios";

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    jobType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/employee/register", formData);
      if (response.data.success) {
        alert("Employee registered successfully!");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-form">
      <h2>Employee Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <select name="jobType" onChange={handleChange}>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default EmployeeRegister;
