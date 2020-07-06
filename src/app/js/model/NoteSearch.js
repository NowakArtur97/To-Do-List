import DOMElements from "../dom/DOMElements";

export default class NoteForm {
  constructor(taskService, noteService) {
    this.taskService = taskService;
    this.noteService = noteService;

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
    const toFind = e.target.value;

    const tasks = this.taskService.filter(toFind);
    console.log(tasks);
  }
}
