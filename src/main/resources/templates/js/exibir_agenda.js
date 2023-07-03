// Constante para armazenar a URL da API
const API_URL = "http://localhost:8080/agendas";

// Função para buscar os dados da API
async function buscarAgendas() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (Array.isArray(data)) {
      renderizarListaAgendas(data);
    } else {
      console.error("A resposta da API não é um array válido.");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao buscar as agendas:", error);
  }
}

// Função para renderizar a lista de agendas
function renderizarListaAgendas(agendas) {
  // Substitua com o ID do elemento HTML onde você deseja exibir a lista
  const lista = document.getElementById("agendas-lista");
  // Limpe o conteúdo da lista antes de adicionar os novos elementos
  lista.innerHTML = "";
  // Percorra o array de agendas
  agendas.forEach((agenda) => {
    // Chame a função para criar os elementos HTML de cada agenda
    const listAgenda = criarElementosAgenda(agenda);
    lista.appendChild(listAgenda);
  });
}

function criarElementosAgenda(agenda) {
  const listAgenda = document.createElement("li");
  listAgenda.className = "lista-agendas__item";
  listAgenda.id = `agenda-${agenda.id}`;

  const agendaTitulo = document.createElement("h1");
  agendaTitulo.className = "lista-agendas__item__titulo";
  agendaTitulo.textContent = `${agenda.titulo}`;
  listAgenda.appendChild(agendaTitulo);

  //Criar um objeto Data a partir do valor do input
  const dataInicio = new Date(agenda.dataInicio);

  const diaInicio = dataInicio.getDate();
  const mesInicio = dataInicio.getMonth() + 1;
  const anoInicio = dataInicio.getFullYear();
  const horasInicio = dataInicio.getHours() + 3;
  const minutosInicio = dataInicio.getMinutes();

  const diaInicioFormatado = diaInicio.toString().padStart(2, "0");
  const mesInicioFormatado = mesInicio.toString().padStart(2, "0");
  const horasInicioFormatada = horasInicio.toString().padStart(2, "0");
  const minutosInicioFormatado = minutosInicio.toString().padStart(2, "0");

  const dataInicioFormatada = `${diaInicioFormatado}/${mesInicioFormatado}/${anoInicio} - ${horasInicioFormatada}:${minutosInicioFormatado}`;

  const agendaDataInicio = document.createElement("h3");
  agendaDataInicio.className = "lista-agendas__item__dataInicio";
  agendaDataInicio.textContent = `Data Início: ${dataInicioFormatada}`;
  listAgenda.appendChild(agendaDataInicio);

  //Criar um objeto Data a partir do valor do input
  const dataTermino = new Date(agenda.dataTermino);

  const diaTermino = dataTermino.getDate();
  const mesTermino = dataTermino.getMonth() + 1;
  const anoTermino = dataTermino.getFullYear();
  const horasTermino = dataTermino.getHours() + 3;
  const minutosTermino = dataTermino.getMinutes();

  const diaTerminoFormatado = diaTermino.toString().padStart(2, "0");
  const mesTerminoFormatado = mesTermino.toString().padStart(2, "0");
  const horasTerminoFormatada = horasTermino.toString().padStart(2, "0");
  const minutosTerminoFormatado = minutosTermino.toString().padStart(2, "0");

  const dataTerminoFormatada = `${diaTerminoFormatado}/${mesTerminoFormatado}/${anoTermino} - ${horasTerminoFormatada}:${minutosTerminoFormatado}`;

  const agendaDataTermino = document.createElement("h3");
  agendaDataTermino.className = "lista-agendas__item__dataTermino";
  agendaDataTermino.textContent = `Data Término: ${dataTerminoFormatada}`;
  listAgenda.appendChild(agendaDataTermino);

  const agendaObservacao = document.createElement("h3");
  agendaObservacao.className = "lista-agendas__item__observacao";
  agendaObservacao.textContent = `Observação: ${agenda.observacao}`;
  listAgenda.appendChild(agendaObservacao);

  const agendaEquipamento = document.createElement("h3");
  agendaEquipamento.className = "lista-agendas__item__equipamento";
  agendaEquipamento.textContent = `Equipamento: ${agenda.equipamento || ""}`;
  listAgenda.appendChild(agendaEquipamento);

  const editButton = document.createElement("button");
  editButton.className = "lista-agendas__item__botaoEditar btn btn-primary";
  editButton.textContent = "Editar";
  listAgenda.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.className = "lista-agendas__item__botaoDeletar btn btn-primary";
  deleteButton.textContent = "Excluir";
  listAgenda.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    excluirAgenda(agenda.id);
  });

  // Variável para controlar o modo de edição
  let isEditMode = false;
  // Variáveis para armazenar os inputs de edição
  let inputAgendaTitulo;
  let inputAgendaDataInicio;
  let inputAgendaDataTermino;
  let inputAgendaObservacao;
  let inputAgendaEquipamento;

  editButton.addEventListener("click", () => {
    // Alterne o modo de edição
    isEditMode = !isEditMode;

    if (isEditMode) {
      // Se entrar no modo de edição, crie os inputs para editar os campos da agenda
      inputAgendaTitulo = document.createElement("input");
      inputAgendaTitulo.value = agenda.titulo;
      listAgenda.replaceChild(inputAgendaTitulo, agendaTitulo);

      inputAgendaDataInicio = document.createElement("input");
      inputAgendaDataInicio.type = "datetime-local";
      const dataInicioSalva = new Date(agenda.dataInicio);
      const dataInicioFormatada = dataInicioSalva.toISOString();
      const dataInicioFinal = dataInicioFormatada.slice(0, 16);
      inputAgendaDataInicio.value = dataInicioFinal;
      listAgenda.replaceChild(inputAgendaDataInicio, agendaDataInicio);

      inputAgendaDataTermino = document.createElement("input");
      inputAgendaDataTermino.type = "datetime-local";
      const dataTerminoSalva = new Date(agenda.dataTermino);
      const dataTerminoFormatada = dataTerminoSalva.toISOString();
      const dataTerminoFinal = dataTerminoFormatada.slice(0, 16);
      inputAgendaDataTermino.value = dataTerminoFinal;
      listAgenda.replaceChild(inputAgendaDataTermino, agendaDataTermino);

      inputAgendaObservacao = document.createElement("input");
      inputAgendaObservacao.value = agenda.observacao;
      listAgenda.replaceChild(inputAgendaObservacao, agendaObservacao);

      editButton.textContent = "Salvar";
    } else {
      // Se sair do modo de edição, salve os dados editados na API e renderize a agenda atualizada
      const updatedAgenda = {
        titulo: inputAgendaTitulo.value,
        dataInicio: inputAgendaDataInicio.value,
        dataTermino: inputAgendaDataTermino.value,
        observacao: inputAgendaObservacao.value
        // equipamento: inputAgendaEquipamento.value
      };

      fetch(`http://localhost:8080/agendas/${agenda.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAgenda),
      })
        .then((response) => response.json())
        .then((data) => {
          if (typeof data === "object" && data !== null) {
            // Verifica se os campos esperados estão presentes no objeto JSON
            if (
              data.hasOwnProperty("titulo") &&
              data.hasOwnProperty("observacao")
            ) {
              // 'data' contém os dados da resposta da API
              console.log("Alterações salvas", data);
              // Atualize os dados originais da agenda com os dados retornados pela API
              agenda.titulo = data.titulo;
              agenda.dataInicio = data.dataInicio;
              agenda.dataTermino = data.dataTermino;
              agenda.observacao = data.observacao;
              agenda.equipamento = data.equipamento;
              // Renderize a agenda com os dados atualizados
              renderizarAgenda(data);
            } else {
              console.error("A resposta da API não contem campos esperados");
            }
          } else {
            console.error("A resposta da API não é um objeto JSON válido.");
          }
        })
        .catch((error) => {
          console.error("Ocorreu um erro ao atualizar a agenda:", error);
        });

      editButton.textContent = "Editar";
    }
  });

  // Função para renderizar a agenda com os dados atualizados
  function renderizarAgenda(agenda) {
    agendaTitulo.textContent = `${agenda.titulo}`;
    listAgenda.replaceChild(agendaTitulo, inputAgendaTitulo);

    const dataInicio = new Date(agenda.dataInicio);
    const diaInicio = dataInicio.getDate();
    const mesInicio = dataInicio.getMonth() + 1;
    const anoInicio = dataInicio.getFullYear();
    const horasInicio = dataInicio.getHours() + 3;
    const minutosInicio = dataInicio.getMinutes();

    const diaInicioFormatado = diaInicio.toString().padStart(2, "0");
    const mesInicioFormatado = mesInicio.toString().padStart(2, "0");
    const horasInicioFormatada = horasInicio.toString().padStart(2, "0");
    const minutosInicioFormatado = minutosInicio.toString().padStart(2, "0");

    const dataInicioFormatada = `${diaInicioFormatado}/${mesInicioFormatado}/${anoInicio} - ${horasInicioFormatada}:${minutosInicioFormatado}`;
    agendaDataInicio.textContent = `Data Início: ${dataInicioFormatada}`;
    listAgenda.replaceChild(agendaDataInicio, inputAgendaDataInicio);

    const dataTermino = new Date(agenda.dataTermino);
    const diaTermino = dataTermino.getDate();
    const mesTermino = dataTermino.getMonth() + 1;
    const anoTermino = dataTermino.getFullYear();
    const horasTermino = dataTermino.getHours() + 3;
    const minutosTermino = dataTermino.getMinutes();

    const diaTerminoFormatado = diaTermino.toString().padStart(2, "0");
    const mesTerminoFormatado = mesTermino.toString().padStart(2, "0");
    const horasTerminoFormatada = horasTermino.toString().padStart(2, "0");
    const minutosTerminoFormatado = minutosTermino.toString().padStart(2, "0");

    const dataTerminoFormatada = `${diaTerminoFormatado}/${mesTerminoFormatado}/${anoTermino} - ${horasTerminoFormatada}:${minutosTerminoFormatado}`;
    agendaDataTermino.textContent = `Data Término: ${dataTerminoFormatada}`;
    listAgenda.replaceChild(agendaDataTermino, inputAgendaDataTermino);

    agendaObservacao.textContent = `Observação: ${agenda.observacao}`;
    listAgenda.replaceChild(agendaObservacao, inputAgendaObservacao);
  }
  return listAgenda;
}

// Função para excluir uma agenda
async function excluirAgenda(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Agenda excluída com sucesso");
      const elementoExcluir = document.getElementById(`agenda-${id}`);
      if (elementoExcluir) {
        elementoExcluir.remove();
      }
    } else {
      console.error("Erro ao excluir a agenda");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao excluir a agenda:", error);
  }
}

buscarAgendas();
