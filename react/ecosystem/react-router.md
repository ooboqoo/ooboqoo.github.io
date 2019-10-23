# React Router

https://reacttraining.com/react-router/web/api/Hooks


## 概述




## API

### Hooks

```js
// 获取 history 实例，非 window.history
let history = useHistory()
// 获取当前 URL 对应的 location 对象
let location = useLocation()
// 获取当前 <Route> 的 match.params
let { slug } = useParams()
// useRouteMatch 其实是个工具方法，使用传入的 URL 模式 匹配 当前 URL 并返回匹配结果
let match = useRouteMatch("/blog/:slug")
```

### BrowserRouter & HashRouter

```jsx
import { BrowserRouter as Router } from 'react-router-dom'  // 二选一
import { HashRouter as Router } from 'react-router-dom'     // 

<Router>
  <App />
</Router>
```

### Link & NavLink

NavLink 是 Link 的增强版，会自动添加一些样式相关属性。

```jsx
<NavLink exact to="/profile">Profile</NavLink>
```

### Route & Switch

Route 是匹配就渲染，而如果外面再套一个 Switch，就只会渲染第一个匹配的 Route，余下的 Route 即便能匹配也不再显示。

```jsx
let routes = (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/:user">
      <User />
    </Route>
    <Route>
      <NoMatch />
    </Route>
  </Switch>
)
```

### Redirect

```jsx
<Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route>
```


## 源码解析

```jsx
/**
 * https://tylermcginnis.com/build-your-own-react-router-v4/ 基础上增加了仿制内容
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// https://github.com/pillarjs/path-to-regexp 简化版
function pathToRegexp(path: string, keys: Array<{name: string}>) {
  keys.length = 0;
  const regexp = /\/\:([A-z]+)/g;
  const str = path.replace(regexp, (match, p1) => {
    keys.push({name: p1});
    return '/([A-z]+)';
  });
  return new RegExp(str);
}

// https://github.com/ReactTraining/history 的类似实现，主要就是解决没有 pushstate 事件可监听的问题
// pushState replaceState 都不会触发事件，只有用 back forward go 导航才会触发 popstate 事件
class BrowserHistory {
  listen(cb) {
    this.listener = cb;
    window.addEventListener('popstate', cb);
  }

  unlisten() {
    window.removeEventListener('popstate', this.listener);
    this.listener = null;
  }

  pushState(path) {
    window.history.pushState({}, null, path);
    this.listener && this.listener();
  }

  replaceState(path) {
    window.history.replaceState({}, null, path);
    this.listener && this.listener();
  }
}

// Route renders some UI when the URL matches a location you specify in the Route’s path prop
export class Route extends Component {
  props: {
    exact?: boolean,       // When true, path has to matche the location.pathname exactly
    path?: string,         // 支持普通字符串 或 字符串表示的正则表达式
    component?: Function,  // component 与 render 二选一
    render?: Function,
  }

  static contextTypes = {
    pathname: PropTypes.string,
  };

  constructor(props, context) {
    super(props);
    this.state = {match: this.matchPath(context.pathname, this.props)};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { path, exact } = nextProps;
    this.setState({match: this.matchPath(nextContext.pathname, {path, exact})});
  }

  matchPath(pathname: string, options: {path: ?string, exact: ?boolean}) {
    const { exact = false, path } = options;

    //  if a Route isn’t given a path, it will automatically be rendered
    if (!path) { return { path: null, url: pathname, isExact: true } }

    let keys = [];
    const regexp = pathToRegexp(path, keys);
    const match = regexp.exec(pathname);

    if (!match) { return null; }

    const [url, ...values] = match;
    const isExact = pathname === url;
    const params = keys.reduce((acc, key, index) => { acc[key.name] = values[index]; return acc; }, {});

    if (exact && !isExact) { return null; }

    return {path, url, isExact, params};
  }

  render() {
    const { component, render } = this.props;
    const match = this.state.match;

    if (!match) { return null; }
    if (component) { return React.createElement(component, {match}); }
    if (render) { return render({match}); }
    return null;
  }
}

export class Link extends Component {
  props: {
    to: string,
    replace?: boolean,
    children: Node,
  }

  static contextTypes = {
    history: PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    this.history = context.history;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { replace, to } = this.props;
    event.preventDefault();
    replace ? this.history.replaceState(to) : this.history.pushState(to);
  }

  render() {
    const { to, children } = this.props;
    return <a href={to} onClick={this.handleClick}>{children}</a>;
  }
}

export class Router extends Component {
  static childContextTypes = {
    history: PropTypes.object,
    pathname: PropTypes.string,
  }
  getChildContext() { return {history: this.history, pathname: this.state.pathname}; }

  constructor(props) {
    super(props);
    this.history = new BrowserHistory;
    this.state = {pathname: window.location.pathname};
    this.handleHistoryChange = this.handleHistoryChange.bind(this);
  }

  componentWillMount() { this.history.listen(this.handleHistoryChange); }
  componentWillUnmount() { this.history.unlisten(); }

  handleHistoryChange() { this.setState({pathname: window.location.pathname}); }

  render() {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}
```
