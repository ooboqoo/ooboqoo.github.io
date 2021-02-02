# MongoDB Shell


## GUI

https://www.mongodb.com/products/compass

MongoDB Compass 提供了图形界面，感觉还算方便，至少比 VS Code 插件好用些。

The GUI for MongoDB. Visually explore your data. Run ad hoc queries in seconds. Interact with your data with full CRUD functionality. View and optimize your query performance.


## Insert Data

```bash
# 列出数据库
> show dbs
# 使用某个数据库
> use test
# 插入 document 操作
> db.restaurants.insert(
  {
    "address": {
      "street": "2 Avenue",
      "zipcode": "10075",
      "building": "1480",
      "coord": [ -73.9557413, 40.7720266 ]
    },
    "borough": "Manhattan",
    "cuisine": "Italian",
    "grades": [
      {
        "date": ISODate("2014-10-01T00:00:00Z"),
        "grade": "A",
        "score": 11
      },
      {
        "date": ISODate("2014-01-16T00:00:00Z"),
        "grade": "B",
        "score": 17
      }
    ],
    "name": "Vella",
    "restaurant_id": "41704620"
  }
)
# 返回
WriteResult({ "nInserted": 1 })
```


## Find or Query Data

You can use the find() method to issue a query to retrieve data from a collection in MongoDB.

Queries can return all documents in a collection or only the documents that match a specified filter or criteria. 

```txt
> db.restaurants.find()
```

### Specify Equality Conditions

The query condition for an equality match on a field has the following form:

```txt
{ <field1>: <value1>, <field2>: <value2>, ... }
```

If the *field* is a top-level field and not a field in an embedded document or an array, you can either enclose the field name in quotes or omit the quotes.

If the *field* is in an embedded document or an array, use dot notation to access the field. With dot notation, you must enclose the dotted name in quotes.

```txt
> db.restaurants.find( { "address.zipcode": "10075" } )
```

### Specify Conditions with Operators

MongoDB provides operators to specify query conditions, such as comparison operators. Although there are some exceptions, such as the $or and $and conditional operators, query conditions using operators generally have the following form:

```txt
{ <field1>: { <operator1>: <value1> } }
```

For a complete list of the operators, see [query operators](http://docs.mongodb.com/manual/reference/operator/query).

```txt
> db.restaurants.find( { "grades.score": { $gt: 30 } } )
```

### Combine Conditions

You can combine multiple query conditions in logical conjunction (**AND**) and logical disjunctions (**OR**).

#### Logical AND

You can specify a logical conjunction (AND) for a list of query conditions by separating the conditions with a comma in the conditions document.

```txt
> db.restaurants.find( { "cuisine": "Italian", "address.zipcode": "10075" } )
```

The result set includes only the documents that matched all specified criteria.

#### Logical OR

You can specify a logical disjunction (OR) for a list of query conditions by using the $or query operator.

```txt
> db.restaurants.find(
   { $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] }
)
```

The result set includes only the documents that match either conditions.


## Sort Query Results

Pass to `sort()` method a document which contains the field(s) to sort by and the corresponding sort type, e.g. `1` for ascending and `-1` for descending.

```txt
> db.restaurants.find().sort( { "borough": 1, "address.zipcode": -1 } )
```


## Update Data

You can use the update() method to update documents of a collection. The method accepts as its parameters:

* a filter document to match the documents to update,
* an update document to specify the modification to perform, and
* an options parameter (optional).

By default, the update() method updates a single document. Use the *multi* option to update all documents that match the criteria.

You cannot update the _id field.

### Update Specific Fields

#### Update Top-Level Fields

The following operation updates the first document with name equal to "Juni", using the $set operator to update the cuisine field and the $currentDate operator to update the lastModified field with the current date.

```txt
> db.restaurants.update(
  { "name": "Juni" },
  {
    $set: { "cuisine": "American (New)" },
    $currentDate: { "lastModified": true }
  }
)
```

#### Update an Embedded Field

```txt
> db.restaurants.update(
  { "restaurant_id": "41156888" },
  { $set: { "address.street": "East 31st Street" } }
)
```

#### Update Multiple Documents

```txt
> db.restaurants.update(
  { "address.zipcode": "10016", cuisine: "Other" },
  {
    $set: { cuisine: "Category To Be Determined" },
    $currentDate: { "lastModified": true }
  },
  { multi: true}
)
```

### Replace a Document

To replace the entire document except for the _id field, pass an entirely new document as the second argument to the update() method. The replacement document can have different fields from the original document.

```txt
> db.restaurants.update(
  { "restaurant_id": "41704620" },
  {
    "name": "Vella 2",
    "address": {
      "coord": [ -73.9557413, 40.7720266 ],
      "building": "1480",
      "street": "2 Avenue",
      "zipcode": "10075"
    }
  }
)
```


## Remove Data

### Remove All Documents That Match a Condition

```txt
> db.restaurants.remove( { "borough": "Manhattan" } )
```

### Use the justOne Option

```txt
> db.restaurants.remove( { "borough": "Queens" }, { justOne: true } )
```

### Remove All Documents

```txt
> db.restaurants.remove( { } )
```

### Drop a Collection

```txt
> db.restaurants.drop()
```


## Data Aggregation

```txt
db.restaurants.aggregate(
  [
    { $group: { "_id": "$borough", "count": { $sum: 1 } } }
  ]
);
```

