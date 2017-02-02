官方网站：https://www.typescriptlang.org   
中文文档地址：http://tslang.cn/docs/handbook/interfaces.html

## TS 手册精简

### 类型注解

```
布尔值 Boolean: boolean
数值   Number: number
字符串 String: string 
符号   Symbol: symbol
数组   Array: elemType[] 或 Array<elemType> 
         let list: number[] = [1, 2, 3];
         let list: Array<number> = [1, 2, 3]
元组   Tuple: let x: [string, number];  // 越界元素采用联合类型
         x = ['hello', 10];  // OK
         x = [10, 'hello'];  // Error
枚举   Enum : enum Color {Red, Green, Blue};  // ['enəm]
         enum Color {Red = 1, Green=128, Blue};
         console.log(Color[128]);   // Green
         console.log(Color.Green);  // 128
任意值 Any: any
         let notSure: any = 4; 
空值   Void: void
         function f00(): viod {}
Null: null
Undefined: undefined
类型断言 Type assertions
  let someValue: any = "this is a string";
  let strLength: number = (<string>someValue).length;    // 方式 1
    // 注意这里的括号，如果 <string>someValue.length 这样写则断言的对象是 length
  let strLength: number = (someValue as string).length;  // 方式 2
```

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。   
使用枚举类型可以方便地将名称与数值（下标）建立联系，即可以通过名称取得数值，同时又可以通过数值取得名称。

### 接口 Interfaces

接口用来定义引用类型的类型，通过接口可以实现类型定义的复用。

#### 定义对象类型
接口定义好属性后，当把一个对象设定为该接口类型时，对象必须要有相应的同名属性，且类型匹配。   
另外，如果出现接口定义之外的属性，TS 会报错，可以采用类型断言或通过一个变量转一下来绕过检查。
```ts
interface SquareConfig {
  width: number;   // 实现该接口的对象必须包含此属性
  color?: string;  // 这是可选属性，可以不实现
  [propName: string]: any;  // 添加这项声明可以允许添加其他属性
}
```

#### 定义函数类型
```ts
interface SearchFunc { (source: string, subString: string): boolean; }
let mySearch: SearchFunc;
mySearch = function(source: string, sub: string) { return true; }
  // 函数的参数名不需要与接口里定义的名字相匹配，但要求对应位置上的类型是兼容的
```

#### 定义可索引类型
```ts
interface StringArray { [index: number]: string; }  // index 只支持 number 和 string，且 string 包含 number
```

#### 定义类类型
```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}
class Clock implements ClockInterface {  // 此处用的 implements 而非冒号
  currentTime: Date;
  setTime(d: Date) { this.currentTime = d; }
  constructor(h: number, m: number) { }
}
```

#### 扩展接口
```ts
interface Shape { color: string; }
interface Square extends Shape { sideLength: number; }
```

#### 附

```ts
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}
let myObj = {size: 10, label: "Size 10 Object"};  // 这里额外的属性是允许的
printLabel(myObj);
```

### 类

继承：子类可以覆盖父类方法。

需要在类的开头声明属性的类型，属性都是实例属性(如果没有特地加 static)，这是区别与ES6的地方，另外一个不同是，ES6 允许有多个 constructor，只要参数不同，但 TS 只允许有一个 constructor。

#### 公共，私有与受保护的修饰符

在 TypeScript 里，每个成员默认为 `public` 的。你也可以明确的将一个成员标记成 `public`。
当成员被标记成 `private` 时，它就不能在声明它的类的外部访问。
`protected` 修饰符与 `private` 修饰符的行为很相似，但有一点不同，`protected` 成员在派生类中仍然可以访问。

#### 其他特性

存取器 get set   
静态属性 static   
抽象类 abstract   
把类当做接口使用：因为类可以创建出类型，所以你能够在可以使用接口的地方使用类。

### 函数类型

TypeScript 能够根据返回语句自动推断出返回值类型，因此我们通常省略它。

```ts
let myAdd: (x:number, y:number)=>number =      // 返回值类型之前使用 => 符号
  function(x: number, y: number): number { return x+y; };
```

### 泛型 Generics

```ts
// <T> 中的 T 是类型变量
function funcName<T>(arg: T): T { return arg; }
```

### 高级类型

#### 联合类型
联合类型表示一个值可以是几种类型之一。 我们用竖线 `|` 分隔每个类型，如 `number | string | boolean`。

#### 交叉类型
交叉类型表示对象同时拥有多个类型的成员，主要出现在混入中，如 `Person & Serializable & Loggable`。

#### 类型别名
```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
```

类型别名很像接口，但类型别名不支持 extends 和 implements，所以应该尽量使用接口代替类型别名。

#### 字符串字面量类型
```ts
type Easing = "ease-in" | "ease-out" | "ease-in-out";
```

### Iterators and Generators

对于新增的可遍历对象，不支持转码到ES5。而数组的 for of 会转成 for 语句。

### 模块

为与 ES2015 保持一致，从 TS1.5 开始，原 “内部模块” 称做 “命名空间”, 而 “模块” 则指 “外部模块”。

尽管 TypeScript 采用了 ES6 的模块的语法，但转 ES5 的话实际生成的还是 CommonJS 的模块。   
--module (target === "ES6" ? "ES6" : "CommonJS")

#### 模块解析
说明了与 Nodejs 解析不同的地方，import 时不能带后缀的原因也在这，TS 找 ts 文件，Nodejs 找 js 文件。

### 命名空间

> 命名空间在 1.5 版本之前叫 **internal modules**，主要是针对一些通过全局变量引入的库，避免各个库之间内部变量的命名冲突，如果库采用模块化结构就不再需要使用命名空间了。

随着更多验证器的加入，我们需要一种手段来组织代码，以便于在记录它们类型的同时还不用担心与其它对象产生命名冲突。 因此，我们把验证器包裹到一个命名空间内，而不是把它们放在全局命名空间下。

```ts
namespace Validation {
  // ...
}
```

### 声明合并

编译器会将针对同一个名字的多个独立声明合并为单一声明。

### 声明文件

当使用外部 JavaScript 库或新的宿主 API 时，需要编写声明文件 .d.ts 定义程序库的 shape。

如果我们自己的 ts 文件需要生成声明文件，则只需要运行 `tsc -d`，但如果是 js 文件则得手动编写声明文件了。

### 修饰器

Decorators 是 ES7 的一个提案，TS已经支持。修饰器本质就是编译时执行的函数，用来修改类的行为。

```ts
@decorator
class A {}
// 等同于
class A {}
A = decorator(A) || A;
```

### 混入 Mixins


