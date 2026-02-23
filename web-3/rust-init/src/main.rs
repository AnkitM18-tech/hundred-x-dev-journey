/* 
fn get_first_word(sentence: &String) -> String {
    let mut ans = String::new();
    for char in sentence.chars() {
        ans.push(char);
        if char == ' '{
            break;
        }
    }
    return ans;
}

fn update_string() {
    let mut s = String::from("Initial String");
    println!("Before update: {}", s);
    println!("Capacity: {}, Length: {}, Pointer: {:p}", s.capacity(), s.len(), s.as_ptr());
    
    s.push_str(" and some additional text");
    println!("After update: {}", s);
    println!("Capacity: {}, Length: {}, Pointer: {:p}", s.capacity(), s.len(), s.as_ptr());
}

fn get_str_length(s: &String) -> usize {
    return s.chars().count();
}

struct User {
    first_name: String,
    last_name: String,
    age: i8
}

struct Rect {
    width: u32,
    height: u32
}

impl Rect {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn perimeter(&self, num: u32) -> u32 {
        println!("Number: {}", num);
        2 * (self.width + self.height)
    }

    fn debug() -> i32 { // static function can be called by Rect::debug()
        return 1;
    }
}

enum Direction {
    North,
    South,
    East,
    West
}

enum Shape {
    Circle(f32),
    Rectangle(f32, f32),
    Square(f32)
}

fn calculate_area(shape: Shape) -> f32 {
    match shape {
        Shape::Circle(radius) => std::f32::consts::PI * radius * radius,
        Shape::Rectangle(width, height) => width * height,
        Shape::Square(side) => side * side
    }
}

fn move_around(direction: Direction) {
    match direction {
        Direction::North => println!("North"),
        Direction::South => println!("South"),
        Direction::East => println!("East"),
        Direction::West => println!("West")
    }
}

fn find_first_a(s: String) -> Option<i32> {
    for (i, char ) in s.chars().enumerate() {
        if char == 'a' {
            return Some(i as i32);
        }
    }
    return None;
}

use std::fs;

fn do_something(s: &mut String) {
    s.push_str(" Mars");
}

fn get_even_values(vec: &Vec<i32>) -> Vec<i32> {
    let mut ans = Vec::new();
    for i in vec {
        if i % 2 == 0 {
            ans.push(*i);
        }
    }
    return ans;
}

fn even_values(vec: &mut Vec<i32>) {
    let mut i = 0;
    while i < vec.len() {
        if vec[i] % 2 != 0 {
            vec.remove(i);
        } else {
            i += 1;
        }
    }
}

use::std::collections::HashMap;

fn group_value_by_keys(vec: Vec<(String, i32)>) -> HashMap<String, i32> {
    let mut map = HashMap::new();
    for (key, value) in vec {
        map.insert(key, value);
    }
    return map;
}

fn find_first_word(sentence: &String) -> &str {
    let mut index = 0;
    for char in sentence.chars() {
        if char == ' ' {
            break;
        }
        index += 1;
    }
    return &sentence[0..index];
}

fn largest<T: std::cmp::PartialOrd> (a: T, b: T) -> T {
    if a > b {
        a
    } else {
        b
    }
}

pub trait Summary {
    fn summarize(&self) -> String {
        return String::from("Default Implementation for Summary!");
    }
}

pub trait Fault {
    fn fault(&self) -> String {
        return String::from("Default Implementation Fault!");
    }
}

struct User {
    name: String,
    age: u32,
}

struct Fix;

impl Summary for Fix {}
impl Fault for Fix {}
impl Summary for String {}

impl Summary for User {
    fn summarize(&self) -> String {
        return format!("Name: {}, Age: {}", self.name, self.age);
    }
}

// syntactic sugar for trait bound
fn notify(u: &impl Summary) {
    println!("{}", u.summarize());
}

// syntax for trait bound
pub fn notify_t_bound<T: Summary>(u: &T) {
    println!("{}", u.summarize());
}

// multiple trait bound
pub fn notify_t_bound_fault<T: Summary+Fault>(u: &T) {
    println!("{}", u.fault());
}


*/

