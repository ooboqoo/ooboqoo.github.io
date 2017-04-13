# MongoDB Native

### Collection

http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html

|||
|----------------------------|-------------------------------------------------------------------------------------
| collectionName             | string  Get the collection name.
| namespace                  | string  Get the full collection namespace.
| writeConcern               | object  The current write concern values.
| readConcern                | object  The current read concern values.
| hint                       | object  Get current index hint for collection.

|||
|-----------------------------|-----------------------------------------------------------------------------
| findOne(query, opts)        | Fetches the first document that matches the query
| find(query)                 | Creates a cursor for a query that can be used to iterate over results from MongoDB
| insertOne(doc, opts)        | Inserts a single document into MongoDB.
| insertMany(docs, opts)      | Inserts an array of documents into MongoDB.
| updateOne(filter, update, opts)  | Update a single document on MongoDB
| updateMany(filter, update, opts) | Update multiple documents on MongoDB
| replaceOne(filter, doc, opts)    | Replace a document on MongoDB
| deleteOne(filter, opts)     | Delete a document on MongoDB
| deleteMany(filter, opts)    | Delete multiple documents on MongoDB
|||
| findOneAndUpdate(filter, update, opts)       | Find a document and update it in one atomic operation
| findOneAndReplace(filter, replacement, opts) | Find a document and replace it in one atomic operation
| findOneAndDelete(filter, opts)               | Find a document and delete it in one atomic operation
|||
| createIndex(fieldOrSpec, opts) | Creates an index on the db and collection collection.
| createIndexes(indexSpecs)      | Creates multiple indexes in the collection
| dropIndex(indexName, opts)     | Drops an index from this collection.
| dropIndexes()                  | Drops all indexes from this collection.
| reIndex()                      | Reindex all indexes on the collection. Warning: reIndex is a blocking operation
| indexes()                      | Retrieve all the indexes on the collection.
| indexExists(indexes)           | Checks if one or more indexes exist on the collection
|||
| aggregate(pipeline, opts)   | Execute an aggregation framework pipeline against the collection
| bulkWrite(operations, opts) | Perform a bulkWrite operation without a fluent API
| initializeOrderedBulkOp(opts) | Initiate an In order bulk write operation, operations will be serially executed in the order they are added, creating a new operation for each switch in types.
| initializeUnorderedBulkOp(opts) | Initiate a Out of order batch write operation. All operations will be buffered into insert/update/remove commands executed out of order.
| mapReduce(map, reduce, opts) | Run Map Reduce across a collection.
| parallelCollectionScan(opts) | Return N number of parallel cursors for a collection allowing parallel reading of entire collection. There are no ordering guarantees for returned results.
|||
| count(query, opts)               | Count number of matching documents in the db to a query.
| opts()                           | Returns the opts of the collection.
| rename(newName, opts)            | Rename the collection.
| stats(opts)                      | Get all the collection statistics.
| drop(opts)                       | Drop the collection from the database, removing it permanently
| listIndexes(opts)                | Get the list of all indexes information for the collection.
| indexInformation(opts)           | Retrieves this collections index info.
| isCapped()                       | Returns if the collection is a capped collection
|||
| distinct(key, query, opts)       | Returns a list of distinct values for the given key across a collection.
| geoHaystackSearch(x, y, opts)    | Execute a geo search using a geo haystack index on a collection.
| geoNear(x, y, opts)              | Execute the geoNear command to search for items in the collection
| group(keys, condition, initial, reduce, finalize, command, opts) | Run a group command across a collection


### Cursor

http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html

|||
|-------------------------------|-----------------------------------------------------------------------------
| skip(value)                   | Set the skip for the cursor.
| snapshot(snapshot)            | Set the cursor snapshot
| sort(keyOrList, direction)    | Sets the sort order of the cursor query.
| toArray()                     | Returns an array of the rest documents.
| close()                       | Close the cursor, sending a KillCursor command and emitting close.
| count(applySkipLimit, options)| Get the count of documents for this cursor
| explain()                     | Execute the explain for the cursor 获取查询细节，如用到的索引，结果数量，耗时等，类似于关系数据库这边查看执行计划，并不会真正执行查询
| filter(filter)                | Set the cursor query
| forEach(iterator, callback)   | Iterates over all the documents for this cursor using the iterator, callback pattern.
| hasNext()                     | Check if there is any document still available in the cursor
| hint(hint)                    | Set the cursor hint
| isClosed()                    | Is the cursor closed
| limit(value)                  | Set the limit for the cursor.
| map(transform)                | Map all documents using the provided function
| min(min)                      | Set the cursor min
| max(max)                      | Set the cursor max
| maxScan(maxScan)              | Set the cursor maxScan
| maxTimeMS(value)              | Set a maxTimeMS on the cursor query, allowing for hard timeout limits on queries
| next()                        | Get the next available document from the cursor
| project(value)                | Sets a field projection for the query.
| batchSize(value)              | Set the batch size for the cursor.
|||
| addCursorFlag(flag, value)    | Add a cursor flag to the cursor
| addQueryModifier(name, value) | Add a query modifier to the cursor query
| collation(value)              | Set the collation options for the cursor.
| comment(value)                | Add a comment to the cursor query allowing for tracking the comment in the log.
| maxAwaitTimeMS(value)         | Set a maxAwaitTimeMS on a tailing cursor query to allow to customize the timeout value for the option awaitData 
| returnKey(returnKey)          | Set the cursor returnKey
| setCursorOption(field, value) | Set a node.js specific cursor option
| setReadPreference(readPreference) | Set the ReadPreference for the cursor.
| showRecordId(showRecordId)    | Set the cursor showRecordId
| stream(options)               | Return a modified Readable stream including a possible transform method.
| | 以下为(继承自)原型链上的方法
| pause()                       | Will cause a stream in flowing-mode to stop emitting data events.
| pipe(destination, options)    | Pulls all the data out of a readable stream, and writes it to the destination
| clone()                       | Clone the cursor
| read(size)                    | Pulls some data out of the internal buffer and returns it.
| resume()                      | Will cause the readable stream to resume emitting data events.
| rewind()                      | Resets the cursor
| setEncoding(encoding)         | To cause the stream to return strings instead of Buffer objects.
| unpipe(destination)           | Will remove the hooks set up for a previous pipe() call.
| unshift(chunk)                | "un-consume" some data that has optimistically pulled out of the source.



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
