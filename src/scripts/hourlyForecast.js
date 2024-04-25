import { getElement, getIconUrl } from "./curWeather.js";

export function setHourlyForecast(forecast) {
  let html = "";
  const newHourlyArr = forecast.filter((el, i) => {
    if (i < 24) {
      return el;
    }
  });

  newHourlyArr.forEach((el) => {
    html += ` <ul class="list-today-forecast">
    <li>${new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(
      el.time * 1000
    )}</li>
    <li><img class="forecast-img"src=${getIconUrl(el.weather_code)}></li>
    <li>${Math.round(el.apparent_temperature)}℃</li>
</ul>`;
  });

  document.querySelector(".slides").innerHTML = html;
  sliderEffect();
  setParameters(forecast[0]);
}

function setParameters(currParam) {
  console.log(currParam);
  getElement("dew_point_2m").innerHTML = `${currParam.dew_point_2m}`;
  getElement(
    "evapotranspiration"
  ).innerHTML = `${currParam.evapotranspiration}`;
  getElement(
    "soil_temperature_54cm"
  ).innerHTML = `${currParam.soil_temperature_54cm}`;
  getElement(
    "vapour_pressure_deficit"
  ).innerHTML = `${currParam.vapour_pressure_deficit}`;

  getElement(
    "relative_humidity_2m"
  ).innerHTML = `${currParam.relative_humidity_2m}<span class="unit">%</span>`;
  getElement("visibility").innerHTML = `${Math.round(
    currParam.visibility / 1000
  )}<span class="unit">km</span>`;

  getElement("surface_pressure").innerHTML = `${Math.round(
    currParam.surface_pressure
  )}<span class="unit">hPa</span>`;

  getElement(
    "apparent_temperature"
  ).innerHTML = `${currParam.apparent_temperature}<span class="unit">℃</span>`;
}

let interval;

function sliderEffect() {
  let curSlide = 0;

  const slides = document.querySelectorAll(".list-today-forecast");
  const btnLeft = document.querySelector(".btn-left");
  const btnRight = document.querySelector(".btn-right");
  const maxSlide = slides.length;

  slides.forEach((e, i) => {
    e.style.transform = `translateX(${106 * i}%)`;
  });

  btnLeft.addEventListener("click", (e) => {
    stopSlider();
    curSlide = curSlide - 1;
    if (curSlide < 0) curSlide = Math.floor(maxSlide - 6);
    slides.forEach((e, i) => {
      e.style.transform = `translateX(${106 * (i - curSlide)}%)`;
    });
    startInterval();
  });

  btnRight.addEventListener("click", (e) => {
    stopSlider();
    curSlide = curSlide + 1;
    if (curSlide > Math.round(maxSlide - 6)) curSlide = 0;
    slides.forEach((e, i) => {
      e.style.transform = `translateX(${106 * (i - curSlide)}%)`;
    });
    startInterval();
  });

  function stopSlider() {
    clearInterval(interval);
    slides.forEach((el) => (el.style.transition = `transform 0.5s ease`));
  }

  let elem = 1;
  stopSlider();

  function startInterval() {
    interval = setInterval(() => {
      slides.forEach((e) => (e.style.transition = `transform 5s linear`));
      curSlide = curSlide + elem;
      if (curSlide >= Math.round(maxSlide - 6)) {
        elem = -1;
      } else if (curSlide <= 1) {
        elem = 1;
      }
      slides.forEach((e, i) => {
        e.style.transform = `translateX(${106 * (i - curSlide)}%)`;
      });
    }, 4000);
  }
  startInterval();
}
