<?php
session_start();
var_dump($_COOKIE);
echo "\n<br>";
var_dump($_SESSION);
echo "\n<br>";
session_destroy();  // 销毁会话，
session_start();
$_SESSION['before']=1;
echo "\n<br>", session_id();
session_regenerate_id(1);
$_SESSION['after']=2;
echo "\n<br>", session_id();

