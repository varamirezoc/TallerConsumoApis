const gallery = document.getElementById("gallery");
const ApiKey = "2BcSWVQeEfTvR8bnfk8DWJ1MNwnxDeGFtYuQUsm1Syu678fRSlfxoll7"; // API
const cantidad = 10; 

async function cargarFotos() {
  try {
    const respuesta = await fetch(`https://api.pexels.com/v1/search?query=nature&per_page=${cantidad}`, {
      headers: {
        Authorization: ApiKey
      }
    });

    const data = await respuesta.json();
    const fotos = data.photos;

    fotos.forEach(foto => {
      const card = document.createElement("div");
      card.classList.add("photo-card");

      card.innerHTML = `
        <img src="${foto.src.medium}" alt="${foto.alt}">
        <div class="info">
          <p><strong>Fotógrafo:</strong> ${foto.photographer}</p>
          <p><strong>Descripción:</strong> ${foto.alt || 'Sin descripción'}</p>
        </div>
      `;

      gallery.appendChild(card);
    });

  } catch (error) {
    console.error("Error al cargar las fotos de Pexels:", error);
    gallery.innerHTML = `<p style="color: red;">No se pudieron cargar las imágenes.</p>`;
  }
}

cargarFotos();