// fn main_retired() {

    // let user = User {
    //     name: String::from("Ankit"),
    //     age: 27
    // };

    // let f = Fix;

    // println!("{}", user.summarize());
    // notify(&f);
    // notify(&String::from("Hey!"));
    // notify_t_bound(&f);
    // notify_t_bound_fault(&f);

    // let bigger = largest(1, 2);
    // let bigger_char = largest('a', 'b');

    // println!("{} {}", bigger, bigger_char);

    // let word = String::from("Hello"); // String type
    // let word_again = &word; // has a 'view' into the original string / is a reference
    // let another_word = "Hello"; // literal is an &str but it points directly to an address in the binary

    // //! Slices can be applied to other collections like array or vectors.

    // println!("{}", word);
    // println!("{}", word_again);
    // println!("{}", another_word);

    // let str1 = String::from("Hello World!, I am sentinel taking over the world");
    // let first_word = find_first_word(&str1);
    // println!("{}", first_word);

    // let v1 = vec![1,2,3,4,5];
    // let v1_iter = v1.iter();

    // let iter = v1_iter.filter(|x| *x %2 == 1).map(|x| x*2);
    // let new_v1:Vec<i32> = iter.collect();

    // println!("{:?}", v1);

    // println!("{:?}", new_v1);

    //? Consuming Adapter - methods that call next are called consuming adapters, because calling them uses up the adapter - ownership moved to the method
    // let v1 = vec![1,2,3];
    // let v1_iter = v1.iter();
    // let total: i32 = v1_iter.sum();
    // assert_eq!(total, 6);
    // let sum2: i32 = v1_iter.sum();
    //? Borrowing Adapter - methods defined on the Iterator trait that don't consume the iterator, instead they produce different iterators by changing some aspect of the original iterator
    // let v1 = vec![1,2,3];
    // let iter = v1.iter();
    // // let iter2 = iter.map(|x| x + 1);
    // let iter3 = iter.filter(|x| *x % 2 == 0);
    // // for x in iter2 {
    // //     print!("{} ", x);
    // //     println!();
    // // }
    // println!("{:?}", v1);
    // for x in iter3 {
    //     print!("{}", x);
    //     println!();
    // }


    // ! iter - immutable references to the inner variables and don't want to transfer ownership
    // ! iter_mut - mutable references to the inner variables and don't want to transfer ownership
    // ! into_iter - move the variable into the iterator and don't want to use it afterwards
    // ! the for syntax when applied directly on the collection uses into_iter under the hood

    // let mut v1 = vec![1,2,3];
    // let v2 = vec![4,5,6];
    // let mut v1_iter = v1.iter_mut();

    // let v2_iter = v2.iter();

    // // for val in v1_iter {
    // //     *val = *val + 1;
    // // }

    // while let Some(val) = v1_iter.next() {
    //     println!("{}", val);
    // }

    // for val in v2_iter {
    //     println!("{}", val);
    // }

    // println!("{:?}", v1);
    // println!("{:?}", v2);

    // let input_vect: Vec<(String, i32)> = vec![(String::from("harkirat"), 32), (String::from("preet"), 27)];
    // let map = group_value_by_keys(input_vect);
    // println!("{:?}", map);

    // let mut users: HashMap<String, u32> = HashMap::new();
    // users.insert(String::from("John"), 28);
    // users.insert(String::from("Preet"), 27);
    // println!("{:?}", users);
    // println!("{}", users["John"]);

    // let second = users.get("Geet");
    // match second {
    //     Some(val) => println!("{}", val),
    //     None => println!("Does not exist")
    // }


    // let numbers = vec![1,2,3];
    // for number in numbers {
    //     println!("{}", number);
    // }

    // let mut vec = Vec::new();
    // vec.push(1);
    // vec.push(2);
    // vec.push(3);

    // let ans = get_even_values(&vec);
    // println!("{:?}", vec);

    // even_values(&mut vec);

    // println!("{:?}", ans);
    // println!("{:?}", vec);

    // At a given time, we can have either one mutable reference or any number of immutable references.
    // let mut s = String::from("Hello");
    // println!("{}", s);
    // let s2 = &mut s;
    // let s3 = &s;
    // // do_something(&mut s);
    // println!("{}, {}, {}", s, s2, s3);

    // let greeting_file_result = fs::read_to_string("hello.txt");
    // match greeting_file_result {
    //     Ok(greeting) => println!("{}", greeting),
    //     Err(error) => println!("Error: {}", error)
    // }


    // let index = find_first_a(String::from("preet"));
    // match index {
    //     Some(i) => println!("Index: {}", i),
    //     None => println!("Not found")
    // }

    // let north_direction = Direction::North;
    // let south_direction = Direction::South;
    // let east_direction = Direction::East;
    // let west_direction = Direction::West;
    // move_around(north_direction);
    // move_around(south_direction);
    // move_around(east_direction);
    // move_around(west_direction);
    // let circle = Shape::Circle(5.0);
    // let rectangle = Shape::Rectangle(5.0, 10.0);
    // let square = Shape::Square(5.0);
    // println!("Circle area: {}", calculate_area(circle));
    // println!("Rectangle area: {}", calculate_area(rectangle));
    // println!("Square area: {}", calculate_area(square));

    // let is_even = true;

    // if is_even {
    //     println!("This number is even!");
    // } else if !is_even {
    //     println!("This number is odd!");
    // }

    // for i in 0..10 {
    //     print!("{} ", i);
    // }

    // let sentence = String::from("Hello I am from Mars!");
    // let first_word = get_first_word(&sentence);

    // println!("The first word is, {}", first_word);

    // update_string();

    // let len = get_str_length(&sentence);
    // println!("The length of the string is {}", len);
    // println!("{}", sentence);

    // let user = User {
    //     first_name: String::from("John"),
    //     last_name: String::from("Doe"),
    //     age: 32
    // };

    // println!("User {} {} is {} years old", user.first_name, user.last_name, user.age);

    // let rect = Rect {width: 32, height: 32};
    // println!("The area of the rectangle is {}", rect.area());
