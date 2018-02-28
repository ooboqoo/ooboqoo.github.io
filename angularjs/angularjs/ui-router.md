# UI-Router

https://github.com/angular-ui/ui-router  
https://ui-router.github.io/ng1/docs/0.4.2/#/api/ui.router

> 本笔记基于 0.4 版本，1.0 开始有较大变化，本笔记内容并不适用。

## 核心内容

| 名称           |  所属     | 作用
|----------------|-----------|----------------------------------
| ui-view        | directive | 提供不同路由模板插入的视图层
| ui-sref        | directive | 将当前 DOM 链接到特定状态
| ui-sref-active | directive | 给所在 DOM 添加激活状态样式
| $state         | service   | 状态服务，提供了状态判断、跳转等功能
| $stateParams   | service   | 路由参数服务
| $stateProvider     | provider | 状态配置
| $urlRouterProvider | provider | 提供当特定 URL 被激活时处理机制

```txt
$state
    .go(toState [, toParams] [, options])  // 支持相对路径，但不推荐使用
    .transitionTo()  // 同 go() 基本一样，go() 也是调用的它，官网推荐用 go()
    .reload()    // 重新加载视图
    .includes()  // 返回布尔值
    .is()        // 返回布尔值，匹配规则比 includes() 更严格
    .href()      // 返回当前状态激活时的 url 值
    .get([stateName])  // 获取状态对应的配置对象
    .current           // 属性，获取当前激活状态对应的配置对象

$stateProvider
    .state(stateName, stateConfig)
        stateConfig: {
           template: String | ($stateParams)=>String,  // or
           templateUrl: String | ($stateParams)=>URL,  // or
           templateProvider: ()=>String,  // 与上两个函数不同的是，可以给该函数注入其他 AngularJS 服务
           controller； String | Function,  // or
           controllerProvider,
           resolve: Object,  // 注
           url: String,  // 设置的是完整的 url hash 部分，可以设置参数，参数值会传递到 $stateParams 中
           params: Object,  // 设置 url 中参数以外的参数，如果参数没在这配置，即使传了也不会进 $stateParams
           views: {viewName: viewConfig, ...},   // 设置一个状态的多个视图
           abstract: Boolean,
           onEnter: Function,  // 进入状态时调用的函数，改函数可以获得 resolve 定义的所有依赖
           onExit: Function,   // 离开时调用的函数
           data,
           parent
        }
    .decorator(name [, decorator])

$urlRouterProvider
    .when(whenPath, toPath) // 重定向 url
    .otherwise(Path)        // 没有找到匹配的路径时，重定向到该 path 路径
    .rule(handleFn)  // 如果想要对路由地址进行处理可以使用这个方法，返回值必须是合法的路径字符串

事件
    |- 状态改变事件
    |    |- $stateChangeSuccess - 状态跳转成功时触发的事件
    |    |- $stateChangeStart   - 状态跳转开始时触发的事件
    |    |- $stateNotFound      - 没有找到对应状态时触发的事件
    |    \- $stateChangeError   - 状态跳转失败时触发的事件
    \- 视图加载事件
         |- $viewContentLoading - 视图开始加载时，DOM 被渲染前触发的事件
         \- $viewContentLoaded  - 视图加载完成，DOM 渲染完成后触发的事件

$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) { })；
$scope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) { });
$scope.$on('$viewContentLoading', function (event, viewConfig) { });
```

```js
angular.module('myApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateprovider.state('contacts', {
        url: '/contacts',
        templateProvider: function ($filter) {
            var currentDate = $filter('date')(new Date());
            return '当前时间是' + currentDate;
        },
        resolve: {
            contacts: function ($q, $timeout) {
                var deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve([{name: 'ivan'}, {name: 'gavin'}]);
                }, 1000);
            },
            id: function () { return '123456'; }
        },
        controller: function ($scope, contacts, id) {
            // ...
        }
    });
});
```

注：resolve
如果你要给状态controller注入一些该状态自己的函数或数据，可以通过resolve实现。
说明：
对象的每个属性都是要注入controller的依赖。
属性值可以是一个字符串，也可以是一个函数：
1）如果属性值是String，该字符串是一个该模块上已注册的服务名；
2）如果值是一个函数，则注入这个函数，函数的返回值就是依赖。如果函数返回一个promise，它会在控制器被实例化之前resolved，同时其返回值会注入到控制器中。


### uiSref

`ui-sref="stateName"`
`ui-sref="stateName({param1: value, param2: value})"`

`$state.go("stateName")`


