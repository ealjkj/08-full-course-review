const balanceArray = require("../src/15-balance-array");

test("Balanced array", () => {
  const input = [1, 2, 3, 4, 9, 9, 2, 7, 10, 13];
  expect(balanceArray(input)).toBe(6);
});

test("Not balanced array", () => {
  const input = [1, 2, 3, 4, 9, 9, 0, 7, 10, 13];
  expect(balanceArray(input)).toBe(-1);
});

test("Single element array", () => {
  const input = [4];
  expect(balanceArray(input)).toBe(-1);
});
