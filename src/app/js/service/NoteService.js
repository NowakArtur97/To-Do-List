import DraggableElement from "../model/DraggableElement";
import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";

export default class NoteService {
  constructor() {
    const NOTE_HOVER_SCALE_VALUE = 1.3;
    this.NOTE_HOVER_SCALE = `scale(${NOTE_HOVER_SCALE_VALUE})`;
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
  }) {
    const noteEl = document.createElement("div");
    noteEl.classList.add(DOMClasses.note.main);
    noteEl.dataset.id = id;

    noteEl.style.backgroundColor = `#${noteColor}`;
    noteEl.style.top = `${yPosition}px`;
    noteEl.style.left = `${xPosition}px`;
    noteEl.style.transform = `rotate(${rotation}deg)`;

    const descriptionEl = document.createElement("p");
    descriptionEl.classList.add(DOMClasses.note.description);
    descriptionEl.innerText = description;
    descriptionEl.dataset.field = "description";

    if (true) {
      new DraggableElement(noteEl);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add(DOMClasses.note.deleteBtn);
    deleteBtn.innerText = "X";

    const pinEl = document.createElement("div");
    pinEl.classList.add(DOMClasses.note.pin);
    pinEl.style.backgroundImage = `${pinColor}`;

    const typeEl = document.createElement("i");
    typeEl.classList.add(DOMClasses.icon.main);
    typeEl.classList.add(`${DOMClasses.icon.detailed}${type}`);

    this.addNoteEventListeners(noteEl, rotation);
    this.addDeleteBtnEventListeners(deleteBtn);

    noteEl.appendChild(pinEl);
    noteEl.appendChild(typeEl);
    noteEl.appendChild(deleteBtn);
    noteEl.appendChild(descriptionEl);

    DOMElements.board.appendChild(noteEl);
  }

  update(updatedTask) {
    const noteToUpdate = [
      ...document.querySelectorAll(`.${DOMClasses.note.main}`),
    ].find((note) => note.dataset.id == updatedTask.id);

    noteToUpdate.dataset.id = updatedTask.id;

    noteToUpdate.childNodes.forEach((element) => {
      const property = element.dataset.field;
      if (property) {
        element.innerText = updatedTask[property];
      }
    });
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
    noteEl.addEventListener(
      "mouseover",
      () => (noteEl.style.transform = this.NOTE_HOVER_SCALE)
    );
    noteEl.addEventListener(
      "mouseleave",
      () => (noteEl.style.transform = `rotate(${randomRotation}deg)`)
    );
  }

  addDeleteBtnEventListeners(deleteBtnEl) {
    deleteBtnEl.addEventListener(
      "mouseover",
      () => (deleteBtnEl.style.transform = this.NOTE_HOVER_SCALE)
    );
    deleteBtnEl.addEventListener(
      "mouseleave",
      () => (deleteBtnEl.style.transform = `scale(1)`)
    );
  }
}
