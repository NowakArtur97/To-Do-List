import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";

import ObserverManager from "../observer/ObserverManager";

export default class CorkBoard {
  constructor(notePopUp, noteForm) {
    this.notePopUp = notePopUp;
    this.noteForm = noteForm;

    this.events = new ObserverManager("delete", "changeStatus");

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
    DOMElements.board.addEventListener("click", this.triggerAction.bind(this));
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

  triggerAction(e) {
    const targetClasslit = e.target.classList;
    const isChangeStatusBtn = targetClasslit.contains(
      DOMClasses.note.changeStatusBtn
    );
    const isDeleteBtn = targetClasslit.contains(DOMClasses.note.deleteBtn);

    if (isChangeStatusBtn || isDeleteBtn) {
      const noteEl = e.target.parentElement;
      const event = isDeleteBtn ? "delete" : "changeStatus";
      this.events.notify(event, noteEl);
    }
  }

  isNote(element) {
    return (
      element.classList.contains(DOMClasses.note.main) &&
      !element.classList.contains(DOMClasses.noteFormPopUpTrigger.main) &&
      !element.classList.contains(DOMClasses.noteDeleteAllTrigger.main)
    );
  }
}
