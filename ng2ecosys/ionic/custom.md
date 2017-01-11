
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





