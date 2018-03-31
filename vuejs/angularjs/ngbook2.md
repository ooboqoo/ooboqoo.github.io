# AngularJS 权威教程笔记 - 2


## 8. 指令简介

### 8.1 指令-自定义HTML元素或属性

基于我们对 HTML 元素的理解，指令本质上就是 AngularJS 扩展具有自定义功能的 HTML 元素的途径。

Directives are markers on a DOM element that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element (e.g. via event listeners), or even to transform the DOM element and its children.

#### 自定义指令

AngularJS 模块中的 `.directive()` 方法用来注册新指令。声明指令本质上是在 HTML 中通过元素、属性、类或注释来添加功能。

#### 指令的命名与使用规则

AngularJS 要求指令的命名使用 **驼峰式** 语法，而在 HTML 代码中，使用的是 **连接符** 的形式。这是因为 HTML 对大小写不敏感，而 JS 对大小写敏感，于是 AngularJS 提出了这套解决方法。

AngularJS 在解析 HTML 时，会将名称取出，并进行以下处理：
  1. 去除字段的 `x-` 或 `data-` 头。
  2. 将字段中的连接符号去除，并将第二个单词开始改为首字母大写，然后连起来。

```js
// AngularJS 支持 ng-bind ng:bind ng_bind data-ng-bind x-ng-bind 这些用法，处理后结果都是一样的
var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;
function directiveNormalize(name) {
  return camelCase(name.replace(PREFIX_REGEXP, ''));
}
```

#### 给指令赋值

由于指令可以用属性的形式调用，我们可能会好奇如果给属性赋值会发生什么：

```html
<h1 ng-init="greeting='HelloWorld'">The greeting is: {{greeting}}</h1>
```

这里有一个值得注意的问题，赋值给指令的表达式的运行环境是在当前作用域。

### 8.2 向指令中传递数据

有好几种途径可以设置指令内部作用域中属性的值。最简单的方法就是共享现有作用域，但共享状态会导致很多其他问题。AngularJS 允许通过创建新的子作用域或者隔离作用域来避免共享作用域的副作用。

**隔离作用域**同当前 DOM 的作用域是完全分隔开的，为了给这个新的对象设置属性，我们需要显式地通过属性传递数据。

```html
<div my-directive my-url="http://google.com" my-link-text="Click me to go to Google"></div>
<script>
angular.module('myApp', []).directive('myDirective', function factory() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
          myUrl: '@',             // 只绑定
          linkText: '@myLinkText' // 绑定 + 重命名
        },
        template: '<a href="{{myUrl}}">{{myLinkText}}</a>'
    };
});
</script>
```


## 9. 内置指令

AngularJS 提供了一系列内置指令。其中一些指令重载了原生的 HTML 元素，比如 `<form>` 和 `<a>` 标签，当在 HTML 中使用标签时，并不一定能明确看出是否在使用指令。其他内置指令通常以 `ng` 为前缀，很容易识别。

* 元素类指令：`a` `form` `input`
* 属性类：
  * 功能类：`ngApp` `ngController` `ngModel` `ngBind`
  * 事件类：`ngClick` `ngKeyup` `ngMouseover` `ngFocus` `ngBlur`
  * 样式类：`ngClass` `ngStyle`
  * 显示类：`ngShow` `ngHide` `ngIf`
  * 其它：`ngRepeat` 等


## 10. 指令详解

Guide https://code.angularjs.org/1.4.14/docs/guide/directive  
API https://code.angularjs.org/1.4.14/docs/api/ng/service/$compile

### 10.1 指令定义

对于指令，可以把它简单的理解成在特定 DOM 元素上运行的函数，指令可以扩展这个元素的功能。

AngularJS 应用内模块中的 `.directive()` 方法用来注册新指令。

指令的工厂函数只会在编译器第一次匹配到这个指令时调用一次。我们通过 `$injetor.invoke()` 来调用指令的工厂函数。

当 AngularJS 在 DOM 中遇到具名的指令时，会去匹配已经注册过的指令，并通过名字在注册过的对象中查找。此时，就开始了一个指令的生命周期，指令的生命周期开始于 `$compile` 方法并结束于 `link` 方法。

