const productos = [
    { id: 1, nombre: "Gelato de Pistacho", precio: 5, imagen: "/assets/img/icecream.png" },
    { id: 2, nombre: "Gelato de Chocolate", precio: 4.5, imagen: "/assets/img/food.png" },
    { id: 3, nombre: "Gelato de Fresa", precio: 4, imagen: "/assets/img/food.png" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const listaProductos = document.getElementById("listaProductos");
const cartAside = document.getElementById("cartAside");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Renderizar productos en la tienda
productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;
    listaProductos.appendChild(div);
});

document.getElementById("toggleCart").addEventListener("click", () => {
    cartAside.classList.toggle("active");
});

document.getElementById("closeCart").addEventListener("click", () => {
    cartAside.classList.remove("active");
});

// Renderizar productos del carrito
function renderizarCarrito() {
    cartItems.innerHTML = "";
    carrito = carrito.filter(producto => producto.cantidad > 0); // Eliminar productos con cantidad 0
    carrito.forEach((producto, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td><input type="number" min="1" value="${producto.cantidad}" onchange="actualizarCantidad(${index}, this.value)"></td>
                <td><button onclick="eliminarDelCarrito(${index})">❌ Eliminar</button></td>
            `;
        cartItems.appendChild(fila);
    });

    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar cambios en localStorage
}

// Agregar producto al carrito
window.agregarAlCarrito = function (id) {
    const producto = productos.find(p => p.id === id);
    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    renderizarCarrito();
};

// Actualizar cantidad de producto
window.actualizarCantidad = function (index, cantidad) {
    carrito[index].cantidad = parseInt(cantidad) || 0;
    renderizarCarrito();
};

// Eliminar producto
window.eliminarDelCarrito = function (index) {
    carrito.splice(index, 1);
    renderizarCarrito();
};

// Calcular total
function actualizarTotal() {
    const total = carrito.reduce((sum, prod) => sum + (prod.precio * prod.cantidad), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Vaciar carrito
document.getElementById("emptyCart").addEventListener("click", () => {
    carrito.length = 0;
    renderizarCarrito();
});

// Cargar carrito inicial
renderizarCarrito();
