# Scaffold


## API

_flutter/lib/src/material/scaffold.dart_

```dart
enum _ScaffoldSlot {
  body,
  appBar,
  bodyScrim,
  bottomSheet,
  snackBar,
  persistentFooter,
  bottomNavigationBar,
  floatingActionButton,
  drawer,
  endDrawer,
  statusBar,
}

class Scaffold extends StatefulWidget {
  /// Creates a visual scaffold for material design widgets.
  const Scaffold({
    Key key,
    this.appBar,
    this.body,
    this.floatingActionButton,
    this.floatingActionButtonLocation,
    this.floatingActionButtonAnimator,
    this.persistentFooterButtons,
    this.drawer,
    this.endDrawer,
    this.bottomNavigationBar,
    this.bottomSheet,
    this.backgroundColor,
    this.resizeToAvoidBottomPadding,
    this.resizeToAvoidBottomInset,
    this.primary = true,
    this.drawerDragStartBehavior = DragStartBehavior.start,
    this.extendBody = false,
    this.extendBodyBehindAppBar = false,
    this.drawerScrimColor,
    this.drawerEdgeDragWidth,
  }) : assert(primary != null),
       assert(extendBody != null),
       assert(extendBodyBehindAppBar != null),
       assert(drawerDragStartBehavior != null),
       super(key: key);
}
```


## AppBar

https://api.flutter.dev/flutter/material/AppBar-class.html  
https://material.io/design/components/app-bars-top.html  

### actions

```dart
AppBar(
  title: const Text('AppBar Demo'),
  actions: <Widget>[
    IconButton(
      icon: const Icon(Icons.add_alert),
      tooltip: 'Show Snackbar',
      onPressed: () {
        scaffoldKey.currentState.showSnackBar(snackBar);
      },
    ),
    IconButton(
      icon: const Icon(Icons.navigate_next),
      tooltip: 'Next page',
      onPressed: () { },
    ),
  ],
)
```


### TabBar

```dart
class MyTabbedPage extends StatefulWidget {
  const MyTabbedPage({Key key}) : super(key: key);
  @override
  _MyTabbedPageState createState() => _MyTabbedPageState();
}

class _MyTabbedPageState extends State<MyTabbedPage> with SingleTickerProviderStateMixin {
  final List<Tab> myTabs = <Tab>[Tab(text: 'LEFT'), Tab(text: 'RIGHT'), ];
  TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(vsync: this, length: myTabs.length);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('TabBar Sample'),
        bottom: TabBar(
          controller: _tabController,
          tabs: myTabs,
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: myTabs.map((Tab tab) {
          final String label = tab.text.toLowerCase();
          return Center(
            child: Text('This is the $label tab', style: const TextStyle(fontSize: 36), ),
          );
        }).toList(),
      ),
    );
  }
}
```


## Drawer

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('Drawer Demo'),
  ),
  drawer: Drawer(  // 需要调整宽度时，套个 SizedBox 就好
    child: ListView(
      padding: EdgeInsets.zero,  // 这个很重要，不加顶上会留出一块白色区块
      children: const <Widget>[
        DrawerHeader(
          decoration: BoxDecoration(color: Colors.blue),
          child: Text('Drawer Header', style: TextStyle(color: Colors.white, fontSize: 24)),
        ),
        ListTile(leading: Icon(Icons.message), title: Text('Messages')),
        ListTile(leading: Icon(Icons.account_circle), title: Text('Profile')),
        ListTile(leading: Icon(Icons.settings), title: Text('Settings')),
      ],
    ),
  ),
)
```


## BottomNavigationBar

https://api.flutter.dev/flutter/material/BottomNavigationBar-class.html  
https://material.io/design/components/bottom-navigation.html  

```dart
class MyStatefulWidget extends StatefulWidget {
  MyStatefulWidget({Key key}) : super(key: key);
  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle = TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  static const List<Widget> _widgetOptions = <Widget>[
    Text('Index 0: Home', style: optionStyle),
    Text('Index 1: Business', style: optionStyle),
    Text('Index 2: School', style: optionStyle),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BottomNavigationBar Sample'),
      ),
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.home), title: Text('Home')),
          BottomNavigationBarItem(icon: Icon(Icons.business), title: Text('Business')),
          BottomNavigationBarItem(icon: Icon(Icons.school), title: Text('School')),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.amber[800],
        onTap: _onItemTapped,
      ),
    );
  }
}
```


## SnakeBar



## BottomSheet


