# Code Splitting

解决页面首次加载时的性能问题


## 示例

_App.js_

```jsx
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React, {Suspense, lazy} from 'react'

const Home = lazy(() => import('./routes/Home'))
const About = lazy(() => import(/* webpackChunkName: "about" */ './routes/About'))

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
)

export default App
```

_About.js_

```jsx
import React from 'react'

export default () => <div>About page</div>
```

## 









## 代码分割方式比较

### `import()`

ES2020 https://github.com/tc39/proposal-dynamic-import

When Webpack comes across this syntax, it automatically starts code-splitting your app.

```js
// 修改前
import { add } from './math';
console.log(add(16, 26));

// 修改后
import('./math').then(({ add }) => {
  console.log(add(16, 26));
});
```

### React.lazy

16.6 直接给内置了，不过还不支持 SSR

The `React.lazy` function lets you render a dynamic import as a regular component.

`React.lazy` currently only supports default exports.

```jsx
// 修改前
import OtherComponent from './OtherComponent';

// 修改后
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return <OtherComponent />;
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
```

### @loadable/component

早先流行的是 [react-loadable](https://www.npmjs.com/package/react-loadable)，但目前已经不维护+不推荐了。

`React.lazy` and `Suspense` are not yet available for server-side rendering. If you want to do code-splitting in a server rendered app, we recommend [Loadable Components](https://github.com/gregberge/loadable-components).

```jsx
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  )
}
```












