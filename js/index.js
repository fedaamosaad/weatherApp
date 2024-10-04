//today
let todayDay = document.getElementById("today");
let todaynum = document.getElementById("date");
let todayMonth = document.getElementById("month");
let todayLocation = document.getElementById("location");
let todayDegree = document.getElementsByClassName("today-num");
let todayCondition = document.getElementsByClassName("today-custom");
let todayCondImg = document.getElementById("forecast-icon");
let windDirection = document.getElementById("wind-direction");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");

//tommorrow


let tommorrowDay = document.getElementsByClassName("day");
let tommorrowMaxDegree = document.getElementsByClassName("max-degree");
let tommorrowDegree = document.getElementsByClassName("degree");
let tommorrowCondition = document.getElementsByClassName("custom");
let tommorrowCondImg = document.getElementsByClassName("forecast-icon");

let searchInput = document.getElementById("search");


async function getWeatherData(city) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`
  );
  let data = await res.json();
  return data;
}
function displayToday(data) {
  let todayDate =new Date()
  todayLocation.innerHTML = data.location.name;
  wind.innerHTML = data.current.wind_kph+' km/h';
  windDirection.innerHTML = data.current.wind_dir;
  humidity.innerHTML = data.current.humidity +" %";
  todayDegree[0].innerHTML =data.current.temp_c +'<sup>o</sup>C';
  todayCondition[0].innerHTML =data.current.condition.text;
  todayDay.innerHTML=todayDate.toLocaleDateString('en-us',{weekday:"long"}) ;
  todayMonth.innerHTML=todayDate.toLocaleDateString('en-us',{month:"long"});
  todaynum.innerHTML=todayDate.getDate();
  todayCondImg.setAttribute('src',data.current.condition.icon);
}
function tomorrowData(data){
 let forecastData =data.forecast.forecastday

 
 for (let i = 0; i < 2; i++) {
  let tomorrow = new Date (forecastData[i+1].date)

  
  tommorrowMaxDegree[i].innerHTML= forecastData[i+1].day.maxtemp_c+'<sup>o</sup>C';
  tommorrowDegree[i].innerHTML= forecastData[i+1].day.mintemp_c+'<sup>o</sup>C';
  tommorrowCondImg[i].setAttribute('src',forecastData[i+1].day.condition.icon)
  tommorrowCondition[i].innerHTML= forecastData[i+1].day.condition.text
  tommorrowDay[i].innerHTML= tomorrow.toLocaleDateString('en-us',{weekday:"long"}) ;  
 }
}
async function startApp(city='alexandria') {
  let data = await getWeatherData(city);
  if (!data.error){
     displayToday(data);
  tomorrowData(data)
  }
 

}
startApp();

searchInput.addEventListener('keyup',function(){
startApp(searchInput.value)
  
})