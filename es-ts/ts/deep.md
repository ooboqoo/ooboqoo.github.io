# TypeScript

https://jkchao.github.io/typescript-book-chinese/


```ts
type Foo = 'a' | 'b';
type Bar = { [key: Foo]: string };  // xx unions can't be used in index signatures
type Bar = { [key in Foo]: string }; // OK
```

接口的可扩展性

```ts
// interface 的定义会合并，这样扩展定义会非常方便
// TypeScript 接口是开放式的，它允许你使用接口来模仿 JavaScript 的可扩展性
interface Play {
  a: string;
}
interface Play {
  b: string;
}
let p: Play = {
  a: 'a',
  b: 'b',
};

// 实战用法
interface Window {
  helloWorld(): void;
}
```

通过接口来确保实现的一致性

```ts
interface Point {
  x: number;
  y: number;
  z: number; // 1. 新增属性
}

class MyPoint implements Point {
             // 2. 编译报错 ERROR : missing member `z`
  x: number;
  y: number;
}
```

可被调用的

```ts
interface ReturnString {
  (): string;
}

declare const foo: ReturnString;
const bar = foo(); // bar 被推断为一个字符串。

// 函数重载
let overloaded: {
  (foo: string): string;
  (foo: number): number;
};

// 可实例化
interface CallMeWithNewToGetString {
  new (): string;
}
```

### 类型断言与类型转换

类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。

类型断言并不是那么安全，应该尽量少用。

### 类型保护

TypeScript 熟知 JavaScript 中 `instanceof` 和 `typeof` 运算符的用法。如果你在一个条件块中使用这些，TypeScript 将会推导出在条件块中的变量类型。

TypeScript 甚至能够理解 `esle`。当你使用 `if` 来缩小类型时，TypeScript 知道在其他块中的类型并不是 `if` 中的类型。

`in` 操作符可以安全的检查一个对象上是否存在一个属性，它通常也被作为类型保护使用。

#### 用户自定义类型保护

JavaScript 并没有内置非常丰富的、运行时的自我检查机制。TypeScript 中你可以创建用户自定义的类型保护函数，这仅仅是一个返回值类似于 `someArgumentName is SomeType` 的函数。

```ts
interface Foo {
  foo: number;
  common: string;
}
interface Bar {
  bar: number;
  common: string;
}

// 自定义类型保护
function isFoo(arg: Foo | Bar): arg is Foo {
  return (arg as Foo).foo !== undefined;
}

// 使用
function doStuff(arg: Foo | Bar) {
  if (isFoo(arg)) {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  } else {
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}
```

```js
"use strict";
// 自定义类型保护
function isFoo(arg) {
  return arg.foo !== undefined;
}
// 使用
function doStuff(arg) {
  if (isFoo(arg)) {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  }
  else {
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}
```

### 类型推断

TypeScript 能根据一些简单的规则推断(检查)变量的类型，你可以通过实践，很快的了解它们。


### 辨析联合类型

当类中含有字面量成员时，我们可以用该类的属性来辨析联合类型。

```ts
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

type Shape = Square | Rectangle;

function area(s: Shape) {
  if (s.kind === 'square') {
    // 现在 TypeScript 知道 s 的类型是 Square
    // 所以你现在能安全使用它
    return s.size * s.size;
  } else {
    // 不是一个 square ？因此 TypeScript 将会推算出 s 一定是 Rectangle
    return s.width * s.height;
  }
}
```

### 流动的类型

`typeof oneVar` `keyof OneType`

TS 的类型系统非常强大，它支持其他任何单一语言无法实现的类型流动和类型片段。这是因为 TS 的设计目的之一是让你无缝与像 JS 这样的高动态的语言一期工作。当你改变一个定义时，其他相关的会自动更新。

```ts
// 捕获变量类型
let foo = 123;
let bar: typeof foo;
bar = 'abc';  // Error
```

```ts
// 捕获类成员的类型
class Foo {
  foo: number;
}
declare let _foo: Foo;
let bar: typeof _foo.foo;
```

