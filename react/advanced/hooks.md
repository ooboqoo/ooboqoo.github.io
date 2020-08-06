# Hook 简介

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。


## 简介

Hook 提供了强大而富有表现力的方式来在组件间复用功能。通过 「自定义 Hook」 这一节可以了解能用它做些什么。

```jsx
import React, {useState} from 'react'

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

### 动机

Hook 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。

#### 很难在组件之间复用状态逻辑

React 没有提供将可复用性行为附加到组件的途径。你也许会熟悉一些解决此类问题的方案，比如 providers，consumers，高阶组件，render props 等其他抽象层组成的组件。但是这类方案需要重新组织你的组件结构，使你的代码难以理解。

现在你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你 *在无需修改组件结构的情况下复用状态逻辑*。

#### 复杂组件变得难以理解

每个生命周期常常包含一些不相关的逻辑。如我们可能在 componentDidMount 中设置事件监听，而在 componentWillUnmount 中清除。相互关联且需要对照修改的代码被拆散了，而完全不相关的代码却在同一个方法中掺杂在一起。如此很容易产生 bug，并导致逻辑不一致。

在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与 *状态管理库* 结合使用的原因之一。但这往往 *会引入了很多抽象概念，需要你在不同的文件之间来回切换*，使得复用变得更加困难。

#### 难以理解的类

this 指向困扰

### 渐进策略

Hook 不会影响你对 React 概念的理解。恰恰相反，Hook 为已知的 React 概念提供了更直接的 API：props，state，context，refs 以及生命周期。稍后我们将看到，Hook 还提供了一种更强大的方式来组合他们。

我们准备让 Hook 覆盖所有 class 组件的使用场景，但我们将继续为 class 组件提供支持。在 Facebook，我们有成千上万的组件用 class 书写，我们完全没有重写它们的计划。相反，我们开始在新的代码中同时使用 Hook 和 class。


## useState

`useState` 类似 class 组件的 `this.setState`。

```js
function ExampleWithManyStates() {
  // 声明多个 state 变量！
  const [age, setAge] = useState(42)  // 原始值类型
  const [todos, setTodos] = useState([{text: 'Learn Hooks'}])  // 对象
  const [fruit, setFruit] = useState(() => 'banana')  // 函数
  // ...
}
```

`useState`
* 唯一的参数就是初始 state，这个传入的值只会在第一次初始化时使用
* 返回值为：当前 state 以及更新 state 的函数
* 在初始渲染期间，返回的状态 state 与传入的第一个参数 initialState 值相同
* setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列
* 一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留
* React 会确保 setState 函数的标识是稳定的，并且不会在组件重新渲染时发生变化

`useState` 与 `this.setState` 之间的差异
* useState 不会把新的 state 和旧的 state 进行合并
* 给 useState 传递的 state 可以是任意类型，*而 this.setState 只能是一个对象*

### 函数式更新

```jsx
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

useState 不会自动合并更新对象。你可以结合展开运算符来达到合并更新对象的效果。useReducer 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

```jsx
setState(prevState => {
  // 也可以使用 Object.assign
  return {...prevState, ...updatedValues};
});
```

### 惰性初始 state

initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则 *可以传入一个函数*，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

```jsx
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

### 跳过 state 更新

调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。

React 可能仍需要在跳过渲染前渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化。

### 避坑指南

`useState` 返回的更新状态方法是异步的，要在下次重绘时才能获取新值。

```js
const [count, setCount] = useState(0);
setCount(1);
console.log(count);  // 是 0 不是 1
```




## useEffect

你之前可能已经在 React 组件中执行过 *数据获取、订阅或者手动修改过 DOM*。我们统一把这些操作称为“副作用”，或简称“作用”。

`useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

```jsx
import React, {useState, useEffect} from 'react'

function Example() {
  const [count, setCount] = useState(0)

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => setCount(c => c + 1)}>Click me</button>  // setCount 支持回调函数
    </div>
  )
}
```

当你调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。在 class 组件中，render 函数是不应该有任何副作用的。一般来说，在这里执行操作太早了，所以通常我们把 class 组件中的副作用操作放到 componentDidMount 和 componentDidUpdate 中。

由于副作用函数是在组件内声明的，所以它们可以访问到组件的 `props` 和 `state`。

