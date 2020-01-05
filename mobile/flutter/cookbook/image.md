# Images


## Network Image

```dart
Image.network('https://picsum.photos/250?image=9')
```

```dart
Image.network(
  'https://path/to/image',
  height: 250,
  width: double.infinity,
  fit: BoxFit.cover,
),
```





## Clip

图片裁剪

```dart
// 添加圆角
ClipRRect(
  borderRadius: BorderRadius.only(topLeft: Radius.circular(30), topRight: Radius.circular(30)),
  child: Image.network('https://picsum.photos/250?image=9'),
),
```



```dart
// 图片上添加文字
Stack(children: [
  ClipRRect(
    borderRadius: BorderRadius.only(
      topLeft: Radius.circular(30),
      topRight: Radius.circular(30),
    ),
    child: Image.network('https://picsum.photos/250?image=9'),
  ),
  Positioned(
    bottom: 20,
    child: Text('Picture Title'),
  ),
])
```