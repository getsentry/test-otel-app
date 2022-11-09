// const { AlwaysOnSampler } = request('@opentelemetry/core');
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { Resource } = require("@opentelemetry/resources");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const {
  ExpressInstrumentation,
} = require("@opentelemetry/instrumentation-express");
const {
  SentrySpanProcessor,
  SentryPropagator,
} = require("@sentry/opentelemetry-node");
const opentelemetry = require("@opentelemetry/api");

const setupTracing = (serviceName) => {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      service: "otel-express",
      version: "1.0.0",
    }),
  });

  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      // Express instrumentation expects HTTP layer to be instrumented
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
    ],
  });

  provider.addSpanProcessor(new SentrySpanProcessor());

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register({ propagator: new SentryPropagator() });

  return opentelemetry.trace.getTracer(serviceName);
};

module.exports = { setupTracing };
