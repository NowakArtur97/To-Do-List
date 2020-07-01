import Offset from "./Offset";

export default class DraggableElement {
  constructor(element) {
    this.element = element;
    this.offset = new Offset(0, 0);
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
  }

  drop() {
    this.isDragged = false;
  }
}
