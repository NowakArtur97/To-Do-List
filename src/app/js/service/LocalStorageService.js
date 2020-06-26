export default class LocalStorageService {
  constructor() {}

  save(name, item) {
    if (name && item) {
      localStorage.setItem(name, JSON.stringify(item));
    }
  }

  get(name) {
    if (name) {
      return JSON.parse(localStorage.getItem(name));
    }
  }
}
