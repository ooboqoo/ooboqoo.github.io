# JavaScript 编码规范

Google’s ES6 Style Guide: https://google.github.io/styleguide/jsguide.html  
Airbnb JavaScript Style Guide: https://github.com/airbnb/javascript  
JavaScript Standard Style Guide: https://github.com/standard/standard

以下为自己采用的编码规范，每个规范会注明出处。

## 命名规范  Naming Conventions

https://medium.freecodecamp.org/javascript-naming-conventions-dos-and-don-ts-99c0e2fdd78a?gi=6fd69ae402f7

> Most of these conventions are not for you today, but instead, for you and the people reading your code tomorrow.

使用具描述性的名字  Use meaningful names.

```js
getUserPosts

// bad  含义过于宽泛，不精确
getUserData
getUserInfo

// bad  不要用单个单词的变量，当然如果只在很小的范围内使用的临时变量除外
global.d = new Date()
```

用词应尽量精简，无法精简长些也无妨，不能为了精简而放弃语义  When in doubt, favor descriptive over concise.

```js
findUserByNameOrEmail
setUserLoggedInTrue

// bad  选词应该尽量精简，但必须保证语义的确定性
findUser
```

```js
getUserFriend

// bad  FromDatabase 提供了多少附加信息? 这种可以精简掉
getUserFriendFromDataBase
```

保证动词的统一性  Use consistent verbs per concept.

`get` `set` `read` `create` `add` `update` `reset` `delete` `remove`

```js
getQuestion
getUserPosts
getUsers

// bad  有很多近意动词，选一个一直用，不要变来变去
getQuestion
returnUsers
retrieveUsers
```

布尔值的命名 Make booleans that read well in if-then statements.

```js
carIsSedan
home.wasSold

// bad
sedan
home.sold
```

类名用名词 Use nouns for class names.

```js
class Car { }
new UserFriend()

// bad  类本来就是一类事物的抽象，加动词干啥
class MakeCar { }
```

两个字母的缩率词都大写，大于两个则改驼峰  Capitialize two-letter acronyms.

```js
let IO
let modifiedIO

// bad
let newOTC
let getUserIo
```

常量可以采用全大写的形式，但普通的 `const` 修饰的变量不应该大写  Capitalize constant values (if you want).

```js
const HOURS_IN_DAY = 24
const USER_AGE = 30

// bad  下面这些并不是常量，只是不会修改的变量
const USER = foundUser
const TODAY = new Date()
```

下划线是有特点意义的不要乱用  Avoid underscores in your names.

```js
this._myPrivateMethod = function () { }

// bad
const _someGlobalVar = 1
```

其他时候都统一用小驼峰形式 Use (lower) camelCase for everything else.


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


