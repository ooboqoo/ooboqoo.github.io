# AngularJS 权威教程笔记 - 3

## 11. 模块加载

### 11.1 配置

在模块的加载阶段，AngularJS 会在 Providers 注册和配置的过程中对模块进行配置。在整个 AngularJS 的工作流中，这个阶段是唯一能够在应用启动前进行修改的部分。

```js
angular.module('myApp', []).config(function($provide) {  });
```

`config()` 函数接受一个参数 configFunction，AngularJS 在模块加载时会执行这个函数。

当我们使用 `.factory()` `.directive()` 等方法时，其实都是在使用 `.config()`，他们都只是语法糖。

```js
// 语法糖形式
angular.module('myApp', [])
  .factory('myFactory', function () {
    var service = {};
    return service;
  })
  .directive('myDirective', function () {
    return {
      template: '<button>Click me</button>'
    }
  });
// 实际执行的代码
angular.module('myApp', []).config(function ($provide, $compileProvider) {
  $provide.factory('myFactory', function () {
    var service = {};
    return service;
  });
  $compileProvider.directive('myDirective', function () {
    return {
      template: '<button>Click me</button>'
    };
  });
});
```

需要特别注意，AngularJS会以这些函数书写和注册的顺序来执行它们。也就是说我们无法注入一个尚未注册的提供者。
唯一例外的是 `.constant()` 方法，这个方法总会在所有配置块之前被执行。

当对模块进行配置时，需要格外注意只有少数几种类型的对象可以被注入到 `.config()` 函数中：提供者和常量。如果我们将一个服务注入进去，会在真正对其进行配置之前就意外地把服务实例化了。
这种对配置服务进行严格限制的另外一个副作用就是，我们只能注入用 `.provider()` 语法构建的服务，其他的则不行。

### 11.2 运行块

运行块在注入器创建之后被执行，它是所有 AngularJS 应用中第一个被执行的方法。与其他地方的 `main` 方法最接近。

运行块通常用来注册全局的事件监听器。例如，我们会在 `.run()` 块中设置路由事件的监听器以及过滤未经授权的请求。

`run()` 函数接受个参数 initializeFn，AngularJS 在注入器创建后会执行这个函数。

```js
angular.module('myApp', []).run(function($rootScope, AuthService) {
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
        // 如果用户未登录
        if (!AuthService.userLoggedIn()) {
            if (next.templateUrl === "login.html") { /* 已经转向登录路由因此无需重定向 */ }
            else { $location.path('/login'); }
        }
    });
});
```


## 12. 多重视图和路由

> AngularJS 路由的事实组件是 ui-router，所以官方的路由部分先跳过。

当应用变得越来越复杂时，我们需要一个合理的方式来管理用户在使用过程中看到的界面。

除了用 `ng-include` 指令在视图中引用多个模板外，更好的做法是将视图分解成布局和模板视图，并且根据用户当前访问的 URL 来展示对应的视图。AngularJS 允许我们在 `$route` 服务的提供者 `$routeProvider` 中通过声明路由来实现这个功能。


## 13. 依赖注入

一个对象通常有三种方式可以获得对其依赖的控制权：

(1) 在内部创建依赖；
(2) 通过全局变量进行引用；
(3) 在需要的地方通过参数进行传递。

依赖注入是通过第三种方式实现的。其余两种方式会带来各种问题，例如污染全局作用域，使隔离变得异常困难等。
依赖注入是一种设计模式，它可以去除对依赖关系的硬编码，从而可以在运行时改变甚至移除依赖关系。

AngularJS 使用注入器服务 `$injetor` 来管理依赖关系的查询和实例化。事实上，`$injetor` 负责实例化 AngularJS 中所有的组件，包括应用的模块、指令和控制器等。

AngularJS 实例化一个模块的处理过程是下面这样的：

```html
<div ng-app="myApp">
  <div ng-controller="MyController">
    <button ng-click="sayHello()">Hello</button>
  </div>
</div>
```

```js
// 使用注入器加载应用
var injector = angular.injector(['ng', 'myApp']);
// 通过注入器加载 $controller 服务
var $controller = injector.get('$controller');
var scope = injector.get('$rootScope').$new();
// 加载控制器并传入一个作用域，同AngularJS在运行时做的一样
var MyController = $controller('MyController', {$scope: scope})
```

在任何一个 AngularJS 的应用中，都有 `$injector` 在进行工作，无论我们知道与否。当编写控制器时，如果没有使用 `[]` 标记或进行显式的声明，`$injector` 就会尝试通过参数名推断依赖关系。AngularJS 通过 `annotate` 函数，在实例化时从传入的函数中把参数列表提取出来。

