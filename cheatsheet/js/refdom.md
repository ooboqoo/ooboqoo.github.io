# HTML DOM 手册

### Finding HTML Elements

<table>
<tr><td>document.getElementById(<em>id</em>)</td><td>Find an element by element id</td></tr>
<tr><td>document.getElementsByTagName(<em>name</em>)</td><td>Find elements by tag name</td></tr>
<tr><td>document.getElementsByClassName(<em>name</em>)</td><td>Find elements by class name</td></tr>
</table>

### Changing HTML Elements

<table>
<tr><td><em>element</em>.innerHTML =&nbsp; <em>new html content</em></td><td>Change the inner HTML of an element</td></tr>
<tr><td><em>element</em>.<em>attribute = new value</em></td><td>Change the attribute value of an HTML element</td></tr>
<tr><td><em>element</em>.setAttribute<em>(attribute, value)</em></td><td>Change the attribute value of an HTML element</td></tr>
<tr><td><em>element</em>.style.<em>property = new style</em></td><td>Change the style of an HTML element</td></tr>
</table>

### Adding and Deleting Elements

<table>
<tr><td>document.createElement(<em>element</em>)</td><td>Create an HTML element</td></tr>
<tr><td>document.removeChild(<em>element</em>)</td><td>Remove an HTML element</td></tr>
<tr><td>document.appendChild(<em>element</em>)</td><td>Add an HTML element</td></tr>
<tr><td>document.replaceChild(<em>element</em>)</td><td>Replace an HTML element</td></tr>
<tr><td>document.write(<em>text</em>)</td><td>Write into the HTML output stream</td></tr>
</table>

### Adding Events Handlers

<table>
<tr><td>document.getElementById(<em>id</em>).onclick = function(){<em>code</em>}</td></tr>
</table>

### Finding HTML Objects

The first HTML DOM Level 1 (1998), defined 11 HTML objects, object collections, and properties. These are still valid in HTML5. Later, in HTML DOM Level 3, more objects, collections, and properties were added.

<table>
<tr><th>Property</th><th>Description</th><th>DOM</th></tr>
<tr><td>document.anchors</td><td>Returns all &lt;a&gt; elements that have a name attribute</td><td>1</td></tr>
<tr><td>document.baseURI</td><td>Returns the absolute base URI of the document</td><td>3</td></tr>
<tr><td>document.body</td><td>Returns the &lt;body&gt; element </td><td>1</td></tr>
<tr><td>document.cookie</td><td>Returns the document's cookie</td><td>1</td></tr>
<tr><td>document.doctype</td><td>Returns the document's doctype</td><td>3</td></tr>
<tr><td>document.documentElement</td><td>Returns the &lt;html&gt; element </td><td>3</td></tr>
<tr><td>document.documentMode</td><td>Returns the mode used by the browser</td><td>3</td></tr>
<tr><td>document.documentURI</td><td>Returns the URI of the document </td><td>3</td></tr>
<tr><td>document.domain</td><td>Returns the domain name of the document server </td><td>1</td></tr>
<tr><td>document.domConfig</td><td><span class="deprecated">Obsolete.</span> Returns the DOM configuration</td><td>3</td></tr>
<tr><td>document.embeds</td><td>Returns all &lt;embed&gt; elements</td><td>3</td></tr>
<tr><td>document.forms</td><td>Returns all &lt;form&gt; elements </td><td>1</td></tr>
<tr><td>document.head</td><td>Returns the &lt;head&gt; element</td><td>3</td></tr>
<tr><td>document.images</td><td>Returns all &lt;img&gt; elements </td><td>1</td></tr>
<tr><td>document.implementation</td><td>Returns the DOM implementation</td><td>3</td></tr>
<tr><td>document.inputEncoding</td><td>Returns the document's encoding (character set)</td><td>3</td></tr>
<tr><td>document.lastModified</td><td>Returns the date and time the document was updated</td><td>3</td></tr>
<tr><td>document.links</td><td>Returns all &lt;area&gt; and &lt;a&gt; elements that have a href attribute</td><td>1</td></tr>
<tr><td>document.readyState</td><td>Returns the (loading) status of the document</td><td>3</td></tr>
<tr><td>document.referrer</td><td>Returns the URI of the referrer (the linking document)</td><td>1</td></tr>
<tr><td>document.scripts</td><td>Returns all &lt;script&gt; elements</td><td>3</td></tr>
<tr><td>document.strictErrorChecking</td><td>Returns if error checking is enforced</td><td>3</td></tr>
<tr><td>document.title</td><td>Returns the &lt;title&gt; element </td><td>1</td></tr>
<tr><td>document.URL</td><td>Returns the complete URL of the document </td><td>1</td></tr>
</table>


## Document 对象

### HTML DOM Nodes

In the HTML DOM (Document Object Model), everything is a **node**:
  * The document itself is a document node
  * All HTML elements are element nodes
  * All HTML attributes are attribute nodes
  * Text inside HTML elements are text nodes
  * Comments are comment nodes

### The Document Object

When an HTML document is loaded into a web browser, it becomes a **document object**.

The document object is the root node of the HTML document and the "owner" of all other nodes:  (element nodes, text nodes, attribute nodes, and comment nodes).

The document object provides properties and methods to access all node objects, from within JavaScript.

**Tip:** The document is a part of the Window object and can be accessed as window.document.

* * *

### Document Object Properties

The following properties and methods can be used on HTML documents:

