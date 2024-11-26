const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoutes");
const residentRoutes = require("./routes/residentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/employee", employeeRoutes);
app.use("/api/resident", residentRoutes);
app.use("/api/service", serviceRoutes);

// Server start
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

