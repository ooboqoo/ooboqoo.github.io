# Platform Integration

This guide describes how to write custom platform-specific code. Some platform-specific functionality is available through existing packages.

Flutter’s platform-specific API support rely on a flexible *message* passing style. Messages are passed between the client (UI) and host (platform) using platform channels. Messages and responses *are passed asynchronously*, to ensure the user interface remains responsive. Whenever you invoke a channel method, you must invoke that method on the platform’s *main thread*.

On the client side, `MethodChannel` enables sending messages that correspond to method calls. On the platform side, `MethodChannel` on Android and `FlutterMethodChannel` on iOS enable receiving method calls and sending back a result. If desired, *method calls can also be sent in the reverse direction*, with the platform acting as client to methods implemented in Dart.


## Example: fetch battery level

### Create the Flutter platform client

```dart
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class PlatformChannel extends StatefulWidget {
  @override
  _PlatformChannelState createState() => _PlatformChannelState();
}

class _PlatformChannelState extends State<PlatformChannel> {
  static const MethodChannel methodChannel = MethodChannel('samples.flutter.io/battery');
  static const EventChannel eventChannel = EventChannel('samples.flutter.io/charging');

  String _batteryLevel = 'Battery level: unknown.';
  String _chargingStatus = 'Battery status: unknown.';

  Future<void> _getBatteryLevel() async {
    try {
      final int result = await methodChannel.invokeMethod('getBatteryLevel');
      setState(() { _batteryLevel = 'Battery level: $result%.'; });
    } on PlatformException {
      setState(() { _batteryLevel = 'Failed to get battery level.'; });
    }
  }

  @override
  void initState() {
    super.initState();
    eventChannel.receiveBroadcastStream().listen((Object event) {
      String status = "Battery status: ${event == 'charging' ? '' : 'dis'}charging.";
      setState(() { _chargingStatus = status; });
    }, onError: (Object error) {
      setState(() { _chargingStatus = 'Battery status: unknown.'; });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(_batteryLevel, key: const Key('Battery level label')),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: RaisedButton(
                  child: const Text('Refresh'),
                  onPressed: _getBatteryLevel,
                ),
              ),
            ],
          ),
          Text(_chargingStatus),
        ],
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(home: PlatformChannel()));
}
```

### Add an Android implementation


### Add an iOS Swift implementation

```swift
import UIKit
import Flutter

enum ChannelName {
  static let battery = "samples.flutter.io/battery"
  static let charging = "samples.flutter.io/charging"
}
enum BatteryState {
  static let charging = "charging"
  static let discharging = "discharging"
}

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate, FlutterStreamHandler {
  private var eventSink: FlutterEventSink?

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    guard let controller = window?.rootViewController as? FlutterViewController else {
      fatalError("rootViewController is not type FlutterViewController")
    }
    let batteryChannel = FlutterMethodChannel(name: ChannelName.battery,
                                              binaryMessenger: controller.binaryMessenger)
    batteryChannel.setMethodCallHandler({
      [weak self] (call: FlutterMethodCall, result: FlutterResult) -> Void in
      guard call.method == "getBatteryLevel" else {
        result(FlutterMethodNotImplemented)
        return
      }
      self?.receiveBatteryLevel(result: result)
    })

    let chargingChannel = FlutterEventChannel(name: ChannelName.charging,
                                              binaryMessenger: controller.binaryMessenger)
    chargingChannel.setStreamHandler(self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  private func receiveBatteryLevel(result: FlutterResult) {
    let device = UIDevice.current
    device.isBatteryMonitoringEnabled = true
    guard device.batteryState != .unknown  else {
      result(FlutterError(code: "UNAVAILABLE", message: "Battery info unavailable", details: nil))
      return
    }
    result(Int(device.batteryLevel * 100))
  }

  public func onListen(withArguments arguments: Any?,
                       eventSink: @escaping FlutterEventSink) -> FlutterError? {
    self.eventSink = eventSink
    UIDevice.current.isBatteryMonitoringEnabled = true
    sendBatteryStateEvent()
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(AppDelegate.onBatteryStateDidChange),
      name: UIDevice.batteryStateDidChangeNotification,
      object: nil)
    return nil
  }

  @objc private func onBatteryStateDidChange(notification: NSNotification) {
    sendBatteryStateEvent()
  }

  private func sendBatteryStateEvent() {
    guard let eventSink = eventSink else { return }

    switch UIDevice.current.batteryState {
      case .full:
        eventSink(BatteryState.charging)
      case .charging:
        eventSink(BatteryState.charging)
      case .unplugged:
        eventSink(BatteryState.discharging)
      default:
        eventSink(FlutterError(code: "UNAVAILABLE", message: "status unavailable", details: nil))
    }
  }

  public func onCancel(withArguments arguments: Any?) -> FlutterError? {
    NotificationCenter.default.removeObserver(self)
    eventSink = nil
    return nil
  }
}
```



