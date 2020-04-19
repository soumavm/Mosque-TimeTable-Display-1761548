var today = new Date();
var day = today.getDate();
var lastday = day;

var indexToday;
var timesToday;
var csvResult;

function csvDone() {
    setInterval(checkTime, 1000);
}

function daily() {
    indexToday = csvResult[0].indexOf(date);
    timesToday = [ toMinutes(csvResult[1][indexToday]), toMinutes(csvResult[2][indexToday]), toMinutes(csvResult[3][indexToday]), toMinutes(csvResult[4][indexToday]), toMinutes(csvResult[5][indexToday]) ];
    updateTable();
}

function minutesNow() {
    return today.getHours() * 60 + today.getMinutes();
}

function toMinutes(Time) {
    return parseInt(Time.split(':')[0]) * 60 + parseInt(Time.split(':')[1]);
}

function setColour() {
    if(minutesNow() < timesToday[0]) {
        $('#col1').addClass("highlight");
        $('#col5').removeClass("highlight");
    }
    else if(minutesNow() < timesToday[1]) {
        $('#col2').addClass("highlight");
        $('#col1').removeClass("highlight");
    }
    else if(minutesNow() < timesToday[2]) {
        $('#col3').addClass("highlight");
        $('#col2').removeClass("highlight");
    }
    else if(minutesNow() < timesToday[3]) {
        $('#col4').addClass("highlight");
        $('#col3').removeClass("highlight");
    }
    else if(minutesNow() < timesToday[4]) {
        $('#col5').addClass("highlight");
        $('#col4').removeClass("highlight");
    }
}

function csvTimeParser(Time) {
    var hours = parseInt(Time.split(':')[0]);
    var minutes = Time.split(':')[1];
    var ampm = hours >= 12? 'pm' : 'am';

    if(hours == 0) hours = 12;
    else if(hours > 12) hours -= 12;

    return hours + ':' + minutes + ' ' + ampm;
}

function updateTable() {
    $('#1').text(csvTimeParser(csvResult[1][indexToday]));
    $('#2').text(csvTimeParser(csvResult[2][indexToday]));
    $('#3').text(csvTimeParser(csvResult[3][indexToday]));
    $('#4').text(csvTimeParser(csvResult[4][indexToday]));
    $('#5').text(csvTimeParser(csvResult[5][indexToday]));
}

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
    var hours = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
    if (hours == 0) hours = 12;
    else if (hours > 12) hours -= 12;

    var minutes = today.getMinutes().toString().length == 1 ? '0'+ today.getMinutes() : today.getMinutes();
    var ampm = today.getHours() >= 12 ? 'pm' : 'am';

    return hours + ':' + minutes + ' ' + ampm;
}

var date = updateDate();
var time = updateTime();

function printDate() {
    $('#date').text("Today's date is: " + date);
    $('#time').text(time);
}

function checkTime() {
    today = new Date();
    time = updateTime();
    date = updateDate();
    printDate();

    setColour();

    day = today.getDate();
    if(day != lastday) {
        lastday = day;
        console.log("changing date");
        daily();
    }
}

$(document).ready(function() {
    printDate();

    var fileInput = document.getElementById("csv");

    readFile = function () {
        $('#csv').prop('hidden',true);
        var reader = new FileReader();
        reader.onload = function () {
            csvResult = $.csv.toArrays(reader.result);
            csvDone();
            daily();
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0]);
    };

    fileInput.addEventListener('change', readFile);
});

