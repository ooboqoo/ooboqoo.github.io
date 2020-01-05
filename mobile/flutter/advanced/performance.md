# Peerformance & Optimization



## App size

Android

```bash
$ flutter build apk  # a fat APK with both 32-bit and 64-bit binaries
$ flutter build apk --target-platform=android-arm    # for 32-bit devices
$ flutter build apk --target-platform=android-arm64  # for 64-bit devices
$ flutter build apk --split-per-abi  # get 2 APKs, one for 32-bit and one for 64-bit
```
iOS

```bash
$ flutter build ios
$ tar -zcf build/app.ipa build/ios/iphoneos/Runner.app
$ ls -lh build/app.ipa
```

Some of the obvious things you can do to make your app smaller are:
* Remove unused resources
* Minimize resource imported from libraries
* Support a limited number of screen densities
* Compress PNG and JPEG files



## Rendering performance

Thanks in part to Flutter’s Skia engine and its ability to quickly create and dispose of widgets, Flutter applications are performant by default, so you only need to avoid common pitfalls to achieve excellent performance.

These best recommendations will help you write the most performant Flutter app possible.

### Controlling `build()` cost

* Avoid repetitive and costly work in build() methods since build() can be invoked frequently when ancestor Widgets rebuild.
* Avoid overly large single Widgets with a large build() function
  * Avoid calling `setState()` high up in the tree if the change is contained to a small part of the tree.
  * The traversal to rebuild all descendents stops when the same instance of the child widget as the previous frame is re-encountered. This technique is heavily used in inside the framework for optimizing animations where the animation doesn’t affect the child subtree.

### Apply effects only when needed

`saveLayer()` 在老的 GPU 上可能会特别慢，所以要尽量避免使用一些底层依赖 `saveLayer()` 的 Widget.

* Use the `Opacity` widget only when necessary. Applying opacity directly to an image is faster than using the `Opacity` widget.
* `Clip` doesn't call saveLayer() so aren't expensive as Opacity, but clipping is still constly.
* Other widgets that might trigger saveLayer() and are potentially costly: ShaderMask ColorFilter Chip Text.

### Render grids and lists lazily

Use the lazy methods, with callbacks, when building large grids or lists. That way only the visible portion of the screen is built at startup time.

### Build and display frames in 16ms

Since there are two separate threads for building and rendering, you have 16ms for building, and 16ms for rendering on a 60Hz display.

Lowering the frame render time also improves battery life and thermal issues.

### Animation

Avoid using `Opacity` widget and particularly avoid it in an animation, use `AnimatedOpacity` or `FadeInImage` instead.

When using an AnimatedBuilder, avoid putting a sbutree in the builder function that builds widgets that don't depend on the animation. This subtree is rebuilt for every tick of the animation. Instead, build that part of the subtree once and pass it as a child to the AnimatedBuilder.

Avoid clipping in an animation. If possible, pre-clip the image before animating it.



## Widget Performance considerations

There are two primary categories of `StatefulWidget`s. The first is one which allocates resources in ·`State.initState()` and disposes of them in `State.dispose()`, but which does not depend on `InheritedWidget` or call `State.setState()`. Such widgets are commonly used at the root of an application or page, and communicate with subwidgets via `ChangeNotifier`s, `Stream`s, or other such objects. The second category is ...

There are several techniques one can use to minimize the impact of rebuilding a stateful widget.
* Push the state to the leaves.
* Minimize the number of nodes transitively created by the build method and any widgets it creates.
* If a subtree does not change, cache the widget and re-use it.
* Use `const` widgets where possible. This is equivalent to caching a widget and re-using it.
* Avoid changing the depth of any created subtrees or changing the type of any widgets in the subtree. If the depth must be changed for some reason, consider wrapping the common parts of the subtrees in widgets that have a GlobalKey that remains consistent for the life of the stateful widget.

In the case of state change(i.e `setState()`), `const widget` does not rebuild again. Consts are canonicalized, no matter how often your app executes `const EdgeInsets.only(top: 8.0)` there will always be ever a single instance.







## Performance profiling

### Diagnosing performance problems

To diagnose an app with performance problems, make sure you’re running in *profile mode*, and choose the *slowest device* that your users might use. And then go to the DevTools *Timeline* view to look at the UI and GPU threads.

### Run in profile mode

In Android Studio and IntelliJ, use the *Run > Flutter Run main.dart in Profile Mode* menu item.  
In VS Code, open _launch.json_ and set the `"flutterMode"` property to `"profile"`, and delete it when done.  
From the command line, use the --profile flag: `flutter run --profile`.





