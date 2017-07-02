# AngularJS 权威教程笔记 - 1


## 2. 数据绑定

由于JS自身的特点，以及它在传递值和引用时的不同处理方式，通常认为，在视图中通过对象的属性而非对象本身来进行引用绑定，是 Angular 中的最佳实践。


## 3. 模块

在 AngularJS 中，模块是定义应用的最主要方式。模块包含了主要的应用代码。一个应用可以包含多个模块，每一个模块都包含了定义具体功能的代码。使用模块能给我们带来许多好处，比如：
  * 保持全局命名空间的清洁；
  * 编写测试代码更容易，并能保持其清洁，以便更容易找到互相隔离的功能；
  * 易于在不同应用间复用代码；
  * 使应用能够以任意顺序加载代码的各个部分。

开发大型应用时，我们会创建多个模块来承载业务逻辑。将复杂的功能分割成不同的模块，有助于单独为它们编写测试。

```js
// 创建模块(提供2个参数) 或 获取模块(只提供一个参数)
angular.module(name: string, requires: string[])
  // name 是模块的名称，字符串变量。
  // requires 包含了一个字符串变量组成的列表，每个元素都是一个模块名称，本模块依赖于这些模块，依赖需要在本模块加载之前由注入器进行预加载。
```


## 4. 作用域 

作用域 scope 是构成 AngularJS 应用的核心基础。应用的作用域是和应用的数据模型相关联的，同时作用域也是表达式执行的上下文。 `$scope` 对象是定义应用业务逻辑、控制器方法和视图属性的地方。

作用域是视图和控制器之间的胶水。在应用将视图渲染并呈献给用户之前，视图中的模板会和作用域进行连接，然后应用会对 DOM 进行设置以便将属性变化通知给 AngularJS。这个功能让 XHR 请求等 promise 对象的实现变得非常容易。

AngularJS 将 `$scope` 设计成和 DOM 类似的结构，因此 `$scope` 可以进行嵌套，也就是说我们可以引用父级 `$scope` 中的属性。

将应用的业务逻辑都放在控制器中，而将相关的数据都放在控制器的作用域中，这是非常完美的架构。

### 4.1 视图和 $scope 

AngularJS 启动并生成视图时，会将根 `ng-app` 元素同 `$rootScope` 进行绑定。`$rootScope` 是所有 `$scope` 对象的最上层。

`$scope` 对象在 AngularJS 中充当数据模型，但与传统的数据模型不一样， `$scope` 并不负责处理和操作数据，它只是视图和 HTML 之间的桥梁/胶水。

### 4.2 仅关注带 angular 标记的 HTML 

AngularJS 不会对不包含 AngularJS 特殊声明的元素进行任何处理。

下面这个例子中，AngularJS 不会处理 `<h2>` 元素，但是会在作用域发生变化时更新 `<h3>` 元素。

```html
<h2>Hello world</h2>
<h3>Hello {{ name }}</h3>
```

我们可以在 AngularJS 应用的模板中使用多种标记，包括：指令 插值绑定 过滤器 表单控件。

### 4.3 作用域能做什么 

我们可以创建一个控制器来管理与其相关的变量，而不用将 name 变量直接放在 $rootScope 上。

```html
<div ng-app="myApp">
  <div ng-controller="MyController">
    <h1>Hello {{ name }}</h1>
  </div>
</div>
```

### 4.4 `$scope` 的生命周期 

`$scope` 对象的生命周期处理有四个不同阶段。

**创建**
在创建控制器或指令时，AngularJS 会用 `$injector` 创建一个新的作用域，并在这个新建的控制器或指令运行时将作用域传递进去。

**链接**
当 Angular 开始运行时，所有的 `$scope` 对象都会附加或者链接到视图中。所有创建 `$scope` 对象的函数也会将自身附加到视图中。这些作用域将会注册当 Angular 应用上下文中发生变化时需要运行的函数。这些函数被称为 `$watch` 函数，Angular 通过这些函数获知何时启动事件循环。

**更新**
当事件循环运行时，它通常执行在顶层 `$scope` 对象(即 `$rootScope`)上，每个子作用域都执行自己的脏值检测。每个监控函数都会检查变化。如果检测到任意变化，`$scope` 对象就会触发指定的回调函数。

