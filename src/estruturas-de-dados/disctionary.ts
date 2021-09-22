export default class Dictionary<T> {
  private table: Record<string, T>;

  constructor() {
    this.table = {};
  }

  set(key: string, value: T): boolean {
    if (key === null || key === undefined) {
      return false;
    }

    if (value === null || value === undefined) {
      return false;
    }

    this.table[key] = value;
    return true;
  }

  remove(key: string) {
    if (this.hasKey(key)) {
      delete this.table[key];
      return true;
    }
    return false;
  }

  hasKey(key: string) {
    return this.table[key] !== undefined;
  }

  get(key: string) {
    return this.table[key];
  }

  clear() {
    this.table = {};
  }

  size() {
    return this.keys().length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  keys() {
    return Object.keys(this.table);
  }

  values() {
    return Object.keys(this.table).map(key => this.table[key]);
  }

  forEach(callBackFn: (keys: string, values: T) => any) {
    const keys = Object.keys(this.table);
    const values = keys.map(key => this.table[key]);

    for (let i = 0; i < keys.length; i++) {
      callBackFn(keys[i], values[i]);
    }
  }
}
