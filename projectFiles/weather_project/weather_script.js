if ("geolocation" in navigator) {
    // Geolocation is available
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      // Call the reverse geocoding API to get the city
      const apiKey = '1ce915741bc747e7a0d98f5a48497065';
      const reverseGeocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
  
      fetch(reverseGeocodeUrl)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            const city = data.results[0].components.city;
            const apiKey = '55279e50d5ee0288a84987f48e99d2fd';
            const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

            const weatherIcon = document.querySelector('.weather-icon');
            const temperature = document.querySelector('.temperature');
            const description = document.querySelector('.description');
            const location = document.querySelector('.location');

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const iconUrl = data.current.weather_icons[0];
                    weatherIcon.style.backgroundImage = `url(${iconUrl})`;
                    console.log(data);
                    temperature.textContent = c_to_f(data.current.temperature, temperature);
                    description.textContent = data.current.weather_descriptions[0];
                    location.textContent = `Weather in ${data.location.name}, ${data.location.region}`;
                })
                .catch((error) => console.error('Error fetching data:', error));
            console.log(`City: ${city}`);
          } else {
            console.log("City not found.");
          }
        })
        .catch(error => console.error('Error fetching geocoding data:', error));
    }, function(error) {
      // Handle any errors
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location has timed out.");
          break;
        default:
          console.log("An unknown error occurred.");
      }
    });
  } else {
    // Geolocation is not available in this browser
    console.log("Geolocation is not supported in this browser.");
}

function c_to_f(temp, elem){
  const toggle = document.getElementById('myToggle');

  toggle.addEventListener('change', function() {
      if (toggle.checked) {
          // Perform an action when the toggle is in the "on" or checked state
          return elem.textContent = `${(temp * 9/5) + 32}°F`;
      }
      else{
        return  elem.textContent = `${temp}°C`;
      }
  });


}