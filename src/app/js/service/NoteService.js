import DraggableElement from "../model/DraggableElement";
import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";
import Status from "../state/Status";

export default class NoteService {
  constructor() {
    const NOTE_HOVER_SCALE_VALUE = 1.3;
    this.NOTE_HOVER_SCALE = `scale(${NOTE_HOVER_SCALE_VALUE})`;
    this.listeners = {};
  }

  create(task) {
    const noteEl = this.createNote(task);

    if (noteEl.dataset.status === Status.ACTIVE) {
      new DraggableElement(noteEl);
      this.addNoteEventListeners(noteEl, task.rotation);
    } else {
      noteEl.style.backgroundColor = "#999999";
    }

    const descriptionEl = this.createDescription(task);
    const deleteBtn = this.createBtn("X", DOMClasses.note.deleteBtn);
    const changeStatusBtn = this.createBtn(
      "✓",
      DOMClasses.note.changeStatusBtn
    );
    const pinEl = this.createPin(task);
    const typeEl = this.createTypeIcon(task);
    const statusEl = this.createStatusEl(task);

    noteEl.appendChild(pinEl);
    noteEl.appendChild(typeEl);
    noteEl.appendChild(changeStatusBtn);
    noteEl.appendChild(deleteBtn);
    noteEl.appendChild(descriptionEl);
    noteEl.appendChild(statusEl);

    DOMElements.board.appendChild(noteEl);
  }

  createNote({ id, status, noteColor, yPosition, xPosition, rotation }) {
    const noteEl = document.createElement("div");
    noteEl.classList.add(DOMClasses.note.main);
    noteEl.dataset.id = id;
    noteEl.dataset.field = "noteColor";
    noteEl.dataset.status = status ? status : Status.ACTIVE;
    noteEl.style.backgroundColor = `${noteColor}`;
    noteEl.style.top = `${yPosition}px`;
    noteEl.style.left = `${xPosition}px`;
    noteEl.style.transform =
      status === Status.ACTIVE ? `rotate(${rotation}deg)` : "";

    return noteEl;
  }

  createDescription({ description }) {
    const descriptionEl = document.createElement("p");
    descriptionEl.classList.add(DOMClasses.note.description);
    descriptionEl.innerText = description;
    descriptionEl.dataset.field = "description";

    return descriptionEl;
  }

  createBtn(text = "", additionalClass) {
    const btn = document.createElement("button");
    btn.classList.add(DOMClasses.note.btn);
    btn.classList.add(additionalClass);
    btn.innerText = text;

    return btn;
  }

  createPin({ pinColor }) {
    const pinEl = document.createElement("div");
    pinEl.classList.add(DOMClasses.note.pin);
    pinEl.style.backgroundImage = `${pinColor}`;

    return pinEl;
  }

  createTypeIcon({ type }) {
    const typeEl = document.createElement("i");
    typeEl.classList.add(DOMClasses.icon.main);
    typeEl.classList.add(`${DOMClasses.icon.detailed}${type}`);
    typeEl.classList.add(DOMClasses.note.icon);
    typeEl.dataset.field = "type";
    typeEl.dataset.value = type;

    return typeEl;
  }

  createStatusEl({ status }) {
    const statusEl = document.createElement("p");
    statusEl.classList.add(DOMClasses.note.status);
    statusEl.innerText = status;

    return statusEl;
  }

  update(updatedTask) {
    const noteToUpdate = [
      ...document.querySelectorAll(`.${DOMClasses.note.main}`),
    ].find((note) => note.dataset.id == updatedTask.id);
    noteToUpdate.dataset.id = updatedTask.id;

    const elements = [noteToUpdate, ...noteToUpdate.childNodes];

    elements.forEach((element) => {
      const property = element.dataset?.field;
      if (property === "type") {
        element.className = "";
        element.classList.add(DOMClasses.icon.main);
        element.classList.add(
          `${DOMClasses.icon.detailed}${updatedTask[property]}`
        );
        element.classList.add(DOMClasses.note.icon);
        element.dataset.value = updatedTask[property];
      } else if (property) {
        if (property === "noteColor") {
          noteToUpdate.style.backgroundColor = updatedTask[property];
        } else {
          element.innerText = updatedTask[property];
        }
      }
    });
  }

  disable(note) {
    note.dataset.status = Status.INACTIVE;
    note.style.backgroundColor = "#999999";
    note.style.transform = "";
    this.removeNoteEventListeners(note);
    const inActiveNote = note.cloneNode(true);
    note.parentNode.replaceChild(inActiveNote, note);
  }

  delete(note) {
    note.remove();
  }

  createAll(tasks = []) {
    tasks.forEach((task) => this.create(task));
  }

  deleteAll() {
    [...document.querySelectorAll(`.${DOMClasses.note.main}`)]
      .filter((note) => !note.classList.contains(DOMClasses.noteOption.main))
      .forEach((task) => this.delete(task));
  }

  addNoteEventListeners(noteEl, randomRotation) {
    this.listeners.mouseover = () =>
      this.setNoteTransform(noteEl, this.NOTE_HOVER_SCALE);
    this.listeners.mouseleave = () =>
      this.setNoteTransform(noteEl, `rotate(${randomRotation}deg)`);

    noteEl.addEventListener("mouseover", this.listeners.mouseover);
    noteEl.addEventListener("mouseleave", this.listeners.mouseleave);
  }

  removeNoteEventListeners(noteEl) {
    noteEl.removeEventListener("mouseover", this.listeners.mouseover);
    noteEl.removeEventListener("mouseleave", this.listeners.mouseleave);
  }

  setNoteTransform(noteEl, transform) {
    noteEl.style.transform = transform;
  }
}
