# TypeScript

https://www.typescriptlang.org/


### 类型注解

```ts
// 布尔值 Boolean
boolean
// 数值 Number
number
// 字符串 String
string
// 符号 Symbol
symbol
// Null
null
// Undefined
undefined

// 任意值 Any
let notSure: any = 4;

// 空值 Void
function foo(): viod {}

// 数组 Array
elemType[] 或 Array<elemType>
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

// 元组 Tuple - 表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x: [string, number];  // 越界元素采用联合类型
x = ['hello', 10];  // OK
x = [10, 'hello'];  // Error

// 枚举 Enum - 可以方便地将名称与数值(下标)建立联系
enum Color {Red, Green, Blue};  // ['enəm]
enum Color {Red = 1, Green=128, Blue};
console.log(Color[128]);   // Green
console.log(Color.Green);  // 128
```

### 类型断言 Type assertions

```ts
// 非空断言 `!`
function foo(bar: string | undefined | null) {
  const a: string = bar!;  // 如果没有尾巴上的 `!` 就会报错
}

// 确定赋值断言 `!`
let x:number;
initializeX();
console.log(x);  // Error: Variable 'x' is used before being assigned.
console.log(x!); // OK


let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;    // 方式 1
let strLength: number = (someValue as string).length;  // 方式 2
```

### ES 新语法支持

```ts
// `?.` 可选链 Optional Chaining
obj?.prop
obj?.[expr]
arr?.[index]
func?.(args)

// `??` 空值合并
const foo = bar ?? 'default';

// `#xxx` 私有属性
class Person {
  #name: string;
  constructor(name: string) {
    this.#name = name;
  }
}
const gavin = new Person('gavin');
gavin.#name  // Error: Property '#name' is not assessible outside class 'Person'
```

### 工具类型

https://www.typescriptlang.org/docs/handbook/utility-types.html

```ts
Record<Keys, Type>

Partial<Type>
Required<Type>

Pick<Type, Keys>
Omit<Type, Keys>

Exclude<UnionType, ExcludedUnion>  从 Type 中去除符合 ExcludedUnion 的项目
Extract<UnionType, Union>          从 Type 中找出符合 Union 的项目

Readonly<Type>
NonNullable<Type>                  剔除 null 和 undefined

Parameters<FunctionType>           从函数类型中获取参数类型（一个元祖类型）
ConstructorParameters<Type>        获取构造函数的参数类型信息
ReturnType<Type>
InstanceType<Type>

ThisParameterType<Type>            如果函数有参数 this 那么获取其类型，否则为 unknown
OmitThisParameter<Type>
ThisType<Type>
```

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]: T[P];
};
```

```ts
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

```ts
// Exclude<Type, ExcludedUnion> 从 Type 中去除符合 ExcludedUnion 的项目
type T0 = Exclude<"a" | "b" | "c", "a" | "b">;
等同于： type T0 = "c"

// Extract<Type, Union> 从 Type 中找出符合 Union 的项目
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
等同于： type T0 = "a"

// Parameters<Type> 获取函数的参数类型信息
type T0 = Parameters<(name: string, age: number) => void>;
等同于： type T0 = [name: string, age: number]

// ConstructorParameters<Type> 获取构造函数的参数类型信息
type T4 = ConstructorParameters<Function>;
报错： Type 'Function' does not satisfy the constraint 'new (...args: any) => any'

// ReturnType
type T0 = ReturnType<() => string>;
等同于： T0 = string
```

### 高级类型

```ts
// 交叉类型（类型合并）Intersection Types `&`
interface X {
  a: string;
  b: string;
}
interface Y {
  b: number;
  c: number;
}
interface Z {
  a: string;
  b: never;  // string & number -> never
  c: number;
}
let x: X & Y = {} as Z;  // OK
```

```ts
// 联合类型 Union Types `|`
type EventNames = 'click' | 'scroll' | 'mousemove';
```

### 类型保护

```ts
// `in` 关键字

// `typeof` 关键字

// `instanceof` 关键字

// 自定义类型保护
function isNumber(x: any): x is number {
  return typeof x === 'number';
}
```

### 条件类型

一种由条件表达式所决定的类型，表现形式为 `T extends U ? X : Y`, 即如果类型 T 可以被赋值给类型 U，那么结果类型就是 X，否则为 Y。

条件类型使类型具有了不唯一性，增加了语言的灵活性，

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

### 泛型

* `T` Type 通常用作第一个类型变量名
* `K` Key 表示对象中的键类型
* `V` Value 表示对象中的值类型
* `E` Element 表示元素类型
* `U` 26个字母中位于 T 之后，常作为第二个类型变量名

```ts
// 类型变量名用 `<>` 包裹，参数变量名用 `()` 包裹
function identity <T, U>(value: T, message: U): T {
  // ...
}
```










