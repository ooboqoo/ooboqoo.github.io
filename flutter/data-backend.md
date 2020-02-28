# Data & Backend


## State management

https://flutter.dev/docs/development/data-and-backend/state-mgmt/options

Scope        | setState | Scoped Model | BLoC  | Redux
-------------|----------|--------------|-------|------
Local State  | No       | Maybe        | YES   | No
Global State | No       | No           | Maybe | YES

* 本地状态用 `setState`
* 全局业务状态用 package:redux/redux.dart
* 应用配置用 package:provider/provider.dart
* 功能模块状态用 package:provider/provider.dart 或 package:scoped_model/scoped_model.dart
* 异步事件和状态用 Stream + package:rxdart/rxdart.dart

scope_model provider flutter_redux 这些包底层都是依赖 `InheritedWidget` 来实现跨层级部件间的通信的。

### Think declaratively

Flutter is declarative. This means that Flutter builds its user interface to reflect the current state of your app.

When the state of your app changes, that triggers a redraw of the user interface, and the UI rebuilds from scratch. There is no imperative changing of the UI itself (like `widget.setText`).

<img src="images/ui-equals-function-of-state.png" width="381">

### Ephemeral vs App State

#### Ephemeral State

临时状态，也叫本地状态，包含了单个部件的状态，其他部件不会关心这个状态的内容。此时没必要搞复杂，一个 `StatefulWidget` 就搞定了，下次调用这个部件，我们也不会关心原来这个部件处于什么状态。

**Ephemeral state** (sometimes called **UI state** or **local state**) is the state you can neatly contain in a single widget.

Here, using `setState()` and a field inside the StatefulWidget’s State class is completely natural. No other part of your app needs to access `_index`. The variable only changes inside the `MyHomepage` widget. And, if the user closes and restarts the app, you don’t mind that `_index` resets to zero.

```dart
class MyHomepage extends StatefulWidget {
  @override
  _MyHomepageState createState() => _MyHomepageState();
}

class _MyHomepageState extends State<MyHomepage> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _index,
      onTap: (newIndex) {
        setState(() {
          _index = newIndex;
        });
      },
      // ... items ...
    );
  }
}
```

#### App State

State that is not ephemeral, that you want to share across many parts of your app, and that you want to keep between user sessions, is what we call **application state** (sometimes also called **shared state**).

对于应用级状态管理，没有一种万能的方式，这个要根据项目复杂度以及团队经验进行选择。

### Simple App State Management

Flutter has mechanisms for widgets to provide data and services to their descendants. As you would expect from Flutter, where Everything is a Widget, these mechanisms are just special kinds of widgets `InheritedWidget`, `InheritedNotifier`, `InheritedModel`, and more. We won’t be covering those here, because they are a bit low-level for what we’re trying to do.

Instead, we are going to use a package that works with the low-level widgets but is simple to use. It’s called provider. With provider, you don’t need to worry about callbacks or InheritedWidgets. But you do need to understand 3 concepts: `ChangeNotifier`, `ChangeNotifierProvider` and `Consumer`.

#### ChangeNotifier

`ChangeNotifier` is a simple class included in the Flutter SDK which provides change notification to its listeners. In other words, if something is a `ChangeNotifier`, you can subscribe to its changes. (It is a form of Observable.)

```dart
class CartModel extends ChangeNotifier {
  /// Internal, private state of the cart.
  final List<Item> _items = [];

  /// An unmodifiable view of the items in the cart.
  UnmodifiableListView<Item> get items => UnmodifiableListView(_items);

  /// The current total price of all items (assuming all items cost $42).
  int get totalPrice => _items.length * 42;

  /// Adds [item] to cart. This is the only way to modify the cart from outside.
  void add(Item item) {
    _items.add(item);
    // This call tells the widgets that are listening to this model to rebuild.
    notifyListeners();
  }
}
```

`ChangeNotifier` is part of `flutter:foundation` and doesn’t depend on any higher-level classes in Flutter. It’s *easily testable* (you don’t even need to use widget testing for it). For example, here’s a simple unit test of CartModel:

```dart
test('adding item increases total cost', () {
  final cart = CartModel();
  final startingPrice = cart.totalPrice;
  cart.addListener(() {
    expect(cart.totalPrice, greaterThan(startingPrice));
  });
  cart.add(Item('Dash'));
});
```

#### ChangeNotifierProvider

`ChangeNotifierProvider` is the widget that provides an instance of a `ChangeNotifier` to its descendants. It comes from the provider package.

```dart
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CartModel(),
      child: MyApp(),
    ),
  );
}
```

If you want to provide more than one class, you can use `MultiProvider`:

```dart
void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => CartModel()),
        Provider(create: (context) => SomeOtherClass()),
      ],
      child: MyApp(),
    ),
  );
}
```

#### Consumer

```dart
return Consumer<CartModel>(
  builder: (context, cart, child) {
    return Text("Total price: ${cart.totalPrice}");
  },
);
```

#### Provider.of

