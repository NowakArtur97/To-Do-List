import Offset from "../model/offset.js";

export default class DragAndDrop {
  #element = null;
  #offset = null;
  #isDragged = false;

  constructor(element) {
    this.#element = element;
    this.#offset = new Offset(0, 0);

    this.#addEventListeners();
  }

  #addEventListeners = function () {
    this.#element.addEventListener("mousedown", this.#startDragging.bind(this));
    this.#element.addEventListener("mousemove", this.#drag.bind(this));
    this.#element.addEventListener("mouseup", this.#drop.bind(this));
    this.#element.addEventListener("mouseleave", this.#drop.bind(this));
  };

  #startDragging = function (e) {
    this.#isDragged = true;
    const { clientX: xPos, clientY: yPos } = e;
    this.#offset.x = this.#element.offsetLeft - xPos;
    this.#offset.y = this.#element.offsetTop - yPos;
  };

  #drag = function (e) {
    if (!this.#isDragged) {
      return;
    }
    const { clientX: xPos, clientY: yPos } = e;
    this.#element.style.left = xPos + this.#offset.x + "px";
    this.#element.style.top = yPos + this.#offset.y + "px";
  };

  #drop = function () {
    this.#isDragged = false;
  };
}
