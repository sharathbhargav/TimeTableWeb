<?php
require 'dbconnect.inc.php';
error_reporting(E_ALL & ~E_NOTICE);
$query_name="select distinct name from faculty";
$query_tag="select distinct tag from faculty";
$query_sem="select distinct sem from subjects";
$query_room="select distinct room from classes";
$return_array=array();
if($query_run=mysql_query($query_name))
{
	while($query_row=mysql_fetch_assoc($query_run))
	{
			$name_list[]=$query_row['name'];
			
	}
	$return_array["names"]=array_values($name_list);
	//echo json_encode($return_array);
	//array_push($return_array,$name_list);
}

else 
	echo mysql_error();
if($query_run=mysql_query($query_tag))
{
	while($query_row=mysql_fetch_assoc($query_run))
	{
			$tag_list[]=$query_row['tag'];
			
	}
	$return_array["tag"]=array_values($tag_list);

}

else 
	echo mysql_error();
if($query_run=mysql_query($query_sem))
{
	while($query_row=mysql_fetch_assoc($query_run))
	{
			$sem_list[]=$query_row['sem'];
			
	}
	$return_array["sem"]=array_values($sem_list);

}

else 
	echo mysql_error();
if($query_run=mysql_query($query_room))
{
	while($query_row=mysql_fetch_assoc($query_run))
	{
			$room_list[]=$query_row['room'];
			
	}
	$return_array["room"]=array_values($room_list);
	echo json_encode($return_array);
}

else 
	echo mysql_error();



?>