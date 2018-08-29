# 知识点细节

### `updated` 与 `watch`

The lifecycle hooks around update respond to **changes in the DOM**. Watchers respond to **changes in the data**.

```js
Vue.component('Child', {
  template: '<div class="child">{{ watchAndBind }}{{ bindOnly }}</div>',
  data: function () {
    return {
      watchAndBind: 1,  // updated
      watchOnly: 2,     // watch:watchOnly
      bindOnly: 3,      // watch:watchAndBind \n updated
    }
  },
  watch: {
    watchAndBind () { console.log('watch:watchAndBind') },
    watchOnly () { console.log('watch:watchOnly') },
  },
  updated () { console.log('updated') }
})
new Vue({el: '#app'})
```



