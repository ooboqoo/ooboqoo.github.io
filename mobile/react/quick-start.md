# 入门基础

## Hello World

```
import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';

class HelloWorldApp extends Component {
  render() { return <Text>Hello world!</Text>; }
}

AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
```

AppRegistry 模块用来告知 React Native 哪一个组件被注册为整个应用的根容器。一般在整个应用里 AppRegistry.registerComponent 只调用一次。

## `props` &amp; `state`

大多数组件在创建时就可以使用各种参数来进行定制。用于定制的这些参数就称为属性 props。

以常见的基础组件 `Image` 为例，可传入一个名为 source 的 prop 来指定图片地址，以及使用名为 style 的 prop 来控制尺寸。

```
render() {
  let pic = {uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};
  return <Image source={pic} style={{width: 193, height: 110}} />;
}
```

自定义的组件也可以使用 props。属性可以尽量提高自定义组件的复用范畴。只需在 render 函数中引用 this.props，然后按需处理即可。

```
class Greeting extends Component {
  render() {
    return <Text>Hello {this.props.name}!</Text>;
  }
}
```

`props` 是在父组件中指定，而且一经指定，在被指定的组件生命周期中不再改变。对于需要改变的数据，我们需要使用 `state`。

```
class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};

    this.timer = setInterval(() => {
      this.setState(previousState => {
        return {showText: !previousState.showText};
      });
    }, 1000);
  }

  componentWillUnmount() { this.timer && clearInterval(this.timer); }

  render() { return <Text>{this.state.showText ? this.props.text : ''}</Text>; }
}
```


## 样式

RN 中，不需要学习特殊的语法来定义样式，所有核心组件都支持 `style` 属性。样式名基本遵循 CSS 的命名，只是按照JS的语法要求使用了驼峰命名法，如将 `background-color` 改为 `backgroundColor`。

`style` 属性可以是一个 JS 对象，同时，还可以接受数组，数组中位置居后的样式对象比居前的优先级更高。

实际开发中组件的样式会越来越复杂，我们建议使用 `StyleSheet.create` 来集中定义组件的样式。

```
class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigblue}>just bigblue</Text>
        <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
        <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {color: 'blue', fontWeight: 'bold', fontSize: 30, },
  red: {color: 'red', },
});
```


### Flexbox 布局

RN 使用 flexbox 规则来指定元素布局。Flexbox 可以在不同屏幕尺寸上提供一致的布局结构。

一般来说，使用 `flexDirection` `justifyContent` `alignItems` 这三个样式属性就已经能满足大多数布局需求。

RN 中的 Flexbox 与浏览器之间存在少许差异：`flexDirection` 的默认值是 `column` 而不是 `row`，`flex`只能指定一个数字值。

* `flexDirection` 决定布局的主轴，子元素是沿着水平轴 `row` 还是沿着竖直轴 `column` 方向排列
* `justifyContent` 决定子元素沿主轴的排列方式，可选项有：`flex-start` `center` `flex-end` `space-around` `space-between`
* `alignItems` 决定子元素沿着次轴的排列方式，可选项有：`flex-start` `center` `flex-end` `stretch`
* `flex` 决定元素的大小，可选项有：`正整数` `0` `-1`，注意这是 RN 特有的修改版，与 W3C 规范有出入


## 处理文本输入

`TextInput` 是一个允许用户输入文本的基础组件。它有一个名为 `onChangeText` 的属性(注意 React 中是 `onChange`)，此属性接受一个事件处理函数。另外还有一个 `onSubmitEditing` 属性，会在文本被提交后调用。

```
  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }
```


## ScrollView

`ScrollView` 是一个通用的可滚动的容器，你可以在其中放入多个组件和视图，而且这些组件并不需要是同类型的。

`ScrollView` 适合用来显示数量不多的滚动元素。放置在 `ScollView` 中的所有组件都会被渲染，哪怕有些组件因为内容太长被挤出了屏幕外。如果你需要显示较长的滚动列表，那么应该使用功能差不多但性能更好的 `ListView` 组件。

```
import React, { Component } from 'react';
import{ AppRegistry, ScrollView, Image, Text, View } from 'react-native'

class ScrollViewDemo extends Component {
  render() {
      return(
        <ScrollView horizontal>
          <Text style={{fontSize:96}}>Scroll me please</Text>
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>
    );
  }
}

AppRegistry.registerComponent('NativeApp', () => ScrollViewDemo);
```


## ListView

`ListView` 组件用于显示一个 **垂直** 的滚动列表，其中的元素之间结构近似而仅数据不同。

`ListView` 更适于长列表数据，且元素个数可以增删。和 `ScrollView` 不同的是，`ListView` 并不立即渲染所有元素，而是优先渲染屏幕上可见的元素。

