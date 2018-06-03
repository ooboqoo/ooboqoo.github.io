# IndexedDB

IndexedDB is a Web API for storing large data structures within browsers and indexing them for high-performance searching. Like an SQL-based RDBMS, IndexedDB is a transactional database system. However, it uses JavaScript objects rather than fixed columns tables to store data.

Note: IndexedDB API is powerful, but may seem too complicated for simple cases. If you'd prefer a simple API, try libraries such as localForage, dexie.js, ZangoDB and JsStore that make IndexedDB more programmer-friendly.

* [localForage](https://github.com/localForage/localForage): A Polyfill providing a simple name:value syntax for client-side data storage, which uses IndexedDB in the background, but falls back to WebSQL and then localStorage in browsers that don't support IndexedDB.
* [Dexie.js](http://www.dexie.org/): A wrapper for IndexedDB that allows much faster code development via nice, simple syntax.









