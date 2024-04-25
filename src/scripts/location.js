import { getWeather } from "./index.js";
const btnLocation = document.querySelector(".location-btn");

export function getCurrentLocation() {
  btnLocation.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;

        async function getCity(longitude, latitude) {
          try {
            const res = await fetch(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=4cfc6cb0c16944a19be1ef1dd3ade115`
            );
            const data = await res.json();
            getWeather(data.features[0].properties.city);
          } catch (err) {
            console.error(err);
          }
        }
        getCity(longitude, latitude);
      },
      function () {
        alert("Could not get your position");
      }
    );
  });
}

// http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={6401d2b5d87e0653aa70ed7a59736798}
//https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=4cfc6cb0c16944a19be1ef1dd3ade115
