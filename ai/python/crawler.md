# 阿江的网络爬虫课程


https://www.bilibili.com/video/BV1KMCfYREKV?spm_id_from=333.788.player.switch&vd_source=f9e36835843450ab8a4cb669b15342c0


常见请求库对比
* urllib -  优点 标准库，不需要额外安装；缺点 API 相对繁琐；适用场景 简单应用，或不想引入外部依赖时
* *requests* - 优点 API 简单易用，社区支持强大； 缺点 不支持异步；适用场景 大多数 HTTP 请求场景，尤其是对性能要求不是非常高的同步程序
* *httpx* - 优点 同时支持同步和异步 API，支持 HTTP2； 缺点 相对较新；适用场景 需要同时使用同步和异步的场景
* aiohttp - 优点 支持异步，适合高并发场景； 缺点 API 相对复杂；适用场景 需要处理大量并发连接的应用


网络解析库
* BeautifulSoup - 功能全面，出初学者友好，适合广泛的解析任务，但性能相对较慢
* parsel - 更轻量快速，专注于 CSS 选择器和 XPath，与 Scapy 框架紧密集成，适合高性能爬虫项目，但学习曲线陡峭

JSON 编码解码
* json - 标准库
* ujson - 第三方库，json 模块的高性能替代品


开源爬虫工具推荐
* https://github.com/scrapy/scrapy
* https://github.com/NaiboWang/EasySpider
* https://github.com/NanmiCoder/MediaCrawler





登录态保持

Playwright



## 源码阅读

https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth 这个是抹掉浏览器特征的



