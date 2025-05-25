class Perfil {
    constructor(nombre, email, cedula, password, phone) {
        this.nombre = nombre;
        this.email = email;
        this.cedula = cedula;
        this.password = password;
        this.phone = phone;
    }
}

class Usuario extends Perfil {
    constructor(nombre, email, cedula, password, phone) {
        super(nombre, email, cedula, password, phone);
        this.esAdmin = false;
    }
}

class Admin extends Perfil {
    constructor(nombre, email, cedula, password, phone) {
        super(nombre, email, cedula, password, phone);
        this.esAdmin = true;
    }
}

module.exports = {
    Perfil,
    Usuario,
    Admin
};
