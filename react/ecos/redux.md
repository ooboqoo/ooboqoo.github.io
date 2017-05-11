# Redux

## 资源

简明教程
https://github.com/kenberkeley/redux-simple-tutorial

使用进阶 + 源码解析
https://github.com/kenberkeley/redux-simple-tutorial/blob/master/redux-advanced-tutorial.md

## 安装配置

```
$ npm install --save redux               # 
$ npm install --save react-redux         # React 绑定库
$ npm install --save-dev redux-devtools  # 开发者工具

```

要点：

* 应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。
* 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。
* 为了描述 action 如何改变 state 树，你需要编写 reducers。


## API

Redux 有五个 API，分别是：

* `createStore(reducer, [initialState])`
* `combineReducers(reducers)`
* `applyMiddleware(...middlewares)`
* `bindActionCreators(actionCreators, dispatch)` - 这个 API 有点鸡肋，实现了自动 `dispatch(ActionCreator(XXX))`
* `compose(...functions)`

`createStore` 生成的 `store` 有四个 API，分别是：

* `getState()`
* `dispatch(action)`
* `subscribe(listener)`
* `replaceReducer(nextReducer)`

### Reducer 写法

假设应用初始状态树为：

```
state
  ├── counter: 0
  ├── todo
        ├── optTime: []
        ├── todoList: [] # 这其实就是原来的 todos！
```

那么对应的 reducer 就是：

```
目录结构如下
reducers/
   ├── index.js <-------------- combineReducers (生成 rootReducer)
   ├── counterReducer.js
   ├── todoReducers/
           ├── index.js <------ combineReducers
           ├── optTimeReducer.js
           ├── todoListReducer.js
```

```js
/* reducers/index.js */
import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import todoReducers from './todoReducers/'

const rootReducer = combineReducers({
  counter: counterReducer,
  todo: todoReducers
})

export default rootReducer

=================================================

/* reducers/todoReducers/index.js */
import { combineReducers } from 'redux'
import optTimeReducer from './optTimeReducer'
import todoListReducer from './todoListReducer'

const todoReducers = combineReducers({
  optTime: optTimeReducer,
  todoList: todoListReducer
})

export default todoReducers

-------------------------------------------------

/* reducers/todosReducers/optTimeReducer.js */
export default function optTimeReducer(optTime = [], action) {
  // 咦？这里怎么没有 switch-case 分支？谁说 reducer 就一定包含 switch-case 分支的？
  return action.type.includes('TODO') ? [ ...optTime, new Date() ] : optTime
}

-------------------------------------------------

/* reducers/todosReducers/todoListReducer.js */
export default function todoListReducer(todoList = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [ ...todoList, action.payload ]
    default:
      return todoList
  }
}
```

无论您的应用状态树有多么的复杂，都可以通过逐层下分管理对应部分的 `state`：

```
                                 counterReducer(counter, action) -------------------- counter
                              ↗                                                              ↘
rootReducer(state, action) —→∑     ↗ optTimeReducer(optTime, action) ------ optTime ↘         nextState
                              ↘—→∑                                                    todo  ↗
                                   ↘ todoListReducer(todoList,action) ----- todoList ↗

注：左侧表示 dispatch 分发流，∑ 表示 combineReducers；右侧表示各实体 reducer 的返回值，最后汇总整合成 nextState
```

看了上图，您应该能直观感受到为何取名为 `reducer` 了吧？把 `state` 分而治之，极大减轻开发与维护的难度

### 中间件写法

```js
/* 装逼写法 */
const printStateMiddleware = ({ getState }) => next => action => {
  console.log('state before dispatch', getState())
  
  let returnValue = next(action)

  console.log('state after dispatch', getState())

  return returnValue
}

-------------------------------------------------

/* 降低逼格写法 */
function printStateMiddleware(middlewareAPI) { // 记为【锚点-1】，中间件内可用的 API
  return function (dispatch) {                 // 记为【锚点-2】，传入上级中间件处理逻辑（若无则为原 store.dispatch）

    // 下面记为【锚点-3】，整个函数将会被传到下级中间件（如果有的话）作为它的 dispatch 参数
    return function (action) { // <---------------------------------------------- 这货就叫做【中间件处理逻辑哥】吧
      console.log('state before dispatch', middlewareAPI.getState())
  
      var returnValue = dispatch(action) // 还记得吗，dispatch 的返回值其实还是 action
  
      console.log('state after dispatch', middlewareAPI.getState())

      return returnValue // 继续传给下一个中间件作为参数 action
    }
  }
}
```

### 综合应用

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/redux@3.6.0/dist/redux.min.js"></script>
</head>
<body>
<script>
/** Action Creators */
function inc() {return { type: 'INCREMENT' }; }
function dec() {return { type: 'DECREMENT' }; }

function reducer(state, action) {
  state = state || { counter: 0 };

  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + 1 };
    case 'DECREMENT':
      return { counter: state.counter - 1 };
    default:
      return state;
  }
}

function printStateMiddleware(middlewareAPI) {
  return function (dispatch) {
    return function (action) {
      console.log('dispatch 前：', middlewareAPI.getState());
      var returnValue = dispatch(action);
      console.log('dispatch 后：', middlewareAPI.getState(), '\n');
      return returnValue;
    };
  };
}

var store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(printStateMiddleware)
)

store.dispatch(inc());
store.dispatch(inc());
store.dispatch(dec());
</script>
</body>
</html>
```
