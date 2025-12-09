// https://api.openweathermap.org/data/2.5/weather?q=casablanca&appid=1c206efd5b7fea0c692f1eca31134062
// https://api.openweathermap.org/data/2.5/forecast?q=casablanca&appid=1c206efd5b7fea0c692f1eca31134062&units=metric


const apiKey = "1c206efd5b7fea0c692f1eca31134062";
const city = "casablanca";

const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units=metric';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+apiKey+'&units=metric';

fetch(currentUrl).then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log("Error fetching current weather data:", error);
          });

fetch(forecastUrl).then(response => response.json())
                  .then(data => {
                    console.log(data);
                  })
                    .catch(error => {
                        console.log("Error fethcing forecast data", error);
                    });
                  
        