import Note from "../model/Note";

export default class TaskService {
  constructor(formUtil) {
    this.formUtil = formUtil;
  }

  create(form) {
    const task = this.formUtil.extractData(form);
    const note = new Note(task);
  }
}
