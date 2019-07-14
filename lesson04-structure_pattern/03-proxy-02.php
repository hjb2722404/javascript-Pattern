<?php
    $proxy = $_POST["proxy"];
    $callback = $_POST["callback"];
    header("Location: ".$proxy."?callback=".$callback."&arg=success");
?>