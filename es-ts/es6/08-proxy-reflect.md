# Proxies and the Reflection API

ECMAScript 5 and ECMAScript 6 were both developed with demystifying JavaScript functionality in mind. For example, JavaScript environments contained nonenumerable and nonwritable object properties before ECMAScript 5, but developers couldn't define their own nonenumerable or nonwritable properties. ECMAScript 5 included the `Object.defineProperty()` method to allow developers to do what JavaScript engines could do already.

ECMAScript 6 gives developers further access to JavaScript engine capabilities by adding built-in objects. To allow developers to create built-in objects, the language exposes the inner workings of objects through *proxies*, which are wrappers that can intercept and alter low-level operations of the JavaScript engine. This chapter starts by describing the problem that proxies are meant to address in detail, and then discusses how you can create and use proxies effectively.

## What are Proxies and Reflection?

You can create a proxy to use in place of another object (called the *target*) by calling `new Proxy()`. The proxy *virtualizes* the target so that the proxy and the target appear to be the same object to functionality using the proxy.

Proxies allow you to intercept low-level object operations on the target that are otherwise internal to the JavaScript engine. These low-level operations are intercepted using a *trap*, which is a function that responds to a specific operation.

The reflection API, represented by the `Reflect` object, is a collection of methods that provide the default behavior for the same low-level operations that proxies can override. There is a `Reflect` method for every proxy trap. Those methods have the same name and are passed the same arguments as their respective proxy traps. Table 11-1 summarizes this behavior.

Table 11-1: Proxy traps in JavaScript 代理捕捉器

| Proxy Trap               | Overrides the Behavior Of | Default Behavior |
|--------------------------|---------------------------|------------------|
|`get`                     | Reading a property value  | `Reflect.get()` |
|`set`                     | Writing to a property     | `Reflect.set()` |
|`has`                     | The `in` operator         | `Reflect.has()` |
|`deleteProperty`          | The `delete` operator     | `Reflect.deleteProperty()` |
|`getPrototypeOf`          | `Object.getPrototypeOf()` | `Reflect.getPrototypeOf()` |
|`setPrototypeOf`          | `Object.setPrototypeOf()` | `Reflect.setPrototypeOf()` |
|`isExtensible`            | `Object.isExtensible()`   | `Reflect.isExtensible()` |
|`preventExtensions`       | `Object.preventExtensions()` | `Reflect.preventExtensions()` |
|`getOwnPropertyDescriptor`| `Object.getOwnPropertyDescriptor()` | `Reflect.getOwnPropertyDescriptor()` |
|`defineProperty`          | `Object.defineProperty()` | `Reflect.defineProperty` |
|`ownKeys`                 | `Object.keys`, `Object.getOwnPropertyNames()`, `Object.getOwnPropertySymbols()` | `Reflect.ownKeys()` |
|`apply`                   | Calling a function | `Reflect.apply()` |
|`construct`               | Calling a function with `new` | `Reflect.construct()` |

Each trap overrides some built-in behavior of JavaScript objects, allowing you to intercept and modify the behavior. If you still need to use the built-in behavior, then you can use the corresponding reflection API method. The relationship between proxies and the reflection API becomes clear when you start creating proxies, so it's best to dive in and look at some examples.

> The original ECMAScript 6 specification had an additional trap called `enumerate` that was designed to alter how `for-in` and `Object.keys()` enumerated properties on an object. However, the `enumerate` trap was removed in ECMAScript 7 (also called ECMAScript 2016) as difficulties were discovered during implementation. The `enumerate` trap no longer exists in any JavaScript environment and is therefore not covered in this chapter.


## Proxy

Proxy 实际上**重载 overload 了点运算符**，即用自己的定义覆盖了语言的原始定义。

### 实例：Web 服务客户端

需要实现下面这样的一个 `createWebService` 方法，以创建一个 Web 服务的接口，这个接口返回各种数据。

```js
const service = createWebService('//example.com.data')
service.employees().then(json => {
  const employees = JSON.parse(json)
})
```

常规的实现是这样的：

```js
function createWebSerevice(baseUrl) {
  return {
    employees () { return httpGet(baseUrl + '/employees') },
    // ...
  }
}
```

Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了:

```js
function createWebService(baseUrl) {
  return new Proxy({}, {
    get (target, propKey, receiver) { return () => httpGet(baseUrl + '/' + propKey) }
  })
}
```




