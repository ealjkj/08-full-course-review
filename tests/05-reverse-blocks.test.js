const reverseBlocks = require("../src/05-reverse-blocks");

test("Reversing simple array blocks", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const blockSize = 3;
  reverseBlocks(arr, blockSize);
  expect(arr).toStrictEqual([2, 1, 0, 5, 4, 3, 8, 7, 6, 9]);
});

test("Reversing array, with the block bigger than the array", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const blockSize = 11;
  reverseBlocks(arr, blockSize);
  expect(arr).toStrictEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
});

test("Reversing array, with an array size non divisible by the blocksize", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const blockSize = 3;
  reverseBlocks(arr, blockSize);
  expect(arr).toStrictEqual([2, 1, 0, 5, 4, 3, 8, 7, 6, 10, 9]);
});

test("Reversing array, with an array size divisible by the blocksize", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const blockSize = 3;
  reverseBlocks(arr, blockSize);
  expect(arr).toStrictEqual([2, 1, 0, 5, 4, 3, 8, 7, 6]);
});
