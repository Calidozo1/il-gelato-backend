const db = require("../config/db");

exports.getVentas = async (req, res) => {
    const { buscar, fecha } = req.query;

    try {
        let query = 'SELECT * FROM ventas WHERE 1=1';
        const params = [];

        if (buscar) {
            query += ' AND (cliente LIKE ? OR nOrden LIKE ?)';
            params.push(`%${buscar}%`, `%${buscar}%`);
        }

        if (fecha) {
            query += ' AND fecha = ?';
            params.push(fecha);
        }

        const [ventas] = await db.query(query, params);
        res.json(ventas);
    } catch (error) {
        console.error('Error al consultar ventas:', error);
        res.status(500).json({ error: 'Error interno al consultar ventas' });
    }
};