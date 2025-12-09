// https://api.openweathermap.org/data/2.5/weather?q=casablanca&appid=1c206efd5b7fea0c692f1eca31134062
// https://api.openweathermap.org/data/2.5/forecast?q=casablanca&appid=1c206efd5b7fea0c692f1eca31134062&units=metric
// https://api.api-ninjas.com/v1/worldtime

const apiKey = "1c206efd5b7fea0c692f1eca31134062";
const city = "casablanca";

const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units=metric';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+apiKey+'&units=metric';

fetch(currentUrl).then(response => response.json())
          .then(data => {
            document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("weatherStatus").textContent = data.weather.main;
            document.getElementById("temperature").textContent = `${(data.main.temp).toFixed(1)}°C`;
            document.getElementById("wind").textContent = `Wind ${data.wind.speed}Km/hr`;
            document.getElementById("realFeel").textContent = `Real feel ${data.main.feels_like}°C`
            document.getElementById("humidity").textContent = `Humidity ${data.main.humidity}%`
            document.getElementById("pressure").textContent = `Pressure ${data.main.pressure} hPa`;
            const weatherIcon = data.weather[0].icon;
            document.getElementById("typeIcon").src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`; 
            console.log(data);

          })
          .catch(error => {
            console.log("Error fetching current weather data:", error);
          });

// fetch(forecastUrl).then(response => response.json())
//                   .then(data => {
//                     console.log(data);
//                   })
//                     .catch(error => {
//                         console.log("Error fethcing forecast data", error);
//                     });
                  
fetch("https://api.api-ninjas.com/v1/worldtime?city=London").then(response => response.json())
                    .then(data => {
                      // document.getElementById("date").textContent = data.
                    })
                      .catch(error => {
                        console.log("there is an error",error);
                      });