import DOMElements from "../dom/DOMElements";
import Status from "../state/Status";

import FormUtil from "../util/FormUtil";
import NotePropertiesUtil from "../util/NotePropertiesUtil";

import ObserverManager from "../observer/ObserverManager";

export default class NoteForm {
  constructor(taskService, noteService) {
    this.taskService = taskService;
    this.noteService = noteService;

    this.events = new ObserverManager("create", "update");

    this.addEventListeners();
  }

  addEventListeners() {
    DOMElements.noteForm.addEventListener(
      "submit",
      this.createOrUpdateTask.bind(this)
    );
    DOMElements.noteFormColorPicker.addEventListener(
      "input",
      this.changeFormColor.bind(this)
    );
  }

  createOrUpdateTask(e) {
    e.preventDefault();
    const task = FormUtil.extractData(DOMElements.noteForm);
    if (!task.description) return;

    if (task.id) {
      this.events.notify("update", task);
    } else {
      this.setTaskProperties(task);
      this.events.notify("create", task);
      FormUtil.resetForm(DOMElements.noteForm);
    }
  }

  populateForm(note) {
    const task = NotePropertiesUtil.getTaskFromNote(note);
    FormUtil.populateData(DOMElements.noteForm, task);
  }

  setTaskProperties(task) {
    task.id = task.id || this.taskService.getNextAvailableIndex();
    task.pinColor = NotePropertiesUtil.getRandomGradient();
    task.rotation = NotePropertiesUtil.getRandomRotation();
    const { xPosition, yPosition } = NotePropertiesUtil.getRandomPosition();
    task.xPosition = xPosition;
    task.yPosition = yPosition;
    task.status = Status.ACTIVE;
  }

  changeFormColor() {
    DOMElements.noteForm.style.backgroundColor =
      DOMElements.noteFormColorPicker.value;
  }
}
