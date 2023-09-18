// 1. Create an enum that would fit as argument for the given function:
enum AnimalType {
  Dog,
  Cat,
  Bird,
  Duck
}

function makeAnimalSound(type: AnimalType) {
	switch (type) {
		case 0:
			console.log('Woof!');
			break;
		case 1:
			console.log('Meow!');
			break;
		case 2:
			console.log('Chirp!');
			break;
		case 3:
			console.log('Blub!');
			break;
		default:
			console.log('Unknown animal type');
			break;
	}
}

// 2. Add a type that would cover the structure of the given object:
type Pet = {
  type: AnimalType;
  name: string;
  age: number;
};

function getPetDescription(pet: Pet): string {
	const animal = AnimalType[pet.type];
	return `${pet.name} is a ${animal.toLowerCase()} that is ${pet.age} years old.`;
}

const myPet = {
	name: 'Fluffy',
	age: 5,
	type: AnimalType.Cat,
};

console.log(getPetDescription(myPet));

// 3. Add an interface that would cover the structure of the given object(reuse the type from the previous task):

type Owner = {
  pets: Pet[];
  name: string;
  age: number;
};

function getPetOwnerDescription(owner: Owner): string {
	const pets = owner.pets.map((pet: Pet) => {
		const animal = AnimalType[pet.type];
		return `${pet.name} the ${animal.toLowerCase()}`;
	});
	return `${owner.name} is ${owner.age} years old and has ${pets.length} pets: ${pets.join(', ')}.`;
}

const myPetOwner = {
	name: 'John Doe',
	age: 30,
	pets: [
		{
			name: 'Fluffy',
			age: 5,
			type: AnimalType.Cat,
		},
		{
			name: 'Spot',
			age: 3,
			type: AnimalType.Dog,
		},
	],
};

console.log(getPetOwnerDescription(myPetOwner));

// 4. Create a generic function that would make the following code compile:
const myPets = [
	{ name: 'Max', age: 3, type: AnimalType.Dog },
	{ name: 'Fluffy', age: 1, type: AnimalType.Cat },
	{ name: 'Tweety', age: 2, type: AnimalType.Bird },
];

// or we can extend a type which only has a name property?
function mapPetNames<T extends Pet>(pets: T[]): string[] {
  return pets.map((pet: Pet) => pet.name)
}

const petNames = mapPetNames(myPets);
console.log(petNames); // ['Max', 'Fluffy', 'Tweety']
/* ******************************************************************************************************************************** */
function print<T>(arg: T): void {
	console.log(arg);
}

print('hello');
print(42);
print(true);
/* ******************************************************************************************************************************** */
function firstElement<T>(arr: T[]): T {
	return arr[0];
}

const numbers = [1, 2, 3, 4, 5];
const firstNumber = firstElement(numbers); // firstNumber is of type number

const strings = ['apple', 'banana', 'orange'];
const firstString = firstElement(strings); // firstString is of type string
/* ******************************************************************************************************************************** */
let pair1 = { first: 'one', second: 1 };
let pair2 = { first: () => {}, second: [] };
let pair3 = { first: true, second: { x: 1 } };

// 5. Create a decorator '@log' that would print given message:
function log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  console.log(descriptor)
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${methodName} with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result: ${result}`);
    return result;
  };

  return descriptor;
}
class MyClass {
	@log
	myMethod(arg1: number, arg2: number) {
		return arg1 + arg2;
	}
}

const myObj = new MyClass();
myObj.myMethod(2, 3);
// Result:
// Calling myMethod with arguments: [2, 3]
// Result: 5

// 6. Create a mixin that will add the ability to play, pause, and stop a video, as well as to show its duration and current playback time.
/*
  -Create a TypeScript mixin named Playable that will add the functionality to a video class:
    -duration
    -currentTime
    -play()
    -pause()
    -stop()
    -getDuration()
    -getCurrentTime()
  -Create instances of each video class and test their Playable functionality by calling the methods and displaying their properties.
  */

type Constructor = new (...args: any[]) => {};
function Playable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    public duration: number = 0;
    public currentTime: number = 0;
    public isPlaying: boolean = false;

    play(): void {
      this.isPlaying = true;
      this.setDuration(1);
      this.setCurrentTime(1);
      console.log('playing...')
    }
    pause(): void {
      this.isPlaying = false;
      this.setDuration(1);
      this.setCurrentTime(1);
      console.log('paused')
    }
    stop(): void {
      this.isPlaying = false;
      this.currentTime = 0;
      console.log('stopped')
    }
    getDuration(): number {
      return this.duration;
    }
    setDuration(time: number): void {
      this.duration += time;
    }
    getCurrentTime(): number {
      return this.currentTime;
    }
    setCurrentTime(time: number): void {
      this.currentTime += time;
    }
  }

}
class RegularVideo {
	constructor(public title: string, public url: string) {
		this.title = title;
		this.url = url;
	}
}

class PremiumVideo {
	constructor(public title: string, public url: string) {
		this.title = title;
		this.url = url;
	}
}

class LiveVideo {
	constructor(public title: string, public url: string) {
		this.title = title;
		this.url = url;
	}
}

const PlayableRegularVid = Playable(RegularVideo)
const PlayablePremiumVid = Playable(PremiumVideo)
const PlayableLiveVid = Playable(LiveVideo)

const regVid = new PlayableRegularVid('reg1', 'reg1URL');
regVid.play();
console.log(regVid.getCurrentTime());
regVid.stop();
console.log(regVid.getCurrentTime());
const premVid = new PlayablePremiumVid('prem1', 'prem1URL');
premVid.play();
console.log(premVid.getDuration());
premVid.pause();
premVid.play();
console.log(premVid.getCurrentTime());
premVid.stop();
const liveVid = new PlayableLiveVid('live1', 'live1URL');
console.log(liveVid.getDuration());
liveVid.play();
liveVid.pause();
liveVid.play();
console.log(liveVid.getDuration())
console.log(liveVid.getCurrentTime())
liveVid.stop();
console.log(liveVid.getDuration())
console.log(liveVid.getCurrentTime())


// 7. Apply typescript utility types to the given type:
/*
    -Create a new type from the given one
        -where all the properties are optional
        -where all the properties are required
        -where all the properties are readonly
        -with only properties specified: name, age, isStudent, hobbies
        -with the specified properties omited: job, phoneNumbers, birthday
        -union type where values are given type's keys
    -
  */
type MyType = {
	name: string,
	age: number,
	isStudent: boolean,
	hobbies: string[],
	address: {
		street: string,
		city: string,
		country: string,
	},
	email?: string,
	job?: {
		title: string,
		company: string,
		salary: number,
	},
	phoneNumbers: Map<string, string>,
	birthday: Date,
};

type OptionalT = Partial<MyType>;
type RequiredT = Required<MyType>;
type ReadonlyT = Readonly<MyType>;
type onlySpecifiedT = Pick<MyType, 'name' | 'age' | 'isStudent' | 'hobbies'>;
type omitSpecifiedT = Omit<MyType, 'job' | 'phoneNumbers' | 'birthday'>;
type keysUnionT = keyof MyType;
