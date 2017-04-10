# Mongoose Guide

http://mongoosejs.com/docs/guide.html

## Quick Start

```js
const mongoose = require('mongoose');
const {connection: db, Schema} = mongoose;
  // connect 方法无法单独导出使用，会丢 this，所以其他实例方法也统一不单独导出
const dbUrl = 'mongodb://localhost:27017/playground';
mongoose.Promise = Promise;  // 默认的 mpromise 是个半成品，采用原生的替换
db.on('close', () => console.log('Database connection closed.'));
db.once('open', () => console.log('Connected to ', dbUrl));

mongoose.connect(dbUrl).then(() => {
  const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nickname: String,
    admin: {type: Boolean, default: false},
    created: Date,
    updated: Date,
  });

  userSchema.method('isAdmin', function () { return this.admin; });
  userSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.updated = currentDate;
    if (!this.created) { this.created = currentDate; }
    next();
  });

  const User = mongoose.model('User', userSchema);

  // CRUD - 注意实际执行顺序，与预期的不一致，如果有先后顺序要求，估计得 async
  User.create([{username: 'admin', password: '123456'}], (err, docs) => {               // 4
    if (err) { return console.error(err); }
    docs.forEach(doc => console.log(doc));
  });
  User.find().exec((err, docs) => {                                                     // 1
    if (err) { return console.error(err); }
    docs.forEach(doc => console.log(doc));
  });
  User.findOneAndUpdate({username: 'admin'}, {username: 'ivan'}, function (err, doc) {  // 3
    if (err) { return console.log(err); }
    console.log(doc);
  });
  User.findOneAndRemove({username: 'admin'}, function (err, doc) {                      // 2
    if (err) { return console.log(err); }
    console.log('User deleted!', doc);
  });
});
```

## Schemas

## Models

## Documents

## Queries

## Validation

