const { rateLimit } = require("express-rate-limit");

function createRateLimiter(windowMs, max, message) {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    message: message,
  });
}

module.exports = createRateLimiter;
