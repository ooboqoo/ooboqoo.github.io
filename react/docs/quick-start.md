# Quick Start

https://facebook.github.io/react/docs/hello-world.html

## Hello World

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@latest/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@latest/dist/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('root')
      );
    </script>
  </body>
</html>
```

## JSX

```
const element = <h1>Hello, world!</h1>;
```

JSX is a syntax extension to JavaScript, it produces React "elements".

### Embedding Expressions in JSX

```
function formatName(user) { return user.firstName + ' ' + user.lastName; }
const user = {firstName: 'Harper', lastName: 'Perez'};

const element = (
  <h1>
    Hello, { formatName(user) }!
  </h1>
);

ReactDOM.render(element, document.getElementById('root'));
```

You can embed any JavaScript expression in JSX by wrapping it in curly braces.

We split JSX over multiple lines for readability, when doing this, we also recommend wrapping it in parentheses to avoid the pitfalls of automatic semicolon insertion.

### JSX is an Expression Too

After compilation, JSX expressions become regular JavaScript objects. This means that you can use JSX inside of `if` statements and `for` loops, assign it to variables, accept it as arguments, and return it from functions:

### Specifying Attributes with JSX

You may use quotes to specify string literals as attributes, you may also use curly braces to embed a JavaScript expression in an attribute.

```
const element = <div tabIndex="0"></div>;
const element = <img src={ user.avatarUrl }></img>;
```

> Since JSX is closer to JavaScript than HTML, React DOM uses camelCase property naming convention instead of HTML attribute names. For example, class becomes `className` in JSX, and tabindex becomes `tabIndex`.

### JSX Prevents Injection Attacks

It is safe to embed user input in JSX. By default, React DOM escapes any values embedded in JSX before rendering them.

如何嵌入 HTML 代码，估计又得折腾下。

### JSX Represents Objects

Babel compiles JSX down to `React.createElement()` calls.

React.createElement() performs a few checks to help you write bug-free code but essentially it creates an object. These objects are called "React elements". You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

// 等效于
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

// 运行时编译为对象(React 元素)
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```


## Rendering Elements

Elements are the smallest building blocks of React apps. An element describes what you want to see on the screen.

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.

Elements are what components are "made of".

### Rendering an Element into the DOM

To render a React element into a root DOM node, pass both to ReactDOM.render()

```
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

### Updating the Rendered Element

React elements are immutable. Once you create an element, you can't change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to ReactDOM.render().

In practice, most React apps only call ReactDOM.render() once. In the next sections we will learn how such code gets encapsulated into stateful components.

### React Only Updates What's Necessary

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.


## Components and Props

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

### Functional and Class Components

The simplest way to define a component is to write a JavaScript function:

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

This function is a valid React component because it accepts a single "props" object argument with data and returns a React element. We call such components "functional" because they are literally JavaScript functions.

You can also use an ES6 class to define a component:

```
class Welcome extends React.Component {
  render() { return <h1>Hello, {this.props.name}</h1>; }
}
```

Classes have some additional features that we will discuss in the next sections. 

### Rendering a Component

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));
```

1. We call `ReactDOM.render()` with the `<Welcome name="Sara" />` element.
2. React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3. Our `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
4. React DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`.

> Always start component names with a capital letter. For example, `<div />` represents a DOM tag, but `<Welcome />` represents a component and requires `Welcome` to be in scope.

### Props are Read-Only

Whether you declare a component as a function or a class, it must never modify its own props.

React is pretty flexible but it has a single strict rule:

**All React components must act like pure functions with respect to their props.**

Of course, application UIs are dynamic and change over time. In the next section, we will introduce a new concept of "state". State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.

### Default Prop Values

这部分从 typechecking-with-proptypes.html 找出来的，

You can define default values for your props by assigning to the special `defaultProps` property:

```
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

Greeting.defaultProps = {name: 'Stranger'}; // Specifies the default values for props:

ReactDOM.render(<Greeting />, document.getElementById('example'));
```

The `defaultProps` will be used to ensure that `this.props.name` will have a value if it was not specified by the parent component. The `propTypes` typechecking happens after `defaultProps` are resolved, so typechecking will also apply to the `defaultProps`.


## State and Lifecycle

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({date: new Date()});
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

Let's quickly recap what's going on and the order in which the methods are called:

1. When `<Clock />` is passed to `ReactDOM.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time.

2. React then calls the `Clock` component's `render()` method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the `Clock`'s render output.

3. When the `Clock` output is inserted in the DOM, React calls the `componentDidMount()` lifecycle hook.

4. Every second the browser calls the `tick()` method. Inside it, the `Clock` component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.

5. If the `Clock` component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle hook so the timer is stopped.

### Using State Correctly

There are three things you should know about setState().

#### Do Not Modify State Directly

For example, this will not re-render a component:

```
// Wrong
this.state.comment = 'Hello';
```

Instead, use setState():

```
// Correct
this.setState({comment: 'Hello'});
```

The only place where you can assign `this.state` is the constructor.

#### State Updates May Be Asynchronous

React may batch multiple `setState()` calls into a single update for performance.

Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state. For example, this code may fail to update the counter:

```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

To fix it, use a second form of `setState()` that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

```
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

#### State Updates are Merged

When you call setState(), React merges the object you provide into the current state. 合并而非替换

### The Data Flows Down

A component may choose to pass its state down as props to its child components.

Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.

## Handling Events

Handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:
  * React events are named using camelCase, rather than lowercase.
  * With JSX you pass a function as the event handler, rather than a string.

```
// HTML
<button onclick="activateLasers()">
  Activate Lasers
</button>

