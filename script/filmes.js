import getDados from "./getDados.js";

// Obtém o ID do filme da URL
const params = new URLSearchParams(window.location.search);
const filmeId = params.get('id');

// Certifica-se de que há um ID válido para o filme antes de tentar carregar suas informações
if (!filmeId) {
  console.error('ID do filme não encontrado.');
} else {
  carregarInfoFilme(); // Chama a função apenas se um ID válido foi encontrado
}

// Função para carregar informações do filme
function carregarInfoFilme() {
    getDados(`/filmes/${filmeId}`)
        .then(data => {
            // Assume que existe um elemento no seu HTML com o ID 'fichaDescricao'
            const fichaDescricao = document.getElementById('ficha-descricao');
            if (!fichaDescricao) {
              console.error('Elemento para exibir as informações do filme não encontrado.');
              return;
            }

            // Atualiza o innerHTML do elemento com as informações do filme
            fichaDescricao.innerHTML = `
                <img src="${data.poster}" alt="${data.titulo}" />
                <div>
                    <h2>${data.titulo}</h2>
                    <div class="descricao-texto">
                        <p><b>Média de avaliações:</b> ${data.avaliacao}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            // Log de erro ao tentar obter informações do filme
            console.error('Erro ao obter informações do filme:', error);
        });
}

// Não é necessário chamar carregarInfoFilme() aqui novamente se o ID não for válido.
