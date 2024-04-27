function started() {
        var olddate = localStorage.getItem("thing");
        const date = new Date();
        const lastlogin = new Date(olddate)
	currentYear = date.getFullYear();
	currentMonth = date.getMonth();
	currentDay = date.getDate();
	pastYear = lastlogin.getFullYear();
	pastMonth = lastlogin.getMonth();
	pastDay = lastlogin.getDate();
	console.log(currentYear + " " + currentMonth + " " + currentDay + " " + pastYear + " " + pastMonth + " " + pastDay + " ")
        if(date >= lastlogin) {
		window.alert("welcome");
		console.log(date + " " + lastlogin + " ")
		if (currentYear > pastYear) {
                if (currentDay !== 1) {
                        daySkip();
                }
        } else if (currentMonth > pastMonth) {
                if (currentDay !== 1) {
                daySkip();
                }
        } else if (currentDay > pastDay) {
                if (currentDay - 1 !== pastDay) {
                daySkip();
   		}
        } else if (currentDay == pastDay) {
		window.alert("You already did your cards today, idiot");
	}
        }else{
                console.log("your time settings are wrong");
        }
        localStorage.setItem("thing", date);
}
function daySkip() {
	window.alert("You skipped practice :(")
}
started();
