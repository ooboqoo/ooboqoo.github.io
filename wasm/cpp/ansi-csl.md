# Standard Library

```c
#include <stdio.h>  // Input and Output
#include <string.h> // String Functions
```


## Input and Output  `stdio.h`

```c
// Macros (#define)
BUFSIZ
EOF
FILENAME_MAX
FOPEN_MAX
L_tmpnam
NULL
SEEK_CUR
SEEK_END
SEEK_SET
TMP_MAX
_IOFBF
_IOLBF
_IONBF
stderr
stdin
stdout

// Types (typedef)
FILE    // an object type suitable for storing information for a file stream.
fpos_t
size_t  // is the unsigned integral type and is the result of the `sizeof` keyword.

// Prototypes
int remove(const char* filename);
int rename(const char* old, const char* new);
FILE* tmpfile(void);
char* tmpnam(char* s);
int fclose(FILE* stream);
int fflush(FILE* stream);
FILE* fopen(const char* restrict filename, const char* restrict mode);
FILE* freopen(const char* restrict filename, const char * restrict mode,
              FILE * restrict stream);
void setbuf(FILE* restrict stream, char* restrict buf);
int setvbuf(FILE* restrict stream, char* restrict buf, int mode, size_t size);
int fprintf(FILE* restrict stream, const char* restrict format, ...);
int fscanf(FILE* restrict stream, const char * restrict format, ...);
int printf(const char* restrict format, ...);
int scanf(const char* restrict format, ...);
int snprintf(char* restrict s, size_t n, const char* restrict format, ...);    // C99
int sprintf(char* restrict s, const char* restrict format, ...);
int sscanf(const char* restrict s, const char* restrict format, ...);
int vfprintf(FILE* restrict stream, const char* restrict format, va_list arg);
int vfscanf(FILE* restrict stream, const char* restrict format, va_list arg);  // C99
int vprintf(const char* restrict format, va_list arg);
int vscanf(const char* restrict format, va_list arg);                          // C99
int vsnprintf(char* restrict s, size_t n, const char* restrict format,         // C99
              va_list arg);
int vsprintf(char* restrict s, const char* restrict format, va_list arg);
int vsscanf(const char* restrict s, const char* restrict format, va_list arg); // C99
int fgetc(FILE* stream);
char* fgets(char* restrict s, int n, FILE* restrict stream);
int fputc(int c, FILE* stream);
int fputs(const char* restrict s, FILE* restrict stream);
int getc(FILE* stream);
int getchar(void);
char* gets(char* s);  // removed in C++14
int putc(int c, FILE* stream);
int putchar(int c);
int puts(const char* s);
int ungetc(int c, FILE* stream);
size_t fread(void* restrict ptr, size_t size, size_t nmemb,
             FILE* restrict stream);
size_t fwrite(const void* restrict ptr, size_t size, size_t nmemb,
              FILE* restrict stream);
int fgetpos(FILE* restrict stream, fpos_t* restrict pos);
int fseek(FILE* stream, long offset, int whence);
int fsetpos(FILE*stream, const fpos_t* pos);
long ftell(FILE* stream);
void rewind(FILE* stream);
void clearerr(FILE* stream);
int feof(FILE* stream);
int ferror(FILE* stream);
void perror(const char* s);
```


```txt
%d     print as decimal integer
%6d    print as decimal integer, at least 6 characters wide
%f     print as floating point
%6f    print as floating point, at least 6 characters wide
%.2f   print as floating point, 2 characters after decimal point
%6.2f  print as floating point, at least 6 wide and 2 after decimal point

%o     cotal
%x     hexadecimal
%c     character
%s     string
%%     % itself
```


```c
printf("%3d %4.1f\n", 5, 6.0);  // "  5 6.0"  %4.1f 至少4位宽，其中小数显示1位
printf("%o", 8);  // "10"
```

```c
#include <stdio.h>
int main() {
  int c;  // EOF is not char
  while ((c = getchar()) != EOF)  // end-of-file signal
    putchar(c);
}
```






## Character Class Tests  `ctype.h`


## String Functions  `string.h`

```c
// length
size_t strlen(const char* s);

// copy
char* strcpy (char* restrict s1, const char* restrict s2);  // copy s2 to s1, including '\0', return s1
char* strncpy(char* restrict s1, const char* restrict s2, size_t n);  // copy at most n characters

// concatenate
char* strcat (char* restrict s1, const char* restrict s2);  // concatenate s2 to end of s1
char* strncat(char* restrict s1, const char* restrict s2, size_t n);  // cat at most n characters

// compare
int strcmp (const char* s1, const char* s2);
int strncmp(const char* s1, const char* s2, size_t n);  // compare at most n characters

// character pointer
const char* strchr(const char* s, int c);  // return pointer to first occurrence or NULL if not present
      char* strchr(      char* s, int c);
const char* strrchr(const char* s, int c); // return pointer to last occurrence or NULL if not present
      char* strrchr(      char* s, int c);

// string pointer
const char* strpbrk(const char* s1, const char* s2);  // first occurrence in s1 of any char of s2
      char* strpbrk(      char* s1, const char* s2);
const char* strstr(const char* s1, const char* s2);   // first occurrence of s2 in s1
      char* strstr(      char* s1, const char* s2);

size_t strspn(const char* s1, const char* s2);
size_t strcspn(const char* s1, const char* s2);



char* strerror(int errnum);
char* strtok(char* restrict s1, const char* restrict s2);

int strcoll(const char* s1, const char* s2);
size_t strxfrm(char* restrict s1, const char* restrict s2, size_t n);
```

```c
void* memcpy(void* restrict s1, const void* restrict s2, size_t n);
void* memmove(void* s1, const void* s2, size_t n);
int memcmp(const void* s1, const void* s2, size_t n);
const void* memchr(const void* s, int c, size_t n);
      void* memchr(      void* s, int c, size_t n);
void* memset(void* s, int c, size_t n);
```

```c


```


## Mathematical Functions  `math.h`


## Utility Functions  `stdlib.h`


## Diagnostics  `assert.h`


## Variable Argument Lists  `stdarg.h`


## Non-local Jumps  `setjmp.h`


## Signals  `signal.h`


## Date and Time Functions  `time.h`


## Implementation-defined Limits  `limits.h` `float.h`

