document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita o redirecionamento

        const formData = new FormData(form);

        fetch("https://formsubmit.co/ajax/prof.semjuv@gmail.com", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert("Formulário enviado com sucesso!"); // Mensagem de confirmação
            form.reset(); // Limpa os campos do formulário
        })
        .catch(error => {
            alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
            console.error("Erro:", error);
        });
    });
});
