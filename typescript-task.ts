// 1. Cover the following code with types

function addNumbers(a: number, b: number): number {
  return a + b;
}

function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

function findLargest(numbers: number[]): number {
  let largest: number = -Infinity;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }

  return largest;
}

interface LetterCount {
  [key: string]: number;
}
function getLetterCount(str: string): LetterCount {
  let letterCount: LetterCount = {};

  for (let i = 0; i < str.length; i++) {
    let letter = str[i].toLowerCase();
    if (letterCount[letter]) {
      letterCount[letter]++;
    } else {
      letterCount[letter] = 1;
    }
  }

  return letterCount;
}

const myNumber: number = 42;
const myString: string = 'Hello, TypeScript!';
const myBoolean: boolean = true;
const myArray: number[] = [1, 2, 3, 4, 5];
const myObject: {
  name: string;
  age: number;
} = {
  name: 'John Doe',
  age: 30,
};

let myAny: any = 42;
myAny = 'Hello, TypeScript!';
myAny = { name: 'Jane Doe', age: 25 };
/* ******************************************************************************************************************************** */

function linearSearch(array: number[], target: number): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
  return -1;
}

function binarySearch(array: number[], target: number): number {
  let left: number = 0;
  let right: number = array.length - 1;

  while (left <= right) {
    let mid: number = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
// export is a quick fix for Node duplicate indentifier
export {};
interface Node {
  value: number;
  children: Node[];
  addChild(node: Node): void;
}
class Node implements Node {
  value: number;
  children: Node[];

  constructor(value: number) {
    this.value = value;
    this.children = [];
  }

  addChild(node: Node) {
    this.children.push(node);
  }
}

function depthFirstSearch(root: Node, target: number): Node | null {
  let stack: Node[] = [root];

  while (stack.length > 0) {
    let node: Node = stack.pop()!;
    if (node.value === target) {
      return node;
    }
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }

  return null;
}

let root: Node = new Node(1);
let child1: Node = new Node(2);
let child2: Node = new Node(3);
let grandchild1: Node = new Node(4);
let grandchild2: Node = new Node(5);

// 2. Cover the following code with types. Each class should implement an interface
interface BurgerBuilder {
  burger: Burger;
  addPatty(type: string): BurgerBuilder;
  addCheese(type: string): BurgerBuilder;
  addSauce(type: string): BurgerBuilder;
  addToppings(toppings: string[]): BurgerBuilder;
  build(): Burger;
}
class BurgerBuilder implements BurgerBuilder {
  burger: Burger;
  constructor() {
    this.burger = {} as Burger;
  }

  addPatty(type: string): BurgerBuilder {
    this.burger.patty = type;
    return this;
  }

  addCheese(type: string): BurgerBuilder {
    this.burger.cheese = type;
    return this;
  }

  addSauce(type: string): BurgerBuilder {
    this.burger.sauce = type;
    return this;
  }

  addToppings(toppings: string[]): BurgerBuilder {
    this.burger.toppings = toppings;
    return this;
  }

  build(): Burger {
    return new Burger(this.burger);
  }
}

interface Burger {
  patty: string;
  cheese: string;
  sauce: string;
  toppings: string[];
  describe():  string;
}
class Burger implements Burger {
  patty: string;
  cheese: string;
  sauce: string;
  toppings: string[];

  constructor(burger: Burger) {
    this.patty = burger.patty;
    this.cheese = burger.cheese;
    this.sauce = burger.sauce;
    this.toppings = burger.toppings;
  }

  describe(): string {
    let description = `Burger with ${this.patty} patty, `;
    if (this.cheese) {
      description += `${this.cheese} cheese, `;
    }
    if (this.sauce) {
      description += `${this.sauce} sauce, `;
    }
    if (this.toppings) {
      description += `${this.toppings.join(', ')} toppings`;
    }
    return description;
  }
}

let burger = new BurgerBuilder()
  .addPatty('beef')
  .addCheese('cheddar')
  .addSauce('ketchup')
  .addToppings(['lettuce', 'tomato'])
  .build();
console.log(burger.describe());

/* ******************************************************************************************************************************** */
interface Person {
  name: string;
  age: number;
  introduce(): void;
  celebrateBirthday(): void;
}
class Person implements Person {
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old.`);
  }

  celebrateBirthday() {
    this.age++;
    console.log(
      `Happy birthday, ${this.name}! You are now ${this.age} years old.`
    );
  }
}
/* ******************************************************************************************************************************** */
interface OwnerI {
  firstName: string;
  lastName: string;
  DOB: Date;
  readonly id: string;
  address: string;
  readonly SSN: number;
}
class Owner implements OwnerI {
  firstName: string;
  lastName: string;
  DOB: Date;
  private readonly _id: string;
  address: string;
  private readonly _SSN: number;

  constructor(firstName: string, lastName: string, DOB: Date, id: string, address: string, SSN: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.DOB = DOB;
    this._id = id;
    this.address = address;
    this._SSN = SSN;
  }

  get id() {
    return this._id;
  }
  get SSN() {
    return this._SSN;
  }
}
interface BankAccountI {
  owner: Owner;
  balance: number;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}
class BankAccount implements BankAccountI {
  owner: Owner;
  private _balance: number;

  constructor(owner: Owner, balance: number) {
    this.owner = owner;
    this._balance = balance;
  }

  get balance() {
    return this._balance;
  }
  set balance(newBalance) {
    this._balance += newBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`${amount} deposited. Current balance is ${this.balance}.`);
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      console.log(`Insufficient funds. Current balance is ${this.balance}.`);
    } else {
      this.balance -= amount;
      console.log(`${amount} withdrawn. Current balance is ${this.balance}.`);
    }
  }
}
/* ******************************************************************************************************************************** */

interface RectangleI {
  width: number;
  height: number;
  get area(): number;
  get perimeter(): number;
}
class Rectangle implements RectangleI {
  constructor(public width: number, public height: number) {
    this.width = width;
    this.height = height;
  }

  get area(): number {
    return this.width * this.height;
  }

  get perimeter(): number {
    return 2 * (this.width + this.height);
  }
}
/* ******************************************************************************************************************************** */
enum Status {
  Todo,
  InProgress,
  Done
}
interface Task {
  title: string;
  description: string;
  dateCreated: Date;
  status: Status;
  id: string;
}
class Task implements Task {
  constructor(public title: string, public description: string, public dateCreated: Date, public status: Status, public id: string) {
    this.title = title;
    this.description = description;
    this.dateCreated = dateCreated;
    this.status = status
    this.id = id;
  }
}
interface TodoList {
  tasks: Task[]
}

class TodoList implements TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    console.log(`Task "${task.title}" added. Total tasks: ${this.tasks.length}.`);
  }

  removeTask(task: Task): void {
    let index = this.tasks.indexOf(task);
    if (index === -1) {
      console.log(`Task "${task.title}" not found.`);
    } else {
      this.tasks.splice(index, 1);
      console.log(`Task "${task.title}" removed. Total tasks: ${this.tasks.length}.`);
    }
  }
}
// /* ******************************************************************************************************************************** */

interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: string;
}
class Book implements Book{
  constructor(public id: string, title : string, public author: string, public publishedYear: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publishedYear = publishedYear;
  }
}
interface BookCollection {
  books: Book[];
  fetchData(): void;
}
class BookCollection implements BookCollection {
  constructor() {
    this.books = [];
  }

  async fetchData() {
    const response = await fetch('https://my-book-api.com/books');
    const data = await response.json();
    this.books = data.map(
      (book: Book) => new Book(book.id, book.title, book.author, book.publishedYear)
    );
  }

  logBooks(): void {
    console.log(this.books);
  }

  findBookById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  removeBookById(id: string): void {
    this.books = this.books.filter((book) => book.id !== id);
  }
}
