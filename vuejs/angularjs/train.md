# AngularJS 基础


## 五大特性

AngularJS 五个特性：
  - MVC: 好处，职责清晰，代码模块化。MVC 只是手段，目的是为了模块化和复用！
  - 依赖注入: 依赖注入是一个经典的设计模式，主要是用来处理组件如何获得依赖的问题。
  - 模块化: AngularJS 模块是一个个容器，用于组织指令、控制器等。
  - 双向绑定: 双向绑定的核心思想是，视图和数据模型是对应的，自动同步更新。其他框架多数都只有单向绑定。
  - 语义化标签: 语义化标签也叫作 AngularJS 指令，这个是 AngularJS 最独特，最吸引开发者的一个功能。

```text
Module    // Modules are Containers
  |- Config -> Routes
  |- Filter
  |- Directive
  |- Factory & Service & Provider & Value
  \- Controller
```


## 基本概念

### 模块

```js
var ngModule = angular.module('ng');  // 获取内置模块 ng，框架功能都定义在此模块

var myApp = angular.module('myApp', ['util']);  // 定义一个模块，第二个参数为数组，用于声明对其他模块的依赖
```

### $scope

#### $scope 是什么

一个普通的 JS 对象。

#### $scope 有什么作用

`$scope` 是一个作用域，是 AngularJS 表达式的执行环境，表达式中的变量值都是从表达式所在作用域的 `$scope` 对象上获取的。  
`$scope` 是视图和控制器之间的胶水，是 AngularJS 实现 MVC 和双向绑定的基础。  
`$scope` 提供了 `$watch()` 方法，用来监控数据模型变化。  
`$scope` 提供了 `$apply()` 方法，该方法将任何数据模型的变化更新到视图上去。

#### $rootScope

> `$rootScope` 为 Scope 类型，而普通 `$scope` 为 ChildScope 类型。

`$rootScope` 是一个特殊的 `$scope`，它是整个 AngularJS 应用的根作用域。  
`$rootScope` 是在应用启动时生成的。  
`$rootScope` 的作用域范围是 `ng-app` 指令所在标签内部。  
一个 AngularJS 应用只有一个 `$rootScope`。

#### $scope 的树形结构

`$scope` 的继承就是用原型链实现的。

```js
$scope.$parent === $scope.__proto__;  // true
```

`$scope` 作用域可以嵌套的。当新作用域被创建的时候，他们会被当成子作用域添加到父作用域下，这使得作用域会变成一个和相应 DOM 结构一致的树状结构。

特别要注意给作用域设置属性时的行为差异：
  * `$scope.prop = 'aa'` 直接给 $scope 添加一个 prop 属性。
  * `$scope.obj.prop = 'aa'` 首先查找当前作用域 $scope 属性中叫做 obj 的属性，如果找到了就设置其 prop 属性值，如果没找到，那就会继续向上层作用域搜索，如果到 $rootScope 还没能找到 obj 就报错。

#### 如何获取 DOM 上的 $scope

```js
angular.element('#idName').scope();  // angular.element() 方法调用的 $()
```

#### 哪些指令会创建 $scope (子作用域)

`ng-controller` `ng-repeat` `ng-switch` `ng-view` 和 `ng-include` 都会创建子作用域，并继承父作用域的属性和方法。

通过 `directive()` 方法定义的指令，如果返回对象中配置的 `scope` 属性为对象，则会创建一个孤立的作用域。

### 控制器

AngularJS 中的控制器是一个工厂函数。

控制器作用
  * 控制是 MVC 的组成部分，是视图和数据模型桥梁。
  * 控制器是实现业务逻辑的地方。控制器可以将一个独立的视图相关的业务逻辑封装在一个独立的容器函数中，便于后续维护。
  * 在控制器中，可以设置作用域对象的初始状态。
  * 在控制器中，可以给作用域添加事件函数。
  * 创建控制器时同时给对应视图创建了一个子作用域。

如何创建一个控制器
  * 通过模块实例的 `controller()` 方法创建一个控制器。
  * 通过 `ng-controller` 指令将创建的控制器与视图关联起来。

### 表达式

AngularJS 表达式与 JS 表达式不完全相同：
  * 属性表达式：属性表达式是对应于当前的作用域 `$scope` 的，而 JS 中对应的是 `[[Scope]]`。
  * 允许未定义值：执行表达式时，碰到异常(如存取不存在的对象的属性)静默失败，不像 JS 会抛出一个异常。
  * 过滤器：你可以通过过滤器链来传递表达式的结果。

表达式一般都写在 HTML 片段中，会自动进行解析。在 JS 代码中可手动调用 `$eval()` 方法进行解析。

