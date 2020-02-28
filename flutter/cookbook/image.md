# Images


## Image

### Network Image

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


### Clip

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



## Video

iOS Simulator 不支持，要拿真机试。另外 Android 和 iOS 都需要配置下。

```
import 'package:video_player/video_player.dart';

class VideoApp extends StatefulWidget {
  _VideoAppState createState() => _VideoAppState();
}
class _VideoAppState extends State<VideoApp> {
  VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.network('https://www.w3schools.com/html/mov_bbb.mp4')
      ..initialize().then((_) {
        setState(() { });  // Ensure the first frame is shown after initialized
      });
  };

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('3e2343211')),
        body: Center(
          child: _controller.value.initialized
              ? AspectRatio(
                  aspectRatio: _controller.value.aspectRatio,
                  child: VideoPlayer(_controller),
                )
              : Container(),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            setState(() {
              _controller.value.isPlaying ? _controller.pause() : _controller.play();
            });
          },
          child: Icon(_controller.value.isPlaying ? Icons.pause : Icons.play_arrow),
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }
}
```



## Webview

https://www.youtube.com/watch?v=RA-vLF_vnng

```dart
import 'package:webview_flutter/webview_flutter.dart';

WebView(
  initialUrl: 'https://ngapps.cn',
  javascriptMode: JavascriptMode.unrestricted,
  onPageStarted: (url) => print('Loading $url'),
  gestureRecognizers: Set()
    ..add(Factory<VerticalDragGestureRecognizer>(
        () => VerticalDragGestureRecognizer())),
)
```



## Canvas

```dart
final customPaint = CustomPaint(
  painter: myPainter(),
  child: SomeWidget(),
);

class MyPainter extends CustomPainter {
  @override
  void paint(ui.Canvas canvas, ui.Size size) {
    // TODO: implement paint
  }
  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    // TODO: implement shouldRepaint
    return null;
  }
}
```

