const reverseSingleBlock = (arr, startIndex, endIndex) => {
  const blockSize = endIndex - startIndex + 1;
  const half = Math.ceil((blockSize - 1) / 2);
  for (let i = 0; i < half; i++) {
    const temp = arr[i + startIndex];
    arr[i + startIndex] = arr[blockSize - i - 1 + startIndex];
    arr[blockSize - i - 1 + startIndex] = temp;
  }
};

const reverseBlocks = (arr, blockSize) => {
  for (let i = 0; i + blockSize - 1 < arr.length; i += blockSize) {
    reverseSingleBlock(arr, i, i + blockSize - 1);
  }

  if (arr.length % blockSize !== 0) {
    const remainingStartIndex = arr.length - (arr.length % blockSize);
    const remainingEndIndex = arr.length - 1;
    reverseSingleBlock(arr, remainingStartIndex, remainingEndIndex);
  }
};

module.exports = reverseBlocks;
