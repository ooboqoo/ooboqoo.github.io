# Dart


```dart
// Define a function.
printInteger(int aNumber) {
  print('The number is $aNumber.'); // Print to console.
}

// This is where the app starts executing.
main() {
  var number = 42; // Declare and initialize a variable.
  printInteger(number); // Call a function.
}
```


## 基础

### 核心概念

* Everything you can place in a variable is an object, and every object is an instance of a class.
* Although Dart is strongly typed, type annotations are optional because Dart can infer types.
* Dart supports top-level functions, as well as functions tied to a class or object. You can also create functions within functions (nested or local functions).
* Unlike Java, Dart doesn’t have the keywords `public`, `protected`, and `private`. If an identifier starts with an underscore `_`, it’s private to its library.
* Identifiers can start with a letter or underscore `_`, followed by any combination of those characters plus digits.

### 关键字

null true false 

const final var dynamic void  enum external Function  typedef

class  static   factory    super this  new   get set operator
extends abstract implements interface
mixin  with on

if else switch case break continue default for while do return

in is as assert

try catch finally throw rethrow

import export library show  hide part deferred

async  await  yield  sync    covariant


### 运算符

|||
--------------|-------------------------------------
unary postfix | `++` `--` `()` `[]` `.` `?.`
unary prefix  | `-` `!` `~` `++` `--`
multiplicative | `*` `/` 求余 `%` 除(取整) `~/` >> `+` `-`
bitwise        | shift `<<` `>>` `>>>` >> AND `&` >> XOR `^` >> OR `\|` 
relational     | `>=` `>` `<=` `<` `==` `!=`
type test      | `as` `is` `is!`
logical        | `&&` >> `\|\|`
if null        | `??`
conditional    | `? :`
cascade        | `..`
assignment     | `=` `*=` `/=` `+=` `-=` `&=` `^=` etc.

注：运算符的优先级由往下逐条降低，同行之间有先后顺序的，用 `>>` 标示出来了。  
注：Dart 下的很多运算符是可以覆写的，`x == y` 其实就是执行了 `x.==(y)`。

```dart
if (employee is Person) employee.firstName = 'Bob';  // 可以简写成
(employee as Person).firstName = 'Bob';

// Assign value to b if b is null; otherwise, b stays the same
b ??= value;

String playerName(String name) => name ?? 'Guest';  // 等效于下行写法
String playerName(String name) => name != null ? name : 'Guest';

// 链式调用符
querySelector('#confirm') // Get an object.
  ..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```

### 内置类型

```dart
num (int + double)  bool  String  List  Set  Map  Symbol  Runes
```


## Functions

Dart is a true object-oriented language, so even functions are objects.

箭头函数

```dart
void main () { return exp; }
void main = () => exp
```

可选参数

```dart
String say(String from, String msg, [String device = 'carrier pigeon', String mood]) { /* ... */ }
```

命名参数

```dart
void enableFlags({bool bold, bool hidden}) { /* ... */ }
enableFlags(bold: true, hidden: false);
```

参数默认值

```dart
void enableFlags({bool bold = false, bool hidden = false}) { /* ... */}
```

函数是头等对象 Functions as first-class objects

```dart
void printElement(int element) { print(element); }
[1, 2, 3].forEach(printElement);
```

匿名函数

```dart
myList.forEach((item) { print('${list.indexOf(item)}: $item'); });
myList.forEach((item) => print('${list.indexOf(item)}: $item'));
```

词法作用域 和 闭包


## Exceptions

```dart
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```



## Classes

Dart is an object-oriented language with classes and mixin-based inheritance. Every object is an instance of a class, and all classes descend from Object. Mixin-based inheritance means that although every class (except for Object) has exactly one superclass, a class body can be reused in multiple class hierarchies.

```dart
class A {
  static void foo() {}  // A static method
  void bar() {}         // An instance method
}

var a = A();
var b = A();

assert(a.bar != b.bar)  // 注意，这里是不等的，跟 JS 不一样
```

### 使用类

```dart
// 创建类实例时，new 关键字是可选的，所以基本看不到用 new 的情况
var p1 = Point(2, 2);
```

```dart
// 编译期常量会被合并
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);
assert(identical(a, b)); // They are the same instance!

// 编译期常量的依赖项也肯定是编译期常量，所以下面那么多 const 是多余的，有第一个就够了
const pointAndLine = const {
  'point': const [const ImmutablePoint(0, 0)],  // 除了第一个 const，其他都是多余的
  'line': const [const ImmutablePoint(1, 10), const ImmutablePoint(-2, 11)],
};
```

```dart
// 在运行过程中获取实例的类型
print('The type of a is ${a.runtimeType}');
```

### Constructors

多个构造函数

```dart
class Point {
  num x, y;
  Point(this.x, this.y);  // 这里的写法跟下面的写法等效
  // 不推荐这种写法
  Point(num x, num y) {
    this.x = x;
    this.y = y;
  }

  // 可以定义多个 named constructor，这个玩法有点特殊了
  // 这种 命名构造函数 的使用方式使得类的实例化过程语义更清晰
  Point.origin() {
    x = 0;
    y = 0;
  }
}
```

继承的写法

```dart
class Person {
  String name;
  Person() {
    print('in Person ${this.name}');
  }
}

class Employee extends Person {
  String name;
  // 这里的 this.name 被称为 initializer，会先用 super 和 函数体执行
  Employee(this.name) : super() {  // 调用 super() 的写法
    // ...
  };  
}

main() {
  var emp = new Employee('gavin');  // 打印 in Person gavin
}
```

Initializer list

```dart
class Person {
  String name;
  int age;
  Person ({@required String name, int age = 33}) {  // @required 非 Dart 内置，但 Flutter 下常用
    this.name = name;
    this.age = age;
  }
  // 上面的构造函数可以简化成
  Person({this.name, this.age = 33});
}
```

