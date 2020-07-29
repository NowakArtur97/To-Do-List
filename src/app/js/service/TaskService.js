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

    switch (task.status) {
      case Status.ACTIVE:
        task.status = Status.INACTIVE;
        break;

      case Status.INACTIVE:
        task.status = Status.ACTIVE;
        break;
    }
    this.localStorageService.save("tasks", this.tasks);
  }

  delete({ dataset }) {
    const id = dataset.id;
    const taskToDelete = this.tasks.find((task) => task.id == id);

    if (taskToDelete) {
      const taskToDeleteIndex = this.tasks.indexOf(taskToDelete);
      this.tasks.splice(taskToDeleteIndex, 1);
    }

    this.localStorageService.save("tasks", this.tasks);
  }

  getAll() {
    return this.localStorageService.get("tasks") || [];
  }

  deleteAll() {
    this.localStorageService.remove("tasks");
    this.tasks.length = 0;
  }

  getNextAvailableIndex() {
    return this.tasks.length > 0 ? this.tasks.length + 1 : 1;
  }

  filter(value, property) {
    return this.tasks.filter((task) =>
      task[property].match(new RegExp(value, "gi"))
    );
  }

  saveDummyData() {
    if (this.localStorageService.get("tasks")) {
      return;
    }

    const exampleTask1 = {
      description: "double click to update note",
      id: 1,
      noteColor: "#5f80e3",
      pinColor: "radial-gradient(#aa8a59 50%, black 50%)",
      rotation: 12,
      status: "active",
      type: "handshake",
      xPosition: document.body.scrollWidth * 0.11,
      yPosition: document.body.scrollHeight * 0.1,
    };

    const exampleTask2 = {
      description: "click X to mark the task as inactive",
      id: 2,
      noteColor: "#2fd82c",
      pinColor: "radial-gradient(#724992 50%, black 50%)",
      rotation: -7,
      status: "active",
      type: "book",
      xPosition: document.body.scrollWidth * 0.5,
      yPosition: document.body.scrollHeight * 0.45,
    };

    const exampleTask3 = {
      description: "click ✓ to mark the task as active",
      id: 3,
      noteColor: "#ec93bb",
      pinColor: "radial-gradient(#31854e 50%, black 50%)",
      rotation: -17,
      status: "inactive",
      type: "birthday-cake",
      xPosition: document.body.scrollWidth * 0.14,
      yPosition: document.body.scrollHeight * 0.3,
    };

    const exampleTask4 = {
      description:
        "click the icon in the upper left corner to display only the notes with the same icon",
      id: 4,
      noteColor: "#e5e048",
      pinColor: "radial-gradient(#6060b9 50%, black 50%)",
      rotation: 15,
      status: "active",
      type: "shopping-cart",
      xPosition: document.body.scrollWidth * 0.17,
      yPosition: document.body.scrollHeight * 0.6,
    };

    const exampleTask5 = {
      description:
        "click on the red cross in the search form to cancel filtering",
      id: 5,
      noteColor: "#ed94ff",
      pinColor: "radial-gradient(#6060b9 50%, black 50%)",
      rotation: 15,
      status: "active",
      type: "shopping-cart",
      xPosition: document.body.scrollWidth * 0.45,
      yPosition: document.body.scrollHeight * 0.75,
    };

    this.tasks.push(
      exampleTask1,
      exampleTask2,
      exampleTask3,
      exampleTask4,
      exampleTask5
    );
    this.localStorageService.save("tasks", this.tasks);
  }
}
