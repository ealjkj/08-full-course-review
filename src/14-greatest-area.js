const greatestRectangleHist = (hist) => {
  const stack = [];
  let maxArea = 0;

  for (let i = 0; i < hist.length; i++) {
    let [topIndex, topBarLength] =
      stack.length === 0 ? [-1, 0] : stack[stack.length - 1];

    while (hist[i] < topBarLength && stack.length > 0) {
      const [_, height] = stack.pop();
      [topIndex, topBarLength] =
        stack.length === 0 ? [-1, 0] : stack[stack.length - 1];

      const leftIndex = topIndex;
      const rightIndex = i;
      const area = (rightIndex - leftIndex - 1) * height;
      maxArea = Math.max(area, maxArea);
    }

    stack.push([i, hist[i]]);
  }

  let [topIndex, topBarLength] =
    stack.length === 0 ? [-1, 0] : stack[stack.length - 1];

  while (stack.length > 0) {
    const [_, height] = stack.pop();
    [topIndex, topBarLength] =
      stack.length === 0 ? [-1, 0] : stack[stack.length - 1];

    const leftIndex = topIndex;
    const rightIndex = hist.length;
    const area = (rightIndex - leftIndex - 1) * height;
    maxArea = Math.max(area, maxArea);
  }

  return maxArea;
};

const greatestArea = (matrix) => {
  let maxArea = 0;
  let hist = Array(matrix[0].length).fill(0);
  for (let row of matrix) {
    // Form a histogram with the row. If the value is 0, reset the counter
    hist = row.map((value, i) => (value !== 0 ? hist[i] + value : 0));

    maxArea = Math.max(maxArea, greatestRectangleHist(hist));
  }
  return maxArea;
};

module.exports = greatestArea;
