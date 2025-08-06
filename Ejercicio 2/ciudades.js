const resultado = document.getElementById("resultado");

async function buscarClima() {
  const ciudadInput = document.getElementById("ciudadInput").value.trim();
  const ApiKey = "56b48591e57b6797e183ce4f553bf846";

  if (!ciudadInput) {
    resultado.innerHTML = "<p>Por favor ingresa una ciudad.</p>";
    return;
  }

  const ciudad = encodeURIComponent(ciudadInput + ",CO");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${ApiKey}&units=metric&lang=es`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.cod === 200) {
      const icono = datos.weather[0].icon;
      resultado.innerHTML = `
        <p><strong>Ciudad:</strong> ${datos.name}</p>
        <p><strong>Temperatura:</strong> ${datos.main.temp} °C</p>
        <p><strong>Clima:</strong> ${datos.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="icono del clima">
      `;
    } else {
      resultado.innerHTML = `<p>Ciudad no encontrada: ${datos.message}</p>`;
    }
  } catch (error) {
    console.error("Error al consultar el clima:", error);
    resultado.innerHTML = `<p>Hubo un error al consultar el clima.</p>`;
  }
}


//56b48591e57b6797e183ce4f553bf846