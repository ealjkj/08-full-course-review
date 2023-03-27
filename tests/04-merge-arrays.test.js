const mergeArrays = require("../src/04-merge-arrays");

test("Merge large and small arrays in that order", () => {
  const largeArray = [1, 3, 5, 7, 9].concat(new Array(5));
  const smallArray = [0, 2, 4, 6, 8];
  const largeArraySize = largeArray.length;

  mergeArrays(largeArray, smallArray);
  expect(largeArray.length).toBe(largeArraySize);
  expect(largeArray).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("Merge small and large arrays in that order", () => {
  const largeArray = [1, 3, 5, 7, 9].concat(new Array(5));
  const smallArray = [0, 2, 4, 6, 8];
  const largeArraySize = largeArray.length;

  mergeArrays(smallArray, largeArray);
  expect(largeArray.length).toBe(largeArraySize);
  expect(largeArray).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("Merge arrays with repeated elements", () => {
  const largeArray = [1, 3, 3, 5, 6, 7, 9, 14].concat(new Array(8));
  const smallArray = [0, 0, 2, 4, 6, 8, 9, 21];
  const largeArraySize = largeArray.length;

  mergeArrays(largeArray, smallArray);
  expect(largeArray.length).toBe(largeArraySize);
  expect(largeArray).toStrictEqual([
    0, 0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 14, 21,
  ]);
});

test("Merge large and small arrays with negative elements", () => {
  const largeArray = [-3, -1, 1, 3].concat(new Array(5));
  const smallArray = [-4, -2, 0, 2, 4];
  const largeArraySize = largeArray.length;

  mergeArrays(largeArray, smallArray);
  expect(largeArray.length).toBe(largeArraySize);
  expect(largeArray).toStrictEqual([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
});

test("Merge large and small arrays where large has all elements BIGGER than the elements on the small array", () => {
  const largeArray = [10, 20, 30, 40, 50].concat(new Array(5));
  const smallArray = [1, 2, 3, 4, 5];
  const largeArraySize = largeArray.length;

  mergeArrays(largeArray, smallArray);
  expect(largeArray.length).toBe(largeArraySize);
  expect(largeArray).toStrictEqual([1, 2, 3, 4, 5, 10, 20, 30, 40, 50]);
});

test("Merge large and small arrays where large has all elements SMALLER than the elements on the small array", () => {
  const largeArray = [1, 2, 3, 4, 5].concat(new Array(5));
  const smallArray = [10, 20, 30, 40, 50];
  const largeArraySize = largeArray.length;

  mergeArrays(largeArray, smallArray);
  expect(largeArray.length).toBe(largeArraySize);
  expect(largeArray).toStrictEqual([1, 2, 3, 4, 5, 10, 20, 30, 40, 50]);
});
