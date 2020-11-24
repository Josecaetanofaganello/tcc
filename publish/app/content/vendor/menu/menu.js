﻿/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    if (localStorage.getItem('token') != '') {
        document.getElementById("mySidenav").style.width = "300px";
        document.getElementById("main").style.marginLeft = "300px";
        document.getElementById("mySidenav").style.visibility = "visible";
    }
    else
    {
        document.getElementById("mySidenav").style.visibility = "hidden";
        document.getElementById("mySidenav").style.width = "0";
    }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    //document.getElementById("mainnave").style.marginLeft = "0";
    //document.getElementById("closemenu").style.width = "0";
    //document.getElementById("closemenu").style.marginLeft = "0";
}

function showMenu() {

    if (!localStorage.getItem('token')) {
        document.getElementById("mySidenav").style.visibility = "hidden";
        document.getElementById("mySidenav").style.width = "300px";
    } else {
        document.getElementById("mySidenav").style.visibility = "visible";
    }
}

function hidenMenu() {
    document.getElementById("mySidenav").style.visibility = "hidden";
    closeNav();
    document.getElementById("main").style.marginLeft = "300px";
}

function checkUser() {
    if (localStorage.getItem('tipo') == 'Morador') {

        toggleFormElements(true);
           // document.getElementById("addItem").style.visibility = "hidden";
           // for (let el of document.querySelectorAll('.btn-group')) el.style.visibility = 'hidden';
        
     

    } else {

        toggleFormElements(false);
        for (let el of document.querySelectorAll('.btn-group')) el.style.visibility = 'visible';
        
    }



}


function toggleFormElements(bDisabled) {
    //var inputs = document.getElementsByTagName("input");
    //for (var i = 0; i < inputs.length; i++) {
    //    inputs[i].disabled = bDisabled;
    //}

    var calendars = document.getElementsByClassName("calendario");
    for (var i = 0; i < calendars.length; i++) {
        calendars[i].disabled = bDisabled;
    }

    var selects = document.getElementsByTagName("select");
    for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = bDisabled;
    }
    var textareas = document.getElementsByClassName("textareaAssembleia");
    for (var i = 0; i < textareas.length; i++) {
        textareas[i].disabled = bDisabled;
    }
    var buttons = document.getElementsByClassName("btn-group");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].hidden = bDisabled;
    }

    var divareas = document.getElementsByClassName("input-group");
    for (var i = 0; i < divareas.length; i++) {
        divareas[i].hidden = bDisabled;
    }
}