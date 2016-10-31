# 接口

可以将接口看做是对对象的类型注释，规定实现该接口的对象必须拥有哪些属性（同时也不能出现没有的属性名，这跟一般的接口概念有点不一样）。

还有一点值得注意的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

### 可选属性

属性名字后面加一个 `?` 符号即表示该属性是可选的。可选属性的用处是可以对可能存在的属性进行预定义。

```ts
interface Config {
  color?: string;
  width?: number;
}

let config: Config = {colour: 'red'}  // 报错，只能出现已定义的可选属性，额外的属性是不允许存在的
  // Object literal may only specify known properties
```

### 只读属性

某些属性可能一旦创建后就不允许修改，你可以通过在属性前添加 `readonly` 来指定该属性为只读属性。

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5;  // error! 除了创建时指定，后续无法更改。
```

TypeScript 还支持创建只读数组，即 `ReadonlyArray<Type>` 类型，该类型一旦创建后就无法修改。

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12;       // Error, Left-hand side of assignment expression cannot be a constant or a read-only property
ro.push(5);       // Error, Property 'push' does not exist on type 'ReadonlyArray<number>'
ro.length = 100;  // Error
a = ro;           // Error! - 将一个 ReadonlyArray 重新赋值给一个普通 array 也是不被允许的
  // Type 'ReadonlyArray<number>' is not assignable to type 'number[]'.
  // Property 'push' is missing in type 'ReadonlyArray<number>'.
a = ro as number[];  // OK！ - 可以通过断言来跳过类型检查
```

> **readonly vs const**
>
> The easiest way to remember whether to use readonly or const is to ask whether you're using it on a variable or a property. Variables use const whereas properties use readonly.

### 额外属性

TS 会对对象字面量的额外属性进行检查，如果一个对象字面量存在任何“目标类型”不包含的属性时，就会报错。

绕开这个检查非常简单。最好而简便的方法是使用类型断言。另一个方法，有人可能会惊讶，就是将一个对象赋值给另一个变量。

```ts
interface Config {
  color: string;
  width?: number;
}
function createSquare(config: Config): { color: string; area: number } {
  // ...
  return {color: 'red', area: 100};
}
let square1 = createSquare({color: 'red'});  // OK
let square2 = createSquare({width: 5});      // Error, Property 'color' is missing
let square3 = createSquare({color: 'red', width: 5});    // OK
let square4 = createSquare({color: 'red', widddth: 5});  // Error, Object literal may only specify known properties
let square5 = createSquare(<Config>{color: 'red', widddth: 5});    // OK, 采用类型断言
let square6 = createSquare({color: 'red', widddth: 5} as Config);  // OK, 采用类型断言

let options1 = {color: 'red', widddth: 5};  // 这里的 widddth 是 Config 定义之外的 **额外属性**
let square7 = createSquare(options1);       // 不会对额外属性进行检查，所以编译器不会报错

let options2 = {colour: 'red', width: 5};   // 这里故意将 color 改成了 colour
let square8 = createSquare(options2);       // Error, 其他属性检查照常进行
```

注意：在简单代码里你可能不应该去绕开这些检查。对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大部分额外属性检查错误是真正的 bug。

### 函数类型

接口不仅能够描述带有属性的普通对象，而且也可以描述函数类型。

**函数的参数名不需要与接口里定义的名字相匹配，只要求对应位置上的参数类型是兼容的。**

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {  // 函数的参数名不需要与接口里定义的名字相匹配
    return true;
}
```

### 可索引类型  Indexable Types

包含：数组类型(只有数字索引) + 对象类型(看做是其他语言的关联数组，可以是数字索引和字符串索引)

可索引类型需要同时指定索引类型和元素类型。

```ts
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
```

有两种索引类型：string 和 number，可以同时使用，但有一个限制，**数字索引的元素类型必须是字符串索引的元素类型的子类型**。因为在 JavaScript 中，采用数字索引时，实际上会先将数字转换成字符串，然后再用该字符串去查找对象的属性。

```ts
class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}
interface NotOkay {
  [x: number]: Animal;  // Error!
  [x: string]: Dog;
}
```

因为访问对象属性时，可以任意采用 `obj.property` 或 `obj["property"]` ，所以通过 property 方式定义的元素类型应该符合通过 [index: string] 定义的元素类型要求。

```ts
interface NumberDictionary {
  [index: string]: number;
  length: number;    // ok, length is a number
  name: string;      // error, the type of 'name' is not a subtype of the indexer
}
```

### 类类型 Class Types

#### 实现接口

与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。

接口描述了类的公共 public 部分，而不是私有 private 部分，它不会帮你检查类是否具有某些私有成员。

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}
class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
```

#### 类静态部分与实例部分的区别

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

```ts
interface ClockConstructor {
  new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) { }
}
```

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。

因此，我们应该直接操作类的静态部分。看下面的例子，我们定义了两个接口，ClockConstructor为构造函数所用和ClockInterface为实例方法所用。为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。

```ts
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;  // 带 new 是构造函数，不带是普通函数
}
interface ClockInterface {
  tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() { console.log('beep beep'); }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() { console.log('tick tock'); }
}

let digital = createClock(DigitalClock, 12, 17);  // 感觉这种用法好奇怪，放着以后慢慢理解吧
let analog = createClock(AnalogClock, 7, 32);
```

因为 createClock 的第一个参数是 ClockConstructor 类型，在 createClock(AnalogClock, 7, 32)里，会检查 AnalogClock 是否符合构造函数签名。

```js
// 编译后的 es6 代码
function createClock(ctor, hour, minute) {
  return new ctor(hour, minute);
}
class DigitalClock {
  constructor(h, m) { }
  tick() { console.log('beep beep'); }
}
class AnalogClock {
  constructor(h, m) { }
  tick() { console.log('tick tock'); }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

### 扩展接口 Extending Interfaces

和类一样，接口也可以相互扩展。一个接口可以继承多个接口，创建出多个接口的合成接口。

```ts
interface Shape { color: string; }
interface PenStroke { penWidth: number; }

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;
square.penWidth = 5.0;
```

### 混合类型 Hybrid Types

先前我们提过，接口能够描述JavaScript里丰富的类型。因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 编译后，感觉这种用法也是怪怪的
function getCounter() {
  let counter = function (start) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### 接口继承类 Interfaces Extending Classes

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。接口同样会继承到类的private和protected成员。这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。








