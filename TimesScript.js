var today = new Date();
var day = today.getDate();
var lastday = day;

var indexToday;
var csvResult;

function daily() {
    indexToday = csvResult[0].indexOf(date);
    updateTable();
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

setInterval(checkTime, 1000);

function printDate() {
    $('#date').text("Today's date is: " + date);
    $('#time').text(time);
}

function checkTime() {
    today = new Date();
    time = updateTime();
    date = updateDate();
    printDate();

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
            daily();
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0]);
    };

    fileInput.addEventListener('change', readFile);
});

