# Angular CLI

官网：https://github.com/angular/angular-cli   
文档：https://cli.angular.io/

在 ng-conf 2016 的一场演讲中，Mike Brocchi 向开发者详细展示了 Angular CLI（Command Line Interface）及其功能。他说，在自己采访过的开发者中，有26%的人称 Angular 2 环境设置是一大入门门槛，有22%的人说环境设置太过复杂。Angular CLI 的诞生，正是为了解决这个问题。

为了降低创建项目所需的时间，Angular CLI 提供了许多特性让开发者“快速上手”：

```bash
$ ng new project-name # 创建一个新项目，置为默认设置
$ ng build            # 构建/编译应用
$ ng test             # 运行单元测试
$ ng e2e              # 运行端到端（end-to-end）测试
$ ng serve            # 启动一个小型 web 服务器
$ ng deploy           # 即开即用，部署到 Github Pages 或者 Firebase
```
执行这些步骤所需要的全部设置，都由 CLI 工具来完成。

除了设置一个新应用之外，该工具还支持开发者运行命令，构建应用的组成部分，如组件（Component）和路由（Route）。

```bash
$ ng generate component my-comp      # 生成一个新组件，同时生成其测试规格和相应的HTML/CSS文件
$ ng generate directive my-directive # 生成一个新指令
$ ng generate pipe my-pipe           # 生成一个新管道
$ ng generate service my-service     # 生成一个新服务
$ ng generate route my-route         # 生成一个新路由
$ ng generate class my-class         # 生成一个简易的模型类
```

对于每个生成命令，所产生的文件会根据官方 Angular 样式指南的规定，放置在正确的位置。
