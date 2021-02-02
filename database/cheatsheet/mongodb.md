# MongoDB 速查表

https://docs.mongodb.com/manual/reference/

## Operators

### 查询和映射操作符 Query and Projection Operators

#### 比较 Comparison Query Selectors

|||
|------|---------------------------------------------------------------------
| $eq  | equal to
| $gt  | greater than
| $gte | greater than or equal to
| $lt  | less than
| $lte | less than or equal to
| $ne  | not equal to
| $in  | in an array
| $nin | not in an array

#### 逻辑 Logical Query Selectors

|||
|------| -------------------------------------------------------------------------------------------------------
| $or  | Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
| $and | Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
| $not | Inverts the effect of a query expression and returns documents that do not match the query expression.
| $nor | Joins query clauses with a logical NOR returns all documents that fail to match both clauses.

```js
// 多数情况下，没有必要使用 $and 操作符，因为最常用的写法已经隐式地包含了 $and 操作符
db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
db.inventory.find( { price: { $ne: 1.99, $exists: true } } )
// 但一些情况下，还是需要显式使用 $and 操作符，这也正是此操作符存在的意义
db.inventory.find( {
    $and : [
        { $or : [ { price : 0.99 }, { price : 1.99 } ] },
        { $or : [ { sale : true }, { qty : { $lt : 20 } } ] }
    ]
} )
```

#### Element Query Selectors

|||
|---------|-------------------------------------------------------
| $exists | Matches documents that have the specified field.
| $type   | Selects documents if a field is of the specified type.

#### Evaluation Query Selectors

|||
|--------|----------------------------------------------------------------------------------------------------
| $mod   | Performs a modulo operation on the value of a field and selects documents with a specified result.
| $regex | Selects documents where values match a specified regular expression.
| $text  | Performs text search.
| $where | Matches documents that satisfy a JavaScript expression.

#### Array

|||
|------------|------------------------------------------------------------------------------------------------
| $all       | Matches arrays that contain all elements specified in the query.
| $elemMatch | Selects documents if element in the array field matches all the specified $elemMatch conditions.
| $size      | Selects documents if the array field is a specified size.

#### Projection Operators

|||
|------------|---------------------------------------------------------------------------------------
| $          | Projects the first element in an array that matches the query condition.
| $elemMatch | Projects the first element in an array that matches the specified $elemMatch condition.
| $meta      | Projects the document’s score assigned during $text operation.
| $slice     | Limits the number of elements projected from an array. Supports skip and limit slices.

#### Comments

|||
|------------|---------------------------------------------------------------------------------------
| $comment   | Adds a comment to a query predicate.

### 更新操作符 Update Operators

#### Fields

|||
|--------------|---------------------------------------------------------------------------------------
| $inc         | Increments the value of the field by the specified amount.
| $mul         | Multiplies the value of the field by the specified amount.
| $rename      | Renames a field.
| $setOnInsert | Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.
| $set         | Sets the value of a field in a document.
| $unset       | Removes the specified field from a document.
| $min         | Only updates the field if the specified value is less than the existing field value.
| $max         | Only updates the field if the specified value is greater than the existing field value.
| $currentDate | Sets the value of a field to current date, either as a Date or a Timestamp.

#### Array

|||
|-----------|---------------------------------------------------------------------------------------
| $         | Acts as a placeholder to update the first element that matches the query condition in an update.
| $addToSet | Adds elements to an array only if they do not already exist in the set.
| $pop      | Removes the first or last item of an array.
| $pullAll  | Removes all matching values from an array.
| $pull     | Removes all array elements that match a specified query.
| $pushAll  | Deprecated. Adds several items to an array.
| $push     | Adds an item to an array.

#### Modifiers

|||
|-----------|---------------------------------------------------------------------------------------
| $each     | Modifies the $push and $addToSet operators to append multiple items for array updates.
| $slice    | Modifies the $push operator to limit the size of updated arrays.
| $sort     | Modifies the $push operator to reorder documents stored in an array.
| $position | Modifies the $push operator to specify the position in the array to add elements.

### 聚合操作符 Aggregation Pipeline Operators

太多了，先忽略


<style>
  td:first-child { color: red; }
  i { color: gray; }
</style>
<script>
(function() {
  var list = document.querySelectorAll('td:first-child');
  var reg=/\((.*?)\)/;
  for (var i = list.length; i--;) {
    list[i].innerHTML = list[i].innerHTML.replace(reg, '(<i>$1</i>)');
  }
})();
</script>
