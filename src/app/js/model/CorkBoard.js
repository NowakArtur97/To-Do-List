import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";
import Status from "../state/Status";

import ObserverManager from "../observer/ObserverManager";

export default class CorkBoard {
  constructor(notePopUp, noteForm) {
    this.notePopUp = notePopUp;
    this.noteForm = noteForm;

    this.events = new ObserverManager("delete", "disable");

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
    const note = e.target;
    const isNote = this.isActiveNote(note);
    const hasParentNote = this.isActiveNote(note.parentElement);

    if (isNote || hasParentNote) {
      this.notePopUp.showPopUp();
      DOMElements.noteFormSubmitBtn.innerText = "Update note";
      this.noteForm.populateForm(isNote ? e.target : e.target.parentElement);
    }
  }

  triggerAction(e) {
    const targetClassList = e.target.classList;
    const isChangeStatusBtn = targetClassList.contains(
      DOMClasses.note.changeStatusBtn
    );
    const isDeleteBtn = targetClassList.contains(DOMClasses.note.deleteBtn);

    if (isChangeStatusBtn || isDeleteBtn) {
      const noteEl = e.target.parentElement;
      const event = isDeleteBtn ? "delete" : "disable";
      this.events.notify(event, noteEl);
    }
  }

  isActiveNote(element) {
    return (
      element.classList.contains(DOMClasses.note.main) &&
      element.dataset.status === Status.ACTIVE
    );
  }
}
