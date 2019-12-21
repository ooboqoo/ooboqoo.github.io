# Effective Dart


## Overview

*Be consistent! Be brief!*

To keep the guidelines brief, we use a few shorthand terms to refer to different Dart constructs.

A **library member** is a top-level field, getter, setter, or function. Basically, anything at the top level that isn’t a type.  
A **class member** is a constructor, field, getter, setter, function, or operator declared inside a class. Class members can be instance or static, abstract or concrete.  
A **member** is either a library member or a class member.  
A **variable**, when used generally, refers to top-level variables, parameters, and local variables. It doesn’t include static or instance fields.  
A **type** is any named type declaration: a class, typedef, or enum.  
A **property** is a top-level variable, getter (inside a class or at the top level, instance or static), setter (same), or field (instance or static). Roughly any “field-like” named construct.


## Style

### Identifiers

* DO name types using UpperCamelCase.
* DO name extensions using UpperCamelCase.
* DO name libraries, packages, directories, and source files using lowercase_with_underscores.
* DO name import prefixes using lowercase_with_underscores.
* DO name other identifiers using lowerCamelCase.
* PREFER using lowerCamelCase for constant names. You may use SCREAMING_CAPS for consistency with existing code. ⭐️
* DO capitalize acronyms and abbreviations longer than two letters like words.
* DON’T use a leading underscore for identifiers that aren’t private. Exception: unused param can be named `_`.
* DON’T use prefix letters. 编译器和IDE都在进化，没必要加前缀了

```dart
class HttpRequest { /* ... */ }
typedef Predicate<T> = bool Function(T value);
extension MyFancyList<T> on List<T> { ... }

library peg_parser.source_scanner;
import 'file_system.dart';
import 'dart:math' as math;
import 'package:angular_components/angular_components' as angular_components;

const pi = 3.14;  // 以前习惯用 PI，现在编译器可以清楚地告诉你这是常量，所以不用通过名字特别强调了
const defaultTimeout = 1000;
final urlScheme = RegExp('^([a-z]+):');
```

```txt
// good               bad
HttpConnectionInfo    HTTPConnection
uiHandler             UiHandler
IOStream              IoStream
HttpRequest           HTTPRequest
Id                    ID
DB                    Db
```

### Ordering

* DO place `dart:` imports before other imports.
* DO place `package:` imports before relative imports.
* PREFER placing external `package:` imports before other imports.
* DO specify exports in a separate section after all imports.
* DO sort sections alphabetically.

### Formatting

* DO format your code using dartfmt.
* CONSIDER changing your code to make it more formatter-friendly.
* AVOID lines longer than 80 characters. Exception: URI, file path, multi-line strings.
* DO use curly braces for all flow control statements.

```dart
if (arg == null) return defaultValue;
if (overflowChars != other.overflowChars) {
  return overflowChars < other.overflowChars;
}
// bad
if (overflowChars != other.overflowChars)
  return overflowChars < other.overflowChars;
```

## Documentation

### Comments

* DO format comments like sentences.
* DON’T use block comments for documentation.

### Doc comments

* DO use `///` doc comments to document members and types.
* PREFER writing doc comments for public APIs.
* CONSIDER writing a library-level doc comment.
* CONSIDER writing doc comments for private APIs.
* DO start doc comments with a single-sentence summary.
* DO separate the first sentence of a doc comment into its own paragraph.
* AVOID redundancy with the surrounding context.
* PREFER starting function or method comments with third-person verbs.
* PREFER starting variable, getter, or setter comments with noun phrases.
* PREFER starting library or type comments with noun phrases.
* CONSIDER including code samples in doc comments.
* DO use square brackets in doc comments to refer to in-scope identifiers. ⭐️
* DO use prose to explain parameters, return values, and exceptions.
* DO put doc comments before metadata annotations.

```dart
/// Deletes the file at [path].
///
/// Throws an [IOError] if the file could not be found. Throws a
/// [PermissionError] if the file is present but could not be deleted.
void delete(String path) {
  ...
}

/// The current day of the week, where `0` is Sunday.
int weekday;

/// A chunk of non-breaking output text terminated by a hard or soft newline.
class Chunk { ... }

/// To create a point, call [Point()] or use [Point.polar()] to ...
```

### Markdown

* AVOID using markdown excessively.
* AVOID using HTML for formatting.
* PREFER backtick fences for code blocks.

### Writing

* PREFER brevity.
* AVOID abbreviations and acronyms unless they are obvious.
* PREFER using “this” instead of “the” to refer to a member’s instance.


