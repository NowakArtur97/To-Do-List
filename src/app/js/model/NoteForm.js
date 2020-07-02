import DOMElements from "../dom/DOMElements";

import ObserverManager from "../observer/ObserverManager";

export default class NoteForm {
  constructor(formUtil, taskService, noteService, notePropertiesUtil) {
    this.taskService = taskService;
    this.noteService = noteService;
    this.formUtil = formUtil;
    this.notePropertiesUtil = notePropertiesUtil;

    this.events = new ObserverManager("create", "update");

    this.addEventListeners();
  }

  addEventListeners() {
    DOMElements.noteForm.addEventListener("submit", this.createTask.bind(this));
  }

  createTask(e) {
    e.preventDefault();
    const task = this.formUtil.extractData(DOMElements.noteForm);
    task.color = this.notePropertiesUtil.getRandomColor();
    task.rotation = this.notePropertiesUtil.getRandomRotation();
    const {
      randomHeight,
      randomWidth,
    } = this.notePropertiesUtil.getRandomPosition();
    task.randomHeight = randomHeight;
    task.randomWidth = randomWidth;

    if (task.id) {
      this.events.notify("update", task);
    } else {
      task.id = task.id || this.taskService.getNextAvailableIndex();
      this.events.notify("create", task);
    }

    this.formUtil.resetForm(DOMElements.noteForm);
  }

  populateForm(note) {
    const task = this.notePropertiesUtil.getTaskFromNote(note);
    this.formUtil.populateData(DOMElements.noteForm, task);
  }
}
