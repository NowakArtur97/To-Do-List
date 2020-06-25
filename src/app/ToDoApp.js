import TaskService from "./js/serivce/TaskService";
import DragAndDrop from "./js/logic/DragAndDrop";
import NotePopUp from "./js/model/NotePopUp";

export default function main() {
  const taskService = new TaskService();
  console.log(taskService);
  const notePopUp = new NotePopUp(taskService);

  const noteTest = new DragAndDrop(document.querySelector(".draggable"));
}
