const formulario = document.getElementById("novo-form");
const InputNome = document.querySelector(".local-nome");
const InputObservacao = document.querySelector(".local-observacao");

function salvar() {
    fetch("http://localhost:8080/locais/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                nome: InputNome.value,
                observacao: InputObservacao.value
            })
        })
        .then(function (res) {
            if (res.ok) {
                console.log(res)
                window.location.replace("http://localhost:8080/locais")
                window.location.href = "../templates/locais.html";
                //window.location.replace("../templates/exibir_equipamentos.html");
            } else {
                console.log("Erro ao salvar o local");
            }
        })
        .catch(function (res) {
            console.log("Erro na requisição:", res);
            console.log(res)
        });
}
function limpar() {
    InputNome.value = "",
    InputObservacao.value = ""
}
formulario.addEventListener('submit', function(event) {
    event.preventDefault()
    salvar()
    limpar();
});