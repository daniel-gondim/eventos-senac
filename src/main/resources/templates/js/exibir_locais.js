fetch('http://localhost:8080/locais') // substitua com a URL da sua API
    .then(response => response.json()) // converte a resposta para JSON
    .then(data => {
        // 'data' contém os dados da resposta da API
        console.log(data); // exibe os dados no console

        // Exemplo de exibição em uma lista HTML
        const lista = document.getElementById('locais-lista'); // substitua com o ID do elemento HTML onde você deseja exibir a lista

        data.forEach(local => {
            const listLocal = document.createElement('li'); // cria linha para armazenar descrição e observação do equipamento
            listLocal.className = "lista-locais__item";
            const localInfo = `${local.nome} - ${local.observacao}`; // nome e observação
            listLocal.textContent = localInfo;

            const editButton = document.createElement('button');
            editButton.className = "lista-locais__item__botao";
            editButton.textContent = 'Editar';
            listLocal.appendChild(editButton);

            let isEditMode = false; //variável para controlar o modo de edição
            let inputLocalNome;
            let inputLocalObservacao;

            editButton.addEventListener('click', () => {
                if (isEditMode) {
                    if (inputLocalNome.value !== local.nome || inputLocalObservacao.value !== local.observacao) {
                        const updateLocal = {
                            nome: inputLocalNome.value,
                            observacao: inputLocalObservacao.value
                        };

                        fetch(`http://localhost:8080/locais/update/${local.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updateLocal)
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log("Alterações salvas", data);
                            })
                            .catch(error => {
                                console.error("Ocorreu um erro ao salvar as alterações.", error);
                            });
                    }
                    // Atualiza a exibição erro esta aqui, falta o .value de input EquipoObservação
                    listLocal.textContent = `${inputLocalNome.value} - ${inputLocalObservacao}`;
                    editButton.textContent = 'Editar';
                } else {
                    // Habilitar o modo de edição
                    inputLocalNome = document.createElement('input');
                    inputLocalNome.value = local.nome;
                    listLocal.insertBefore(inputLocalNome, editButton);

                    inputLocalObservacao = document.createElement('input');
                    inputLocalObservacao.value = local.observacao;
                    listLocal.insertBefore(inputLocalObservacao, editButton);

                    editButton.textContent = 'Salvar';
                }
                isEditMode = !isEditMode; // Alternar o modo de edição
            });
            lista.appendChild(listLocal);
        });
    })
    .catch(error => {
        // Trate erros de solicitação ou resposta da API
        console.error('Ocorreu um erro:', error);
    });