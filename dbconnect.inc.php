<?php
 $error="Could not connect.";
$db_user='root';
$db_pass='';
$db_host='localhost';
$db_name='new2016o';
//mysql_connect("localhost",$db_user,$db_pass);
if(!@mysql_connect($db_host,$db_user,$db_pass)||!@mysql_select_db($db_name))
{
	die($error);
}
?>