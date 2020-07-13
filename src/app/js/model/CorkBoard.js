import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";
import Status from "../state/Status";

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
    const note = e.target.closest(`.${DOMClasses.note.main}`);

    if (note) {
      this.notePopUp.showPopUp();
      DOMElements.noteFormSubmitBtn.innerText = "Update note";
      this.noteForm.populateForm(note);
    }
  }

  triggerAction(e) {
    const targetClassList = e.target.classList;
    const parentTargetClassList = e.target.parentElement.classList;
    const isChangeStatusBtn = targetClassList.contains(
      DOMClasses.note.changeStatusBtn
    );
    const isDeleteBtn =
      targetClassList.contains(DOMClasses.note.deleteBtn) ||
      parentTargetClassList.contains(DOMClasses.note.deleteBtn);

    if (isChangeStatusBtn || isDeleteBtn) {
      const noteEl = e.target.closest(`.${DOMClasses.note.main}`);
      const event = isDeleteBtn ? "delete" : "changeStatus";
      this.events.notify(event, noteEl);
    }
  }
}
