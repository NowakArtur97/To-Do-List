import FormUtil from "./js/util/FormUtil";
import TaskService from "./js/serivce/TaskService";

import DragAndDrop from "./js/logic/DragAndDrop";
import NotePopUp from "./js/model/NotePopUp";

export default function main() {
  const formUtil = new FormUtil();
  const taskService = new TaskService(formUtil);
  const notePopUp = new NotePopUp(taskService);

  const noteTest = new DragAndDrop(document.querySelector(".draggable"));
}
