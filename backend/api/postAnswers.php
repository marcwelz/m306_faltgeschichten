<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,DELETE,POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once "../config/include.inc.php";

global $mysql, $mysql2, $mysql3;

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $answer[1] = htmlentities($_POST['wer'], ENT_QUOTES, "UTF-8");
        $answer[2] = htmlentities($_POST['beruf'], ENT_QUOTES, "UTF-8");
        $answer[3] = htmlentities($_POST['was'], ENT_QUOTES, "UTF-8");
        $answer[4] = htmlentities($_POST['wo'], ENT_QUOTES, "UTF-8");
        $answer[5] = htmlentities($_POST['wann'], ENT_QUOTES, "UTF-8");
        $answer[6] = htmlentities($_POST['wieso'], ENT_QUOTES, "UTF-8");

        $username = htmlentities($_POST['username'], ENT_QUOTES);
        $lobby = htmlentities($_POST['lobby'], ENT_QUOTES);

        $statement = $mysql->prepare("SELECT userID, lobbyID FROM user WHERE username = ? AND lobbyID = ?;");
        $statement->bind_result($userid, $lobbyid);
        $statement->bind_param("si", $username, $lobby);
        $statement->execute();
        $statement->fetch();

        for ($x = 1; $x <= 6; $x++) {
            $stmt = $mysql2->prepare("INSERT INTO story(participant_ID, lobby_ID, question, answer) VALUES(?,?,?,?)");
            $stmt->bind_param("iiis", $userid, $lobbyid, $x, $answer[$x]);
            $stmt->execute();
            $stmt->close();
        }

        $statement->close();

        $statement1 = $mysql3->prepare("UPDATE user SET status = 'finished' WHERE username = ? AND lobbyID = ?;");
        $statement1->bind_param("si", $username, $lobby);
        $statement1->execute();
        $statement1->fetch();
        http_response_code(200);
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