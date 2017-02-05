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






function displaySchedule(data)
{
    var col1=document.getElementById('displayScheduleCol1');
    var col2=document.getElementById('displayScheduleCol2');

    var totalDiv1=document.createElement('div');
    var totalDiv2=document.createElement('div');
    var heads=[document.createElement('p'),document.createElement('p'),document.createElement('p')];
    var values=[document.createElement('p'),document.createElement('p'),document.createElement('p')];


    heads[0].innerHTML='Name';
    heads[1].innerHTML='Sem';
    heads[2].innerHTML='Room';
    for(var i=0;i<3;i++)
    {
        heads[i].style.padding='0%';
        heads[i].style.margin='0%';
        heads[i].style.fontSize='large';
        totalDiv1.appendChild(heads[i]);
    }

	console.log("Sem=");
    values[0].innerHTML=data['name'];
    values[1].innerHTML=data['sem'];
    values[2].innerHTML=data['sub'];
    for(var i=0;i<3;i++)
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
        addItem("Sem current "+i,i,'.SemSchedulePicker');
        addItem("Room schedule "+i,i,'.RoomCurrentPicker');
        addItem("Sem schedule "+i,i,'.SemCurrentPicker');
    }
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
    $.ajax({
        type: 'POST',
        url: phpAddress,
        data: { keyword: keword, slot: slot, day:day, type:type },
      //  dataType:'json',
        success: function(response) {
            console.log("response",response);
            var jdata = JSON.parse(response);
            console.log("After parse",jdata[0]['name']);
            display(jdata);
        }
    });
}


function display(data)
{
    document.getElementById('displaySchedule').style.display='block';
   // console.log("Data=",data);
    for(var i=0;i<data.length;i++)
    displaySchedule(data[i]);
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
}


function scheduleRoomButton(keyword)
{
    console.log("Schedule room "+keyword);
}


function scheduleSemButton(keyword)
{
    getData('queries_schedule.php',"'5c'",null,"'TUE'","sem");
    console.log("schedule sem "+keyword);
}