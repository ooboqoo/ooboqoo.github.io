# ISO C++

<script>ooboqoo.contentsRegExp = /H[1234]/;</script>

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
#include <cmath>    // 转换后的 C 标准库
```

名称空间

```cpp
using namespace std;   // 用法一：暴露命名空间内的所有成员
using std::cout;       // 用法二：仅暴露命名空间内的单个成员 cout

std::cout << "Hello";  // 用法三：直接使用 std::cout
```

函数内不允许嵌套函数，函数调用之前必须先有声明，对函数定义的位置则无此要求

```cpp
#include <iostream>

// 将函数原型放到前面，具体定义放到 main() 之后
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

### 变量名

* 只能使用字母字符、数字和下划线
* 第一个字符不能是数字
* 区分大小写
* 以 两个下划线 或 下划线加大写字母 打头的名称被保留给实现(编译器及其使用的资源)使用
* 以一个下划线开头的名称被保留给实现，用作全局标识符
* 对名称长度没有限制(而 ANSI C 中只保证前 63 个字符有意义)

名称要使用多个单词时，`lowercase_with_underscores` `lowCamelCase` 这两种形式都是可以的，选一种就好。


## 处理数据

内置的 C++ 类型分两组：基本类型和复合类型。

C++ 的基本类型分为两组：一组由存储为整数的值组成，另一组由存储为浮点格式的值组成。

整型(有符号) `short` `int` `long` `long long`  
整型(无符号) `unsigned short` `unsigned` `unsigned long` `unsigned long long`  
整型(其他) `bool` `char` `signed char` `unsigned char`  
浮点型 `float` `double` `long double`

C++ 使用运算符来提供对数字类型的算术运算：加、减、乘、除 和 求模。

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
typeName(value)   // C++ 新格式，让强制类型转换看起来更像函数调用
```

编译器能够推断出变量的类型，以前编译器利用推断的类型来指出声明错误，而 `auto` 则可让你直接使用这种推断能力。`auto` 在 C 语言中是用于标记自动存储的，但几乎用不到，这里又重新给予了 `auto` 关键字新的生命。

```cpp
// 类型推断 auto
auto x = 1.5;  // x is double
```


## 复合类型

C++ 让程序员能够使用基本的内置类型来创建更复杂的类型。最高级的形式是类，但本章先讨论其他形式：数组(存储多个同类型的值)、结构(存储多个不同类型的值)、指针(标示内存位置)。如何创建和存储文本字符串及如何使用。最后还将学习 C++ 处理内存分配的一些方法。

### 数组

**数组 array** 能够存储多个同类型的值。

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

#### 数组替代品 `vector` `array`

C++ 标准模版库(STL) 提供了一种数组替代品——模版类 `vector`，而 C++11 新增了模版类 `array`。这些替代品比内置复合类型更复杂更灵活。

模版类 `vector` 类似于 `string` 类，也是一种动态数组。您可以在运行阶段设置 vector 对象的长度，可在末尾附加新数据，还可在中间插入新数据。基本上，它是使用 `new` 创建动态数组的替代品。实际上，vector 类确实使用 `new` 和 `delete` 来管理内存，但这种工作是自动完成的。

```cpp
#include <vector>
int main()
{
  using std::vector;
  vector<int> vi;
}
```

vector 类的功能比数组强大，但付出的代价是效率稍低。如果你需要的是长度固定的数组，则 C++ 新增的 array 类是更好的选择。与数组一样，array 对象的长度也是固定的，也使用栈(静态内存)而不是堆，因此其效率与数组相同，但更方便更安全。

```cpp
#include <array>
int main()
{
  using std::array;
  array<int, 5> ai;  // array<type, const int> 第二个参数必须是编译期常量
  array<double, 4> ad = {1.2, 2.1, 3.4, 4.3};
}
```

```cpp
#include <iostream>
#include <vector>
#include <array>

