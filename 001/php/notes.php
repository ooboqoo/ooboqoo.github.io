<?php
  $DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
  $passport = $_COOKIE["passport"];
  $cookie = file_get_contents("$DOCUMENT_ROOT/../cookie.txt");

  if ($passport !== $cookie) {
    echo "您没有获得访问授权，请先联系管理员开通权限。";
    exit;
  }

  if (isset($_POST['content'])) {
    file_put_contents("$DOCUMENT_ROOT/../notes.txt", $_POST['content']);
  }

  $content = file_get_contents("$DOCUMENT_ROOT/../notes.txt");
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<STYLE type="text/css">
  body { font-family: Verdana, Arial, SimSun, "Microsoft YaHei", sans-serif; line-height: 1.5;
    max-width: 980px; }
  html, body, form { height: 100%; overflow-y: hidden; }
  form { text-align: center; }
  textarea { width: calc(100% - 20px); height: calc(100% - 80px);
    margin:auto; padding: .5em; font-size: 1.25rem; line-height: 1.5; border-radius: .5em }
  input[type="submit"] { float: right; margin-bottom: .25em; padding: 0.1em 0.25em;
    font-size: 1.5em; border-radius: .25em; cursor: pointer; }
</STYLE>
<title>Gavin's Online Notepad</title>
</head>

<body>
  <form action="#" method="post">
    <h2 style="float: left; margin: 0;">在线记事本</h2>
    <input type="submit" value="保存记录">
    <textarea name="content"><?php echo $content ?></textarea><br>
  </form>
</body>
</html>
