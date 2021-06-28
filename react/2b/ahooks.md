# ahooks.js


## API 规范

https://ahooks.js.org/docs/api

### 返回值格式

```js
// 1 无返回值
useMount(() => {});

// 2 返回一个值
const documentVisibility = useDocumentVisibility();

// 3 返回 `[value, setValue]`
const [state, setState] = useLocalStorageState(...);

// 4 返回 `[value, actions]`
const [current, { inc, dec, reset }] = useCounter(...);

// 5 返回 `{...values}`
const { text, left, right, ... } = useTextSelection();

// 6 返回 `{...values, ...actions}`
const { data, error, loading, run } = useRequest(...);
```

### 传参格式

同普通函数参数设计规范。原则上不允许超过 2 个参数。


## FAQ

#### 按需加载

```js
import useToggle from 'ahooks/es/useToggle';
```

如果你使用了 babel 那么可以使用 babel-plugin-import 来进行按需加载。

```js
// 可以继续这么写，插件会自动帮你转成上面按需加载的写法
import { useToggle } from 'ahooks';
```


## Hooks 摘要

### Async

**useRequest**


### UI

**useDrag** & **useDrop**


### SideEffect

**useDebounce** / **useDebounceFn**

**useThrottle** / **useThrottleFn**

**useTimeout**


### LifeCycle

**useDebounceEffect**  为 `useEffect` 增加防抖的能力  
**useThrottleEffect**  为 `useEffect` 增加节流的能力  
**useTrackedEffect**  在 `useEffect` 的基础上，还能额外追踪是哪些 deps 的变更触发了 effect

**useMount** 在 `useEffect`  的基础上又把 mount 这个概念封装出来了  
**useUnmount**

**useUpdateEffect**  只在依赖更新时执行的 `useEffect`  
**useUpdateLayoutEffect**  只在依赖更新时执行的 `useLayoutEffect`

**useUpdate**  强制组件重新渲染，感觉改成 useForceUpdate 会更明确

```js
const refresh = useUpdate();
```


### State

**useLocalStorageState**  将状态持久化存储在 localStorage 中

**usePrevious**  保存上次渲染时的 state

```ts
const previousState: T = usePrevious<T>(
  state: T,
  compareFunction?: (prev: T | undefined, next: T) => boolean
);
```


### Dom

**useInViewport**  判断 dom 元素是否在可视范围之内

**useSize**  监听 dom 节点尺寸变化

**useScroll**  获取元素的滚动状态

```js
const { left, top } = useScroll(target, shouldUpdate);
```

**useTitle**  设置页面标题


### Advanced

**useSafeState**  在组件卸载后，异步调用 setState 不再执行


## 源码学习

### 快速开始

```bash
$ git clone https://github.com/alibaba/hooks.git
$ cd hooks
$ npm run init
$ npm start
```

### 项目配置

文档

dumi

测试

@testing-library/react  
@testing-library/react-hooks  
enzyme  
mockjs  
mockdate  

能力依赖

lodash.debounce  
lodash.isequal  
lodash.throttle  









