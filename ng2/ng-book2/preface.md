
### CSS 框架选择

* BootStrap: 跟 Angular 配合有问题，主要是 jQuery 操作DOM的方式不宜在 Angular 中使用
* Semantic UI：体积大，标签散乱，使用不够广，不用（NG-Book2 示例用这个）
* [ng2-bootstrap](https://github.com/valor-software/ng2-bootstrap): BootStrap 的 Angular 专用版本，就是他了

### 使用小技巧

```
// 阅读本笔记
cd 00-md  && live-server

// 避免重复 npm install，创建的是目录的硬链接
mklink /J node_modules ..\node_modules  // 在子项目下建立到ng-book2下的硬连接
```
