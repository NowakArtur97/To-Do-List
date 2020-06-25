import DragAndDrop from "../logic/DragAndDrop";
import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";

export default class NoteService {
  constructor() {}

  create({ description }) {
    const noteEl = document.createElement("div");
    noteEl.classList.add(DOMClasses.note.main, DOMClasses.note.rotated);

    const descriptionEl = document.createElement("p");
    descriptionEl.classList.add(DOMClasses.note.description);
    descriptionEl.innerText = description;
    noteEl.appendChild(descriptionEl);

    if (true) {
      new DragAndDrop(noteEl);
    }

    DOMElements.board.appendChild(noteEl);
  }
}
