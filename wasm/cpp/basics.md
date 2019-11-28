# ISO C++

<script>ooboqoo.contentsRegExp = /H[123]/;</script>

## 预备知识

C++ 语言容纳了好几种编程范式，包括 *面向对象编程*、*泛型编程*和传统的 *过程化编程*。这表明 C++ 强调的是实用价值，而不是意识形态方法，这也是该语言获得成功的原因之一。

ISO C++ 标准根据年份区分版本，主要有 03 11 14 17 这几个版本。

*C++ 是 C 语言的超集*，任何有效的 C 程序都是有效的 C++ 程序。名称 C++ 来自 C 语言中的递增运算符。

C++ 在 C 语言的基础上添加了面向对象编程和泛型编程的支持。C++ 继承了 C 语言高效、简洁、快速和可移植性的传统，同时为应付复杂程度不断提高的现代编程任务而引入了面向对象的特性。

### C++ 简史

一般来说，计算机语言要处理两个概念——数据和算法，*数据是程序使用和处理的信息，而算法是程序使用的方法*。

C 语言在最初面世时也是过程性 procedural 语言，这意味着它强调的是编程的算法方面。随着程序规模的扩大，计算机科学家开发了一种更有序的编程方法——结构化编程 structured programming。另一个新原则是自顶向下 top-down 的设计，C 语言的理念是将大型程序分解成小型、便于管理的任务。*结构化编程技术反应了过程性编程的思想*。

虽然结构化编程的理念提高了程序的清晰度、可靠性，并使之便于维护，但它在编写大型程序时，仍面临着挑战，为应付这种挑战，OOP 提供了一种新方法。*与强调算法的过程性编程不同的是，OOP 强调的是数据，其理念是设计与问题的本质特性相对应的数据格式*。在 C++ 中类是一种规范，它描述了这种新型数据格式，对象是根据这种规范构造的特定数据结构。OOP 不是将重点放在任务上，而是放在表示概念上。

泛型编程 generic programming 是 C++ 支持的另一种编程模式。术语泛型指的是创建独立于类型的代码。C++ 的数据表示有多种类型，要对不同类型的数据进行排序通常必须为每种类型创建一个排序函数，而有了泛型后，只编写一个泛型函数就搞定了。C++ 模板提供了完成这种任务的机制。

### 可移植性和标准

C++ 的流行导致大量用于各种计算平台的 C++ 实现得以面世，而 ISO C++ 标准为确保众多实现的相互兼容提供了基础。这些标准规定了语言必须具备的特性、语言呈现出的行为、标准库函数、类和模板，旨在实现该语言在不同计算平台和实现之间的可移植性。

在 **ANSI C** 出现之前，C 语言社区遵循一种事实标准，该标准基于 Kernighan 和 Ritchie 编写的 The C Programming Language 一书，通常被称为 **K&R C**。

ANSI C 标准不仅定义了 C 语言，还定义了一个 ANSI C 实现必须支持的标准 C 库，C++ 也使用了这个库，本书将其称为 *标准 C 库* 或 *标准库*。另外，ANSI/ISO C++ 标准还提供了一个 *C++ 标准类库*。


## 起步

```cpp
#include <iostream>

int main()
{
  using namespace std;
  cout << "Hello World." << endl;
}
```

头文件名(预编译指令)

```cpp
#include <iostream> // C++ 标准库

#include <math.h>   // C 标准库
#include <cmath>    // 转换后到 C 标准库
```

名称空间

```cpp
using namespace std;        // 暴露命名空间内的所有成员
using namespace std::cout;  // 仅暴露命名空间内的单个成员 cout

std::cout << "Hello\n" << "World" << std::endl;  // 不用 using namespace 的用法
```

函数内不允许嵌套函数，函数要声明后才能调用

```cpp
#include <iostream>

void print(char *);
int sum(int, int);

int main()
{
  int i = sum(1, 2);
  print("todo");
}

void print(char *str)
{
  std::cout << str << std::endl;
}

int sum(int a, int b)
{
  return a + b;
}
```


