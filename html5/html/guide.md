# HTML(5) Style Guide and Coding Conventions


### HTML Coding Conventions

Web developers are often uncertain about the coding style and syntax to use in HTML.

Between 2000 and 2010, many web developers converted from HTML to XHTML.

With XHTML, developers were forced to write valid and "well-formed" code.

HTML5 is a bit more sloppy when it comes to code validation.

With HTML5, you must create your own <strong>Best Practice, Style Guide and Coding Conventions</strong>.


### Be Smart and Future Proof

A consequent use of style, makes it easier for others to understand and use your HTML.

In the future, programs like XML readers, may want to read your HTML.

Using a well-formed "close to XHTML" syntax, can be smart.

Tips: Always keep your style smart, tidy, clean, and well-formed.


### Use Correct Document Type

Always declare the document type as the first line in your document:


### Use Lower Case Element Names

HTML5 allows mixing uppercase and lowercase letters in element names.

We recommend using lowercase element names:

<ul>
 <li>Mixing uppercase and lowercase names is bad</li>
 <li>Developers are used to using lowercase names (as in XHTML)</li>
 <li>Lowercase look cleaner</li>
 <li>Lowercase are easier to write</li>
</ul>


### Close All HTML Elements

In HTML5, you don't have to close all elements (for example the &lt;p&gt; element). 

We recommend closing all HTML elements.


### Close Empty HTML Elements

In HTML5, it is optional to close empty elements.

This is allowed: &lt;meta charset="utf-8"&gt;

This is also allowed: &lt;meta charset="utf-8" /&gt;

The slash (/) is required in XHTML and XML. If you expect XML software to access your page, it might be a good idea to keep it. 


### Use Lower Case Attribute Names

HTML5 allows mixing uppercase and lowercase letters in attribute names.

We recommend using lowercase attribute names:

<ul>
 <li>Mixing uppercase and lowercase names is bad</li>
 <li>Developers are used to using lowercase names (as in XHTML)</li>
 <li>Lowercase look cleaner</li>
 <li>Lowercase are easier to write</li>
</ul>


### Quote Attribute Values

HTML5 allows attribute values without quotes.

We recommend quoting attribute values:

<ul>
 <li>You have to use quotes if the value contains spaces</li>
 <li>Mixing styles is never good</li>
 <li>Quoted values are easier to read</li>
</ul>

This will not work, because the value contains spaces:

```html
<table class=table striped>
```

This will work: 

```html
<table class="table striped">
```


### Image Attributes

Always use the <strong>alt</strong> attribute with images. It is important when the image cannot be viewed.

Always define image size. It reduces flickering because the browser can reserve space for images before they are loaded.


### Spaces and Equal Signs

Spaces around equal signs is legal:

```html
<link rel = "stylesheet" href = "styles.css">
```

But space-less is easier to read, and groups entities better together:

```html
<link rel="stylesheet" href="styles.css">
```


### Avoid Long Code Lines

When using an HTML editor, it is inconvenient to scroll right and left to read the HTML code.

Try to avoid code lines longer than 80 characters.


### Blank Lines and Indentation

Do not add blank lines without a reason.

For readability, add blank lines to separate large or logical code blocks.

For readability, add 2 spaces of indentation. Do not use TAB.

Do not use unnecessary blank lines and indentation. It is not necessary to use blank lines between short and related items. It is not necessary to indent every element: 


### Omitting `<html>` and `<body>`

In the HTML5 standard, the &lt;html&gt; tag and the &lt;body&gt; tag can be omitted.

<strong>We do not recommend omitting the &lt;html&gt; and &lt;body&gt; tags.</strong>

The &lt;html&gt; element is the document root. It is the recommended place for specifying the page language:

```html
<html lang="zh-CN">
```

Declaring a language is important for accessibility applications (screen readers) and search engines.

Omitting &lt;html&gt; or &lt;body&gt; can crash DOM and XML software.

Omitting &lt;body&gt; can produce errors in older browsers (IE9).


### Omitting `<head>`

In the HTML5 standard, the &lt;head&gt; tag can also be omitted.

