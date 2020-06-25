export default class TaskService {
  constructor(formUtil) {
    this.formUtil = formUtil;
  }

  create(form) {
    console.log(this.formUtil.extractData(form));
  }
}