<table>
<tr><td>document.activeElement</td><td>Returns the currently focused element in the document</td></tr>
<tr><td>document.anchors</td><td>Returns a collection of all &lt;a&gt; elements in the document that have a name attribute</td></tr>
<tr><td>document.baseURI</td><td>Returns the absolute base URI of a document</td></tr>
<tr><td>document.body</td><td>Sets or returns the document's body (the &lt;body&gt; element)</td></tr>
<tr><td>document.cookie</td><td>Returns all name/value pairs of cookies in the document</td></tr>
<tr><td>document.doctype</td><td>Returns the Document Type Declaration associated with the document</td></tr>
<tr><td>document.documentElement</td><td>Returns the Document Element of the document (the &lt;html&gt; element)</td></tr>
<tr><td>document.documentMode</td><td>Returns the mode used by the browser to render the document</td></tr>
<tr><td>document.documentURI</td><td>Sets or returns the location of the document</td></tr>
<tr><td>document.domain</td><td>Returns the domain name of the server that loaded the document</td></tr>
<tr><td>document.embeds</td><td>Returns a collection of all &lt;embed&gt; elements the document</td></tr>
<tr><td>document.forms</td><td>Returns a collection of all &lt;form&gt; elements in the document</td></tr>
<tr><td>document.head</td><td>Returns the &lt;head&gt; element of the document</td></tr>
<tr><td>document.images</td><td>Returns a collection of all &lt;img&gt; elements in the document</td></tr>
<tr><td>document.implementation</td><td>Returns the DOMImplementation object that handles this document</td></tr>
<tr><td>document.inputEncoding</td><td>Returns the encoding, character set, used for the document</td></tr>
<tr><td>document.lastModified</td><td>Returns the date and time the document was last modified</td></tr>
<tr><td>document.links</td><td>Returns a collection of all &lt;a&gt; and &lt;area&gt; elements in the document that have a href attribute</td></tr>
<tr><td>document.readyState</td><td>Returns the (loading) status of the document</td></tr>
<tr><td>document.referrer</td><td>Returns the URL of the document that loaded the current document</td></tr>
<tr><td>document.scripts</td><td>Returns a collection of &lt;script&gt; elements in the document</td></tr>
<tr><td>document.strictErrorChecking</td><td>Sets or returns whether error-checking is enforced or not</td></tr>
<tr><td>document.title</td><td>Sets or returns the title of the document</td></tr>
<tr><td>document.URL</td><td>Returns the full URL of the HTML document</td></tr>
</table>

### Document Object Methods

<table>
<tr><td>document.querySelector()</td><td>Returns the first element that matches a specified CSS selector(s) in the document</td></tr>
<tr><td>document.querySelectorAll()</td><td>Returns a static NodeList containing all elements that matches a specified CSS selector(s) in the document 静态类数组对象，非 HTML 集合</td></tr>
<tr><td>document.getElementById()</td><td>Returns the element that has the ID attribute with the specified value</td></tr>
<tr><td>document.getElementsByClassName()</td><td>Returns a NodeList containing all elements with the specified class name</td></tr>
<tr><td>document.getElementsByTagName()</td><td>Returns a NodeList containing all elements with the specified tag name</td></tr>
<tr><td>document.getElementsByName()</td><td>Returns a NodeList containing all elements with a specified name</td></tr>
<tr><td>document.getElementsByTagNameNS()</td><td>无NS版默认先将标签转换为小写，当SVG等标签区分大小写时，就需要使用该版本</td></tr>
<tr class="separator"><td>&nbsp;</td><td></td></tr>
<tr><td>document.open()</td><td>Opens an HTML output stream to collect output from document.write()</td></tr>
<tr><td>document.close()</td><td>Closes the output stream previously opened with document.open()</td></tr>
<tr><td>document.write()</td><td>Writes HTML expressions or JavaScript code to a document</td></tr>
<tr><td>document.writeln()</td><td>Same as write(), but adds a newline character after each statement</td></tr>
<tr class="separator"><td>&nbsp;</td><td></td></tr>
<tr><td>document.addEventListener()</td><td>Attaches an event handler to the document</td></tr>
<tr><td>document.removeEventListener()</td><td>Removes an event handler from the document (that has been attached with the addEventListener() method)</td></tr>
<tr class="separator"><td>&nbsp;</td><td></td></tr>
<tr><td>document.adoptNode()</td><td>Adopts a node from another document</td></tr>
<tr><td>document.importNode()</td><td>Imports a node from another document</td></tr>
<tr><td>document.renameNode()</td><td>Renames the specified node</td></tr>
<tr class="separator"><td>&nbsp;</td><td></td></tr>
<tr><td>document.createElement()</td><td>Creates an Element node</td></tr>
<tr><td>document.createAttribute()</td><td>Creates an attribute node</td></tr>
<tr><td>document.createTextNode()</td><td>Creates a Text node</td></tr>
<tr><td>document.createComment()</td><td>Creates a Comment node with the specified text</td></tr>
<tr><td>document.createDocumentFragment()</td><td>Creates an empty DocumentFragment node</td></tr>
<tr class="separator"><td>&nbsp;</td><td></td></tr>
<tr><td>document.hasFocus()</td><td>Returns a Boolean value indicating whether the document has focus</td></tr>
<tr><td>document.normalize()</td><td>Removes empty Text nodes, and joins adjacent nodes</td></tr>
<tr><td>document.normalizeDocument()</td><td>Removes empty Text nodes, and joins adjacent nodes</td></tr>
</table>

### Warning !!!

In the W3C DOM Core, the Document object inherits all properties and methods from the Node object. Many of these properties and methods make no sense used on documents.

**Avoid using these node object properties and methods on HTML document objects:**

