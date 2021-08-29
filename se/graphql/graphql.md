# GraphQL


https://graphql.org/

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.


### 优缺点

[前端架构——从入门到微前端](/architect/fe/architecture.md)

优势
* 按需获取。客户端可以按自己的需要从服务端获取已定义好的资源，而不需要进行 BFF 相关编程。
* 代码即文档。与参数相比，GraphQL 编写的查询语句更像是一份文档，适合人类阅读。
* 易于使用的 API 调试工具。多数 GraphQL 实现都能提供一个开发用的前端调试 API 界面。
* 强类型的  API 检查。面向前端的接口都有强类型的 Schema 做保证，能快速地定位问题。
* 易于版本化的 API。其可以通过 Schema 扩展 API，而 REST 则需要通过 URI 或 HTTPHeader 等来接收版本。

缺点
* HTTP 请求无法被缓存
* 错误码处理不友好。GraphQL 统一返回 200，在其中对错误信息进行包装。
* 学习成本。使用 GraphQL 就要学习一门查询语言，同时还需要写一大堆 Schema 才能使用。
* 实现复杂。需要开发人员编写 Schema 声明，手动编写 Resolver 来关联字段。一旦遇到复杂的场景，就会难以控制。

相比之下，很难在常规的 BFF 和 GraphQL 中做出选择。如果业务一直在变动，或者需要对外提供 API，选择 GraphQL 更合适。而如果业务变动不频繁，或者客户端数据量少，那么使用 BFF 也可以。

GraphQL API 的强类型特性也非常适合模拟 MockServer 的存在。同时，结合测试框架 Jest + Relay 便可以进行快照 Snapshot 测试。


## Server

### apollo-server-koa

https://www.apollographql.com/docs/apollo-server/




### express-graphql

https://github.com/graphql/express-graphql

```js
const { graphqlHTTP } = require('express-graphql');

const app = express();

const extensions = ({
  document,
  variables,
  operationName,
  result,
  context,
}) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

app.use(
  '/graphql',
  graphqlHTTP((request) => {
    return {
      schema: MyGraphQLSchema,
      context: { startTime: Date.now() },
      graphiql: true,
      extensions,  // DEBUG: 必要时应该可以使用这里的能力放调试信息
    };
  }),
);
```





## Client

### Apollo

https://github.com/apollographql/apollo-client

Apollo Client is a fully-featured caching GraphQL client with integrations for React, Angular, and more. It allows you to easily build UI components that fetch data via GraphQL.

### GQless

https://github.com/gqless/gqless



