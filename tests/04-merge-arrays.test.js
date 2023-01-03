const mergeArrays = require("../src/04-merge-arrays");

test("Merge example array", () => {
  const largeArray = [1, 3, 5, 7, 9].concat(new Array(5));
  const smallArray = [0, 2, 4, 6, 8];
  const largeArraySize = largeArray.length;

  mergeArrays(largeArray, smallArray);
  expect(largeArray.length).toBe(largeArraySize);
  expect(largeArray).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("More complicated example", () => {
  const largeArray = [1, 3, 3, 5, 6, 7, 9, 14].concat(new Array(8));
  const smallArray = [0, 0, 2, 4, 6, 8, 9, 21];
  const largeArraySize = largeArray.length;

  mergeArrays(largeArray, smallArray);
  expect(largeArray.length).toBe(largeArraySize);
  expect(largeArray).toStrictEqual([
    0, 0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 14, 21,
  ]);
});
