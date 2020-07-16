import DOMElements from "../dom/DOMElements";
import DOMClasses from "../dom/DOMClasses";

import FormUtil from "../util/FormUtil";

export default class NotePopUp {
  constructor() {
    this.addEventListeners();
  }

  addEventListeners() {
    DOMElements.noteFormPopUpTrigger.addEventListener("click", this.showPopUp);
    DOMElements.noteFormPopUpCloseBtn.addEventListener(
      "click",
      this.closePopUp.bind(this)
    );
  }

  showPopUp() {
    DOMElements.noteFormSubmitBtn.innerText = "Create note";
    DOMElements.noteFormPopUp.classList.add(DOMClasses.noteFormPopUp.active);
  }

  closePopUp() {
    DOMElements.noteFormPopUp.classList.remove(DOMClasses.noteFormPopUp.active);
    FormUtil.resetForm(DOMElements.noteForm);
  }
}
