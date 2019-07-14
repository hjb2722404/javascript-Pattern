<?php
$data = $_GET["data"];
$callback = $_GET["callback"];
echo $callback."('success','".$data."')";
?>