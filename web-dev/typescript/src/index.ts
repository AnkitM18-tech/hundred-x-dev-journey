function greet(firstName: string) {
  console.log(`Hello, ${firstName}`);
}

greet("Hari");

function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(1, 7));

function isLegal(age: number): boolean {
  if (age >= 18) return true;
  else return false;
}

console.log(isLegal(10));

function delayedCall(fn: () => void) {
  setTimeout(() => fn, 1000);
}

delayedCall(() => console.log("Hello Delayed Call!"));

type StringOrNumber = string | number;

let x: StringOrNumber = 10;
let y: StringOrNumber = "asd";

let z = x + y;

// function sumHetero(x: StringOrNumber, y: StringOrNumber) : string {
//   return x + y;
// }

interface People {
  name: string;
  age: number;
  greet(): void;
  greet2: () => void;
}

class Person implements People {
  // name: string;
  // age: number;
  role: string; // can add extra fields, but bare minimum whatever there is present in the base interface

  constructor(public name: string, public age: number, role: string) {
    // this.name = name;
    // this.age = age;
    this.role = role;
  }

  greet() {
    return `Hello, ${this.name}`;
  }

  greet2() {
    return `Good Evening! ${this.name}`;
  }
}

const user = new Person("John", 65, "Team Lead");

class Shape {
  width: number;

  constructor(width: number) {
    this.width = width;
  }

  area() {
    console.log("Area");
  }
}

class Rectangle extends Shape {
  height: number;

  constructor(width: number, height: number) {
    super(width);
    this.height = height;
  }
}

abstract class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  abstract greet: () => string;

  hello() {
    console.log("Hajime Masite!");
  }
}
//! abstract class can have default implementations, but interface can't have default implementations

class Employee extends User {
  constructor(name: string) {
    super(name);
  }

  greet = () => {
    return "Hey I am greeting!";
  };

  greet2() {
    return "Hey this is greetings again!";
  }
}

type UserType = {
  name: string;
  age: number;
};

type AdminType = {
  name: string;
  department: string;
};

let OurUnionUser: UserType | AdminType;
let OurIntersectionUser: UserType & AdminType;

interface InputUser {
  name: string;
  age: number;
}

function filterUser(users: InputUser[]) {
  return users.filter((user) => user.age >= 18);
}
