# 核心概念


## JSX

JSX，是一个 JavaScript 的语法扩展。它既不是字符串也不是 HTML。JSX 可以生成 React 元素。

```jsx
const element = <h1>Hello, world</h1>
```


## Rendering Elements

React 元素是不可变对象。一旦被创建就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

*更新 UI 唯一的方式是创建一个全新的元素*，并将其传入 `ReactDOM.render()`。

React DOM 会将元素和它的子元素与它们之前的状态进行比较，并 *只会进行必要的更新* 来使 DOM 达到预期的状态。

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(element, document.getElementById('root'))
}

setInterval(tick, 1000)
```


## Components and Props

`props` 的属性都是只读的，修改会报错：TypeError: Cannot assign to read only property 'day' of object '#\<Object\>'


## State and Lifecycle

state 与 props 类似，但 state 是组件私有的，完全受组件自己控制。

* 不要直接修改 `state`: 构造函数是唯一可以给 `this.state` 直接赋值的地方，在其他地方直接赋值不会触发重新渲染(不过也不会报错)。
* State 的更新可能是异步的: 出于性能考虑，React 可能会把多个 `setState` 调用合并成一次调用。如果你需要依赖 `props` 和 `state` 的值来更新下一个状态，应该给 `setState` 传递一个回调函数 `(state, props) => newState`
* State 的更新会被合并: 调用 `setState` 时无需传递完整的 State，React 会将传递的对象 *浅合并* 到当前的 `state`

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {date: new Date(), flag: ''}
  }

  componentDidMount () {
    // 你可以随意添加额外字段，但这些字段与 state 中的字段不同，它们不参与数据流
    this.timerId1 = setInterval(() => this.setState({date: new Date()}), 5000)
    this.timerId2 = setInterval(() => this.state.flag += '0', 1000)  // 实际每 5s 才能看到效果
    // 正确写法 setInterval(() => this.setState(state => ({flag: state.flag + '0'})), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timerId1)
    clearInterval(this.timerId2)
  }

  render () {
    return <div>This is {this.state.date.toLocaleTimeString()}.</div>
  }
}
```


## Handling Events

React 与 HTML 的事件处理差异
* React 事件的命名采用小驼峰，而不是纯小写
* 传入的是 函数 而不是表示可执行代码的 字符串
* React 中无法通过返回 false 来阻止默认行为，必须显式调用 `e.preventDefault()`

```html
<button onclick="activateLasers()">Activate Lasers</button>
```

```jsx
<button onClick={activateLasers}>Activate Lasers</button>
```

### 回调函数中的 this

`this` 丢失问题:

```jsx
class LoggingButton extends React.Component {
  handleClick () {
    console.log('this is:', this)
  }
  render () {
    return <button onClick={this.handleClick}>这种用法 this 会丢失</button>
  }
}
```

*使用实验性的 public class fields 语法* 确保 this 已被绑定，create-react-app 默认启用此语法。

```jsx
class LoggingButton extends React.Component {
  handleClick = () => console.log('this is:', this)
}
```

你还可以 *在回调中使用箭头函数*。此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。大多数情况下没什么问题，*但如果该回调函数作为 prop 传入子组件时，这些子组件可能会进行额外的重新渲染*。


## Conditional Rendering

* 声明一个变量并使用 `if` 语句进行条件渲染是不错的方式
* 在 JSX 中内联条件渲染则显得更为简洁，如 `&&` `? :`
* 如果条件变得过于复杂，那你应该考虑提取组件
* 如果组件不需要渲染内容，可以返回 `null`，生命周期的逻辑依然有效，不会受到影响


## Lists and Keys

渲染多个组件，你可以通过 `{}` 在 JSX 内构建一个元素集合。

```jsx
const listItems = [1, 2, 3, 4, 5].map(number => <li key={number}>{number}</li>)
ReactDOM.render(<ul>{listItems}</ul>, document.getElementById('root'))
```


## Forms

### 受控组件

在 HTML 中，表单元素(如input textarea select)之类的表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态(mutable state)通常保存在组件的 `state` 属性中，并且只能通过使用 `setState()` 来更新。

我们可以把两者结合起来，使 React 的 `state` 成为唯一数据源。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做 **受控组件**。

对于受控组件来说，每个 state 突变都有一个相关的处理函数。这使得修改或验证用户输入变得简单。

```jsx
class NameForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    // do the submit things
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字：
          <input value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}
```

### 非受控组件

`<input type="file">` 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JS 的 File API 进行控制。因为它的 value 只读，所以它是 React 中的一个 **非受控组件**。

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以使用 `ref` 来从 DOM 节点中获取表单数据。

```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()
  }
  handleSubmit(event) {
    event.preventDefault()
    alert(`Selected file - ${this.fileInput.current.files[0].name}`)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Upload file: <input type="file" ref={this.fileInput} /></label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
```


## Lifting State Up

通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    this.state = { temperature: '', scale: 'c' }
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature })
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature })
  }

  render() {
    const scale = this.state.scale
    const temperature = this.state.temperature
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature

    return (
      <div>
        <TemperatureInput scale="c" value={celsius} onChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" value={fahrenheit} onChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    )
  }
}
```


## Composition vs Inheritance

React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。

在 Facebook，我们在成百上千个组件中使用 React。我们并没有发现需要使用继承来构建组件层次的情况。

*组件可接受任意 props，包括基本数据类型，React 元素以及函数*。因此你可以利用 `props` 清晰而安全地定制组件的外观和行为。

### 利用 `children` 实现 Vue.js 中的插槽

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  )
}
```


## Thinking In React

我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。

React 最棒的部分之一是引导我们思考如何构建一个应用。

* 第一步：将设计好的 UI 划分为组件层级
* 第二步：用 React 创建一个静态版本
* 第三步：确定 UI state 的最小（且完整）表示
* 第四步：确定 state 放置的位置
* 第五步：添加反向数据流
