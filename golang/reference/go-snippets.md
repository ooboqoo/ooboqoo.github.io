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

