/**
 * Created by SharathBhargav on 01-02-2017.
 */
var mainFragment,scheduleFragment;
var random=0;
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



function currentSearchButtonClick()
{
    console.log("current search button clicked");
    document.getElementById('currentDisplay').style.display='block';
    //display();
}


function scheduleSearchButtonClick(keyword)
{
    document.getElementById('displaySchedule').style.display='block';
    displaySchedule();
}

function displaySchedule()
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


    values[0].innerHTML='Baaka';
    values[1].innerHTML='5c';
    values[2].innerHTML='Database application laboratory';
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