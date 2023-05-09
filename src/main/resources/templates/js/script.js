const formulario = document.querySelector(".novo-form");
const InputDescricao = document.querySelector(".equipo-descricao");
const InputObservacao = document.querySelector(".equipo-observacao");

function salvar() {
    fetch("http://localhost:8080/equipamento/create",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                descricao: InputDescricao.value,
                observacao: InputObservacao.value
            })
        })
        .then(function (res) {console.log(res) })
        .catch(function (res) {console.log(res) })
};

function limpar() {
    InputDescricao.value = "",
        InputObservacao.value = ""
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    salvar();
    limpar();
});