<?php

require_once "config.inc.php";
openDB();


//--------------------------------------------------------------------------------------------------------
// htmlentitiesMulti
//--------------------------------------------------------------------------------------------------------
function htmlentitiesMulti(&$p1, &$p2 = "", &$p3 = "", &$p4 = "", &$p5 = "", &$p6 = "", &$p7 = "", &$p8 = "", &$p9 = "", &$p10 = "", &$p11 = "", &$p12 = "", &$p13 = "")
{
    $arr = array(&$p1, &$p2, &$p3, &$p4, &$p5, &$p6, &$p7, &$p8, &$p9, &$p10, &$p11, &$p12, &$p13);
    for ($i = 0; $i < count($arr); $i++) {
        $arr[$i] = htmlentities($arr[$i], ENT_QUOTES | ENT_XML1, "utf-8");
    }
}

//--------------------------------------------------------------------------------------------------------
// htmlentitiesMulti
//--------------------------------------------------------------------------------------------------------
function jsCleanMulti(&$p1, &$p2 = "", &$p3 = "", &$p4 = "", &$p5 = "", &$p6 = "", &$p7 = "", &$p8 = "", &$p9 = "", &$p10 = "", &$p11 = "", &$p12 = "", &$p13 = "")
{
    $arr = array(&$p1, &$p2, &$p3, &$p4, &$p5, &$p6, &$p7, &$p8, &$p9, &$p10, &$p11, &$p12, &$p13);
    for ($i = 0; $i < count($arr); $i++) {
        $arr[$i] = str_replace("\n", "\\n", $arr[$i]);
        $arr[$i] = str_replace("\r", "\\r", $arr[$i]);
        $arr[$i] = str_replace("\'", "\\\'", $arr[$i]);
        $arr[$i] = str_replace("\"", "\\\"", $arr[$i]);
    }
}


//--------------------------------------------------------------------------------------------------------
// openDB
//--------------------------------------------------------------------------------------------------------
function openDB()
{
    global $mysql, $mysql2, $mysql3, $mysql4, $mysql5, $DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME;

    $mysql = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);
    $mysql->set_charset("utf8");
    $mysql2 = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);
    $mysql2->set_charset("utf8");
    $mysql3 = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);
    $mysql3->set_charset("utf8");
    $mysql4 = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);
    $mysql4->set_charset("utf8");
    $mysql5 = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);
    $mysql5->set_charset("utf8");
}

//--------------------------------------------------------------------------------------------------------
// closeDB
//--------------------------------------------------------------------------------------------------------
function closeDB()
{
    global $mysql, $mysql2, $mysql3, $mysql4, $mysql5;

    @$mysql->close();
    @$mysql2->close();
    @$mysql3->close();
    @$mysql4->close();
    @$mysql5->close();
}

?>