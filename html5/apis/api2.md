# 离线应用 AppCache / ServiceWorkers

一个实用的离线 Web 应用可以应付间歇性的网络中断。对于使用智能手机和平板的用户来说，离线应用尤其重要。

使用 HTML5 的离线应用功能，能把普通的网页转变成基于 Web 的“迷你应用”。如果再结合大量的 JavaScript、数据存储功能和服务端通信功能，那这个“迷你应用”就几乎像智能手机和平板电脑上的原生应用一样自给自足，一样强大。

HTML5 的 AppCache 技术被用来实现离线应用，但现在又被更新更强大的 Service Workers 技术替代。

## AppCache

要创建一个离线应用，需要完成三步，下面是一个概述。

1. 创建描述文件。描述文件（manifest file）是一种特殊文件，告诉浏览器保存什么文件，不保存什么文件，以及用什么文件代替其他文件。描述文件中列出的所有需要缓存的内容，构成了所谓的离线应用。
2. 修改网页，引用描述文件。引用了描述文件，浏览器在请求页面时就会下载描述文件。
3. 配置Web服务器。这一步最重要，因为Web服务器必须以正确的MIME类型提供描述文件。稍后我们会介绍影响缓存的其他问题。

#### 浏览器缓存与离线应用缓存的区别

触发浏览器中传统缓存的机制是 Web 服务器发送额外的信息，即 `cache-control` 头部，这个信息随同浏览器请求的文件一块发给浏览器。头部信息告诉浏览器是否应该缓存该文件，缓存多长时间再询问服务器该文件是否更新过。一般来说，缓存网页的时间比较短，而缓存网页资源（如样式表、图片和脚本）的时间比较长。

相对而言，离线应用由一个单独的文件（即描述文件）控制，也不限定时间。大致来说，它的规则是“如果网页是离线应用的一部分，如果浏览器已经缓存了该应用，如果应用的定义没有改变，那么就使用缓存的网页”。作为Web开发人员，可以声明一些例外，告诉浏览器不缓存某些文件，或者不用某个文件替代另一个文件。但是，不用考虑过期时间和其他一些烦琐的细节。

### 创建 manifest 文件 

manifest.appcache 文件示例：

```
CACHE MANIFEST        # 首行是固定的
# version 1.00.001    # 添加版本注释，在文件名都没改变的情况下修改该注释以实现更新

CACHE:                # 定义需要被浏览器离线存储的资源
# pages
PersonalityTest.html
PersonalityTest_Score.html

# styles & scripts
PersonalityTest.css
PersonalityTest.js

# pictures & fonts
Images/emotional_bear.jpg
Fonts/museo_slab_500-webfont.eot
Fonts/museo_slab_500-webfont.woff
Fonts/museo_slab_500-webfont.ttf
Fonts/museo_slab_500-webfont.svg

NETWORK:               # 定义需要每次去浏览器抓取的资源
Images/logo.png  # 甚至可以直接用 *，表示所有未缓存的资源都必须上网索取，当然也可以指定文件夹，如 images/

FALLBACK:
PersonalityScore.html PersonalityScore_offline.html

SETTINGS:
prefer-online
```

#### 一些注意点

* 注意任何文件名都不能写错，只要有一个不存在的文件，浏览器会忽略整个描述文件。因此，最忌讳的问题是拼写错误。
* 为了离线应用的正常运行，浏览器必须缓存其所需的一切，包括网页和网页用到的资源（脚本、图片、样式表和嵌入的字体）。
* 描述文件的名字可以随便起，HTML5 推荐使用 `.appcache` 后缀，最重要的还是在服务器上进行配置，让它能够认识扩展名。
* 不要缓存有查询字符串的页面，这种页面都是动态生成的，所以缓存没有意义。

### 使用描述文件

必须给离线应用包含的每个页面的 `<html>` 元素都添加同样的 `manifest` 属性。

```html
<!DOCTYPE html>
<html lang="en"  manifest="test.appcache">
```

注意：一个网站可以有任意多个离线应用，每个应用分别有自己的描述文件即可。

### 把描述文件放到Web服务器

测试描述文件的时候需要一些耐心，任何微小的问题都可能导致静默失败，结束缓存过程。测试离线应用的步骤如下：

(1) 确认已经配置好 Web 服务器，使用 text/cache-manifest 的 MIME 类型来解析描述文件。
如果 Web 服务器以其他 MIME 类型（包括纯文本）交付描述文件，浏览器都会忽略描述文件。

(2) 考虑在使用描述文件时关闭传统缓存机制，应该配置服务器，让它告诉浏览器永远不要缓存描述文件。

(3) 在支持离线应用的浏览器中打开网页。事实上所有浏览器都支持，除了 IE10 之前的版本。
浏览器在打开使用了描述文件的网页时，可能会请求用户的许可，之后再下载文件。

(4) 模拟离线。

(5) 浏览离线应用中的某个页面，然后刷新。

