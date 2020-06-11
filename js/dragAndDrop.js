export default class DragAndDrop {
  #element = null;
  #isDragged = false;

  constructor(element) {
    this.#element = element;

    this.#addEventListeners();
  }

  #addEventListeners = function () {
    this.#element.addEventListener("mousedown", this.#drag.bind(this));
  };

  #drag = function () {
    console.log("DRAG");
  };
}
