# SyntheticEvent

## Overview

Your event handlers will be passed instances of `SyntheticEvent`, a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event, except the events work identically across all browsers.

If you find that you need the underlying browser event for some reason, simply use the `nativeEvent` attribute to get it. Every `SyntheticEvent` object has the following attributes:

|||
|-------------|--------------------------
| target      | DOMEventTarget
| nativeEvent | DOMEvent
| type        | string
|||
| bubbles          | boolean
| cancelable       | boolean
| currentTarget    | DOMEventTarget
| defaultPrevented | boolean
| eventPhase       | number
| isTrusted        | boolean
| timeStamp        | number
|||
| stopPropagation()      | void
| preventDefault()       | void
| isPropagationStopped() | boolean
| isDefaultPrevented()   | boolean

> Returning `false` from an event handler will no longer stop event propagation. Instead, `e.stopPropagation()` or `e.preventDefault()` should be triggered manually, as appropriate.

### Event Pooling

The `SyntheticEvent` is pooled. This means that the `SyntheticEvent` object will be reused and all properties will be nullified after the event callback has been invoked.
This is for performance reasons.
As such, you cannot access the event in an asynchronous way.

```javascript
function onClick(event) {
  console.log(event);           // => nullified object.
  console.log(event.type);      // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type);  // => null
    console.log(eventType);   // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```

> If you want to access the event properties in an asynchronous way, you should call `event.persist()` on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code.

### Capture Phase

React normalizes events so that they have consistent properties across different browsers.

The event handlers are triggered by an event in the bubbling phase. To register an event handler for the capture phase, append `Capture` to the event name; for example, instead of using `onClick`, you would use `onClickCapture` to handle the click event in the capture phase.

### ??????

https://stackoverflow.com/questions/38619981/react-prevent-event-bubbling-in-nested-components-on-click

???????????? React ?????????????????????????????????????????? `<html>` ????????????????????????????????????????????? `e.stopPropagation()`??????????????? React ??????????????????????????????????????? React ??????????????????????????????

React uses event delegation with a single event listener on document for events that bubble, like 'click' in this example, which means stopping propagation is not possible; the real event has already propagated by the time you interact with it in React. stopPropagation on React's synthetic event is possible because React handles propagation of synthetic events internally.

```jsx
import React, {useRef, useEffect} from 'react';

function App() {
  const parentRef = useRef();
  const childRef= useRef();
  const log = console.log;

  useEffect(() => {
    parentRef.current.addEventListener('click', e => {
      log('[Parent] native capture', e);
    }, true);
    parentRef.current.addEventListener('click', e => {
      log('[Parent] native', e);
    }, false);
    childRef.current.addEventListener('click', e => {
      log('[Child] native capture', e);
    }, true);
    childRef.current.addEventListener('click', e => {
      log('[Child] native', e);
    }, false);
  }, [log]);

  return (
    <div>
      <div
        ref={parentRef}
        onClickCapture={e => {
          e.stopPropagation();  // ?????? native handler ????????????
          log('[Parent] onClickCapture', e);
        }}
        onClick={e => log('[Parent] onClick', e)}
      >
        <button
          ref={childRef}
          onClickCapture={e => log('[Child] onClickCapture', e)}
          onClick={e => log('[Child] onClick', e)}
        >Click Me</button>
      </div>
    </div>
  );
}

export default App;

// [Parent] native capture MouseEvent??{isTrusted: true, screenX: 2606,?????}
// [Child] native capture MouseEvent??{isTrusted: true, screenX: 2606,?????}
// [Child] native MouseEvent??{isTrusted: true, screenX: 2606, ???}
// [Parent] native MouseEvent??{isTrusted: true, screenX: 2606,?????}
// [Parent] onClickCapture Class??{nativeEvent: MouseEvent, type: "click", target: button,?????}
```

If you call e.preventDefault() in all of your events, you can check if an event has already been handled, and prevent it from being handled again:

```js
handleEvent(e) {
  if (e.defaultPrevented) return  // Exits here if event has been handled
  e.preventDefault()

  // Perform whatever you need to here.
}
```

## Reference

### Clipboard Events

Event names: `onCopy` `onCut` `onPaste`

|||
|---------------|-----------------
| clipboardData | DOMDataTransfer


### Composition Events

Event names: `onCompositionEnd` `onCompositionStart` `onCompositionUpdate`

|||
|------|--------
| data | string

### Keyboard Events

Event names: `onKeyDown` `onKeyPress` `onKeyUp`

|||
|-----------|--------
| altKey    | boolean
| charCode  | number
| ctrlKey   | boolean
| getModifierState(key) | boolean
| key       | string
| keyCode   | number
| locale    | string
| location  | number
| metaKey   | boolean
| repeat    | boolean
| shiftKey  | boolean
| which     | number

### Focus Events

Event names: `onFocus onBlur`

These focus events work on all elements in the React DOM, not just form elements.

|||
|---------------|--------
| relatedTarget | DOMEventTarget

### Form Events

Event names: `onChange` `onInput` `onSubmit`

For more information about the onChange event, see [Forms](/react/docs/forms.html).

### Mouse Events

Event names:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

The `onMouseEnter` and `onMouseLeave` events propagate from the element being left to the one being entered instead of ordinary bubbling and do not have a capture phase.

|||
|-----------|--------
| altKey   | boolean
| button   | number
| buttons  | number
| clientX  | number
| clientY  | number
| ctrlKey  | boolean
| getModifierState(key) | boolean
| metaKey  | boolean
| pageX    | number
| pageY    | number
| relatedTarget | DOMEventTarget
| screenX  | number
| screenY  | number
| shiftKey | boolean


### Selection Events

Event names: `onSelect`

### Touch Events

Event names:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

|||
|----------------|--------
| altKey         | boolean
| changedTouches | DOMTouchList
| ctrlKey        | boolean
| getModifierState(key) | boolean
| metaKey        | boolean
| shiftKey       | boolean
| targetTouches  | DOMTouchList
| touches        | DOMTouchList

### UI Events

Event names: `onScroll`

|||
|-----------|--------
| detail    | number
| view      | DOMAbstractView

### Wheel Events

Event names: `onWheel`

|||
|-----------|--------
| deltaMode | number
| deltaX    | number
| deltaY    | number
| deltaZ    | number

### Media Events

Event names:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```


### Image Events

Event names: `onLoad` `onError`

### Animation Events

Event names: `onAnimationStart` `onAnimationEnd` `onAnimationIteration`

|||
|---------------|--------
| animationName | string
| pseudoElement | string
| elapsedTime   | float

### Transition Events

Event names: `onTransitionEnd`

|||
|---------------|----------
| propertyName  | string
| pseudoElement | string
| elapsedTime   | float

### Other Events

Event names: `onToggle`


<style>
  td:first-child { color: red; }
  i { color: gray; }
</style>
