import { icon_map } from "./mapIcons.js";
import { getCurrentLocation } from "./location.js";
import { setCurrentWeather } from "./curWeather.js";
import { setDailyForecast } from "./dailyForecast.js";
import { setHourlyForecast } from "./hourlyForecast.js";

export async function getWeather(city) {
  try {
    const responseCordsCity = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    );
    const dataCity = await responseCordsCity.json();
    const { latitude, longitude, timezone, name, country_code } =
      dataCity.results[0];

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,,evapotranspiration,soil_temperature_54cm,surface_pressure,relative_humidity_2m,dew_point_2m,apparent_temperature,weather_code,cloud_cover,visibility,vapour_pressure_deficit,temperature_80m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&timeformat=unixtime&timezone=${timezone}`
    );

    const data = await res.json();
    console.log(data);
    const currentObject = { ...data.current, name, country_code };
    const hourlyForecastObject = hourlyWeather(data.hourly);

    setCurrentWeather(currentObject);
    setDailyForecast(data.daily);
    setHourlyForecast(hourlyForecastObject);
  } catch (err) {
    alert("Enter a valid city");
    console.error(err);
  }
}
getWeather("Berlin");

const enterCity = document.querySelector(".input-city");
enterCity.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather(enterCity.value);
    enterCity.value = "";
  }
});

//Intl.DateTimeFormat().resolvedOptions().timeZone
function hourlyWeather(hourly) {
  const dateNow = Math.floor(new Date().getTime() / 1000);
  const indexDateNow = hourly.time.findIndex((el) => el >= dateNow - 3600);

  return hourly.time
    .map((el, i) => {
      return {
        apparent_temperature: hourly.apparent_temperature[i],
        time: hourly.time[i],
        dew_point_2m: hourly.dew_point_2m[i],
        evapotranspiration: hourly.evapotranspiration[i],
        relative_humidity_2m: hourly.relative_humidity_2m[i],
        soil_temperature_54cm: hourly.soil_temperature_54cm[i],
        surface_pressure: hourly.surface_pressure[i],
        temperature_2m: hourly.temperature_2m[i],
        visibility: hourly.visibility[i],
        vapour_pressure_deficit: hourly.vapour_pressure_deficit[i],
        weather_code: hourly.weather_code[i],
      };
    })
    .slice(indexDateNow);
}

getCurrentLocation();
