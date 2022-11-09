# test-otel-app

## Server

Run it on Port 4000:

```
cd packages/server && SENTRY_DSN=https://1293f52b8a954953b8a849dd51c7aefd@o447951.ingest.sentry.io/4504118275604480 yarn start
```

## Client

Run it on Port 3000:

```
cd packages/client && REACT_APP_SENTRY_DSN=https://df424cdc6c1248169a9ae9dd48a42191@o447951.ingest.sentry.io/4504118274883584 yarn start
```
