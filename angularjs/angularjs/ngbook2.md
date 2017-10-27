# AngularJS 权威教程笔记 - 2


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

#### 8.1.3 指令的命名与使用规则

AngularJS 要求 Directive 的命名使用 **驼峰式** 语法，而在HTML代码中，使用的是 **连接符** 的形式。

##### 为什么会有这种差异

命名和用法不同的核心原因，是因为 HTML 对大小写不敏感，而 JavaScript 对大小写敏感。为了保证 HTM L和 JavaScript 都能按原有模式正常工作，AngularJS 提出了这套解决方法。

##### 怎么实现的？

AngularJS 在解析 HTML 时，会将名称取出(如people-list-array)，并进行一下两个方面的处理：
  1. 去除字段的 `x-` 或 `data-` 头。
  2. 将字段中的连接符号去除，并将第二个单词开始改为首字母大写，其他字母小写。([people,List,Array])
  3. 然后合并起来。（peopleListArray)

##### 为什么要先去除 `data-/x-` 部分

`data-` 存在的原因是 HTML5 的验证工具对自定义的属性会报错，而添加了 `data-` 前缀就可通过验证。而 `x-` 的存在，可能是针对 XHTML 的支持。

#### 8.1.4 表达式

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

有三种不同的绑定策略 `@` `=` `&`，具体参阅 10.3 小节。


## 9. 内置指令

AngularJS 提供了一系列内置指令。其中一些指令重载了原生的 HTML 元素，比如 `<form>` 和 `<a>` 标签，当在 HTML 中使用标签时，并不一定能明确看出是否在使用指令。其他内置指令通常以 `ng` 为前缀，很容易识别。

* 元素类指令：a、form、input。
* 属性类：
* 功能类：ngApp、ngController、ng-model、ngBind
* 事件类：ngClick、ngKeyup、ngMouseover、ng-focus、ng-blur
* 样式类：ngClass、ngStyle、
* 显示类：ngShow、ngHide、ngIf
* 其它：ng-repeat 等

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
<div ng-controller="FirstCtrl">
  {{ people | json}}
  <div ng-repeat="person in people">
    <!-- 注意此处的数据传入方法 -->
    <div people name="{{person.name}}" sex="person.sex" age="person.age" btn-click="clickBtnCallback(name)"></div>
  </div>
</div>

<script>
  angular.module('myApp', [])
    .controller("FirstCtrl", function ($scope) {
      $scope.people = [
        { name: "Harry", sex: "男", age: "15" },
        { name: "张三", sex: "男", age: "30" }
      ];
      $scope.clickBtnCallback = function (msg) { alert("名字是：" + msg); }
    })
    .directive("people", function () {
      return {
        restrict: "A",
        scope: {
          name: "@",
          sex: "=",
          age: "@",
          btnClick: "&"
        },
        template: 
          "姓名：<input type='text' ng-model='name'>" +
          "性别：<input type=text ng-model='sex'> 年龄：<input type=text ng-model='age'>" +
          " <input type='button' value='提交' ng-click='btnClick({name: name})'>"
          // 注意 btnClick({name: name}) 这种调用格式 btnClick 函数打印出来变这样了
          // function (locals) { return parentGet(scope, locals); }
      }
    });

</script>
```

#### 10.3.1 transclude

嵌入通常用来创建可复用的组件，典型的例子是模态对话框或导航栏。

假设我们想创建一个包括标题和少量HTML内容的侧边栏，如下所示：

```html
<div sidebox title="Links">
    <ul><li>First link</li><li>Second link</li></ul> <!-- 这部分内容会提取并下方备注处 -->
</div>
```

```js
angular.module('myApp', [])
  .directive('sidebox', function () {
    return {
      restrict: 'EA',
      scope: {  title: '@' },
      transclude: true,                                    // transclude 设置为 true
      template: 
        '<div class="sidebox">' +
        '  <div class="content">' +
        '    <h2 class="header">{{ title }}</h2>' +
        '    <div class="content" ng-transclude></div>' +  // 在此处嵌入
        '  </div>' +
        '</div>'
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


















