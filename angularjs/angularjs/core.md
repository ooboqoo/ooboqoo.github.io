# 内核原理解读


## 启动过程

### 解析 HTML

```html
<!DOCTYPE html>                                                                  <!-- 开始解析页面 -->
<html lang="zh-CN" ng-app="myApp">
<head>
  <link rel="stylesheet" type="text/css" href="theme/css/bootstrap.min.css"/>
</head>
<body ng-controller="PhoneListCtrl">
  <ul>
    <li ng-repeat="phone in phones">
      <span>{{phone.name}}</span>
      <p>{{phone.snippet}}</p>
    </li>
  </ul>
  <script type="text/javascript" src="lib/jquery.js"></script>
  <script type="text/javascript" src="lib/angular.js"></script>                   <!-- 加载框架代码 -->
  <script type="text/javascript" src="src/js/yourBusiness.js"></script>           <!-- 加载业务代码 -->
</body>
</html>
```

### 加载框架代码

```js
(function(window, document, undefined) {
  'use strict';

  var angular = window.angular || (window.angular = {});  // 定义全局变量 angular

  // ...

  bindJQuery();                           // 绑定jQuery
  publishExternalAPI(angular);            // 定义一些API（公共方法、对象、模块）
  jqLite(document).ready(function() {     // 给document上绑定ready事件
    angularInit(document, bootstrap);
  });
})(window, document);
```

```js
function publishExternalAPI(angular) {
  extend(angular, {...});                          // 定义 angular.xxx 方法
  angularModule = setupModuleLoader(window);       // 定义 angular.module() 方法
  angularModule('ng', ['ngLocale'], ['$provide',   // 定义 ng 模块
    function ngModule($provide) {
      $provide.provider('$compile', $CompileProvider).directive({
        ngIf: ngIfDirective,
        ngRepeat: ngRepeatDirective,
        // ...
      });
      $provide.provider({
        $rootScope: $RootScopeProvider,
        $timeout: $TimeoutProvider,
        $window: $WindowProvider,
        $filter: $FilterProvider,
        $parse: $ParseProvider,
        $$jqLite: $$jqLiteProvider,
        // ...
      });
    }
  ]);
}
```

```js
function setupModuleLoader(window) {

    var $injectorMinErr = minErr('$injector');
    var ngMinErr = minErr('ng');

    function ensure(obj, name, factory) {
        return obj[name] || (obj[name] = factory());
    }

    var angular = ensure(window, 'angular', Object);

    // We need to expose `angular.$$minErr` to modules such as `ngResource` that reference it during bootstrap
    angular.$$minErr = angular.$$minErr || minErr;

    return ensure(angular, 'module', function() {
        /** @type {Object.<string, angular.Module>} */
        var modules = {};

        return function module(name, requires, configFn) {
            var assertNotHasOwnProperty = function(name, context) {
                if (name === 'hasOwnProperty') {
                    throw ngMinErr('badname', 'hasOwnProperty is not a valid {0} name', context);
                }
            };

            assertNotHasOwnProperty(name, 'module');
            if (requires && modules.hasOwnProperty(name)) {
                modules[name] = null;
            }
            return ensure(modules, name, function() {
                if (!requires) {
                    throw $injectorMinErr('nomod', "Module '{0}' is not available! You either misspelled " +
                        "the module name or forgot to load it. If registering a module ensure that you " +
                        "specify the dependencies as the second argument.", name);
                }

                // 第一三个缓存内容的变量(这三个变量非常重要)
                var invokeQueue = [];  // 保存在该模块上定义的所有服务、控制器、过滤器、指令等
                var configBlocks = []; // 保存在该模块上通过 config 方法添加的配置函数
                var runBlocks = [];    // 保存在该模块上通过 run 方法添加的初始化函数

                var config = invokeLater('$injector', 'invoke', 'push', configBlocks);

                // 定义模块实例对象，含值类属性5个，方法类属性12个
                var moduleInstance = {
                    // Private state
                    _invokeQueue: invokeQueue,
                    _configBlocks: configBlocks,
                    _runBlocks: runBlocks,

                    requires: requires,
                    name: name,

                    provider: invokeLaterAndSetModuleName('$provide', 'provider'),
                    factory: invokeLaterAndSetModuleName('$provide', 'factory'),
                    service: invokeLaterAndSetModuleName('$provide', 'service'),
                    value: invokeLater('$provide', 'value'),
                    constant: invokeLater('$provide', 'constant', 'unshift'),
                    decorator: invokeLaterAndSetModuleName('$provide', 'decorator'),
                    animation: invokeLaterAndSetModuleName('$animateProvider', 'register'),
                    filter: invokeLaterAndSetModuleName('$filterProvider', 'register'),
                    controller: invokeLaterAndSetModuleName('$controllerProvider', 'register'),
                    directive: invokeLaterAndSetModuleName('$compileProvider', 'directive'),
                    config: config,
                    run: function(block) { runBlocks.push(block); return this; }
                };

                // 如果 angular.module() 方法定义了第三个参数，将其传递给 config 函数
                if (configFn) { config(configFn); }

                return moduleInstance;

                /**
                 * @param {string} provider
                 * @param {string} method
                 * @param {String=} insertMethod
                 * @returns {angular.Module}
                 */
                function invokeLater(provider, method, insertMethod, queue) {
                    if (!queue) queue = invokeQueue;
                    return function() {
                        queue[insertMethod || 'push']([provider, method, arguments]);
                        return moduleInstance;
                    };
                }

                /**
                 * @param {string} provider
                 * @param {string} method
                 * @returns {angular.Module}
                 */
                function invokeLaterAndSetModuleName(provider, method) {
                    return function(recipeName, factoryFunction) {
                        if (factoryFunction && isFunction(factoryFunction)) factoryFunction.$$moduleName = name;
                        invokeQueue.push([provider, method, arguments]);
                        return moduleInstance;
                    };
                }
            });
        };
    });
}
```