// }

//? lifetime of the result is the intersection of the lifetimes of the inputs (shorter lifetime) - 'a is the generic lifetime parameter
// fn longer_string<'a>(first: &'a str, second: &'a str) -> &'a str {
//     if first.len() > second.len() {
//         return first;
//     } else {
//         return second;
//     }
// }

// Structs with lifetimes => to specify the lifetime of the struct (how long the struct will live)
// struct User <'a, 'b> {
//     name: &'a str,
//     age: &'b u32
// }

// Generic Type parameters , Trait Bounds and Lifetimes together
// use std::fmt::Display;

// fn longest_with_an_announcement<'a, T>(first: &'a str, second: &'a str, ann: T) -> &'a str where T: Display {
//     println!("Announcement: {ann}");
//     if first.len() > second.len() {
//         return first;
//     } else {
//         return second;
//     }
// }

// use std::sync::mpsc; // multiple producer, single consumer
// use std::thread;
// use std::time::Duration;

// Declarative Macro
// macro_rules! eval {
//     ($expr: expr) => {
//         $expr
//     };
// }

// #[derive(Debug)] // Debug is a custom derived procedural macro
// struct User {
//     name: String,
//     age: u32
// }

// #[post("/user/")] // attribute like macro
// fn create_user() {
    // sqlx::query("INSERT INTO users (name, age) VALUES ($1, $2)") // function like procedural macro
        // .bind("John")
        // .bind(32)
        // .execute()
        // .unwrap();
// }

