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
    const taskStatusBtnClasses =
      task.status === Status.ACTIVE
        ? DOMClasses.note.deactivateStatusBtn
        : DOMClasses.note.activateStatusBtn;
    const changeStatusBtnEl = this.createBtn(
      [DOMClasses.note.changeStatusBtn, taskStatusBtnClasses],
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
    const classList = [DOMClasses.note.btn, ...additionalClasses];
    classList.forEach((className) => btnEl.classList.add(className));

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
    const classList = [
      DOMClasses.icon.main,
      DOMClasses.note.icon,
      ...additionalClasses,
    ];
    classList.forEach((className) => iconEl.classList.add(className));

    return iconEl;
  }

  createTypeIcon({ type }) {
    const typeEl = this.createIcon([`${DOMClasses.icon.detailed}${type}`]);
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
        element.classList.add(DOMClasses.icon.main);
        element.classList.add(
          `${DOMClasses.icon.detailed}${updatedTask[property]}`
        );
        element.classList.add(DOMClasses.note.icon);
        element.dataset.value = updatedTask[property];
      } else if (property) {
        element.innerText = updatedTask[property];
      }
    });
  }

  changeStatus(note) {
    switch (note.dataset.status) {
      case Status.ACTIVE: {
        note.dataset.status = Status.INACTIVE;
        note.style.backgroundColor = "#999999";
        note.style.transform = "";
        note.querySelector(`.${DOMClasses.note.status}`).innerText =
          Status.INACTIVE;
        const changeStatusBtn = note.querySelector(
          `.${DOMClasses.note.changeStatusBtn}`
        );
        changeStatusBtn.innerText = "✓";
        changeStatusBtn.classList.add(DOMClasses.note.activateStatusBtn);
        changeStatusBtn.classList.remove(DOMClasses.note.deactivateStatusBtn);
        const inActiveNote = note.cloneNode(true);
        note.parentNode.replaceChild(inActiveNote, note);
        break;
      }
      case Status.INACTIVE: {
        note.dataset.status = Status.ACTIVE;
        note.style.backgroundColor = note.dataset.noteColor;
        note.querySelector(`.${DOMClasses.note.status}`).innerText =
          Status.ACTIVE;
        const changeStatusBtn = note.querySelector(
          `.${DOMClasses.note.changeStatusBtn}`
        );
        changeStatusBtn.innerText = "X";
        changeStatusBtn.classList.add(DOMClasses.note.deactivateStatusBtn);
        changeStatusBtn.classList.remove(DOMClasses.note.activateStatusBtn);
        this.addNoteEventListeners(note, note.dataset.rotation);
        new DraggableElement(note);
        break;
      }
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