int main()
{
  using std::array;
  using std::cout;
  using std::endl;
  using std::vector;

  double a1[4] = {1.2, 2.1, 3.4, 4.3};
  vector<double> a2(4);
  a2[0] = 1.2;
  a2[1] = 2.1;
  a2[2] = 3.4;
  a2[3] = 4.3;
  array<double, 4> a3 = {1.2, 2.1, 3.4, 4.3};
  array<double, 4> a4;

  a4 = a3; // valid for array objects of same size
  cout << "&a3: " << &a3 << "\t&a4: " << &a4 << endl;

  int i = -2;
  a3[i] = 20.2;
  cout << "a3[-2]: " << a3[i] << " at " << &a3[i] << endl;
  cout << "&a4[2]: " << &a4[2] << endl;
}
/*
&a3: 0x7ffeebf9e848     &a4: 0x7ffeebf9e828
a3[-2]: 20.2 at 0x7ffeebf9e838   注意看这，a3[-2] 跑到 a4[2] 的地盘去了
&a4[2]: 0x7ffeebf9e838
*/
```

在上例中我们发现有一行代码 `a3[-2] = 20.2;`，其含义为：找到 a3 指向的地方，向前移两个 double 元素，并将 20.2 存储到目的地。也就是说，C++ 允许将信息存储到数组外面，与 C 语言一样，C++ 不检查这种超界错误。这表明数组的行为是不安全的。vector 和 array 类在使用 `[]` 表示法时的行为也类似，但提供了另一种选择。你可以使用成员函数 `at()` 来访问元素，`at()` 会在运行期间捕获非法索引，程序默认将中断。这种额外的检查的代价是运行时间更长。


### 字符串

C 风格字符串具有一种特殊的性质：以空字符(null character)结尾，空字符写作 `\0`，其 ASCII 码为 `0`，用来标记字符串的结尾。

用双引号括起的字符串字面量隐式地包括结尾的空字符。请注意 `'S'` 跟 `"S"` 之间的区别，`"S"` 不是字符常量，它表示的是两个字符 `'S'` `'\0'` 组成的字符串，进一步说，`"S"` 实际上表示的是字符串所在的内存地址。

```cpp
char abc[3] = {'a', 'b', 'c'};        // not a string!
char abc[4] = {'a', 'b', 'c', '\0'};  // a string

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
  cout << "strlen(name):\t " << strlen(name) << endl;
  cout << "sizeof name:\t " << sizeof name << endl;   // 也可以写成 sizeof() 视觉效果更统一

  name[2] = 0; // 这个厉害，直接把字符串给截短了
  cout << "name[2]=0; name: " << name << endl;
}
/*
strlen(name):    5
sizeof name:     10
name[2]=0; name: ga
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

`cin.getline(接收输入的数组名称, 要读取的字符数)` 在读取指定数目(streamsize-1)的字符或遇到换行符时停止读取。

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

#### `string` 类

C++98 标准通过添加 `string` 类扩展了 C++ 库，因此现在可以用 string 类型的变量(使用 C++ 的话说是对象)而不是字符数组来存储字符串。string 类使用起来比数组简单，同时提供了将字符串作为一种数据类型的表示方法。string 类定义隐藏了字符串的数组性质，让您能够像处理普通变量那样处理字符串。

```cpp
#include <iostream>
#include <string>    # 当前发现 string 已经在 iostream 里了，可以省掉这行
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

结构是用户定义的类型，可以将多个不同类型的值存储在同一个数据对象中。使用结构的第一步是创建结构模版(结构声明)，它定义结构存储了哪些成员。模板的名称将成为新类型的标识符，然后就可以声明这种类型的结构变量。结构中的每一项被称为结构成员，可以使用成员运算符 `.` 来访问各个成员。

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


## 指针

指针也是一种复合类型，鉴于其重要性，这边单独拎出来讲。

### 认识指针 `*` `&`

计算机程序在存储数据时必须跟踪的3种基本属性：信息存储在何处、存储的值为多少、存储的信息是什么类型。您使用过一种策略来达到上述目的：定义一个简单变量。声明语句指出了值的类型和符号名，还让程序分配内存，并在内部跟踪该内存单元。

现在我们再看一种以指针为基础的新策略。指针是一个变量，其存储的是值的地址而不是值本身。对普通变量应用地址运算符 `&` 就可以获得它的位置，如 `&home`。

```cpp
int a = 5;
int b = 10;
cout << &a << "  " << &b << endl;
/*
0x7ffee169d8ec  0x7ffee169d8e8  (这里可看到两值间相差 4)
*/
```

使用常规变量时，值是指定的量，而地址为派生量。而使用指针时刚好相反，将地址视为指定的量，而将值视为派生量。

`*` 运算符被称为 **间接值 indirect value 运算符** 或 **解除引用 dereferencing 运算符**，将其应用于指针，可以得到地址处存储的值(这和乘法使用的符号相同，C++ 根据上下文来区分)。

```cpp
int num = 6;
int *p_num = &num;  // p_num 的类型是指向 int 值类型的指针，可记成 int*
*p_num += 1;
cout << *p_num << endl;
/*
7
*/
```

指针策略是 C++ 内存管理编程理念的核心。*面向对象编程与传统的过程性编程的区别在于，OOP 强调的是运行阶段(而不是编译阶段)进行决策*。运行阶段决策提供了灵活性，可以根据运行时的情况进行调整。...总之，使用 OOP 时，您可能在运行阶段确定数组的长度。C++ 采用 `new` 关键字请求正确数量的内存以及使用指针来跟踪新分配内存的位置。

*和数组一样，指针也是复合类型，是基于其他类型的*。指针类型记录的是内存地址，地址一般需占用2个或4个字节，这取决于计算机系统，甚至有的系统会针对不同的类型使用不同长度的地址。在 C++ 中创建指针时，计算机将分配用来存储地址的内存，但不会分配用来存储指针所指向的数据的内存。为数据提供空间是一个独立的步骤。

```cpp
int *p1, *p2, p3;  // 注意：这里 p1 和 p2 是指针类型，而 p3 是 int 类型
```
```cpp
// 指针的危险性
long *p1, p2;
*p1 = 123;  // 在没有对指针进行初始化的情况下就对指针指向的值进行赋值，是极其危险的，产生的 bug 死了都找不出来
p2 = 123;   // 这种错误倒不会有问题，编译器直接提示类型不匹配
```

### 分配内存 `new`

前面我们都将指针初始化为变量的地址，*变量是在编译时分配的有名称的内存*，而指针只是给这段内存提供了个别名。*指针真正的用武之地在于，在运行阶段分配未命名的内存以存储值*。在这种情况下，通过指针来访问内存是唯一可选的方式。在 C 语言中，可以用库函数 `malloc()` 来分配内存，在 C++ 中则有更好用的 `new` 运算符。

```cpp
int *p = new int;  // 分配一块适合存储 int 类型的内存，并返回地址给 p 指针
cout << *p;        // 打印指针 p 指向的内存中的值，此时值是 0
```

需要指出的是，常规变量声明分配的内存都在被称为 **栈 stack** 的内存区块中，而 `new` 运算符则是从被称为 **堆 heap** 或 **自由存储区 free store** 的内存区域中分配内存的。

当内存被耗尽时，调用 `new` 通常会引发异常，而在老的实现中，`new` 将返回 0。在 C++ 中，值为 0 的指针被称为 **空指针 null pointer**。C++ 确保空指针不会指向有效的数据，因此它常被用来表示运算符或函数失败。

### 删除内存 `delete`

在使用完内存后可以使用 `delete` 将其归还给内存池。一定要配对地使用 `new` 和 `delete`，否则将发生 **内存泄漏 memory leak**，也就是说，被分配的内存如果不 **释放 free** 就再也无法被使用了。

不要尝试释放已经释放过的内存块，C++ 标准指出，这样做的结果将是不确定的。另外不能使用 `delete` 来释放声明变量所获得的内存(它们存在于栈中)。

```cpp
int *p1 = new int;
delete p1;  // OK
delete p1;  // 禁止重复释放

