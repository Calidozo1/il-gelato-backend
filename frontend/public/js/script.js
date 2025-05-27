let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const listaProductos = document.getElementById("listaProductos");
const cartAside = document.getElementById("cartAside");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const botonNuevoHelado = document.querySelector('.boton-nuevo-helado');
const consultarHeladoTodo = document.querySelector('.consultar-helado-todo');
const agregarHelado = document.getElementById('agregar-helado');
const botonCancelarAgregar =  document.querySelector('.btn-cancelar');

/////// ADMIN AGREGAR HELADOS ///////////
// Cargar productos desde la API
async function cargarProductos() {
    try {
        const respuesta = await fetch("http://localhost:3000/api/productos");

        if (!respuesta.ok) {
            console.error(`Error en la API: ${respuesta.status} - ${respuesta.statusText}`);
            return;
        }

        const contentType = respuesta.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.error("La respuesta del servidor no es JSON válido.");
            return;
        }

        const productos = await respuesta.json();
        if (!Array.isArray(productos)) {
            console.error("Error: la respuesta de la API no es una lista válida.");
            return;
        }

        renderizarHelados(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarProductos);

function mostrarProductos(productos) {
    listaProductos.innerHTML = ""; // Limpiamos la lista
    productos.forEach(producto => {
        const productoHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span>Precio: $${producto.precio}</span>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
        listaProductos.innerHTML += productoHTML;
    });
}

function mostrarCliente() {
    document.getElementById('seccionCliente').classList.remove('oculto');
    document.getElementById('seccionAdmin').classList.add('oculto');
}

function mostrarAdministrador() {
    document.getElementById('seccionCliente').classList.add('oculto');
    document.getElementById('seccionAdmin').classList.remove('oculto');
    manejarPaginacion();
}

function mostrarConsultarHelado() {
    consultarHeladoTodo.classList.remove('oculto');
    agregarHelado.classList.add('oculto');
    manejarPaginacion();
}

function mostrarAgregarHelado() {
    consultarHeladoTodo.classList.add('oculto');
    agregarHelado.classList.remove('oculto');
    manejarPaginacion();
}

// FALTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA PARA ADMIN
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mostrarAdminBtn').addEventListener('click', mostrarAdministrador);
    renderizarProductosTienda();
    renderizarHelados();
    actualizarPaginaActual();
    asignarEventosPopup();
});

agregarHelado.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar recargar la página

    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const imagen = document.getElementById("imagen").value;
    const categoria = document.getElementById("categoria").value;

    try {
        const respuesta = await fetch("http://localhost:3000/api/productos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, descripcion, precio, stock, imagen, categoria })
        });

        if (respuesta.ok) {
            alert("Producto agregado correctamente");
            cargarProductos(); // Recargar lista después de agregar
        }
    } catch (error) {
        console.error("Error al agregar el producto:", error);
    }
});

// Variables de paginación
let paginaActual = 0;
const heladosPorPagina = 4;

// Elementos de la tabla de administrador
const contenedorFilas = document.getElementById('contenedor-filas');

// Popup modal
const modalOverlay = document.getElementById('modal-overlay');
const cerrarPopup = document.querySelector('.cerrar-popup');


if (cerrarPopup) {
    cerrarPopup.addEventListener("click", cerrarModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            cerrarModal();
        }
    });
}

function abrirPopup(helado) {
    const nombreEl = document.getElementById("helado-nombre");
    const stockEl = document.getElementById("helado-stock");
    const idEl = document.getElementById("helado-id");
    const precioEl = document.getElementById("helado-precio");
    const descripcionEl = document.getElementById("helado-descripcion");

    if (!nombreEl || !stockEl || !idEl || !precioEl || !descripcionEl || !modalOverlay) {
        console.error("Error: No se encontraron elementos del DOM para mostrar el popup.");
        return;
    }

    // Asignar los valores básicos
    nombreEl.textContent = helado.nombre;
    stockEl.textContent = helado.stock;
    idEl.textContent = helado.id;
    descripcionEl.textContent = helado.descripcion;

    // Convertir precio a número y usar toFixed si es válido
    const precioNumerico = parseFloat(helado.precio);
    if (!isNaN(precioNumerico)) {
        precioEl.textContent = `$${precioNumerico.toFixed(2)}`;
    } else {
        console.warn(`El precio del helado con ID ${helado.id} no es un número válido.`);
        precioEl.textContent = "Precio no disponible";
    }

    modalOverlay.style.display = "flex";
}



function cerrarModal() {
    modalOverlay.style.display = 'none';
}

