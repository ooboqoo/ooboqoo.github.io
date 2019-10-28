# Redux Ecosystem


## Redux Thunk

https://www.npmjs.com/package/redux-thunk

Thunk 中间件支持 ActionCreator *返回一个函数*，比起只能返回一个 Action 对象会灵活许多，同时也就支持了 *异步 dispatch*。

对比 Vuex，其实这里的 dispatch 相当于 Mutation，而 Thunk 封装过的返回函数则对应 Vuex 中的 Action。

Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.

```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
```

### 向 ActionCreator 注入自定义参数

Since 2.1.0, Redux Thunk supports injecting a custom argument using the withExtraArgument function:

```js
const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
)

// action creator
function fetchUser(id) {
  return (dispatch, getState, api) => {
    // you can use api here
  }
}
```

To pass multiple things, just wrap them in a single object and use destructuring:

```js
const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument({ api, whatever })))

function fetchUser(id) {
  return (dispatch, getState, { api, whatever }) => { /* ... */ }
}
```


## React Redux

https://react-redux.js.org/introduction/quick-start

### 常规用法

设置 Provider

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```

使用 `connect()` 将 states 和 actins 关联到组件

```jsx
import { connect } from 'react-redux'
import { increment, decrement, reset } from './actionCreators'

function Counter (props) {
  const { counter, increment, decrement, reset } = props
  // ...
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter
  }
}

// 这里的 ActionCreator 到 props 里会自动绑好 dispatch
const mapDispatchToProps = { increment, decrement, reset }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```


### Hooks 用法





