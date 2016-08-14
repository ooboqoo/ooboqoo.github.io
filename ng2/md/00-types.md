# 基本类型

### Boolean 布尔值

### Number 数值

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

ES5 严格模式中禁用了8进制数值（因为有证据表明，一些新手会利用前导0来对齐多行中的数字，从而导致意外），但仍有一些开发者需要八进制整数，最常见的就是用在处理文件权限(755,644这些)的时候。因此，ES6 又增加了一种新的八进制整数字面量写法。和十六进制的0x或0X类似，新的八进制整数使用0o或0O作为前导标识，后面跟若干个八进制的数字字符(0到7)，这种写法就不会再困扰新手了。

### String 字符串

除了普通字符串，你还可以使用“模板字符串”，支持跨行以及嵌入表达式。

模板字符串由 `` ` `` 反引号包裹，嵌入表达式的形式为 `${ expr }`。

```ts
let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.
I'll be ${ age + 1 } years old next month.`
```

### Array 数组

数组有两种写法:

```ts
let list: number[] = [1, 2, 3];  // use the type of the elements followed by `[]` 
let list: Array<number> = [1, 2, 3];  // uses a generic array type, `Array<elemType>`
```

### Tuple 元组

元组允许您表达这样一个数组：数组成员的类型是明确的，但可以分属不同的类型。

```ts
let x: [string, number];  // Declare a tuple type
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```

对于越界的元素，将使用 “联合类型” 替代。

```ts
x[3] = "world"; // OK, 'string' can be assigned to 'string | number'
x[6] = true; // Error, 'boolean' isn't 'string | number'
```

### Enum 枚举类型

使用枚举类型可以方便地将名称与数值（下标）建立联系，即可以通过名称取得数值，同时又可以通过数值取得名称。默认下标是从 0 开始的，你可以指定某个成员的下标(后续成员下标会受影响)，甚至手动指定所有成员的下标。

```ts
enum Color {Red = 1, Green=128, Blue};
console.log(Color[128])   // Green
console.log(Color.Green)  // 128
```

### Any 任意值

当不知道某个变量的确切类型时，可以使用 `any` 类型，这样编译时就不会去核对类型了。

### Void 空值

`void` 常见于一个函数没有返回值的情况

```ts
function warnUser(): void {
    alert("This is my warning message");
}
```

如果将一个变量声明为 `void` 类型没有多大意义，因为它将只能接受 2 个值： `undefined` 或 `null` 。

```ts
let unusable: void = undefined;
```

### Null and Undefined

`undefined` 和 `null` 实际上拥有各自的类型 `undefined` 和 `null` 。然而就跟 `void` 类型一样，这两个类型没多大用处。

```ts
let u: undefined = undefined;
let n: null = null;
```

默认情况下 `null` 和 `undefined` 是作为其他普通类型的子类型存在的，也就是说为一个普通类型赋值 `null` 或 `undefined` 都是合法的。

然而，当开启 `--strictNullChecks` 选项的话, `null` 和 `undefined` 只能赋值给 `void` 以及它们各自的专有类型。开启该选项可以避免很多常见错误的发生。如果开启选项后，你可能需要给某个普通类型传递 `null` or `undefined`，那么可以采用联合类型来实现，如 `string | null | undefined`。

> As a note: 我们推荐开启 `--strictNullChecks` 但在本手册中我们是假定没有开启该选项的。

### Type assertions 类型断言

类型断言好比其它语言里的类型转换。类型断言告诉编译器 “我知道我在干什么，请跳过类型检查”。

类型断言有两种形式，“尖括号”语法 以及 as 语法。两种形式是等价的，然而，当使用 JSX 时只允许使用 as 语法。

```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;    // angle-bracket syntax

let someValue: any = [1,2,3];  // 即使换成 {num1: 1, num2: 2} 都不会报错，执行结果是 strLength = undefined
let strLength: number = (someValue as string).length;  // as syntax，转换成 js 后可以正常执行
```
