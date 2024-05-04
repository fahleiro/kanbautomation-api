const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT

app.use(express.json()); // Middleware para permitir o uso de req.body com JSON

// Endpoint para receber a solicitação e repassar para o servidor destino
app.post('/postLoggedTime', async (req, res) => {
    const { apiKey, server, cards } = req.body; // Extrair apiKey, server e cards do corpo da requisição

    try {
        // Verificar se todos os parâmetros necessários foram fornecidos
        if (!apiKey || !server || !cards) {
            return res.status(400).json({ message: 'Parâmetros inválidos' });
        }

        // Fazer solicitação para o servidor destino
        const response = await axios.post(server, cards, {
            headers: {
                'apikey': apiKey,
                'Content-Type': 'application/json'
            }
        });

        // Retornar a resposta do servidor destino
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao enviar solicitação para o servidor destino:', error);
        res.status(500).json({ message: 'Erro ao enviar solicitação para o servidor destino' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