## Usage

### Libraries

* DO use strings in `part of` directives.
* DON’T import libraries that are inside the _src_ directory of another package.
* PREFER relative paths when importing libraries within your own package’s _lib_ directory.

```dart
// my_library.dart
library my_library;
part 'path/to/my_part_file.dart';

// my_part_file.dart
part of '../../my_library.dart';  // 以前是这么写的 `part of my_library` 现在不推荐了，底层工具不好定位
```

### Booleans

* DO use `??` to convert null to a boolean value.

### Strings

* DO use adjacent strings to concatenate string literals.
* PREFER using interpolation to compose strings and values.
* AVOID using curly braces in interpolation when not needed.

```dart
raiseAlarm(
    'ERROR: Parts of the spaceship are on fire. Other '  // 这里加个 `+` 也没毛病，但不要这么做
    'parts are overrun by martians. Unclear which are which.');

// 1. 不推荐用 `+` 拼接字符串和变量
// 2. 插值能不用 `{}` 就不用 `{}`
'Hello, $name! You are ${year - birth} years old.';
```

### Collections

Out of the box, Dart supports four collection types: lists, maps, queues, and sets.

There are two ways to make an empty growable list: `[]` and `List()`. Likewise, there are three ways to make an empty linked hash map: `{}`, `Map()`, and `LinkedHashMap()`.

* DO use collection literals when possible.
* DON’T use `.length` to see if a collection is empty. 这个要算的，效率太低，用 `.isEmpty` 或 `.isNotEmpty`
* CONSIDER using higher-order methods to transform a sequence. 用 `.map()` `.where()` 少用 `for`
* AVOID using `Iterable.forEach()` with a function literal. 在 `Iterable.forEach()` 中每次都会解析 function literal，所以用 `for ... in` 循环来避免性能损耗，另外 `Map.forEach()` 不会有这个问题.
* DON’T use `List.from()` unless you intend to change the type of the result. 会丢类型信息
* DO use `whereType()` to filter a collection by type. 还是类型信息
* DON’T use `cast()` when a nearby operation will do.
* AVOID using `cast()`. 主要是性能影响 returns a _lazy_ collection that checks the element type on _every_ operation.

```dart
var iterable = [1, 2.3, 3];
print(iterable.toList().runtimeType);   // List<num>
print(List.from(iterable).runtimeType); // List<dynamic>
var ints = List<int>.from(iterable);    // List<int>
```

```dart
var objects = [1, "a", 2, "b", 3];
var objs = objects.where((e) => e is int);  // Iterable<Object>
var ints = objects.whereType<int>();        // Iterable<int>
```

```dart
var stuff = <dynamic>[1, 2];
var ints = List<int>.from(stuff);       // good
var ints = stuff.toList().cast<int>();  // bad
```

```dart
void printEvens(List<Object> objects) {
  // We happen to know the list only contains ints.
  for (var n in objects) {            // 不要在这里用 objects.cast<int>()
    if ((n as int).isEven) print(n);  // 要 cast 也等使用时再 cast，虽然这个例子下性能没啥区别
  }
}
```

### Functions

* DO use a function declaration to bind a function to a name.
* DON’T create a lambda when a tear-off will do.

```dart
localFunction() {
  // ...
}

// bad
var localFunction = () {
  // ...
}
```

### Parameters

* DO use `=` to separate a named parameter from its default value. 这条可忽略，叫你不要用 `:` 这种遗留用法
* DON’T use an explicit default value of `null`.

### Variables

* DON’T explicitly initialize variables to `null`.
* AVOID storing what you can calculate.

### Members

* DON’T wrap a field in a getter and setter unnecessarily. 跟 Java 和 C# 开发讲的
* PREFER using a `final` field to make a read-only property.
* CONSIDER using `=>` for simple members.
* DON’T use `this.` except to redirect to a named constructor or to avoid shadowing.
* DO initialize fields at their declaration when possible.

```dart
class Box {
  var value;
  void clear() { update(null); }              // 这里的 this 可以省，就不要画蛇添足了
  void update(value) { this.value = value; }  // 这里的 this 没法省
}
```


### Constructors

* DO use initializing formals when possible.
* DON’T type annotate initializing formals.
* DO use `;` instead of `{}` for empty constructor bodies.
* DON’T use `new`.
* DON’T use `const` redundantly.

```dart
// bad
class Point {
  int x, y;
  Point(int this.x, int this.y);  // int 可以省的就不要了啊
}
```

