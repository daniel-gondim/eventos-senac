const itens = [];
const formulario = document.getElementById("novo-form");
const InputDescricao = document.querySelector(".equipo-descricao");
const InputObservacao = document.querySelector(".equipo-observacao");

function salvar() {
    fetch("http://localhost:8080/equipamentos/create",
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
        .then(function (res) {
            if (res.ok) {
                console.log(res)
                window.location.replace("http://localhost:8080/equipamentos")
                window.location.href = "../templates/exibir_equipamentos.html";
                //window.location.replace("../templates/exibir_equipamentos.html");
            } else {
                console.log("Erro ao salvar o equipamento");
            }
        })
        .catch(function (res) {
            console.log("Erro na requisição:", res);
            console.log(res)
        });
};
function limpar() {
    InputDescricao.value = "",
        InputObservacao.value = ""
}
formulario.addEventListener('submit', function(event) {
    event.preventDefault()
    salvar()
    limpar();
    mostraLista();
});