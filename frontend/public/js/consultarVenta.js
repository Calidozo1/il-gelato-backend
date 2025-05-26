document.addEventListener("DOMContentLoaded", () => {
    const ventasBody = document.querySelector(".content-table tbody");
    const buscarInput = document.getElementById("buscarInput");
    const fechaInput = document.getElementById("fechaInput");
    const btnFiltrar = document.querySelector(".btn-filtrar");
    const formFiltro = document.querySelector(".filtro");

    // Cargar todas las ventas al iniciar
    cargarVentas();

    // Filtrar al enviar el formulario
    formFiltro.addEventListener("submit", (e) => {
        e.preventDefault();
        cargarVentas();
    });

    async function cargarVentas() {
        const params = new URLSearchParams();

        if (buscarInput.value) params.append("buscar", buscarInput.value);
        if (fechaInput.value) params.append("fecha", fechaInput.value);

        try {
            const response = await fetch(`/api/ventas?${params.toString()}`);
            if (!response.ok) throw new Error("Error al obtener ventas");

            const ventas = await response.json();
            renderizarVentas(ventas);
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al cargar las ventas");
        }
    }

    function renderizarVentas(ventas) {
        ventasBody.innerHTML = "";

        if (ventas.length === 0) {
            ventasBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">No se encontraron ventas</td></tr>`;
            return;
        }

        ventas.forEach(venta => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${venta.cliente}</td>
                <td>${venta.nOrden}</td>
                <td>${formatearFecha(venta.fecha)}</td>
                <td>$${venta.precio.toFixed(2)}</td>
                <td>${venta.estado}</td>
            `;
            ventasBody.appendChild(tr);
        });
    }

    function formatearFecha(fecha) {
        // Convierte de YYYY-MM-DD a DD/MM/YYYY
        const [year, month, day] = fecha.split("-");
        return `${day}/${month}/${year}`;
    }
});