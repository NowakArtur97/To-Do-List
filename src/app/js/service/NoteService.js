import DraggableElement from "../model/DraggableElement";
import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";

export default class NoteService {
  constructor() {}

  create({ id, description, color, randomHeight, randomWidth, rotation }) {
    const noteEl = document.createElement("div");
    noteEl.classList.add(DOMClasses.note.main);
    noteEl.dataset.id = id;

    noteEl.style.backgroundColor = `#${color}`;
    noteEl.style.top = `${randomHeight}px`;
    noteEl.style.left = `${randomWidth}px`;
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

    this.addNoteEventListeners(noteEl, rotation);
    this.addDeleteBtnEventListeners(deleteBtn);

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

  createAll(tasks = []) {
    tasks.forEach((task) => this.create(task));
  }

  delete(note) {
    note.remove();
  }

  addNoteEventListeners(noteEl, randomRotation) {
    noteEl.addEventListener(
      "mouseover",
      () => (noteEl.style.transform = this.NOTE_HOVER_SCALE)
    );
    noteEl.addEventListener(
      "mouseleave",
      () => (noteEl.style.transform = randomRotation)
    );
  }

  addDeleteBtnEventListeners(deleteBtnEl) {
    console.log();
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
