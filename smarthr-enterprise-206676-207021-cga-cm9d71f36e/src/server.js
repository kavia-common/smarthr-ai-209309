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
 * Root endpoint: a tiny home page to confirm the server is up.
 * Keep it dependency-free and human-friendly for quick preview validation.
 */
app.get('/', (req, res) => {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>SmartHR AI Service</title>
  </head>
  <body>
    <main>
      <h1>SmartHR AI service scaffold</h1>
      <p>The server is running.</p>
      <p>
        Health check:
        <a href="/health">GET /health</a>
      </p>
    </main>
  </body>
</html>`;

  res.status(200).type('text/html; charset=utf-8').send(html);
});

const port = resolvePort();

app.listen(port, () => {
  // Intentionally log a single line to make preview logs clear.
  console.log(`Server listening on port ${port}`);
});
