# State Management


## StatefulWidget life cycle

```dart
import 'package:flutter/material.dart';

class CounterNotifier with ChangeNotifier {
  int count = 0;
  void add() {
    count++;
    notifyListeners();
  }
}

class CounterProvider extends InheritedNotifier<CounterNotifier> {
  CounterProvider({Key key, @required Widget child})
      : super(key: key, notifier: CounterNotifier(), child: child);
  static CounterNotifier of(BuildContext context) {
    final notifier = context.dependOnInheritedWidgetOfExactType<CounterProvider>().notifier;
    notifier.addListener(() {
      (context as Element).markNeedsBuild();
    });
    return notifier;
  }
}

class CounterApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return CounterProvider(child: MaterialApp(home: HomePage()));
  }
}
class HomePage extends StatefulWidget {
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  void add() {
    setState(() {
      CounterProvider.of(context).add();
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: MyText()),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: add,
      ),
    );
  }
}

class MyText extends StatefulWidget {
  _MyTextState createState() => _MyTextState();
}
class _MyTextState extends State<MyText> {
  void initState() {
    print('1. intiSate');
    super.initState();
    // stream: subscribe to receive notifications
    // [BuildContext.dependOnInheritedWidgetOfExactType] is not avaliable here
  }

  void didChangeDependencies() {
    super.didChangeDependencies();
    print('2. didChangeDepencies');
    // move expensive work here if it is too expensive to do for every build
  }

  // 先 didChangeDependencies 或 build 再 didUpdateWidget 最后还会补一次 build
  void didUpdateWidget(oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('3. didUpdateWidget');
    // stream: unsubscribe from the old object and subscribe to the new one
  }

  void dispose() {
    super.dispose();
    print('5. dispose');
    // stream: unsubcribe from object
  }

  Widget build(BuildContext context) {
    print('2. 4. build');
    return Text('${CounterProvider.of(context).count}');
  }
}
```



## Provider

注: While you can have multiple providers sharing the same type, a widget will be able to obtain *only one of them: the closest ancestor*.

```dart
// Mostly used
ChangeNotifierProvider(
  create: (context) => MyChangeNotifier(),
  child: ...
)

// Reusing an existing object instance
Products products = Products();
ChangeNotifierProvider.value{
  value: products,
  child: ...
}

// MultiProvider
// 只是语法糖，实际还是 Provider<Something>(child: Provider<SomethingElse>)
MultiProver(
  providers: [
    Provider<Something>(create: (_) => Something()),
    Provider<SomethinElse>(create: (_) => SomethingElse()),
  ],
  child: ...
)
```

```dart
// Reading a value never change
final addProduct = Provider.of<Products>(context, listen: false).addProduct;

// Performance optimization `Consumer.child`
Foo(
  child: Consumer<A>(
    builder: (_, a, child) => Bar(a: a, child: child),  // only `Bar` rebuild when `A` updates
    child: Baz(),
  ),
)

// Performance optimization `Selector`
Selector<List, int>(
  selector: (_, list) => list.length,  // only rebuild when the ength changes
  builder: (_, length, __) => Text('$length'),
)
```

```dart
// async operations like HTTP request
// WRONG
initState() {
  super.initState();
  Provider.of<Foo>(context).fetchSomething();  // 可能导致部分 Widget 用的老数据，部分 Widget 用的新数据，Exception
}
```



```dart
ProxyProvider


ProxyProvider2

```


## Redux





