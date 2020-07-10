import colorsForGradients from "../state/Colors";
import DOMElements from "../dom/DOMElements";

export default class NotePropertiesUtil {
  constructor(randomUtil) {
    this.randomUtil = randomUtil;

    this.MAX_NOTE_ROTATION = 15;
    this.RADIAL_MIN_SIZE = 50;
    this.RADIAL_MAX_SIZE = 70;
  }

  getRandomGradient() {
    return `radial-gradient(#${
      colorsForGradients[
        this.randomUtil.getRandomNumber(0, colorsForGradients.length - 1)
      ]
    } ${this.randomUtil.getRandomNumber(
      this.RADIAL_MIN_SIZE,
      this.RADIAL_MAX_SIZE
    )}%, black 50%)`;
  }

  getRandomPosition() {
    const {
      height: boardHeight,
      width: boardWidth,
    } = DOMElements.board.getBoundingClientRect();

    const xPosition = this.randomUtil.getRandomNumber(0, boardWidth * 0.8);
    const yPosition = this.randomUtil.getRandomNumber(0, boardHeight * 0.8);

    return { xPosition, yPosition };
  }

  getRandomRotation() {
    return this.randomUtil.getRandomNumber(
      -this.MAX_NOTE_ROTATION,
      this.MAX_NOTE_ROTATION
    );
  }

  getTaskFromNote(note) {
    const task = {};
    task.id = note.dataset.id;

    note.childNodes.forEach((element) => {
      const property = element.dataset.field;
      let value;

      if (property === "type") {
        value = element.dataset.value;
      } else if (property) {
        value = element.innerText;
      }
      task[property] = value;
    });
    return task;
  }
}
