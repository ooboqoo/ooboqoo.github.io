<?php
$handle = fopen('visitlog', 'a');
if ($_SERVER['REMOTE_ADDR'] == "112.10.164.59") {
  header('Content-type: image/jpeg');
  exit();
}
$record = date('H:i:s')." ".$_SERVER['REMOTE_ADDR']." ".$_GET['id']."\n";
fwrite($handle, $record);
fclose($handle);
header('Content-type: image/jpeg');
