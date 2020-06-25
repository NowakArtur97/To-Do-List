import DragAndDrop from "../logic/DragAndDrop";

export default class Note {
  constructor({ description, isDraggable }) {
    this.description = description;
    this.isDraggable = isDraggable;
    this.init();
  }

  init() {
    const newNote = document.createElement("div");
    newNote.classList.add("note", "note--rotated");
    if (this.isDraggable) {
      newNote.classList.add("draggable");
    }

    const description = document.createElement("p");
    description.classList.add("note__text");
    description.innerText = this.description;
    newNote.appendChild(description);

    document.body.appendChild(newNote);

    new DragAndDrop(newNote);
  }
}
