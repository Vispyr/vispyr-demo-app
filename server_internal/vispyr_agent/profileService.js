const Pyroscope = require('@pyroscope/nodejs');

Pyroscope.init({
  serverAddress: 'http://host.docker.internal:9999',
  appName: process.env.OTEL_SERVICE_NAME,
});

console.log('Starting Pyroscope Profiler');
Pyroscope.start();
