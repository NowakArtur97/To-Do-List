import DragAndDrop from "../logic/DragAndDrop";
import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";

export default class NoteService {
  constructor(randomUtil) {
    this.randomUtil = randomUtil;

    this.MAX_NOTE_ROTATION = 15;
    this.NOTE_HOVER_SCALE = "scale(1.3)";
  }

  create({ description }) {
    const noteEl = document.createElement("div");
    noteEl.classList.add(DOMClasses.note.main);

    this.setRandomPosition(noteEl);
    const randomRotation = this.setRandomRotation(noteEl);

    const descriptionEl = document.createElement("p");
    descriptionEl.classList.add(DOMClasses.note.description);
    descriptionEl.innerText = description;
    noteEl.appendChild(descriptionEl);

    if (true) {
      new DragAndDrop(noteEl);
    }

    this.setEventListeners(noteEl, randomRotation);

    DOMElements.board.appendChild(noteEl);
  }

  setRandomPosition(noteEl) {
    const {
      height: boardHeight,
      width: boardWidth,
    } = DOMElements.board.getBoundingClientRect();

    noteEl.style.top = `${this.randomUtil.getRandomNumber(0, boardHeight)}px`;
    noteEl.style.left = `${this.randomUtil.getRandomNumber(0, boardWidth)}px`;
  }

  setRandomRotation(noteEl) {
    return (noteEl.style.transform = `rotate(${this.randomUtil.getRandomNumber(
      -this.MAX_NOTE_ROTATION,
      this.MAX_NOTE_ROTATION
    )}deg)`);
  }

  setEventListeners(noteEl, randomRotation) {
    noteEl.addEventListener(
      "mouseover",
      () => (noteEl.style.transform = this.NOTE_HOVER_SCALE)
    );
    noteEl.addEventListener(
      "mouseleave",
      () => (noteEl.style.transform = randomRotation)
    );
  }
}
