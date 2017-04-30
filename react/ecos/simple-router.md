# React Router V4 源码解析

```
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

// https://github.com/ReactTraining/history 类似的简化实现，主要就是解决没有 pushstate 事件的问题
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

/**
 * Route renders some UI when the URL matches a location you specify in the Route’s path prop
 */
export class Route extends Component {
  props: {
    exact?: boolean,       // When true, will only match if the path matches the location.pathname exactly.
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
    const params = keys.reduce((acc, value, index) => { acc[value.name] = values[index]; return acc; }, {});

    if (exact && !isExact) { return null; }

    return {path, url, isExact, params};
  }

  render() {
    const { component, render } = this.props;
    const match = this.state.match;

    if (!match) { return null; }
    // If the current location matches the path prop, create a new element passing in match as the prop.
    if (component) { return React.createElement(component, {match}); }
    if (render) { return render({match}); }
    return null;
  }
}

export class Link extends Component {
  props: {
    to: string,
    replace?: boolean,  // When true, clicking the link will replace the current entry in the history stack instead of adding a new one.
    children: Element,
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
  constructor(props) {
    super(props);
    this.history = new BrowserHistory;
    this.state = {pathname: window.location.pathname};
    this.handleHistoryChange = this.handleHistoryChange.bind(this);
  }

  static childContextTypes = {
    history: PropTypes.object,
    pathname: PropTypes.string,
  }

  getChildContext() { return {history: this.history, pathname: this.state.pathname}; }

  componentWillMount() { this.history.listen(this.handleHistoryChange); }
  componentWillUnmount() { this.history.unlisten(); }
  handleHistoryChange() { this.setState({pathname: window.location.pathname}); }

  render() {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}
```
