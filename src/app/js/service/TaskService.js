export default class TaskService {
  constructor(formUtil, localStorageService) {
    this.formUtil = formUtil;
    this.localStorageService = localStorageService;

    this.tasks = localStorageService.get("tasks") || [];
  }

  create(form) {
    const task = this.formUtil.extractData(form);
    task.id = this.tasks.length > 0 ? this.tasks.length + 1 : 1;

    this.tasks.push(task);
    console.log(this.tasks);
    this.localStorageService.save("tasks", this.tasks);

    return task;
  }

  getAll() {
    return this.localStorageService.get("tasks") || [];
  }
}
