# Browser Objects Reference

## Window Object
<p>The window object represents an open window in a browser.</p>
<p>If a document contain frames (&lt;iframe&gt; tags), the browser creates one window object for the HTML document, and one additional window object for each frame.</p>
<p><b>Note:</b> There is no public standard that applies to the Window object, but all major browsers support it.</p>
<hr>

Window Object Properties
<table>
  <tbody><tr><th>Property</th><th>Description</th></tr>
  <tr><td><a href="prop_win_closed.asp">closed</a></td><td>Returns a Boolean value indicating whether a window has been closed or not</td></tr>
  <tr><td><a href="prop_win_defaultstatus.asp">defaultStatus</a></td><td>Sets or returns the default text in the statusbar of a window</td></tr>
  <tr><td><a href="dom_obj_document.asp">document</a></td><td>Returns the Document object for the window (<a href="dom_obj_document.asp">See Document object</a>)</td></tr>
  <tr><td><a href="prop_win_frameElement.asp">frameElement</a></td><td>Returns the &lt;iframe&gt; element in which the current window is inserted</td></tr>
  <tr><td><a href="prop_win_frames.asp">frames</a></td><td>Returns all &lt;iframe&gt; elements in the current window</td></tr>
  <tr><td><a href="obj_history.asp">history</a></td><td>Returns the History object for the window (<a href="obj_history.asp">See History object</a>)</td></tr>
  <tr><td><a href="prop_win_innerheight.asp">innerHeight</a></td><td>Returns the inner height of a window's content area</td></tr>
  <tr><td><a href="prop_win_innerheight.asp">innerWidth</a></td><td>Returns the inner width of a window's content area</td></tr>
  <tr><td><a href="prop_win_length.asp">length</a></td><td>Returns the number of &lt;iframe&gt; elements in the current window</td></tr>
  <tr><td>localStorage</td><td>Returns a reference to the local storage object used to store data. Stores data with no expiration date</td></tr>
  <tr><td><a href="obj_location.asp">location</a></td><td>Returns the Location object for the window (<a href="obj_location.asp">See Location object</a>)</td></tr>
  <tr><td><a href="prop_win_name.asp">name</a></td><td>Sets or returns the name of a window</td></tr>
  <tr><td><a href="obj_navigator.asp">navigator</a></td><td>Returns the Navigator object for the window (<a href="obj_navigator.asp">See Navigator object</a>)</td></tr>
  <tr><td><a href="prop_win_opener.asp">opener</a></td><td>Returns a reference to the window that created the window</td></tr>
  <tr><td><a href="prop_win_outerheight.asp">outerHeight</a></td><td>Returns the outer height of a window, including toolbars/scrollbars</td></tr>
  <tr><td><a href="prop_win_outerheight.asp">outerWidth</a></td><td>Returns the outer width of a window, including toolbars/scrollbars</td></tr>
  <tr><td><a href="prop_win_pagexoffset.asp">pageXOffset</a></td><td>Returns the pixels the current document has been scrolled (horizontally) from the upper left corner of the window</td></tr>
  <tr><td><a href="prop_win_pagexoffset.asp">pageYOffset</a></td><td>Returns the pixels the current document has been scrolled (vertically) from the upper left corner of the window</td></tr>
  <tr><td><a href="prop_win_parent.asp">parent</a></td><td>Returns the parent window of the current window</td></tr>
  <tr><td><a href="obj_screen.asp">screen</a></td><td>Returns the Screen object for the window <a href="obj_screen.asp">(See Screen object)</a></td></tr>
  <tr><td><a href="prop_win_screenleft.asp">screenLeft</a></td><td>Returns the horizontal coordinate of the window relative to the screen</td></tr>
  <tr><td><a href="prop_win_screenleft.asp">screenTop</a></td><td>Returns the vertical coordinate of the window relative to the screen</td></tr>
  <tr><td><a href="prop_win_screenx.asp">screenX</a></td><td>Returns the horizontal coordinate of the window relative to the screen</td></tr>
  <tr><td><a href="prop_win_screenx.asp">screenY</a></td><td>Returns the vertical coordinate of the window relative to the screen</td></tr>
  <tr><td>sessionStorage</td><td>Returns a reference to the local storage object used to store data. Stores data for one session (lost when the browser tab is closed)</td></tr>
  <tr><td>scrollX</td><td>An alias of <a href="prop_win_pagexoffset.asp">pageXOffset</a></td></tr>
  <tr><td>scrollY</td><td>An alias of <a href="prop_win_pagexoffset.asp">pageYOffset</a></td></tr>
  <tr><td><a href="prop_win_self.asp">self</a></td><td>Returns the current window</td></tr>
  <tr><td><a href="prop_win_status.asp">status</a></td><td>Sets or returns the text in the statusbar of a window</td></tr>
  <tr><td><a href="prop_win_top.asp">top</a></td><td>Returns the topmost browser window</td></tr>
