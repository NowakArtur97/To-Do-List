export default class ObserverManager {
  constructor(...events) {
    this.observers = new Map();

    events.forEach((event) => this.observers.set(event, []));
  }

  subscribe(event, observer) {
    this.observers.get(event).push(observer);
  }

  unsubscribe(event, observer) {
    const eventObservers = this.observers.get(event);
    const indexToRemove = eventObservers.indexOf(observer);
    eventObservers.splice(indexToRemove, 1);
  }

  notify(event, data) {
    const eventObservers = this.observers.get(event);
    eventObservers.forEach((observer) => observer[event](data));
  }
}
