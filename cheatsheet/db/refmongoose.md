# Mongoose 手册

## Schema

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

## Model

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












