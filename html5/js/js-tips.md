# JS 小专题

### 计算字符串所占字节数

http://www.cnblogs.com/sniper007/p/3309787.html

##### 字符编码

http://zh.wikipedia.org/zh-cn/UTF-8

UTF-8 (8-bit Unicode Transformation Format) 是一种针对 Unicode 的可变长度字符编码，可以表示 Unicode 标准中的任何字符，且其编码中的第一个字节仍与 ASCII 相容，使用一至四个字节为每个字符编码。其编码规则如下：字符代码在
  * 000000 – 00007F 之间的，用一个字节编码;
  * 000080 – 0007FF 之间的字符用两个字节;
  * 000800 – 00D7FF 和 00E000 – 00FFFF之间的用三个字节; 注: Unicode 在范围 D800-DFFF 中不存在任何字符
  * 010000 – 10FFFF 之间的用4个字节。

而 UTF-16 则是定长的字符编码，大部分字符使用两个字节编码，字符代码超出 65535 的使用四个字节，如下：
  * 000000 – 00FFFF 两个字节；
  * 010000 – 10FFFF 四个字节。

##### 编码

最近项目有个需求要用js计算一串字符串写入到 localStorage 里所占的内存，众所周知的，js 是使用 Unicode 编码的。而 Unicode 的实现有N种，其中用的最多的就是 UTF-8 和 UTF-16。因此本文只对这两种编码进行讨论。

一开始认为既然页面用的是 UTF-8 编码，那么存入 localStorage 的字符串，应该也是用 UTF-8 编码的。但后来测试发现，明明计算出的size是不到5MB，存入 localStorage 却抛异常了。想了想，页面的编码是可以改的。如果 localStorage 按照页面的编码存字符串，不就乱套了？浏览器应该都是使用 UTF-16 编码的。用 UTF-16 编码计算出 5MB 的字符串，果然顺利写进去了，超过则失败了。

```js
/** 返回字节长度 */
function getBytes(str, charset) {
    var total = 0, i, charCode;
    charset = charset.toLowerCase().replace('-', '');
    if (charset === 'utf16') {
        for (i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) <= 0xffff) { total += 2; } else { total += 4; }
        }
    } else if (charset === 'utf8') {
        for (i = 0; i < str.length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) { total += 1; continue; }
            if (charCode <= 0x07ff) { total += 2; continue; }
            if (charCode <= 0xffff) { total += 3; continue; }
            total += 4;
        }
    } else {
        throw new Error('不支持该编码: ' + charset);
    }
    return total;
}
```

### 统计字符串长度

中文以2个字符长度计算。

```js
function checksum(text) {
    return text.length + text.match(/[\u4e00-\u9fa5]/g).length;
}

function checksum(chars) {
    var sum = len = chars.length, c;
    while(len--) {
        c = chars.charCodeAt(i);
        if (c >= );
    }
}
```







