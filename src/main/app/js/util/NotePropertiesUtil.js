import DOMElements from '../dom/DOMElements';
import ColorsForGradients from '../state/Colors';
import RandomUtil from './RandomUtil';

export default class NotePropertiesUtil {
  static get #MAX_NOTE_ROTATION() {
    return 15;
  }
  static get #RADIAL_GRADIENT_MIN_SIZE() {
    return 50;
  }

  static get #RADIAL_GRADIENT_MAX_SIZE() {
    return 70;
  }

  static getRandomGradient() {
    return `radial-gradient(#${
      ColorsForGradients[
        RandomUtil.getRandomNumber(0, ColorsForGradients.length - 1)
      ]
    } ${RandomUtil.getRandomNumber(
      NotePropertiesUtil.#RADIAL_GRADIENT_MIN_SIZE,
      NotePropertiesUtil.#RADIAL_GRADIENT_MAX_SIZE
    )}%, black 50%)`;
  }

  static getRandomPosition() {
    const {
      height: boardHeight,
      width: boardWidth,
    } = DOMElements.board.getBoundingClientRect();

    const xPosition = RandomUtil.getRandomNumber(0, boardWidth * 0.8);
    const yPosition = RandomUtil.getRandomNumber(0, boardHeight * 0.8);

    return { xPosition, yPosition };
  }

  static getRandomRotation() {
    return RandomUtil.getRandomNumber(
      -NotePropertiesUtil.#MAX_NOTE_ROTATION,
      NotePropertiesUtil.#MAX_NOTE_ROTATION
    );
  }

  static getTaskFromNote(note) {
    const task = {};
    NotePropertiesUtil.#getPropertiesFromNote(note, task);
    NotePropertiesUtil.#getPropertiesFromNoteChildElements(
      [...note.childNodes],
      task
    );
    return task;
  }

  static #rgb2hex(backgroundColor) {
    if (/^#[0-9A-F]{6}$/i.test(backgroundColor)) {
      return backgroundColor;
    }
    const hex = (x) => ("0" + parseInt(x).toString(16)).slice(-2);

    const rgb = backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }

  static #getPropertiesFromNote(note, task) {
    for (const property in note.dataset) {
      if (property === "noteColor") {
        task[property] = this.#rgb2hex(note.style.backgroundColor);
      } else {
        task[property] = note.dataset[property];
      }
    }
  }

  static #getPropertiesFromNoteChildElements(elements, task) {
    elements.forEach((element) => {
      if (!element.dataset.field) return;
      const property = element.dataset.field;
      let value;
      if (property === "type") {
        value = element.dataset.value;
      } else if (property) {
        value = element.innerText;
      }
      task[property] = value;
    });
  }
}
