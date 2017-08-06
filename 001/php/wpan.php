<?php
/*!
 * 本网盘程序完成于 2016/4/3 并于 2016/12/3 添加了 cookie 认证功能
 * 第一部分代码负责文件删除操作
 * 第二部分代码负责文件下载操作
 * 第三部分代码负责上件上传操作
 * html部分为上传表单及文件清单
 */

$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
$passport = $_COOKIE["passport"];
$cookie = file_get_contents("$DOCUMENT_ROOT/../cookie.txt");

if ($passport !== $cookie) {
  header("Content-type:text/html;charset=utf-8");
  echo "您没有获得访问授权，请先联系管理员开通权限。";
  exit;
}

$dir = "$DOCUMENT_ROOT/../wpan/";

// 删除文件操作
function delfile() {
  global $dir;
  $file_name = $_GET['delfile'];
  $file_path = $dir.$file_name;
  `rm -f "$file_path"`;  // 不加引号的话，碰到含有空格的就搞不定了
}

// 下载文件操作
function downfile() {
  global $dir;
  header("Content-type:text/html;charset=utf-8");
  $file_name = $_GET['downfile'];
  $file_path = $dir.$file_name;

  //首先判断给定的文件存在与否
  if (!file_exists($file_path)) {
    echo "没有该文件文件";
    return ;
  }

  $fp = fopen($file_path, "r");
  $file_size = filesize($file_path);
  //下载文件需要用到的头，企业应用部署时，有更好的方案如 mod_xsendfile for Apache2
  header("Content-type: application/octet-stream");
  header("Accept-Ranges: bytes");
  header("Content-Length:".$file_size);
  header("Content-Disposition: attachment; filename=".$file_name);

  //向浏览器返回数据
  $buffer = 10240;
  $file_count = 0;
  while (!feof($fp) && $file_count < $file_size) {
    $file_con = fread($fp, $buffer);
    $file_count += $buffer;
    echo $file_con;
  }
  fclose($fp);
  exit;
}

// 上传文件操作
function upfile() {
  global $dir;
  //Check to see if an error code was generated on the upload attempt
  if ($_FILES['upfile']['error'] > 0) exit('文件上传错误：'.$_FILES['upfile']['error']);

  // put the file where we'd like it
  $upfile = $dir.$_FILES['upfile']['name'];
  if (!move_uploaded_file($_FILES['upfile']['tmp_name'], $upfile)) exit('保存文件失败');
}

if (isset($_GET['delfile'])) {
  delfile();
} elseif (isset($_GET['downfile'])) {
  downfile();
} elseif (isset($_FILES['upfile'])) {
  upfile();
}

$out = `ls -AlhQ --full-time $dir`;
// 先把文件名取出，并从字符串中删除
preg_match_all('/\"([^\"]+)\"/', $out, $fname);
$out = preg_replace('/\"[^\"]+\"/', '', $out);
// 将文本转换为数组，如果没有前面先取走文件名，只要文件名中存在空格，这一步的拆分结果就会乱
$out = preg_split('/\s+/', $out);
foreach ($fname[1] as &$value) {
  $value = stripcslashes($value);  //解决中文显示为机器码的问题
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { padding: 1em; }
  table { margin: .5em 0; border-collapse: collapse; border:1px solid gray; }
  td, th { padding: .5em 1em; }
  input[type="file"] { padding: 2px; border: 1px dashed gray;  }
</style>
<title>中转网盘</title>
</head>
<body>
<?php
  //上传大文件需要修改 /etc/php.ini upload_max_filesize, post_max_size
?>
<form action="#" enctype="multipart/form-data" method="post">
  请选择上传的文件：
  <input type="hidden" name="MAX_FILE_SIZE" value="120000000"> <!-- 120M -->
  <input type="file" name="upfile">
  <input type="submit" value="上传">
</form>
<table>
  <tr><th>文件名</th><th>文件大小</th><th>修改日期</th><th>操作</th></tr>
<?php
for ($i = 2; $i < count($out)-1; $i += 8){
  $ii = ($i-2) / 8;
  echo '<tr><td>'.$fname[1][$ii].'</td><td>'.$out[$i+4].'</td><td>'.$out[$i+5].
  '</td><td><a href="wpan.php?downfile='.urlencode($fname[1][$ii]).
  '">下载</a> <a href="wpan.php?delfile='.urlencode($fname[1][$ii]).'">删除</a></td></tr>';
}
?>
</table>
</body>
</html>
