<?php
  header("content-type:application/x-javascript; charset=UTF-8");
  echo $_REQUEST["callback"] . '({message: "Hello form the JSONP host!"});';
