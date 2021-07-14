/*

- Allows a user to search the temperature for any city in the world using city and country.
- Fetched the current weather data from the https://openweathermap.org/ API.
- Displays city, country, and temperature in degrees Fahrenheit, as well as corresponding color story.

*/

const getWeather = async function() {

  // grabbing text inputs
  let city = document.getElementById('new-city').value;
  let country = document.getElementById('new-country').value;

  // querying dom elements
  let displayCity = document.getElementById('display-city');
  let displayCountry = document.getElementById('display-country');
  let displayTemp = document.getElementById('display-temp');
  
  // API key
  const apiKey = "03f2fcada84e9d659128090e23fe669b";

  // API URL
  const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + apiKey;
  
  try {
    // fetch the raw response
    const rawResponse = await fetch(weatherUrl);

    // rawResponse.ok is true if status code is between 200 - 299
    if (!rawResponse.ok) {
      throw new Error(rawResponse);
    }

    const jsonResponse = await rawResponse.json();
    console.log('jsonResponse', jsonResponse);

    // grabbing temp
    let temp = JSON.parse(jsonResponse.main.temp);

    // converting kelvin to fahrenheit
    let tempF = ((temp - 273.15) * (9/5) + 32).toFixed(1);
    console.log(tempF);

    // updating UI
    displayCity.innerHTML = city + ', ';
    displayCountry.innerHTML = country;
    displayTemp.innerHTML = tempF + ' °F';
    document.forms[0].reset();
    document.body.className = '';

    // if else for background
    if (tempF >= 90) {
      document.body.classList.add('hottest');
    } else if (tempF >= 80) {
      document.body.classList.add('hot');
    } else if (tempF >= 70) {
      document.body.classList.add('warm');
    } else if (tempF >= 60) {
      document.body.classList.add('chilly');
    } else if (tempF >= 50) {
      document.body.classList.add('cold');
    } else if (tempF < 50) {
      document.body.classList.add('coldest');
    }
    
  } catch (err) {
    console.log('err', err);
  }

};

// querying submit button & adding event listener
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', getWeather);


