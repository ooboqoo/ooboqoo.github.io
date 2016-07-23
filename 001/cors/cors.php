<?php
if (preg_match('/localhost|github.io/i', $_SERVER['HTTP_ORIGIN'])){
  header("Access-Control-Allow-Origin: *");
  header("charset=UTF-8");
  echo $_REQUEST["message"];
} else {
  echo "Authenticate fail, please register for the service first!";
}
