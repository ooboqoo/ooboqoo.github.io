# 高级类型


## 类型保护与区分类型

联合类型非常适合这样的情形，可接收的值有不同的类型。当我们想明确地知道是否拿到 Fish 时会怎么做？JavaScript 里常用来区分2个可能值的方法是检查它们是否存在。TS 中只能访问联合类型的所有类型中共有的成员。为了让 TS 明白我们自己做了检查，我们要使用类型断言：

```ts
interface Fish { swim(); }
interface Bird { fly(); }

function getSmallPet(x: boolean): Fish | Bird {
  return x ? {swim: () => 'swim'} : { fly: () => 'fly' };
}

let pet = getSmallPet(false);

if (pet.swim) { pet.swim(); }  // Property 'swim' does not exist on type 'Fish | Bird'
else (pet.fly) { pet.fly(); }  // Property 'fly'  does not exist on type 'Fish | Bird'

// 需要使用类型断言才不会报错
if ((<Fish>pet).swim) { (<Fish>pet).swim(); }
else { (<Bird>pet).fly(); }
```

### 用户自定义的类型保护

可以注意到我们使用了多次类型断言。如果我们只要检查过一次类型，就能够在后面的每个分支里清楚 pet 的类型的话就好了。

TypeScript 里的**类型保护**机制让它成为了现实。类型保护就是一些表达式，它们会在*运行时检查*以确保在某个作用域里的类型。要定义一个类型保护，我们只要简单地定义一个函数，它的*返回值是一个类型断言*：

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
```

在这个例子里，`pet is Fish` 就是类型断言。一个断言是 `parameterName is Type` 这种形式，`parameterName` 必须是来自于当前函数签名里的一个参数名。

每当使用一些变量调用 `isFish` 时，TypeScript 会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的。

```ts
let result = isFish(pet) ? pet.swim() : pet.fly();
```

注意 TypeScript 不仅知道在 if 分支里 pet 是 Fish 类型；它还清楚在 else 分支里，一定不是 Fish 类型，一定是 Bird 类型。

### `typeof` 类型保护

现在我们可以像下面这样利用类型断言来写：

```ts
function isNumber(x: any): x is number { return typeof x === "number"; }

function isString(x: any): x is string { return typeof x === "string"; }

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) { return Array(padding + 1).join(" ") + value; }
  if (isString(padding)) { return padding + value; }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

然而，必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。幸运的是，现在我们不必将 `typeof x === "number"`抽象成一个函数，因为 TypeScript 可以将它识别为一个类型保护。也就是说我们可以直接在代码里检查类型了。

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") { return Array(padding + 1).join(" ") + value; }
  if (typeof padding === "string") { return padding + value; }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

这些 **typeof类型保护** 只有两种形式能被识别：`typeof v === "typename"` 和 `typeof v !== "typename"`，"typename" 必须是 "number"，"string"，"boolean" 或 "symbol"。
但是 TypeScript 并不会阻止你与其它字符串比较，只是不会把那些表达式识别为类型保护。

### `instanceof` 类型保护

跟 typeof类型保护 相似，instanceof类型保护 是通过构造函数来细化类型的一种方式。

```ts
class Fish {
  swim() { return 'swim'; }
}
class Bird {
   fly() { return 'fly'; }
}

function getSmallPet(x: boolean): Fish | Bird {
  return x ? new Fish() : new Bird();
}

let pet = getSmallPet(false);
let result = pet instanceof Fish ? pet.swim() : pet.fly();  // 使用 instanceof 类型保护
```


## 类型别名

类型别名会给一个类型起个新名字。类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
```

起别名不会新建一个类型 - 它创建了一个新名字来引用那个类型。

同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入：

```ts
type Container<T> = { value: T };
```

我们也可以使用类型别名来在属性里引用自己：

```ts
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};
```

然而，类型别名不能出现在声明右侧的任何地方。

```ts
type Yikes = Array<Yikes>;  // error
```

### 接口 vs. 类型别名

像我们提到的，类型别名可以像接口一样；然而，仍有一些细微差别。

其一，接口创建了一个新的名字，可以在其它任何地方使用。类型别名并不创建新名字—-比如，错误信息就不会使用别名。
另一个重要区别是类型别名不能被 extends 和 implements（自己也不能extends和implements其它类型）。

因为软件中的对象应该对于扩展是开放的，但是对于修改是封闭的，你应该尽量去使用接口代替类型别名。  
另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。



类型别名 Type Aliases `type`

Note that *aliases are only aliases* - you cannot use type aliases to create different/distinct “versions” of the same type.

```ts
type string1 = string;
type string2 = string;
let str1: string1 = '1';   // hover 时展示 let str1: string
let str2: string2 = str1;  // OK
```

Interfaces

TypeScript is a *structurally typed type system*. 鸭式辨型法只关注结构匹配。


Differences Between Type Aliases and Interfaces
Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.


## 可辨识联合（Discriminated Unions）

你可以合并字符串字面量类型，联合类型，类型保护和类型别名来创建一个叫做可辨识联合的高级模式，它也称做标签联合或代数数据类型。可辨识联合在函数式编程很有用处。

```ts
// 声明了将要联合的接口，每个接口都有 kind 属性但有不同的字符串字面量类型。
// kind 属性称做可辨识的特征或标签。其它的属性则特定于各个接口。
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

// 创建可辨识联合
type Shape = Square | Rectangle | Circle;

// 使用可辨识联合
function area(s: Shape) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "rectangle": return s.height * s.width;
    case "circle": return Math.PI * s.radius ** 2;
  }
}
```

## 多态的 this 类型

多态的 this 类型表示的是某个包含类或接口的子类型。它能很容易的表现连贯接口间的继承。

```ts
class BasicCalculator {
  public constructor(protected value: number = 0) { }
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {  // 明确指定返回值类型
    this.value += operand;
    return this;                       // 返回 this 方便链式调用
  }
  public multiply(operand: number) {   // 推断返回值为 this
    this.value *= operand;
    return this;
  }
}

class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
}

let v = new ScientificCalculator(2)
            .multiply(5)      // 因为 this 的多态特性，
            .sin()                 // 此处返回的是 ScientificCalculator 而不是 BasicCalculator
            .add(1)
            .currentValue();  // 放最后，因为没有返回 this
```
