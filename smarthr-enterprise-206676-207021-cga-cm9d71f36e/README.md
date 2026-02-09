# smarthr-enterprise-206676-207021

Minimal Node.js service scaffold (Express) intended as a starting point for a SmartHR AI/automation backend.

## Run locally / in preview

From this directory:

```bash
npm install
npm start
```

The service listens on port **3001** by default (preview expects 3001). You can override with:

```bash
PORT=3001 npm start
```

## Endpoints

- `GET /` — basic HTML home page with a link to `/health`
- `GET /health` — health check JSON