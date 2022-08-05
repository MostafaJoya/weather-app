const WeatherView = class {
  _parentElement = document.querySelector(".main");
  _data = [];
  _target = 0;

  _render = function (data, target = 0) {
    this._target = target;
    const html = this._markup(data, target);
    this._data = data;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  };

  addHandlerUpdateDay(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const target = e.target.closest(".week-item");
      const dataTarget = target?.dataset?.target;
      if (!dataTarget) return;
      handler(+dataTarget);
    });
  }

  _markup = function (data, target) {
    const { forecastday } = data.forecast;
    const { lat, lon } = data.location;
    const { date } = forecastday[target];
    const {
      avgtemp_c: temp,
      avgvis_km: wind,
      maxtemp_c: maxtemp,
      mintemp_c: mintemp,
      avghumidity: humidity,
    } = forecastday[target].day;

    const { country, name: city } = data.location;
    //prettier-ignore
    const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    //prettier-ignore
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const localDate = new Date(date);
    const month = mS[localDate.getMonth()];
    const { text } = forecastday[target].day.condition;
    const { sunrise, sunset } = forecastday[target].astro;
    return `<div class="weather">
                <div class="weather-side">
                    <div class="weather-gradient">
                        <div class="data">
                            <h2 class="data-dayname">${
                              daysInWeek[localDate.getDay()]
                            }</h2>
                            <span class="data-day">${
                              localDate.getDate() + 1
                            } ${month} ${localDate.getFullYear()}</span>
                            <span class="location"> ${city}, ${country
      .slice(0, 2)
      .toUpperCase()}</span>
                        </div>
                        <div class="weather-container">
                            <h1 class="weather-temp">${temp}°C</h1>
                            <h3 class="weather-desc">${text}</h3>
                        </div>
                    </div>
                </div>
            <div class="info-side">
                <div class="today-info-container">
                    <div class="today-info">
                        <div class="latlng">
                            <span class="title">LAT: ${lat}, LON: ${lon}</span>
                            <div class="clear"></div>
                        </div>
                        <div class="humidity">
                            <span class="title">HUMIDITY</span>
                            <span class="value">${humidity} %</span>
                            <div class="clear"></div>
                        </div>
                        <div class="wind">
                            <span class="title">WIND</span>
                            <span class="value">${wind} km/h</span>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
                <div class="week-container">
                    <ul class="week-list">
                        ${this._childMarkup(forecastday)}
                    </ul>
                </div>
            </div>
          </div>
          <ul class="other-day">
                <li class="other-day-li">
                    <div class="other-day-li__info flex">
                        <div class="other-day-li__info--day flex">
                            <h2 class="other-day-li__info--day--day">${
                              daysInWeek[localDate.getDay()]
                            }</h2>
                        </div>
                        <div class="other-day-li__maxmin flex">
                            <h2 class="other-day-li__maxmin--text">${text}</h2>
                            <h2 class="other-day-li__maxmin--maxmin">&uarr;${maxtemp}/${mintemp}&darr;</h2>
                        </div>
                    </div>
                    <div class="other-day-li__details ">
                        <div class="other-day-li__details--mintemp flex">
                            <h3>MIN temprature</h3>
                            <span>${mintemp}°C</span>
                        </div>
                        <div class="other-day-li__details--maxtemp flex">
                            <h3>MAX temprature</h3>
                            <span>${maxtemp}°C</span>
                        </div>
                        <div class="other-day-li__details--sunrise flex">
                            <h3>Sunrise</h3>
                            <span>${sunrise}</span>
                        </div>
                        <div class="other-day-li__details--sunset flex">
                            <h3>Sunset</h3>
                            <span>${sunset}</span>
                        </div>
                    </div>
                </li>
          </ul>`;
  };
  _childMarkup(forecastday) {
    return forecastday
      .map((cast, i) => {
        const now = new Date().getDate();
        const castDate = +cast.date.split("-")[2];
        return `<li class="week-item ${
          this._target === i ? "active" : ""
        }" data-target="${i}">
                              <span class="day-name">${
                                now === castDate
                                  ? "Today"
                                  : now === castDate - 1
                                  ? "Tomorrow"
                                  : castDate
                              }</span>
                              <span class="day-temp">${
                                cast.day.avgtemp_c
                              }°C</span>
                 </li>`;
      })
      .join("");
  }
  _renderError(err) {
    const html = `
        <div class="message">
          <div class="message__warn">
            &#9888;
          </div>
          <span class="message__err">
            ${err}
          </span>
        </div>
        `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  _loader() {
    const html = `
        <div class="loader"></div>
        `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
};
export default new WeatherView();
