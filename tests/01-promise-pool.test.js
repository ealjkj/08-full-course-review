const runTasks = require("../src/01-promise-pool");
const FakeTimers = require("@sinonjs/fake-timers");
const clock = FakeTimers.install();
const fn = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

const taskFactorySample = (delay, resolve, val) => () =>
  new Promise((res, rej) =>
    setTimeout(
      (value) => {
        fn();
        return resolve ? res(value) : rej(value);
      },
      delay,
      val
    )
  );

test("All tasks are sucessfully resolved", async () => {
  const pool_size = 2;
  const tasks = [
    taskFactorySample(500, true, 1),
    taskFactorySample(1000, true, 2),
    taskFactorySample(5000, true, 3),
    taskFactorySample(2000, true, 4),
    taskFactorySample(1000, true, 5),
    taskFactorySample(1000, true, 6),
  ];

  const result = runTasks(tasks, pool_size);

  await clock.tickAsync(500);
  expect(fn).toHaveBeenCalledTimes(1);

  await clock.tickAsync(500);
  expect(fn).toHaveBeenCalledTimes(2);

  await clock.tickAsync(2000);
  expect(fn).toHaveBeenCalledTimes(3);

  await clock.tickAsync(1000);
  expect(fn).toHaveBeenCalledTimes(4);

  await clock.tickAsync(1000);
  expect(fn).toHaveBeenCalledTimes(5);

  await clock.tickAsync(499);
  expect(fn).toHaveBeenCalledTimes(5);

  await clock.tickAsync(1);
  expect(fn).toHaveBeenCalledTimes(6);
  await expect(result).resolves.toStrictEqual([1, 2, 3, 4, 5, 6]);
});

test("Some promises reject", async () => {
  const pool_size = 2;
  const tasks = [
    taskFactorySample(500, true, 1),
    taskFactorySample(1000, false, "error"),
    taskFactorySample(5000, true, 3),
    taskFactorySample(2000, false, "error"),
    taskFactorySample(1000, false, "error"),
    taskFactorySample(1000, true, 6),
  ];

  const result = runTasks(tasks, pool_size);

  await clock.tickAsync(500);
  expect(fn).toHaveBeenCalledTimes(1);

  await clock.tickAsync(500);
  expect(fn).toHaveBeenCalledTimes(2);

  await clock.tickAsync(2000);
  expect(fn).toHaveBeenCalledTimes(3);

  await clock.tickAsync(1000);
  expect(fn).toHaveBeenCalledTimes(4);

  await clock.tickAsync(1000);
  expect(fn).toHaveBeenCalledTimes(5);

  await clock.tickAsync(499);
  expect(fn).toHaveBeenCalledTimes(5);

  await clock.tickAsync(1);
  expect(fn).toHaveBeenCalledTimes(6);
  await expect(result).resolves.toStrictEqual([
    1,
    "error",
    3,
    "error",
    "error",
    6,
  ]);
});

test("Edge case: Poolsize 1", async () => {
  const pool_size = 1;
  const tasks = [
    taskFactorySample(500, true, 1),
    taskFactorySample(1000, false, "error"),
    taskFactorySample(5000, true, 3),
    taskFactorySample(2000, false, "error"),
    taskFactorySample(1000, false, "error"),
    taskFactorySample(1000, true, 6),
  ];

  const result = runTasks(tasks, pool_size);

  await clock.tickAsync(500);
  expect(fn).toHaveBeenCalledTimes(1);

  await clock.tickAsync(1000);
  expect(fn).toHaveBeenCalledTimes(2);

  await clock.tickAsync(5000);
  expect(fn).toHaveBeenCalledTimes(3);

  await clock.tickAsync(2000);
  expect(fn).toHaveBeenCalledTimes(4);

  await clock.tickAsync(1000);
  expect(fn).toHaveBeenCalledTimes(5);

  await clock.tickAsync(999);
  expect(fn).toHaveBeenCalledTimes(5);

  await clock.tickAsync(1);
  expect(fn).toHaveBeenCalledTimes(6);
  await expect(result).resolves.toStrictEqual([
    1,
    "error",
    3,
    "error",
    "error",
    6,
  ]);
});

test("Edge case: Poolsize equals the total of tasks", async () => {
  const pool_size = 6;
  const tasks = [
    taskFactorySample(500, true, 1),
    taskFactorySample(1000, false, "error"),
    taskFactorySample(5000, true, 3),
    taskFactorySample(2000, false, "error"),
    taskFactorySample(1000, false, "error"),
    taskFactorySample(1000, true, 6),
  ];

  const result = runTasks(tasks, pool_size);

  await clock.tickAsync(500);
  expect(fn).toHaveBeenCalledTimes(1);

  await clock.tickAsync(500);
  expect(fn).toHaveBeenCalledTimes(4);

  await clock.tickAsync(1000);
  expect(fn).toHaveBeenCalledTimes(5);

  await clock.tickAsync(2999);
  expect(fn).toHaveBeenCalledTimes(5);

  await clock.tickAsync(1);
  expect(fn).toHaveBeenCalledTimes(6);
  await expect(result).resolves.toStrictEqual([
    1,
    "error",
    3,
    "error",
    "error",
    6,
  ]);
});

test("Edge case: Poolsize greater than the total of tasks", async () => {
  const pool_size = 7;
  const tasks = [
    taskFactorySample(500, true, 1),
    taskFactorySample(1000, false, "error"),
    taskFactorySample(5000, true, 3),
    taskFactorySample(2000, false, "error"),
    taskFactorySample(1000, false, "error"),
    taskFactorySample(1000, true, 6),
  ];

  const result = runTasks(tasks, pool_size);

  await clock.tickAsync(500);
  expect(fn).toHaveBeenCalledTimes(1);

  await clock.tickAsync(500);
  expect(fn).toHaveBeenCalledTimes(4);

  await clock.tickAsync(1000);
  expect(fn).toHaveBeenCalledTimes(5);

  await clock.tickAsync(2999);
  expect(fn).toHaveBeenCalledTimes(5);

  await clock.tickAsync(1);
  expect(fn).toHaveBeenCalledTimes(6);
  await expect(result).resolves.toStrictEqual([
    1,
    "error",
    3,
    "error",
    "error",
    6,
  ]);
});
