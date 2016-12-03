<?php
$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
$value = file_get_contents("$DOCUMENT_ROOT/../cookie.txt");
setcookie("passport", $value, time()+60*60*24*30*3);
?>
Cookie 已设置
