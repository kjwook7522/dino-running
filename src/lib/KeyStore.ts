export default class KeyStore {
  store: Record<string, boolean>;

  constructor() {
    this.store = {};
  }

  press(key: string): void {
    this.store[key] = true;
  }

  unpress(key: string): void {
    delete this.store[key];
  }

  getWorkingKey(): string {
    if (this.isEmpty()) return;

    return Object.keys(this.store)[0];
  }

  isEmpty(): boolean {
    return Object.keys(this.store).length === 0;
  }
}
