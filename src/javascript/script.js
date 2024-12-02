document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#city_name").value;

  if (!cityName) {
    document.querySelector("#weather").classList.remove("show");
    showAlert("Digite o nome de uma cidade..");
    return;
  }

  const apiKey = "417eec9414c517290c89e9dc7a725328";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    cityName
  )}&appid=${apiKey}&units=metric&lang=pt_br`;

  const results = await fetch(apiURL);
  const json = await results.json();

  if (json.cod === 200) {
    showInfo({
      city: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      tempMax: json.main.temp_max,
      tempMin: json.main.temp_min,
      description: json.weather[0].description,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      humidity: json.main.humidity,
    });
  } else {
    document.querySelector("#weather").classList.remove("show");
    showAlert(`
        Não foi possível localizar...
        <img src="src/images/404.svg"/>
        `);
  }
});

function showInfo(json) {
  showAlert("");

  //Add classe
  document.querySelector("#weather").classList.add("show");
  //inserir os dados vindo da API de Cidade e  País
  document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;
  //Inserir os dados vindo da API da Temperatura em Graus Celsius
  document.querySelector("#temp_value").innerHTML = `${json.temp
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>C°</sup>`;
  //Descrição do tempo ex: Nublado ou ensolarado
  document.querySelector("#temp_description").innerHTML = `${json.description}`;
  //Altera a img conforme o clima do lugar
  document
    .querySelector("#temp_img")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );
  //Inserir os dados vindo da API de temperatura Máxima
  document.querySelector("#temp_min").innerHTML = `${json.tempMax
    .toFixed(1)
    .toString()
    .replace(".", ",")}<sup>C°</sup>`;
  //Inserir os dados vindo da API de temperatura Minima
  document.querySelector("#temp_value").innerHTML = `${json.tempMin
    .toFixed(1)
    .toString()
    .replace(".", ",")}<sup>C°</sup>`;
  //Insere a humidade do tempo
  document.querySelector("#humidity").innerHTML = `${json.humidity}%`;

  document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(
    1
  )}km/h`;
}

function showAlert(msg) {
  document.querySelector("#alert").innerHTML = msg;
}
