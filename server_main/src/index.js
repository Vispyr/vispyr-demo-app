const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const routes = require("./routes");
const { errorHandler } = require("./middlewares");

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || "testuser",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "telemetry_test",
  password: process.env.DB_PASSWORD || "testpass",
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully");
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Make pool available to routes
app.locals.db = pool;

// Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Main API server running on port ${PORT}`);
});

module.exports = app;
