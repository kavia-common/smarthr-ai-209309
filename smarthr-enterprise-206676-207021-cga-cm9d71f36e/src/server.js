'use strict';

const express = require('express');

/**
 * Resolve the port for the service.
 * Preview system expects 3001; allow override via PORT for flexibility.
 */
function resolvePort() {
  const raw = process.env.PORT;
  const fallback = 3001;

  if (!raw) return fallback;

  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return parsed;
}

const app = express();
app.disable('x-powered-by');

/**
 * Lightweight healthcheck for preview/runtime verification.
 * Returns status + basic timestamp.
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'smarthr-enterprise-206676-207021',
    time: new Date().toISOString()
  });
});

/**
 * Root endpoint: helpful message to confirm the server is up.
 */
app.get('/', (req, res) => {
  res
    .status(200)
    .type('text/plain')
    .send('SmartHR AI service scaffold is running. Try GET /health\n');
});

const port = resolvePort();

app.listen(port, () => {
  // Intentionally log a single line to make preview logs clear.
  console.log(`Server listening on port ${port}`);
});
