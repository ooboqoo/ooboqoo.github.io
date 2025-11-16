# TypeScript

https://www.typescriptlang.org/


## Everyday Types

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

### 类型注解

```ts
// 原始值 primitive
boolean  Boolean
number   Number
string   String
symbol   (Symbol 不支持 new)
bigint   (BigInt 不支持 new)

// strictNullChecks 选项会影响到 TS 行为，应开启以避免各种运行时错误
null
undefined

// void is only valid as a return type or generic type variable
function foo(): viod { /* 返回 undefined 或 null 都可以 */ }

any      // 任意值（逃逸检查），开启 noImplicitAny 可增加程序健壮性
unknown  // 任意值（保留检查），unknown 是 any 的收敛类型，unknown 是任何集合的超集
never    // 空值（empty，不可以赋值，any 都不行），never 是任何集合的子集

// 数组 Array
elemType[] 或 Array<elemType>

// 元组 Tuple - 表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x: [string, number];  // 越界元素采用联合类型
x = ['hello', 10];  // OK
x = [10, 'hello'];  // Error

// 枚举 Enum - 可以方便地将名称与数值(下标)建立联系。这个跟其他类型不一样，是会影响到 runtime 的
enum Color {Red, Green, Blue};  // ['enəm]
enum Color {Red = 1, Green=128, Blue};
console.log(Color.Green);  // 128
// https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
console.log(Color[128]);   // Green，必须是下标（数字）才能取到 Key

// Node.js + Enum  https://nodejs.org/api/typescript.html
// https://www.typescriptlang.org/docs/handbook/enums.html#const-enums
const enum Direction {Up, Down, Left, Right};
let directions = [Direction.Up];  // 编译后输出 `let directions = [0 /* Direction.Up */]`
// https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums
// In modern TypeScript, you may not need an enum when an object with `as const` could suffice
```

```ts
// unknown 是 any 的收敛类型
const a: number = 1 as any;     // OK
const b: number = 1 as unknown; // Error: Type 'unknown' is not assignable to type 'number'.

// never 的用法
type T = { a: boolean; b?: never } | { a?: never; b: boolean }  // a 和 b 互斥
```

### 类型断言 Type assertions

```ts
// 非空断言 `!`
function foo(bar: string | undefined | null) {
  const a: string = bar!;  // 如果没有尾巴上的 `!` 就会报错
}

// 确定赋值断言 `!`
let x: number;
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

Parameters<FunctionType>           从函数类型中获取参数类型（一个 Tuple 类型）
ConstructorParameters<Type>        获取构造函数的参数类型信息
ReturnType<Type>
InstanceType<Type>

ThisParameterType<Type>            如果函数有参数 this 那么获取其类型，否则为 unknown
OmitThisParameter<Type>
ThisType<Type>

Awaited<Type>
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

类相关的一些生疏写法

```ts
interface JSONResponse extends Response, HTTPAble {
  // These are two ways to describe a property which is a function
  update: (retryTimes: number) => void;
  update(retryTimes: number): void;

  // You can call this object via `()` - functions in JS are objects which can be called
  (): JSONResponse

  // You can use `new` on the object this interface describes
  new(s: string): JSONResponse;
}
```

接口扩展

```ts
// Interfaces are merged, so multiple declarations will add new fields to the type definition.
// 表述2 Interfaces can be extended by declaring it multiple times
interface APICall { data: Response }
interface APICall { error?: Error }
```

重载

```ts
// 定义「使用方式」 1
function makeDate(timestamp: number): Date;
// 定义「使用方式」 2
function makeDate(m: number, d: number, y: number): Date;
// 具体「代码实现」，要能 cover 住上面定义的几种使用方式
// 注意，看这里的实现，视乎可以只传2个参数，但实际不是可以的，因为这里只负责实现，怎么用不看这里，要看上面的定义
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
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

## 类 Class