### 13.1 三种注入声明方式

#### 推断式注入声明

如果没有明确的声明，AngularJS 会假定参数名称就是依赖的名称。因此，它会在内部调用函数对象的 `toString()` 方法，分析并提取出函数参数列表，然后通过 `$injector` 将这些参数注入进对象实例。

> 请注意，这个过程只适用于未经过压缩和混淆的代码，对于压缩后的代码，AngularJS 将无法根据参数名称推断出实际的依赖关系。

#### 显式注入声明

可以通过 `$inject` 属性来实现显式注入声明的功能。函数对象的 `$inject` 属性是一个数组，数组元素的类型是字符串，它们的值就是需要被注入的服务的名称。

对于这种声明方式来讲，参数顺序是非常重要的，因为 `$inject` 数组元素的顺序必须和注入参数的顺序一一对应。这种声明方式可以在压缩后的代码中运行，因为声明的相关信息已经和函数本身绑定在一起了。

```js
var aControllerFactory = function aController($scope, greeter) { ... };
aControllerFactory.$inject = ['$scope'];
angular.module('myApp', []).controller('MyController', aControllerFactory);
```

#### 行内注入声明

注入声明的最后一种方式，是可以随时使用的行内注入声明。这种方式其实是一个语法糖，它同前面提到的通过 `$inject` 属性进行注入声明的原理完全一的，但允许我们在函数定义时从行内将参数传入。此外，它可以避免在定义过程中使用临时变量。

在定义一个 AngularJS 的对象时，行内声明的方式允许我们直接传入一个参数数组而不是一个函数。数组的元素是字符串，它们代表的是可以被注入到对象中的依赖的名字，最后一个参数就是依赖注入的目标函数对象本身。

```js
angular.module('myApp').controller('MyController', ['$scope', 'greeter', function($scope, greeter) { ... }]);
```

### 13.2 `$injector` API

在实际工作中，我们很少直接同 `$injector` 打交道，但了解一下它的 API，可以帮助我们更好地理解它是如何运作的。

`annotate()` 方法的返回值是一个由服务名称组成的数组，这些服务会在实例化时被注入到目标函数中。

```js
injector.annotate(function($q, greeter) {});  // ['$q', 'greeter']
```

`get(name: String)` 方法返回一个服务的实例。

`has(name: String)` 方法返回一个布尔值，在 $injector 能够从自己的注册列表中找到对应的服务时返回 true，否则 false。

`instantiate(Type: Function, locals?: Object)` 方法创建某个类型的实例。它通过 `new` 调用构造函数，并传入所有参数。

`invoke(fn: Function, self?: Object, locals?: Object)` 方法会调用方法并从 `$injector` 中添加方法参数。


## 14. 服务

到目前为止，我们只关心视图是如何同 `$scope` 绑定在一起，以及控制器是如何管理数据的。出于内存占用和性能的考虑，控制器只会在需要时被实例化，并且不再需要就会被销毁。这意味着每次切换路由或重新加载视图时，当前的控制器会被 AngularJS 清除掉。

服务提供了一种能在应用的整个生命周期内保持数据的方法，它能够在控制器之间进行通信，并且能保证数据的一致性。

服务是一个单例对象，在每个应用中只会被实例化一次(被 `$injector` 实例化)，并且是延迟加载的(需要时才会被创建)。服务提供了把与特定功能相关联的方法集中在一起的接口。

以 AngularJS 的 `$http` 服务为例，它提供了对浏览器的 XMLHttpRequest 对象的底层访问功能，我们可以通过 `$http` 的 API 同 XMLHttpRequest 进行交互，而不需要因为调用这些底层代码而污染应用。


```js
angular.module('myApp', []).factory('UserService', function($http) {
    var current_user;
    return {
        getCurrentUser: function() { return current_user; },
        setCurrentUser: function(user) { current_user = user; }
    };
});
```

AngularJS 提供了一些内置服务，在任何地方使用它们的方式都是统一的。同时，为复杂应用创建我们自己的服务也是非常有用的。

在AngularJS中创建自己的服务是非常容易的：只需要注册这个服务即可。服务被注册后，AngularJS编译器就可以引用它，并且在运行时把它当作依赖加载进来。服务名称的注册表使得在测试中伪造和剔除相互隔离的应用依赖变得非常容易。

### 14.1 注册一个服务

