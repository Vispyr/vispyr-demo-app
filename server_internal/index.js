const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`Internal Service: ${req.method} ${req.path}`);
  next();
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    service: "internal-service",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Complex processing endpoint that creates longer traces
app.get("/api/process", async (req, res) => {
  const startTime = Date.now();

  try {
    // Simulate multi-step processing
    console.log("Starting complex processing...");

    // Step 1: Data validation
    await simulateStep("validation", 200, 500);

    // Step 2: Data transformation
    await simulateStep("transformation", 300, 800);

    // Step 3: Business logic processing
    await simulateStep("business-logic", 500, 1200);

    // Step 4: Data persistence simulation
    await simulateStep("persistence", 100, 400);

    // Step 5: Response preparation
    await simulateStep("response-prep", 50, 200);

    const endTime = Date.now();
    const totalDuration = endTime - startTime;

    res.json({
      success: true,
      duration: totalDuration,
      steps: [
        { name: "validation", duration: "200-500ms" },
        { name: "transformation", duration: "300-800ms" },
        { name: "business-logic", duration: "500-1200ms" },
        { name: "persistence", duration: "100-400ms" },
        { name: "response-prep", duration: "50-200ms" },
      ],
      message: "Complex processing completed successfully",
      timestamp: new Date().toISOString(),
      processedData: {
        recordsProcessed: Math.floor(Math.random() * 1000) + 100,
        batchId: `batch_${Date.now()}`,
        validationsPassed: Math.floor(Math.random() * 50) + 20,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  }
});

// Simulate a processing step with variable duration
const simulateStep = async (stepName, minDuration, maxDuration) => {
  const duration =
    Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Step ${stepName} completed in ${duration}ms`);
      resolve();
    }, duration);
  });
};

// Endpoint that simulates database operations
app.get("/api/database-ops", async (req, res) => {
  const startTime = Date.now();

  try {
    // Simulate multiple database operations
    await simulateStep("connect-db", 50, 150);
    await simulateStep("query-users", 100, 300);
    await simulateStep("query-orders", 150, 400);
    await simulateStep("join-operations", 200, 500);
    await simulateStep("aggregate-data", 100, 250);
    await simulateStep("close-connection", 20, 80);

    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      operations: [
        "Database Connection",
        "User Query",
        "Order Query",
        "Join Operations",
        "Data Aggregation",
        "Connection Cleanup",
      ],
      message: "Database operations completed successfully",
      timestamp: new Date().toISOString(),
      results: {
        usersFound: Math.floor(Math.random() * 100) + 10,
        ordersFound: Math.floor(Math.random() * 500) + 50,
        aggregatedRecords: Math.floor(Math.random() * 50) + 5,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  }
});

// Endpoint that simulates external API calls
app.get("/api/external-calls", async (req, res) => {
  const startTime = Date.now();

  try {
    // Simulate calling multiple external services
    await simulateStep("auth-service", 100, 300);
    await simulateStep("user-service", 200, 600);
    await simulateStep("notification-service", 150, 400);
    await simulateStep("analytics-service", 100, 250);

    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      externalCalls: [
        { service: "auth-service", status: "success" },
        { service: "user-service", status: "success" },
        { service: "notification-service", status: "success" },
        { service: "analytics-service", status: "success" },
      ],
      message: "External API calls completed successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  }
});

// Endpoint that occasionally fails to test error handling
app.get("/api/flaky", (req, res) => {
  const shouldFail = Math.random() < 0.3; // 30% chance of failure

  if (shouldFail) {
    return res.status(500).json({
      success: false,
      error: "Internal service temporarily unavailable",
      timestamp: new Date().toISOString(),
    });
  }

  res.json({
    success: true,
    message: "Flaky service request succeeded",
    timestamp: new Date().toISOString(),
    data: {
      randomValue: Math.floor(Math.random() * 1000),
      requestId: `req_${Date.now()}`,
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Internal Service Error:", err);
  res.status(500).json({
    success: false,
    error: "Internal service error",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Internal service running on port ${PORT}`);
});

module.exports = app;
