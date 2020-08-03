import DraggableElement from "../model/DraggableElement";
import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";
import Status from "../state/Status";

export default class NoteService {
  constructor() {
    const NOTE_HOVER_SCALE_VALUE = 1.3;
    this.NOTE_HOVER_SCALE = `scale(${NOTE_HOVER_SCALE_VALUE})`;
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
    const deleteBtnEl = this.createBtn([DOMClasses.note.deleteBtn]);
    const deleteBtnIconEl = this.createIcon([DOMClasses.icon.delete]);
    const taskStatusBtnClass =
      task.status === Status.ACTIVE
        ? DOMClasses.note.deactivateStatusBtn
        : DOMClasses.note.activateStatusBtn;
    const changeStatusBtnEl = this.createBtn(
      [DOMClasses.note.changeStatusBtn, taskStatusBtnClass],
      task.status === Status.ACTIVE ? "X" : "✓"
    );
    const pinEl = this.createPin(task);
    let typeEl;
    if (task.type) {
      typeEl = this.createTypeIcon(task);
    }
    const statusEl = this.createStatusEl(task);

    noteEl.appendChild(pinEl);
    if (typeEl) {
      noteEl.appendChild(typeEl);
    }
    noteEl.appendChild(changeStatusBtnEl);
    deleteBtnEl.appendChild(deleteBtnIconEl);
    noteEl.appendChild(deleteBtnEl);
    noteEl.appendChild(descriptionEl);
    noteEl.appendChild(statusEl);

    DOMElements.board.appendChild(noteEl);
  }

  createNote({ id, status, noteColor, yPosition, xPosition, rotation }) {
    const noteEl = document.createElement("div");
    noteEl.classList.add(DOMClasses.note.main);
    noteEl.dataset.id = id;
    noteEl.dataset.noteColor = noteColor;
    noteEl.dataset.rotation = rotation;
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

  createBtn(additionalClasses = [], text = "") {
    const btnEl = document.createElement("button");
    btnEl.classList.add(DOMClasses.note.btn, ...additionalClasses);

    btnEl.innerText = text;

    return btnEl;
  }

  createPin({ pinColor }) {
    const pinEl = document.createElement("div");
    pinEl.classList.add(DOMClasses.note.pin);
    pinEl.style.backgroundImage = `${pinColor}`;

    return pinEl;
  }

  createIcon(additionalClasses = []) {
    const iconEl = document.createElement("i");
    iconEl.classList.add(
      DOMClasses.icon.main,
      DOMClasses.note.icon,
      ...additionalClasses
    );

    return iconEl;
  }

  createTypeIcon({ type }) {
    const typeEl = this.createIcon([
      `${DOMClasses.icon.detailed}${type}`,
      DOMClasses.note.type,
    ]);
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

    for (const property in noteToUpdate.dataset) {
      if (property === "rotation" || property === "status") continue;
      noteToUpdate.dataset[property] = updatedTask[property];
      if (property === "noteColor") {
        noteToUpdate.style.backgroundColor = updatedTask[property];
      }
    }

    const elements = [...noteToUpdate.childNodes];

    elements.forEach((element) => {
      const property = element.dataset?.field;
      if (property === "type") {
        element.className = "";
        element.classList.add(
          DOMClasses.icon.main,
          `${DOMClasses.icon.detailed}${updatedTask[property]}`,
          DOMClasses.note.icon,
          DOMClasses.note.type
        );
        element.dataset.value = updatedTask[property];
      } else if (property) {
        element.innerText = updatedTask[property];
      }
    });
  }

  changeStatus(note) {
    const status = note.dataset.status;
    if (status === Status.ACTIVE) {
      this.setNoteStatus(note, Status.INACTIVE, [
        DOMClasses.note.changeStatusBtn,
        DOMClasses.note.activateStatusBtn,
      ]);
    } else if (status === Status.INACTIVE) {
      this.setNoteStatus(note, Status.ACTIVE, [
        DOMClasses.note.changeStatusBtn,
        DOMClasses.note.deactivateStatusBtn,
      ]);
    }
  }

  setNoteStatus(note, status, classes = []) {
    note.dataset.status = status;
    note.querySelector(`.${DOMClasses.note.status}`).innerText = status;

    const changeStatusBtn = note.querySelector(
      `.${DOMClasses.note.changeStatusBtn}`
    );
    changeStatusBtn.classList = "";
    changeStatusBtn.classList.add(...classes);

    if (status === Status.INACTIVE) {
      const grayColor = "#999999";
      note.style.backgroundColor = grayColor;
      note.style.transform = "";
      changeStatusBtn.innerText = "✓";
      const inactiveNote = note.cloneNode(true);
      note.parentNode.replaceChild(inactiveNote, note);
    } else if (status === Status.ACTIVE) {
      note.style.backgroundColor = note.dataset.noteColor;
      changeStatusBtn.innerText = "X";
      this.addNoteEventListeners(note, note.dataset.rotation);
      new DraggableElement(note);
    }
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
    noteEl.addEventListener("mouseover", () =>
      this.setNoteTransform(noteEl, this.NOTE_HOVER_SCALE)
    );
    noteEl.addEventListener("mouseleave", () =>
      this.setNoteTransform(noteEl, `rotate(${randomRotation}deg)`)
    );
  }

  setNoteTransform(noteEl, transform) {
    noteEl.style.transform = transform;
  }
}
