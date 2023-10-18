# Jasmine

https://jasmine.github.io

Jasmine is a Behavior Driven Development testing framework for JavaScript. It does not rely on browsers, DOM, or any JavaScript framework. Thus it's suited for websites, Node.js projects, or anywhere that JavaScript can run.

```js
describe("A suite", function() {                         // describe 定义测试组
  it("contains spec with an expectation", function () {  // it       定义测试
    expect(true).toBe(true);                             // expect   定义断言
  });
});
```


## API

### 全局变量 Global

```
describe(description, specDefinitions)   Create a group of specs (often called a suite)
fdescribe(description, specDefinitions)  A focused `describe`
xdescribe(description, specDefinitions)  A temporarily disabled `describe`
it(description, testFunction?, timeout?) If testFunction is not provided the test will be pending
fit(description, testFunction, timeout?) A focused `it`
xit(description, testFunction?)          A temporarily disabled `it`
expect(actual) → {matchers}              Create an expectation for a spec
expectAsync(actual) → {async-matchers}   Create an asynchronous expectation for a spec
fail(error?)                             Explicitly mark a spec as failed
pending(message?)                        Mark a spec as pending, expectation results will be ignored
beforeAll(fn?, timeout?)  Run some shared setup once before all of the specs in the `describe` are run
afterAll(fn?, timeout?)   Run some shared teardown once after all of the specs in the `describe` are run
beforeEach(fn?, timeout?) Run some shared setup before each of the specs
afterEach(fn?, timeout?)  Run some shared teardown after each of the specs
spyOn(obj, methodName) → {Spy}           Install a spy onto an existing object
spyOnAllFunctions(obj) → {Object}        Installs spies on all writable and configurable properties
spyOnProperty(obj, propertyName, accessType?) → {Spy}
          Install a spy on a property installed with `Object.defineProperty` onto an existing object
```

### 内置匹配函数

```stylus
toBe(expected)     全等 `===`
toEqual(expected)  原始值同 toBe；对象采用深比较

toBeInstanceOf(expected)
toContain(expected)  可用于数组或字符串
toMatch(expected)    正则匹配

toBeTrue()  即 `=== true`
toBeTruthy()
toBeFalse()
toBeFalsy()

toBeDefined()    即 `!== undefined`
toBeUndefined()  即 `=== undefined`
```

```
toBeGreaterThan(expected)
toBeGreaterThanOrEqual(expected)
toBeLessThan(expected)
toBeLessThanOrEqual(expected)
toBeCloseTo(expected, precision?)  数值比较，precision 定义四舍五入的精度
toBeNaN()  即 `NaN`
toBePositiveInfinity()
toBeNegativeInfinity()
```

```
toThrow(expected?)
toThrowError(expected?, message?)
toThrowMatching(predicate)
```

```
toHaveBeenCalled()
toHaveBeenCalledBefore(expected)
toHaveBeenCalledTimes(expected)
toHaveBeenCalledWith()
```

```
withContext(message) → {matchers}  给测试失败时添加一些额外的信息
nothing()
toHaveClass(expected)  DOM 元素是否包含某给类名
```

```js
expect('10')toBe(10);      // fail
expect('10').toEqual(10);  // fail
expect({age: 33}).toEqual({age: 33});  // pass
expect({age: 33}).toBe({age: 33});     // fail

expect("my string").toMatch(/string$/);  // pass

expect(null).toBeDefined();  // pass
```


## 基本概念

https://jasmine.github.io/tutorials/your_first_suite

#### 测试组 Suites

测试组使用全局的 Jasmine 函数 `describe` 创建。`describe` 接受两个参数，一个字符串和一个函数。字符串是这个测试组的名字，用于描述测试内容，函数则是这个测试组的具体实现。

#### 测试 Specs

测试使用全局的 Jasmine 函数 `it` 创建。和 `describe` 一样接受两个参数，一个字符串和一个函数。一个测试可以包含多个断言 expectations 来测试代码。只有全部断言通过，测试才会通过。

由于 `describe` 和 `it` 块实质上都是函数，可以包含任何的可执行代码。Javascript 的作用域规则也是适用的，所以 `describe` 内定义的变量，其内部所有的 `it` 都能访问到。

