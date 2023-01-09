const longestRunOfTwoNumbers = (input) => {
  if (input.length === 0) return "";
  let firstNumber = input[0];
  let secondNumber = null;

  // We will keep track of the latest block of single numbers
  const currentBlock = {
    number: firstNumber,
    startIndex: 0,
  };

  // We will track the indexes of current run. The longest run is the current one for now.
  let currentRun = [0, 0];
  let longestRun = currentRun;

  for (let i = 0; i < input.length; i++) {
    const currentNumber = input[i];

    const isSecond = !secondNumber && currentNumber !== firstNumber;
    const isThird = ![firstNumber, secondNumber].includes(currentNumber);

    if (isSecond) {
      secondNumber = currentNumber;

      // changeBlock
      currentBlock.startIndex = i;
      currentBlock.number = currentNumber;

      //update run
      currentRun[1] = i;
      continue;
    }

    // If we found a third number it means the current run finished
    else if (isThird) {
      // Update runs
      longestRun = maxRun(currentRun, longestRun);

      // Reset values
      currentRun = [currentBlock.startIndex, i];
      firstNumber = currentBlock.number;
      secondNumber = currentNumber;

      // Change Block
      currentBlock.startIndex = i;
      currentBlock.number = currentNumber;
      continue;
    }

    // Now we check if the currentNumber is part of the block
    if (currentNumber !== currentBlock.number) {
      currentBlock.startIndex = i;
      currentBlock.number = currentNumber;
    }

    //If we get to this point we update the run
    currentRun[1] = i;
  }

  // When we finish we compare again runs to see if we have a new longest
  longestRun = maxRun(currentRun, longestRun);

  return input.slice(longestRun[0], longestRun[1] + 1);
};

// utils --------------------------
const maxRun = (run1, run2) => {
  const run1isLonger = runLength(run1) > runLength(run2);
  return run1isLonger ? [...run1] : [...run2];
};

const runLength = (run) => {
  return run[1] - run[0] + 1;
};

const input = "1233144454554";
const longestRun = longestRunOfTwoNumbers(input);

module.exports = longestRunOfTwoNumbers;
