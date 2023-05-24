function mostraLista() {
    const myList = document.getElementById("novo-form");

    // faz uma chamada para a API e insere os dados na lista
    fetch("https//localhost:8080/equipamentos")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.name;
                myList.appendChild(li);
            });
        })
        .catch(error => console.error(error));
}
