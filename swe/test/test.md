# 前端测试

https://www.zhihu.com/question/29922082  
http://fex.baidu.com/blog/2015/07/front-end-test/  
http://imweb.io/topic/56895ae54c44bcc56092e40a  


## 概述

### 名词解释

**单元测试 unit tests** 测试单个函数或类 check input => output of self-contained functions or classes  
**集成测试 integration tests** 测试流程或组件 check that individual pieces of your app play nicely together  
**端对端测试/功能测试 end-to-end / functional tests** 以使用者的身份直接在浏览器测试整个应用而不管具体实现细节

**testing framework** 测试框架，提供一些方便的语法来描述测试用例，以及对用例进行分组，如 Jasmine Mocha QUnit  
**assertion library** 断言库，主要提供语义化方法，用于对参与测试的值做各种各样的判断，如 Chai Should  
**coverage reports** 测试覆盖率工具，用于统计测试用例对代码的测试情况，生成相应的报表，如 Istanbul

**Jest** 开箱即用的测试框架，内置了 Jasmine + Istanbul，大概率会占据主导地位  
**Jasmine** 单元测试框架，Angular 推荐的就是 Jasmine + Karma 组合  
**Mocha + Chai** Mocha 测试框架 和 Chai 断言库 是老搭档了  
**Karma** 自动化完成单元测试 Spectacular Test Runner for JavaScript

**PhantomJS** 无界面浏览器，在 Chrome 支持无界面模式后停止开发  
**Protractor** 是一个 end-to-end 的测试框架，它的构建基于 Selenium WebDriver 之上

**WebDriver** [WebDriver](https://w3c.github.io/webdriver) is an open source tool for automated testing of webapps across many browsers  
**Selenium** [Selenium](https://github.com/SeleniumHQ/selenium) 是一个 Web 的自动化测试工具，最初是为网站自动化测试而开发的，有点像我们玩游戏用的按键精灵，可以按指定的命令自动操作，不同是 Selenium 可以直接运行在浏览器上，它支持所有主流的浏览器。  
**Puppeteer** a Node library which provides a high-level API to control Chrome over the DevTools Protocol

### 测试工具分类 Test Tools Types

https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3  
https://zhuanlan.zhihu.com/p/32702421

1. Provide a **testing structure** (Mocha, Jasmine, Jest, Cucumber)
2. Provide **assertions functions** (Chai, Jasmine, Jest, Unexpected)
3. Generate, display, and watch **test results** (Mocha, Jasmine, Jest, Karma)
4. Generate and compare **snapshots** of component and data structures to make sure changes from previous runs are intended (Jest, Ava)
5. Provide **mocks, spies, and stubs** (Sinon, Jasmine, enzyme, Jest, testdouble)
6. Generate **code coverage reports** (Istanbul, Jest, Blanket)
7. Provide a **browser or browser-like environment** with a control on their scenarios execution (Protractor, Nightwatch, Phantom, Casper)

### Selenium VS Puppeteer

> TL;DR;  
> Selenium/WebDriver 支持多种浏览器、多种开发语言  
> Puppeteer 是后起之秀，只支持最新 Chromium，但性能更好、问题更少，综合实用性已远超 Selenium


Puppeteer uses Chrome Remote Debug Protocol, which is the same protocol Devtools uses. It’s just a simple JSON RPC over websockets. Puppeteer creates a nice library abstraction over this api.

The advantage of puppeteer over selenium is that you have a lot more control over chrome. Network, perf, screenshots, coverage, dom & style traversal, etc. It’s a very reliable API too since Chrome Devtools team maintains the backend.

we used the WebdriverIO test framework with Selenium browser automation...


## E2E 测试

[End-to-end Tests that Don’t Suck with Puppeteer](https://ropig.com/blog/end-end-tests-dont-suck-puppeteer/)


### Tips for writing e2e tests

#### Test features, not implementation

```js
// 不好的例子，与具体代码强耦合，测试很容易被破坏
test('can logout', async () => {
  await page.click('#menu div > a')
  sleep 500
})

// 好的例子，即使具体实现代码动了，只要关注点(功能)没动，测试就继续有效
test('can logout', async () => {
  await page.click('[data-testid="userMenuButton"]')
  await page.waitForSelector('[data-testid="userMenuOpen"]')
  await page.click('[data-testid="logoutLink"]')
  await page.waitForSelector('[data-testid="userLoginForm"]')
})
```

Test IDs - 这里的做法非常的好，有效地将代码实现与用户交互进行了解耦。使得测试点非常直观，且不易被破坏。

#### Stick to the happy path features

跟单元测试比起来，端到端测试耗时久且异常脆弱，所以尽量将测试内容放到 UT 和 CT 里，而 E2E 测试只关注业务的核心流程是否能跑通，实现投入与效益之间的最佳平衡。

#### Use async/await for asynchronous things

使用 async/await 而不要将超时等待时间写死。

#### Use a fake data generator like faker

使用像 [faker](https://www.npmjs.com/package/faker) 这样的库来生产测试用数据。
