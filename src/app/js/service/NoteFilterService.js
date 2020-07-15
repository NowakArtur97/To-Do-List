export default class NoteFilterService {
  constructor(taskService, noteService) {
    this.taskService = taskService;
    this.noteService = noteService;
  }

  filterTasks(value, property) {
    let tasks = [];
    if (value) {
      tasks = this.taskService.filter(value, property);
    } else {
      tasks = this.taskService.getAll();
    }
    this.noteService.deleteAll();
    this.noteService.createAll(tasks);
  }
}
