# ES6 简介

《JavaScript 高级程序设计》 P701

## A1 一般性变化

常量 与 `const`

块级作用域 与 `let`

## A2 函数

### A2.1 剩余参数与扩展运算符

ES6 中胖箭头函数中没有 `arguments` 对象，因此也就无法通过它来读取到未声明的参数。
不过，使用剩余参数(rest arugments)语法，也能表示你期待给函数传入可变数量的参数。

扩展运算符(spread) 好比是 rest参数 的逆运算，将一个数组转为用逗号分隔的参数序列。该运算符主要用于函数调用。

```js
function sum(num1, num2, ...nums) {        // rest 参数
  let result = num1 + num2;
  nums.forEach( (num) => result += num );
  return result;
}

let arr = [1, 3, 5, 7];
sum(...arr);                               // 扩展运算符主要用于函数调用
```

### A2.2 默认参数

```js
function sum(num1, num2 = 0) {
  return num1 + num2;
}
```

使用默认参数的好处是开发人员不用再去检查是否有给某个参数传入值了。

### A2.3 生成器

```js
function *numbers() {            // 在 `function` 关键字与函数名之间有一个 `*`
  for (let i = 0; i < 10; i++) {
    yield i * 2;
  }
}
```

在需要一系列值，而每个值又与前一个值存在某种关系的情况下，可以使用生成器。

## A3 数组及其他结构

### A3.1 遍历器

```js
let person = { name: "Nicholas", age: 29 };
let iterator = new Iterator(person);
try {
  while(true) {  // 最新的应该采用 for-of 写法
    let value = iterator.next();
    document.write(value.join(":") + "<br>");
  }
} catch(ex) {  }
```

具体先跳过，内容过时了

### A3.2 数组领悟 array comprehensions

### A3.3 解构赋值

```js
let [name, value] = ["color", "red"];  // 解构赋值
console.log(name, ": ", value);

[value2, value1] = [value1, value2];   // 利用解构赋值交换变量的值

// 解构赋值同样适用于对象，本例展示了 1 变量名不同于属性名 2 简写 3 默认值 这3种用法
let person = { name: "Nicholas", age: 29 };
let { name: personName, age, gender = "male" } = person;  // 变量名可以不同于属性名
console.log(personName, age, gender);                     // name: name -> name: personName
```

## A4 新对象类型

### A4.1 代理对象

代理 proxy  
捕捉器 trap  
派生捕捉器 derived trap

### A4.2 代理函数

### A4.3 映射与集合

Map 可以简单理解为 关联数组，而 Set 则可以简单理解为没有重复的简单数组。

Map 类型，也称为简单映射，只有一个目的：保存一组键值对。  
简单映射的基本 API 包括 get() set() 和 delete(), 每个方法的作用看名字就知道了。  
键可以是原始值，也可以是引用值。

Set 类型，即集合，只包含键，没有值。  
添加元素用 add(); 检查元素是否存在用 has(); 删除元素用 delete()。

### A4.4 WeakMap 与 WeakSet

WeakMap 的键必须是对象，而在对象已经不存在时，相关的键值对就会从 WeakMap 中被删除。

### A4.5 StructType

JavaScript 一个最大的不足是使用一种数据类型表示所有数值，为解决这个问题，ES6 引入了类型化结构，为这门语言带来了更多的数值数据类型。如：

uint8 无符号8位整数；int8 uint16 int16 uint32 int32 float32 float64 等

### A4.6 ArrayType

与结构类型密切相关的是数组类型。通过数组类型可以创建一个数组，并限制数组的值必须是某种特定的类型。

## A5 类

ES6 中的类只是一种语法糖，覆盖在目前基于构造函数和基于原型的方式和类型之上。

```js
class Person {
  constructor(name, age) {
    public name = name;
    public age  = age;
  }

  sayName() { alert(this.name); }
  getOlder(years) { this.age += years; }
}
```

新语法以关键字 `class` 开头，然后就是类型名，而花括号中定义的是属性和方法。定义方法不必再使用 `function` 关键字，有方法名和圆括号就可以。

如果把方法命名为 constructor，那它就是这个类的构造函数。

在类中定义的方法和属性都会添加到原型上，具体来说，sayName() 和 getOlder() 都是在 Person.prototype 上定义的。

在构造函数中，`public` 和 `private` 关键字用于创建对象的实例属性。这个例子中的 name 和 age 都是公用属性。

### A5.1 私有成员

### A5.2 getter 和 setter

```js
class MyClass {
  get prop() { return 'getter'; }
  set prop(value) { console.log('setter: '+value); }
}

let inst = new MyClass();
inst.prop = 123;  // setter: 123
inst.prop;        // 'getter'
```

### A5.3 继承

使用类语法最大的好处是容易实现继承：只要使用 `extends` 关键字就能实现继承，而不必去考虑借用构造函数或原型连缀。

```js
class Employee extends Person {
  constructor(name, age) {
    super(name, age);
  }
}

// 上面的代码等价于下面的代码
function Employee(name, age) {
  Person.call(this, name, age);
}

Employee.prototype = new Person();
```

## A6 模块

模块(或者“命名空间”、“包”)是组织 JavaScript 应用代码的重要方法。每个模块都包含着独立于其他模式的特定、独一无二的功能。JavaScript 开发中曾出现过一些临时性的模块格式，而 ES6 则对如何创建和管理模块给出了标准的定义。

模块在其自己的顶级执行环境中运行，因而不会污染导入它的全局执行环境。默认情况下，模块中声明的所有变量、函数、类等都是该模块私有的。对于应该向外部公开的成员，可以在前面加上 `export` 关键字。

要使用其他模块，需要使用 `import` 命令先导入模块。当然，在执行环境能够访问到模块的情况下，也可以直接调用模块中对外公开的成员。

```js
import myobject form MyModule;  // 只导入模块的一个成员
import * from MyModule;         // 导入模块的所有公开成员
import {myobject, hello} from MyModule;  // 列出要导入的成员名
let myobject = MyModule.myobject;        // 在能可访问到模块的情况下，也可以直接调用模块中的公开方法
```

### 外部模块

通过提供模块所在的外部文件的 URL，也可以动态加载和导入模块。  
注意，导入外部模块会阻塞进程，换句话说，JavaScript 引擎在下载完外部文件并对其求值之前，不会处理后面的代码。

总之，模块就是一种组织相关功能的手段，而且能够保护全局作用域不受污染。
