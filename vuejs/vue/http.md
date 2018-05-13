# VueResource

## 安装与设置

```js
// 引入插件
import VueResource from 'vue-resource'
// 注册插件
Vue.use(VueResource)
// 配置插件
new Vue({
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  }
})
```

## 使用

The http service can be used globally `Vue.http` or in a Vue instance `this.$http`.

```js
// global Vue object
Vue.http.get('/someUrl', [config]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [body], [config]).then(successCallback, errorCallback);

// in a Vue instance
this.$http.get('/someUrl', [config]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [body], [config]).then(successCallback, errorCallback);
```

### API


#### Mehtods

#### Config

#### Response

#### Interceptors


## Resource

就是可定制 Custom Actions

```js
var customActions = {
  foo: {method: 'GET', url: 'someItem/foo{/id}'},
  bar: {method: 'POST', url: 'someItem/bar{/id}'}
}

var resource = this.$resource('someItem{/id}', {}, customActions);

// GET someItem/foo/1
resource.foo({id: 1}).then(response => {
  this.item = response.body;
});

// POST someItem/bar/1
resource.bar({id: 1}, {item: this.item}).then(response => {
  // success callback
}, response => {
  // error callback
});
```


