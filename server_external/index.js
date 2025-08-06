const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`External Service: ${req.method} ${req.path}`);
  next();
});

app.get('/health', (req, res) => {
  res.json({
    service: 'external-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/delay', async (req, res) => {
  const delay = Math.floor(Math.random() * 2000) + 500;

  setTimeout(() => {
    res.json({
      success: true,
      delay: delay,
      message: `Response delayed by ${delay}ms`,
      timestamp: new Date().toISOString(),
    });
  }, delay);
});

app.get('/api/unreliable', (req, res) => {
  const shouldFail = Math.random() < 0.7;

  if (shouldFail) {
    return res.status(500).json({
      success: false,
      error: 'Service temporarily unavailable',
      timestamp: new Date().toISOString(),
    });
  }

  res.json({
    success: true,
    message: 'Request succeeded',
    timestamp: new Date().toISOString(),
    data: {
      randomValue: Math.floor(Math.random() * 1000),
      requestId: Date.now(),
    },
  });
});

app.get('/api/slow', async (req, res) => {
  const processingTime = Math.floor(Math.random() * 3000) + 1000;

  setTimeout(() => {
    res.json({
      success: true,
      processingTime: processingTime,
      message: 'Slow operation completed',
      timestamp: new Date().toISOString(),
      data: {
        processedItems: Math.floor(Math.random() * 100),
        batchId: Date.now(),
      },
    });
  }, processingTime);
});

app.get('/api/status/:code', (req, res) => {
  const statusCode = parseInt(req.params.code) || 200;

  const responses = {
    200: { success: true, message: 'OK' },
    400: { success: false, error: 'Bad Request' },
    404: { success: false, error: 'Not Found' },
    500: { success: false, error: 'Internal Server Error' },
    503: { success: false, error: 'Service Unavailable' },
  };

  res.status(statusCode).json(responses[statusCode] || responses[200]);
});

app.use((err, req, res, next) => {
  console.error('External Service Error:', err);
  res.status(500).json({
    success: false,
    error: 'External service error',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`External service running on port ${PORT}`);
});

module.exports = app;
