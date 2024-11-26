import React, { useState } from "react";
import axios from "axios";

const RequestServices = () => {
  const [serviceType, setServiceType] = useState("");
  const [serviceName, setServiceName] = useState("");

  const handleServiceRequest = async () => {
    try {
      const response = await axios.post("/api/service/request", {
        serviceType,
        serviceName,
      });
      if (response.data.success) {
        alert("Service requested successfully");
      }
    } catch (error) {
      console.error("Error requesting service", error);
    }
  };

  return (
    <div className="request-services">
      <h2>Request Services</h2>
      <select onChange={(e) => setServiceType(e.target.value)}>
        <option value="indoor">Indoor</option>
        <option value="outdoor">Outdoor</option>
      </select>
      <select onChange={(e) => setServiceName(e.target.value)}>
        {serviceType === "indoor" && (
          <>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical Work</option>
            <option value="housecleaning">House Cleaning</option>
          </>
        )}
        {serviceType === "outdoor" && (
          <>
            <option value="gardening">Gardening</option>
            <option value="painting">Painting</option>
            <option value="roofrepair">Roof Repair</option>
          </>
        )}
      </select>
      <button onClick={handleServiceRequest}>Request Service</button>
    </div>
  );
};

export default RequestServices;
