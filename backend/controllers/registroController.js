const usuarios = []; // Lista temporal de perfiles en memoria
const { Usuario, Admin } = require('../models/Perfil');
function crearPerfil(nombre, email, cedula, password, phone, esAdmin = false) {
    // Validaciones básicas
    if (!nombre || !email || !cedula || !password || !phone) {
        return { exito: false, mensaje: "Todos los campos son obligatorios" };
    }

    if (!email.includes('@') || !email.includes('.')) {
        return { exito: false, mensaje: "Email inválido" };
    }

    if (password.length < 6) {
        return { exito: false, mensaje: "La contraseña debe tener al menos 6 caracteres" };
    }

    if (cedula.length < 6) {
        return { exito: false, mensaje: "Cedula inválida " };
    }
    if (usuarios.find(u => u.email === email)) {
        return { exito: false, mensaje: "Ya existe un perfil usando este correo" };
    }
    // Verificar que no exista cédula duplicada
    if (usuarios.find(u => u.cedula === cedula)) {
        return { exito: false, mensaje: "Ya existe un perfil con esa cédula" };
    }

    const perfil = esAdmin
        ? new Admin(nombre, email, cedula, password, phone)
        : new Usuario(nombre, email, cedula, password, phone);

    usuarios.push(perfil);
    return { exito: true, mensaje: "Perfil creado exitosamente", perfil };
}

function iniciarSesion(email, password) {
    const perfil = usuarios.find(u => u.email === email && u.password === password);
    if (!perfil) {
        return { exito: false, mensaje: "Credenciales incorrectas" };
    }
    return { exito: true, mensaje: "Sesión iniciada", perfil };
}
module.exports = {
    crearPerfil,
    iniciarSesion,
    usuarios
};