By default, browsers will add all elements before &lt;body&gt;, to a default &lt;head&gt; element.
You can reduce the complexity of HTML, by omitting the &lt;head&gt; tag:

Tips: Omitting tags is unfamiliar to web developers. It needs time to be established as a guideline.


### Meta Data

The &lt;title&gt; element is required in HTML5. Make the title as meaningful as possible:

```html
<title>HTML5 Syntax and Coding Style</title>
```

To ensure proper interpretation, and correct search engine indexing, both the language and the character encoding should be defined as early as possible in a document:

```html
<!DOCTYPE html>
<htmllang="en-US">
<head>
  <meta charset="UTF-8">
  <title>HTML5 Syntax and Coding Style</title>
</head>
```


### HTML Comments

Short comments should be written on one line, with a space after &lt;!-- and a space before --&gt;:

```html
<!-- This is a comment -->
```

Long comments, spanning many lines, should be written with &lt;!-- and --&gt; on separate lines:

```html
<!-- 
  This is a long comment example. This is a long comment example.
  This is a long comment example. This is a long comment example.
-->
```

Long comments are easier to observe, if they are indented 2 spaces.


### Style Sheets

Use simple syntax for linking style sheets (the type attribute is not necessary):

```html
<link rel="stylesheet" href="styles.css">
```

Short rules can be written compressed, on one line, like this:

```css
p.into {font-family: Verdana; font-size: 16em;}
```

Long rules should be written over multiple lines:

```css
body {
  background-color: lightgrey;
  font-family: "Arial Black", Helvetica, sans-serif;
  font-size: 16em;
  color: black;
}
```

<ul>
 <li>Place the opening bracket on the same line as the selector.</li>
 <li>Use one space before the opening bracket.</li>
 <li>Use 2 spaces of indentation.</li>
 <li>Use colon plus one space between each property and its value.</li>
 <li>Use space after each comma or semicolon.</li>
 <li>Use semicolon after each property-value pair, including the last.</li>
 <li>Only use quotes around values if the value contains spaces.</li>
 <li>Place the closing bracket on a new line, without leading spaces.</li>
 <li>Avoid lines over 80 characters.</li>
</ul>

Tips: Adding a space after a comma, or a semicolon, is a general rule in all types of writing.


### Loading JavaScript in HTML

Use simple syntax for loading external scripts (the type attribute is not necessary):

```html
<script src="myscript.js"></script>
```

### Accessing HTML Elements with JavaScript

A consequence of using "untidy" HTML styles, might result in JavaScript errors.

These two JavaScript statements will produce different results:

```js
var obj = getElementById("Demo")
var obj = getElementById("demo")
```

If possible, use the same naming convention (as JavaScript) in HTML.

<a href="http://w3schools.com/js/js_conventions.asp">Visit the JavaScript Style Guide</a>.


### Use Lower Case File Names

Most web servers (Apache, Unix) are case sensitive about file names:

Other web servers (Microsoft, IIS) are not case sensitive:

If you use a mix of upper and lower case, you have to be extremely consistent.

If you move from a case insensitive, to a case sensitive server, even small errors will break your web.

To avoid these problems, always use lower case file names (if possible). 


### File Extensions

HTML files should have a <strong>.html</strong> extension (or <strong>.htm</strong>).

CSS files should have a <strong>.css</strong> extension.

JavaScript files should have a <strong>.js</strong> extension.


### Differences Between .htm and .html

There is no difference between the .htm and .html extensions. Both will be treated as HTML by any web browser or web server.

The differences are cultural:

.htm "smells" of early DOS systems where the system limited the extensions to 3 characters.

.html "smells" of Unix operating systems that did not have this limitation.

### Technical Differences

When a URL does not specify a filename (like http://www.w3schools.com/css/), the server returns a default filename. Common default filenames are index.html, index.htm, default.html, and default.htm.

If your server is configured only with "index.html" as default filename, your file must be named "index.html", not "index.htm."

However, servers can be configured with more than one default filename, and normally you can set up as many default filenames as needed.

Anyway, the full extension for HTML files is .html, and there's no reason it should not be used.
