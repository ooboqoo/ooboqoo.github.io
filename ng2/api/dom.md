# DOM 相关 API

参考 http://www.cnblogs.com/Answer1215/p/5898545.html

### ElementRef:

In Angular2 Doc, it suggest to "avoid" using ElementRef. It access DOM directly, can easily be attacked.

```ts
import {Component, OnInit, ViewChild, Renderer, ElementRef} from ‘@angular/core‘;

@Component({
  selector: ‘widget-three‘,
  template: `<input type="text" #inputRef/>`
})
export class WidgetThree {
  constructor(private elm: ElementRef) { console.log("elm:", this.elm) }
}
```

If we log out the ElementRef, we can see, it refer to host element.


### Renderer:

In the doc, it also suggest, if you want to change some dom prop, use Renderer instead. ElementRef can be just a reference to access native element object.

```ts
import { Directive, ElementRef, Input, Renderer } from ‘@angular/core‘;
@Directive({ selector: ‘[myHighlight]‘ })
export class HighlightDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementStyle(el.nativeElement, ‘backgroundColor‘, ‘yellow‘);
  }
}
```

This will set the host element background as yellow.


### @ViewChild():

Access Child element by Ref or Class Object.

```ts
import {Component, OnInit, ViewChild, Renderer} from ‘@angular/core‘;

@Component({
  moduleId: module.id,
  selector: ‘widget-three‘,
  template: `<input type="text" #inputRef/>`
})
export class WidgetThree {
  @ViewChild(‘inputRef‘) input;
  constructor(private renderer: Renderer) { }

  ngAfterViewInit(){
    this.renderer.invokeElementMethod(
        this.input.nativeElement,
        ‘focus‘,
        []
    );
  }
}
```

Here we have a ref "inputRef", we use ref to access input element.

`invokeElementMethod` will call the `focus` method the the input nativeElement which should be:
`this.input.nativeElement.focus()` 
But the risk is on mobile it might have different method to focus on input, `invokeElementMethod` can safely help us to call the method.
