# Require.js

## AngularJS & ACE

https://coderwall.com/p/edwd4g/angular-using-requirejs-amd

AngularJS 没有遵循 AMD 模块化规范，因此使用 RequireJS 加载 AngularJS 时需要一些额外的配置。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <style>
      .ng-cloak {display: none; }
      #ace { position: relative; width: 500px; height: 400px; border: 1px solid #ccc; }
    </style>
</head>

<body ng-controller="myCtrl" class="ng-cloak">
    <div id="ace" ng-click="log()">SELECT * from my_table;</div>
    <script src="vendor/require.js" data-main="main"></script>
</body>
</html>
```

main.js

```js
requirejs.config({
    shim: {
        angular: {exports: 'angular'},
        ace: {exports: "ace"},
        language_tools: {deps: ['ace']}
    },
    paths: {
        'angular': 'vendor/angular',
        'ace': 'vendor/ace/src/ace',
        'language_tools': 'vendor/ace/src/ext-language_tools'
    }
});

requirejs(['angular', './editor.js'], function (angular, editor) {
    var app = angular.module('editor', []);

    app.controller('myCtrl', function ($scope) {
        $scope.log = function () { console.log(editor.getValue()); };
    });

    angular.bootstrap(document.body, ['editor']);
});
```

editor.js

```js
define(['ace', 'language_tools'], function(ace) {
    var editor = ace.edit('ace');
    editor.setTheme('ace/theme/sqlserver');
    editor.getSession().setMode("ace/mode/sql");
    console.log(editor);
    return editor;
});
```
