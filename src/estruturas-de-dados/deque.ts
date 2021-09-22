export default class Deque<T> {
  private count: number;
  private lowestCount: number;
  private items: Record<number, T>;

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  private moveForRight() {
    const itemsTemp: Record<number, T> = {};

    for (let i = 0; i < this.count; i++) {
      const value = this.items[i];
      itemsTemp[i + 1] = value;
    }

    this.items = itemsTemp;
    this.count++;
  }

  addFront(element: T): void {
    this.moveForRight();
    this.items[this.lowestCount] = element;
  }

  addBack(element: T): void {
    this.items[this.count++] = element;
  }

  removeFront(): T {
    const value: T = this.items[this.lowestCount];
    delete this.items[this.lowestCount++];
    return value;
  }

  removeBack(): T {
    const value: T = this.items[this.count];
    delete this.items[--this.count];
    return value;
  }

  peekFront(): T {
    return this.items[this.lowestCount];
  }

  peekBack(): T {
    return this.items[this.count - 1];
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  clear(): void {
    this.items = {};
  }

  size(): number {
    return this.count - this.lowestCount;
  }
}
