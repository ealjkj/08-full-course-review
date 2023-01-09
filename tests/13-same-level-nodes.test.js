const areLeveled = require("../src/13-same-level-nodes");
test("Not leveled example", () => {
  // prettier-ignore
  const tree = [0, 
                  [1], 
                  [2, 
                    [1], 
                    [5,
                      [3],
                      [5,
                        [6]],
                      [9]]], 
                  [3,
                    [0]], 
                  [5], 
                  [7,
                    [3,
                      [3],
                      [0,
                        [9],
                        [4]]
                    ]]];
  expect(areLeveled(tree, 1, 1)).toBe(false);
});

test("Leveled example", () => {
  // prettier-ignore
  const tree = [0, 
    [1], 
    [2, 
      [1], 
      [5,
        [3],
        [5,
          [6]],
        [9]]], 
    [3,
      [0]], 
    [5], 
    [7,
      [3,
        [3],
        [0,
          [9],
          [4]]
      ]]];
  expect(areLeveled(tree, 3, 3)).toBe(true);
});
