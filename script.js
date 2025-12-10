// https://api.openweathermap.org/data/2.5/weather?q=casablanca&appid=1c206efd5b7fea0c692f1eca31134062
// https://api.openweathermap.org/data/2.5/forecast?q=casablanca&appid=1c206efd5b7fea0c692f1eca31134062&units=metric
// https://api.api-ninjas.com/v1/worldtime

const apiKey = "1c206efd5b7fea0c692f1eca31134062";
const city = "beni-mellal";

const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units=metric';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+apiKey+'&units=metric';
let currentData = [];
let forecastData = [];
fetch(currentUrl).then(response => response.json())
          .then(data => {
            // currentData.push(data);
            currentData.push(data);
            document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("weatherStatus").textContent = data.weather[0].main;
            document.getElementById("temperature").textContent = `${(data.main.temp).toFixed(1)}°C`;
            document.getElementById("wind").textContent = `Wind ${data.wind.speed} Km/hr`;
            document.getElementById("realFeel").textContent = `Real feel ${data.main.feels_like}°C`
            document.getElementById("humidity").textContent = `Humidity ${data.main.humidity}%`
            document.getElementById("pressure").textContent = `Pressure ${data.main.pressure} hPa`;
            const weatherIcon = data.weather[0].icon;
            document.getElementById("typeIcon").src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`; 
          })
          .catch(error => {
            console.log("Error fetching current weather data:", error);
          });
console.log(currentData)
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
                    console.log(dailyData);

                  })
                    .catch(error => {
                        console.log("Error fethcing forecast data", error);
                    });
                  
// fetch("https://api.api-ninjas.com/v1/worldtime?city=London").then(response => response.json())
//                     .then(data => {
//                       // document.getElementById("date").textContent = data.
//                     })
//                       .catch(error => {
//                         console.log("there is an error",error);
//                       });

function upcomingDays() {

    const daysList = document.querySelector(".days-list");
        const date = new Date();
    for (let i = 0; i < 5; i++) {

        date.setDate(date.getDate() + i);

        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        const day = document.createElement("div");
        day.classList.add("day");

        day.innerHTML = `
            <h4>${i === 0 ? "Today" : dayName}</h4>
            <img id="dayIcon">
            <h3></h3>
        `;
        daysList.appendChild(day);
    }
    const hour = `${String(date.getHours())}:${String(date.getMinutes())}`;
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${hour}`;
    const today = document.getElementById("date");
    today.textContent = `Today : ${formattedDate}` 
    console.log(hour)
}

// document.addEventListener("DOMContentLoaded", () => {
//     upcomingDays();
// });
