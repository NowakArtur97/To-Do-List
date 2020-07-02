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
    DOMElements.board.addEventListener(
      "dblclick",
      this.showFormForUpdate.bind(this)
    );
    DOMElements.board.addEventListener("click", this.deleteTask.bind(this));
  }

  showFormForUpdate(e) {
    noteFormPopUpTrigger;
    if (
      e.target.classList.contains(DOMClasses.note.main) &&
      !e.target.classList.contains(DOMClasses.noteFormPopUpTrigger.main)
    ) {
      this.notePopUp.showPopUp();
      DOMElements.noteFormSubmitBtn.innerText = "Update note";
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
