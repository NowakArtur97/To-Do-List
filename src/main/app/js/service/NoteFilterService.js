export default class NoteFilterService {
  #taskService;
  #noteService;
  constructor(taskService, noteService) {
    this.#taskService = taskService;
    this.#noteService = noteService;
  }

  filterTasks(value, property) {
    let tasks = value
      ? this.#taskService.filter(value, property)
      : this.#taskService.getAll();
    this.#noteService.deleteAll();
    this.#noteService.createAll(tasks);
  }
}