<table>
<tr><th>&nbsp;Property / Method</th><th>Reason for avoiding</th></tr>
<tr><td>document.attributes</td><td>Documents don't have attributes</td></tr>
<tr><td>document.hasAttributes()</td><td>Documents don't have attributes</td></tr>
<tr><td>document.nodeName</td><td>This is always #document</td></tr>
<tr><td>document.nodeType</td><td>This is always 9 (DOCUMENT_NODE) </td></tr>
<tr><td>document.nodeValue</td><td>Documents don't have an node value</td></tr>
<tr><td>document.textContent</td><td>Documents don't have a text content</td></tr>
<tr><td>document.ownerDocument</td><td>Documents don't have an owner document</td></tr>
<tr><td>document.ownerElement</td><td>Documents don't have an owner element</td></tr>
<tr><td>document.parentNode</td><td>Documents don't have a parent node</td></tr>
<tr><td>document.previousSibling</td><td>Documents don't have siblings</td></tr>
<tr><td>document.nextSibling</td><td>Documents don't have siblings</td></tr>
</table>


## Element 对象

### Properties and Methods

The following properties and methods can be used on all HTML elements:

<table>
<tr><td><i>element</i>.accessKey</td><td>Sets or returns the accesskey attribute of an element</td></tr>
<tr><td><i>element</i>.attributes</td><td>Returns a NamedNodeMap of an element's attributes</td></tr>
<tr><td><i>element</i>.childElementCount</td><td>Returns the number of child elements an element has</td></tr>
<tr><td><i>element</i>.childNodes</td><td>Returns a collection of an element's child nodes (including text and comment nodes)</td></tr>
<tr><td><i>element</i>.children</td><td>Returns a collection of an element's child element (excluding text and comment nodes)</td></tr>
<tr><td><i>element</i>.classList</td><td>Returns the class name(s) of an element</td></tr>
<tr><td><i>element</i>.className</td><td>Sets or returns the value of the class attribute of an element</td></tr>
<tr><td><i>element</i>.contentEditable</td><td>Sets or returns whether the content of an element is editable or not</td></tr>
<tr><td><i>element</i>.clientHeight</td><td>Returns the height of an element, including padding</td></tr>
<tr><td><i>element</i>.clientWidth</td><td>Returns the width of an element, including padding</td></tr>
<tr><td><i>element</i>.offsetHeight</td><td>Returns the height of an element, including padding, border and scrollbar</td></tr>
<tr><td><i>element</i>.offsetWidth</td><td>Returns the width of an element, including padding, border and scrollbar</td></tr>
<tr><td><i>element</i>.clientLeft</td><td>Returns the width of the left border of an element</td></tr>
<tr><td><i>element</i>.clientTop</td><td>Returns the width of the top border of an element</td></tr>
<tr><td><i>element</i>.offsetLeft</td><td>Returns the horizontal offset position of an element</td></tr>
<tr><td><i>element</i>.offsetTop</td><td>Returns the vertical offset position of an element</td></tr>
<tr><td><i>element</i>.offsetParent</td><td>Returns the offset container of an element</td></tr>
<tr><td><i>element</i>.dir</td><td>Sets or returns the value of the dir attribute of an element</td></tr>
<tr><td><i>element</i>.firstChild</td><td>Returns the first child node of an element</td></tr>
<tr><td><i>element</i>.firstElementChild</td><td>Returns the first child element of an element</td></tr>
<tr><td><i>element</i>.id</td><td>Sets or returns the value of the id attribute of an element</td></tr>
<tr><td><i>element</i>.innerHTML</td><td>Sets or returns the content of an element</td></tr>
<tr><td><i>element</i>.isContentEditable</td><td>Returns true if the content of an element is editable, otherwise false</td></tr>
<tr><td><i>element</i>.lang</td><td>Sets or returns the value of the lang attribute of an element</td></tr>
<tr><td><i>element</i>.lastChild</td><td>Returns the last child node of an element</td></tr>
<tr><td><i>element</i>.lastElementChild</td><td>Returns the last child element of an element</td></tr>
<tr><td><i>element</i>.namespaceURI</td><td>Returns the namespace URI of an element</td></tr>
<tr><td><i>element</i>.nextSibling</td><td>Returns the next node at the same node tree level</td></tr>
<tr><td><i>element</i>.nextElementSibling</td><td>Returns the next element at the same node tree level</td></tr>
<tr><td><i>element</i>.nodeName</td><td>Returns the name of a node</td></tr>
<tr><td><i>element</i>.nodeType</td><td>Returns the node type of a node</td></tr>
<tr><td><i>element</i>.nodeValue</td><td>Sets or returns the value of a node</td></tr>
<tr><td><i>element</i>.ownerDocument</td><td>Returns the root element (document object) for an element</td></tr>
<tr><td><i>element</i>.parentNode</td><td>Returns the parent node of an element</td></tr>
<tr><td><i>element</i>.parentElement</td><td>Returns the parent element node of an element</td></tr>
<tr><td><i>element</i>.previousSibling</td><td>Returns the previous node at the same node tree level</td></tr>
<tr><td><i>element</i>.previousElementSibling</td><td>Returns the previous element at the same node tree level</td></tr>
<tr><td><i>element</i>.scrollHeight</td><td>Returns the entire height of an element, including padding</td></tr>
<tr><td><i>element</i>.scrollLeft</td><td>Sets or returns the number of pixels an element's content is scrolled horizontally</td></tr>
<tr><td><i>element</i>.scrollTop</td><td>Sets or returns the number of pixels an element's content is scrolled vertically</td></tr>
<tr><td><i>element</i>.scrollWidth</td><td>Returns the entire width of an element, including padding</td></tr>
<tr><td><i>element</i>.style</td><td>Sets or returns the value of the style attribute of an element</td></tr>
<tr><td><i>element</i>.tabIndex</td><td>Sets or returns the value of the tabindex attribute of an element</td></tr>
<tr><td><i>element</i>.tagName</td><td>Returns the tag name of an element</td></tr>
<tr><td><i>element</i>.textContent</td><td>Sets or returns the textual content of a node and its descendants</td></tr>
<tr><td><i>element</i>.title</td><td>Sets or returns the value of the title attribute of an element</td></tr>
</table>

