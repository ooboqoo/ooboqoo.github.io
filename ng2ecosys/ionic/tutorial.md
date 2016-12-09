# 教程

This section will guide you through the process of starting a new application, adding pages, navigating between those pages, and more.

## Learn the basics

### Starting a New Ionic 2 App

```bash
$ ionic start MyIonic2Project tutorial --v2
    # start 创建新项目的命令
    # MyIonic2Project 项目名 及 项目文件名
    # tutorial 项目模板类型，现有模板选项 tabs(默认), sidemenu, blank, tutorial
    # --v2 默认创建的是 ionic 1 的项目，创建 v2 项目需提供此选项
```

Along with creating your project, this will also install npm modules for the application, and get Cordova set up and ready to go.

### Viewing the app in a browser

```bash
$ cd MyIonic2Project/
$ ionic serve
```

## Project Structure

### ./src/index.html

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <!-- .... -->
  <script src="cordova.js"></script>             <!-- cordova.js required for cordova apps -->
     <!-- will 404 during development, and gets injected during Cordova’s build process. -->
  <link href="build/main.css" rel="stylesheet">  <!-- generated during the build process -->
</head>
<body>
  <ion-app></ion-app>                    <!-- Ionic's root component -->
  <script src="build/main.js"></script>  <!-- a file containing Ionic, Angular and your app -->
</body>
</html>
```

### ./src/

Inside of the `src` directory we find our raw, uncompiled code. This is where most of the work for an Ionic 2 app will take place.

`src/app/app.module.ts` is the entry point for our app.

### ./src/app/app.html

```html
<ion-menu [content]="content">

  <ion-header>
    <ion-toolbar>
      <ion-title>Pages</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">
        {{p.title}}
      </button>
    </ion-list>
  </ion-content>

</ion-menu>

<ion-nav id="nav" [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
```

## Adding Pages

`src/app/app.html` 页面中 `<ion-nav [root]="rootPage">` 中的 `root` 属性指定了首页。

```html
<ion-nav id="nav" [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
```

`src/app/app.component.ts` 中具体指定了首页组件：

```ts
import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
export class MyApp {
  rootPage: any = HelloIonicPage;  // make HelloIonicPage the root (or first) page
  pages: Array<{title: string, component: any}>;
  constructor( private platform: Platform, private menu: MenuController ) { }
}
```

### Creating a Page

`src/pages/hello-ionic/hello-ionic.ts` Notice that because Pages are meant to be loaded dynamically, they don’t have a selector:

```ts
import {Component} from '@angular/core';

@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {}
```

### Creating Additional Pages



## Navigating to Pages




