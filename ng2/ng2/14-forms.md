# 表单

表单创建一个有机、有效、引人注目的数据输入体验。  
Angular 表单协调一组数据绑定控件，跟踪变更，验证输入的有效性，并且显示错误信息。

我们全都用过表单来执行登录、求助、下单、预订机票、发起会议，以及不计其数的其它数据录入任务。表单是商业应用的主体。

不管什么样的 Web 开发者，都能使用适当的标签“捏”出一个 HTML。但是，要想做出一个优秀的表单，让它具有贴心的数据输入体验，以指导用户明晰、高效的通过表单完成背后的工作流程，这个挑战就大多了。

这当中所需要的设计技能，坦白讲，确实超出了本章的范围。
但是，它也需要框架支持，来实现 双向数据绑定、变更跟踪、有效性验证和错误处理 …… 这些 Angular 表单相关的内容，属于本章的范围。

我们将从零构建一个简单的表单，把它简化到一次一步。通过这种方式，我们将学到如何：

* 使用组件和模板构建一个 Angular 表单
* 使用 `[(ngModel)]` 语法实现双向数据绑定，以便于读取和写入输入控件的值
* 结合表单来使用 ngModel ，能让我们跟踪状态的变化并对表单控件做验证
* 使用特殊的 CSS 类来跟踪控件状态，并提供强烈的视觉反馈
* 向用户显示有效性验证的错误提示，以及禁用/启用表单控件
* 通过模板引用变量，在控件之间共享信息

## 模板驱动的表单

Angular 支持 模板驱动 和 模型驱动 两种方式来构建表单，这里采用模板驱动方式来创建表单。

我们将按照一系列很小的步骤来构建此表单：

* 创建 Hero 模型类
* 创建控制此表单的组件
* 创建具有初始表单布局的模板
* 使用 ngModel 双向数据绑定语法把数据属性绑定到每个表单输入控件
* 往每个表单输入控件上添加 name 属性 (Attribute)
* 添加自定义 CSS 来提供视觉反馈
* 显示和隐藏有效性验证的错误信息
* 使用 ngSubmit 处理表单提交
* 禁用此表单的提交按钮，直到表单变为有效

## 创建 Hero 模型类 hero.ts

```ts
export class Hero {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) {  }  // alterEgo 为可选字段(带`?`) 意为第二人格
}
```

## 创建表单组件 hero-form.component.ts

每个 Angular 表单分为两部分：一个基于 HTML 的模板，和一个基于代码的组件，它用来处理数据和用户交互。

```ts
import { Component } from '@angular/core';
import { Hero }      from './hero';

@Component({
  selector: 'hero-form',
  templateUrl: 'app/hero-form.component.html'
})
export class HeroFormComponent {
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];  // 提供演示用的假数据
  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');            // 提供演示用的假数据
  submitted = false;
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }  // **这里调试的方法非常值得借鉴**
}
```

## 修改 app.module.ts

```ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }      from './app.component';
import { HeroFormComponent } from './hero-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroFormComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

> 如果一个组件、指令或管道出现在模块的 imports 数组中，就说明它是外来模块，**不要**再到 declarations 数组中声明它们。如果你自己写的它，并且它属于当前模块，**就要**把它声明在 declarations 数组中。

## 修改 app.component.ts

```ts
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: '<hero-form></hero-form>'
})
export class AppComponent { }
```

## 创建表单模板 hero-form.component.html

```html
<div class="container">
  <h1>Hero Form</h1>
  <form>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" required>
    </div>
    <div class="form-group">
      <label for="alterEgo">Alter Ego</label>
      <input type="text" class="form-control" id="alterEgo">
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
  </form>
</div>
```

我们还没有用到 Angular 。没有绑定。没有额外的指令。只做了个布局。

container、form-group、form-control 和 btn 类来自 Twitter Bootstrap。纯粹是装饰。

## 用 ngFor 添加选项

```html
<div class="form-group">
  <label for="power">Hero Power</label>
  <select class="form-control" id="power" required>
    <option *ngFor="let p of powers" [value]="p">{{p}}</option>
  </select>
</div>
```

## 使用 ngModel 进行双向数据绑定

```html
<input type="text"  class="form-control" id="name" required
       [(ngModel)]="model.name" name="name">
TODO: remove this: {{model.name}} <!-- 一个诊断用的插值表达式，用以看清双向数据绑定 -->
```

通过改变输入框的内容，结合诊断信息，我们能看到数据从输入框流动到模型，再反向流动回来的过程。这就是双向数据绑定！

注意，我们还往 `<input>` 标签上添加了一个 `name` 属性 (Attribute) 并且把它设置为 "name"，这表示英雄的名字。使用任何唯一的值都可以，但使用具有描述性的名字会更有帮助。当在表单中使用 `[(ngModel)]` 时，必须要定义 `name` 属性。

> 每一个 input 元素都有一个 name 属性，Angular 的表单模块需要使用它为表单注册控制器。

> Internally Angular creates `FormControl`s and registers them with an `NgForm` directive that Angular attached to the `<form>` tag. Each `FormControl` is registered under the name we assigned to the `name` attribute.

## 通过 ngModel 跟踪修改状态与有效性验证

在表单中使用 ngModel 能让我们比仅使用双向数据绑定获得更多的控制权。它还会告诉我们很多信息：用户碰过此控件吗？它的值变化了吗？数据变得无效了吗？

NgModel 指令不仅仅跟踪状态。它还使用三个 CSS 类来更新控件，以便反映当前状态。我们可以通过定制这些 CSS 类的样式来更改控件的外观，以及让消息被显示或隐藏。

状态 | 为真时的 CSS 类 | 为假时的 CSS 类
---- | --------------- | ---------------
控件已经被访问过 | ng-touched | ng-untouched
控件值已经变化   | ng-dirty   | ng-pristine
控件值是有效的   | ng-valid   | ng-invalid

```html
<input type="text" class="form-control" id="name" required
       [(ngModel)]="model.name" name="name"  #spy >
  TODO: remove this: {{spy.className}}  <!-- 监测 #spy 类名的变化 -->
