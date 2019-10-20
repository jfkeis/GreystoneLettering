$(function () {

  var apiKey = '4c78ca50babe3d233150f3145b6f3613';
  var url = 'https://api.darksky.net/forecast/';
  //var lati = 0;
  //var longi = 0;
  var wd;
  var seconds = new Date().getTime() / 1000;
  seconds = Math.round(seconds)
  var templist = [];
  var timelist = [];

  function render(wd){
    var currentlocationlat = wd.latitude;
    var currentlocationlon = wd.longitude;
    var currentweather = wd.currently.summary;
    var currenttemp = wd.currently.temperature;
    var feels = wd.currently.apparentTemperature;
    var humidity = wd.currently.humidity;
    var icon = wd.currently.icon;
    var windSpeed = wd.currently.windSpeed;
    var windDir = wd.currently.windBearing;

    templist = [wd.hourly.data[0].temperature];
    timelist = [wd.hourly.data[0].time];

    for (i = 1; i < 24; i++) {
      templist.push(Math.round(wd.hourly.data[i].temperature));
      timelist.push(wd.hourly.data[i].time).toString();
    }
  
    console.log(timelist)
    console.log(templist)

    $('#currentLocation').html(currentlocationlat + ", " + currentlocationlon);
    $('#currentIcon').html("");
    $('#currentTemp').html(currenttemp + "°F");
    $('#currentWeather').html(currentweather);
    $('#currentFeels').html(feels + "°F");
    $('#currentHumidity').html(Math.round(humidity*100) + "%");
    $('#currentWindSp').html(windSpeed + " mph");
    $('#currentWindDir').html(windDir + "°");

    $('#currentIcon').prepend('<img src="img/' + icon + '.png">');
  }

  $.getJSON('http://ipinfo.io', function(d){
    console.log("assigning the data...")
    loc = d.loc.split(",");
    console.log(loc)
    // call weather api
    //$.getJSON("http://api.openweathermap.org/data/2.5/weather?&units=imperial&lat=" + loc[0] + "&lon=" + loc[1] + "&APPID=" + API_KEY, function(apiData){
    $.getJSON("https://api.darksky.net/forecast/" + apiKey + "/" + loc[0] + "," + loc[1] + "," + seconds +"?callback=?", function(apiData) {
              //console.log(apiData);
    wd = apiData;
       
    //console.log('got the data,',wd)
    //var currentweather = wd.currently.summary;
    //$('#currentWeather').html(currentweather);

    render(wd);
       
    })
  
  })

  var ctx = document.getElementById("lineChart").getContext("2d");
  var myLineChart = new Chart(ctx, {
    responsive: true, 
    scaleFontColor: "#FFFFFF",
    type: 'line',
    data: {
      labels: ['m','t','w'],
      datasets: [
          {
              label: "Temperature",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(0,0,0 ,0.4)",
              borderColor: "rgba(0,0,0,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(0,0,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(0,0,0,1)",
              pointHoverBorderColor: "rgba(0,0,0,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: templist,
              spanGaps: false,
          },
          {
              label: "Time",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [30, 31, 37, 45, 63, 72, 85,20,20,20,20,20],
              spanGaps: false,
          }
        ]
      },
      options: { 
        legend: {labels:{fontColor:"white", fontSize: 14}},
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    fontSize: 12,
                    stepSize: 10,
                    beginAtZero:true
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white",
                    fontSize: 14,
                    stepSize: 1,
                    beginAtZero:true
                }
            }]
        }
      }
  })
})
/**
$(function () {
  var ctx = $('lineChart');
  var graph = new Chart(ctx,{
    type:"line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
          {
              label: "My First dataset",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(150,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [64, 58, 81, 83, 55, 52, 43],
              spanGaps: false,
          },
          {
              label: "My First dataset",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40],
              spanGaps: false,
          }
      ]
    }
  })
  var option = {};

  var ctx = document.getElementById("lineChart").getContext('2d');
  var myLineChart = new Chart(ctx).Bar(data, option);
})(jQuery); **/