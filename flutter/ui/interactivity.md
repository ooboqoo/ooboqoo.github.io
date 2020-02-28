# Adding Interactivity


## Stateful and stateless widgets

A `StatefulWidget` is dynamic: for example, it can change its appearance in response to events triggered by user interactions or when it receives data. `Checkbox`, `Radio`, `Slider`, `InkWell`, `Form`, and `TextField` are examples of stateful widgets.

A widget’s state is stored in a `State` object, separating the widget’s state from its appearance. The state consists of values that can change, like a slider’s current value or whether a checkbox is checked. When the widget’s state changes, the state object calls `setState()`, telling the framework to redraw the widget.



## Creating a stateful widget

### `GlobalKey`

```dart
class HomePage extends StatefulWidget {
  final child = Counter(key: GlobalKey());  // 如果这里不传 GlobalKey，这每次 toggle，_count 状态会丢
  _HomePageState createState() => _HomePageState();
}
class _HomePageState extends State<HomePage> {
  var hasPadding = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Column(
        children: <Widget>[
          RaisedButton(
            child: Text('Toggle'),
            onPressed: () {
              setState(() {
                hasPadding = !hasPadding;
              });
            },
          ),
          hasPadding
              ? Padding(padding: const EdgeInsets.all(20), child: widget.child)
              : widget.child,
        ],
      ),
    );
  }
}

class Counter extends StatefulWidget {
  Counter({Key key}) : super(key: key);
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  var _count = 0;
  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Text('$_count'),
        RaisedButton(
          child: Text('Add'),
          onPressed: () {
            setState(() {
              _count++;
            });
          },
        )
      ],
    );
  }
}
```



## Managing state





