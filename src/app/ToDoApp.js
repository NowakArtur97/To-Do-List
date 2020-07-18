import TaskService from "./js/service/TaskService";
import NoteService from "./js/service/NoteService";
import LocalStorageService from "./js/service/LocalStorageService";
import NoteFilterService from "./js/service/NoteFilterService";

import CorkBoard from "./js/model/CorkBoard";
import NotePopUp from "./js/model/NotePopUp";
import NoteForm from "./js/model/NoteForm";
import NoteCleaner from "./js/model/NoteCleaner";
import NoteSearch from "./js/model/NoteSearch";
import Loader from "./js/model/Loader";

export default function main() {
  const localStorageService = new LocalStorageService();
  const taskService = new TaskService(localStorageService);
  const noteService = new NoteService();
  const noteFilterService = new NoteFilterService(taskService, noteService);

  const tasks = taskService.getAll();
  noteService.createAll(tasks);

  const noteCleaner = new NoteCleaner();
  const noteSearch = new NoteSearch(noteFilterService);
  const notePopUp = new NotePopUp();
  const noteForm = new NoteForm(taskService, noteService);

  const corkBoard = new CorkBoard(notePopUp, noteForm, noteFilterService);

  noteForm.events.subscribe("create", noteService);
  noteForm.events.subscribe("create", taskService);

  corkBoard.events.subscribe("delete", noteService);
  corkBoard.events.subscribe("delete", taskService);

  corkBoard.events.subscribe("changeStatus", noteService);
  corkBoard.events.subscribe("changeStatus", taskService);

  noteForm.events.subscribe("update", noteService);
  noteForm.events.subscribe("update", taskService);

  noteCleaner.events.subscribe("deleteAll", noteService);
  noteCleaner.events.subscribe("deleteAll", taskService);

  const loader = new Loader();
  loader.init();
}
