const formulario = document.querySelector("novo-form");
const InputDescricao = document.querySelector("equipo-descricao");
const InputObservacao = document.querySelector("equipo-observacao");

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(InputDescricao.value);
});
