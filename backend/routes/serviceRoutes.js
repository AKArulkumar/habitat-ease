const express = require("express");
const router = express.Router();
const pool = require("../db");

// Request a Service
router.post("/request", async (req, res) => {
  const { residentId, serviceName, jobType } = req.body;
  try {
    await pool.query(
      `INSERT INTO Requested_Services (resident_id, service_name, job_type) VALUES ($1, $2, $3)`,
      [residentId, serviceName, jobType]
    );
    res.json({ success: true, message: "Service request submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
