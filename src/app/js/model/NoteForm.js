import DOMElements from "../dom/DOMElements";

import ObserverManager from "../observer/ObserverManager";

export default class NoteForm {
  constructor(formUtil, taskService, noteService) {
    this.taskService = taskService;
    this.noteService = noteService;
    this.formUtil = formUtil;

    this.events = new ObserverManager("create", "update");

    this.addEventListeners();
  }

  addEventListeners() {
    DOMElements.noteForm.addEventListener("submit", this.createTask.bind(this));
  }

  createTask(e) {
    e.preventDefault();
    const task = this.formUtil.extractData(DOMElements.noteForm);
    if (task.id) {
      this.events.notify("update", task);
    } else {
      task.id = task.id || this.taskService.getNextIndex();
      this.events.notify("create", task);
    }

    this.formUtil.resetForm(DOMElements.noteForm);
  }

  populateForm(note) {
    const task = this.taskService.getTaskFromNote(note);
    this.formUtil.populateData(DOMElements.noteForm, task);
  }
}
