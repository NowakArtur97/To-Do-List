export default class ObserverManager {
  constructor(...operations) {
    this.observers = new Map();

    operations.forEach((operation) => this.observers.set(operation, []));
  }

  subscribe(operation, observer) {
    this.observers.get(operation).push(observer);
  }

  unsubscribe(operation, observer) {
    const eventObservers = this.observers.get(operation);
    const indexToRemove = eventObservers.indexOf(observer);
    eventObservers.splice(indexToRemove, 1);
  }

  notify(operation, data) {
    this.observers.forEach((observer) => observer[operation](data));
  }
}
