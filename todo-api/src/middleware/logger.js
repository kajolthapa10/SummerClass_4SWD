// middleware/logger.js

// Logs the HTTP method, URL, and timestamp for every incoming request,
// then measures how long the request took to complete.
export function requestLogger(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);

  // 'finish' fires once the response has been sent to the client
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`  → ${res.statusCode} (${duration}ms)`);
  });

  next();
}