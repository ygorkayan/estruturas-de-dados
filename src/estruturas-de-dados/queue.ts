export default class Queue<T> {
  private count: number;
  private lowestCount: number;
  private items: Record<number, T>;

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element: T): void {
    this.items[this.count] = element;
    this.count++;
  }

  dequeue(): T {
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek(): T {
    return this.items[this.lowestCount];
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.count - this.lowestCount;
  }
}
