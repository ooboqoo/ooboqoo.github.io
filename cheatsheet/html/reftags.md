# HTML Element Reference

注：带删除线的标记，HTML5 标准中已删除。

## Basic HTML

|||
|----------|------------------------------------
| [`<!DOCTYPE>`](tag_doctype.asp) | Defines the document type
| [`<html>`](tag_html.asp)   | Defines an HTML document
| [`<title>`](tag_title.asp) | Defines a title for the document
| [`<body>`](tag_body.asp)   | Defines the document's body
| [`<h1>` to `<h6>`](tag_hn.asp)  | Defines HTML headings
| [`<p>`](tag_p.asp)   | Defines a paragraph
| [`<br>`](tag_br.asp) | Inserts a single line break
| [`<hr>`](tag_hr.asp) | Defines a thematic change in the content
| [`<!--...-->`](tag_comment.asp) | Defines a comment


## Formatting

|||
|----------|------------------------------------
| [`<em>`](tag_em.asp) | Defines emphasized text
| [`<i>`](tag_i.asp)   | Defines a part of text in an alternate voice or mood
| [`<strong>`](tag_strong.asp) | Defines important text
| [`<b>`](tag_b.asp)           | Defines bold text
| [`<small>`](tag_small.asp)   | Defines smaller text
| [`<del>`](tag_del.asp)   | Defines text that has been deleted from a document
| [`<ins>`](tag_ins.asp)   | Defines a text that has been inserted into a document
| [`<mark>`](tag_mark.asp) | Defines marked/highlighted text
| [`<sub>`](tag_sub.asp)   | Defines subscripted text
| [`<sup>`](tag_sup.asp)   | Defines superscripted text
| [`<u>`](tag_u.asp)       | Defines text that should be stylistically different from normal text
| [`<s>`](tag_s.asp)       | Defines text that is no longer correct
| [`<big>`](tag_big.asp)   | Not supported in HTML5. Use CSS instead. Defines big text
| <s>`<center>`</s>        | Use CSS instead. Defines centered text
| <s>`<strike>`</s>        | Use `<del>` or `<s>` instead. Defines strikethrough text
| <s>`<acronym>`</s>       | Use `<abbr>` instead. Defines an acronym
| [`<abbr>`](tag_abbr.asp) | Defines an abbreviation or an acronym
| [`<q>`](tag_q.asp)       | Defines a short quotation
| [`<blockquote>`](tag_blockquote.asp) | Defines a section that is quoted from another source
| [`<cite>`](tag_cite.asp) | Defines the title of a work
| [`<dfn>`](tag_dfn.asp)   | Represents the defining instance of a term
| [`<address>`](tag_address.asp) | Defines contact information for the author/owner of a document/article
| [`<time>`](tag_time.asp) | Defines a date/time
| [`<bdo>`](tag_bdo.asp)   | Overrides the current text direction
| [`<pre>`](tag_pre.asp)   | Defines preformatted text
| [`<code>`](tag_code.asp) | Defines a piece of computer code 此标签不会保留多余的空白, 如要保留, 需要套一层`<pre>`
| [`<var>`](tag_var.asp)   | Defines a variable
| [`<kbd>`](tag_kbd.asp)   | Defines keyboard input
| [`<samp>`](tag_samp.asp) | Defines sample output from a computer program
| [`<bdi>`](tag_bdi.asp)   | Isolates a part of text that might be formatted in a different direction from other text outside it
| [`<meter>`](tag_meter.asp) | Defines a scalar measurement within a known range (a gauge)
| [`<progress>`](tag_progress.asp) | Represents the progress of a task
| [`<rp>`](tag_rp.asp) | Defines what to show in browsers that do not support ruby annotations
| [`<rt>`](tag_rt.asp) | Defines an explanation/pronunciation of characters (for East Asian typography)
| [`<ruby>`](tag_ruby.asp) | Defines a ruby annotation (for East Asian typography)
| [`<wbr>`](tag_wbr.asp) | Defines a possible line-break
| <s>`<font>`</s> | Use CSS instead. Defines font, color, and size for text
| <s>`<tt>`</s>   | Use CSS instead. Defines teletype text


## Forms and Input

|||
|----------|------------------------------------
| [`<form>`](tag_form.asp)         | Defines an HTML form for user input
| [`<input>`](tag_input.asp)       | Defines an input control
| [`<textarea>`](tag_textarea.asp) | Defines a multiline input control (text area)
| [`<button>`](tag_button.asp)     | Defines a clickable button
| [`<select>`](tag_select.asp)     | Defines a drop-down list
| [`<optgroup>`](tag_optgroup.asp) | Defines a group of related options in a drop-down list
| [`<option>`](tag_option.asp)     | Defines an option in a drop-down list
| [`<label>`](tag_label.asp)       | Defines a label for an `<input>` element
| [`<fieldset>`](tag_fieldset.asp) | Groups related elements in a form
| [`<legend>`](tag_legend.asp)     | Defines a caption for a `<fieldset>` element
| [`<datalist>`](tag_datalist.asp) | Specifies a list of pre-defined options for input controls
| [`<keygen>`](tag_keygen.asp)     | Defines a key-pair generator field (for forms)
| [`<output>`](tag_output.asp)     | Defines the result of a calculation


