document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register");
    const loginForm = document.getElementById("login-form");

    // 📝 Cadastro de Usuário
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const userData = {
            name: registerForm.elements[0].value,
            email: registerForm.elements[1].value,
            petName: registerForm.elements[2].value,
            petAge: registerForm.elements[3].value,
            password: registerForm.elements[4].value
        };

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            alert("Usuário cadastrado com sucesso!");
            registerForm.reset();
        })
        .catch(error => console.error("Erro ao cadastrar:", error));
    });

    // 🔐 Login de Usuário
    document.getElementById("login-form").addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita o recarregamento da página
    
        const email = document.querySelector("#login-form input[type='text']").value;
        const password = document.querySelector("#login-form input[type='password']").value;
    
        try {
            const response = await fetch("http://localhost:3000/users");
            const users = await response.json();
    
            // Verifica se existe um usuário com os mesmos dados
            const user = users.find(u => (u.email === email || u.name === email) && u.password === password);
    
            if (user) {
                alert("Login realizado com sucesso!");
                window.location.href = "../index.html"; // Redireciona para a página inicial
            } else {
                alert("Usuário ou senha incorretos!");
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    });
});