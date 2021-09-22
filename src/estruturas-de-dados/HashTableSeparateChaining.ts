export default class HashTableSeparateChaining<T> {
  private table: Record<string, Record<string, T>>;

  constructor() {
    this.table = {};
  }

  put(key: string, value: T): boolean {
    this.check(key);
    this.check(value);

    const hash = this.djb2HashCode(key);

    if (!this.table[hash]) {
      this.table[hash] = {};
    }

    this.table[hash][key] = value;
    return true;
  }

  get(key: string): T {
    this.check(key);

    const hash = this.djb2HashCode(key);

    if (!this.table[hash] || !this.table[hash][key]) {
      throw new Error('hash ou key não existe');
    }

    return this.table[hash][key];
  }

  delete(key: string): boolean {
    this.check(key);

    const hash = this.djb2HashCode(key);

    if (!this.table[hash] || !this.table[hash][key]) {
      throw new Error('hash ou key não existe para ser deletada');
    }

    delete this.table[hash][key];
    return true;
  }

  private check(value: any): void {
    if (value === null || value === undefined) {
      throw new Error('Parametro null ou undefined');
    }
  }

  private loseloseHashCode(key: string): string {
    // metodo de criaçao de hash não muito eficiente
    const hash = key.split('').reduce((hash, keyString) => (hash += keyString.charCodeAt(0)), 0);
    return String(hash % 37);
  }

  private djb2HashCode(key: string) {
    let hash = 5381;

    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }

    return hash % 1013;
  }
}