**销毁**
当一个 `$scope` 在视图中不再需要时，这个作用域将会清理和销毁自己。尽管永远不需要清理作用域(会自动处理)，但知道是谁创建了这个作用域还是有用的，因为你可以使用这个 `$scope` 上的 `$destory()` 方法来手动清理。

### 4.5 指令和作用域

指令通常不会创建自己的 `$scope`，但也有例外，如 `ng-controller` 和 `ng-repeat` 指令会创建自己的子作用域。

## 5. 控制器

由于 AngularJS 会负责处理控制器的实例化过程，我们只需编写构造函数即可。

> 将控制器命名为 `[Name]Controller` 而不是 `[Name]Ctrl` 是一个最佳实践。

控制器可以将与一个独立视图相关的业务逻辑封装在一个独立的容器中。尽可能地精简控制器是很好的做法。作为 AngularJS 开发者，使用依赖注入来访问服务可以实现这个目的。

控制器并不适合用来执行 DOM 或数据操作，以及除存储数据模型之外的状态维护，它只是视图和 `$scope` 之间的桥梁。

AngularJS 通过作用域将视图、控制器和指令隔离开来，这样就很容易为功能的具体部分编写测试。

### 5.1 控制器嵌套（作用域包含作用域）

除了孤立作用域(在指令内部创建的作用域被称作孤立作用域)外，所有的作用域都通过原型继承而来，也就是说它们都可以访问父级作用域。

在当前作用域中找不到某个属性时，Angular 会继续逐级向上查找。如果到根作用域还找不到，程序不会报错，只是视图无法更新。

```js
app.controller('ParentController', function($scope) {
  $scope.person = {greeted: false};
});
app.controller('ChildController', function($scope) {
  $scope.sayHello = function() {
    $scope.person.name = 'Ari Lerner';
  };
});
```

```html
<div ng-controller="ParentController">
  <div ng-controller="ChildController">
    <a ng-click="sayHello()">Say hello</a>
  </div>
  {{ person }}
</div>
```

控制器应尽可能保持短小精悍，在控制器中进行 DOM 或数据操作则是一个不好的实践。设计良好的应用会将复杂的逻辑放到指令和服务中，通过使用指令和服务，我们可以将控制器重构成一个轻量且更易维护的形式。

```js
angular.module('myApp', []).controller('MyController', function($scope, UserService) {
  $scope.onLogin = function(user) { UserService.runLogin(user); };
});
```


## 6. 表达式

当用 `$watch` 进行监听时，AngularJS 会对表达式或函数进行运算。

表达式和 `eval` 非常相似，但是由于表达式由 AngularJS 来处理，它们有以下显著不同的特性：
  * 所有的表达式都在其所属的作用域内部执行，并有访问本地 $scope 的权限；
  * 如果表达式发生了 TypeError 和 ReferenceError 并不会抛出异常；
  * 不允许使用任何流程控制功能，如 if/eles；
  * 可以接受过滤器和过滤器链。

对表达式进行的任何操作，都会在其所属的作用域内部执行，因此可以在表达式内部调用那些限制在此作用域内的变量，并进行循环、函数调用、将变量应用到数学表达式中等操作。

### 6.1 解析 AngularJS 表达式

尽管 AngularJS 会在运行 `$digest` 循环的过程中自动解析表达式，但有时手动解析表达式也是非常有用的。
AngularJS 通过 `$parse` 这个内部服务来进行表达式的运算，这个服务能够访问当前所处的作用域。
将 `$parse` 服务注入到控制器中，然后调用它就可以实现手动解析表达式。

```html
<div ng-controller="MyController">
    <input ng-model="expr" type="text" placeholder="Enter an expression" />
    <h2>{{ parsedValue }}</h2>
</div>

<script>
angular.module("myApp", []).controller('MyController', function ($scope, $parse) {
    $scope.$watch('expr', function (newVal, oldVal, scope) {
        if (newVal === oldVal) { return; }
        var parseFun = $parse(newVal);
        $scope.parsedValue = parseFun(scope);
    });
});
</script>
```

### 6.2 插值字符串

Angular 中，我们的确有手动运行模板编译的能力。要在字符串模板中做插值操作，需要在你的对象中注入 `$interpolate` 服务。


## 7. 过滤器

可以在模板表达式或JS代码中使用过滤器。

```
{{ 123.456789 | number:2 }}  <!-- 显示：123.46 -->
```

