# 设备兼容处理



## 设备识别

```js
window.screen
window.devicePixelRatio
window.matchMedia()
```

### 苹果系列

https://www.kylejlarson.com/blog/ipad-screen-size-guide-web-design-tips/

2020备注：iPad 的 userAgent 已经无法分辨出是否是移动端设备了，反应了 iPad 希望后续显示 PC 页面。

https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent

> It's very rarely a good idea to use user agent sniffing. You can almost always find a better, more broadly compatible way to solve your problem!

> If the device is large enough that it's not marked with "Mobile", you should serve your desktop site.



