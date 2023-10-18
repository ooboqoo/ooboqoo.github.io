# Mongoose Guide

http://mongoosejs.com/docs/guide.html


## Quick Start

```js
const mongoose = require('mongoose')  // connect 方法无法单独导出使用，会丢 this，所以其他实例方法也统一不单独导出
const {connection: db, Schema} = mongoose
const dbUrl = 'mongodb://localhost:27017/playground'
mongoose.Promise = Promise  // 默认的 mpromise 是个半成品，采用原生的替换
db.on('close', () => console.log('Database connection closed.'))
db.once('open', () => console.log('Connected to ', dbUrl))

mongoose.connect(dbUrl).then(() => {
  const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nickname: String,
    admin: {type: Boolean, default: false},
    created: Date,
    updated: Date,
  })

  userSchema.method('isAdmin', function () { return this.admin; })
  userSchema.pre('save', function(next) {
    const currentDate = new Date()
    this.updated = currentDate
    if (!this.created) { this.created = currentDate }
    next()
  })

  const User = mongoose.model('User', userSchema)

  // CRUD - 注意实际执行顺序，与预期的不一致，如果有先后顺序要求，估计得 async
  User.create([{username: 'admin', password: '123456'}], (err, docs) => {               // 4
    if (err) { return console.error(err) }
    docs.forEach(doc => console.log(doc))
  })
  User.find().exec((err, docs) => {                                                     // 1
    if (err) { return console.error(err) }
    docs.forEach(doc => console.log(doc))
  })
  User.findOneAndUpdate({username: 'admin'}, {username: 'ivan'}, function (err, doc) {  // 3
    if (err) { return console.log(err) }
    console.log(doc)
  })
  User.findOneAndRemove({username: 'admin'}, function (err, doc) {                      // 2
    if (err) { return console.log(err) }
    console.log('User deleted!', doc)
  })
})
```


## CheatSheet

### Schema

http://mongoosejs.com/docs/api.html#schema-js

|||
|----------------------------|-------------------------------------------------------------------
| Schema(definition, opts?)  | Schema constructor
|||
| schema.add(obj, prefix)    | Adds key path / schema type pairs to this schema
| schema.method(method, fn)  | Adds an instance method to documents constructed from Models compiled from this schema
| 
| schema.static(name, fn)    | Adds static "class" methods to Models compiled from this schema
| schema.pre(method, fn)     | Defines a pre hook for the document.
| schema.post(method, fn)    | Defines a post hook for the document
| schema.virtual(name, opts?) | Creates a virtual type with the given name
| 

Options:

autoIndex: bool - defaults to null (which means use the connection's autoIndex option)
bufferCommands: bool - defaults to true
capped: bool - defaults to false
collection: string - no default
emitIndexErrors: bool - defaults to false.
id: bool - defaults to true
_id: bool - defaults to true
minimize: bool - controls document#toObject behavior when called manually - defaults to true
read: string
safe: bool - defaults to true.
shardKey: bool - defaults to null
strict: bool - defaults to true
toJSON - object - no default
toObject - object - no default
typeKey - string - defaults to 'type'
useNestedStrict - boolean - defaults to false
validateBeforeSave - bool - defaults to true
versionKey: string - defaults to "__v"

### Model

|||
|----------------------------|-------------------------------------------------------------------
| model.$where(argument)     | Creates a Query and specifies a $where condition
| model.model(name) | Returns another Model instance
| model.remove(fn?) | Removes this document from the db
| model.save(opts?, opts.safe?, opts.validateBeforeSave?, fn?) | Saves this document
| model.create(doc(s), fn?) | `MyModel.create(docs)` does `new MyModel(doc).save()` for every doc in docs
| model.find(conditions?, projection?, opts?, fn?) | Finds documents
| model.findById(id, [projection], [options], [callback])
| model.findOne([conditions], [projection], [options], [callback])
| model.remove(conditions, [callback])



## Schemas

Everything in Mongoose starts with a Schema. Each **schema** maps to a MongoDB **collection** and defines the shape of the **documents** within that collection.

Schemas not only define the structure of your document and casting of properties, they also define document instance methods, static Model methods, compound indexes, and document lifecycle hooks called middleware.

Creating a model

To use our schema definition, we need to convert our blogSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):

```js
var Blog = mongoose.model('Blog', blogSchema);
```

Instance methods

Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.

```js
var animalSchema = new Schema({ name: String, type: String })
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb)
}
```

## Models

## Documents

## Queries

## Validation