</tbody></table>

Window Object Methods
<table>
  <tbody><tr><th>Method</th><th>Description</th></tr>
  <tr><td><a href="met_win_settimeout.asp">setTimeout()</a></td><td>Calls a function or evaluates an expression after a specified number of milliseconds</td></tr>
  <tr><td><a href="met_win_cleartimeout.asp">clearTimeout()</a></td><td>Clears a timer set with setTimeout()</td></tr>
  <tr><td><a href="met_win_setinterval.asp">setInterval()</a></td><td>Calls a function or evaluates an expression at specified intervals (in milliseconds)</td></tr>
  <tr><td><a href="met_win_clearinterval.asp">clearInterval()</a></td><td>Clears a timer set with setInterval()</td></tr>
  <tr><td><a href="jsref_getcomputedstyle.asp">getComputedStyle()</a></td><td>Gets the current computed CSS styles applied to an element</td></tr>
  <tr><td><a href="met_win_scrollby.asp">scrollBy()</a></td><td>Scrolls the document by the specified number of pixels</td></tr>
  <tr><td><a href="met_win_scrollto.asp">scrollTo()</a></td><td>Scrolls the document to the specified coordinates</td></tr>
  <tr><td><a href="met_win_alert.asp">alert()</a></td><td>Displays an alert box with a message and an OK button</td></tr>
  <tr><td><a href="met_win_atob.asp">atob()</a></td><td>Decodes a base-64 encoded string</td></tr>
  <tr><td><a href="met_win_blur.asp">blur()</a></td><td>Removes focus from the current window</td></tr>
  <tr><td><a href="met_win_btoa.asp">btoa()</a></td><td>Encodes a string in base-64</td></tr>
  <tr><td><a href="met_win_close.asp">close()</a></td><td>Closes the current window</td></tr>
  <tr><td><a href="met_win_confirm.asp">confirm()</a></td><td>Displays a dialog box with a message and an OK and a Cancel button</td></tr>
  <tr><td><a href="met_win_focus.asp">focus()</a></td><td>Sets focus to the current window</td></tr>
  <tr><td>getSelection()</td><td>Returns a Selection object representing the range of text selected by the user</td></tr>
  <tr><td>matchMedia()</td><td>Returns a MediaQueryList object representing the specified CSS media query string</td></tr>
  <tr><td><a href="met_win_moveby.asp">moveBy()</a></td><td>Moves a window relative to its current position</td></tr>
  <tr><td><a href="met_win_moveto.asp">moveTo()</a></td><td>Moves a window to the specified position</td></tr>
  <tr><td><a href="met_win_open.asp">open()</a></td><td>Opens a new browser window</td></tr>
  <tr><td><a href="met_win_print.asp">print()</a></td><td>Prints the content of the current window</td></tr>
  <tr><td><a href="met_win_prompt.asp">prompt()</a></td><td>Displays a dialog box that prompts the visitor for input</td></tr>
  <tr><td><a href="met_win_resizeby.asp">resizeBy()</a></td><td>Resizes the window by the specified pixels</td></tr>
  <tr><td><a href="met_win_resizeto.asp">resizeTo()</a></td><td>Resizes the window to the specified width and height</td></tr>
  <tr><td>scroll()</td><td><span class="deprecated">Deprecated.</span> This method has been replaced by the <a href="met_win_scrollto.asp">scrollTo()</a> method.</td></tr>
  <tr><td><a href="met_win_stop.asp">stop()</a></td><td>Stops the window from loading</td></tr>
</tbody></table>


## Navigator Object

<p>The navigator object contains information about the browser.</p>
<p><b>Note:</b> There is no public standard that applies to the navigator object, but all major browsers support it.</p>
<hr>

Navigator Object Properties
<table>
  <tbody><tr><th>Property</th><th>Description</th></tr>
  <tr><td><a href="prop_nav_appcodename.asp">appCodeName</a></td><td>Returns the code name of the browser</td></tr>
  <tr><td><a href="prop_nav_appname.asp">appName</a></td><td>Returns the name of the browser</td></tr>
  <tr><td><a href="prop_nav_appversion.asp">appVersion</a></td><td>Returns the version information of the browser</td></tr>
  <tr><td><a href="prop_nav_cookieenabled.asp">cookieEnabled</a></td><td>Determines whether cookies are enabled in the browser</td></tr>
  <tr><td><a href="prop_nav_geolocation.asp">geolocation</a></td><td>Returns a Geolocation object that can be used to locate the user's position</td></tr>
  <tr><td><a href="prop_nav_language.asp">language</a></td><td>Returns the language of the browser</td></tr>
  <tr><td><a href="prop_nav_online.asp">onLine</a></td><td>Determines whether the browser is online</td></tr>
  <tr><td><a href="prop_nav_platform.asp">platform</a></td><td>Returns for which platform the browser is compiled</td></tr>
  <tr><td><a href="prop_nav_product.asp">product</a></td><td>Returns the engine name of the browser</td></tr>
  <tr><td><a href="prop_nav_useragent.asp">userAgent</a></td><td>Returns the user-agent header sent by the browser to the server</td></tr>
