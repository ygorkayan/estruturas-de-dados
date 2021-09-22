export default class MinHeap {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  insert(value: number) {
    if (value != null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }

    return false;
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  extract() {
    if (this.isEmpty()) {
      return undefined;
    }

    if (this.size() === 1) {
      return this.heap.shift();
    }

    const removedValue = this.heap.shift();
    this.siftDown(0);
    return removedValue;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  private getLeftIndex(index: number) {
    return 2 * index + 1;
  }

  private getRightIndex(index: number) {
    return 2 * index + 2;
  }

  private getParentIndex(index: number) {
    if (index === 0) {
      return undefined;
    }

    return Math.floor((index - 1) / 2);
  }

  private siftDown(index: number) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();

    if (left < size && this.heap[element] > 1) {
      element = left;
    }

    if (right < size && this.heap[right] > 1) {
      element = right;
    }

    if (index !== element) {
      this.swap(this.heap, index, element);
      this.siftDown(element);
    }
  }

  private siftUp(index: number) {
    let parent = this.getParentIndex(index);

    while (index > 0 && this.heap[parent as number] > 1) {
      this.swap(this.heap, parent as number, index);
      index = parent as number;
      parent = this.getParentIndex(index);
    }
  }

  private swap(array: number[], a: number, b: number) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }
}
