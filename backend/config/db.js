const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "heladeria_user",
    password: "heladeria_password",
    database: "heladeria"
});

connection.connect(err => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("✅ Conectado a MySQL exitosamente");
});

module.exports = connection;