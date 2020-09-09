import DOMClasses from '../dom/DOMClasses';
import TaskService from '../service/TaskService';

export default class DraggableElement {
  constructor(element) {
    this.element = element;
    this.offset = {};
    this.lastX = null;
    this.lastY = null;
    this.isDragged = false;
    this.element.classList.add(DOMClasses.draggable.main);

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.element.addEventListener("mousedown", this.#startDragging.bind(this));
    this.element.addEventListener("mousemove", this.#drag.bind(this));
    this.element.addEventListener("mouseup", this.#drop.bind(this));
    this.element.addEventListener("mouseleave", this.#drop.bind(this));

    this.element.addEventListener("touchstart", this.#startDragging.bind(this));
    this.element.addEventListener("touchmove", this.#drag.bind(this));
    this.element.addEventListener("touchcancel", this.#drop.bind(this));
    this.element.addEventListener("touchend", this.#drop.bind(this));
  }

  #startDragging(e) {
    this.isDragged = true;
    const { clientX: xPosition, clientY: yPosition } = e.clientX
      ? e
      : e.touches[0];
    this.offset.x = this.element.offsetLeft - xPosition;
    this.offset.y = this.element.offsetTop - yPosition;
  }

  #drag(e) {
    if (!this.isDragged) {
      return;
    }
    const { clientX, clientY } = e.clientX ? e : e.touches[0];
    const xPosition = clientX + this.offset.x;
    const yPosition = clientY + this.offset.y;
    this.element.style.left = `${xPosition}px`;
    this.element.style.top = `${yPosition}px`;
    this.lastX = xPosition;
    this.lastY = yPosition;
  }

  #drop() {
    this.isDragged = false;
    const isNote = this.element.classList.contains(DOMClasses.note.main);

    if (isNote) {
      const task = {
        id: this.element.dataset.id,
        xPosition: this.lastX,
        yPosition: this.lastY,
      };
      if (task.xPosition && task.yPosition) {
        TaskService.getInstance().update(task);
      }
    }
  }
}
