import DOMElements from "../dom/DOMElements";

export default class NotePopUp {
  popUpOnClick() {
    DOMElements.noteFormPopUpTrigger.addEventListener("click", this.showPopUp);
  }

  showPopUp() {
    console.log("Pop up");
  }
}
