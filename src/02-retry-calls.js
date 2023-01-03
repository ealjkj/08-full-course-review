const urlQuery = (url) => () => fetch(url);

const maxRetry = 3;
const useIncrement = true;
const delay = 1000;

/**
 * perform query successfully once or try up to a maximum of maxRetry times
 * if unsuccessful, delay the next attempt for an amount of time. If attempts
 * continue to fail then increase the delay between attempts if useIncrements
 * is set to true.
 */

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const queryRetry = async (task, maxRetry, delay, useIncrement) => {
  const increment = useIncrement ? 1000 : 0;
  for (let i = 0; i < maxRetry; i++) {
    const response = await task();
    if (response.status !== 404) {
      return response.json();
    }
    await wait(delay);
    delay += increment;
  }

  throw new Error("Max retrys exceeded");
};

const handleSuccess = (value) => {
  console.log("success", value);
};
const handleErrorOrMaxRetryExceeded = (error) => {
  console.log("error", error);
};

queryRetry(urlQuery("http://www.some/url"), maxRetry, delay, useIncrement)
  .then(handleSuccess)
  .catch(handleErrorOrMaxRetryExceeded);
