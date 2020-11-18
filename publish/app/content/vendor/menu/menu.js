/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    if (localStorage.getItem('token') != '') {
        document.getElementById("mySidenav").style.width = "300px";
        document.getElementById("main").style.marginLeft = "300px";
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

}