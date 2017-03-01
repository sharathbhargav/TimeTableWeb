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
    //document.getElementById(currentDisplay).style.display='none';
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
    var mainDivSchedule=document.getElementById('mainDivSchedule');
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
   // data['slot']=slotConvert(data['slot']);

    for(var i=0;i<Object.keys(globalHead).length;i++)
    values[i].innerHTML=data[globalHead['type'+(i+1)]];

    for(var i=0;i<Object.keys(globalHead).length;i++)
    {
        values[i].style.padding='0%';
        values[i].style.margin='0%';
        values[i].style.fontSize='large';
        totalDiv2.appendChild(values[i]);
    }




    var colors=["#29B6F6","#B3E5FC",'black'];

    console.log("Number=",Math.random()+"  "+random%2?0:1);
    totalDiv1.style.backgroundColor=colors[random%2?0:1];
    totalDiv1.style.color=colors[2];
    totalDiv2.style.backgroundColor=colors[random%2?1:0];
    totalDiv2.style.color=colors[2];
    random=random+1;

    col1.appendChild(totalDiv1);
    col2.appendChild(totalDiv2);

}



function displayCurrent(data,globalHead)
{
    var col1=document.getElementById('displayCurrentCol1');
    var col2=document.getElementById('displayCurrentCol2');

    var totalDiv1=document.createElement('div');
    var totalDiv2=document.createElement('div');
    var heads=[document.createElement('p'),document.createElement('p'),document.createElement('p')];
    var values=[document.createElement('p'),document.createElement('p'),document.createElement('p')];
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
  //  data['slot']=slotConvert(data['slot']);

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

    $("#displaySchedule").niceScroll({cursorcolor:"#19F"});

    var name=[],init=[],sem=[],room=[];
    var jData;
    $.ajax({
        type: 'GET',
        url: 'queris_autoComplete.php',
        async:false,

        success: function (response) {

           jData=JSON.parse(response);
            //console.log("Jdata",response);
           console.log("Room length",jData['names']);
    name=jData['names'];
            room=jData['room'];
            sem=jData['sem'];
            init=jData['tag'];
            console.log("Len",name[12]);
            for(var i=0;i<room.length;i++)
            {
               // console.log("Room",name[i]);
                addItem(room[i], i, '.RoomSchedulePicker');
                 addItem(room[i], i, '.RoomCurrentPicker');
            }
            for(var i=0;i<sem.length;i++)
            {
                addItem(sem[i], i, '.SemCurrentPicker');
                addItem(sem[i], i, '.SemSchedulePicker');
            }

            console.log("Name",name[8]);

        //    typeAhead.data('typeahead').source = jData['names'];

         //   typeAhead.on('typeahead: selected typeahead: autocompleted', function(e, datum) {
         //       console.log('event');
//
         //   });
         //   var asdf=name.toArray();
            $('#currentSearchBox').typeahead({source: name.concat(init)});
            $('#scheduleSearchBox').typeahead({source: name.concat(init)});
       //     var myTypeahead =document.getElementById('currentSearchBox');
       //     myTypeahead.typeahead({
       //         source:name
       //     });
          //  var typeaheadObj = myTypeahead.data('typeahead');
            //if(typeaheadObj) typeaheadObj.source = name;


        //   var $myTypeahead1 = $('#scheduleSearchBox');
        //   var typeaheadObj1 = $myTypeahead1.data('typeahead');
        //   if(typeaheadObj1) typeaheadObj1.source =asdf;
//

           // });
//
        }});

   // $('.SemCurrentPicker').selectpicker('refresh');
   // $('.SemSchedulePicker').selectpicker('refresh');
   // $('.RoomSchedulePicker').selectpicker('refresh');
   // $('.RoomCurrentPicker').selectpicker('refresh');


}



function addItem(name,val,picker) {
    //$('.selectpicker').selectpicker();
    $(picker).append('<option val="'+val+'">'+name+'</option>');
    $(picker).css('display','inline');
  //  $(picker).selectpicker('refresh');
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




function getData(phpAddress,keword,day,type)
{

    displayNothing("Currently break time");
   // else {
        $.ajax({
            type: 'POST',
            url: phpAddress,
            data: {keyword: keword, day: day, type: type},
            //  dataType:'json',
            success: function (response) {
                console.log("response", response);
                var jdata = JSON.parse(response);
                if (!response && slot != null) {
                    if (slot == "'1'" || slot == "'2'" || slot == "'3'")
                        getData(phpAddress, keword, "'12'", day, type);
                    else if (slot == "'5'" || slot == "'6'" || slot == "'7'")
                        getData(phpAddress, keword, "'13'", day, type);
                    else if (slot == "'9'" || slot == "'10'" || slot == "'11'")
                        getData(phpAddress, keword, "'14'", day, type);
                }
                display(jdata);
            }
        });
   // }
}


function display(data)
{



    console.log("Data len",Object.keys(data[0]).length);
    if(Object.keys(data[0]).length==4) {
        document.getElementById('displaySchedule').style.display='block';
        clearDisplaySchedule();
        for (var i = 1; i < data.length; i++)
            displaySchedule(data[i], data[0]);
    }
    else if(Object.keys(data[0]).length==3)
    {
        document.getElementById('currentDisplay').style.display='block';
        clearDisplayCurrent();
        for (var i = 1; i < data.length; i++)
            displayCurrent(data[i], data[0]);
    }
}


function clearDisplaySchedule()
{
    var div=document.getElementById('displayScheduleCol1');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
    div=document.getElementById('displayScheduleCol2');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }

}

function clearDisplayCurrent()
{
    var div=document.getElementById('displayCurrentCol1');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
    div=document.getElementById('displayCurrentCol2');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }

}

function displayNothing(str)
{

}


function currentSearchButton(keyword)
{
	getData('queries_current.php',"'"+keyword+"'",null,"faculty");
    console.log("Search current "+keyword);
}


function currentRoomButton(keyword)
{
    getData('queries_current.php',"'"+keyword+"'",null,"room");
    console.log("Room current "+keyword);
}

function currentSemButton(keyword)
{
    getData('queries_current.php',"'"+keyword+"'",null,"sem");
    console.log("Sem current "+"'"+keyword+"'");
}


function scheduleSearchButton(keyword)
{
    console.log("search schedule "+keyword);
    var day=document.getElementById('daySchedulePicker').value;
    console.log("Day=",day);
    day=day.substring(0,3);
    day.toLowerCase();
    getData('queries_schedule.php',"'"+keyword+"'","'"+day+"'","faculty");
}


function scheduleRoomButton(keyword)
{
    var day=document.getElementById('daySchedulePicker').value;

    day=day.substring(0,3);
    day.toLowerCase();
    console.log("Day=12",day+"   "+keyword);
    getData('queries_schedule.php',"'"+keyword+"'","'"+day+"'","room");
    console.log("Schedule room "+keyword);
}


function scheduleSemButton(keyword)
{
    var sem=document.getElementById('scheduleSemPicker').value;
    var day=document.getElementById('daySchedulePicker').value;
    console.log("Day=",day);
    day=day.substring(0,3);
    day.toLowerCase();
    getData('queries_schedule.php',"'"+sem+"'","'"+day+"'","sem");
    console.log("schedule sem "+keyword);

}


