const { iterativeFlatten } = require("../src/09-flatten-array");

test("Flat array that is already flat", () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const ans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const flattenIterative = iterativeFlatten(input);
  expect(flattenIterative).toStrictEqual(ans);
});

test("Flat empty array", () => {
  const input = [];
  const ans = [];

  const flattenIterative = iterativeFlatten(input);
  expect(flattenIterative).toStrictEqual(ans);
});

test("Flat array with only array as elements", () => {
  const input = [[1], [2], [3], [4], [5, 6]];
  const ans = [1, 2, 3, 4, 5, 6];

  const flattenIterative = iterativeFlatten(input);
  expect(flattenIterative).toStrictEqual(ans);
});

test("Flat array with multiple nest levels", () => {
  const input = [1, 2, 3, [4, 5, [6, [[7]], 8]], [9, 10]];
  const ans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const flattenIterative = iterativeFlatten(input);
  expect(flattenIterative).toStrictEqual(ans);
});
