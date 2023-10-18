# mongosh

https://docs.mongodb.com/manual/reference/method/

### Collection

下表中省略了 `db.<your-collection-name>.`

|||
|----------------------------|-------------------------------------------------------------------------------------
| insert()     | Creates a new document in a collection.
| insertOne()  | Inserts a new document in a collection.
| insertMany() | Inserts several new document in a collection.
|||
| find()              | Performs a query on a collection and returns a cursor object.
| findAndModify()     | Atomically modifies and returns a single document.
| findOne()           | Performs a query and returns a single document.
| findOneAndDelete()  | Finds a single document and deletes it.
| findOneAndReplace() | Finds a single document and replaces it.
| findOneAndUpdate()  | Finds a single document and updates it.
| count()             | Return a count of the number of documents in a collection or matching a query.
|||
| update()     | Modifies a document in a collection.
| updateOne()  | Modifies a single document in a collection.
| updateMany() | Modifies multiple documents in a collection.
| replaceOne() | Replaces a single document in a collection.
| save()       | Provides a wrapper around an insert() and update() to insert new documents.
|||
| remove()     | Deletes documents from a collection.
| deleteOne()  | Deletes a single document in a collection.
| deleteMany() | Deletes multiple documents in a collection.
|||
| drop()             | Removes the specified collection from the database.
| renameCollection() | Changes the name of a collection.
|||
| aggregate()   | Provides access to the aggregation pipeline.
|||
| createIndex() | Builds an index on a collection.
| dropIndex()   | Removes a specified index on a collection.
| dropIndexes() | Removes all indexes on a collection.
| ensureIndex() | Deprecated. Use createIndex().
| reIndex()     | Rebuilds all existing indexes on a collection.
| getIndexes()  | Returns an array of documents that describe the existing indexes on a collection.
|||
| bulkWrite()  | Provides bulk write operation functionality.
| copyTo()     | Deprecated. Wraps eval to copy data between collections in a single MongoDB instance.
| dataSize()   | Returns the size of the collection. Wraps the size field in the output of the collStats.
| distinct()   | Returns an array of documents that have distinct values for the specified field.
| explain()    | Returns information on the query execution of various methods.
| getShardDistribution() | For collections in sharded clusters, getShardDistribution() reports data of chunk distribution.
| getShardVersion() | Internal diagnostic method for shard cluster.
| group()           | Deprecated. Provides simple data aggregation function. Groups documents in a collection by a key, and processes the results. Use aggregate() for more complex data aggregation.
| isCapped()        | Reports if a collection is a capped collection.
| latencyStats()    | Returns latency statistics for a collection.
| mapReduce()       | Performs map-reduce style data aggregation.
|||
| stats()          | Reports on the state of a collection. Provides a wrapper around the collStats.
| storageSize()    | Reports the total size used by the collection in bytes. Provides a wrapper around the storageSize field of the collStats output.
| totalSize()      | Reports the total size of a collection, including the size of all documents and all indexes on a collection.
| totalIndexSize() | Reports the total size used by the indexes on a collection. Provides a wrapper around the totalIndexSize field of the collStats output.
|||
| validate() | Performs diagnostic operations on a collection.

### Cursor

|||
|----------------|-------------------------------------------------------------------------------------------------
| cursor.count()   | return the number of documents in the result set.
| cursor.limit()   | Constrains the size of a cursor’s result set.
| cursor.pretty()  | Configures the cursor to display results in an easy-to-read format.
| cursor.sort()    | Returns results ordered according to a sort specification.
| cursor.next()    | Returns the next document in a cursor.
| cursor.toArray() | Returns an array that contains all documents returned by the cursor.
|||
| cursor.addOption() | Adds special wire protocol flags that modify the behavior of the query.’
| cursor.batchSize() | Controls the number of documents MongoDB will return to the client in a single network message.
| cursor.close()     | Close a cursor and free associated server resources.
| cursor.collation() | Specifies the collation for the cursor returned by the find().
| cursor.comment()   | Attaches a comment to the query to allow for traceability in the logs and the system.profile collection.
| cursor.explain() | Reports on the query execution plan for a cursor.
| cursor.forEach() | Applies a JavaScript function for every document in a cursor.
| cursor.hasNext() | Returns true if the cursor has documents and can be iterated.
| cursor.hint()    | Forces MongoDB to use a specific index for a query.
| cursor.itcount() | Computes the total number of documents in the cursor client-side by fetching and iterating the result set.
| cursor.map()     | Applies a function to each document in a cursor and collects the return values in an array.
| cursor.maxScan() | Specifies the maximum number of items to scan; documents for collection scans, keys for index scans.
| cursor.maxTimeMS() | Specifies a cumulative time limit in milliseconds for processing operations on a cursor.
| cursor.max()       | Specifies an exclusive upper index bound for a cursor. For use with cursor.hint()
| cursor.min()       | Specifies an inclusive lower index bound for a cursor. For use with cursor.hint()
| cursor.noCursorTimeout() | Instructs the server to avoid closing a cursor automatically after a period of inactivity.
| cursor.objsLeftInBatch() | Returns the number of documents left in the current cursor batch.
| cursor.readConcern() | Specifies a read concern for a find() operation.
| cursor.readPref()    | Specifies a read preference to a cursor to control how the client directs queries to a replica set.
| cursor.returnKey() | Modifies the cursor to return index keys rather than the documents.
| cursor.showRecordId() | Adds an internal storage engine ID field to each document returned by the cursor.
| cursor.size() | Returns a count of the documents in the cursor after applying skip() and limit() methods.
| cursor.skip() | Returns a cursor that begins returning results only after passing or skipping a number of documents.
| cursor.snapshot() | Forces the cursor to use the index on the _id field. Ensures that the cursor returns each document, with regards to the value of the _id field, only once.
| cursor.tailable() | Marks the cursor as tailable. Only valid for cursors over capped collections.


