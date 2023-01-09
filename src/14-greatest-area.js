const greatestArea = (matrix) => {
  if (matrix.length === 0) return 0;

  const height = matrix.length;
  const width = matrix[0].length;
  const alreadyChecked = new Map();

  const convertTo1D = (x, y) => width * y + x;

  let sum = 0;

  // we can define a function to traverse a "tree"
  const traverse = (x, y) => {
    alreadyChecked.set(convertTo1D(x, y), true);
    sum += 1;

    // left
    if (
      x - 1 > 0 &&
      matrix[y][x - 1] === 1 &&
      !alreadyChecked.has(convertTo1D(x - 1, y))
    ) {
      traverse(x - 1, y);
    }

    // bottom
    if (
      y + 1 < height &&
      matrix[y + 1][x] === 1 &&
      !alreadyChecked.has(convertTo1D(x, y + 1))
    ) {
      traverse(x, y + 1);
    }

    // right
    if (
      x + 1 < width &&
      matrix[y][x + 1] === 1 &&
      !alreadyChecked.has(convertTo1D(x + 1, y))
    ) {
      traverse(x + 1, y);
    }
  };

  // Main loop
  let max = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // if we already checked that cell we just ignore it
      if (alreadyChecked.has(width * y + x)) {
        continue;
      }

      // If we have not checked that cell it means we need to find the area that contains thas cell
      if (matrix[y][x] === 1) {
        // reset sum variable
        sum = 0;

        // the traverse will modify the sum
        traverse(x, y);

        max = Math.max(sum, max);
      }
    }
  }

  return max;
};

module.exports = greatestArea;