use std::fmt::Error;

trait Serialize {
    fn serialize(&self) ->Vec<u8>;
}

trait Deserialize: Sized {
    fn deserialize(base: &[u8]) -> Result<Self, Error>;
}

#[derive(Debug)]
struct Swap {
    qty_1: u32,
    qty_2: u32
}

impl Serialize for Swap {
    fn serialize(&self) ->Vec<u8> {
        let mut v = vec![];
        v.extend_from_slice(&self.qty_1.to_be_bytes());
        v.extend_from_slice(&self.qty_2.to_be_bytes());
        return v;
    }
}

impl Deserialize for Swap {
    fn deserialize(base: &[u8]) -> Result<Self, Error> {
        if base.len() < 8 {
            return Err(Error);
        }
        let qty_1 = u32::from_be_bytes(base[0..4].try_into().unwrap());
        let qty_2 = u32::from_be_bytes(base[4..8].try_into().unwrap());
        Ok(Swap { qty_1, qty_2 })
    }
}

fn main() {

    
    let s = Swap {
        qty_1: 10,
        qty_2: 20
    };
    let v = s.serialize();
    println!("{:?}", v);
    let s2 = Swap::deserialize(&v).unwrap();
    println!("{:?}", s2);
    // let ans = eval!(2 + 3 * 5);
    // println!("Answer: {}", ans);
    // println!("Hello from the other side!"); // declarative macro

    // let (tx, rx) = mpsc::channel();
    // for i in 0..10 {
    //     let producer = tx.clone();
    //     thread::spawn(move || {
    //         let mut ans: u64 = 0;
    //         for j in 0..10000000 {
    //             ans = ans + (i * 10000000 + j);
    //         }
    //         producer.send(ans).unwrap();
    //     });
    // }
    // the original tx never dropped, so the receiver for loop keeps on waiting for data from it, so we need to drop it explicitly
    // drop(tx);

    // let mut ans = 0;
    // for val in rx {
    //     ans = ans + val;
    // }
    // println!("Answer: {}", ans);

    // message passing - sharing data between threads
    // channels - 1 transmitter - sends and 1 receiver - receives
    // A channel is said to be closed if either the transmitter or the receiver is dropped
    // let (tx, rx) = mpsc::channel();
    // thread::spawn(move || {
    //     let val = String::from("Hi World!");
    //     tx.send(val).unwrap();
    // });

    // using unwrap is discouraged
    // let receiver = rx.recv().unwrap();
    // println!("Got message: {}", receiver);

    // let x = 1;
    // {
    //     let v = vec![1,2,3];
    //     thread::spawn(move || {
    //         println!("v: {v :?}");
    //     });
    //    // println!("v: {:?}", v); - can't use it later because it has been moved to the spawned thread
    // }
    // println!("x: {}", x);

    // let handle = thread::spawn(|| {
    //     for i in 0..10 {
    //         println!("Hi number {i} from spawned thread!");
    //         thread::sleep(Duration::from_millis(10));
    //     }
    // });

    // awaiting the thread to finish before running the iteration on the main thread
    // handle.join().unwrap();

    // for i in 0..5 {
    //     println!("Hi number {i} from main thread!");
    //     thread::sleep(Duration::from_millis(10));
    // }


    // let first = String::from("Hello");
    // let second = String::from("World");
    // let ann = String::from("Announcement");
    // let result = longest_with_an_announcement(&first, &second, ann);
    // println!("{}", result);


    // let user: User<'_, '_>;
    // let age = 27;
    // {
    //     let name=String::from("Ankit");
    //     user = User {
    //         name: &name,
    //         age: &age
    //     };
    //     println!("{} is {} years old!",user.name, user.age);
    // }

    // let longest_str;
    // let str1 = String::from("small");
    // {
    //     let str2 = String::from("Longer");
    //     longest_str = longer_string(&str1, &str2);
    //     println!("{}", longest_str);
    // }
}