```js
app.controller('DemoController', ['$scope', '$filter', function($scope, $filter) {
    $scope.name = $filter('lowercase')('Ari');
}]);
```


### 7.1 内置过滤器

```text
// currecy 过滤器可以将一个数值格式化为货币格式，默认情况下会采用客户端所处区域的货币符号
{{ 123 | currency }} 

// date 过滤器可以将日期格式化成需要的格式
{{ today | date:'longDate' }} <!-- August 09, 2013 -->

// filter 过滤器可以从给定数组中选择一个子集，并将其生成一个新数组返回
{{ ['Ari','Lerner','Likes','To','Eat','Pizza'] | filter:'e' }} <!-- ["Lerner","Likes","Eat"] -->

// json 过滤器可以将一个JSON或JavaScript对象转换成字符串。
 {.{ {'name': 'Ari', 'City': 'SanFrancisco'} | json }}

// limitTo 过滤器会根据传入的参数生成一个新的数组或字符串
{{ San Francisco is very cloudy | limitTo:-6 }} <!-- cloudy -->

// lowercase 过滤器将字符串转为小写
{{ "San Francisco is very cloudy" | lowercase }} <!-- san francisco is very cloudy -->

// uppercase 过滤器可以将字符串转换为大写形式：

// number 过滤器将数字格式化成文本
{{ 1.234567 | number:2 }} <!-- 1.23 -->

// orderBy 过滤器可以用表达式对指定的数组进行排序，可以接受两个参数，第一个是必需的，第二个是可选的
```

### 7.2 自定义过滤器

```js
angular.module('myApp.filters', []).filter('capitalize', function() {
    return function(input) {
        if (input) { return input[0].toUpperCase() + input.slice(1); }
    }
});
```

### 7.3 表单验证

表单验证不仅能给用户提供有用的反馈，同时也能保护我们的应用不会被恶意或者错误的输入所破坏。我们要在 Web 前端尽力保护后端。

AngularJS 能够将 HTML5 表单验证功能同它自己的验证指令结合起来使用，并且非常方便。

AngularJS 提供了很多表单验证指令，我们会介绍其中一些核心的验证功能，然后介绍如何创建自己的验证器。

所有输入字段都可以进行基本的验证，比如最大、最小长度等。这些功能是由新的 HTML5 表单属性提供的。如果想要屏蔽浏览器对表单的默认验证行为，可以在表单元素上添加 `novalidate` 标记。

下面看一下可以在 `<input>` 元素上使用的所有验证选项。

```html
// 1. 必填项
<input type="text" required /> <!-- 使用 HTML5 的 required -->
// 2. 最小长度
<input type="text" ng-minlength="5" />
// 3. 最大长度
<input type="text" ng-maxlength="20" />
// 4. 模式匹配
<input type="text" ng-pattern="[a-zA-Z]" />
// 5. 电子邮件
<input type="email" name="email" ng-model="user.email" /> <!-- HTML 自带功能 -->
// 6. 数字
<input type="number" name="age" ng-model="user.age" />
// 7. URL
<input type="url" name="homepage" ng-model="user.facebook_url" />
```

#### 7.3.8. 自定义验证

在第10章介绍

```js
angular.module('validationExample', []).directive('ensureUnique', function ($http) {
  return {
    require: 'ngModel',
    link: function (scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function () {
        $http({
          method: 'POST',
          url: '/api/check/' + attrs.ensureUnique,
          data: { field: attrs.ensureUnique, valud: scope.ngModel }
        }).success(function (data, status, headers, cfg) {
          c.$setValidity('unique', data.isUnique);
        }).error(function (data, status, headers, cfg) {
          c.$setValidity('unique', false);
        });
      });
    }
  };
});
```

#### 7.3.9 在表单中控制变量

表单的属性可以在其所属的 `$scope` 对象中访问到，借助这些属性，我们可以对表单做出实时响应。

```text
formName.inputFieldName.$pristine  // 未修改的表单
formName.inputFieldName.$dirty     // 修改过的表单
formName.inputFieldName.$valid     // 合法的表单
formName.inputFieldName.$invalid   // 不合法的表单
formName.inputfieldName.$error     // 错误
```

#### 7.3.10. 一些有用的CSS样式

AngularJS 处理表单时，会根据表单当前的状态添加一些 CSS 类，这些CSS类的命名和前面介绍的属性很相似，它们包括：

