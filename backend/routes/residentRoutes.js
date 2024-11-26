const express = require("express");
const router = express.Router();
const pool = require("../db");

// Resident Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      `SELECT * FROM Resident_Login WHERE username = $1 AND password = $2`,
      [username, password]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, resident: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resident Register
router.post("/register", async (req, res) => {
  const { username, password, name, house_no, block_no, phone } = req.body;
  try {
    const residentResult = await pool.query(
      `INSERT INTO Resident_Login (username, password) VALUES ($1, $2) RETURNING id`,
      [username, password]
    );
    const residentId = residentResult.rows[0].id;

    await pool.query(
      `INSERT INTO Resident_Details (resident_id, house_no, block_no, name, phone) VALUES ($1, $2, $3, $4, $5)`,
      [residentId, house_no, block_no, name, phone]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
