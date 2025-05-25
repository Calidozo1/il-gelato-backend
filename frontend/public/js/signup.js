document.querySelector('.login-button').addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Por favor completa todos los campos.");
        return;
    }

    try {
        const res = await fetch('/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Inicio de sesión exitoso.");
            // Puedes redirigir al usuario a otra vista
            window.location.href = '/fronted/views/index.html';
        } else {
            alert("Error: " + data.mensaje);
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error de conexión con el servidor.");
    }
});