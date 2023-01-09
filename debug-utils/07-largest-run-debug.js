// Debug functions
const highlight = (word, i) => {
  return `${word.slice(0, i)}[${word[i]}]${word.slice(i + 1, word.length)}`;
};

const getRun = (input, run) => {
  return input.slice(run[0], run[1] + 1);
};

const getBlock = (input, block) => {
  return `${input.slice(0, block.startIndex)}[${input.slice(
    block.startIndex,
    input.length
  )}, number: ${block.number}`;
};

const debugRuns = (input, i, currentRun, longestRun, currentBlock) => {
  console.log(
    highlight(input, i) + "\n",
    "Current Run: " + getRun(input, currentRun) + " | \n",
    "Longest Run: " + getRun(input, longestRun) + " | \n",
    "Current Block: " + getBlock(input, currentBlock) + "\n\n"
  );
};

module.exports = { highlight, getRun, getBlock, debugRuns };