在 AngularJS 应用中，`factory()` 方法是用来注册服务的最常规方式，同时还有其他一些 API 可以在特定情况下帮助我们减少代码量。共有5种方法用来创建服务：
  * factory(name: String, getFunc: Function) - getFunc 函数会在 AngularJS 创建服务实例时被调用。
  * service(name: String, constructor: Function) - constructor 是 getFunc 的一种特例，只能是构造函数
  * constant(name: String, value: Any) - 将一个已经存在的变量值注册为服务，并将其注入到应用的其他部分当中
  * value(name: String, value: Any) - 同上，常量能注入到配置函数中，而值不行
  * provider(name: String, provider: Function | Object) - 最基础的方法，其他的都是基于它的语法糖，provider 必须包含 `$get()` 方法

从源代码 injector.js 可以看到，`.service()` `.value()` 内部调用了 `.factory()`，而 `.factory()` 又调用的 `.provider()`

如果希望在 `.config()` 函数中可以对服务进行配置，必须用 `.provider()` 来定义服务。

`.value()` 方法和 `.constant()` 方法之间最主要的区别是，常量可以注入到配置函数中，而值不行。

```js
angular.module('myApp.services', [])
    // 参数形式
    .factory('githubService', function() { });
    .factory('githubService', ['$http', function($http) { }])

    // 常量的用法
    .constant('apiKey','123123123')
    .controller('MyController', function($scope, apiKey) { $scope.apiKey = apiKey; });
```

```js
// 常量能在配置函数中使用的原因是，直接将常量值放进了缓存对象中，不像 value()，没有通过 factory() 创建
function constant(name, value) {
    assertNotHasOwnProperty(name, 'constant');
    providerCache[name] = value;
    instanceCache[name] = value;
}
```



### 14.2 使用服务

```js
angular.module('myApp', ['myApp.services'])
.controller('ServiceController', function($scope, $timeout, githubService) {
    var timeoutId;
    // 并不推荐在控制器中使用 $watch，在实际生产中会将这个功能封装进一个指令，并在指令中设置 $watch
    $scope.$watch('username', function(newUsername) {
        if (!newUserName) { return; }
        // 用户两次输入之间有 350 ms 的间隔，就推断用户已经完成了输入，然后开始向 GitHub 发送请求
        if (timeoutId) $timeout.cancel(timeoutId);
        timeoutId = $timeout(function() {
            githubService.events(newUsername).success(function(res, status, headers) {
                $scope.events = res.data;
            });
        }, 350);
    });
});
```

到现在为止，我们只介绍了服务如何将类似的功能打包在一起，而使用服务也是在控制器之间共享数据的典型方法。例如，如果我们的应用需要后端服务的授权，可以创建一个 SessionsService 服务处理用户的授权过程，并保存服务端返回的令牌。当应用中任何地方要发送一个需要授权的请求，可以通过 SessionsService 来访问令牌。

### 14.3 装饰器

`$provide` 服务提供了在服务实例创建时对其进行拦截的功能，可以对服务进行扩展，或者用另外的内容完全代替它。

装饰器是非常强大的，它不仅可以应用在我们自己的服务上，也可以对 AngularJS 的核心服务进行拦截、中断甚至替换功能的操作。事实上 AngularJS 中很多功能的测试就是借助 `$provide.decorator()` 建立的。

下面的代码展示了如何给 githubService 添加装饰器，从而为每个请求都加上一个时间戳：

```js
var githubDecorator = function ($delegate, $log) {
  var events = function (path) {
    var startedAt = new Date();
    var events = $delegate.events(path);  // 事件是一个 promise
    events.finally(function () {
      $log.info("Fetching events" + " took " + (new Date() - startedAt) + "ms");
    });
    return events;
  };
  return {
    events: events
  };
};
angular.module('myApp').config(function ($provide) {
    $provide.decorator('githubService', githubDecorator);
});
```


## 15-18. 服务器通信

## 24. 揭秘 AngularJS

注意，`bootstrap()` 方法只允许我们启动 Angular 应用一次。

Angular 会使用 `ng-app` 指令的值配置 `$injector` 服务（第13章深入讨论了这个服务）。一旦应用程序加载完成，`$injector` 就会在应用程序的 `$rootScope` 旁边创建 `$compile` 服务。`$rootScope` 创建后，`$compile` 服务就会接管它。它会将 `$rootScope` 与现有的 DOM 连接起来，然后从将 `ng-app` 指令设置为祖先的地方开始编译 DOM。

### 24.1 视图的工作原理

