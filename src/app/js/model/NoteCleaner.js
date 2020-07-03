import DOMElements from "../dom/DOMElements";

export default class NoteCleaner {
  constructor() {
    this.addEventListeners();
  }

  addEventListeners() {
    DOMElements.noteDeleteAllTrigger.addEventListener("click", this.deleteAll);
  }

  deleteAll() {}
}
