const { LinkedList, getNode } = require("../utils/linkedlist");
const linkedList = LinkedList.fromArray([1, 2, 2, 3, 3, 6, 7, 2, 1], 3);

const beginOfLoop = (linkedList) => {
  let slow = linkedList.head;
  let fast = linkedList.head.next;

  // Iterate over the linked list in order to find where the pointers meet.
  while (true) {
    if (slow === fast) break;
    slow = slow.next;
    fast = fast.next.next;
  }

  // reset slow pointer and advance fastPointer
  slow = linkedList.head;
  fast = fast.next;

  // The math says that the pointers will meet at the begining og the loop
  while (true) {
    if (slow === fast) break;
    slow = slow.next;
    fast = fast.next; // The fast pointer is no longer fast.
  }

  return slow;
};

module.exports = beginOfLoop;

console.log(beginOfLoop(linkedList), getNode(linkedList, 3));
