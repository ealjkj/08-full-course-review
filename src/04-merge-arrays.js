const mergeArrays = (array1, array2) => {
  let largeArray = array1;
  let smallArray = array2;

  // Determine small and large arrays.
  if (array1.length <= array2.length) {
    smallArray = array1;
    largeArray = array2;
  }

  // Set one pointer for each array.
  let pointerLarge = largeArray.length - 1;
  let pointerSmall = smallArray.length - 1;

  // Set one pointer at the end of the large Array.
  let currentPosition = pointerLarge;

  const combinedLength = largeArray.length + smallArray.length - 1;

  // Traverse arrays and compare the bigest element of both arrays. After each comparasion the bigger stacks at the end of the array.
  for (let i = 0; i < combinedLength; i++) {
    const numberFromL = largeArray[pointerLarge];
    const numberFromS = smallArray[pointerSmall];

    // Find the first not-undefined element on the large array
    if (numberFromL === undefined) {
      pointerLarge -= 1;
      continue;
    }

    // Compare numbers to sort.
    if (numberFromL < numberFromS) {
      largeArray[currentPosition] = numberFromS;
      pointerSmall -= 1;
    } else {
      largeArray[currentPosition] = numberFromL;
      pointerLarge -= 1;
    }

    // Since one new element is on its place, the pointer needs to move one position to the left.
    currentPosition -= 1;

    // stop condition
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
