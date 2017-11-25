# ES 规范解读

### ASI

[11.9.1 Rules of Automatic Semicolon Insertion](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-rules-of-automatic-semicolon-insertion)

ASI 即 JS 的自动分号插入机制 Automatic Semicolon Insertion。规范中描述了3种状态(看着有点晕，典型示例如下)：

```js
// 1. 当碰到 行结尾 或 `}`，如果不符合语法则自动插入分号
{ 1
2 } 3
// is transformed to
{ 1
;2 ;} 3;

// 2.
a = b
++c
// is transformed to:
a = b;
++c;

// 3.
return
a + b
// is transformed to:
return;
a + b;
```



