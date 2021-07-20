# 状态管理

* 组件级状态管理 `React.useState()`
* 跨多层级状态传递 `React.useContext()`
* 全局状态管理 Redux、MobX
* 服务端状态 ReactQuery、SWR




## 服务端状态

我们从服务端请求数据，返回的数据通常作为「状态」保存在组件内部，如果是需要复用的「通用状态」，则通常将其保存在像 Redux 这样的 「全局状态管理方案」中。这样做有两个问题

* 需要重复处理请求中间状态（isLoading、isError）
* 「缓存」和「状态」概念混淆

不同于交互中的中间状态，服务端状态应该被归类为「缓存」，它有如下性质

* 通常以「异步」的形式请求、更新
* 状态由请求的数据源控制，不由前端控制
* 状态可以由不同组件共享（既然是多组件共享，还要考虑「缓存失效」「缓存更新」）

Redux 一把梭固然方便，但区别对待不同类型「状态」能让项目更加可控。

通过 [React Query](https://github.com/tannerlinsley/react-query) 之类的「数据请求库」可以将服务端状态从全局状态中解放出来。这给我们带来了很多好处：

* 使用通用的 Hook 来处理请求中间状态
* 请求合并
* 缓存控制
* 让类似 Redux 之类的 「全局状态管理方案」 可以更专注于 「前端中间状态」处理


### React Query

> React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze.

```tsx
// 请求管理

import { useQuery } from 'react-query'

function App() {
  const {data, isLoading, isError} = useQuery('userData', () => axios.get('/api/user'));

  if (isLoading) { return <div>loading</div>; }
  return <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

```tsx
// 缓存管理（全局服务状态管理）

import { useQuery, useMutation, queryCache } from 'react-query';

function App() {
  const {data, isLoading, isError} = useQuery('userData', () => axios.get('/api/user'));
  const { mutate } = useMutation(
    userData => axios.post('/api/user', userData), {
      onSuccess: () => queryCache.invalidateQueries('userData'), // 服务端状态更新后client侧更新内容
    });
}
```

ReactQuery 的状态管理

React Query 将我们所有的服务端状态维护在全局，并配合它的缓存策略来执行数据的存储和更新。借助于这样的特性，我们就可以将所有跟服务端进行交互的数据从类似于 Redux 这样的状态管理工具中剥离，而全部交给 ReactQuery 来管理。

React Query 会在全局维护一个服务端状态树，根据 queryKey 去查找状态树中是否有可用的数据，如果有则直接返回，否则则会发起请求，并将请求结果以 queryKey 为主键存储到状态树中。

React Query 的缓存策略使用了 stale-while-revalidate. 在 MDN 的 Cache Control 中对这个缓存策略的解释是：

*客户端愿意接受陈旧的响应，同时在后台异步检查新的响应*。在 React Query 中的体现是，可以接受状态树中存储的 stale 状态数据, 并且会在缓存失效、新的查询实例被构建或 refetch 等行为后执行更新状态。

```js
// 手撸个最简单的 useQuery

function useQuery(fn, deps = []) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] =  useState(null);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setData(await fn());
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    })();
  }, deps);
}
```






