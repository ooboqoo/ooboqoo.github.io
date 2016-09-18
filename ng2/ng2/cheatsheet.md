# Angular2  Cheat Sheet

#### Bootstrapping

```ts
// Bootstraps the app, using the root component from the specified `NgModule`.
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
platformBrowserDynamic().bootstrapModule(AppModule);
```

#### NgModules

```ts
// Defines a module that contains components, directives, pipes, and providers.
import { NgModule } from '@angular/core';

@NgModule({
  declarations: ...,
  imports: ...,
  exports: ...,
  providers: ...,
  bootstrap: ...
})
class MyModule {}

// List of components, directives, and pipes that belong to this module.
declarations: [MyRedComponent, MyBlueComponent, MyDatePipe]

// List of modules to import into this module. Everything from the imported modules is available to `declarations` of this module.
imports: [BrowserModule, SomeOtherModule]

// List of components, directives, and pipes visible to modules that import this module.
exports: [MyRedComponent, MyDatePipe]

// List of dependency injection providers visible both to the contents of this module and to importers of this module.
providers: [MyService, { provide: ... }]

// List of components to bootstrap when this module is bootstrapped.
bootstrap: [MyAppComponent]
```

#### Template syntax

```ts
// Binds property `value` to the result of expression `firstName`.
`<input [value]="firstName">`

// Binds attribute `role` to the result of expression `myAriaRole`.
`<div [attr.role]="myAriaRole">`

// Binds the presence of the CSS class `extra-sparkle` on the element to the truthiness of the expression `isDelightful`.
`<div [class.extra-sparkle]="isDelightful">`

// Binds style property `width` to the result of expression `mySize` in pixels. Units are optional.
`<div [style.width.px]="mySize">`

// Calls method `readRainbow` when a click event is triggered on this button element (or its children) and passes in the event object.
`<button (click)="readRainbow($event)">`

// Binds a property to an interpolated string, for example, "Hello Seabiscuit". Equivalent to: `<div [title]="'Hello ' + ponyName">`
`<div title="Hello {{ponyName}}">`

// Binds text content to an interpolated string, for example, "Hello Seabiscuit".
`<p>Hello {{ponyName}}</p>`

// Sets up two-way data binding. Equivalent to: `<my-cmp [title]="name" (titleChange)="name=$event">`
`<my-cmp [(title)]="name">`

// Creates a local variable `movieplayer` that provides access to the `video` element instance in data-binding and event-binding expressions in the current template.
`<video #movieplayer ...> <button (click)="movieplayer.play()"> </video>`

// The `*` symbol turns the current element into an embedded template. Equivalent to: `<template [myUnless]="myExpression"><p>...</p></template>`
`<p *myUnless="myExpression">...</p>`

// Transforms the current value of expression `cardNumber` via the pipe called `myCardNumberFormatter`.
`<p>Card No.: {{cardNumber | myCardNumberFormatter}}</p>`

// The safe navigation operator (`?`) means that the `employer` field is optional and if `undefined`, the rest of the expression should be ignored.
`<p>Employer: {{employer?.companyName}}</p>`

// An SVG snippet template needs an `svg:` prefix on its root element to disambiguate the SVG element from an HTML component.
`<svg: rect x="0" y="0" width="100" height="100"/>`

// An `<svg>` root element is detected as an SVG element automatically, without the prefix.
`<svg>
  <rect x="0" y="0" width="100" height="100"/>  
</svg>`
```

#### Built-in directives

```ts
import { CommonModule } from '@angular/common';

// Removes or recreates a portion of the DOM tree based on the `showSection` expression.
`<section *ngIf="showSection">`

// Turns the li element and its contents into a template, and uses that to instantiate a view for each item in list.
`<li *ngFor="let item of list">`

// Conditionally swaps the contents of the div by selecting one of the embedded templates based on the current value of `conditionExpression`.
`<div [ngSwitch]="conditionExpression">
  <template [ngSwitchCase]="case1Exp">...</template>
  <template ngSwitchCase="case2LiteralString">...</template>
  <template ngSwitchDefault>...</template>
</div>`

// Binds the presence of CSS classes on the element to the truthiness of the associated map values. The right-hand expression should return {class-name: true/false} map.
`<div [ngClass]="{active: isActive, disabled: isDisabled}">`
```

#### Forms

```ts
// Provides two-way data-binding, parsing, and validation for form controls.
import { FormsModule } from '@angular/forms';
`<input [(ngModel)]="userName">`
```

#### Class decorators

```ts
import { Directive, ... } from '@angular/core';

