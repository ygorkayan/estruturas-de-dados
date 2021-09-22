export default class HashTable<T> {
  private table: Record<number, T>;

  constructor() {
    this.table = {};
  }

  put(key: string, value: T) {
    if (key === null || key === undefined) {
      return false;
    }

    if (value === null || value === undefined) {
      return false;
    }

    this.table[this.hashCode(key)] = value;
    return true;
  }

  remove(key: string) {
    const value = this.get(key);

    if (value !== undefined) {
      delete this.table[this.hashCode(key)];
      return true;
    }

    return false;
  }

  get(key: string) {
    return this.table[this.hashCode(key)];
  }

  hashCode(key: string) {
    return this.loseloseHashCode(key);
  }

  private loseloseHashCode(key: string) {
    const hash = key.split('').reduce((hash, keyString) => (hash += keyString.charCodeAt(0)), 0);
    return hash % 37;
  }
}
