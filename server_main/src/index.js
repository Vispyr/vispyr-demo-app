const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const routes = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

app.use(cors());
app.use(express.json());

app.locals.db = pool;
app.use('/api', routes);
app.use(errorHandler);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Main API server running on port ${PORT}`);
});

module.exports = app;
