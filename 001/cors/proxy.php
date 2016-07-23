<?php
if (preg_match('/localhost|github.io/i', $_SERVER['HTTP_ORIGIN'])){
  $url = $_REQUEST["url"];
  trim($url);
  if (stripos($url, "http") === false){
    $url = "http://" . $url;
  }

  $html = file_get_contents($url);
  preg_match('/<title>([^<]*)<\/title>/i', $html, $matches);
  header("Access-Control-Allow-Origin: *");
  header("charset=UTF-8");
  echo $matches[1];
} else {
  echo "Authenticate fail, please register for the service first!";
}