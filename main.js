function currentDay() {
	const date = new Date();
	var day
	var month
	var year
	day = date.getDate();
	month = date.getMonth();
	month += 1
	year = date.getFullYear();
	window.alert(month + "/" + day + "/" + year);
	dy = JSON.stringify(day)
	window.alert(dy+1)
}
currentDay();