```js
angular.module('myModule').directive('directiveName', function factory() {
    var directiveDefinitionObject = {
        restrict: String,
        priority: Number,
        terminal: Boolean,
        template: String | function(tElement, tAttrs) { },
        // or
        templateUrl: String | function(tElement, tAttrs) { },
        templateNamespace: 'html' | 'svg' | 'math',
        replace: Boolean,
        scope: Boolean | Object,
        transclude: Boolean | String,
        controller: String | function($scope, $element, $attrs, $transclude, otherInjectables) { },
        controllerAs: String,
        bindToController: Boolean,
        require: String | String[],
        compile: function(tElement, tAttrs) {    // t: template
            // 返回一个对象或连接函数，如下所示：
            return {
                pre: function(scope, iElement, iAttrs, controller, transcludeFn) { },  // i: instance
                post: function(scope, iElement, iAttrs, controller, transcludeFn) { }
            };
            // or
            return function postLink(scope, iElement, iAttrs, controller, transcludeFn) { };
        },
        // or  // 如提供 compile 配置项，必须在 compile 中返回 link 函数，此配置项无效
        link: {
            pre: function(scope, iElement, iAttrs, controller, transcludeFn) { },
            post: function(scope, iElement, iAttrs, controller, transcludeFn) { }
        },
        // or
        link: function postLink(scope, iElement, iAttrs, controller, transcludeFn) { }
    };
    return directiveDefinitionObject;
});
```

#### restrict （字符串）

- E (元素) `<my-directive></my-directive>`
- A (属性，默认值) `<div my-directive="expression"></div>`
- C (类名) `<div class="my-directive: expression;"></div>`
- M (注释) `<-- directive: my-directive expression -->`

这些选项可以单独使用，也可以混合在一起使用。

元素方式还是属性方式？如何进行选择，通常取决于定义的指令是否包含某个组件的核心行为。指导原则是易于理解和分享。
  * 通过元素方式创建的新指令可以将一些功能封装在元素内部。
  * 用属性形式来给一个已经存在的元素添加数据或行为。

#### priority（数值型）

大多数指令会使用默认值 `0`，但也有些场景设置高优先级是非常重要甚至是必须的。例如，`ngRepeat` 将这个参数设置为 1000，这样就可以保证在同一元素上，它总是在其他指令之前被调用。

1) 同一个 DOM 上的几个指令，会在调用 compile 之前根据 priority 进行排序。  
2）指令的 compile 和 preLink 优先级越大先执行，postLink 优先级越大越后执行。

#### terminal （布尔型）

停止运行当前元素上比本指令优先级低的指令。但相同优先级的指令还是会被执行，因为相同优先级的指令的执行顺序是未知的。

#### template （字符串或函数）

```js
function (tElement, tAttrs) { return "some string"; }
```

#### templateUrl （字符串或函数）

* 一个代表外部 HTML 文件路径的字符串；
* 一个可以接受两个参数的函数，参数为 tElement 和 tAttrs，并返回一个外部 HTML 文件路径的字符串。

默认情况下，调用指令时会在后台通过 Ajax 来请求 HTML 模板文件。 通过 Ajax 异步加载大量的模板将严重拖慢一个客户端应用的速度。模板加载后，AngularJS 会将它默认缓存到 `$templateCache` 服务中。在实际生产中，可以提前将模板组织到一个 JS 文件中，这样就不需要通过 XHR 来加载模板了。详见34章。

#### replace （布尔型，Deprecated）

默认 false。

#### scope （布尔型或对象）

指令嵌套并不一定意味着需要改变它的作用域。默认情况下，指令会被付予访问父 DOM 元素对应的作用域的能力。

* 当设置为 true 时，会从父作用域继承并创建一个新的作用域对象。
* 当设置为一个对象时，则会创建一个独立作用域。

#### transclude （true | 'element'）

嵌入通常用来创建可复用的组件，典型的例子是模态对话框或导航栏。

设置为 `true` 时，指令所在 DOM 内部内容不会被干掉，而是放到了指令模板中 `ngTransclude` 指令所在 DOM 的内部。  
设置为 `'element'` 时，`template` 配置项会被忽略。

特别注意：放入指令模板 `ngTransclude` 内部的内容，其作用域仍然是 **父作用域**。

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

#### controller （字符串或函数）

当设置为字符串时，会以字符串的值为名字，来查找注册在应用中的控制器的构造函数。
也可以在指令内部通过匿名构造函数的方式来定义一个内联的控制器。

```js
angular.module("myApp", [])
.controller("myController", ["$scope", function($scope) {
    $scope.greeting = {
        text: "hello AngularJS"
    };
}])
.directive("hello", function() {
    return {
        template: "<h3>{{greeting.text}}</h3>",
        scope: true,
        controller: "myController"
    };
});
```

我们可以将任意可以被注入的 AngularJS 服务传递给控制器。控制器中还有一些特殊的服务可以被注入到指令当中：
  * `$scope` 与指令元素相关联的当前作用域。
  * `$element` 当前指令对应的元素。
  * `$attrs` 由当前元素的属性组成的对象。
  * `$transclude` 嵌入链接函数 `function([scope], cloneLinkingFn, futureParentElement)`

#### controllerAs （字符串）

