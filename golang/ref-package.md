# Package Documentation


## Package builtin

https://golang.org/pkg/builtin/

The items documented here are not actually in package builtin but their descriptions here allow godoc to present documentation for the language's special identifiers.

```go
// Constants
true
false
// Variables
nil

// func
func append(slice []Type, elems ...Type) []Type
func cap(v Type) int

func len(v Type) int
func make(t Type, size ...IntegerType) Type

func print(args ...Type)
func println(args ...Type)

// type
type ComplexType complex64
type FloatType float32
type IntegerType int
type Type int
type Type1 int
type bool bool
type byte = uint8
type complex128 complex128

```
