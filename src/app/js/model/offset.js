export default class Offset {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  x() {
    return this.x;
  }

  x(x) {
    this.x = x;
  }

  y() {
    return this.y;
  }

  y(y) {
    this.y = y;
  }
}
