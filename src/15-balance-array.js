const balanceArray = (array) => {
  const total = sum(array);
  if (total % 2 === 1) return -1;

  const half = total / 2;

  let partialSum = 0;
  for (let i = 0; i < array.length; i++) {
    partialSum += array[i];
    if (partialSum === half) return i;
    else if (partialSum > half) return -1;
  }
};

const sum = (arr) => arr.reduce((prev, current) => prev + current);

module.exports = balanceArray;
