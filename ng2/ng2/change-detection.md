# 变更检测 Change Detection

> 官方教程还未出炉，估计还没有达到满意的状态吧。   
> 参考文章：http://blog.angular-university.io/how-does-angular-2-change-detection-really-work/

The Angular 2 change detection mechanism is much more transparent and easier to reason about than its equivalent in Angular 1. But there are still situations (like when doing performance optimizations) when we really need to know whats going on under hood. So let's dig deeper into change detection by going over the following topics:

* How is change detection implemented?
* What does an Angular 2 change detector look like, can i see it ?
* How does the default change detection mechanism work
* turning on/off change detection, and triggering it manually
* Avoiding change detection loops: Production vs Development mode
* What does the `OnPush` change detection mode actually do?
* Using Immutable.js to simplify the building of Angular 2 apps
* Conclusions

## How is change detection implemented?

Angular 2 can detect when component data changes, and then automatically re-render the view to reflect that change. But how can it do so after such a low-level event like the click of a button, that can happen anywhere on the page?

To understand how this works, we need to start by realizing that in Javascript the whole runtime is overridable by design. We can override functions in String or Number if we so want.

### Overriding browser default mechanisms

What happens is that Angular 2 at startup time will patch several low-level browser APIs, such as for example `addEventListener`, which is the browser function used to register all browser events, including click handlers. Angular will replace `addEventListener` with a new version that does the equivalent of this:

```ts
// this is the new version of addEventListener
function addEventListener(eventName, callback) {
  // call the real addEventListener
  callRealAddEventListener(eventName, function() {
    // first call the original callback
    callback(...);
    // and then run Angular-specific functionality
    var changed = angular2.runChangeDetection();
    if (changed) {
      angular2.reRenderUIPart();
    }
 });
}
```

## How does this low-level runtime patching work?

This low level patching of browser APIs is done by a library shipped with Angular called `Zone.js`. It's important to have an idea of what a zone is.

A **zone** is nothing more than an execution context that survives multiple Javascript VM execution turns. Its a generic mechanism which we can use to add extra functionality to the browser. Angular uses Zones internally to trigger change detection, but another possible use would be to do application profiling, or keeping track of long stack traces that run across multiple VM turns.



With this, we can safely say that:

> By default, Angular 2 Change Detection works by checking if the value of template expressions have changed. This is done for all components.

We can also conclude that:

> By default, Angular 2 does not do deep object comparison to detect changes, it only takes into account properties used by the template


According to this [quote](http://victorsavkin.com/post/110170125256/change-detection-in-angular-2) from Victor Savkin in his blog:

> When using OnPush detectors, then the framework will check an OnPush component when any of its input properties changes, when it fires an event, or when an observable fires an event


