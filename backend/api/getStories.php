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

        $stmt = $mysql->prepare("SELECT count(userID) FROM user WHERE lobbyID = ? AND status = 'finished'");
        $stmt->bind_result($finishedUsers);
        $stmt->bind_param("i", $lobbyid);
        $stmt->execute();
        $stmt->fetch();
        $stmt2 = $mysql2->prepare("SELECT count(userID) FROM user WHERE lobbyID = ?");
        $stmt2->bind_result($allUsers);
        $stmt2->bind_param("i", $lobbyid);
        $stmt2->execute();
        $stmt2->fetch();
        if ($finishedUsers != $allUsers) {
            http_response_code(400);//Bad Request
            exit;
        }
        $stmt->close();
        $stmt2->close();

        $j = 1;
        for ($i = 1; $i <= 6; $i++){
            $stmt = $mysql->prepare("SELECT answer, username FROM story JOIN user ON story.participant_ID = user.userID WHERE lobby_ID = ? AND question = ? ORDER BY participant_ID, question");
            $stmt->bind_result($answer, $username);
            $stmt->bind_param("ii", $lobbyid, $i);
            $stmt->execute();

            while($stmt->fetch()) {
//                $ergebnis[$j % $finishedUsers][$i] = $answer;
                if (!isset($ergebnis[$j % $finishedUsers])){
                    $ergebnis[$j % $finishedUsers]["username"] = $username;
                    $ergebnis[$j % $finishedUsers]["story"] = $answer;
                } else {
                    $ergebnis[$j % $finishedUsers]["story"] = $ergebnis[$j % $finishedUsers]["story"] . " " . $answer;
                }
                $j++;
            }
            $j--;
            $stmt->close();
        }

        if (!isset($ergebnis)) {
            http_response_code(400);//Bad Request
            exit;
        }
        foreach ($ergebnis as $story){
            $return_arr[] = $story;
        }

        echo json_encode($return_arr);


        break;
    default:
        // 405 = Method Not Allowed
        http_response_code(405); // for PHP >= 5.4.0
        exit;
}
