document.addEventListener('DOMContentLoaded', async () => {
    const email = localStorage.getItem("email");

    if (!email) {
        alert("No se encontró la información del usuario. Por favor inicia sesión.");
        window.location.href = "/login";
        return;
    }

    try {
        const res = await fetch(`/api/usuarios/perfil/${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error("Error al consultar perfil");

        const data = await res.json();


        document.getElementById("nombre").textContent = data.nombre;
        document.getElementById("email").textContent = data.email;
        document.getElementById("cedula").textContent = data.cedula;
        document.getElementById("password").textContent = data.password;
        document.getElementById("phone").textContent = data.phone;
    } catch (err) {
        console.error(err);
        alert("Error al cargar los datos del perfil");
    }
});