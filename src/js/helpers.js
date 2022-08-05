const myKey = "14c1980add444afcaaa163134220607";
////cdn.weatherapi.com/weather/64x64/day/113.png location for images
export async function weather(name) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${name}&days=7`
  );
  const weather = await res.json();
  return weather;
}

export async function cities(entry) {
  const res = await fetch(
    `https://api.teleport.org/api/cities/?search=${entry}`
  );
  return await res.json();
}
