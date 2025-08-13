<?php
if (preg_match('/\.php$/', $_SERVER["REQUEST_URI"])) {
    include __DIR__ . $_SERVER["REQUEST_URI"];
} else {
    return false;
}