当 angular.js 被取回时，浏览器会执行它，Angular 会设置一个事件监听器来监听浏览器的 `DOMContentLoaded` 事件。检测到这个事件时，Angular 会查找 `ng-app` 指令，然后创建运行需要的一系列必要的组件，即 `$injector` `$compile` 服务以及 `$rootScope`，然后开始解析 DOM 树。

#### 24.1.1 编译阶段

`$compile` 服务会遍历 DOM 树并搜集它找到的所有指令，然后将所有这些指令的链接函数合并为一个单一的链接函数。然后这个链接函数会将编译好的模板链接到 `$rootScope` 中。它会通过检查 DOM 属性、注释、类以及 DOM 元素名称的方式查找指令。

$compile 服务通过遍历 DOM 树的方式查找有声明指令的 DOM 元素。当碰到带有一个或多个指令的 DOM 元素时，它会排序这些指令（基于指令的 priority 优先级），然后使用 $injector 服务查找和收集指令的 compile 函数并执行它。

指令中的 compile 函数会在适当的时候处理所有 DOM 转换或者内联模板，如同创建模板的副本。

```js
// 返回一个链接函数
var linkFunction = $compile(appElement);
// 调用链接函数，将 $rootScope 附加给 DOM 元素
linkFunction($rootScope);
```

每个节点的编译方法运行之后，`$compile` 服务就会调用链接函数。这个链接函数为绑定了封闭作用域的指令设置监控。这一行为会创建实时视图。最后，在 `$compile` 服务完成后，AngularJS 运行时就准备好了。

#### 24.1.2 运行时

在标准的浏览器流程中，事件循环会等待事件执行(比点击、按键等)。当这些事件发生时，它们会被放到浏览器的事件队列中。如果有函数处理程序对事件作出响应，浏览器就会将 event 对象作为参数来调用这些事件处理程序。

```js
ele.addEventListener('click', function(event) { });
```

Angular 中对事件循环做了一点增强，并且 Angular 还提供了自己的事件循环。指令自身会注册事件监听器，因此当事件被触发时，指令函数就会运行在 AngularJS 的 `$digest` 循环中。

Angular 的事件循环被称作 `$digest` 循环，它由两个小型的循环组成，分别是 evalAsync 循环和 $watch 列表。

当事件被触发时，事件处理程序就会在指令的上下文中进行调用，也就是 AngularJS 的上下文中。从功能上讲，AngularJS 会在包含作用域的 `$apply()` 方法内调用指令。Angular 是在 `$rootScope` 上启动 `$digest` 循环时开始整个过程的，并且还会传播到所有子作用域中。

Angular 进入 `$digest` 循环时，会等待 `$evalAsync` 队列清空，然后再将回调执行上下文交还给浏览器。这个 `$evalAsync` 用于在浏览器进行渲染之前，调度需要运行在当前桢栈（stack frame）之外的所有任务。

此外，`$digest` 循环还会等待 `$watch` 表达式列表，它是一个可能在上一次迭代过程中被改变的潜在的表达式数组。如果检测到变化，就调用 `$watch` 函数，然后再次查看 `$watch` 列表以确保没有东西被改变。注意，对于 `$watch` 列表中检测到的任何变化，AngularJS 都会再次查看这个列表以确保没有东西被改变。

一旦 `$digest` 循环稳定下来，并且检测到没有潜在的变化了，执行过程就会离开 Angular 上下文并且通常会回到浏览器中，DOM 将会被渲染到这里。

整个流程在每个浏览器事件之间都会发生，这也是 Angular 如此强大的原因。它还可以将来自浏览器的事件注入到 Angular 流程中。


## 33. 调试

### 33.1 从 DOM 中调试

> 永远都不应该依靠还在应用程序生命周期内的DOM元素来获取该元素的属性。这项技术一般都是出于调试的目的才使用的。

我们可以访问附加给任意 DOM 元素的 Angular 属性。

```js
// 获取DOM元素
$('selector')             // jQuery方式
document.querySelector()  // 原生DOM方式
$0                        // 浏览器调试提供的简便方式

// 转换成 AngularJS 元素
var ele = angular.element($0);

// 获取
ele.scope();          // 从元素或者父元素上提取 $scope 对象
ele.controller();     // 从元素或者父元素上提取控制器
ele.injector();       // 从元素或者父元素上提取注入器
ele.inheritedData();  // 从元素或者父元素上提取与 $scope 对象相关联数据
```

### 33.2 调试器

借助 `debugger` 语句 或 `console.log()` 进行调试。

### 33.3 Angular Batarang

现在貌似基本用不了，介绍的功能都看不到了。

终端输入 `$scope` 可以获取当前对象的完整 scope 对象。

