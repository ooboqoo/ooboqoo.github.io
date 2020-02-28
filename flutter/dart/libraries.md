# Core Libraries


## Multi-platform libraries

### dart:core

Built-in types, collections, and other core functionality for every Dart program.


### dart:collectionn

Classes and utilities that supplement the collection support in dart:core.

```dart
part of dart.collection;

abstract class Queue<E> implements EfficientLengthIterable<E> {
  factory Queue() = ListQueue<E>;
  factory Queue.from(Iterable elements) = ListQueue<E>.from;
  factory Queue.of(Iterable<E> elements) = ListQueue<E>.of;

  static Queue<T> castFrom<S, T>(Queue<S> source) => CastQueue<S, T>(source);
  Queue<R> cast<R>();

  E removeFirst();
  E removeLast();
  void addFisrt(E value);
  void addLast(E value);
  void add(E value);
  bool remove(Object value);
  void addAll(Iterable<E> iterable);
  void removeWhere(bool test(E element));
  void retainWhere(bool test(E element));
  void clear();
}

class _DoubleLink<Link> extends _DoubleLink<Link>> { /* ... */ }
class DoubleLinkedQueueEntry<E> extends _DoubleLink<DoubleLinkedQueueEntry>> { /* ... */ }
class ListQueue<E> extends ListIterable<E> implements Queue<E> { /* ... */ }
// ...
```



### dart:convert

Encoders and decoders for converting between different data representations, including JSON and UTF-8.



### dart:math

Mathematical constants and functions, plus a random number generator.

### dart:async

Support for asynchronous programming, with classes such as Future and Stream.

### dart:developer (JIT and dartdevc only)

Interaction with developer tools such as the debugger and inspector.

### dart:typed_data

Lists that efficiently handle fixed sized data (for example, unsigned 8-byte integers) and SIMD numeric types.




## Native platform libraries

### dart:io


### dart:isolate



## Web platform libraries

### dart:html

### dart:idexed_db

### dart:web_audio

### dart:web_gl

