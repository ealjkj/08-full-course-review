function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const queryRetry = async (task, maxRetry, delay = 0, useIncrement = false) => {
  const increment = useIncrement ? 1000 : 0;
  for (let i = 0; i < maxRetry; i++) {
    const response = await task();
    if (200 <= response.status && response.status < 400) {
      return response;
    }
    if (i < maxRetry - 1) {
      await wait(delay);
      delay = delay + i * increment;
    }
  }
  throw new Error("Max retrys exceeded");
};

module.exports = queryRetry;
