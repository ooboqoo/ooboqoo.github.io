# Route

## 手动设置

```dart
void select(BuildContext context, String id) {
  Navigator.of(context).push(MaterialPageRoute(builder: () {
    return DetailsScreen(id);
  }));
}

void back(BuildContext context) {
  Navigator.of(context).pop();
}
```

## Named Route

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (ctx) => HomeScreen(),
        '/details': (ctx) => DetailssScreen(),
      },
    );
  }
}
```

### 传参

```dart
void select(BuildContext ctx) {
  Navigator.of(ctx).pushNamed('details', arguments: {'id': id})
}
```

```dart
class DetailsScreen extends StatelessWidget {
  Widget build(BuildContext context) {
    final routeArgs = ModalRoute.of(context).settings.arguments as Map<String, String>;
  }
}
```


