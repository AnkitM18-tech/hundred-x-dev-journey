function setTimeoutPromisified(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// Promise class takes a function which has two arguments resolve (success) and reject (failure)
function fileReadAsync() {
  const fs = require("fs");
  return new Promise((resolve, reject) => {
    fs.readFile("filee.txt", "utf-8", (err, data) => {
      if (err) {
        reject("Error reading file");
      }
      resolve(data);
    });
  });
}

// Promise Chaining
setTimeoutPromisified(1000)
  .then(() => {
    console.log("Hi");
    return setTimeoutPromisified(3000);
  })
  .then(() => {
    console.log("Hello");
    return setTimeoutPromisified(5000);
  })
  .then(() => {
    console.log("Mama se mama sa ma makusa!");
  });

// Async Await - cleaner code and syntactic sugar on top of Promises
async function solve() {
  await setTimeoutPromisified(1000);
  console.log("Hi");
  await setTimeoutPromisified(3000);
  console.log("Hello");
  await setTimeoutPromisified(5000);
  console.log("Mama se mama sa ma makusa!");
}
solve();

// catching the error as well in the rejection scenario
fileReadAsync()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

//? Not all async operations return errors. e.g setTimeout and setInterval never fails, but there can be errors while reading a file or making a network request.
