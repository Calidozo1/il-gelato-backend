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
            localStorage.setItem("email", data.perfil.email);
            alert("Inicio de sesión exitoso.");
            const landingPage = document.querySelector(".landing-page");
            const noShow = document.querySelector(".noShow");
            const seccionCliente = document.getElementById("seccionCliente");
            const seccionAdmin = document.getElementById("seccionAdmin");
            if (data.perfil.esAdmin) {
                window.location.href = '/catalogo';
                landingPage.style.display = "none";
                noShow.style.display = "block";
                seccionCliente.style.display = "none";
                seccionAdmin.style.display = "block";

            } else {
                window.location.href = '/catalogo';
                landingPage.style.display = "none";
                noShow.style.display = "block";
                seccionCliente.style.display = "block";
                seccionAdmin.style.display = "none";
            }
        } else {
            alert("Error: " + data.mensaje);
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error de conexión con el servidor.");
    }
});