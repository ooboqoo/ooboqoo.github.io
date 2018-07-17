# Javascript snippets

https://github.com/Chalarangelo/30-seconds-of-code


## Adapter

```js
// 自取前 n 个参数，忽略其他多余参数
const ary = (fn, n) => (...args) => fn(...args.slice(0, n));
const firstTwoMax = ary(Math.max, 2);
[[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x));  // [6, 8, 10]

// 提供方法名和参数，在提供对象(作用目标)时再执行
const call = (key, ...args) => context => context[key](...args);
const map = call('map', x => 2 * x);
map([1, 2, 3]);

// 修改传参形式  接受数组 -> 接受可变参数
const collectInto = fn => (...args) => fn(args);

// 将第一个参数移到最后
const flip = fn => (first, ...rest) => fn(...rest, first);

over
overArgs
pipeAsyncFunctions
pipeFunctions

// Node 8+ 下直接用 util.promisify
const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  );

rearg
spreadOver

// 只使用第一个参数，忽略其他参数
const unary = fn => val => fn(val);
```


## Array

```js
const all = (arr, fn = Boolean) => arr.every(fn);

const any = (arr, fn = Boolean) => arr.some(fn);

// 将一个二维数组转换成 CSV 字符串
const arrayToCSV = (arr, delimiter = ',') => arr.map(v => v.join(delimiter)).join('\n');

bifurcate
bifurcateBy
chunk
compact
countBy
countOccurrences

// 将一个多层数组展开成单层数组，特别注意 concat 函数的功用
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

difference
differenceBy
differenceWith
drop
dropRight
dropRightWhile
dropWhile
everyNth
filterNonUnique
findLast
findLastIndex
flatten
forEachRight
groupBy
head
indexOfAll
initial
initialize2DArray
initializeArrayWithRange
initializeArrayWithRangeRight
initializeArrayWithValues
intersection
intersectionBy
intersectionWith
isSorted
join
last
longestItem
mapObject
maxN
minN
none
nthElement
partition
permutations
pull
pullAtIndex
pullAtValue
pullBy
reducedFilter
reduceSuccessive
reduceWhich
remove
sample
sampleSize
shuffle
similarity
sortedIndex
sortedIndexBy
sortedLastIndex
sortedLastIndexBy

// 两个要点：不改变原数组 + 如果两项一样，保持原有顺序
// 此处一个比较有参考意义的是 “双因子排序” 的用法
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({item, index}))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)  // “双因子排序” 写法
    .map(({item}) => item);

symmetricDifference
symmetricDifferenceBy
symmetricDifferenceWith
tail
take
takeRight
takeRightWhile
takeWhile
union
unionBy
unionWith
uniqueElements
unzip
unzipWith
without
xProd
zip
zipObject
zipWith
```


## Function

```js
// 尝试执行某个函数，成功正常返回结果，异常就返回错误对象
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch(e) {
    return e instanceof Error ? e : new Error(e);
  }
};

const bind = (fn, context, ...args) =>
    () => fn.apply(context, args.concat(arguments));

const bindKey = (context, methodName, ...args) =>
    () => context[methodName].apply(context, args.concat(arguments));

chainAsync
compose
composeRight
converge
curry

// 去抖函数，确保两次调用之间超过特定时长才真正执行
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);

const functionName = fn => fn.name;

const memoize = fn => {
  const cache = new Map();
  const cached = function(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

negate
once
partial
partialRight
runPromisesInSeries
sleep
throttle
times
uncurry
unfold

```


## Object

```js
bindAll

// 此深拷贝写法简单，但性能不好
const deepClone = obj => JSON.parse(JSON.stringify(obj));

// 深拷贝，支持对象和数组，性能好
const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
};

defaults
dig
equals
findKey
findLastKey
flattenObject
forOwn
forOwnRight
functions
get
invertKeyValues
lowercaseKeys
mapKeys
mapValues
matches
matchesWith
merge
nest
objectFromPairs
objectToPairs
omit
omitBy
orderBy
pick
pickBy
renameKeys
shallowClone
size
transform
truthCheckCollection
unflattenObject
```


## String

```js
const byteSize = str => new Blob([str]).size;

capitalize
capitalizeEveryWord
decapitalize
escapeHTML
escapeRegExp
fromCamelCase
isAbsoluteURL
isAnagram
isLowerCase
isUpperCase
mask
pad
palindrome
pluralize
removeNonASCII
reverseString
sortCharactersInString

const splitLines = str => str.split(/\r?\n/);

stringPermutations
stripHTMLTags

const toCamelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

truncateString
unescapeHTML
URLJoin
words
```



