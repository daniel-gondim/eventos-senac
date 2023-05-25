fetch('http://localhost:8080/equipamentos') // substitua com a URL da sua API
    .then(response => response.json()) // converte a resposta para JSON
    .then(data => {
        // 'data' contém os dados da resposta da API
        console.log(data); // exibe os dados no console

        // Exemplo de exibição em uma lista HTML
        const lista = document.getElementById('equipamentos-lista'); // substitua com o ID do elemento HTML onde você deseja exibir a lista

        data.forEach(equipo => {
            const listEquipo = document.createElement('li'); // cria linha para armazenar descrição e observação do equipamento
            const equipoInfo = `${equipo.descricao} - ${equipo.observacao}`; // Concatenando descrição e observação
            listEquipo.textContent = equipoInfo;

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            listEquipo.appendChild(editButton);

            let isEditMode = false; // variável para controlar o modo de edição
            editButton.addEventListener('click', () => {
                if (isEditMode) {
                    // Salvar as alterações
                    equipo.descricao = inputEquipoDescricao.value;
                    equipo.observacao = inputEquipoObservacao.value;
                    listEquipo.textContent = `${equipo.descricao} - ${equipo.observacao}`;
                    editButton.textContent = 'Editar';
                } else {
                    // Habilitar o modo de edição
                    const inputEquipoDescricao = document.createElement('input');
                    inputEquipoDescricao.value = equipo.descricao;
                    listEquipo.insertBefore(inputEquipoDescricao, editButton);

                    const inputEquipoObservacao = document.createElement('input');
                    inputEquipoObservacao.value = equipo.observacao;
                    listEquipo.insertBefore(inputEquipoObservacao, editButton);

                    editButton.textContent = 'Salvar';
                }

                isEditMode = !isEditMode; // Alternar o modo de edição
            });
            listEquipo.textContent = equipoInfo; // atribui à variável o conteúdo de texto de equipoInfo

            // atribui à variável o conteúdo de texto de equipoInfor
            lista.appendChild(listEquipo);
        });
    })
    .catch(error => {
        // Trate erros de solicitação ou resposta da API
        console.error('Ocorreu um erro:', error);
    });
