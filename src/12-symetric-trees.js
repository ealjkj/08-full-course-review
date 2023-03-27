const isSymetricTree = (tree) => {
  // If the tree has no children, it is symetric
  if (tree.length === 1) return true;

  const [_, left, right] = tree;

  //If tree has only one child (left or right) it is not symetric
  if (Boolean(left) !== Boolean(right)) {
    return false;
  }

  //Creating iterators for traversing left and right children
  const rightTraverse = levelOrderTraversal(right, "rtl");
  const leftTraverse = levelOrderTraversal(left, "ltr");

  for (const [nodeFromLeft, levelFromLeft] of leftTraverse) {
    const fromRight = rightTraverse.next();
    if (fromRight.done) return false;
    const [nodeFromRight, levelForRight] = fromRight.value;

    // values and levels should be equal for the tree to be symetric  (The value for a node is at index 0)
    if (
      nodeFromLeft[0] !== nodeFromRight[0] ||
      levelFromLeft !== levelForRight
    ) {
      return false;
    }
  }
  // If loop finishes and there is another right node, implies asymetry
  if (!rightTraverse.next().done) return false;

  return true;
};

function* levelOrderTraversal(tree, order = "ltr") {
  // We include the root on the queue and we also store the level were we are at
  const queue = [[tree, 1]];

  while (queue.length !== 0) {
    const [node, level] = queue.shift(tree);
    yield [node, level];
    const [_, left, right] = node;

    // order can be ltr or rtl
    let firstNode = left;
    let secondNode = right;

    if (order === "rtl") {
      firstNode = right;
      secondNode = left;
    }

    if (firstNode) {
      queue.push([firstNode, level + 1]);
    }

    if (secondNode) {
      queue.push([secondNode, level + 1]);
    }
  }
}

module.exports = isSymetricTree;
