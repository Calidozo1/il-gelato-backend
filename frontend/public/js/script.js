const productos = [
    { id: 1, nombre: "Gelato de Pistacho", precio: 5, stock: 12, descripcion: "Un exquisito pistacho italiano se fusiona con la cremosidad del gelato, creando una experiencia de sabor elegante y sofisticada.", imagen: "/img/icecream.png" },
    { id: 2, nombre: "Gelato de Chocolate", precio: 4.5, stock: 2, descripcion: "El chocolate más fino se transforma en un gelato seductor, lleno de matices y con un toque de indulgencia irresistible.", imagen: "/img/icecream.png" },
    { id: 3, nombre: "Gelato de Fresa", precio: 4, stock: 44, descripcion: "Fresas frescas y jugosas se mezclan en un gelato vibrante, perfecto para deleitar los sentidos y refrescar el paladar.", imagen: "/img/food.png" },
    { id: 4, nombre: "Gelato de Vainilla", precio: 4, stock: 18, descripcion: "La vainilla de Madagascar eleva este gelato a un clásico sublime, suave y aromático, ideal para cualquier ocasión.", imagen: "/img/icecream.png" },
    { id: 5, nombre: "Gelato de Limón", precio: 3.5, stock: 9, descripcion: "Un toque de limón siciliano confiere frescura y energía, convirtiendo cada bocado en una explosión cítrica y revitalizante.", imagen: "/img/food.png" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const listaProductos = document.getElementById("listaProductos");
const cartAside = document.getElementById("cartAside");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const botonNuevoHelado = document.querySelector('.boton-nuevo-helado');
const consultarHeladoTodo = document.querySelector('.consultar-helado-todo');

// Cambio de Ventanas
function mostrarCliente() {
  document.getElementById('seccionCliente').classList.remove('oculto');
  document.getElementById('seccionAdmin').classList.add('oculto');
}
function mostrarAdministrador() {
  document.getElementById('seccionCliente').classList.add('oculto');
  document.getElementById('seccionAdmin').classList.remove('oculto');
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

// Variables de paginación
let paginaActual = 1;
const heladosPorPagina = 4;

// Elementos de la tabla de administrador
const contenedorFilas = document.getElementById('contenedor-filas');

// Popup modal
const modalOverlay = document.getElementById('modal-overlay');
const cerrarPopup = document.querySelector('.cerrar-popup');

function abrirPopup(helado) {
  document.getElementById('helado-nombre').textContent = `${helado.nombre}`;
  document.getElementById('helado-stock').textContent = `${helado.stock}`;
  document.getElementById('helado-id').textContent = `${helado.id}`;
  document.getElementById('helado-precio').textContent = `${helado.precio}`;
  document.getElementById('helado-descripcion').textContent = `${helado.descripcion}`;
  modalOverlay.style.display = 'flex';
}

function cerrarModal() {
  modalOverlay.style.display = 'none';
}

function renderizarHelados(heladosAMostrar = productos) {
  const inicio = (paginaActual - 1) * heladosPorPagina;
  const fin = inicio + heladosPorPagina;
  const heladosPagina = heladosAMostrar.slice(inicio, fin);

  contenedorFilas.innerHTML = ''; // Limpiar la tabla

  heladosPagina.forEach((producto, index) => {
    const fila = document.createElement('div');
    fila.className = 'fila-datos';
    fila.innerHTML = `
      <div class="ID">${producto.id}</div>
      <div class="nombre">${producto.nombre}</div>
      <div class="precio">${producto.precio}</div>
      <div class="info">
        <img src="/img/icono-info.png" alt="info" width="20" height="20">
      </div>
    `;
    contenedorFilas.appendChild(fila);
    const linea = document.createElement('div');
    linea.className = 'linea-contenedor';
    contenedorFilas.appendChild(linea);
  });
}


function actualizarPaginaActual() {
  document.getElementById('pagina-actual').textContent = paginaActual;
}

function asignarEventosPopup(heladosAMostrar = productos) {
  const iconosInfo = document.querySelectorAll('.info img');
  iconosInfo.forEach((icono, index) => {
    icono.addEventListener('click', () => {
      const inicio = (paginaActual - 1) * heladosPorPagina;
      const helado = heladosAMostrar[inicio + index];
      if (helado) abrirPopup(helado);
    });
  });
  cerrarPopup.addEventListener('click', cerrarModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      cerrarModal();
    }
  });
}

// Renderizar productos en la tienda
function renderizarProductosTienda() {
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
}

// Paginación
function manejarPaginacion(heladosAMostrar = productos) {
  renderizarHelados(heladosAMostrar);
  actualizarPaginaActual();
  asignarEventosPopup();
}

document.getElementById('anterior').addEventListener('click', () => {
  if (paginaActual > 1) {
    paginaActual--;
    manejarPaginacion();
  }
});

document.getElementById('siguiente').addEventListener('click', () => {
  const totalPaginas = Math.ceil(productos.length / heladosPorPagina);
  if (paginaActual < totalPaginas) {
    paginaActual++;
    manejarPaginacion();
  }
});
function filtrarHelados(texto) {
  if (!texto) return productos; // Si no hay texto, devuelve todos
  return productos.filter(producto =>
    producto.nombre.toLowerCase().includes(texto.toLowerCase())
  );
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

inputBuscar?.addEventListener('input', function() {
  const texto = this.value.trim();
  const heladosFiltrados = filtrarHelados(texto);
  paginaActual = 1;
  manejarPaginacion(heladosFiltrados);
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
  consultarHeladoTodo.style.display = 'none';
  // Aquí puedes mostrar el formulario para agregar un nuevo helado si lo tienes-------------------------------------
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
function validarCampos() {
  let esValido = true;
  const errores = [];

  // Validar nombre
  if (!nombreInput.value.trim()) {
    errores.push('El nombre es obligatorio');
    esValido = false;
  }

  // Validar ID (debe ser número y no estar vacío)
  if (!idInput.value.trim()) {
    errores.push('El ID es obligatorio');
    esValido = false;
  } else if (isNaN(idInput.value)) {
    errores.push('El ID debe ser un número');
    esValido = false;
  } else if (productos.some(p => p.id === parseInt(idInput.value))) {
    errores.push('El ID ya existe');
    esValido = false;
  }

  // Validar precio (debe ser número y no estar vacío)
  if (!precioInput.value.trim()) {
    errores.push('El precio es obligatorio');
    esValido = false;
  } else if (isNaN(precioInput.value)) {
    errores.push('El precio debe ser un número');
    esValido = false;
  }

  // Validar stock (debe ser número y no estar vacío)
  if (!stockInput.value.trim()) {
    errores.push('La cantidad es obligatoria');
    esValido = false;
  } else if (isNaN(stockInput.value)) {
    errores.push('La cantidad debe ser un número');
    esValido = false;
  } else if (parseInt(stockInput.value) < 0) {
    errores.push('La cantidad no puede ser negativa');
    esValido = false;
  }

  // Validar imagen (debe estar presente)
  if (!imagenInput.value.trim()) {
    errores.push('La ruta de la imagen es obligatoria');
    esValido = false;
  }

  // Validar descripción
  if (!descripcionInput.value.trim()) {
    errores.push('La descripción es obligatoria');
    esValido = false;
  }

  // Mostrar errores si los hay
  if (errores.length > 0) {
    alert(errores.join('\n'));
  }

  return esValido;
}

// Función para guardar el nuevo helado
function guardarHelado() {
  if (!imagenSeleccionada) {
    alert('Debes seleccionar una imagen');
    return;
  }
  if (validarCampos()) {
    const nuevoHelado = {
      id: parseInt(idInput.value),
      nombre: nombreInput.value.trim(),
      precio: parseFloat(precioInput.value),
      stock: parseInt(stockInput.value),
      descripcion: descripcionInput.value.trim(),
      imagen: imagenSeleccionada
    };
    productos.push(nuevoHelado);
    alert('Helado guardado correctamente');
    // Limpiar los campos
    nombreInput.value = '';
    idInput.value = '';
    precioInput.value = '';
    stockInput.value = '';
    imagenInput.value = '';
    descripcionInput.value = '';
    previewImagen.innerHTML = '';
    imagenSeleccionada = null;
    // Actualizar la tabla de administrador
    renderizarHelados();
    actualizarPaginaActual();
    asignarEventosPopup();
    // Actualizar la tienda
    renderizarProductosTienda();
  }
}
function renderizarProductosTienda() {
  listaProductos.innerHTML = ''; // Limpiar antes de renderizar
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
}




// Asignar evento al botón de guardar
btnGuardar.addEventListener('click', guardarHelado);

// Opcional: evento para cancelar (limpiar campos)
btnCancelar.addEventListener('click', function() {
  nombreInput.value = '';
  idInput.value = '';
  precioInput.value = '';
  stockInput.value = '';
  imagenInput.value = '';
  descripcionInput.value = '';
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



//                     Usuario

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
        alert("El carrito ya está vacío. ¡Añade algunos helados deliciosos!");
    } else {
        carrito.length = 0;
        renderizarCarrito();
        alert("Has vaciado tu carrito. ¡Esperamos verte pronto!");
    }
});

// Cargar carrito inicial
renderizarCarrito();


