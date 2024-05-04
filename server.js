const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Importe o axios para fazer requisições HTTP
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Endpoint para aceitar o post em /postLoggedTime
app.post('/postLoggedTime', (req, res) => {
    const { apiKey, server, cards, postEndpoint } = req.body; // Extrair apiKey, server, cards e postEndpoint do corpo da requisição
    
    // Verificar se todos os parâmetros necessários foram fornecidos
    if (!apiKey || !server || !cards || !postEndpoint) {
        return res.status(400).json({ message: 'Parâmetros inválidos' });
    }

    // Montar os dados para o novo post
    const postData = {
        server: server,
        cards: cards
    };

    // Configurar os cabeçalhos da requisição com a apiKey
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    // Fazer um novo post para o outro endpoint, incluindo os cabeçalhos configurados
    axios.post(postEndpoint, postData, { headers })
        .then(response => {
            // Se a requisição for bem-sucedida, retornar uma resposta de sucesso
            res.json({ message: 'Dados enviados com sucesso' });
        })
        .catch(error => {
            // Se ocorrer um erro, retornar uma mensagem de erro
            console.error('Erro ao enviar dados:', error);
            res.status(500).json({ message: 'Erro ao enviar dados' });
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
