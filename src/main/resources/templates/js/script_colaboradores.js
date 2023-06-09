const formulario = document.getElementById("novo-form");
const InputNome = document.querySelector(".colaborador-nome");
const InputTipo = document.querySelector(".colaborador-tipo");

function salvar() {
    fetch("http://localhost:8080/colaboradores/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                nome: InputNome.value,
                tipo: InputTipo.value
            })
        })
        .then(function (res) {
            if (res.ok) {
                console.log(res)
                window.location.replace("http://localhost:8080/colaboradores")
                window.location.href = "../templates/exibir_colaboradores.html";
            } else {
                console.log("Erro ao salvar o equipamento");
            }
        })
        .catch(function (res) {
            console.log("Erro na requisição:", res);
            console.log(res)
        });
}
function limpar() {
    InputNome.value = "",
    InputTipo.value = ""
}
formulario.addEventListener('submit', function(event) {
    event.preventDefault()
    salvar()
    limpar();
});