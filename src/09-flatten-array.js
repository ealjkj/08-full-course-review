const recursiveFlatten = (arrToFlat) => {
  const flatten = [];

  function appendAll(arr) {
    if (!Array.isArray(arr)) {
      return flatten.push(arr);
    }

    for (let element of arr) {
      appendAll(element);
    }
  }

  appendAll(arrToFlat);
  return flatten;
};

const iterativeFlatten = (input) => {
  let i;
  const placeholder = [input];
  const lastIndex = [-1];
  const ans = [];

  while (placeholder.length) {
    input = placeholder.pop();
    i = lastIndex.pop() + 1;
    for (; i < input.length; ++i) {
      if (Array.isArray(input[i])) {
        placeholder.push(input);
        lastIndex.push(i);
        input = input[i];
        i = -1;
      } else ans.push(input[i]);
    }
  }
  return ans;
};

module.exports = { recursiveFlatten, iterativeFlatten };
