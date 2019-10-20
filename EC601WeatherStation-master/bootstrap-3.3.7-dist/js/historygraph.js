var apiKey = '4c78ca50babe3d233150f3145b6f3613';
var url = 'https://api.darksky.net/forecast/';
//var lati = 0;
//var longi = 0;
var wd;
var fb;
var seconds = new Date().getTime() / 1000;
seconds = Math.round(seconds)
var templist = [];
var timelist = [];
var pilist = [];
var windlist = [];
var feellist = [];

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  if(hour < 10){
    hour = '0' + hour;
  }
  var min = a.getMinutes();
  if(min < 10){
    min = '0' + min;
  }
  var time = date + ' ' + month + ' ' + hour + ':' + min;
  return time;
}

function render(wd,fb){

  for (i = 0; i < 24; i++) {
    templist.push(Math.round(wd.hourly.data[i].temperature));
    timelist.push(timeConverter(wd.hourly.data[i].time).toString());
    windlist.push(Math.round(wd.hourly.data[i].windSpeed));
    feellist.push(Math.round(wd.hourly.data[i].apparentTemperature));
  }

  console.log(feellist)

  var ctx = document.getElementById("lineChart").getContext("2d");
  var myLineChart = new Chart(ctx, {
    responsive: true, 
    scaleFontColor: "#FFFFFF",
    type: 'line',
    data: {
      labels: timelist,
      datasets: [
          {
              label: "DarkSky Data",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(37, 15, 56,0.7)",
              borderColor: "rgba(37, 15, 56,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(37, 15, 56,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(37, 15, 56,1)",
              pointHoverBorderColor: "rgba(37, 15, 56,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: templist,
              spanGaps: false,
          },
          {
              label: "Feels Like",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(100, 29, 114,0.7)",
              borderColor: "rgba(100, 29, 114,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(100, 29, 114,0.5)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(100, 29, 114,1)",
              pointHoverBorderColor: "rgba(100, 29, 114,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: feellist,
              spanGaps: false,
          },
          {
              label: "Wind Speed (MPH)",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(66,244,149,0.7)",
              borderColor: "rgba(66,244,149,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(66,244,149,0.5)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(66,244,149,1)",
              pointHoverBorderColor: "rgba(66,244,149,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: windlist,
              spanGaps: false,
          }
        ]
      },
      options: { 
        legend: {
            labels:{
                fontColor:"white", 
                fontSize: 14
            },
            position: 'top'

        },
        title: {
            display: true,
            text: 'Weather Today',
            fontColor: "white",
            fontSize: 24
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Temperature (°F)',
                  fontColor: 'white',
                  fontSize: 12
                },
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
}

$.getJSON('http://ipinfo.io', function(d){
  console.log("assigning the data...")
  loc = d.loc.split(",");
  console.log(loc)
  // call weather api
  //$.getJSON("http://api.openweathermap.org/data/2.5/weather?&units=imperial&lat=" + loc[0] + "&lon=" + loc[1] + "&APPID=" + API_KEY, function(apiData){
  $.getJSON("https://api.darksky.net/forecast/" + apiKey + "/" + loc[0] + "," + loc[1] + "?callback=?", function(apiData) {
            //console.log(apiData);
  wd = apiData;
  
    $.getJSON("https://weathernow-db3fe.firebaseio.com/.json", function(firebase) {
    
    fb = firebase;
    
    console.log(fb);

    render(wd,fb);

    })

  })

})

