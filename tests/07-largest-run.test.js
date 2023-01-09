const longestRunOfTwoNumbers = require("../src/07-largest-run");

test("Example 1", () => {
  const input = "1212223311212223";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("1121222");
});

test("Example 2", () => {
  const input = "111";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("111");
});

test("Empty Case", () => {
  const input = "";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("");
});

test("Longest run at the end", () => {
  const input = "1233144454554";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("44454554");
});

test("Extreme", () => {
  const input = "12324426655621";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("66556");
});