// Declares that a class is a component and provides metadata about the component.
@Component({...})
class MyComponent() {}

// Declares that a class is a directive and provides metadata about the directive.
@Directive({...}) 
class MyDirective() {}

// Declares that a class is a pipe and provides metadata about the pipe.
@Pipe({...})
class MyPipe() {}

// Declares that a class has dependencies that should be injected into the constructor when the dependency injector is creating an instance of this class.
@Injectable()
class MyService() {}
```

#### Directive configuration

```ts
@Directive({
  selector: '.cool-button:not(a)',
  providers: [MyService, { provide: ... }]
})
```

selector:  
Specifies a CSS selector that identifies this directive within a template.
Supported selectors include `element`, `[attribute]`, `.class`, and `:not()`.

Does not support parent-child relationship selectors.

providers:  
List of dependency injection providers for this directive and its children.

#### Component configuration

`@Component` extends `@Directive`, so the `@Directive` configuration applies to components as well

```ts
@Component({
  slector: ...,
  providers: ...,
  moduleId: module.id,
  viewProviders: [MyService, { provide: ... }],
  template: 'Hello {{name}}',        // 二选一
  templateUrl: 'my-component.html',  // 二选一
  styles: ['.primary {color: red}']  // 二选一
  styleUrls: ['my-component.css']    // 二选一
})
```

 Item | Descriptiom 
----- | -----------
`moduleId` | If set, the `templateUrl` and `styleUrl` are resolved relative to the component.
`viewProviders` | List of dependency injection providers scoped to this component's view.
`template` / `templateUrl` | Inline template or external template URL of the component's view.
`styles` / `styleUrls` | List of inline CSS styles or external stylesheet URLs for styling the component’s view.

#### Class field decorators for directives and components

```ts
import { Input, ... } from '@angular/core';

// Declares an input property that you can update via property binding
// (example: `<my-cmp [myProperty]="someExpression">`).
@Input() myProperty;

// Declares an output property that fires events that you can subscribe to with an event binding
// (example: `<my-cmp (myEvent)="doSomething()">`).
@Output() myEvent = new EventEmitter();

// Binds a host element property to a directive/component property.
@HostBinding('[class.valid]') isValid;

// Subscribes to a host element event (`click`) with a directive/component method (`onClick`),
// optionally passing an argument (`$event`).
@HostListener('click', ['$event']) onClick(e) {...}

// Binds the first result of the component content query (`myPredicate`) to a property (`myChildComponent`) of the class.
@ContentChild(myPredicate) myChildComponent;

// Binds the results of the component content query (`myPredicate`) to a property (`myChildComponents`) of the class.
@ContentChildren(myPredicate) myChildComponents;

// Binds the first result of the component view query (`myPredicate`) to a property (`myChildComponent`) of the class. Not available for directives.
@ViewChild(myPredicate) myChildComponent;

// Binds the results of the component view query (`myPredicate`) to a property (`myChildComponents`) of the class. Not available for directives.
@ViewChildren(myPredicate) myChildComponents;
```

#### Directive and component change detection and lifecycle hooks

(implemented as class methods)

`**constructor(myService: MyService, ...)** { ... }`

Called before any other lifecycle hook. Use it to inject dependencies, but
avoid any serious work here.

`**ngOnChanges(changeRecord)** { ... }`

Called after every change to input properties and before processing content or
child views.

`**ngOnInit()** { ... }`

Called after the constructor, initializing input properties, and the first
call to `ngOnChanges`.

`**ngDoCheck()** { ... }`

Called every time that the input properties of a component or a directive are
checked. Use it to extend change detection by performing a custom check.

`**ngAfterContentInit()** { ... }`

Called after `ngOnInit` when the component's or directive's content has been
initialized.

`**ngAfterContentChecked()** { ... }`

Called after every check of the component's or directive's content.

`**ngAfterViewInit()** { ... }`

Called after `ngAfterContentInit` when the component's view has been
initialized. Applies to components only.

`**ngAfterViewChecked()** { ... }`

Called after every check of the component's view. Applies to components only.

`**ngOnDestroy()** { ... }`

Called once, before the instance is destroyed.

Dependency injection configuration

`{ **provide**: MyService, **useClass**: MyMockService }`

Sets or overrides the provider for `MyService` to the `MyMockService` class.

`{ **provide**: MyService, **useFactory**: myFactory }`

Sets or overrides the provider for `MyService` to the `myFactory` factory
function.

`{ **provide**: MyValue, **useValue**: 41 }`

Sets or overrides the provider for `MyValue` to the value `41`.

Routing and navigation

`import { Routes, RouterModule, ... } from '@angular/router';`

`const routes: **Routes** = [  
  { path: '', component: HomeComponent },  
  { path: 'path/:routeParam', component: MyComponent },  
  { path: 'staticPath', component: ... },  
  { path: '**', component: ... },  
  { path: 'oldPath', redirectTo: '/staticPath' },  
  { path: ..., component: ..., data: { message: 'Custom' } }  
]);  
  
