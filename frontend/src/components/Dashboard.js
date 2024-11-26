import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const employee = JSON.parse(localStorage.getItem("employee"));

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await axios.get(`/api/employee/requests/${employee.jobType}`);
      setRequests(response.data);
    };
    fetchRequests();
  }, [employee.jobType]);

  return (
    <div className="dashboard">
      <h2>Welcome, {employee.name}</h2>
      <h3>Pending Requests</h3>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            {req.service_name} - {req.name} ({req.phone})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