#### 我的离线应用离线不工作（排错）

离线应用还不是很稳定并且有点诡异，一个小小的错误就会导致它不能工作。可以试着排除以下常见的问题。

* 下载描述文件出了问题。如果你没有把描述文件放在正确的位置，或者没有正确配置 MIME 类型。
* 描述文件中列出的文件出了问题。只要下载一个文件时失败，浏览器也会完全放弃（同时删除已下载的所有数据）。
* 浏览器缓存了旧的描述文件。浏览器有可能会缓存描述文件（根据传统的Web缓存规则），因此忽略更新的描述文件。解决方案是手工清空浏览器缓存。

### 更新描述文件

让应用离线工作是要解决的第一个难题，第二个难题是更新离线应用的内容。

由于离线应用没有过期一说，就算是几个月以后再看，浏览器照旧还会忽略更新后的页面。

不过，浏览器会检测服务器上的描述文件是否有更新。因此，可以保存一份新的描述文件，把它放到服务器上。要触发浏览器更新缓存的应用，需要同时满足下列要求。

* 浏览器没有缓存描述文件。
* 描述文件的保存日期必须是新的。
* 描述文件中的内容要更新。

要是描述文件确实没有什么好改的（因为你并没有添加任何文件），而又想让浏览器更新缓存内容（因为原有的文件内容有变化），这时你得稍微修改一下描述文件，让它看起来像是新的一样。为此，最好的办法就是添加注释：
```
CACHE MANIFEST
# version 1.00.001  // 等下次需要浏览器更新缓存时，只要把版本号改为1.00.002就行了
```

更新并不会瞬间完成。浏览器发现新描述文件后，会悄悄地下载所有文件，然后再用新下载的文件代替原来缓存的内容。下次用户再访问同一个页面（或刷新该页面），就会显示新内容。

注意：无法实现增量更新。只要应用中有变化，浏览器就会抛弃所有旧文件，然后重新下载一遍，包括丝毫未改的那些文件。

### 实用缓存技术

到现在为止，我们已经介绍了把一组页面和资源打包成离线应用的方法。期间，我们学习了如何编写和更新描述文件，以及如何让浏览器不要忽视我们的劳动成果。利用这些知识，很容易做出一个简单的离线应用来。可是，要实现复杂一些的站点的离线功能，仅有这些知识还不够。在接下来的几节中，我们就来学习怎样编写更智能的描述文件，怎样通过简单的 JavaScript 检测设备在线状态。

#### 访问未缓存的文件  NETWORK:

我们知道浏览器在缓存了某个页面后，它就不会再向服务器发送请求，而是直接使用缓存的页面。但需要注意的是，浏览器对离线页面的所有资源也持同样的态度，无论它是否缓存了这些资源。也就是说，如果某个离线页面引用了图片 logo.png，而该图片没在缓存中，那么浏览器会直接忽略它，不管是否在线，都不会去网上下载。

要想解决这个问题，必须在描述文件中添加一个区块。这个区块的开头冠以“NETWORK:”字样，然后紧跟着一组必须在线访问的页面：
```
NETWORK:
Images/logo.png  // 甚至可以直接用 *，表示所有未缓存的资源都必须上网索取，当然也可以指定文件夹，如 images/
```

注意：既然可以使用通配符，那在缓存文件列表中使用它可以吗？很遗憾，缓存文件列表不支持通配符，因为 HTML5 规范制定者担心有人会无意中缓存庞大的站点。

#### 添加后备内容  FALLBACK:

利用描述文件可以告诉浏览器哪些文件要缓存，并通过 NETWORK 区块告诉浏览器哪些文件总是要从服务器获取且永不缓存。除此之外，描述文件还支持一个“FALLBACK:”区块，这里列出的文件可以根据计算机是否在线而互换。

```
FALLBACK:
PersonalityScore.html PersonalityScore_offline.html
// 第一个文件名是在线时使用的文件名，第二个文件名是离线后备文件名。
```

浏览器会把后备文件下载并缓存起来。不过，只有在不能上网的时候浏览器才会使用这个后备文件。

后备内容区块也支持通配符匹配。这样就可以创建一个内置的错误页面，比如：

```
FALLBACK:
/ offline.html  // 这一行告诉浏览器对任何不在缓存里的文件使用后备文件。
```

顺便说一下，还可以通过用斜杠指定子目录来匹配更小范围内的文件：

```
FALLBACK:
/paint_app/ offline.html
```

#### 在线时如何绕开缓存  SETTINGS: prefer-online

加载一个已缓存的页面时，浏览器倾向于使用缓存并期望用它找到一切，除了那些明确写在 NETWORK: 区块的文件。
这种方式简单直接，但也不够灵活。如果你更希望在线时从线上加载页面，但离线时使用缓存文件，那么需要添加一个叫 SETTINGS: 的区块，写法如下：

```
SETTINGS:
prefer-online
```

