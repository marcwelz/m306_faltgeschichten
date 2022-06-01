<?php

require_once "../config/include.inc.php";

global $mysql;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,DELETE,POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        $lobbyId = htmlentities($_GET["lobbyid"], ENT_QUOTES);

        $statement = $mysql->prepare("SELECT username FROM user WHERE lobbyID = ?;");
        $statement->bind_result($username);
        $statement->bind_param("i", $lobbyId);
        $statement->execute();
        while( $statement->fetch()){
            $users[] = $username;
        }

        if ($users) {
            http_response_code(200);

            echo json_encode($users);
        } else {
            http_response_code(400);
        }
        break;
    default:
        // 405 = Method Not Allowed
        http_response_code(405); // for PHP >= 5.4.0
        exit;
}

