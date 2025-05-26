const { ventas } = require("../models/Venta");

exports.getVentas = (req, res) => {
    const { buscar, fecha } = req.query;

    let resultados = [...ventas]; // Copia para no modificar el original

    // Filtro por texto (busca en cliente o nOrden)
    if (buscar) {
        const termino = buscar.toLowerCase();
        resultados = resultados.filter(v =>
            v.cliente.toLowerCase().includes(termino) ||
            v.nOrden.toLowerCase().includes(termino)
        );
    }

    // Filtro por fecha (exacta)
    if (fecha) {
        resultados = resultados.filter(v => v.fecha === fecha);
    }

    res.json(resultados);
};