# How Angular Works

本章通过一个 库存目录 app 进一步说明 Angular2 的工作过程。   
笔记有点乱，先跳过吧。

## Application

An Angular 2 Application is nothing more than a tree of Components.

At the root of that tree, the top level Component is the application itself. And that’s what the browser will render when “booting” (a.k.a bootstrapping) the app.

One of the great things about Components is that they’re composable. This means that we can build up larger Components from smaller ones. The Application is simply a Component that renders other Components.

Because Components are structured in a parent/child tree, when each Component renders, it recursively renders its children Components.

### Product Model

Angular is flexible enough to be support many different kinds of models (and data architectures). We’ll have a lot to say about data architectures in future chapters. For now, though, we’re going to have our models be plain JavaScript objects.

### Components

> Tips: When building a new Angular application, mockup the design and then break it down
into Components.

Each components is composed of three parts:

* Component Decorator
* A View
* A Controller

```ts
// app.component.ts
@Component({
  selector: 'inventory-app',
  template: `
  <div class="inventory-app">(Products will go here soon)</div>
  `
})
class InventoryApp {
  // Inventory logic here
}
```

The @Component is called a decorator. It adds metadata to the class that follows it ( InventoryApp ).
The @Component annotation specifies:

* a selector , which tells Angular what element to match
* a template , which defines the view

The Component controller is defined by a class, the InventoryApp class, in this case.

## Component Decorator

The `@Component` decorator is where you configure your component. Primarily, @Component will
configure how the outside world will interact with your component.

### selector

With the selector key, you indicate how your component will be recognized when rendering HTML templates. The idea is similar to CSS or XPath selectors. The selector is a way to define what elements in the HTML will match this component.

```html
<inventory-app></inventory-app>
<div inventory-app></div>  <!-- we can also use a regular div and specify the component as an attribute -->
```

### template

```ts
@Component({
  selector: 'inventory-app',
  template:   // 也可以使用 templateUrl 导入独立的模板文件
  `
  <div class="inventory-app">
    (Products will go here soon)
  </div>
  `
  })
```

### Adding A Product

> 当参数超过5个时，更好的办法是采用 obj 传递参数，这样就不用去记参数顺序了。

```ts
class InventoryApp {
  product: Product;
  constructor() {
    this.product = new Product(
      'NICEHAT',
      'A Nice Black Hat',
      '/resources/images/products/black-hat.jpg',
      ['Men', 'Accessories', 'Hats'],
      29.99);
  }
}
```

### Viewing the Product with Template Binding

```ts
@Component({
  selector: 'inventory-app',
  template: `
  <div class="inventory-app">
  <h1>{{ product.name }}</h1>
  <span>{{ product.sku }}</span>
  </div>
  `
})  // Using the {{ … }} syntax is called template binding
```

Using template binding tags is the main way that you’ll show data in your Angular applications.

### Adding More Products

```ts
class InventoryApp {
  products: Product[];
  constructor() {
    this.products = [
      new Product(
        'MYSHOES',
        'Black Running Shoes',
        '/resources/images/products/black-shoes.jpg',
        ['Men', 'Shoes', 'Running Shoes'],
        109.99),
      new Product(
        'NEATOJACKET',
        'Blue Jacket',
        '/resources/images/products/blue-jacket.jpg',
        ['Women', 'Apparel', 'Jackets & Vests'],
        238.99)
    ];
  }
}
```

### Selecting a Product

### Listing products using &lt;products-list>

```ts
@Component({
  selector: 'inventory-app',
  template: `
  <div class="inventory-app">
    <products-list
      [productList]="products"                           // input
      (onProductSelected)="productWasSelected($event)">  // output
    </products-list>
  </div>
  `
})
class InventoryApp { }
```

### Inputs and Outputs

The [squareBrackets] pass inputs and the (parenthesis) handle outputs.

Data flows into your component via input bindings and events flow out of your component through output bindings.

Think of the set of input + output bindings as defining the public API of your component.

## The ProductsList Component

```ts
/**
 * @ProductsList: A component for rendering all ProductRows and
 * storing the currently selected Product
 */
 @Component({
   selector: 'products-list',
   inputs: ['productList'],
   outputs: ['onProductSelected'],
   template: ``
})
```

### Component inputs

When we specify that a Component takes an input, it is expected that the definition class will have an instance variable that will receive the value. For example, say we have the following code:

```ts
@Component({
  selector: 'my-component',
  inputs: ['name', 'age']
})
class MyComponent {
  name: string;
  age: number;
}
```

If we want to use MyComponent from another template, we write something like: 

```html
<my-component [name]='myName' [age]='myAge'></my-component> 
```

For instance, say we wanted our attribute key and instance property to differ.

```html
<my-component [shortName]='myName' [oldAge]='myAge'></my-component>
```

```ts
@Component({
  selector: 'my-component',
  inputs: ['name: shortName', 'age: oldAge']
  })
class MyComponent {
  name: string;
  age: number;
}
```

#### Passing products through via the inputs

### Component outputs

### Emitting Custom Events

Let’s say we want to create a component that emits a custom event, like click or mousedown above.

To create a custom output event we do three things:

1. Specify outputs in the @Component configuration
2. Attach an EventEmitter to the output property
3. Emit an event from the EventEmitter , at the right time

> An EventEmitter is simply an object that helps you implement the Observer Pattern.
```ts
let ee = new EventEmitter();
ee.subscribe((name: string) => console.log(`Hello ${name}`));
ee.emit("Nate");  // -> "Hello Nate"
```

```ts
@Component({
  selector: 'single-component',
  outputs: ['putRingOnIt'],
  template: `
  <button (click)="liked()">Like it?</button>
  `
})
class SingleComponent {
  putRingOnIt: EventEmitter<string>;
  constructor() { this.putRingOnIt = new EventEmitter(); }
  liked(): void { this.putRingOnIt.emit("oh oh oh"); }
}
```

If we wanted to use this output in a parent component we could do something like this:

```ts
@Component({
  selector: 'club',
  template: `
  <single-component (putRingOnIt)="ringWasPlaced($event)" ></single-component>
  `
})
class ClubComponent {
  ringWasPlaced(message: string) {
    console.log(`Put your hands up: ${message}`);  // logged -> "Put your hands up: oh oh oh"
  }
}
```

### Writing the ProductsList Controller Class


## NgModule and Booting the App

```ts
@NgModule({
  declarations: [
    InventoryApp,
    ProductImage,
    ProductDepartment,
    PriceDisplay,
    ProductRow,
    ProductsList
  ],
  imports: [ BrowserModule ],
  bootstrap: [ InventoryApp ]
})
class InventoryAppModule {}
```

Angular provides a module system that helps organize our code. Unlike Angular 1, where all
directives are essentially globals, in Angular 2 you must specifically say which components you’re
going to be using in your app.

While it is a bit more configuration to do it this way, it’s a lifesaver for larger apps.

> Remember every component you write must be declared in one NgModule before it can be
used in a template.

## A Word on Data Architecture

双向数据绑定会导致数据结构和 DOM结构的强耦合。

自上而下的单向数据绑定 + 向上的数据传递采用事件。




