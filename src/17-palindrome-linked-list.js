const isPalindrome = (linkedList) => {
  const head = linkedList.head;
  if (head === null) {
    return true;
  }

  let slow = head;
  let fast = head;

  // Find the middle node and avoid loops
  while (fast !== null && fast.next !== null) {
    console.log(fast.value, slow.value);
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return false;
    }
  }

  // Reverse the second half
  let previousNode = null;
  while (slow !== null) {
    const nextNode = slow.next;
    slow.next = previousNode;
    previousNode = slow;
    slow = nextNode;
  }

  // Compare left side with right side
  let left = head;
  let right = previousNode;

  while (right !== null) {
    if (left.value !== right.value) {
      return false;
    }

    left = left.next;
    right = right.next;
  }

  return true;
};

module.exports = isPalindrome;
