# Hooks (进阶篇)


## Drawbacks 当前设计的不足

https://github.com/reactjs/rfcs/blob/master/text/0068-react-hooks.md

A non-exhaustive list of drawbacks of this Hooks design follows.

* Introducing a new way to write components means more to learn and means confusion while both classes and functions are used.
* The “Rules of Hooks”: in order to make Hooks work, React requires that Hooks are called unconditionally. Component authors may find it unintuitive that Hook calls can't be moved inside `if` statements, loops, and helper functions.
* The “Rules of Hooks” can make some types of refactoring more difficult. For example, adding an early return to a component is no longer possible without moving all Hook calls to before that conditional.
* Event handlers need to be recreated on each render in order to reference the latest copy of props and state, which reduces the effectiveness of `PureComponent` and `React.memo`.
* It's possible for closures (like the ones passed to `useEffect` and `useCallback`) to capture **old versions** of props and state values. In particular, this happens if the “inputs” array is inadvertently missing one of captured variables. This can be confusing.
* React relies on internal global state in order to determine which component is currently rendering when each Hook is called. This is “less pure” and may be unintuitive.
* `React.memo` (as a replacement for `shouldComponentUpdate`) only has access to the old and new props; there's no easy way to skip rerendering for an inconsequential state update.
* `useState` uses a tuple return value that requires typing the same name twice to declare a state field (like `const [rhinoceros, setRhinoceros] = useState(null);`), which may be cumbersome for long names.
* `useState` uses the overloaded type `() => T | T` to support lazy initialization. But when storing a function in state (that is, when `T` is a function type) you must always use a lazy initializer `useState(() => myFunction)` because the types are indistinguishable at runtime. Similarly, the functional updater form must be used when setting state to a new function value.


部分要点翻译
* “每次所有的钩子都必须运行一遍”带来的不便是
  * 无法将钩子移入 判断、循环 等结构
  * 无法提前结束 Component 运行，更准确地说，需要将所有钩子移动到 early return 之前
* 每次渲染需要重新生成 event handler 以保证对最新 props and state 的映射，没有 `PureComponent` 和 `React.memo` 来地高效
* 使用 `useEffect` `useCallback` 等再配合 `[...]` 来优化性能时，如果没有正确配置依赖项，可能会导致读到旧的状态，会让人很费解
* React 依赖 internal global state 来记录钩子运行时所处的 component 环境，不够 pure 也不直观
* 当使用 `useState` 来存储函数时，因为本身 `useState` 就支持传入 initializer，为了做区分，此时必须使用 `useState(() => myFunction)` 的形式以做区分


## FAQ

### 底层原理

```jsx
function Foo() {
  const [count, setCount] = useState(0)
  const [students, setStudents] = useState([])
  useEffect(() => console.log(count), [count])
  return <span onClick={() => setCount(count + 1)}>{count}</span>
}
```

以上代码生成的元素，在调试窗口看到的是这样子的：

```txt
<Foo />
    Props: {}
    Hooks: [
        {id: 0, isStateEditable: true, name: "State", value: 0, subHooks: Array(0)},
        {id: 1, isStateEditable: true, name: "State", value: Array(0), subHooks: Array(0)},
        {id: 2, isStateEditable: false, name: "Effect", subHooks: Array(0), value: ƒ}
    ]
    Nodes: [span]
    Location: {fileName: "/Users/gavin/GitHub/train-ticket/src/index.js", lineNumber: 18}
```

如果使用了自定义 Hook，那么大概是这个样子的：

```txt
{id: null, isStateEditable: false, name: "Count", value: undefined, subHooks: [
  {id: 0, isStateEditable: true, name: "State", value: 4, subHooks: Array(0)}
  {id: 1, isStateEditable: false, name: "Effect", subHooks: Array(0), value: ƒ}
]}
```

### 生命周期方法如何迁移到 Hook

`constructor`：函数组件不需要构造函数。你可以通过调用 useState 来初始化 state。  
`getDerivedStateFromProps`：改为 在渲染时 安排一次更新。  
`shouldComponentUpdate`：详见 React.memo。  
`render`：这是函数组件体本身。  
`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`：useEffect Hook 可以表达所有这些的组合。  
`componentDidCatch`, `getDerivedStateFromError`：目前还没有这些方法的 Hook 等价写法，但很快会加上。


## 实战积累(深入认识 Hooks)

异步踩坑指南 https://juejin.im/post/5dad5020f265da5b9603e0ca

```jsx
import React, {useState, useCallback} from 'react';

function App() {
  const [count, setCount] = useState(0);
  const log = () => {
    console.log(count);
  }
  const log2 = useCallback(() => {
    console.log(count);  // 这里的 count 会被固化下来，始终为 0
  }, []);
  const add = () => {
    setCount(count + 1);
  }
  return (
    <div>
      <button onClick={log}>log</button>
      <button onClick={log2}>log in useCallback</button>
      <button onClick={add}>add</button>
    </div>
  );
}

export default App;
```

Hooks 使得可以在不编写 Class 的情况下使用状态等功能。@types/react 中也同步把 React.SFC (Stateless Functional Component) 改为了 React.FC (Functional Component)。


### useEffect + 异步任务

中断请求