```

## 添加样式以提供视觉反馈

```ts
styles: [`
  .ng-valid[required], .ng-valid.required  { border-left: 5px solid #42A948; /* green */ }
  .ng-invalid:not(form)  { border-left: 5px solid #a94442; /* red */ }
`]
```

## 显示和隐藏有效性校验的错误信息

CSS 样式可以提示用户有错误，但却没有说错在哪里，或者如何纠正。我们可以借助 ng-invalid 类来给出一个更有用的消息。

```html
<label for="name">Name</label>
<input type="text" class="form-control" id="name" required
       [(ngModel)]="model.name" name="name" #name="ngModel" #nameDOM>
       <!-- 注意这里的区别，#name 指向 FormControl 对象，而 #nameDOM 则指向 HTMLElement 元素 -->
<div [hidden]="name.valid || name.pristine">Name is required</div> <!-- 错误提示消息 -->
```

我们需要一个模板引用变量来访问模板中输入框的 Angular 控件。这里我们创建了一个名叫 name 的变量，并且把它赋值为 "ngModel"。

> ##### 为什么是 "ngModel"？
> 指令的 `exportAs` 属性告诉 Angular 如何把模板引用变量链接到指令中。这里我们把 `name` 设置为
`ngModel` 就是因为 `NgModel` 指令的 `exportAs` 属性设置成了“ngModel”。

> A directive's [exportAs](https://angular.cn/docs/ts/latest/api/core/index/DirectiveMetadata-class.html#!#exportAs-anchor) property tells Angular how to link the reference variable to the directive. We set `name` to `ngModel` because the `NgModel` directive's `exportAs` property happens to be "ngModel".

这里附上一份通过本示例打印的 NgModel：

```ts
NgModel {_parent: NgForm, name: "name", valueAccessor: DefaultValueAccessor, _rawValidators: Array[1], _rawAsyncValidators: Array[0]…}
_control:FormControl
_parent:NgForm
_rawAsyncValidators:Array[0]
_rawValidators:Array[1]
_registered:true
asyncValidator:null
control:FormControl

touched:  false
untouched:true
pristine: true
dirty:    false
valid:    true
invalid:  false
enabled:  true
disabled: false

errors:   null
formDirective:NgForm
model:"Dr IQ"
name:"name"
path:Array[1]
pending:false
statusChanges:EventEmitter
update:EventEmitter
validator:(control)
value:"Dr IQ"
valueAccessor:DefaultValueAccessor
valueChanges:EventEmitter
viewModel:"Dr IQ"
__proto__:NgControl
```

## 添加一个英雄，并且重置表单

```html
<button type="button" class="btn btn-default" (click)="newHero()">New Hero</button>
```

```ts
newHero() { this.model = new Hero(42, '', ''); }  // 示例固化了 id，实际应该有自动生成 id 的代码
```

原文提到了一种存在的隐患，并提供了一个临时的解决方案，本笔记未纳入，因为 1,隐患不重要 2,解决方案不漂亮。

## 通过 ngSubmit 来提交表单

模板内的提交按钮，跟普通按钮的行为不一致，即使设置了 form 的 action 和 method 属性，也不会发生跳转（多页面转成单页面后改默认行为还是可以接受的），所有行为需要通过代码来定义:

```html
<form (ngSubmit)="onSubmit()" #heroForm="ngForm">
```

这里我们定义了一个模板引用变量 #heroForm，并且把它初始化为 "ngForm"。
这个 heroForm 变量现在引用的是 NgForm 指令，它代表的是表单的整体。

> ##### NgForm 指令
> 什么 NgForm 指令？我们没有添加过 NgForm 指令啊！
> Angular 替我们做了。 Angular 自动创建了 `NgForm` 指令，并且把它附加到 `<form>` 标签上。
> `NgForm` 指令为普通的 form 元素扩充了额外的特性。它持有我们通过 `NgModel` 指令和 `name` 属性为各个元素创建的那些控件类，并且监视它们的属性变化，包括有效性。它还有自己的 `valid` 属性，只有当每一个被包含的控件都有效时，它才有效。

下面我们利用 表单的 valid 属性，在表单无效时禁用 Submit 按钮：

```html
<button type="submit" [disabled]="!heroForm.form.valid">Submit</button>
```

## 切换两个表单区域

当点击提交按钮后，原表单会被隐藏，并显示一个信息详情。利用的是 HeroFormComponent 中定义的 submitted 属性。

```html
<div [hidden]="submitted">
  <h1>Hero Form</h1>
  <form (ngSubmit)="onSubmit()" #heroForm="ngForm">
     <!-- ... all of the form ... -->
  </form>
</div>
<div [hidden]="!submitted">
  <h2>You submitted the following:</h2>
  <div>
    <!-- display the submitted hero -->
  </div>
  <button class="btn btn-default" (click)="submitted=false">Edit</button>
</div>
```
