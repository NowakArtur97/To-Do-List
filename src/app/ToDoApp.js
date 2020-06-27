import FormUtil from "./js/util/FormUtil";
import RandomUtil from "./js/util/RandomUtil";

import TaskService from "./js/service/TaskService";
import NoteService from "./js/service/NoteService";
import LocalStorageService from "./js/service/LocalStorageService";

import NotePopUp from "./js/model/NotePopUp";

import ObserverManager from "./js/observer/ObserverManager";

export default function main() {
  const observerManager = new ObserverManager("create");

  const formUtil = new FormUtil();
  const randomUtil = new RandomUtil();

  const localStorageService = new LocalStorageService();
  const taskService = new TaskService(localStorageService);
  const noteService = new NoteService(randomUtil);

  const tasks = taskService.getAll();
  noteService.createAll(tasks);

  observerManager.subscribe("create", taskService);
  observerManager.subscribe("create", noteService);

  const notePopUp = new NotePopUp(formUtil, taskService, noteService);
}
