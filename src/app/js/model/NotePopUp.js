import DOMElements from "../dom/DOMElements";
import DOMClasses from "../dom/DOMClasses";

export default class NotePopUp {
  constructor(taskService, noteService) {
    this.taskService = taskService;
    this.noteService = noteService;

    this.addEventListeners();
  }

  addEventListeners() {
    DOMElements.noteFormPopUpTrigger.addEventListener("click", this.showPopUp);
    DOMElements.noteFormPopUpCloseBtn.addEventListener(
      "click",
      this.closePopUp
    );
    DOMElements.noteForm.addEventListener("submit", this.createTask.bind(this));
  }

  showPopUp() {
    DOMElements.noteFormPopUp.classList.add(DOMClasses.noteFormPopUp.active);
  }

  closePopUp() {
    DOMElements.noteFormPopUp.classList.remove(DOMClasses.noteFormPopUp.active);
  }

  createTask(e) {
    e.preventDefault();
    const task = this.taskService.create(DOMElements.noteForm);
    this.noteService.create(task, true);
  }
}
