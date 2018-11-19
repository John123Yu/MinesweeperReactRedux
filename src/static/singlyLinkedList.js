class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor(head) {
    this.head = null;
  }
  add(value) {
    let newNode = new Node(value, null);
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }
  delete() {
    this.head = this.head.next;
  }
  display() {
    let n = this.head;
    while (n != null) {
      console.log(n.value);
      n = n.next;
    }
  }
  returnLast() {
    return this.head;
  }
}

module.exports = { LinkedList };
