const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importar o pacote CORS
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Adicionar o middleware CORS

app.post('/postLoggedTime', async (req, res) => {
    const { apiKey, server, cards } = req.body;

    try {
        if (!apiKey || !server || !cards) {
            return res.status(400).json({ message: 'Parâmetros inválidos' });
        }

        for (const cardBlock of cards) {
            const response = await axios.post(server, cardBlock, {
                headers: {
                    'apikey': apiKey,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Resposta do servidor destino:', response.data);
        }

        res.json({ message: 'Solicitações enviadas com sucesso para todos os blocos de cartas' });
    } catch (error) {
        if (error.response) {
            console.error('Erro no servidor destino:', error.response.data);
            res.status(error.response.status).json({ message: error.response.data });
        } else if (error.request) {
            console.error('Sem resposta do servidor destino:', error.request);
            res.status(500).json({ message: 'Sem resposta do servidor destino' });
        } else {
            console.error('Erro ao processar a solicitação:', error.message);
            res.status(500).json({ message: 'Erro ao processar a solicitação' });
        }
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
