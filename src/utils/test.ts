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
