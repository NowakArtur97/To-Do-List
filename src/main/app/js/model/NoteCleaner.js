import DOMElements from '../dom/DOMElements';
import ObserverManager from '../observer/ObserverManager';

export default class NoteCleaner {
  events;
  constructor() {
    this.events = new ObserverManager("deleteAll");

    this.#addEventListeners();
  }

  #addEventListeners() {
    DOMElements.noteDeleteAllTrigger.addEventListener(
      "click",
      this.#deleteAll.bind(this)
    );
  }

  #deleteAll() {
    this.events.notify("deleteAll");
  }
}
