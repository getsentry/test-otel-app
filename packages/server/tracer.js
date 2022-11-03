// const { AlwaysOnSampler } = request('@opentelemetry/core');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { SentrySpanProcessor } = require('@sentry/opentelemetry-node');
const opentelemetry = require('@opentelemetry/api');

 const setupTracing = (serviceName) => {
    const provider = new NodeTracerProvider();

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
    provider.register();
  
    return opentelemetry.trace.getTracer(serviceName);
  };
  


module.exports = { setupTracing };