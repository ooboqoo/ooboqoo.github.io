# Vue Router

https://router.vuejs.org/zh-cn/


Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，包含的功能有：

* 嵌套的路由/视图表
* 模块化的、基于组件的路由配置
* 路由参数、查询、通配符
* 基于 Vue.js 过渡系统的视图过渡效果
* 细粒度的导航控制
* 带有自动激活的 CSS class 的链接
* HTML5 历史模式或 hash 模式，在 IE9 中自动降级
* 自定义的滚动条行为


## 起步

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航，默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口，路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

```js
// 1. 定义 (路由) 组件。
const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}
// 2. 定义路由
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({routes})
// 4. 创建和挂载根实例。
const app = new Vue({router}).$mount('#app')
```

通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由：

```js
export default {
  computed: {
    username () {
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
```


## 动态路由匹配

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    {path: '/user/:id', component: User}  // 动态路径参数 以冒号开头
  ]
})
```

你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。例如：

| 模式                            | 匹配路径               | $route.params
|---------------------------------|------------------------|--------------------------------------
| `/user/:username`               | `/user/evan`           | `{username: 'evan'}`
| `/user/:username/post/:post_id` |  `/user/evan/post/123` | `{username: 'evan', post_id: 123}`

除了 `$route.params` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query` (如果 URL 中有查询参数)、`$route.hash` 等等。你可以查看 API 文档的详细说明。

### 响应路由参数的变化

当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，原来的组件实例会被复用。复用组件时，想对路由参数的变化作出响应的话，你可以简单地 `watch` (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` 守卫：

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

### 高级匹配模式

vue-router 使用 [path-to-regexp](https://github.com/pillarjs/path-to-regexp) 作为路径匹配引擎，所以支持很多高级的匹配模式，例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。

### 匹配优先级

有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。


## 嵌套路由

要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，UserHome 会被渲染在 User 的 <router-view> 中
        {path: '', component: UserHome},
        // 当 /user/:id/profile 匹配成功，UserProfile 会被渲染在 User 的 <router-view> 中
        {path: 'profile', component: UserProfile},
        // 当 /user/:id/posts 匹配成功，UserPosts 会被渲染在 User 的 <router-view> 中
        {path: 'posts', component: UserPosts}
      ]
    }
  ]
})
```


## 编程式的导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

```js
// 字符串
router.push('home')
// 对象
router.push({path: 'home'})
// 命名的路由
router.push({name: 'user', params: {userId: 123}})
// 带查询参数，变成 /register?plan=private
router.push({path: 'register', query: {plan: 'private'}})
```

注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。同样的规则也适用于 `router-link` 组件的 `to` 属性。

```js
const userId = 123
router.push({name: 'user', params: {userId}})  // -> /user/123
router.push({path: `/user/${userId}`})         // -> /user/123
// 这里的 params 不生效，即，等同于没写，在 `$route.params` 中也看不到任何信息
router.push({path: '/user', params: {userId}}) // -> /user
```

注意：如果目的地和当前路由相同，只有 **参数** 发生了改变，你需要使用 `beforeRouteUpdate` 来响应这个变化。


## 命名路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。

```js
const router = new VueRouter({
  routes: [{name: 'user', path: '/user/:userId', component: User}]
})
router.push({name: 'user', params: {userId: 123}})
```


## 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置(带`s`)：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```


## 重定向和别名

### 重定向

重定向也是通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`：

```js
const router = new VueRouter({
  routes: [
    {path: '/a', redirect: '/b'},
    // 重定向的目标也可以是一个命名的路由
    {path: '/a', redirect: {name: 'foo'}},
    // 甚至是一个方法，动态返回重定向目标
    {path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

注意：导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。在下面这个例子中，为 `/a` 路由添加一个 `beforeEach` 或 `beforeLeave` 守卫并不会有任何效果。

### 别名

`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。

上面对应的路由配置为：

```js
const router = new VueRouter({
  routes: [
    {path: '/a', component: A, alias: '/b'}
  ]
})
```

“别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。


## 路由组件传参

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，使用 `props` 可以将组件和路由解耦。这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    {path: '/user/:id', component: User, props: true},
    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: {default: User, sidebar: Sidebar},
      props: {default: true, sidebar: false}
    }
  ]
})
```

### 不同使用模式

* 布尔模式 - 如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性。
* 对象模式 - 如果 `props` 是一个对象，它会被按原样设置为组件属性。当 `props` 是静态的时候有用。
* 函数模式 - 你可以创建一个函数返回 `props`。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

```js
const router = new VueRouter({
  routes: [
    {path: '/user/:id', component: User, props: true},
    {path: '/promotion/from-newsletter', component: Promotion, props: {newsletterPopup: false}},
    {path: '/search', component: SearchUser, props: (route) => ({query: route.query.q})}
  ]
})
```


## HTML5 History 模式

vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

但这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [{path: '*', component: NotFoundComponent}]
})
```


## 路由守卫

正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

记住 **参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过观察 `$route` 对象来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

### 全局守卫

#### 全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```js
const router = new VueRouter({ ... })

router.beforeEach((to: Route, from: Route, next: Function) => {
  // ...
})

```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于等待中。

一定要调用 `next` 方法来 resolve 这个钩子。执行效果依赖 `next` 方法的调用参数。
  * `next()`: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  * `next(false)`: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  * `next('/')` 或者 `next({path: '/'})`: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 `router-link` 的 `to` prop 或 `router.push` 中的选项。
  * `next(error)`: 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 `router.onError()` 注册过的回调。


#### 全局解析守卫

在 2.5.0+ 你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

#### 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：

```js
router.afterEach((to, from) => {
  // ...
})
```

### 单路由独享的守卫

你可以在路由配置上直接定义 `beforeEnter` 守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

这些守卫与全局前置守卫的方法参数是一样的。

### 组件内的守卫

最后，你可以在路由组件内直接定义以下路由导航守卫： `beforeRouteEnter` `beforeRouteUpdate` `beforeRouteLeave`


### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。


## 数据获取

有时候，进入某个路由后，需要从服务器获取数据。我们可以通过两种方式来实现：

* 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。
* 导航完成之前获取：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种。

### 导航完成后获取数据

当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 `created` 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。

### 在导航完成前获取数据

通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 `beforeRouteEnter` 守卫中获取数据，当数据获取成功后只调用 `next` 方法。

```js
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {  // 要是忘了调用 next 方法是不会跳转的
    getPost(to.params.id, (err, post) => { next(vm => vm.setData(err, post)) })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => { this.setData(err, post); next() })
  },
  methods: {
    setData (err, post) {
      if (err) { this.error = err.toString() } else { this.post = post }
    }
  }
}
```

在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。


## 滚动行为
