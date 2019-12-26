# Standard Library


## Input and Output  `stdio.h`

```c
/* Macros */
#define EOF (-1)
#define NULL ((void *)0)
#define stderr __stderrp
#define stdin  __stdinp
#define stdout __stdoutp

#define BUFSIZ 1024
#define FILENAME_MAX 1024
#define FOPEN_MAX 20
#define TMP_MAX 308915776

#define SEEK_SET 0
#define SEEK_CUR 1
#define SEEK_END 2

/* Types */
typedef struct __sFILE { int _r; int _w; ...} FILE;
typedef __int64_t  fpos_t;  // used for file sizes
typedef unsigned long size_t;  // result of the `sizeof`

/* Prototypes */
// printf & scanf
int printf(const char *format, ...);
int scanf(const char *format, ...);

int sprintf(char *str, const char *format, ...);
int snprintf(char *str, size_t n, const char *format, ...);
int sscanf(const char *str, const char *format, ...);

int fprintf(FILE *stream, const char *format, ...);
int fscanf(FILE *stream, const char *format, ...);

// file
FILE* fopen(const char *filename, const char *mode);
FILE* freopen(const char *filename, const char *mode, FILE *stream);
int fclose(FILE *stream);
int fflush(FILE *stream);
int remove(const char *filename);
int rename(const char *old, const char *new);

// Reads an array of `nmemb` elements, each one with a size of `size` bytes, from the `stream` and stores them in the block of memory specified by `ptr`.
size_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream);
// Writes an array of `nmemb` elements, from `ptr` to the current position in the `stream`.
size_t fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream);

int getchar(void);
int putchar(int c);
int getc(FILE *stream);
int putc(int c, FILE *stream);
int ungetc(int c, FILE *stream);  // `getc` 的反操作
int fgetc(FILE *stream);
int fputc(int c, FILE *stream);

// line Input and Output
char* fgets(char *s, int n, FILE *stream);  // reads the next input line (including the newline) from file stream into the character array s. Normally returns s, on end of file or error it returns NULL.
int fputs(const char *s, FILE *stream);  // writes a string(which need not contain a newline) to a file, return EOF if an error occurs, and non-negative otherwise
char* gets(char* s);  // C++14 中被移除, 用 `fgets(str, MAX_LIMIT, stdin);` 替换以避免 Buffer Overflow
int puts(const char* s);  // similar to `fputs` but operate on `stdout`. Confusingly, `gets` delets the terminal '\n' and `puts` adds it.

FILE* tmpfile(void);
char* tmpnam(char *s);

void setbuf(FILE *stream, char *buf);
int setvbuf(FILE *stream, char *buf, int mode, size_t size);

int vfprintf(FILE *stream, const char *format, va_list arg);
int vfscanf(FILE *stream, const char *format, va_list arg);
int vprintf(const char *format, va_list arg);
int vscanf(const char *format, va_list arg);
int vsnprintf(char *s, size_t n, const char *format, va_list arg);
int vsprintf(char *s, const char *format, va_list arg);
int vsscanf(const char *s, const char *format, va_list arg);

// Error Handling
int ferror(FILE *stream);
int feof(FILE *stream);

int fgetpos(FILE *stream, fpos_t *pos);
int fseek(FILE *stream, long offset, int whence);
int fsetpos(FILE *stream, const fpos_t *pos);
long ftell(FILE *stream);
void rewind(FILE *stream);
void clearerr(FILE *stream);
void perror(const char *s);
```

```c
#include <stdio.h>
int main() {
  int c;  // EOF is not char
  while ((c = getchar()) != EOF)  // end-of-file signal
    putchar(c);
}
```

### `printf`

格式化输出语句，也可以说是占位输出，是将各种类型的数据按照格式化后的类型及指定的位置进行显示。

```c
// 格式: printf("输出格式符", 输出项);
printf("整数 %d 小数 %f 字符 %c 字符串 %s", 1, 3.45, 'a', "str");
```