### 加载业务代码

这里边一般会用到 AngularJS 的内容：
  * 定义模块
  * 创建服务
  * 创建控制器
  * 创建指令
  * 创建过滤器
  * 调用 config 配置函数
  * 调用 run 函数

```js
var myModule = angular.module('myModule', ['ui.router']);
myModule.service('dataService', [function () {
  var _books = {
    id001: { name: 'Learn AngularJS', price: 49.50 }
  };
  this.getBook(id) = function () { return _book[id] || null; }
}]);
myModule.service('utilService', utilService);
myModule.controller('myController', ['$scope', 'dataService', function ($scope, data) {
  var book = data.getBook('id001');
  var discount = 0.5;
  $scope.name = book.name;
  $scope.price = book.price * discount;
}]);
myModule.run(['$rootScope', function($rootScope) {
  console.log('myModule initialization completed.');
}]);

console.log(myModule);  // 注意观察 _invokeQueue 变量

function utilService() { this.count = function (str) { return str.length; } }
```

```html
<div>书名: {{name}}; 当前销售价: {{price | currency:'$'}}</div>
```

### 框架开始更新页面

在 HTML 解析完毕后，DOM 树构建完毕，触发 `$(document).ready()`，即开始执行在框架代码加载时注册的监听函数 `angularInit(document, bootstrap)`，框架正式开始工作来更新(初始化)页面。

```js
// 尝试自动从 ng-app 元素启动，如果自动启动失败，则需要手动在 js 中通过 angular.bootstrap() 启动
function angularInit(element, bootstrap) {
    var appElement, module, config = {};
    forEach(ngAttrPrefixes, function(prefix) {
        var name = prefix + 'app';
        var candidate;
        if (!appElement && (candidate = element.querySelector('[' + name.replace(':', '\\:') + ']'))) {
            appElement = candidate;
            module = candidate.getAttribute(name);
        }
    });
    if (appElement) {
        config.strictDi = getNgAttribute(appElement, "strict-di") !== null;
        bootstrap(appElement, module ? [module] : [], config);
    }
}
```

