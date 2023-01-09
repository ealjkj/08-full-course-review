class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  static fromArray(array, loopStart = null) {
    const linkedList = new LinkedList();
    if (array.length === 0) return linkedList;
    let parent;
    let loopInitNode = null;
    for (let i = 0; i < array.length; i++) {
      const value = array[i];
      const node = new Node(value);

      if (!linkedList.head) {
        linkedList.head = node;
      } else {
        parent.next = node;
      }

      if (i === loopStart) {
        loopInitNode = node;
      }
      parent = node;
    }

    parent.next = loopInitNode;
    return linkedList;
  }
}

const getNode = (linkedList, index) => {
  let node = linkedList.head;
  for (let i = 0; i < index; i++) {
    node = node.next;
  }
  return node;
};

module.exports = { Node, LinkedList, getNode };