||
:----:|--------------------------------------------------------------------
 d, i | decimal number
  o   | unsigned octal number without a leading zero
 x, X | unsigned hexadecimal number without a leading `0x` or `0X`
  u   | unsigned decimal number
  c   | single character
  s   | print characters until a `'\0'` or by the precision
  f   | `m.dddddd` where the number of d's is given by the precison
 e, E | `m.dddddde±xx` `m.ddddddE±xx`
 g, G | use `%e` or `%f`, trailing zeros and a trailing decimal point are not printed
  p   | pointer (implementation-dependent representation)
  %   | print a %

Between the `%` and the conversion character there may be, in order:
* A minus sign, which specifies left adjustment of the converted argument
* A number that specifies the minimum field width
* A period, which separates the field width from the precision
* A number, the precision, that specifies the maximum number of characters to printed from a string, or the number of digits after the decimal point of a floating-point value, or the minimum number of digits for an integer.
* An h if the integer is to be printed as a short, or l if as a long

A width or precision may be specified as `*`, in which case the value is computed by converting the next argument(which must be an int), e.g. `printf("%.*s", max, s);`.

The function `sprintf` does the same conversions as `printf` does, but stores the output in a string:

```c
int sprintf(char *str, char *format, arg1, arg2, ...);
```

```c
char * str = "hello, world";

printf("%15.10s\n", str);  // "     hello, wor"
printf("%-10.5s\n", str);  // "hello     "

// %6f    print as floating point, at least 6 characters wide
// %.2f   print as floating point, 2 characters after decimal point
// %6.2f  print as floating point, at least 6 wide and 2 after decimal point
printf("%3d %4.1f\n", 5, 6.0);  // "  5 6.0"  %4.1f 至少4位宽，其中小数显示1位
printf("%o", 8);  // "10"
```

### `scanf`

`int scanf(char *format, ...)` reads characters from the standard input, interprets them according to the specification in `format`, and stores the results through the remaining arguments.

There is also a function `sscanf` that reads from a string instead of the standard input: 

```c
int sscanf(char *string, char *format, arg1, arg2, ...);
```

```c
int main()
{
  char key[20];
  int val;
  while(scanf("%s : %i ,", key, &val) == 2)  // 调试时必须用空格将每一项隔开，后面一版直接操作字符串就没这些问题
    printf("{%s, %d}\n", key, val);
}
/*
a : 1, b : 2, c: 3, d : 4
{a, 1}
{b, 2}
*/
```

```c
int main(int argc, char * argv[])
{
    char key[20];
    int val;
    char *str = "age : 12";  // 不能是 "age: 12"
    sscanf(str, "%s:%d", key, &val);
    printf("{%s, %d}\n", key, val);
}
```



## Utility Functions  `stdlib.h`

### Dynamic Memory Management

```c
// Obtain blocks of memory dynamically (from heap)
// Return a pointer to `size` bytes of uninitialized storage, or `NULL` when request cannot be satisfied.
// The type of returned pointer is `void *` which can be cast to be the desired type of data pointer.
void *malloc(size_t size);

// Return a pointers to enough space for an array of `count` objects of the specified `size`,
// and initializes all its bits to zero.
void *calloc(size_t count, size_t size);

// frees the space pointed to by `ptr`
void free(void *ptr);

// Reallocate memory block, e.g. changes the size of the memory block pointed to by ptr.
// The content of the memory block is preserved up to the lesser of the new and old sizes,
// even if the block is moved to a new location.
// If the new size is larger, the value of the newly allocated portion is indeterminate.
void *realloc(void *ptr, size_t size);
```