#### 断言 Expectations

断言由 `expect` 函数创建。接受一个参数，用于设置测试的预期值 actual。

#### 匹配函数 Matchers

每个 Matcher 实现一个期望值 expected 和实际值 actual 的布尔判断，Jasmine 会根据 Mather 判断 expectation 是 true 还是 false，然后决定 spec 是通过还是失败。所有 Matcher 可以通过 `not` 执行否定判断。


## 代码组织

### 初始化与清理

为避免非必要地重复“初始化和清理”代码，Jasmine 提供了几个全局函数：

* `beforeEach` - 在每次 `it` 执行之前执行其内部的代码
* `afterEach` - 在每次 `it` 完成之后执行其内部的代码
* `beforeAll` - 在一个 `describe` 内部的所有测试执行之前执行一次初始化
* `afterAll` - 在一个 `describe` 内部的所有测试执行完成后进行清理工作

```js
describe("A spec using beforeEach and afterEach", function() {
  var foo = 0;
  beforeEach(function() { foo += 1; });
  afterEach(function() { foo = 0; });
  it("is just a function, so it can contain any code", function() {
    expect(foo).toEqual(1);
  });
  it("can have more than one expectation", function() {
    expect(foo).toEqual(1);
  });
});
```
```js
describe("A spec using beforeAll and afterAll", function() {
  var foo;
  beforeAll(function() { foo = 1; });
  afterAll(function() { foo = 0; });

  it("sets the initial value of foo before specs run", function() {
    expect(foo).toEqual(1);
    foo += 1;
  });

  it("does not reset foo between specs", function() {
    expect(foo).toEqual(2);
  });
});
```

### `this` 关键字

每个测试的 `beforeEach` / `it` / `afterEach` 都共享一个空对象，可以通过 `this` 关键字访问该对象，以实现几个方法间的信息共享。而测试之间(即 `it` 之间)的空对象都是相互隔离的。

### 测试组嵌套

`describe` 代码块支持嵌套，从而构成 `describe` 树，以更好地组织测试结构。

```js
describe("describe: level1", function() {
  beforeEach(function() { console.log('level1: Setup'); });
  afterEach(function() { console.log('level1: Teardown'); });
  it("level1: Spec", function() { console.log('level1: Spec'); });

  describe("describe: level2", function() {  // 特别要注意的是，执行这个 describe 时上面的 beforeEach
    beforeEach(function() { console.log('level2: Setup'); });  // 和 afterEach 还是有效的
    afterEach(function() { console.log('level2: Teardown'); });
    it("level2: Spec", function() { console.log('level2: Spec'); });
  });
});

// level1: Setup
// level1: Spec
// level1: Teardown
// level1: Setup
//   level2: Setup
//   level2: Spec
//   level2: Teardown
// level1: Teardown
```

### 禁用测试组

`xdescribe` 关键字定义的测试组将被忽略，适合临时取消一组测试。xdescribe = x + describe

### `fail` 函数

通过 `fail` 函数可以人为制造一个失败项，函数可以接受一个字符串(说明错误信息) 或者 Error 对象作为参数。

```js
describe("A spec using the fail function", function() {
  var foo = function(x, callBack) { if (x) { callBack(); } };

  it("should not call the callBack", function() {
    foo(false, function() { fail("Callback has been called"); });
  });
});
```

### 待完善项 pending

带完善项，即一个测试没有内容或内容不完整，需要补充。测试执行时，待完善项会显示在报告中并注明，共有3种形式：

```js
describe("Pending specs", function() {
  // Any spec declared with xit is marked as pending.
  xit("can be declared 'xit'", function() { expect(true).toBe(false); });
  // Any spec declared without a function body will also be marked pending in results.
  it("can be declared with 'it' but without a function");
  // And if you call the function pending anywhere in the spec body, no matter the expectations, the spec will be marked pending. A string passed to pending will be treated as a reason and displayed when the suite finishes.
  it("can be declared by calling 'pending' in the spec body", function() {
    expect(true).toBe(false);
    pending('this is why it is pending');
  });
});
```

