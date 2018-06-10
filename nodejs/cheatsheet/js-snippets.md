# Javascript snippets

https://github.com/Chalarangelo/30-seconds-of-code


## Adapter

```js
const ary = () => ;

const call = (key, ...args) => context => context[key](...args);

collectInto
flip
over
overArgs
pipeAsyncFunctions
pipeFunctions
promisify
rearg
spreadOver
unary
```

## Array

```js
all
any
bifurcate
bifurcateBy
chunk
compact
countBy
countOccurrences
deepFlatten
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
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)  // “双因子排序” 写法
    .map(({ item }) => item)

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


## String

```js
byteSize
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

const splitLines = str => str.split(/\r?\n/)

stringPermutations
stripHTMLTags

const toCamelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}

const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')

const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_')

truncateString
unescapeHTML
URLJoin
words
```