## Frames

|||
|----------|------------------------------------
| [`<iframe>`](tag_iframe.asp) | Defines an inline frame
| <s>`<frame>`</s>    | Defines a window (a frame) in a frameset
| <s>`<frameset>`</s> | Defines a set of frames
| <s>`<noframes>`</s> | Defines an alternate content for users that do not support frames


## Images

|||
|----------|------------------------------------
| [`<img>`](tag_img.asp)   | Defines an image
| [`<map>`](tag_map.asp)   | Defines a client-side image-map
| [`<area>`](tag_area.asp) | Defines an area inside an image-map
| [`<canvas>`](tag_canvas.asp) | Used to draw graphics, on the fly, via scripting (usually JavaScript)
| [`<figcaption>`](tag_figcaption.asp) | Defines a caption for a `<figure>` element
| [`<figure>`](tag_figure.asp) | Specifies self-contained content
| `<picture>` | `<img>` 的替代版本，比较新的浏览器才支持


## Audio / Video

|||
|----------|------------------------------------
| [`<audio>`](tag_audio.asp) | Defines sound content
| [`<video>`](tag_video.asp) | Defines a video or movie
| [`<source>`](tag_source.asp) | Defines multiple media resources for media elements (`<video>` and `<audio>`)
| [`<track>`](tag_track.asp) | Defines text tracks for media elements (`<video>` and `<audio>`)

## Links

|||
|----------|------------------------------------
| [`<a>`](tag_a.asp) | Defines a hyperlink
| [`<link>`](tag_link.asp) | Defines the relationship between a document and an external resource (most used to link to style sheets)
| [`<nav>`](tag_nav.asp) | Defines navigation links


## Lists

|||
|----------|------------------------------------
| [`<ul>`](tag_ul.asp) | Defines an unordered list
| [`<ol>`](tag_ol.asp) | Defines an ordered list
| [`<li>`](tag_li.asp) | Defines a list item
| [`<dl>`](tag_dl.asp) | Defines a description list
| [`<dt>`](tag_dt.asp) | Defines a term/name in a description list
| [`<dd>`](tag_dd.asp) | Defines a description of a term/name in a description list
| [`<menu>`](tag_menu.asp) | Defines a list/menu of commands
| [`<menuitem>`](tag_menuitem.asp) | Defines a command/menu item that the user can invoke from a popup menu
| <s>`<dir>`</s> | Use `<ul>` instead. Defines a directory list


## Tables

|||
|----------|------------------------------------
| [`<table>`](tag_table.asp) | Defines a table
| [`<tr>`](tag_tr.asp)       | Defines a row in a table
| [`<th>`](tag_th.asp)       | Defines a header cell in a table
| [`<td>`](tag_td.asp)       | Defines a cell in a table
| [`<caption>`](tag_caption.asp)   | Defines a table caption
| [`<colgroup>`](tag_colgroup.asp) | Specifies a group of one or more columns in a table for formatting
| [`<col>`](tag_col.asp)     | Specifies column properties for each column within a `<colgroup>` element
| [`<thead>`](tag_thead.asp) | Groups the header content in a table
| [`<tbody>`](tag_tbody.asp) | Groups the body content in a table
| [`<tfoot>`](tag_tfoot.asp) | Groups the footer content in a table


## Styles and Semantics

|||
|----------|------------------------------------
| [`<style>`](tag_style.asp)     | Defines style information for a document
| [`<div>`](tag_div.asp)         | Defines a section in a document
| [`<span>`](tag_span.asp)       | Defines a section in a document
| [`<header>`](tag_header.asp)   | Defines a header for a document or section
| [`<footer>`](tag_footer.asp)   | Defines a footer for a document or section
| [`<main>`](tag_main.asp)       | Specifies the main content of a document
| [`<section>`](tag_section.asp) | Defines a section in a document
| [`<article>`](tag_article.asp) | Defines an article
| [`<aside>`](tag_aside.asp)     | Defines content aside from the page content
| [`<details>`](tag_details.asp) | Defines additional details that the user can view or hide
| [`<dialog>`](tag_dialog.asp)   | Defines a dialog box or window
| [`<summary>`](tag_summary.asp) | Defines a visible heading for a `<details>` element


## Meta Info

|||
|----------|------------------------------------
| [`<head>`](tag_head.asp) | Defines information about the document
| [`<meta>`](tag_meta.asp) | Defines metadata about an HTML document
| [`<base>`](tag_base.asp) | Specifies the base URL/target for all relative URLs in a document
| <s>`<basefont>`</s> | Use CSS instead. Specifies a default color, size, and font for all text in a document


## Programming

|||
|----------|------------------------------------
| [`<script>`](tag_script.asp)     | Defines a client-side script
| [`<noscript>`](tag_noscript.asp) | Defines an alternate content for users that do not support client-side scripts
| <s>`<applet>`</s> | Use `<embed>` or `<object>` instead. Defines an embedded applet
| [`<embed>`](tag_embed.asp)   | Defines a container for an external (non-HTML) application
| [`<object>`](tag_object.asp) | Defines an embedded object
| [`<param>`](tag_param.asp)   | Defines a parameter for an object


<script>setBase('table', 'http://www.w3schools.com/tags/');</script>