## 处理数据

内置的 C++ 类型分两组：基本类型和复合类型。

C++ 的基本类型分为两组：一组由存储为整数的值组成，另一组由存储为浮点格式的值组成。

整型(有符号) `char` `short` `int` `long` `long long`  
整型(无符号) `unsigned short` `unsigned` `unsigned long` `unsigned long long`  
整型(其他) `bool` `char` `signed char` `unsigned char`  
浮点型 `float` `double` `long double`

C++ 使用运算符来提供对数字类型的算术运算：加、减、乘、除 和 求模。

### 变量名

* 只能使用字母字符、数字和下划线
* 第一个字符不能是数字
* 区分大小写
* 以 两个下划线 或 下划线加大写字母 打头的名称被保留给实现(编译器及其使用的资源)使用
* 以一个下划线开头的名称被保留给实现，用作全局标识符
* 对名称长度没有限制(而 ANSI C 中只保证前 63 个字符有意义)

名称要使用多个单词时，`lowercase_with_underscores` `lowCamelCase` 这两种形式都是可以的，选一种就好。

### 整型

类型的宽度(存储使用的内存量)随实现而异，_climits_ / _limits.h_ 包含了关于整型限制的信息。

_climits_ 文件中包含类似 `#define INT_MAX 32767` 这样的语句行。在 C++ 编译过程中，首先将源代码传递给预处理器。`#define` 和 `#include` 一样也是一个预处理编译指令，该编译指令告诉预处理器，在程序中查找 `INT_MAX` 并将所有的 `INT_MAX` 都替换为 `32767`，这跟编辑器中的全局搜索替换命令相似。

```cpp
#include <iostream>
#include <climits>  // 包含了关于整型限制的信息
int main()
{
  using namespace std;

  // sizeof operator yields size of type or of variable
  cout << "int   is " << sizeof(INT_MAX)  << "bytes.\n";
  cout << "short is " << sizeof(SHRT_MAX) << "bytes.\n";
  cout << "long  is " << sizeof(LONG_MAX) << "bytes.\n";

  cout << "Maximum values:\n";
  cout << "int:   " << INT_MAX  << endl;
  cout << "short: " << SHRT_MAX << endl;
  cout << "long:  " << LONG_MAX << endl;
}
/*
int   is 4bytes.
short is 4bytes.
long  is 8bytes.
Maximum values:
int:   2147483647
short: 32767
long:  9223372036854775807
*/
```

初始化

```cpp
int num = 5;
// C++11 新增加的列表初始化 list-initialization，统一了初始化常规变量和初始化类变量的方式
int num{5};
int num = {5};
```

整型字面量

```cpp
int i = 42;    // decimal integer literal
int i = 0x42;  // hexadecimal integer literal
int i = 042;   // octal integer literal
```

定义常量

```cpp
// 早期 C 使用 `#define` 来定义符号常量，但现在 C++ 和 ANSI C 都使用 `const` 限定符
// 建议将常量名称的首字母大写，或所有字母都大写，这样便于区分常量和普通变量
const int MONTHS = 12;
```

`char`

编程语言通过使用字母的数值编码来存储字母，因此 `char` 类型是另一种整型。

### 浮点数

和 ANSI C 一样，C++ 也有 3 种浮点类型：`float` `double` `long double`。

```cpp
1.234f       // a float constant
2.45E20F     // a float constant
2.345324E28  // a double constant
2.2L         // a long long constant
```

### 算术运算符

### 类型转换

C++ 自动执行很多类型转换(*隐式转换*)
* 将一种算术类型的值赋给另一种算术类型的变量时
* 表达式中包含不同的类型时
* 将参数传递给函数时

C++ 还允许通过强制类型转换机制显式地进行类型转换(*显式转换*)

```cpp
// 强制类型转换
(typeName) value  // C 语言
typeName(value)   // C++ 新格式，让强制类型转换像函数调用
```

```cpp
// 类型推断 auto
auto x = 1.5;  // x is double
```


## 复合类型

C++ 让程序员能够使用基本的内置类型来创建更复杂的类型。最高级的形式是类，但本章先讨论其他形式：数组(存储多个同类型的值)、结构(存储多个不同类型的值)、指针(标示内存位置)。如何创建和存储文本字符串及如何使用。最后还将学习 C++ 处理内存分配的一些方法。

### 数组

数组 array 能够存储多个同类型的值。

创建数组可使用声明语句 `typeName arrayName[arraySize];`。这里的 `arraySize` 是在编译时就已知的整型常数、const 值 或常量表达式，也就是说，`arraySize` 不能是变量，变量的值是在程序运行时设置的。

数组之所以被称为 *复合类型*，是因为它是使用其他类型来创建的(C 语言使用术语 *派生类型*，但由于 C++ 对类关系使用术语 *派生*，所以创建了新术语)。

*编译器不会检查使用的下标是否有效*。但开发人员必须确保程序只使用有效的下标值，否则可能破坏数据或代码，导致运行异常。

```cpp
// 先声明数组再对数组元素赋值
int arr[2];  // 未经初始化的数组元素的值是不确定的，其值为以前驻留在该内存单元中的值
arr[0] = 7;
arr[1] = 8;

