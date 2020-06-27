export default class TaskService {
  constructor(localStorageService) {
    this.localStorageService = localStorageService;

    this.tasks = localStorageService.get("tasks") || [];
  }

  create(task) {
    task.id = this.tasks.length > 0 ? this.tasks.length + 1 : 1;

    this.tasks.push(task);
    this.localStorageService.save("tasks", this.tasks);

    return task;
  }

  getAll() {
    return this.localStorageService.get("tasks") || [];
  }
}
