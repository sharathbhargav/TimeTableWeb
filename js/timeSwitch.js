/**
 * Created by SharathBhargav on 22-01-2017.
 */
function radioOnClick()
{

    var current,custom;
    var
    current=document.getElementById("currentRadio");
    custom=document.getElementById("customRadio");
    console.log("Radio",current.value);
    if(current.checked) {
        //alert("current");

    }
    if(custom.checked)
    {
        //alert("Useless");
    }
}
