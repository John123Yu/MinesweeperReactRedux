class Node {
  constructor(value, next, previous) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

class LinkedListD {
  constructor(head) {
    this.head = null;
  }
  add(value) {
    let newNode = new Node(value, null, null);
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    }
  }
  delete() {
    this.head = this.head.next;
    this.head.previous = null;
  }
  display() {
    let n = this.head;
    while (n != null) {
      console.log(n.value);
      n = n.next;
    }
  }
  returnLast() {
    let n = this.head;
    while (n != null) {
      n = n.next;
    }
    return n;
  }
}

module.exports = { LinkedListD };
