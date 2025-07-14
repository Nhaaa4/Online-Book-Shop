export default function logger(req, res, next) {
  const start = Date.now();
  console.log(`${req.method} ${req.url} - Request started at ${new Date(start).toISOString()}`);

  next();
}