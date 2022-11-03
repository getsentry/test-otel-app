const Sentry = require("@sentry/node");
const { setupTracing } = require("./tracer");

 Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [],
  debug: true,
  tracesSampleRate: 1,
  defaultIntegrations: false
});    

let tracer = setupTracing('test-express-app');

const express = require("express");

const app = express();

const port = 3000;

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


app.get("/test", function (req, res) {
  res.send({ version: "v2" });
});

app.get("/test-2", function (req, res) {
  res.send({ other: 123 });
});

app.get("/test-param/:param", function (req, res) {
  res.send({ paramWas: req.params.param });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
