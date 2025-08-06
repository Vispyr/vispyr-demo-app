const express = require('express');
const router = express.Router();
const {
  efficientSort,
  slowSort,
  longFunction,
  heapBreak,
  stackBreak,
  recursiveFunction,
  queryDatabase,
  multipleRetries,
  cpuIntensiveTask,
  simulateTraffic,
  internalServiceCall,
  networkLatencyTest,
  breakApp,
} = require('./controllers');

// Profile Testing Routes
router.get('/profile/efficient-sort', efficientSort);
router.get('/profile/slow-sort', slowSort);
router.get('/profile/long-function', longFunction);
router.get('/profile/heap-break', heapBreak);
router.get('/profile/stack-break', stackBreak);
router.get('/profile/recursive', recursiveFunction);
router.get('/profile/cpu-intensive', cpuIntensiveTask);

// Trace Testing Routes
router.get('/trace/database-query', queryDatabase);
router.get('/trace/multiple-retries', multipleRetries);
router.get('/trace/internal-service', internalServiceCall);
router.get('/trace/network-latency', networkLatencyTest);

// Metrics Testing Routes
router.get('/metrics/simulate-traffic', simulateTraffic);

// App Breaking Routes
router.get('/break-app', breakApp);

// Complex endpoint that combines multiple operations
router.get('/complex-operation', async (req, res) => {
  try {
    const startTime = Date.now();

    // Simulate multiple internal operations
    await new Promise((resolve) => setTimeout(resolve, 100));
    const dbResult = await req.app.locals.db.query(
      'SELECT NOW() as current_time'
    );
    await new Promise((resolve) => setTimeout(resolve, 50));

    const endTime = Date.now();

    res.json({
      success: true,
      duration: endTime - startTime,
      dbTime: dbResult.rows[0].current_time,
      message: 'Complex operation completed',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
