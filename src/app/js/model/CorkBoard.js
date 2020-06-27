import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";

import ObserverManager from "../observer/ObserverManager";

export default class CorkBoard {
  constructor() {
    this.events = new ObserverManager("delete");

    this.addEventListeners();
  }

  addEventListeners() {
    DOMElements.board.addEventListener("click", this.deleteTask.bind(this));
  }

  deleteTask(e) {
    if (e.target.classList.contains(DOMClasses.note.deleteBtn)) {
      const noteEl = e.target.parentElement;

      this.events.notify("delete", noteEl);
    }
  }
}
