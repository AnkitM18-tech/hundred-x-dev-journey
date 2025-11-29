// Promisified version of setTimeout
function setTimeoutPromisified(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// Promisified version of fetch
function fetchPromisified(url) {
  return new Promise((resolve) => {
    fetch(url).then(resolve);
  });
}

// Synchronous version of setTimeout
function setTimeoutSync(delay) {
  let start = new Date().getTime();
  while (1) {
    if (new Date().getTime() - start >= delay) {
      break;
    }
  }
}

// Promisified version of read file
function readFilePromisified(file, encoding) {
  const fs = require("fs");
  return new Promise((resolve) => {
    fs.readFile(file, encoding, (err, data) => {
      resolve(data);
    });
  });
}

if (require.main === module) {
  setTimeoutPromisified(5000).then(() => console.log("5 seconds have passed"));

  fetchPromisified("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => console.log(json));

  setTimeoutSync(5000);

  console.log("Hey there, checking the synchronous setTimeout");
  readFilePromisified("./file.txt", "utf-8").then((data) => console.log(data));
}

module.exports = { setTimeoutPromisified };
