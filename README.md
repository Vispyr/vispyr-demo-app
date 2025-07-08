# Telemetry Testing Application

A comprehensive full-stack application designed for testing observability data including traces, profiles, and metrics.

## Architecture

- **Main API Server** (Port 3001): Core application with all testing endpoints
- **External Service** (Port 3002): Simulates external API calls and network latency
- **Internal Service** (Port 3003): Provides complex processing for longer traces
- **Frontend Dashboard** (Port 3000): React-based UI for triggering tests
- **PostgreSQL Database**: For database interaction testing

## Prerequisites

- Node.js 18+ 
- PostgreSQL 13+
- npm or yarn

## Setup Instructions

### 1. Database Setup

```bash
# Create database and user
createdb telemetry_test

psql telemetry_test -c "CREATE USER testuser WITH PASSWORD 'testpass';"
psql telemetry_test -c "GRANT ALL PRIVILEGES ON DATABASE telemetry_test TO testuser;"
psql telemetry_test -c "GRANT USAGE ON SCHEMA public TO testuser;"
psql telemetry_test -c "GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO testuser;"
psql telemetry_test -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO testuser;"
psql telemetry_test -c "GRANT CREATE ON SCHEMA public TO testuser;"
```

### 2. Main API Server

```bash
mkdir telemetry-test-main-api
cd telemetry-test-main-api
npm init -y
npm install express cors pg axios
npm install --save-dev nodemon

# Copy the files: index.js, routes.js, controllers.js, middlewares.js, utilities.js
# Update package.json with the provided configuration

npm run dev
```

### 3. External Service

```bash
mkdir telemetry-test-external-service
cd telemetry-test-external-service
npm init -y
npm install express cors
npm install --save-dev nodemon

# Copy the external service index.js file
# Update package.json with the provided configuration

npm run dev
```

### 4. Internal Service

```bash
mkdir telemetry-test-internal-service
cd telemetry-test-internal-service
npm init -y
npm install express cors
npm install --save-dev nodemon

# Copy the internal service index.js file
# Update package.json with the provided configuration

npm run dev
```

### 5. Frontend

```bash
npm create vite@latest telemetry-test-frontend -- --template react
cd telemetry-test-frontend
npm install
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Copy the App.jsx file
# Update package.json with the provided configuration

# Configure Tailwind CSS in tailwind.config.js:
# content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]

# Add Tailwind directives to src/index.css:
# @tailwind base;
# @tailwind components;
# @tailwind utilities;

npm run dev
```

## Environment Variables

### Main API Server (.env)
```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=telemetry_test
DB_USER=testuser
DB_PASSWORD=testpass
EXTERNAL_SERVICE_URL=http://localhost:3002
INTERNAL_SERVICE_URL=http://localhost:3003
```

### External Service (.env)
```
PORT=3002
```

### Internal Service (.env)
```
PORT=3003
```

## Testing Scenarios

### Profile Testing
- **Efficient Sort**: QuickSort algorithm on 100-element array
- **Slow Sort**: BubbleSort algorithm on 100-element array
- **Long Function**: 60-second CPU-bound task
- **Heap Break**: Memory stress test with large arrays
- **Stack Break**: Controlled stack depth test (10,000 levels)
- **Recursive Function**: 7-level deep recursion
- **CPU Intensive**: 10-second mathematical computation

### Trace Testing
- **Database Query**: PostgreSQL operations with table creation and queries
- **Multiple Retries**: 5 retry attempts with 5-second delays
- **Internal Service**: Complex multi-step processing
- **Network Latency**: External service calls with simulated delays
- **Complex Operation**: Combined database and processing operations

### Metrics Testing
- **High Traffic Simulation**: 100 concurrent requests
- **CPU Spikes**: From profile testing functions
- **Memory Usage**: From heap stress testing
- **Request Rates**: From traffic simulation
- **Error Rates**: From retry scenarios

## API Endpoints

### Main API Server (http://localhost:3001)

