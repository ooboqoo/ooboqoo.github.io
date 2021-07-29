# 类型运算 Type Manipulation（TS 进阶）


*通过现有「类型」或「值」获取「新的类型」 to express a new type in terms of an existing type or value*

* Conditional Types - Types which act like if statements in the type system
* Mapped Types - Creating types by mapping each property in an existing type
* Template Literal Types - Mapped types which change properties via template literal strings


## 泛型 Generics

https://www.typescriptlang.org/docs/handbook/2/generics.html

Generics - Types which take parameters



```ts
type A<T> = (x: T) => T;      // 在定义时传类型
const a: A<string> = x => x;
a(5);  // Error

type B = <T>(x: T) => T;      // 在实际调用时从参数推断类型
const b: B = x => x;
b(5);          // OK     T 推断为 number
b<string>(5);  // Error  T 显式指定为 string
```


6. 泛型

接口  xxxable

类 -> 接口 -> 泛型
思考：什么时候用接口？什么时候用泛型？



泛型是一种抽象共性（本质）的编程手段，它允许将类型作为其他类型的参数（表现形式），从而分离不同关注点的实现（作用）。


泛型类

```ts
class ClassName<T> {
  // ...
}
```

泛型约束


小技巧 keyof

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```


窄化 Narrowing

```ts
// 这个只是普通函数
function isFish(pet: Fish | Bird) {
  return (pet as Fish).swim !== undefined;
}

// 此时具备了 Type Guard 的能力了
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```


in typeof 在 JS 中就有，TS 做了增强，TS 是 JS 的超集



### 类型变量与泛型

在 C# Java 等语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己的数据类型来使用组件。

TypeScript 中提供了 **类型变量**，它是一种特殊的变量，只用于表示类型而不是值。

```ts
function identity<T>(arg: T): T { return arg; }
```

这里我们给 identity 添加了类型变量 `T`。`T` 帮助我们捕获用户传入的类型(如：number)，之后我们就可以使用这个类型。这里我们再次使用了 `T` 当做返回值类型。

我们把这个版本的 identity 函数叫做 **泛型**，因为它可以适用于多个类型。不同于使用 any，它不会丢失信息。

我们定义了泛型函数后，有两种使用函数的方法。

* 第一种是，传入所有的参数，包含类型参数；
* 第二种方法更普遍，利用类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定 T 的类型：

```ts
let output = identity<string>("myString");  // 方式1 - 指定类型变量，注意使用的是 <> 而不是 ()
let output = identity("myString");          // 方式2 - 类型推论
```

### 泛型函数

使用泛型创建像 identity 这样的泛型函数时，你必须把这些参数当做是任意或所有类型。

```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);  // Error: T doesn't have .length
  return arg;
}
```

现在假设我们想操作 T 类型的数组而不直接是 T。由于我们操作的是数组，所以 .length 属性是应该存在的。我们可以像创建其它数组一样创建这个数组：

```ts
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}

// 或者也可以这样
function loggingIdentity<T>(arg: Array<T>): Array<T> {  }
```

### 泛型接口

接下来我们研究一下泛型函数本身的类型，以及如何创建泛型接口。

泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：

```ts
function identity<T>(arg: T): T { return arg; }

let myIdentity: <T>(arg: T) => T = identity;  // 泛型函数类型：<T>(arg: T) => T
```

我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。

```ts
function identity<T>(arg: T): T { return arg; }

let myIdentity: <U>(arg: U) => U = identity;  // 可以使用不同的类型变量名
```

我们还可以使用带有调用签名的对象字面量来定义泛型函数：

```ts
function identity<T>(arg: T): T { return arg; }

let myIdentity: {<T>(arg: T): T} = identity;  // 使用对象字面量格式定义泛型函数
```

这引导我们去写第一个泛型接口了。 我们把上面例子里的对象字面量拿出来做为一个接口：

```ts
interface GenericIdentityFn { <T>(arg: T): T; }

function identity<T>(arg: T): T { return arg; }

