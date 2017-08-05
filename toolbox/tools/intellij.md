# IntelliJ IDEA &amp; WebStorm

## 通用部分

### 安装

到[IntelliJ IDEA 注册码](http://idea.qinxi1992.cn/) 查找最新可用 License server 来在线激活软件。

### 设置

#### 常用设置项

```text
取消显示打印分割线: Show right margin
字体设置: Editor -> Colors & Fonts -> Font Font
拼写检查: inspections -> spelling -> Typo
JS 缩进设置：File -> Setting -> Editor -> Code Style -> JavaScript
```

#### 设置文件的备份与导入

设置文件位于用户目录下的 .IdeaIC2017.2 (社区版) 或 .IntelliJIdea2017.2 (旗舰版)

```text
config\keymaps 快键键自定义文件目录
config\colors  字体颜色等设置文件目录
```


## IDEA

IDEA 的几大特性：
  * Intelligent coding assistance（智能编码辅助）
  * Smart code navigation（智能代码导航）
  * Built-in tools and integrations（内置的工具和集成）
  * Smart code completion（智能代码补全）
  * Framework-specific assistance（特定于框架的辅助）
  * Productivity boosters（生产力的助推器）
  * More than just code editor（不仅仅只是代码编辑器）
  * Smart in every way（高智能）

### 功能和使用技巧

#### Live Templates

通过 `Ctrl+J` 调出，也可以先输入相应简写再 `Tab` 展开。以下是比较常用的模板：

| Abbreviation | Generated Code |
|--------     -|--------------------------------
| psvm  | `public static void main(String[] args) {}`
| psfs  | `public static final String`
| psf   | `public static final`
| sout  | `System.out.println();`
| soutv | `System.out.println("var = " + $var);`
| St    | `String`
| ifn   | `if ($var == null) {}`
| inn   | `if ($var != null) {}`


#### Postfix Completion

具体在 Settings -> Editor -> General -> Postfix Completion

`5.var` 会自动生成 `int i = 5;`

#### Documentation

Quick Documentation - 弹窗查看 JavaDoc 文档注释
  * 使用：`Ctrl+Q`

External Documentation - 浏览器查看完整的外部文档
  * 设置：项目名 -> 右键选 Open Module Settings -> SDKs -> Documentation Paths -> 选择离线zip包或填写在线文档地址
  * 使用：`Shift+F1`

### 其他注意点

##### 缓存与索引

IDEA 首次加载项目时，都会创建索引，主要是用来加快文件查询，从而加快各种查找、代码提示等操作的速度。但有时也会因为索引损坏而出现莫名其妙的问题，这时需要清除索引：方法1，直接删除用户目录下 IDEA 配置目录下的 system 文件夹；方法2 File -> Invalidate Caches / Restart...


## WebStorm

### 应用专题

#### JSDoc 注释与智能提示

https://www.jetbrains.com/help/webstorm/2016.2/creating-jsdoc-comments.html

输入开始标记 `/**` 并回车，WebStorm 会自动生成 JSDoc 注释块。如果是在函数或方法前面插入文档注释，那么 `@param` 标记也会自动生成。

WebStorm 的 TODO 窗口就是根据 @todo 注释生成的，相关信息见 [TODO patterns](https://www.jetbrains.com/help/webstorm/2016.2/defining-todo-patterns-and-filters.html)

[Closure Compiler](https://developers.google.com/closure/compiler/docs/js-for-compiler)
annotations inside documentation comments are also recognized and are involved
in code completion, intention actions, and other types of coding assistance.

Webstorm 会根据源代码里的注释提供 [快速文档查询](https://www.jetbrains.com/help/webstorm/2016.2/viewing-inline-documentation.html) 功能，该功能通过 `Ctrl+Q` 调用。

WebStorm 会根据注释内容对代码进行校验，该功能的相关设置在 [Code Inspections](https://www.jetbrains.com/help/webstorm/2016.2/code-inspection.html)。


## PHPStorm

现在把一些使用技巧记录下来,免得到时候忘了再查:

1, 从版本控制系统创建项目:
CVS -> Checkout from Version Control

2, 关联DOC文档:
右键External Librariese -> Configure PHP include paths

3, 去掉波浪线:
settings -> Editor -> Colors & Fonts -> General -> TYPO->Effects

4, 显示行号:
settings -> Editor->Appearance->Show line numbers 

5,远程或本地同步文件:
Tools -> Deploments -> Configuration

6, 去掉右上角浏览器图标:
settings -> tools -> WebBrowsers

7, 添加VIM插件:
settings->editor ->plugins->browse repositories ->搜索VIM

8,启动的时候不打开工程文件
Settings->General去掉Reopen last project on startup.

9, 取消自动保存
appearance -> system settings -> save file的两个选项 去掉

10, 将编辑的文件加星号标识:
settings -> editor -> editor tabs -> 勾选 mark modifed tabs…

11, 添加扩展名高亮显示:
settings -> editor -> file types

### 各类技巧

#### 配置 FTP 快速同步代码

在 Webstorm/Phpstorm 中操作 FTP 能找到原来版本控制的感觉。唯一的缺点是打开链接要稍费时间。

设置的入口有两处：
```text
a. Tools > Deployment > configruation
b. File > Settings > Deployment > configruation
```
