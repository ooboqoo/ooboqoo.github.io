# Redis

https://redis.io

安装

```bash
$ apt install redis-server  # 安装
$ redis-server              # 启动
$ redis-cli                 # 启动 CLI
```

CLI

```text
SET server:name "my redis"
GET server:name
```

Node.js

```bash
$ npm install redis
```

_redis-demo.js_

```js
const redis = require('redis')
const client = redis.createClient()

client.on('connect', () => console.log('Redis client connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))

client.set('my test key', 'my test value', redis.print)
client.get('my test key', (error, result) => {
  if (error) { console.log(error); throw error }
  console.log('GET result ->' + result)
})
```
