# AngularJS 培训笔记


### AngularJS 最佳实践

#### 1. 依赖注入不要用推断式

采用推断式，在代码压缩后可能会导致报错。应该采用声明式或行内声明。

#### 2. 双向绑定的变量设置成 `$scope` 下一个对象的属性

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

附：如何找源码 ng-if 就搜索 ngIfDirective

#### 3. 多个控制器之间的通信尽量使用 service 去实现，不要使用全局变量或者 `$rootScope`

避免污染全局作用域，导致重名冲突。

#### 4. 尽量不要在控制器中操作 DOM，而是使用指令(AngularJS 内置指令或者自定义指令)

原因：在 AngularJS 应用中，由于 AngularJS 真正对指令进行编译解析都是在执行了用户控制器代码之后。当在控制器中获取的DOM可能还不存在或者指令被编译解析后发生了变化，从而导致问题。(代码里娶不到元素的原因是，指令还没解析呢。)

例如：设置样式，可以通过 ngClass 或者 ngStyle；设置点击事件可以使用 ng-click。

忘掉 jquery 那些操作吧。

#### 5. 对 images 使用 ng-src 替代 src

原因：`<img src="path/to/{{name}}" />` 浏览器会在变量替换前发起对该图片资源的请求，所以如果标签中src路径中包含变量时需要使用 ng-src

#### 6. 不要压缩 angular.min.js

因为 AngularJS 团队已经通过预定义设置压缩了 angular 文件，重复压缩可能会产生破坏。

#### 7. 总是把第三方 API 的回调包裹到 $apply, 用来通知 AngularJS 关于环境的变化，触发脏值检查，实现视图等同步更新

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

#### 8. 如果我们不想让用户在 AngularJS 加载之前显示 HTML，使用 ng-cloak 指令或者 ng-bind 指令绑定数据。

说明：这个主要是解决初始不要显示 AngularJS 的 `{{}}` 插值表达式。

#### 9. 为了防止任何冲突，不要在自定义 directives 里使用 "ng" 前缀。

#### 10. 尽量不用 $watch 监控一个层次很深属性很多非常复杂的对象，以减轻性能消耗和内存消耗。

如果监控一个复杂的大对象，那么，就会对这对象备份存储，当作用域上内容变化时，会触发脏值检查，会一个一个对比
这个对象的所有属性及其子属性，非常消耗性能。

解决方案：将大对象拆分，监控真正变化的部分。