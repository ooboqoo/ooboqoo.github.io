# Navigation


## Navigator API

```dart
class Navigator extends StatefulWidget {
  @optionalTypeArgs
  static Future<T> push<T extends Object>(BuildContext context, Route<T> route) {
    return Navigator.of(context).push(route);
  }

  @optionalTypeArgs
  static bool pop<T extends Object>(BuildContext context, [ T result ]) {
    return Navigator.of(context).pop<T>(result);
  }

  static NavigatorState of(BuildContext context, {
    bool rootNavigator = false,
    bool nullOk = false,
  }) { }
}
```


## Navigate to a new screen and back

核心代码

```dart
// 跳转到新页面
Navigator.push(context, MaterialPageRoute(builder: (_) => MyPage()));
// 返回
Navigator.pop(context);
```


完整示例

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home Page')),
      body: FlatButton(
        child: Text('Go to MyPage'),
        color: Colors.blue,
        onPressed: () {
          Navigator.of(context)
              .push(MaterialPageRoute(builder: (_) => MyPage(title: 'My2 Page')));  // 核心代码
        },
      ),
    );
  }
}

class MyPage extends StatelessWidget {
  final String title;
  MyPage({this.title});
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(title: Text(title)));
  }
}
```



## Navigate with named routes

如何使用命名路由，以及如何传递数据

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      // home: HomePage(),
      // initialRoute: '/mypage',  // 使用这个设置还可以修改默认加载页面
      routes: {
        '/': (context) => HomePage(),     // 这一行可替代上面的 home 设置
        '/mypage': (context) => MyPage(), // 注册
      },
    );
  }
}

class HomePage extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home Page')),
      body: FlatButton(
        child: Text('Go to MyPage'),
        color: Colors.blue,
        onPressed: () {
          Navigator.of(context).pushNamed('/mypage', arguments: {'title': 'My Page'}); // 使用方式1
          Navigator.pushNamed(context, '/mypage', arguments: {'title': 'My Page'});    // 使用方式2
        },
      ),
    );
  }
}

class MyPage extends StatelessWidget {
  Widget build(BuildContext context) {
    final routeArgs =
        ModalRoute.of(context).settings.arguments as Map<String, String>;
    final title = routeArgs['title'];
    return Scaffold(appBar: AppBar(title: Text(title)));
  }
}
```

在页面中配置路由名

```dart
class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {
        MyPage.routeName: (context) => MyPage(),  // 使用
      },
    );
  }
}

class MyPage extends StatelessWidget {
  static const routeName = '/mypage';             // 配置
  // ...
}
```


## 路由监听

```dart
class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {/* ... */},
      // This is used if routes does not contain the requested route.
      onGenerateRoute: (settings) {
        print(settings);
        // todo: 这里还可以针对 settings.name 做很多文章
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            body: Center(child: Text('No route defined for ${settings.name}')),
          ),
        );
      },
    );
  }
}
```

位置命名路由处理

```dart
class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {/* ... */},
      // This is used if routes does not contain the requested route.
      // 跟 onGenerateRoute 不同的是，这里纯粹只处理异常，onGenerateRoute 和 onUnknownRoute 只能用其中一个
      onUnknownRoute: (settings) {
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            body: Center(child: Text('No route defined for ${settings.name}')),
          ),
        );
      },
    );
  }
}
```


## Return data from a screen


## Animating a widget across screens


