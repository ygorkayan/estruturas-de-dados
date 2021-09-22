export default class LinkedList<T> implements ILinkedList<T> {
  private count: number;
  private head: NodeOrNull;

  constructor() {
    this.count = 0;
    this.head = null;
  }

  push(element: T): void {
    if (this.head === null) {
      this.head = this.createNode(element);
      this.count++;
      return;
    }

    let lastNode: Node = this.head;

    while (lastNode.next) {
      lastNode = lastNode.next;
    }

    lastNode.next = this.createNode(element);
    this.count++;
  }

  insert(element: T, position: number): void {
    const newNode = this.createNode(element);
    const [before, current, after] = this.getBeforeCurrentAfter(position);

    if (!before && current) {
      this.head = newNode;
      newNode.next = current;
      this.count++;
      return;
    }

    if (before && current) {
      before.next = newNode;
      newNode.next = current;
      this.count++;
      return;
    }

    if (current && !after) {
      current.next = newNode;
      this.count++;
      return;
    }
  }

  remove(element: T): void {
    const index = this.indexOf(element);
    this.removeAt(index);
  }

  indexOf(element: T): number {
    if (this.head === null) {
      return -1;
    }

    let current: Node = this.head;
    let index: number = 0;

    while (current.next && current.element !== element) {
      index++;
      current = current.next;
    }

    return current.element === element ? index : -1;
  }

  removeAt(position: number): void {
    if (position >= this.size() || position < 0) {
      throw new Error(`position maior que tamanho`);
    }

    const [before, current, after] = this.getBeforeCurrentAfter(position);

    if (before && current && after) {
      before.next = after;
      this.count--;
      return;
    }

    if (before && current && !after) {
      before.next = null;
      this.count--;
      return;
    }

    if (!before && current && after) {
      this.head = current;
      this.count--;
      return;
    }
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.count;
  }

  toString(): string {
    if (this.head === null) {
      return 'LinkdList vazia';
    }

    let current: Node = this.head;
    let value = `[ ${current.element}, `;

    while (current.next) {
      current = current.next;
      value += `${current.element}, `;
    }

    return `${value} ]`;
  }

  private createNode(element: T): Node {
    return {
      element,
      next: null,
    };
  }

  private getBeforeCurrentAfter(position: number): [NodeOrNull, NodeOrNull, NodeOrNull] {
    const before: NodeOrNull = this.getNodeForIndex(position - 1);
    const current: NodeOrNull = this.getNodeForIndex(position);
    const after: NodeOrNull = this.getNodeForIndex(position + 1);

    return [before, current, after];
  }

  private getNodeForIndex(position: number): NodeOrNull {
    if (position < 0 || position >= this.size() || this.head === null) {
      return null;
    }

    let current: NodeOrNull = this.head;
    let index: number = 0;

    while (current.next && position !== index) {
      current = current.next;
      index++;
    }

    return current;
  }
}

export interface ILinkedList<T> {
  push: (element: T) => void;
  insert: (element: T, position: number) => void;
  remove: (element: T) => void;
  indexOf: (element: T) => number;
  removeAt: (position: number) => void;
  isEmpty: () => boolean;
  size: () => number;
  toString: () => string;
}

type NodeOrNull = Node | null;

type Node = {
  element: any;
  next: Node | null;
};
