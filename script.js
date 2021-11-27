let chosenCity;

/*If the user active the geolocation,
the browser obtains the user's location and updates itself in real time with 'WatchPosition'*/
if("geolocation" in navigator) {
  navigator.geolocation.watchPosition((position) => {
    
    //Get the url of the API with the coordinates of our current position
    const urlLatLong = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + 
    '&lon=' + position.coords.longitude + '&lang=fr&appid=6ae63b111aa3a8089cdff28bba829da0&units=metric';
    
    // We create an object XML that will allow us to make requests
    let request = new XMLHttpRequest(); 
    
    //We retrieve the data in the url
    request.open('GET', urlLatLong);
    request.responseType = 'json';
    //Send the request
    request.send();

    //As soon as we receive a response, this function is executed
    request.onload = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
          //if status OK execute...
        if (request.status === 200) {
          let reponse = request.response;
          let temperature = Math.trunc(reponse.main.temp);
          let city = reponse.name;
          let country = reponse.sys.country;
          let weather = reponse.weather[0].description;
          let icon = reponse.weather[0].icon;

          document.querySelector('#weather').textContent = weather;
          document.querySelector('.icon').src ="https://openweathermap.org/img/wn/" + icon + ".png";
          document.querySelector('#temperature_label').textContent = temperature;
          document.querySelector('#country').textContent = country +'-';
          document.querySelector('#city').textContent = city;
        }
        else {
          alert('Un problème est intervenu, merci de revenir plus tard.');
        }
      }
    }
  }, error, options);
  
  var options = {
    enableHighAccuracy: true
  }
}
//If the user does not activate geolocation then it will display the weather forecast for Paris
else {
  chosenCity = "Paris";
  recoverWeather(chosenCity);
}

let changeCity = document.querySelector('#change');
changeCity.addEventListener('click', () => {
  chosenCity = prompt('Quelle ville souhaitez-vous voir ?');
  recoverWeather(chosenCity);
});

function error() {
  chosenCity = "Paris";
  recoverWeather(chosenCity);
}

//Function that retrieves the weather of the city that the user has chosen
function recoverWeather(city) {
  const urlByCity = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=fr&appid=6ae63b111aa3a8089cdff28bba829da0&units=metric';

  let request = new XMLHttpRequest();
  request.open('GET', urlByCity );
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        let reponse = request.response;
        let temperature = Math.trunc(reponse.main.temp);
        let city = reponse.name;
        let country = reponse.sys.country;
        let weather = reponse.weather[0].description;
        let icon = reponse.weather[0].icon;

        document.querySelector('#weather').textContent = weather;
        document.querySelector('.icon').src ="https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('#temperature_label').textContent = temperature;
        document.querySelector('#country').textContent = country +'-';
        document.querySelector('#city').textContent = city;
      }
      else {
        alert("Un problème est intervenu, la ville n'existe pas ou la ville n'a pas été choisi.");
      }
    }
  }
}