```js
$scope.a = 1; $scope.b = 2;
var res = $scope.$eval('a + b');
```

### 过滤器

AngularJS 过滤器用于将需要展示给用户的数据按照特定格式进行格式化处理，以满足显示格式要求。

过滤器有两种使用方法：
  * 在模板表达式内通过管道符号 `|` 调用过滤器，格式 `{{表达式 | 过滤器名:参数}}`
  * 在JS代码中通过 `$filter` 服务来调用过滤器，格式 `$filter(过滤器名)(表达式, 参数)`

```html
<p>{{'abcdefg' | limitTo:2:1 | uppercase}}</p>
```

通过 `filter()` 方法添加自定义过滤器。

```js
myApp.filter('uppercase', [function () {
    return function (str) {
        return str.toUpperCase();
    };
}]);
```


### 内置指令

AngularJS 内置指令的特点：
  * 内置指令是 AngularJS 内部定义好的，用户可直接使用，不用再定义。
  * 一些内置指令重写了原生的 HTML 元素，扩展了这些标签的功能。如 `<form>` 支持表单验证。
  * 大部分内置指令都是 HTML 标签属性，都是以 `ng-` 前缀开头。这些内置指令提供了很多功能。

AngularJS 有哪些内置指令
  * 元素类指令：`a`、`form`、`input`
  * 属性类：
    * 功能类：`ng-app`、`ng-controller`、`ng-model`、`ng-bind`
    * 事件类：`ng-click` `ng-keyup` `ng-mouseover` `ng-focus` `ng-blur`
    * 样式类：`ng-class` `ng-style`
    * 显示类：`ng-show` `ng-hide` `ng-if`
    * 其它：`ng-repeat` 等  

详细参考： https://docs.angularjs.org/api/ng/directive


## AngularJS 最佳实践

#### 1. 依赖注入不要用推断式

采用推断式，在代码压缩后可能会导致报错。应该采用声明式或行内声明。

#### 2. 双向绑定的变量设置成 $scope 下一个对象的属性

因为直接设置成 `$scope` 的属性时，不会从父容器中查找该属性。

```html
<body ng-app="myApp">
  <div ng-controller="myController1">
    <div ng-if="true">
      <input value="inputValue" ng-model="inputValue" />
    </div>
    <h2>input 输入框中的值是：{{inputValue}}</h2>
  </div>
</body>
```

初始时，是有效的，但修改值时，却发现没有变化。原因：**ng-if 创建了一层 scope**。

简单说，有双向绑定时，一定要用对象的属性来绑定。

注：如何找源码，ng-if 就搜索 ngIfDirective

#### 3. 多个控制器之间的通信尽量使用 service 去实现，不要使用全局变量或 $rootScope

避免污染全局作用域，导致重名冲突。

#### 4. 尽量不要在控制器中操作 DOM，而是使用指令

原因：AngularJS 应用中，由于 AngularJS 真正对指令进行编译解析都是在执行了用户控制器代码之后。在控制器中获取的 DOM 可能还不存在或者指令被编译解析后发生了变化，从而导致问题。(代码里取不到元素的原因是，指令还没解析呢。)

例如：设置样式，可以通过 ngClass 或者 ngStyle；设置点击事件可以使用 ng-click。

注：忘掉 jQuery 那些操作吧。

#### 5. 对 images 使用 ng-src 替代 src

原因：`<img src="path/to/{{name}}" />` 浏览器会在变量替换前发起对该图片资源的请求。

#### 6. 不要压缩 angular.min.js

因为 AngularJS 团队已经通过预定义设置压缩了 angular 文件，重复压缩可能会产生破坏。

#### 7. 总是把第三方 API 的回调包裹到 $apply 内

```js
var myApp = angular.module("myApp", []);
myApp.controller("myController", ["$scope", function($scope) {
  $scope.value = "hello angular";
  $("#buttonId").on("click", function() {
    $scope.$apply(function() {  // 如果不套这层 $scope.$apply 视图就不会更新
      $scope.value += " aaa";
    });
  });
}]);
```

#### 8. 如果不想让用户在 AngularJS 加载之前显示 HTML，使用 ng-cloak 指令或者 ng-bind 指令绑定数据

#### 9. 为了防止任何冲突，不要在自定义 directives 里使用 "ng" 前缀

#### 10. 尽量不用 $watch 监控一个层次很深属性很多非常复杂的对象，以减轻性能消耗和内存消耗

如果使用 `$watch(exp, listener, true)` 监控一个复杂的大对象，那么，就会对这对象备份存储，当作用域上内容变化时，会触发脏值检查，会一个一个对比
这个对象的所有属性及其子属性，非常消耗性能。

解决方案：将大对象拆分，监控真正变化的部分。
