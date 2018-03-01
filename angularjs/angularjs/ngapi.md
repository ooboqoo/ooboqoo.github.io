# AngularJS 1.4.x API


## 内部指令

### 简易指令

和原生 HTML 标签名称相似的一组内置指令，仅仅是在原生标签名前加上了 `ng` 前缀。

|||
|-------------|--------------------------------------------------------------
| ng-href     | 用 `ng-href` 代替 `href`，因为用户点击时可能插值尚未生效
| ng-src      | 在 `ng-src` 对应的表达式生效之前不会尝试加载资源
| ng-disabled | 通过运算表达式的值来决定在目标元素上是插入还是移除对应的属性
| ng-checked  | 布尔属性，同上
| ng-readonly | 布尔属性，同上
| ng-selected | 布尔属性，同上
| ng-class    | 动态设置元素的类，重复的类不会添加
| ng-style    | 动态设置元素的样式

### 表单相关指令

|||
|-------------|--------------------------------------------------------------------------------------------------
| ng-options  | `<select ng-model="city" ng-options="city.name for city in cities"></select>`
| ng-model    | 用来将 input select textarea 或自定义表单控件同包含它们的作用域中的属性进行 **双向** 绑定 <span class="mark">[注1]</span>
| ng-form     | 用来在一个表单内部嵌套另一个表单。普通的 `<form>` 标签不允许嵌套
| ng-submit   | 用来将表达式同 `onsubmit` 事件进行绑定。该指令会阻止默认行为(发送请求并重新加载页面)

注1: `ng-model` 将当前作用域中运算表达式的值同给定的元素进行绑定。如果属性并不存在，它会隐式创建并将其添加到当前作用域中。我们应该始终用 `ngModel` 来绑定 `$scope` 上一个 **数据模型内的属性**，而不是 `$scope` 上的属性，这可以避免在后代作用域中发生 **属性覆盖**。

### 功能类指令

|||
|---------------|--------------------------------------------------------------------------------------------------
| ng-app        | 整个文档中只有第一个 `ng-app` 是有效的 。如果需要在一个页面中放置多个 AngularJS 应用，需手动引导
| ng-controller | 为嵌套在其中的指令创建一个子作用域，避免将所有操作和模型都定义在 `$rootScope` 上
| ng-include    | 可以加载、编译并包含外部 HTML 片段到当前的应用中，该指令会新建一个子作用域
| ng-switch     | 用法见下方示例
| ng-view       | 指令用来设置将被路由管理和放置在 HTML 中的视图的位置
| ng-if         | 根据表达式的值在 DOM 中生成或移除一个元素，注意与 `ng-show` 和 `ng-hide` 的区别
| ng-repeat     | 用来遍历一个集合或为集合中的每个元素生成一个模板实例
| ng-init       | 用来在指令被调用时设置内部作用域的初始状态
| {{exp}}       | 插值语法，它会在内部 `$scope` 和视图之间创建绑定
| ng-bind       | 将内容同元素绑定在一起，可避免插值语法导致的 FOUS (未渲染内容闪烁 Flash of Unrendered Content)
| ng-cloak      | 可配合插值语法使用以避免 FOUS。该指令会(通过CSS设置)将内部元素隐藏，在 compile 时再将指令标记删除
| ng-bind-template | 同 `ng-bind` 指令类似，用来在视图中绑定多个表达式，如 `ng-bind-template="{{message}}{{name}}"`
| ng-show/ng-hide  | 根据所给表达式的值来显示或隐藏 HTML 元素
| ng-change     | 在表单输入发生变化时计算给定表达式的值
| ng-click      | 用来指定一个元素被点击时调用的方法或表达式
| ng-attr-(suffix) | 用来绕过一些浏览器对属性的限制，如 `<svg><circle cx="{{cx}}"></circle></svg>` 浏览器会报错

注: `ng-controller` `ng-repeat` `ng-switch` `ng-view` 和 `ng-include` 都会创建子作用域，并继承父作用域的属性和方法。

##### ng-repeat

`ng-repeat` 用来遍历一个集合或为集合中的每个元素生成一个模板实例。集合中的每个元素都会被赋予自己的模板和作用域。同时每个模板实例的作用域中都会暴露一些特殊的属性:
  * `$index` ：元素的索引 / 遍历的进度, 0... length-1
  * `$first` ：元素索引是否为 0
  * `$middle` ：元素索引是否介于 0 到 length-1 之间
  * `$last` ：元素索引是否为 length-1
  * `$even` ：元素索引是否为偶数
  * `$odd` ：元素索引是否为奇数

```html
<div ng-repeat="model in collection | orderBy: 'id' as filtered_result track by model.id">
    {{model.name}}
</div>
```

##### ng-switch

```html
<input type="text" ng-model="person.name" />
<div ng-switch on="person.name">
  <p ng-switch-default>And the winner is</p>
  <h1 ng-switch-when="Ari">{{person.name}}</h1>
</div>
```

##### ng-attr-(suffix)

当 AngularJS 编译 DOM 时会查找花括号 `{{some expression}}` 内的表达式。这些表达式会被自动注册到 `$watch` 服务中并更新到 `$digest` 循环中，成为它的一部分。有时浏览器会对属性会进行很苛刻的限制，如 SVG 对于非法属性就会报错，此时可以用 `ng-attr-cx` 来解决这个问题。

```html
<svg><circle cx="{{cx}}"></circle></svg>        <!-- 报错 -->
<svg><circle ng-attr-cx="{{cx}}"><circle></svg> <!-- 正常 -->
```


## type

### $rootScope.Scope

```js
.$watch(watchExpression, listener, [objectEquality]);  // objectEquality 为 true 时会进行深比较

```

### angular.Module

https://code.angularjs.org/1.4.14/docs/api/ng/type/angular.Module

```js
moduleInstance.requires
moduleInstance.name

.provider(name, providerType);      // $provide.provider()
.factory(name, providerFunction);   // $provide.factory()
.service(name, constructor);        // $provide.service()
.value(name, object);               // $provide.value()
.constant(name, object);            // $provide.constant()
.decorator(name, decorFn);          // $provide.decorator()
.animation(name, animationFactory); // $animateProvider.register()
.filter(name, filterFactory);       // $filterProvider.register()
.controller(name, constructor);     // $controllerProvider.register()
.directive(name, directiveFactory); // $compileProvider.directive()
.config(configFn);
.run(initializationFn);
```



## service

|||
|------------|---------------------------
| $rootScope | 
| $filter    | 
| $q         | 
| $timeout   | 
| $locale    | 
| $compile   | Compiles an HTML string or DOM into a template and produces a template function, which can then be used to link scope and the template together.
| $templateCache | 
| $parse     | 
| $interpolate   | 
| $digest    | 
| $apply     |



## provider



## filter

|||
|-----------|---------------------------
| json      | 
| date      | 
| currency  | 
| number    | 
| filter    | 
| lowercase | 
| uppercase | 
| limitTo   | 
| orderBy   | 


## function

|||
|---------    |-----------------
| bootstrap() | 
| copy()      | 
| extend()    | 
| element()   | 



<style>td:first-child { color: red; }</style>
