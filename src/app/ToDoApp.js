import FormUtil from "./js/util/FormUtil";
import RandomUtil from "./js/util/RandomUtil";
import TaskService from "./js/service/TaskService";
import NoteService from "./js/service/NoteService";

import DragAndDrop from "./js/logic/DragAndDrop";
import NotePopUp from "./js/model/NotePopUp";

export default function main() {
  const formUtil = new FormUtil();
  const randomUtil = new RandomUtil();

  const taskService = new TaskService(formUtil);
  const noteService = new NoteService(randomUtil);
  const notePopUp = new NotePopUp(taskService, noteService);

  const noteTest = new DragAndDrop(document.querySelector(".draggable"));
}
