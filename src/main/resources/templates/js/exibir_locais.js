const API_URL = "http://localhost:8080/locais";

// Função para buscar os dados da API
async function buscarLocais() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (Array.isArray(data)) {
      renderizarListaLocais(data);
    } else {
      console.error("A resposta da API não é um array válido.");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os locais:", error);
  }
}

// Função para renderizar a lista de locais
function renderizarListaLocais(locais) {
  // Substitua com o ID do elemento HTML onde você deseja exibir a lista
  const lista = document.getElementById("locais-lista");
  // Limpe o conteúdo da lista antes de adicionar os novos elementos
  lista.innerHTML = "";
  // Percorra o array de locais
  locais.forEach((local) => {
    // Chame a função para criar os elementos HTML de cada agenda
    const listLocal = criarElementosLocal(local);
    lista.appendChild(listLocal);
  });
}

function criarElementosLocal(local) {
  const listLocal = document.createElement("li"); // cria linha para armazenar descrição e observação do equipamento
  listLocal.className = "lista-locais__item";
  listLocal.id = `local-${local.id}`;

  const localNome = document.createElement("h3");
  localNome.className = "lista-locais__item__nome";
  localNome.textContent = `Local: ${local.nome}`;
  listLocal.appendChild(localNome);

  const localObservacao = document.createElement("h3");
  localObservacao.className = "lista-locais__item__observacao";
  localObservacao.textContent = `Observação: ${local.observacao}`;
  listLocal.appendChild(localObservacao);

  const buttons = document.createElement("div");
  buttons.className = "lista-locais__item__botoes";
  listLocal.appendChild(buttons);

  const editButton = document.createElement("button");
  editButton.className = "lista-locais__item__botaoEditar btn btn-primary";
  editButton.textContent = "Editar";
  listLocal.appendChild(editButton);
  buttons.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.className = "lista-locais__item__botaoDeletar btn btn-primary";
  deleteButton.textContent = "Excluir";
  listLocal.appendChild(deleteButton);
  buttons.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    excluirLocal(local.id);
  });

  function excluirLocal(id) {
    fetch(`http://localhost:8080/locais/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Erro ao excluir o local");
        } else {
          console.log("Local excluído com sucesso");
          // Remova o elemento da lista de locais exibida na página
          const localExcluir = document.getElementById(`local-${id}`);
          if (localExcluir) {
            localExcluir.remove();
          }
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao excluir o local:", error);
      });
  }

  // Variável para controlar o modo de edição
  let isEditMode = false;
  // Variáveis para armazenar os inputs de edição
  let inputLocalNome;
  let inputLocalObservacao;

  editButton.addEventListener("click", () => {
    // Alterne o modo de edição
    isEditMode = !isEditMode;

    if (isEditMode) {
      // Se entrar no modo de edição, crie os inputs para editar os campos da agenda
      inputLocalNome = document.createElement("input");
      inputLocalNome.value = local.nome;
      listLocal.replaceChild(inputLocalNome, localNome);

      inputLocalObservacao = document.createElement("input");
      inputLocalObservacao.value = local.observacao;
      listLocal.replaceChild(inputLocalObservacao, localObservacao);

      editButton.textContent = "Salvar";
    } else {
      // Se sair do modo de edição, salve os dados editados na API e renderize a agenda atualizada
      const updatedLocal = {
        nome: inputLocalNome.value,
        observacao: inputLocalObservacao.value,
      };

      fetch(`http://localhost:8080/locais/${local.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLocal),
      })
        .then((response) => response.json())
        .then((data) => {
          if (typeof data === "object" && data !== null) {
            // Verifica se os campos esperados estão presentes no objeto JSON
            if (
              data.hasOwnProperty("nome") &&
              data.hasOwnProperty("observacao")
            ) {
              // 'data' contém os dados da resposta da API
              console.log("Alterações salvas", data);
              // Atualize os dados originais do local com os dados retornados pela API
              local.nome = data.nome;
              local.observacao = data.observacao;
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
          console.error("Ocorreu um erro ao atualizar os locais:", error);
        });

      editButton.textContent = "Editar";
    }
  });

  // Função para renderizar o local com os dados atualizados
  function renderizarLocal(local) {
    localNome.textContent = `Local: ${local.nome}`;
    listLocal.replaceChild(localNome, inputLocalNome);

    localObservacao.textContent = `Observação: ${local.observacao}`;
    listLocal.replaceChild(localObservacao, inputLocalObservacao);
  }
  return listLocal;
}

buscarLocais();