// 声明并初始化数组
int arr[2] = {7, 8};
short arr[2] = {0};  // 如果只对一部分进行初始化，则编译器将把其他元素设置为 0
short arr[] = {1, 5, 3, 8};  // 此时可以省略数组的大小值，但这样做比较危险，对字符串倒是挺合适

//C++11 新增
double earnings[4] {1.2e4, 1.6e4, 1.1e4, 1.7e4};  // 初始化数组时可省略等号，但 C++14 开始又不能省略了
float balances[100] = {};  // 可不在大括号内包含任何东西，这将把所有元素都设置为 0
```

C++ 标准模版库(STL) 提供了一种数组替代品——模版类 `vector`，而 C++11 新增了模版类 `array`。这些替代品比内置复合类型更复杂更灵活。

### 字符串

C 风格字符串具有一种特殊的性质：以空字符(null character)结尾，空字符写作 `\0`，其 ASCII 码为 0，用来标记字符串的结尾。

用双引号括起的字符串字面量隐式地包括结尾的空字符。请注意 `'S'` 跟 `"S"` 之间的区别，`"S"` 不是字符常量，它表示的是两个字符 `'S'` `'\0'` 组成的字符串，进一步说，`"S"` 实际上表示的是字符串所在的内存地址。

```cpp
char abc[3] = ['a', 'b', 'c'];        // not a string!
char abc[4] = ['a', 'b', 'c', '\0'];  // a string

