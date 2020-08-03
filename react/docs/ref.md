# Ref

多数时候，父组件通过 `props` 来向子组件传递信息。但有时也可能希望直接控制某个子组件，React 提供了这种机制，可以实现直接控制一个 React 组件或 DOM 元素。

### When to Use Refs

以下情况下使用 "子组件引用" 是比较合适的：
  * 获取焦点、文本选择，或者是媒体播放
  * 触发动画效果
  * 集成第三方 DOM 库

如果使用声明形式就能实现功能，则应避免使用子组件引用。如直接向 Dialog 子组件传递 `isOpen` 属性，而不是调用 Dialog 的 `open()` 和 `close()` 方法。

### Adding a Ref to a DOM Element

React 通过向组件的 `ref` 特性赋值一个 callback 来实现引用。当组件加载或卸载时，该回调函数都会被调用一次。

```
<div>
  <input type="text" ref={(input) => { this.textInput = input; }} />
      // 加载时将 input 元素的引用存储到 this.textInput
      // 卸下时会将 null 赋值给 this.textInput 来释放资源
  <input type="button" value="Focus the text input" onClick={() => this.textInput.focus()} />
</div>
```

通过在 `ref` 回调函数中将引用赋值给一个类属性是最常见的一种用法。

### Adding a Ref to a Class Component

当设定自定义组件的 `ref` 属性时，自定义组件的实例会作为参数传递给回调函数。

```
<CustomTextInput ref={(input) => { this.textInput = input; }} />
```

### Refs and Functional Components

当自定义组件是通过"函数"形式定义，而不是通过"类"形式定义的时候，因为不存在类实例，所以指定 `ref` 是无效的。

但在函数式自定义组件内部还是可以正常使用 `ref` 的。

```js
function MyFunctionalComponent(props) {
  let textInput = null;
  function handleClick() { textInput.focus(); }
  return (
    <div>
      <input type="text" ref={(input) => { textInput = input; }} />                // 有效
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return <MyFunctionalComponent ref={(input) => { this.textInput = input; }} />;  // 无效
  }
}
```

### Don't Overuse Refs

不要滥用 `ref` 特性，如果只是想控制子组件的一些状态，基本可以通过将状态提升为父组件的一个属性来解决。


## Forwarding Refs

### Forwarding refs to DOM components

Ref forwarding is an opt-in feature that lets some components take a ref they receive, and pass it further down (in other words, “forward” it) to a child.

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

Here is a step-by-step explanation of what happens in the above example:

1. We create a React ref by calling `React.createRef` and assign it to a `ref` variable.
2. We pass our `ref` down to `<FancyButton ref={ref}>` by specifying it as a JSX attribute.
3. React passes the `ref` to the `(props, ref) => ...` function inside `forwardRef` as a second argument.
4. We forward this `ref` argument down to `<button ref={ref}>` by specifying it as a JSX attribute.
5. When the ref is attached, `ref.current` will point to the `<button>` DOM node.

### Forwarding refs in higher-order components

```jsx
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }
    render() {
      const {myForwardedRef, ...rest} = this.props;
      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={myForwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to LogProps as a regular prop, e.g. "myForwardedRef"
  // And it can then be attached to the Component.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} myForwardedRef={ref} />;
  });
}
```

### `useImperativeHandle`

```jsx
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`.

```jsx
import React, { createRef, useRef, forwardRef, useImperativeHandle } from 'react';

function FancyInput1(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />
}
FancyInput1 = forwardRef(FancyInput1);

const FancyInput2 = forwardRef(function FancInput222(props, ref) {
  return <input ref={ref} />;
})

function App() {
  const ref1 = createRef(); // ref1 打印看到的是 {current: {focus: f}}
  const ref2 = createRef(); // ref2 打印看到的是 {current: input}
  return (
    <div className="App">
      <FancyInput1 ref={ref1} /> <span onClick={() => { console.log(ref1); ref1.current.focus() }}>FOCUS</span>
      <FancyInput2 ref={ref2} /> <span onClick={() => { console.log(ref2); ref2.current.focus() }}>FOCUS</span>
    </div>
  );
}
```

In this example, a parent component that renders `<FancyInput ref={inputRef} />` would be able to call `inputRef.current.focus()`.



## `React.createRef` vs `React.useRef`

* `createRef`
  * 用在类组件中
  * 创建的是可变更对象 `<input ref={input => { inputRef = input }}>`
* `useRef`
  * 用在函数组件中
  * 创建的是不可变更对象 `<input ref={input => { inputRef.current = input }}>`

Both React APIs are used to create a mutable object. The mutable object’s properties can be changed at will without affecting the Component’s state.

`React.createRef` are used in class components to create refs.

```jsx
class App extends React.Component {
  componentDidMount() {
    this.divRef = React.createRef()
  }
  render() {
    return <div id="divR" ref={this.divRef}>App, here</div>;
  }
}

// divRef.current instanceof HTMLDivElement  --> true
```

In function components, we use `React.useRef`

```jsx
function App {
  const divRef = React.useRef();
  return <div id="divR" ref={divRef}>App, here</div>;
}
```

createRef and useRef can be used to store any value, not only DOM instances via `ref`.

```jsx
function App {
  const divRef = React.useRef()
  const valueRef = React.useRef(90)
  const [,setDummyState] = useState()
  return (
    <div>
      Value: {valueRef.current}
      <div id="divR" ref={divRef}>App, here</div>
      <button onClick={()=> (valueRef.current = 88, setDummyState({}))}>Incr</button>
    </div>
  )
}
```

We created a dummy state and a summy function to trigger re-render in the component. Now, clicking on the Incr will re-render the component and we will see the updated value in valueRef reflect in the DOM.

### 错误用法

https://blog.bitsrc.io/react-useref-and-react-createref-the-difference-afedb9877d0f

```jsx
// 错误用法
function App {
  const valueRef = React.createRef()  // 在函数组件中误用 React.createRef() 不会报错，但设置的值会丢失
  const [,setDummyState] = useState()
  return (
    <div>
      Value: {valueRef.current}
      <button onClick={()=> (valueRef.current = 88, setDummyState({}))}>Incr</button>
    </div>
  )
}
```
