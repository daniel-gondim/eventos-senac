const API_URL = "http://localhost:8080/colaboradores";

// Função para buscar os dados da API
async function buscarColaboradores() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (Array.isArray(data)) {
      renderizarListaColaboradores(data);
    } else {
      console.error("A resposta da API não é um array válido.");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os colaboradores:", error);
  }
}

// Função para renderizar a lista de colaboradores
function renderizarListaColaboradores(colaboradores) {
  // Substitua com o ID do elemento HTML onde você deseja exibir a lista
  const lista = document.getElementById("colaboradores-lista");
  // Limpe o conteúdo da lista antes de adicionar os novos elementos
  lista.innerHTML = "";
  // Percorra o array de colaboradores
  colaboradores.forEach((colaborador) => {
    // Chame a função para criar os elementos HTML de cada agenda
    const listColaborador = criarElementosColaborador(colaborador);
    lista.appendChild(listColaborador);
  });
}

function criarElementosColaborador(colaborador) {
  const listColaborador = document.createElement("li"); // cria linha para armazenar descrição e observação do colaborador
  listColaborador.className = "lista-colaboradores__item";
  listColaborador.id = `colaborador-${colaborador.id}`;

  const colaboradorNome = document.createElement("h3");
  colaboradorNome.className = "lista-colaboradores__item__nome";
  colaboradorNome.textContent = `Nome: ${colaborador.nome}`;
  listColaborador.appendChild(colaboradorNome);

  const colaboradorTipo = document.createElement("h3");
  colaboradorTipo.className = "lista-colaboradores__item__tipo";
  colaboradorTipo.textContent = `Tipo: ${colaborador.tipo}`;
  listColaborador.appendChild(colaboradorTipo);

  const buttons = document.createElement("div");
  buttons.className = "lista-colaboradores__item__botoes";
  listColaborador.appendChild(buttons);

  const editButton = document.createElement("button");
  editButton.className =
    "lista-colaboradores__item__botaoEditar btn btn-primary";
  editButton.textContent = "Editar";
  listColaborador.appendChild(editButton);
  buttons.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.className =
    "lista-colaboradores__item__botaoDeletar btn btn-primary";
  deleteButton.textContent = "Excluir";
  listColaborador.appendChild(deleteButton);
  buttons.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    excluirColaborador(colaborador.id);
  });

  function excluirColaborador(id) {
    fetch(`http://localhost:8080/colaboradores/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Erro ao excluir o colaborador");
        } else {
          console.log("Colaborador excluído com sucesso");
          // Remova o elemento da lista de colaboradores exibida na página
          const colaboradorExcluir = document.getElementById(`colaborador-${id}`);
          if (colaboradorExcluir) {
            colaboradorExcluir.remove();
          }
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao excluir o colaborador:", error);
      });
  }

  // Variável para controlar o modo de edição
  let isEditMode = false;
  // Variáveis para armazenar os inputs de edição
  let inputColaboradorNome;
  let inputColaboradorTipo;

  editButton.addEventListener("click", () => {
    // Alterne o modo de edição
    isEditMode = !isEditMode;

    if (isEditMode) {
      // Se entrar no modo de edição, crie os inputs para editar os campos da agenda
      inputColaboradorNome = document.createElement("input");
      inputColaboradorNome.value = colaborador.nome;
      listColaborador.replaceChild(inputColaboradorNome, colaboradorNome);

      inputColaboradorTipo = document.createElement("input");
      inputColaboradorTipo.value = colaborador.tipo;
      listColaborador.replaceChild(inputColaboradorTipo, colaboradorTipo);

      editButton.textContent = "Salvar";
    } else {
      // Se sair do modo de edição, salve os dados editados na API e renderize a agenda atualizada
      const updateColaborador = {
        nome: inputColaboradorNome.value,
        tipo: inputColaboradorTipo.value,
      };

      fetch(`http://localhost:8080/colaboradores/${colaborador.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateColaborador),
      })
        .then((response) => response.json())
        .then((data) => {
          if (typeof data === "object" && data !== null) {
            // Verifica se os campos esperados estão presentes no objeto JSON
            if (data.hasOwnProperty("nome") && data.hasOwnProperty("tipo")) {
              // 'data' contém os dados da resposta da API
              console.log("Alterações salvas", data);
              // Atualize os dados originais do colaborador com os dados retornados pela API
              colaborador.nome = data.nome;
              colaborador.tipo = data.tipo;
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
          console.error(
            "Ocorreu um erro ao atualizar os colaboradores:",
            error
          );
        });

      editButton.textContent = "Editar";
    }
  });

  // Função para renderizar o colaborador com os dados atualizados
  function renderizarLocal(colaborador) {
    colaboradorNome.textContent = `Nome: ${colaborador.nome}`;
    listColaborador.replaceChild(colaboradorNome, inputColaboradorNome);

    colaboradorTipo.textContent = `Tipo: ${colaborador.tipo}`;
    listColaborador.replaceChild(colaboradorTipo, inputColaboradorTipo);
  }
  return listColaborador;
}

buscarColaboradores();
