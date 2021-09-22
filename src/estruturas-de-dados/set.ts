export default class Set2<T> {
  private items: any;

  constructor() {
    this.items = {};
  }

  add(element: T): boolean {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element: T): boolean {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  has(element: T): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, String(element));
  }

  clear(): void {
    delete this.items;
    this.items = {};
  }

  size(): number {
    return Object.keys(this.items).length + 1;
  }

  values(): T[] {
    const element: T[] = [];

    for (const key in this.items) {
      if (Object.prototype.hasOwnProperty.call(this.items, key)) {
        element.push(this.items[key]);
      }
    }

    return element;
  }

  union(otherSet: Set2<T>): Set<T> {
    const set = new Set<T>();

    this.values().forEach(value => set.add(value));
    otherSet.values().forEach(value => set.add(value));

    return set;
  }

  intersection(otherSet: Set2<T>): Set<T> {
    const set = new Set<T>();

    const setEscolido = this.size() < otherSet.size() ? this : otherSet;

    setEscolido.values().forEach(value => {
      if (otherSet.has(value)) {
        set.add(value);
      }
    });

    return set;
  }

  difference(otherSet: Set2<T>): T[] {
    return this.values().filter(value => !otherSet.has(value));
  }

  isSubsetOf(otherSet: Set2<T>): boolean {
    if (this.size() > otherSet.size()) {
      return false;
    }

    let isSubset = true;

    this.values().every(value => {
      if (!otherSet.has(value)) {
        isSubset = false;
        return false;
      }
      return true;
    });

    return isSubset;
  }
}
