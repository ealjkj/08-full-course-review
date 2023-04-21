const isSymmetricTree = (tree) => {
  if (tree.length === 1) {
    // If the tree has no children, it is symmetric
    return true;
  }

  const [, left, right] = tree;

  // If tree has only one child (left or right) it is not symmetric
  if (Boolean(left) !== Boolean(right)) {
    return false;
  }

  const leftQueue = [left];
  const rightQueue = [right];

  while (leftQueue.length !== 0) {
    const leftNode = leftQueue.shift();
    const rightNode = rightQueue.shift();

    // If just one of the nodes is null, it means there is no symmetry
    if (Boolean(leftNode) !== Boolean(rightNode)) {
      return false;
    }

    // If both nodes are null, the next iteration can start.
    if (!leftNode) continue;

    if (leftNode[0] !== rightNode[0]) {
      return false;
    }

    const [, leftFromLeft, rightFromLeft] = leftNode;
    const [, leftFromRight, rightFromRight] = rightNode;

    leftQueue.push(leftFromLeft);
    rightQueue.push(rightFromRight);

    leftQueue.push(rightFromLeft);
    rightQueue.push(leftFromRight);
  }

  if (rightQueue.length > 0) return false;
  return true;
};

const bTree = [1, [2, [3], [4, [5]]], [2, [4, , [5]], [3]]];
console.log(isSymmetricTree(bTree));

module.exports = isSymmetricTree;
