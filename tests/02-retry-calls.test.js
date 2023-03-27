const queryRetry = require("../src/02-retry-calls");
const FakeTimers = require("@sinonjs/fake-timers");
const clock = FakeTimers.install();

afterEach(() => {
  fetch.resetMocks();
});

test("The call returns the answer after the first try", async () => {
  fetch.mockResponses([JSON.stringify({ data: "12345" }), { status: 200 }]);

  const result = await queryRetry(() => fetch("https://hey"), 5);
  const ans = await result.json();
  expect(ans.data).toBe("12345");
});

test("The call returns the answer on the third try", async () => {
  fetch.mockResponses(
    [JSON.stringify({}), { status: 501 }],
    [JSON.stringify({}), { status: 501 }],
    [JSON.stringify({ data: "12345" }), { status: 200 }]
  );

  const result = queryRetry(() => fetch("https://hey"), 5, 1000);
  await clock.tickAsync(1000);
  expect(fetch).toHaveBeenCalledTimes(2);

  await clock.tickAsync(2000);
  expect(fetch).toHaveBeenCalledTimes(3);

  result
    .then((res) => res.json())
    .then(({ data }) => expect(data).toBe("12345"));
});

test("Fetching fails every time with status: 501", async () => {
  fetch.mockResponse(JSON.stringify({}), { status: 501 });

  queryRetry(() => fetch("https://hey"), 5, 1000).catch((error) =>
    expect(error.message).toMatch("Max retrys exceeded")
  );

  await clock.tickAsync(3999);
  expect(fetch).toHaveBeenCalledTimes(4);

  await clock.tickAsync(4000);
  expect(fetch).toHaveBeenCalledTimes(5);
});

test("useIncrement true, Fetching fails every time with status: 501", async () => {
  fetch.mockResponse(JSON.stringify({}), { status: 501 });

  queryRetry(() => fetch("https://hey"), 5, 1000, true).catch((error) =>
    expect(error.message).toMatch("Max retrys exceeded")
  );

  await clock.tickAsync(4000);
  expect(fetch).not.toHaveBeenCalledTimes(5);

  await clock.runAllAsync();
  expect(fetch).toHaveBeenCalledTimes(5);
});
