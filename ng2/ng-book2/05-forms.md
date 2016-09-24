# Forms in Angular 2

## Forms are Crucial, Forms are Complex

Forms are probably the most crucial aspect of your web application. While we often get events from clicking on links or moving the mouse, it’s throug forms where we get the majority of our rich data input from users.

It turns out, forms can end up being really complex. Here’s a few reasons why:

* Form inputs are meant to modify data, both on the page and the server
* Changes often need to be reflected elsewhere on the page
* Users have a lot of leeway in what they enter, so you need to validate values
* The UI needs to clearly state expectations and errors, if any
* Dependent fields can have complex logic
* We want to be able to test our forms, without relying on DOM selectors
 
Thankfully, Angular 2 has tools to help with all of these things.

* **FormControl**s encapsulate the inputs in our forms and give us objects to work with them
* **Validator**s give us the ability to validate inputs, any way we’d like
* **Observers** let us watch our form for changes and respond accordingly

## `FormControl`s and `FormGroup`s

The two fundamental objects in Angular 2 forms are FormControl and FormGroup.

### FormControl

A FormControl represents a single input field - it is the smallest unit of an Angular form.
FormControls encapsulate the field’s value, and states such as if it is valid, dirty (changed), or has errors.
For instance, here’s how we might use a FormControl in TypeScript:

```ts
// create a new FormControl with the value "Nate"
let nameControl = new FormControl("Nate");
let name = nameControl.value; // -> Nate

// now we can query this control for certain values:
nameControl.errors // -> StringMap<string, any> of errors
nameControl.dirty // -> false
nameControl.valid // -> true
// etc.
```

To build up forms we create FormControls (and groups of FormControls) and then attach metadata and logic to them.

Like many things in Angular, we have a class (`FormControl`, in this case) that we attach to the DOM with an attribute (`formControl`, in this case). For instance, we might have the following in our form:

```html
<!-- part of some bigger form -->
<input type="text" [formControl]="name">
```

This will create a new FormControl object within the context of our form. We’ll talk more about how that works below.

### FormGroup

Most forms have more than one field, so we need a way to manage multiple FormControls. If we wanted to check the validity of our form, it’s cumbersome to iterate over an array of FormControls and check each FormControl for validity. `FormGroup`s solve this issue by providing a wrapper interface around a collection of FormControls.

Here’s how you create a FormGroup :

```ts
let personInfo = new FormGroup({
  firstName: new FormControl("Nate"),
  lastName:  new FormControl("Murray"),
  zip:       new FormControl("90210")
})
```

`FormGroup` and `FormControl` have a common ancestor ( `AbstractControl` ). That means we can check the status or value of personInfo just as easily as a single FormControl

```ts
personInfo.value; // -> { firstName: "Nate", lastName: "Murray", zip: "90210" } 
                  // 这一项为获取整个表单信息提供了极大的便利
// we can query this control group for certain values, which have sensible values depending on the children FormControl's values:
personInfo.errors // -> StringMap<string, any> of errors
personInfo.dirty  // -> false
personInfo.valid  // -> true
// etc.
```


## Our First Form 模板驱动表单

### Loading the FormsModule

In order to use the new forms library we need to first make sure we import the forms library in our NgModule .
Angular 有 2 种创建表单的方式: 使用 `FormsModule` 或 `ReactiveFormsModule`. Since we’ll use both, we’ll import them both into our module. To do this we do the following in our app.ts where we bootstrap the app:

```ts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// farther down...

@NgModule({
  declarations: [
    FormsDemoApp,
    DemoFormSku,
    // ... our declarations here
   ],
   imports: [
     BrowserModule,
     FormsModule,         // 提供 `ngModel` `NgForm` 等指令
     ReactiveFormsModule  // 提供 `formControl` `ngFormGroup` 等指令
   ],
   bootstrap: [ FormsDemoApp ]
 })
 class FormsDemoAppModule {  }
```

### Simple SKU Form: template

```html
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)"><!-- ngForm 指令会自动添加，ngForm 是一个 FormGroup 对象-->
  <label for="skuInput">SKU</label>
  <input type="text" id="skuInput" placeholder="SKU"
         name="sku" ngModel> <!-- ngModel 指令定义一个 FormControl, 同时注意 name 属性是不可缺少的 -->
  <button type="submit">Submit</button>
</form>
```

### form & NgForm

Now things get interesting: because we imported `FormsModule`, that makes `NgForm` available to our view. **Remember that whenever we make directives available to our view, they will get attached to any element that matches their selector**

NgForm does something handy but non-obvious: it includes the form tag in its selector (instead of requiring you to explicitly add ngForm as an attribute). What this means is that if you import FormsModule, NgForm will get automatically attached to any `<form>` tags you have in your view. This is really useful but potentially confusing because it happens behind the scenes.

There are two important pieces of functionality that `NgForm` gives us:

1. A `FormGroup` named `ngForm`
2. A `(ngSubmit)` output

### input & NgModel

```html
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
  <label for="skuInput">SKU</label>
  <input type="text" id="skuInput" placeholder="SKU"
         name="sku" ngModel>
</form>
```

