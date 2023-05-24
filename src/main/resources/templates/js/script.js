const formulario = document.querySelector(".novo-form");
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
        .then(function (res) {console.log(res) })
        .catch(function (res) {console.log(res) })
        // window.location.replace("http://localhost:8080/equipamentos");
        window.location.replace("../templates/equipamentos.html");
}

function limpar() {
    InputDescricao.value = "",
    InputObservacao.value = ""
}

// suposto método para adicionar itens na tabela tirado do código do Rafael
function salvarItem() {
    var itemInput = document.getElementById('itemInput');
    var itemText = itemInput.value;

    if (itemText !== '') {
        var itemList = document.getElementById('itemList');
        var novoItem = document.createElement('li');
        novoItem.textContent = itemText;
        itemList.appendChild(novoItem);

        itemInput.value = '';
    }

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        salvar();
        limpar();
    });
}