<table>
<tr><td><i>element</i>.addEventListener()</td><td>Attaches an event handler to the specified element</td></tr>
<tr><td><i>element</i>.removeEventListener()</td><td>Removes an event handler that has been attached with the addEventListener() method</td></tr>
<tr><td><i>element</i>.querySelector()</td><td>Returns the first child element that matches a specified CSS selector(s) of an element</td></tr>
<tr><td><i>element</i>.querySelectorAll()</td><td>Returns all child elements that matches a specified CSS selector(s) of an element</td></tr>
<tr><td><i>element</i>.getElementsByClassName()</td><td>Returns a collection of all child elements with the specified class name</td></tr>
<tr><td><i>element</i>.getElementsByTagName()</td><td>Returns a collection of all child elements with the specified tag name</td></tr>
<tr><td><i>element</i>.normalize()</td><td>Joins adjacent text nodes and removes empty text nodes in an element</td></tr>
<tr><td><i>element</i>.focus()</td><td>Gives focus to an element</td></tr>
<tr class="separator"><td>&nbsp;</td><td></td></tr>
<tr><td><i>element</i>.hasAttribute()</td><td>Returns true if an element has the specified attribute, otherwise false</td></tr>
<tr><td><i>element</i>.hasAttributes()</td><td>Returns true if an element has any attributes, otherwise false</td></tr>
<tr><td><i>element</i>.setAttribute()</td><td>Sets or changes the specified attribute, to the specified value</td></tr>
<tr><td><i>element</i>.getAttribute()</td><td>Returns the specified attribute value of an element node</td></tr>
<tr><td><i>element</i>.removeAttribute()</td><td>Removes a specified attribute from an element</td></tr>
<tr><td><i>element</i>.setAttributeNode()</td><td>Sets or changes the specified attribute node</td></tr>
<tr><td><i>element</i>.removeAttributeNode()</td><td>Removes a specified attribute node, and returns the removed node</td></tr>
<tr><td><i>element</i>.getAttributeNode()</td><td>Returns the specified attribute node</td></tr>
<tr class="separator"><td>&nbsp;</td><td></td></tr>
<tr><td><i>element</i>.appendChild()</td><td>Adds a new child node, to an element, as the last child node</td></tr>
<tr><td><i>element</i>.removeChild()</td><td>Removes a child node from an element</td></tr>
<tr><td><i>element</i>.replaceChild()</td><td>Replaces a child node in an element</td></tr>
<tr><td><i>element</i>.insertBefore()</td><td>Inserts a new child node before a specified, existing, child node</td></tr>
<tr><td><i>element</i>.hasChildNodes()</td><td>Returns true if an element has any child nodes, otherwise false</td></tr>
<tr><td><i>element</i>.isEqualNode()</td><td>Checks if two elements are equal</td></tr>
<tr><td><i>element</i>.isSameNode()</td><td>Checks if two elements are the same node</td></tr>
<tr class="separator"><td>&nbsp;</td><td></td></tr>
<tr><td><i>element</i>.blur()</td><td>Removes focus from an element</td></tr>
<tr><td><i>element</i>.click()</td><td>Simulates a mouse-click on an element<br>支持input元素，不适合a元素，其他元素待确认</td></tr>
<tr><td><i>element</i>.cloneNode(deep)</td><td>复制一个节点，如果 deep 为 true 则会递归复制子节点。拷贝带属性不带绑定的事件</td></tr>
<tr><td><i>element</i>.compareDocumentPosition()</td><td>Compares the document position of two elements</td></tr>
<tr><td><i>element</i>.contains()</td><td>Returns true if a node is a descendant of a node, otherwise false</td></tr>
<tr><td><i>element</i>.getFeature()</td><td>Returns an object which implements the APIs of a specified feature</td></tr>
<tr><td><i>element</i>.isDefaultNamespace()</td><td>Returns true if a specified namespaceURI is the default, otherwise false</td></tr>
<tr><td><i>element</i>.isSupported()</td><td>Returns true if a specified feature is supported on the element</td></tr>
<tr><td><i>element</i>.toString()</td><td>Converts an element to a string</td></tr>
</table>

<table>
<tr><td><em>nodelist</em>.length</td><td>Returns the number of nodes in a NodeList</td></tr>
<tr><td><em>nodelist</em>.item()</td><td>Returns the node at the specified index in a NodeList</td></tr>
</table>


## Attribute 对象

In the HTML DOM, the Attr object represents an HTML attribute. An HTML attribute always belongs to an HTML element.

### Properties and Methods

<table>
<tr><td><em>attr</em>.isId</td><td>Returns true if the attribute is of type Id, otherwise it returns false</td></tr>
<tr><td><em>attr</em>.name</td><td>Returns the name of an attribute</td></tr>
<tr><td><em>attr</em>.value</td><td>Sets or returns the value of the attribute</td></tr>
<tr><td><em>attr</em>.specified</td><td>Returns true if the attribute has been specified, otherwise it returns false</td></tr>
<tr><td><em>nodemap</em>.length</td><td>Returns the number of attribute nodes in a NamedNodeMap</td></tr>
</table>

<table>
<tr><td><em>nodemap</em>.item()</td><td>Returns the attribute node at a specified index in a NamedNodeMap</td></tr>
<tr><td><em>nodemap</em>.getNamedItem()</td><td>Returns a specified attribute node from a NamedNodeMap</td></tr>
<tr><td><em>nodemap</em>.setNamedItem()</td><td>Sets the specified attribute node (by name)</td></tr>
<tr><td><em>nodemap</em>.removeNamedItem()</td><td>Removes a specified attribute node</td></tr>
</table>

