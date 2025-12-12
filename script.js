// https://api.openweathermap.org/data/2.5/weather?q=casablanca&appid=1c206efd5b7fea0c692f1eca31134062
// https://api.openweathermap.org/data/2.5/forecast?q=casablanca&appid=1c206efd5b7fea0c692f1eca31134062&units=metric
// https://api.api-ninjas.com/v1/worldtime

const apiKey = "1c206efd5b7fea0c692f1eca31134062";
let Mycity = "beni-mellal";

const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+Mycity+'&appid='+apiKey+'&units=metric';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+Mycity+'&appid='+apiKey+'&units=metric';


fetch(currentUrl).then(response => response.json())
          .then(data => {
            document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("weatherStatus").textContent = data.weather[0].main;
            document.getElementById("temperature").textContent = `${(data.main.temp).toFixed(1)}°C`;
            document.getElementById("wind").textContent = `Wind ${data.wind.speed} Km/hr`;
            document.getElementById("realFeel").textContent = `Real feel ${data.main.feels_like}°C`
            document.getElementById("humidity").textContent = `Humidity ${data.main.humidity}%`
            document.getElementById("pressure").textContent = `Pressure ${data.main.pressure} hPa`;
            const weatherIcon = data.weather[0].icon;
            document.getElementById("typeIcon").src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`; 
            sunTime(data);
          })
          .catch(error => {
            console.log("Error fetching current weather data:", error);
          });

fetch(forecastUrl).then(response => response.json())
                  .then(data => {
                    // getting 5 days data from the api  
                    const dailyData = [];
                    for (let item of data.list) {
                      const date = item.dt_txt.split(" ")[0];
                      if (!dailyData.some(d => d.date === date)) {
                      dailyData.push({
                      date: date,
                      temp: Math.round(item.main.temp),
                      icon: item.weather[0].icon
                        });
                      }
                        if (dailyData.length === 5) break; // we only need 5 days
                          }
                      upcomingDays();
                    // assign icons and temperature for upcoming 5 days   
                          const days = document.querySelectorAll(".day");
                        
                        for(i=0; i<dailyData.length; i++){
                        const img = days[i].querySelector("img");
                        const temps = days[i].querySelector("h3");
                        img.src = `https://openweathermap.org/img/wn/${dailyData[i].icon}@2x.png`;
                        temps.textContent = `${dailyData[i].temp}°C`;
                      
                        }
                    upcomingHours(data);
                  })
                    .catch(error => {
                        console.log("Error fethcing forecast data", error);
                    });
                  

function upcomingDays() {

    const daysList = document.querySelector(".days-list");
        const date = new Date();
    for (let i = 0; i < 5; i++) {

        date.setDate(date.getDate() + 1);

        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        const day = document.createElement("div");
        day.classList.add("day");
        if(i == 0){
          day.innerHTML=`<h4>Today</h4>
            <img id="dayIcon">
            <h3></h3>`;
            daysList.appendChild(day);
        }else{
            day.innerHTML=`<h4>${dayName}</h4>
            <img id="dayIcon">
            <h3></h3>`;
            daysList.appendChild(day);
        }
        
    }
    const hour = `${String(date.getHours())}:${String(date.getMinutes())}`;
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${hour}`;
    const today = document.getElementById("date");
    today.textContent = `Today : ${formattedDate}` 
  
}


function upcomingHours(data){
    const hoursList = document.querySelector(".hours-list");
    for(let i=0; i<5; i++){
    const hour = document.createElement("div");
    hour.classList.add("hour");
    hour.innerHTML = `<h3>${data.list[i].dt_txt.slice(11,16)}</h3>
                      <img id="hourIcon" src="https://openweathermap.org/img/wn/${data.list[i].icon}@2x.png"></img>
                      <h4></h4>`
    hoursList.appendChild(hour);
    }
    const hours = document.querySelectorAll(".hour");
    for(let i=0; i<hours.length; i++){
      
      const h3 = hours[i].querySelector("h3");
      const img = hours[i].querySelector("img");
      const temp = hours[i].querySelector("h4")
      h3.textContent = data.list[i].dt_txt.slice(11,16);
      const icon = data.list[i].weather[0].icon;
      img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      temp.textContent = `${(data.list[i].main.temp).toFixed(0)}°C`;
      hours[i].appendChild(h3);
      hours[i].appendChild(img);
      hours[i].appendChild(temp);
    }
  }

  function sunTime(data){
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      
      document.getElementById("sunriseTime").textContent = convertUnixToTime(sunrise);
      document.getElementById("sunsetTime").textContent = convertUnixToTime(sunset);
      }
      

  function convertUnixToTime(unixTime) {
  const date = new Date(unixTime * 1000);  // convert to ms
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function searchCity(){
  const searchBox = document.getElementById("cityInput")
  searchBox.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
      let city = searchBox.value;
      if(city != ""){
            Mycity = city;
      }
      fetch(currentUrl);
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
     searchCity();
});

