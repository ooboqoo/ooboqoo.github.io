# React Native 速查表

## CLI

```bash
$ react-native --help            # 帮助信息
$ react-native init --help       # 查看子命令的帮助信息

$ react-native init ProjectName  # 创建新项目
$ react-native run-android       # 编译、下载到设备 并启动 APP
$ react-native bundle            # 编译 js 文件，需要指定一堆参数
$ react-native eject             # 重新创建 iOS 和 Android 目录
$ react-native upgrade           # 将模板文件升级到最新版本
$ react-native install           # 
$ react-native uninstall         # 
$ react-native log-android       # starts adb logcat
```

## 组件

| 组件             | 简介                                       | 常用属性
|------------------|--------------------------------------------|--------------------------------------
| Button           | 按钮                                       | `onPress` `title` `color` `disabled`
| Image            | 图片                                       | `source` `resizeMode` `style: {width, opacity}`
| ListView         | 优先渲染可见部分，性能好，一般作为整体布局 | 
| Navigator        | 导航器，需要迁移到 react-navigation        | 
| ScrollView       | 完整渲染
| SectionList      | 
| Slider           | 
| StatusBar        | 设置状态栏属性，基本就是设置沉浸式状态栏
| Switch           | 
| Text             | 文本                                       | `style` `onPress` `onLongPress` `selectable`
| TextInput        | 输入框                                     | `defaultVale` `placeholder` `onChangeText` `onChange` `onSubmitEditing`
| ToolbarAndroid   | 
| TouchableOpacity | 可点击对象，按下有不透明度变化效果         | `onPress` `activeOpacity`
| View             | 相当于 HTML `<div>` 的一个组件
| WebView          | 
| ViewPagerAndroid | 
|       | 


## API

|||
|-------------|---------------
| StyleSheet  | 提供了一种类似CSS样式表的抽象
|       | 

Platform







