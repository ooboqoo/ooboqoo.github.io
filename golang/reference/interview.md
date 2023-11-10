# 面试题


### 闭包引用反直觉

```go
func main() {
  str := "abc"
  for index, r := range str {
    go func() { println(index, string(r)) }()
  }
  time.Sleep(1 * time.Second)
}

// Output:
// 2 c
// 2 c
// 2 c
```

```go
// 前端习惯的解法
func main() {
	str := "abc"
	for index, r := range str {
		go func(index int, r rune) { println(index, string(r)) }(index, r)
	}
	time.Sleep(1 * time.Second)
}

// 后端习惯的解法
func main() {
	str := "abc"
	for index, r := range str {
		index, r := index, r
		go func() { println(index, string(r)) }()
	}
	time.Sleep(1 * time.Second)
}

// Output:
// 0 a
// 2 c
// 1 b
```

### 闭包变量与并发安全

变量并发不安全示例

```go
func main() {
	count := 0
	for i := 0; i < 1000000; i++ {
		go func() {
			print(i, ", ")  // 这里循环次数多，打印的 i 是会变的，如果数值循环次数少的话估计就一直是最大值
			count++
		}()
	}
	time.Sleep(10 * time.Second)
	println(count)  // 这里大概率是一个 930000 ~ 950000 之间的数值
}
```


### 字符串长度

```go
func main() {
	str := "中国123"
	println(len(str))         // 9
	println(len([]rune(str))) // 5
}
```


