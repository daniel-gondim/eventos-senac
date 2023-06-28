etch('http://localhost:8080/agendas')
    .then(response => response.json()) // converte a resposta para JSON
    .then(data => {
            // 'data' contém os dados da resposta da API
            console.log(data); // exibe os dados no console
            const lista = document.getElementById('equipamentos-lista'); // substitua com o ID do elemento HTML onde você deseja exibir a lista

            function excluirAgenda(id) {
                fetch(`http://localhost:8080/agendas/${id}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("Agenda excluída com sucesso");
                            // Remova o elemento da lista de agendas exibida na página
                            const elementoExcluir = document.getElementById(`agenda-${id}`);
                            if (elementoExcluir) {
                                elementoExcluir.remove();
                            }
                        } else {
                            console.error("Erro ao excluir a agenda");
                        }
                    })
                    .catch(error => {
                        console.error("Ocorreu um erro ao excluir a agenda:", error);
                    });
            }

            data.forEach(agenda => {
                    const listAgenda = document.createElement('li'); // cria linha para armazenar descrição e observação do equipamento
                    listAgenda.className = "lista-equipamentos__item";
                    listAgenda.id = `agenda-${agenda.id}`
                    const agendaInfo = `${agenda.titulo} - ${agenda.dataInicio} - ${agenda.dataTermino} ${agenda.observacao} -`; // Concatenando descrição e observação
                    listAgenda.textContent = agendaInfo;

                    const editButton = document.createElement('button');
                    editButton.className = "lista-agendas__item__botao";
                    editButton.textContent = 'Editar';
                    listAgenda.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.className = "lista-agendas__item__botao";
                    deleteButton.textContent = 'Excluir';
                    listAgenda.appendChild(deleteButton);

                    deleteButton.addEventListener('click', () => {
                        // Chame a função de exclusão passando o ID do equipamento
                        excluirAgenda(agenda.id);
                    });


                    let isEditMode = false; //variável para controlar o modo de edição
                    let inputAgendaTitulo;
                    let inputAgendaDataInicio;
                    let inputAgendaDataTermino;
                    let inputAgendaObservacao;

                    editButton.addEventListener('click', () => {
                        if (isEditMode) {
                            if (inputAgendaTitulo.value !== agenda.titulo || inputAgendaDataInicio.value !== agenda.observacao) {
                                const updateAgenda = {
                                    titulo: inputAgendaTitulo.value,
                                    dataInicio: inputAgendaDataInicio.value,
                                    dataTermino: inputAgendaDataTermino.value,
                                    observacao: inputAgendaObservacao.value
                                };

                                fetch(`http://localhost:8080/equipamentos/${agenda.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(updateAgenda)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (typeof data === 'object' && data !== null) {
                                            // Verifica se os campos esperados estão presentes no objeto JSON
                                            if (data.hasOwnProperty('titulo') && data.hasOwnProperty('observacao')) {
                                                // 'data' contém os dados da resposta da API
                                                console.log("Alterações salvas", data);
                                            } else {
                                                console.error('A resposta da API não contem campos esperados')
                                            }
                                        } else {
                                            console.error('A resposta da API não é um objeto JSON válido.');
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Ocorreu um erro ao salvar as alterações.", error);
                                    });
                            }
                            // Atualiza a exibição erro esta aqui, falta o .value de input EquipoObservação
                            listAgenda.textContent = `${inputAgendaTitulo.value} - ${inputAgendaDataInicio.value} - ${inputAgendaDataTermino.value} - ${inputAgendaObservacao.value}`;
                            editButton.textContent = 'Editar';
                        } else {
                            // Habilitar o modo de edição
                            inputAgendaTitulo = document.createElement('input');
                            inputAgendaTitulo.value = agenda.titulo;
                            listAgenda.insertBefore(inputAgendaTitulo, editButton);

                            inputAgendaDataInicio = document.createElement('input');
                            inputAgendaDataInicio.value = agenda.dataInicio;
                            listAgenda.insertBefore(inputAgendaDataInicio, editButton);

                            inputAgendaDataTermino = document.createElement('input');
                            inputAgendaDataTermino.value = agenda.dataTermino;
                            listAgenda.insertBefore(inputAgendaDataTermino, editButton);

                            inputAgendaObservacao = document.createElement('input');
                            inputAgendaObservacao.value = agenda.observacao;
                            listAgenda.insertBefore(inputAgendaObservacao, editButton);

                            editButton.textContent = 'Salvar';
                        }
                        isEditMode = !isEditMode; // Alternar o modo de edição
                    });
                    lista.appendChild(listAgenda);
                }
            )
            ;
        }
    )
    .catch(error => {
        // Trate erros de solicitação ou resposta da API
        console.error('Ocorreu um erro:', error);
    });