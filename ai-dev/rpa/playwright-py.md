# Playwright Python


## Getting started

### Installation

```bash
uv add playwright
uv run playwright install chromium
```

### Usage

```py
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("https://playwright.dev")
        print(await page.title())
        await browser.close()

asyncio.run(main())
```




## Locators

These are the recommended built-in locators.

* `page.get_by_role()` to locate by explicit and implicit accessibility attributes.
* `page.get_by_text()` to locate by text content.
* `page.get_by_label()` to locate a form control by associated label's text.
* `page.get_by_placeholder()` to locate an input by placeholder.
* `page.get_by_alt_text()` to locate an element, usually image, by its text alternative.
* `page.get_by_title()` to locate an element by its title attribute.
* `page.get_by_test_id()` to locate an element based on its data-testid attribute (other attributes can be configured).

```py
await page.get_by_label("User Name").fill("John")
await page.get_by_label("Password").fill("secret-password")
await page.get_by_role("button", name="Sign in").click()
await expect(page.get_by_text("Welcome, John!")).to_be_visible()
```


## Events

### Waiting for event

```py
async with page.expect_popup() as popup:
  await page.get_by_text("open the popup").click()
child_page = await popup.value  # `popup.value` 是一个 awaitable（可等待对象）`await popup.value` 才能得到真正的值
await child_page.goto("https://wikipedia.org")
```

对比 JS 的写法

```js
// Start waiting for popup before clicking. Note no await.
const popupPromise = page.waitForEvent('popup');
await page.getByText('open the popup').click();
const popup = await popupPromise;
await popup.goto('https://wikipedia.org');
```

Python 语法讲解

```py
# 同步写法
with xxx as y:
	...
# 异步写法，async with 允许你等待一个异步事件（比如 popup 出现），并确保资源正确清理。
async with xxx as y:
	...
```





### Adding / removing event listener

```py
def print_request_sent(request):
  print("Request sent: " + request.url)

def print_request_finished(request):
  print("Request finished: " + request.url)

page.on("request", print_request_sent)
page.on("requestfinished", print_request_finished)
await page.goto("https://wikipedia.org")

page.remove_listener("requestfinished", print_request_finished)
await page.goto("https://www.openstreetmap.org/")
```

### Adding one-off listeneres

```py
page.once("dialog", lambda dialog: dialog.accept("2021"))
await page.evaluate("prompt('Enter a number:')")
```


