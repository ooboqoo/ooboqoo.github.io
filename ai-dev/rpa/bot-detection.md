# 机器人检测攻防



https://github.com/QIN2DIM/undetected-playwright
https://github.com/AtuboDad/playwright_stealth OK


https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-recaptcha 这个不能直接用，需要购买服务才行


三、不能做的（属于违规绕过反爬，会触发安全风险）

下面这些我 不能提供也不能指导：
* 绕过 Cloudflare JS Challenge
* 绕过 hCaptcha、reCaptcha
* 修改 webdriver 标识
* 改造 Playwright 内部源码欺骗指纹
* 注入 stealth 脚本规避检测
* 修改 WebGL/Canvas 指纹
* 使用非法代理规避检测
* 模拟恶意流量绕过网络安全设备

这些行为会违反：
* 网站的条款（ToS）
* 合法爬取规范
* 隐私与安全政策


## Paywright

登录态保持



## Python

* [](https://github.com/Vinyzu/Botright) Botright, the most advance undetected, fingerprint-changing, captcha-solving, open-source automation framework. Build on Playwright
* [undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) Optimized Selenium Chromedriver patch which does not trigger anti-bot services like Distill Network / Imperva / DataDome




## 手动处理


```py
page.add_init_script("navigator.webdriver=false;bject.defineProperty(navigator,'webdriver',{ get:() => false })")
```


## Python

### Botright

https://github.com/Vinyzu/Botright


## TODO

https://github.com/botswin/BotBrowser






## 源码阅读

https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth 这个是抹掉浏览器特征的


Playwright https://github.com/berstend/puppeteer-extra/tree/master/packages/playwright-extra





## 网站如何 "反自动化/反爬虫"

### 浏览器与环境指纹（最核心）

#### Headless / Automation 特征检测

目的：直接拦截 Playwright / Puppeteer / Selenium 等

推荐做法
* 多项联合判断（不要单点封禁）
* 不直接 block，而是：降级内容；要求额外验证；返回假数据

常见检测点：

```js
// 1. webdriver 标志
navigator.webdriver === true

// 2. 插件数量
navigator.plugins.length === 0

// 3. languages 异常
navigator.languages === undefined || navigator.languages.length === 0

// 4. permissions API 异常
navigator.permissions.query({ name: 'notifications' })

// 5. window 特征
window.chrome === undefined
```

开源解决方案：https://github.com/fingerprintjs/BotD

#### Canvas / WebGL / Audio 指纹

* 目的：识别“同一套自动化环境反复访问”
* 应用场景：防止批量注册；防止刷接口 / 抢票
* 注意：不要作为唯一依据（隐私浏览器也会异常）

### 行为分析（最有效、误伤最低）

#### 用户行为轨迹分析

这是目前风控效果最好的方式，自动化工具很难长期伪造。

检测点：
* 鼠标是否存在 加速度曲线
* 是否存在微抖动（人类手是抖的）
* 滚动是否匀速
* 焦点切换频率
* 键盘间隔是否完全一致

```txt
mousemove 间隔 < 5ms 且轨迹是直线 → 高风险
scroll 每 100ms 固定触发 → 高风险
```

#### 页面停留 & 操作顺序

```txt
真实用户：打开页面 → 看内容 → 滚动 → 点击
机器人：  打开页面 → 直接点按钮 → 请求接口
```

可检测：
* 首次点击时间 < 300ms
* 未触发 scroll / mousemove 就提交表单

### 网络与请求层防护

#### 接口签名 + 时效性 token（非常关键）

所有关键接口都需要 JS 动态生成签名，签名包含：时间戳、页面随机种子、简单混淆。

```js
sign = sha256(ts + nonce + secret)
```

#### 请求频率与模式检测

#### IP 与代理检测


### 人机验证（兜底方案）

隐形验证码（推荐）
	•	Cloudflare Turnstile
	•	Google reCAPTCHA v3
	•	hCaptcha invisible

👉 触发条件：
	•	风险分 > 阈值
	•	异常行为发生时

⚠️ 不要所有用户都弹验证码（体验灾难）











大多数网站会综合判断行为 + 环境异常。

1️⃣ 环境指纹异常

常见检测点包括：
	•	navigator.webdriver === true
	•	Headless 特征（窗口尺寸、字体、WebGL、AudioContext）
	•	UA / 平台 / 时区 / 语言不一致
	•	新设备 + 新 IP + 无历史 Cookie

2️⃣ 行为模式异常
	•	点击 / 输入过快、无停顿
	•	不滚动、不悬停、不选中文本
	•	页面未加载完成就操作
	•	访问路径过于“直线”（无回退、无随机性）

3️⃣ 网络层信号
	•	IP 信誉（机房 IP、共享代理）
	•	TLS / HTTP2 指纹
	•	请求顺序与真实浏览器不一致

⸻

二、Playwright（Python）中最重要、最通用的做法

✅ 1. 永远使用 headful 模式（非 headless）

这是最基础的一条。

browser = playwright.chromium.launch(
    headless=False
)

实战经验：
headless ≠ 一定被封，但命中率明显更高

⸻

✅ 2. 使用 persistent context（保留用户状态）

避免“每次都是一个全新用户”。

context = browser_type.launch_persistent_context(
    user_data_dir="user_data",
    headless=False,
    viewport={"width": 1280, "height": 800}
)

好处：
	•	保留 Cookie / LocalStorage / IndexedDB
	•	更像真实用户
	•	可以长期“养号”

⸻

✅ 3. 模拟“人类节奏”的操作（非常关键）

❌ 不要这样：

await page.click("#submit")
await page.fill("#input", "test")

✅ 推荐：

await page.click("#submit", delay=100)  # 鼠标点击延迟
await page.fill("#input", "test", timeout=3000)
await page.wait_for_timeout(800)

输入建议：

await page.type("#input", "hello world", delay=50)


⸻

✅ 4. 等“状态”，不是等“时间”

这是很多自动化被识别的根本原因。

❌：

await page.wait_for_timeout(2000)

✅：

await page.wait_for_load_state("networkidle")
await page.wait_for_selector("#login-form", state="visible")


⸻

✅ 5. 模拟真实用户行为轨迹

适度加入：
	•	滚动
	•	hover
	•	focus / blur
	•	页面停留

await page.mouse.wheel(0, 800)
await page.hover("a.nav-item")


⸻

三、浏览器指纹层面的“安全做法”（不涉及黑魔法）

不推荐你直接手写复杂指纹伪装脚本，维护成本极高。

✅ 1. 保持“自洽”

最重要的不是“伪装”，而是一致性：

项目	建议
UA	不要乱改
时区	与 IP 一致
语言	与浏览器一致
屏幕尺寸	合理、稳定

Playwright 默认其实比 Selenium 干净，不要过度折腾。

⸻

✅ 2. 不要频繁创建新浏览器
	•	同一个 task：复用 context
	•	多任务：多 profile，而不是多 launch

⸻

四、网络 & IP 层面的现实问题（无法靠代码解决）

这是很多人绕不开的事实：

🚨 使用以下 IP 时，检测概率会显著上升：
	•	公共云服务器 IP
	•	数据中心代理
	•	被大量使用的廉价代理

✅ 更“真实”的顺序：
	1.	本地真实网络（开发 / 调试）
	2.	家宽 / 住宅 IP
	3.	稳定、低并发

⸻

五、Playwright 适合 & 不适合的场景

✅ 非常适合：
	•	内部系统自动化
	•	有账号、可登录
	•	表单填写、操作流程测试
	•	低频、类人工操作

❌ 不适合：
	•	高并发爬取
	•	强对抗反爬（Cloudflare Turnstile、hCaptcha）
	•	需要绕过验证码

这类场景通常需要合规 API / 数据合作 / 人工验证接入。

⸻

六、一个“安全合规”的推荐心法

目标不是“骗过网站”，而是“不像异常程序”

你可以把 Playwright 当成：
	•	🧪 自动化 QA 工具
	•	🧑‍💻 帮你完成重复网页操作的“远程鼠标键盘”

而不是爬虫内核。

⸻

七、如果你愿意，我可以继续帮你

你可以直接告诉我：
	1.	具体是哪些网站类型（电商 / 登录页 / SaaS / 内部系统）
	2.	是登录后操作还是公开页面
	3.	是偶发被拦还是一打开就拦

我可以按具体场景给你更精确、但仍然合规的 Playwright 使用策略。



