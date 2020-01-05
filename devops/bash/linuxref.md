# Linux 命令速查表


## 命令

```bash
$ rm -rf <dir>   # 删除目录
```

```bash
$ date [+format]  # 查看日期
$ cal             # 日历
```

```
$ uptime  # 开机运行时间
$ w       # display who is logged in and what they are doing

$ netstat 
```


## 单行脚本

> 把 **命令** 看成是 **函数**，就特别好理解。

```bash
$ command && echo "TRUE" || echo "FALSE"
```


## 语法



## 综合应用

统计项目中 CSS 样式用了多少 `font-size` 属性

```bash
$ grep -r font-size . | wc -l
```

批量删除除了某一个文件以外的所有文件

```bash
$ ls | grep -v myfile.js | xargs rm
```

批量改文件名后缀

```bash
for f in *.fromext; do mv -- "$f" "${f%.formext}.toext"; done
```