### DOM 4 Warning !!!

In the W3C DOM Core, the Attr (attribute) object inherits all properties and methods from the Node object. In DOM 4, the Attr object no longer inherits from Node.

**For future code quality, you should avoid using node object properties and methods on attribute objects:**

<table>
<tr><th style="width:30%">&nbsp;Property / Method</th><th>Reason for avoiding</th></tr>
<tr><td><i>attr</i>.appendChild()</td><td>Attributes don't have child nodes</td></tr>
<tr><td><i>attr</i>.attributes</td><td>Attributes don't have attributes</td></tr>
<tr><td><i>attr</i>.baseURI</td><td>use document.baseURI instead</td></tr>
<tr><td><i>attr</i>.childNodes</td><td>Attributes don't have child nodes</td></tr>
<tr><td><i>attr</i>.cloneNode()</td><td>Get or set the <em>attr</em>.value instead</td></tr>
<tr><td><i>attr</i>.firstChild</td><td>Attributes don't have child nodes</td></tr>
<tr><td><i>attr</i>.hasAttributes()</td><td>Attributes don't have attributes</td></tr>
<tr><td><i>attr</i>.hasChildNodes</td><td>Attributes don't have child nodes</td></tr>
<tr><td><i>attr</i>.insertBefore()</td><td>Attributes don't have child nodes</td></tr>
<tr><td><i>attr</i>.isEqualNode()</td><td>Makes no sense</td></tr>
<tr><td><i>attr</i>.isSameNode()</td><td>Makes no sense</td></tr>
<tr><td><i>attr</i>.isSupported()</td><td>Is always true</td></tr>
<tr><td><i>attr</i>.lastChild</td><td>Attributes don't have child nodes</td></tr>
<tr><td><i>attr</i>.nextSibling</td><td>Attributes don't have siblings</td></tr>
<tr><td><i>attr</i>.nodeName</td><td>Use <em>attr</em>.name instead</td></tr>
<tr><td><i>attr</i>.nodeType</td><td>This is always 2 (ATTRIBUTE_NODE) </td></tr>
<tr><td><i>attr</i>.nodeValue</td><td>Use <em>attr</em>.value instead</td></tr>
<tr><td><i>attr</i>.normalize()</td><td>Attributes cannot be normalized</td></tr>
<tr><td><i>attr</i>.ownerDocument</td><td>This is always your HTML document</td></tr>
<tr><td><i>attr</i>.ownerElement</td><td>This is the HTML element you used to access the attribute</td></tr>
<tr><td><i>attr</i>.parentNode</td><td>This is the HTML element you used to access the attribute</td></tr>
<tr><td><i>attr</i>.previousSibling</td><td>Attributes don't have siblings</td></tr>
<tr><td><i>attr</i>.removeChild</td><td>Attributes don't have child nodes</td></tr>
<tr><td><i>attr</i>.replaceChild</td><td>Attributes don't have child nodes</td></tr>
<tr><td><i>attr</i>.textContent</td><td>Use <i>attr</i>.value instead</td></tr>
</table>


## Event 对象

**DOM:** Indicates in which DOM Level the property was introduced.

### Mouse Events

<table>
  <tr><td>onclick</td><td>The event occurs when the user clicks on an element</td><td>2</td></tr>
  <tr><td>oncontextmenu</td><td>The event occurs when the user right-clicks on an element to open a context menu</td><td>3</td></tr>
  <tr><td>ondblclick</td><td>The event occurs when the user double-clicks on an element</td><td>2</td></tr>
  <tr><td>onmousedown</td><td>The event occurs when the user presses a mouse button over an element</td><td>2</td></tr>
  <tr><td>onmouseenter</td><td>The event occurs when the pointer is moved onto an element</td><td>2</td></tr>
  <tr><td>onmouseleave</td><td>The event occurs when the pointer is moved out of an element</td><td>2</td></tr>
  <tr><td>onmousemove</td><td>The event occurs when the pointer is moving while it is over an element</td><td>2</td></tr>
  <tr><td>onmouseover</td><td>The event occurs when the pointer is moved onto an element, or onto one of its children</td><td>2</td></tr>
  <tr><td>onmouseout</td><td>The event occurs when a user moves the mouse pointer out of an element, or out of one of its children</td><td>2</td></tr>
  <tr><td>onmouseup</td><td>The event occurs when a user releases a mouse button over an element</td><td>2</td></tr>
</table>

### Keyboard Events

<table>
  <tr><td>onkeydown</td><td>The event occurs when the user is pressing a key</td><td>2</td></tr>
  <tr><td>onkeypress</td><td>The event occurs when the user presses a key</td><td>2</td></tr>
  <tr><td>onkeyup</td><td>The event occurs when the user releases a key</td><td>2</td></tr>
</table>

### Frame/Object Events

<table>
  <tr><td>onabort</td><td>The event occurs when the loading of a resource has been aborted</td><td>2</td></tr>
  <tr><td>onbeforeunload</td><td>The event occurs before the document is about to be unloaded</td><td>2</td></tr>
  <tr><td>onerror</td><td>The event occurs when an error occurs while loading an external file </td><td>2</td></tr>
  <tr><td>onhashchange</td><td>The event occurs when there has been changes to the anchor part of a URL</td><td>3</td></tr>
  <tr><td>onload</td><td>The event occurs when an object has loaded</td><td>2</td></tr>
  <tr><td>onpageshow</td><td>The event occurs when the user navigates to a webpage</td><td>3</td></tr>
  <tr><td>onpagehide</td><td>The event occurs when the user navigates away from a webpage</td><td>3</td></tr>
  <tr><td>onresize</td><td>The event occurs when the document view is resized</td><td>2</td></tr>
  <tr><td>onscroll</td><td>The event occurs when an element's scrollbar is being scrolled</td><td>2</td></tr>
  <tr><td>onunload</td><td>The event occurs once a page has unloaded (for &lt;body&gt;)</td><td>2</td></tr>
