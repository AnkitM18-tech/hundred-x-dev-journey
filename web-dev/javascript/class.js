class PromisifiedFunctions {
  constructor() {}

  setTimeoutPromisified(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  fetchPromisified(url) {
    return new Promise((resolve) => {
      fetch(url).then(resolve);
    });
  }

  setTimeoutSync(delay) {
    let start = new Date().getTime();
    while (1) {
      if (new Date().getTime() - start >= delay) {
        break;
      }
    }
  }

  readFilePromisified(file, encoding) {
    const fs = require("fs");
    return new Promise((resolve) => {
      fs.readFile(file, encoding, (err, data) => {
        resolve(data);
      });
    });
  }
}

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.area());

const fn = new PromisifiedFunctions();
fn.setTimeoutPromisified(5000).then(() => console.log("5 seconds have passed"));
fn.readFilePromisified("./file.txt", "utf-8").then((data) => console.log(data));
