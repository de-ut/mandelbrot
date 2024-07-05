class Complex {
  constructor(re, im) {
    this.re = re
    this.im = im
  }

  abs() {
    return this.re**2 + this.im**2
  }

  add(o) {
    this.re += o.re
    this.im += o.im
  }

  square() {
    const re = this.re**2 - this.im**2
    const im = 2 * this.re * this.im
    this.re = re
    this.im = im
    return this
  }
}