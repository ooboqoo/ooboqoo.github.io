# PWA

一个实用的离线 Web 应用可以应付间歇性的网络中断。对于使用智能手机和平板的用户来说，离线应用尤其重要。

使用 HTML5 的离线应用功能，能把普通的网页转变成基于 Web 的“迷你应用”。如果再结合大量的 JavaScript、数据存储功能和服务端通信功能，那这个“迷你应用”就几乎像智能手机和平板电脑上的原生应用一样自给自足，一样强大。

HTML5 的 AppCache 技术被用来实现离线应用，但现在又被更新更强大的 Service Workers 技术替代。


## Service Worker

https://developer.chrome.com/docs/workbox/service-worker-overview/

丰富的离线体验，定期的后台同步，推送通知，这些通常需要一个本地应用程序才能实现的功能现在已经来到了 web 端。以上这些特性背后所依赖的技术都会通过 service worker 提供。 

### Service Worker是什么?

Service Worker 是一个脚本，独立于当前网页，将其在后台运行，为实现一些不依赖页面或者用户交互的特性打开了一扇大门。在未来这些特性将包括推送消息，背景后台同步，地理围栏定位，但它将推出的第一个首要特性，就是拦截和处理网络请求的能力，包括以编程方式来管理被缓存的响应。

这个 API 会让人兴奋的原因是，它允许你提供离线体验，而且是开发人员完全可控的离线体验。

在 service worker 之前，另一个叫做 APP Cache 的 api 也可以提供离线体验。APP Cache 的的主要问题是坑比较多，而且其被设计为只适合于单页 web 应用程序，对于传统的多页网站则不适合。service worker 的设计规避了这些痛点。

#### 关于 service worker 的一些注意点：

* service worker 是一个 JavaScript worker，所以它不能直接访问 DOM。相反, service worker 可以通过 postMessage 接口与跟其相关的页面进行通信，发送消息，从而让这些页面在有需要的时候去操纵 DOM。
* Service worker 是一个可编程的网络代理，允许你去控制如何处理页面的网络请求。
* Service worker 在不使用时可能会被终止，并会在需要的时候重新启动，因此你不能把 onfetch 和 onmessage 事件作为全局依赖处理程序。如果你需要持久化一些信息并在重新启动 Service worker 后使用他，可以使用 IndexedDB。　　



## 实战案例

https://googlechrome.github.io/samples/service-worker/

### CDN 资源缓存

这里主要需要关注的点就是：资源是跨域的，需要根据资源的具体情况进行处理。要是资源都支持跨域访问，就很简单，如本示例所示处理即可。

```js
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const cacheVersion = 'v2';
const cacheOrigins = [
  'https://cdn-tos-cn.xxx.net',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(cacheVersion)
      .then(cache =>
        cache.addAll([
          'https://unpkg-src.xxx.net/tailwindcss@2.2.19/dist/utilities.min.css',
        ]),
      ),
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== cacheVersion)
            .map(key => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// The fetch handler serves responses for resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  if (cacheOrigins.some(origin => event.request.url.startsWith(origin))) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return caches.open(cacheVersion).then(cache =>
          // avoid opaque responses
          fetch(event.request.url, { mode: 'cors' }).then(response => {
            if (response.ok && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          }),
        );
      }),
    );
  }
});
```

