/* w3codecolor ver 1.15 by w3schools.com  在此基础上我做了修改 */

(function() { // 设置脚本在文档加载完毕时自动运行
  var oldonload = window.onload;
  window.onload = function() {
    if (typeof oldonload === 'function') oldonload();
    var x = document.getElementsByTagName("pre"); // 默认只给 <pre> 中的内容上色
    var reg = /html|css|less|js|php/;
    var i, text, lang;
    for (i = 0; i < x.length; i++) {
      text = x[i].innerHTML;
      lang = reg.exec(x[i].className); // 通过 class 指定语言，默认为 html
      text = w3CodeColorize(text, lang);
      x[i].innerHTML = text;
    }
  };
})();

function w3CodeColorize(x, lang) {
  var tagcolor = "mediumblue";
  var tagnamecolor = "brown";
  var attributecolor = "red";
  var attributevaluecolor = "mediumblue";
  var commentcolor = "green";
  var cssselectorcolor = "brown";
  var csspropertycolor = "red";
  var csspropertyvaluecolor = "mediumblue";
  var cssdelimitercolor = "black";
  var jscolor = "black";
  var jskeywordcolor = "mediumblue";
  var jsstringcolor = "brown";
  var jsnumbercolor = "red";
  var phptagcolor = "red";
  var phpcolor = "black";
  var phpkeywordcolor = "mediumblue";
  var phpglobalcolor = "goldenrod";
  var phpstringcolor = "brown";
  var phpnumbercolor = "red";
  var angularstatementcolor = "red";
  if (!lang) { lang = "html"; }
  if (lang == "html") {
    return htmlMode(x); }
  if (lang == "css") {
    return cssMode(x); }
  if (lang == "less") {
    return lessMode(x); }
  if (lang == "js") {
    return jsMode(x); }
  if (lang == "php") {
    return phpMode(x); }
  return x;

  function extract(str, start, end, func, repl) {
    // str 待处理文本；start 开始标志；end 结束标志；func 处理方法；repl 替换字符
    var s, e, d = "",
      a = [];
    while (str.search(start) > -1) {
      s = str.search(start);
      e = str.indexOf(end, s);
      if (e == -1) { e = str.length; } // 这里应该是 str.length -1 吧
      if (repl) {
        a.push(func(str.substring(s, e + (end.length))));
        str = str.substring(0, s) + repl + str.substr(e + (end.length));
      } else {
        d += str.substring(0, s);
        d += func(str.substring(s, e + (end.length)));
        str = str.substr(e + (end.length));
      }
    }
    this.rest = d + str;
    this.arr = a;
  }

  function htmlMode(txt) {
    var rest = txt,
      done = "",
      php, comment, angular, startpos, endpos, note, i;
    php = new extract(rest, "&lt;\\?php", "?&gt;", phpMode, "W3PHPPOS");
    rest = php.rest;
    comment = new extract(rest, "&lt;!--", "--&gt;", commentMode,
      "W3HTMLCOMMENTPOS");
    rest = comment.rest;
    while (rest.indexOf("&lt;") > -1) {
      note = "";
      startpos = rest.indexOf("&lt;");
      if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") { note = "css"; }
      if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") { note =
          "javascript"; }
      endpos = rest.indexOf("&gt;", startpos);
      if (endpos == -1) { endpos = rest.length; }
      done += rest.substring(0, startpos);
      done += tagMode(rest.substring(startpos, endpos + 4));
      rest = rest.substr(endpos + 4);
      if (note == "css") {
        endpos = rest.indexOf("&lt;/style&gt;");
        if (endpos > -1) {
          done += cssMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
      if (note == "javascript") {
        endpos = rest.indexOf("&lt;/script&gt;");
        if (endpos > -1) {
          done += jsMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
    }
    rest = done + rest;
    angular = new extract(rest, "{{", "}}", angularMode);
    rest = angular.rest;
    for (i = 0; i < comment.arr.length; i++) {
      rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
    }
    for (i = 0; i < php.arr.length; i++) {
      rest = rest.replace("W3PHPPOS", php.arr[i]);
    }
    return rest;
  }

  function tagMode(txt) {
    var rest = txt,
      done = "",
      startpos, endpos, result;
    while (rest.search(/(\s|<br>)/) > -1) {
      startpos = rest.search(/(\s|<br>)/);
      endpos = rest.indexOf("&gt;");
      if (endpos == -1) { endpos = rest.length; }
      done += rest.substring(0, startpos);
      done += attributeMode(rest.substring(startpos, endpos));
      rest = rest.substr(endpos);
    }
    result = done + rest;
    result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(
      4);
    if (result.substr(result.length - 4, 4) == "&gt;") {
      result = result.substring(0, result.length - 4) + "<span style=color:" +
        tagcolor + ">&gt;</span>";
    }
    return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
  }

  function attributeMode(txt) {
    var rest = txt,
      done = "",
      startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;
    while (rest.indexOf("=") > -1) {
      startpos = rest.indexOf("=");
      singlefnuttpos = rest.indexOf("'", startpos);
      doublefnuttpos = rest.indexOf('"', startpos);
      spacepos = rest.indexOf(" ", startpos + 2);
      if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) &&
        (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
        endpos = rest.indexOf(" ", startpos);
      } else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos ||
          singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
        endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
      } else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos ||
          doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
        endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
      }
      if (!endpos || endpos == -1 || endpos < startpos) { endpos = rest.length; }
      done += rest.substring(0, startpos);
      done += attributeValueMode(rest.substring(startpos, endpos + 1));
      rest = rest.substr(endpos + 1);
    }
    return "<span style=color:" + attributecolor + ">" + done + rest +
      "</span>";
  }

  function attributeValueMode(txt) {
    return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
  }

  function angularMode(txt) {
    return "<span style=color:" + angularstatementcolor + ">" + txt + "</span>";
  }

  function commentMode(txt) {
    return "<span style=color:" + commentcolor + ">" + txt + "</span>";
  }

  function cssMode(txt) {
    var rest = txt,
      done = "",
      comment, prop, i;
    comment = new extract(rest, /\/\*/, "*/", commentMode, "W3CSSCOMMENTPOS");
    rest = comment.rest;
    prop = new extract(rest, "{", "}", cssPropertyMode);
    rest = prop.rest;
    for (i = 0; i < comment.arr.length; i++) {
      rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);
    }
    return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
  }

  // 自己添加的方法以处理 less 文档高亮显示，主要解决了嵌套问题
  function lessMode(txt) {
    var rest = txt,
      done = "",
      commentML, commentSL, prop, i;

    commentML = new extract(rest, /\/\*/, "*/", commentMode, "COMMENTPOSML");
    rest = commentML.rest;

    // 添加单行注释以适应 less 显示
    commentSL = new extract(rest, /\/\//, "\n", commentMode, "COMMENTPOSSL");
    rest = commentSL.rest;

    // 对键值对进行加亮
    rest = rest.replace(/&gt;/g, "&gtSEMICOLON"); // 对 &gt; 进行预处理避免干扰
    rest = rest.replace(/([a-z\d\-\s]+):([^;}{]+)/g, function(match, p1, p2) {
      return "<span style=color:" + csspropertycolor + ">" + p1 + "</span>" +
        "<span style=color:" + cssdelimitercolor + ">:</span>" +
        "<span style=color:" + csspropertyvaluecolor + ">" + p2 + "</span>";
    });
    rest = rest.replace(/&gtSEMICOLON/g, "&gt;");

    rest = rest.replace(/\{|\}|\(|\)/g, function(match) {
      return "<span style=color:" + cssdelimitercolor + ">" + match +
        "</span>";
    });

    for (i = 0; i < commentML.arr.length; i++) {
      rest = rest.replace("COMMENTPOSML", commentML.arr[i]);
    }
    for (i = 0; i < commentSL.arr.length; i++) {
      rest = rest.replace("COMMENTPOSSL", commentSL.arr[i]);
    }
    return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
  }

  function cssPropertyMode(txt) {
    var rest = txt,
      propval;
    propval = new extract(rest, ":", ";", cssPropertyValueMode);
    rest = propval.rest;
    rest = "<span style=color:" + cssdelimitercolor + ">{</span>" + rest.substring(
      1);
    if (rest.substr(rest.length - 1, 1) == "}") {
      rest = rest.substring(0, rest.length - 1) + "<span style=color:" +
        cssdelimitercolor + ">}</span>";
    }
    return "<span style=color:" + csspropertycolor + ">" + rest + "</span>";
  }

  function cssPropertyValueMode(txt) {
    var result = txt;
    result = "<span style=color:" + cssdelimitercolor + ">:</span>" + result.substring(
      1);
    if (result.substr(result.length - 1, 1) == ";" && result.substr(result.length -
        6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" &&
      result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length -
        5, 5) != "&amp;") {
      result = result.substring(0, result.length - 1) + "<span style=color:" +
        cssdelimitercolor + ">;</span>";
    } else if (result.substr(result.length - 1, 1) == "}") {
      result = result.substring(0, result.length - 1) + "<span style=color:" +
        cssdelimitercolor + ">}</span>";
    }
    return "<span style=color:" + csspropertyvaluecolor + ">" + result +
      "</span>";
  }

  function jsMode(txt) {
    var rest = txt,
      done = "",
      sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, y;
    y = 1;
    while (y == 1) {
      sfnuttpos = getPos(rest, "'", "'", jsStringMode);
      dfnuttpos = getPos(rest, '"', '"', jsStringMode);
      compos = getPos(rest, /\/\*/, "*/", commentMode);
      comlinepos = getPos(rest, /\/\//, "\n", commentMode); // Gavin: 这里本来是 "<br>"，但我要的是找行尾，改成 "\n"
      numpos = getNumPos(rest, jsNumberMode);
      keywordpos = getKeywordPos("js", rest, jsKeywordMode);
      if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[
          0], keywordpos[0]) == -1) {
        break; }
      mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos,
        keywordpos);
      if (mypos[0] == -1) {
        break; }
      if (mypos[0] > -1) {
        done += rest.substring(0, mypos[0]);
        done += mypos[2](rest.substring(mypos[0], mypos[1]));
        rest = rest.substr(mypos[1]);
      }
    }
    return "<span style=color:" + jscolor + ">" + done + rest + "</span>";
  }

  function jsStringMode(txt) {
    return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
  }

  function jsKeywordMode(txt) {
    return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
  }

  function jsNumberMode(txt) {
    return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
  }

  function getMinPos() {
    var i, arr = [];
    for (i = 0; i < arguments.length; i++) {
      if (arguments[i][0] > -1) {
        if (arr.length == 0 || arguments[i][0] < arr[0]) { arr = arguments[i]; }
      } // 查找最小的有效项目
    }
    if (arr.length == 0) { arr = arguments[i - 1]; } // 如果没有有效项目，返回undefined，我把 i 改成了 i-1，不知对错
    return arr;
  }

  function phpMode(txt) {
    var rest = txt,
      done = "",
      sfnuttpos, dfnuttpos, compos, comlinepos, comhashpos, keywordpos, mypos,
      y;
    y = 1;
    while (y == 1) {
      sfnuttpos = getPos(rest, "'", "'", phpStringMode); // 查找单引号包裹内容，返回 [开头位置, 结尾位置, func]
      dfnuttpos = getPos(rest, '"', '"', phpStringMode); // 查找双引号包裹内容
      compos = getPos(rest, /\/\*/, "*/", commentMode); // 查找多行注释
      comlinepos = getPos(rest, /\/\//, "\n", commentMode); // 查找 //开头 单行注释
      comhashpos = getPos(rest, "#", "\n", commentMode); // 查找 #开头 单行注释
      numpos = getNumPos(rest, phpNumberMode); // 查找数字
      keywordpos = getKeywordPos("php", rest, phpKeywordMode); // 查找关键词
      if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[
          0], comhashpos[0], keywordpos[0]) == -1) {
        break; }
      mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos,
        comhashpos, keywordpos);
      if (mypos[0] == -1) {
        break; }
      if (mypos[0] > -1) {
        done += rest.substring(0, mypos[0]);
        done += mypos[2](rest.substring(mypos[0], mypos[1]));
        rest = rest.substr(mypos[1]);
      }
    }
    rest = done + rest;
    /*  不适合我的应用场景，先注释掉
        rest = "<span style=color:" + phptagcolor + ">&lt;" + rest.substr(4, 4) + "</span>" + rest.substring(8);
        if (rest.substr(rest.length - 5, 5) == "?&gt;") {
          rest = rest.substring(0, rest.length - 5) + "<span style=color:" + phptagcolor + ">?&gt;</span>";
        }
    */
    return "<span style=color:" + phpcolor + ">" + rest + "</span>";
  }

  function phpStringMode(txt) {
    return "<span style=color:" + phpstringcolor + ">" + txt + "</span>";
  }

  function phpNumberMode(txt) {
    return "<span style=color:" + phpnumbercolor + ">" + txt + "</span>";
  }

  function phpKeywordMode(txt) {
    var glb = ["$GLOBALS", "$_SERVER", "$_REQUEST", "$_POST", "$_GET",
      "$_FILES", "$_ENV", "$_COOKIE", "$_SESSION"
    ];
    if (glb.indexOf(txt) > -1) {
      return "<span style=color:" + phpglobalcolor + ">" + txt + "</span>";
    } else {
      return "<span style=color:" + phpkeywordcolor + ">" + txt + "</span>";
    }
  }

  function getKeywordPos(typ, txt, func) {
    var words, i, pos, rpos = -1,
      rpos2 = -1,
      patt;
    if (typ == "js") {
      words = ["abstract", "arguments", "boolean", "break", "byte", "case",
        "catch", "char", "class", "const", "continue", "debugger", "default",
        "delete",
        "do", "double", "else", "enum", "eval", "export", "extends", "false",
        "final", "finally", "float", "for", "function", "goto", "if",
        "implements", "import",
        "in", "instanceof", "int", "interface", "let", "long", "native",
        "new", "null", "package", "private", "protected", "public", "return",
        "short", "static",
        "super", "switch", "synchronized", "this", "throw", "throws",
        "transient", "true", "try", "typeof", "var", "void", "volatile",
        "while", "with", "yield"
      ];
    } else if (typ == "php") {
      words = ["$GLOBALS", "$_SERVER", "$_REQUEST", "$_POST", "$_GET",
        "$_FILES", "$_ENV", "$_COOKIE", "$_SESSION",
        "__halt_compiler", "abstract", "and", "array", "as", "break",
        "callable", "case", "catch", "class", "clone", "const", "continue",
        "declare", "default",
        "die", "do", "echo", "else", "elseif", "empty", "enddeclare",
        "endfor", "endforeach", "endif", "endswitch", "endwhile", "eval",
        "exit", "extends", "final", "for",
        "foreach", "function", "global", "goto", "if", "implements",
        "include", "include_once", "instanceof", "insteadof", "interface",
        "isset", "list", "namespace", "new",
        "or", "print", "private", "protected", "public", "require",
        "require_once", "return", "static", "switch", "throw", "trait", "try",
        "unset", "use", "var", "while", "xor"
      ];
    }
    for (i = 0; i < words.length; i++) {
      pos = txt.indexOf(words[i]);
      if (pos > -1) {
        patt = /\W/g;
        if (txt.substr(pos + words[i].length, 1).match(patt) && txt.substr(pos -
            1, 1).match(patt)) {
          if (pos > -1 && (rpos == -1 || pos < rpos)) {
            rpos = pos;
            rpos2 = rpos + words[i].length;
          }
        }
      }
    }
    return [rpos, rpos2, func];
  }

  function getPos(txt, start, end, func) {
    var s, e;
    s = txt.search(start); // 查找开始标记的位置，没有就返回 -1
    e = txt.indexOf(end, s + (end.length)); // 查找结束标记位置，没有就返回 -1
    if (e == -1) { e = txt.length; } // 找不到匹配的结束符，就直接延伸的末尾，这个无法应付一些复杂的代码结构，但也基本够用
    return [s, e + (end.length), func];
  }

  function getNumPos(txt, func) {
    var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{",
        "}", "/", "-", "*", "|", "%"
      ],
      i, j, c, startpos = 0,
      endpos, word;
    for (i = 0; i < txt.length; i++) {
      for (j = 0; j < arr.length; j++) {
        c = txt.substr(i, arr[j].length);
        if (c == arr[j]) {
          if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) ==
              "E")) {
            continue;
          }
          endpos = i;
          if (startpos < endpos) {
            word = txt.substring(startpos, endpos);
            if (!isNaN(word)) {
              return [startpos, endpos, func]; }
          }
          i += arr[j].length;
          startpos = i;
          i -= 1;
          break;
        }
      }
    }
    return [-1, -1, func];
  }
}
