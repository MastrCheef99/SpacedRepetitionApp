function currentDay() {
        var olddate = localStorage.getItem("thing")
        const date = new Date();
        const lastlogin = new Date(olddate)
        if(date >= lastlogin) {
                console.log("welcome");
        }else{
                console.log("whomp whomp");
                console.log(lastlogin);
                console.log(olddate);
                console.log(date);
        }
        localStorage.setItem("thing", date);
}
currentDay();

