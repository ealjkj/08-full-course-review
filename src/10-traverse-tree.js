const printTree = (tree, order, cb) => {
  if (!["prefix", "postfix", "infix"].includes(order)) throw "Invalid order";

  const arrTree = convertToArray(tree);
  const recursivePrint = (arr, order) => {
    if (arr.length !== 3 && arr.length !== 1) throw Error("Tree is not binary");
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

const bTree = "(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))";
const arr = [];

printTree(bTree, "infix", (value) => {
  arr.push(value);
});
