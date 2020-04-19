var today = new Date();
var day = today.getDate();
var lastday = day;

function updateDate() {
    var displayMonth = '' + (today.getMonth() + 1);
    if (displayMonth.length < 2)
        displayMonth = '0' + displayMonth;

    var displayDay = '' + today.getDate();
    if (displayDay.length < 2)
        displayDay = '0' + displayDay;

    return [today.getFullYear(), displayMonth, displayDay].join('-');
}

function updateTime() {
    return today.getHours() + ':' + today.getMinutes();
}

var date = updateDate();
var time = updateTime();

setInterval(checkTime, 1000);

function printDate() {
    $('#date').text("Today's date is: " + date);
    $('#time').text(time);
}

$(document).ready(function() {
    printDate();
});

function checkDate() {
    today = new Date();
}

function checkTime() {
    today = new Date();
    time = updateTime();
    date = updateDate();
    printDate();

    day = today.getDate();
    console.log("checking date: " + today);

    if(day != lastday) {
        lastday = day;
        console.log("changing date");
    }
}

