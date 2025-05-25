const productos = [
    { id: 1, nombre: "Gelato de Pistacho", precio: 5, imagen: "/img/icecream.png" },
    { id: 2, nombre: "Gelato de Chocolate", precio: 4.5, imagen: "/img/icecream.png" },
    { id: 3, nombre: "Gelato de Fresa", precio: 4, imagen: "/img/food.png" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const listaProductos = document.getElementById("listaProductos");
const cartAside = document.getElementById("cartAside");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

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
    cartCount.innerText = "0";
    carrito.forEach((producto, index) => {
        const fila = document.createElement("div");
        fila.classList.add("fila");
        fila.innerHTML = `
                <div><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></div>
                <div>${producto.nombre}</div>
                <div>$${producto.precio.toFixed(2)}</div>
                <div class="cont-cant">
                    <input class="counter-cantidad" type="number" min="1" value="${producto.cantidad}" onchange="actualizarCantidad(${index}, this.value)">
                </div>
                <div>
                    <button onclick="eliminarDelCarrito(${index})" class="button">
                        <span class="material-symbols-outlined icon-remove">close</span>
                    </button>
                </div>
            `;
        cartItems.appendChild(fila);
    });

    actualizarCantidadCarrito();
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar cambios en localStorage
}

// Agregar producto al carrito
window.agregarAlCarrito = function (id) {
    const producto = productos.find(p => p.id === id);
    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
        showAlert("El helado ya se encuentra en el carrito",'error');
        return;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    renderizarCarrito();
};

function actualizarCantidadCarrito() {
    const totalItems = carrito.reduce((sum, prod) => sum + prod.cantidad, 0);
    cartCount.innerText = totalItems;
}

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
    if (carrito.length === 0) {
        showAlert("El carrito ya está vacío. ¡Añade algunos helados deliciosos!",'error');
    } else {
        carrito.length = 0;
        renderizarCarrito();
        showAlert("Haz vaciado tu carrito, vuelve pronto!", 'success');
    }
});

function showAlert(message, type) {
    const nonRepeatAlert = document.querySelector('.alert');
    if (nonRepeatAlert) nonRepeatAlert.remove();
    const div = document.createElement('div');
    div.classList.add('alert', type);
    div.textContent = message;
    document.body.appendChild(div);

    setTimeout(() => {
        div.style.transition = "opacity 0.5s ease-in-out";
        div.style.opacity = "0";
    }, 2500);

    setTimeout(() => {
        div.remove(); // Elimina el div después de que se desvanezca completamente
    }, 3000);
}
// Cargar carrito inicial
renderizarCarrito();
