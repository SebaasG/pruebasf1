fetch("http://localhost:3000/vehiculos")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    if (!data || data.length === 0) {
      console.error("No se encontraron vehículos en la respuesta.");
      return;
    }

    const gallery = document.getElementById("gallery");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const closeModal = document.querySelector(".close");

    data.forEach((vehiculo) => {
      const galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");

      const nameVehicle = document.createElement("h4");
      nameVehicle.classList.add("name");
      nameVehicle.textContent = `${vehiculo.modelo} - ${vehiculo.motor}`;

      const img = document.createElement("img");
      img.src = vehiculo.imagen1;
      img.alt = `${vehiculo.equipo} ${vehiculo.modelo}`;

      const description = document.createElement("div");
      description.classList.add("description");
      description.innerHTML = `
        <h3>${vehiculo.equipo} ${vehiculo.modelo}</h3>
        <p><strong>Motor:</strong> ${vehiculo.motor}</p>
      `;

      // Información adicional en una sección flotante a la derecha
      const stats = document.createElement("div");
      stats.classList.add("vehicle-stats");
      stats.innerHTML = `
        <p><strong>Velocidad Máxima:</strong> ${vehiculo.velocidad_maxima_kmh} km/h</p>
        <p><strong>Aceleración:</strong> ${vehiculo.aceleracion_0_100} segundos</p>
      `;

      // Asignar la imagen secundaria como una variable CSS
      galleryItem.style.setProperty("--imagen2", `url(${vehiculo.imagen2})`);

      // Evento para abrir el modal con la información del vehículo
      galleryItem.addEventListener("click", () => {
        modal.style.display = "flex";
        modalTitle.textContent = `${vehiculo.equipo} ${vehiculo.modelo}`;
        modalImage.src = vehiculo.imagen1;
        modalDescription.innerHTML = `
          <p><strong>Motor:</strong> ${vehiculo.motor}</p>
          <p><strong>Velocidad Máxima:</strong> ${vehiculo.velocidad_maxima_kmh} km/h</p>
          <p><strong>Aceleración (0-100 km/h):</strong> ${vehiculo.aceleracion_0_100} segundos</p>
          <p><strong>Transmisión:</strong> ${vehiculo.transmision || "N/A"}</p>
          <p><strong>Precio:</strong> ${vehiculo.precio || "No disponible"}</p>
        `;
      });

      // Cerrar el modal al hacer clic en la "X"
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
      });

      // Cerrar el modal si se hace clic fuera del contenido
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });

      galleryItem.appendChild(nameVehicle);
      galleryItem.appendChild(img);
      galleryItem.appendChild(description);
      galleryItem.appendChild(stats);
      gallery.appendChild(galleryItem);
    });
  })
  .catch((error) => console.error("Error fetching data: ", error));
