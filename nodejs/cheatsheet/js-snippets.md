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
stableSort
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





