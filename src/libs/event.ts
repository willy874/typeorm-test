export class EventBus {
  listeners: (() => void)[] = []
  subscribe(cb: () => void) {
    this.listeners.push(cb)
  }
  notify() {
    this.listeners.forEach((cb) => cb())
  }
}