```c
#include <stdio.h>
#include <stdlib.h>

void printArray(int *arr, int size) {
  printf("[");
  for (int i = 0; i < size; i++)
    printf("%d, ", arr[i]);
  printf("\b\b]\n");
}

int main() {
  int *arr = (int *)malloc(sizeof(int) * 6);
  printArray(arr, 6);
  free(arr);
  arr = (int *)calloc(6, sizeof(int));
  printArray(arr, 6);
  for (int i = 0; i < 6; i++)
    arr[i] = i + 1;
  printArray(arr, 6);
  arr = realloc(arr, sizeof(int) * 4);
  printArray(arr, 6); // it should be 4
  arr = realloc(arr, sizeof(int) * 8);
  printArray(arr, 8);
  free(arr);
}
/*
[0, 0, 0, 0, 0, 0]
[0, 0, 0, 0, 0, 0]
[1, 2, 3, 4, 5, 6]
[1, 2, 3, 4, 0, -1073741824]
[1, 2, 3, 4, 0, -1073741824, 0, -1073741824]
*/
```

### Searching and Sorting

```c
void qsort (void *base, size_t num, size_t size, int (*compar)(const void *, const void *));

void *bsearch(const void *key, const void *base, size_t num, size_t size,
              int (*compar)(const void *, const void *));
```

```c
int compare(const void *a, const void *b) {
  return (*(int *)a - *(int *)b);
}

int main() {
  int values[] = {3, 6, 9, 12, 577, 23};
  qsort(values, 6, sizeof(int), compare);
}
```

### Pseudo-random Sequence Generation

```c
rand();
unit32_t acr4random();  // 随机数
```

### String Conversion

```c
// 字符串转整数
atoi("100");  // 100
```

### Environment

```c
void abort(void);
void exit(int status);
int system(const char *command);  // executes the command contained in the string `command`
char *getenv(const char *);
```



## String Functions  `string.h`

```c
// length
size_t strlen(const char *str);  // 获取的长度不包括 `'\0'` 而且汉字和字母的长度是不一样的

// copy 覆盖
char *strcpy (char *dst, const char *src);  // copy src to dst, including '\0', return dst
char *strncpy(char *dst, const char *src, size_t n);  // copy at most n characters

// concatenate 追加
char *strcat (char *s1, const char *s2);  // concatenate s2 to end of s1
char *strncat(char *s1, const char *s2, size_t n);  // cat at most n characters

// compare
int strcmp (const char *s1, const char *s2);  // 逐个转成 ASCII 码比较，返回值记为 s1 - s2
int strncmp(const char *s1, const char *s2, size_t n);  // compare at most n characters

// character pointer
const char *strchr(const char *s, int c);  // return pointer to first `c` in `s` or NULL
      char *strchr(      char *s, int c);
const char *strrchr(const char *s, int c); // return pointer to last `c` in `s` or NULL
      char *strrchr(      char *s, int c);

// string pointer
const char *strpbrk(const char *s1, const char *s2);  // first occurrence in s1 of any char of s2
      char *strpbrk(      char *s1, const char *s2);
const char *strstr(const char *s1, const char *s2);   // first occurrence of s2 in s1
      char *strstr(      char *s1, const char *s2);

size_t strspn(const char *s1, const char *s2);
size_t strcspn(const char *s1, const char *s2);

char *strerror(int errnum);
char *strtok(char *s1, const char *s2);

int strcoll(const char *s1, const char *s2);
size_t strxfrm(char *s1, const char *s2, size_t n);
```

```c
void *memcpy(void *dst, const void *src, size_t n);  // binary copy n bytes from src to dst
void *memmove(void *dst, const void *src, size_t n); // memcpy() + allowing the dst and src to overlap

int memcmp(const void *s1, const void *s2, size_t n);
const void *memchr(const void *s, int c, size_t n);
      void *memchr(      void *s, int c, size_t n);
void *memset(void *s, int c, size_t n);
```


## Character Class Tests  `ctype.h`

```c
int isalpha(int c);  // non-zero if c is alphabetic, 0 if not
int isupper(int c);  // non-zero if c is upper case, 0 if not
int islower(int c);  // non-zero if c is lower case, 0 if not
int isdigit(int c);  // non-zero if c is digit, 0 if not
int isalnum(int c);  // non-zero if isalpha or isdigit, 0 if not
int isspace(int c);  // non-zero if c is blank, tab, newline, return, formfeed, vertical tab
int toupper(int c);  // return c converted to upper case
int tolower(int c);  // return c converted to lower case
```


