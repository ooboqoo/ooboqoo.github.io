# Go Snippets

https://gophersnippets.com/




### Maps

把 []struct 转换成以 struct 中某个元素为 key 的 map

```go
// 手动
mp := make(map[int]*Model)
for _, model := range models {
  mp[model.id] = &model
}

// funk.ToMap()
```

实现 string set

```go
// 实现 string set
map[string]bool
```



### 字符串拼接

1. 如果短，变量少，可以用 `+` 拼接
2. 如果短，变量多，可以用 `fmt.Sprintf`，性能比 `+` 差
3. 如果长，可以用 `strings.Builder` （性能也比 `fmt` 好）
4. 如果长，且变量多，甚至涉及循环、条件，用 `text/template` 包，看起来清晰

```go
func main() {
  // Create a template with placeholders for the variables
  t := template.Must(template.New("Demo").Parse("My name is {{.Name}}, I am {{.Age}} years old."))

  // Execute the template to stdout, passing the variables
  t.Execute(os.Stdout, map[string]any{"Name": "John", "Age": 30})
}
```

### min

```go
func min(nums ...int) int {  // 注意这里 `...` 的用法
  if len(nums) == 0 {
    panic("min: no arguments")
  }
  minimum := math.MaxInt
  for _, num := range nums {
    if num < minimum {
      minimum = num
    }
  }
  return minimum
}
```

### 利用通道来调度协程

```go
// 利用 chan 来控制协程的执行，非常巧妙地取代了 sync.WaitGroup
func main() {
  c := make(chan bool)

  for i := 0; i < 3; i++ {
    // 如果没有这行，下面的 i 始终会是 3，因为循环内部只有一个 i
    // 此问题将在 1.22 中得到解决 https://go.dev/blog/loopvar-preview
    i := i
    go func() {
      println("goroutine message", i)
      c <- true
    }()
  }

  <-c                              // 确保有一个协程已经执行完毕
  println("main function message") // 这一条会出现在第二或第三行
  <-c                              // 确保又有一个协程已经执行完毕
  // <-c // 如果注释掉这一行，第三条 "goroutine message" 基本来不及输出
}
```

