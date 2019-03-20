# Decorators 修饰器

## 介绍

随着 TypeScript 和 ES6 里引入了类，在一些场景下我们需要额外的特性来支持标注或修改类及类成员。  
Decorators 提供了一种在类声明及类成员上使用元编程语法 meta-programming syntax 添加标注的方式。

修饰器目前处在[建议征集的第二阶段](https://github.com/tc39/proposal-decorators)，TypeScript 以实验性特性的形式提供了支持。  
若要启用实验性的修饰器特性，你必须在命令行或 `tsconfig.json` 里启用 `experimentalDecorators` 编译器选项。

## 修饰器

修饰器是一种特殊类型的声明，用于在开发的时候注解和修改 class、accessor、method、property 或 parameter。

```ts
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol,
    parameterIndex: number) => void;
```

修饰器使用 `@expression` 这种形式，`expression`求值后必须为一个函数，它会在运行时被调用。

## <a name="decorator-factories"></a>修饰器工厂函数

如果要对修饰器应用到声明上的具体方式进行定制的话，我们得写一个修饰器工厂函数。  
修饰器工厂就是一个简单的函数，它返回一个表达式，以供修饰器在运行时调用。

```ts
function color(value: string) {  // 这是一个修饰器工厂函数
  return function (target) {     // 返回一个修饰器
    // do something with "target" and "value"...
  }
}
```

## 修饰器组合

多个修饰器可以同时应用到一个声明上，就像下面的示例：

```ts
// 可以写在同一行，修饰器位于左侧
@f @g x

// 也可以采用多行的形式
@f
@g
x
```

在 TypeScript 里，当多个修饰器应用在一个声明上时会进行如下步骤的操作：

1. 由上至下依次对修饰器表达式求值。
2. 求值的结果会被当作函数，由下至上依次调用。

## 修饰器求值

类中不同声明上的修饰器将按以下顺序应用：

1. 参数修饰器，(方法，访问符)修饰器，属性修饰器 应用到每个 实例成员(修改 prototype)。
2. 参数修饰器，(方法，访问符)修饰器，属性修饰器 应用到每个 静态成员(修改 constructor)。
3. 参数修饰器 应用到构造函数。
4. 类修饰器 应用到类。

## <a name="class-decorators"></a>类修饰器

类修饰器 在类声明之前被声明(紧靠着类声明)。  
类修饰器 应用于类构造函数，可以用来监视，修改或替换类定义。  
类修饰器 不能用在声明文件中(`.d.ts`)，也不能用在任何外部上下文中（比如 `declare` 的类）。

类修饰器表达式会在运行时当作函数被调用，类的构造函数是其唯一的参数。

```ts
@sealed
class Greeter {
  // ...
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
```

## <a name="method-decorators"></a>方法修饰器

方法修饰器 声明在一个方法声明之前（紧靠着方法声明）。  
它会被应用到方法的 属性描述符 上，可以用来监视，修改或者替换方法定义。  
方法修饰器不能用在声明文件(`.d.ts`)，重载或者任何外部上下文（比如 `declare` 的类）中。  

方法修饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. target 对于静态成员来说是类的构造函数，对于实例成员则是类的原型对象。
2. key 成员的名字。
3. descriptor 成员的属性描述符。

如果方法修饰器返回一个值，它会被用作方法的属性描述符。

下面是一个方法修饰器（`@enumerable`）的例子，应用于 `Greeter` 类的方法上：

```ts
class Greeter {
  greeting: string;
  constructor(message: string) { this.greeting = message; }

  @enumerable(false)
  greet() { return "Hello, " + this.greeting; }
}
```

我们可以用下面的函数声明来定义`@enumerable`修饰器：

```ts
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}
```

这里的 `@enumerable(false)` 是一个[修饰器工厂函数](#decorator-factories)。  
当修饰器 `@enumerable(false)` 被调用时，它会修改属性描述符的 `enumerable` 属性。

## <a name="accessor-decorators"></a>访问器修饰器

访问器修饰器 声明在一个访问器的声明之前（紧靠着访问器声明）。  
访问器修饰器 应用于访问器的 属性描述符 并且可以用来监视，修改或替换一个访问器的定义。  
访问器修饰器 不能用在声明文件中（.d.ts），或者任何外部上下文（比如`declare`的类）里。

> 注意 TypeScript 不允许同时装饰一个成员的 `get` 和 `set`访问器。只需在第一个访问器上添加修饰器即可。这是因为，在修饰器应用于一个 属性描述符 时，它联合了 `get` 和 `set` 访问器，而不是分开声明的。

访问器修饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的 属性描述符。

如果访问器修饰器返回一个值，它会被用作方法的 属性描述符。

## <a name="property-decorators"></a>属性修饰器

属性修饰器 声明在一个属性声明之前（紧靠着属性声明）。  
属性修饰器 不能用在声明文件中（.d.ts），或者任何外部上下文（比如`declare`的类）里。

属性修饰器表达式会在运行时当作函数被调用，传入下列2个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。

> 注意：属性描述符 不会做为参数传入属性修饰器，这与 TypeScript 是如何初始化属性修饰器的有关。
因为目前没有办法在定义一个原型对象的成员时描述一个实例属性，并且没办法监视或修改一个属性的初始化方法。
因此，属性描述符只能用来监视类中是否声明了某个名字的属性。

如果属性修饰器返回一个值，它会被用作方法的属性描述符。

我们可以用它来记录这个属性的元数据，如下例所示：

```ts
class Greeter {
  @format("Hello, %s")
  greeting: string;

  constructor(message: string) { this.greeting = message; }

  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}
```

然后定义 `@format` 修饰器和 `getFormat` 函数：

```ts
import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
```

这个 `@format("Hello, %s")` 修饰器是个 [修饰器工厂函数](#decorator-factories)。  
调用 `@format("Hello, %s")` 时，它给被修饰属性添加了一条元数据，通过 `reflect-metadata` 库的 `Reflect.metadata` 函数。  
当 `getFormat` 被调用时，它读取格式的元数据。

> 注意：这个例子需要使用 `reflect-metadata` 库。

## <a name="parameter-decorators"></a>参数修饰器

参数修饰器 声明在一个参数声明之前（紧靠着参数声明）。  
参数修饰器 应用于类构造函数或方法声明。  
参数修饰器 不能用在声明文件（.d.ts），重载或其它外部上下文（比如`declare`的类）里。

参数修饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。

> 注意：参数修饰器只能用来监视一个方法的参数是否被传入。

参数修饰器的返回值会被忽略。

下例定义了参数修饰器（`@required`）并应用于 `Greeter` 类方法的一个参数：

```ts
class Greeter {
  greeting: string;

  constructor(message: string) { this.greeting = message; }

  @validate
  greet(@required name: string) {
    return "Hello " + name + ", " + this.greeting;
  }
}
```

然后我们使用下面的函数定义 `@required` 和 `@validate` 修饰器：

```ts
import "reflect-metadata";
const requiredMetadataKey = Symbol("required");
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
```

`@required` 修饰器添加了元数据实体把参数标记为必需的。  
`@validate` 修饰器把 `greet` 方法包裹在一个函数里在调用原先的函数前验证函数参数。（代码太长被我删了）

## 元数据

一些例子使用了 `reflect-metadata` 库来支持[实验性的metadata API](https://github.com/rbuckton/ReflectDecorators)。
这个库还不是 ECMAScript 标准的一部分。然而，当修饰器被官方标准采纳后，这些扩展也将被推荐给 ECMAScript。

你可以通过npm安装这个库：

```shell
npm i reflect-metadata --save
```

TypeScript 支持为带有修饰器的声明生成元数据。你需要在命令行或 `tsconfig.json` 里启用 `emitDecoratorMetadata` 编译器选项。

### 文档摘要

#### 语法 Syntax

Declarative definition of metadata:

```ts
class C {
  @Reflect.metadata(metadataKey, metadataValue)
  method() {  }
}
```

Imperative definition of metadata:

```ts
Reflect.defineMetadata(metadataKey, metadataValue, C.prototype, "method");
```

Imperative introspection of metadata:

```ts
let obj = new C();
let metadataValue = Reflect.getMetadata(metadataKey, obj, "method");
```

#### Semantics

* Object has a new \[\[Metadata\]\] internal property that will contain a Map whose keys are property keys (or **undefined**) and whose values are Maps of metadata keys to metadata values.
* Object will have a number of new internal methods for \[\[DefineOwnMetadata\]\], \[\[GetOwnMetadata\]\], \[\[HasOwnMetadata\]\], etc.
  * These internal methods can be overridden by a Proxy to support additional traps.
  * These internal methods will by default call a set of abstract operations to define and read metadata.
* The Reflect object will expose the MOP operations to allow imperative access to metadata.
* Metadata defined on class declaration *C* is stored in *C*.\[\[Metadata\]\], with **undefined** as the key.
* Metadata defined on static members of class declaration *C* are stored in *C*.\[\[Metadata\]\], with the property key as the key.
* Metadata defined on instance members of class declaration *C* are stored in *C*.prototype.\[\[Metadata\]\], with the property key as the key.

#### API

```ts
// define metadata on an object or property
Reflect.defineMetadata(metadataKey, metadataValue, target);
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);

// check for presence of a metadata key on the prototype chain of an object or property
let result = Reflect.hasMetadata(metadataKey, target);
let result = Reflect.hasMetadata(metadataKey, target, propertyKey);

// check for presence of an own metadata key of an object or property
let result = Reflect.hasOwnMetadata(metadataKey, target);
let result = Reflect.hasOwnMetadata(metadataKey, target, propertyKey);

// get metadata value of a metadata key on the prototype chain of an object or property
let result = Reflect.getMetadata(metadataKey, target);
let result = Reflect.getMetadata(metadataKey, target, propertyKey);

// get metadata value of an own metadata key of an object or property
let result = Reflect.getOwnMetadata(metadataKey, target);
let result = Reflect.getOwnMetadata(metadataKey, target, propertyKey);

// get all metadata keys on the prototype chain of an object or property
let result = Reflect.getMetadataKeys(target);
let result = Reflect.getMetadataKeys(target, propertyKey);

// get all own metadata keys of an object or property
let result = Reflect.getOwnMetadataKeys(target);
let result = Reflect.getOwnMetadataKeys(target, propertyKey);

// delete metadata from an object or property
let result = Reflect.deleteMetadata(metadataKey, target);
let result = Reflect.deleteMetadata(metadataKey, target, propertyKey);

// apply metadata via a decorator to a constructor
@Reflect.metadata(metadataKey, metadataValue)
class C {
  // apply metadata via a decorator to a method (property)
  @Reflect.metadata(metadataKey, metadataValue)
  method() {  }
}
```

### 设计键 Design Key

http://www.tuicool.com/articles/Nfeui2R

```ts
__decorate([
  Reflect.metadata('key', value),
  __metadata('design:type', Function),     // 类型
  __metadata('design:paramtypes', []),     // 参数类型
  __metadata('design:returntype', String)  // 返回值类型
], obj, method, null);
```

如上代码所示，库默认提供了三个设计键来提供设计时的相关元数据信息，以下是应用示例：

#### 获取类型

```ts
// 声明属性装饰器
function logType(target: any, key: string) {
  var t = Reflect.getMetadata("design:type", target, key);
  console.log(`${key} type: ${t.name}`);
}

// 将装饰器应用到类的一个属性上来获取它的类型
class Demo{
  @logType  // apply property decorator
  public attr1: string;
}

// 最后会在控制台输出: attr1 type: String
```

#### 获取参数类型

让我们声明如下的参数装饰器 :

```ts
function logParamTypes(target : any, key : string) {
  var types = Reflect.getMetadata("design:paramtypes", target, key);
  var s = types.map(a => a.name).join();
  console.log(`${key} param types: ${s}`);
}

class Foo {}
interface IFoo {}

class Demo{
  @logParameters  // apply parameter decorator
  doSomething(
    param1: string,
    param2: number,
    param3: Foo,
    param4: { test : string },
    param5: IFoo,
    param6: Function,
    param7: (a : number) => void,
  ): number { return 1 }
}

// 最后会在控制台输出:
doSomething param types: String, Number, Foo, Object, Object, Function, Function
```

#### 获取返回类型

```ts
Reflect.getMetadata("design:returntype", target, key);
```
