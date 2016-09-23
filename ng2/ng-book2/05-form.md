# Forms

## Our First Form

### Simple SKU Form: template

form & NgForm

Now things get interesting: because we imported FormsModule , that makes NgForm available to our view. **Remember that whenever we make directives available to our view, they will get attached to any element that matches their selector**

NgForm does something handy but non-obvious: it includes the form tag in its selector (instead
of requiring you to explicitly add ngForm as an attribute). What this means is that if you import
FormsModule , NgForm will get automatically attached to any `<form>` tags you have in your view.
This is really useful but potentially confusing because it happens behind the scenes.
There are two important pieces of functionality that NgForm gives us:

1. A FormGroup named ngForm
2. A (ngSubmit) output

```ts
`<form #f="ngForm"  // 给 ngForm 指定别名 f，直接使用 ngForm 是因为 NgForm 指令会自动添加的 ngForm 特性
                    // ngForm 是一个 FormGroup 对象
                    // 疑问：直接 #f 行不行，还有 ngForm NgForm 的区别
    (ngSubmit)="onSubmit(f.value)">
  <label for="skuInput">SKU</label>
  <input type="text" id="skuInput" placeholder="SKU" name="sku" ngModel>  // ngModel 指令定义一个 FormControl
  <button type="submit">Submit</button>
</form>`
```

> **NgModel vs. ngModel**
> 
> what’s the difference? Generally, when we use PascalCase, like
NgModel , we’re specifying the class and referring to the object as it’s defined in code. The
lower case (CamelCase), as in ngModel , comes from the selector of the directive and it’s
only used in the DOM / template.
>
> It’s also worth pointing out that NgModel and FormControl are separate objects. NgModel
is the directive that you use in your view, whereas FormControl is the object used for
representing the data and validations in your form.

## Reactive Forms with FormBuilder

Building our FormControl s and FormGroup s implicitly using ngForm and ngControl is convenient.  
But a more flexible and common way to configure forms is to use a FormBuilder.  
FormBuilder is an aptly-named helper class that helps us build forms.

```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'demo-form-sku-builder',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
    <label for="skuInput">SKU</label>
    <input type="text" id="skuInput" placeholder="SKU" [formControl]="myForm.controls['sku']">
    <button type="submit">Submit</button>
    </form>
  `
 })
export class DemoFormSkuBuilder {
  myForm: FormGroup;
  constructor(fb: FormBuilder) {  // 需要定义依赖注入
    this.myForm = fb.group({ 'sku': ['ABC123'] }); }
  onSubmit(value: string): void {
    console.log('you submitted value: ', value); }
}
```

Remember:  
To create a new FormGroup and FormControl s implicitly use:  
• ngForm and
• ngModel
But to bind to an existing FormGroup and FormControl s use:  
• formGroup and
• formControl

## Adding Validations



## Forms 表单

* FormControl s encapsulate the inputs in our forms and give us objects to work with them
* Validator s give us the ability to validate inputs, any way we’d like
* Observers let us watch our form for changes and respond accordingly

### FormControl & FormGroup 

```html
let personInfo = new FormGroup({
  firstName: new FormControl("Nate"),
  lastName: new FormControl("Murray"),
  zip: new FormControl("90210")
})
```
```js
personInfo.value; // -> {
// firstName: "Nate",
// lastName: "Murray",
// zip: "90210"
// }
// now we can query this control group for certain values, which have sensible
// values depending on the children FormControl's values:
personInfo.errors // -> StringMap<string, any> of errors
personInfo.dirty // -> false
personInfo.valid // -> true
// etc.
```

### 导入指令集

启动应用并添加必要的依赖，以便使用表单。

在引导期间，我们要调用 provideForms()，并把它的结果传给 providers 数组参数，以注册表单模块。

```js
import { provideForms } from '@angular/forms';
bootstrap(AppComponent, [ provideForms() ]).catch((err: any) => console.error(err));
```

 FORM_DIRECTIVES includes:

* formControl
* ngFormGroup
* ngForm
* ngModel

### form & NgForm 和 input & NgModel

 // First we have #f="ngForm" . The #v=thing syntax says that we want to create a local variable for this view.

```html
// ngForm ngSubmit 都是 forms 提供的功能
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)">  // 说明 1
  <div class="field">
    <label for="skuInput">SKU</label>
    <input type="text" id="skuInput" placeholder="SKU" name="sku" ngModel>  // 说明 2
  </div>
  <button type="submit">Submit</button>
</form>

1，ngForm 会自动附加到所有 <form> 标签上，该变量指向其所在表单
   #f="ngForm" 创建了一个本地变量 f ，该变量指向本表单，f 在本视图 view 内都有效
   ngForm 对象的类型为  FormGroup
   f.value 返回的是一个对象，包含表单内容的键值对
2，attribute: ngModel="whatever"
   单向绑定
   NgModel creates a new FormControl，by a name, in this case "sku" 
