# Context

https://facebook.github.io/react/docs/context.html  
http://javascriptplayground.com/blog/2017/02/context-in-reactjs-applications/

In some cases, you want to pass data through the component tree without having to pass the props down manually at every level. You can do this directly in React with the powerful "context" API.

### Why Not To Use Context

自己编写应用时是完全可以避免使用 context 的，但像 React Router V4 这些库，为了简化 API 和增加适用范围，才会采用。

The vast majority of applications do not need to use context.

It is an experimental API and it is likely to break in future releases of React.

It is far more likely that Redux is the right solution to your problem than that context is the right solution.

### What is Context and Dow does It Work?

In React the primary mechanism for communication between your components is through `props`. Parent components can pass properties down to their children.

If a child component wants to communicate back to its parent, it can do so through props, most commonly by its parent providing a callback property that the child can call when some event happens.

The key thing about this communication is that it’s explicit. This leads to clearer code that’s much easier to maintain and debug when something goes wrong. You simply have to follow the path of props to find the problem.

One issue you might find in big apps is that you might need to pass props from a top level ParentComponent to a deeply nested ChildComponent. The components in between will probably have no use these props and should probably not even know about them. When this situation arises, you can consider using React’s context feature.

Context acts like a portal in your application in which components can make data available to other components further down the tree without being passed through explictly as props.

### How To Use Context

First, on the parent component, we define two things:
  * A function, `getChildContext`, which defines what context is exposed to its descendants.
  * A static property, `childContextTypes`, which defines the types of the objects that `getChildContext` returns.

Then, descendant components which want to access the context define a static property `contextTypes`.

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ParentComponent extends Component {
  static childContextTypes = {foo: PropTypes.string}
  getChildContext() { return {foo: 'bar'}; }
  render() { return <ChildComponent />; }
}

// class component
class ChildComponent extends Component {
  static contextTypes = {foo: PropTypes.string};
  render() { return <p>The value of foo is: { this.context.foo }</p>; }
}

// functional component
const ChildComponent = (props, context) => {
  return <p>The value of foo is: { context.foo }</p>;
};
ChildComponent.contextTypes = {foo: PropTypes.string};
```

### Referencing Context in Lifecycle Methods

If `contextTypes` is defined within a component, the following lifecycle methods will receive an additional parameter, the `context` object:

```js
constructor(props, context)
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
componentDidUpdate(prevProps, prevState, prevContext)
```


### Updating Context

Don't do it.