```ts
// 捕获键的名称
const colors = {
  red: 'red',
  blue: 'blue',
}
type Colors = keyof typeof colors;
let color: Colors; // color 的类型是 ‘red’ | 'blue'
```









































## TODO

https://github.com/Microsoft/TypeScript/issues/24220


### 理解 namespace

https://www.typescriptlang.org/docs/handbook/declaration-merging.html

Similarly to interfaces, namespaces of the same name will also merge their members. Since *namespaces create both a namespace and a value*, we need to understand how both merge.

You can also use namespaces to add more static members to an existing class.

```ts
namespace A {
  let foo = 'foo';
  export let bar = 'bar';
}
```

```js
"use strict";
var A;
(function (A) {
  let foo = "foo";
  A.bar = "bar";
})(A | (A = {}));
```

### 索引签名

#### TS 索引签名

当你传入一个其他对象至索引签名时，JavaScript 会在得到结果之前会先调用 `.toString` 方法。而在 TypeScript 中，为防止误用，强制用户必须明确调用 `.toString()`。

```ts
let obj = {
  toString() {
    console.log('toString called');
    return 'Hello';
  }
};

let foo: any = {};
foo[obj] = 'World'; // toString called    // JS 正常执行，但 TS 会报错
console.log(foo[obj]); // toString called, World
console.log(foo['Hello']); // World
```

#### 声明一个索引签名

索引签名的名称，如 `{ [index: string]: { message: string } }` 里的 `index` 除了可读性外，并没有任何意义，取一个好的名字有利于其他开发者理解你的代码。

#### 所有成员都必须符合字符串的索引签名

当你声明一个索引签名时，所有明确的成员都必须符合索引签名，这可以给你提供安全性，任何以字符串的访问都能得到相同结果。

```ts
// ok
interface Foo {
  [key: string]: number;
  x: number;
  y: number;
}

// Error
interface Bar {
  [key: string]: number;
  x: number;
  y: string; // Error: y 属性必须为 number 类型
}
```

#### 使用一组有限的字符串字面量

一个索引签名可以通过映射类型来使索引字符串为联合类型中的一员。这通常与 `keyof` `typeof` 一起使用，来获取变量的类型。

```ts
type Index = 'a' | 'b' | 'c';
type FromIndex = { [k in Index]?: number };
const foo: FromIndex = { b: 1, c: 2 };
```

#### 嵌套索引签名

```ts
// bad
interface NestedCSS {
  color?: string;
  [selector: string]: string | NestedCSS;
}
const failsSilently: NestedCSS = {
  colour: 'red' // 'colour' 不会被捕捉到错误
};

// good
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: NestedCSS;
  };
}
```


#### 索引签名中排除某些属性

此时可以使用交叉类型，但这样的弊端是，属性名称中的一些拼写错误可能不会被捕获，因此更推荐上面的 “嵌套索引签名” 设计模式。

```ts
type FieldState { value: string };
type FormState = { isValid: boolean } & { [fieldName: string]: FieldState };
```

### 混合

TypeScript、JavaScript 中的类只能严格的单继承。

```ts
// 添加属性的混合例子
function TimesTamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}
```


## JSX

* 使用文件后缀 `.tsx`
* _tsconfig.json_ 中 `compilerOptions` 里设置选项 `"jsx": "react"`
* 安装声明文件 `npm i -D @types/react @types/react-dom`





## Tips

柯里化：仅仅需要使用一系列箭头函数。

```ts
const add = (x: number) => (y: number) => x + y;
const add123 = add(123);
add123(456);
```

### 单例模式

```ts
class Singleton {
  private static instance: Singleton;
  private constructor() {
    // ...
  }
  public static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton;
    }
    return Singleton.instance;
  }
  // ...
}

let someThing = new Singleton();  // Error: constructor of 'Singleton' is private
```

### Reflect Metadata

在 Angular 2+ 的版本中，控制反转与依赖注入便是基于此实现，下面是一个简化版。


### 

```ts
interface Window {
  Slardar: typeof import('@slardar/sdk').default;
}
```











