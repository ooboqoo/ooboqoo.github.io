# 前端测试

https://www.zhihu.com/question/29922082  
http://fex.baidu.com/blog/2015/07/front-end-test/  
http://imweb.io/topic/56895ae54c44bcc56092e40a

Jasmine 前端做单元测试的, 而 Karma 自动化完成单元测试

Protractor 是一个 end-to-end 的测试框架，它的构建基于 Selenium WebDriver 之上。

[Selenium](https://github.com/SeleniumHQ/selenium) 是一个 Web 的自动化测试工具，最初是为网站自动化测试而开发的，有点像我们玩游戏用的按键精灵，可以按指定的命令自动操作，不同是 Selenium 可以直接运行在浏览器上，它支持所有主流的浏览器（包括 PhantomJS 这些无界面的浏览器）。




## Puppeteer

### [User Interface Testing with Jest and Puppeteer](https://www.valentinog.com/blog/ui-testing-jest-puppetteer/)


## E2E 测试

[End-to-end Tests that Don’t Suck with Puppeteer](https://ropig.com/blog/end-end-tests-dont-suck-puppeteer/)

* **unit tests** check input => output of self-contained functions.
* **integration tests** check that individual pieces of your app play nicely together.
* **end-to-end tests** check that entire features work from the user’s perspective.

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
