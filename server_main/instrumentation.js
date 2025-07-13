// NODE SDK APPROACH

// const opentelemetry = require('@opentelemetry/sdk-node');
// const {
//   getNodeAutoInstrumentations,
// } = require('@opentelemetry/auto-instrumentations-node');
// const {
//   OTLPTraceExporter,
// } = require('@opentelemetry/exporter-trace-otlp-grpc');
// const {
//   OTLPMetricExporter,
// } = require('@opentelemetry/exporter-metrics-otlp-grpc');
// const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');

// const sdk = new opentelemetry.NodeSDK({
//   traceExporter: new OTLPTraceExporter(),
//   metricReader: new PeriodicExportingMetricReader({
//     exporter: new OTLPMetricExporter(),
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
// });

// console.log('Starting OTLP Instrumentation');
// sdk.start();

// HOST-METRICS APPROACH

// const { MeterProvider } = require('@opentelemetry/sdk-metrics');
// const { HostMetrics } = require('@opentelemetry/host-metrics');
// const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// const exporter = new PrometheusExporter(
//   {
//     startServer: true,
//   },
//   () => {
//     console.log('prometheus scrape endpoint: http://localhost:9464/metrics');
//   }
// );

// const meterProvider = new MeterProvider({
//   readers: [exporter],
// });

// const hostMetrics = new HostMetrics({ meterProvider });
// hostMetrics.start();
