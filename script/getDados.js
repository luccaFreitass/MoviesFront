const baseURL = 'http://localhost:8080'; // Suponho que seja a porta padrão do Spring Boot

export default function getDados(endpoint) {
    return fetch(`${baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token', // Se necessário
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao acessar o endpoint');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Erro ao acessar o endpoint:', error.message);
    });
}
