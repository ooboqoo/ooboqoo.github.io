# Playwright JS


英文里 playwright 原本的意思是 “剧作家”，即写戏剧剧本的人。英文中的 wright 不是“写”，而是“工匠”的意思。


## Getting started

### Playwright Test vs Playwright Library

https://playwright.dev/docs/library

**Playwright Library** provides unified APIs for launching and interacting with browsers, while **Playwright Test** provides all this plus a fully managed end-to-end Test Runner and experience.

### Usage

Install Playwright library and browsers.

```bash
npm i playwright
npx playwright install chromium webkit
```

Import Playwright in a Node.js script and launch the browsers.

```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto('https://playwright.dev/');
  await page.screenshot({ path: `example.png` });
  await browser.close();
})();
```


## 调试

### headful + slowMo

```js
const browser = await chromium.launch({
  headless: false, // 打开浏览器界面
  slowMo: 300,     // 每个操作慢 300ms
});
```

### page.pause()

```js
await page.pause(); // 必须要带 await，不然代码无法正常停住
```

效果
* 浏览器会停住
* 自动打开 Playwright Inspector

### 环境变量 PWDEBUG=1

```bash
PWDEBUG=1 node script.js
```

自动
* headless: false
* slowMo
* 打开 Playwright Inspector

所有步骤可单步执行。

### 其他辅助技巧

```js
page.on('request', r => console.log('>>', r.url()));
page.on('response', r => console.log('<<', r.status(), r.url()));
```


## Locators

Locators are the *central piece* of Playwright's auto-waiting and retry-ability. In a nutshell, locators represent a way to find element(s) on the page at any moment.

定位器是 Playwright 自动等待和重试功能的核心。简而言之，定位器是一种在任何时刻查找页面上元素（一个或多个）的方法。它们会自动等待元素出现并在操作失败时重试。

These are the recommended built-in locators.

* `page.getByRole()` to locate by explicit and implicit accessibility attributes.
* `page.getByText()` to locate by text content.
* `page.getByLabel()` to locate a form control by associated label's text.
* `page.getByPlaceholder()` to locate an input by placeholder.
* `page.getByAltText()` to locate an element, usually image, by its text alternative.
* `page.getByTitle()` to locate an element by its title attribute.
* `page.getByTestId()` to locate an element based on its data-testid attribute (other attributes can be configured).

```js
await page.getByLabel('User Name').fill('John');
await page.getByLabel('Password').fill('secret-password');
await page.getByRole('button', { name: 'Sign in' }).click();
```

### Locate by role

> 优先采用 role 来定位元素，这最接近用户感知页面的方式。 We recommend prioritizing role locators to locate elements, as it is the closest way to how users and assistive technology perceive the page.

