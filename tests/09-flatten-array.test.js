const {
  recursiveFlatten,
  iterativeFlatten,
} = require("../src/09-flatten-array");

test("Example", () => {
  const input = [1, 2, 3, [4, 5, [6, [[7]], 8]], [9, 10]];
  const ans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const flattenRecursive = recursiveFlatten(input);
  const flattenIterative = iterativeFlatten(input);

  expect(flattenRecursive).toStrictEqual(ans);
  expect(flattenIterative).toStrictEqual(ans);
});
