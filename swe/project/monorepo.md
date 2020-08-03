# Monorepo


## 优缺点

### 优点


### 缺点


### 适用场景

A node.js microservices framework which is composed of many interdependent packages. In this scenario, having one git repo for each package would be a burden. Too many npm links and too many projects to mange. Also new features may affect many packages so we have to deal with several related pull requests.



## 创建项目

https://medium.com/trabe/monorepo-setup-with-lerna-and-yarn-workspaces-5d747d7c0e91

* Lerna 负责发包管理、
* Yarn 负责依赖管理

### Lerna

> Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

Lerna tries to ease the management of *npm links* when dealing with multi package projects hosted in a single repository. It analyzes the packages and automatically creates the required npm links between them. It also *handles execution of tasks across multiple packages* and *eases the pain of versioning and publishing*.

```json
// lerna.json
{
  "packages": [
    "packages/*"
  ],
  "version": "independent",
  "npmClient": "yarn"
}
```

### Yarn Workspaces

https://classic.yarnpkg.com/en/docs/workspaces

Link together your projects for easier maintenance.  
Run `yarn install` once to setup multiple packages(install all dependencies of mulitple pakcages in a single pass).  
A better mechanism than `yarn link` since it only affects your workspace tree rather than your whole system.  
All your project dependencies will be installed together.  
One single lockfile rather than a different one for each project.  

```json
// package.json
{
  "private": true,  // required
  "workspaces": [
    "packages/*"
  ]
}
```

#### How does it compare to Lerna

Yarn's workspaces are the low-level primitives that tools like Lerna can use. They will never try to support the high-level feature thar Lerna offers, but by implementing the core logic of the *resolution and linking* steps inside Yarn itself we hope to enable new usages and improve performance.



## 问题解决

### 版本依赖微调

https://medium.com/trabe/fine-tune-dependency-versions-in-your-javascript-monorepo-1fa57d81a2de

> 查看版本依赖原因 `yarn why <package>`

如果存在如下场景

```
projectRoot/packages/components 依赖 prettier 2.0.2
projectRoot/packages/tools 依赖 prettier 1.9.1
```

此时，yarn 安装结果是这样的

```
projectRoot/node_modules 安装 prettier 2.0.2
projectRoot/packages/tools/node_modules 安装 prettier 1.9.1
```

如果我们希望在根目录安装的 1.9.1 的版本，可以在根目录 package.json 中添加

```json
{
  "resolutions": {
    "prettier": "1.9.1"
  }
}
```

但这样...

```json
{
  "workspaces": {
    "packages": ["packages/*"],
    "nohoist": [
      "components/**/prettier"
    ]
  }
}
```








