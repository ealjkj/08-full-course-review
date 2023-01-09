const printTree = (tree, order = "infix", cb) => {
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

// Util
const convertToArray = (tree) => {
  let modified = "";
  let closed = true;

  for (let i = 0; i < tree.length; i++) {
    const element = tree[i];

    if ((element === ")" || element === ",") && closed === false) {
      modified += "'";
      closed = true;
    }

    if (element === "(") {
      modified += "['";
      closed = false;
    } else if (element === ")") {
      modified += "]";
    } else if (element === ",") {
      modified += ",";
    } else {
      modified += element;
    }
  }
  return eval(modified);
};

module.exports = printTree;
