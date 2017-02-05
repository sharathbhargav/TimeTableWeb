/**
 * Created by SharathBhargav on 01-02-2017.
 */
var mainFragment,scheduleFragment;
var random=0;

window.onload=addValueToSpinner();
function changeNavCurrent()
{
   mainFragment =document.getElementById('mainFragment');
    var scheduleNav=document.getElementById('scheduleNav');
    var currentNav=document.getElementById('currentNav');
    scheduleFragment=document.getElementById('scheduleFragment');
    scheduleNav.className='inactive';
    currentNav.className='active';
    console.log("In change curr",mainFragment);
    mainFragment.style.display='block';
    scheduleFragment.style.display='none';
    document.getElementById('displaySchedule').style.display='none';
}

function changeNavSchedule()
{
     mainFragment=document.getElementById('mainFragment');
    var scheduleNav=document.getElementById('scheduleNav');
    var currentNav=document.getElementById('currentNav');
    scheduleFragment=document.getElementById('scheduleFragment');
    scheduleFragment.style.display='block';
    scheduleNav.className='active';
    currentNav.className='inactive';
    console.log("In change sche",mainFragment);
    mainFragment.style.display='none';
    document.getElementById('currentDisplay').style.display='none';
}






function displaySchedule(data,globalHead)
{
    var col1=document.getElementById('displayScheduleCol1');
    var col2=document.getElementById('displayScheduleCol2');

    var totalDiv1=document.createElement('div');
    var totalDiv2=document.createElement('div');
    var heads=[document.createElement('p'),document.createElement('p'),document.createElement('p'),document.createElement('p')];
    var values=[document.createElement('p'),document.createElement('p'),document.createElement('p'),document.createElement('p')];
    console.log("Head len",Object.keys(globalHead).length);
    for(var i=0;i<Object.keys(globalHead).length;i++) {
        heads[i].innerHTML = globalHead['type'+(i+1)];

    }
    for(var i=0;i<Object.keys(globalHead).length;i++)
    {
        heads[i].style.padding='0%';
        heads[i].style.margin='0%';
        heads[i].style.fontSize='large';
        totalDiv1.appendChild(heads[i]);
    }

	console.log("Sem=",globalHead['type1']);
    data['slot']=slotConvert(data['slot']);

    for(var i=0;i<Object.keys(globalHead).length;i++)
    values[i].innerHTML=data[globalHead['type'+(i+1)]];

    for(var i=0;i<Object.keys(globalHead).length;i++)
    {
        values[i].style.padding='0%';
        values[i].style.margin='0%';
        values[i].style.fontSize='large';
        totalDiv2.appendChild(values[i]);
    }




    var colors=['orange','white','black'];

    console.log("Number=",Math.random()+"  "+random%2?0:1);
    totalDiv1.style.backgroundColor=colors[random%2?0:1];
    totalDiv1.style.color=colors[2];
    totalDiv2.style.backgroundColor=colors[random%2?1:0];
    totalDiv2.style.color=colors[2];
    random=random+1;

    col1.appendChild(totalDiv1);
    col2.appendChild(totalDiv2);

}


function addValueToSpinner()
{
    for(var i=0;i<10;i++)
    {
        addItem("Room current "+i,i,'.RoomSchedulePicker');
       // addItem("Sem current "+i,i,'.SemSchedulePicker');
        addItem("Room schedule "+i,i,'.RoomCurrentPicker');
        addItem("Sem schedule "+i,i,'.SemCurrentPicker');
    }
    addItem("3c",i,'.SemSchedulePicker');
    addItem("5c",i,'.SemSchedulePicker');
}


function addItem(name,val,picker) {
    //$('.selectpicker').selectpicker();
    $(picker).append('<option val="'+val+'">'+name+'</option>');
   // $(picker).selectpicker('refresh');
  //  $('.SemSchedulePicker').selectpicker('val', name);
}


function radioChange()
{
    console.log("Entering radio cange");
    if(document.getElementById('facultyRadio').checked) {
        console.log("Faculty set");
        document.getElementById('searchBar1').style.display='block';
        document.getElementById('RoomCurrentPicker').style.display='none';
        document.getElementById('SemCurrentPicker').style.display='none';
        document.getElementById('searchBarSchedule').style.display='block';
        document.getElementById('RoomSchedulePicker').style.display='none';
        document.getElementById('SemSchedulePicker').style.display='none';
    }
   else if(document.getElementById('semRadio').checked) {
        console.log("Sem set");
        document.getElementById('searchBar1').style.display='none';
        document.getElementById('RoomCurrentPicker').style.display='none';
        document.getElementById('SemCurrentPicker').style.display='block';
        document.getElementById('searchBarSchedule').style.display='none';
        document.getElementById('RoomSchedulePicker').style.display='none';
        document.getElementById('SemSchedulePicker').style.display='block';
    }
    else if(document.getElementById('roomRadio').checked) {
        console.log("room set");
        document.getElementById('searchBar1').style.display='none';
        document.getElementById('RoomCurrentPicker').style.display='block';
        document.getElementById('SemCurrentPicker').style.display='none';
        document.getElementById('searchBarSchedule').style.display='none';
        document.getElementById('RoomSchedulePicker').style.display='block';
        document.getElementById('SemSchedulePicker').style.display='none';
    }
}