用来设置控制器的别名。这样就可以在视图中引用控制器，甚至无需注入 `$scope`。

```js
angular.module('myApp').controller('MainController', function() { this.name = "Ari"; });
```

```html
<div ng-controller="MainController as main">
    <input type="text" ng-model="main.name" />
    <span>{{ main.name }}</span>
</div>
```

这个参数看起来好像没什么大用，但它给了我们可以在路由和指令中创建匿名控制器的强大能力。这种能力可以将动态的对象创建成为控制器，并且这个对象是隔离的、易于测试的。例如，可以在指令中创建匿名控制器，如下所示：

```js
angular.module('myApp').directive('myDirective', function() {
    return {
        restrict: 'A',
        template: '<h4>{{myController.msg}}</h4>',
        controllerAs: 'myController',
        controller: function() { this.msg = "Hello World"; }
    };
});
```

#### require （字符串或数组）

Require another directive and inject its controller as the fourth argument to the linking function.

The name can be prefixed with:
  * (no prefix) - Locate the required controller on the current element. Throw an error if not found.
  * `?` - Attempt to locate the required controller or pass `null` to the link fn if not found.
  * `^` - Locate the required controller by searching the element and its parents. Throw an error if not found.
  * `^^` - Locate the required controller by searching the element's parents. Throw an error if not found.
  * `?^` - Attempt to locate the controller by searching the element and its parents or pass `null` if not found.
  * `?^^` - Attempt to locate the controller by searching the element's parents, or pass `null` if not found.

```js
myApp
.directive("d1", function() {
    return {
        // ...
        controller: ["$scope", function($scope) {
            this.yarn = function() { console.log("hello"); }
        }]
    };
})
.directive("d2", function() {
    return {
        // ...
        require: "d1",
        link: function(scope, iElement, attr, d1Ctr) {
            scope.clickFn = function() { d1Ctr.yarn(); }
        }
    };
});
```

#### compile （函数）

编译函数是用来处理需要修改模板 DOM 的情况的。因为大部分指令都不需要修改模板，所以这个函数不常用。

设置了 compile 属性后，指令配置对象中的 link 属性会被忽略掉，只执行 complie 函数返回的 link 函数。

在 compile 里面不要进行任何 DOM 变形之外的操作。原因：性能考虑、安全性考虑。

```js
function compile(tElement, tAttrs) {
    // 对 tElement 进行处理，此时 template 内容已经就位
}
```

#### link （对象或函数）

链接函数负责注册 DOM 事件和更新 DOM 数据。它是在模板被克隆之后执行的，它也是大部分指令逻辑代码编写的地方。

参数：
  * `scope` - The scope to be used by the directive for registering watches
  * `iElement` - 实例元素。只有在 postLink 中对子元素进行操作才是安全的，因为那时所有子元素已经全部链接好。
  * `iAttrs` - 一个经标准化的、声明在当前元素上的属性列表，这些属性在该元素上的各链接函数间是共享的。
  * `controller` – 当前指令所依赖其它指令的控制器实例，用于多个嵌套指令之间的相互通信。该参数搭配 require 配置项使用。
  * `transcludeFn` - 此配置项同指令控制器中的 $transcludeFn 参数。

##### Pre-linking function

Executed before the child elements are linked. Not safe to do DOM transformation since the compiler linking function will fail to locate the correct elements for linking.

##### Post-linking function

Executed after the child elements are linked.

此时操作含有带  `templateUrl` 配置项指令的子元素仍然是不安全的，因为不管模板是否缓存，编译和链接都是异步完成的。

Note that child elements that contain `templateUrl` directives will not have been compiled and linked since they are waiting for their template to load asynchronously and their own compilation and linking has been suspended until that occurs.

### 10.2 隔离作用域与绑定策略

#### 隔离作用域

`scope` 属性设置为一个对象时就创建了一个隔离作用域(没有继承其他作用域的单独作用域)，这样指令的模板就无法访问外部作用域了。

具有隔离作用域的指令最主要的使用场景是创建可复用的组件，组件可以在未知上下文中使用，并且可以避免污染所处的外部作用域或不经意地污染内部作用域。

#### 绑定策略

使用无数据的隔离作用域并不常见。AngularJS 提供了几种方法能够将指令内部的隔离作用域，同指令外部的作用域进行数据绑定。

* **本地作用域属性**：使用 `@` 符号将本地作用域同 DOM 属性的值进行绑定。
* **双向绑定**：通过 `=` 可以将本地作用域上的属性同父级作用域上的属性进行双向的数据绑定。
* **父级作用域绑定**：通过 `&` 符号可以对父级作用域进行绑定，以便在其中运行函数。