</table>

### Form Events

<table>
  <tr><td>onblur</td><td>The event occurs when an element loses focus</td><td>2</td></tr>
  <tr><td>onchange</td><td>The event occurs when the content of a form element, the selection, or the checked state have changed (for &lt;input&gt;, &lt;keygen&gt;, &lt;select&gt;, and &lt;textarea&gt;)</td><td>2</td></tr>
  <tr><td>onfocus</td><td>The event occurs when an element gets focus</td><td>2</td></tr>
  <tr><td>onfocusin</td><td>The event occurs when an element is about to get focus</td><td>2</td></tr>
  <tr><td>onfocusout</td><td>The event occurs when an element is about to lose focus</td><td>2</td></tr>
  <tr><td>oninput</td><td>The event occurs when an element gets user input</td><td>3</td></tr>
  <tr><td>oninvalid</td><td>The event occurs when an element is invalid</td><td>3</td></tr>
  <tr><td>onreset</td><td>The event occurs when a form is reset</td><td>2</td></tr>
  <tr><td>onsearch</td><td>The event occurs when the user writes something in a search field (for &lt;input=&quot;search&quot;&gt;)</td><td>3</td></tr>
  <tr><td>onselect</td><td>The event occurs after the user selects some&nbsp;text (for &lt;input&gt; and &lt;textarea&gt;)</td><td>2</td></tr>
  <tr><td>onsubmit</td><td>The event occurs when a form is submitted</td><td>2</td></tr>
</table>

### Drag Events

<table>
  <tr><td>ondrag</td><td>The event occurs when an element is being dragged</td><td>3</td></tr>
  <tr><td>ondragend</td><td>The event occurs when the user has finished dragging an element</td><td>3</td></tr>
  <tr><td>ondragenter</td><td>The event occurs when the dragged element enters the drop target</td><td>3</td></tr>
  <tr><td>ondragleave</td><td>The event occurs when the dragged element leaves the drop target</td><td>3</td></tr>
  <tr><td>ondragover</td><td>The event occurs when the dragged element is over the drop target</td><td>3</td></tr>
  <tr><td>ondragstart</td><td>The event occurs when the user starts to drag an element</td><td>3</td></tr>
  <tr><td>ondrop</td><td>The event occurs when the dragged element is dropped on the drop target</td><td>3</td></tr>
</table>

### Clipboard Events

<table>
  <tr><td>oncopy</td><td>The event occurs when the user copies the content of an element</td><td>&nbsp;</td></tr>
  <tr><td>oncut</td><td>The event occurs when the user cuts the content of an element</td><td>&nbsp;</td></tr>
  <tr><td>onpaste</td><td>The event occurs when the user pastes some content in an element</td><td>&nbsp;</td></tr>
</table>

### Print Events

<table>
  <tr><td>onafterprint</td><td>The event occurs when a page has started printing, or if the print dialogue box has been closed</td><td>3</td></tr>
  <tr><td>onbeforeprint</td><td>The event occurs when a page is about to be printed</td><td>3</td></tr>
</table>

### Media Events

<table>
  <tr><td>onabort</td><td>The event occurs when the loading of a media is aborted</td><td>3</td></tr>
  <tr><td>oncanplay</td><td>The event occurs when the browser can start playing the media (when it has buffered enough to begin)</td><td>3</td></tr>
  <tr><td>oncanplaythrough</td><td>The event occurs when the browser can play through the media without stopping for buffering</td><td>3</td></tr>
  <tr><td>ondurationchange</td><td>The event occurs when the duration of the media is changed</td><td>3</td></tr>
  <tr><td>onemptied</td><td>The event occurs when something bad happens and the media file is suddenly unavailable (like unexpectedly disconnects)</td><td>3</td></tr>
  <tr><td>onended</td><td>The event occurs when the media has reach the end (useful for messages like &quot;thanks for listening&quot;)</td><td>3</td></tr>
  <tr><td>onerror</td><td>The event occurs when an error occurred during the loading of a media file</td><td>3</td></tr>
  <tr><td>onloadeddata</td><td>The event occurs when media data is loaded</td><td>3</td></tr>
  <tr><td>onloadedmetadata</td><td>The event occurs when meta data (like dimensions and duration) are loaded</td><td>3</td></tr>
  <tr><td>onloadstart</td><td>The event occurs when the browser starts looking for the specified media</td><td>3</td></tr>
  <tr><td>onpause</td><td>The event occurs when the media is paused either by the user or programmatically</td><td>3</td></tr>
  <tr><td>onplay</td><td>The event occurs when the media has been started or is no longer paused</td><td>3</td></tr>
  <tr><td>onplaying</td><td>The event occurs when the media is playing after having been paused or stopped for buffering</td><td>3</td></tr>
  <tr><td>onprogress</td><td>The event occurs when the browser is in the process of getting the media data (downloading the media)</td><td>3</td></tr>
  <tr><td>onratechange</td><td>The event occurs when the playing speed of the media is changed</td><td>3</td></tr>
  <tr><td>onseeked</td><td>The event occurs when the user is finished moving/skipping to a new position in the media</td><td>3</td></tr>
  <tr><td>onseeking</td><td>The event occurs when the user starts moving/skipping to a new position in the media</td><td>3</td></tr>
  <tr><td>onstalled</td><td>The event occurs when the browser is trying to get media data, but data is not available</td><td>3</td></tr>
  <tr><td>onsuspend</td><td>The event occurs when the browser is intentionally not getting media data</td><td>3</td></tr>
  <tr><td>ontimeupdate</td><td>The event occurs when the playing position has changed (like when the user fast forwards to a different point in the media)</td><td>3</td></tr>
  <tr><td>onvolumechange</td><td>The event occurs when the volume of the media has changed (includes setting the volume to &quot;mute&quot;)</td><td>3</td></tr>
  <tr><td>onwaiting</td><td>The event occurs when the media has paused but is expected to resume (like when the media pauses to buffer more data)</td><td>3</td></tr>
