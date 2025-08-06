const axios = require("axios");
const {
  quickSort,
  bubbleSort,
  longRunningTask,
  createHeapStress,
  createStackOverflow,
  deepRecursion,
  cpuBoundTask,
  simulateHighTraffic,
  primeMedian,
} = require("./utilities");

const EXTERNAL_SERVICE_URL =
  process.env.EXTERNAL_SERVICE_URL || "http://localhost:3002";
const INTERNAL_SERVICE_URL =
  process.env.INTERNAL_SERVICE_URL || "http://localhost:3003";

// Profile Testing Controllers
const efficientSort = async (req, res) => {
  try {
    const startTime = Date.now();
    const result = quickSort();
    const endTime = Date.now();

    res.json({
      success: true,
      algorithm: "quicksort",
      duration: endTime - startTime,
      arraySize: result.length,
      message: "Efficient sort completed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const slowSort = async (req, res) => {
  try {
    const startTime = Date.now();
    const result = bubbleSort();
    const endTime = Date.now();

    res.json({
      success: true,
      algorithm: "bubblesort",
      duration: endTime - startTime,
      arraySize: result.length,
      message: "Slow sort completed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const longFunction = async (req, res) => {
  try {
    const startTime = Date.now();
    await longRunningTask();
    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      message: "Long function completed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const heapBreak = async (req, res) => {
  try {
    const startTime = Date.now();
    const result = createHeapStress();
    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      memoryUsed: result.memoryUsed,
      message: "Heap stress test completed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const stackBreak = async (req, res) => {
  try {
    const startTime = Date.now();
    const result = createStackOverflow();
    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      depth: result.depth,
      message: "Stack stress test completed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const recursiveFunction = async (req, res) => {
  try {
    const startTime = Date.now();
    const result = deepRecursion(10); // 7 levels deep
    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      result: result,
      message: "Recursive function completed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const cpuIntensiveTask = async (req, res) => {
  try {
    const startTime = Date.now();
    const result = cpuBoundTask();
    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      calculations: result,
      message: "CPU intensive task completed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Trace Testing Controllers
// const queryDatabase = async (req, res) => {
//   try {
//     const startTime = Date.now();
//
//     // Create test table if it doesn't exist
//     await req.app.locals.db.query(`
//       CREATE TABLE IF NOT EXISTS test_data (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100),
//         value INTEGER,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);
//
//     // Insert some test data
//     await req.app.locals.db.query(`
//       INSERT INTO test_data (name, value)
//       VALUES ('test_${Date.now()}', ${Math.floor(Math.random() * 1000)})
//     `);
//
//     // Query the data
//     const result = await req.app.locals.db.query(`
//       SELECT * FROM test_data
//       ORDER BY created_at DESC
//       LIMIT 10
//     `);
//
//     const endTime = Date.now();
//
//     res.json({
//       success: true,
//       duration: endTime - startTime,
//       rowCount: result.rowCount,
//       data: result.rows,
//       message: 'Database query completed successfully',
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

const multipleRetries = async (req, res) => {
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds
  let attempt = 0;
  let lastError;

  const startTime = Date.now();

  while (attempt < maxRetries) {
    try {
      attempt++;

      // Simulate an API call that might fail
      const response = await axios.get(
        `${EXTERNAL_SERVICE_URL}/api/unreliable`,
        {
          timeout: 3000,
        },
      );

      const endTime = Date.now();

      return res.json({
        success: true,
        attempt: attempt,
        duration: endTime - startTime,
        data: response.data,
        message: `Retry scenario succeeded on attempt ${attempt}`,
      });
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }

  const endTime = Date.now();

  res.status(500).json({
    success: false,
    attempts: attempt,
    duration: endTime - startTime,
    error: lastError.message,
    message: `Retry scenario failed after ${maxRetries} attempts`,
  });
};

const internalServiceCall = async (req, res) => {
  try {
    const startTime = Date.now();

    // Call internal service
    const response = await axios.get(`${INTERNAL_SERVICE_URL}/api/process`, {
      timeout: 10000,
    });

    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      serviceResponse: response.data,
      message: "Internal service call completed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const networkLatencyTest = async (req, res) => {
  try {
    const startTime = Date.now();

    // Call external service to simulate network latency
    const response = await axios.get(`${EXTERNAL_SERVICE_URL}/api/delay`, {
      timeout: 10000,
    });

    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      networkLatency: response.data.delay,
      message: "Network latency test completed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Metrics Testing Controllers
const simulateTraffic = async (req, res) => {
  try {
    const startTime = Date.now();
    const results = await simulateHighTraffic();
    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      requestsProcessed: results.requestsProcessed,
      avgResponseTime: results.avgResponseTime,
      message: "Traffic simulation completed successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const breakApp = () => {
  try {
    const startTime = Date.now();
    const results = primeMedian(10_000_000_000);
    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      requestsProcessed: results.requestsProcessed,
      avgResponseTime: results.avgResponseTime,
      message: "Somehow the App survived",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  efficientSort,
  slowSort,
  longFunction,
  heapBreak,
  stackBreak,
  recursiveFunction,
  // queryDatabase,
  multipleRetries,
  cpuIntensiveTask,
  simulateTraffic,
  internalServiceCall,
  networkLatencyTest,
  breakApp,
};