注：`=?` 中的 `?` 表示为可选属性，如不加，当缺失时会报错 https://stackoverflow.com/questions/20447786/

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
          alias: "@name",  // 内外可以使用不同的名字
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

#### 关于 "&" 绑定的疑问

个人理解，`&` 绑定的用法，在于取得

```html
<div ng-controller="myController">
    <hello yarn="sayHello(name)"></hello>
</div>
<script>
    var myApp = angular.module("myApp", []);
    myApp.controller("myController", ["$scope", function($scope){
        $scope.name = 'gavin';
        $scope.sayHello = function(name) {
            console.log("hello " + name);
        };
    }]);
    myApp.directive("hello", function() {
        return {
            restrict: "EA",
            template: '<div>' +
                      '    <button ng-click="clickFn1()">yarn1</button>' +
                      '    <button ng-click="clickFn2()">yarn2</button>' +
                      '</div>',
            replace: true,
            scope: {
                yarn: "&"
            },
            compile: function (tElem, tAttrs) {
                return function postLink(scope, iElem) {
                    scope.clickFn1 = function() {
                        // 这种使用方法应该有待改进，但是从 API 设计角度是完胜的
                        angular.element(iElem.parent()).scope().$eval(tAttrs.yarn);
                    };
                    scope.clickFn2 = function() {
                        // 这种用法怪异，且与整体 API 设计不统一
                        scope.yarn({name: "张三"});
                    };
                }
            }
        };
    });
</script>
```

### 10.3 AngularJS 的生命周期

我们了解下 AngularJS 是如何编译解析指令的：

* 加载阶段
    * 加载 angular.js 源码，找到 `ng-app` 确定应用边界范围；
* 编译阶段：
    * 查找 `ng-app` 内所有指令，并保存在一个列表中；
    * 根据各个指令的优先级(priority属性)，对列表中指令排序；根据指令中的配置参数(template，replace，transclude等)转换 DOM，让指令“初具人形”；
    * 按顺序执行各指令配置对象中的 compile 函数。
* 链接阶段：执行合体后的link函数。

框架会在页面载入完毕的时候，根据 `ng-app` 划定的作用域来调用 `$compile` 服务进行编译，这个 $compile 就像一个大总管一样，清点作用域内的 DOM 元素，看看哪些元素上使用了指令，或者哪些元素本身就是个指令，或者使用了插值指令(即 `{{}}` interpolation directive)，$compile 会把清点好的财产做一个清单。

compile 函数中可以访问到 DOM 节点并进行操作，其主要职责就是进行 DOM 转换，每个 compile 函数执行完后都会返回一个 link 函数，这些 link 函数会被大总管汇合，组合成一个合体后的 link 函数。如果没有定义 compile 函数，那么就会将指令配置对象中的 link 函数放到合体后的 link 函数中。

所谓的链接，就是把 view 和 scope 链接起来。链接成啥样呢？就是我们熟悉的数据绑定，通过在 DOM 上注册监听器来动态修改 scope 中的数据，或者是使用 $watchs 监听 scope 中的变量来修改 DOM，从而建立双向绑定。

### 10.4 Transclusion

Transclusion is the process of extracting a collection of DOM elements from one part of the DOM and copying them to another part of the DOM, while maintaining their connection to the original AngularJS scope from where they were taken.

Transclusion 通常结合 `ngTransclude` 使用。跟直接操作 DOM 比，Transclusion 最大的特点(优势)是，to have private state for its template, while the transcluded content has access to its originating scope.

#### Transclusion Functions

When a directive requests transclusion, the compiler extracts its contents and provides a *transclusion function* to the directive's link function and controller. This transclusion function is a special *linking function* that will return the compiled contents linked to a new transclusion scope.

#### Transclusion Scopes

When you call a transclude function it returns a DOM fragment that is pre-bound to a transclusion scope. This scope is special, in that it is a child of the directive's scope (and so gets destroyed when the directive's scope gets destroyed) but it inherits the properties of the scope from which it was taken.

### 10.5 Attributes

Attributes 对象会作为参数传递给 `link()` 和 `compile()`，它有多项用途：
  * Accessing normalized attribute names: 得到的属性名是标准的驼峰格式
  * Directive inter-communication: 所有指令都共享一个属性实例对象，因此可用于指令见通信
  * Supports interpolation: 插值内容会预先进行解析
  * Observing interpolated attributes: `attrs.$observe()` 提供了跟踪属性值变更的途径

```js
function linkingFn(scope, elm, attrs, ctrl) {
  // get the attribute value
  console.log(attrs.ngModel);

  // change the attribute
  attrs.$set('ngModel', 'new value');

  // observe changes to interpolated attribute
  attrs.$observe('ngModel', function(value) {
    console.log('ngModel has changed value to ' + value);
  });
}
```

