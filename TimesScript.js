var today = new Date();
var day = today.getDate();
var lastday = day;
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+day;
setInterval(checkDate, 60000);

$(document).ready(function() {
    $('#date').text(date);
});

function checkDate() {
    today = new Date();
    day = today.getDate() + 1;
    console.log("checking date: today");

    if(day != lastday) {
        date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+day;
        lastday = day;
        $('#date').text(date);
        console.log("changing date");
    }
}

