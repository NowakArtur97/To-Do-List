import FormUtil from "./js/util/FormUtil";
import RandomUtil from "./js/util/RandomUtil";

import TaskService from "./js/service/TaskService";
import NoteService from "./js/service/NoteService";
import LocalStorageService from "./js/service/LocalStorageService";

import NotePopUp from "./js/model/NotePopUp";
import NoteForm from "./js/model/NoteForm";
import CorkBoard from "./js/model/CorkBoard";

export default function main() {
  const formUtil = new FormUtil();
  const randomUtil = new RandomUtil();

  const localStorageService = new LocalStorageService();
  const taskService = new TaskService(localStorageService);
  const noteService = new NoteService(randomUtil);

  const tasks = taskService.getAll();
  noteService.createAll(tasks);

  const notePopUp = new NotePopUp();
  const noteForm = new NoteForm(formUtil, taskService, noteService);
  const corkBoard = new CorkBoard();

  noteForm.events.subscribe("create", noteService);
  noteForm.events.subscribe("create", taskService);

  corkBoard.events.subscribe("delete", noteService);
  corkBoard.events.subscribe("delete", taskService);
}
