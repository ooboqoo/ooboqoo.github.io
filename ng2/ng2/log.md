# Angular 问题处理集锦

#### 将字符显示为 html

默认情况下，为了防止受攻击，Angular2 会自动转义 HTML 标记，但这样会给使用 `<br>` 这样的标记带来困扰，解决方法：

```html
  <div [innerHTML]="htmlString"></div>
```




