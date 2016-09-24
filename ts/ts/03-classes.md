# 类

## 类

```ts
class Person {
// ts 不允许在类声明内定义变量，所以下面这行应该删除
x  let message: string = 'some message';  // 如果不删除加这句，整个编译结果完全是乱的

  // 属性不会被放到 Person.prototype，而是会被编译进 constructor
  // 所以对于实例属性，可以在 constructor 内声明或在外部声明，推荐都是在外部声明
  race: string = 'human';

  // 这里采用了简写的方式，即在什么参数的同时声明了实例属性
  // 参数属性可以方便地让我们在一个地方定义并初始化一个成员
  constructor(public name: string, private age: number) {  };  // 如果不加 public 或 private 就不再是简写方式

  // 方法会定义到 Person.prototype
  getRace() { return this.race; }
};

console.log(Person.prototype);
let gavin = new Person('gavin', 32);
console.log(gavin);
```

上例为了说明一些问题，写得不规范，更常见的写法是这样的：

```ts
class Person {
  static race: string = 'human';
  public name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age  = age;
  }

  getRace() { return Person.race; }
}
```

编译后的 js 文件：

```js
var Person = (function () {
  function Person(name, age) {
    this.name = name;
    this.age = age;
    this.race = 'human';
  }
  ;
  Person.prototype.getRace = function () {
    return this.race;
  };
  //  let message: string = 'some message';
  Person.version = 1;
  return Person;
}());
console.log(Person.prototype);
var gavin = new Person('gavin', 32);
console.log(gavin);
```

## 继承

包含 constructor 函数的派生类必须调用 super()，它会执行基类的构造方法。

在子类里可以重写父类的方法（还是原型链的那些原理）。

```ts
class Animal {
  name:string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`); }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
    super.move(distanceInMeters); }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);  // Tommy the Palomino moved 45m
```

## 公共，私有与受保护的修饰符

### 默认为公有


### 理解 `private`


### 理解 `protected`


## 存取器


## 静态属性

## 抽象类


## 高级技巧

### 构造函数

### 把类当做接口使用



