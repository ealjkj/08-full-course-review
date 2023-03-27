const longestRunOfTwoNumbers = require("../src/07-largest-run");

test("Longest run with 3 numbers in the string", () => {
  const input = "1212223311212223";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("1121222");
});

test("Longest run with 2 number in the string", () => {
  const input = "111212122212";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("111212122212");
});

test("Longest run with 1 number in the string", () => {
  const input = "111";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("111");
});

test("Longest run of an empty string", () => {
  const input = "";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("");
});

test("Longest run at the end", () => {
  const input = "1233144454554";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("44454554");
});

test("Longest run at the begining", () => {
  const input = "4445455412331";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("44454554");
});

test("Longest run at the middle", () => {
  const input = "12324426655621";
  const longestRun = longestRunOfTwoNumbers(input);
  expect(longestRun).toBe("66556");
});
