const productos = [
    { id: 1, nombre: "Helado De Chocolate con Sirope", precio: 5, stock: 30, imagen: "/img/chocolate con sirope.png" },
    { id: 2, nombre: "Helado De Chocolate", precio: 4.5,stock: 35, imagen: "/img/chocolate.png" },
    { id: 3, nombre: "Helado De Fresa", precio: 4, stock: 25, imagen: "/img/fresa.png" },
    {id: 4, nombre: "Helado De Menta", precio: 6, stock: 15, imagen: "/img/menta.png" },
    {id: 5, nombre: "Helado De Vainilla", precio: 7, stock: 20, imagen: "/img/vainilla.png" },
    {id: 6, nombre: "Helado De Dulce de Leche",precio: 8, stock:  18, imagen: "/img/dulce de leche.png" },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const listaProductos = document.getElementById("listaProductos");
const cartAside = document.getElementById("cartAside");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

// Renderizar productos en la tienda
function renderProductos(lista) {
    listaProductos.innerHTML = "";
    if (lista.length === 0) {
        listaProductos.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }
    lista.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
      <div class="image">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <div class="item-name">
        <h3>${producto.nombre}</h3>
      </div>
      <div class="item-price">
        <p>$${producto.precio.toFixed(2)}</p>
      </div>
      <div>
        <button onclick="agregarAlCarrito(${producto.id})">
            <span class="material-symbols-outlined add-cart">add_shopping_cart</span>
        </button>
      </div>
    `;
        listaProductos.appendChild(div);
    });
}

// Inicialmente se muestran todos los productos
renderProductos(productos);

// Listener para filtrar productos en tiempo real
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
    const filtro = e.target.value.trim().toLowerCase();
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(filtro)
    );
    renderProductos(productosFiltrados);
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
                <div><img src="${producto.imagen}" alt="${producto.nombre}"></div>
                <div>${producto.nombre}</div>
                <div class="item-price">$${producto.precio.toFixed(2)}</div>
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

    // Verificamos que haya stock disponible
    if (producto.stock <= 0) {
        showAlert("No hay stock disponible para este helado", 'error');
        return;
    }

    producto.stock--;

    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
        showAlert("El helado ya se encuentra en el carrito",'error');
        return;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
        showAlert("Producto añadido al carrito", 'success');
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
