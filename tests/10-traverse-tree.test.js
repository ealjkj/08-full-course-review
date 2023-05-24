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

test("Invalid order", () => {
  const bTree = "(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))";
  const arr = [];

  expect(() => {
    printTree(bTree, "other order", (value) => {
      arr.push(value);
    });
  }).toThrow();
});

test("Throw error with an invalid tree. Not binary", () => {
  const bTree = "(A,(B),(C),(D))";

  expect(() => printTree(bTree, "infix", () => {})).toThrow();
});

test("Throw error with an invalid tree. Not binary", () => {
  const bTree = "(A,,,,,)";

  expect(() => printTree(bTree, "infix", () => {})).toThrow();
});

test("Throw error with an invalid tree. Not right syntax. Just a list", () => {
  const bTree = "(A,B,C,D,E,F)";

  expect(() => printTree(bTree, "infix", () => {})).toThrow();
});

test("Should accept tree with valid syntax even without the seccond node", () => {
  const bTree = "(A,(B))";

  expect(() => printTree(bTree, "infix", () => {})).not.toThrow();
});

test("Should accept tree with valid syntax even without the seccond node. Including a final comma", () => {
  const bTree = "(A,(B),)";

  expect(() => printTree(bTree, "infix", () => {})).not.toThrow();
});
test("Should accept tree with valid syntax even with only two commas", () => {
  const bTree = "(A,,)";

  expect(() => printTree(bTree, "infix", () => {})).not.toThrow();
});

test("Should reject tree with invalid syntax when there are 3+ commas", () => {
  const bTree = "(A,(B),(C),)";

  expect(() => printTree(bTree, "infix", () => {})).toThrow();
});

test("Should reject tree with anything at the right of the ending parenthesis", () => {
  const bTree = "(A,(B),(C)),";

  expect(() => printTree(bTree, "infix", () => {})).toThrow();
});

test("Should reject tree with nested parenthesis ", () => {
  const bTree = "(A)()";

  expect(() => printTree(bTree, "infix", () => {})).toThrow();
});