### Error handling

* AVOID catches without `on` clauses. `Error` 代码缺陷 `Exception` 运行时异常
* DON’T discard errors from catches without `on` clauses.
* DO throw objects that implement Error only for programmatic errors. 代码问题用 Error
* DON’T explicitly catch Error or types that implement it. Bug 要马上修，不要等
* DO use `rethrow` to rethrow a caught exception. `rethrow` preserves the original stack trace of the exception. `throw` on the other hand resets the stack trace to the last thrown position.

### Asynchrony

* PREFER `async`/`await` over using raw `Future`s.
* DON’T use `async` when it has no useful effect.
* CONSIDER using higher-order methods to transform a stream.
* AVOID using `Completer` directly. 兄弟们你们别乱搞，这个基本内部用的，你们用 `Future`
* DO test for `Future<T>` when disambiguating a `FutureOr<T>` whose type argument could be Object.

```dart
// async 常规用法
Future usesAwait(Future later) async {
  print(await later);
}
// 以下2类也是不错的 async 使用场景
Future asyncError() async { throw 'Error!'; }
Future asyncValue() async => 'value';
```

```dart
Future<T> logValue<T>(FutureOr<T> value) async {
  if (value is Future<T>) {
    // ...
  } else {
    // value is T ...
  }
}
```



## Design

### Names

* DO use terms consistently.
* AVOID abbreviations, unless the abbreviation is more common than the unabbreviated term.
* PREFER putting the most descriptive noun last.
* CONSIDER making the code read like a sentence. ⭐️
* PREFER a noun phrase for a non-boolean property or variable.
* PREFER a non-imperative verb phrase for a boolean property or variable.
* CONSIDER omitting the verb for a named boolean parameter. 作为命名参数时，就不推荐带 `is-` `can-` 等了，此场景下不带动词也不影响表意清晰性，在调用的地方用起来也更自然
* PREFER the “positive” name for a boolean property or variable.
* PREFER an imperative verb phrase for a function or method whose main purpose is a side effect.
* PREFER a noun phrase or non-imperative verb phrase for a function or method if returning a value is its primary purpose.
* CONSIDER an imperative verb phrase for a function or method if you want to draw attention to the work it performs.
* AVOID starting a method name with `get`. 要么直接不用，要么用更准确的 `create` `download` `calculate` 等
* PREFER naming a method `to___()` if it copies the object’s state to a new object.
* PREFER naming a method `as___()` if it returns a different representation backed by the original object.
* AVOID describing the parameters in the function’s or method’s name.
* DO follow existing mnemonic conventions when naming type parameters.

```dart
// Do use terms consistently.
pageCount         // A field.
updatePageCount() // Consistent with pageCount.
toSomething()     // Consistent with Iterable's toList().
asSomething()     // Consistent with List's asMap().
Point             // A familiar concept.

// Prefer putting the most descriptive noun last.
ConversionSink        // A sink for doing conversions.
CssFontFaceRule       // A rule for font faces in CSS.

// Consider making the code read like a sentence.
if (errors.isEmpty) ...   // "If errors is empty..."
subscription.cancel();    // "Hey, subscription, cancel!"
// 这大概就是没沿用 filter 的缘由吧
monsters.where((monster) => monster.hasClaws);  // "Get the monsters where the monster has claws."

// Prefer a non-imperative verb phrase for a boolean property or variable.
if (window.closeable) ...  // Adjective. Sounds like an interface.
if (window.canClose) ...   // Verb.
// good          bad             // why the bad is bad
isEmpty          empty           // Adjective or verb?
hasElements      withElements    // Sounds like it might hold elements.
canClose         closeable       // Sounds like an interface.
closesWindow     closingWindow   // Returns a bool or a window?
canShowPopup     showPopup       // Sounds like it shows the popup.
hasShownPopup

// Consider omitting the verb for a named boolean parameter.
Isolate.spawn(entryPoint, message, paused: false);

// a noun phrase or non-imperative verb phrase 名词短语或非命令性动词短语
var element = list.elementAt(3);
var first = list.firstWhere(test);
// imperative verb phrase 祈使动词短语
queue.removeFirst();
var table = database.downloadData();
```

```dart
// Do follow existing mnemonic conventions when naming type parameters.
class List<E> {}    // `E` for element
class Map<K, V> {}  // `K` for key, `V` for value
void foo<R>() {}    // `R`  for return type
/* ... */           // other time use `T` `S` `U` for generics
class Graph<Node, Edge> {}  // 实在选不好的时候就上完整单词吧
```