```

NgModel vs. ngModel

what’s the difference? Generally, when we use PascalCase, like
NgModel , we’re specifying the class and referring to the object as it’s defined in code. The
lower case (CamelCase), as in ngModel , comes from the selector of the directive and it’s
only used in the DOM / template.

NgModel vs. FormControl

It’s also worth pointing out that NgModel and FormControl are separate objects. NgModel
is the directive that you use in your view, whereas FormControl is the object used for
representing the data and validations in your form.

### Using FormBuilder

```js
import { Component } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'demo-form-sku-builder',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],  // Dependency Injection (DI) 说明 1
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">  // 说明 3
      <div class="field">
        <label for="skuInput">SKU</label>
        <input type="text" id="skuInput" placeholder="SKU"
               [formControl]="myForm.controls['sku']">              // 说明 4
      </div>
      <button type="submit" class="ui button">Submit</button>
    </form>
  `
})
export class DemoFormSkuBuilder {
  myForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({ 'sku': ['ABC123'] });  // 说明 2
  }
  onSubmit(value: string): void {
    console.log('you submitted value: ', value);
  }
}
```

1. At a high level, Dependency Injection is a way to tell Angular what dependencies this
component needs to function properly.
2. .group takes an object of key-value pairs that specify the FormControl s in this group.
3. NgForm won’t be applied to a &lt;form> that has formGroup 
4. Remember that ngControl creates a new FormControl object, and attaches it to the parent
FormGroup . But in this case, we used FormBuilder to create our own FormControl s.

> Remember:
To create a new FormGroup and FormControl s implicitly use: ngForm and ngModel   
But to bind to an existing FormGroup and FormControl s use: formGroup and formControl

### Adding Validations

To use validators we need to do two things:
1. Assign a validator to the FormControl object
2. Check the status of the validator in the view and take action accordingly

To assign a validator to a FormControl object we simply pass it as the second argument to our
FormControl constructor:
```
let control = new FormControl('sku', Validators.required)  // 方式一
```

Or in our case, because we’re using FormBuilder we will use the following syntax:

```
constructor(fb: FormBuilder) {
  this.myForm = fb.group({'sku': ['', Validators.required]})  // 方式二
}
```

Now we need to use our validation in the view. There are two ways we can access the validation
value in the view:
1. We can explicitly assign the FormControl sku to an instance variable of the class - which is
more verbose, but gives us easy access to the FormControl in the view.
2. We can lookup the FormControl sku from myForm in the view. This requires less work in the
component definition class, but is slightly more verbose in the view.

```js
export class DemoFormWithValidationsExplicit {
  myForm: FormGroup;
  sku: AbstractControl;
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({ 'sku': ['', Validators.required] });
    this.sku = this.myForm.controls['sku'];
  }
}
```

Now that we have our sku being validated, I want to look at four different ways we can use it in
our view:
1. Checking the validity of our whole form and displaying a message
2. Checking the validity of our individual field and displaying a message
3. Checking the validity of our individual field and coloring the field red if it’s invalid
4. Checking the validity of our individual field on a particular requirement and displaying a
message

```html
<form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
  <div class="field" [class.error]="!sku.valid && sku.touched">
    <label for="skuInput">SKU</label>
    <input type="text" id="skuInput" placeholder="SKU" [formControl]="sku">
     <div *ngIf="!sku.valid" class="ui error message">SKU is invalid</div>
     <div *ngIf="sku.hasError('required')"
       class="ui error message">SKU is required</div>
     <div *ngIf="sku.hasError('invalidSku')"
       class="ui error message">SKU must begin with <tt>123</tt></div>
  </div>
  <div *ngIf="!myForm.valid" class="ui error message">Form is invalid</div>
  <button type="submit" class="ui button">Submit</button>
</form>
```

不用实例变量而直接引用的方法 Removing the sku instance variable
```html
<input type="text" id="skuInput" placeholder="SKU" [formControl]="myForm.controls['sku']">
<div *ngIf="!myForm.controls['sku'].valid" class="error message">SKU is invalid</div>
<div *ngIf="myForm.controls['sku'].hasError('required')" class="error message">SKU required</div>
```

#### Custom Validations

```js
// Validators.required in @angular/forms
export class Validators {
  static required(c: FormControl): StringMap<string, boolean> {
    return isBlank(c.value) || c.value == "" ? {"required": true} : null;
  }
}
// 自定义验证，要求以 123 开头
function skuValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^123/)) { return {invalidSku: true}; }
}
// 多重验证需要使用 Validators.compose 拼合
this.myForm = fb.group({
  'sku': ['', Validators.compose([Validators.required, skuValidator])]
});
```

### Watching For Changes

Both FormGroup and FormControl have an EventEmitter that we can use to observe changes.

To watch for changes on a control we:
1. get access to the EventEmitter by calling `control.valueChanges` . Then we
2. add an observer using the .observer method

```js
this.myForm = fb.group({'sku': ['', Validators.required]});
this.sku = this.myForm.controls['sku'];
this.sku.valueChanges.subscribe( (value: string) => console.log('sku changed to:', value) );
this.myForm.valueChanges.subscribe( (form: any) => console.log('form changed to:', form); );
```

### ngModel 双向数据绑定

多数时候，我们使用的是单向数据绑定，数据流向一般都是 top-down。但在表单中，双向数据绑定有时会更加方便。




