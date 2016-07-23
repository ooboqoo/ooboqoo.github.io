# TypeScript

## 快速上手


#### 编译代码： tsc greeter.ts

#### 类型注解
类型注解在TypeScript中是记录函数或变量约束的简便方法。TypeScript基于你的代码结构和类型注解可以提供静态分析。
function greeter(person: string) {
    return "Hello, " + person;
}

#### 接口

让我们进一步开发我们的demo。 在这里我们使用一个接口，它描述了具有firstName和lastName字段的对象。在TypeScript中，如果两个类型其内部结构兼容，那么这两种类型兼容。这使我们实现一个接口，仅仅只需必要的结构形状，而不必有明确的implements子句。

```js
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

var user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```