char abc[] = "abc";  // 现实中初始化一般使用 字符串常量 string constant 或称为 字符串字面值 string literal
char more[] = "abc" "def";  // 字符串拼接：任何由 空白(空格、制表符、换行符) 分隔的字符串常量都将自动拼接成一个
```
```cpp
// 在数组中使用字符串
#include <iostream>
#include <cstring>
int main()
{
  using namespace std;
  char name[10] = "gavin";
  cout << "strlen()\t" << strlen(name) << endl;
  cout << "sizeof\t"   << sizeof name  << endl;  // 也可以写成 sizeof() 视觉效果更统一

  name[2] = 0;  // 这个厉害，直接把字符串给截短了
  cout << "name[2]=0\t" << name << endl;
}
/*
strlen()        5
sizeof          10
name[2]=0       ga
*/
```

#### 输入字符串

```cpp
// 此例子展示，当输入带空格的姓名时，被分成了 2 次输入
#include <iostream>
#include <cstring>
int main()
{
  using namespace std;
  char fullName[10];
  char nickname[10];
  cout << "请输入姓名，姓和名之间用空格分隔：";
  cin >> fullName;
  // cin.getline(fullName, 10);  // 这个下文有解释
  cout << "请输入昵称：";
  cin >> nickname;
  cout << "您的姓名是：" << fullName << endl;
  cout << "您的昵称是：" << nickname << endl;
}
/*
请输入姓名，姓和名之间用空格分隔：Gavin Wang
请输入昵称：您的姓名是：Gavin
您的昵称是：Wang
*/
```

`cin` 使用空白(空格、制表符和换行符)来确定字符串的结束位置，这意味着 `cin` 只能读取第一个单词。上述例子中，读取姓名时只读取了 Gavin，而将 Wang 留在了输入队列中，当读取昵称时，因为输入队列中已经有内容，没等输入就直接拿 Wang 当昵称了。

`cin` 提供了两个面向行的类成员函数 `getline()` `get()`，它们都读取一行输入，区别是，`getline()` 会丢弃换行符，而 `get()` 将换行符保留在输入序列中。

`cin.getline(char_type* 接收输入的数组名称, streamsize 要读取的字符数)` 在读取指定数目(streamsize-1)的字符或遇到换行符时停止读取。

`cin.get()` 的一种用法同 `cin.getline()`，另外还有一种用法，就是不传任何参数，可以用来读取下一个字符(即便是换行符)，因此可以用 `cin.get()` 来处理换行符，为下一行输入做好准备。

`get()` 相比 `getline` 有什么优势呢？读取过程中，如何知道停止读取的原因是由于已经读取了整行而不是由于数组已填满呢，查看下下一个输入字符是不是换行符就清楚了，这时必须得上 `get()`。总之，`cin.getline()` 使用起来更简单一些，但 `cin.get()` 使得检查错误更简单些。

```cpp
// cin.getline()
cin.getline(fullName, 10);
cin.getline(nickname, 10);

// cin.get()
cin.get(fullName, 10).get();  // 后面的 get() 就是为了消耗掉换行符
cin.get(nickname, 10).get();  // 至于支持链式写法，跟 jQuey 一个道理，上面的 getline() 也支持的
```

```cpp
// 混合输入数字和面向行的字符串会导致问题
#include <iostream>
int main()
{
  using namespace std;
  int year;
  char address[80];

  cin >> year;  // 解决的办法是  (cin >> year).get()
  cin.getline(address, 80);
  cout << "year: " << year << "\taddress: " << address << endl;
}
/*
2019
year: 2019      address:
*/
```

### string 类

C++98 标准通过添加 string 类扩展了 C++ 库，因此现在可以用 string 类型的变量(使用 C++ 的话说是对象)而不是字符数组类存储字符串。string 类使用起来比数组简单，同时提供了将字符串作为一种数据类型的表示方法。string 类定义隐藏了字符串的数组性质，让您能够像处理普通变量那样处理字符串。

```cpp
#include <iostream>
#include <string>

int main()
{
  char str1[] = "abc";
  std::string str2 = "def";

  std::cout << str1[1] << str2[2];
}
```

使用 string 类比使用数组简单，例如，不能将一个数组赋给另一个数组，但可以将一个 string 对象赋给另一个 string 对象。

```cpp
#include <iostream>
#include <string>
int main()
{
  using namespace std;

  char str1[] = "abc";
  char str2[4];
  // str2 = str1; // INVALID

  string str3 = str1;
  string str4 = "def";
  string str5 = str1 + str4 + "ghi" "jkl";

  cout << str1 << endl
       << str5 << endl;
}
/*
abc
abcdefghijkl
*/
```

```cpp
// 新旧操作方式差异
#include <iostream>
#include <string>  // make string class available
#include <cstring> // C-style string library
int main()
{
  using namespace std;
  char arr1[20] = "abc";
  char arr2[20];
  string str1 = "abc";
  string str2;

  // assignment
  str2 = str1;
  strcpy(arr2, arr1);

  // appending
  str2 += "def";
  strcat(arr2, "def");

  // obtain length
  int len1 = str2.size();
  int len2 = strlen(arr2);

  cout << "str2:\t" << str2 << endl
       << "arr2:\t" << arr2 << endl
       << "len1:\t" << len1 << endl
       << "len2:\t" << len2 << endl;
}
```

```cpp
// 读取用户输入时也有差异
#include <iostream>
#include <string>  // make string class available
int main()
{
  using namespace std;
  char arr[20];
  string str;

  cin.getline(arr, 20);
  getline(cin, str);
}
```

```cpp
// C++11 新增了一种类型 —— 原始字符串 raw sting
cout << R"(这里的内容就是原始字符串内容，什么转义之类的都无效了，原样输出)";
```

### 结构 `struct`

结构是用户定义的类型。结构声明定义了这种类型的数据属性，定义类型后，就可以创建这种类型的变量。结构中的每一项被称为结构成员，可以使用成员运算符 `.` 来访问各个成员。

结构也是 C++ OOP堡垒(类)的基石，访问类成员函数(如 `cin.getline()`)的方式就是从访问结构成员变量(如 `product.price`)的方式衍生而来的。

```cpp
#include <iostream>
#include <string>

