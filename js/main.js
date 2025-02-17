// Cargar imágenes de la galería dinámicamente
const imagenes = [
    "images/galeria1.jpg",
    "images/galeria2.jpg",
    "images/galeria3.jpg",
    "images/galeria4.jpg"
];

const galeria = document.getElementById('galeria-imagenes');

imagenes.forEach(imagen => {
    const imgElement = document.createElement('img');
    imgElement.src = imagen;
    imgElement.alt = "Imagen de la galería";
    imgElement.classList.add('galeria-img');
    galeria.appendChild(imgElement);
});

// Obtener datos de las habitaciones desde Google Sheets
function cargarHabitaciones() {
    const url = "https://script.google.com/macros/s/AKfycbxMUxSxUGZgjzYK93PDimyVuNdXJvV6OSQufthEcH0sHZeBFv9j2zDoExm4YrWuDKVDZw/exec"; // Reemplaza con la URL de tu Google Apps Script

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const habitacionesContainer = document.getElementById('habitaciones-container');
            habitacionesContainer.innerHTML = ''; // Limpiar contenido anterior

            data.forEach(habitacion => {
                const nombre = habitacion[0]; // Nombre de la habitación
                const precio = habitacion[1]; // Precio por noche
                const estado = habitacion[2]; // Estado de la habitación

                // Construir la ruta de la imagen basada en el nombre de la habitación
                const imagen = `images/${nombre.toLowerCase().replace(/ /g, '-')}.jpg`;

                // Crear el elemento HTML para la habitación
                const habitacionDiv = document.createElement('div');
                habitacionDiv.classList.add('habitacion');

                habitacionDiv.innerHTML = `
                    <img src="${imagen}" alt="${nombre}">
                    <div>
                        <h3>${nombre}</h3>
                        <p>Precio por noche: $${precio}</p>
                        <p>Estado: ${estado}</p>
                    </div>
                `;

                // Agregar la habitación al contenedor
                habitacionesContainer.appendChild(habitacionDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Llamar a la función al cargar la página
window.onload = cargarHabitaciones;