# Puppeteer

https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#  
[User Interface Testing with Jest and Puppeteer](https://www.valentinog.com/blog/ui-testing-jest-puppetteer/)

## 概述

Chrome60+ 自带 headless(无界面)模式 很方便做自动化测试或者爬虫。但如何同无界面模式的 Chrome 交互则是一个问题。  
Selenium Webdriver 等是一种解决方案，但是往往依赖众多，不够扁平。  
Puppeteer(操纵木偶的人) 是谷歌官方出品的一个通过 [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) 控制 headless Chrome 的 Node 库。可以通过 Puppeteer 提供的 api 直接控制 Chrome 模拟大部分用户操作来进行 UI Test 或者作为爬虫访问页面来收集数据。



