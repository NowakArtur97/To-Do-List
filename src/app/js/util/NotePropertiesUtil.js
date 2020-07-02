import Colors from "../state/Colors";
import DOMElements from "../dom/DOMElements";

export default class NotePropertiesUtil {
  constructor(randomUtil) {
    this.randomUtil = randomUtil;

    this.MAX_NOTE_ROTATION = 15;
  }

  getRandomColor() {
    return Colors[this.randomUtil.getRandomNumber(0, Colors.length)];
  }

  getRandomPosition() {
    const {
      height: boardHeight,
      width: boardWidth,
    } = DOMElements.board.getBoundingClientRect();

    const randomHeight = this.randomUtil.getRandomNumber(0, boardHeight * 0.8);
    const randomWidth = this.randomUtil.getRandomNumber(0, boardWidth * 0.8);

    return { randomHeight, randomWidth };
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
      if (property) {
        task[property] = element.innerText;
      }
    });

    return task;
  }
}
