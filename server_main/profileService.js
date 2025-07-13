const Pyroscope = require('@pyroscope/nodejs');

Pyroscope.init({
  serverAddress: 'http://pyroscope:4040',
  appName: 'Telemetry-Test-App',
});

console.log('Starting Pyroscope Profiler');
Pyroscope.start();
