<?php
 $error="Could not connect.";
$db_user='sql6160350';
$db_pass='vSdfBP6Li2';
$db_host='sql6.freesqldatabase.com:3306';
$db_name='sql6160350';
//mysql_connect("localhost",$db_user,$db_pass);
if(!@mysql_connect($db_host,$db_user,$db_pass)||!@mysql_select_db($db_name))
{
	die($error);
}
?>