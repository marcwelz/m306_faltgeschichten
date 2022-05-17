<?php

require_once "../config/include.inc.php";

global $mysql;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,DELETE,POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $answer[0] = htmlentities($_POST['wer'], ENT_QUOTES);
        $answer[1] = htmlentities($_POST['beruf'], ENT_QUOTES);
        $answer[2] = htmlentities($_POST['was'], ENT_QUOTES);
        $answer[3] = htmlentities($_POST['wo'], ENT_QUOTES);
        $answer[4] = htmlentities($_POST['wann'], ENT_QUOTES);
        $answer[5] = htmlentities($_POST['wieso'], ENT_QUOTES);

        $username = htmlentities($_POST['username'], ENT_QUOTES);

        $statement = $mysql->prepare("SELECT userID, lobbyID FROM user WHERE username = ?;");
        $statement->bind_result($userid, $lobbyid);
        $statement->bind_param("s", $username);
        $statement->execute();
        $statement->fetch();

        for ($x = 0; $x <= 5; $x++) {
            $stmt = $mysql->prepare("INSERT INTO story(participant_ID, lobby_ID, question, answer) VALUES(?,?,?,?)");
            $stmt->bind_param("iiis", $userid, $lobbyid, $x, $answer[$x]);
            $stmt->execute();
        }
        break;
    default:
        // 405 = Method Not Allowed
        http_response_code(405); // for PHP >= 5.4.0
        exit;
}
