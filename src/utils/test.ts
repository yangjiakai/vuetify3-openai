
// 基本类型声明 
let str: string = '123'

// 基本函数类型声明
function toString(num: number): string {
    return String(num)
}

// 基本函数类型声明2
const toString2 = (num: number): string => {
    return String(num)
}


console.log(toString(123));

const arr: readonly number[] = [1, 2, 3]

console.log(arr);


const write = (user: string = "admin", time: number = 5) => {

}

// type Color = {
//     r: string,
//     g: string,
//     b: string
// }


// const color = ({ r, g, b }: Color) => {
//     return `${r}${g}${b}`
// }


type VoiceConfig = {

    voiceStyle: string,

}

const voiceConfig: VoiceConfig = { voiceStyle: 'aaa' } as const

type Photo = {
    [property: string]: string | number

}


const photo: Photo = {
    photoName: '123',
    age: 123
}

const { photoName, age } = photo

const { photoName: string, age: number } = photo

interface Person {
    color: string,
}


interface User extends Person {

    name: string,
    age: number,
    read: () => void
}

const yjk: User = {
    name: 'yjk',
    age: 18,
    color: 'red',

    read: () => {
        console.log('read');
    }

}

class PersonClass implements Person {
    color: string

    constructor(color: string) {
        this.color = color
    }
}

type PointCopy1 = {
    [Key in keyof User]: User[Key];
};

const yjkCopy1: PointCopy1 = {
    name: 'yjk',
    age: 18,
    color: 'red',

    read: () => {
        console.log('read');
    }
}



class Point {
    x: number
    y: number
    _z: number = 5

    constructor(x: number, y: number) {
        this.x = 1
        this.y = 2
    }


    get z() {
        return this._z
    }

}

const point = new Point(1, 2)
point.x = 3
console.log(point.z);

class Singleton {
    private static instance?: Singleton;

    private constructor() {

    }

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

const s = Singleton.getInstance();

function identity<T>(arg: T): T {
    return arg;
}

const arg1 = identity<string>('myString');
const arg2 = identity<number>(123);
const arg3 = identity<boolean>(true);

function map<T, U>(arg: T[], func: (arg: T) => U): U[] {
    return arg.map(func);
}

map<string, number>(['1', '2', '3'], (item) => Number(item));


interface Box<T> {
    compare: (other: Box<T>) => number;
}

class NumberBox implements Box<number> {
    constructor(private value: number) { }

    compare(other: NumberBox): number {
        return this.value - other.value;
    }
}


const box1 = new NumberBox(1);
console.log(typeof box1.compare(new NumberBox(2)));


class Pair<T, U> {
    constructor(public first: T, public second: U) { }
}

enum Color {
    Red,     // 0
    Green,   // 1
    Blue     // 2
}


let c: Color = Color.Green;

console.log(c);


type Direction = 'North' | 'East' | 'South' | 'West';

enum DirectionEnum {
    North = 'North',
    East = 'East',
    South = 'South',
    West = 'West'
}

const direction: Direction = 'North'
const directionEnum: DirectionEnum = DirectionEnum.North


type MyPick<T, K extends keyof T> = {
    [key in K]: T[key]
}



interface Todo {
    title: string
    description: string
    completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

function getValue<T extends object, K extends keyof T>(o: T, key: K) {
    return o[key]
}


type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
}

type TupleToObject<T extends readonly any[]> = {
    [P in T[number]]: P
}


const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}