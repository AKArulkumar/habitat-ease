import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory

const ResidentRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    house_no: "",
    block_no: "",
    name: "",
    phone: "",
  });
  const navigate = useNavigate();  // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/resident/register", formData);

      if (response.data.success) {
        alert("Resident registered successfully!");
        navigate("/resident-login");  // Use navigate() instead of history.push()
      } else {
        alert("Registration failed! Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-form">
      <h2>Resident Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="house_no"
          placeholder="House No."
          value={formData.house_no}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="block_no"
          placeholder="Block No."
          value={formData.block_no}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ResidentRegister;