### Database

|||
|---------------------|--------------------------------------------------------------------------------------
| db.dropDatabase()     | Removes the current database.
| db.shutdownServer()   | Shuts down the current mongod or mongos process cleanly and safely.
| db.stats()            | Returns a document that reports on the state of the current database.
| db.version()          | Returns the version of the mongod instance.
| db.getName()          | Returns the name of the current database.
| db.getMongo()         | Returns the Mongo() connection object for the current connection.
| db.help()             | Displays descriptions of common db object methods.
| db.hostInfo()         | Returns a document with information about the system MongoDB runs on. Wraps hostInfo
| db.logout()           | Ends an authenticated session.
| db.cloneCollection()  | Copies data directly between MongoDB instances. Wraps cloneCollection.
| db.cloneDatabase()    | Copies a database from a remote host to the current host. Wraps clone.
|||
| db.commandHelp()      | Returns help information for a database command.
| db.copyDatabase()     | Copies a database to another database on the current host. Wraps copydb.
| db.createCollection() | Creates a new collection. Commonly used to create a capped collection.
| db.createView()       | Creates a view.
| db.currentOp()        | Reports the current in-progress operations.
| db.eval() | Deprecated. Passes a JavaScript function to the mongod instance for server-side JavaScript evaluation.
| db.fsyncLock() | Flushes writes to disk and locks the database to prevent write operations and assist backup operations. Wraps fsync.
| db.fsyncUnlock() | Allows writes to continue on a database locked with db.fsyncLock().
| db.getCollection() | Returns a collection object. Used to access collections with names that are not valid in the mongo shell.
| db.getCollectionInfos() | Returns collection information for all collections in the current database.
| db.getCollectionNames() | Lists all collections in the current database.
| db.getLastError() | Checks and returns the status of the last operation. Wraps getLastError.
| db.getLastErrorObj() | Returns the status document for the last operation. Wraps getLastError.
| db.getLogComponents() | Returns the log message verbosity levels.
| db.getPrevError() | Returns a status document containing all errors since the last error reset. Wraps getPrevError.
| db.getProfilingLevel() | Returns the current profiling level for database operations.
| db.getProfilingStatus() | Returns a document that reflects the current profiling level and the profiling threshold.
| db.getReplicationInfo() | Returns a document with replication statistics.
| db.getSiblingDB() | Provides access to the specified database.
| db.isMaster() | Returns a document that reports the state of the replica set.
| db.killOp() | Terminates a specified operation.
| db.listCommands() | Displays a list of common database commands.
| db.loadServerScripts() | Loads all scripts in the system.js collection for the current database into the shell session.
| db.printCollectionStats() | Prints statistics from every collection. Wraps stats().
| db.printReplicationInfo() | Prints a report of the status of the replica set from the perspective of the primary.
| db.printShardingStatus()  | Prints a report of the sharding configuration and the chunk ranges.
| db.printSlaveReplicationInfo() | Prints a report of the status of the replica set from the perspective of the secondaries.
| db.repairDatabase() | Runs a repair routine on the current database.
| db.resetError() | Resets the error message returned by db.getPrevError() and getPrevError.
| db.runCommand() | Runs a database command.
| db.serverBuildInfo() | Returns a document that displays the compilation parameters for the mongod instance. Wraps buildinfo.
| db.serverCmdLineOpts() | Returns a document with information about the runtime used to start the MongoDB instance. Wraps getCmdLineOpts.
| db.serverStatus() | Returns a document that provides an overview of the state of the database process.
| db.setLogLevel() | Sets a single log message verbosity level.
| db.setProfilingLevel() | Modifies the current level of database profiling.
| db.upgradeCheck() | Performs a preliminary check for upgrade preparedness for a specific database or collection.
| db.upgradeCheckAllDBs() | Performs a preliminary check for upgrade preparedness for all databases and collections.

### Constructors

|||
|---------------|-----------------------------------------------------------------------------
| UUID()        | Converts a 32-byte hexadecimal string to the UUID BSON subtype.
| ObjectId()    | Returns an ObjectId.
| ObjectId.getTimestamp() | Returns the timestamp portion of an ObjectId.
| ObjectId.toString()     | Displays the string representation of an ObjectId.

### Connection

|||
|---------------|-----------------------------------------------------------------------------
| connect()     | Connects to a MongoDB instance and to a specified database on that instance.
| mongo.getDB() | Returns a database object.


### Native

|||
|---------------|----------------------------------------------------------
| version()     | Returns the current version of the mongo shell instance.
| hostname()    | Returns the hostname of the system running the shell.
| load()        | Loads and runs a JavaScript file in the shell.
| ls()          | Returns a list of the files in the current directory.
| pwd()         | Returns the current directory.
| quit()        | Exits the current shell session.



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