Role locators include [buttons, checkboxes, headings, links, lists, tables, and many more](https://www.w3.org/TR/html-aria/#docconformance) and follow W3C specifications for [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles), ARIA attributes and accessible name. Note that many html elements like `<button>` have an implicitly defined role that is recognized by the role locator.

示例：

```html
<h3>Sign up</h3>
<label>
  <input type="checkbox" /> Subscribe
</label>
<br/>
<button>Submit</button>
```

```js
await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
await page.getByRole('checkbox', { name: 'Subscribe' }).check();
await page.getByRole('button', { name: /submit/i }).click();
```

### Filtering Locators

```js
await page
    .getByRole('listitem')
    .filter({ hasText: 'Product 2' })
    .getByRole('button', { name: 'Add to cart' })
    .click();
```

### Other locators

```js
// CSS locator  // `css=` 可省略，默认就是 CSS locator
await page.locator('css=article >> css=.bar > .baz >> css=span[attr=value]');
// 等同于
document.querySelector('article').querySelector('.bar > .baz').querySelector('span[attr=value]');

// XPath locator
await page.locator('xpath=//button').click();

// id selector
await page.locator('id=username').fill('value');
// data-test-id selector
await page.locator('data-test-id=submit').click();
```


## Actions

https://playwright.dev/docs/input

Playwright can interact with HTML Input elements such as text inputs, checkboxes, radio buttons, select options, mouse clicks, type characters, keys and shortcuts as well as upload files and focus elements.

### Text input

```js
// Text input
await page.getByRole('textbox').fill('Peter');

// Date input
await page.getByLabel('Birth date').fill('2020-02-02');

// Time input
await page.getByLabel('Appointment time').fill('13:15');

// Local datetime input
await page.getByLabel('Local time').fill('2020-03-02T05:15');
```

### Checkboxes and radio buttons

```js
// Check the checkbox
await page.getByLabel('I agree to the terms above').check();
```

### Select options

```js
// Single selection matching the value or label
await page.getByLabel('Choose a color').selectOption('blue');

// Single selection matching the label
await page.getByLabel('Choose a color').selectOption({ label: 'Blue' });

// Multiple selected items
await page.getByLabel('Choose multiple colors').selectOption(['red', 'green', 'blue']);
```

### Mouse click

```js
// Generic click
await page.getByRole('button').click();

// Double click
await page.getByText('Item').dblclick();

// Right click
await page.getByText('Item').click({ button: 'right' });

// Shift + click
await page.getByText('Item').click({ modifiers: ['Shift'] });

// Ctrl + click on Windows and Linux
// Meta + click on macOS
await page.getByText('Item').click({ modifiers: ['ControlOrMeta'] });

// Hover over element
await page.getByText('Item').hover();

// Click the top left corner
await page.getByText('Item').click({ position: { x: 0, y: 0 } });
```

Under the hood, this and other pointer-related methods:

* wait for element with given selector to be in DOM
* wait for it to become displayed, i.e. not empty, no `display:none`, no `visibility:hidden`
* wait for it to stop moving, for example, until css transition finishes
* scroll the element into view
* wait for it to receive pointer events at the action point, for example, waits until element becomes non-obscured by other elements
* retry if the element is detached during any of the above checks

### Type characters

> 实现打字的效果，更接近实际操作场景

```js
// Press keys one by one
await page.locator('#area').pressSequentially('Hello World!');
```

### Drag and Drop

```js
await page.locator('#item-to-be-dragged').dragTo(page.locator('#item-to-drop-at'));
```

You can perform drag&drop operation with locator.dragTo(). This method will:

* Hover the element that will be dragged.
* Press left mouse button.
* Move mouse to the element that will receive the drop.
* Release left mouse button.


## Evaluating JavaScript

The page.evaluate() API can run a JavaScript function in the context of the web page and bring results back to the Playwright environment. Browser globals like window and document can be used in evaluate.

```js
const href = await page.evaluate(() => document.location.href);
```

If the result is a Promise or if the function is asynchronous evaluate will automatically wait until it's resolved:

```js
const status = await page.evaluate(async () => {
  const response = await fetch(location.href);
  return response.status;
});
```

### Init scripts

Sometimes it is convenient to evaluate something in the page before it starts loading. For example, you might want to setup some mocks or test data. In this case, use [`page.addInitScript()`](https://playwright.dev/docs/api/class-page#page-add-init-script) or `browserContext.addInitScript()`.

```js
await page.addInitScript({ path: path.resolve(__dirname, '../mocks/preload.js') });
```


## Events

### Waiting for events

```js
// Start waiting for popup before clicking. Note no await.
const popupPromise = page.waitForEvent('popup');
await page.getByText('open the popup').click();
const popup = await popupPromise;
await popup.goto('https://wikipedia.org');
```

### Adding / removing event listener

```js
page.on('request', request => console.log(`Request sent: ${request.url()}`));
const listener = request => console.log(`Request finished: ${request.url()}`);
page.on('requestfinished', listener);
await page.goto('https://wikipedia.org');

page.off('requestfinished', listener);
await page.goto('https://www.openstreetmap.org/');
```

### Adding one-off listeners

```js
page.once('dialog', dialog => dialog.accept('2021'));
await page.evaluate("prompt('Enter a number:')");
```


## Network

Playwright provides APIs to monitor and modify browser network traffic, both HTTP and HTTPS. Any requests that a page does, including XHRs and fetch requests, *can be tracked, modified and handled*.

### Network events

You can monitor all the Requests and Responses:

```js
// Subscribe to 'request' and 'response' events.
page.on('request', request => console.log('>>', request.method(), request.url()));
page.on('response', response => console.log('<<', response.status(), response.url()));

await page.goto('https://example.com');
```

Or wait for a network response after the button click with page.waitForResponse():

```js
// Use a glob URL pattern. Note no await.
const responsePromise = page.waitForResponse('**/api/fetch_data');
await page.getByText('Update').click();
const response = await responsePromise;
```

### Handle requests

You can mock API endpoints via handling the network requests in your Playwright script.

```js
await page.route('**/api/fetch_data', route => route.fulfill({
  status: 200,
  body: testData,
}));
await page.goto('https://example.com');
```

### Modify requests

```js
// Delete header
await page.route('**/*', async route => {
  const headers = route.request().headers();
  delete headers['X-Secret'];
  await route.continue({ headers });
});
```

### Abort requests


### Modify responses

```js
await page.route('**/title.html', async route => {
  // Fetch original response.
  const response = await route.fetch();
  // Add a prefix to the title.
  let body = await response.text();
  body = body.replace('<title>', '<title>My prefix:');
  await route.fulfill({
    // Pass all fields from the response.
    response,
    // Override response body.
    body,
    // Force content type to be html.
    headers: {
      ...response.headers(),
      'content-type': 'text/html'
    }
  });
});
```

### Glob URL patterns


## Pages

```js
// Create a page.
const page = await context.newPage();

// Navigate explicitly, similar to entering a URL in the browser.
await page.goto('http://example.com');
// Fill an input.
await page.locator('#search').fill('query');

// Navigate implicitly by clicking a link.
await page.locator('#submit').click();
// Expect a new url.
console.log(page.url());
```

### Handling new pages


### Handling popups

```js
// Start waiting for popup before clicking. Note no await.
const popupPromise = page.waitForEvent('popup');
await page.getByText('open the popup').click();
const popup = await popupPromise;
// Interact with the new popup normally.
await popup.getByRole('button').click();
console.log(await popup.title());
```