int i = 5;
int *p2 = &i;
delete p2;     // 禁止，栈中的内存不能使用 delete
```

### 创建动态数组

通过声明来创建数组，则在程序被编译时将(在栈中)为它分配内存空间。在编译时给数组分配内存被称为 *静态联编 static binding*。不管程序最终是否使用数组，它都占用了内存。使用 `new` 可以在运行阶段根据实际需要创建数组，这被称为 *动态联编 dynamic binding*，这种数组叫作 *动态数组 dynamic array*。

```cpp
#include <iostream>
int main()
{
  using namespace std;
  int *p_arr = new int[10];
  *p_arr = 1;   // 由于 p_arr 指向数组的第一个元素，所以可以通过 *p_arr 来访问 p_arr[0]
  p_arr[1] = 2; // C 和 C++ 内部都使用指针来处理数组，使用方括号数组表示法等同于对指针解除引用
  cout << p_arr[0] << ", " << p_arr[1] << ", " << p_arr[2] << endl;
  delete[] p_arr;  // 注意这里要带 `[]`
}
/*
1, 2, 0
*/
```

### 指针算术

C++ 允许将指针和整数相加。加 1 的结果等于原来的地址值加上指向的对象占用的总字节数。还可以将一个指针减去另一个指针，获得两个指针的差。减运算仅当两个指针指向同一个数组时才有意义，将得到两个元素的间隔。

指针和数组在 C 和 C++ 里基本等价，原因在于 指针算术 pointer arithmetic 和 C++ 内部处理数组的方式。将整数变量加1后其值将增加1，但将 *指针变量加1后，增加的量等于它指向的类型的字节数*。

```cpp
#include <iostream>
int main()
{
  using namespace std;
  double arr[3] = {10, 20, 30};

  // 获取数组地址的两种不同方式
  double *p = arr;
  double *p1 = &arr[0];
  cout << "p:  " << p << endl
       << "p1: " << p1 << endl;

  // 指针运算
  cout << "p:  " << p << "\t*p: " << *p << endl
       << "p+1: " << p + 1 << "\t*(p+1): " << *(p + 1) << endl
       << "p-1: " << p << "\t*(p-1): " << *(p - 1) << endl
       << "&p[1] - p: " << &p[1] - p << endl;
}
/*
p:  0x7ffee8b318c0
p1: 0x7ffee8b318c0
p:  0x7ffee8b318c0      *p: 10
p+1: 0x7ffee8b318c8     *(p+1): 20
p-1: 0x7ffee8b318c0     *(p-1): 6.95312e-310
&p[1] - p: 1
*/
```

对于一个数组 `int arr[10];`， `&arr[0]` `&arr` 两者从数字上看是两个相同的地址，但从概念上理解，`&arr[0]` 指向数组元素，属于 `int *` 类型，是一个4字节内存块的地址，而 `&arr` 指向数组，属于 `int (*)[10]` 类型，是一个40字节内存块的地址。因此 `arr + 1` 加4，而 `&arr + 1` 加40。

```cpp
#include <iostream>
int main()
{
  using namespace std;
  int arr[10];
  cout << "arr:\t\t" << arr << endl
       << "arr + 1:\t" << arr + 1 << endl
       << "&arr + 1:\t" << &arr + 1 << endl;
}
/*
arr:            0x7ffeeb1368b0
arr + 1:        0x7ffeeb1368b4
&arr + 1:       0x7ffeeb1368d8
*/
```

### 指针和字符串

在 `cout` 和多数 C++ 表达式中，*char 数组名*、*char 指针* 以及 *用引号括起的字符串常量* 都 *被解释为字符串第一个字符的地址*。

一般来说，如果给 `cout` 提供一个指针，它将打印地址，但如果指针类型为 `char *`，则 `cout` 将显示指向的字符串。如果要显示的是字符串的地址，则必须将这种指针强制转换为另一种指针类型，如 `int *`。

```cpp
#include <iostream>
#include <cstring>
int main()
{
  using namespace std;
  char animal[20] = "bear";
  const char *bird = "parrot"; // "parrot" 实际表示的是字符串的地址，因此这条语句将 "parrot" 的地址赋给了 bird
  char *p;

  cout << animal << "  " << bird << endl;
  // cout << p << endl; // 程序执行异常: segmentation fault

  p = new char[strlen(animal + 1)];
  strcpy(p, animal);
  cout << animal << " at " << (int *)animal << endl
       << p << " at " << (int *)p << endl;
}
/*
bear  parrot
bear at 0x7ffee3ae68c0
bear at 0x7fd63dd00520
*/
```

经常需要将字符串放到数组中，初始化数组时请使用 `=` 运算符，否则应使用 `strcpy()` `strncpy()`。当对使用 C 风格字符串和 cstring 库的一些方面有了了解后，便可以理解 C++ `string` 类型的优势了。您不用担心字符串会导致数组越界，并可以使用赋值运算符而不是 `strcpy()`。

```cpp
char arr[5] = "abc";
strcpy(arr, "this is a very very long sentence.");      // segmentation fault
strncpy(arr, "this is a very very long sentence.", 4);  // OK 第3个参数指定要复制的最大字符数
cout << arr << endl;
```

请不要使用字符串常量或未被初始化的指针来接收输入。为避免这些问题，可以使用 `std::string` 而不是数组。

```cpp
// 测试用小数组接收长输入
#include <iostream>
#include <cstring>
int main()
{
  using namespace std;
  char str[4];
  cin >> str;
  cout << strlen(str) << "  " << str << endl;
}
/* 录入短的字符串 OK
abcdef
6  abcdef
*/
/* 录入长字符串异常
abcdefghijklmn
14  abcdefghijklmn
[1]    82146 illegal hardware instruction
*/
```

有些编译器将字符串字面值视为只读常量，如果试图修改它们将导致运行阶段错误。有些编译器只使用字符串字面值的一个副本来表示程序中所有的该字面值，对于这一次，C++ 并不保证字符串字面值被唯一地存储。也就是说，如果程序中多次使用了字符串字面值 “parrot”，则编译器可能存储该字符串的多个副本，也可能只存储一个副本。

```cpp
// 测试同一个字面值是否对应的相同地址，本次试验显示是同一个地址
#include <iostream>
#include <cstring>
int main()
{
  using namespace std;
  const char *str1 = "same";
  const char *str2 = "same";
  cout << (int *)str1 << "  " << (int *)str2 << endl;
}
/*
0x108dbef5c  0x108dbef5c
*/
```

### 创建动态结构

创建动态结构时，这种结构没有名称，所以无法使用 **点运算符** `.` 获取结构的成员。于是 C++ 又提供了一个 **间接成员运算符** / **箭头运算符** `->` 来访问成员。即，`.` 用于结构名，而 `->` 用于指向结构的指针。

由于类和结构非常相似，因此本节介绍的有关结构的技术也适用于类。

```cpp
#include <iostream>
#include <cstring>
int main()
{
  using namespace std;
  struct person
  {
    char name[20];
    int age;
  };
  person *me = new person;
  strcpy(me->name, "gavin");  // me->age
  (*me).age = 33;             // (*me).age   加括号是因为运算符的优先级
  cout << (*me).name << "  " << me->age << endl;
  delete me;
}
```

### 用户输入

下面介绍一个使用 `new` `delete` 来存储通过键盘输入的字符串的示例。示例中定义了一个 `getInput()` 函数，该函数将输入读入到一个大型的临时数组中，然后使用 `new []` 创建一个刚好存储该输入的内存块，并返回该内存块的指针。对于读取大量字符串的程序，这种方法可以节省大量内存(实际编写程序时，使用 `string` 类将更容易，因为 `new` 和 `delete` 被封装到类内部了)。

```cpp
#include <iostream>
#include <cstring>
using namespace std;
void printInput();
char *getInput();
int main()
{
  printInput();
  printInput();
}

