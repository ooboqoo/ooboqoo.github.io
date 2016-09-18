# Angular2 简记

##### Building an Angular 2 Application for Production
*2016/6/26*  
http://blog.mgechev.com/2016/06/26/tree-shaking-angular2-production-build-rollup-javascript/  
一个 helloworld 就有 1.6 MB，但通过精简打包压缩可以做到 50KB 左右

### Sublime 支持

还没有针对 Angular2 的专门高亮和代码片段等相关插件出现，估计等正式版出来了就会慢慢冒出来。

TypeScript 的默认语法高亮，不支持 Angular2 模板以及各指令高亮，模板高亮比较简单，修改方案在后面，其他的，暂时还是用 Webstorm 比较好，支持比较给力，再说真正做项目还是得习惯使用 Webstorm 的，虽然启动速度实在太挫。

#### 模板高亮支持

打开一个 ts 文件，然后 `Tools-> Developer -> New Syntax from TypeScript.tmLanguage` 并做如下修改

```yaml
# 修改头部 name 字段为
name: TypeScriptNG
# 修改 template 字段为
  template:
    - match: "`"
      push:
        - meta_scope: markup.raw
        - match: "`"
          pop: true
        - include: scope:text.html.basic
```

保存为 `%AppData%\Sublime Text 3\Packages\TypeScript\TypeScriptNG.sublime-syntax`, 然后选择 TypeScriptNG 语法高亮就好。

需要注意的是，换了语法高亮后 SublimeLinter + tslint 不工作，需要修改 SublimeLinter 配置文件
```js
//    "syntax_map": {  在此项下添加下面的语句，注意都是小写，有大写不行，玩电脑就是坑多...
        "typescriptng": "typescript"
```


