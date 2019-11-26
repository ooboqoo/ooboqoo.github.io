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
* DO name libraries, packages, directories, and source files using lowercase_with_underscores.
* DO name import prefixes using lowercase_with_underscores.
* DO name other identifiers using lowerCamelCase.
* PREFER using lowerCamelCase for constant names. ⭐️
* DO capitalize acronyms and abbreviations longer than two letters like words.
* DON’T use a leading underscore for identifiers that aren’t private.
* DON’T use prefix letters.

### Ordering

* DO place `dart:` imports before other imports.
* DO place `package:` imports before relative imports.
* PREFER placing external `package:` imports before other imports.
* DO specify exports in a separate section after all imports.
* DO sort sections alphabetically.

### Formatting

* DO format your code using dartfmt.
* CONSIDER changing your code to make it more formatter-friendly.
* AVOID lines longer than 80 characters.
* DO use curly braces for all flow control statements.


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

* DO use strings in part of directives.
* DON’T import libraries that are inside the src directory of another package.
* PREFER relative paths when importing libraries within your own package’s lib directory.

### Booleans

* DO use `??` to convert null to a boolean value.

### Strings

* DO use adjacent strings to concatenate string literals.
* PREFER using interpolation to compose strings and values.
* AVOID using curly braces in interpolation when not needed.

### Collections

* DO use collection literals when possible.
* DON’T use `.length` to see if a collection is empty.
* CONSIDER using higher-order methods to transform a sequence.
* AVOID using `Iterable.forEach()` with a function literal.
* DON’T use `List.from()` unless you intend to change the type of the result.
* DO use `whereType()` to filter a collection by type.
* DON’T use `cast()` when a nearby operation will do.
* AVOID using `cast()`.

### Functions

* DO use a function declaration to bind a function to a name.
* DON’T create a lambda when a tear-off will do.

### Parameters

* DO use `=` to separate a named parameter from its default value.
* DON’T use an explicit default value of `null`.

### Variables

* DON’T explicitly initialize variables to `null`.
* AVOID storing what you can calculate.

### Members

* DON’T wrap a field in a getter and setter unnecessarily.
* PREFER using a `final` field to make a read-only property.
* CONSIDER using `=>` for simple members.
* DON’T use `this.` except to redirect to a named constructor or to avoid shadowing.
* DO initialize fields at their declaration when possible.

### Constructors

* DO use initializing formals when possible.
* DON’T type annotate initializing formals.
* DO use `;` instead of `{}` for empty constructor bodies.
* DON’T use `new`.
* DON’T use `const` redundantly.

### Error handling

* AVOID catches without `on` clauses.
* DON’T discard errors from catches without `on` clauses.
* DO throw objects that implement Error only for programmatic errors.
* DON’T explicitly catch Error or types that implement it.
* DO use `rethrow` to rethrow a caught exception.

### Asynchrony

* PREFER async/await over using raw futures.
* DON’T use async when it has no useful effect.
* CONSIDER using higher-order methods to transform a stream.
* AVOID using Completer directly.
* DO test for `Future<T>` when disambiguating a `FutureOr<T>` whose type argument could be Object.

`Error` 代码缺陷  
`Exception` 运行时异常

再次抛出捕获的异常时要使用 `rethrow` 而不是 `throw`，因为 `rethrow` preserves the original stack trace of the exception. `throw` on the other hand resets the stack trace to the last thrown position.


## Design

### Names