```css
.ng-pristine {}
.ng-dirty {}
.ng-valid {}
.ng-invalid {}
```

#### 7.3.11 `$parsers`

当用户同控制器进行交互，并且 ngModelController 中的 `$setViewValue()` 方法被调用时，`$parsers`数组中的函数会以流水线的形式被逐个调用。使用 `$parsers` 数组是实现自定义验证的途径之一。

```js
angular.module('myApp').directive('oneToTen', function () {
  return {
    require: '?ngModel',
    link: function (scope, ele, attrs, ngModel) {
      if (!ngModel) return;
      function parser(viewValue) {
        var i = parseInt(viewValue);
        if (i >= 0 && i < 10) { ngModel.$setValidity('oneToTen', true); return viewValue; }
        else { ngModel.$setValidity('oneToTen', false); return undefined; }
      }
      ngModel.$parsers.unshift(parser);
    }
  };
});
```

#### 7.3.12 `$formatters`

当绑定的 ngModel 值发生了变化，并经过 $parsers 数组中解析器的处理后，这个值会被传递给 $formatters 流水线。同 $parsers 数组可以修改表单的合法性状态类似， $formatters 中的函数也可以修改并格式化这些值。

#### 7.3.13  `ngMessages` 指令


## 8. 指令简介

### 8.1 指令：自定义 HTML 元素和属性

基于我们对 HTML 元素的理解，指令本质上就是 AngularJS 扩展具有自定义功能的 HTML 元素的途径。

正如我们看到的那样，指令可以和其他指令或属性组合在一起使用，这种组合使用的方式叫做合成。

#### 8.1.1 HTML引导

在 HTML 中要用内置指令 `ng-app` 标记出应用的根节点。这个指令需要以属性的形式来使用，因此可以将它写到任何位置，但是写到 `<html>` 的开始标签上是最常规的做法。

> 所有内置指令的命名空间都使用 `ng` 作为前缀。为了防止命名空间冲突，不要在自定义指令前加 `ng` 前缀。

#### 8.1.2 自定义指令

通过 AngularJS 模块 API 中的 `.directive()` 方法，我们可以通过传入一个字符串和一个函数来注册一个新指令。其中字符串是这个指令的名字，指令名应该是驼峰命名风格的，函数应该返回一个对象。

声明指令本质上是在 HTML 中通过元素、属性、类或注释来添加功能。

> 在 HTML 里使用 `my-directive` 的形式声明指令，而指令定义必须以 `myDirective` 的形式命名，两者是相对应的。

```js
angular.module('myApp', []).directive('myDirective', function () {
  return {
    restrict: 'EAC',
    replace: true,
    template: '<a href="http://google.com">Click me to go to Google</a>'
  };
});
```

```html
<my-directive></my-directive>
```

为了让 AngularJS 能够调用我们的指令，需要修改指令定义中的 `restrict` 设置。这个设置告诉 AngularJS 在编译 HTML 时用哪种声明格式来匹配指令定义。我们可以指定一个或多个格式 元素E、属性A、类C 或注释M 的格式来调用指令。

#### 8.1.3 表达式

由于指令可以用属性的形式调用，我们可能会好奇如果给属性赋值会发生什么：

```html
<h1 ng-init="greeting='HelloWorld'">The greeting is: {{ greeting }}</h1>
```

这里有一个值得注意的问题，赋值给指令的表达式的运行环境是在当前作用域。

### 8.2 向指令中传递数据

有好几种途径可以设置指令内部作用域中属性的值。最简单的方法就是使用由所属控制器提供的已经存在的作用域。尽管简单，共享状态会导致很多其他问题。AngularJS 允许通过创建新的子作用域或者隔离作用域来解决这个常见问题。

同之前在当前作用域介绍中介绍的继承作用域（子作用域）不同，隔离作用域同当前 DOM 的作用域是完全分隔开的。为了给这个新的对象设置属性，我们需要显式地通过属性传递数据。

```html
<div my-directive my-url="http://google.com" my-link-text="Click me to go to Google"></div>
<script>
angular.module('myApp', []).directive('myDirective', function () {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      myUrl: '@',     // 绑定策略
      myLinkText: '@' // 绑定策略
    },
    template: '<a href="{{myUrl}}">{{myLinkText}}</a>'
  };
});
</script>
```

