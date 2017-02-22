<?php
//error_reporting(E_ALL & ~E_NOTICE);
require 'dbconnect.inc.php';
$type=$_POST['type'];
date_default_timezone_set("Asia/Kolkata");
//$type="faculty";
$day ="\"".date("D",time())."\"";
//$day="'Wed'";
$day=strtoupper($day);
$sem=$_POST['keyword'];
//$sem="'3c'";
$f_name=$_POST['keyword'];
$room_no=$_POST['keyword'];
//$slot="'1'";
$slot_temp=currentSlot();
$sem_params=array("room","name","sub");
$faulty_params=array("room","sem","sub");
$room_params=array("sem","name","sub");
$params=array();
$return_array=array();
querySelection();
function querySelection()
{
	global $day,$sem,$slot_temp,$f_name,$sem_params,$room_params,$faulty_params,$type,$room_no,$query,$params;
	$slot="\"".$slot_temp."\"";
	//$slot="'13'";
	$query_sem = "select c.slot,c.room,f.name,s.sub from classes c,faculty f,subjects s
			where c.day=".$day
		. "and s.sem=".$sem
		. "and f.fid=s.fid
		and c.mapid=s.mapid
			and c.slot=".$slot
		. "
			order by CAST(c.slot AS INTEGER),c.room";

	//echo "Query".$query_sem;
	$query_faculty_intials = "select c.slot,c.room,s.sem,s.sub from classes c,faculty f,subjects s
						where f.tag=" . $f_name
		. "and s.fid=f.fid
		and c.mapid=s.mapid
						and c.day=" . $day
		. "and c.slot=" . $slot
		. "	order by CAST(c.slot AS INTEGER)";
	$query_faculty = "select c.slot,c.room,s.sem,s.sub from classes c,faculty f,subjects s
				where
				 c.mapid=s.mapid and f.name=" . $f_name
		. "and s.fid=f.fid
				and c.day=" . $day
		. "and c.slot=" . $slot
		. "
				order by CAST(c.slot AS INTEGER)";
	$query_room = "select c.slot,s.sem,f.name,s.sub from classes c,faculty f,subjects s
			 where c.room=" . $room_no
		. "and c.day=" . $day
		. "and f.fid=s.fid
		and s.mapid=c.mapid
			 and c.slot=" . $slot
		. " order by CAST(c.slot AS INTEGER)";
	switch ($type) {
		case "sem":
			$query = $query_sem;
			$params = $sem_params;
			break;
		case "room":
			$query = $query_room;
			$params = $room_params;
			break;
		case "faculty":
			if (strlen($f_name) > 4)
				$query = $query_faculty;
			else
				$query = $query_faculty_intials;
			$params = $faulty_params;
			break;
	}
}
if(mysql_num_rows(mysql_query($query))==0 && $slot!="4" && $slot!="8" && $slot!="0")
{

	if(!strcmp($slot_temp , "1") || !strcmp($slot_temp,"2") || !strcmp($slot_temp,"3"))
	{
		$slot_temp="12";
		querySelection();
	}
	elseif(!strcmp($slot_temp,"5") || !strcmp($slot_temp,"6") || !strcmp($slot_temp,"7"))

	{
		$slot_temp="13";
		querySelection();
	}
	elseif( !strcmp($slot_temp ,"9" )|| !strcmp($slot_temp ,"10") || !strcmp($slot_temp,"11"))
	{
		$slot_temp="14";
		querySelection();
	}



}

if($query_run=mysql_query($query))
{

	$row_1["type1"] =$params[0];
	$row_1["type2"] = $params[1];
	$row_1["type3"] = $params[2];
//	$row_1["type4"] =$params[3];
	array_push($return_array,$row_1);
	while($row=mysql_fetch_array($query_run,MYSQL_ASSOC))
	{
		//$row_array[$params[0]] = slotConvert($row[$params[0]]);
		$row_array[$params[0]] = $row[$params[0]];
		$row_array[$params[1]] = $row[$params[1]];
		$row_array[$params[2]] = $row[$params[2]];
		array_push($return_array,$row_array);
	}
	$a=1;
	if($type==='sem'||$type==='room')
	{
		$t="sub";
		while($a<sizeof($return_array))
		{

			$str1=$return_array[$a][$t];
			$str2="";
			if($a+1<sizeof($return_array))
				$str2=$return_array[$a+1][$t];


			if($str1===$str2)
			{
				$fac1=$return_array[$a+1]["name"];
				$fac2=$return_array[$a]["name"];
				unset($return_array[$a+1]["name"]);
				$return_array[$a+1]["name"]=$fac1.",".$fac2;
				unset($return_array[$a]);
				$return_array=array_values($return_array);
				$a=$a-2;


			}

			$a=$a+1;
		}

	}
	echo json_encode($return_array);

}
else
	echo mysql_error();
function slotConvert($slot)
{
	$slotConversion=array();
	$slotConversion["1"]="8:00 AM-8:50 AM";
	$slotConversion["2"]="8:50 AM-9:40 AM";
	$slotConversion["3"]="9:40 AM-10:30 AM";
	$slotConversion["4"]="10:30 AM-11:00 AM";
	$slotConversion["5"]="11:00 AM-11:50 AM";
	$slotConversion["6"]="11:50 AM-12:40 PM";
	$slotConversion["7"]="12:40 AM-1:30 PM";
	$slotConversion["8"]="1:30 PM-2:15 PM";
	$slotConversion["9"]="2:15 PM-3:05 PM";
	$slotConversion["10"]="3:05 PM-3:55 PM";
	$slotConversion["11"]="3:55 PM-4:45 PM";
	$slotConversion["12"]="8:00 AM-10:30 AM";
	$slotConversion["13"]="11:00 AM-1:30 PM";
	$slotConversion["14"]="2:15 PM-4:45 PM";
	return $slotConversion[$slot];

}
function currentSlot()
{

	$timeArray= array(800,850,940, 1030, 1100, 1150, 1240, 1330, 1415, 1505, 1555);
	$slotTime=array(1,2,3,4,5,6,7,8,9,10,11);
	$hr=date("H",time());
	$min=date("i",time());
	$time=(int)$hr."".$min;
	//$time=1445;
	if($time<800||$time>1700)
		return "0";
	$i=0;
	while(!($time<$timeArray[$i]) && $i<10 ) {
		$i++;
	}

	if($i!=0)
		$i=$i-1;

	return $slotTime[$i];
	//return slotTime[i];
}
?>