struct person
{
  std::string name;
  int age;
};

int main()
{
  using namespace std;
  person me = {"gavin", 34};
  person you = {"ivan", 33};
  person another = you;      // 这里不会传递引用，跟 JS 不一样
  another.age = 88;
  cout << "Me:\t"  << me.name  << "\t" << me.age  << endl
       << "You:\t" << you.name << "\t" << you.age << endl
       << "Another:\t"                 << another.age << endl;
}
/*
Me:     gavin   34
You:    ivan    33
Another:        88
*/
```

### 共用体 `union`

共用体每次只能存储一个值，共用体的长度为其最大成员长度。  
(这个跟 TS 中的联合类型有共通的地方，但实际上又有较大差别，理解起来稍有些吃力)

```cpp
#include <iostream>
int main()
{
  using namespace std;
  union one4all {
    int int_val;
    long long_val;
  };

  one4all num;        // num 只会存储一个值，
  num.int_val = 11;   // num.int_val 意思是这个值作为 int 类型来使用
  num.long_val = 22;  // num.long_val 意思是这个值作为 long 类型来用
  cout << "num.int_val\t" << num.int_val << endl;
  cout << "num.long_val\t" << num.long_val << endl;

  struct widget
  {
    int type;
    union {              // 匿名共用体 anonymous union
      long id_num;
      char id_char[20];
    };
    // int id_num;       // 这里就不能重复定义 id_num，编译会报错
  };

  widget prize;
  if (prize.type == 0)
    cin >> prize.id_num;    // 再注意这两处的用法
  else
    cin >> prize.id_char;   // 再注意这两处的用法

  cout << "prize.id_char\t" << prize.id_char << endl;
}
/*
num.int_val     22
num.long_val    22
97
prize.id_char   a
*/
```

### 枚举 `enum`

C++ 中的 `enum` 提供了另一种 *创建符号常量* 的方式，这种方式可代替 `const`。

```cpp
enum colors {red, orange, yellow, green, blue};
```

上面这条语句完成了两项工作
* 定义新的类型名称 `colors`，`colors` 被称为枚举 enumeration，就像 struct 变量被称为结构一样
* 将 `red` `orange` 等作为符号常量，它们对应整数 `0~4`，这些常量叫作枚举量 enumerator

实际上，枚举更常被用来定义相关的符号常量，而不是新类型。

```cpp
#include <iostream>
int main()
{
  using namespace std;

  enum bits
  {
    one = 1,
    two = 2,
    four = 4,
    eight = 8
  };

  bits num = two;
  cout << num << "\t";
  num = bits(8);
  cout << num << endl;
}
/*
2       8
*/
```

### 指针和自由存储空间

指针、数组和指针算术

指针是一种将数据所处位置告诉计算机的变量。

### 补充知识

#### 类型组合

#### 数组的替代品


## 循环和分支


## 函数

函数是 C++ 的编程模块，是基本的编程部件。

最后将介绍函数指针，它使程序员能够通过函数参数来命令函数使用另一个函数。


## 内存模型和名称空间

如何创建多文件程序，分配和管理内存的各种方式

作用域、链接、名称空间，这些内容决定了变量在程序的哪些部分是可见的。


### 存储连续性、作用域和链接性

### 名称空间
