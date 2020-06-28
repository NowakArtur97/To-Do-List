import DraggableElement from "../model/DraggableElement";
import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";
import Colors from "../state/Colors";

export default class NoteService {
  constructor(randomUtil) {
    this.randomUtil = randomUtil;

    this.MAX_NOTE_ROTATION = 15;

    const NOTE_HOVER_SCALE_VALUE = 1.3;
    this.NOTE_HOVER_SCALE = `scale(${NOTE_HOVER_SCALE_VALUE})`;
  }

  create({ id, description }) {
    const noteEl = document.createElement("div");
    noteEl.classList.add(DOMClasses.note.main);
    noteEl.dataset.id = id;

    this.setRandomColor(noteEl);
    this.setRandomPosition(noteEl);
    const randomRotation = this.setRandomRotation(noteEl);

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

    this.addNoteEventListeners(noteEl, randomRotation);
    this.addDeleteBtnEventListeners(deleteBtn);

    noteEl.appendChild(deleteBtn);
    noteEl.appendChild(descriptionEl);

    DOMElements.board.appendChild(noteEl);
  }

  createAll(tasks = []) {
    tasks.forEach((task) => this.create(task));
  }

  delete(note) {
    note.remove();
  }

  setRandomColor(noteEl) {
    const color = Colors[this.randomUtil.getRandomNumber(0, Colors.length)];
    noteEl.style.backgroundColor = `#${color}`;
  }

  setRandomPosition(noteEl) {
    const {
      height: boardHeight,
      width: boardWidth,
    } = DOMElements.board.getBoundingClientRect();

    const randomHeight = this.randomUtil.getRandomNumber(0, boardHeight * 0.8);
    const randomWidth = this.randomUtil.getRandomNumber(0, boardWidth * 0.8);

    noteEl.style.top = `${randomHeight}px`;
    noteEl.style.left = `${randomWidth}px`;
  }

  setRandomRotation(noteEl) {
    return (noteEl.style.transform = `rotate(${this.randomUtil.getRandomNumber(
      -this.MAX_NOTE_ROTATION,
      this.MAX_NOTE_ROTATION
    )}deg)`);
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

  addDeleteBtnEventListeners(deleteBtnEl, randomRotation) {
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
