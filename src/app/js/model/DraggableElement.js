import DOMClasses from "../dom/DOMClasses";

import Offset from "./Offset";
import TaskService from "../service/TaskService";

export default class DraggableElement {
  constructor(element) {
    this.element = element;
    this.offset = new Offset(0, 0);
    this.lastX = null;
    this.lastY = null;
    this.isDragged = false;
    this.element.classList.add("draggable");

    this.addEventListeners();
  }

  addEventListeners() {
    this.element.addEventListener("mousedown", this.startDragging.bind(this));
    this.element.addEventListener("mousemove", this.drag.bind(this));
    this.element.addEventListener("mouseup", this.drop.bind(this));
    this.element.addEventListener("mouseleave", this.drop.bind(this));
  }

  startDragging(e) {
    this.isDragged = true;
    const { clientX: xPos, clientY: yPos } = e;
    this.offset.x = this.element.offsetLeft - xPos;
    this.offset.y = this.element.offsetTop - yPos;
  }

  drag(e) {
    if (!this.isDragged) {
      return;
    }
    const { clientX, clientY } = e;
    const xPos = clientX + this.offset.x;
    const yPos = clientY + this.offset.y;
    this.element.style.left = xPos + "px";
    this.element.style.top = yPos + "px";

    this.lastX = xPos;
    this.lastY = yPos;
  }

  drop() {
    this.isDragged = false;

    if (this.element.classList.contains(DOMClasses.note.main)) {
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
