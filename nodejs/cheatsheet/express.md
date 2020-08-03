# Express

https://expressjs.com/

## Application

`app.get(path, callback [, callback ...])`

当提供多个 callback 时，You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke `next('route')` to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.






