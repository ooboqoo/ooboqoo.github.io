# Next.js


## Getting Started

### Setup

```bash
$ mkdir hello-next
$ cd hello-next
$ npm init -y
$ npm install --save react react-dom next
$ mkdir pages
```

_package.json_

```js
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

```bash
$ npm run dev
```

### Creating Our First Page

_pages/index.js_

```jsx
const Index = () => (
  <div>
    <p>Hello Next.js</p>
  </div>
)
export default Index
```


## Navigate Between Pages

_pages/about.js_

```jsx
export default function About () {
  return (
    <div>
      <p>This is the about page</p>
    </div>
  )
}
```

_pages/index.js_ V2

```jsx
import Link from 'next/link'

const Index = () => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
)

export default Index
```

如果直接使用 `<a href="/about"></a>` 的话，会出现页面跳转，即刷新整个页面。而使用 Link API 则是 SPA 利用 history API 实现的跳转，不会完整刷新整个页面。Link 是 HOC，它接受一个子元素，并在子元素上添加 `click` 事件监听。


## Using Shared Components

### Header

_components/Header.js_

```js
import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
)

export default Header
```

_pages/index.js_ V3

```js
import Header from '../components/Header'

const Index = () => (
  <div>
    <Header />
    <p>Hello Next.js</p>
  </div>
)

export default Index
```

这里的 components 目录并非强制的，你可以随意更换目录名或位置，只要在引入时路径正确即可。Next.js 中只有 pages 目录是固定的，其他都没有特别要求。

### Layout

_components/MyLayout.js_

```js
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #ddd'
}

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout
```

_pages/index.js_ V4

```js
import Layout from '../components/MyLayout'

const Index = () => (
  <Layout>
    <p>Hello Next.js</p>
  </Layout>
)

export default Index
```

常见的创建布局的方式有两种：
* Page content as a prop
* Layout as a Higher Order Component

#### Page content as a prop

_components/MyLayout.js_ V2

```js
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #ddd'
}

const Layout = props => {
  return () => (
    <div style={layoutStyle}>
      <Header />
      {props.content}
    </div>
  )
}

export default Layout
```

_pages/index.js_ V5

```js
import Layout from '../components/MyLayout'

const indexPageContent = <p>Hello Next.js</p>

export default function Index () {
  return <Layout content={indexPageContent} />
}
```

#### Layout as a Higher Order Component


_components/MyLayout.js_ V3

```js
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #ddd'
}

const withLayout = Page => {
  return () => (
    <div style={layoutStyle}>
      <Header />
      <Page />
    </div>
  )
}

export default withLayout
```

_pages/index.js_ V6

```js
import withLayout from '../components/MyLayout'

const Page = () => <p>Hello Next.js</p>

export default withLayout(Page)
```


## Create Dynamic Pages

_pages/index.js_

```js
import Layout from '../components/MyLayout'
import Link from 'next/link'

const PostLink = props => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a> 
    </Link>
  </li>
)

export default function Blog () {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink title="Hello Next.js" />
        <PostLink title="Learn Next.js is awesome" />
        <PostLink title="Display apps with Zeit" />
      </ul>
    </Layout>
  )
}
```

_pages/post.js_

```js
import { withRouter } from 'next/router'
import Layout from '../components/MyLayout'

const Page = withRouter(props => (
  <Layout>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog content.</p>
  </Layout>
))

export default Page
```

_pages/post.js_ V2

```js
import { withRouter } from 'next/router'
import Layout from '../components/MyLayout.js'

const Content = withRouter(props => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
))

const Page = props => (
  <Layout>
    <Content />
  </Layout>
)

export default Page
```

使用 `withRouter` 的组件，会被注入一个 `router` 属性.


## Clean URLs with Route Masking

通过 query string 传递的信息有限，且 URL 看起来也没那么干净，于是 Next.js 引入了 route masking 的特性来解决这个问题。

```js
import Layout from '../components/MyLayout'
import Link from 'next/link'

const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a> 
    </Link>
  </li>
)

