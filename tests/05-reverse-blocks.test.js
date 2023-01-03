const reverseBlocks = require("../src/05-reverse-blocks");

test("Example", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const blockSize = 3;
  reverseBlocks(arr, blockSize);
  expect(arr).toStrictEqual([2, 1, 0, 5, 4, 3, 8, 7, 6, 9]);
});
