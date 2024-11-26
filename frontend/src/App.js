import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
import Navbar from "./components/Navbar";
import EmployeeLogin from "./components/EmployeeLogin";
import EmployeeRegister from "./components/EmployeeRegister";
import ResidentLogin from "./components/ResidentLogin";
import ResidentRegister from "./components/ResidentRegister";
import Dashboard from "./components/Dashboard";
import RequestServices from "./components/RequestServices";
import PayRent from "./components/PayRent";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes> {/* Replace Switch with Routes */}
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/employee-register" element={<EmployeeRegister />} />
        <Route path="/resident-login" element={<ResidentLogin />} />
        <Route path="/resident-register" element={<ResidentRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request-services" element={<RequestServices />} />
        <Route path="/pay-rent" element={<PayRent />} />
      </Routes>
    </Router>
  );
}

export default App;
