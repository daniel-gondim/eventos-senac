// Obtém a referência para o campo de dropdown de equipamentos
const equipamentosDropdown = document.querySelector(".equipamento-select");

function carregarEquipamentos() {
    fetch("http://localhost:8080/equipamentos")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao carregar os equipamentos.");
            }
        })
        .then(function (data) {
            // Limpa as opções existentes
            equipamentosDropdown.innerHTML = "";
            console.log(data);
            // Adiciona a opção padrão
            const opcaoPadrao = document.createElement("option");
            opcaoPadrao.value = "0";
            opcaoPadrao.textContent = "Escolha um equipamento";
            equipamentosDropdown.appendChild(opcaoPadrao);

            // Adiciona as opções dos equipamentos retornados pelo servidor
            data.forEach(function (equipamento) {
                const option = document.createElement("option");
                option.value = equipamento.id; // Supondo que o equipamento tenha um ID
                option.textContent = equipamento.descricao; // Supondo que o equipamento tenha um nome
                equipamentosDropdown.appendChild(option);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Chama a função para carregar os equipamentos quando a página é carregada
window.addEventListener("load", carregarEquipamentos);