</tbody></table>

Navigator Object Methods
<table>
  <tbody><tr><th align="left">Method</th><th>Description</th></tr>
  <tr><td><a href="met_nav_javaenabled.asp">javaEnabled()</a></td><td>Specifies whether or not the browser has Java enabled</td></tr>
  <tr><td><a href="met_nav_taintenabled.asp">taintEnabled()</a></td><td><span class="deprecated">Removed in JavaScript version 1.2.</span> Specifies whether the browser has data tainting enabled</td></tr>
</tbody></table>


## Screen Object

<p>The screen object contains information about the visitor's screen.</p>
<p><b>Note:</b> There is no public standard that applies to the screen object, but all major browsers support it.</p>
<hr>

Screen Object Properties
<table>
  <tbody><tr><th>Property</th><th>Description</th></tr>
  <tr><td><a href="prop_screen_availheight.asp">availHeight</a></td><td>Returns the height of the screen (excluding the Windows Taskbar)</td></tr>
  <tr><td><a href="prop_screen_availwidth.asp">availWidth</a></td><td>Returns the width of the screen (excluding the Windows Taskbar)</td></tr>
  <tr><td><a href="prop_screen_colordepth.asp">colorDepth</a></td><td>Returns the bit depth of the color palette for displaying images</td></tr>
  <tr><td><a href="prop_screen_height.asp">height</a></td><td>Returns the total height of the screen</td></tr>
  <tr><td><a href="prop_screen_pixeldepth.asp">pixelDepth</a></td><td>Returns the color resolution (in bits per pixel) of the screen</td></tr>
  <tr><td><a href="prop_screen_width.asp">width</a></td><td>Returns the total width of the screen</td></tr>
</tbody>
</table>

## History Object

The History interface allows to manipulate the browser session history 会话历史。

|||
|--------|----------------
| length | The number of URLs in the history list
| state  | The current state object
|||
| back()    | 相当于点击后退按钮，会导致页面更新，会在 `window` 上触发 `popstate` 事件
| forward() | 相当于点击前进按钮，会导致页面更新，会在 `window` 上触发 `popstate` 事件
| go(num)   | 更灵活的前进后退，如 退一 `go(-1)` 进二 `go(2)`
| pushState(stateObj, title, url?) | Pushes the given data with the title and URL onto the session history. <br>不会导致页面更新，不会触发事件，提供了 url 会更新 url，title 目前浏览器都忽略
| replaceState(stateObj, title, url?) | Updates the session history by the given data, title, and if provided, URL.


## Location Object
<p>The location object contains information about the current URL.</p>
<p>The location object is part of the window object and is accessed through the window.location property.</p>
<p><b>Note:</b> There is no public standard that applies to the location object, but all major browsers support it.</p>
<hr>

Location Object Properties
<table>
  <tbody><tr><th>Property</th><th>Description</th></tr>
  <tr><td><a href="prop_loc_hash.asp">hash</a></td><td>Sets or returns the anchor part (#) of a URL</td></tr>
  <tr><td><a href="prop_loc_host.asp">host</a></td><td>Sets or returns the hostname and port number of a URL</td></tr>
  <tr><td><a href="prop_loc_hostname.asp">hostname</a></td><td>Sets or returns the hostname of a URL</td></tr>
  <tr><td><a href="prop_loc_href.asp">href</a></td><td>Sets or returns the entire URL</td></tr>
  <tr><td><a href="prop_loc_origin.asp">origin</a></td><td>Returns the protocol, hostname and port number of a URL</td></tr>
  <tr><td><a href="prop_loc_pathname.asp">pathname</a></td><td>Sets or returns the path name of a URL</td></tr>
  <tr><td><a href="prop_loc_port.asp">port</a></td><td>Sets or returns the port number of a URL</td></tr>
  <tr><td><a href="prop_loc_protocol.asp">protocol</a></td><td>Sets or returns the protocol of a URL</td></tr>
  <tr><td><a href="prop_loc_search.asp">search</a></td><td>Sets or returns the querystring part of a URL</td></tr>
</tbody></table>

Location Object Methods
<table>
  <tbody><tr><th>Method</th><th>Description</th></tr>
  <tr><td><a href="met_loc_assign.asp">assign()</a></td><td>Loads a new document</td></tr>
  <tr><td><a href="met_loc_reload.asp">reload()</a></td><td>Reloads the current document</td></tr>
  <tr><td><a href="met_loc_replace.asp">replace()</a></td><td>Replaces the current document with a new one</td></tr>
</tbody></table>

<style>#article em {color:#333} td:first-child{color:red;}</style>