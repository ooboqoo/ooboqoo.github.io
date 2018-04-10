# Node.js 服务器

NodeJS + MongoDB + PM2

http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/


## 基本安装配置

直接使用 `yum install` 安装的包相对比较老(稳定)些，如果需要安装最新的版本，需要手动配置软件源：

```bash
# 下载并执行 NodeJS 配置脚本
$ curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
# 配置 MongoDB 源
$ cat > /etc/yum.repos.d/mongodb-org-3.4.repo
  [mongodb-org-3.4]
  name=MongoDB Repository
  baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
  gpgcheck=1
  enabled=1
  gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc  Ctrl+D
```

最后执行安装：

```bash
$ yum install -y nodejs mongodb-org   # mongod 安装时会自己设置开机启动，但首次需手动启动
$ node -v   # 查看 node 版本
$ mongo     # 跑下 mongodb shell

$ npm install pm2 typescript -g
```


## Koa 自动部署

```bash
$ mkdir koa-mongo.git
$ cd koa-mongo.git
$ git init --bare

$ cat > hooks/post-receive
  #!/bin/sh
  GIT_WORK_TREE=/var/www/koa-mongo git checkout -f
  cd /var/www/koa-mongo
  if [[ $(diff package.json ../package.json) != '' ]]; then
    cp -f package.json ..
    npm i
  fi
  tsc
  pm2 restart dist/app.js      Ctrl+D

$ chmod +x hooks/post-receive
$ cd /var/www
$ mkdir koa-mongo
# 切换到本地仓库 git push 然后继续:
$ pm2 start dist/app.js
$ pm2 save               # 保存当前进程列表
$ pm2 startup            # 配置 pm2 开机启动
```

至此自动部署就完成了，以后只要在本地 `git push`，服务器就会自动编译和更新了。


## PM2 常用命令

```bash
$ pm2 help               # 获取帮助

# Listing
$ pm2 list               # Display all processes status
$ pm2 describe 0         # Display all informations about a specific process

# Logs
$ pm2 logs all           # Display all processes logs in streaming
$ pm2 flush              # Empty all log file
$ pm2 reset              # reset counters for process

# Actions
$ pm2 <stop|restart|reload> <name|id|all>

# Misc
$ pm2 delete 0           # Will remove process from pm2 list
$ pm2 dump|save          # 这一步会保存进程的环境变量等，并把这些设置锁死，要跟新配置，须先 delete 再 save

# update PM2
$ npm update -g pm2@latest  # Install the latest pm2 version
$ pm2 updatePM2             # Then update the in-memory PM2
```


