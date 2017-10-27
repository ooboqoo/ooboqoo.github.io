# AngularJS 权威教程笔记 - 1

AngularJS 五个特性：
  - MVC: 好处：职责清晰，代码模块化。MVC只是手段，目的是为了模块化和复用！
  - 依赖注入: 依赖注入(DI)是一个经典的设计模式, 主要是用来处理组件如何获得依赖的问题。
  - 模块化
  - 双向绑定: 双向绑定的核心思想是，视图和数据模型是对应的，自动同步更新。
  - 语义化标签: 语义化标签也叫作AngularJS指令，这个是AngularJS最独特，最吸引开发者的一个功能。


## 2. 数据绑定

由于JS自身的特点，以及它在传递值和引用时的不同处理方式，通常认为，在视图中通过对象的属性而非对象本身来进行引用绑定，是 Angular 中的最佳实践。


## 3. 模块

在 AngularJS 中，模块是定义应用的最主要方式。模块包含了主要的应用代码。一个应用可以包含多个模块，每一个模块都包含了定义具体功能的代码。使用模块能给我们带来许多好处，比如：
  * 保持全局命名空间的清洁；
  * 编写测试代码更容易，并能保持其清洁，以便更容易找到互相隔离的功能；
  * 易于在不同应用间复用代码；
  * 使应用能够以任意顺序加载代码的各个部分。

开发大型应用时，我们会创建多个模块来承载业务逻辑。将复杂的功能分割成不同的模块，有助于单独为它们编写测试。

```text
Module    // Modules are Containers
  |- Config -> Routes
  |- Filter
  |- Directive
  |- Factory Service Provider Value
  \- Controller
```

```js
// 创建模块(提供2个参数) 或 获取模块(只提供一个参数)
angular.module(name: string, requires: string[])
  // name 是模块的名称，字符串变量。
  // requires 包含了一个字符串变量组成的列表，每个元素都是一个模块名称，本模块依赖于这些模块，依赖需要在本模块加载之前由注入器进行预加载。
```

```js
var ngModule = angular.module('ng');  // 获取内置模块 ng，框架功能都定义在此模块
```


## 4. 作用域 

作用域 scope 是构成 AngularJS 应用的核心基础。应用的作用域是和应用的数据模型相关联的，同时作用域也是表达式执行的上下文。 `$scope` 对象是定义应用业务逻辑、控制器方法和视图属性的地方。注：$scope 是一个普通的 JS 对象。

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

### 4.2 $scope有什么作用？ 

* $scope 是一个作用域，是AngularJS表达式的执行环境，表达式中的变量值都是从表达式所在作用域的$scope对象上获取到的。
* $scope 是视图和控制器之间的胶水，是AngularJS实现MVC和双向绑定的基础。
* $scope 提供了 `$watch()` 方法，用来监控数据模型变化。
* $scope 提供了 `$apply()` 方法，该方法将任何数据模型的变化更新到视图上去。

### 4.3 $rootScope 

* $rootScope是一个特殊的$scope，它是整个AngularJs应用的根作用域。
* $rootScope是在应用启动时生成的。
* $rootScope的作用域范围是ng-app指令所在标签内部。
* 一个AngularJS应用只有一个$rootScope。

### 4.4 $scope 的树形结构

scope的继承就是用原型链实现的。

```js
$scope.$parent === $scope.__proto__;  // true
```

一个应用可以有很多个作用域$scope，各个作用域对应一部分DOM。$scope作用域可以嵌套的。当新作用域被创建的时候，他们会被当成子作用域添加到父作用域下，这使得作用域会变成一个和相应DOM结构一致的树状结构。

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

### 4.5 哪些指令会创建$scope(子作用域)

指令通常不会创建自己的 `$scope`，但也有例外，如 `ng-controller`、`ng-repeat`、`ng-switch`、`ng-view` 和 `ng-include` 都会创建自己的子作用域，并继承父作用域的属性和方法。

通过directive()方法定义的指令，如果返回对象中配置了 `scope` 属性为对象时，创建了一个孤立 scope。

### 4.6 如何获取DOM上的$scope?

```js
angular.element('#idName').scope();  // angular.element() 方法调用的 $()
```


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
  * 不允许使用任何流程控制功能，如 if/else；
  * 可以接受过滤器和过滤器链。

对表达式进行的任何操作，都会在其所属的作用域内部执行，因此可以在表达式内部调用那些限制在此作用域内的变量，并进行循环、函数调用、将变量应用到数学表达式中等操作。


2）AngularJS表达式与JavaScript表达式的不同之处？
AngularJS表达式与JavaScript表达式不完全相同，因为AngularJS不会用Javascript的eval()函数去执行AngularJS表达式。 不过除了以下几个需要区别的地方以外，你可以把AngularJS表达式看成是Javascript表达式：
  * 属性表达式：属性表达式是对应于当前的作用域的，不像Javascript对应的是window对象。
  * 允许未定义值：执行表达式时，AngularJS能够允许undefined或者null，不像Javascript会抛出一个异常。
  * 没有控制结构： 你不能在AngularJS表达式中使用“条件判断”、“循环”、“抛出异常”等控制结构。
  * 过滤器： 你可以通过过滤器链来传递表达式的结果。例如将日期对象转变成指定的阅读友好的格式。

`$eval()` 的用法

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
{{ expression | filter:参数1:参数2 }}  <!-- 多个参数分别用 `:` 引导 -->
{{ expression | filter1 | filter2 }}   <!-- 多个过滤器之间用 `|` 分隔 -->

{{ 123.456789 | number:2 }}  <!-- 显示：123.46 -->
{{'abcdefg' | limitTo:2:1 | uppercase}}
```

```js
app.controller('DemoController', ['$scope', '$filter', function($scope, $filter) {
    $scope.name = $filter('lowercase')('Ari');
    $filter('date')(new Date(), 'yyyy-MM-dd');  // 格式: $filter(过滤器名)(表达式, 参数1, 参数2)
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

