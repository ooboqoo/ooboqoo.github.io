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


































