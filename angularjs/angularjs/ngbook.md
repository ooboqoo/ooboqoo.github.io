# AngularJS 权威教程笔记


## 2. 数据绑定

由于JS自身的特点，以及它在传递值和引用时的不同处理方式，通常认为，在视图中通过对象的属性而非对象本身来进行引用绑定，是 Angular 中的最佳实践。


## 3. 模块

在 AngularJS 中，模块是定义应用的最主要方式。模块包含了主要的应用代码。一个应用可以包含多个模块，每一个模块都包含了定义具体功能的代码。使用模块能给我们带来许多好处，比如：
 * 保持全局命名空间的清洁；
 * 编写测试代码更容易，并能保持其清洁，以便更容易找到互相隔离的功能；
 * 易于在不同应用间复用代码；
 * 使应用能够以任意顺序加载代码的各个部分。

开发大型应用时，我们会创建多个模块来承载业务逻辑。将复杂的功能分割成不同的模块，有助于单独为它们编写测试。

```js
// 创建模块(提供2个参数) 或 获取模块(只提供一个参数)
angular.module(name: string, requires: string[])
  // name 是模块的名称，字符串变量。
  // requires 包含了一个字符串变量组成的列表，每个元素都是一个模块名称，本模块依赖于这些模块，依赖需要在本模块加载之前由注入器进行预加载。
```


## 4. 作用域

作用域 scope 是构成AngularJS应用的核心基础。应用的作用域是和应用的数据模型相关联的，同时作用域也是表达式执行的上下文。 `$scope` 对象是定义应用业务逻辑、控制器方法和视图属性的地方。

作用域是视图和控制器之间的胶水。在应用将视图渲染并呈献给用户之前，视图中的模板会和作用域进行连接，然后应用会对 DOM 进行设置以便将属性变化通知给 AngularJS。这个功能让 XHR 请求等 promise 对象的实现变得非常容易。

AngularJS将 `$scope` 设计成和 DOM 类似的结构，因此 `$scope` 可以进行嵌套，也就是说我们可以引用父级 `$scope` 中的属性。

将应用的业务逻辑都放在控制器中，而将相关的数据都放在控制器的作用域中，这是非常完美的架构。

### 4.1 视图和 $scope 的世界

AngularJS 启动并生成视图时，会将根 `ng-app` 元素同 `$rootScope` 进行绑定。 `$rootScope` 是所有 `$scope` 对象的最上层。

`$scope` 对象在 AngularJS 中充当数据模型，但与传统的数据模型不一样， `$scope` 并不负责处理和操作数据，它只是视图和 HTML 之间的桥梁，它是视图和控制器之间的胶水。

### 4.2 就是 HTML 而已

AngularJS 不会对不包含 AngularJS 特殊声明的元素进行任何处理。

下面这个例子中，AngularJS 不会处理 `<h2>` 元素，但是会在作用域发生变化时更新 `<h3>` 元素。

```html
<h2>Hello world</h2>
<h3>Hello {{ name }}</h3>
```

我们可以在 AngularJS 应用的模板中使用多种标记，包括下面这些。
 * 指令：将 DOM 元素增强为可复用的 DOM 组件的属性或元素。
 * 值绑定：模板语法 `{{ }}` 可以将表达式绑定到视图上。
 * 过滤器：可以在视图中使用的函数，用来进行格式化。
 * 表单控件：用来检验用户输入的控件。

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

4.4.1 创建
在创建控制器或指令时，AngularJS会用 `$injector` 创建一个新的作用域，并在这个新建的控制器或指令运行时将作用域传递进去。

4.4.2 链接
当 Angular开始运行时，所有的 $scope 对象都会附加或者链接到视图中。所有创建 $scope 对象的函数也会将自身附加到视图中。这些作用域将会注册当Angular应用上下文中发生变化时需要运行的函数。
这些函数被称为 `$watch` 函数，Angular 通过这些函数获知何时启动事件循环。

4.4.3 更新
当事件循环运行时，它通常执行在顶层 $scope 对象上（被称作 $rootScope ），每个子作用域都执行自己的脏值检测。每个监控函数都会检查变化。如果检测到任意变化， $scope 对象就会触发指定的回调函数。

