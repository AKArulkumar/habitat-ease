const express = require("express");
const router = express.Router();
const pool = require("../db");

// Employee Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      `SELECT * FROM Employee_Login WHERE username = $1 AND password = $2`,
      [username, password]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, employee: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Employee Register
router.post("/register", async (req, res) => {
  const { username, password, name, phone, jobType } = req.body;
  try {
    const employeeResult = await pool.query(
      `INSERT INTO Employee_Login (username, password) VALUES ($1, $2) RETURNING id`,
      [username, password]
    );
    const employeeId = employeeResult.rows[0].id;

    await pool.query(
      `INSERT INTO Employee_Details (employee_id, name, phone, job_type) VALUES ($1, $2, $3, $4)`,
      [employeeId, name, phone, jobType]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Pending Requests by Job Type
router.get("/requests/:jobType", async (req, res) => {
  const { jobType } = req.params;
  try {
    const result = await pool.query(
      `SELECT rs.id, rs.service_name, r.house_no, r.block_no, r.name, r.phone 
       FROM Requested_Services rs
       INNER JOIN Resident_Details r ON rs.resident_id = r.resident_id
       WHERE rs.status = 'Pending' AND rs.job_type = $1`,
      [jobType]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark Request as Completed
router.post("/complete-request", async (req, res) => {
  const { requestId, employeeId } = req.body;
  try {
    await pool.query(
      `UPDATE Requested_Services 
       SET status = 'Completed', assigned_employee = $1 
       WHERE id = $2`,
      [employeeId, requestId]
    );

    await pool.query(
      `INSERT INTO Completed_Work (employee_id, service_id) VALUES ($1, $2)`,
      [employeeId, requestId]
    );

    res.json({ success: true, message: "Request marked as completed!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Completed Requests
router.get("/completed/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  try {
    const result = await pool.query(
      `SELECT rs.service_name, rs.job_type, r.house_no, r.block_no, r.name, r.phone, cw.completion_date
       FROM Completed_Work cw
       INNER JOIN Requested_Services rs ON cw.service_id = rs.id
       INNER JOIN Resident_Details r ON rs.resident_id = r.resident_id
       WHERE cw.employee_id = $1`,
      [employeeId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
