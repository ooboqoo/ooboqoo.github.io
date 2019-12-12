# C Coding Style

https://www.maultech.com/chrislott/resources/cstyle/  
https://developer.gnome.org/programming-guidelines/stable/c-coding-style.html.en  
https://google.github.io/styleguide/cppguide.html  

## C

### The Single Most Important Rule

The single most important rule when writing code is this: *check the surrounding code and try to imitate it.*

### 命名

```c
#define HELLO_WORLD "hello world"

typedef int Length;
typedef char *String;

Length lowercase_variable_name_with_underscores = 1;
String str = HELLO_WORLD;
```

### Braces

Curly braces should not be used for single statement blocks. But it has four exceptions: ...

### Macros

Try to avoid private macros unless strictly necessary. Remember to `#undef` them at the end of a block or a series of functions needing them.

Inline functions are usually preferable to private macros.

Public macros should not be used unless they evaluate to a constant.

### Public API

Avoid exporting variables as public API, since this is cumbersome on some platforms. It is always preferable to add getters and setters instead. Also, beware global variables in general.

### Private API

Non-exported functions that are needed in more than one source file should be prefixed with an underscore and declared in private header file. `_mylib_internal_foo()`

Non-exported functions that are only needed in one source file should be declared static.



## C++

### Naming

#### File Names

my_useful_class.cpp

#### Variable Names

The names of variables (including function parameters) and data members are all lowercase, with underscores between words. Data members of classes (but not structs) additionally have trailing underscores.

```cpp
a_local_variable
a_struct_data_member
a_class_data_member_
```

#### Constant Names

Variables declared constexpr or const, and whose value is fixed for the duration of the program, are named with a leading "k" followed by mixed case. Underscores can be used as separators in the rare cases where capitalization cannot be used for separation.

```cpp
const int kDaysInAWeek = 7;
const int kAndroid8_0_0 = 24;  // Android 8.0.0
```

