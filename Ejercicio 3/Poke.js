const resultado = document.getElementById("resultado");

async function buscarPokemon() {
  const nombre = document.getElementById("pokemonInput").value.toLowerCase().trim();

  if (!nombre) {
    resultado.innerHTML = "<p>Por favor ingresa un nombre de Pokémon.</p>";
    return;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Pokémon no encontrado");

    const data = await res.json();

    const habilidades = data.abilities.map(h => h.ability.name).join(", ");
    const tipos = data.types.map(t => t.type.name).join(", ");
    const imagen = data.sprites.front_default;

    resultado.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${imagen}" alt="${data.name}">
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Tipo:</strong> ${tipos}</p>
      <p><strong>Altura:</strong> ${data.height / 10} m</p>
      <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
      <p><strong>Habilidades:</strong> ${habilidades}</p>
    `;
  } catch (error) {
    resultado.innerHTML = `<p>Pokémon no encontrado. Intenta con otro nombre.</p>`;
  }
}
