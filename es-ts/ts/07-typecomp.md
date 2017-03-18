# 类型兼容性

## 结构性子类型 structural subtyping

TypeScript 里的类型兼容性是基于结构性子类型。结构类型是一种只使用其成员来描述类型的方式，它与名义（nominal）类型形成对比。

```ts
interface Named { name: string; }
class Person { name: string; }

let p: Named;
p = new Person();  // OK, because of structural typing
                   // 在使用基于名义类型的语言，比如 C# 或 Java 中，这段代码就会报错
```

TypeScript 的结构性子类型是根据 JavaScript 代码的典型写法来设计的。因为 JavaScript 里广泛地使用匿名对象，例如函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好。

### 关于可靠性的注意事项

TypeScript的类型系统允许某些在编译阶段无法确认其安全性的操作。当一个类型系统具此属性时，被当做是“不可靠”的。通过这篇文章，我们会解释什么时候会发生这种情况和其有利的一面。

## 部分检查

TypeScript 结构化类型系统的基本规则是，如果 x 要兼容 y，那么 y 至少具有与 x 相同的属性。

```ts
interface Named { name: string; }

let x: Named;
let y = { name: 'Alice', location: 'Seattle' };  // 推断类型 { name: string; location: string; }
function greet(n: Named) { alert('Hello, ' + n.name); }
x = y;     // OK
greet(y);  // OK
```

这里要检查 y 是否能赋值给 x，编译器检查 x 中的每个属性，看是否能在y中也找到对应属性。在这个例子中，y 必须包含名字是 name 的 string 类型成员。y满足条件，因此赋值正确。注意，y 有个额外的 location 属性，但这不会引发错误。只有目标类型（这里是 Named）的成员会被一一检查是否兼容。这个比较过程是递归进行的，检查每个成员及子成员。

## 比较两个函数

相对来讲，在比较原始类型和对象类型的时候是比较容易理解的，问题是如何判断两个函数是兼容的。

```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

要查看 x 是否能赋值给 y，首先看它们的参数列表。x 的每个参数必须能在 y 里找到对应类型的参数。注意的是参数的名字相同与否无所谓，只看它们的类型。这里，x 的每个参数在 y 中都能找到对应的参数，所以允许赋值。

第二个赋值错误，因为 y 有个必需的第二个参数，但是 x 并没有，所以不允许赋值。

你可能会疑惑为什么允许忽略参数，像例子 y = x 中那样。原因是忽略额外的参数在 JavaScript 里是很常见的。

下面来看看如何处理返回值类型，创建两个仅是返回值类型不同的函数：

```ts
let x = () => ({name: 'Alice'});
let y = () => ({name: 'Alice', location: 'Seattle'});

x = y; // OK
y = x; // Error because x() lacks a location property
```

类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型。

### 函数参数双向协变

看不懂先跳过

### 可选参数及剩余参数

比较函数兼容性的时候，原类型上额外的可选参数并不会造成错误，目标类型的可选参数没有对应的参数也不是错误。

当一个函数有剩余参数时，它被当做无限个可选参数。

这对于类型系统来说是不稳定的，但从运行时的角度来看，可选参数一般来说是不强制的，因为对于大多数函数来说相当于传递了一些 undefinded。

### 函数重载

对于有重载的函数，源函数的每个重载都要在目标函数上找到对应的函数签名。这确保了目标函数可以在所有源函数可调用的地方调用。

## 枚举

枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的。

## 类

类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。比较两个类类型的对象时，只有实例的成员会被比较。静态成员和构造函数不在比较的范围内。

```ts
class Animal {
  feet: number;
  constructor(name: string, numFeet: number) { }
}

class Size {
  feet: number;
  constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  //OK
s = a;  //OK
```

### 类的私有成员

私有成员会影响兼容性判断。当类的实例用来检查兼容时，如果它包含一个私有成员，那么目标类型必须包含来自同一个类的这个私有成员。这允许子类赋值给父类，但是不能赋值给其它有同样类型的类。

## 泛型

```ts
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // okay, y matches structure of x

interface NotEmpty<T> {
  data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // error, x and y are not compatible
```

## 子类型与赋值

看不懂先跳过
