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

    let tasks = [];
    if (e.target.value.length === 0) {
      tasks = this.taskService.getAll();
    } else {
      tasks = this.taskService.filter(toFind);
    }
    this.noteService.deleteAll();
    this.noteService.createAll(tasks);
  }
}
