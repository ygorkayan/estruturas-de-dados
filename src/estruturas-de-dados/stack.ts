export default class Stack<T> {
  private count: number;
  private items: Record<number, T>;

  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element: T): void {
    this.items[this.count] = element;
    this.count++;
  }

  pop(): T | undefined {
    const result = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return result;
  }

  peek(): T | undefined {
    return this.items[this.count - 1];
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  clear(): void {
    this.items = {};
    this.count = 0;
  }

  size(): number {
    return this.count;
  }
}
