# Language Specification


Basic Go Types

|||
|---------|--------------
| bool    | true false
| string  | "Hello World"
| int     |  0 -100 999
| float64 | 10.01 -0.003


```go
name := "gavin"
name = "foo"


func foo() string {
  return "foo"
}
```

Array: Fixed lenght list of things
Slice: An array that can grow or shrink. Every element in a slice must be of same type


```go
for index, product := range products {
  fmt.Println(product)
}
```

