# 索引

[Learn Go: Top 30 Go Tutorials for Programmers Of All Levels](https://stackify.com/learn-go-tutorials/)


```go
package main

import "fmt"

func main() {
  fmt.Println("Hello world")
}

```

Questions!
1. How do we run the code in our project?
2. What does `package main` mean?
3. What does `import "fmt"` mean?
4. What's that `func` thing?
5. How is the main.go file organized?

Package == Project == Workspace

Types of Packages
* Executable: Generates a file that we can run
* Reusable: Code used as "helpers", good place to put reusable logic

```
main
  |- fmt         // standard lib
  |- calculator  // reusable package
  |- uploader    // reusable package
  |- ...
```




```go
var name string = "gavin"
```


## 库



ORM框架 https://gorm.io/docs/index.html




