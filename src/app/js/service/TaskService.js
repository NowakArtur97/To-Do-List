import Note from "./NoteService";

export default class TaskService {
  constructor(formUtil) {
    this.formUtil = formUtil;
  }

  create(form) {
    const task = this.formUtil.extractData(form);

    return task;
  }
}
