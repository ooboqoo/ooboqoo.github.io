
http://ionicframework.com/docs/v2/resources/app-scripts/


```json
"config": {
  "ionic_webpack": "./config/webpack.config.js"
}
```

### ionic 使用 css

参考链接：https://github.com/angular/angular/issues/11815

ionic 下正常都是使用 scss，如果是其他代码移过来，可以采用另外一种写法：

```ts
// 这种方式不会来
@Component({
  styleUrls: 'any.css'
})

// 换成这种方式就可以
import './any.css';
```


### Script Tag Include

If all else fails and a library simply cannot be bundled, it can always be included in an app via an HTML `<script>` tag. This is how libraries were managed for the past twenty years, and it still works very well.

To access the library from an Ionic Page or Component, make a declare statement and create a variable. See an example below with jQuery.

```ts
declare const jQuery:any;
```

When jQuery is included in a web browser, it can be accessed from window.jQuery. In the above example, we’re mapping jQuery to the window.jQuery object. From here, jQuery can be used through the Typescript code without issue.



