<?php

require_once "../config/include.inc.php";

global $mysql, $mysql2;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,DELETE,POST,PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        $startGame = true;

        $lobbyId = htmlentities($_GET["lobbyid"], ENT_QUOTES);

        $statement = $mysql->prepare("SELECT username, status FROM user WHERE lobbyID = ?;");
        $statement->bind_result($username, $status);
        $statement->bind_param("i", $lobbyId);
        $statement->execute();
        while( $statement->fetch()){
            $users[] = array("username" => $username, "status" => $status);
            if ($status != "ready")
                $startGame = false;
        }

        if ($users) {
            http_response_code(200);

            if ($startGame && count($users) > 3){
                echo json_encode(array("start" => true));
                closeDB();
                exit();
            }

            echo json_encode($users);
        } else {
            http_response_code(404);
        }
        break;
    case 'POST':
        $username = htmlentities($_GET['username'], ENT_QUOTES);
        $lobbyid = htmlentities($_GET['lobbyid'], ENT_QUOTES);

        $stmt = $mysql->prepare("INSERT INTO user(username, lobbyID) VALUES(?,?);");
        $stmt->bind_param("si", $username, $lobbyid);
        $stmt->execute();
        $userid = $mysql->insert_id;
        $stmt->close();
        break;
    case 'DELETE':
        $username = htmlentities($_GET['username'], ENT_QUOTES);
        $lobbyid = htmlentities($_GET['lobbyid'], ENT_QUOTES);

        $stmt = $mysql->prepare("DELETE FROM user WHERE username = ? AND lobbyID = ?");
        $stmt->bind_param("si", $username, $lobbyid);
        $stmt->execute();
        $stmt->close();
        break;
    case 'PATCH':
        $username = htmlentities($_GET['username'], ENT_QUOTES);
        $lobbyid = htmlentities($_GET['lobbyid'], ENT_QUOTES);

        $stmt = $mysql->prepare("UPDATE user SET status = CASE when status = 'lobby' THEN 'ready' ELSE 'lobby' END WHERE username = ? AND lobbyID = ?;");
        $stmt->bind_param("si", $username, $lobbyid);
        $stmt->execute();
        $stmt->close();

        $statement = $mysql2->prepare("DELETE FROM story WHERE username = ? AND lobbyID = ?;");
        $statement->bind_param("si", $username, $lobbyid);
        $statement->execute();
        $statement->close();
        break;
    case 'PUT':
        $username = htmlentities($_GET['username'], ENT_QUOTES);
        $lobbyid = htmlentities($_GET['lobbyid'], ENT_QUOTES);

        $stmt = $mysql->prepare("UPDATE user SET status = 'lobby' WHERE username = ? AND lobbyID = ?;");
        $stmt->bind_param("si", $username, $lobbyid);
        $stmt->execute();
        $stmt->close();

        $statement = $mysql2->prepare("DELETE FROM story WHERE username = ? AND lobbyID = ?;");
        $statement->bind_param("si", $username, $lobbyid);
        $statement->execute();
        $statement->close();
        break;
    case 'OPTIONS':
        http_response_code(200);
        break;
    default:
        // 405 = Method Not Allowed
        http_response_code(405); // for PHP >= 5.4.0
        break;
}
closeDB();