```js
useEffect(() => {
  let isUnmounted = false;  // 组件是否已经卸载
  const abortController = new AbortController();
  (async () => {
    const res = await fetch(SOME_API, {singal: abortController.singal});
    const data = await res.json();
    // 如果不做这个判断，再更新状态，可能组件已经被卸载了，此时 React 会报 Warning
    if (!isUnmounted) {
      setValue(data.value);
      setLoading(false);
    }
  })();
  return () => {
    isUnmounted = true;
    abortController.abort();  // 组件卸载时中断请求
  }
});
```




### usRef + 异步任务

> 当使用 `useState` 看到的值跟预期不一样时，改成 `useRef` 试试。  
> `useRef()` 返回的 ref 对象在组件的整个生命周期内都保持不变。

问题：发现读取和写入的 state 明明是同一个，但结果就对不上

```js
const MyComponent = () => {
  const [timer, setTimer] = useState(0);  // 记录定时器的 ID
  useEffect(() => {
    // 组件销毁或更新时，清理计时器
    return () => {
      console.log('销毁定时器，ID：', timer);
      window.clearTimeout(timer);
    }
  }, []);  // 这里是个很关键的点，如果没有这个 `[]` 是正常的
  const start = () => {
    const timerID = window.setTimeout(() => {
      // 异步任务 。。。
    }, 5000);
    console.log('设置定时器，ID：', timerID);
    setTimer(timerID);
  }
  // ...
}
```

解决方案1: 改成变量反而就好了

```js
const MyComponent = () => {
  let timer;
  useEffect(() => {
    // 组件销毁或更新时，清理计时器
    return () => {
      console.log('销毁定时器，ID：', timer);
      window.clearTimeout(timer);
    }
  }, []);
  const start = () => {
    timer = window.setTimeout(() => {
      // 异步任务 。。。
    }, 5000);
    console.log('设置定时器，ID：', timer);
    setTimer(timer);
  }
}
```

解决方案2: 使用 useRef

```js
const MyComponent = () => {
  const timer = useRef(0);
  useEffect(() => {
    // 组件销毁或更新时，清理计时器
    return () => {
      console.log('销毁定时器，ID：', timer.current);
      window.clearTimeout(timer.current);
    }
  });
  const start = () => {
    timer.current = window.setTimeout(() => {
      // 异步任务 。。。
    }, 5000);
    console.log('设置定时器，ID：', timer.current);
    setTimer(timer.current);
  }
}
```

问题分析：写入的变量和读取的变量是否是同一个变量

timer 是一个 useState 的返回值，并不是一个简单的变量。从 React Hooks 的源码来看，它返回的是 [hook.memorizedState, dispatch]，对应我们接的值和变更方法。当调用 setTimer 和 setValue 时，分别触发两次重绘，使得 hook.memorizedState 指向了 newState（注意：不是修改，而是重新指向）。但 useEffect 返回闭包中的 timer 依然指向旧的状态，从而得不到新的值。（即读的是旧值，但写的是新值，不是同一个）






### usState 异步更新

usState 返回的更新状态的方法是异步的，要在下次重绘时才能获取新值。

```js
const [count, setCount] = useState(0);
setCount(1);
console.log(count);  // 是 0 不是 1
```



## Hooks 原理

https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/  
https://medium.com/the-guild/under-the-hood-of-reacts-hooks-system-eb59638c9dba

```js
function updateFunctionComponent(recentFiber, workInProgressFiber, Component, props) {
  prepareHooks(recentFiber, workInProgressFiber)
  Component(props)
  finishHooks()
}
```

```js
const ChildComponent = () => {
  useState('foo')
  useState('bar')
  useState('baz')

  return null
}

const ParentComponent = () => {
  const childFiberRef = useRef()

  useEffect(() => {
    let hookNode = childFiberRef.current.memoizedState

    assert(hookNode.memoizedState, 'foo')
    hookNode = hooksNode.next
    assert(hookNode.memoizedState, 'bar')
    hookNode = hooksNode.next
    assert(hookNode.memoizedState, 'baz')
  })

  return (
    <ChildComponent ref={childFiberRef} />
  )
}
```

### 认识闭包

> \[Closure\] makes it possible for a function to have "private" variables. -- W3Schools

```js
function getAdd() {
  let foo = 1;
  return function() {
    foo = foo + 1;
    return foo;
  }
}
const add = getAdd();
console.log(add());  // 2
console.log(add());  // 3
```

### 实现 `useState`

```js
// Example 3
const MyReact = (function() {
  let _val, _deps // hold our state and dependencies in scope
  return {
    render(Component) {
      const Comp = Component()
      Comp.render()
      return Comp
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray
      const hasChangedDeps = _deps ? !depArray.every((el, i) => el === _deps[i]) : true
      if (hasNoDeps || hasChangedDeps) {
        callback()
        _deps = depArray
      }
    },
    useState(initialValue) {
      _val = _val || initialValue
      function setState(newVal) {
        _val = newVal
      }
      return [_val, setState]
    }
  }
})()

// usage
function Counter() {
  const [count, setCount] = MyReact.useState(0)
  MyReact.useEffect(() => {
    console.log('effect', count)
  }, [count])
  return {
    click: () => setCount(count + 1),
    noop: () => setCount(count),
    render: () => console.log('render', { count })
  }
}
let App
App = MyReact.render(Counter)
// effect 0
// render {count: 0}
App.click()
App = MyReact.render(Counter)
// effect 1
// render {count: 1}
App.noop()
App = MyReact.render(Counter)
// // no effect run
// render {count: 1}
App.click()
App = MyReact.render(Counter)
// effect 2
// render {count: 2}
```

### 实现 `useEffect`


