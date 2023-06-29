const API_URL = "http://localhost:8080/equipamentos";

// Função para buscar os dados da API
async function buscarEquipamentos() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (Array.isArray(data)) {
      renderizarListaEquipamentos(data);
    } else {
      console.error("A resposta da API não é um array válido.");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os equipamentos:", error);
  }
}

// Função para renderizar a lista de equipamentos
function renderizarListaEquipamentos(equipamentos) {
  // Substitua com o ID do elemento HTML onde você deseja exibir a lista
  const lista = document.getElementById("equipamentos-lista");
  // Limpe o conteúdo da lista antes de adicionar os novos elementos
  lista.innerHTML = "";
  // Percorra o array de equipamentos
  equipamentos.forEach((equipamento) => {
    // Chame a função para criar os elementos HTML de cada agenda
    const listEquipamento = criarElementosLocal(equipamento);
    lista.appendChild(listEquipamento);
  });
}

function criarElementosLocal(equipamento) {
  const listEquipamento = document.createElement("li"); // cria linha para armazenar descrição e observação do equipamento
  listEquipamento.className = "lista-equipamentos__item";
  listEquipamento.id = `equipamento-${equipamento.id}`;

  const equipamentoDescricao = document.createElement("h3");
  equipamentoDescricao.className = "lista-equipamentos__item__descricao";
  equipamentoDescricao.textContent = `Descrição: ${equipamento.descricao}`;
  listEquipamento.appendChild(equipamentoDescricao);

  const equipamentoObservacao = document.createElement("h3");
  equipamentoObservacao.className = "lista-equipamentos__item__observacao";
  equipamentoObservacao.textContent = `Observação: ${equipamento.observacao}`;
  listEquipamento.appendChild(equipamentoObservacao);

  const buttons = document.createElement("div");
  buttons.className = "lista-equipamentos__item__botoes";
  listEquipamento.appendChild(buttons);

  const editButton = document.createElement("button");
  editButton.className =
    "lista-equipamentos__item__botaoEditar btn btn-primary";
  editButton.textContent = "Editar";
  listEquipamento.appendChild(editButton);
  buttons.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.className =
    "lista-equipamentos__item__botaoDeletar btn btn-primary";
  deleteButton.textContent = "Excluir";
  listEquipamento.appendChild(deleteButton);
  buttons.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    excluirEquipamento(equipamento.id);
  });

  function excluirEquipamento(id) {
    fetch(`http://localhost:8080/equipamentos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Erro ao excluir o equipamento");
        } else {
          console.log("Equipamento excluído com sucesso");
          // Remova o elemento da lista de equipamentos exibida na página
          const equipamentoExcluir = document.getElementById(
            `equipamento-${id}`
          );
          if (equipamentoExcluir) {
            equipamentoExcluir.remove();
          }
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao excluir o equipamento:", error);
      });
  }

  // Variável para controlar o modo de edição
  let isEditMode = false;
  // Variáveis para armazenar os inputs de edição
  let inputEquipamentoDescricao;
  let inputEquipamentoObservacao;

  editButton.addEventListener("click", () => {
    // Alterne o modo de edição
    isEditMode = !isEditMode;

    if (isEditMode) {
      // Se entrar no modo de edição, crie os inputs para editar os campos da agenda
      inputEquipamentoDescricao = document.createElement("input");
      inputEquipamentoDescricao.value = equipamento.descricao;
      listEquipamento.replaceChild(
        inputEquipamentoDescricao,
        equipamentoDescricao
      );

      inputEquipamentoObservacao = document.createElement("input");
      inputEquipamentoObservacao.value = equipamento.observacao;
      listEquipamento.replaceChild(
        inputEquipamentoObservacao,
        equipamentoObservacao
      );

      editButton.textContent = "Salvar";
    } else {
      // Se sair do modo de edição, salve os dados editados na API e renderize a agenda atualizada
      const updatedEquipamento = {
        descricao: inputEquipamentoDescricao.value,
        observacao: inputEquipamentoObservacao.value,
      };

      fetch(`http://localhost:8080/equipamentos/${equipamento.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEquipamento),
      })
        .then((response) => response.json())
        .then((data) => {
          if (typeof data === "object" && data !== null) {
            // Verifica se os campos esperados estão presentes no objeto JSON
            if (
              data.hasOwnProperty("descricao") &&
              data.hasOwnProperty("observacao")
            ) {
              // 'data' contém os dados da resposta da API
              console.log("Alterações salvas", data);
              // Atualize os dados originais do equipamento com os dados retornados pela API
              equipamento.descricao = data.descricao;
              equipamento.observacao = data.observacao;
              // Renderize a agenda com os dados atualizados
              renderizarLocal(data);
            } else {
              console.error("A resposta da API não contem campos esperados");
            }
          } else {
            console.error("A resposta da API não é um objeto JSON válido.");
          }
        })
        .catch((error) => {
          console.error("Ocorreu um erro ao atualizar os equipamentos:", error);
        });

      editButton.textContent = "Editar";
    }
  });

  // Função para renderizar o equipamento com os dados atualizados
  function renderizarLocal(equipamento) {
    equipamentoDescricao.textContent = `Descrição: ${equipamento.descricao}`;
    listEquipamento.replaceChild(
      equipamentoDescricao,
      inputEquipamentoDescricao
    );

    equipamentoObservacao.textContent = `Observação: ${equipamento.observacao}`;
    listEquipamento.replaceChild(
      equipamentoObservacao,
      inputEquipamentoObservacao
    );
  }
  return listEquipamento;
}

buscarEquipamentos();
