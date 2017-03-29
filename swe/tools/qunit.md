# Qunit

**相关学习资源**

* [QUnit 的文档站点](http://qunitjs.com/intro/)
* [QUnit Cookbook](http://qunitjs.com/cookbook/)
* [jQuery Test-Driven Development](http://msdn.microsoft.com/en-us/scriptjunkie/ff452703.aspx)
* [Unit Testing Best Practices](http://www.bobmccune.com/2006/12/09/unit-testing-best-practices/)
-------

## QUnit Cookbook

### 测试概述

### QUnit 框架概述

#### 测试部署

The only markup necessary in the body element is a div with id="qunit-fixture". This is required for all QUnit tests, even when the element itself is empty.

Note that there is no document-ready block. The test runner handles that: calling QUnit.test() just adds the test to a queue, and its execution is deferred and controlled by the test runner.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit basic example</title>
  <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.0.1.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="https://code.jquery.com/qunit/qunit-2.0.1.js"></script>
  <script>
    QUnit.test( "a basic test example", function( assert ) {
      var value = "hello";
      assert.equal( value, "hello", "We expect value to be hello" );
    });
  </script>
</body>
</html>
```

#### 测试报告界面介绍

The header of the test suite displays the page title, a green bar when all tests passed (a red bar when at least one test failed), a bar with a few checkboxes to filter test results and a blue bar with the navigator.userAgent string (handy for screenshots of test results in different browsers).

Of the checkboxes, "Hide passed tests" is useful when a lot of tests ran and only a few failed. Checking the checkbox will hide everything that passed, making it easier to focus on the tests that failed (see also the Efficient Development section below).

Checking "Check for Globals" causes QUnit to make a list of all properties on the window object, before and after each test, then checking for differences. If properties are added or removed, the test will fail, listing the difference. This helps to make sure your test code and code under test doesn't accidentally export any global properties.

The "No try-catch" checkbox tells QUnit to run your test outside of a try-catch block. When your test throws an exception, the testrunner will die, unable to continue running, but you'll get a "native" exception, which can help tremendously debugging old browsers with bad debugging support like Internet Explorer 6 (JavaScript sucks at rethrowing exceptions).

Below the header is a summary, showing the total time it took to run all tests as well as the overall number of total and failed assertions. While tests are still running, it will show which test is currently being executed.

The actual contents of the page are the test results. Each entry in the numbered list starts with the name of the test followed by, in parentheses, the number of failed, passed, and total assertions. Clicking the entry will show the results of each assertion, usually with details about expected and actual results. The "Rerun" link at the end will run that test on its own.

### 内置断言

```js
ok( truthy [, message ] )                     // truthy == true ?
equal( actual, expected [, message ] )        // actual == expected ?
strictEqual( actual, expected [, message ] )  // actual === expected ?
deepEqual( actual, expected [, message ] )    // deepEqual 采用的是全等，且会对对象或数组等进行逐项比较
```

### 同步回调函数

回调函数内部的断言，如果回调函数没有执行，可能所在测试就默认通过了，为避免这种情况发生，在测试开头使用 `assert.expect()` 来声明测试内部的断言数量。

```js
QUnit.test("a test", function(assert) {
  assert.expect(1);
  var $body = $("body");
  $body.on("click", function() { assert.ok(true, "body was clicked!"); });
  $body.trigger("click");
});
```

### 异步回调函数

For every asynchronous operation in your QUnit.test() callback, use `assert.async()`, which returns a "done" function that should be called when the operation has completed.

```js
QUnit.test("asynchronous test: async input focus", function(assert) {
  var done = assert.async();
  var input = $("#test-input").focus();
  setTimeout(function() {
    assert.equal(document.activeElement, input[0], "Input was focused");
    done();
  });
});
```

### 测试用户操作

可以通过 jQuery 的 `trigger()` 或 `triggerHandler()` 方法触发相关事件来测试。   
`triggerHandler()` 可能更具有使用价值，譬如一个链接，测试点击时我们并不希望页面发生跳转。

```js
QUnit.test("keylogger api behavior", function(assert) {
  var doc = $(document);
  var keys = new KeyLogger(doc);                                // 被测试对象 KeyLogger
  doc.trigger($.Event("keydown", { keyCode: 9 }));              // Trigger the key event
  assert.deepEqual(keys.log, [ 9 ], "correct key was logged");  // Verify expected behavior
});
```

If your event handler doesn't rely on any specific properties of the event, you can just call `.trigger(eventType)`. However, if your event handler does rely on specific properties of the event, you will need to create an event object using `$.Event()` with the necessary properties, as shown previously.

> ##### 对监听函数的测试
> 在 QUnit.test() 内部，原先加在 DOM 上的事件监听函数都会消失，因为 test 是复制了一个现场，而复制是不包含事件监听函数的。
> 原先的事件监听函数，有的可以拿到 `elem.onclick` 或 jQuery 的 `$._data(elem, 'events')`，但通过 `elem.addEventListener()` 添加的监听函数是无法获取的，即使通过拷贝 `elem.cloneNode()` 也是不包含事件的，所以待测试代码一定要提供一个获取 handler 的途径，并在 test 内部重新添加此 handler
> [_[参考信息]_](http://stackoverflow.com/questions/446892/how-to-find-event-listeners-on-a-dom-node-when-debugging-or-from-the-js-code)

### 测试的原子性

每个 `QUnit.test()` 都应当是独立的，每完成一项测试，QUnit 都会自动重置 `#qunit-fixture` 元素，但测试内部的断言之间还是可能存在相互影响的。

> ##### 测试环境
> 每个测试的环境都是独立的，#qunit-fixture 里的内容是测试前内容的一个拷贝而已，只包含内容，不包含监听函数；其实如果可以，更好的办法是将 #qunit-fixture 空在那里，测试时才添加相关内容。测试完成后，这个临时环境会被丢弃，不管测试时做了什么，都不会影响其他测试。   
> 这次碰到的一个问题是，如果在 QUnit.test() 外部通过一个变量保存了对 #qunit-fixture 内部的某个元素的引用，那么在 test 内部是可以调用这个元素的，但是，这个元素并不是所认为的当前环境下的那个元素，示例：
> ```js
> var elemOuter = document.getElementById("demo");  // 应该禁止这种用法，被坑了
> elemOuter.onclick = function() { alter("clicked")};
> QUnit.test("看起来是同一个元素，但其实不一样", function(assert) {
>   var elemInner = document.getElementById("demo");
>   elemOuter.click();  // 会调出警告框，这是测试前的环境下的 #demo 元素
>   elemInner.click();  // 没反应，这是测试环境下的 #demo，是测试前的那个 #demo 的临时复制版本
> });
> ```
> 另，hooks.before hooks.beforeEach QUnit.test hooks.afterEach hooks.after 之间是并列的函数的关系，虽然他们共用一个 this，但各自内部定义的变量是不通用的。

### 测试组

```js
QUnit.module( name: String [, hooks: Object ] [, nested: Function ] )
name    // Label for this group of tests.
hooks {
  before:     function() { /* prepare something once for all tests */   },
  beforeEach: function() { /* prepare something before each test */     },
  afterEach:  function() { /* clean up after each test */               },
  after:      function() { /* clean up once after all tests are done */ }
}
nested  // A callback with grouped tests and nested modules to run under the current module label.
```

`QUnit.module()` 用于组织测试，测试结果中，每个测试项都会前缀其模块名，另外，还可以在测试报告右上角选择一个模块进行单独测试。

If `QUnit.module` is defined without a `nested` callback argument, all subsequently defined tests will be grouped into the module until another module is defined. 如果没有提供 `nested` 回调，所有跟在 `QUnit.module()` 后面的测试都会归入该模块，但如果提供了 `nested` 回调，则后面的测试不会归入到改组。

```js
QUnit.module("group a");
QUnit.test("test 1", function(assert) { assert.ok( true, "this test is fine" ); });
QUnit.test("test 2", function(assert) { assert.ok( true, "this test is fine" ); });

QUnit.module("group b");
QUnit.test("test 3", function(assert) { assert.ok( true, "this test is fine" ); });
QUnit.test("test 4", function(assert) { assert.ok( true, "this test is fine" ); });
```

#### 初始化与清理

In addition to grouping tests, `QUnit.module()` can be used to extract common code from tests within that module. The `QUnit.module()` function takes an optional second parameter to define functions to run before and after each test within the module:

```js
QUnit.module( "module", {
  before: function() {  },
  beforeEach: function( assert ) { assert.ok( true, "one extra assert per test" ); },
  afterEach:  function( assert ) { assert.ok( true, "and one extra assert after each test" ); },
  after: function() {  }
});
QUnit.test( "test with beforeEach and afterEach", function( assert ) {
  assert.expect( 2 );
});
```

#### 测试组嵌套

个人觉得前面不提供 nested 回调的写法算是一种简化的写法，真实规范的写法就应该像这里这样：

```js
QUnit.module( "grouped tests argument hooks", function( hooks ) {
  hooks.beforeEach( function( assert ) { assert.ok( true, "beforeEach called" ); } );
  hooks.afterEach( function( assert ) {  assert.ok( true, "afterEach called" );  } );
  QUnit.test( "call hooks", function( assert ) {   assert.expect( 2 );  } );
  QUnit.module( "stacked hooks", function( hooks ) { 
    // This will run after the parent module's beforeEach hook
    hooks.beforeEach( function( assert ) { assert.ok( true, "nested beforeEach called" ); } );
    // This will run before the parent module's afterEach
    hooks.afterEach( function( assert ) { assert.ok( true, "nested afterEach called" ); } );
    QUnit.test( "call hooks", function( assert ) { assert.expect( 4 );    } );
  } );
} );
```

#### this 关键字

The module's callback is invoked with the test environment as its `this` context, with the environment's properties copied to the module's tests, hooks, and nested modules. Note that changes on tests' `this` are not preserved between sibling tests, where `this` will be reset to the initial value for each test.

* `QUnit.test` `hooks.before` `hooks.beforeEach` 之间的变量无法共享，但 this 是共享的；
* 不同 `QUnit.test` 之间的 this 是不同享的

### 自定义断言方法

Define a function to encapsulate the expectation in a reusable unit. Invoke `this.push` within the body to notify QUnit that an assertion has taken place.

Custom assertions can help make test suites more readable and more maintainable. At a minimum, they are simply functions that invoke `this.push` with a Boolean value--this is how QUnit detects that an assertion has taken place and the result of that assertion.

在全局对象 `QUnit.assert` 上添加自定义断言方法是值得推荐的，利于代码重用并与其他开发者共享。

```js
QUnit.assert.contains = function( needle, haystack, message ) {
  var actual = haystack.indexOf(needle) > -1;
  this.push(actual, actual, needle, message);
};
QUnit.test("retrieving object keys", function( assert ) {
  var objectKeys = keys( { a: 1, b: 2 } );
  assert.contains( "a", objectKeys, "Object keys" );
  assert.contains( "b", objectKeys, "Object keys" );
 
  var arrayKeys = keys( [1, 2] );
  assert.contains( "1", arrayKeys, "Array keys" );
  assert.contains( "2", arrayKeys, "Array keys" );
});
```

### 提升工作效率

当一个测试需要花费数秒的话，你可能希望尽快看到结果。QUnit 对此做了些优化：

* 你可以点选 “Hide passed tests” 复选框来快速定位失败项
* QUnit 会将失败项保存到 `sessionStorage` 中，下次测试会优先测试这些项目，结合上一项，你可以第一时间得到关注项的结果
* 正如上一项所示，测试的顺序是会调整的，这就要求严格保持测试间的独立性，当然也可以通过 `QUnit.config.reorder = false`手动关闭顺序重排
* 每项测试结果右侧都有 `Rerun` 链接，可以点击对此项进行单独测试
* 还可以通过右上方下拉列表选择单个 module 进行测试，此项跟上一项都支持刷新，因为地址栏附加了 query string

## API 手册

<style>td:first-child { color: red; } em { color: gray; }</style>

### 测试 Test

 Method    | Description
 --------- | ------------
QUnit.module(_name [, hooks ] [, nested ]_) | 添加一个测试组
QUnit.test(_name, callback_) | 添加一项测试
QUnit.only(_name, callback_) | 只运行单个测试，其他测试都会被禁用
QUnit.skip(_name, callback_) | 跳过一个指定的测试，该测试会出现在测试报告中并特别注明

### 断言 Assert

 Method    | Description
 --------- | ------------
ok(_truthy [, message ]_)    | A boolean check, passes if the first argument is truthy.
notOk(_truthy [, message ]_) | A boolean check, inverse of ok(), passes if the first argument is falsy.
equal(_actual, expected [, message ]_)          | A non-strict comparison.
notEqual(_actual, expected [, message ]_)       | A non-strict comparison, checking for inequality.
strictEqual(_actual, expected [, message ]_)    | A strict type and value comparison.
notStrictEqual(_actual, expected [, message ]_) | A strict comparison, checking for inequality.
deepEqual(_actual, expected [, message ]_)      | A deep recursive comparison, working on primitive types, arrays, objects, regular expressions, dates and functions.
notDeepEqual(_actual, expected [, message ]_)   | An inverted deep recursive comparison.
expect(_amount_)            | Specify how many assertions are expected to run within a test.
async(_[acceptCallCount ]_) | Instruct QUnit to wait for an asynchronous operation. 可选参数可以设定异步操作的次数。
propEqual(_actual, expected [, message ]_)      | A strict type and value comparison of an object’s own properties.
notPropEqual(_actual, expected [, message ]_)   | A strict comparison of an object’s own properties, checking for inequality.
push(_result, actual, expected, message_)   | Report the result of a custom assertion 
throws(_block [, expected ] [, message ]_)  | 测试代码块是否会抛出错误，提供 expected 参数可以对抛出的错误对象进行比较

```js
QUnit.test( "multiple call done()", function( assert ) {
  assert.expect( 3 );
  var done = assert.async( 3 );
  setTimeout(function() { assert.ok( true, "first call done." );  done(); }, 500 );
  setTimeout(function() { assert.ok( true, "second call done." ); done(); }, 500 );
  setTimeout(function() { assert.ok( true, "third call done." );  done(); }, 500 );
});
```

```js
QUnit.assert.mod2 = function( value, expected, message ) {
  var actual = value % 2;
  this.push( actual === expected, actual, expected, message );
};
QUnit.test( "mod2", function( assert ) {
  assert.mod2( 2, 0, "2 % 2 == 0" );
  assert.mod2( 3, 1, "3 % 2 == 1" );
});
```

### Callbacks

When integrating QUnit into other tools like CI servers, use these callbacks as an API to read test results.

 Method    | Description
 --------- | ------------
QUnit.begin()       | Register a callback to fire whenever the test suite begins.
QUnit.done()        | Register a callback to fire whenever the test suite ends.
QUnit.log()         | Register a callback to fire whenever an assertion completes.
QUnit.moduleDone()  | Register a callback to fire whenever a module ends.
QUnit.moduleStart() | Register a callback to fire whenever a module begins.
QUnit.testDone()    | Register a callback to fire whenever a test ends.
QUnit.testStart()   | Register a callback to fire whenever a test begins.

### Configuration and Utilities

 Method    | Description
 --------- | ------------
QUnit.assert | Namespace for QUnit assertions
[QUnit.config](http://api.qunitjs.com/QUnit.config/) | Configuration for QUnit
QUnit.dump.parse() | Advanced and extensible data dumping for JavaScript. 能将 DOM 转换成文本表示
QUnit.extend() | Copy the properties defined by the mixin object into the target object
QUnit.stack() | Returns a single line string representing the stacktrace (call stack)