```js
var doBootstrap = function() {
    element = jqLite(element);
    // 如果启动元素上已经存在注射器了，说明是重复启动，报错
    if (element.injector()) {
        var tag = (element[0] === document) ? 'document' : startingTag(element);
        throw ngMinErr(
            'btstrpd',
            "App Already Bootstrapped with this Element '{0}'",
            tag.replace(/</,'&lt;').replace(/>/,'&gt;'));
    }
    // 给参数modules数组添加元素
    modules = modules || [];
    modules.unshift(['$provide', function($provide) {
        $provide.value('$rootElement', element);
    }]);
    modules.unshift('ng');  // 自动添加对 ng 模块的依赖，所以自己写模块时无需声明此依赖
    // 创建注入器
    var injector = createInjector(modules, config.strictDi);
    // 调用 invoke 方法，将 $rootScope 绑定到 $rootElement，并启动编译 compile(element)(scope)
    injector.invoke(['$rootScope', '$rootElement', '$compile', '$injector',
        function bootstrapApply(scope, element, compile, injector) {
            scope.$apply(function() {
                element.data('$injector', injector);
                compile(element)(scope);
            });
        }]
    );
    return injector;
};
```

createInjector() 函数一共做了6件事：
  1. 创建缓存变量 providerCache
  2. 创建提供者注入器 providerInjector
  3. 创建缓存变量 instanceCache
  4. 创建实例注入器 instanceInjector
  5. 加载模块
  6. 返回注入器 instanceInjector

