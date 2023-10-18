# TOML & INI

TOML https://github.com/toml-lang/toml  
INI https://en.wikipedia.org/wiki/INI_file  


## YAML vs TOML vs INI

### TOML vs YAML

相似点
* 都强调人类可读
* 都支持注释

不同点（TOML 更简单 vs YAML 更强大）
* TOML 只可作为配置文件使用，不打算用于序列化数据结构

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


