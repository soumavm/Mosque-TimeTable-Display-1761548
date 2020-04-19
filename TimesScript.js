var today = new Date();
var day = today.getDate();
var lastday = day;
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+day;
setInterval(checkDate, 60000);

function printDate() {
    $('#date').text("Today's date is: " + date);
}

$(document).ready(function() {
    printDate();
});

function checkDate() {
    today = new Date();
    day = today.getDate();
    console.log("checking date: today");

    if(day != lastday) {
        date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+day;
        lastday = day;
        printDate();
        console.log("changing date");
    }
}

