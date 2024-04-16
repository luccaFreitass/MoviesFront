import getDados from "./getDados.js";


// Mapeia os elementos DOM que você deseja atualizar
const elementos = {
    filmes: document.querySelector('[data-name="filmes"]')
};

// Função para criar a lista de filmes

// Função para criar a lista de filmes
function criarListaFilmes(elemento, dados) {
    // Verifique se há um elemento <ul> dentro da seção
    const ulExistente = elemento.querySelector('ul');

    // Se um elemento <ul> já existe dentro da seção, remova-o
    if (ulExistente) {
        elemento.removeChild(ulExistente);
    }

    const ul = document.createElement('ul');
    ul.className = 'lista';
    const listaHTML = dados.map((filmes) => `
        <li>
            <a href="/detalhes.html?id=${filmes.id}">
                <img src="${filmes.poster}" alt="${filmes.titulo}">
            </a>
        </li>
    `).join('');

    ul.innerHTML = listaHTML;
    elemento.appendChild(ul);
}

// Função genérica para tratamento de erros
function lidarComErro(mensagemErro) {
    console.error(mensagemErro);
}

// Array de URLs para as solicitações
geraSeries();
function geraSeries() {
    const urls = ['/filmes'];

    // Faz todas as solicitações em paralelo
    Promise.all(urls.map(url => getDados(url)))
        .then(data => {
            criarListaFilmes(elementos.filmes, data[0]);
        })
        .catch(error => {
            lidarComErro("Ocorreu um erro ao carregar os dados.");
        });

}


// Função para salvar o filme
function salvarFilme() {
    // Obtém o valor do input onde o usuário digita o nome do filme
    const filmeInput = document.getElementById('filmeInput').value;

    // Verifica se o campo está vazio
    if (!filmeInput.trim()) {
        alert('Por favor, insira um nome de filme válido.');
        return;
    }

    // Cria um objeto com os dados do filme
    const filmeData = {
        nome: filmeInput
    };

    // Faz a requisição POST para o backend
    fetch('http://localhost:8080/filmes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filmeData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar filme.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Filme salvo:', data);
            Swal.fire({
                title: "Sucesso",
                text: "Filme salvo",
                confirmButtonText: "OK",
                customClass: {
                    popup: 'swal2-large'
                },
                customClass: {
                    confirmButton: 'swal2-styled'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        })
        .catch(error => {
            console.error('Erro ao salvar filme:', error);
            alert('Erro ao salvar filme. Por favor, tente novamente.');
        });
}

document.getElementById('salvarBtn').addEventListener('click', salvarFilme);
