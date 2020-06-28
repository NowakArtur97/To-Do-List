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

  update(task) {
    const taskToUpdate = this.tasks.find(task.id === id);
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

  getNextIndex() {
    return this.tasks.length > 0 ? this.tasks.length + 1 : 1;
  }

  getTaskFromNote(note) {
    const task = {};
    task.id = note.dataset.id;

    note.childNodes.forEach((element) => {
      const property = element.dataset.field;
      if (property) {
        task[property] = element.innerText;
      }
    });

    return task;
  }
}
