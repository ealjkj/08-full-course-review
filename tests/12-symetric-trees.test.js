const isSymetricTree = require("../src/12-symetric-trees");
test("Symetric Example", () => {
  const bTree = [1, [2, [3], [4, [5]]], [2, [4, , [5]], [3]]];
  expect(isSymetricTree(bTree)).toBe(true);
});

test("Just one node", () => {
  const bTree = [1];
  expect(isSymetricTree(bTree)).toBe(true);
});

test("Just left child", () => {
  const bTree = [1, [2]];
  expect(isSymetricTree(bTree)).toBe(false);
});

test("Just right child", () => {
  const bTree = [1, , [2]];
  expect(isSymetricTree(bTree)).toBe(false);
});

test("If you just traverse both nodes without keeping track of the level won't work", () => {
  const bTree = [1, [2, [3], [4]], [2, [4, [3]]]];
  expect(isSymetricTree(bTree)).toBe(false);
});

test("Second child shorter", () => {
  const bTree = [1, [2, [3], [4]], [2, , [3]]];
  expect(isSymetricTree(bTree)).toBe(false);
});

test("Second child bigger", () => {
  const bTree = [1, [2, [3], [4]], [2, [4, [5]], [3]]];
  expect(isSymetricTree(bTree)).toBe(false);
});
