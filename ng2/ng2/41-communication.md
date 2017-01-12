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

在使用 `@Input` 传值时要注意 html 属性写法的区别：

```html
<div draggable="false"></div>    <!-- 传的是字符串 -->
<div [draggable]="false"></div>  <!-- 传的是布尔值 -->
```

## 通过 `setter` 截听输入属性值的变化

```ts
import { Component, Input } from '@angular/core';
@Component({
  selector: 'name-child',
  template: `<h3>"{{name}}"</h3>`
})
export class NameChildComponent {
  private _name: string = '<no name set>';
  @Input() set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';  // 通过 setter 拦截并处理输入属性值
  }
  get name() { return this._name; }
}
```


## 通过 `ngOnChanges` 来截听输入属性值的变化

使用 `OnChanges` 生命周期钩子接口的 `ngOnChanges` 方法来监测输入属性值的变化并做出回应。

> 当需要监视多个、交互式输入属性的时候，本方法比用属性的 setter 更合适。

```ts
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
```


## 父组件监听子组件的事件

```ts
// 子组件
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'my-voter',
  template: `
    <h4>{{name}}</h4>
    <button (click)="vote(true)"  [disabled]="voted">Agree</button>
    <button (click)="vote(false)" [disabled]="voted">Disagree</button>
  `
})
export class VoterComponent {
  @Input()  name: string;
  @Output() onVoted = new EventEmitter<boolean>();
  voted = false;
  vote(agreed: boolean) {
    this.onVoted.emit(agreed);
    this.voted = true;
  }
}

// 父组件
@Component({
  template: `
    <my-voter *ngFor="let voter of voters" [name]="voter" (onVoted)="onVoted($event)"></my-voter>
  `
})
export class VoteTakerComponent {
  agreed = 0;
  disagreed = 0;
  voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];
  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }
}
```


## 父组件与子组件通过“本地变量”互动

```ts
// 父组件
import { Component }                from '@angular/core';
@Component({
  selector: 'countdown-parent',
  template: `
  <button (click)="timer.start()">Start</button>
  <button (click)="timer.stop()">Stop</button>
  <div class="seconds">{{timer.seconds}}</div>
  <countdown-timer #timer></countdown-timer>      <!-- 关键就在这里，通过本地变量指向子组件实例 -->
  `
})
export class CountdownParentComponent { }
```


## 父组件调用 `ViewChild`

```ts
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CountdownTimerComponent }  from './countdown-timer.component';
@Component({
  selector: 'countdown-parent',
  template: `
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <countdown-timer></countdown-timer>
  `
})
export class CountdownViewChildParentComponent {
  @ViewChild(CountdownTimerComponent) private timerComponent1: CountdownTimerComponent;  // 用法1
  @ViewChild('countdown-timer')       private timerComponent2: CountdownTimerComponent;  // 用法2
  start() { this.timerComponent1.start(); }
  stop()  { this.timerComponent2.stop();  }
}
```


## 父组件和子组件通过服务来通讯

```ts
// 服务
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class MissionService {
  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }
}

// 父组件
import { Component }          from '@angular/core';
import { MissionService }     from './mission.service';
@Component({
  selector: 'mission-control',
  template: `
    <button (click)="announce()">Announce mission</button>
    <my-astronaut [astronaut]="Gavin Wang"></my-astronaut>
  `,
  providers: [MissionService]
})
export class MissionControlComponent {
  constructor(private missionService: MissionService) { }
  announce() {
    this.missionService.announceMission('get up!');
  }
}

// 子组件
import { Component, Input, OnDestroy } from '@angular/core';
import { MissionService } from './mission.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'my-astronaut',
  template: `<p> {{astronaut}}: <strong>{{mission}}</strong> </p>`
})
export class AstronautComponent implements OnDestroy {
  @Input() astronaut: string;
  mission = '<no mission announced>';
  subscription: Subscription;
  constructor(private missionService: MissionService) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      mission => { this.mission = mission; });
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
```