const routing = RouterModule.forRoot(routes);`

Configures routes for the application. Supports static, parameterized,
redirect, and wildcard routes. Also supports custom route data and resolve.

`  
<**router-outlet**></**router-outlet**>  
<**router-outlet** name="aux"></**router-outlet**>  
`

Marks the location to load the component of the active route.

`  
<a routerLink="/path">  
<a **[routerLink]**="[ '/path', routeParam ]">  
<a **[routerLink]**="[ '/path', { matrixParam: 'value' } ]">  
<a **[routerLink]**="[ '/path' ]" [queryParams]="{ page: 1 }">  
<a **[routerLink]**="[ '/path' ]" fragment="anchor">  
`

Creates a link to a different view based on a route instruction consisting of
a route path, required and optional parameters, query parameters, and a
fragment. To navigate to a root route, use the `/` prefix; for a child route,
use the `./`prefix; for a sibling or parent, use the `../` prefix.

`<a [routerLink]="[ '/path' ]" routerLinkActive="active">`

The provided classes are added to the element when the `routerLink` becomes
the current active route.

`class **CanActivate**Guard implements **CanActivate** {  
    canActivate(  
      route: ActivatedRouteSnapshot,  
      state: RouterStateSnapshot  
    ): Observable<boolean>|Promise<boolean>|boolean { ... }  
}  
  
{ path: ..., canActivate: [**CanActivate**Guard] }`

An interface for defining a class that the router should call first to
determine if it should activate this component. Should return a boolean or an
Observable/Promise that resolves to a boolean.

`class **CanDeactivate**Guard implements **CanDeactivate**<T> {  
    canDeactivate(  
      component: T,  
      route: ActivatedRouteSnapshot,  
      state: RouterStateSnapshot  
    ): Observable<boolean>|Promise<boolean>|boolean { ... }  
}  
  
{ path: ..., canDeactivate: [**CanDeactivate**Guard] }`

An interface for defining a class that the router should call first to
determine if it should deactivate this component after a navigation. Should
return a boolean or an Observable/Promise that resolves to a boolean.

`class **CanActivateChild**Guard implements **CanActivateChild** {  
    canActivateChild(  
      route: ActivatedRouteSnapshot,  
      state: RouterStateSnapshot  
    ): Observable<boolean>|Promise<boolean>|boolean { ... }  
}  
  
{ path: ..., canActivateChild: [CanActivateGuard],  
    children: ... }`

An interface for defining a class that the router should call first to
determine if it should activate the child route. Should return a boolean or an
Observable/Promise that resolves to a boolean.

`class **Resolve**Guard implements **Resolve**<T> {  
    resolve(  
      route: ActivatedRouteSnapshot,  
      state: RouterStateSnapshot  
    ): Observable<any>|Promise<any>|any { ... }  
}  
  
{ path: ..., resolve: [**Resolve**Guard] }`

An interface for defining a class that the router should call first to resolve
route data before rendering the route. Should return a value or an
Observable/Promise that resolves to a value.

`class **CanLoad**Guard implements **CanLoad** {  
    canLoad(  
      route: Route  
    ): Observable<boolean>|Promise<boolean>|boolean { ... }  
}  
  
{ path: ..., canLoad: [**CanLoad**Guard], loadChildren: ... }`

An interface for defining a class that the router should call first to check
if the lazy loaded module should be loaded. Should return a boolean or an
Observable/Promise that resolves to a boolean.

