const longestRunOfTwoNumbers = require("../src/07-largest-run");

test("Example 1", () => {
  const input = "1212223311212223";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("121222");
});

test("Example 2", () => {
  const input = "111";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("111");
});
