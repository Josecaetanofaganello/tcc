﻿/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("mainnave").style.marginLeft = "0";
    //document.getElementById("closemenu").style.width = "0";
    //document.getElementById("closemenu").style.marginLeft = "0";
}

function showMenu(){
    document.getElementById("mySidenav").style.visibility = "visible";

}

function hidenMenu() {
    document.getElementById("mySidenav").style.visibility = "hidden";

}