`@` 绑定策略告诉 Angular 将 DOM 中 some-property 属性的值复制给新作用域对象中的 someProperty 属性：

```js
scope: { someProperty: '@' }
```

注意，默认情况下 someProperty 在 DOM 中的映射是 some-property 属性。可用如下方式显式地指定绑定的属性名：

```js
scope: { someProperty: '@someAttr' }
```

```html
<div my-directive some-attr="someProperty with @ binding"></div>
```


## 9. 内置指令

AngularJS 提供了一系列内置指令。其中一些指令重载了原生的 HTML 元素，比如 `<form>` 和 `<a>` 标签，当在 HTML 中使用标签时，并不一定能明确看出是否在使用指令。其他内置指令通常以 `ng` 为前缀，很容易识别。

### 9.1 基础 `ng` 属性指令

首先来看看和原生 HTML 标签名称相似的一组内置指令，这组指令非常容易记忆，仅仅是在原生标签名前加上了 `ng` 前缀，包括：
  * `ng-href` - 当使用当前作用域中的属性动态创建 URL 时，应用 `ng-href` 代替 `href`(用户点击时可能插值尚未生效)
  * `ng-src` - Angular 会告诉浏览器在 `ng-src` 对应的表达式生效之前不要加载资源
  * `ng-disabled` - 通过运算表达式的值来决定在目标元素上是插入还是移除对应的属性
  * `ng-checked` - 布尔属性，同上
  * `ng-readonly` - 布尔属性，同上
  * `ng-selected` - 布尔属性，同上
  * `ng-class` - 
  * `ng-style` - 

### 9.2 在指令中使用子作用域

下面这些指令会以父级作用域为原型生成子作用域。这种继承的机制可以创建一个隔离层，用来将需要协同工作的方法和数据模型对象放置在一起。

**ng-app**

任何具有 `ng-app` 属性的 DOM 元素将被标记为 `$rootScope` 的起始点。整个文档中只有第一个 `ng-app` 是有效的 。如果需要在一个页面中放置多个 AngularJS 应用，需要手动引导应用。

**ng-controller**

指令 `ng-controller` 的作用是为嵌套在其中的指令创建一个子作用域，避免将所有操作和模型都定义在 `$rootScope` 上。

**ng-include**

使用 `ng-include` 可以加载、编译并包含外部 HTML 片段到当前的应用中。可突破跨域限制？？  
要记住，使用 `ng-include` 时 AngularJS 会自动创建一个子作用域。如果你想使用某个特定的作用域，例如 ControllerA 的作用域，必须在同一个 DOM 元素上添加 `ng-controller="ControllerA"` 指令。

**ng-switch**

```html
<input type="text" ng-model="person.name"/>
<div ng-switch on="person.name">
  <p ng-switch-default>And the winner is</p>
  <h1 ng-switch-when="Ari">{{ person.name }}</h1>
</div>
```

**ng-view**

`ng-view` 指令用来设置将被路由管理和放置在 HTML 中的视图的位置。

**ng-if**

使用 `ng-if` 指令可以完全根据表达式的值在 DOM 中生成或移除一个元素。
`ng-if` 同 `ng-show` 和 `ng-hide` 指令最本质的区别是，它不是通过 CSS 显示或隐藏 DOM 节点，而是真正生成或移除节点。

**ng-repeat**

`ng-repeat` 用来遍历一个集合或为集合中的每个元素生成一个模板实例。集合中的每个元素都会被赋予自己的模板和作用域。同时每个模板实例的作用域中都会暴露一些特殊的属性。
  * $index ：遍历的进度（0... length-1 ）。
  * $first ：当元素是遍历的第一个时值为 true 。
  * $middle ：当元素处于第一个和最后元素之间时值为 true 。
  * $last ：当元素是遍历的最后一个时值为 true 。
  * $even ：当 $index 值是偶数时值为 true 。
  * $odd ：当 $index 值是奇数时值为 true 。

**ng-init**

`ng-init` 指令用来在指令被调用时设置内部作用域的初始状态。

**{{ }}**

`{{ }}` 语法是 AngularJS 内置的模板语法，它会在内部 `$scope` 和视图之间创建绑定。

**ng-bind**

HTML 加载含有 `{{ }}` 语法的元素后并不会立刻渲染它们，导致未渲染内容闪烁(Flash of Unrendered Content，FOUC)。我可以用 `ng-bind` 将内容同元素绑定在一起避免 FOUC。

