# Postman

## 安装

## 进行 Restful 请求测试

### Get 请求

* 在地址栏里输入请求 url：http://localhost:9998/api/user
* 选择 “GET” 方式，
* 点击 "Url params",添加 url params key:id , value:1
* 点击 “send” 得到json数据如下：

### Post 请求

* 在地址栏里输入请求 url：http://localhost:9998/api/user/1
* 选择 “POST” 方式，
* 点击 `application/x-www-form-urlencoded`,
* 添加 `key:name, value:baidu-lulee007`
* 添加 `key:sex, value:man`

#### post-json 请求


如果服务端需要请求类型为json，需要在“headers”添加
```
key: Content-Type, value: application/json
```

然后在 “Body” 中选择 “raw”, 并添加：

```json
{
    "id": 1,
    "data": {
        "name": "baidu-lulee007",
        "sex": "man"
    }
}
```

## 身份验证 Authentication

postman有一个helpers可以帮助我们简化一些重复和复杂的任务。当前的一套helpers可以帮助你解决一些authentication protocols的问题。

## 环境设置



