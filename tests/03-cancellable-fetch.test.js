const cancellableFetch = require("../src/03-cancellable-fetch");
const FakeTimers = require("@sinonjs/fake-timers");
const clock = FakeTimers.install();

afterEach(() => {
  fetch.resetMocks();
});

test("Cancels a fetch", async () => {
  fetch.mockResponses([JSON.stringify({ data: "12345" }), { status: 200 }]);

  const result = cancellableFetch("source");
  result.cancel();

  result.catch((error) =>
    expect(error).to.contain("The user aborted a request.")
  );
});

test("Normal fetch when no cancelation is specified", async () => {
  fetch.mockResponses([JSON.stringify({ data: "12345" }), { status: 200 }]);

  const result = cancellableFetch("source");

  result
    .then((res) => res.json())
    .then(({ data }) => expect(data).toBe("12345"));
});
