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
      console.log("clicked");
      const target = e.target.closest(".week-item");
      const dataTarget = target?.dataset?.target;
      if (!dataTarget) return;
      handler(+dataTarget);
    });
  }

  _markup = function (data, target) {
    const { forecastday } = data.forecast;
    const { date } = forecastday[target];
    console.log(forecastday, date);
    const {
      avgtemp_c: temp,
      avgvis_km: wind,
      avghumidity: humidity,
    } = forecastday[target].day;

    const { country, name: city } = data.location;
    //prettier-ignore
    const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    //prettier-ignore
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const localDate = new Date(date);
    const month = mS[localDate.getMonth()];
    const { text, icon } = forecastday[target].day.condition;
    const iconTarget = icon.split("/").splice(-2).join("/");
    console.log(text, icon, iconTarget);
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
                            <svg class="location-icon">
                                <use xlink:href="c9c68697b00cab96e944.svg#location"></use>
                            </svg>
                            <span class="location">${city}, ${country
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
                        <div class="pressure">
                            <span class="title">PRESSURE</span>
                            <span class="value">0 %</span>
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
                <div class="location-container">
                    <button class="location-button">
                    <i data-feature="location-button"></i>
                    <span>Change location</span>
                    </button>
                </div>
            </div>
          </div>
          <ul class="other-day">
                <li class="other-day-li">
                    <div class="other-day-li__info flex">
                        <div class="other-day-li__info--day flex">
                            <img class="other-day-li__info--day--img" src="036a7f4b9402e1d74535.png">
                            <h2 class="other-day-li__info--day--day">Friday</h2>
                        </div>
                        <div class="other-day-li__maxmin flex">
                            <h2 class="other-day-li__maxmin--text">Clear Sky</h2>
                            <h2 class="other-day-li__maxmin--maxmin">&uarr;32/32&darr;</h2>
                        </div>
                    </div>
                    <div class="other-day-li__details deactive">
                        <div class="other-day-li__details--pressure flex">
                            <h3>pressure</h3>
                            <h3>
                                <span class="other-day-li__details--pressure-text">1000</span>
                                <span>hPa</span>
                            </h3>
                        </div>
                        <div class="other-day-li__details--could flex">
                            <h3>Coulds</h3>
                            <h3><span class="other-day-li__details--could-text">4</span><span>%</span></h3>
                        </div>
                        <div class="other-day-li__details--seelevel flex">
                            <h3>See level</h3>
                            <h3><span class="other-day-li__details--seelevel-text">1012</span><span>m</span></h3>
                        </div>
                        <div class="other-day-li__details--humidity flex">
                            <h3>Humidity</h3>
                            <h3><span class="other-day-li__details--humidity-text">21</span><span>%</span></h3>
                        </div>
                        <div class="other-day-li__details--wind flex">
                            <h3>Wind speed</h3>
                            <h3><span class="other-day-li__details--wind-text">2.63</span><span>m/s</span></h3>
                        </div>
                        <div class="other-day-li__details--feels flex">
                            <h3>Feels like</h3>
                            <h3><span class="other-day-li__details--feels-text">30</span><span>&#176;C</span></h3>
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
  _renderMessage() {
    `
        <div class="message">
            <svg class="message__icon">
                <use xlink:href=""></use>
            </svg>
        </div>
        `;
  }
};
export default new WeatherView();
