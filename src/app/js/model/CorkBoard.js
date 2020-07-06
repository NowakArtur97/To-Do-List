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
      this.showFormForUpdate.bind(this),
      {
        capture: true,
      }
    );
    DOMElements.board.addEventListener("click", this.deleteTask.bind(this));
  }

  showFormForUpdate(e) {
    const isNote = this.isNote(e.target);
    const hasParentNote = this.isNote(e.target.parentElement);

    if (isNote || hasParentNote) {
      this.notePopUp.showPopUp();
      DOMElements.noteFormSubmitBtn.innerText = "Update note";
      this.noteForm.populateForm(isNote ? e.target : e.target.parentElement);
    }
  }

  deleteTask(e) {
    if (e.target.classList.contains(DOMClasses.note.deleteBtn)) {
      const noteEl = e.target.parentElement;

      this.events.notify("delete", noteEl);
    }
  }

  isNote(element) {
    return (
      element.classList.contains(DOMClasses.note.main) &&
      !element.classList.contains(DOMClasses.noteFormPopUpTrigger.main) &&
      !element.classList.contains(DOMClasses.noteSearch.main)
    );
  }
}
