class Usuario {
    constructor(nombre, email, cedula, password, phone) {
        this.nombre = nombre;
        this.email = email;
        this.cedula = cedula;
        this.password = password;
        this.phone = phone;
    }
}
 //Aqui modifiqué los nombres de las clases por lo que habiamos dicho
// el dia que nos reunimos y lo que tiene mas logica
class Cliente extends Usuario{
    constructor(nombre, email, cedula, password, phone) {
        super(nombre, email, cedula, password, phone);
        this.esAdmin = false;
    }
}

//Ademas dijimos que el admin solo tiene correo y contraseña lo demas no es necesario
class Admin extends Usuario {
    constructor(nombre, email, cedula, password, phone) {
        super(email,password);
        this.esAdmin = true;
    }
}

module.exports = {
    Cliente,
    Usuario,
    Admin
};