const cancellableFetch = (input, init) => {
  const controller = new AbortController();

  const myFetch = fetch(input, { ...init, signal: controller.signal });

  myFetch.cancel = () => controller.abort();

  return myFetch;
};

module.exports = cancellableFetch;
