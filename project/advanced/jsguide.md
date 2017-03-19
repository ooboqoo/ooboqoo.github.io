# JavaScript 编码规范

Google 基于 ES6 出的最新编码规范：https://google.github.io/styleguide/jsguide.html   
50 k stars 的编码规范，不知道是什么鬼，必须得研究下：https://github.com/airbnb/javascript

以下为自己采用的编码规范，每个规范会注明出处。

## Spaces, wrapping, and indentation

https://developer.mozilla.org/en-US/docs/User:GavinSharp_JS_Style_Guidelines

比较认同这个规范的换行部分，以前比较认同的观点是，换行缩进两个层级，但一般自动排版只会缩进一个层级，所以撇开自动排版不管的话，干脆采用这里的写法，看起来更为直观。

注：Airbnb 的规范中，函数的参数要换行的话，还是跟其他情况一样，只缩进 2个空格 -- 也就是自动排版采用的规范，但个人认为那个规范要求一行只放一个条目，太浪费空间了。

* No tabs!
* Two space indentation is standard.
* Attempt to wrap lines at 80 characters, though it's OK to have longer lines (e.g. 100) if that's difficult
* Lines should not contain trailing spaces, even after binary operators, commas or semicolons.
* Operators should be separated by a space
* Do not use spaces between a function name and its arguments list, or between an array name and the square bracket. Also, do no use spaces after a bracket. Use a space after a comma to separate arguments.
* Use a space between a keyword and parentheses.
* Do not put compound statements in one line. Indent the controlled statement on the next line, for clarity.
* Function arguments that overflow the first line of the call expression should be aligned to underhang the first argument (to start in overflow lines in the column after the opening parenthesis).
* One (or two) blank lines between block definitions. Also consider breaking up large code blocks with blank lines to improve readability.
* Keep operators at the end of the line when wrapping conditions.
* Try to indent to line up with a related item on the previous line.
* End each file with a newline.

```js
fooMethod ( a1, v2 ); // bad
fooMethod(a1, v2);    // OK

if(condition)             // bad
if (condition)            // OK

if (condition) break;     // bad
if (condition) {          // OK
  break;
}

fooMethod(a1,         // bad
    v2);
fooMethod(a1,         // OK
          v2);

if (reallyReallyLongCondition() && someOtherLongThing()     // bad
  && somethingShorter()) {
  ...
}
if (reallyReallyLongCondition() && someOtherLongThing() &&  // OK
    somethingShorter()) {
  ...
}
```


