# Flow Type Annotations

https://flow.org/en/docs/types/

## Primitive Types

JavaScript has a number of different primitive types (MDN):

* Booleans
* Strings
* Numbers
* null
* undefined (void in Flow types)
* Symbols (new in ECMAScript 2015, not yet supported in Flow)

Types for literal values are lowercase.

```
function method(x: number, y: string, z: boolean) { }
method(3.14, "hello", true);
```

Types for the wrapper objects are capitalized (the same as their constructor).

```
function method(x: Number, y: String, z: Boolean) { }
method(Number(42), String("world"), Boolean(false));
```

These wrapper objects are rarely used.

### `null` and `void` 

JavaScript has both `null` and `undefined`. Flow treats these as separate types: `null` and `void` (for `undefined`).

### Maybe types

```
function acceptsMaybeString(value: ?string) { }

acceptsMaybeString("bar");     // Works!
acceptsMaybeString(undefined); // Works!
acceptsMaybeString(null);      // Works!
acceptsMaybeString();          // Works!
```

### Optional object properties

```
function acceptsObject(value: { optionalProp?: string }) { }

acceptsObject({ foo: "bar" });     // Works!
acceptsObject({ foo: undefined }); // Works!
acceptsObject({ foo: null });      // Error!
acceptsObject({});                 // Works!
```

### Function parameters with defaults

Function parameters can also have defaults. This is a feature of ECMAScript 2015.

```
function method(value: string = "default") { /* ... */ }
```

In addition to their set type, default parameters can also be `void` or omitted altogether. However, they cannot be `null`.























