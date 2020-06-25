import FormUtil from "./js/util/FormUtil";
import TaskService from "./js/service/TaskService";

import NotePopUp from "./js/model/NotePopUp";

export default function main() {
  const formUtil = new FormUtil();
  const taskService = new TaskService(formUtil);
  const notePopUp = new NotePopUp(taskService);
}
