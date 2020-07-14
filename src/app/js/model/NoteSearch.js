import DOMElements from "../dom/DOMElements";

export default class NoteForm {
  constructor(noteFilterService) {
    this.noteFilterService = noteFilterService;

    this.addEventListeners();
  }

  addEventListeners() {
    DOMElements.noteSearchInput.addEventListener(
      "keyup",
      this.filterTask.bind(this)
    );
    DOMElements.noteSearchInput.addEventListener(
      "change",
      this.filterTask.bind(this)
    );
  }

  filterTask(e) {
    this.noteFilterService.filterTask(e.target.value, "description");
  }
}