// JSX
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly. 

When using React you should generally not need to call `addEventListener` to add listeners to a DOM element after it is created. Instead, just provide a listener when the element is initially rendered.

When you define a component using an ES6 class, a common pattern is for an event handler to be a method on the class. You have to be careful about the meaning of `this` in JSX callbacks. In JavaScript, class methods are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called.

```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback 绑定绑定
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={ this.handleClick }>
        { this.state.isToggleOn ? 'ON' : 'OFF' }
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```


## Conditional Rendering

Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript operators like `if` or the conditional operator to create elements representing the current state, and let React update the UI to match them.

```
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

### Element Variables

You can use variables to store elements. This can help you conditionally render a part of the component while the rest of the output doesn't change.

```
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        { button /* 这里是重点 */ }
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

### Inline If with Logical && Operator

```
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      { unreadMessages.length > 0 &&
        <h2>
          You have { unreadMessages.length } unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={ messages } />,
  document.getElementById('root')
);
```

### Inline If-Else with Conditional Operator

```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      { isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      ) }
    </div>
  );
}
```

### Preventing Component from Rendering

```
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```

Returning `null` from a component's `render` method does not affect the firing of the component's lifecycle methods. For instance, `componentWillUpdate` and `componentDidUpdate` will still be called.


## Lists and Keys

### Rendering Multiple Components

```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{ number }</li>
);

ReactDOM.render(
  <ul>{ listItems }</ul>,
  document.getElementById('root')
);
```

### Basic List Component

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={ number.toString() }>  { /* 注意这里的 key */ }
      { number }
    </li>
  );
  return (
    <ul>{ listItems }</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={ numbers } />,
  document.getElementById('root')
);
```

### Keys

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

### Extracting Components with Keys

Keys only make sense in the context of the surrounding array.

For example, if you extract a `ListItem` component, you should keep the key on the `<ListItem />` elements in the array rather than on the root `<li>` element in the ListItem itself.

```
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={ value.toString() }>
      { value }
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={ number } />
  );
  return (
    <ul>
      { listItems }
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={ numbers } />,
  document.getElementById('root')
);
```

### Keys Must Only Be Unique Among Siblings

### Embedding map() in JSX

In the examples above we declared a separate `listItems` variable and included it in JSX.

JSX allows embedding any expressions in curly braces so we could inline the map() result:

```
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      { numbers.map((number) =>
        <ListItem key={ number.toString() }
                  value={ number } />
      ) }
    </ul>
  );
}
```


## Forms

### Controlled Components

In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with `setState()`.

We can combine the two by making the React state be the "single source of truth". Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a "controlled component".

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
  <textarea>
    Hello there, this is some text in a text area
  </textarea>
  <select>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option selected value="coconut">Coconut</option>
    <option value="mango">Mango</option>
  </select>
</form>
```

```
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      textValue: 'Please write an essay about your favorite DOM element.',
      selectValue: 'coconut'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name + 'Value';
    this.setState({[name]: event.target.value});  // 使用了 ES6 特性 computed property name
  }

  handleSubmit(event) {
    alert('An essay was submitted.');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label>
          Name:
          <input name="input" type="text" value={ this.state.inputValue } onChange={ this.handleChange } />
        </label>
        <label>
          Name:                                  { /* 表单双向绑定 */ }
          <textarea name="text" value={ this.state.textValue } onChange={ this.handleChange } />
        </label>
        <label>
          Pick your favorite La Croix flavor:
          <select name="select" value={ this.state.selectValue } onChange={ this.handleChange }>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```


## Lifting State Up

Lifting state involves writing more "boilerplate" code than two-way binding approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state "lives" in some component and that component alone can change it, the surface area for bugs is greatly reduced.

```
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) { return ''; }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) { return <p>The water would boil.</p>; }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in { scaleNames[scale] }:</legend>
        <input value={ temperature }
               onChange={ this.handleChange } />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: '', scale: 'c' };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={ celsius }
          onTemperatureChange={ this.handleCelsiusChange } /> { /* 通过传递控制方法实现子元素到父元素的信息传递 */ }
        <TemperatureInput
          scale="f"
          temperature={ fahrenheit }
          onTemperatureChange={ this.handleFahrenheitChange } />
        <BoilingVerdict
          celsius={ parseFloat(celsius) } />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
```


## Composition vs Inheritance

React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

### Containment

Some components don't know their children ahead of time. This is especially common for components like `Sidebar` or `Dialog` that represent generic "boxes".

We recommend that such components use the special `children` prop to pass children elements directly into their output:

```
function FancyBorder(props) {
  return (
    <div className={ 'FancyBorder FancyBorder-' + props.color }>
      { props.children }
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

While this is less common, sometimes you might need multiple "holes" in a component. In such cases you may come up with your own convention instead of using `children`:

```
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        { props.left }
      </div>
      <div className="SplitPane-right">
        { props.right }
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane left={ <Contacts /> } right={ <Chat /> } />
  );
}
```

### Specialization

Sometimes we think about components as being "special cases" of other components. For example, we might say that a `WelcomeDialog` is a special case of `Dialog`.

In React, this is also achieved by composition, where a more "specific" component renders a more "generic" one and configures it with props:

```
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        { props.title }
      </h1>
      <p className="Dialog-message">
        { props.message }
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```


## Thinking in React

* Start With A Mock
* Step 1: Break The UI Into A Component Hierarchy
* Step 2: Build A Static Version in React
* Step 3: Identify The Minimal (but complete) Representation Of UI State
* Step 4: Identify Where Your State Should Live
* Step 5: Add Inverse Data Flow