这告诉浏览器尽可能从线上获取资源，如果请求失败则使用缓存文件。虽然这个权宜之计看上去还不错，但它有一些问题。这是一个应用于每个页面和资源（不仅仅是所选的文件）的全或无的设置。这使得在离线模式下使用缓存没那么快了，因为浏览器至少要浪费点时间尝试连接Web服务器。但最大的问题是，在写作本书的时候，只有 Firefox 支持 prefer-online 设置，其他浏览器会忽略它并依然用普通的方式使用缓存。

### 检测连接

使用 JavaScript 检测浏览器当前是否在线的一个诀窍，就是利用后备区块。

如果你是一位 JavaScript 老手，可能知道 navigator.onLine 属性，这个属性能够告诉你浏览器当前是否在线，但不一定准确。onLine 属性的问题是，它只真实地反映浏览器“脱机工作”的设置，并不反映计算机是否真的连到了因特网。就算 onLine 属性能真实反映连接情况，它也不会告诉你浏览器到底是没有连接到服务器，还是由于种种原因没有下载到网页。

所以，我们只能利用后备区块，让浏览器根据应用是否在线分别加载相同 JavaScript 函数的不同版本。

```js
// online.js
function isSiteOnline() { return true; }
// offline.js
function isSiteOnline() { return false; }
// app.appcache
FALLBACK:
online.js offline.js
```

如果浏览器没有下载到online.js，就会使用offline.js，两者包含着一个同名函数，但返回值不同。在原始的网页中，为了知道应用是否在线，检测这个 isSiteOnline() 函数即可：

```js
var displayStatus = document.getElementById("displayStatus");
if (isSiteOnline()) {
  //（可以运行依赖上网的任务，比如通过XMLHttpRequest连接Web服务器）
  displayStatus.innerHTML = "You are connected and the web server is online.";
} else {
  //（应用在离线运行，需要隐藏或修改一些内容，或者禁用某些功能）
  displayStatus.innerHTML = "You are running this application offline.";
}
```

### 用 JavaScript 监听更新

使用相对有限的 JavaScript 接口可以与离线应用功能交互。这个 JavaScript 接口就由 applicationCache 对象定义。

这里面最有用的事件是 onUpdateReady，表示浏览器已经下载了新版本的应用。即使新版本已经可以使用了，但浏览器窗口中显示的仍然是旧版本的内容。此时，可以使用 window.location.reload() 方法，在用户确认后重新加载页面：

```js
applicationCache.onupdateready = function() {
  if (confirm("A new version of this application is available. Reload now?")) {
    window.location.reload();
  }
}
```

另外，applicationCache 对象还有个 update() 方法，能强制浏览器去检测更新。虽然浏览器能自动检测更新，但调用 update() 可以更及时地发现更新的描述文件。这个方法很适合那些生命期长的 Web 应用，比如一打开就是一整天的页面。

### 利用 LocalStorage 做数据的本地存储

```js
if (navigator.onLine) saveOnline(data);
else localStorage.setItem('data', data);
window.online = function () {
    var data = localStorage.getItem('data');
    if (data) { saveOnline(data); localStorage.removeItem('data'); }
}
```



## Service Worker

https://zhuanlan.zhihu.com/p/20040372

丰富的离线体验，定期的后台同步，推送通知，这些通常需要一个本地应用程序才能实现的功能现在已经来到了 web 端。以上这些特性背后所依赖的技术都会通过 service worker 提供。 

### Service Worker是什么?

Service Worker 是一个脚本，独立于当前网页，将其在后台运行，为实现一些不依赖页面或者用户交互的特性打开了一扇大门。在未来这些特性将包括推送消息，背景后台同步，地理围栏定位，但它将推出的第一个首要特性，就是拦截和处理网络请求的能力，包括以编程方式来管理被缓存的响应。

这个 API 会让人兴奋的原因是，它允许你提供离线体验，而且是开发人员完全可控的离线体验。

在 service worker 之前，另一个叫做 APP Cache 的 api 也可以提供离线体验。APP Cache 的的主要问题是坑比较多，而且其被设计为只适合于单页 web 应用程序，对于传统的多页网站则不适合。service worker 的设计规避了这些痛点。

#### 关于 service worker 的一些注意点：

* service worker 是一个 JavaScript worker，所以它不能直接访问 DOM。相反, service worker 可以通过 postMessage 接口与跟其相关的页面进行通信，发送消息，从而让这些页面在有需要的时候去操纵 DOM。
* Service worker 是一个可编程的网络代理，允许你去控制如何处理页面的网络请求。
* Service worker 在不使用时可能会被终止，并会在需要的时候重新启动，因此你不能把 onfetch 和 onmessage 事件作为全局依赖处理程序。如果你需要持久化一些信息并在重新启动 Service worker 后使用他，可以使用 IndexedDB。　　
* Service worker 广泛使用了 ES6 的 promise，所以需要先熟悉 promise。