**ng-cloak**

除使用 `ng-bind` 来避免未渲染元素闪烁，还可以在含有 `{{ }}` 的元素上使用 `ng-cloak` 指令，`ng-cloak` 指令会将内部元素隐藏，直到路由调用对应的页面时才显示出来。

**ng-bind-template**

同 `ng-bind` 指令类似，`ng-bind-template` 用来在视图中绑定多个表达式。

```html
<div ng-bind-template="{{message}}{{name}}"></div>
```

**ng-model**

`ng-model` 指令用来将 input select textarea 或自定义表单控件同包含它们的作用域中的属性进行 **双向** 绑定。

它将当前作用域中运算表达式的值同给定的元素进行绑定。如果属性并不存在，它会隐式创建并将其添加到当前作用域中。我们应该始终用 `ngModel` 来绑定 `$scope` 上一个数据模型内的属性，而不是 `$scope` 上的属性，这可以避免在后代作用域中发生 **属性覆盖**。

**ng-show/ng-hide**

`ng-show` 和 `ng-hide` 根据所给表达式的值来显示或隐藏 HTML 元素。

**ng-change**

这个指令会在表单输入发生变化时计算给定表达式的值。

**ng-click**

`ng-click` 用来指定一个元素被点击时调用的方法或表达式。

**ng-form**

`ng-form` 用来在一个表单内部嵌套另一个表单。普通的 HTML `<form>` 标签不允许嵌套，但 `ng-form` 可以。

**ng-options**

```html
<select ng-model="city" ng-options="city.name for city in cities"></select>
```

**ng-submit**

`ng-submit` 用来将表达式同 `onsubmit` 事件进行绑定。这个指令同时会阻止默认行为(发送请求并重新加载页面)。

**ng-class**

使用 `ng-class` 动态设置元素的类。重复的类不会添加。当表达式发生变化，先前添加的类会被移除，新类会被添加。

**ng-attr-(suffix)**

当 AngularJS 编译 DOM 时会查找花括号 `{{ some expression }}` 内的表达式。这些表达式会被自动注册到 `$watch` 服务中并更新到 `$digest` 循环中，成为它的一部分。有时浏览器会对属性会进行很苛刻的限制，如 SVG 对于非法属性就会报错，此时可以用 `ng-attr-cx` 来解决这个问题。

```html
<svg><circle cx="{{ cx }}"></circle></svg>        <!-- 报错 -->
<svg><circle ng-attr-cx="{{ cx }}"><circle></svg> <!-- 正常 -->
```


## 10. 指令详解

### 10.1 指令定义

对于指令，可以把它简单的理解成在特定 DOM 元素上运行的函数，指令可以扩展这个元素的功能。

例如，`ng-click` 可以让一个元素能够监听 `click` 事件，并在接收到事件的时候执行 AngularJS 表达式。正是指令使得 AngularJS 这个框架变得强大，并且正如所见，我们可以自己创造新的指令。

AngularJS 应用的模块中有很多方法可以使用，其中 `directive()` 这个方法是用来定义指令的，接受两个参数：
  1. name 指令的名字，用来在视图中引用特定的指令。
  2. factory_function 这个函数返回一个对象，其中定义了指令的全部行为。`$compile` 服务利用这个方法返回的对象，在 DOM 调用指令时来构造指令的行为。

```js
angular.module('myApp', []).directive('myDirective', function ($timeout, UserDefinedService) {
    return {
        // 通过设置项来定义指令，在这里进行覆写
    };
});
```

当 AngularJS 启动应用时，它会把第一个参数当作一个字符串，并以此字符串为名来注册第二个参数返回的对象。

指令的工厂函数只会在编译器第一次匹配到这个指令时调用一次。和 `controller` 函数类似，我们通过 `$injetor.invoke` 来调用指令的工厂函数。当 AngularJS 在 DOM 中遇到具名的指令时，会去匹配已经注册过的指令，并通过名字在注册过的对象中查找。此时，就开始了一个指令的生命周期，指令的生命周期开始于 `$compile` 方法并结束于 `link` 方法，在本章后面的内容中我们会详细介绍这个过程。

下面，来看看定义一个指令时可以使用的全部设置选项。

