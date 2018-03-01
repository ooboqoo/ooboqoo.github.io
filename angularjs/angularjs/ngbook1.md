# AngularJS 权威教程笔记 - 1


## 1. 简介及最佳实践

### 五大特性

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

### AngularJS 最佳实践

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


## 2. 数据绑定

有双向绑定时，一定要用对象的属性来绑定，这样可以避免子作用域覆盖父作用域属性问题。


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
  // name 是模块的名称，字符串变量
  // requires 模块依赖的模块名列表，依赖需要在本模块加载之前由注入器进行预加载
```

```js
var ngModule = angular.module('ng');  // 获取内置模块 ng，框架功能都定义在此模块
var myApp = angular.module('myApp', ['util']);  // 定义一个模块，第二个参数为数组，用于声明对其他模块的依赖
```


## 4. 作用域 

作用域 Scope 是构成 AngularJS 应用的核心基础。应用的作用域是和应用的数据模型相关联的，同时作用域也是表达式执行的上下文。 `$scope` 对象是定义应用业务逻辑、控制器方法和视图属性的地方。注：`$scope` 是一个普通的 JS 对象。

作用域是视图和控制器之间的胶水。在应用将视图渲染并呈献给用户之前，视图中的模板会和作用域进行连接，然后应用会对 DOM 进行设置以便将属性变化通知给 AngularJS。这个功能让 XHR 请求等 promise 对象的实现变得非常容易。

AngularJS 将 `$scope` 设计成和 DOM 类似的结构，因此 `$scope` 可以进行嵌套，也就是说我们可以引用父级 `$scope` 中的属性。

将应用的业务逻辑都放在控制器中，而将相关的数据都放在控制器的作用域中，这是非常完美的架构。

### 4.1 视图和 $scope 

AngularJS 启动并生成视图时，会将根 `ng-app` 元素同 `$rootScope` 进行绑定。`$rootScope` 是所有 `$scope` 对象的最上层。

`$scope` 对象在 AngularJS 中充当数据模型，但与传统的数据模型不一样， `$scope` 并不负责处理和操作数据，它只是视图和 HTML 之间的桥梁/胶水。

### 4.2 仅关注带 AngularJS 标记的 HTML 

AngularJS 不会对不包含 AngularJS 特殊声明的元素进行任何处理。

下面这个例子中，AngularJS 不会处理 `<h2>` 元素，但是会在作用域发生变化时更新 `<h3>` 元素。

```html
<h2>Hello world</h2>
<h3>Hello {{name}}</h3>
```

我们可以在 AngularJS 应用的模板中使用多种标记，包括：指令 插值绑定 过滤器 表单控件。

### 4.3 作用域能做什么 

我们可以创建一个控制器来管理与其相关的变量，而不用将 name 变量直接放在 `$rootScope` 上。

```html
<div ng-app="myApp">
    <div ng-controller="MyController">
        <h1>Hello {{name}}</h1>
    </div>