默认情况下，React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候。

副作用函数还可以通过返回一个函数来指定如何“清除”副作用。

*虽然 useEffect 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行*。React 将在组件更新前刷新上一轮渲染的 effect。也就是说，如果在 Efect 中更新了 state，界面是没有任何变化的，要等到其他条件触发重新渲染才会更新，也即总是会慢一拍。

**为什么在组件内部调用 useEffect？**

将 useEffect 放在组件内部让我们可以在 effect 中直接访问 count state 变量（或其他 props）。我们不需要特殊的 API 来读取它 —— 它已经保存在函数作用域中。*Hook 使用了 JavaScript 的闭包机制*。

**useEffect 会在每次渲染后都执行吗？**

是的，默认情况下，它在第一次渲染之后和每次更新之后都会执行。你可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。

与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 useLayoutEffect Hook 供你使用，其 API 与 useEffect 相同。

```js
// 类组件里同一行代码要写两次
class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`  // 1
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`  // 2
  }

  render() { /* ... */ }
}
```

```js
// 使用钩子一行搞定
function Example() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  })

  return ( /* ... */ )
}
```

### 使用多个 Effect 实现关注点分离

Hook 允许我们 *按照代码的用途分离* 他们，而不是像生命周期函数那样。React 将按照 effect 声明的顺序依次调用每一个 effect。

```js
class FriendStatusWithCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
}
```

```js
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

### 需要清除的 effect

还有一些副作用是需要清除的。例如订阅外部数据源。这种情况下，清除工作是非常重要的，可以防止引起内存泄露！每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。

每次渲染时，React 会在执行当前 effect 之前对上一个 effect 进行清除。最后，React 会在组件卸载的时候再执行一次清除操作。

```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

### 为什么每次更新都要运行 Effect

经验丰富的 JavaScript 开发人员可能会注意到，传递给 useEffect 的函数在每次渲染中都会有所不同，这是刻意为之的。事实上这正是我们可以在 effect 中获取最新的 count 的值，而不用担心其过期的原因。每次我们重新渲染，都会生成新的 effect，替换掉之前的。某种意义上讲，*effect 更像是渲染结果的一部分* —— 每个 effect “属于”一次特定的渲染。

元素接收的某个 prop 值更改后，元素不会销毁重建，所以 class 组件下在 `componentDidUpdate` 里添加更新逻辑就很有必要了。忘记正确地处理 componentDidUpdate 是 React 应用中常见的 bug 来源。而使用 Effect Hook，它会在调用一个新的 effect 之前对前一个 effect 进行清理。此默认行为保证了一致性，避免了在 class 组件中因为没有处理更新逻辑而导致常见的 bug。

```js
class FriendStatusWithCounter extends React.Component {
  // ...

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(this.props.friend.id, this.handleStatusChange);
  }
  // 如果没有这里的逻辑，那么当 friend 变化时，我们的组件展示的还是原来的好友状态
  componentDidUpdate(prevProps) {
    // 取消订阅之前的 friend.id
    ChatAPI.unsubscribeFromFriendStatus(prevProps.friend.id, this.handleStatusChange);
    // 订阅新的 friend.id
    ChatAPI.subscribeToFriendStatus(this.props.friend.id, this.handleStatusChange);
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(this.props.friend.id, this.handleStatusChange);
  }

  // ...
}
```

下面是使用 Hook 的写法

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

### 跳过 Effect 以优化性能

在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。在 class 组件中，我们可以通过在 componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决：

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

这是很常见的需求，所以它被内置到了 useEffect 的 Hook API 中。如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可：

```js
// 这个时候跟 Vue.js 的 watch 很像
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组`[]` 作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。

如果你传入了一个空数组`[]`，effect 内部的 props 和 state 就会一直拥有其初始值。

除此之外，请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得额外操作很方便。


## useContext

`useContext` 接收一个 context 对象(React.createContext 的返回值)并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider value={xxx}>` 的 `value` prop 决定。

当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染

如果重渲染组件的开销较大，你可以 通过使用 memoization 来优化。

如果你在接触 Hook 前已经对 context API 比较熟悉，那应该可以理解，useContext(MyContext) 相当于 class 组件中的 `static contextType = MyContext` 或者 `<MyContext.Consumer>`。

useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。

注意不要滥用 Context，因为它会破坏你的组件独立性。

```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```


## 额外的 Hook

以下介绍的 Hook，有些是上一节中基础 Hook 的变体，有些则仅在特殊情况下会用到。

### useReducer

某些场景下，`useReducer` 会比 `useState` 更适用，如 *state 逻辑较复杂且包含多个子值* ，或是下一个 state 依赖于之前的 state 。并且，使用 `useReducer` 还能给那些会触发深更新的组件做性能优化，因为你可以 *向子组件传递 dispatch* 而不是回调函数。

* Redux: Global state management for user, auth, etc.
* useReducer: Complex local state where dispatch is often passed to children as well.
* useState: Simple local state where the setter is seldom passed to children.

I use all of above.

* 全局共享状态，方便调试和维护，用 Redux
* 简单的组件状态用 useState
* 复杂的组件状态，需要对此状态进行多种类型的操作，或者需要向子组件传递 setter 时，用 useReducer。特别是不同的子组件需要对复杂状态进行不同操作时，使用 dispatch 可以让子组件的操作意图更加明确。

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

初始化 state 的方式有两种
* 一种是直接传入 `useReducer(reducer, initialState)`
* 一种是初始化时动态创建(Lazy initialization) `useReducer(reducer, initialArg, init)`

You can also create the initial state lazily. To do this, you can pass an init function as the third argument. The initial state will be set to `init(initialArg)`.

It lets you extract the logic for calculating the initial state outside the reducer. This is also handy for resetting the state later in response to an action:

```jsx
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

### useCallback

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

```jsx
// 套 memo 后，只要 props 没变就不会重新渲染
// 本例中，App 内的 count 值变更，不会输出 “Foo render”，没套的话每次 App 的重新渲染都会触发 Foo 重复渲染
const Foo = memo(function Foo(props) {
  console.log('Foo render')
  // 这里必须显式绑定，在外层绑定不起作用，这个跟 Vue.js 行为不一样
  return <div onClick={props.onClick}>Me Foo</div>
})

const App = () => {
  const [count, setCount] = useState(0)
  // 没套 useCallback 的话，传递的函数句柄每次渲染都会变化，从而导致 Foo 重复渲染
  const clickFoo = useCallback(() => console.log('Foo Clicked'), [])
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Add({count})</button> // 在 DOM 上无需 useCallback
      <Foo onClick={clickFoo} />                                        // 传递给子组件就要套 useCallback
    </div>
  )
}
```

### useMemo

`memo()` 限制一个组件是否重复渲染，而 `useMemo()` 则是限制一个函数是否重复执行。

`useMemo()` 和 `useEffect()` 的第二个参数逻辑是相同的，不同的是，`useMemo` 是有返回值的，在渲染之前执行，而 `useEffect` 则是在渲染之后执行。

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。

如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。

```jsx
// 这个跟 Vue.js 中的 computed 很像
const double = useMemo(() => count * 2, [count])
```

### useRef

* 获取子组件或者 DOM 节点的句柄。无法获取函数子组件的 ref，必须是类组件，所以完全取代暂时还不现实
* 渲染周期之间共享数据的存储。state 也可以跨渲染周期保存，但会触发重新渲染，而 ref 不会触发重新渲染
* Ref 的 `current` 的值可以随便修改，但 Ref 对象本身不可扩展属性 `Object.isExtensible(ref) === false`

useRef 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数 initialValue。返回的 ref 对象在组件的整个生命周期内保持不变。

你应该熟悉 ref 这一种访问 DOM 的主要方式。如果你将 ref 对象以 `<div ref={myRef} />` 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 `.current` 属性设置为相应的 DOM 节点。

然而，`useRef()` 比 `ref` 属性更有用。它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式。

这是因为它创建的是一个普通 Javascript 对象。而 `useRef()` 和自建一个 `{current: ...}` 对象的唯一区别是，`useRef` 会在每次渲染时返回同一个 ref 对象。

请记住，当 ref 对象内容发生变化时，`useRef` 并不会通知你。*变更 `.current` 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现*。

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

#### ref callback

React will call the ref callback with the DOM element when the component mounts, and call it with `null` when it unmounts.

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  const refCallback = el => {
    console.log('refCallback', {el});
    inputEl.current = el;
  }
  return (
    <>
      <input ref={refCallback} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### useImperativeHandle

useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

```js
function FancyInput(props, ref) {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus()
  }))
  return <input ref={inputRef} />;
}
FancyInput = forwardRef(FancyInput);