</table>

### Animation Events

<table>
  <tr><td>animationend</td><td>The event occurs when a CSS animation has completed</td><td>3</td></tr>
  <tr><td>animationiteration</td><td>The event occurs when a CSS animation is repeated</td><td>3</td></tr>
  <tr><td>animationstart</td><td>The event occurs when a CSS animation has started</td><td>3</td></tr>
</table>

### Transition Events
<table>
  <tr><td>transitionend</td><td>The event occurs when a CSS transition has completed</td><td>3</td></tr>
</table>

### Server-Sent Events

<table>
  <tr><td>onerror</td><td>The event occurs when an error occurs with the event source</td><td>&nbsp;</td></tr>
  <tr><td>onmessage</td><td>The event occurs when a message is received through the event source</td><td>&nbsp;</td></tr>
  <tr><td>onopen</td><td>The event occurs when a connection with the event source is opened</td><td>&nbsp;</td></tr>
</table>

### Misc Events

<table>
  <tr><td>onmessage</td><td>The event occurs when a message is received through or from an object (WebSocket, Web Worker, Event Source or a child frame or a parent window)</td><td>3</td></tr>
  <tr><td>ononline</td><td>The event occurs when the browser starts to work online</td><td>3</td></tr>
  <tr><td>onoffline</td><td>The event occurs when the browser starts to work offline</td><td>3</td></tr>
  <tr><td>onpopstate</td><td>The event occurs when the window's history changes</td><td>3</td></tr>
  <tr><td>onshow</td><td>The event occurs when a &lt;menu&gt; element is shown as a context menu</td><td>3</td></tr>
  <tr><td>onstorage</td><td>The event occurs when a Web Storage area is updated</td><td>3</td></tr>
  <tr><td>ontoggle</td><td>The event occurs when the user opens or closes the &lt;details&gt; element</td><td>3</td></tr>
  <tr><td>onwheel</td><td>The event occurs when the mouse wheel rolls up or down over an element</td><td>3</td></tr>
</table>

### Touch Events

<table>
  <tr><td>ontouchcancel</td><td>The event occurs when the touch is interrupted</td><td>&nbsp;</td></tr>
  <tr><td>ontouchend</td><td>The event occurs when a finger is removed from a touch screen</td><td>&nbsp;</td></tr>
  <tr><td>ontouchmove</td><td>The event occurs when a finger is dragged across the screen</td><td>&nbsp;</td></tr>
  <tr><td>ontouchstart</td><td>The event occurs when a finger is placed on a touch screen</td><td>&nbsp;</td>
</table>


## Event Object

### Constants

<table>
  <tr><td>CAPTURING_PHASE</td><td>The current event phase is the capture phase (1)</td><td>1</td></tr>
  <tr><td>AT_TARGET</td><td>The current event is in the target phase, i.e. it is being evaluated at the event target (2)</td><td>2</td></tr>
  <tr><td>BUBBLING_PHASE</td><td>The current event phase is the bubbling phase (3)</td><td>3</td></tr>
</table>

### Properties

<table>
  <tr><td>bubbles</td><td>Returns whether or not a specific event is a bubbling event</td><td>2</td></tr>
  <tr><td>cancelable</td><td>Returns whether or not an event can have its default action prevented</td><td>2</td></tr>
  <tr><td>currentTarget</td><td>Returns the element whose event listeners triggered the event</td><td>2</td></tr>
  <tr><td>defaultPrevented</td><td>Returns whether or not the preventDefault() method was called for the event</td><td>3</td></tr>
  <tr><td>eventPhase</td><td>Returns which phase of the event flow is currently being evaluated</td><td>2</td></tr>
  <tr><td>isTrusted</td><td>Returns whether or not an event is trusted</td><td>3</td></tr>
  <tr><td>target</td><td>Returns the element that triggered the event</td><td>2</td></tr>
  <tr><td>timeStamp</td><td>Returns the time (in milliseconds relative to the epoch) at which the event was created</td><td>2</td></tr>
  <tr><td>type</td><td>Returns the name of the event</td><td>2</td></tr>
  <tr><td>view</td><td>Returns a reference to the Window object where the event occured</td><td>2</td></tr>
</table>

### Methods

<table>
  <tr><td>preventDefault()</td><td>Cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur</td><td>2</td></tr>
  <tr><td>stopImmediatePropagation()</td><td>Prevents other listeners of the same event from being called</td><td>3</td></tr>
  <tr><td>stopPropagation()</td><td>Prevents further propagation of an event during event flow</td><td>2</td></tr>
</table>

### MouseEvent Object

