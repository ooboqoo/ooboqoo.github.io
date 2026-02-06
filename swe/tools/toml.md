# TOML & INI

TOML https://github.com/toml-lang/toml  
INI https://en.wikipedia.org/wiki/INI_file  


## YAML vs TOML vs INI

TOML 是一种配置文件格式，比 INI 强大，比 YAML 克制。

### TOML vs YAML

相似点
* 都强调人类可读
* 都支持注释

不同点（TOML 更简单 vs YAML 更强大）
* TOML 只可作为配置文件使用，不打算用于序列化数据结构

#### YAML 的“坑”

YAML 为了“像自然语言”，牺牲了可预测性。

```yaml
on: true     # 是字符串还是 bool？
yes: yes     # bool
no: no       # bool

port: 080    # 是 80？还是八进制？

key:
value        # 缩进错了直接炸
```

#### TOML 的态度

```toml
on = "on"    # 字符串
on = true    # bool
```

* 所有类型 必须明确
* 不搞隐式推断
* 机器和人理解完全一致

### TOML vs INI

* 相似点：都是配置文件格式，且语法相似
* 不同点：INI 没有统一的标准，且无法处理多层嵌套

附注：`.ini` (initialization) 是 MS-DOS 时代流行的配置文件格式。

### 各格式示例

INI

```ini
; This is a INI document.

; last modified 1 April 2001 by John Doe
[owner]
name = John Doe
organization = Acme Widgets Inc.

[database]
; use IP address in case network name resolution is not working
server = 192.0.2.62     
port = 143
file = "payroll.dat"
```

TMOL

```toml
# This is a TOML document.

title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
dob = 1979-05-27T07:32:00-08:00 # First class dates

[database]
server = "192.168.1.1"
ports = [ 8000, 8001, 8002 ]
connection_max = 5000
enabled = true

[servers]

  # Indentation (tabs and/or spaces) is allowed but not required
  [servers.alpha]
  ip = "10.0.0.1"
  dc = "eqdc10"

  [servers.beta]
  ip = "10.0.0.2"
  dc = "eqdc10"

[clients]
data = [ ["gamma", "delta"], [1, 2] ]

# Line breaks are OK when inside arrays
hosts = [
  "alpha",
  "omega"
]
```

YAML (上面的 TOML 文件转的)

```yaml
title: TOML Example
owner:
  name: Tom Preston-Werner
  dob: 1979-05-27T15:32:00.000Z
database:
  server: 192.168.1.1
  ports:
    - 8000
    - 8001
    - 8002
  connection_max: 5000
  enabled: true
servers:
  alpha:
    ip: 10.0.0.1
    dc: eqdc10
  beta:
    ip: 10.0.0.2
    dc: eqdc10
clients:
  data:
    - - gamma
      - delta
    - - 1
      - 2
  hosts:
    - alpha
    - omega
```


## 基本语法速览

### 注释

```toml
# 这是注释
```

### 键值对（最核心）

```toml
name = "Gavin"
age = 18
active = true
```

### 字符串

```toml
title = "Hello"           # 支持转义
path = 'C:\Users\Gavin'   # raw string

multiline = """
多行
字符串
"""
```

### 数组

```toml
ports = [8000, 8001, 8002]
names = ["Alice", "Bob"]
flags = [true, false]

# 数组内类型必须一致（非常重要）
bad = [1, "two"]  # ❌ 不允许
```

### 表（Table）= 分组 / 命名空间

```toml
[database]
host = "localhost"
port = 5432
```

等价于 JSON

```json
{
  "database": {
    "host": "localhost",
    "port": 5432
  }
}
```

### 嵌套表

```toml
[server.http]
port = 8080
```

等价于 YAML

```yaml
server:
  http:
    port: 8080
```

### 表数组（非常常用）

```toml
[[users]]
name = "Alice"
role = "admin"

[[users]]
name = "Bob"
role = "user"
```

等价结构

```json
{
  "users": [
    { "name": "Alice", "role": "admin" },
    { "name": "Bob", "role": "user" }
  ]
}
```

### 时间 / 日期（TOML 的强项）

这是 YAML / JSON 没有统一规范的地方

```toml
date = 2025-12-16
time = 09:30:00
timestamp = 2025-12-16T09:30:00Z
```


