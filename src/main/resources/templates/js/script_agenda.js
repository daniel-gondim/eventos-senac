const formularioAgenda = document.getElementById("form-container");
const InputTitulo = document.querySelector(".agenda-titulo");
const InputDataInicio = document.querySelector(".agenda-dataInicio");
const InputDataTermino = document.querySelector(".agenda-dataTermino");
const InputObservacao = document.querySelector(".agenda-observacao");
// const InputColaborador = document.querySelector(".colaborador");
// const InputLocal = document.querySelector(".local");
const InputEquipamento = document.querySelector(".equipamento-select");

function salvar() {
    fetch("http://localhost:8080/agendas",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                titulo: InputTitulo.value,
                dataInicio: InputDataInicio.value,
                dataTermino: InputDataTermino.value,
                observacao: InputObservacao.value,
                // colaborador: InputColaborador.value,
                // local: InputLocal.value,
                equipamento: InputEquipamento.value
            })
        })
        .then(function (res) {
            if (res.ok) {
                console.log(res);
                window.location.replace("http://localhost:8080/agendas");
                window.location.href = "../templates/home.html";
            } else {
                console.log("Erro ao salvar a agenda.")
            }
        })
        .catch(function (res) {
            console.log("Erro na requisição:", res);
            console.log(res)
        });
}

function limpar() {
    InputTitulo.value = ""
    InputDataInicio.value = ""
    InputDataTermino.value = ""
    InputObservacao.value = ""
    // InputColaborador.value = "",
    // InputLocal.value = "",
    InputEquipamento.value = ""
}

formularioAgenda.addEventListener('submit', function(event) {
    event.preventDefault()
    salvar()
    limpar();
})

InputEquipamento.addEventListener('change', function(event) {
    InputEquipamento.value = event.target.value;
});