</div>
```

### 4.2 $scope 有什么作用

* `$scope` 是一个作用域，是 AngularJS 表达式的执行环境，表达式中的变量值都是从其所在作用域对象上获取的。
* `$scope` 是视图和控制器之间的胶水，是 AngularJS 实现 MVC 和双向绑定的基础。
* `$scope` 提供了 `.$watch()` 方法，用来监控数据模型变化。
* `$scope` 提供了 `.$apply()` 方法，该方法将任何数据模型的变化更新到视图上去。

### 4.3 $rootScope

> `$rootScope` 和隔离作用域为 Scope 类型，而普通 `$scope` 为 ChildScope 类型。

* `$rootScope` 是一个特殊的 `$scope`，它是整个 AngularJS 应用的根作用域。
* `$rootScope` 是在应用启动时生成的。
* `$rootScope` 的作用域范围是 `ng-app` 指令所在标签内部。
* 一个 AngularJS 应用只能有一个 `$rootScope`。

### 4.4 $scope 的树形结构

作用域的继承就是用原型链实现的。

```js
$scope.$parent === $scope.__proto__;  // true  注：隔离作用域中两者不等
```

一个应用可以有很多个作用域 `$scope`，每个作用域对应一部分 DOM。`$scope` 作用域可以嵌套的。当新作用域被创建的时候，他们会被当成子作用域添加到父作用域下，这使得作用域会变成一个和相应 DOM 结构一致的树状结构。

特别要注意给作用域设置属性时的行为差异：
  * `$scope.prop = 'aa'` 直接给 $scope 添加一个 prop 属性。
  * `$scope.obj.prop = 'aa'` 首先查找当前作用域 $scope 属性中叫做 obj 的属性，如果找到了就设置其 prop 属性值，如果没找到，那就会继续向上层作用域搜索，如果到 $rootScope 还没能找到 obj 就报错。

### 4.4 $scope 的生命周期

`$scope` 对象的生命周期处理有四个不同阶段。

**创建**
在创建控制器或某些指令时，AngularJS 会用 `$injector` 创建一个新作用域，并在这个新建的控制器或指令运行时将作用域传递进去。

**链接**
当 AngularJS 开始运行时，所有的 `$scope` 对象都会附加或者链接到视图中。所有创建 `$scope` 对象的函数也会将自身附加到视图中。作用域中会在 `$scope.$$watchers` 中注册当应用上下文发生变化时需要运行的函数，AngularJS 通过这些函数获知何时启动事件循环。

**更新**
当事件循环运行时，它通常执行在顶层 `$scope` 对象(即 `$rootScope`)上，每个子作用域都执行自己的脏值检测。每个监控函数都会检查变化。如果检测到任意变化，`$scope` 对象就会触发指定的回调函数。

**销毁**
当一个 `$scope` 在视图中不再需要时，这个作用域将会清理和销毁自己。尽管永远不需要清理作用域(会自动处理)，但知道是谁创建了这个作用域还是有用的，你可以使用该 `$scope` 的 `$destory()` 来手动清理。

### 4.5 哪些指令会创建 $scope

多数内置指令没有创建自己的 `$scope`，但 `ng-controller`、`ng-repeat`、`ng-switch`、`ng-view` 和 `ng-include` 会创建自己的子作用域，并继承父作用域的属性和方法。

### 4.6 获取 DOM 上的 $scope

```js
angular.element('#idName').scope();  // angular.element() 方法调用的 $()
```


## 5. 控制器

控制器作用
  * 控制是 MVC 的组成部分，是视图和数据模型桥梁。
  * 控制器是实现业务逻辑的地方。控制器可以将一个独立的视图相关的业务逻辑封装在一个独立的容器函数中，便于后续维护。
  * 在控制器中，可以设置作用域对象的初始状态。
  * 在控制器中，可以给作用域添加事件函数。
  * 创建控制器时同时给对应视图创建了一个子作用域。

> 将控制器命名为 `[Name]Controller` 而不是 `[Name]Ctrl` 是一个最佳实践。

控制器可以将与一个独立视图相关的业务逻辑封装在一个独立的容器中。

控制器并不适合用来执行 DOM 或数据操作，以及除存储数据模型之外的状态维护，它只是视图和 `$scope` 之间的桥梁。

AngularJS 通过作用域将视图、控制器和指令隔离开来，这样就很容易为功能的具体部分编写测试。

控制器应尽可能保持短小精悍，在控制器中进行 DOM 或数据操作则是一个不好的实践。设计良好的应用会将复杂的逻辑放到指令和服务中，通过使用指令和服务，我们可以将控制器重构成一个轻量且更易维护的形式。

```js
angular.module('myApp', []).controller('MyController', function constructor($scope, UserService) {
    $scope.onLogin = function (user) { UserService.runLogin(user); };
});
```

### 5.1 控制器嵌套

除了隔离作用域(在指令内部创建的作用域被称作隔离作用域)外，所有的作用域都通过原型继承而来，也就是说它们都可以访问父级作用域。

在当前作用域中找不到某个属性时，AngularJS 会继续逐级向上查找。如果到根作用域还找不到，不会报错，只是视图无法更新。

```js
app.controller('ParentController', function ($scope) {
    $scope.person = {greeted: false};
});
app.controller('ChildController', function ($scope) {
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
    {{person}}
</div>
```


## 6. 表达式

当用 `$watch` 进行监听时，AngularJS 会对表达式或函数进行运算。

表达式和 `eval` 非常相似，但是由于表达式由 AngularJS 来处理，它们有以下显著不同的特性：
  * 所有的表达式都在其所属的作用域内部执行；
  * 如果表达式发生了 TypeError 和 ReferenceError 并不会抛出异常；
  * 不允许使用任何流程控制功能，如 if/else；
  * 可以接受过滤器和过滤器链。

对表达式进行的任何操作，都会在其所属的作用域内部执行，因此可以在表达式内部调用那些限制在此作用域内的变量，并进行循环、函数调用、将变量应用到数学表达式中等操作。

AngularJS 表达式与 JS 表达式不完全相同：
  * 属性表达式：属性表达式是对应于当前的作用域 `$scope` 的，而 JS 中对应的是 `[[Scope]]`。
  * 允许未定义值：执行表达式时，碰到异常(如存取不存在的对象的属性)静默失败，不像 JS 会抛出一个异常。
  * 过滤器：你可以通过过滤器链来传递表达式的结果。

### 6.1 解析表达式 $parse()

> `$parse` 解析表达式并返回一个接收一个 scope 参数的函数，运行此函数得到计算结果。  
> `$eval` 是作为一个 `$scope` 中的方法存在的，调用时马上得到计算结果。
> ```js
> $eval: function (expr, locals) { return $parse(expr)(this, locals); }
> ```

尽管 AngularJS 会在运行 `$digest` 循环的过程中自动解析表达式，必要时也可以调用 `$parse` 服务手动解析表达式。

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

### 6.2 计算表达式 $eval()

表达式一般都写在 HTML 片段中，会自动进行解析。在 JS 代码中可手动调用 `$eval()` 方法进行解析。

```js
$scope.a = 1; $scope.b = 2;
var res = $scope.$eval('a + b');
```

### 6.3 插值字符串

可以调用 `$interpolate` 服务手动解析模板中的插值操作。


## 7. 过滤器


可以在模板表达式或JS代码中使用过滤器。过滤器用于将需要展示给用户的数据按照特定格式进行格式化处理，以满足显示格式要求。

过滤器有两种使用方法：
  * 在模板表达式内通过管道符号 `|` 调用过滤器，格式 `{{表达式 | 过滤器名:参数}}`
  * 在JS代码中通过 `$filter` 服务来调用过滤器，格式 `$filter(过滤器名)(表达式, 参数)`

```html
{{expression | filter:参数1:参数2}}  <!-- 多个参数分别用 `:` 引导 -->
{{expression | filter1 | filter2}}   <!-- 多个过滤器之间用 `|` 分隔 -->

{{123.456789 | number:2}}  <!-- 显示：123.46 -->
{{'abcdefg' | limitTo:2:1 | uppercase}}
```

```js
app.controller('DemoController', ['$scope', '$filter', function($scope, $filter) {
    $scope.name = $filter('lowercase')('Ari');
    $filter('date')(new Date(), 'yyyy-MM-dd');  // 格式: $filter(过滤器名)(表达式, 参数1, 参数2)
}]);
```

### 7.1 内置过滤器

```txt
// currecy 过滤器可以将一个数值格式化为货币格式，默认情况下会采用客户端所处区域的货币符号
{{123 | currency}}

// date 过滤器可以将日期格式化成需要的格式
{{today | date:'longDate'}} <!-- August 09, 2013 -->

// filter 过滤器可以从给定数组中选择一个子集，并将其生成一个新数组返回
{{['Ari','Lerner','Likes','To','Eat','Pizza'] | filter:'e'}} <!-- ["Lerner","Likes","Eat"] -->

// json 过滤器可以将一个JSON或JavaScript对象转换成字符串。
 {{\{'name': 'Ari', 'City': 'SanFrancisco'} | json}}

// limitTo 过滤器会根据传入的参数生成一个新的数组或字符串
{{San Francisco is very cloudy | limitTo:-6}} <!-- cloudy -->

// lowercase 过滤器将字符串转为小写
{{"San Francisco is very cloudy" | lowercase}} <!-- san francisco is very cloudy -->

// uppercase 过滤器可以将字符串转换为大写形式：

// number 过滤器将数字格式化成文本
{{1.234567 | number:2}} <!-- 1.23 -->

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

#### 自定义验证

在第10章介绍

```js
angular.module('validationExample', []).directive('ensureUnique', function ($http) {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function () {
              $http({
                  method: 'POST',
                  url: '/api/check/' + attrs.ensureUnique,
                  data: { field: attrs.ensureUnique, valid: scope.ngModel }
              }).success(function (data, status, headers, cfg) {
                  ctrl.$setValidity('unique', data.isUnique);
              }).error(function (data, status, headers, cfg) {
                  ctrl.$setValidity('unique', false);
              });
            });
        }
    };
});
```

#### 在表单中控制变量

表单的属性可以在其所属的 `$scope` 对象中访问到，借助这些属性，我们可以对表单做出实时响应。

```text
formName.inputFieldName.$pristine  // 未修改的表单
formName.inputFieldName.$dirty     // 修改过的表单
formName.inputFieldName.$valid     // 合法的表单
formName.inputFieldName.$invalid   // 不合法的表单
formName.inputfieldName.$error     // 错误
```

#### 一些有用的CSS样式

AngularJS 处理表单时，会根据表单当前的状态添加一些 CSS 类，这些CSS类的命名和前面介绍的属性很相似，它们包括：

```css
.ng-pristine { }
.ng-dirty { }
.ng-valid { }
.ng-invalid { }
```

#### $parsers

当用户同控制器进行交互，并且 ngModelController 中的 `$setViewValue()` 方法被调用时，`$parsers`数组中的函数会以流水线的形式被逐个调用。使用 `$parsers` 数组是实现自定义验证的途径之一。

```js
angular.module('myApp').directive('oneToTen', function () {
    return {
        require: '?ngModel',
        link: function (scope, ele, attrs, ngModel) {
            if (!ngModel) return;
            function parser(viewValue) {
                var i = parseInt(viewValue);
                if (i >= 0 && i < 10) {
                    ngModel.$setValidity('oneToTen', true); return viewValue;
                } else {
                    ngModel.$setValidity('oneToTen', false); return undefined;
                }
            }
            ngModel.$parsers.unshift(parser);
        }
    };
});
```

#### $formatters

当绑定的 ngModel 值发生了变化，并经过 $parsers 数组中解析器的处理后，这个值会被传递给 $formatters 流水线。同 $parsers 数组可以修改表单的合法性状态类似， $formatters 中的函数也可以修改并格式化这些值。

#### ngMessages


