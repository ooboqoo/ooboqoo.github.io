# PhoneCat 实例讲解

http://www.angularjs.net.cn/phonecat/

```
$ git clone --depth=14 https://github.com/angular/angular-phonecat.git
$ cd angular-phonecat
$ npm install
$ live-server ./app
```

## 引导程序

AngularJS 表达式 是一种类似于JavaScript的代码片段，AngularJS表达式 仅在 AngularJS 的作用域中运行。

## Angular 模板

### 视图和模板

`app/index.html`

```html
<html ng-app="phonecatApp">
<head>
  ...
  <script src="bower_components/angular/angular.js"></script>
  <script src="js/controllers.js"></script>
</head>
<body ng-controller="PhoneListCtrl">
  <ul>
    <li ng-repeat="phone in phones">
      <span>{{phone.name}}</span>
      <p>{{phone.snippet}}</p>
    </li>
  </ul>
</body>
</html>
```

### 模板和控制器

`app/js/controllers.js`

```js
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope) {
  $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM? with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM?',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});
```

虽然控制器没有做太多的事情，但是它扮演了一个至关重要的角色。通过为我们的上下文提供数据模块，控制器允许我们在模块和视图之间建立数据绑定。

#### 作用域

Angular 使用作用域，以及模板、数据模块和控制器中包含的信息，以保持模块和视图分离，但是同步。任何对模块的改变会影响视图；任何在视图中发生的改变反应在模块中。