export default function Blog () {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink id="hello-nextjs" title="Hello Next.js" />
        <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
        <PostLink id="deploy-nextjs" title="Display apps with Zeit" />
      </ul>
    </Layout>
  )
}
```

此时我们在页面内的跳转以及使用浏览器的前进、后退按钮，一切都正常，但在页面 p/hello-nextjs 刷新时，出现了 404 页面，我们再来解决这个问题。

```bash
$ npm install --save express
```

_server.js_

```js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = {title: req.params.id}  // 注意这里的 title，因为无法拿到原 title 值所以用 id 替补了
      app.render(req, res, actualPage, queryParams)
    })
    server.get('*', (req, res) => handle(req, res))
    server.listen(3000, err => {
      if (err) { throw err }
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
```

_package.json_

```js
{
  "script": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```


## Fetching Data for Pages

```bash
$ npm install --save isomorphic-unfetch  # Switches between unfetch and node-fetch for client and server
```

_pages/index.js_ V7

```js
import Layout from '../components/MyLayout'
import Link from 'next/link'
import fetch from 'node-fetch'

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  console.log(`Show data fetched. Count: ${data.length}`)
  return {shows: data.map(entry => entry.show)}
}

export default Index
```

以上数据是在服务器侧获取的数据，下面获取 show 的具体数据则在浏览器侧执行。

_server.js_

```js
server.get('/p/:id', (req, res) => {
  const actualPage = '/post'
  const queryParams = {id: req.params.id}  // title -> id
  app.render(req, res, actualPage, queryParams)
})
```

_pages/post.js_

```js
import fetch from 'isomorphic-unfetch'
import Layout from '../components/MyLayout.js'

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <img src={props.show.image.medium} />
  </Layout>
)

Post.getInitialProps = async function (context) {                // context
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)  // 跳转时用 window.fetch 页面刷新时用 node-fetch
  const show = await res.json()
  console.log(`Fetched show: ${show.name}`)
  return {show}
}

export default Post
```


## Styling Components

给 React app 添加样式的方式可分为两大类:

* Traditional CSS-file-based styling (including SASS, PostCSS etc)
* CSS in JS styling

Consequently, there are a bunch of practical issues to consider with traditional CSS-file-based styling (especially with SSR), so we suggest avoiding this method when styling for Next.js.

Next.js 默认使用了 [styled-jsx](https://github.com/zeit/styled-jsx) 当然还有其他选项也值得看看。

问题：生成的样式是基于文件来隔离的，当一个文件中存在多个组件且组件中使用了相同的类名时，会互相干扰。

_pages/index.js_

```
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

function getPosts () {
  return [
    {id: 'hello-nextjs', title: 'Hello Next.js'},
    {id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
    {id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'}
  ]
}

export default function Blog () {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        {getPosts().map(post => (
          <li key={post.id}>
            <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        h1, a {
          font-family: 'Arial';
        }
        ul {
          padding: 0;
        }
        li {
          list-style: none;
          margin: 5px 0;
        }
        a {
          text-decoration: none;
          color: blue;
        }
        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  )
}
```


```js
    <style jsx global>{`
      .markdown {
        font-family: 'Arial';
      }

      .markdown a:hover {
        opacity: 0.6;
      }
    `}</style>
```



## Deploying a Next.js App

```bash
$ npm run build
$ npm run start
```

```js
"scripts": {
  "start": "next start -p $PORT"
}
```

```bash
$ PORT=8000 npm start
```


## Export into a Static HTML App

_next.config.js_

```js
module.exports = {
  exportPathMap: function () {
    return {
      '/': {page: '/'}
    }
  }
}
```

_package.json_

```js
{
  "scripts": {
    "build": "next build",
    "export": "next export"
  }
}
```

```bash
$ npm run build
$ npm run export
$ cd out
$ live-server
```

上面只导出了一个 index 页面，导航到子页面再刷新，还是会出现 404，现在我们导出更多页面

_next.config.js_

```js
module.exports = {
  exportPathMap: function () {
    return {
      '/': {page: '/'},
      '/about': {page: '/about'},
      '/p/hello-nextjs': {page: '/post', query: {title: 'Hello Next.js'}},
      '/p/learn-nextjs': {page: '/post', query: {title: 'Learn Next.js is awesome'}},
      '/p/deploy-nextjs': {page: '/post', query: {title: 'Deploy apps with Zeit'}},
      '/p/exporting-pages': {page: '/post', query: {title: 'Learn to Export HTML Pages'}}
    }
  }
}
```


## Lazy Loading Modules


## Lazy Loading Components


## Create AMP Pages




