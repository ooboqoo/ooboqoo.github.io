# 组件通讯

## `@Input()` 通过输入型绑定把数据从父组件传到子组件

```ts
// 子组件
import { Component, Input } from '@angular/core';
import { Hero } from './hero';
@Component({
  selector: 'hero-child',
  template: `
    <h3>{{hero.name}} says:</h3>
    <p>I, {{hero.name}}, am at your service, {{masterName}}.</p>`
})
export class HeroChildComponent {
  @Input() hero: Hero;
  @Input('master') masterName: string;  // 这里的参数用于指定在父组件中使用的名字，也就是说支持重命名
}

// 父组件
import { Component } from '@angular/core';
import { HEROES } from './hero';
@Component({
  selector: 'hero-parent',
  template: `
    <h2>{{master}} controls {{heroes.length}} heroes</h2>
    <hero-child *ngFor="let hero of heroes" [hero]="hero" [master]="master"></hero-child>`
})
export class HeroParentComponent {
  heroes = HEROES;
  master: string = 'Master';
}
```


## 通过 `setter` 截听输入属性值的变化

使用一个输入属性的 setter ，以拦截父组件中值的变化，并采取行动。

子组件 NameChildComponent 的输入属性 name 上的这个 setter ，会 trim 掉名字里的空格，并把空值替换成默认字符串。

```ts
// 子组件
import { Component, Input } from '@angular/core';
@Component({
  selector: 'name-child',
  template: `<h3>"{{name}}"</h3>`
})
export class NameChildComponent {
  _name: string = '<no name set>';
  @Input()
  set name(name: string) { this._name = (name && name.trim()) || '<no name set>'; }
      // 通过 setter 拦截并处理输入属性值
  get name() { return this._name; }
}

// 父组件
import { Component } from '@angular/core';
@Component({
  selector: 'name-parent',
  template: `
    <h2>Master controls {{names.length}} names</h2>
    <name-child *ngFor="let name of names" [name]="name"></name-child>`
})
export class NameParentComponent {
  // Displays 'Mr. IQ', '<no name set>', 'Bombasto'
  names = ['Mr. IQ', '   ', '  Bombasto  '];
}
```


## 通过 `ngOnChanges` 来截听输入属性值的变化

使用 `OnChanges` 生命周期钩子接口的 `ngOnChanges` 方法来监测输入属性值的变化并做出回应。

> 当需要监视多个、交互式输入属性的时候，本方法比用属性的 setter 更合适。

这个 VersionChildComponent 会监测输入属性 major 和 minor 的变化，并把这些变化编写成日志以报告这些变化。

```ts
// 子组件
import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
@Component({
  selector: 'version-child',
  template: `
    <h3>Version {{major}}.{{minor}}</h3>
    <h4>Change log:</h4>
    <ul><li *ngFor="let change of changeLog">{{change}}</li></ul>`
})
export class VersionChildComponent implements OnChanges {
  @Input() major: number;
  @Input() minor: number;
  changeLog: string[] = [];

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let from = JSON.stringify(changedProp.previousValue);
      let to =   JSON.stringify(changedProp.currentValue);
      log.push( `${propName} changed from ${from} to ${to}`);
    }
    this.changeLog.push(log.join(', '));
  }
}

// 父组件
import { Component } from '@angular/core';
@Component({
  selector: 'version-parent',
  template: `
    <h2>Source code version</h2>
    <button (click)="newMinor()">New minor version</button>
    <button (click)="newMajor()">New major version</button>
    <version-child [major]="major" [minor]="minor"></version-child>`
})
export class VersionParentComponent {
  major: number = 1;
  minor: number = 23;
  newMinor() { this.minor++; }
  newMajor() { this.major++; this.minor = 0; }
}
```

## 父组件监听子组件的事件




## 父组件与子组件通过 本地变量 互动




## 父组件调用 ViewChild




## 父组件和子组件通过服务来通讯







