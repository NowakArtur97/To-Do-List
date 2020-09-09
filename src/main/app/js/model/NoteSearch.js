import DOMElements from '../dom/DOMElements';

export default class NoteForm {
  #noteFilterService;
  constructor(noteFilterService) {
    this.#noteFilterService = noteFilterService;

    this.#addEventListeners();
  }

  #addEventListeners() {
    DOMElements.noteSearchInput.addEventListener(
      "keyup",
      this.#filterTasks.bind(this)
    );
    DOMElements.noteSearchInput.addEventListener(
      "change",
      this.#filterTasks.bind(this)
    );
    DOMElements.noteSearchCancelBtn.addEventListener(
      "click",
      this.#cancelFilteringTask.bind(this)
    );
  }

  #filterTasks(e) {
    this.#noteFilterService.filterTasks(e.target.value, "description");
  }

  #cancelFilteringTask(e) {
    e.preventDefault();
    this.#noteFilterService.filterTasks();
    DOMElements.noteSearchInput.value = "";
  }
}
