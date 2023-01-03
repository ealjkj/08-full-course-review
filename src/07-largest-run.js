const longestRunOfTwoNumbers = (input) => {
  if (input.length === 0) return "";
  const firstNumber = input[0];
  const numbers = [firstNumber];

  for (let i = 0; i < input.length; i++) {
    const newNumber = input[i];
    if (numbers.includes(newNumber)) {
      continue;
    }

    if (numbers.length === 1) {
      numbers.push(newNumber);
    } else {
      return input.slice(0, i);
    }
  }

  return input;
};

module.exports = longestRunOfTwoNumbers;
