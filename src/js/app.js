import "../main.sass";
import { weather } from "./helpers";
import { cities } from "./helpers";
import inputView from "./views/inputView";
import weatherView from "./views/weatherView";
import * as model from "./model.js";

const controlSearchInput = async function (entry) {
  try {
    const newCity = await cities(entry);
    model.updateCity(newCity);
    inputView._render(model.state.entry);
  } catch (err) {
    console.log(err.message);
  }
};
const controlSubmitForm = async function (finallCity) {
  try {
    const targetWeather = await weather(finallCity);
    model.updateWeather(targetWeather);
    weatherView._render(model.state.dataWeather);
  } catch (err) {
    console.log(err.message);
  }
};

const controlChangeDay = function (target) {
  try {
    console.log(target);
    //update target day
    model.updateDay(target);
    //render new weather
    weatherView._render(model.state.dataWeather, model.state.targetDay);
  } catch (err) {
    console.log(err.message);
  }
};

const init = function () {
  inputView.addToInput(controlSearchInput);
  inputView.submitForm(controlSubmitForm);
  weatherView.addHandlerUpdateDay(controlChangeDay);
};

init();