```ts
class User extends Account implements Updatable, Serializable {
  id: string                      // A field
  displayName?: boolean           // An optional field
  name!: string                   // A 'trust me, it's there' field
  #attributes: Map<any, any>      // A private field
  roles = ['user']                // A field with a default
  readonly createdAt = new Date() // A readonly field with a default

  // The code called on 'new'
  constructor(id: string, email: string) {
    super(id)
    // ... more code
  }

  // Ways to describe class methods (and arrow function fields)
  setName(name: string) { this.name = name }
  verifyName = (name: string) => { /* ... */ }

  // A function with 2 overload definitions
  sync(): Promise<{ result: string }>
  sync(cb: (result: string) => void): void
  sync(cb?: (result: string) => void): void | Promise<{ result: string }> {
    // Implementation
  }

  // Getters and setters
  get accountID() { return this.id }
  set accountID(value: string) { this.id = value }

  // Private access is just to this class, protected allows to subclasses. Only used for type checking, public is the default.
  private makeRequest() { }
  protected handleRequest() { }

  // Static fields / methods
  static #userCount = 0
  static registerUser(user: User) { /* ... */ }

  // Static blocks for setting up static vars. 'this' refers to the static class
  static { this.#userCount = -1 }
}

// Type definitions needed for the class
class Account {
  id: string
  constructor(id: string) {
    this.id = id
  }
}

interface Updatable {
  sync(): Promise<any>
}

interface Serializable {
  // Interface for serialization
}
```

以下特性是 TypeScript 自己加的，JavScript 应该不会引入这些特性。

### Parameter Properties

```ts
class Location {
  // automatically set an instance field to the input parameter
  constructor(public x: number, public y: number) {}
}
const loc = new Location(20, 40);
```

### Abstract Classes

```ts
abstract class Animal {
  abstract getName(): string;
  printName() {
    console.log('Hello, ' + this.getName());
  }
}
class Dog extends Animal {
  getName(): string {
    // ...
  }
}
```

### Decorators and Attributes







## Type Manipulation 类型运算

https://www.typescriptlang.org/docs/handbook/2/types-from-types.html

这里的很多高级用法只在开发 lib 时才会用到，日常应用开发很少用到。

These features are great for building libraries, describing existing JavaScript code and you may find you rarely reach for them in mostly TypeScript applications.

### Generics 泛型

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

// 泛型约束
function <T extends Array>(arr: T): T{
  // ...
}

// 泛型接口
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}

// 泛型类
class GenericNumber<NumberType> {
  zeroValue: NumberType;
  add: (x: NumberType, y: NumberType) => NumberType;
}
let num = new GenericNumber<string>();

// 泛型参数的默认值
function createArray<T = string>(length: number, value: T): Array<T> {
  // ...
}
```

### Conditional Types 条件类型 `extends`

https://www.typescriptlang.org/docs/handbook/2/conditional-types.html

一种由条件表达式所决定的类型，表现形式为 `T extends U ? X : Y`, 即如果类型 T 可以被赋值给类型 U，那么结果类型就是 X，否则为 Y。

If the type `T` is assignable to the type `U`, select the type `X`; otherwise, select the type `Y`.

条件类型使类型具有了不唯一性，增加了语言的灵活性，

```ts
// 示例1
// Exclude null and undefined from T
type NonNullable<T> = T extends null | undefined ? never : T;

// 示例1
interface IdLabel { id: number; }
interface NameLabel { name: string; }
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw 'unimplemented';
}

// 示例2
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never;

// 示例3
type NonNullable<T> = T extends null | undefined ? never : T;
```

#### Type Inference in Conditional Types `infer`

Another useful feature that conditional types support is inferring type variables using the `infer` keyword. Within the extends clause of a conditional type, you can use the `infer` keyword to infer a type variable, effectively performing pattern matching on types.

Note, that `infer` is always used within the `extends` clause of a conditional type.

```ts
// 这里存在两个泛型 Type 和 Item
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```
Note that the inferred type variables (in this case, `Item`) can only be used in the true branch of the conditional type.

许多内置工具类型都是基于 `infer` 实现的。

```ts
type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;
```

`infer` + `typeof` 用来取三方库的未导出类型非常方便。

```ts
function print(foo: { bar: string }) {
  console.log(foo.bar)
}
type Foo = Parameters<typeof print>[0]  // type Foo = { bar: string }
```

### Mapped Types 映射类型

通过遍历已有的类型来生成新的类型。

```ts
// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}

type MaybeUser = { id: string; name?: string; age?: number }

type User = Concrete<MaybeUser>
// type User = { id: string; name: string; age: number }
```



### Template Literal Types

A template string can be used t combine and manipulate text inside the type system.

```ts
type SupportedLangs = 'en' | 'pt' | 'zh'
type FooterLocaleIDs = 'header' | 'footer'
type AllLocaleIDs = `${SupportedLangs}_${FooterLocaleIDs}_id`
// "en_header_id" | "en_footer_id" | "pt_header_id" | "pt_footer_id" | "zh_header_id" | "zh_footer_id"
```



