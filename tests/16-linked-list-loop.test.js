const { LinkedList, getNode } = require("../utils/linkedlist");
const beginOfLoop = require("../src/16-linked-list-loop");

test("Example", () => {
  const indexOfLoopStart = 3;
  const linkedList = LinkedList.fromArray(
    [1, 2, 2, 3, 3, 6, 7, 2, 1],
    indexOfLoopStart
  );

  const correct = getNode(linkedList, indexOfLoopStart);
  const answer = beginOfLoop(linkedList);

  expect(answer === correct).toBe(true);
});
