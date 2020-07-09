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
    indexToday = csvResult.findIndex(x => x.date == date);

    timesToday = [ toMinutes(csvResult[indexToday].fajar), toMinutes(csvResult[indexToday].zohar), toMinutes(csvResult[indexToday].asr), toMinutes(csvResult[indexToday].maghrib), toMinutes(csvResult[indexToday].esha), toMinutes(csvResult[indexToday].jummah) ];
    updateTable();
}

function minutesNow() {
    return today.getHours() * 60 + today.getMinutes();
}

function toMinutes(Time) {
    return parseInt(Time.split(':')[0]) * 60 + parseInt(Time.split(':')[1]);
}

function timeToNext(index) {
    var hoursNext = Math.floor((timesToday[index] - minutesNow()) / 60);
    var minutesNext = timesToday[index] - minutesNow() - hoursNext * 60;
    return hoursNext + " hour(s) and " + minutesNext + " minute(s).";
}

function setColour() {    
	if(minutesNow() >= timesToday[0] - 10 && minutesNow() < timesToday[0] + 10) {
        $('#col1').addClass("highlight");
    }
	else {
        $('#col1').removeClass("highlight");
	}
	
	if(minutesNow() >= timesToday[1] - 10 && minutesNow() < timesToday[1] + 10) {
        $('#sun').addClass("highlight");
    }
	else {
        $('#sun').removeClass("highlight");
	}
	
	if(minutesNow() >= timesToday[2] - 10 && minutesNow() < timesToday[2] + 10) {
        $('#col2').addClass("highlight");
    }
	else {
        $('#col2').removeClass("highlight");
	}
	
	if(minutesNow() >= timesToday[3] - 10 && minutesNow() < timesToday[3] + 10) {
        $('#col3').addClass("highlight");
    }
	else {
        $('#col3').removeClass("highlight");
	}
	
	if(minutesNow() >= timesToday[4] - 10 && minutesNow() < timesToday[4] + 10) {
        $('#col4').addClass("highlight");
    }
	else {
        $('#col4').removeClass("highlight");
	}
	
	if(minutesNow() >= timesToday[5] - 10 && minutesNow() < timesToday[5] + 10) {
        $('#col5').addClass("highlight");
    }
	else {
        $('#col5').removeClass("highlight");
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
    $('#1').text(csvResult[indexToday].fajar);
    $('#suntime').text(csvResult[indexToday].zohar);
    $('#2').text(csvResult[indexToday].asr);
    $('#3').text(csvResult[indexToday].maghrib);
    $('#4').text(csvResult[indexToday].esha);
    $('#5').text(csvResult[indexToday].jummah);
}

function updateDate() {
    var displayMonth = '' + (today.getMonth() + 1);
    if (displayMonth.length < 2)
        displayMonth = '0' + displayMonth;

    var displayDay = '' + today.getDate();
    if (displayDay.length < 2)
        displayDay = '0' + displayDay;

    return [displayDay, displayMonth, today.getFullYear()].join('/');
}

function updateTime() {
    var hours = today.getHours();

    var minutes = today.getMinutes().toString().length == 1 ? '0'+ today.getMinutes() : today.getMinutes();

    return hours + ':' + minutes
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
            csvResult = $.csv.toObjects(reader.result);
            csvDone();
            daily();
        };
        reader.readAsBinaryString(fileInput.files[0]);
    };

    fileInput.addEventListener('change', readFile);
});

