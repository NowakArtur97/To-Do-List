import DOMElements from "../dom/DOMElements";

import ObserverManager from "../observer/ObserverManager";

export default class NoteCleaner {
  constructor() {
    this.addEventListeners();

    this.events = new ObserverManager("deleteAll");
  }

  addEventListeners() {
    DOMElements.noteDeleteAllTrigger.addEventListener(
      "click",
      this.deleteAll.bind(this)
    );
  }

  deleteAll() {
    this.events.notify("deleteAll");
  }
}
