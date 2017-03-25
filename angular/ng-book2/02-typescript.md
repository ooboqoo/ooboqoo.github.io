# TypeScript

## Angular 2 is built in TypeScript

TypeScript = ES6 + types + annotations + ...   
ES6 = ES5 + classes + modules + ...


## What do we get with TypeScript

There are five big improvements that TypeScript bring over ES5:

* types (最主要的增强)
* classes
* annotations
* imports
* language utilities (e.g. destructuring)

## Types

增加变量类型定义，可能会失去一些弱变量语言的便利，但同时带来了以下好处：

1. 写代码时，编译器可以通过类型检查来给出提示和进行错误检查
2. 读代码时，通过变量定义可以明确地知道作者的意图

对于大的项目，这将大大降低出错的几率，付出一点点便利性是值得的，当然，在前期也可以不添加变量类型定义，这是允许的。

### Trying it out with a REPL

```bash
 npm install -g tsun
 tsun                   // 运行即时解析器
```

### Built-in types

类型 | 定义 | 示例
---- | ---- | ----
String | string | var name: string = 'Felipe';
Number | number | var age: number = 36;
Boolean | boolean | var married: boolean = true;
Array | Array&lt;type><br> type[] | var jobs: Array&lt;string> = ['IBM', 'Microsoft', 'Google'];<br> var jobs: number[] = [4, 5, 6];
Enums | enum | enum Role {Employee = 3, Manager, Admin};<br> var role: Role = Role.Employee;
Any | any | var something: any = 'as string';
Void | void | function setName(name: string): void { this.name = name; }

## Classes

### Properties

Properties define data attached to an instance of a class.

```ts
class Person {
  firstName: string;
  lastName: string;
  age: number;
}
```

### Methods

Methods are functions that run in context of an object. To call a method on an object, we first have
to have an instance of that object.

```ts
class Person {
  firstName: string;
  lastName: string;
  age: number;

  greet() { console.log('Hello', this.firstName); }
}
```

### Constructors

Constructor methods must be named constructor. They can optionally take parameters but they can’t return any values.

In order to instantiate a class we call the class constructor method by using the class name: new ClassName()

> In TypeScript you can have only one constructor per class.   
That is a departure from ES6 which allows one class to have more than one constructor as
long as they have a different number of parameters.

```ts
class Person {
  firstName: string;
  lastName: string;
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  greet() { console.log('Hello', this.firstName); }
  ageInYears(years: number): number { return this.age + years; }
}
```

### Inheritance

Inheritance is a way to indicate that a class receives behavior from a parentclass. Then we can override, modify or augment those behaviors on the new class.

```ts
class Report {
  data: Array<string>;
  constructor(data: Array<string>) { this.data = data; }
  run() { this.data.forEach((line) => console.log(line)); }
}

class TabbedReport extends Report {
  headers: Array<string>;
  constructor(headers: string[], values: string[]) {
    super(values);
    this.headers = headers;
  }
  run() { console.log(this.headers); super.run(); }
}
```

## Utilities

ES6 带来了诸多新特性，最重要的是2个特性：胖箭头函数 和 模板字符串

### Fat Arrow Functions

One important feature of the => syntax is that it shares the same this as the surrounding code. This is important and different than what happens when you normally create a function in Javascript.

Arrows are a great way to cleanup your inline functions.

```ts
let evens = [2, 4, 6, 8];
let odds  = evens.map(v => v + 1);
// Or as a statement:
data.forEach( line => {
  console.log(line.toUpperCase());
});
```

### Template Strings

In ES6 new template strings were introduced. The two great features of template strings are

1. Variables within strings (without being forced to concatenate with + ) and
2. Multi-line strings