## 监视函数 Spies

Jasmine 有一类被称为 spies 的测试替身函数 [test double](http://xunitpatterns.com/Test%20Double.html) functions。一个监视函数 spy 不仅可以作为被监视函数的替身(供调用)，而且还能跟踪被监视函数的调用情况(包括调用时的参数)。

监视函数只在其被定义的 describe (在 beforeEach 或 beforeAll 内定义) 或 it 区块内有效，且会在每个断言之后被移除。  
Error: Spies must be created in a before function or a spec

> **spy 对象**   
> spy 通常是附加到真正的对象上，并拦截一些方法的调用（有时甚至只拦截方法调用的特定参数），并返回封装响应或跟踪该方法被调用的次数。没被拦截的方法则按正常流程对真正的对象进行处理。

> **函数 or 对象 ??**  
> 翻译时，一会函数，一会对象，感觉有点乱，理解这种混乱首先需要理解 “函数是第一型对象” 的基本概念。  
> 分析行为时，作为函数翻译更加直观；而读取跟踪信息时，作为对象翻译更直观。

### 专有匹配函数

监视函数拥有 3 个专有的匹配函数：

```js
describe("A spy", function() {
  var foo = { setBar: function() {  } };
  it("拥有 3 个专有的匹配函数", function() {
    spyOn(foo, "setBar");  // spyOn: function(obj, methodName) { return env.spyOn(obj, methodName); }
    foo.setBar(456, 'another param');
    expect(foo.setBar).toHaveBeenCalled();        // 判断是否被调用过
    expect(foo.setBar).toHaveBeenCalledTimes(1);  // 判断被调用过几次，except 里的不算
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');  // 确认被调用时传入的参数
  });  // 注意！！上面的 foo.setBar 没有带括号，只是指向 spy 的指针，而下例中的是带括号的，会实际执行
});
```

### 调用策略

监视函数还可以附加调用策略来定义其行为：

* `and.callThrough()` - 默认只监视函数的调用情况，被监视函数不执行，加上此函数就会实际执行被监视函数
* `and.returnValue()` - 如果调用被监视函数，不会实际执行被监视函数，而是始终返回固定的值
* `and.returnValues()` - 指定每次返回的值，每次调用都返回不同的值
* `and.callFake()` - 提供一个替代函数，当调用被监视函数时，执行该替代函数
* `and.throwError()` - 当调用被监视函数时，抛出指定错误
* `and.stub()` - 当使用了以上任意调用策略后，可以随时使用此函数来恢复初始状态(替换被监视函数，只监视无响应)

```js
describe("A spy, when configured to fake a series of return values", function() {
  var foo, bar;

  beforeEach(function() {
    foo = {
      setBar: function(value) { bar = value; },
      getBar: function() { return bar; }
    };

    spyOn(foo, "getBar").and.returnValues("fetched first", "fetched second");
    foo.setBar(123);
  });

  it("when called multiple times returns the requested values in order", function() {
    expect(foo.getBar()).toEqual("fetched first");    // 此处注意与上面的例子做比较
    expect(foo.getBar()).toEqual("fetched second");
    expect(foo.getBar()).toBeUndefined();
  });
});
```

### calls 属性

可以通过 calls 属性来读取具体的跟踪信息：

* `spy.calls.any()` - spy 是否被调用过
* `spy.calls.count()` - spy 被调用的次数
* `spy.calls.argsFor()` - 第一次被调用时传入的参数
* `spy.calls.allArgs()` - 历次调用传入的参数集合
* `spy.calls.all()` - 被调用时的详细信息
* `spy.calls.mostRecent()` - 最近一次被调用时的详细信息
* `spy.calls.first()` - 最早一次被调用时的详细信息
* `spy.calls.first().object` - 详细信息里的 object 指向上下文里的 this
* `spy.calls.reset()` - 重置 spy

```js
describe("A spy", function() {
  var foo = { setBar: function() {  } };
  it("spy.calls 属性详解", function() {
    spyOn(foo, "setBar");
    foo.setBar(123);
    foo.setBar(456, 'baz');
    expect(foo.setBar.calls.any()).toEqual(true);
    expect(foo.setBar.calls.count()).toEqual(2);
    expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
    expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);
    expect(foo.setBar.calls.allArgs()).toEqual([[123],[456, "baz"]]);
    expect(foo.setBar.calls.all()).toEqual([{object: foo, args: [123], returnValue: undefined},
        {object: foo, args: [456, "baz"], returnValue: undefined}]);
    expect(foo.setBar.calls.mostRecent())
        .toEqual({ object: foo, args: [456, "baz"], returnValue: undefined});
    expect(foo.setBar.calls.first()).toEqual({object: foo, args: [123], returnValue: undefined});
    // 如上面示例所示，all(), mostRecent() 和 first() 的 object 属性指向 `this` 所指内容
    expect(foo.setBar.calls.first().object).toBe(foo);
    foo.setBar.calls.reset();
    expect(foo.setBar.calls.any()).toEqual(false);
  });
});
```

### 手动创建 spy

* `createSpy` - 创建单个 spy
* `createSpyObj` - 创建包含多个 spy 的对象

```js
whatAmI = jasmine.createSpy('whatAmI');  // function createSpy(name, originalFn)
tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop']);  // function createSpyObj(baseName, methodNames)
```

## jasmine 命名空间下的方法

这几个方法提供了特定的匹配算法，下节还将介绍自定义匹配算法。

* jasmine.any() - 类型判断，参数为 a constructor or “class” name
* jasmine.anything() - 只要不是 null 或 undefined 就返回 true
* jasmine.objectContaining() - 确认对象是否包含特定的键值对
* jasmine.arrayContaining() - 前面出现过专用于 toContain 匹配函数，功能一样
* jasmine.stringMatching - 字符串正则匹配

```js
expect({}).toEqual(jasmine.any(Object));
expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
expect(foo).toHaveBeenCalledWith(12, jasmine.anything());
foo = { a: 1, b: 2, bar: "baz" };
expect(foo).toEqual(jasmine.objectContaining({ bar: "baz", b: 2 }));
foo = [1, 2, 3, 4];
expect(foo).not.toEqual(jasmine.arrayContaining([6]));
expect({foo: 'bar'}).toEqual({foo: jasmine.stringMatching(/^bar$/)});
expect({foo: 'foobarbaz'}).toEqual({foo: jasmine.stringMatching('bar')});
```

## 自定义匹配算法

自定义 asymmetricMatch 函数，这跟自定义匹配函数有点差别，应该理解为自定义匹配算法。

```js
describe("custom asymmetry", function() {
  var tester = {
    asymmetricMatch: function(actual) {
      var secondValue = actual.split(',')[1];
      return secondValue === 'bar';
    }
  };

  it("dives in deep", function() {
    expect("foo,bar,baz,quux").toEqual(tester);
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy('callback');
      callback('foo,bar,baz');
      expect(callback).toHaveBeenCalledWith(tester);
    });
  });
});
```

## 模拟时钟

Jasmine Clock 对测试与时间相关的代码提供了支持。此模拟时钟会替换实际系统时钟，从而实现对时间相关代码的人工干预。

* `jasmine.clock().install()` - 初始化模拟时钟
* `jasmine.clock().uninstall()` - 卸载模拟时钟
* `jasmine.clock().tick(millis)` - 快进指定的微秒数
* `jasmine.clock().mockDate(initialDate)` - 模拟特定的时间点

注意：模拟时钟的作用域是全局性的，所以测试完要及时卸载，以免影响其他测试。

```js
describe("模拟时钟", function(){
   beforeEach(function() { jasmine.clock().install(); });
   afterEach(function() { jasmine.clock().uninstall(); });

  it("causes a timeout to be called synchronously", function() {
    var timerCallback = jasmine.createSpy();
    setTimeout(function() { timerCallback(); }, 100);
    expect(timerCallback).not.toHaveBeenCalled();
    jasmine.clock().tick(101);
    expect(timerCallback).toHaveBeenCalled();
  });

  it("mocks the Date object and sets it to a given time", function() {
    var baseTime = new Date(2013, 9, 23);
    jasmine.clock().mockDate(baseTime);
    jasmine.clock().tick(50);
    expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
  });
});
```

## 异步测试

Jasmine 同样支持对异步操作的测试。

`beforeAll`, `afterAll`, `beforeEach`, `afterEach` 以及 `it` 内的函数可接受一个参数供传入函数，应该在异步操作完成后调用这个传入的函数，否则 jasmine 会认为异步操作还没有结束。

如果异步操作迟迟没有结束，jasmine 默认等待 5秒，超过这个时间，就会认为异步操作失败，并继续后续测试。

如果需要修改等待时间，可以给 `it` 等再传入一个超时时长来临时调整。还可以通过 `jasmine.DEFAULT_TIMEOUT_INTERVAL` 调整全局的超时等待时长设置。

`done.fail(message)` 函数用于告诉 jasmine 异步操作失败。

```js
describe("异步测试 --", function () {
  var done = function () { console.log("done 函数"); };  // 这个函数后面不会执行
  // 这个是没有问题的，刚开始感觉有点怪，后面想了想，这个 done 是无法传入 function(done){} 里的，
  // 因为那是定义而不是调用，是自己学艺不精。
  // 同时也说明，异步测试里的 done 只能起到结束异步测试的作用，而无法附加其他功能。

  beforeEach(function() { console.log(new Date()); });
  afterEach(function()  { console.log(new Date()); });

  it("参数命名", function (done) {  // 这里的 done 只是个异步测试标记，可以改成其他名字
    done();                         // done 只起了传递异步操作是否结束的信息的作用
    expect(true).toBe(true);        // 这句不会执行，控制台会报错说没有断言语句
  });

  it("没有参数就不是异步测试", function () {     // 没有传入参数，就不是异步测试，直接过
    expect(true).toBe(true);
  });

  it("临时指定超时时长", function (done) {
    console.log("临时指定超时时长 - 1s 后失败");
  }, 1000);                                      // 1秒后失败

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 7000;
  it("修改全局默认等待时间", function (done) {   // 7秒后失败
    console.log("应该等待7s才会报错");
  });

  it(".fail 函数测试", function (done) {
    setTimeout(function(){
      done.fail("人为指定异步操作失败");
    }, 2000);                                    // 2秒后失败
  });
});
```

源码里找出些信息，有助于理解：

```js
this.beforeEach = function(beforeEachFunction, timeout) {  // 源代码说明 timeout 一直都存在
  currentDeclarationSuite.beforeEach({
    fn: beforeEachFunction,
    timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
  });
};
QueueRunner.prototype.run = function(queueableFns, recursiveIndex) {
  if (queueableFn.fn.length > 0) { attemptAsync(queueableFn); return; }
  else { attemptSync(queueableFn); }  // 带参数就执行异步测试操作，不带参就执行普通测试操作
};
```

## 内置匹配函数 Included Matchers

```js
describe("Included matchers:", function() {

  it("The 'toBe' matcher compares with ===", function() {
    var a = 12;
    var b = a;

    expect(a).toBe(b);
    expect(a).not.toBe(null);
  });

  describe("The 'toEqual' matcher", function() {

    it("works for simple literals and variables", function() {
      var a = 12;
      expect(a).toEqual(12);
    });

    it("should work for objects", function() {
      var foo = {
        a: 12,
        b: 34
      };
      var bar = {
        a: 12,
        b: 34
      };
      expect(foo).toEqual(bar);
    });
  });

  it("The 'toMatch' matcher is for regular expressions", function() {
    var message = "foo bar baz";

    expect(message).toMatch(/bar/);
    expect(message).toMatch("bar");
    expect(message).not.toMatch(/quux/);
  });

  it("The 'toBeDefined' matcher compares against `undefined`", function() {
    var a = {
      foo: "foo"
    };

    expect(a.foo).toBeDefined();
    expect(a.bar).not.toBeDefined();
  });

  it("The `toBeUndefined` matcher compares against `undefined`", function() {
    var a = {
      foo: "foo"
    };

    expect(a.foo).not.toBeUndefined();
    expect(a.bar).toBeUndefined();
  });

  it("The 'toBeNull' matcher compares against null", function() {
    var a = null;
    var foo = "foo";

    expect(null).toBeNull();
    expect(a).toBeNull();
    expect(foo).not.toBeNull();
  });

  it("The 'toBeTruthy' matcher is for boolean casting testing", function() {
    var a, foo = "foo";

    expect(foo).toBeTruthy();
    expect(a).not.toBeTruthy();
  });

  it("The 'toBeFalsy' matcher is for boolean casting testing", function() {
    var a, foo = "foo";

    expect(a).toBeFalsy();
    expect(foo).not.toBeFalsy();
  });

  it("The 'toContain' matcher is for finding an item in an Array", function() {
    var a = ["foo", "bar", "baz"];

    expect(a).toContain("bar");
    expect(a).not.toContain("quux");
  });

  it("The 'toBeLessThan' matcher is for mathematical comparisons", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(e).toBeLessThan(pi);
    expect(pi).not.toBeLessThan(e);
  });

  it("The 'toBeGreaterThan' matcher is for mathematical comparisons", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(pi).toBeGreaterThan(e);
    expect(e).not.toBeGreaterThan(pi);
  });

  it("The 'toBeCloseTo' matcher is for precision math comparison", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(pi).not.toBeCloseTo(e, 2);
    expect(pi).toBeCloseTo(e, 0);
  });

  it("The 'toThrow' matcher is for testing if a function throws an exception", function() {
    var foo = function() {
      return 1 + 2;
    };
    var bar = function() {
      return a + 1;
    };

    expect(foo).not.toThrow();
    expect(bar).toThrow();
  });

  it("The 'toThrowError' matcher is for testing a specific thrown exception", function() {
    var foo = function() {
      throw new TypeError("foo bar baz");
    };

    expect(foo).toThrowError("foo bar baz");
    expect(foo).toThrowError(/bar/);
    expect(foo).toThrowError(TypeError);
    expect(foo).toThrowError(TypeError, "foo bar baz");
  });
});
```

## 自定义匹配函数 Matcher

```js
var customMatchers = {
  toBeGoofy: function (util, customEqualityTesters) {   // 这两个参数是固定的，util 由 matchersUtil.js 定义
    return {                         // 工厂函数返回一个带 compare 成员的对象
      compare: function (actual, expected) {         // compare 接收 2 个参数
        if (expected === undefined) {  // expected 为 toBeGoofy 的可选参数，先初始化下
          expected = '';
        }
        var result = {};  // compare 函数必须返回一个 result 对象，包含必须的 pass 和可选的 message 属性
        result.pass = util.equals(actual.hyuk, "gawrsh" + expected, customEqualityTesters);
        if (result.pass) {  // pass 为一个布尔值，用于测试是否通过的依据
          result.message = "Expected " + actual + " not to be quite so goofy";
        } else {            // message 为测试结果提供具体信息
          result.message = "Expected " + actual + " to be goofy, but it was not very goofy";
        }
        return result;
      }
      // 如果需要自定义加 .not 时的比较函数，可以启用下行代码，一般默认都够了无需自定义
      //, negativeCompare: function(actual, expected){}
    };
  }
};

describe("Custom matcher: 'toBeGoofy'", function () {
  beforeEach(function () {
    jasmine.addMatchers(customMatchers);
  });

  it("is available on an expectation", function () {
    expect({ hyuk: 'gawrsh' }).toBeGoofy();
  });

  it("can take an 'expected' parameter", function () {
    expect({ hyuk: 'gawrsh is fun' }).toBeGoofy(' is fun');
  });

  it("can be negated", function () {
    expect({ hyuk: 'this is fun' }).not.toBeGoofy();
  });
});
```

## 自定义匹配算法 Custom Equality Testers

```js
describe("custom equality", function() {
  var myCustomEquality = function(first, second) {
    if (typeof first == "string" && typeof second == "string") { return first[0] == second[1]; }
  };
  beforeEach(function() { jasmine.addCustomEqualityTester(myCustomEquality); });  // 这句是核心
  it("should be custom equal", function() { expect("abc").toEqual("aaa"); });
  it("should be custom not equal", function() { expect("abc").not.toEqual("abc"); });
});
```
