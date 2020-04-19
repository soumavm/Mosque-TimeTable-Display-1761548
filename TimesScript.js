setInterval(checkDate, 60000);
var today = Date();
var day = today.getDate();
var lastday = day;
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+day;

function checkDate() {
    today = new Date();
    day = today.getDate();

    if(day != lastday) {
        date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+day;
        lastday = day;
    }
  }
}