function Foo () {
  const fancyInputRef = useRef(null)
  return (
    <>
      <span onClick={() => fancyInputRef.current.focus()}></span>
      <FancyInput ref={fancyInputRef} />
    </>
  )
}
```

### useLayoutEffect

It fires synchronously after all DOM mutations. We recommend starting with useEffect first and only tring useLayoutEffect if that causes a problem.

Your code runs immediately *after the DOM has been updated*, but *before* the browser has had a chance to *paint those changes* (the user doesn't actually see the updates until after the browser has repainted).

其函数签名与 useEffect 相同，但它会在 *所有的 DOM 变更之后 同步* 调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。*在浏览器执行绘制之前*，useLayoutEffect 内部的更新计划将被同步刷新。

`useLayoutEffect` 与 `componentDidMount`、`componentDidUpdate` 的调用阶段是一样的。

`useLayoutEffect` 会阻塞浏览器主线程，里面的所有修改都会在下次渲染时体现。而 `useEffect` 会先让出主线程，将任务添加到事件队列中等候执行。（具体看 DevTools / Performance / Main 的 Task 就好，放大看一眼就明白了）

如果你使用服务端渲染...

### useDebugValue

useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。

在某些情况下，格式化值的显示可能是一项开销很大的操作。除非需要检查 Hook，否则没有必要这么做。

因此，useDebugValue 接受一个格式化函数作为可选的第二个参数。该函数只有在 Hook 被检查时才会被调用。它接受 debug 值作为参数，并且会返回一个格式化的显示值。


## 自定义 Hook

目前为止，在 React 中有两种流行的方式来共享组件之间的状态逻辑: render props 和高阶组件，现在让我们来看看 Hook 是如何在让你不增加组件的情况下解决相同问题的。

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

与组件中一致，请确保只在自定义 Hook 的顶层无条件地调用其他 Hook。

与 React 组件不同的是，*自定义 Hook 不需要具有特殊的标识。我们可以自由的决定它的参数是什么，以及它应该返回什么*（如果需要的话）。

*自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性*。

你可以创建涵盖各种场景的自定义 Hook，如表单处理、动画、订阅声明、计时器，甚至可能还有更多我们没想到的场景。

**自定义 Hook 必须以 “use” 开头吗？**

必须如此。这个约定非常重要。不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的规则。

**在两个组件中使用相同的 Hook 会共享 state 吗？**

不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

```js
import React, { useState, useEffect } from 'react';

// 自定义钩子
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

// 组件
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

// 组件
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

### usePrevious

可以利用这个自定义钩子来获取上一轮的 props 或 state，考虑到这是一个相对常见的使用场景，很可能在未来 React 会内置此 Hook。

```js
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <h1>Now: {count}, before: {prevCount}</h1>;
}
```


## Hook 规则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则。

### 只在最顶层使用 Hook

不要在循环，条件或嵌套函数中调用 Hook，确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都 *按照同样的顺序被调用*。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

### 只在函数组件中调用 Hook

不要在普通的 JavaScript 函数中调用 Hook。你可以：

* 在 React 的函数组件中调用 Hook
* 在自定义 Hook 中调用其他 Hook

遵循此规则，确保组件的状态逻辑在代码中清晰可见。

### 为什么要有这两个规则

我们可以在单个组件中使用多个 State Hook 或 Effect Hook 时，React 将钩子都扔到了一个数组里，React 依赖 Hook 的调用顺序来区分每一个钩子。

如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的内部：

```js
useEffect(function persistForm() {
  // 👍 将条件判断放置在 effect 中
  if (name !== '') {
    localStorage.setItem('formData', name);
  }
});
```


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

### 实现 forceUpdate

```js
const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

function handleClick() {
  forceUpdate()
}
```


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



### useEffect

* They 









## 最佳实践

React Hooks 最佳实践 https://juejin.im/post/5ec7372cf265da76de5cd0c9#heading-10