```js
function createInjector(modulesToLoad, strictDi) {
    strictDi = (strictDi === true);
    var INSTANTIATING = {},
        providerSuffix = 'Provider',
        path = [],
        loadedModules = new HashMap([], true),
        // 所有服务的 provider 的缓存在这里
        providerCache = {
            $provide: {
                provider: supportObject(provider),
                factory: supportObject(factory),
                service: supportObject(service),
                value: supportObject(value),
                constant: supportObject(constant),
                decorator: decorator
            }
        },
        providerInjector = (providerCache.$injector =
            createInternalInjector(providerCache, function(serviceName, caller) {
                if (angular.isString(caller)) {
                    path.push(caller);
                }
                throw $injectorMinErr('unpr', "Unknown provider: {0}", path.join(' <- '));
            })),
        // 服务实例对象缓存在这
        instanceCache = {},
        instanceInjector = (instanceCache.$injector =
            createInternalInjector(instanceCache, function(serviceName, caller) {
                var provider = providerInjector.get(serviceName + providerSuffix, caller);
                return instanceInjector.invoke(provider.$get, provider, undefined, serviceName);
            }));


    forEach(loadModules(modulesToLoad), function(fn) { if (fn) instanceInjector.invoke(fn); });

    return instanceInjector;

    ////////////////////////////////////
    // $provider
    ////////////////////////////////////

    function supportObject(delegate) {
        return function(key, value) {
            if (isObject(key)) {
                forEach(key, reverseParams(delegate));
            } else {
                return delegate(key, value);
            }
        };
    }

    function provider(name, provider_) {
        assertNotHasOwnProperty(name, 'service');
        if (isFunction(provider_) || isArray(provider_)) {
            provider_ = providerInjector.instantiate(provider_);
        }
        if (!provider_.$get) {
            throw $injectorMinErr('pget', "Provider '{0}' must define $get factory method.", name);
        }
        return providerCache[name + providerSuffix] = provider_;
    }

    function enforceReturnValue(name, factory) {
        return function enforcedReturnValue() {
            var result = instanceInjector.invoke(factory, this);
            if (isUndefined(result)) {
                throw $injectorMinErr('undef', "Provider '{0}' must return a value from $get factory method.", name);
            }
            return result;
        };
    }

    function factory(name, factoryFn, enforce) {
        return provider(name, {
            $get: enforce !== false ? enforceReturnValue(name, factoryFn) : factoryFn
        });
    }

    function service(name, constructor) {
        return factory(name, ['$injector', function($injector) {
            return $injector.instantiate(constructor);
        }]);
    }

    function value(name, val) { return factory(name, valueFn(val), false); }

    function constant(name, value) {
        assertNotHasOwnProperty(name, 'constant');
        providerCache[name] = value;
        instanceCache[name] = value;
    }

    function decorator(serviceName, decorFn) {
        var origProvider = providerInjector.get(serviceName + providerSuffix),
            orig$get = origProvider.$get;

        origProvider.$get = function() {
            var origInstance = instanceInjector.invoke(orig$get, origProvider);
            return instanceInjector.invoke(decorFn, null, {$delegate: origInstance});
        };
    }

    ////////////////////////////////////
    // Module Loading
    ////////////////////////////////////
    function loadModules(modulesToLoad) {
        assertArg(isUndefined(modulesToLoad) || isArray(modulesToLoad), 'modulesToLoad', 'not an array');
        var runBlocks = [], moduleFn;
        forEach(modulesToLoad, function(module) {
            if (loadedModules.get(module)) return;
            loadedModules.put(module, true);

            function runInvokeQueue(queue) {
                var i, ii;
                for (i = 0, ii = queue.length; i < ii; i++) {
                    var invokeArgs = queue[i],
                        provider = providerInjector.get(invokeArgs[0]);

                    provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                }
            }

            try {
                if (isString(module)) {
                    moduleFn = angularModule(module);
                    runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
                    runInvokeQueue(moduleFn._invokeQueue);
                    runInvokeQueue(moduleFn._configBlocks);
                } else if (isFunction(module)) {
                    runBlocks.push(providerInjector.invoke(module));
                } else if (isArray(module)) {
                    runBlocks.push(providerInjector.invoke(module));
                } else {
                    assertArgFn(module, 'module');
                }
            } catch (e) {
                if (isArray(module)) {
                    module = module[module.length - 1];
                }
                if (e.message && e.stack && e.stack.indexOf(e.message) == -1) {
                    // Safari & FF's stack traces don't contain error.message content
                    // unlike those of Chrome and IE
                    // So if stack doesn't contain message, we create a new string that contains both.
                    // Since error.stack is read-only in Safari, I'm overriding e and not e.stack here.
                    /* jshint -W022 */
                    e = e.message + '\n' + e.stack;
                }
                throw $injectorMinErr('modulerr', "Failed to instantiate module {0} due to:\n{1}",
                    module, e.stack || e.message || e);
            }
        });
        return runBlocks;
    }

    ////////////////////////////////////
    // internal Injector
    ////////////////////////////////////

    function createInternalInjector(cache, factory) {

        function getService(serviceName, caller) {
            if (cache.hasOwnProperty(serviceName)) {
                if (cache[serviceName] === INSTANTIATING) {
                    throw $injectorMinErr('cdep', 'Circular dependency found: {0}',
                        serviceName + ' <- ' + path.join(' <- '));
                }
                return cache[serviceName];
            } else {
                try {
                    path.unshift(serviceName);
                    cache[serviceName] = INSTANTIATING;
                    return cache[serviceName] = factory(serviceName, caller);
                } catch (err) {
                    if (cache[serviceName] === INSTANTIATING) {
                        delete cache[serviceName];
                    }
                    throw err;
                } finally {
                    path.shift();
                }
            }
        }

        function invoke(fn, self, locals, serviceName) {
            if (typeof locals === 'string') {
                serviceName = locals;
                locals = null;
            }

            var args = [],
                $inject = createInjector.$$annotate(fn, strictDi, serviceName),
                length, i,
                key;

            for (i = 0, length = $inject.length; i < length; i++) {
                key = $inject[i];
                if (typeof key !== 'string') {
                    throw $injectorMinErr('itkn',
                        'Incorrect injection token! Expected service name as string, got {0}', key);
                }
                args.push(
                    locals && locals.hasOwnProperty(key)
                        ? locals[key]
                        : getService(key, serviceName)
                );
            }
            if (isArray(fn)) {
                fn = fn[length];
            }

            // http://jsperf.com/angularjs-invoke-apply-vs-switch
            // #5388
            return fn.apply(self, args);
        }

        function instantiate(Type, locals, serviceName) {
            // Check if Type is annotated and use just the given function at n-1 as parameter
            // e.g. someModule.factory('greeter', ['$window', function(renamed$window) {}]);
            // Object creation: http://jsperf.com/create-constructor/2
            var instance = Object.create((isArray(Type) ? Type[Type.length - 1] : Type).prototype || null);
            var returnedValue = invoke(Type, instance, locals, serviceName);

            return isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance;
        }

        return {
            invoke: invoke,
            instantiate: instantiate,
            get: getService,
            annotate: createInjector.$$annotate,
            has: function(name) {
                return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
            }
        };
    }
}
```


compile 函数源码解读