### Libraries

* PREFER making declarations private. 用户高兴了，你高兴了，对于没有用的私有变量IDE还会提示你呢
* CONSIDER declaring multiple classes in the same library. *类内部的私有变量对于同一个 library 内的其他成员都是可见的*。嗨，Java 开发同学，你们那套一个文件只放一个类的限制在我们这里解除了，快来玩呀

### Classes and mixins

* AVOID defining a one-member abstract class when a simple function will do. 又是对 Java 开发说的
* AVOID defining a class that contains only static members. In Java every definition must be inside a class... Java 的 Class 有时仅仅作为 namespace 存在，而 Dart 则可以借助 library 来隔离命名空间
* AVOID extending a class that isn’t intended to be subclassed.
* DO document if your class supports being extended.
* AVOID implementing a class that isn’t intended to be an interface.
* DO document if your class supports being used as an interface.
* DO use `mixin` to define a mixin type.
* AVOID mixing in a type that isn’t intended to be a mixin.

### Constructors

* CONSIDER making your constructor `const` if the class supports it.

### Members

* PREFER making fields and top-level variables `final`.
* DO use getters for operations that conceptually access properties.
* DO use setters for operations that conceptually change properties.
* DON’T define a setter without a corresponding getter.
* AVOID returning null from members whose return type is `bool`, `double`, `int`, or `num`.
* AVOID returning `this` from methods just to enable a fluent interface.

当一个操作在概念上属于读取属性时，不要用 method 而要用 getter。当然，如果这个操作特别耗时或你想突出这个获取属性的过程时，可以使用 method 来强调这个过程。在 Dart 中，所有的 field 都是 getter。In other words, getters are not “particularly slow fields” in Dart; fields are “particularly fast getters”.

### Types

* PREFER type annotating public fields and top-level variables if the type isn’t obvious.
* CONSIDER type annotating private fields and top-level variables if the type isn’t obvious.
* AVOID type annotating initialized local variables.
* AVOID annotating inferred parameter types on function expressions.
* AVOID redundant type arguments on generic invocations.
* DO annotate when Dart infers the wrong type. 譬如 0 系统自动推断为 int 但你想要 num 那就吱一声吧
* PREFER annotating with `dynamic` instead of letting inference fail. 你知编译器知但看代码的人不知道是不是你漏了
* PREFER signatures in function type annotations. 不要一个 `Function` 就完事，把入参和返回值类型写写全
* DON’T specify a return type for a setter. Setters always return `void` in Dart.
* DON’T use the legacy `typedef` syntax.
* PREFER inline function types over `typedef`s.
* CONSIDER using function type syntax for parameters.
* DO annotate with `Object` instead of `dynamic` to indicate any object is allowed.
* DO use `Future<void>` as the return type of asynchronous members that do not produce values.
* AVOID using `FutureOr<T>` as a return type. (Only use `FutureOr<T>` in contravariant positions.)

```dart
// generic invocation
Set<String> things = Set();
var things = Set<String>();
```

```dart
// function type annotation
Iterable<T> where(bool Function(T) predicate) => /* ... */;

// Dart 中不存在 union type
void handleError(void Function() operation, Function errorHandler) {
  try {
    operation();
  } catch (err, stack) {
    if (errorHandler is Function(Object)) {
      errorHandler(err);
    } else if (errorHandler is Function(Object, StackTrace)) {
      errorHandler(err, stack);
    } else {
      throw ArgumentError("errorHandler has wrong signature.");
    }
  }
}
```

```dart
// 定义类型别名
typedef Comparison<T> = int Function(T a, T b);
```


### Parameters

* AVOID positional boolean parameters. 主要是考虑到调用时直接传个 true 或 false 代码可读性不好
* AVOID optional positional parameters if the user may want to omit earlier parameters.
* AVOID mandatory parameters that accept a special “no argument” value. 这种应改成 optional
* DO use inclusive start and exclusive end parameters to accept a range. (惯例，其他API都这么设计的)

In Dart, optional parameters can be either positional or named, but not both.


### Equality

* DO override `hashCode` if you override `==`.
* DO make your `==` operator obey the mathematical rules of equality.
* AVOID defining custom equality for mutable classes.
* DON’T check for `null` in custom `==` operators.

The default hash code implementation provides an identity hash—two objects generally only have the same hash code if they are the exact same object. Likewise, the default behavior for `==` is identity. Any two objects that are equal must have the same hash code. Otherwise, maps and other hash-based collections will fail to recognize that the two objects are equivalent.