```dart
// Initializer list sets instance variables before the constructor body runs.
Point.fromJson(Map<String, num> json)
    : x = json['x'],
      y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');
}

// 在开发环境下还可以校验输入，玩法多多
Point.withAssert(this.x, this.y) : assert(x >= 0) {
  print('In Point.withAssert(): ($x, $y)');
}
```

构造函数间相互调用

```dart
class Point {
  num x, y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(num x) : this(x, 0);
}
```

Use the `factory` keyword when implementing a constructor that doesn’t always create a new instance of its class. For example, a factory constructor might return an instance from a cache, or it might return an instance of a subtype.

```dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to the _ in front of its name.
  static final Map<String, Logger> _cache = <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(name, () => Logger._internal(name));
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
```

### Methods

Instance methods on objects can access instance variables and `this`.

```dart
import 'dart:math';

class Point {
  num x, y;

  Point(this.x, this.y);

  num distanceTo(Point other) {
    var dx = x - other.x;        // 引用 x 不需要带 this
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}
```

Getters and setters

```dart
class Rectangle {
  num left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  num get right => left + width;
  set right(num value) => left = value - width;
  num get bottom => top + height;
  set bottom(num value) => top = value - height;
}
```

Abstract methods can only exist in abstract classes.

### 抽象类

Abstract classes are useful for defining interfaces, often with some implementation.

```dart
abstract class Doer {
  // Define instance variables and methods...

  void doSomething(); // Define an abstract method.
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // Provide an implementation, so the method is not abstract here...
  }
}
```

Every class implicitly defines an interface containing all the instance members of the class and of any interfaces it implements.

```dart
class Person {}
class Impostor implements Person, AnotherInterface {}
```

### 继承

覆写一个类成员时加上 `@override` 可使得代码意图更加明确。

多数操作符也是可覆写的。

```dart
class Vector {
  final int x, y;

  Vector(this.x, this.y);

  Vector operator +(Vector v) => Vector(x + v.x, y + v.y);
  Vector operator -(Vector v) => Vector(x - v.x, y - v.y);
}
```

### Enumerated types

Enumerated types, often called enumerations or enums, are a special kind of class used to represent a fixed number of constant values.

```dart
enum Color { red, green, blue }

assert(Color.red.index == 0);
assert(Color.green.index == 1);
assert(Color.blue.index == 2);

List<Color> colors = Color.values;
assert(colors[2] == Color.blue);
```

### mixins

使用 `with` 来添加 **混入(mixins)**

```dart
class Maestro extends Person with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```

To implement a mixin, create a class that extends Object and declares no constructors. Unless you want your mixin to be usable as a regular class, use the mixin keyword instead of class.

```dart
mixin Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
```

To specify that only certain types can use the mixin, use `on` to specify the required superclass:

```dart
mixin MusicalPerformer on Musician {
  // ···
}
```


## Generics

正常函数都能接受传参数，传参传递的是参数的值，而参数的类型往往在定义函数时就写死了，有没有办法在调用的时候同时传递参数的类型呢，这就是泛型干的事。

```dart
var names = List<String>();  // read as “list of string”
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // Error
```

泛型一般用一个大写字母表示，如 `T` type `K` keyType `V` valueType `E` `S`

List Set Map 等的字面量可以添加类型约束，如

```dart
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};
```

Using parameterized types with constructors

```dart
var views = Map<int, View>();
```

Dart generic types are reified, which means that they carry their type information around at runtime.

```dart
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
print(names is List<String>); // true
```

Restricting the parameterized type

```dart
class Foo<T extends SomeBaseClass> {  // 传递的 T 只能是 SomeBaseClass 的子类
  // Implementation goes here...
  String toString() => "Instance of 'Foo<$T>'";
}
```

Using generic methods

```dart
T first<T>(List<T> ts) {
  // Do some initial work or error checking, then...
  T tmp = ts[0];
  // Do some additional checking or processing...
  return tmp;
}
```


## Libraries

```dart
import 'dart:html';               // 引用内部模块
import 'package:test/test.dart';  // 倒入外部包
```

当导入的多个包之间出现标识符冲突时，可以添加 library prefix

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// Uses Element from lib1.
Element element1 = Element();

// Uses Element from lib2.
lib2.Element element2 = lib2.Element();
```

导入一个库中的部分资源

```dart
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

Lazily loading a library (只有 dart2js 支持，Flutter 不支持)

```dart
import 'package:greetings/hello.dart' deferred as hello;
```


## Asynchrony support

Dart libraries are full of functions that return **Future** or **Stream** objects. These functions are asynchronous: they return after setting up a possibly time-consuming operation (such as I/O), without waiting for that operation to complete.

```dart
Future<String> lookUpVersion() async => '1.0.0';
```


## 其他

### Callable classes

To allow an instance of your Dart class to be called like a function, implement the `call()` method.

```dart
class WannabeFunction {
  call(String a, String b, String c) => '$a $b $c!';
}

main() {
  var wf = new WannabeFunction();
  var out = wf("Hi","there,","gang");
  print('$out');
}
```

### Typedefs

```dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}
```

### Metadata

Use metadata to give additional information about your code. A metadata annotation begins with the character @, followed by either a reference to a compile-time constant (such as deprecated) or a call to a constant constructor.

Two annotations are available to all Dart code: @deprecated and @override. For examples of using @override, see Extending a class. Here’s an example of using the @deprecated annotation:

Metadata can appear before a library, class, typedef, type parameter, constructor, factory, function, field, parameter, or variable declaration and before an import or export directive. You can retrieve metadata at runtime using reflection.
