const printTree = require("../src/10-traverse-tree");

test("Example infix", () => {
  const bTree = "(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))";
  const arr = [];

  printTree(bTree, "infix", (value) => {
    arr.push(value);
  });

  expect(arr).toStrictEqual(Array.from("DBEAHFICGJ"));
});

test("Example prefix", () => {
  const bTree = "(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))";
  const arr = [];

  printTree(bTree, "prefix", (value) => {
    arr.push(value);
  });

  expect(arr).toStrictEqual(Array.from("ABDECFHIGJ"));
});

test("Example postfix", () => {
  const bTree = "(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))";
  const arr = [];

  printTree(bTree, "postfix", (value) => {
    arr.push(value);
  });

  expect(arr).toStrictEqual(Array.from("DEBHIFJGCA"));
});