## HelloWorld

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <title>UI Router</title>
  <script src="/lib/angular.js"></script>
  <script src="/lib/angular-ui-router.js"></script>
</head>
<body>
  <a ui-sref="hello" ui-sref-active="active">Hello</a>
  <a ui-sref="about({id: 2})" ui-sref-active="active">About</a>
  <ui-view></ui-view>
</body>
<script>
  var myApp = angular.module('myApp', ['ui.router']);
  myApp.config(function ($stateProvider, $urlRouterProvider) {
    var stateConfig = [
      {
        name: 'hello',
        url: '/hello',
        template: '<h3>Its the UI-Router hello world app!</h3>'
      },
      {
        name: 'about',
        url: '/about',
        params: {id: 0},
        template: '<h3>about page.</h3>',
        controller: function ($scope, $stateParams) { console.log($stateParams); }
      }
    ];

    stateConfig.forEach(function (state) {
      $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('/hello');
  });
</script>
</html>
```


## GUIDE

### States

UI-Router applications behave like a state machine.

Think about each feature of an application as a set of states. Only one state can be active at one time. The user can transition from one state to another, to activate a different feature of the application.

#### State Properties 

* `name` A name for the state, providing a way to refer to the state
* `views` How the UI will look and behave
* `url` What the browser’s URL will be
* `params` Parameter values that the state requires
* `resolve` Data the state requires (often fetched asynchronously from the backend using a parameter value)

#### Nested States

UI-Router states can be nested inside each other. A parent state can have multiple children, forming a tree of states.

The child state’s view usually renders inside a viewport that the parent state created. This is referred to as Nested Views.

##### State-based approach

UI-Router 应用的核心是状态树，状态树才是真实的、本质的程序结构，而 URL 和 视图树 只是状态的的一种表现而已。

UI-Router’s approach to applications as a tree of states encourages you to think about your application’s as a hierarchy of functionality. The tree defines the application’s functionality structure. The URL and views are artifacts of the active state. 

##### Optional Urls

Although states generally have URLs, they are optional. You might create some child states without URLs, if it doesn’t make sense to bookmark those child states. 

##### Optional Views

Although states generally have views, they are optional. You might create a parent state for the sole purpose of adding data or behaviors to a branch of your application, but provide no UI itself.

### Transitions

不同状态之间的切换称之为 Transition。

### Atomic 

状态间的切换具有原子性，要么整体切换成功，要么就什么都不做，不会出现部分切换的情况。

### Lifecycle 

Transitions have a lifecycle, starting at Transition creation and completing with either success or failure. That lifecycle is exposed to the application developer as a set of transition hooks. To learn more about transition hooks, read the Transition section of the Guide and the in depth API documentation for TransitionService.


### Views

A view provides the UI and UI behavior for a state. A state’s view is a component, which consists of both markup and logic. The view is plugged into the matching `<ui-view>`  or `<div ui-view></div>` viewport directive. 

#### Multiple named views

To use multiple views, we give each view a name. Instead of defining a single `component:` property on the state, we instead create a `views:` object on the state definition. 

```js
var mainState = {
  name: 'main',
  views: {
    header: 'headerComponent',
    nav: 'navComponent',
    content: 'mainComponent',
  }
}
```

```html
<ui-view name="header"></ui-view>
<ui-view name="nav"></ui-view>
<div ui-view="content"></div>
```


### Transitions


### Lazy Loading

文档不完整，思路是，按功能模块打成不同的包，然后再进行懒加载。

To use lazy loading, the application should first be split up into chunks, or modules. Each module will be loaded independently of the others.

The simplest way to split an application into modules is by application feature. If your application has a Messages feature, a Contacts feature, and a TODO feature, each of these features would be an module, ready to be lazy loaded.

Beside the feature modules, there is also the initial code used to bootstrap the app, which is not lazy loaded.

```txt
      +---------------------------------------------+
      | Initial code (Bootstrap and basic app code) |
      +---------------------------------------------+
+--------------- LAZY LOADED FEATURE MODULES ----------------+
  +-------------+        +-------------+        +----------+ 
  |  Contacts   |        |   MESSAGE   |        |   TODO   |
  +-------------+        +-------------+        +----------+
```


```js
var foldersState = {
  name: 'folders',
  url: '/folders',
  component: FoldersComponent,
  resolve: {
    allfolders: function(FolderService) {
      return FolderService.list();
    }
  },
}
```


### URL Routing

类目位置待定

#### URL Parameters

待补充



<style>
  td:first-child { color: red; }
  i { color: gray; }
</style>
