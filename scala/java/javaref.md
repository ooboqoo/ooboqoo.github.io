<style>
  td:nth-child(2) { color: red; }
  i { color: gray; }
</style>
<script>
(function() {
  var list = document.querySelectorAll('td:nth-child(2)');
  var reg=/\((.*?)\)/;
  for (var i = list.length; i--;) {
    list[i].innerHTML = list[i].innerHTML.replace(reg, '(<i>$1</i>)');
  }
})();
</script>

# Java API 精选

https://docs.oracle.com/javase/8/docs/api/

### Java 关键字

```text
基本类型 boolean byte char short int long float double
结构 if else  for do while break continue  switch case default  try catch finally
修饰 abstract static final public protected private   
类级 class extends implements interface throws
方法级 super this new throw void return native
包级 package import      
待确定 assert enum instanceof null strictfp synchronized transient volatile
保留字 const goto
```

### java.lang.Character

||||
|-----------------|-----------------------|--------------------------------------------
| static boolean  | isLetter(char ch)     | 是否是一个字母
| static boolean  | isDigit(char ch)      | 是否是一个数字字符
| static boolean  | isWhitespace(char ch) | 是否是一个空格
| static boolean  | isUpperCase(char ch)  | 是否是大写字母
| static boolean  | isLowerCase(char ch)  | 是否是小写字母
| static char     | toUpperCase(char ch)  | 指定字母的大写形式
| static char     | toLowerCase(char ch)  | 指定字母的小写形式
| static String   | toString(char ch)     | 返回字符的字符串形式，字符串的长度仅为 1

### java.lang.String

||||
|---------------|--------------------------|--------------------------------------------
| static String | copyValueOf(char[] data) | 返回指定数组中表示该字符序列的 String。
| static String | copyValueOf(char[] data, int offset, int count) | 返回指定数组中表示该字符序列的 String。
| static String | valueOf(primitive data type x) |  返回给定data type类型x参数的字符串表示形式。

||||
|---------------|--------------------------|--------------------------------------------
| char | charAt(int index)   | 返回指定索引处的 char 值。
| int  | compareTo(Object o) | 把这个字符串和另一个对象比较。
| int  | compareTo(String anotherString) | 按字典顺序比较两个字符串。
| int  | compareToIgnoreCase(String str) | 按字典顺序比较两个字符串，不考虑大小写。
| String  | concat(String str) |           将指定字符串连接到此字符串的结尾。
| boolean | contentEquals(StringBuffer sb) | 当且仅当字符串与指定的StringButter有相同顺序的字符时候返回真。
| boolean | endsWith(String suffix) |      测试此字符串是否以指定的后缀结束。
| boolean | equals(Object anObject) |     将此字符串与指定的对象比较。
| boolean | equalsIgnoreCase(String anotherString) | 将此 String 与另一个 String 比较，不考虑大小写。
| byte[]  | getBytes() | 使用平台的默认字符集将此 String 编码为 byte 序列，并将结果存储到一个新的 byte 数组中。
| byte[]  | getBytes(String charsetName) | 使用指定的字符集将此 String 编码为 byte 序列，并将结果存储到一个新的 byte 数组中。
| void    | getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin) | 将字符从此字符串复制到目标字符数组。
| int     | hashCode() | 返回此字符串的哈希码。
| int     | indexOf(int ch) | 返回指定字符在此字符串中第一次出现处的索引。
| int     | indexOf(int ch, int fromIndex) | 返回在此字符串中第一次出现指定字符处的索引，从指定的索引开始搜索。
| int     | indexOf(String str) | 返回指定子字符串在此字符串中第一次出现处的索引。
| int     | indexOf(String str, int fromIndex) | 返回指定子字符串在此字符串中第一次出现处的索引，从指定的索引开始。
| String  | intern() | 返回字符串对象的规范化表示形式。
| int     | lastIndexOf(int ch) | 返回指定字符在此字符串中最后一次出现处的索引。
| int     | lastIndexOf(int ch, int fromIndex) | 返回指定字符在此字符串中最后一次出现处的索引，从指定的索引处开始进行反向搜索。 
| int | lastIndexOf(String str) | 返回指定子字符串在此字符串中最右边出现处的索引。
| int | lastIndexOf(String str, int fromIndex) | 返回指定子字符串在此字符串中最后一次出现处的索引，从指定的索引开始反向搜索。
| int | length() | 返回此字符串的长度。
| boolean | matches(String regex) | 告知此字符串是否匹配给定的正则表达式。
| boolean | regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len) | 测试两个字符串区域是否相等。
| boolean | regionMatches(int toffset, String other, int ooffset, int len) | 测试两个字符串区域是否相等。
| String  | replace(char oldChar, char newChar) | 返回一个新的字符串，它是通过用 newChar 替换此字符串中出现的所有 oldChar 得到的。
| String  | replaceAll(String regex, String replacement) | 使用给定的 replacement 替换此字符串所有匹配给定的正则表达式的子字符串。
| String | replaceFirst(String regex, String replacement) | 使用给定的 replacement 替换此字符串匹配给定的正则表达式的第一个子字符串。
| String[] | split(String regex) | 根据给定正则表达式的匹配拆分此字符串。
| String[] | split(String regex, int limit) | 根据匹配给定的正则表达式来拆分此字符串。
| boolean | startsWith(String prefix) | 测试此字符串是否以指定的前缀开始。
| boolean | startsWith(String prefix, int toffset) | 测试此字符串从指定索引开始的子字符串是否以指定前缀开始。
| CharSequence | subSequence(int beginIndex, int endIndex) |  返回一个新的字符序列，它是此序列的一个子序列。
| String | substring(int beginIndex) |  返回一个新的字符串，它是此字符串的一个子字符串。
| String | substring(int beginIndex, int endIndex) |  返回一个新字符串，它是此字符串的一个子字符串。
| char[] | toCharArray() |  将此字符串转换为一个新的字符数组。
| String | toLowerCase() |  使用默认语言环境的规则将此 String 中的所有字符都转换为小写。
| String | toLowerCase(Locale locale) |  使用给定 Locale 的规则将此 String 中的所有字符都转换为小写。
| String | toString() |  返回此对象本身（它已经是一个字符串！）。
| String | toUpperCase() |  使用默认语言环境的规则将此 String 中的所有字符都转换为大写。
| String | toUpperCase(Locale locale) |  使用给定 Locale 的规则将此 String 中的所有字符都转换为大写。
| String | trim() |  返回字符串的副本，忽略前导空白和尾部空白。


### java.lang.StringBuilder / StringBuffer

StringBuilder 在 JDK5.0 中引入，其前身是 StringBuffer (效率稍低，但多线程安全)，这两个类的 API 是相同的。

||||
|---------------|--------------------------|--------------------------------------------
|               | StringBuilder()          | 构造一个空的字符串构建器 
| int           | length()                 | 返回构建器或缓冲器中的代码单元数量
| StringBuilder | append(String str)       | 追加一个字符串并返回 this
| StringBuilder | append(char c)           | 
| StringBuilder | appendCodePoint(int cp)  | 
| void          | setCharAt(int i, char c) | 
| StringBuilder | insert(int offset, String str)       | 
| StringBuilder | insert(int offset, char c)           | 
| StringBuilder | delete(int startIndex, int endIndex) | 删除偏移量从 startIndex 到 endIndex-1 的代码单元并返回 this
| String        | toString()                           | 返回一个与构建器或缓冲器内容相同的字符串
