const { setTimeoutPromisified } = require("./index.js");

// let us do date and time related operations
function dateTimeDemo() {
  const date = new Date();
  console.log(date.getDate());
}

// let us store key-value pairs in cleaner way
function mapDemo() {
  const map = new Map();
  map.set("name", "Ankit");
  map.set("profession", "Software Engineer");
  console.log(map.get("name"));
}

// let us store only unique values
function setDemo() {
  const set = new Set();
  set.add("name");
  set.add("name");
  set.add("profession");
  console.log(set.has("name"));
  console.log(set);
}

// Promise class gives you a promise that I will return you something in the future
// callback based approach
function callbackApproach() {
  const timeout = 2000;
  setTimeout(() => {
    console.log(`${timeout / 1000} seconds have passed`);
  }, timeout);
}

// promise based approach
/*
A promise in Javascript is an object that represents the eventual completion or failure of an asynchronous operation and it's resulting value. Promises are used to handle asynchronous operations more effectively than traditional callback functions, providing a cleaner and more manageable way to deal with asynchronous code,such as API calls, file I/O or timers.

The primary purpose of using a promise is to handle the asynchronous nature of operations without callback hell.
*/
// setTimeoutPromisified(5000).then(() => console.log("5 seconds have passed"));
function waitFor3s(resolve) {
  setTimeout(resolve, 3000);
}

function main() {
  console.log("Main is called!!");
}

function setTimeoutPromisified2() {
  return new Promise(waitFor3s);
}

//? when the promise is resolved, main is called => the Promise class takes a function as input and the first argument of that function is the resolve function and when the resolve function is called with the result, then whatever is passed to the .then method is executed.

setTimeoutPromisified2().then(main);

//! Whatever we pass to the new Promise() -> here waitFor3s, whatever the first argument passed to it(waitFor3s) (here resolve) -> whenever that resolve function is called, whatever that is passed to .then() is called and main is executed. The "eventual completion" criteria is something we have to define in the first argument of the new Promise().

//* In that first argument we get access to the resolve and reject function which we can use to resolve or reject the promise.

//! When we write a Promise, we provide the function that will do the asynchronous operation inside the new Promise(), and when the asynchronous operation is done, we resolve the promise with the result of the operation. => resolve(result/data) or reject(error) depending upon the criteria of the asynchronous operation. Then this "PromiseResult" is passed to the .then() method "callback" which gets executed using the result of the Promise.

class OwnPromise {
  constructor(fn) {
    fn(() => {
      this.resolve();
    });
  }
  then(callback) {
    this.resolve = callback;
  }
}

function setTimeoutPromisified3() {
  return new OwnPromise(waitFor3s);
}
setTimeoutPromisified3().then(main);