<table>
  <tr><td>altKey</td><td>Returns whether the &quot;ALT&quot; key was pressed when the mouse event was triggered</td><td>2</td></tr>
  <tr><td>button</td><td>Returns which mouse button was pressed when the mouse event was triggered</td><td>2</td></tr>
  <tr><td>buttons</td><td>Returns which mouse buttons were pressed when the mouse event was triggered</td><td>3</td></tr>
  <tr><td>clientX</td><td>Returns the horizontal coordinate of the mouse pointer, relative to the current window, when the mouse event was triggered</td><td>2</td></tr>
  <tr><td>clientY</td><td>Returns the vertical coordinate of the mouse pointer, relative to the current window, when the mouse event was triggered</td><td>2</td></tr>
  <tr><td>ctrlKey</td><td>Returns whether the &quot;CTRL&quot; key was pressed when the mouse event was triggered</td><td>2</td></tr>
  <tr><td>detail</td><td>Returns a number that indicates how many times the mouse was clicked</td><td>2</td></tr>
  <tr><td>metaKey</td><td>Returns whether the &quot;META&quot; key was pressed when an event was triggered</td><td>2</td></tr>
  <tr><td>pageX</td><td>Returns the horizontal coordinate of the mouse pointer, relative to the document, when the mouse event was triggered</td><td>&nbsp;</td></tr>
  <tr><td>pageY</td><td>Returns the vertical coordinate of the mouse pointer, relative to the document, when the mouse event was triggered</td><td>&nbsp;</td></tr>
  <tr><td>relatedTarget</td><td>Returns the element related to the element that triggered the mouse event</td><td>2</td></tr>
  <tr><td>screenX</td><td>Returns the horizontal coordinate of the mouse pointer, relative to the screen, when an event was triggered</td><td>2</td></tr>
  <tr><td>screenY</td><td>Returns the vertical coordinate of the mouse pointer, relative to the screen, when an event was triggered</td><td>2</td></tr>
  <tr><td>shiftKey</td><td>Returns whether the &quot;SHIFT&quot; key was pressed when an event was triggered</td><td>2</td></tr>
  <tr><td>which</td><td>Returns which mouse button was pressed when the mouse event was triggered</td><td>2</td></tr>
</table>

### KeyboardEvent Object

<table>
  <tr><td>altKey</td><td>Returns whether the &quot;ALT&quot; key was pressed when the key event was triggered</td><td>2</td></tr>
  <tr><td>ctrlKey</td><td>Returns whether the &quot;CTRL&quot; key was pressed when the key event was triggered</td><td>2</td></tr>
  <tr><td>charCode</td><td>Returns the Unicode character code of the key that triggered the onkeypress event</td><td>2</td></tr>
  <tr><td>key</td><td>Returns the key value of the key represented by the event</td><td>3</td></tr>
  <tr><td>keyCode</td><td>Returns the Unicode character code of the key that triggered the onkeypress event, or the Unicode key code of the key that triggered the onkeydown or onkeyup event</td><td>2</td></tr>
  <tr><td>location</td><td>Returns the location of a key on the keyboard or device</td><td>3</td></tr>
  <tr><td>metaKey</td><td>Returns whether the &quot;meta&quot; key was pressed when the key event was triggered</td><td>2</td></tr>
  <tr><td>shiftKey</td><td>Returns whether the &quot;SHIFT&quot; key was pressed when the key event was triggered</td><td>2</td></tr>
  <tr><td>which</td><td>Returns the Unicode character code of the key that triggered the onkeypress event, or the Unicode key code of the key that triggered the onkeydown or onkeyup event</td><td>2</td></tr>
</table>

### HashChangeEvent Object

<table>
  <tr><td>newURL</td><td>Returns the URL of the document, after the hash has been changed</td><td></td></tr>
  <tr><td>oldURL</td><td>Returns the URL of the document, before the hash was changed</td><td></td></tr>
</table>

### PageTransitionEvent Object

<table>
  <tr><td>persisted</td><td>Returns whether the webpage was cached by the browser</td><td>&nbsp;</td></tr>
</table>

<h3>FocusEvent Object</h3>

<table>
  <tr><td>relatedTarget</td><td>Returns the element related to the element that triggered the event</td><td>3</td></tr>
</table>

### AnimationEvent Object

<table>
  <tr><td>animationName</td><td>Returns the name of the animation</td><td></td></tr>
  <tr><td>elapsedTime</td><td>Returns the number of seconds an animation has been running</td><td></td></tr>
</table>

### TransitionEvent Object

<table>
  <tr><td>propertyName</td><td>Returns the name of the CSS property associated with the transition</td><td></td></tr>
  <tr><td>elapsedTime</td><td>Returns the number of seconds a transition has been running</td><td></td></tr>
</table>

### WheelEvent Object

<table>
  <tr><td>deltaX</td><td>Returns the horizontal scroll amount of a mouse wheel (x-axis)</td><td>3</td></tr>
  <tr><td>deltaY</td><td>Returns the vertical scroll amount of a mouse wheel (y-axis)</td><td>3</td></tr>
  <tr><td>deltaZ</td><td>Returns the scroll amount of a mouse wheel for the z-axis</td><td>3</td></tr>
  <tr><td>deltaMode</td><td>Returns a number that represents the unit of measurements for delta values (pixels, lines or pages)</td><td>3</td></tr>
</table>


## Style 对象

任何支持style特性的HTML元素在JavaScript中都有一个对应的style属性，包含着通过HTML的style特性指定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式。在style特性中指定的任何CSS属性都将表现为这个style对象的相应属性。对于使用短划线（分隔不同的词汇，例如background-image）的CSS属性名，必须将其转换成驼峰大小写形式，才能通过JavaScript来访问。详细列表访问 [MozillaMDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)

<table>
<tr><th>CSS</th><th>JavaScript</th></tr>
<tr><td>float</td><td>cssFloat</td></tr>
<tr><td>text-decoration</td><td>textDecoration</td></tr>
<tr><td>text-decoration: blink</td><td>textDecorationBlink</td></tr>
<tr><td>text-decoration: line-through</td><td>textDecorationLineThrough</td></tr>
<tr><td>text-decoration: none</td><td>textDecorationNone</td></tr>
<tr><td>text-decoration: overline</td><td>textDecorationOverline</td></tr>
<tr><td>text-decoration: underline</td><td>textDecorationUnderline</td></tr>
</table>


<style>#article em {color:#333} td:first-child{color:red;}</style>