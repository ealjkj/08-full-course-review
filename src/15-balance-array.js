const balanceArray = (array) => {
  let leftIndex = -1;
  let rightIndex = array.length;

  let leftSum = 0;
  let rightSum = 0;

  while (rightIndex - leftIndex > 1) {
    if (leftSum <= rightSum) {
      leftIndex += 1;
      leftSum += array[leftIndex];
    } else {
      rightIndex -= 1;
      rightSum += array[rightIndex];
    }
  }

  if (leftSum === rightSum) return leftIndex;
  return -1;
};

const input = [1, 2, 3, 4, 9, 9, 2, 7, 10, 13];
balanceArray(input);

module.exports = balanceArray;
