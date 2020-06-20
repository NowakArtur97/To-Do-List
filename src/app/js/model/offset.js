export default class Offset {
  // x = 0;
  // y = 0;

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
