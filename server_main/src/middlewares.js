const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err);

  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (err.code === 'ECONNREFUSED') {
    statusCode = 503;
    message = 'Service Unavailable';
  } else if (err.code === 'ENOTFOUND') {
    statusCode = 503;
    message = 'External Service Not Found';
  } else if (err.code === 'ECONNRESET') {
    statusCode = 503;
    message = 'Connection Reset';
  } else if (err.response && err.response.status) {
    statusCode = err.response.status;
    message = err.response.data?.message || err.message;
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
    timestamp: new Date().toISOString(),
  });
};

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(
      `${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

const rateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  const requests = new Map();

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();

    if (!requests.has(key)) {
      requests.set(key, { count: 1, windowStart: now });
      return next();
    }

    const requestData = requests.get(key);

    if (now - requestData.windowStart > windowMs) {
      requests.set(key, { count: 1, windowStart: now });
      return next();
    }

    if (requestData.count >= max) {
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: 'Rate limit exceeded',
      });
    }

    requestData.count++;
    next();
  };
};

module.exports = {
  errorHandler,
  requestLogger,
  rateLimiter,
};
