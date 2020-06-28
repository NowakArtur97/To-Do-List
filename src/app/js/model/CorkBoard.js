import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";

import ObserverManager from "../observer/ObserverManager";

export default class CorkBoard {
  constructor(notePopUp, noteForm) {
    this.notePopUp = notePopUp;
    this.noteForm = noteForm;

    this.events = new ObserverManager("delete");

    this.addEventListeners();
  }

  addEventListeners() {
    DOMElements.board.addEventListener("dblclick", this.updateTask.bind(this));
    DOMElements.board.addEventListener("click", this.deleteTask.bind(this));
  }

  updateTask(e) {
    if (e.target.classList.contains(DOMClasses.note.main)) {
      this.notePopUp.showPopUp();
      this.noteForm.populateForm(e.target);
    }
  }

  deleteTask(e) {
    if (e.target.classList.contains(DOMClasses.note.deleteBtn)) {
      const noteEl = e.target.parentElement;

      this.events.notify("delete", noteEl);
    }
  }
}
