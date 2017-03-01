
<?php
require 'dbconnect.inc.php';
error_reporting(E_ALL & ~E_NOTICE);
$type=$_POST['type'];
$day=$_POST['day'];
$sem=$_POST['keyword'];
$f_name=$_POST['keyword'];
$room_no=$_POST['keyword'];
$sem_params=array("Slot","Room","Name","Sub");
$faulty_params=array("Slot","Room","Sem","Sub");
$room_params=array("Slot","Sem","Name","Sub");
$params=array();
$return_array=array();
$query_sem="select c.slot,c.room,f.name,s.sub from classes c,faculty f,subjects s 
			where c.day=".$day
			."and s.sem=".$sem
			."and f.fid=s.fid 
			and c.mapid=s.mapid 
			order by c.slot,c.room";
//echo "in query sem schedule".$query_sem;
$query_faculty_intials="select c.slot,c.room,s.sem,s.sub from classes c,faculty f,subjects s
						where f.tag=".$f_name
						."and s.fid=f.fid 
						and c.day=".$day						
						."and c.mapid=s.mapid 
						order by c.slot";
$query_faculty="select c.slot,c.room,s.sem,s.sub from classes c,faculty f,subjects s 
				where f.name=".$f_name
				."and s.fid=f.fid 
				and c.day=".$day				
				."and c.mapid=s.mapid 
				order by c.slot";
$query_room="select c.slot,s.sem,f.name,s.sub from classes c,faculty f,subjects s 
			 where c.room=".$room_no
			 ."and c.day=".$day 
			 ."and f.fid=s.fid 
			 and s.mapid=c.mapid 
			 order by c.slot";
switch($type)
{
case "sem":
	 $query=$query_sem;
	 $params=$sem_params;
	 break;
case "room":
	  $query=$query_room;
	  $params=$room_params;
	  break;
case "faculty":
	  if(strlen($f_name)>4)
		  $query=$query_faculty;
	  else
		  $query=$query_faculty_intials;
	  $params=$faulty_params;
	  break;
}
if($query_run=mysql_query($query))
{
	$slot_temp=array();
	$row_1["type1"] =$params[0];
	$row_1["type2"] = $params[1];
	$row_1["type3"] = $params[2];
	$row_1["type4"] =$params[3];
	array_push($return_array,$row_1);
	
	//echo "Sucessful query";
	while($row=mysql_fetch_array($query_run,MYSQL_ASSOC))
	{
			$slot_temp[]=$row[strtolower($params[0])];
			$row_array[$params[0]] = slotConvert($row[strtolower($params[0])]);
			$row_array[$params[1]] = $row[strtolower($params[1])];
			$row_array[$params[2]] = $row[strtolower($params[2])];
			$row_array[$params[3]] = $row[strtolower($params[3])];
			array_push($return_array,$row_array);
	}
}

else 
	echo mysql_error();
		$a=1;

if($type==='sem'||$type==='room')
{
	if($type==='sem')
		$t='room';
	else
		$t='sem';
	//$return_array_adjusted=
	while($a<sizeof($return_array))
	{
		if($slot_temp[$a]>11)
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
				//print_r($return_array);
				//echo $a;
				$a=$a-2;
				
			
			}
		}
		$a=$a+1;
	}
	
	
	}
	echo json_encode($return_array);
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

?>