```js
angular.module('myApp', []).directive('myDirective', function() {
    return {
        restrict: String,
        priority: Number,
        terminal: Boolean,
        template: String or Template Function: function(tElement, tAttrs) {...},
        templateUrl: String,
        replace: Boolean or String,
        scope: Boolean or Object,
        transclude: Boolean,
        controller: String or function(scope, element, attrs, transclude, otherInjectables) { ... },
        controllerAs: String,
        require: String,
        link: function(scope, iElement, iAttrs) { ... },
        compile: // 返回一个对象或连接函数，如下所示：
            function(tElement, tAttrs, transclude) {
                return {
                    pre: function(scope, iElement, iAttrs, controller) { ... },
                    post: function(scope, iElement, iAttrs, controller) { ... }
                }
                // 或者
                return function postLink(...) { ... }
            }
    };
});
```

#### 10.1.1 restrict （字符串）

- E（元素）`<my-directive></my-directive>`
- A（属性，默认值）`<div my-directive="expression"></div>`
- C（类名）`<div class="my-directive:expression;"></div>`
- M（注释）`<--directive:my-directive expression-->`

这些选项可以单独使用，也可以混合在一起使用

##### 元素方式还是属性方式

在页面中通过元素方式创建新的指令可以将一些功能封装在元素内部。这样做可以告诉指令的使用者，这里会完整包含应用的某一部分内容。用属性形式来给一个已经存在的元素添加数据或行为。如何进行选择，通常取决于定义的指令是否包含某个组件的核心行为，或者用额外的行为、状态或者其他内容（比如模拟时钟）对某个核心组件进行修饰或扩展。使用何种指令声明格式的指导原则是能够准确表达每一段代码的意图，创造易于理解和分享的清晰代码。

#### 10.1.2 优先级（数值型）

优先级参数可以被设置为一个数值。大多数指令会忽略这个参数，使用默认值 0，但也有些场景设置高优先级是非常重要甚至是必须的。例如，`ngRepeat` 将这个参数设置为 1000，这样就可以保证在同一元素上，它总是在其他指令之前被调用。

#### 10.1.3 terminal （布尔型）

这个参数用来告诉 AngularJS 停止运行当前元素上比本指令优先级低的指令。但同当前指令优先级相同的指令还是会被执行。

#### 10.1.4 template （字符串或函数）


#### 10.1.5 templateUrl （字符串或函数）

* 一个代表外部 HTML 文件路径的字符串；
* 一个可以接受两个参数的函数，参数为 tElement 和 tAttrs，并返回一个外部 HTML 文件路径的字符串。

默认情况下，调用指令时会在后台通过 Ajax 来请求 HTML 模板文件。有两件事情需要知道。
  * 在本地开发时，需要在后台运行一个本地服务器，用以从文件系统加载 HTML 模板，否则会导致 CORS 错误。
  * 模板加载是异步的，意味着编译和链接要暂停，等待模板加载完成。

通过 Ajax 异步加载大量的模板将严重拖慢一个客户端应用的速度。为了避免延迟，可以在部署应用之前对 HTML 模板进行缓存。模板加载后，AngularJS 会将它默认缓存到 `$templateCache` 服务中。在实际生产中，可以提前将模板缓存到一个定义模板的 JavaScript 文件中，这样就不需要通过 XHR 来加载模板了。更多内容请查看第34章。

#### 10.1.6 replace （布尔型）

replace 是一个可选参数，如果设置了这个参数，值必须为 true ，因为默认值为 false 。

### 10.2 指令作用域

指令嵌套并不一定意味着需要改变它的作用域。默认情况下，子指令会被付予访问父 DOM 元素对应的作用域的能力。

#### 10.2.1 scope 参数（布尔型或对象）

当 `scope` 设置为 true 时，会从父作用域继承并创建一个新的作用域对象。  
内置指令 `ng-controller` 的作用，就是从父级作用域继承并创建一个新的子作用域。

#### 10.2.2 隔离作用域

scope 属性设置为一个对象 `{key: value, ...}` 时就创建了一个隔离作用域，如果这样做了，指令的模板就无法访问外部作用域了。

隔离作用域(没有继承其他作用域的单独作用域)可能是 scope 属性三个选项中最难理解的一个，但也是最强大的。

具有隔离作用域的指令最主要的使用场景是创建可复用的组件，组件可以在未知上下文中使用，并且可以避免污染所处的外部作用域或不经意地污染内部作用域。

