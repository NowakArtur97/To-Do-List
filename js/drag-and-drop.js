export default class DragAndDrop {
  #element = null;
  #isDragged = false;
  #offset = [0, 0];

  constructor(element) {
    this.#element = element;

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
    this.#offset = [
      this.#element.offsetLeft - e.clientX,
      this.#element.offsetTop - e.clientY,
    ];
  };

  #drag = function (e) {
    if (!this.#isDragged) {
      return;
    }
    const mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
    this.#element.style.left = mousePosition.x + this.#offset[0] + "px";
    this.#element.style.top = mousePosition.y + this.#offset[1] + "px";
  };

  #drop = function () {
    this.#isDragged = false;
  };
}
