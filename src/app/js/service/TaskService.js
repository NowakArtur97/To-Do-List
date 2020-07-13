import Status from "../state/Status";

export default class TaskService {
  constructor(localStorageService) {
    if (TaskService.instance instanceof TaskService) {
      return TaskService.instance;
    }

    this.localStorageService = localStorageService;

    this.tasks = localStorageService.get("tasks") || [];

    Object.freeze(this);

    TaskService.instance = this;
  }

  static getInstance() {
    return TaskService.instance;
  }

  create(task) {
    task.status = Status.ACTIVE;
    this.tasks.push(task);
    this.localStorageService.save("tasks", this.tasks);

    return task;
  }

  update(updatedTask) {
    let taskToUpdate = this.tasks.find((task) => task.id == updatedTask.id);
    for (let property in updatedTask) {
      taskToUpdate[property] = updatedTask[property];
    }

    this.localStorageService.save("tasks", this.tasks);
  }

  changeStatus(note) {
    let task = this.tasks.find((task) => task.id == note.dataset.id);
    task.status = Status.INACTIVE;
    this.localStorageService.save("tasks", this.tasks);
  }

  delete({ dataset }) {
    const id = dataset.id;
    const taskToDelete = this.tasks.filter((task) => task.id === id);
    const taskToDeleteIndex = this.tasks.indexOf(taskToDelete);
    this.tasks.splice(taskToDeleteIndex, 1);

    this.localStorageService.save("tasks", this.tasks);
  }

  getAll() {
    return this.localStorageService.get("tasks") || [];
  }

  deleteAll() {
    this.localStorageService.remove("tasks");
  }

  getNextAvailableIndex() {
    return this.tasks.length > 0 ? this.tasks.length + 1 : 1;
  }

  filter(toFind) {
    return this.tasks.filter((task) =>
      task.description.match(new RegExp(toFind, "gi"))
    );
  }
}
