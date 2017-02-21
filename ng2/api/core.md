# @angular/core

### NgZone 性能优化利器，不用去改 Change Detection

An injectable service for executing work inside or outside of the Angular zone.

The most common use of this service is to **optimize performance** when starting a work consisting of one or more asynchronous tasks that don't require UI updates or error handling to be handled by Angular. Such tasks can be kicked off via `runOutsideAngular` and if needed, these tasks can reenter the Angular zone via `run`.

### ChangeDetectorRef  

没看，整理前先看下下面这篇文章：

http://blog.assaf.co/angular-2-change-detection-zones-and-an-example/


