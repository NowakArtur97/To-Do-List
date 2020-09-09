import CorkBoard from './js/model/CorkBoard';
import Loader from './js/model/Loader';
import NoteCleaner from './js/model/NoteCleaner';
import NoteForm from './js/model/NoteForm';
import NotePopUp from './js/model/NotePopUp';
import NoteSearch from './js/model/NoteSearch';
import LocalStorageService from './js/service/LocalStorageService';
import NoteFilterService from './js/service/NoteFilterService';
import NoteService from './js/service/NoteService';
import TaskService from './js/service/TaskService';

export default function main() {
  const localStorageService = new LocalStorageService();
  const taskService = new TaskService(localStorageService);
  const noteService = new NoteService();
  const noteFilterService = new NoteFilterService(taskService, noteService);

  taskService.saveDummyData();
  const tasks = taskService.getAll();
  noteService.createAll(tasks);

  const noteCleaner = new NoteCleaner();
  const noteSearch = new NoteSearch(noteFilterService);
  const notePopUp = new NotePopUp();
  const noteForm = new NoteForm(taskService);

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