function renderizarHelados(productos) {
    if (!Array.isArray(productos) || productos.length === 0) {
        console.error("No hay productos disponibles para mostrar.");
        return;
    }
    contenedorFilas.innerHTML = ""; // Limpiar la tabla antes de renderizar
    productos.forEach(producto => {
        const precioNumerico = parseFloat(producto.precio); // Convertir a número
        if (isNaN(precioNumerico)) {
            console.warn(`El precio del producto con ID ${producto.id} no es válido.`);
            return;
        }
        const fila = document.createElement("div");
        fila.className = "fila-datos";
        fila.innerHTML = `
            <div class="ID">${producto.id}</div>
            <div class="nombre">${producto.nombre}</div>
            <div class="precio">$${precioNumerico.toFixed(2)}</div>
            <div class="info">
                <img src="/img/icono-info.png" alt="info" width="20" height="20">
            </div>
        `;
        contenedorFilas.appendChild(fila);

        const linea = document.createElement("div");
        linea.className = "linea-contenedor";
        contenedorFilas.appendChild(linea);

        fila.querySelector(".info img").addEventListener("click", () => abrirPopup(producto));
    });
}


function actualizarPaginaActual() {
    document.getElementById('pagina-actual').textContent = paginaActual;
}

// Paginación
async function manejarPaginacion(texto = "") {
    try {
        const url = texto ? `http://localhost:3000/api/productos?buscar=${encodeURIComponent(texto)}` : "http://localhost:3000/api/productos";
        const respuesta = await fetch(url);
        const productos = await respuesta.json();

        if (!Array.isArray(productos)) {
            console.error("Error: la respuesta de la API no es una lista válida.");
            return;
        }

        renderizarHelados(productos);
        actualizarPaginaActual(productos.length); // Ahora pasamos la cantidad total de productos

    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

document.getElementById('anterior').addEventListener('click', () => {
    if (paginaActual > 1) {
        paginaActual--;
        manejarPaginacion();
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const botonSiguiente = document.getElementById("siguiente");

    if (botonSiguiente) {
        botonSiguiente.addEventListener("click", async () => {
            try {
                const respuesta = await fetch("http://localhost:3000/api/productos");
                const productos = await respuesta.json();

                if (!Array.isArray(productos)) {
                    console.error("Error: la respuesta de la API no es una lista válida");
                    return;
                }

                const totalPaginas = Math.ceil(productos.length / heladosPorPagina);

                if (paginaActual < totalPaginas) {
                    paginaActual++;
                    manejarPaginacion(productos); // Pasamos los productos como parámetro
                }
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        });
    }
});

async function filtrarHelados(texto) {
    try {
        const url = texto ? `http://localhost:3000/api/productos?buscar=${encodeURIComponent(texto)}` : "http://localhost:3000/api/productos";
        const respuesta = await fetch(url);
        const productos = await respuesta.json();

        if (!Array.isArray(productos)) {
            console.error("Error: la respuesta de la API no es una lista válida.");
            return [];
        }

        return productos; // Devuelve la lista de productos filtrados o completa
    } catch (error) {
        console.error("Error al obtener los productos filtrados:", error);
        return [];
    }
}

const inputBuscar = document.querySelector('.input-buscar');
const spanBuscar = document.querySelector('.Buscar'); // Asegúrate de que exista o elimina esta línea

function filtrarHelados(texto) {
    if (!texto) return productos;
    return productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(texto.toLowerCase()) ||
        producto.precio.toString().includes(texto) ||
        producto.id.toString().includes(texto)
    );
}

inputBuscar?.addEventListener("input", async function() {
    const texto = this.value.trim();

    try {
        const respuesta = await fetch(`http://localhost:3000/api/productos?buscar=${texto}`);
        const productosFiltrados = await respuesta.json();

        paginaActual = 1;
        manejarPaginacion(productosFiltrados);
    } catch (error) {
        console.error("Error al filtrar productos:", error);
    }
});

// Si no tienes un span con clase "Buscar", elimina este bloque
if (spanBuscar) {
    inputBuscar?.addEventListener('focus', function() {
        spanBuscar.style.opacity = '0';
        spanBuscar.style.pointerEvents = 'none';
    });

    inputBuscar?.addEventListener('blur', function() {
        if (!inputBuscar.value) {
            spanBuscar.style.opacity = '1';
            spanBuscar.style.pointerEvents = 'auto';
        }
    });

    inputBuscar?.addEventListener('input', function() {
        if (inputBuscar.value) {
            spanBuscar.style.opacity = '0';
            spanBuscar.style.pointerEvents = 'none';
        } else {
            spanBuscar.style.opacity = '1';
            spanBuscar.style.pointerEvents = 'auto';
        }
    });
}

botonNuevoHelado?.addEventListener('click', function() {
    mostrarAgregarHelado();
});

botonCancelarAgregar?.addEventListener('click', function() {
    mostrarConsultarHelado();
});

// Selecciona los elementos del formulario
const nombreInput = document.getElementById('boton-llenar-nombre');
const idInput = document.getElementById('boton-llenar-id');
const precioInput = document.getElementById('boton-llenar-precio');
const stockInput = document.getElementById('boton-llenar-stock');
const descripcionInput = document.getElementById('boton-llenar-descripcion');
const btnGuardar = document.querySelector('.btn-guardar');
const btnCancelar = document.querySelector('.btn-cancelar');

// Función para validar los campos

async function validarCampos() {
    let esValido = true;
    const errores = [];

    if (!nombreInput.value.trim()) {
        errores.push("El nombre es obligatorio");
        esValido = false;
    }

    if (!precioInput.value.trim() || isNaN(precioInput.value)) {
        errores.push("El precio debe ser un número válido");
        esValido = false;
    }

    if (!stockInput.value.trim() || isNaN(stockInput.value) || parseInt(stockInput.value) < 0) {
        errores.push("El stock debe ser un número positivo");
        esValido = false;
    }

    if (!descripcionInput.value.trim()) {
        errores.push("La descripción es obligatoria");
        esValido = false;
    }

    if (!imagenInput.value.trim()) {
        errores.push("La ruta de la imagen es obligatoria");
        esValido = false;
    }

    if (errores.length > 0) {
        alert(errores.join("\n"));
        return false;
    }

    return esValido;
}

// Función para guardar el nuevo helado
async function guardarHelado() {
    // Verificar que se haya seleccionado una imagen
    if (!imagenSeleccionada) {
        alert("Debes seleccionar una imagen");
        return;
    }

    // Solo continua si la validación de campos es exitosa
    if (validarCampos()) {
        // Extraer y limpiar valores
        const nombre = nombreInput.value.trim();
        const descripcion = descripcionInput.value.trim();
        const precio = parseFloat(precioInput.value);
        const stock = parseInt(stockInput.value);

        // Verificamos que precio y stock sean números válidos
        if (isNaN(precio) || isNaN(stock)) {
            alert("El precio o el stock no son números válidos");
            return;
        }

        // Construir el objeto producto
        const nuevoHelado = {
            nombre,
            descripcion,
            precio, // Número
            stock,  // Número
            imagen: imagenSeleccionada
        };

        // Imprimir en consola para depurar
        console.log("Payload a enviar:", nuevoHelado);

        try {
            const respuesta = await fetch("http://localhost:3000/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoHelado)
            });

            if (respuesta.ok) {
                alert("Helado guardado correctamente");
                limpiarFormulario();
                cargarProductos(); // Recargar lista después de agregar
            } else {
                // Intentar obtener el mensaje de error de la respuesta
                const errorData = await respuesta.json();
                console.error("Error al guardar el producto:", errorData);
                alert("Error al guardar el producto: " + (errorData.mensaje || "desconocido"));
            }
        } catch (error) {
            console.error("Error al guardar el producto:", error);
            alert("Error al guardar el producto, revisa la consola para más detalles.");
        }
    }
}

function limpiarFormulario() {
    nombreInput.value = "";
    precioInput.value = "";
    stockInput.value = "";
    imagenInput.value = "";
    descripcionInput.value = "";
    previewImagen.innerHTML = "";
    imagenSeleccionada = null;
    mostrarConsultarHelado();
}

// Asignar evento al botón de guardar
btnGuardar.addEventListener('click', guardarHelado);

btnCancelar.addEventListener('click', function() {
    limpiarFormulario();
});

const imagenInput = document.getElementById('boton-llenar-imagen');
const previewImagen = document.getElementById('preview-imagen');
let imagenSeleccionada = null;

imagenInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImagen.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: contain;">`;
            imagenSeleccionada = e.target.result; // Guarda la imagen en base64
        };
        reader.readAsDataURL(file);
    }
});
/*
////////// USUARIOOO CARRITO CLIENTE //////////////

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
      <div style="display: none">
        <span>${producto.descripcion}</span>  
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
                <div style="display: none">${producto.descripcion}</div>
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
    div.innerHTML = message;
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
*/