Sometimes, you don’t really need the data in the model to change the UI but you still need to access it. For this use case, we can use `Provider.of`, with the `listen` parameter set to false. Using the blow line in a build method will not cause this widget to rebuild when `notifyListeners` is called.

```dart
Provider.of<CartModel>(context, listen: false).add(item);
```


#### Counter Demo

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    ),
  );
}

class Counter with ChangeNotifier {
  int value = 0;

  void increment() {
    value += 1;
    notifyListeners();
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Demo Home Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('You have pushed the button this many times:'),
            Consumer<Counter>(
              builder: (context, counter, child) => Text('${counter.value}'),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Provider.of<Counter>(context, listen: false).increment(),
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```


### Redux

For dealing with local state BLoC is best recommended, while for Global state, Redux is highly recommended.

在 React 等单向数据流框架下，Redux 作为一种流行的状态管理的架构风格，已经过多方面的验证，其基本思想和步骤是：
* 整个页面甚至 APP 是一个 *巨大* 的状态机，有一个状态存储 Store ，在某个时刻处于某种状态。
* 状态是一个简单的树型结构，跟 View Tree 对应。
* View 操作不能直接修改状态，只能通过发送 Action, 间接改变 Store。
* Reducer 通过 Action 加上 oldState 获取 newSate，约等于 State = f(action+oldState)。

注：个人感觉 Redux 的时间复杂度是 O(N)，什么东西都往里塞，性能有影响也不好维护，个人观点是只有真正全局级别的业务状态才往里塞比较好，感觉这块争议也是蛮多的，没仔细研究过。

### BLoC / Rx

https://pub.dev/packages/rxdart  
http://reactivex.io/  
http://flutterdevs.com/blog/bloc-pattern-in-flutter-part-1/  

个人感觉不用太关注 BLoC，Dart 内置的 Stream 倒是可以用起来的，处理用户输入等还是比较方便。

**BLoC** a.k.a <b>B</b>usiness <b>Lo</b>gic <b>C</b>omponents is a design pattern presented from Google at the DartConf 2018.
Initially, BLoC pattern was conceived to allow the reuse of the very same code independently of the platform: web application, mobile application, back-end. So yeah, this pattern was developed aiming to ease the workload on developers end while developing apps for a different platform with the idea of code reusability.

> Flutter & AngularDart Code Sharing -- 50%  https://youtu.be/PLHln7wHgPE
>
> BLoC design guidelines
> * Inputs and outputs are *simple Streams/Sinks only*
> * Dependencies must be *injectalbe* and *platform agnostic*
> * *No platform branching* allowed
> * Implementation can be whatever you want if you fllow the previous rules
>
> UI design guidelines
> * Each "complex enough" component *has a corresponding BLoC*
> * Components should send *inputs "as is"*
> * Components should show *outputs as close as possible to "as is"*
> * All branching should be based on *simple BLoC boolean outputs*



## JSON and serialization

Dart 下面的 JSON 类型是字符串，使用时需要 `json.encode()` `json.decode()` 进行转换。其实跟 JavaScript 下使用 `JSON.stringify()` `JSON.parse()` 在字符串和对象间互转比较相似。

#### Use manual serialization for smaller projects

Manual JSON decoding refers to using the built-in JSON decoder in dart:convert. It involves passing the raw JSON string to the jsonDecode() function, and then looking up the values you need in the resulting Map<String, dynamic>. It has no external dependencies or particular setup process, and it’s good for a quick proof of concept.

```dart
import 'dart:convert';

const jsonString = '''
{
  "name": "John Smith",
  "email": "john@example.com"
}
''';

void main() {
  String objStr = json.encode({'age': 33});
  List<dynamic> arr = json.decode('[1, 2]');
  print(objStr);
  print(arr);

  Map<String, dynamic> user = jsonDecode(jsonString);
  print('Howdy, ${user['name']}!');
}
```

Unfortunately, `jsonDecode()` returns a `Map<String, dynamic>`, meaning that you do not know the types of the values until runtime. With this approach, you lose most of the statically typed language features: type safety, autocompletion and most importantly, compile-time exceptions. Your code will become instantly more error-prone.

#### Serializing JSON using code generation libraries

Although there are other libraries available, this guide uses the json_serializable, an automated source code generator that generates the JSON serialization boilerplate for you.

_pubspec.yaml_

```yaml
dependencies:
  # Your other regular dependencies here
  json_annotation: ^2.0.0

dev_dependencies:
  # Your other dev_dependencies here
  build_runner: ^1.0.0
  json_serializable: ^2.0.0
```



## Firebase

Firebase is a Backend-as-a-Service (BaaS) app development platform that provides hosted backend services such as a realtime database, cloud storage, authentication, crash reporting, machine learning, remote configuration, and hosting for your static files.

### Persistence

* Storing key-value data on disk, using [shared_preferences](https://flutter.dev/docs/cookbook/persistence/key-value)
* Store large data you should go with [SQLITE](https://flutter.dev/docs/cookbook/persistence/sqlite)
* You can always use [firebase](https://firebase.google.com/) database which is available offline
* Since we are talking about local storage you can always read and write files to the disk


