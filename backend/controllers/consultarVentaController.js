const { ventas } = require("../models/Venta");

exports.getVentas = (req, res) => {
    const { buscar, fecha } = req.query;

    let resultados = [...ventas];

    if (buscar) {
        const termino = buscar.toLowerCase();
        resultados = resultados.filter(v =>
            v.cliente.toLowerCase().includes(termino) ||
            v.nOrden.toLowerCase().includes(termino)
        );
    }
    if (fecha) {
        resultados = resultados.filter(v => v.fecha === fecha);
    }
    res.json(resultados);
};