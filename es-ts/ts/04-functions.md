# 函数

## 函数类型

### 为函数定义类型

我们可以给每个参数添加类型之后再为函数本身添加返回值类型。TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。

```ts
function add(x: number, y: number): number {return x + y; }
let myAdd = function(x: number, y: number): number { return x + y; };
```

### 书写完整函数类型

函数类型包含两部分：参数类型和返回值类型。 当写出完整函数类型的时候，这两部分都是需要的。 

```ts
//         (参数:类型       , 参数:类型       ) => 返回值类型
let myAdd: (baseValue:number, increment:number) => number =
    function(x: number, y: number): number { return x + y; };
        // 只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确
```

### 推断类型

TypeScript 编译器会按上下文自动识别出类型，这叫“归类”，是类型推论的一种，它帮助我们更好地为程序指定类型。

```ts
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue:number, increment:number) => number =
    function(x, y) { return x + y; };
```

## 可选参数和默认参数

TypeScript 里的每个函数参数都是必须的，传递给一个函数的参数个数必须与函数期望的参数个数一致。

JavaScript 里，每个参数都是可选的，可传可不传。没传参的时候，它的值就是 undefined。在 TypeScript 里我们可以在参数名旁使用 `?` 实现可选参数的功能。**可选参数必须跟在必选参数后面**。

```ts
function buildName(firstName: string, lastName?: string) { /* */ }
```

在 TypeScript 里，我们也可以为参数提供一个默认值。所有带默认值的参数都是可选的。

```ts
function buildName(firstName: string, lastName = "Smith") { /* */ }
```

与普通可选参数不同的是，带默认值的参数不需要放在必选参数的后面。如果带默认值的参数出现在必选参数前面，用户必须明确的传入 undefined值来获得默认值。

```ts
function buildName(firstName = "Will", lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
```

## 剩余参数

有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。在 ES5 里，你可以使用 `arguments` 来访问所有传入的参数。在 TypeScript 里，你可以把所有参数收集到一个变量里：

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

剩余参数会被当做个数不限的可选参数。可以一个都没有，同样也可以有任意个。编译器创建参数数组，名字是你在省略号 `...`后面给定的名字，你可以在函数体内使用这个数组。

这个省略号也会在带有剩余参数的函数类型定义上使用到：

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```

## `this`

### `this` 和箭头函数

JavaScript 里，`this` 的值在函数被调用的时候才会指定。这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

ES5 普通模式下，`this` 找不到宿主时会指向 `window` 而在严格模式下，则为 `undefined`。
为了解决这个问题，我们可以在函数被返回时就绑好正确的this。
而 ES6 中的箭头函数则提供了另外一种解决方案：箭头函数保存的是函数创建时的 this 值，而不是调用时的值。

如果你给编译器设置了 `--noImplicitThis` 标记，当 `this` 的类型为 any 时 TypeScript 会给出警告。

### `this` 参数

当开启 `--noImplicitThis` 标记后，函数中使用 `this` 需提前声明 this 类型。这样 TypeScript 才知道我们期望在什么对象上调用该函数。

```ts
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}
```

### `this` 参数在回调函数里

很好，但有点复杂，而且意义不大，先略过。

## 重载

JavaScript 里函数根据传入不同的参数而返回不同类型的数据是很常见的，但 JS 里没有重载这个概念。

TypeScript 里允许通过给同一个函数提供多个函数类型定义来进行函数重载。

TypeScript 查找重载列表，尝试使用第一个重载定义。如果匹配的话就使用这个。因此，为了让编译器能够选择正确的检查类型，在定义重载的时候，一定要把最精确的定义放在最前面。

```ts
enum suits {'hearts', 'spades', 'clubs', 'diamonds'};

function pickCard(x: string): number;           // 重载定义1
function pickCard(x: number): string;           // 重载定义2
function pickCard(x): any { return suits[x]; }  // 实际 JS 代码

let result1: number = pickCard('spades');
let result2: string = pickCard(2);
```

注意，`function pickCard(x): any` 并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。以其它参数调用 pickCard 会产生错误。
