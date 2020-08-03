# React 速查表

### React

|||
|-----------------------|----------------------------------------------------------------------------------------
| React.Component       | the base class for React components when they are defined using ES6 classes.
| React.PureComponent   | is exactly like React.Component but with a shallow prop and state comparison.
|||
| React.createElement(type, props?, children?) | Create and return a new React element of the given type
|||
| React.cloneElement(type, props?, children?)  | Clone and return a new React element using element as the starting point.
| React.isValidElement(object) | Verifies the object is a React element.
| React.Children               | 提供了一组处理 `this.props.children` 的工具方法 map forEach count only toArray

* 尽量使用 JSX 而不要使用 `createElement()` 或 `createFactory()`
* 不要使用 `React.DOM` 下的包装方法，使用 JSX 或直接使用 `createElement()`

### React.Component

|||
|----------------------|-------------------------------------------------------------------------------------------
| constructor()        | call `super(props)` first, otherwise, `this.props` will be undefined
| componentWillMount() | called before render()
| render()             | examine `this.props` and `this.state` and return a single React element.
| componentDidMount()  | is invoked immediately after a component is mounted.
|||
| componentWillReceiveProps() | invoked before a mounted component receives new props. 
| shouldComponentUpdate(newProps, newState) | invoked before rendering when new props or state are being received.
| componentWillUpdate(nextProps, nextState) | invoked immediately before rendering when new props or state are being received.
| render()                    | |
| componentDidUpdate(oldProps, oldState)        | invoked immediately after updating occurs.
|||
| componentWillUnmount() | invoked immediately before a component is unmounted and destroyed.
|||
| setState()    | enqueues changes and tells React to re-render the updated state.
| forceUpdate() | cause `render()` to be called on the component, skipping `shouldComponentUpdate()`
|||
| C.defaultProps  | set the default props for the class. used for `undefined` props, but not for `null` props.
| C.displayName   | used in debugging messages.
|||
| c.props  | contains the props that were defined by the caller of this component.
| c.state  | contains data specific to this component that may change over time.

### ReactDOM

|||
|--------------------------|-------------------------------------------------------------------------------------------
| render()                 | 
| unmountComponentAtNode() | 
| findDOMNode()            | 

### DOM Elements

React implements a browser-independent DOM system for performance and cross-browser compatibility.

React supports all `data-*` and `aria-*` attributes as well as these attributes:

<pre style="font-size: 1.1rem; color: red;">
accept acceptCharset accessKey action allowFullScreen allowTransparency
alt async autoComplete autoFocus autoPlay
capture cellPadding cellSpacing challenge charSet checked cite classID className
colSpan cols content contentEditable contextMenu controls coords crossOrigin
data dateTime default defer dir disabled download draggable encType
form formAction formEncType formMethod formNoValidate formTarget frameBorder
headers height hidden high href hrefLang htmlFor httpEquiv
icon id inputMode integrity is
keyParams keyType kind
label lang list loop low
manifest marginHeight marginWidth max maxLength media
mediaGroup method min minLength multiple muted
name noValidate nonce
open optimum pattern placeholder poster preload profile
radioGroup readOnly rel required reversed role rowSpan rows
sandbox scope scoped scrolling seamless selected shape size sizes span
spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
</pre>

### SyntheticEvent



### Hook API

`useState`

```js
const [state, setState] = useState(initialState)
// 此函数只在初始渲染时被调用
// 也就是说 someExpensiveComputation 在组件生命周期内只执行一次
const [state, setState] = useState(() => { someExpensiveComputation...; return initialState })
// 反例
const initialState = someExpensiveComputation()  // 每次 update 都会执行
const [state, setState] = useState(initialState)

setState(newState)
setState(prevState => { someComputation...; return newState })
// 与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象
setState(prevState => ({...prevState, ...updatedValues}))
```

`useEffect`

```js
// 组件渲染完成后执行副作用操作
useEffect(didUpdate)
// 如果副作用是需要清理的，只要返回清理函数，React 会自动处理
useEffect(() => {
  const subscription = props.source.subscribe()
  return () => { subscription.unsubscribe() }
})
// 条件执行，只有特定依赖发生变化时才执行副作用
useEffect(didUpdate, [count, ...])
// 在所有的 DOM 变更之后，浏览器绘制之前，同步执行副作用操作
// 执行时机同 `componentDidMount` `componentDidUpdate`
useLayoutEffect(didUpdate)
```

`useContext`

```js
const themes = {light: ..., dark: ...}
const ThemeContext = React.createContext(themes.light)

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <ThemedButton />
    </ThemeContext.Provider>
  )
}


function ThemedButton() {
  const theme = useContext(ThemeContext)
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  )
}
```

以下介绍的 Hook，有些是上一节中基础 Hook 的变体，有些则仅在特殊情况下会用到。

useReducer

初始化 state 的方式有两种，一种是直接传入；一种是初始化时动态创建(Lazy initialization)。

```js
useReducer(reducer, initialState)
useReducer(reducer, initialArg, init)
```

useCallback 用于给子组件传递函数

```jsx
const handlerForChildComponent = useCallback(() => { /* ... */ }, [])
```

useMemo 用于获取计算属性，依赖值不变化就没必要每次渲染都重新计算一遍

```ts
function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
```

```jsx
const double = useMemo(() => count * 2, [count])
```

useRef




useImperativeHandle

useLayoutEffect  它和 useEffect 的结构相同，区别只是调用时机不同。

useDebugValue




<style>
  td:first-child { color: red; }
  i { color: gray; }
</style>
<script>
(function() {
  var list = document.querySelectorAll('td:first-child');
  var reg=/\((.*?)\)/;
  for (var i = list.length; i--;) {
    list[i].innerHTML = list[i].innerHTML.replace(reg, '(<i>$1</i>)');
  }
})();
</script>
