const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",          // Replace with your PostgreSQL username
  host: "localhost",
  database: "residential_services", // Your database name
  password: "123",           // Replace with your PostgreSQL password
  port: 5432,                // Default PostgreSQL port
});

// Query to fetch table names from the 'public' schema
pool.query(`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
`, (err, res) => {
  if (err) {
    console.error('Error fetching table names:', err);
  } else {
    console.log('Table Names:', res.rows);
  }
  pool.end();
});

module.exports = pool;
