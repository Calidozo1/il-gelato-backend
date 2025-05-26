document.addEventListener("DOMContentLoaded", () => {
    const buscarInput = document.getElementById("buscarInput");
    const fechaInput = document.getElementById("fechaInput");
    const formulario = document.querySelector(".filtro");
    const tbody = document.querySelector("tbody");

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const buscar = buscarInput.value.trim();
        const fecha = fechaInput.value;

        const url = new URL("/api/ventas", window.location.origin);
        if (buscar) url.searchParams.append("buscar", buscar);
        if (fecha) url.searchParams.append("fecha", fecha);

        try {
            const respuesta = await fetch(url.toString());
            const datos = await respuesta.json();
            llenarTabla(datos);
        } catch (error) {
            console.error("Error al consultar ventas:", error);
        }
    });

    function llenarTabla(ventas) {
        tbody.innerHTML = "";

        if (ventas.length === 0) {
            const fila = document.createElement("tr");
            const celda = document.createElement("td");
            celda.colSpan = 5;
            celda.textContent = "No hay resultados";
            fila.appendChild(celda);
            tbody.appendChild(fila);
            return;
        }

        ventas.forEach((venta) => {
            const fila = document.createElement("tr");

            const cliente = document.createElement("td");
            cliente.textContent = venta.cliente;

            const nOrden = document.createElement("td");
            nOrden.textContent = venta.nOrden;

            const fecha = document.createElement("td");
            fecha.textContent = venta.fecha;

            const precio = document.createElement("td");
            precio.textContent = venta.precio.toFixed(2);

            const estado = document.createElement("td");
            estado.textContent = venta.estado;

            fila.appendChild(cliente);
            fila.appendChild(nOrden);
            fila.appendChild(fecha);
            fila.appendChild(precio);
            fila.appendChild(estado);

            tbody.appendChild(fila);
        });
    }

    formulario.dispatchEvent(new Event("submit"));
});