# 路由与导航

概览

浏览器是一个熟悉的应用导航操作模型。 如果在地址栏中输入一个 URL ，浏览器就会导航到相应的页面。 如果你在页面中点击链接，浏览器就会导航到一个新的页面。 如果你点击浏览器上的前进和后退按钮，浏览器就会根据你看过的页面历史向前或向后进行导航。

Angular 的 路由器 （以下简称“路由器”）借鉴了这个模型。它把浏览器中的 URL 看做一个操作指南， 据此导航到一个由客户端生成的视图，并可以把参数传给支撑视图的相应组件，帮它决定具体该展现哪些内容。 我们可以为页面中的链接绑定一个路由，这样，当用户点击链接时，就会导航到应用中相应的视图。 当用户点击按钮、从下拉框中选取，或响应来自任何地方的事件时，我们也可以在代码控制下进行导航。 路由器还在浏览器的历史日志中记录下这些活动，这样浏览器的前进和后退按钮也能照常工作。

一些 路由器 中的关键词汇及其含义：

##### 路由器 `Router`

为激活的 URL 显示应用组件。管理从一个组件到另一个组件的导航  
Displays the application component for the active URL. Manages navigation from one component to the next.

##### 路由器模块 `RouterModule`

一个独立的 Angular 模块，用于提供所需的服务提供商，以及用来在应用视图之间进行导航的指令。  
A separate Angular module that provides the necessary service providers and directives for navigating through application views.

##### 路由数组 `Routes`

定义了一个路由数组，每一个都会把一个 URL 路径映射到一个组件。  
Defines an array of Routes, each mapping a URL path to a component.

##### 路由 `Route`

定义路由器该如何根据 URL 模式（ pattern ）来导航到组件。大多数路由都由路径和组件类构成。  
Defines how the router should navigate to a component based on a URL pattern. Most routes consist of a path and a component type.

##### 路由插座 `RouterOutlet`

该指令（ `<router-outlet>` ）用来标记出路由器该在哪里显示视图。  
The directive (`<router-outlet>`) that marks where the router should display a view.

##### 路由链接 `RouterLink`

该指令用来把一个可点击的 HTML 元素绑定到路由。 点击带有绑定到 _ 字符串 _ 或 _ 链接参数数组 _ 的 `routerLink` 指令的 A 标签就会触发一次导航。  
The directive for binding a clickable HTML element to a route. Clicking an anchor tag with a `routerLink` directive that is bound to a _Link Parameters Array_ triggers a navigation.

##### 活动路由链接 `RouterLinkActive`

当 HTML 元素上或元素内的 routerLink 变为激活或非激活状态时，该指令为这个 HTML 元素添加或移除 CSS 类。  

The directive for adding/removing classes from an HTML element when an associated routerLink contained on or inside the element becomes active/inactive.

##### 激活的路由 `ActivatedRoute`

为每个路由组件提供提供的一个服务，它包含特定于路由的信息，比如路由参数、静态数据、解析数据、全局查询参数和全局碎片（ fragment ）。  
A service that is provided to each route component that contains route specific information such as route parameters, static data, resolve data, global query params and the global fragment.

##### 路由器状态 `RouterState`

路由器的当前状态包含了一棵由程序中激活的路由构成的树。它包含一些用于遍历路由树的快捷方法。  
The current state of the router including a tree of the currently activated routes in our application along convenience methods for traversing the route tree.

##### 链接参数数组 _`Link Parameters Array`_

这个数组会被路由器解释成一个路由操作指南。我们可以把一个 `RouterLink` 绑定到该数组，或者把它作为参数传给 `Router.navigate` 方法。  
An array that the router interprets into a routing instruction. We can bind a `RouterLink` to that array or pass the array as an argument to the `Router.navigate` method.

##### 路由组件 _`Routing Component`_

一个带有 `RouterOutlet` 的 Angular 组件，它根据路由器的导航来显示相应的视图。  
An Angular component with a `RouterOutlet` that displays views based on router navigations.




