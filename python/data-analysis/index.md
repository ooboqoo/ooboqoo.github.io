# 数据分析


## 案例

### 获取 wikipedia 词条信息

```py
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re

resp = urlopen("https://en.wikipedia.org/wiki/Main_Page").read().decode("utf-8")

soup = BeautifulSoup(resp, "html.parser")

listUrls = soup.findAll("a", href=re.compile("^/wiki/"))

for url in listUrls:
    if not re.search("\.(jpg|JPG)$", url["href"]):
        print(url.get_text(), "<-->", "https://en.wikipedia.org" + url["href"])
```























































