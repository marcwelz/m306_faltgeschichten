<?php

require_once "../config/include.inc.php";

global $mysql, $mysql2, $mysql3, $mysql4;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,DELETE,POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        $lobbyId = htmlentities($_GET["lobbyid"], ENT_QUOTES);

        $statement = $mysql->prepare("SELECT * FROM lobby WHERE lobbyID = ?;");
        $statement->bind_result($lobby, $adminID);
        $statement->bind_param("i", $lobbyId);
        $statement->execute();
        $statement->fetch();

        if (isset($lobby)) {
            http_response_code(200);

            exit;
        }
        http_response_code(404);
        break;
    case 'POST':
        $username = htmlentities($_GET['username'], ENT_QUOTES);
        $lobbyid = htmlentities($_GET['lobbyid'], ENT_QUOTES);

        $stmt = $mysql4->prepare("SELECT lobbyID FROM lobby WHERE lobbyID = ?");
        $stmt->bind_result($lobby);
        $stmt->bind_param("i", $lobbyid);
        $stmt->execute();
        $stmt->fetch();
        if (isset($lobby)) {
            http_response_code(400);//Bad Request
            exit;
        }
        $stmt->close();

        $stmt = $mysql->prepare("INSERT INTO lobby(lobbyID) VALUES(?);");
        $stmt->bind_param("i", $lobbyid);
        $stmt->execute();
        $stmt->close();

        $stmt = $mysql2->prepare("INSERT INTO user(username, lobbyID) VALUES(?,?);");
        $stmt->bind_param("si", $username, $lobbyid);
        $stmt->execute();
        $userid = $mysql2->insert_id;
        $stmt->close();

        $stmt = $mysql3->prepare("UPDATE lobby SET admin_ID=? WHERE lobbyID=?");
        $stmt->bind_param("ii", $userid, $lobbyid);
        $stmt->execute();
        $stmt->close();
        break;
    case 'OPTIONS':
        http_response_code(200);
        exit();
    default:
        // 405 = Method Not Allowed
        http_response_code(405); // for PHP >= 5.4.0
        exit;
}