* DO use terms consistently.
* AVOID abbreviations.
* PREFER putting the most descriptive noun last.
* CONSIDER making the code read like a sentence. ⭐️
* PREFER a noun phrase for a non-boolean property or variable.
* PREFER a non-imperative verb phrase for a boolean property or variable.
* CONSIDER omitting the verb for a named boolean parameter.
* PREFER the “positive” name for a boolean property or variable.
* PREFER an imperative verb phrase for a function or method whose main purpose is a side effect.
* PREFER a noun phrase or non-imperative verb phrase for a function or method if returning a value is its primary purpose.
* CONSIDER an imperative verb phrase for a function or method if you want to draw attention to the work it performs.
* AVOID starting a method name with `get`.
* PREFER naming a method `to___()` if it copies the object’s state to a new object.
* PREFER naming a method `as___()` if it returns a different representation backed by the original object.
* AVOID describing the parameters in the function’s or method’s name.
* DO follow existing mnemonic conventions when naming type parameters.

### Libraries

* PREFER making declarations private.
* CONSIDER declaring multiple classes in the same library.

### Classes and mixins

* AVOID defining a one-member abstract class when a simple function will do.
* AVOID defining a class that contains only static members.
* AVOID extending a class that isn’t intended to be subclassed.
* DO document if your class supports being extended.
* AVOID implementing a class that isn’t intended to be an interface.
* DO document if your class supports being used as an interface.
* DO use mixin to define a mixin type.
* AVOID mixing in a type that isn’t intended to be a mixin.

### Constructors

* CONSIDER making your constructor const if the class supports it.

### Members

* PREFER making fields and top-level variables `final`.
* DO use getters for operations that conceptually access properties.
* DO use setters for operations that conceptually change properties.
* DON’T define a setter without a corresponding getter.
* AVOID returning null from members whose return type is bool, double, int, or num.
* AVOID returning this from methods just to enable a fluent interface.

当一个操作在概念上属于读取属性时，不要用 method 而要用 getter。当然，如果这个操作特别耗时或你想突出这个获取属性的过程时，可以使用 method 来强调这个过程。在 Dart 中，所有的 field 都是 getter。In other words, getters are not “particularly slow fields” in Dart; fields are “particularly fast getters”.

### Types

* PREFER type annotating public fields and top-level variables if the type isn’t obvious.
* CONSIDER type annotating private fields and top-level variables if the type isn’t obvious.
* AVOID type annotating initialized local variables.
* AVOID annotating inferred parameter types on function expressions.
* AVOID redundant type arguments on generic invocations.
* DO annotate when Dart infers the wrong type.
* PREFER annotating with dynamic instead of letting inference fail.
* PREFER signatures in function type annotations.
* DON’T specify a return type for a setter.
* DON’T use the legacy `typedef` syntax.
* PREFER inline function types over typedefs.
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

* AVOID positional boolean parameters.
* AVOID optional positional parameters if the user may want to omit earlier parameters.
* AVOID mandatory parameters that accept a special “no argument” value.
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
terse  a.简洁  
predicate  谓语  
auxiliary  助动词  An auxiliary verb (abbreviated aux) is a verb that adds functional or grammatical meaning to the clause in which it appears

terminology  _/ˌtɜːmɪˈnɒlədʒi/  n.学科术语,专门术语  
abbreviate  
abbreviation  缩写  
acronym  首字母缩略词  
adjacent  _/əˈdʒeɪsənt/_  a.邻近的,毗连的  
undesirable  a.不良的  

abstraction  抽象  
precedent  _/ˈpresɪdənt/_  n.先例  

redundant  _/rɪˈdʌndənt/_  a.过剩的; 人员因过剩被解雇的


asynchrony  

invocation  调用  
annotation  n.注解,注释  

This means the member is syntactically a method, but conceptually it is a property, 这意味着该成员在语法上是一种方法，但从概念上讲是一种属性  

constrain  _/kənˈstreɪn/_  v.约束,限制  
constraint  _/kənˈstreɪnt/_  n.限制,约束  

conversion  转换  
convention  惯例  

constant  _/ˈkɒnstənt/_  n.常量  
procedural or functional language  过程式或函数式语言  
leeway  n.余地,回旋  
subtle  微妙  
idempotent  幂等  
mindset  心态  

reflexive  
symmetric  
transitive  





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
