class InputView {
  _parentElement = document.querySelector(".search__form");
  suggest = this._parentElement.getElementsByClassName("search__suggestion");
  _data;

  _render = function (data) {
    this._data = data;
    const html = this._markup(this._data);
    suggest.innerHTML = "";
    suggest.insertAdjacentHTML("afterbegin", html);
  };

  _markup = function (data) {
    const cityNames = data._embedded["city:search-results"];
    const html = cityNames
      .map((city) => {
        return `<option value="${city.matching_full_name}">`;
      })
      .join("\n");
    return html;
  };

  addToInput = function (handler) {
    const target = this._parentElement.querySelector(".search__input");
    target.addEventListener("keyup", function () {
      const data = this.value;
      //when characters in input was at least equal to 3
      //auto suggestion will shown
      data.length >= 3 && handler(data);
    });
  };

  submitForm = function (handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const targetCity = this.querySelector(".search__input").value;
      if (!targetCity || targetCity === "") return;
      //for reseting the iput
      this.reset();
      handler(targetCity);
    });
  };
}

export default new InputView();
