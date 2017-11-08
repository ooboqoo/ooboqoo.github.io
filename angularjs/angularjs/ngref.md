<style>
  td:first-child { color: red; }
</style>

# AngularJS 速查手册

## Module

```js
angular.module(name: string, requires: string[]);  // 创建模块(提供2个参数)
angular.module(name: string);                      // 获取模块(提供1个参数)

// run()
angular.module('myApp', []).run(function ($rootScope) {
    $rootScope.name = "World";
});
```


## Directive / 模板语法

||||
|----------------|--------------------------------|----------------------------------
| ng-app         | `ng-app="myApp"`               | 自动启动某个模块
| ng-bind        | `ng-bind="car.name"`           | 值绑定
| ng-model       | `ng-model="name"`              | 双向绑定
| ng-controller  | `ng-controller="myController"` | 声明所有被它包含的元素都属于某个控制器
| ng-click       | `ng-click="add(1)"`            | 绑定事件


## Service 内置服务

当用 `$watch` 进行监听时，AngularJS 会对表达式或函数进行运算。
$watch 函数会监视 $scope 上的某个属性。只要属性发生变化就会调用对应的函数。

AngularJS 会在运行 `$digest` 循环的过程中自动解析表达式。

将 `$parse` 服务注入到控制器中，然后调用它就可以实现手动解析表达式。

要在字符串模板中做插值操作，需要在你的对象中注入 `$interpolate` 服务。

```html
<div ng-controller="MyController">
  <input ng-model="to" 
        type="email" 
        placeholder="Recipient" />
  <textarea ng-model="emailBody"></textarea>
  <pre>{{ previewText }}</pre>
</div>
<script>
angular.module('myApp', []).controller('MyController', function($scope, $interpolate) {
    $scope.to = 'ari@fullstack.io';
    $scope.emailBody = 'Hello {{ to }},\n\nMy name is Ari too!';
    $scope.$watch('emailBody', function(body) {
      if (body) {
        var template = $interpolate(body);
        $scope.previewText = template({to: $scope.to});
      }
    });
});
</script>
```


## 过滤器