void printInput()
{
  char *str = getInput();
  cout << str << " at " << (int *)str << endl;
  delete str;
}

char *getInput()
{
  char temp[80];
  cout << "Enter your input: ";

  cin >> temp;
  char *str = new char[strlen(temp) + 1];
  strcpy(str, temp);
  return str;
}
/*
Enter your input: abc
abc at 0x7f84964018e0
Enter your input: def
def at 0x7f84964018e0   // C++ 不保证新释放的内存就是下一次 new 时选择的内存
*/
```


## 循环和分支


## 函数

函数是 C++ 的编程模块，是基本的编程部件。

最后将介绍函数指针，它使程序员能够通过函数参数来命令函数使用另一个函数。


## 内存模型和名称空间




### 内存管理简介

C++ 有3种管理数据内存的方式：**自动存储**、**静态存储** 和 **动态存储**(亦叫 **自由存储空间** 或 **堆**)。C++11 还新增了 **线性存储**。

1.自动存储

在函数内部定义的常规变量使用自动存储空间，被称为 **自动变量 automatic variable**，这意味着它们在所属的函数被调用时自动产生，在该函数结束时消亡。实际上，自动变量是一个局部变量，其作用域为包含它的代码块。自动变量通常存储在栈中。这意味着执行代码块时，其中的变量将依次加入到栈中，而在离开代码块时，将按相反的顺序释放这些变量，这被称为先进先出(LIFO)。因此，在程序执行过程中，栈将不断地增大和缩小。

2.静态存储

静态存储是整个程序执行期间都存在的存储方式。使变量成为静态的方式有两种：一种是在函数外面定义它，另一种是在声明变量时使用关键字`static`。自动存储和静态存储的关键在于，这些方法严格限制了变量的寿命。

3.动态储存

`new` 和 `delete` 运算符提供了一种比自动变量和静态变量更灵活的方式。它们管理了一个内存池，这在 C++ 中被称为 **自由存储空间 free stroe** 或 **堆 heap**。*该内存池同用于静态变量和自动变量的内存是分开的*。`new` 和 `delete` 让您能够在一个函数中分配内存，而在另一个函数中释放它，数据的生命周期不完全受程序或函数的生存时间控制。与使用常规变量相比，`new` `delete` 赋予了程序员更大的控制权，当然，内存管理也更复杂了。在栈中，自动添加和删除机制使得占用的内存总是连续的，但 `new` `delete` 的相互影响可能导致占用的自由存储区不连续，这使得跟踪新分配内存的位置更困难。

4.内存泄漏

如果使用 `new` 在堆中创建变量后没有用 `delete` 释放，则即使包含指针的内存由于作用域规则和对象生命周期的原因而被释放，在自由存储空间上动态分配的变量或结构仍将继续存在。因为指向这些内存的指针已经不存在了，这些内存空间无法被使用，这就是 **内存泄漏**。内存被分配出去，却无法被回收，在内存泄漏非常严重的情况下，会出现内存耗尽错误，导致程序崩溃。另外，这些泄漏还会给一些操作系统或在相同的内存空间中运行的应用程序带来负面影响，导致它们崩溃。

即使是最好的程序员和软件公司，也可能导致内存泄漏。要避免内存泄漏，最好是养成同时使用 `new` 和 `delete` 的习惯。另外，C++ 智能指针有助于自动完成这种任务。

指针是功能最强大的 C++ 工具之一，但也最危险，因为它们允许执行对计算机不友好的操作，如使用未经初始化的指针来访问内存或试图重复释放同一个内存块。另外，在通过实践习惯指针表示法和指针概念之前，指针是容易引起迷惑的。

### 单独编译

如何创建多文件程序，分配和管理内存的各种方式

C++ 鼓励程序员在开发程序时使用多个文件。一种有效的组织策略是，使用头文件来定义用户类型，为操纵用户类型的函数提供函数原型；并将函数定义放在一个独立的源代码文件中。头文件和源代码文件一起定义和实现了用户定义的类型及其使用方式。最后，将 main() 和其他使用这些函数的函数放在第三个文件中。

组织程序的策略，将程序分为3个部分
* 头文件：包含结构声明和使用这些结构的函数的原型
* 源代码文件：包含与结构有关的函数的代码
* 源代码文件：包含调用与结构相关的函数的代码

请不要将函数定义或变量声明放到头文件中。如果在头文件中包含一个函数定义，然后在其他两个文件(属于同一个程序)中包含该头文件，则同一个程序中将出现两次同一个函数的定义，编译器会报错。头文件中常包含的内容
* 函数原型
* 使用 #define 或 const 定义的符号常量
* 结构声明
* 类声明
* 模板声明
* 内联函数

包含头文件时，使用 `<>` 和 `""` 的差别：
* `<iostream>` 编译器将在 存储标准头文件的 主机系统的文件系统中 查找
* `"myutil"` 编译器将首先查找当前的工作目录或源代码目录(或其他目录)，最后才到标准位置查找





### 存储连续性、作用域和链接性

|       | 作用域     | 链接性  |
--------|-----------|----------
||

作用域、链接、名称空间，这些内容决定了变量在程序的哪些部分是可见的。

C++ 的存储方案决定了变量保留在内存中的时间(存储持续性)以及程序的哪一部分可以访问它(作用域和链接性)。

自动变量是在代码块中定义的变量。仅当程序执行到包含定义的代码块时，它们才存在，并且可见。

静态变量在整个程序执行期间都存在。对于在函数外面定义的变量，其所属文件中位于该变量的定义后面的所有函数都可以使用它(文件作用域)，并可在程序的其他文件中使用(外部链接性)。另一个文件要使用这种变量，必须使用 `extern` 关键字来声明它。对于文件间共享的变量，应在一个文件中包含其定义声明，并在其他文件中包含引用声明(使用 `extern` 且不初始化)。在函数的外面使用关键字 `static` 定义的变量的作用域为整个文件，但是不能用于其他文件(内部链接性)。在代码块中使用关键字 `static` 定义的变量被限制在该代码块内(局部作用域、无链接性)，但在整个程序执行期间，它都一直存在并且保持原值。

在默认情况下，C++ 函数的链接性为外部，因此可在文件间共享；但使用关键字 `static` 限定的函数的链接性为内部的，被限制在定义它的文件中。

### 名称空间

名称空间允许定义一个可在其中声明标识符的命名区域。这样做的目的是减少名称冲突，尤其当程序非常大，并使用多个厂商的代码时。可通过使用作用域解析运算符、using声明 或 using 编译指令，来使名称空间中的标识符可用。