## Mathematical Functions  `math.h`

```c
/* Trigonometric Functions */
double sin(double x);

/* Exponential and Logarithmic Functions */
double exp(double x);   // the base-e exponential function of x
double log(double x);   // the natural logarithm of x
double log10(double x); // the common (base-10) logarithm of x

/* Power Functions */
double sqrt(double x);  // the square root of x
double pow(double base, double exponent);  // base raised to the power exponent: base^exponent

/* Rounding and Remainder Functions */
double ceil(double x);
double floor(double x);
double round(double x);

/* Other Functions */
int abs (int n);
double fabs (double x);
```

```
sin(x)      正弦函数 sine of x, in radians
cos(x)      余弦函数 cosine of x, in radians
atan2(y, x) 反正切函数 arctangent of y/x, in radians
exp(x)      指数函数(e^x) exponential function
log(x)      对数函数 natural (base e) logarithm of x
log10(x)    对数函数 common (base 10) logarithm of x
pow(x, y)   幂函数(x^y) x to the power of y
sqrt(x)     平方根(x^0.5) square root of x
fabs(x)     绝对值(|x|) absolute value of x
```



## Diagnostics  `assert.h`



## Variable Argument Lists  `stdarg.h`

The header `<stdarg.h>` provides facilities for stepping through a list of function arguments of unknown number and type.

```c
#include <stdio.h>
#include <stdarg.h>

void print_int(int, ...);

int main(int argc, const char *argv[]) {
  print_int(4, 1, 2, 3);
}

void print_int(int argc, ...) {  // 剩余参数前至少要有一个形参
  va_list ap;  // va_list: variable arguments list, ap: argument pointer
  va_start(ap, argc);  // va_start() va_end() 就当是一种格式吧，必须得这么写
  while (--argc)
    printf("%d\n", va_arg(ap, int));  // 调用一次 va_arg() 获取一个参数
  va_end(ap);
  printf("bye ...\n");
}
```



## Non-local Jumps  `setjmp.h`


## Signals  `signal.h`


## Date and Time Functions  `time.h`


## Implementation-defined Limits  `limits.h` `float.h`

### Sizes of Integral Types `limits.h`

||||
-----------|------------------------------------------|------------------------------
CHAR_BIT   | Number of bits in a char object (byte)   |  8 or greater*
SCHAR_MIN  | Minimum value of type signed char        | -127 (-2^7+1) or less*
SCHAR_MAX  | Maximum value of type signed char        | 127 (2^7-1) or greater*
UCHAR_MAX  | Maximum value of type unsigned char      | 255 (2^8-1) or greater*
CHAR_MIN   | Minimum value of type char               | SCHAR_MIN or 0
CHAR_MAX   | Maximum value of type char               | SCHAR_MAX or UCHAR_MAX
SHRT_MIN   | Minimum value of type short int          | -32767 (-2^15+1) or less*
SHRT_MAX   | Maximum value of type short int          | 32767 (2^15-1) or greater*
USHRT_MAX  | Maximum value of type unsigned short int | 65535 (2^16-1) or greater*
INT_MIN    | Minimum value of type int                | -32767 (-2^15+1) or less*
INT_MAX    | Maximum value of type int                | 32767 (2^15-1) or greater*
UINT_MAX   | Maximum value of type unsigned int       | 65535 (2^16-1) or greater*
LONG_MIN   | Minimum value of type long int           | -2147483647 (-2^31+1) or less*
LONG_MAX   | Maximum value of type long int           | 2147483647 (2^31-1) or greater*
ULONG_MAX  | Maximum value of type unsigned long int  | 4294967295 (2^32-1) or greater*

* The actual value depends on the particular system and library implementation.

### Characteristics of Floating-point Types `float.h`


