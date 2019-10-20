// get lat and long
$(function(){
  
  API_KEY = "3d95225d5d94f1f4a7ddcc1add83e048";
  var loc;
  var cel = false;
  var wd;
  
  function displayTemp(fTemp,c){
    if(c) return Math.round((fTemp-32)*(5/9))+" C";
    return (Math.round(fTemp) + " F")
  }
  
  function render(wd,cel){
    var currentlocation = wd.name;
    var currentweather = wd.weather[0].description;
    var currenttemp = displayTemp(wd.main.temp, cel);
    var high = displayTemp(wd.main.temp_max, cel);
    var low = displayTemp(wd.main.temp_min, cel);
    var icon = wd.weather[0].icon

    $('#currentLocation').html(currentlocation);
    $('#currentTemp').html(currenttemp);
    $('#currentWeather').html(currentweather);
    $('#high-low').html(high + " / " + low)

    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";

    $('#currentTemp').prepend('<img src="' + iconSrc + '">')
  }
  
  $.getJSON('http://ipinfo.io', function(d){
    console.log("assigning the data...")
    loc = d.loc.split(",");
    console.log(loc)
  
    // call weather api
     $.getJSON("http://api.openweathermap.org/data/2.5/weather?&units=imperial&lat=" + loc[0] + "&lon=" + loc[1] + "&APPID=" + API_KEY, function(apiData){
       wd = apiData;
       
       console.log('got the data,',wd)
       
       render(wd,cel);
       
       $("#toggle").click(function(){
         cel = !cel;
         render(wd,cel);
       })
       
     })
  
  
  })
  
  
})