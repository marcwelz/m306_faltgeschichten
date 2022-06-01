<?php

require_once "../config/include.inc.php";

global $mysql, $mysql2;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,DELETE,POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $lobbyid = htmlentities($_GET['lobbyid'], ENT_QUOTES);

        $stmt = $mysql->prepare("SELECT lobbyID FROM lobby WHERE lobbyID = ?");
        $stmt->bind_result($lobby);
        $stmt->bind_param("i", $lobbyid);
        $stmt->execute();
        $stmt->fetch();
        if (isset($lobby)) {
            http_response_code(400);//Bad Request
            exit;
        }
        $stmt->close();

        break;
    default:
        // 405 = Method Not Allowed
        http_response_code(405); // for PHP >= 5.4.0
        exit;
}