The `NgModel` directive specifies a **selector** of `ngModel` . This means we can attach it to our input tag by adding this sort of attribute: `ngModel="whatever"`. In this case, we specify ngModel with no attribute value.

`NgModel` **creates a new FormControl** that is **automatically added** to the parent FormGroup (in this case, on the form) and then binds a DOM element to that new FormControl. That is, it sets up an association between the input tag in our view and the FormControl and the association is matched by a name, in this case "sku"

> **NgModel vs. ngModel**
> 
> what’s the difference? Generally, when we use PascalCase, like `NgModel`, we’re specifying the class and referring to the object as it’s defined in code. The lower case (CamelCase), as in `ngModel`, comes from the **selector** of the directive and it’s only used in the DOM / template.
>
> It’s also worth pointing out that `NgModel` and `FormControl` are separate objects. `NgModel` is the directive that you use in your view, whereas `FormControl` is the object used for representing the data and validations in your form.

关于绑定的一些试验：

```html
// 前提：声明了组件属性 gavin: string = 'gavin wang'
<input type="text" name="sku" value="gavin">  <!-- 纯 HTML，无任何 Angular 特性，显示 'gavin' -->
<input type="text" name="sku" [value]="gavin"><!-- 普通单向绑定，显示 'gavin wang'，但未注册 FormControl-->
<input type="text" name="sku" ngModel="gavin"><!-- 显示 'gavin'，并初始化了 FormControl  -->
<input type="text" name="sku" ngModel value="gavin"><!-- 此行 value="gavin" 无效，ngModle 与 value 冲突 -->
<input type="text" name="sku" [ngModel]="gavin">    <!-- 初始化 FromControl 并进行了单向绑定 -->
<input type="text" name="sku" [(ngModel)]="gavin">  <!-- 初始化 FromControl 并进行了双向绑定 -->
<input type="text" name="sku" (ngModel)="gavin">    <!-- 初始化 FromControl，但绑定无效，没这种用法 -->
```

## Reactive Forms with `FormBuilder` 模型驱动表单

Building our `FormControl`s and `FormGroup`s implicitly using `ngForm` and `ngModel` is convenient, but doesn’t give us a lot of customization options. A more flexible and common way to configure forms is to use a `FormBuilder`.

`FormBuilder` is an aptly-named **helper class** that helps us build forms. As you recall, forms are made up of `FormControl`s and `FormGroup`s and the `FormBuilder` helps us make them (you can think of it as a “factory” object).

```ts
import { Component } from '@angular/core';
import {
  FormBuilder,  // 导入 helper class, 可以认为是 Angular 表格构建工厂
  FormGroup,    // 导入 FormGroup 类 ( FormControl 暂未用到 )
} from '@angular/forms';

@Component({
  selector: 'form-sku-builder',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
      <label for="skuInput">SKU</label>
      <input type="text" id="skuInput" placeholder="SKU" [formControl]="myForm.controls['sku']">
      <button type="submit">Submit</button>
      <!-- <input type="text" id="gavin" placeholder="Gavin" ngModel name="gavin"> 这句放了会报错-->
      <!-- 报错：ngModel cannot be used to register form controls with a parent formGroup directive. -->
    </form>
  `
})
export class DemoFormSkuBuilder {
  myForm: FormGroup;
  constructor(fb: FormBuilder) {                    // 依赖注入
    this.myForm = fb.group({ 'sku': ['ABC123'] });  // 创建了 myForm: FormGroup 和 sku: FormControl
  }
  onSubmit(value: string): void {
    console.log('you submitted value: ', value);
  }
}
```

> Remember how earlier we said that when using `FormsModule` that `NgForm` will be automatically applied to a `<form>` element? There is an exception: `NgForm` won’t be applied to a `<form>` that has `formGroup`.
If you’re curious, the selector for `NgForm` is: `form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]`
This means you could have a form that doesn’t get `NgForm` applied by using the `ngNoForm` attribute.

Remember:  
To create a new FormGroup and FormControl s implicitly use: `ngForm` and `ngModel`   
But to bind to an existing FormGroup and FormControl s use: `formGroup` and `formControl`

## Adding Validations

Validators are provided by the `Validators` module and the simplest validator is `Validators.required`.

To use validators we need to do two things:

1. Assign a validator to the `FormControl` object
2. Check the status of the validator in the view and take action accordingly

To assign a validator to a `FormControl` object we simply pass it as the second argument to our `FormControl` constructor:

```ts
let control = new FormControl('sku', Validators.required);
```

Or in our case, because we’re using FormBuilder we will use the following syntax:

```ts
constructor(fb: FormBuilder) {
  this.myForm = fb.group({
  'sku': ['', Validators.required]
});
this.sku = this.myForm.controls['sku'];
}
```

Now we need to use our validation in the view. There are two ways we can access the validation value in the view:

1. We can explicitly assign the FormControl sku to an instance variable of the class - which is more verbose, but gives us easy access to the FormControl in the view.
2. We can lookup the FormControl sku from myForm in the view. This requires less work in the component definition class, but is slightly more verbose in the view.

```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-with-validations-explicit',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
      <div [class.error]="!sku.valid && sku.touched">
        <label for="skuInput">SKU</label>
        <input type="text" id="skuInput" placeholder="SKU" [formControl]="sku">
          <div *ngIf="!sku.valid">SKU is invalid</div>
          <div *ngIf="sku.hasError('required')">SKU is required</div>
      </div>
      <div *ngIf="!myForm.valid">Form is invalid</div>
      <button type="submit" class="ui button">Submit</button>
    </form>
  `
})
export class FormWithValidationsExplicit {
  myForm: FormGroup;
  sku: AbstractControl;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({ sku:  ['', Validators.required] });
    this.sku = this.myForm.controls['sku'];
  }

  onSubmit(value: string): void { console.log('you submitted value: ', value); }
}
```

