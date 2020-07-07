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
    if (task.id) {
      this.events.notify("update", task);
    } else {
      this.setTaskProperties(task);
      this.events.notify("create", task);
    }

    this.formUtil.resetForm(DOMElements.noteForm);
  }

  populateForm(note) {
    const task = this.notePropertiesUtil.getTaskFromNote(note);
    this.formUtil.populateData(DOMElements.noteForm, task);
  }

  setTaskProperties(task) {
    task.id = task.id || this.taskService.getNextAvailableIndex();
    task.noteColor = this.notePropertiesUtil.getRandomColor();
    task.pinColor = this.notePropertiesUtil.getRandomGradient();
    console.log(task.pinColor);
    task.rotation = this.notePropertiesUtil.getRandomRotation();
    const {
      xPosition,
      yPosition,
    } = this.notePropertiesUtil.getRandomPosition();
    task.xPosition = xPosition;
    task.yPosition = yPosition;
  }
}
