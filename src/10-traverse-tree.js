const printTree = (tree, order, cb) => {
  if (!["prefix", "postfix", "infix"].includes(order)) throw "Invalid order";

  const arrTree = convertToArray(tree);
  const recursivePrint = (arr, order) => {
    const [value, left, right] = arr;

    if (order === "prefix") cb(value);
    if (left) recursivePrint(left, order);
    if (order !== "prefix" && order !== "postfix") cb(value);
    if (right) recursivePrint(right, order);
    if (order === "postfix") cb(value);
  };

  return recursivePrint(arrTree, order);
};

const convert = (string, startIndex) => {
  if (string[startIndex] === ",") return { index: startIndex - 1, node: null };
  if (string[startIndex] === ")" && startIndex === string.length - 1)
    return { index: startIndex - 1, node: null };
  if (string[startIndex] !== "(") throw new Error("not valid node");

  let i = startIndex + 1;
  while (string[i] !== "," && i < string.length) {
    if (string[i] === ")")
      return { index: i, node: [string.slice(startIndex + 1, i)] };
    if (string[i] === "(") throw new Error("Value can not include parenthesis");
    i++;
  }

  // The value should be the index from startIndex to i
  if (i === string.length - 1 && string[i] !== ")") {
    throw new Error("non-empty trees should end with parenthesis");
  }

  const value = string.slice(startIndex + 1, i);

  // First child
  let { index, node } = convert(string, i + 1);
  const firstNode = node;

  if (string[index + 1] === ")") {
    return { index: index + 1, node: [value, firstNode] };
  }

  if (string[index + 1] !== ",")
    throw new Error("before the second node, there should be a comma");

  // Second child
  const second = convert(string, index + 2);
  const secondNode = second.node;
  index = second.index;

  if (string[index + 1] !== ")")
    throw new Error("non-empty nodes should end with parenthesis");

  return { index: index + 1, node: [value, firstNode, secondNode] };
};

const convertToArray = (string) => {
  const conversion = convert(string, 0);
  if (conversion.index !== string.length - 1) throw Error("not valid input");
  return conversion.node;
};
module.exports = printTree;
