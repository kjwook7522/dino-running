export enum WorkingDirectionKey {
  ArrowLeft,
  ArrowRight,
}

export default class KeyStore {
  store: Record<string, boolean>;
  workingDirectionKey?: WorkingDirectionKey;

  constructor() {
    this.store = {};
    this.workingDirectionKey = null;
  }

  private updateWorkingDirectionKey(): void {
    if (this.store["ArrowLeft"] && !this.store["ArrowRight"]) {
      this.workingDirectionKey = WorkingDirectionKey.ArrowLeft;
      return;
    }

    if (!this.store["ArrowLeft"] && this.store["ArrowRight"]) {
      this.workingDirectionKey = WorkingDirectionKey.ArrowRight;
      return;
    }

    if (!this.store["ArrowLeft"] && !this.store["ArrowRight"]) {
      this.workingDirectionKey = null;
      return;
    }
  }

  press(key: string): void {
    this.store[key] = true;
    this.updateWorkingDirectionKey();
  }

  unpress(key: string): void {
    delete this.store[key];
    this.updateWorkingDirectionKey();
  }

  isEmpty(): boolean {
    return Object.keys(this.store).length === 0;
  }
}
