# Flutter Style Guide


### Widget constructor

Widget constructors *only use named arguments*. Named arguments can be marked as required using `@required`.

The first argument is `key`, and the last argument is `child`, `children`, or the equivalent.

Flutter 中的 constructor 都是放在 class 声明的开头，即，放在属性声明之前，这个跟平时习惯不一样。

```dart
class Bird extends StatefulWidget {
  const Bird({
    Key key,
    this.color = const Color(0xFFFFE306),
    this.child,
  }) : super(key: key);

  final Color color;
  final Widget child;

  _BirdState createState() => _BirdState();
}

class _BirdState extends State<Bird> {
  double _size = 1.0;

  void grow() {
    setState(() { _size += 0.1; });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: widget.color,
      transform: Matrix4.diagonal3Values(_size, _size, 1.0),
      child: widget.child,
    );
  }
}
```


