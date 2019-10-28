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