## 生词

ambiguous  _/æmˈbɪɡjuəs/_  a.模凌两可的; 暧昧的  
disambiguate  _/dɪsæmˈbɪɡjueɪt/_  v.消除歧义  
idiomatic  _/ˌɪdiəˈmætɪk◂/_  a.地道的  
collision  _/kəˈlɪʒən/_  n.碰撞; 冲突  
domain  _/dəˈmeɪn/_  n.领域; 域名  

phrase  _/freɪz/_  n.短语,词组  
prose  _/prəʊz/_  n.散文; 白话文  
proficiency  _/prəˈfɪʃənsi/_  n.(in)精通; 熟练程度  
brevity  _/ˈbrevɪti/_  n.简洁; 短促  
terse  _/tɜːrs/_  a.简短的  A terse statement or comment is brief and unfriendly.  
predicate  _/ˈpredɪkət/_  n.谓语  the predicate of a clause is the part of it that is not the subject.  
auxiliary  _/ɔːɡˈzɪljəri/_  n.辅助人员,附属机构; 助动词  In grammar, an auxiliary or auxiliary verb is a verb which is used with a main verb. In English, the basic auxiliary verbs are 'be', 'have', and 'do'. Modal verbs such as 'can' and 'will' are also sometimes called auxiliaries.

terminology  _/ˌtɜːmɪˈnɒlədʒi/_  n.学科术语,专门术语  
abbreviate  _/əˈbriːvieɪt/_  v.缩写  
abbreviation  _/əˌbriːviˈeɪʃən/_  n.缩写词,缩略形式  
acronym  _/ˈækrənɪm/_  n.首字母缩略词  
adjacent  _/əˈdʒeɪsənt/_  a.邻近的,毗连的  
undesirable  _/ˌʌndɪˈzaɪərəbəl◂/_  a.不受欢迎的,不良的,有害的  

abstraction  _/əbˈstrækʃən/_  n.抽象  
precedent  _/ˈpresɪdənt/_  n.先例  If there is a precedent for an action or event, it has happened before.  
redundant  _/rɪˈdʌndənt/_  a.过剩的; 人员因过剩被解雇的


asynchrony  _/eɪˈsɪŋkrənɪ/_  n.异步  

invocation  _/ˌɪnvəˈkeɪʃən/_  n.祷告; 调用  
annotation  n.注解,评注  

This means the member is syntactically a method, but conceptually it is a property, 这意味着该成员在语法上是一种方法，但从概念上讲是一种属性  

constrain  _/kənˈstreɪn/_  v.约束,限制  
constraint  _/kənˈstreɪnt/_  n.约束,限制  如：添加约束、唯一性约束
安卓开发中的 约束布局 ConstraintLayout 的出现主要是为了解决布局嵌套的问题，使用添加定位、边距等约束来定位和调整部件

conversion  n.转换  
convention  n.惯例  

concrete _/ˈkɒŋkriːt/_  n.混凝土 a.具体的  

constant  _/ˈkɒnstənt/_  n.常量  
procedural or functional language  过程式或函数式语言  
leeway  _/ˈliːweɪ/_  n.自由空间,回旋余地  
subtle  _/ˈsʌtl/_  a.微妙的,不明显的; 机智狡猾的  
idempotent  _/aɪˈdemˌpətənt/_  a.幂等的 n.[数]幂等  
mindset  _/ˈmaɪndset/_  n.思维方式,思想倾向,心态  

reflexive pronoun  _/rɪˈfleksɪv/_  反身代词 如 myself  <span>refers back to the subject of the clause</span>  
symmetrical  _/sɪˈmetrɪkəl/_  symmetric  _/sɪˈmetrɪk/_  a.对称的  
transitive  _/ˈtrænsɪtɪv/_  a.(动词)及物的  A transitive verb has a direct object.  





<style>
  li > i.tag {
    padding: 1px 2px;
    border: 1px solid;
    border-radius: .2em;
    font-size: .7em;
  }
  .tag.negative {
    color: red;
  }
  .tag.positive {
    color: green;
  }
</style>
<script>
{
  const regex = /^(don’t|avoid)?(do|prefer|consider)?/i
  for (let li of md.querySelectorAll('li')) {
    li.innerHTML = li.innerHTML.replace(regex, (match, p1, p2) => 
      p2 ? `<i class="tag positive">${p2}</i>` : p1 ? `<i class="tag negative">${p1}</i>` : ''
    )
  }
}
</script>
