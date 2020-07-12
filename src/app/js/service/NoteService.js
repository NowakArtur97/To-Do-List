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

  create({
    id,
    type,
    description,
    noteColor,
    pinColor,
    xPosition,
    yPosition,
    rotation,
    status,
  }) {
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

    const descriptionEl = document.createElement("p");
    descriptionEl.classList.add(DOMClasses.note.description);
    descriptionEl.innerText = description;
    descriptionEl.dataset.field = "description";

    if (noteEl.dataset.status === Status.ACTIVE) {
      new DraggableElement(noteEl);
      this.addNoteEventListeners(noteEl, rotation);
    } else {
      noteEl.style.backgroundColor = "#999999";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add(DOMClasses.note.btn);
    deleteBtn.classList.add(DOMClasses.note.deleteBtn);
    deleteBtn.innerText = "X";

    const changeStatusBtn = document.createElement("button");
    changeStatusBtn.classList.add(DOMClasses.note.btn);
    changeStatusBtn.classList.add(DOMClasses.note.changeStatusBtn);
    changeStatusBtn.innerText = "✓";

    const pinEl = document.createElement("div");
    pinEl.classList.add(DOMClasses.note.pin);
    pinEl.style.backgroundImage = `${pinColor}`;

    const typeEl = document.createElement("i");
    typeEl.classList.add(DOMClasses.icon.main);
    typeEl.classList.add(`${DOMClasses.icon.detailed}${type}`);
    typeEl.classList.add(DOMClasses.note.icon);
    typeEl.dataset.field = "type";
    typeEl.dataset.value = type;

    noteEl.appendChild(pinEl);
    noteEl.appendChild(typeEl);
    noteEl.appendChild(changeStatusBtn);
    noteEl.appendChild(deleteBtn);
    noteEl.appendChild(descriptionEl);

    DOMElements.board.appendChild(noteEl);
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

  changeStatus(note) {
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
      .filter(
        (note) =>
          !note.classList.contains(DOMClasses.noteOption.main) &&
          !note.classList.contains(DOMClasses.noteSearch.main)
      )
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