4.4.4 销毁
当一个 $scope 在视图中不再需要时，这个作用域将会清理和销毁自己。
尽管永远不会需要清理作用域（因为Angular会为你处理），但是知道是谁创建了这个作用域还是有用的，因为你可以使用这个 `$scope` 上叫做 `$destory()` 的方法来清理这个作用域。

### 4.5 指令和作用域

指令在 AngularJS 中被广泛使用，指令通常不会创建自己的 `$scope`，但也有例外。比如 `ng-controller` 和 `ng-repeat` 指令会创建自己的子作用域并将它们附加到 DOM 元素上。

## 5. 控制器

由于AngularJS会负责处理控制器的实例化过程，我们只需编写构造函数即可。

将控制器命名为 `[Name]Controller` 而不是 `[Name]Ctrl` 是一个最佳实践。

控制器可以将与一个独立视图相关的业务逻辑封装在一个独立的容器中。尽可能地精简控制器是很好的做法。作为 AngularJS 开发者，使用依赖注入来访问服务可以实现这个目的。

控制器并不适合用来执行 DOM 操作、格式化或数据操作，以及除存储数据模型之外的状态维护。它只是视图和 $scope 之间的桥梁。

AngularJS通过作用域将视图、控制器和指令（本书后面会介绍）隔离开来，这样就很容易为功能的具体部分编写测试。

### 5.1 控制器嵌套（作用域包含作用域）

除了孤立作用域(在指令内部创建的作用域被称作孤立作用域)外，所有的作用域都通过原型继承而来，也就是说它们都可以访问父级作用域。

AngularJS 在当前作用域中无法找到某个属性时，便会逐级向上查找。如果到 $rootScope 还找不到，程序会继续运行，但视图无法更新。

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

控制器应该尽可能保持短小精悍，而在控制器中进行DOM操作和数据操作则是一个不好的实践。
设计良好的应用会将复杂的逻辑放到指令和服务中。通过使用指令和服务，我们可以将控制器重构成一个轻量且更易维护的形式。

```js
angular.module('myApp', []).controller('MyController', function($scope, UserSrv) {
  $scope.onLogin = function(user) { UserSrv.runLogin(user); };
});
```


## 6. 表达式

当用 `$watch` 进行监听时，AngularJS 会对表达式或函数进行运算。

表达式和 `eval` 非常相似，但是由于表达式由 AngularJS 来处理，它们有以下显著不同的特性：
 * 所有的表达式都在其所属的作用域内部执行，并有访问本地 $scope 的权限；
 * 如果表达式发生了 TypeError 和 ReferenceError 并不会抛出异常；
 * 不允许使用任何流程控制功能（条件控制，例如 if/eles ）；
 * 可以接受过滤器和过滤器链。

对表达式进行的任何操作，都会在其所属的作用域内部执行，因此可以在表达式内部调用那些限制在此作用域内的变量，并进行循环、函数调用、将变量应用到数学表达式中等操作。

### 6.1 解析 AngularJS 表达式

尽管 AngularJS 会在运行 `$digest` 循环的过程中自动解析表达式，但有时手动解析表达式也是非常有用的。
AngularJS通过 `$parse` 这个内部服务来进行表达式的运算，这个服务能够访问当前所处的作用域。
将 `$parse` 服务注入到控制器中，然后调用它就可以实现手动解析表达式。

```html
  <div ng-controller="MyController">
    <input ng-model="expr" type="text" placeholder="Enter an expression" />
    <h2>{{ parsedValue }}</h2>
  </div>

  <script>
    angular.module("myApp", []).controller('MyController', function ($scope, $parse) {
      $scope.$watch('expr', function (newVal, oldVal, scope) {
        if (newVal !== oldVal) {
          var parseFun = $parse(newVal);
          $scope.parsedValue = parseFun(scope);
        }
      });
    });
  </script>
```

### 6.2 插值字符串

在 AngularJS 中，我们的确有手动运行模板编译的能力。要在字符串模板中做插值操作，需要在你的对象中注入 `$interpolate`服务。







