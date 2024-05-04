const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT

// Middleware para autenticar usando apiKey
const authenticateWithApiKey = (req, res, next) => {
    const apiKey = req.headers['apikey']; // Supondo que você esteja enviando a apiKey no cabeçalho 'apikey'

    // Verificar se a apiKey está presente no cabeçalho
    if (!apiKey) {
        return res.status(401).json({ message: 'apiKey não fornecida' });
    }

    // Adicionar a apiKey ao corpo da solicitação
    req.body.apiKey = apiKey;
    next();
};

// Endpoint para receber a solicitação e repassar para o Kanbanize
app.post('/kanbanizeEndpoint', authenticateWithApiKey, async (req, res) => {
    const { apiKey, server, cards } = req.body;

    try {
        // Fazer solicitação para o endpoint no Kanbanize
        const response = await axios.post(server, cards, {
            headers: {
                'apikey': apiKey,
                'Content-Type': 'application/json'
            }
        });

        // Retornar a resposta do Kanbanize
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao enviar solicitação para o Kanbanize:', error);
        res.status(500).json({ message: 'Erro ao enviar solicitação para o Kanbanize' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
