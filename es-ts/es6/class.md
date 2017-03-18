# 类 Classes

## 基本语法

JavaScript 语言的传统方法是通过构造函数，定义并生成新对象。ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过 `class` 关键字，可以定义类。基本上，ES6的 `class` 可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```js
class Point {
  constructor(x, y) {  // 构造方法，对应 ES5 构造函数
    this.x = x;
    this.y = y;
  }
  toString() {  // 方法前没有 function 关键字；方法间也不用 , 分隔
    return '(' + this.x + ', ' + this.y + ')';
  }
}

typeof Point  // 类的数据类型就是函数，类本身就指向构造函数
Point === Point.prototype.constructor // true
```

类的数据类型就是函数，类本身就指向构造函数。使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。

构造函数的 `prototype` 属性在类上面继续存在。事实上，类的所有方法都定义在类的 `prototype` 属性上面。`Object.assign` 方法可以很方便地一次向类添加多个方法。

```js
Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

### 类与自定义类型的区别

尽管ES6中的 classes 与ES5中的 custom types 很相似，但还是有一些重要的不同点：

* 类声明不同于函数声明，不存在变量提升，就跟 let 一样。主要原因是如果类存在提升，继承时子类定义可能跑到（用 let 表达式定义的）父类前面。
* 类和模块的内部，只有默认的严格模式可用。考虑到未来所有代码都将运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。
* 类内部定义的方法，都是不可枚举的，而 ES5 中 custom type 中的方法是可枚举的。
* 所有方法都没有 internal [[Construct]] 方法，使用 new 调用方法将抛出错误。而普通函数是可以用 new 调用的。
* 类的构造函数，不使用 new 直接调用会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以执行。
* Attempting to overwrite the class name within a class method throws an error.

```js
// 把前面的 Point 类用自定义类型的方法重写一遍，揭示了类与普通自定义类型的区别
let Point = (function(){
  "use strict";
  const Point = function(x, y){  // 在类定义内部，无法覆盖类名，但在类定义外面是可以的
    // make sure the function was called with new
    if (typeof new.target === "undefined") {
        throw new Error("Constructor must be called with new.");
    }
    this.x = x;
    this.y = y;
  }

  Object.defineProperty(Point.prototype, "toString", {
    value: function() {
      // make sure the method wasn't called with new
      if (typeof new.target !== "undefined") {
        throw new Error("Method cannot be called with new.");
      }
      return '(' + this.x + ', ' + this.y + ')';
    },
    enumerable: false,
    writable: true,
    configurable: true
  });

  return Point;
}());
```

### constructor 方法

constructor方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。constructor方法默认返回实例对象（即this）。

### 类的实例对象

与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

可以通过实例的 `__proto__` 属性为 Class 添加方法，但不推荐，因为这会改变 Class 的原始定义，影响到所有实例。

### Class 表达式

与函数一样，Class也可以使用表达式的形式定义。


## Class 的继承

### 基本用法

Class 之间可以通过 `extends` 关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)，这步不能省，省了拿不到 this，会报错
    this.color = color;
  }
  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

上面代码中，constructor 方法和 toString 方法之中，都出现了 `super` 关键字，它在这里表示父类的构造函数，用来新建父类的 `this` 对象。子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工，如果不调用 super 方法，子类就得不到 this 对象。

另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。

如果子类声明省略了 constructor 那么系统会默认添加（super 也会被默认调用），不会报错。

### Extends 的继承目标

只要是拥有 [[Construct]] and a prototype 的类型都能成为被继承对象。

### 原生构造函数的继承

ES5中子类无法获得原生构造函数的内部属性，通过`Array.apply()`或者分配给原型对象都不行。ES5是先新建子类的实例对象`this`，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。

ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象`this`，然后再用子类的构造函数修饰`this`，使得父类的所有行为都可以继承。

### Object.getPrototypeOf()

`Object.getPrototypeOf`方法可以用来从子类上获取父类。因此，可以使用这个方法判断，一个类是否继承了另一个类。

```javascript
Object.getPrototypeOf(ColorPoint) === Point  // true
```

### super 关键字

`super`这个关键字，有两种用法，含义不同。

（1）作为函数调用时（即`super(...args)`），`super`代表父类的构造函数。

（2）作为对象调用时（即`super.prop`或`super.method()`），`super`代表父类。注意，此时`super`即可以引用父类实例的属性和方法，也可以引用父类的静态方法。

由于，对象总是继承其他对象的，所以可以在任意一个对象中，使用`super`关键字。

```javascript
var obj = { toString() { return "MyObject: " + super.toString(); } };  // 在普通对象内也可以使用 super
obj.toString(); // MyObject: [object Object]
```

## Class的取值函数（getter）和存值函数（setter）

与ES5一样，在Class内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class MyClass {
  constructor() { ... }
  get prop() { return 'getter'; }
  set prop(value) { console.log('setter: '+value); }
}
let inst = new MyClass();
inst.prop = 123;  // setter: 123
inst.prop         // 'getter'
```

上面代码中，`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。   存值函数和取值函数是设置在属性的descriptor对象上的。

## Class的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```javascript
class Foo {
  static classMethod() { return 'hello'; }
}
Foo.classMethod()  // 'hello'

// 父类的静态方法，可以被子类继承
class Bar extends Foo {}
Bar.classMethod(); // 'hello'

// 静态方法也是可以从`super`对象上调用
class Bar extends Foo {
  static classMethod() { return super.classMethod() + ', too'; }
}
```

### 静态属性和实例属性

ES6明确规定，Class内部只有静态方法，没有静态属性，但可以在构造函数对象上添加属性实现静态属性的效果。

```javascript
class Foo { }
Foo.prop = 1;
```

## new.target 属性

`new`是从构造函数生成实例的命令。ES6为`new`命令引入了一个`new.target`属性，（在构造函数中）返回`new`命令作用于的那个构造函数。如果构造函数不是通过`new`命令调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。注意，在函数外部，使用`new.target`会报错。

利用 new.target 可以写出不能独立使用、必须继承后才能使用的类。

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) { throw new Error('本类不能实例化'); }
  }
}
```

## Summary

ECMAScript 6 classes make inheritance in JavaScript easier to use, so you don't need to throw away any existing understanding of inheritance you might have from other languages. ECMAScript 6 classes start out as syntactic sugar for the classical inheritance model of ECMAScript 5, but add a lot of features to reduce mistakes.

ECMAScript 6 classes work with prototypal inheritance by defining non-static methods on the class prototype, while static methods end up on the constructor itself. All methods are non-enumerable, a feature that better matches the behavior of built-in objects for which methods are typically non-enumerable by default. Additionally, class constructors can't be called without `new`, ensuring that you can't accidentally call a class as a function.

Class-based inheritance allows you to derive a class from another class, function, or expression. This ability means you can call a function to determine the correct base to inherit from, allowing you to use mixins and other different composition patterns to create a new class. Inheritance works in such a way that inheriting from built-in objects like `Array` is now possible and works as expected.

You can use `new.target` in class constructors to behave differently depending on how the class is called. The most common use is to create an abstract base class that throws an error when instantiated directly but still allows inheritance via other classes.

Overall, classes are an important addition to JavaScript. They provide a more concise syntax and better functionality for defining custom object types in a safe, consistent manner.
