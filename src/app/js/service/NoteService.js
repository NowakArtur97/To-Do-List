import DragAndDrop from "../logic/DragAndDrop";
import DOMElements from "../dom/DOMElements";

export default class NoteService {
  constructor() {}

  create({ description }) {
    const noteEl = document.createElement("div");
    noteEl.classList.add("note", "note--rotated");

    const descriptionEl = document.createElement("p");
    descriptionEl.classList.add("note__text");
    descriptionEl.innerText = description;
    noteEl.appendChild(descriptionEl);

    if (true) {
      new DragAndDrop(noteEl);
    }

    DOMElements.board.appendChild(noteEl);
  }
}
