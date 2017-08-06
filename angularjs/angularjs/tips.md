# 待整理

### 声明周期钩子

貌似 AngularJS 没有声明周期钩子的概念，但通过 angular 和 ui-router 可变通实现一些声明周期的功能。

#### 状态跳转前清理

```
$scope.$on('$destroy', function() {
    // Do your cleanup here or call a function that does
});

$stateProvider.state({
  onEnter: onEnterFn,
  onExit: onExitFn,
   ...
});
```


angularjs 程序的组织框架，可以参考下 flink

https://github.com/apache/flink/tree/master/flink-runtime-web/web-dashboard

$watch 用法详解

https://stackoverflow.com/questions/22738482/angularjs-watch-root-scope-variable-for-changes/22738495


ui-router 默认子路由的用法

文档：https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions

问题处理：https://stackoverflow.com/questions/27120308/angular-ui-router-urlrouterprovider-when-not-working-when-i-click-a-ui-sref

$rootScope 上的监听器需要及时注销，不会随着 $scope 的销毁而销毁

https://stackoverflow.com/questions/23424381/how-to-unbind-on-in-angular

```js
angular.module("TestApp").controller("TestCtrl", function($scope, $rootScope) {
    var cleanUpFunc = $scope.$on('testListener', function() {
        //write your listener here
    });

    //code for cleanup
    $scope.$on('$destroy', function() {
        cleanUpFunc();
    });
})
```

像 `$stateChangeStart` `$viewContentLoaded` 这些事件监听器可以直接 `$on` 在 `$scope` 上，这样就可免去手动销毁的麻烦。



i18n

https://stackoverflow.com/questions/3084675/how-does-internationalization-work-in-javascript

https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_content_best_practices

AngularJS 国际化——Angular-translate  这个人是 Java Web + 大数据，可以关注其博客

http://www.cnblogs.com/xing901022/p/4989847.html


























