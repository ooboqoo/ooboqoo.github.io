# MongoDB 教程

http://javascript.ruanyifeng.com/nodejs/mongodb.html


## Install MongoDB Community Edition on Windows

从 2.2 开始不支持 XP，Win7 需要安装一个 hotfix。

安装包下载地址：http://www.mongodb.org/downloads。

MongoDB 是自包含的，没有系统依赖，你可以随意移动 MongoDB 安装目录。


## Run MongoDB Community Edition

### Set up the MongoDB environment.

MongoDB requires a data directory to store all data. MongoDB’s default data directory path is the absolute path \data\db on the drive from which you start MongoDB. You can specify an alternate path for data files using the --dbpath option to mongod.exe, You may also specify the dbpath in a configuration file.

```txt
$ md \data\db

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath d:\test\mongodb\data
```

### Start MongoDB.

添加环境变量并启动

```txt
mongod
```

### Connect to MongoDB.

```txt
mongo
```


### Begin using MongoDB.

MongoDB provides [Getting Started Guides](https://docs.mongodb.com/manual/#getting-started) in various driver editions.

你可以随时按 `Ctrl + C` 来结束 MongoDB。