#### Profile Endpoints
- `GET /api/profile/efficient-sort` - QuickSort algorithm
- `GET /api/profile/slow-sort` - BubbleSort algorithm
- `GET /api/profile/long-function` - 60-second task
- `GET /api/profile/heap-break` - Memory stress test
- `GET /api/profile/stack-break` - Stack depth test
- `GET /api/profile/recursive` - Recursive function
- `GET /api/profile/cpu-intensive` - CPU-bound task

#### Trace Endpoints
- `GET /api/trace/database-query` - Database operations
- `GET /api/trace/multiple-retries` - Retry mechanism
- `GET /api/trace/internal-service` - Internal service call
- `GET /api/trace/network-latency` - Network latency test

#### Metrics Endpoints
- `GET /api/metrics/simulate-traffic` - High traffic simulation

#### Other Endpoints
- `GET /health` - Health check
- `GET /complex-operation` - Complex multi-step operation

### External Service (http://localhost:3002)
- `GET /health` - Health check
- `GET /api/delay` - Simulated network delay (500-2500ms)
- `GET /api/unreliable` - 70% failure rate for retry testing
- `GET /api/slow` - Slow processing (1-4 seconds)
- `GET /api/status/:code` - Return specific HTTP status codes

### Internal Service (http://localhost:3003)
- `GET /health` - Health check
- `GET /api/process` - Complex multi-step processing
- `GET /api/database-ops` - Simulated database operations
- `GET /api/external-calls` - Simulated external API calls
- `GET /api/flaky` - 30% failure rate endpoint

## Running All Services

```bash
# Terminal 1 - Main API
cd telemetry-test-main-api
npm run dev

# Terminal 2 - External Service
cd telemetry-test-external-service
npm run dev

# Terminal 3 - Internal Service
cd telemetry-test-internal-service
npm run dev

# Terminal 4 - Frontend
cd telemetry-test-frontend
npm run dev
```

## Usage

1. Start all services as described above
2. Open http://localhost:3000 in your browser
3. Use the dashboard to trigger different testing scenarios
4. Monitor the results in the UI
5. Check your observability tools for traces, profiles, and metrics

## Notes

- The application is designed to be instrumented with your preferred observability tools
- All endpoints include proper error handling and logging points
- The database will be automatically initialized with test data on first run
- Functions are designed to stress-test different aspects of your observability stack without crashing the application
- Memory and CPU intensive operations are bounded to prevent system crashes

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running and accessible
- Verify database credentials in .env file
- Check if the database and user exist

### Port Conflicts
- Verify no other services are running on ports 3000-3003
- Update port configurations in .env files if needed

### High Memory Usage
- The heap-break function intentionally uses significant memory
- Monitor system resources during testing
- Adjust array sizes in utilities.js if needed

### Stack Overflow Protection
- Stack-breaking functions are limited to prevent crashes
- Recursive functions have built-in depth limits
- Adjust limits in utilities.js based on your system capabilities

## Performance Expectations

- **Efficient Sort**: < 5ms for 100 elements
- **Slow Sort**: 50-100ms for 100 elements
- **Long Function**: Exactly 60 seconds
- **Database Query**: 10-50ms depending on system
- **Network Latency**: 500-2500ms simulated delay
- **CPU Intensive**: 10 seconds of computation
- **High Traffic**: 100 requests in 2-3 seconds

## Customization

### Adjusting Test Parameters
Edit `utilities.js` in the main API server to modify:
- Array sizes for sorting algorithms
- Duration of long-running functions
- Memory allocation amounts
- Stack depth limits
- Retry counts and delays

### Adding New Test Scenarios
1. Add new utility functions to `utilities.js`
2. Create corresponding controllers in `controllers.js`
3. Add routes to `routes.js`
4. Update the frontend with new buttons in `App.jsx`

### Database Schema
The application creates a simple test table:
```sql
CREATE TABLE IF NOT EXISTS test_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    value INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Security Considerations

- This application is designed for testing environments only
- No authentication or authorization is implemented
- Database credentials are stored in plain text
- Do not use in production environments
- All endpoints are publicly accessible

## License

This project is intended for testing and educational purposes. Use at your own risk.