`ListView` 组件必须的两个属性是 `dataSource` 和 `renderRow`。`dataSource`是列表的数据源，而 `renderRow` 则逐个解析数据源中的数据，然后返回一个设定好格式的组件来渲染。


```
import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View } from 'react-native';

class ListViewBasics extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={{fontSize: 120}}>{rowData}</Text>}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('NativeApp', () => ListViewBasics);
```


## 网络

RN 提供了和 web 标准一致的 Fetch API，用于满足开发者访问网络的需求。如果你之前使用过 XMLHttpRequest (俗称ajax)或是其他的网络API，那么 Fetch 用起来将会相当容易上手。

> 要注意的是，安全机制与网页环境有所不同：在应用中你可以访问任何网站，没有 **跨域** 的限制。

### 发起网络请求

```
fetch('https://mywebsite.com/mydata.json')

fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  })
})
```

### 处理服务器的响应数据

```
async getMoviesFromApi() {
  try {
    let response = await fetch('https://facebook.github.io/react-native/movies.json');
    let responseJson = await response.json();
    return responseJson.movies;
  } catch(error) {
    console.error(error);
  }
}
```

### 使用其他的网络库

RN 中已经内置了 XMLHttpRequest API。一些基于 XMLHttpRequest 封装的第三方库也可以使用，如 frisbee 或 axios 等。但注意不能使用 jQuery，因为 jQuery 中还使用了很多浏览器中才有而 RN 中没有的东西 (所以也不是所有 web 中的 ajax 库都可以直接使用)。

### WebSocket 支持

RN 还支持 WebSocket，这种协议可以在单个 TCP 连接上提供全双工的通信信道。

```
var ws = new WebSocket('ws://host.com/path');
ws.onopen = () => { ws.send('something'); /* 发送一个消息 */ };
ws.onmessage = (e) => { console.log(e.data); };
ws.onerror = (e) => { console.log(e.message); };
ws.onclose = (e) => { console.log(e.code, e.reason); };
```


## 重命名项目

`react-native init` 创建项目时，只允许英文字母和数字，分隔符是不允许的。而 npm 的 package.json 中对于驼峰式命名的项目，又会出警告，经尝试，可以通过以下步骤解决

```
$ react-native init NativeApp
$ mv NativeApp native-app && cd native-app
$ vim package.json    # 修改项目名
$ vim app.json        # 修改显示名 "displayName": "Native App"
$ react-native eject  # 重新创建 iso 和 android 目录，忘了试需不需要先删除目录
```

## React Navigation

RN 中有好几个导航组件。如果你刚开始接触，那么直接选择 React Navigation 就好。如果你只针对 iOS 平台开发，并且想和系统原生外观一致，那么可以选择 NavigatorIOS。你还可能在很多地方听说过 Navigator，这个老组件会逐步被 React Navigation 替代。过去还有一个实验性的导航器组件 NavigationExperimental 这个组件已经弃用。

React Navigation 的路由写法使其非常容易扩展导航逻辑，或是整合到 redux 中。由于路由可以嵌套使用，因而开发者可以根据不同页面编写不同的导航逻辑，且彼此互不影响。

React Navigation 中的视图是原生组件，同时用到了运行在原生线程上的 Animated 动画库，因而性能表现十分流畅。此外其动画形式和手势都非常便于定制。

### Hello Navigation

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

### Nesting Navigators

#### Introducing Tab Navigator

```
import {TabNavigator} from "react-navigation";

class RecentChatsScreen extends Component {
  render() { return <Text>List of recent chats</Text>; }
}

class AllContactsScreen extends React.Component {
  render() { return <Text>List of all contacts</Text>; }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});
```

#### Nesting a Navigator in a screen

```
// StackNavigator 套 TabNavigator
const NativeApp = StackNavigator({
  Home: {screen: MainScreenNavigator},
  Chat: {screen: ChatScreen}
});

// MainScreenNavigator 实际也是一个页面，这里我们把标题显示去掉
MainScreenNavigator.navigationOptions = {
  headerVisible: false
};
```


### Configuring Headers

Header is only available for StackNavigator.

```
// 对象形式
static navigationOptions = {
  headerRight: <Button title="Info" />,
}

// 函数形式
static navigationOptions = ({ navigation }) => {
  const {state, setParams} = navigation;
  const isInfo = state.params.mode === 'info';
  const {user} = state.params;
  return {
    title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
    headerRight: (
      <Button
        title={isInfo ? 'Done' : `${user}'s info`}
        onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})}
      />
    ),
  };
};
```


## Vector Icons

https://github.com/oblador/react-native-vector-icons
