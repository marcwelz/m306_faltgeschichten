<?php

require_once "./backend/config/include.inc.php";

global $mysql;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// Get Lobby id
$lobbyId = null;
if (isset($uri[1])) {
    $lobbyId = (int) $uri[1];
}

$sql = "SELECT * FROM `lobby` WHERE `lobbyID` = ?;";

$mysql->prepare($sql);
$mysql->setopt(1, $lobbyId);

