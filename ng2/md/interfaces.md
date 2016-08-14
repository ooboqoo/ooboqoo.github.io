# 接口

可以将接口看做是对对象的类型注释，规定实现该接口的对象必须拥有哪些属性（同时也不能出现没有的属性名，这跟一般的接口概念有点不一样）。

还有一点值得注意的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

```ts
interface LabelledValue {
  label: string;
}
let myObj = {size: 10, label: "Size 10 Object"};
```

### 可选属性

属性名字后面加一个 `?` 符号即表示该属性是可选的。可选属性的用处是可以对可能存在的属性进行预定义。

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}
```

### 只读属性

某些属性可能一旦创建后就不允许修改，你可以通过在属性前添加 `readonly` 来指定该属性为只读属性。

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error! 除了创建时指定，后续无法更改。
```

TypeScript 还支持创建只读数组，即 `ReadonlyArray<Type>` 类型，该类型一旦创建后就无法修改。

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error! - 将一个 ReadonlyArray 重新赋值给一个普通 array 也是不被允许的
a = ro as number[];  // OK！ - 可以通过断言来跳过类型检查
```

> **readonly vs const**
>
> The easiest way to remember whether to use readonly or const is to ask whether you're using it on a variable or a property. Variables use const whereas properties use readonly.

### 额外的属性检查

对象字面量会经过 *额外属性检查*，如果一个对象字面量存在任何“目标类型”不包含的属性时，就会报错。

绕开这些检查非常简单。最好而简便的方法是使用类型断言。另一个方法，有人可能会惊讶，就是将一个对象赋值给另一个变量：

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}
let squareOptions = { colour: "red", width: 100 };  // 此处故意改成 colour
let mySquare = createSquare(squareOptions);  // squareOptions 不会经过额外属性检查，所以编译器不会报错
```

注意：在简单代码里你可能不应该去绕开这些检查。对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大部额外属性检查错误是真正的bug。

### 函数类型

接口不仅能够描述带有属性的普通对象，而且也可以描述函数类型。

函数的参数名不需要与接口里定义的名字相匹配，只要求对应位置上的参数类型是兼容的。

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

包含：数组类型（只有数字索引） + 对象类型（看做是其他语言的关联数组，可以是数字索引和字符串索引）

可索引类型需要同时指定索引类型和元素类型。

```ts
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
```

有两种索引类型：string 和 number，可以同时使用，但有一个限制，数字索引的元素类型必须是字符串索引的元素类型的子类型。

因为在 JavaScript 中，采用数字索引时，实际上会先将数字转换成字符串，然后再用该字符串去查找对象的属性。

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

接口描述了类的公共部分，而不是公共和私有两部分，它不会帮你检查类是否具有某些私有成员。

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

// 待阅读

### 扩展接口 Extending Interfaces
### Hybrid Types
### Interfaces Extending Classes