function getData(phpAddress,keword,slot,day,type)
{
    if(slot=="'4'" || slot=="'8'")
    displayNothing("Currently break time");
    else {
        $.ajax({
            type: 'POST',
            url: phpAddress,
            data: {keyword: keword, slot: slot, day: day, type: type},
            //  dataType:'json',
            success: function (response) {
                console.log("response", response);
                var jdata = JSON.parse(response);
                if (!response && slot != null) {
                    if (slot == "'1'" || slot == "'2'" || slot == "'3'")
                        getData(phpAddress, keword, "'12", day, type);
                    else if (slot == "'5'" || slot == "'6'" || slot == "'7'")
                        getData(phpAddress, keword, "'13", day, type);
                    else if (slot == "'9'" || slot == "'10'" || slot == "'11'")
                        getData(phpAddress, keword, "'14", day, type);
                }
                display(jdata);
            }
        });
    }
}


function display(data)
{
    var div=document.getElementById('displayScheduleCol1');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
     div=document.getElementById('displayScheduleCol2');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }

    document.getElementById('displaySchedule').style.display='block';


    for(var i=1;i<data.length;i++)
    displaySchedule(data[i],data[0]);
}

function displayNothing(str)
{

}


function currentSearchButton(keyword)
{
	getData('queries_current.php',"'5c'","'1'","'FRI'","sem");
    console.log("Search current "+keyword);
}


function currentRoomButton(keyword)
{
    console.log("Room current "+keyword);
}

function currentSemButton(keyword)
{
    console.log("Sem current "+keyword);
}


function scheduleSearchButton(keyword)
{
    console.log("search schedule "+keyword);
    getData('queries_schedule.php',"'Y SHOBHA'",null,"'fri'","faculty");
}


function scheduleRoomButton(keyword)
{
    getData('queries_schedule.php',"'512'",null,"'fri'","room");
    console.log("Schedule room "+keyword);
}


function scheduleSemButton(keyword)
{
    var sem=document.getElementById('scheduleSemPicker').value;
    var day=document.getElementById('daySchedulePicker').value;
    console.log("Day=",day);
    day=day.substring(0,3);
    day.toLowerCase();
    getData('queries_schedule.php',"'"+sem+"'",null,"'"+day+"'","sem");
    console.log("schedule sem "+keyword);
    currentSlot();
}

function slotConvert(slot)
{
    var slotConversion=[];
    slotConversion["1"]="8:00 AM-8:50 AM";
    slotConversion["2"]="8:50 AM-9:40 AM";
    slotConversion["3"]="9:40 AM-10:30 AM";
    slotConversion["4"]="10:30 AM-11:00 AM";
    slotConversion["5"]="11:00 AM-11:50 AM";
    slotConversion["6"]="11:50 AM-12:40 PM";
    slotConversion["7"]="12:40 AM-1:30 PM";
    slotConversion["8"]="1:30 PM-2:15 PM";
    slotConversion["9"]="2:15 PM-3:05 PM";
    slotConversion["10"]="3:05 PM-3:55 PM";
    slotConversion["11"]="3:55 PM-4:45 PM";
    slotConversion["12"]="8:00 AM-10:30 AM";
    slotConversion["13"]="11:00 AM-1:30 PM";
    slotConversion["14"]="2:15 PM-4:45 PM";
    return slotConversion[slot];
    
}

function currentSlot()
{
    var date=new Date();
    timeArray= [800, 850, 940, 1030, 1100, 1150, 1240, 1330, 1415, 1505, 1555];
    slotTime=[1,2,3,4,5,6,7,8,9,10,11];
    var hr=date.getHours();
    var min=date.getMinutes();

    var time=hr+""+min;
    console.log("time=",time);
    var i=0;
    while(!(time<timeArray[i]) && i<10 ) {
        i++;
    }
  //  if(i!=0)
  //  i--;
    console.log(hr+"    "+min+"   "+slotTime[i]);
    return slotTime[i];
}
