import DOMClasses from "./DOMClasses";

export default {
  notes: document.querySelectorAll(`.${DOMClasses.note.main}`),
  noteFormPopUpTrigger: document.querySelector(
    `.${DOMClasses.noteFormPopUpTrigger.main}`
  ),
  noteFormPopUp: document.querySelector(`.${DOMClasses.noteFormPopUp.main}`),
  noteFormPopUpCloseBtn: document.querySelector(
    `.${DOMClasses.noteFormPopUp.closeBtn}`
  ),
};
