// This is a modification of the binary traversing
const prefixTraversing = (tree, cb) => {
  const recursiveTraversing = (tree, level) => {
    const [value, ...children] = tree;
    cb([value, level]);
    for (let node of children) {
      recursiveTraversing(node, level + 1);
    }
  };

  recursiveTraversing(tree, 1);
};

const areLeveled = (tree, n1, n2) => {
  const levels = {};
  let ans = false;
  prefixTraversing(tree, ([value, level]) => {
    //  If this is the first time at the level, create the set
    if (!levels[level]) {
      levels[level] = new Set();
    }

    // Check if the node value is one of the numbers
    if ([n1, n2].includes(value)) {
      // If both numbers are equal, we just check if the set already had a number
      if (n1 === n2 && levels[level].size === 1) ans = true;

      levels[level].add(value);
    }

    // If the set has two numbers, it means is leveled
    if (levels[level].size === 2) {
      ans = true;
    }
  });

  return ans;
};

module.exports = areLeveled;
