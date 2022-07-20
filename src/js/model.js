export const state = {
  entry: "",
  dataWeather: {},
  targetDay: 0,
};

export const updateCity = (city) => {
  if (!city) throw new Error("must be an object");
  state.entry = city;
};

export const updateWeather = (data) => {
  if (!data && typeof data !== "object") throw new Error("must be an object");
  state.dataWeather = data;
};

export const updateDay = (target) => {
  if (target === state.targetDay) return;
  state.targetDay = target;
  console.log(state.targetDay);
};
