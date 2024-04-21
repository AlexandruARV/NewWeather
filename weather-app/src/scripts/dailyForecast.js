import { getElement } from "./curWeather.js";
export function setDailyForecast(data) {
  const dataDaily = dailyWeatherObject(data);

  let html = "";
  dataDaily.forEach((elem, i) => {
    html += `<ul class="forecast-list">
      <li>${Math.round(elem.temperature_2m_max)}℃</li>
      <li>${formatDate(elem.time)} </li>
    </ul>`;
  });

  document.querySelector(".weather-forecast").innerHTML = html;
  document.querySelector(".current-date").innerHTML = formatDate(new Date());
  getElement("sunrise").innerHTML = formatHoursMinutes(dataDaily[0].sunrise);
  getElement("sunset").innerHTML = formatHoursMinutes(dataDaily[0].sunset);
  console.log(dataDaily[0]);
}

function dailyWeatherObject(daily) {
  return daily.time.map((el, i) => {
    return {
      rain_sum: daily.rain_sum[i],
      sunrise: daily.sunrise[i] * 1000,
      sunset: daily.sunset[i] * 1000,
      temperature_2m_max: daily.temperature_2m_max[i],
      temperature_2m_min: daily.temperature_2m_min[i],
      time: daily.time[i] * 1000,
      weather_code: daily.weather_code[i],
    };
  });
}

function formatHoursMinutes(date) {
  const options = {
    minute: "numeric",
    hour: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function formatDate(date) {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options).format(date);
  return dateTimeFormat;
}
