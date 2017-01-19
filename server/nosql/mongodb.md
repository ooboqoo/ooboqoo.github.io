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

## 快速入门

连接服务器

mongod 115.29.137.34:27017

使用数据库(不存在的数据库也可以使用,插入数据之后会自动保存)

use mydb

权限登陆

db.auth('username','password')

展示数据库列表
show dbs

插入数据(类似于mysql的表)

db.users.insert({'name':'xiaomo'})

db.users.insert({'name':'xiaoming','age':25})

db.users.insert({'name':'xiaoming','age':24,'sex':'女'})

查询集合(前提是use了一个数据库)

show collections
有一个System.indexes 是索引

不带条件查询

db.users.find()

带条件查询(参数是一个对象)

db.users.find({'name':'xiaomo'})

更新数据(有三个参数,1:查询条件,2:更新的内容 3：更新的配置)

db.users.update({'name':'xiaomo',{$set:{'name:'xm}}) //修改满足条件的第一条数据

db.users.update({'name':'xiaomo',{$set:{'name:'xm}},{multi:true})  //修改所有满足条件的数据

保存数据(只有一个参数，必须要传id，后面是要修改的数据)

db.users.save({'id':'objectId(574710a97a3afd63cde56a49)','age':30})

删除数据(1:条件 2 是否删除所有符合条件的)

db.users.remove({'name':'xiaomoing'},true)

删除集合

db.users.drop()




