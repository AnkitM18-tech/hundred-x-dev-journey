class OwnPromise {
  constructor(fn) {
    this.resolve = [];
    fn(() => {
      this.resolve.forEach((f) => f());
    });
  }

  then(callback) {
    // if (!this.resolve) this.resolve = [];
    this.resolve.push(callback);
  }
}

function setTimeoutPromisified(delay) {
  return new OwnPromise((resolve) => {
    setTimeout(resolve, delay);
  });
}

setTimeoutPromisified(1000).then(() => {
  console.log("Hi, 1sec");
  setTimeoutPromisified(3000).then(() => {
    console.log("Hello, 3sec");
    setTimeoutPromisified(5000).then(() => {
      console.log("Mama se mama sa ma makusa! 5sec");
    });
  });
});
