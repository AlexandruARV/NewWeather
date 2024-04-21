import { icon_map } from "./mapIcons.js";

export function getIconUrl(iconCode) {
  return `./images/${icon_map.get(iconCode)}.png`;
}

export function getElement(elem) {
  return document.querySelector(`[data-current-${elem}]`);
}

export function setCurrentWeather(current) {
  const currentIcon = getElement("icon");

  currentIcon.src = getIconUrl(current.weather_code);
  getElement("temperature_2m").innerText = `${Math.round(
    current.temperature_2m
  )}℃`;
  getElement("sky").innerHTML =
    icon_map.get(current.weather_code)[0].toUpperCase() +
    icon_map.get(current.weather_code).slice(1).split("-").join(" ");
  getElement("location").innerHTML = `${current.name}, ${current.country_code}`;
}