let myIdentity: GenericIdentityFn = identity;
```

一个相似的例子，我们可能想把泛型参数当作整个接口的一个参数。这样我们就能清楚的知道使用的具体是哪个泛型类型。这样接口里的其它成员也能知道这个参数的类型了。

```ts
interface GenericIdentityFn<T> { (arg: T): T; }  // 普通函数接口 + 类型变量，这种使用方式更加灵活
function identity<T>(arg: T): T { return arg; }
let myIdentity: GenericIdentityFn<number> = identity;
```

注意，我们的示例做了少许改动。不再描述泛型函数，而是把**非泛型函数签名作为泛型类型一部分**。当我们使用 GenericIdentityFn 的时候，还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型。对于描述哪部分类型属于泛型部分来说，理解何时把参数放在调用签名里和何时放在接口上是很有帮助的。

### 泛型类

泛型类看上去与泛型接口差不多。

```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// 没有什么去限制它只能使用 number 类型。也可以使用字符串或其它更复杂的类型：
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };
```

与接口一样，直接把泛型变量放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。

我们在类那节说过，类有两部分：静态部分和实例部分。泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

### 泛型约束

前面 loggingIdentity 例子中，我们想访问 arg.length 属性，但是编译器并不能证明每种类型都有 length 属性，所以就报错了。

相比于操作 any 所有类型，我们想要限制函数去处理任意带有 .length 属性的所有类型。为此，我们需要列出对于 T 的约束要求。

```ts
interface Lengthwise { length: number; }

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

```ts
loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({length: 10, value: 3});  // OK
```

#### 在泛型约束中使用类型参数

你可以声明一个类型参数，且它被另一个类型参数所约束。比如：

```ts
function find<T, U extends Findable<T>>(n: T, s: U) {
  // ...
}
find (giraffe, myAnimals);
```

#### 在泛型里使用类类型

在 TypeScript 使用泛型创建工厂函数时，需要引用构造函数的类类型。比如：

```ts
function create<T>(c: {new(): T; }): T {
  return new c();
}
```

一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。

```ts
class BeeKeeper { hasMask: boolean; }
class ZooKeeper { nametag: string; }
class Animal { numLegs: number; }
class Bee extends Animal { keeper: BeeKeeper; }
class Lion extends Animal { keeper: ZooKeeper; }

function findKeeper<A extends Animal, K> ( a: {new(): A; prototype: {keeper: K}}): K {
  return a.prototype.keeper;
}

findKeeper(Lion).nametag;  // typechecks!
```





## 类型运算符

`&` `|` `keyof` `typeof` `Type['a']`(Indexed Access Types) `? :`

### 交叉类型 Intersection Types `&`


交叉类型是将多个类型合并为一个类型。这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。例如，`Person & Serializable & Loggable` 同时是 Person 和 Serializable 和 Loggable。就是说这个类型的对象同时拥有了这三种类型的成员。

我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。（在JavaScript里发生这种情况的场合很多！） 下面是如何创建混入的一个简单例子：

```ts
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) { (<any>result)[id] = (<any>second)[id]; }
  }
  return result;
}

class Person {constructor(public name: string) { } }
interface Loggable {log(): void; }
class ConsoleLogger implements Loggable {log() { /*  */ } }

var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```


### 联合类型 `|`







### 条件类型 Conditional Type



infer 与 类型计算体系

条件类型 Conditional Type 主要是搭配 泛型 Generics。

* Conditional types help describe the relation between the types of inputs and outputs
* Conditional types take a form that looks a little *like conditional expressions in JavaScript*


```ts
// inferring
type Flatten<Type> = Type extends Array<infer Item> ? Flatten<Item> : Type;
type D = Flatten<number[][][][][]>;  // D 为 number
```

```ts
// 对函数重载的处理：取最后一条
```


```ts
// Distributive Conditional Types
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;  // string[] | number[]

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
type StrOrNunArr = ToArrayNonDist<string | number>;  // (string | number)[]
```


## Mapped Types


## 字符串字面量类型 Template Literal Types

字符串字面量类型允许你指定字符串必须的固定值。在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。通过结合使用这些特性，你可以实现类似枚举类型的字符串。

```ts
type Easing = "ease-in" | "ease-out" | "ease-in-out";
```




















