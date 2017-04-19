# React Navigation

https://reactnavigation.org/docs/intro/

## 导航组件对比

RN 中有好几个导航组件。如果你刚开始接触，那么直接选择 React Navigation 就好。如果你只针对 iOS 平台开发，并且想和系统原生外观一致，那么可以选择 NavigatorIOS。你还可能在很多地方听说过 Navigator，这个老组件会逐步被 React Navigation 替代。过去还有一个实验性的导航器组件 NavigationExperimental 这个组件已经弃用。

### React Navigation

React Navigation 的路由写法使其非常容易扩展导航逻辑，或是整合到 redux 中。由于路由可以嵌套使用，因而开发者可以根据不同页面编写不同的导航逻辑，且彼此互不影响。

React Navigation 中的视图是原生组件，同时用到了运行在原生线程上的 Animated 动画库，因而性能表现十分流畅。此外其动画形式和手势都非常便于定制。

### Navigator

和 React Navigation 类似，Navigator 使用纯 JS 实现了一个导航栈，因此可以跨平台工作，同时也便于定制。但 Navigator 早在 2015年就发布了，因此它没有能够享受到如今流畅的原生动画支持。


## Hello Navigation

```bash
$ npm install --save react-navigation
```

```
import React, {Component} from 'react';
import {AppRegistry, View, Text, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';

class HomeScreen extends Component {
  static navigationOptions = {title: 'Welcome'};

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          title="Chat with Lucy"
          onPress={() => navigate('Chat', {user: 'Lucy'})}
        />
      </View>
    );
  }
}

class ChatScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });

  render() {
    const {params} = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

const NativeApp = StackNavigator({
  Home: {screen: HomeScreen},
  Chat: {screen: ChatScreen},
});

AppRegistry.registerComponent('NativeApp', () => NativeApp);
```


## Nesting Navigators


## Configuring Headers

