# API 版本迭代

新老版本兼容
  * 服务器兼容客户端: 小版本无感升级, 大版本强制升级
  * 客户端配合服务器: 如何尽快升级到新版本
  * 客户端兼容插件版本: 基于特性检测的版本兼容方案


## 多版本服务器接口的一些实践建议

https://blog.csdn.net/u013628152/article/details/51786879

APP 跟网站不一样，即使你发新版了还是有很高几率用户不买账不更新。所以最好在最初设计接口的时候就想的长远些，API 的 URL 不能随便动，代码写的可扩展性高一些方便以后兼容，数据库中也可先预留好字段。

软件工程里有个开闭原则，软件应向扩展开放，对修改关闭。就是说，你可以添加功能，但不要随意修改已有功能。基于这个原则，有一些多版本服务器接口的一些实践建议：

1. API 有版本区分，如 https://api.example.com/v1/user/ID
2. API 分层，API 只做一些参数的识别与匹配，具体的一些业务逻辑放到单独的 Business Layer 去处理。最最底层的东西，一定要足够抽象，能够应付长期的、可变的应用场景
3. 从早期就有一个稳定的错误代码系统及处理规范。可以定义好接口已过期的错误码，便于客户端及时引导用户升级
4. 小版本号尽量做到兼容，大版本号更新可以考虑强制升级
5. 一般向下兼容2个版本
6. 版本使用监控，当观察到所有用户都使用新版客户端并保持一段时间后，可下掉老版本的资源

我们还要在 Node.js 端做服务聚合，继而为不同端提供不一样的 API。这是比较典型的 API Proxy 用法，当然也可以叫 BFF(backend for frontend)


## 暂存

### `UpdateXxx` 接口提交冲突

A bug I see in nearly every web app: If someone saves a stale record, it overwrites the newer DB record. & Solution:
1. Provide `updated` time with each GET
2. Require `updated` when sending a POST/ PUT
3. If `updated` doesn't match the DB, return an HTTP 409 (conflict)

```
GET /user
{
  id: 1,
  name: "Cory",
  updated: 1686313356  // Unix timestamp that represents when the DB record was last updated
}

POST /user
{
  id: 1,
  name: "Cory New",
  updated: 1686313356
}
```

When the user saves, return an HTTP 409 if `updated` doesn't match the DB (HTTP 409 means a conflict occurred)

When the API returns an error status because the record was stale, tell the user "The record you tried to save has been changed by someone else".
