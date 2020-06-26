import FormUtil from "./js/util/FormUtil";
import RandomUtil from "./js/util/RandomUtil";
import TaskService from "./js/service/TaskService";
import NoteService from "./js/service/NoteService";
import LocalStorageService from "./js/service/LocalStorageService";

import NotePopUp from "./js/model/NotePopUp";

export default function main() {
  const formUtil = new FormUtil();
  const randomUtil = new RandomUtil();

  const localStorageService = new LocalStorageService();
  const taskService = new TaskService(formUtil, localStorageService);
  const noteService = new NoteService(randomUtil);
  const notePopUp = new NotePopUp(taskService, noteService);

  createDummyNotes(noteService);
}

function createDummyNotes(noteService) {
  noteService.create({
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, sed sit, architecto hic omnis consequuntur eligendi laudantium.",
  });
  noteService.create({
    description:
      "Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui",
  });
}
