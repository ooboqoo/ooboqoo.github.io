# 类

## 类

```ts
class Person {
// ts 不允许在类声明内定义变量，所以下面这行应该删除
x  let message: string = 'some message';  // 如果不删除加这句，整个编译结果完全是乱的

  // 属性不会被放到 Person.prototype，而是会被编译进 constructor
  // 所以对于实例属性，可以在 constructor 内声明或在外部声明，推荐都是在外部声明
  race: string = 'human';  // 如果加 static 则会放到 Person.race

  // 参数属性可以方便地让我们在一个地方定义并初始化一个成员
  constructor(public name: string, private age: number) {  };  // 访问限制符不可省略

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
  }
  Person.prototype.getRace = function () { return Person.race; };
  Person.race = 'human';
  return Person;
}());
```

## 继承

包含 constructor 函数的派生类必须调用 super()，它会执行基类的构造方法。

在子类里可以重写父类的方法（还是原型链的那些原理）。

```ts
class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`); }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {              // 这里用到了参数的默认值
    super.move(distanceInMeters); }
}

let tom: Animal = new Horse('Tommy the Palomino');

tom.move();    // Tommy the Palomino moved 45m
tom.move(34);  // Tommy the Palomino moved 34m
```

## 公共，私有与受保护的修饰符

### 默认为 `public`

在 TypeScript 里，成员都默认为 public。你也可以明确的将一个成员标记成 public。

### 理解 `private`

当成员被标记成 private 时，它就不能在声明它的类的外部访问。

```ts
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // Error: 'name' is private;
```

### 理解 `protected`

`protected` 修饰符与 `private` 修饰符的行为很相似，但有一点不同，`protected` 成员在派生类中仍然可以访问。

```ts
class Person {
  protected name: string;
  protected constructor(name: string) { this.name = name; }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee('Howard', 'Sales');
console.log(howard.getElevatorPitch());
console.log(howard.name);
  // Error, Property 'name' is protected and only accessible within class 'Person' and it's subclasses.
let gavin = new Person('Gavin');
  // Error: Constructor of class 'Person' is protected and only accessible within the class declaration.
```

虽然不能在 Person 类外使用 name，但是仍然可以通过 Employee 类的实例方法访问，因为 Employee 是由 Person 派生而来的。

构造函数也可以被标记成 protected。这意味着这个类不能在包含它的类外被实例化，但是能被继承。

## `readonly` 修饰符

你可以使用 `readonly` 关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。

```ts
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;                      // 声明时初始化
  constructor (theName: string) { this.name = theName; }  // 在构造函数里初始化
}
let dad = new Octopus('Man with the 8 strong legs');
dad.name = 'Man with the 3-piece suit';  // error! name is readonly.
```

### 参数属性 Parameter properties

在上面的例子中，我们不得不定义一个受保护的成员 name 和一个构造函数参数 theName 在 Person 类里，并且立刻给 name 和 theName 赋值。这种情况经常会遇到。**参数属性可以方便地让我们在一个地方定义并初始化一个成员**。下面的例子是对之前 Animal 类的修改版，使用了参数属性：

```ts
class Animal {
  constructor(private name: string) { }  // 通过添加访问限定符，实现在同一个地方同时完成属性的定义和初始化
  move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

**参数属性通过给构造函数参数添加一个访问限定符来声明。**

## 存取器 Accessors

TypeScript 支持通过 getters/setters 来截取对对象成员的访问。

```ts
let passcode = "secret passcode";

class Employee {
  private _fullName: string;
  get fullName(): string { return this._fullName; }
  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") { this._fullName = newName; }
    else { console.log("Error: Unauthorized update of employee!"); }
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
```

对于存取器有下面几点需要注意的：首先，存取器要求你将编译器设置为输出 ECMAScript5 或更高，不支持 ECMAScript3。其次，只带有 `get` 不带 `set` 的存取器自动被推断为 readonly。这在从代码生成 .d.ts 文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。

## 静态属性

在实例属性之外，我们还可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。每个实例想要访问这个属性的时候，都要在 origin 前面加上类名，如同在实例属性上使用 this 前缀来访问属性一样。

```ts
class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

## 抽象类

抽象类做为其它派生类的基类使用。它们一般不会直接被实例化。**不同于接口，抽象类可以包含成员的实现细节**。`abstract` 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。  
抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体。  
然而，抽象方法必须包含 `abstract` 关键字并且可以包含访问修饰符。

```ts
abstract class Department {
  constructor(public name: string) {  }
  printName(): void { console.log('Department name: ' + this.name); }
  abstract printMeeting(): void;  // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing'); // constructors in derived classes must call super()
  }
  printMeeting(): void { console.log('The Accounting Department meets each Monday at 10am.'); }
  generateReports(): void { console.log('Generating accounting reports...'); }
}

let department: Department;  // ok to create a reference to an abstract type
department = new Department();  // error: cannot create an instance of an abstract class
department = new AccountingDepartment();  // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports(); // error: method doesn't exist on declared abstract type
```

## 高级技巧

### 构造函数

当你在 TypeScript 里声明了一个类的时候，声明了类的实例的类型，另外也创建了一个叫做构造函数。

当我们调用 new 并执行了这个函数后，便会得到一个类的实例。这个构造函数也包含了类的所有静态属性。

```ts
// TypeScript
class Car {
  static staticProp = "staticProp";  // 这个是静态属性，在 Car.staticProp
  engine: string;
  stop: () => string;  // 这个 stop 函数则会出现在 Car 的每个实例中
  constructor (engine: string) {
    this.engine = engine;
    this.stop = () => "Stopped " + this.engine;
  }
  start() {            // 这个方法存放到 Car.prototype
    return "Started " + this.engine;
  }
}

// 编译后
var Car = (function () {
  function Car(engine) {
    var _this = this;
    this.engine = engine;
    this.stop = function () { return 'Stopped ' + _this.engine; };
  }
  Car.prototype.start = function () {
    return 'Started ' + this.engine;
  };
  Car.staticProp = 'staticProp';
  return Car;
}());
```

### 把类当做接口使用

类定义会创建两个东西：类的实例类型和一个构造函数。因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

```ts
class Point {
  x: number;
  y: number;
}
interface Point3d extends Point {
  z: number;
}
let point3d: Point3d = {x: 1, y: 2, z: 3};
```
