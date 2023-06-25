fetch('http://localhost:8080/colaboradores') // substitua com a URL da sua API
    .then(response => response.json()) // converte a resposta para JSON
    .then(data => {
        // 'data' contém os dados da resposta da API
        console.log(data); // exibe os dados no console

        // Exemplo de exibição em uma lista HTML
        const lista = document.getElementById('colaboradores-lista'); // substitua com o ID do elemento HTML onde você deseja exibir a lista

        function excluirColaborador(id) {
            fetch(`http://localhost:8080/colaboradores/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        console.error("Erro ao excluir o equipamento");
                    } else {
                        console.log("Colaborador excluído com sucesso");
                        // Remova o elemento da lista de equipamentos exibida na página
                        const colaboradorExcluir = document.getElementById(`colaborador-${id}`);
                        if (colaboradorExcluir) {
                            colaboradorExcluir.remove();
                        }
                    }
                })
                .catch(error => {
                    console.error("Ocorreu um erro ao excluir o equipamento:", error);
                });
        }

        data.forEach(colaborador => {
            const listColaborador = document.createElement('li'); // cria linha para armazenar
            listColaborador.className = "lista-colaboradores__item";
            listColaborador.id = `colaborador-${colaborador.id}`
            // Concatenando descrição e observação
            listColaborador.textContent = `${colaborador.nome} - ${colaborador.tipo}`;

            const editButton = document.createElement('button');
            editButton.className = "lista-colaboradores__item__botao";
            editButton.textContent = 'Editar';
            listColaborador.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.className = "lista-colaboradores__item__botao";
            deleteButton.textContent = 'Excluir';
            listColaborador.appendChild(deleteButton);

            deleteButton.addEventListener('click', () => {
                // Chame a função de exclusão passando o ID do equipamento
                excluirColaborador(colaborador.id);
            });


            let isEditMode = false; //variável para controlar o modo de edição
            let inputColaboradorNome;
            let inputColaboradorTipo;

            editButton.addEventListener('click', () => {
                if (isEditMode) {
                    if (colaborador.nome !== inputColaboradorNome.value || colaborador.tipo !== inputColaboradorTipo.value) {
                        const updateColaborador = {
                            nome: inputColaboradorNome.value,
                            tipo: inputColaboradorTipo.value
                        };

                        fetch(`http://localhost:8080/colaboradores/${colaborador.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updateColaborador)
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (typeof data === 'object' && data !== null) {
                                    // Verifica se os campos esperados estão presentes no objeto JSON
                                    if (data.hasOwnProperty('nome') && data.hasOwnProperty('tipo')) {
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
                    listColaborador.textContent = `${inputColaboradorNome.value} - ${inputColaboradorTipo.value}`;
                    editButton.textContent = 'Editar';
                } else {
                    // Habilitar o modo de edição
                    inputColaboradorNome = document.createElement('input');
                    inputColaboradorNome.value = colaborador.nome;
                    listColaborador.insertBefore(inputColaboradorNome, editButton);

                    inputColaboradorTipo = document.createElement('input');
                    inputColaboradorTipo.value = colaborador.tipo;
                    listColaborador.insertBefore(inputColaboradorTipo, editButton);

                    editButton.textContent = 'Salvar';
                }
                isEditMode = !isEditMode; // Alternar o modo de edição
            });
            lista.appendChild(listColaborador);
        });
    })
    .catch(error => {
        // Trate erros de solicitação ou resposta da API
        console.error('Ocorreu um erro:', error);
    });