不声明实例属性的用法：

```html
<input type="text" id="skuInput" placeholder="SKU" [formControl]="myForm.controls['sku']">
<div *ngIf="!myForm.controls['sku'].valid" class="ui error message">SKU is invalid</div>
<div *ngIf="myForm.controls['sku'].hasError('required')" class="ui error message">SKU is required</div>
```

### Custom Validations

如果只需要简单地使用内置验证，采用模板驱动的写法更为简单，但如果要使用自定义验证，就只能采用模型驱动的用法了。

We often are going to want to write our own custom validations. Let’s take a look at how to do that.

To see how validators are implemented, let’s look at `Validators.required` from the Angular core source:

```ts
export class Validators {
  static required(c: FormControl): StringMap<string, boolean> {
    return isBlank(c.value) || c.value == '' ?
      {'required': true} :
      null;
  }
}
```

A validator:
- Takes a FormControl as its input and
- Returns a StringMap&lt;string, boolean> where the key is “error code” and the value is true if it fails

```ts
/* tslint:disable:no-string-literal */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

function skuValidator(control: FormControl): { [s: string]: boolean } {
  return !control.value.match(/^123/) ? {invalidSku: true} : null;
}

@Component({
  selector: 'form-with-custom-validations',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
      <label for="skuInput">SKU</label>
      <input type="text" id="skuInput" placeholder="SKU" [formControl]="sku">
        <div *ngIf="!sku.valid">SKU is invalid</div>
        <div *ngIf="sku.hasError('required')">SKU is required</div>
        <div *ngIf="sku.hasError('invalidSku')">SKU must begin with <span>123</span></div>
    </form>
  `
})
export class FormWithCustomValidations {
  myForm: FormGroup;
  sku: AbstractControl;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      sku:  ['', Validators.compose([Validators.required, skuValidator])],
    });
    this.sku = this.myForm.controls['sku'];  // 这里直接改成 .sku 就不会出提示，没改只为演示首行 tslint 配置
  }
}
```

## Watching For Changes

Both `FormGroup` and `FormControl` have an `EventEmitter` that we can use to observe changes.

> EventEmitter is an [Observable]( https://github.com/jhusain/observable-spec), which means it conforms to a defined specification for watching for changes.

To watch for changes on a control we:

1. get access to the `EventEmitter` by calling `.valueChanges`. Then we
2. add an observer using the `.subscribe` method

```ts
constructor(fb: FormBuilder) {
  this.myForm = fb.group({ sku: ['', Validators.required] });
  this.sku = this.myForm.controls['sku'];
  this.sku.valueChanges.subscribe( (value: string) => console.log('sku changed to:', value) );
  this.myForm.valueChanges.subscribe( (form: any) =>  console.log('form changed to:', form) );
}
```

## ngModel

NgModel is a special directive: it binds a model to a form. ngModel is special in that it **implements two-way data binding**. Two-way data binding is almost always more complicated and difficult to reason about vs. one-way data binding. Angular 2 is built to generally have data flow one-way: top-down. However, when it comes to forms, there are times where it is easier to opt-in to a two-way bind.

```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'form-ng-model',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
      <label for="productNameInput">Product Name</label>
      <input type="text" id="productNameInput" placeholder="Product Name"
             [formControl]="myForm.controls.productName"
             [(ngModel)]="productName">
        The product name is: {{productName}}
    </form>
    <form>
      <input type="text" id="productName" placeholder="productName"
             [(ngModel)]="productName" name="productName">
    </form>
  `
})
export class FormNgModel {
  myForm: FormGroup;
  productName: string;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({ productName:  [''] });
  }
}
```

本示例带来的启示有：

1. 定义了 `formControl` 之后，`[(ngModel)]="whatever"` 只起到了双向绑定的作用
2. 如果没有 `formControl`，`[(ngModel)]="whatever"` 除了双向绑定外还会注册一个 `FormControl`，但是`<form [formGroup]="whatever">` 下面是不允许用 `ngModel` 注册 `FormControl` 的，会报错，这就是示例中特地分2个表格的原因。
3. 利用 `ngModel` 注册 `FormControl` 必须要有 `name` 属性配合，相当于 `new FormControl('controlName')` 时的参数。