### 10.3 绑定策略

使用无数据的隔离作用域并不常见。AngularJS 提供了几种方法能够将指令内部的隔离作用域，同指令外部的作用域进行数据绑定。

* **本地作用域属性**：使用 `@` 符号将本地作用域同 DOM 属性的值进行绑定。
* **双向绑定**：通过 `=` 可以将本地作用域上的属性同父级作用域上的属性进行双向的数据绑定。
* **父级作用域绑定**：通过 `&` 符号可以对父级作用域进行绑定，以便在其中运行函数。

```html
<input type="text" ng-model="to"/>
<div scope-example ng-model="to" on-send="sendMail(email)" from-name="ari@fullstack.io" />
```

```js
scope: {
    ngModel: '=', // 将ngModel同指定对象绑定
    onSend: '&',  // 将引用传递给这个方法
    fromName: '@' // 储存与fromName相关联的字符串
}
```

#### 10.3.1 transclude

嵌入通常用来创建可复用的组件，典型的例子是模态对话框或导航栏。

假设我们想创建一个包括标题和少量HTML内容的侧边栏，如下所示：

```html
<div sidebox title="Links">
    <ul><li>First link</li><li>Second link</li></ul> <!-- 这部分内容会提取并下方备注处 -->
</div>
```

为这个侧边栏创建一个简单的指令，并将 transclude 参数设置为 true ：

```js
angular.module('myApp', [])
  .directive('sidebox', function () {
    return {
      restrict: 'EA',
      scope: {  title: '@' },
      transclude: true,
      template: 
        '<div class="sidebox"><div class="content">' + 
        '  <h2 class="header">{{ title }}</h2>' +
        '  <span class="content" ng-transclude></span>' +  // 嵌入此处
        '</div></div>'
    };
  });
```

#### 10.3.2 controller （字符串或函数）

当设置为字符串时，会以字符串的值为名字，来查找注册在应用中的控制器的构造函数。

可以在指令内部通过匿名构造函数的方式来定义一个内联的控制器：

```js
angular.module('myApp', []).directive('myDirective', function() {
    restrict: 'A',
    controller: function($scope, $element, $attrs, $transclude) {
        // 控制器逻辑放在这里
    }
});
```

我们可以将任意可以被注入的 AngularJS 服务传递给控制器。控制器中还有一些特殊的服务可以被注入到指令当中：

1. $scope 与指令元素相关联的当前作用域。（是内联控制器创建的新scope还是外面的？）
2. $element 当前指令对应的元素。
3. $attrs 由当前元素的属性组成的对象。
4. $transclude 嵌入链接函数会与对应的嵌入作用域进行预绑定。

#### 10.3.3 controllerAs （字符串）

controllerAs 参数用来设置控制器的别名，可以以此为名来发布控制器，并且作用域可以访问 controllerAs 。这样就可以在视图中引用控制器，甚至无需注入 $scope 。例如，创建一个 MainController ，然后不要注入 $scope ，如下所示：

```js
angular.module('myApp').controller('MainController', function() { this.name = "Ari"; });
```

现在，在HTML中无需引用作用域就可以使用 MainController 。

```html
<div ng-appng-controller="MainController as main">
    <input type="text" ng-model="main.name" />
    <span>{{ main.name }}</span>
</div>
```

这个参数看起来好像没什么大用，但它给了我们可以在路由和指令中创建匿名控制器的强大能力。这种能力可以将动态的对象创建成为控制器，并且这个对象是隔离的、易于测试的。

例如，可以在指令中创建匿名控制器，如下所示：

```js
angular.module('myApp').directive('myDirective', function() {
    return {
        restrict: 'A',
        template: '<h4>{{ myController.msg }}</h4>',
        controllerAs: 'myController',
        controller: function() { this.msg = "Hello World"; }
    };
});
```

#### 10.3.4 require （字符串或数组）

require 参数可以被设置为字符串或数组，字符串代表另外一个指令的名字。 require 会将控制器注入到其值所指定的指令中，并作为当前指令的链接函数的第四个参数。

### 10.4 AngularJS 的生命周期

#### 10.4.1 编译阶段

#### 10.4.2 compile （对象或函数）

#### 10.4.3 链接


### 10.5 ngModel


### 10.6 自定义验证


















