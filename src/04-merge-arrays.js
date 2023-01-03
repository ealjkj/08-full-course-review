const mergeArrays = (array1, array2) => {
  const largeArray = array1.length >= array2.length ? array1 : array2;
  const smallArray = array1.length >= array2.length ? array2 : array1;

  let pointerLarge = largeArray.length - 1;
  let pointerSmall = smallArray.length - 1;
  let currentPosition = pointerLarge;

  const combined = largeArray.length + smallArray.length - 1;

  for (let i = 0; i < combined; i++) {
    const numberFromL = largeArray[pointerLarge];
    const numberFromS = smallArray[pointerSmall];

    if (numberFromL === undefined) {
      pointerLarge -= 1;
      continue;
    }

    if (numberFromL < numberFromS) {
      largeArray[currentPosition] = numberFromS;
      pointerSmall -= 1;
    } else {
      largeArray[currentPosition] = numberFromL;
      pointerLarge -= 1;
    }

    currentPosition -= 1;
    if (pointerLarge === -1) {
      break;
    }
  }

  for (let i = pointerSmall; i > -1; i--) {
    largeArray[currentPosition] = smallArray[i];
    currentPosition -= 1;
  }
};

module.exports = mergeArrays;
