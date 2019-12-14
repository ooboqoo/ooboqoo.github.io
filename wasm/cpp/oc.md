# Objective-C

[https://developer.apple.com/.../Introduction.html](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html)  


## 语言基础

Objective-C 是一种通用、高级、面向对象的编程语言。在标准的 ANSI C 上加入了 Smalltalk 式的消息传递机制。

```objectivec
#import <Foundation/Foundation.h>

@interface SampleClass:NSObject
- (void)sampleMethod;
@end

@implementation SampleClass
- (void)sampleMethod {
  NSLog(@"Hello, World! \n");
}
@end

int main() {
  /* my first program in Objective-C */
  SampleClass *sampleClass = [[SampleClass alloc]init];
  [sampleClass sampleMethod];
  return 0;
}
```

### SmallTalk 式的消息传递模型

Objective-C 最大的特色是承自 Smalltalk 的消息传递模型(message passing)，此机制与 C++ 之类的主流风格差异甚大。与其说 *调用对象的方法* ，不如说 *向对象传递消息* 更为精确。二者并不仅仅是语法上的差异，行为上也有着本质性不同。

```
// Java 中的方法调用
obj.method(argument);

// Objective-C 中的方法调用
[obj method:argument];
```

举个例子：`[car fly];` Java 中的解读是 “调用 car 类的 fly 方法”。若 car 类里没有定义 fly 方法，编译就不通过。Objective-C 里，则解读为 “向 car 对象发送 fly 消息”。不管 car 中是否有定义 fly，都不影响程序编译。运行时，若存在 fly 方法就运行，若不存在则抛出异常：unrecognized selector sent to instance。

### C 语言的严格超集

Objective-C 是 C 语言的严格超集。`.m` 文件可以包含 Ojective-C 和 C 代码。`.mm` 文件则还可以包含 C++ 代码。


### 数据类型

BOOL 型有两个值 `YES` 和 `NO`。

### 内置数据类

```objectivec
NSNumber i = 33;
```

```objectivec
char *str = "string";
NSString *str = @"immutable string";  // 带前缀 @
NSMutableString *str = @"mutable string";
```

### 预处理指令

C 语言使用 `#include` 导入头文件。Objective-C 新增的指令 `#import` 功能类似，且保证一个文件只会被包含一次。



## Defining Classes

Objective-C 中将类的 定义(interface) 与 实现(implementation) 分为两个部分。类的定义文件遵循 C 语言惯例用 `.h` 做后缀，实现文件则用 `.m` 做后缀。

定义部分，定义类的名称、数据成员和方法。 以关键字 `@interface` 开始，`@end` 结束：

```objectivec
// The public properties and behavior are defined inside the @interface declaration.
@interface MyClass : NSObject {
  @property NSString *firstName;  // 实体变量
  @property NSString *lastName;
  @property int yearOfBirth;  // 也可以将 int 换成 NSNumber
}

// 方法前面的 +/- 代表函数的类型
+ (return_type)class_method;     // `+` 打头的是 类方法 class method，相当于 Java 中的静态方法
- (return_type)instance_method1; // `-` 打头的是 实例方法 instance method
- (return_type)instance_method2:(int)p1;
- (return_type)instance_method3:(int)p1 andPar:(int)p2;
@end
```

实现部分，以关键字 `@implementation` 开始，`@end` 结束：

```objectivec
@implementation MyClass {
  int memberVar3; // 私有实体变量
}

- (return_type)instance_method1 { /* … */ }
- (return_type)instance_method2:(int)p1 { /* … */ }
- (return_type)instance_method3:(int)p1 andPar:(int)p2 { /* … */ }
@end
```

上述代码 Java 版对照：

```java
public class MyClass {
  protected int memberVar1;
  protected pointer memberVar2;
  private int memberVar3;

  public (return_type) instance_method1() { /* … */ }
  public (return_type) instance_method2(int p1) { /* … */ }
  public (return_type) instance_method3andPar(int p1, int p2) { /* … */ }
}
```

### Objective-C Classes Are also Objects

In Objective-C, a class is itself an object with an opaque type called `Class`.


### 引用计数

Objective-C 使用引用计数来管理对象的生命周期。

如果想使某个对象继续存活，那就递增其引用计数 `reatain`；用完之后递减其计数 `release`。当计数为 0 时，系统会将它销毁。

iOS5 开始引入了自动引用计数(ARC，Automatic Reference Counting)，会在编译时为代码在合适的位置加上 `retain` 和 `release`。



## Working with Objects

Objective-C 创建对象需通过 alloc 和 init 两个消息。alloc 是分配内存，init 则是初始化对象。 init 与 alloc 都是定义在 NSObject 里的方法，父对象收到这两个信息并做出正确回应后，新对象才创建完毕。

```objectivec
MyObject *obj = [[MyObject alloc] init];
MyObject *obj = [MyObject new];  // 也可以这么写，new 相当于 alloc + init
```

```java
// Java 版本
MyObject obj = new MyObject();
```

### 点语法

点语法的本质还是方法调用，是一种编译期行为，编译器会自动进行转换，来判断调用 set 方法还是 get 方法。

```objectivec
val = obj.name;
obj.name = @"new name";

// 上述代码等同于
val = [obj name];
[obj setName: @"new name"];
```



## Customizing Existing Classes

Categories Extend Existing Classes

分类可以给一个已经存在的类增加方法，而不用去改它的源码。类似于 Swift 和 Kotlin 中的扩展(extension)。

比如，NSString 是 Objective-C 内置的系统类，我们创建一个它的分类以支持加法运算：

```objectivec
// interface 部分
@interface NSString (Calculation)
- (NSString *)stringByAdding:(NSString *)aString; // 加
@end

// implementation 部分
@implementation NSObject (Calculation)
- (NSString *)stringByAdding:(NSString *)aString {
  // ...
}
@end
```

使用的时候，只要包含 NSObject+Calculation.h，就可以使用了：

```objectivec
NSString *str = @"100";
NSString *result = [str stringByAdding:10]; // result is 110
```



## Working with Protocols

Protocols Define Messaging Contracts

协议类似于 Java 中的接口。

```objectivec
// 定义协议
@protocol SomeProtocol
- (void)method1;  // 必须实现
@optional
- (void)method2;  // 可选实现
- (void)method3;  // 可选实现
@end

// 实现协议
@interface SomeClass : SomeSuperClass <SomeProtocol>
@end

@implementation SomeClass
- (void)method1 { /* … */ }
- (void)method2 { /* … */ }
- (void)method3 { /* … */ }
@end
```


## Values and Collections


## Working wiht Blocks

Blocks Simplify Common Tasks

Blocks are a language feature introduced to C, Objective-C and C++ to represent a unit of work; they encapsulate a block of code along with captured state, which makes them similar to closures in other programming languages. Blocks are often used to simplify common tasks such as collection enumeration, sorting and testing. They also make it easy to schedule tasks for concurrent or asynchronous execution using technologies like Grand Central Dispatch (GCD).




block 对象是对函数的扩展。除了函数中的代码，block 还包含变量绑定。block 也被称为闭包(closure)。block 是以 `^` 开头为标识的。后面跟的一个括号标示 block 需要的参数列表。

```objectivec
void (^myBlock) (int) = ^(int input) {
  NSLog(@"input number is %d", input);
};

// 调用 block 
myBlock(1);
// 输出：input number is 1
```

block 使用局部变量：

```objectivec
NSString *name = @"Candy";
void (^myBlock) (void) = ^ {
  NSLog(@"name is %@", name);
};

myBlock();
// 输出：name is Candy
```

block 可以方便的使用局部变量 name，但是你不能修改它，当你尝试修改 name 时，会报错 Variable is not assignable (missing __block type specifier)。

此时你需要用 __block 修饰 name：

```objectivec
__block NSString *name = @"Candy";
void (^myBlock) (void) = ^ {
  name = @"Jack"
  NSLog(@"name is %@", name);
};

myBlock();
// 输出：name is Jack
```

block 使用实例变量：

```objectivec
// 定义的实例变量 userName
@property (nonatomic, copy) NSString *name;

// block 使用实例变量
void (^myBlock) (void) = ^ {
  NSLog(@"ins is %@", self.name);
};
```

当 block 本身为实例变量，而 block 内部又使用了 实例变量，此时就会出现循环引用。
举个🌰：

```objectivec
// 定义的实例变量 userName 和 myBlock
@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) void (^myBlock)(void);

// block 使用实例变量
_myBlock = ^ {
  NSLog(@"name is %@", self.name);
};
```

此时会有警告：Capturing 'self' strongly in this block is likely to lead to a retain cycle
简单来说，是因为 self 引用了 myBlock，myBlock 又引用了 self。

解决 block 循环引用：

```objectivec
// 定义的实例变量 userName 和 myBlock
@property (nonatomic, copy) NSString *userName;
@property (nonatomic, copy) void (^myBlock)(void);

// block 使用实例变量
__weak typeof(self) weakSelf = self;
self.myBlock = ^ {
  NSLog(@"name is %@", weakSelf.userName);
};
```


## Dealing with Errors


## Conventions



