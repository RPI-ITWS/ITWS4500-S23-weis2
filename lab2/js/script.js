var ChangeUnit;

window.onload = function(){

var key = "6c383ebc2e93c8bc6263010e56b6fdb4";
var metric = "&units=metric";
var unit = "℃";
getLocation();

function getLocation() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = position.coords.latitude.toFixed(3);
            console.log(lat);
            var lon = position.coords.longitude.toFixed(3);
            console.log(lon);
        
        
        var api = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+key+metric;
        console.log(api);

        fetch(api)
            .then(response => response.json())
            .then(json => {
                document.getElementById("Location").innerHTML += json.name;
                document.getElementById("Description").innerHTML += json.weather[0].description;
                var tempCel = json.main.temp;
                var tempmax = json.main.temp_max;
                var tempmin = json.main.temp_min;
                document.getElementById("Wind").innerHTML += "<p class='text'> Wind Speed: " + json.wind.speed + "mps"+"</p>";  
                document.getElementById("Humidity").innerHTML += "<p class='text'> Humidity: " + json.main.humidity + "%" + "</p>";            
                document.getElementById("Temp").innerHTML += "<p id='TempNum'>" + Math.round(tempCel) + "</p>" + "<p id='Celsymbol'>"+ unit + "</p>";
                document.getElementById("TempImg").src= "http://openweathermap.org/img/wn/"+ json.weather[0].icon + "@2x.png";
                document.getElementById("Range").innerHTML += "<p class='text'>" + Math.round(tempmax) + unit+ "  ~  " + Math.round(tempmin) + unit+ "</p>"; 
            })
            .catch(err => console.log('Request Failed', err));
            })
    }
}

// function getLocaltime(){
//     return new Date().toLocaleTimeString();
// }
ChangeUnit = function ChangeUnit(){
    if (metric == "&units=metric") {
        metric = "&units=imperial";
        unit = "℉";
    }
    else {
        metric = "&units=metric";
        unit = "℃";
    }

    navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude.toFixed(3);
            console.log(lat);
            var lon = position.coords.longitude.toFixed(3);
            console.log(lon);
        
        
        var api = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+key+metric;
        console.log(api);

        fetch(api)
            .then(response => response.json())
            .then(json => {
                document.getElementById("Location").innerHTML = json.name;
                document.getElementById("Description").innerHTML = json.weather[0].description;
                var tempCel = json.main.temp;
                var tempmax = json.main.temp_max;
                var tempmin = json.main.temp_min;
                document.getElementById("Wind").innerHTML = "<p class='text'> Wind Speed: " + json.wind.speed + "mps"+"</p>";  
                document.getElementById("Humidity").innerHTML = "<p class='text'> Humidity: " + json.main.humidity + "%" + "</p>";            
                document.getElementById("Temp").innerHTML = "<p id='TempNum'>" + Math.round(tempCel) + "</p>" + "<p id='Celsymbol'>" + unit + "</p>";
                document.getElementById("TempImg").src= "http://openweathermap.org/img/wn/"+ json.weather[0].icon + "@2x.png";
                document.getElementById("Range").innerHTML = "<p class='text'>" + Math.round(tempmax) + unit + "  ~  " + Math.round(tempmin) + unit + "</p>"; 
            })
            .catch(err => console.log('Request Failed', err));
            })
    }


timemove();
clearInterval(timemove);
function timemove() {

    // var date = new Date();
    // var year = date.getFullYear();
    // var mth = date.getMonth() + 1;
    // var d = date.getDate();
    // var h = date.getHours();
    // var m = date.getMinutes();
    // var s = date.getSeconds();
    // var week = date.getDay();

    // var time = year + "Year" + fn(mth) + "Month" + fn(d) + "Day" + fn(h) + ":" + fn(m) +  ":" + fn(s) +"（Week"+week+"）";
    
    // function fn(str) {
    //     str < 10 ? str = "0" + str : str;
    //     return str;
    // }
    
    setInterval(timemove, 1000);
    DateTime.innerHTML = new Date().toString();
}
// function getTimeZone() {
//     var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
//     return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
// }

// DateTime.innerHTML += getTimeZone();
}